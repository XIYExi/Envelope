const path = require("path");

function fileUrlToPath(urlStr) {
  const u = new URL(urlStr);
  let p = decodeURIComponent(u.pathname);
  if (/^\/[a-zA-Z]:\//.test(p)) p = p.slice(1);
  return path.normalize(p);
}

function isAllowedRendererUrl(urlStr, { isDev, expectedFilePath }) {
  if (!urlStr) return false;
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return false;
  }

  if (isDev) {
    return u.origin === "http://localhost:3000" || u.origin === "http://127.0.0.1:3000";
  }

  if (u.protocol !== "file:") return false;
  if (!expectedFilePath) return false;

  const actual = path.resolve(fileUrlToPath(urlStr)).toLowerCase();
  const expected = path.resolve(expectedFilePath).toLowerCase();
  return actual === expected;
}

function assertTrustedIpcEvent(event, { mainWindow, isDev, expectedFilePath }) {
  if (!mainWindow) throw new Error("Unauthorized IPC sender");
  if (event.sender.id !== mainWindow.webContents.id) throw new Error("Unauthorized IPC sender");
  if (!event.senderFrame) throw new Error("Unauthorized IPC frame");
  if (event.senderFrame !== mainWindow.webContents.mainFrame) throw new Error("Unauthorized IPC frame");

  const url = event.senderFrame.url;
  if (!isAllowedRendererUrl(url, { isDev, expectedFilePath })) {
    throw new Error("Unauthorized IPC origin");
  }
}

function createSecureHandle(ipcMain, getOptions) {
  return function secureHandle(channel, handler) {
    ipcMain.handle(channel, async (event, ...args) => {
      assertTrustedIpcEvent(event, getOptions());
      return handler(event, ...args);
    });
  };
}

module.exports = { createSecureHandle };
