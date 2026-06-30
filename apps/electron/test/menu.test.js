const test = require("node:test");
const assert = require("node:assert/strict");

const { buildApplicationMenuTemplate } = require("../main/menu");

test("帮助菜单包含检查更新入口并触发回调", async () => {
  let checkForUpdatesCalls = 0;
  const template = buildApplicationMenuTemplate({
    getMainWindow() {
      return null;
    },
    onCheckForUpdates() {
      checkForUpdatesCalls += 1;
    },
    getAppVersion() {
      return "3.1.0";
    },
    dialogImpl: {
      async showOpenDialog() {
        return { canceled: true, filePaths: [] };
      },
      async showMessageBox() {
        return { response: 0 };
      },
    },
  });

  const helpMenu = template.find((item) => item.label === "Help");
  const checkUpdatesItem = helpMenu.submenu.find(
    (item) => item.label === "Check for Updates..."
  );

  await checkUpdatesItem.click();

  assert.equal(checkForUpdatesCalls, 1);
});

test("关于对话框展示传入的应用版本号", async () => {
  const dialogs = [];
  const template = buildApplicationMenuTemplate({
    getMainWindow() {
      return null;
    },
    getAppVersion() {
      return "3.2.0";
    },
    dialogImpl: {
      async showOpenDialog() {
        return { canceled: true, filePaths: [] };
      },
      async showMessageBox(_window, options) {
        dialogs.push(options);
        return { response: 0 };
      },
    },
  });

  const helpMenu = template.find((item) => item.label === "Help");
  const aboutItem = helpMenu.submenu.find((item) => item.label === "About Envelope");

  await aboutItem.click();

  assert.equal(dialogs.length, 1);
  assert.equal(dialogs[0].message, "Envelope v3.2.0");
});
