/**
 * @file Electron 自动更新本地烟测脚本。
 * @description 启动一个指向 release 目录的本地 generic feed 静态服务，
 * 再拉起已安装的 Electron 应用并通过环境变量开启自动更新烟测模式，
 * 方便在本地复现“检查更新 -> 下载 -> 安装提示/重启安装”的真实链路。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");

const DEFAULT_TIMEOUT_MS = 180_000;
const DEFAULT_HOST = "127.0.0.1";
const SMOKE_STAGE_UPDATE = "update";
const SMOKE_STAGE_VERIFY_INSTALLED_VERSION = "verify-installed-version";
const VERIFY_RETRY_DELAY_MS = 5_000;

/**
 * 解析命令行参数，支持 `--key value` 与 `--key=value` 两种风格。
 * @param {string[]} argv 原始参数列表。
 * @returns {Record<string, string | boolean>} 归一化后的键值映射。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function parseCliArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const trimmedToken = token.slice(2);
    if (!trimmedToken) {
      continue;
    }

    const separatorIndex = trimmedToken.indexOf("=");
    if (separatorIndex >= 0) {
      const key = trimmedToken.slice(0, separatorIndex);
      const value = trimmedToken.slice(separatorIndex + 1);
      args[key] = value;
      continue;
    }

    const nextToken = argv[index + 1];
    if (typeof nextToken === "string" && !nextToken.startsWith("--")) {
      args[trimmedToken] = nextToken;
      index += 1;
      continue;
    }

    args[trimmedToken] = true;
  }

  return args;
}

/**
 * 从 `latest.yml` 中提取安装包相对路径。
 * @param {string} latestYmlContent yml 文本。
 * @returns {string | null} 安装包相对路径。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function extractInstallerRelativePath(latestYmlContent) {
  const pathMatch = latestYmlContent.match(/^\s*path:\s*(.+)\s*$/m);
  if (!pathMatch) {
    return null;
  }

  return pathMatch[1].trim().replace(/^['"]|['"]$/g, "");
}

/**
 * 从 `latest.yml` 中提取目标版本号，供安装后回读校验使用。
 * @param {string} latestYmlContent yml 文本。
 * @returns {string | null} 目标版本号。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function extractVersionFromLatestYml(latestYmlContent) {
  const versionMatch = latestYmlContent.match(/^\s*version:\s*(.+)\s*$/m);
  if (!versionMatch) {
    return null;
  }

  return versionMatch[1].trim().replace(/^['"]|['"]$/g, "");
}

/**
 * 校验本地 feed 目录是否包含 Windows generic provider 所需的关键产物。
 * @param {{
 *   feedDir: string,
 *   fsImpl?: typeof fs,
 *   pathImpl?: typeof path
 * }} options 校验依赖。
 * @returns {{ latestYmlPath: string, installerPath: string, version: string }} 关键文件路径。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function assertSmokeFeedArtifacts({ feedDir, fsImpl = fs, pathImpl = path }) {
  const latestYmlPath = pathImpl.join(feedDir, "latest.yml");
  if (!fsImpl.existsSync(latestYmlPath)) {
    throw new Error(`未找到更新描述文件：${latestYmlPath}`);
  }

  const latestYmlContent = fsImpl.readFileSync(latestYmlPath, "utf8");
  const installerRelativePath = extractInstallerRelativePath(latestYmlContent);
  if (!installerRelativePath) {
    throw new Error(`无法从 latest.yml 解析安装包路径：${latestYmlPath}`);
  }
  const version = extractVersionFromLatestYml(latestYmlContent);
  if (!version) {
    throw new Error(`无法从 latest.yml 解析目标版本号：${latestYmlPath}`);
  }

  const installerPath = pathImpl.join(feedDir, installerRelativePath.replaceAll("/", pathImpl.sep));
  if (!fsImpl.existsSync(installerPath)) {
    throw new Error(`latest.yml 引用的安装包不存在：${installerPath}`);
  }

  return {
    latestYmlPath,
    installerPath,
    version,
  };
}

/**
 * 为静态文件推断基础 Content-Type。
 * @param {string} filePath 文件绝对路径。
 * @returns {string} HTTP Content-Type。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".yml":
    case ".yaml":
      return "text/yaml; charset=utf-8";
    case ".exe":
      return "application/vnd.microsoft.portable-executable";
    case ".blockmap":
      return "application/octet-stream";
    case ".zip":
      return "application/zip";
    default:
      return "application/octet-stream";
  }
}

/**
 * 创建一个最小可用的 generic provider 静态文件服务。
 * @param {{
 *   rootDir: string,
 *   host?: string,
 *   port?: number,
 *   fsImpl?: typeof fs,
 *   httpImpl?: typeof http,
 *   pathImpl?: typeof path
 * }} options 服务依赖。
 * @returns {{
 *   start: () => Promise<{ origin: string, close: () => Promise<void> }>
 * }} 静态服务控制器。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createStaticFileServer({
  rootDir,
  host = DEFAULT_HOST,
  port = 0,
  fsImpl = fs,
  httpImpl = http,
  pathImpl = path,
}) {
  const normalizedRootDir = pathImpl.resolve(rootDir);

  return {
    async start() {
      const server = httpImpl.createServer((request, response) => {
        try {
          const requestUrl = new URL(request.url || "/", `http://${host}`);
          const requestPath = decodeURIComponent(requestUrl.pathname);
          const relativePath = requestPath === "/" ? "latest.yml" : requestPath.replace(/^\/+/, "");
          const normalizedCandidate = pathImpl.resolve(normalizedRootDir, relativePath);

          if (
            normalizedCandidate !== normalizedRootDir &&
            !normalizedCandidate.startsWith(`${normalizedRootDir}${pathImpl.sep}`)
          ) {
            response.writeHead(403);
            response.end("Forbidden");
            return;
          }

          if (!fsImpl.existsSync(normalizedCandidate) || fsImpl.statSync(normalizedCandidate).isDirectory()) {
            response.writeHead(404);
            response.end("Not Found");
            return;
          }

          response.writeHead(200, {
            "Content-Type": getContentType(normalizedCandidate),
            "Cache-Control": "no-store",
          });
          fsImpl.createReadStream(normalizedCandidate).pipe(response);
        } catch (error) {
          response.writeHead(500);
          response.end(error instanceof Error ? error.message : "Internal Server Error");
        }
      });

      await new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen(port, host, resolve);
      });

      const address = server.address();
      if (!address || typeof address === "string") {
        throw new Error("无法解析本地更新服务监听地址");
      }

      return {
        origin: `http://${host}:${address.port}`,
        close: () =>
          new Promise((resolve, reject) => {
            server.close((error) => {
              if (error) {
                reject(error);
                return;
              }
              resolve();
            });
          }),
      };
    },
  };
}

/**
 * 读取 JSONL 烟测日志，并返回最终状态摘要。
 * @param {{
 *   logFilePath: string,
 *   fsImpl?: typeof fs
 * }} options 日志依赖。
 * @returns {{
 *   entries: Array<Record<string, unknown>>,
 *   finalEntry: Record<string, unknown> | null,
 *   success: boolean
 * }} 烟测结果摘要。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function collectSmokeLogSummary({ logFilePath, fsImpl = fs }) {
  if (!fsImpl.existsSync(logFilePath)) {
    return {
      entries: [],
      finalEntry: null,
      success: false,
    };
  }

  const content = fsImpl.readFileSync(logFilePath, "utf8");
  const entries = content
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const finalEntry =
    [...entries].reverse().find((entry) => entry.event === "smoke-test-finished") || null;
  const success = Boolean(finalEntry?.success);

  return {
    entries,
    finalEntry,
    success,
  };
}

/**
 * 等待 GUI 进程退出。
 * @param {{
 *   childProcess: import("child_process").ChildProcess,
 *   timeoutMs: number
 * }} options 等待参数。
 * @returns {Promise<{ code: number | null, signal: NodeJS.Signals | null }>} 退出结果。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function waitForChildExit({ childProcess, timeoutMs }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`等待应用退出超时：${timeoutMs}ms`));
    }, timeoutMs);

    childProcess.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    childProcess.once("exit", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal });
    });
  });
}

/**
 * 睡眠一小段时间，给安装程序完成文件替换留出窗口。
 * @param {number} timeoutMs 等待时长。
 * @returns {Promise<void>} 等待结束即返回。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function sleep(timeoutMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutMs);
  });
}

/**
 * 启动一轮烟测子进程。
 * @param {{
 *   appPath: string,
 *   feedUrl: string,
 *   expectedVersion: string,
 *   logFilePath: string,
 *   timeoutMs: number,
 *   channel: string,
 *   stage: string,
 *   spawnImpl?: typeof spawn
 * }} options 启动参数。
 * @returns {Promise<{ code: number | null, signal: NodeJS.Signals | null }>} 退出结果。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function runSmokePhase({
  appPath,
  feedUrl,
  expectedVersion,
  logFilePath,
  timeoutMs,
  channel,
  stage,
  spawnImpl = spawn,
}) {
  const childProcess = spawnImpl(appPath, [], {
    env: {
      ...process.env,
      ENVELOPE_UPDATE_SMOKE_TEST: "true",
      ENVELOPE_UPDATE_SMOKE_FEED_URL: feedUrl,
      ENVELOPE_UPDATE_SMOKE_CHANNEL: channel,
      ENVELOPE_UPDATE_SMOKE_LOG_PATH: logFilePath,
      ENVELOPE_UPDATE_SMOKE_TIMEOUT_MS: String(timeoutMs),
      ENVELOPE_UPDATE_SMOKE_AUTO_INSTALL: "true",
      ENVELOPE_UPDATE_SMOKE_SUPPRESS_DIALOGS: "true",
      ENVELOPE_UPDATE_SMOKE_STAGE: stage,
      ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION: expectedVersion,
    },
    stdio: "inherit",
    windowsHide: false,
  });

  return waitForChildExit({
    childProcess,
    timeoutMs: timeoutMs + 30_000,
  });
}

/**
 * 在更新安装后重新拉起应用，直到成功回读到目标版本或超时。
 * @param {{
 *   appPath: string,
 *   feedUrl: string,
 *   expectedVersion: string,
 *   logFilePath: string,
 *   timeoutMs: number,
 *   channel: string,
 *   spawnImpl?: typeof spawn,
 *   fsImpl?: typeof fs
 * }} options 校验参数。
 * @returns {Promise<{ exit: { code: number | null, signal: NodeJS.Signals | null }, summary: ReturnType<typeof collectSmokeLogSummary>, attempts: number }>} 校验结果。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function verifyInstalledVersion({
  appPath,
  feedUrl,
  expectedVersion,
  logFilePath,
  timeoutMs,
  channel,
  spawnImpl = spawn,
  fsImpl = fs,
}) {
  const deadline = Date.now() + timeoutMs;
  let attempts = 0;
  let lastError = null;

  while (Date.now() < deadline) {
    attempts += 1;

    try {
      const remainingTimeoutMs = Math.max(1_000, deadline - Date.now());
      const exit = await runSmokePhase({
        appPath,
        feedUrl,
        expectedVersion,
        logFilePath,
        timeoutMs: remainingTimeoutMs,
        channel,
        stage: SMOKE_STAGE_VERIFY_INSTALLED_VERSION,
        spawnImpl,
      });
      const summary = collectSmokeLogSummary({
        logFilePath,
        fsImpl,
      });

      if (summary.success && summary.finalEntry?.status === "verified-installed-version") {
        return {
          exit,
          summary,
          attempts,
        };
      }

      lastError = new Error(
        `安装后版本校验未通过，当前状态：${summary.finalEntry?.status || "unknown"}`
      );
    } catch (error) {
      lastError = error;
    }

    if (Date.now() + VERIFY_RETRY_DELAY_MS >= deadline) {
      break;
    }

    await sleep(VERIFY_RETRY_DELAY_MS);
  }

  throw new Error(
    `安装后未能启动到目标版本 ${expectedVersion}：${
      lastError instanceof Error ? lastError.message : String(lastError || "未知错误")
    }`
  );
}

/**
 * 执行一次真实安装包自动更新烟测。
 * @param {{
 *   appPath: string,
 *   feedDir: string,
 *   logFilePath?: string,
 *   timeoutMs?: number,
 *   host?: string,
 *   port?: number,
 *   channel?: string,
 *   spawnImpl?: typeof spawn,
 *   fsImpl?: typeof fs,
 *   osTmpDir?: () => string,
 *   pathImpl?: typeof path
 * }} options 运行参数。
 * @returns {Promise<{
 *   exit: { code: number | null, signal: NodeJS.Signals | null },
 *   feedUrl: string,
 *   logFilePath: string,
 *   summary: ReturnType<typeof collectSmokeLogSummary>
 * }>} 烟测执行结果。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function runUpdateSmoke({
  appPath,
  feedDir,
  logFilePath,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  host = DEFAULT_HOST,
  port = 0,
  channel = "latest",
  spawnImpl = spawn,
  fsImpl = fs,
  osTmpDir = os.tmpdir,
  pathImpl = path,
}) {
  const resolvedAppPath = pathImpl.resolve(appPath);
  const resolvedFeedDir = pathImpl.resolve(feedDir);
  const resolvedLogFilePath =
    logFilePath && String(logFilePath).trim()
      ? pathImpl.resolve(logFilePath)
      : pathImpl.join(osTmpDir(), `envelope-update-smoke-${Date.now()}.log`);

  if (!fsImpl.existsSync(resolvedAppPath)) {
    throw new Error(`未找到待测应用可执行文件：${resolvedAppPath}`);
  }

  if (!fsImpl.existsSync(resolvedFeedDir) || !fsImpl.statSync(resolvedFeedDir).isDirectory()) {
    throw new Error(`未找到本地更新源目录：${resolvedFeedDir}`);
  }

  const feedArtifacts = assertSmokeFeedArtifacts({
    feedDir: resolvedFeedDir,
    fsImpl,
    pathImpl,
  });

  fsImpl.mkdirSync(pathImpl.dirname(resolvedLogFilePath), { recursive: true });
  fsImpl.rmSync(resolvedLogFilePath, { force: true });

  const server = createStaticFileServer({
    rootDir: resolvedFeedDir,
    host,
    port,
    fsImpl,
    pathImpl,
  });
  const { origin, close } = await server.start();

  try {
    console.log(`[update-smoke] 本地更新服务已启动：${origin}`);
    console.log(`[update-smoke] 待测应用：${resolvedAppPath}`);
    console.log(`[update-smoke] 日志文件：${resolvedLogFilePath}`);
    console.log(`[update-smoke] 目标版本：${feedArtifacts.version}`);

    const startedAt = Date.now();
    const updateExit = await runSmokePhase({
      appPath: resolvedAppPath,
      feedUrl: origin,
      expectedVersion: feedArtifacts.version,
      logFilePath: resolvedLogFilePath,
      timeoutMs,
      channel,
      stage: SMOKE_STAGE_UPDATE,
      spawnImpl,
    });
    const updateSummary = collectSmokeLogSummary({
      logFilePath: resolvedLogFilePath,
      fsImpl,
    });

    if (!updateSummary.success) {
      throw new Error(
        `烟测未成功完成，请检查日志：${resolvedLogFilePath}\n最后事件：${
          updateSummary.finalEntry ? JSON.stringify(updateSummary.finalEntry) : "无"
        }`
      );
    }

    // 第一阶段仅代表安装链路走通，仍需再次启动并确认已切换到 feed 中声明的新版本。
    const remainingTimeoutMs = Math.max(15_000, timeoutMs - (Date.now() - startedAt));
    const {
      exit,
      summary,
      attempts: verifyAttempts,
    } = await verifyInstalledVersion({
      appPath: resolvedAppPath,
      feedUrl: origin,
      expectedVersion: feedArtifacts.version,
      logFilePath: resolvedLogFilePath,
      timeoutMs: remainingTimeoutMs,
      channel,
      spawnImpl,
      fsImpl,
    });

    console.log(
      `[update-smoke] 烟测完成，更新阶段退出码=${updateExit.code ?? "null"}，验证阶段退出码=${
        exit.code ?? "null"
      }，最终状态=${summary.finalEntry?.status || "unknown"}，验证次数=${verifyAttempts}`
    );

    return {
      exit,
      feedUrl: origin,
      logFilePath: resolvedLogFilePath,
      summary,
    };
  } finally {
    await close();
  }
}

/**
 * 命令行入口。
 * @returns {Promise<void>} 执行结束即返回。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const appPath =
    typeof args.app === "string" && args.app
      ? args.app
      : process.env.ENVELOPE_UPDATE_SMOKE_APP_PATH;
  const feedDir =
    typeof args["feed-dir"] === "string" && args["feed-dir"]
      ? args["feed-dir"]
      : process.env.ENVELOPE_UPDATE_SMOKE_FEED_DIR;

  if (!appPath || !feedDir) {
    throw new Error(
      [
        "缺少必要参数。",
        "用法：node ./scripts/run-update-smoke.js --app <已安装应用 exe> --feed-dir <包含 latest.yml 的目录>",
        "可选参数：--log-file <日志文件> --timeout-ms <毫秒> --channel <通道> --host <监听地址> --port <端口>",
      ].join("\n")
    );
  }

  await runUpdateSmoke({
    appPath,
    feedDir,
    logFilePath: typeof args["log-file"] === "string" ? args["log-file"] : undefined,
    timeoutMs:
      typeof args["timeout-ms"] === "string"
        ? Number.parseInt(args["timeout-ms"], 10) || DEFAULT_TIMEOUT_MS
        : DEFAULT_TIMEOUT_MS,
    channel: typeof args.channel === "string" ? args.channel : "latest",
    host: typeof args.host === "string" ? args.host : DEFAULT_HOST,
    port: typeof args.port === "string" ? Number.parseInt(args.port, 10) || 0 : 0,
  });
}

if (require.main === module) {
  main().catch((error) => {
    console.error("[update-smoke] 执行失败");
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = {
  DEFAULT_HOST,
  DEFAULT_TIMEOUT_MS,
  assertSmokeFeedArtifacts,
  collectSmokeLogSummary,
  createStaticFileServer,
  extractInstallerRelativePath,
  extractVersionFromLatestYml,
  getContentType,
  parseCliArgs,
  runUpdateSmoke,
  runSmokePhase,
  sleep,
  SMOKE_STAGE_UPDATE,
  SMOKE_STAGE_VERIFY_INSTALLED_VERSION,
  verifyInstalledVersion,
  waitForChildExit,
};
