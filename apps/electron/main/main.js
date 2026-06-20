const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { initSQLite } = require("./db");
const { createSecureHandle } = require("./ipc-security");

const isDev = process.env.NODE_ENV === "development";
const prodRendererPath = path.join(__dirname, "..", "platform-build", "server", "app", "index.html");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1580,
    height: 1000,
    minWidth: 1024,
    minHeight: 700,
    title: "Envelope",
    webPreferences: {
      preload: path.join(__dirname, "..", "preload", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    if (fs.existsSync(prodRendererPath)) {
      mainWindow.loadFile(prodRendererPath);
    } else {
      dialog.showErrorBox(
        "Render Error",
        "Production renderer not found. Build the platform first:\n  pnpm --filter=@envelope/platform build\n\nExpected: " + prodRendererPath
      );
      app.quit();
    }
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Project...",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ["openDirectory"],
              title: "Open Envelope Project",
            });
            if (!result.canceled && result.filePaths[0]) {
              mainWindow.webContents.send("project:open", result.filePaths[0]);
            }
          },
        },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" },
        { type: "separator" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "close" },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click: () => {
            mainWindow.webContents.send("navigate", "/docs");
          },
        },
        {
          label: "About Envelope",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "About Envelope",
              message: "Envelope v3.0.0",
              detail: "Full-stack lowcode project generation platform.\nDesign complete Next.js applications visually.",
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function registerIPC() {
  const secureHandle = createSecureHandle(ipcMain, () => ({
    mainWindow,
    isDev,
    expectedFilePath: isDev ? null : prodRendererPath,
  }));

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

  secureHandle("app:get-version", () => app.getVersion());

  secureHandle("app:get-path", (_event, name) => {
    if (typeof name !== "string" || !allowedAppPathNames.has(name)) return null;
    return app.getPath(name);
  });

  secureHandle("dialog:open-file", async (_event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, sanitizeOpenDialogOptions(options));
    return result;
  });

  secureHandle("dialog:save-file", async (_event, options) => {
    const result = await dialog.showSaveDialog(mainWindow, sanitizeSaveDialogOptions(options));
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
      `INSERT INTO projects (id, name, description, config) VALUES (?, ?, ?, ?)`
    ).run(id, project.name, project.description || "", JSON.stringify(project.config || {}));
    return db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  });

  secureHandle("db:updateProject", async (_event, id, updates) => {
    const db = initSQLite();
    const fields = [];
    const values = [];
    if (updates.name !== undefined) { fields.push("name = ?"); values.push(updates.name); }
    if (updates.description !== undefined) { fields.push("description = ?"); values.push(updates.description); }
    if (updates.config !== undefined) { fields.push("config = ?"); values.push(JSON.stringify(updates.config)); }
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

app.whenReady().then(() => {
  createMenu();
  registerIPC();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
