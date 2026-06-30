const fs = require("fs");
const path = require("path");
const {
  PRODUCTION_RENDERER_CONTRACT_KIND,
  PRODUCTION_RENDERER_CONTRACT_VERSION,
  PRODUCTION_RENDERER_MODE,
  PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH,
  resolveProductionRendererManifestPath,
  resolveProductionRendererRoot,
  resolveProductionRendererServerEntryPath,
} = require("./renderer-build-contract");

const DEFAULT_DEV_RENDERER_URL = "http://127.0.0.1:3000";
function normalizeFilePath(filePath) {
  return path.resolve(filePath).toLowerCase();
}

/**
 * 解析当前运行态应该从哪里读取生产渲染产物。
 * 未打包或显式传入 `appRootDir` 的测试场景，仍按工作区路径处理；
 * 只有真正的打包运行态才切换到 `process.resourcesPath`。
 * @param {{
 *   app?: { isPackaged?: boolean },
 *   appRootDir?: string,
 *   resourcesPath?: string
 * }} [options] 路径依赖。
 * @returns {string} 生产 traced runtime 的根基准目录。
 */
function resolveProductionAppRootDir({ app, appRootDir, resourcesPath } = {}) {
  if (app?.isPackaged && !appRootDir && resourcesPath) {
    return resourcesPath;
  }

  return appRootDir || path.join(__dirname, "..", "..");
}

function isExistingFile(filePath, fsModule) {
  if (!filePath) return false;

  try {
    return fsModule.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function detectRuntimeMode(app, env) {
  if (env.ELECTRON_RENDERER_MODE === "development") return "development";
  if (env.ELECTRON_RENDERER_MODE === "production") return "production";
  return app.isPackaged ? "production" : "development";
}

function createUrlLaunchTarget(mode, url, description) {
  const parsed = new URL(url);

  return {
    mode,
    kind: "url",
    entry: url,
    description,
    trust: {
      allowedOrigins: [parsed.origin],
      allowedFilePaths: [],
    },
    load(window) {
      return window.loadURL(url);
    },
  };
}

function createLoopbackLaunchTarget(mode, metadata) {
  const plan = {
    mode,
    kind: "loopback",
    entry: metadata.serverEntryPath,
    description: "生产模式 Next traced runtime 本地 loopback 服务",
    trust: {
      allowedOrigins: [],
      allowedFilePaths: [],
    },
    async load(window, runtime = {}) {
      if (!runtime.loopbackServerManager) {
        throw new Error("缺少 loopback server 管理器，无法启动生产渲染服务");
      }
      if (!runtime.localBackendStorage) {
        throw new Error("缺少桌面本地后端存储门面，无法为 Next runtime 注入 local 环境变量");
      }

      // 生产态桌面运行时始终以 Electron 侧持久化的 local 根目录启动，
      // 这样 Next server 与主进程直接访问 SQLite/媒体目录时能共享同一套路径。
      const runtimeEnv = runtime.localBackendStorage.getRuntimeEnv();

      const { origin } = await runtime.loopbackServerManager.ensureStarted({
        serverEntryPath: metadata.serverEntryPath,
        cwd: metadata.rendererRoot,
        env: runtimeEnv,
      });

      plan.entry = `${origin}/`;
      plan.trust.allowedOrigins = [origin];
      return window.loadURL(plan.entry);
    },
  };

  return plan;
}

function safeReadJsonFile(filePath, fsModule) {
  try {
    return JSON.parse(fsModule.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function resolveProductionRendererMetadata(appRootDir, fsModule) {
  const rendererRoot = resolveProductionRendererRoot(appRootDir);
  const manifestPath = resolveProductionRendererManifestPath(appRootDir);
  const serverEntryPath = resolveProductionRendererServerEntryPath(appRootDir);
  const manifest = safeReadJsonFile(manifestPath, fsModule);

  if (!manifest) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: "缺少生产渲染契约清单",
    };
  }

  if (manifest.kind !== PRODUCTION_RENDERER_CONTRACT_KIND) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: `生产渲染契约类型不匹配，期望 ${PRODUCTION_RENDERER_CONTRACT_KIND}`,
    };
  }

  if (manifest.contractVersion !== PRODUCTION_RENDERER_CONTRACT_VERSION) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: `生产渲染契约版本不匹配，期望 ${PRODUCTION_RENDERER_CONTRACT_VERSION}`,
    };
  }

  if (manifest.rendererMode !== PRODUCTION_RENDERER_MODE) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: `生产渲染模式不匹配，期望 ${PRODUCTION_RENDERER_MODE}`,
    };
  }

  if (manifest.selfContained !== true) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: "生产渲染契约要求 selfContained=true，禁止依赖工作区路径",
    };
  }

  if (manifest.serverEntry !== PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: `生产渲染契约不匹配，期望 ${PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH}`,
    };
  }

  if (!isExistingFile(serverEntryPath, fsModule)) {
    return {
      rendererRoot,
      manifestPath,
      serverEntryPath,
      validationError: "生产渲染服务入口文件缺失",
    };
  }

  return {
    rendererRoot,
    manifestPath,
    serverEntryPath,
    manifest,
    validationError: null,
  };
}

function resolveRendererLaunchPlan(options = {}) {
  const app = options.app;
  const env = options.env || process.env;
  const fsModule = options.fsModule || fs;
  const appRootDir = options.appRootDir || path.join(__dirname, "..", "..");
  const productionAppRootDir = resolveProductionAppRootDir({
    app,
    appRootDir: options.appRootDir,
    resourcesPath: options.resourcesPath || process.resourcesPath,
  });
  const mode = detectRuntimeMode(app, env);

  if (mode === "development") {
    return {
      ...createUrlLaunchTarget(
        mode,
        env.ELECTRON_RENDERER_URL || DEFAULT_DEV_RENDERER_URL,
        "开发模式渲染服务"
      ),
      rendererRoot: resolveProductionRendererRoot(appRootDir),
      checkedStrategies: ["dev-server"],
    };
  }

  // 生产态只允许打包后的 Next traced runtime 在本地 loopback 地址提供服务。
  const metadata = resolveProductionRendererMetadata(productionAppRootDir, fsModule);
  if (!metadata.validationError) {
    return {
      ...createLoopbackLaunchTarget(mode, metadata),
      rendererRoot: metadata.rendererRoot,
      checkedStrategies: ["next-traced-loopback"],
      contractManifestPath: metadata.manifestPath,
    };
  }

  return {
    mode,
    kind: "unresolved",
    entry: null,
    description: "未解析到可用的渲染入口",
    rendererRoot: metadata.rendererRoot,
    checkedStrategies: ["packaged-renderer-contract"],
    trust: {
      allowedOrigins: [],
      allowedFilePaths: [],
    },
    suggestions:
      mode === "development"
        ? [
            `确认前端开发服务已启动：${DEFAULT_DEV_RENDERER_URL}`,
            "如端口不同，可通过 ELECTRON_RENDERER_URL 指定实际地址",
          ]
        : [
            "请先执行 Electron 生产构建，生成受控的 Next traced runtime 产物",
            `确保契约清单位于：${metadata.manifestPath}`,
            `确保固定入口存在：${metadata.serverEntryPath}`,
            `当前契约校验失败：${metadata.validationError}`,
          ],
  };
}

module.exports = {
  DEFAULT_DEV_RENDERER_URL,
  detectRuntimeMode,
  normalizeFilePath,
  resolveProductionAppRootDir,
  resolveRendererLaunchPlan,
  resolveProductionRendererMetadata,
};
