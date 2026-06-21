/**
 * @file Electron Builder 配置回归测试。
 * @description 聚焦 `electron-updater` 传递依赖文件映射生成逻辑，
 * 防止 pnpm workspace 下再次遗漏运行时必需依赖。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const builderConfig = require("../electron-builder.config");

const {
  createElectronUpdaterDependencyFileSets,
} = require("../scripts/electron-builder-dependency-files");

/**
 * 创建一个最小化的包解析桩，便于在测试里构造依赖图。
 * @param {Record<string, string>} packageJsonPathMap 包到 package.json 的映射。
 * @returns {typeof require.resolve} 兼容 require.resolve 的解析函数。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createResolvePackageJsonStub(packageJsonPathMap) {
  return function resolvePackageJson(request) {
    const packageName = request.replace(/\/package\.json$/u, "");
    const packageJsonPath = packageJsonPathMap[packageName];
    if (!packageJsonPath) {
      throw new Error(`未定义测试桩包路径：${packageName}`);
    }

    return packageJsonPath;
  };
}

test("createElectronUpdaterDependencyFileSets 会递归铺平 electron-updater 传递依赖", () => {
  const packageJsonPathMap = {
    "electron-updater": "D:\\store\\electron-updater\\package.json",
    "builder-util-runtime": "D:\\store\\builder-util-runtime\\package.json",
    "fs-extra": "D:\\store\\fs-extra\\package.json",
    jsonfile: "D:\\store\\jsonfile\\package.json",
  };
  const packageJsonContentMap = {
    "D:\\store\\electron-updater\\package.json": {
      name: "electron-updater",
      dependencies: {
        "builder-util-runtime": "^9.7.0",
        "fs-extra": "^10.1.0",
      },
    },
    "D:\\store\\builder-util-runtime\\package.json": {
      name: "builder-util-runtime",
      dependencies: {},
    },
    "D:\\store\\fs-extra\\package.json": {
      name: "fs-extra",
      dependencies: {
        jsonfile: "^6.1.0",
      },
    },
    "D:\\store\\jsonfile\\package.json": {
      name: "jsonfile",
      dependencies: {},
    },
  };

  const fileSets = createElectronUpdaterDependencyFileSets({
    resolveRequireImpl: createResolvePackageJsonStub(packageJsonPathMap),
    readFileSyncImpl(filePath) {
      return JSON.stringify(packageJsonContentMap[filePath]);
    },
    pathImpl: path.win32,
  });

  assert.deepEqual(
    fileSets.map((fileSet) => fileSet.to).sort(),
    [
      "node_modules\\builder-util-runtime",
      "node_modules\\fs-extra",
      "node_modules\\jsonfile",
    ]
  );
  assert.deepEqual(
    fileSets.map((fileSet) => fileSet.from).sort(),
    [
      "D:\\store\\builder-util-runtime",
      "D:\\store\\fs-extra",
      "D:\\store\\jsonfile",
    ]
  );
});

test("electron-builder 会把 traced runtime 放到真实 resources 目录而不是 app.asar", () => {
  const stringFileEntries = builderConfig.files.filter((entry) => typeof entry === "string");

  assert.equal(
    stringFileEntries.some((entry) => entry.includes("platform-build")),
    false
  );
  assert.deepEqual(builderConfig.extraResources, [
    {
      from: "platform-build",
      to: "platform-build",
      filter: ["**/*"],
    },
  ]);
});
