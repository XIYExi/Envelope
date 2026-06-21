const crypto = require("crypto");
const { app, dialog, ipcMain } = require("electron");
const { initSQLite } = require("./db");
const { createSecureHandle } = require("./ipc-security");

const allowedAppPathNames = new Set(["userData", "temp", "documents", "downloads"]);

function sanitizeDialogFilters(filters) {
  if (!Array.isArray(filters)) {
    return undefined;
  }

  return filters
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      name: typeof item.name === "string" ? item.name : "",
      extensions: Array.isArray(item.extensions)
        ? item.extensions.filter((extension) => typeof extension === "string")
        : [],
    }))
    .filter((item) => item.name && item.extensions.length);
}

function sanitizeOpenDialogOptions(options) {
  if (!options || typeof options !== "object") return {};

  const out = {};
  if (typeof options.title === "string") out.title = options.title;
  if (typeof options.buttonLabel === "string") out.buttonLabel = options.buttonLabel;
  if (typeof options.defaultPath === "string") out.defaultPath = options.defaultPath;

  const filters = sanitizeDialogFilters(options.filters);
  if (filters) out.filters = filters;

  if (Array.isArray(options.properties)) {
    const allowed = new Set([
      "openFile",
      "openDirectory",
      "multiSelections",
      "createDirectory",
      "showHiddenFiles",
      "promptToCreate",
    ]);
    out.properties = options.properties.filter((name) => typeof name === "string" && allowed.has(name));
  }

  return out;
}

function sanitizeSaveDialogOptions(options) {
  if (!options || typeof options !== "object") return {};

  const out = {};
  if (typeof options.title === "string") out.title = options.title;
  if (typeof options.buttonLabel === "string") out.buttonLabel = options.buttonLabel;
  if (typeof options.defaultPath === "string") out.defaultPath = options.defaultPath;

  const filters = sanitizeDialogFilters(options.filters);
  if (filters) out.filters = filters;

  return out;
}

function registerIPCHandlers({ getMainWindow, getRendererTrust }) {
  const secureHandle = createSecureHandle(ipcMain, () => ({
    mainWindow: getMainWindow(),
    trust: getRendererTrust(),
  }));

  secureHandle("app:get-version", () => app.getVersion());

  secureHandle("app:get-path", (_event, name) => {
    if (typeof name !== "string" || !allowedAppPathNames.has(name)) return null;
    return app.getPath(name);
  });

  secureHandle("dialog:open-file", async (_event, options) => {
    const result = await dialog.showOpenDialog(
      getMainWindow(),
      sanitizeOpenDialogOptions(options)
    );
    return result;
  });

  secureHandle("dialog:save-file", async (_event, options) => {
    const result = await dialog.showSaveDialog(
      getMainWindow(),
      sanitizeSaveDialogOptions(options)
    );
    return result;
  });

  secureHandle("db:getProjects", async () => {
    const db = initSQLite();
    return db.prepare("SELECT * FROM projects ORDER BY updated_at DESC").all();
  });

  secureHandle("db:createProject", async (_event, project) => {
    const db = initSQLite();
    const id = project.id || crypto.randomUUID();
    db.prepare(
      "INSERT INTO projects (id, name, description, config) VALUES (?, ?, ?, ?)"
    ).run(id, project.name, project.description || "", JSON.stringify(project.config || {}));
    return db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  });

  secureHandle("db:updateProject", async (_event, id, updates) => {
    const db = initSQLite();
    const fields = [];
    const values = [];

    if (updates.name !== undefined) {
      fields.push("name = ?");
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push("description = ?");
      values.push(updates.description);
    }
    if (updates.config !== undefined) {
      fields.push("config = ?");
      values.push(JSON.stringify(updates.config));
    }
    if (fields.length === 0) return null;

    fields.push("updated_at = datetime('now')");
    values.push(id);
    db.prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`).run(...values);
    return db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  });

  secureHandle("db:deleteProject", async (_event, id) => {
    const db = initSQLite();
    db.prepare("DELETE FROM projects WHERE id = ?").run(id);
    return { success: true };
  });
}

module.exports = { registerIPCHandlers };
