/**
 * @file Electron 主进程入口。
 * @description 负责整合窗口创建、渲染入口解析、IPC 注册、应用菜单、
 * 自动更新调度与进程生命周期收尾，是桌面壳层的主编排入口。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const { app, BrowserWindow } = require("electron");
const path = require("path");
const { closeSQLite } = require("./db");
const {
  attachWindowErrorHandlers,
  createErrorReporter,
  registerProcessErrorHandlers,
} = require("./bootstrap/error-reporter");
const { createLoopbackServerManager } = require("./bootstrap/loopback-server");
const { resolveRendererLaunchPlan } = require("./bootstrap/renderer-entry-resolver");
const { registerIPCHandlers } = require("./ipc");
const { createLocalBackendStorage } = require("./local-backend-storage");
const { createApplicationMenu } = require("./menu");
const { createAppUpdater, resolveUpdaterSmokeTestConfig } = require("./updater");
const { createMainWindow } = require("./window");

let mainWindow = null;
let rendererLaunchPlan = {
  trust: {
    allowedOrigins: [],
    allowedFilePaths: [],
  },
};
const loopbackServerManager = createLoopbackServerManager();

const preloadPath = path.join(__dirname, "..", "preload", "preload.js");
const errorReporter = createErrorReporter({
  getMainWindow: () => mainWindow,
});
let appUpdater = null;
const localBackendStorage = createLocalBackendStorage({ app });

registerProcessErrorHandlers(errorReporter);

/**
 * 返回当前渲染入口允许的信任边界。
 * @returns {{ allowedOrigins?: string[], allowedFilePaths?: string[] }} 当前渲染信任配置。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function getRendererTrust() {
  return rendererLaunchPlan.trust;
}

/**
 * 在本地后端根目录变更后刷新当前 Electron 运行态。
 *
 * 处理策略：
 * - 先关闭主进程内缓存的 SQLite 连接，避免继续写旧数据库；
 * - 再停止当前 Next loopback runtime，让下一次加载重新带上新 local env；
 * - 若窗口已存在，则立即重新执行渲染加载流程，使本次修改在当前会话直接生效。
 *
 * @returns {Promise<void>} 刷新完成后结束。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function refreshRendererForLocalBackendRootChange() {
  closeSQLite();
  await loopbackServerManager.stop();

  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  rendererLaunchPlan = resolveRendererLaunchPlan({ app });
  await loadRenderer(mainWindow);
}

/**
 * 创建主窗口，或在窗口已存在时恢复并聚焦。
 * @returns {import("electron").BrowserWindow} 可用主窗口实例。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createOrFocusMainWindow() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
    return mainWindow;
  }

  // 每次新建窗口前都重新解析入口，确保 dev/prod 配置切换时不会复用过期结果。
  rendererLaunchPlan = resolveRendererLaunchPlan({ app });
  mainWindow = createMainWindow({ preloadPath });
  attachWindowErrorHandlers(mainWindow, errorReporter);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  return mainWindow;
}

/**
 * 按当前解析结果加载渲染层，并在失败时输出统一错误报告。
 * @param {import("electron").BrowserWindow} window 目标窗口实例。
 * @returns {Promise<void>} 加载完成后结束。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function loadRenderer(window) {
  const currentPlan = rendererLaunchPlan;
  if (currentPlan.kind === "unresolved") {
    await errorReporter.reportFatal({
      title: "未解析到可用的渲染入口",
      message: "当前启动模型已不再假设固定的 index.html，请改为显式提供可加载入口。",
      details: [
        `运行模式：${currentPlan.mode}`,
        `渲染目录：${currentPlan.rendererRoot}`,
        `已尝试策略：${currentPlan.checkedStrategies.join(", ") || "无"}`,
        ...currentPlan.suggestions,
      ],
    });
    return;
  }

  try {
    await currentPlan.load(window, {
      loopbackServerManager,
      localBackendStorage,
    });
    if (currentPlan.mode === "development") {
      window.webContents.openDevTools({ mode: "detach" });
    }
  } catch (error) {
    await errorReporter.reportFatal({
      title: "渲染入口加载失败",
      message: `已解析到入口，但 Electron 在实际启动或加载时失败：${currentPlan.description}`,
      details: [`入口：${currentPlan.entry}`],
      error,
    });
  }
}

app.whenReady().then(async () => {
  const smokeTestConfig = resolveUpdaterSmokeTestConfig({ app });
  appUpdater = createAppUpdater({
    app,
    getMainWindow: () => mainWindow,
    smokeTestConfig,
  });

  createApplicationMenu({
    getMainWindow: () => mainWindow,
    onCheckForUpdates: () => appUpdater?.checkForUpdates({ manual: true }),
    getAppVersion: () => app.getVersion(),
  });
  registerIPCHandlers({
    getMainWindow: () => mainWindow,
    getRendererTrust,
    localBackendStorage,
    onLocalBackendRootChanged: refreshRendererForLocalBackendRootChange,
  });
  const window = createOrFocusMainWindow();
  await loadRenderer(window);
  // 启动后稍作延迟再检查更新，避免与首屏渲染争抢 I/O 并减少启动抖动。
  appUpdater.scheduleStartupCheck();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const reopenedWindow = createOrFocusMainWindow();
      loadRenderer(reopenedWindow);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  loopbackServerManager.stop();
  closeSQLite();
});
