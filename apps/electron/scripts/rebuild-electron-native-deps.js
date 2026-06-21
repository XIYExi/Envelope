const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ELECTRON_NATIVE_DEPENDENCIES = ["better-sqlite3"];

function readJsonFile(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`读取 ${label} 失败：${filePath}\n${error.message}`);
  }
}

function getNativeDependenciesToRebuild(packageJson) {
  const declaredDependencies = packageJson.dependencies || {};
  return ELECTRON_NATIVE_DEPENDENCIES.filter((dependencyName) =>
    Object.prototype.hasOwnProperty.call(declaredDependencies, dependencyName)
  );
}

function createInstallAppDepsInvocation(electronAppRoot) {
  return {
    command: process.platform === "win32" ? "pnpm.cmd" : "pnpm",
    args: ["exec", "electron-builder", "install-app-deps", "--config", "electron-builder.config.js"],
    options: {
      cwd: electronAppRoot,
      env: {
        ...process.env,
      },
      stdio: "inherit",
    },
  };
}

function runElectronNativeDependencyRebuild(options = {}) {
  const electronAppRoot = options.electronAppRoot || path.resolve(__dirname, "..");
  const spawnSyncImpl = options.spawnSyncImpl || spawnSync;
  const packageJsonPath = path.join(electronAppRoot, "package.json");
  const packageJson = readJsonFile(packageJsonPath, "Electron package.json");
  const nativeDependencies = getNativeDependenciesToRebuild(packageJson);

  if (nativeDependencies.length === 0) {
    return {
      skipped: true,
      nativeDependencies,
    };
  }

  const invocation = createInstallAppDepsInvocation(electronAppRoot);
  // traced runtime 会把工作区里的 native binary 直接复制进 platform-build，因此必须先把 ABI 重建到 Electron 版本。
  const result = spawnSyncImpl(invocation.command, invocation.args, invocation.options);

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `Electron 原生依赖重建失败（${nativeDependencies.join(", ")}），退出码：${result.status}`
    );
  }

  return {
    skipped: false,
    nativeDependencies,
    command: invocation.command,
    args: invocation.args,
  };
}

function main() {
  runElectronNativeDependencyRebuild();
}

if (require.main === module) {
  main();
}

module.exports = {
  ELECTRON_NATIVE_DEPENDENCIES,
  createInstallAppDepsInvocation,
  getNativeDependenciesToRebuild,
  runElectronNativeDependencyRebuild,
};
