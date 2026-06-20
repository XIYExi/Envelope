const { contextBridge, ipcRenderer } = require("electron");

const allowedAppPathNames = new Set(["userData", "temp", "documents", "downloads"]);

function sanitizeOpenDialogOptions(options) {
  if (!options || typeof options !== "object") return {};
  const out = {};
  if (typeof options.title === "string") out.title = options.title;
  if (typeof options.buttonLabel === "string") out.buttonLabel = options.buttonLabel;
  if (typeof options.defaultPath === "string") out.defaultPath = options.defaultPath;
  if (Array.isArray(options.filters)) {
    out.filters = options.filters
      .filter((f) => f && typeof f === "object")
      .map((f) => ({
        name: typeof f.name === "string" ? f.name : "",
        extensions: Array.isArray(f.extensions) ? f.extensions.filter((e) => typeof e === "string") : [],
      }))
      .filter((f) => f.name && f.extensions.length);
  }
  if (Array.isArray(options.properties)) {
    const allowed = new Set([
      "openFile",
      "openDirectory",
      "multiSelections",
      "createDirectory",
      "showHiddenFiles",
      "promptToCreate",
    ]);
    out.properties = options.properties.filter((p) => typeof p === "string" && allowed.has(p));
  }
  return out;
}

function sanitizeSaveDialogOptions(options) {
  if (!options || typeof options !== "object") return {};
  const out = {};
  if (typeof options.title === "string") out.title = options.title;
  if (typeof options.buttonLabel === "string") out.buttonLabel = options.buttonLabel;
  if (typeof options.defaultPath === "string") out.defaultPath = options.defaultPath;
  if (Array.isArray(options.filters)) {
    out.filters = options.filters
      .filter((f) => f && typeof f === "object")
      .map((f) => ({
        name: typeof f.name === "string" ? f.name : "",
        extensions: Array.isArray(f.extensions) ? f.extensions.filter((e) => typeof e === "string") : [],
      }))
      .filter((f) => f.name && f.extensions.length);
  }
  return out;
}

contextBridge.exposeInMainWorld("electronAPI", {
  getVersion: () => ipcRenderer.invoke("app:get-version"),
  getPath: (name) => {
    if (typeof name !== "string" || !allowedAppPathNames.has(name)) return Promise.resolve(null);
    return ipcRenderer.invoke("app:get-path", name);
  },

  openFile: (options) => ipcRenderer.invoke("dialog:open-file", sanitizeOpenDialogOptions(options)),
  saveFile: (options) => ipcRenderer.invoke("dialog:save-file", sanitizeSaveDialogOptions(options)),

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
