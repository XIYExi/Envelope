/**
 * @file Electron 应用菜单模块。
 * @description 负责构建 File/Edit/View/Window/Help 菜单，并把项目打开、
 * 文档导航、关于弹窗和手动检查更新等动作路由到主进程能力。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

/**
 * 构建可测试的应用菜单模板。
 * @param {{
 *   getMainWindow: () => import("electron").BrowserWindow | null,
 *   onCheckForUpdates?: () => Promise<unknown> | unknown,
 *   getAppVersion?: () => string,
 *   dialogImpl: import("electron").Dialog
 * }} options 菜单依赖。
 * @returns {import("electron").MenuItemConstructorOptions[]} Electron 菜单模板。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function buildApplicationMenuTemplate({
  getMainWindow,
  onCheckForUpdates = async () => {},
  getAppVersion = () => "unknown",
  dialogImpl,
}) {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Project...",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const mainWindow = getMainWindow();
            const result = await dialogImpl.showOpenDialog(mainWindow, {
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
          label: "Check for Updates...",
          click: () => onCheckForUpdates(),
        },
        { type: "separator" },
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
            dialogImpl.showMessageBox(mainWindow, {
              type: "info",
              title: "About Envelope",
              message: `Envelope v${getAppVersion()}`,
              detail: "Full-stack lowcode project generation platform.\nDesign complete Next.js applications visually.",
            });
          },
        },
      ],
    },
  ];

  return template;
}

/**
 * 创建并注册应用菜单。
 * @param {{
 *   getMainWindow: () => import("electron").BrowserWindow | null,
 *   onCheckForUpdates?: () => Promise<unknown> | unknown,
 *   getAppVersion?: () => string
 * }} options 菜单依赖。
 * @returns {import("electron").MenuItemConstructorOptions[]} 已注册的菜单模板。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createApplicationMenu({ getMainWindow, onCheckForUpdates, getAppVersion }) {
  const { Menu, dialog } = require("electron");
  const template = buildApplicationMenuTemplate({
    getMainWindow,
    onCheckForUpdates,
    getAppVersion,
    dialogImpl: dialog,
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  return template;
}

module.exports = { buildApplicationMenuTemplate, createApplicationMenu };
