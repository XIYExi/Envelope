/**
 * @file 本地后端运行态切换测试。
 * @description 验证用户修改本地后端根目录后，当前 Electron 会话会立即触发
 * 运行态刷新逻辑，而不是只把路径写入配置文件等待下次启动。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const test = require("node:test");
const assert = require("node:assert/strict");

const { applyLocalBackendRootDirChange } = require("../main/local-backend-runtime");

test("applyLocalBackendRootDirChange 会先持久化新根目录再触发运行态刷新", async () => {
  const calls = [];
  const expectedSnapshot = {
    rootDir: "D:\\workspace\\envelope-data",
    source: "persisted",
  };

  const snapshot = await applyLocalBackendRootDirChange({
    localBackendStorage: {
      setRootDir(rootDir) {
        calls.push(`set:${rootDir}`);
        return expectedSnapshot;
      },
    },
    rootDir: expectedSnapshot.rootDir,
    onLocalBackendRootChanged(nextSnapshot) {
      calls.push(`refresh:${nextSnapshot.rootDir}`);
    },
  });

  assert.deepEqual(snapshot, expectedSnapshot);
  assert.deepEqual(calls, [
    `set:${expectedSnapshot.rootDir}`,
    `refresh:${expectedSnapshot.rootDir}`,
  ]);
});

test("applyLocalBackendRootDirChange 在没有刷新回调时也能返回持久化结果", async () => {
  const snapshot = await applyLocalBackendRootDirChange({
    localBackendStorage: {
      setRootDir(rootDir) {
        return {
          rootDir,
          source: "persisted",
        };
      },
    },
    rootDir: "D:\\workspace\\second",
  });

  assert.deepEqual(snapshot, {
    rootDir: "D:\\workspace\\second",
    source: "persisted",
  });
});
