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
const { createApplicationMenu } = require("./menu");
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

registerProcessErrorHandlers(errorReporter);

function getRendererTrust() {
  return rendererLaunchPlan.trust;
}

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
  createApplicationMenu({
    getMainWindow: () => mainWindow,
  });
  registerIPCHandlers({
    getMainWindow: () => mainWindow,
    getRendererTrust,
  });
  const window = createOrFocusMainWindow();
  await loadRenderer(window);

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
