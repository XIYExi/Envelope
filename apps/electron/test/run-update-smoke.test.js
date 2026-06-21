/**
 * @file 自动更新本地烟测脚本测试。
 * @description 覆盖命令行参数解析、本地 feed 校验与 JSONL 烟测日志摘要，
 * 确保真实安装包烟测脚本在进入 GUI 进程前就能尽早暴露配置错误。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  assertSmokeFeedArtifacts,
  collectSmokeLogSummary,
  extractInstallerRelativePath,
  extractVersionFromLatestYml,
  parseCliArgs,
  runUpdateSmoke,
} = require("../scripts/run-update-smoke");

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "envelope-update-smoke-test-"));
}

function removeTempDir(tempDir) {
  fs.rmSync(tempDir, {
    recursive: true,
    force: true,
  });
}

test("parseCliArgs 同时支持 --key value 与 --key=value", () => {
  const args = parseCliArgs([
    "--app",
    "C:\\Programs\\Envelope\\Envelope.exe",
    "--feed-dir=./release",
    "--headless",
  ]);

  assert.deepEqual(args, {
    app: "C:\\Programs\\Envelope\\Envelope.exe",
    "feed-dir": "./release",
    headless: true,
  });
});

test("extractInstallerRelativePath 可从 latest.yml 提取安装包路径", () => {
  const installerRelativePath = extractInstallerRelativePath(
    ["version: 3.1.0", "path: Envelope Setup 3.1.0.exe", "sha512: mock"].join("\n")
  );

  assert.equal(installerRelativePath, "Envelope Setup 3.1.0.exe");
});

test("extractVersionFromLatestYml 可从 latest.yml 提取目标版本号", () => {
  const version = extractVersionFromLatestYml(
    ["version: 3.1.0", "path: Envelope Setup 3.1.0.exe", "sha512: mock"].join("\n")
  );

  assert.equal(version, "3.1.0");
});

test("assertSmokeFeedArtifacts 会校验 latest.yml 与被引用安装包同时存在", () => {
  const tempDir = createTempDir();

  try {
    fs.writeFileSync(
      path.join(tempDir, "latest.yml"),
      ["version: 3.1.0", "path: Envelope Setup 3.1.0.exe", "sha512: mock"].join("\n"),
      "utf8"
    );
    fs.writeFileSync(path.join(tempDir, "Envelope Setup 3.1.0.exe"), "binary", "utf8");

    const result = assertSmokeFeedArtifacts({
      feedDir: tempDir,
    });

    assert.equal(result.latestYmlPath, path.join(tempDir, "latest.yml"));
    assert.equal(result.installerPath, path.join(tempDir, "Envelope Setup 3.1.0.exe"));
    assert.equal(result.version, "3.1.0");
  } finally {
    removeTempDir(tempDir);
  }
});

test("collectSmokeLogSummary 返回 smoke-test-finished 的最终状态", () => {
  const tempDir = createTempDir();
  const logFilePath = path.join(tempDir, "smoke.jsonl");

  try {
    fs.writeFileSync(
      logFilePath,
      [
        JSON.stringify({ event: "smoke-test-started", success: false }),
        JSON.stringify({ event: "update-downloaded", version: "3.1.0" }),
        JSON.stringify({ event: "smoke-test-finished", success: true, status: "update-downloaded" }),
      ].join("\n"),
      "utf8"
    );

    const summary = collectSmokeLogSummary({
      logFilePath,
    });

    assert.equal(summary.success, true);
    assert.equal(summary.finalEntry.status, "update-downloaded");
    assert.equal(summary.entries.length, 3);
  } finally {
    removeTempDir(tempDir);
  }
});

test("runUpdateSmoke 会在安装后再次启动并验证已切换到新版本", async () => {
  const tempDir = createTempDir();
  const appPath = path.join(tempDir, "Envelope.exe");
  const feedDir = path.join(tempDir, "feed");
  const logFilePath = path.join(tempDir, "smoke.jsonl");
  const spawnStages = [];

  try {
    fs.mkdirSync(feedDir, { recursive: true });
    fs.writeFileSync(appPath, "binary", "utf8");
    fs.writeFileSync(
      path.join(feedDir, "latest.yml"),
      ["version: 3.1.0", "path: Envelope Setup 3.1.0.exe", "sha512: mock"].join("\n"),
      "utf8"
    );
    fs.writeFileSync(path.join(feedDir, "Envelope Setup 3.1.0.exe"), "binary", "utf8");

    function spawnImpl(_command, _args, options) {
      const child = new EventEmitter();
      spawnStages.push(options.env.ENVELOPE_UPDATE_SMOKE_STAGE);

      process.nextTick(() => {
        const event =
          options.env.ENVELOPE_UPDATE_SMOKE_STAGE === "update"
            ? {
                event: "smoke-test-finished",
                success: true,
                status: "update-downloaded",
                version: "3.1.0",
              }
            : {
                event: "smoke-test-finished",
                success: true,
                status: "verified-installed-version",
                version: options.env.ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION,
              };

        fs.appendFileSync(logFilePath, `${JSON.stringify(event)}\n`, "utf8");
        child.emit("exit", 0, null);
      });

      return child;
    }

    const result = await runUpdateSmoke({
      appPath,
      feedDir,
      logFilePath,
      timeoutMs: 10_000,
      spawnImpl,
    });

    assert.deepEqual(spawnStages, ["update", "verify-installed-version"]);
    assert.equal(result.summary.success, true);
    assert.equal(result.summary.finalEntry.status, "verified-installed-version");
    assert.equal(result.summary.finalEntry.version, "3.1.0");
  } finally {
    removeTempDir(tempDir);
  }
});
