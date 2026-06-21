const { Menu, dialog } = require("electron");

function createApplicationMenu({ getMainWindow }) {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Project...",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const mainWindow = getMainWindow();
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ["openDirectory"],
              title: "Open Envelope Project",
            });

            if (!result.canceled && result.filePaths[0] && mainWindow && !mainWindow.isDestroyed()) {
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
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click: () => {
            const mainWindow = getMainWindow();
            if (mainWindow && !mainWindow.isDestroyed()) {
              mainWindow.webContents.send("navigate", "/docs");
            }
          },
        },
        {
          label: "About Envelope",
          click: () => {
            const mainWindow = getMainWindow();
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

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = { createApplicationMenu };
