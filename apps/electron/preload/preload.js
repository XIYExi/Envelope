const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getVersion: () => ipcRenderer.invoke("app:get-version"),
  getPath: (name) => ipcRenderer.invoke("app:get-path", name),

  openFile: (options) => ipcRenderer.invoke("dialog:open-file", options),
  saveFile: (options) => ipcRenderer.invoke("dialog:save-file", options),

  getProjects: () => ipcRenderer.invoke("db:getProjects"),
  createProject: (project) => ipcRenderer.invoke("db:createProject", project),
  updateProject: (id, updates) => ipcRenderer.invoke("db:updateProject", id, updates),
  deleteProject: (id) => ipcRenderer.invoke("db:deleteProject", id),

  on: (channel, callback) => {
    const validChannels = ["project:open", "navigate"];
    if (validChannels.includes(channel)) {
      const listener = (_event, ...args) => callback(...args);
      ipcRenderer.on(channel, listener);
      return () => ipcRenderer.removeListener(channel, listener);
    }
  },
});
