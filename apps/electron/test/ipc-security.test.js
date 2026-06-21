const test = require("node:test");
const assert = require("node:assert/strict");

const { createSecureHandle } = require("../main/ipc-security");

test("createSecureHandle 仅放行 trust.allowedOrigins 中声明的渲染来源", async () => {
  let registeredHandler = null;
  const ipcMain = {
    handle(_channel, handler) {
      registeredHandler = handler;
    },
  };
  const mainFrame = {
    url: "http://127.0.0.1:3000/",
  };
  const mainWindow = {
    webContents: {
      id: 7,
      mainFrame,
    },
  };
  const secureHandle = createSecureHandle(ipcMain, () => ({
    mainWindow,
    trust: {
      allowedOrigins: ["http://127.0.0.1:3000"],
      allowedFilePaths: [],
    },
  }));

  secureHandle("app:get-version", async () => "3.0.0");

  const accepted = await registeredHandler({
    sender: { id: 7 },
    senderFrame: mainFrame,
  });
  assert.equal(accepted, "3.0.0");

  mainFrame.url = "https://evil.example.com/";
  await assert.rejects(
    () =>
      registeredHandler({
        sender: { id: 7 },
        senderFrame: mainFrame,
      }),
    /Unauthorized IPC origin/
  );
});
