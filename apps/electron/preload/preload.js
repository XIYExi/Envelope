const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getVersion: () => ipcRenderer.invoke("app:get-version"),
  getPath: (name) => ipcRenderer.invoke("app:get-path", name),

  openFile: (options) => ipcRenderer.invoke("dialog:open-file", options),
  saveFile: (options) => ipcRenderer.invoke("dialog:save-file", options),

  dbQuery: (sql, ...params) => ipcRenderer.invoke("db:query", sql, params),

  on: (channel, callback) => {
    const validChannels = ["project:open", "navigate"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => callback(...args));
    }
  },

  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
});
