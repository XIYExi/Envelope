const path = require("path");

function fileUrlToPath(urlStr) {
  const u = new URL(urlStr);
  let p = decodeURIComponent(u.pathname);
  if (/^\/[a-zA-Z]:\//.test(p)) p = p.slice(1);
  return path.normalize(p);
}

function normalizeOrigin(urlStr) {
  try {
    return new URL(urlStr).origin;
  } catch {
    return null;
  }
}

function isAllowedRendererUrl(urlStr, trust = {}) {
  if (!urlStr) return false;

  const allowedOrigins = Array.isArray(trust.allowedOrigins)
    ? trust.allowedOrigins
    : Array.isArray(trust.origins)
      ? trust.origins
      : [];
  const allowedFilePaths = Array.isArray(trust.allowedFilePaths)
    ? trust.allowedFilePaths
    : Array.isArray(trust.filePaths)
      ? trust.filePaths
      : [];

  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return false;
  }

  if (u.protocol === "http:" || u.protocol === "https:") {
    return allowedOrigins
      .map((origin) => normalizeOrigin(origin))
      .filter(Boolean)
      .includes(u.origin);
  }

  if (u.protocol !== "file:") return false;

  const actual = path.resolve(fileUrlToPath(urlStr)).toLowerCase();
  return allowedFilePaths
    .map((filePath) => path.resolve(filePath).toLowerCase())
    .includes(actual);
}

function assertTrustedIpcEvent(event, { mainWindow, trust }) {
  if (!mainWindow) throw new Error("Unauthorized IPC sender");
  if (event.sender.id !== mainWindow.webContents.id) throw new Error("Unauthorized IPC sender");
  if (!event.senderFrame) throw new Error("Unauthorized IPC frame");
  if (event.senderFrame !== mainWindow.webContents.mainFrame) throw new Error("Unauthorized IPC frame");

  const url = event.senderFrame.url;
  if (!isAllowedRendererUrl(url, trust || {})) {
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
