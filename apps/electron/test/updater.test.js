const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");

const {
  DEFAULT_SMOKE_STARTUP_CHECK_DELAY_MS,
  DEFAULT_SMOKE_TIMEOUT_MS,
  SMOKE_TEST_NO_UPDATE_EXIT_CODE,
  SMOKE_TEST_VERSION_MISMATCH_EXIT_CODE,
  createAppUpdater,
  createUpdaterLogger,
  formatReleaseNotes,
  resolveUpdaterSmokeTestConfig,
} = require("../main/updater");

function flushAsyncEvents() {
  return new Promise((resolve) => setImmediate(resolve));
}

class FakeAutoUpdater extends EventEmitter {
  constructor() {
    super();
    this.autoDownload = false;
    this.autoInstallOnAppQuit = false;
    this.checkCalls = 0;
    this.quitAndInstallCalls = 0;
    this.feedUrls = [];
  }

  async checkForUpdates() {
    this.checkCalls += 1;
    return {
      started: true,
    };
  }

  quitAndInstall() {
    this.quitAndInstallCalls += 1;
  }

  setFeedURL(options) {
    this.feedUrls.push(options);
  }
}

function createDialogRecorder() {
  const dialogs = [];

  return {
    dialogs,
    dialogImpl: {
      async showMessageBox(_window, options) {
        dialogs.push(options);
        return { response: 0 };
      },
    },
  };
}

test("formatReleaseNotes 兼容字符串与 releaseNotes 数组结构", () => {
  assert.equal(formatReleaseNotes("  修复主进程崩溃  "), "修复主进程崩溃");
  assert.equal(
    formatReleaseNotes([{ note: "修复自动更新提示" }, { note: "优化下载流程" }]),
    "修复自动更新提示\n\n优化下载流程"
  );
});

test("resolveUpdaterSmokeTestConfig 为本地烟测生成默认参数与日志路径", () => {
  const smokeTestConfig = resolveUpdaterSmokeTestConfig({
    env: {
      ENVELOPE_UPDATE_SMOKE_TEST: "true",
    },
    app: {
      getPath(name) {
        assert.equal(name, "temp");
        return "/tmp/envelope";
      },
    },
  });

  assert.equal(smokeTestConfig.enabled, true);
  assert.equal(smokeTestConfig.channel, "latest");
  assert.equal(smokeTestConfig.stage, "update");
  assert.equal(smokeTestConfig.autoInstallOnDownloaded, true);
  assert.equal(smokeTestConfig.suppressDialogs, true);
  assert.equal(smokeTestConfig.timeoutMs, DEFAULT_SMOKE_TIMEOUT_MS);
  assert.equal(smokeTestConfig.startupCheckDelayMs, DEFAULT_SMOKE_STARTUP_CHECK_DELAY_MS);
  assert.match(smokeTestConfig.logFilePath, /envelope-update-smoke\.log$/);
});

test("createUpdaterLogger 会同步输出结构化 JSONL 日志", () => {
  const lines = [];
  const logs = [];
  const updaterLogger = createUpdaterLogger({
    logger: {
      log(...args) {
        logs.push(args.join(" "));
      },
      error(...args) {
        logs.push(args.join(" "));
      },
    },
    logFilePath: "/tmp/envelope-update-smoke.jsonl",
    appendFileSyncImpl(_filePath, content) {
      lines.push(content.trim());
    },
    mkdirSyncImpl() {},
    nowImpl() {
      return new Date("2026-06-21T12:00:00.000Z");
    },
  });

  updaterLogger.info("smoke-test-started", { feedUrl: "http://127.0.0.1:8899" });

  assert.equal(lines.length, 1);
  assert.match(lines[0], /"event":"smoke-test-started"/);
  assert.match(lines[0], /"feedUrl":"http:\/\/127\.0\.0\.1:8899"/);
  assert.equal(logs.length, 1);
});

test("开发环境手动检查更新时给出明确提示且不触发 electron-updater", async () => {
  const updater = new FakeAutoUpdater();
  const { dialogs, dialogImpl } = createDialogRecorder();
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: false,
    },
    autoUpdaterInstance: updater,
    dialogImpl,
  });

  const result = await appUpdater.checkForUpdates({ manual: true });

  assert.equal(result.skipped, true);
  assert.equal(updater.checkCalls, 0);
  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0].message, "当前为开发环境");
});

test("已打包但缺少 app-update.yml 时，手动检查会提示未配置更新源", async () => {
  const updater = new FakeAutoUpdater();
  const { dialogs, dialogImpl } = createDialogRecorder();
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
    },
    autoUpdaterInstance: updater,
    existsSyncImpl() {
      return false;
    },
    dialogImpl,
  });

  const result = await appUpdater.checkForUpdates({ manual: true });

  assert.equal(result.skipped, true);
  assert.equal(updater.checkCalls, 0);
  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0].message, "当前安装包未配置更新源");
});

test("发现可更新版本时弹出可用通知，并开启自动下载与退出安装", async () => {
  const updater = new FakeAutoUpdater();
  const { dialogs, dialogImpl } = createDialogRecorder();
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
      getVersion() {
        return "3.0.0";
      },
    },
    autoUpdaterInstance: updater,
    existsSyncImpl() {
      return true;
    },
    dialogImpl,
  });

  await appUpdater.checkForUpdates();
  updater.emit("update-available", {
    version: "3.1.0",
    releaseName: "ISC-120",
    releaseNotes: "补齐自动更新提示链路",
  });
  await flushAsyncEvents();

  assert.equal(updater.autoDownload, true);
  assert.equal(updater.autoInstallOnAppQuit, true);
  assert.equal(updater.checkCalls, 1);
  assert.equal(dialogs.length, 1);
  assert.match(dialogs[0].message, /3\.1\.0/);
  assert.match(dialogs[0].detail, /后台自动下载/);
  assert.match(dialogs[0].detail, /ISC-120/);
});

test("手动检查无新版本时提示当前已安装最新版本", async () => {
  const updater = new FakeAutoUpdater();
  const { dialogs, dialogImpl } = createDialogRecorder();
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
      getVersion() {
        return "3.0.0";
      },
    },
    autoUpdaterInstance: updater,
    existsSyncImpl() {
      return true;
    },
    dialogImpl,
  });

  await appUpdater.checkForUpdates({ manual: true });
  updater.emit("update-not-available");
  await flushAsyncEvents();

  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0].message, "当前已安装最新版本");
  assert.match(dialogs[0].detail, /3\.0\.0/);
});

test("下载完成后可提示立即重启安装，并调用 quitAndInstall", async () => {
  const updater = new FakeAutoUpdater();
  const { dialogs, dialogImpl } = createDialogRecorder();
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
    },
    autoUpdaterInstance: updater,
    existsSyncImpl() {
      return true;
    },
    dialogImpl,
  });

  appUpdater.registerListeners();
  updater.emit("update-downloaded", {
    version: "3.1.0",
  });
  await flushAsyncEvents();

  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0].title, "更新已准备完成");
  assert.equal(updater.quitAndInstallCalls, 1);
});

test("烟测模式可覆盖本地 feed、抑制对话框并在下载完成后自动安装", async () => {
  const updater = new FakeAutoUpdater();
  const { dialogs, dialogImpl } = createDialogRecorder();
  const logLines = [];
  const exitCodes = [];
  const smokeEnv = {
    ENVELOPE_UPDATE_SMOKE_TEST: "true",
    ENVELOPE_UPDATE_SMOKE_FEED_URL: "http://127.0.0.1:8899",
    ENVELOPE_UPDATE_SMOKE_STAGE: "update",
    ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION: "3.1.0",
    ENVELOPE_UPDATE_SMOKE_LOG_PATH: "/tmp/envelope-smoke.log",
    ENVELOPE_UPDATE_CHANNEL: "latest",
  };
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
    },
    autoUpdaterInstance: updater,
    existsSyncImpl() {
      return false;
    },
    dialogImpl,
    appendFileSyncImpl(_filePath, content) {
      logLines.push(content.trim());
    },
    mkdirSyncImpl() {},
    exitApp(code) {
      exitCodes.push(code);
    },
    processEnv: smokeEnv,
    smokeTestConfig: {
      enabled: true,
      feedUrl: "http://127.0.0.1:8899",
      channel: "latest",
      autoInstallOnDownloaded: true,
      suppressDialogs: true,
      timeoutMs: 5_000,
      startupCheckDelayMs: 10,
      logFilePath: "/tmp/envelope-smoke.log",
    },
  });

  await appUpdater.runSmokeTest();
  updater.emit("update-available", {
    version: "3.1.0",
  });
  updater.emit("update-downloaded", {
    version: "3.1.0",
  });
  await flushAsyncEvents();

  assert.deepEqual(updater.feedUrls, [
    {
      provider: "generic",
      url: "http://127.0.0.1:8899",
      channel: "latest",
    },
  ]);
  assert.equal(updater.checkCalls, 1);
  assert.equal(updater.quitAndInstallCalls, 1);
  assert.equal(dialogs.length, 0);
  assert.deepEqual(exitCodes, []);
  assert.equal(smokeEnv.ENVELOPE_UPDATE_SMOKE_TEST, undefined);
  assert.equal(smokeEnv.ENVELOPE_UPDATE_SMOKE_FEED_URL, undefined);
  assert.equal(smokeEnv.ENVELOPE_UPDATE_SMOKE_STAGE, undefined);
  assert.equal(smokeEnv.ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION, undefined);
  assert.equal(smokeEnv.ENVELOPE_UPDATE_SMOKE_LOG_PATH, undefined);
  assert.equal(smokeEnv.ENVELOPE_UPDATE_CHANNEL, "latest");
  assert.ok(logLines.some((line) => line.includes('"event":"smoke-test-finished"')));
  assert.ok(logLines.some((line) => line.includes('"success":true')));
  assert.ok(
    logLines.some((line) =>
      line.includes('"event":"smoke-test-env-cleared-before-quit-and-install"')
    )
  );
});

test("烟测验证阶段会在启动后确认已切换到目标版本", async () => {
  const updater = new FakeAutoUpdater();
  const logLines = [];
  const exitCodes = [];
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
      getVersion() {
        return "3.1.0";
      },
    },
    autoUpdaterInstance: updater,
    appendFileSyncImpl(_filePath, content) {
      logLines.push(content.trim());
    },
    mkdirSyncImpl() {},
    exitApp(code) {
      exitCodes.push(code);
    },
    smokeTestConfig: {
      enabled: true,
      stage: "verify-installed-version",
      expectedVersion: "3.1.0",
      channel: "latest",
      autoInstallOnDownloaded: true,
      suppressDialogs: true,
      timeoutMs: 5_000,
      startupCheckDelayMs: 10,
      logFilePath: "/tmp/envelope-smoke.log",
    },
  });

  const result = await appUpdater.runSmokeTest();

  assert.equal(result.verified, true);
  assert.equal(updater.checkCalls, 0);
  assert.deepEqual(exitCodes, [0]);
  assert.ok(
    logLines.some((line) => line.includes('"status":"verified-installed-version"'))
  );
});

test("烟测验证阶段在版本未切换时以特定退出码失败", async () => {
  const updater = new FakeAutoUpdater();
  const exitCodes = [];
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
      getVersion() {
        return "3.0.0";
      },
    },
    autoUpdaterInstance: updater,
    appendFileSyncImpl() {},
    mkdirSyncImpl() {},
    exitApp(code) {
      exitCodes.push(code);
    },
    smokeTestConfig: {
      enabled: true,
      stage: "verify-installed-version",
      expectedVersion: "3.1.0",
      channel: "latest",
      autoInstallOnDownloaded: true,
      suppressDialogs: true,
      timeoutMs: 5_000,
      startupCheckDelayMs: 10,
      logFilePath: "/tmp/envelope-smoke.log",
    },
  });

  const result = await appUpdater.runSmokeTest();

  assert.equal(result.verified, false);
  assert.equal(result.reason, "version-mismatch");
  assert.deepEqual(exitCodes, [SMOKE_TEST_VERSION_MISMATCH_EXIT_CODE]);
});

test("烟测模式在未发现更新时以特定退出码结束，便于脚本判定失败", async () => {
  const updater = new FakeAutoUpdater();
  const exitCodes = [];
  const appUpdater = createAppUpdater({
    app: {
      isPackaged: true,
      getVersion() {
        return "3.0.0";
      },
    },
    autoUpdaterInstance: updater,
    existsSyncImpl() {
      return true;
    },
    dialogImpl: {
      async showMessageBox() {
        return { response: 0 };
      },
    },
    exitApp(code) {
      exitCodes.push(code);
    },
    smokeTestConfig: {
      enabled: true,
      channel: "latest",
      autoInstallOnDownloaded: true,
      suppressDialogs: true,
      timeoutMs: 5_000,
      startupCheckDelayMs: 10,
    },
  });

  await appUpdater.runSmokeTest();
  updater.emit("update-not-available");
  await flushAsyncEvents();

  assert.deepEqual(exitCodes, [SMOKE_TEST_NO_UPDATE_EXIT_CODE]);
});
