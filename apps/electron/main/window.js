const { BrowserWindow } = require("electron");

function createMainWindow({ preloadPath }) {
  const window = new BrowserWindow({
    width: 1580,
    height: 1000,
    minWidth: 1024,
    minHeight: 700,
    title: "Envelope",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  });

  window.once("ready-to-show", () => {
    if (!window.isDestroyed()) {
      window.show();
    }
  });

  return window;
}

module.exports = { createMainWindow };
