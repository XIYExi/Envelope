const { app, BrowserWindow } = require('electron');
const GLOBAL_CONFIG = require('./config/config.global');
const { isDevEnv } = require('./utils/util');
const setApplicationMenu = require('./utils/menu');
const setIpc = require('./ipc');

/* global 配置 */
global.GLOBAL_CONFIG = GLOBAL_CONFIG;

let mainWindow = null;

const MAIN_WINDOW_CONFIG = {
  height: 1000,
  width: 1580,
  webPreferences: {
    enableRemoteModule: true,
    nodeIntegration: true,
    contextIsolation: false,
  },
};

function createWindow() {
  mainWindow = new BrowserWindow(MAIN_WINDOW_CONFIG);

  if (isDevEnv()) {
    // 开发环境
    // const installDevtoolExt = require('./utils/installDevtoolExt');
    // 安装调试工具拓展
    // installDevtoolExt();

    mainWindow.loadURL('http://localhost:8000');
    //mainWindow.webContents.openDevTools();
  } else {
    //生产环境
    //暂不予考虑
    mainWindow.loadFile(`dist/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  setApplicationMenu(mainWindow);
  // 更新逻辑，两个方案选一
  // 1.基于electron-updater 和静态文件服务
  // const appUpdater = new AppUpdater(mainWindow);

  // 2.基于自带的 autoUpdate 和包版本管理服务
  // const appUpdater = new AppAutoUpdater(mainWindow);

  setIpc(mainWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
