/**
 * @file Electron IPC 注册入口。
 * @description 负责把窗口、文件对话框、本地后端目录设置与主进程数据库能力
 * 通过受控 IPC 暴露给渲染层，统一收口桌面壳层可调用能力。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const crypto = require("crypto");
const { app, dialog, ipcMain } = require("electron");
const { initSQLite } = require("./db");
const { createSecureHandle } = require("./ipc-security");
const { createLocalBackendStorage } = require("./local-backend-storage");
const { applyLocalBackendRootDirChange } = require("./local-backend-runtime");

const allowedAppPathNames = new Set(["home", "userData", "temp", "documents", "downloads"]);
const localBackendStorage = createLocalBackendStorage({ app });

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

/**
 * 注册 Electron 主进程 IPC 处理器。
 * @param {{
 *   getMainWindow: () => import("electron").BrowserWindow | null,
 *   getRendererTrust: () => { allowedOrigins?: string[], allowedFilePaths?: string[] },
 *   localBackendStorage?: ReturnType<typeof createLocalBackendStorage>,
 *   onLocalBackendRootChanged?: (snapshot: { rootDir: string, source: string }) => Promise<void> | void
 * }} options IPC 依赖。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function registerIPCHandlers({
  getMainWindow,
  getRendererTrust,
  localBackendStorage: localBackendStorageFacade = localBackendStorage,
  onLocalBackendRootChanged,
}) {
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

  // 桌面本地后端设置统一从这里暴露，前端不需要直接了解 userData 配置文件细节。
  secureHandle("local-backend:get-state", async () => {
    return localBackendStorageFacade.getSnapshot();
  });

  secureHandle("local-backend:set-root-dir", async (_event, rootDir) => {
    return applyLocalBackendRootDirChange({
      localBackendStorage: localBackendStorageFacade,
      rootDir,
      onLocalBackendRootChanged,
    });
  });

  secureHandle("local-backend:choose-root-dir", async () => {
    const result = await dialog.showOpenDialog(getMainWindow(), {
      title: "选择本地后端根目录",
      defaultPath: localBackendStorageFacade.getCurrentRootDir(),
      properties: ["openDirectory", "createDirectory", "promptToCreate"],
    });

    if (result.canceled || !result.filePaths[0]) {
      return {
        canceled: true,
        ...localBackendStorageFacade.getSnapshot(),
      };
    }

    return {
      canceled: false,
      ...(await applyLocalBackendRootDirChange({
        localBackendStorage: localBackendStorageFacade,
        rootDir: result.filePaths[0],
        onLocalBackendRootChanged,
      })),
    };
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

module.exports = {
  registerIPCHandlers,
};
