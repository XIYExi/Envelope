/**
 * @file Electron 自动更新主进程模块。
 * @description 负责封装 electron-updater 的启动检查、手动检查、更新可用提示、
 * 下载完成提示与重启安装流程，并对开发态和未配置更新源场景做安全降级。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_STARTUP_CHECK_DELAY_MS = 10_000;
const DEFAULT_SMOKE_TIMEOUT_MS = 180_000;
const DEFAULT_SMOKE_STARTUP_CHECK_DELAY_MS = 1_500;
const SMOKE_TEST_SUCCESS_EXIT_CODE = 0;
const SMOKE_TEST_UNSUPPORTED_EXIT_CODE = 21;
const SMOKE_TEST_NO_UPDATE_EXIT_CODE = 22;
const SMOKE_TEST_CHECK_ERROR_EXIT_CODE = 23;
const SMOKE_TEST_TIMEOUT_EXIT_CODE = 24;
const SMOKE_TEST_VERSION_MISMATCH_EXIT_CODE = 25;
const SMOKE_TEST_ENV_PREFIX = "ENVELOPE_UPDATE_SMOKE_";

/**
 * 解析布尔型环境变量。
 * @param {string | undefined} value 原始环境变量值。
 * @param {boolean} defaultValue 默认值。
 * @returns {boolean} 归一化后的布尔值。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function parseBooleanEnv(value, defaultValue = false) {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const normalizedValue = value.trim().toLowerCase();
  if (!normalizedValue) {
    return defaultValue;
  }

  if (["1", "true", "yes", "on"].includes(normalizedValue)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalizedValue)) {
    return false;
  }

  return defaultValue;
}

/**
 * 解析整数型环境变量。
 * @param {string | undefined} value 原始环境变量值。
 * @param {number} defaultValue 默认值。
 * @returns {number} 归一化后的整数值。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function parseIntegerEnv(value, defaultValue) {
  if (typeof value !== "string" || !value.trim()) {
    return defaultValue;
  }

  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : defaultValue;
}

/**
 * 将 Error 等复杂对象压平为适合日志序列化的结构。
 * @param {unknown} value 待序列化对象。
 * @returns {unknown} 可安全写入 JSON 的结构。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function serializeForLog(value) {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeForLog(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, serializeForLog(item)])
    );
  }

  return value;
}

/**
 * 创建结构化更新日志记录器。
 * @param {{
 *   logger?: Console,
 *   logFilePath?: string,
 *   appendFileSyncImpl?: typeof fs.appendFileSync,
 *   mkdirSyncImpl?: typeof fs.mkdirSync,
 *   pathImpl?: typeof path,
 *   nowImpl?: () => Date
 * }} [options] 日志依赖。
 * @returns {{
 *   info: (event: string, payload?: Record<string, unknown>) => void,
 *   error: (event: string, payload?: Record<string, unknown>) => void
 * }} 日志写入器。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createUpdaterLogger({
  logger = console,
  logFilePath,
  appendFileSyncImpl = fs.appendFileSync,
  mkdirSyncImpl = fs.mkdirSync,
  pathImpl = path,
  nowImpl = () => new Date(),
} = {}) {
  function write(level, event, payload = {}) {
    const normalizedPayload = serializeForLog(payload);
    const entry = {
      timestamp: nowImpl().toISOString(),
      level,
      scope: "updater",
      event,
      ...normalizedPayload,
    };
    const line = JSON.stringify(entry);

    if (level === "error") {
      logger.error?.(`[updater] ${event}`, normalizedPayload);
    } else {
      logger.log?.(`[updater] ${event}`, normalizedPayload);
    }

    if (logFilePath) {
      mkdirSyncImpl(pathImpl.dirname(logFilePath), { recursive: true });
      appendFileSyncImpl(logFilePath, `${line}\n`, "utf8");
    }
  }

  return {
    info(event, payload) {
      write("info", event, payload);
    },
    error(event, payload) {
      write("error", event, payload);
    },
  };
}

/**
 * 解析自动更新烟测模式配置。
 * @param {{
 *   env?: NodeJS.ProcessEnv,
 *   app?: { getPath?: (name: string) => string },
 *   pathImpl?: typeof path
 * }} [options] 运行时依赖。
 * @returns {{
 *   enabled: boolean,
 *   feedUrl?: string,
 *   channel: string,
 *   stage: string,
 *   expectedVersion?: string,
 *   autoInstallOnDownloaded: boolean,
 *   suppressDialogs: boolean,
 *   timeoutMs: number,
 *   startupCheckDelayMs: number,
 *   logFilePath?: string
 * }} 归一化后的烟测配置。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolveUpdaterSmokeTestConfig({
  env = process.env,
  app,
  pathImpl = path,
} = {}) {
  const enabled = parseBooleanEnv(env.ENVELOPE_UPDATE_SMOKE_TEST, false);
  const feedUrl =
    typeof env.ENVELOPE_UPDATE_SMOKE_FEED_URL === "string" &&
      env.ENVELOPE_UPDATE_SMOKE_FEED_URL.trim()
      ? env.ENVELOPE_UPDATE_SMOKE_FEED_URL.trim()
      : undefined;
  const explicitLogFilePath =
    typeof env.ENVELOPE_UPDATE_SMOKE_LOG_PATH === "string" &&
      env.ENVELOPE_UPDATE_SMOKE_LOG_PATH.trim()
      ? env.ENVELOPE_UPDATE_SMOKE_LOG_PATH.trim()
      : undefined;
  const defaultLogFilePath =
    enabled && typeof app?.getPath === "function"
      ? pathImpl.join(app.getPath("temp"), "envelope-update-smoke.log")
      : undefined;
  const expectedVersion =
    typeof env.ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION === "string" &&
      env.ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION.trim()
      ? env.ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION.trim()
      : undefined;

  return {
    enabled,
    feedUrl,
    channel: env.ENVELOPE_UPDATE_SMOKE_CHANNEL || env.ENVELOPE_UPDATE_CHANNEL || "latest",
    stage: env.ENVELOPE_UPDATE_SMOKE_STAGE || "update",
    expectedVersion,
    autoInstallOnDownloaded: parseBooleanEnv(
      env.ENVELOPE_UPDATE_SMOKE_AUTO_INSTALL,
      true
    ),
    suppressDialogs: parseBooleanEnv(env.ENVELOPE_UPDATE_SMOKE_SUPPRESS_DIALOGS, true),
    timeoutMs: parseIntegerEnv(env.ENVELOPE_UPDATE_SMOKE_TIMEOUT_MS, DEFAULT_SMOKE_TIMEOUT_MS),
    startupCheckDelayMs: parseIntegerEnv(
      env.ENVELOPE_UPDATE_SMOKE_START_DELAY_MS,
      DEFAULT_SMOKE_STARTUP_CHECK_DELAY_MS
    ),
    logFilePath: explicitLogFilePath || defaultLogFilePath,
  };
}

/**
 * 在自动安装前清理烟测环境变量，避免安装器拉起的新进程继续继承 update 阶段状态。
 * 实际的“安装后版本验证”由外部烟测脚本二次拉起应用完成，因此这里需要尽快回到纯净环境。
 * @param {NodeJS.ProcessEnv} [env] 目标环境变量对象。
 * @returns {string[]} 被清理的环境变量键列表。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function clearUpdaterSmokeTestEnv(env = process.env) {
  if (!env || typeof env !== "object") {
    return [];
  }

  const clearedKeys = [];
  for (const key of Object.keys(env)) {
    if (!key.startsWith(SMOKE_TEST_ENV_PREFIX)) {
      continue;
    }

    delete env[key];
    clearedKeys.push(key);
  }

  return clearedKeys;
}

/**
 * 解析对话框依赖。
 * @param {import("electron").Dialog | undefined} dialogImpl 可选对话框实现。
 * @returns {import("electron").Dialog} 可用的对话框实例。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function getDialogBinding(dialogImpl) {
  if (dialogImpl) {
    return dialogImpl;
  }

  return require("electron").dialog;
}

/**
 * 解析自动更新依赖。
 * @param {import("electron-updater").AppUpdater | undefined} autoUpdaterInstance 可选更新器实例。
 * @returns {import("electron-updater").AppUpdater} 可用的自动更新实例。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function getAutoUpdaterBinding(autoUpdaterInstance) {
  if (autoUpdaterInstance) {
    return autoUpdaterInstance;
  }

  return require("electron-updater").autoUpdater;
}

/**
 * 归一化发行说明文本，兼容 string / array 两种 electron-updater 结构。
 * @param {string | Array<{ note?: string } | string> | undefined | null} releaseNotes 原始发行说明。
 * @returns {string} 适合直接展示给用户的发行说明文本。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function formatReleaseNotes(releaseNotes) {
  if (!releaseNotes) {
    return "本次更新暂未提供发行说明。";
  }

  if (typeof releaseNotes === "string") {
    return releaseNotes.trim() || "本次更新暂未提供发行说明。";
  }

  if (Array.isArray(releaseNotes)) {
    const normalizedNotes = releaseNotes
      .map((item) => {
        if (!item) {
          return "";
        }

        if (typeof item === "string") {
          return item.trim();
        }

        if (typeof item.note === "string") {
          return item.note.trim();
        }

        return "";
      })
      .filter(Boolean);

    return normalizedNotes.join("\n\n") || "本次更新暂未提供发行说明。";
  }

  return "本次更新暂未提供发行说明。";
}

/**
 * 解析打包后 `app-update.yml` 的预期位置。
 * @param {{ resourcesPath?: string, pathImpl?: typeof path }} [options] 路径依赖。
 * @returns {string} 更新配置文件绝对路径。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolvePackagedUpdateConfigPath({
  resourcesPath = process.resourcesPath,
  pathImpl = path,
} = {}) {
  return pathImpl.join(resourcesPath || process.cwd(), "app-update.yml");
}

/**
 * 判断当前安装包是否具备自动更新配置。
 * @param {{ app?: { isPackaged?: boolean }, existsSyncImpl?: typeof fs.existsSync, resourcesPath?: string, pathImpl?: typeof path }} [options] 检查依赖。
 * @returns {boolean} 存在更新配置时返回 true。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function hasPackagedUpdateConfig({
  app,
  existsSyncImpl = fs.existsSync,
  resourcesPath,
  pathImpl,
} = {}) {
  if (!app || !app.isPackaged) {
    return false;
  }

  return existsSyncImpl(
    resolvePackagedUpdateConfigPath({
      resourcesPath,
      pathImpl,
    })
  );
}

/**
 * 创建应用级自动更新门面。
 * @param {{
 *   app?: { isPackaged?: boolean, getVersion?: () => string },
 *   getMainWindow?: () => import("electron").BrowserWindow | null,
 *   autoUpdaterInstance?: import("electron-updater").AppUpdater,
 *   dialogImpl?: import("electron").Dialog,
 *   existsSyncImpl?: typeof fs.existsSync,
 *   logger?: Console,
 *   setTimeoutImpl?: typeof setTimeout,
 *   processEnv?: NodeJS.ProcessEnv,
 *   startupCheckDelayMs?: number
 * }} [options] 运行时依赖。
 * @returns {{
 *   checkForUpdates: (options?: { manual?: boolean }) => Promise<unknown>,
 *   promptRestartToInstall: (updateInfo?: { version?: string } | null) => Promise<unknown>,
 *   registerListeners: () => void,
 *   scheduleStartupCheck: () => boolean
 * }} 自动更新门面对象。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createAppUpdater({
  app,
  getMainWindow = () => null,
  autoUpdaterInstance,
  dialogImpl,
  existsSyncImpl = fs.existsSync,
  logger = console,
  appendFileSyncImpl = fs.appendFileSync,
  mkdirSyncImpl = fs.mkdirSync,
  smokeTestConfig = { enabled: false },
  setTimeoutImpl = setTimeout,
  clearTimeoutImpl = clearTimeout,
  processEnv = process.env,
  exitApp = (code) => app?.exit?.(code),
  startupCheckDelayMs = DEFAULT_STARTUP_CHECK_DELAY_MS,
} = {}) {
  const updater = getAutoUpdaterBinding(autoUpdaterInstance);
  const dialogBinding = getDialogBinding(dialogImpl);
  const updaterLogger = createUpdaterLogger({
    logger,
    logFilePath: smokeTestConfig.logFilePath,
    appendFileSyncImpl,
    mkdirSyncImpl,
  });

  updater.autoDownload = true;
  updater.autoInstallOnAppQuit = true;

  let listenersRegistered = false;
  let isCheckingForUpdates = false;
  let shouldSurfaceErrors = false;
  let downloadedUpdateInfo = null;
  let smokeTestCompleted = false;
  let smokeTestTimer = null;
  let runtimeFeedConfigured = false;

  updaterLogger.info("initialized", {
    packaged: Boolean(app?.isPackaged),
    smokeTestEnabled: smokeTestConfig.enabled,
    smokeTestLogFilePath: smokeTestConfig.logFilePath || null,
  });

  function getMainWindowForDialog() {
    const mainWindow = getMainWindow();
    if (mainWindow && !mainWindow.isDestroyed()) {
      return mainWindow;
    }

    return null;
  }

  async function showMessageBox(options) {
    if (smokeTestConfig.enabled && smokeTestConfig.suppressDialogs) {
      updaterLogger.info("dialog-suppressed", {
        title: options.title,
        message: options.message,
      });
      return { response: 0 };
    }

    return dialogBinding.showMessageBox(getMainWindowForDialog(), options);
  }

  async function showInfoMessage({ title, message, detail }) {
    return showMessageBox({
      type: "info",
      title,
      message,
      detail,
      buttons: ["确定"],
      defaultId: 0,
      cancelId: 0,
    });
  }

  async function showErrorMessage(error) {
    return showMessageBox({
      type: "error",
      title: "更新失败",
      message: "检查或下载更新时发生错误",
      detail: error instanceof Error ? error.message : String(error || "未知错误"),
      buttons: ["确定"],
      defaultId: 0,
      cancelId: 0,
    });
  }

  /**
   * 在执行 quitAndInstall 前清理烟测专用环境，避免安装器自动重启后的新进程误判为 update 阶段。
   * @returns {void}
   * @author xiye
   * @date 2026-06-21
   * @since 3.0.0
   */
  function quitAndInstallWithSanitizedEnv() {
    if (smokeTestConfig.enabled) {
      const clearedEnvKeys = clearUpdaterSmokeTestEnv(processEnv);
      updaterLogger.info("smoke-test-env-cleared-before-quit-and-install", {
        clearedEnvKeys,
      });
    }

    updater.quitAndInstall();
  }

  async function promptRestartToInstall(updateInfo = downloadedUpdateInfo) {
    if (!updateInfo) {
      return null;
    }

    const result = await showMessageBox({
      type: "info",
      title: "更新已准备完成",
      message: `新版本 ${updateInfo.version || "已下载"} 已下载完成`,
      detail: "点击“立即重启”后会退出当前应用并安装更新；也可以稍后手动重启，退出时同样会自动安装。",
      buttons: ["立即重启", "稍后"],
      defaultId: 0,
      cancelId: 1,
    });

    if (result.response === 0) {
      quitAndInstallWithSanitizedEnv();
    }

    return result;
  }

  function getAvailabilityDetail(updateInfo) {
    const versionText = updateInfo.version || "未知版本";
    const releaseNameText = updateInfo.releaseName
      ? `发行标题：${updateInfo.releaseName}`
      : null;

    return [
      `检测到新版本：${versionText}`,
      releaseNameText,
      "",
      "安装包会在后台自动下载，下载完成后会再次提示是否立即重启安装。",
      "",
      formatReleaseNotes(updateInfo.releaseNotes),
    ]
      .filter((item) => item !== null)
      .join("\n");
  }

  /**
   * 在烟测场景下允许通过环境变量注入运行时更新源，避免必须重新打包才能切换本地 feed。
   * @returns {void}
   * @author xiye
   * @date 2026-06-21
   * @since 3.0.0
   */
  function configureRuntimeFeedForSmokeTest() {
    if (!smokeTestConfig.enabled || runtimeFeedConfigured || !smokeTestConfig.feedUrl) {
      return;
    }

    if (typeof updater.setFeedURL !== "function") {
      updaterLogger.info("smoke-feed-override-skipped", {
        reason: "setFeedURL-unavailable",
      });
      runtimeFeedConfigured = true;
      return;
    }

    updater.setFeedURL({
      provider: "generic",
      url: smokeTestConfig.feedUrl,
      channel: smokeTestConfig.channel,
    });
    runtimeFeedConfigured = true;
    updaterLogger.info("smoke-feed-override-configured", {
      feedUrl: smokeTestConfig.feedUrl,
      channel: smokeTestConfig.channel,
    });
  }

  /**
   * 结束烟测并输出最终状态。
   * @param {{
   *   success: boolean,
   *   status: string,
   *   exitCode: number,
   *   reason?: string,
   *   updateInfo?: { version?: string } | null,
   *   error?: unknown,
   *   skipExit?: boolean
   * }} result 烟测终态。
   * @returns {void}
   * @author xiye
   * @date 2026-06-21
   * @since 3.0.0
   */
  function finalizeSmokeTest({
    success,
    status,
    exitCode,
    reason,
    updateInfo,
    error,
    skipExit = false,
  }) {
    if (!smokeTestConfig.enabled || smokeTestCompleted) {
      return;
    }

    smokeTestCompleted = true;
    if (smokeTestTimer) {
      clearTimeoutImpl(smokeTestTimer);
      smokeTestTimer = null;
    }

    updaterLogger.info("smoke-test-finished", {
      success,
      status,
      exitCode,
      reason: reason || null,
      version: updateInfo?.version || null,
      error: error ? serializeForLog(error) : null,
    });

    if (!skipExit) {
      exitApp(exitCode);
    }
  }

  /**
   * 启动烟测超时保护，避免真实安装包链路卡住后没有退出信号。
   * @returns {void}
   * @author xiye
   * @date 2026-06-21
   * @since 3.0.0
   */
  function armSmokeTestTimeout() {
    if (!smokeTestConfig.enabled || smokeTestTimer) {
      return;
    }

    smokeTestTimer = setTimeoutImpl(() => {
      updaterLogger.error("smoke-test-timeout", {
        timeoutMs: smokeTestConfig.timeoutMs,
      });
      finalizeSmokeTest({
        success: false,
        status: "timeout",
        exitCode: SMOKE_TEST_TIMEOUT_EXIT_CODE,
        reason: `等待自动更新链路超时（${smokeTestConfig.timeoutMs}ms）`,
      });
    }, smokeTestConfig.timeoutMs);
  }

  function getUnsupportedReason() {
    if (!app || !app.isPackaged) {
      return {
        title: "无法检查更新",
        message: "当前为开发环境",
        detail: "electron-updater 仅在打包后的安装包中执行更新检查。",
      };
    }

    if (!smokeTestConfig.feedUrl && !hasPackagedUpdateConfig({ app, existsSyncImpl })) {
      return {
        title: "无法检查更新",
        message: "当前安装包未配置更新源",
        detail:
          "请在打包阶段提供 ENVELOPE_UPDATE_FEED_URL，以生成 app-update.yml 后再执行更新检查。",
      };
    }

    return null;
  }

  function resetCheckState() {
    isCheckingForUpdates = false;
    shouldSurfaceErrors = false;
  }

  /**
   * 在安装完成后的二次启动中，仅验证当前版本是否已切换到目标版本。
   * 这样脚本可以把“下载完成”与“真正启动到新版本”拆成两个阶段，避免误报成功。
   * @returns {{ skipped: boolean, verified?: boolean, currentVersion?: string | null, expectedVersion?: string | null, reason?: string }} 校验结果。
   * @author xiye
   * @date 2026-06-21
   * @since 3.0.0
   */
  function verifyInstalledVersionForSmokeTest() {
    if (!smokeTestConfig.enabled || smokeTestConfig.stage !== "verify-installed-version") {
      return {
        skipped: true,
      };
    }

    const currentVersion = typeof app?.getVersion === "function" ? app.getVersion() : null;
    const expectedVersion = smokeTestConfig.expectedVersion || null;
    updaterLogger.info("smoke-test-verify-started", {
      currentVersion,
      expectedVersion,
    });

    if (!expectedVersion) {
      finalizeSmokeTest({
        success: false,
        status: "verify-misconfigured",
        exitCode: SMOKE_TEST_UNSUPPORTED_EXIT_CODE,
        reason: "缺少 ENVELOPE_UPDATE_SMOKE_EXPECTED_VERSION，无法校验安装后的版本",
      });
      return {
        skipped: false,
        verified: false,
        currentVersion,
        expectedVersion,
        reason: "missing-expected-version",
      };
    }

    if (currentVersion === expectedVersion) {
      finalizeSmokeTest({
        success: true,
        status: "verified-installed-version",
        exitCode: SMOKE_TEST_SUCCESS_EXIT_CODE,
        updateInfo: {
          version: currentVersion,
        },
      });
      return {
        skipped: false,
        verified: true,
        currentVersion,
        expectedVersion,
      };
    }

    finalizeSmokeTest({
      success: false,
      status: "version-mismatch",
      exitCode: SMOKE_TEST_VERSION_MISMATCH_EXIT_CODE,
      reason: `当前版本 ${currentVersion || "unknown"} 与目标版本 ${expectedVersion} 不一致`,
      updateInfo: {
        version: currentVersion || undefined,
      },
    });
    return {
      skipped: false,
      verified: false,
      currentVersion,
      expectedVersion,
      reason: "version-mismatch",
    };
  }

  function registerListeners() {
    if (listenersRegistered) {
      return;
    }

    listenersRegistered = true;

    updater.on("update-available", async (updateInfo) => {
      shouldSurfaceErrors = true;
      updaterLogger.info("update-available", {
        version: updateInfo?.version || null,
        releaseName: updateInfo?.releaseName || null,
      });
      await showInfoMessage({
        title: "发现新版本",
        message: `发现可更新版本 ${updateInfo.version || "未知版本"}`,
        detail: getAvailabilityDetail(updateInfo),
      });
    });

    updater.on("update-not-available", async () => {
      if (!isCheckingForUpdates) {
        return;
      }

      const shouldNotifyNoUpdate = shouldSurfaceErrors;
      resetCheckState();
      updaterLogger.info("update-not-available", {
        currentVersion: typeof app?.getVersion === "function" ? app.getVersion() : null,
      });

      if (shouldNotifyNoUpdate) {
        await showInfoMessage({
          title: "已是最新版本",
          message: "当前已安装最新版本",
          detail: `当前版本：${typeof app?.getVersion === "function" ? app.getVersion() : "未知版本"}`,
        });
      }

      finalizeSmokeTest({
        success: false,
        status: "update-not-available",
        exitCode: SMOKE_TEST_NO_UPDATE_EXIT_CODE,
        reason: "未检测到可下载的新版本",
      });
    });

    updater.on("update-downloaded", async (updateInfo) => {
      downloadedUpdateInfo = updateInfo;
      resetCheckState();
      updaterLogger.info("update-downloaded", {
        version: updateInfo?.version || null,
      });

      if (smokeTestConfig.enabled && smokeTestConfig.autoInstallOnDownloaded) {
        updaterLogger.info("smoke-test-auto-install", {
          version: updateInfo?.version || null,
        });
        quitAndInstallWithSanitizedEnv();
        finalizeSmokeTest({
          success: true,
          status: "update-downloaded",
          exitCode: SMOKE_TEST_SUCCESS_EXIT_CODE,
          updateInfo,
          skipExit: true,
        });
        return;
      }

      await promptRestartToInstall(updateInfo);
      finalizeSmokeTest({
        success: true,
        status: "update-downloaded",
        exitCode: SMOKE_TEST_SUCCESS_EXIT_CODE,
        updateInfo,
      });
    });

    updater.on("error", async (error) => {
      const shouldShowError = shouldSurfaceErrors;
      resetCheckState();
      updaterLogger.error("update-flow-failed", {
        error,
      });

      if (shouldShowError) {
        await showErrorMessage(error);
      }

      finalizeSmokeTest({
        success: false,
        status: "error",
        exitCode: SMOKE_TEST_CHECK_ERROR_EXIT_CODE,
        error,
      });
    });
  }

  async function checkForUpdates({ manual = false, source = manual ? "manual" : "startup" } = {}) {
    registerListeners();
    configureRuntimeFeedForSmokeTest();

    if (downloadedUpdateInfo) {
      updaterLogger.info("check-skipped-downloaded", {
        manual,
        source,
        version: downloadedUpdateInfo.version || null,
      });
      return promptRestartToInstall(downloadedUpdateInfo);
    }

    const unsupportedReason = getUnsupportedReason();
    if (unsupportedReason) {
      updaterLogger.info("check-skipped", {
        manual,
        source,
        reason: unsupportedReason.message,
      });
      if (manual) {
        await showInfoMessage(unsupportedReason);
      }
      return {
        skipped: true,
        reason: unsupportedReason.message,
      };
    }

    if (isCheckingForUpdates) {
      updaterLogger.info("check-skipped", {
        manual,
        source,
        reason: "already-checking",
      });
      if (manual) {
        await showInfoMessage({
          title: "正在检查更新",
          message: "更新检查已在进行中",
          detail: "请稍候，当前检查结束后会自动继续下载或提示结果。",
        });
      }
      return {
        skipped: true,
        reason: "already-checking",
      };
    }

    isCheckingForUpdates = true;
    shouldSurfaceErrors = manual;
    updaterLogger.info("check-started", {
      manual,
      source,
    });

    try {
      const result = await updater.checkForUpdates();
      updaterLogger.info("check-dispatched", {
        manual,
        source,
      });
      return result;
    } catch (error) {
      const shouldShowError = shouldSurfaceErrors;
      resetCheckState();
      updaterLogger.error("check-threw", {
        manual,
        source,
        error,
      });

      if (shouldShowError) {
        await showErrorMessage(error);
      }

      return {
        skipped: false,
        error,
      };
    }
  }

  /**
   * 触发可脚本化的自动更新端到端烟测。
   * @returns {Promise<unknown>} 立即返回底层检查结果，终态由事件回调和退出码表达。
   * @author xiye
   * @date 2026-06-21
   * @since 3.0.0
   */
  async function runSmokeTest() {
    if (!smokeTestConfig.enabled) {
      return {
        skipped: true,
        reason: "smoke-test-disabled",
      };
    }

    armSmokeTestTimeout();
    updaterLogger.info("smoke-test-started", {
      feedUrl: smokeTestConfig.feedUrl || null,
      channel: smokeTestConfig.channel,
      stage: smokeTestConfig.stage || "update",
      expectedVersion: smokeTestConfig.expectedVersion || null,
      timeoutMs: smokeTestConfig.timeoutMs,
      autoInstallOnDownloaded: smokeTestConfig.autoInstallOnDownloaded,
      suppressDialogs: smokeTestConfig.suppressDialogs,
    });

    const verifyResult = verifyInstalledVersionForSmokeTest();
    if (!verifyResult.skipped) {
      return verifyResult;
    }

    const result = await checkForUpdates({
      manual: true,
      source: "smoke-test",
    });

    if (result?.skipped) {
      finalizeSmokeTest({
        success: false,
        status: "skipped",
        exitCode: SMOKE_TEST_UNSUPPORTED_EXIT_CODE,
        reason: result.reason,
      });
    } else if (result?.error) {
      finalizeSmokeTest({
        success: false,
        status: "check-error",
        exitCode: SMOKE_TEST_CHECK_ERROR_EXIT_CODE,
        error: result.error,
      });
    }

    return result;
  }

  function scheduleStartupCheck() {
    if (!smokeTestConfig.enabled) {
      const unsupportedReason = getUnsupportedReason();
      if (unsupportedReason) {
        return false;
      }
    }

    setTimeoutImpl(() => {
      const task = smokeTestConfig.enabled ? runSmokeTest() : checkForUpdates();
      task.catch((error) => {
        updaterLogger.error("startup-check-failed", {
          smokeTestEnabled: smokeTestConfig.enabled,
          error,
        });
      });
    }, smokeTestConfig.enabled ? smokeTestConfig.startupCheckDelayMs : startupCheckDelayMs);

    return true;
  }

  return {
    checkForUpdates,
    promptRestartToInstall,
    registerListeners,
    runSmokeTest,
    scheduleStartupCheck,
  };
}

module.exports = {
  DEFAULT_STARTUP_CHECK_DELAY_MS,
  DEFAULT_SMOKE_STARTUP_CHECK_DELAY_MS,
  DEFAULT_SMOKE_TIMEOUT_MS,
  SMOKE_TEST_CHECK_ERROR_EXIT_CODE,
  SMOKE_TEST_NO_UPDATE_EXIT_CODE,
  SMOKE_TEST_SUCCESS_EXIT_CODE,
  SMOKE_TEST_TIMEOUT_EXIT_CODE,
  SMOKE_TEST_UNSUPPORTED_EXIT_CODE,
  SMOKE_TEST_VERSION_MISMATCH_EXIT_CODE,
  createUpdaterLogger,
  createAppUpdater,
  formatReleaseNotes,
  hasPackagedUpdateConfig,
  parseBooleanEnv,
  parseIntegerEnv,
  resolvePackagedUpdateConfigPath,
  resolveUpdaterSmokeTestConfig,
  serializeForLog,
  clearUpdaterSmokeTestEnv,
};
