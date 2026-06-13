const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const { initSQLite } = require("./db");

const isDev = process.env.NODE_ENV === "development";

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
    mainWindow.loadFile(path.join(__dirname, "..", "..", "platform", ".next", "server", "app", "index.html"));
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
  ipcMain.handle("app:get-version", () => app.getVersion());

  ipcMain.handle("app:get-path", (_event, name) => app.getPath(name));

  ipcMain.handle("dialog:open-file", async (_event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, options);
    return result;
  });

  ipcMain.handle("dialog:save-file", async (_event, options) => {
    const result = await dialog.showSaveDialog(mainWindow, options);
    return result;
  });

  ipcMain.handle("db:getProjects", async () => {
    const db = initSQLite();
    return db.prepare("SELECT * FROM projects ORDER BY updated_at DESC").all();
  });

  ipcMain.handle("db:createProject", async (_event, project) => {
    const db = initSQLite();
    const id = project.id || crypto.randomUUID();
    db.prepare(
      `INSERT INTO projects (id, name, description, config) VALUES (?, ?, ?, ?)`
    ).run(id, project.name, project.description || "", JSON.stringify(project.config || {}));
    return db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  });

  ipcMain.handle("db:updateProject", async (_event, id, updates) => {
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

  ipcMain.handle("db:deleteProject", async (_event, id) => {
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
