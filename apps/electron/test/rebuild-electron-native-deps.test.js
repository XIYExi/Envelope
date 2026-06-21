const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  ELECTRON_NATIVE_DEPENDENCIES,
  createInstallAppDepsInvocation,
  getNativeDependenciesToRebuild,
  runElectronNativeDependencyRebuild,
} = require("../scripts/rebuild-electron-native-deps");

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "envelope-electron-"));
}

function removeTempDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

test("getNativeDependenciesToRebuild 仅返回当前 Electron 包声明过的原生依赖", () => {
  const nativeDependencies = getNativeDependenciesToRebuild({
    dependencies: {
      "better-sqlite3": "^11.10.0",
      react: "^18.3.0",
    },
  });

  assert.deepEqual(nativeDependencies, ELECTRON_NATIVE_DEPENDENCIES);
});

test("runElectronNativeDependencyRebuild 调用 electron-builder install-app-deps 重建 Electron ABI", () => {
  const electronAppRoot = createTempDir();
  const observedInvocations = [];

  writeFile(
    path.join(electronAppRoot, "package.json"),
    JSON.stringify(
      {
        name: "@envelope/electron",
        dependencies: {
          "better-sqlite3": "^11.10.0",
        },
      },
      null,
      2
    )
  );

  try {
    const result = runElectronNativeDependencyRebuild({
      electronAppRoot,
      spawnSyncImpl(command, args, options) {
        observedInvocations.push({
          command,
          args,
          options,
        });
        return { status: 0 };
      },
    });
    const expectedInvocation = createInstallAppDepsInvocation(electronAppRoot);

    assert.equal(result.skipped, false);
    assert.deepEqual(result.nativeDependencies, ["better-sqlite3"]);
    assert.equal(observedInvocations.length, 1);
    assert.equal(observedInvocations[0].command, expectedInvocation.command);
    assert.deepEqual(observedInvocations[0].args, expectedInvocation.args);
    assert.equal(observedInvocations[0].options.cwd, electronAppRoot);
    assert.equal(observedInvocations[0].options.stdio, "inherit");
  } finally {
    removeTempDir(electronAppRoot);
  }
});
