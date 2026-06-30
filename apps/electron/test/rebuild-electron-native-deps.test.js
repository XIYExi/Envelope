/**
 * @file Electron 原生依赖重建脚本测试。
 * @description 聚焦 Windows 下包管理器入口解析、electron-builder 调用组装与 ABI 重建流程回归，
 * 尤其覆盖 `nvm + pnpm.cjs` 与无 sibling shim 的真实兼容场景。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  ELECTRON_BUILDER_CLI_MODULE,
  ELECTRON_NATIVE_DEPENDENCIES,
  createInstallAppDepsInvocation,
  getNativeDependenciesToRebuild,
  resolveElectronBuilderCliInvocation,
  resolveExecutablePackageManagerExecPath,
  resolvePackageManagerInvocation,
  runElectronNativeDependencyRebuild,
} = require("../scripts/rebuild-electron-native-deps");

/**
 * 创建测试临时目录。
 * @returns {string} 临时目录路径。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "envelope-electron-"));
}

/**
 * 删除测试临时目录。
 * @param {string} dirPath 临时目录路径。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function removeTempDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

/**
 * 写入测试夹具文件。
 * @param {string} filePath 文件路径。
 * @param {string} content 文件内容。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
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

test("resolvePackageManagerInvocation 优先复用当前包管理器入口，确保重建脚本跨平台可执行", () => {
  const invocation = resolvePackageManagerInvocation("/mock/pnpm.cjs");

  assert.equal(invocation.command, process.execPath);
  assert.deepEqual(invocation.args, ["/mock/pnpm.cjs"]);
});

test("resolvePackageManagerInvocation 遇到 cmd 包装入口时直接执行，避免再被 node 二次包裹", () => {
  const invocation = resolvePackageManagerInvocation("C:\\mock\\pnpm.cmd");

  assert.equal(invocation.command, "C:\\mock\\pnpm.cmd");
  assert.deepEqual(invocation.args, []);
});

test("resolvePackageManagerInvocation 在 Windows 上优先切到可执行 sibling shim，避免 Win32 application 错误", () => {
  const invocation = resolvePackageManagerInvocation("C:\\mock\\pnpm.ps1", {
    platform: "win32",
    existsSyncImpl(filePath) {
      return filePath === "C:\\mock\\pnpm.cmd";
    },
  });

  assert.equal(invocation.command, "C:\\mock\\pnpm.cmd");
  assert.deepEqual(invocation.args, []);
});

test("resolvePackageManagerInvocation 在 Windows 上遇到无扩展 shim 时同样补到 sibling 可执行入口", () => {
  const invocation = resolvePackageManagerInvocation("C:\\mock\\pnpm", {
    platform: "win32",
    existsSyncImpl(filePath) {
      return filePath === "C:\\mock\\pnpm.cmd";
    },
  });

  assert.equal(invocation.command, "C:\\mock\\pnpm.cmd");
  assert.deepEqual(invocation.args, []);
});

test("resolveExecutablePackageManagerExecPath 在 Windows 上把 npm_execpath 修正为可执行 shim", () => {
  const executablePath = resolveExecutablePackageManagerExecPath("C:\\mock\\pnpm.ps1", {
    platform: "win32",
    existsSyncImpl(filePath) {
      return filePath === "C:\\mock\\pnpm.cmd";
    },
  });

  assert.equal(executablePath, "C:\\mock\\pnpm.cmd");
});

test("resolveExecutablePackageManagerExecPath 在 Windows+nvm 的 pnpm.cjs 场景下会回退到 PATH 中的 pnpm.cmd", () => {
  const executablePath = resolveExecutablePackageManagerExecPath(
    "C:\\Users\\tester\\AppData\\Local\\nvm\\v20.19.6\\node_modules\\pnpm\\bin\\pnpm.cjs",
    {
      platform: "win32",
      pathEnv: "C:\\Users\\tester\\AppData\\Roaming\\npm;C:\\Windows\\System32",
      existsSyncImpl(filePath) {
        return filePath === "C:\\Users\\tester\\AppData\\Roaming\\npm\\pnpm.cmd";
      },
    }
  );

  assert.equal(executablePath, "C:\\Users\\tester\\AppData\\Roaming\\npm\\pnpm.cmd");
});

test("createInstallAppDepsInvocation 优先直连本地 electron-builder CLI，规避 Windows 包管理器包装差异", () => {
  const electronAppRoot = "D:\\workspace\\apps\\electron";
  const expectedCliPath = "D:\\workspace\\node_modules\\electron-builder\\out\\cli\\cli.js";
  const invocation = createInstallAppDepsInvocation(electronAppRoot, {
    resolveRequireImpl() {
      return expectedCliPath;
    },
    packageManagerExecPath: "/mock/pnpm.cjs",
  });

  assert.equal(invocation.command, process.execPath);
  assert.deepEqual(invocation.args, [expectedCliPath, "install-app-deps"]);
  assert.equal(invocation.options.cwd, electronAppRoot);
});

test("createInstallAppDepsInvocation 会给 electron-builder 透传真正可执行的 npm_execpath", () => {
  const electronAppRoot = "D:\\workspace\\apps\\electron";
  const expectedCliPath = "D:\\workspace\\node_modules\\electron-builder\\out\\cli\\cli.js";
  const invocation = createInstallAppDepsInvocation(electronAppRoot, {
    platform: "win32",
    packageManagerExecPath: "C:\\mock\\pnpm.ps1",
    existsSyncImpl(filePath) {
      return filePath === "C:\\mock\\pnpm.cmd";
    },
    resolveRequireImpl() {
      return expectedCliPath;
    },
  });

  assert.equal(invocation.command, process.execPath);
  assert.deepEqual(invocation.args, [expectedCliPath, "install-app-deps"]);
  assert.equal(invocation.options.env.npm_execpath, "C:\\mock\\pnpm.cmd");
});

test("createInstallAppDepsInvocation 在 Windows+nvm+pnpm.cjs 无 sibling shim 时改用 PATH 里的 pnpm.cmd", () => {
  const electronAppRoot = "D:\\workspace\\apps\\electron";
  const expectedCliPath = "D:\\workspace\\node_modules\\electron-builder\\out\\cli\\cli.js";
  const invocation = createInstallAppDepsInvocation(electronAppRoot, {
    platform: "win32",
    packageManagerExecPath: "C:\\Users\\tester\\AppData\\Local\\nvm\\v20.19.6\\node_modules\\pnpm\\bin\\pnpm.cjs",
    pathEnv: "C:\\Users\\tester\\AppData\\Roaming\\npm;C:\\Windows\\System32",
    existsSyncImpl(filePath) {
      return filePath === "C:\\Users\\tester\\AppData\\Roaming\\npm\\pnpm.cmd";
    },
    resolveRequireImpl() {
      return expectedCliPath;
    },
  });

  assert.equal(invocation.command, process.execPath);
  assert.deepEqual(invocation.args, [expectedCliPath, "install-app-deps"]);
  assert.equal(invocation.options.env.npm_execpath, "C:\\Users\\tester\\AppData\\Roaming\\npm\\pnpm.cmd");
});

test("resolveElectronBuilderCliInvocation 在本地 CLI 缺失时回退为 null", () => {
  const invocation = resolveElectronBuilderCliInvocation("D:\\workspace\\apps\\electron", {
    resolveRequireImpl() {
      throw new Error("not found");
    },
  });

  assert.equal(invocation, null);
});

test("runElectronNativeDependencyRebuild 调用当前 CLI 支持的 install-app-deps 形式重建 Electron ABI", () => {
  const electronAppRoot = createTempDir();
  const observedInvocations = [];
  const expectedCliPath = path.join(
    electronAppRoot,
    "node_modules",
    "electron-builder",
    "out",
    "cli",
    "cli.js"
  );

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
      packageManagerExecPath: "/mock/pnpm.cjs",
      resolveRequireImpl(request) {
        assert.equal(request, ELECTRON_BUILDER_CLI_MODULE);
        return expectedCliPath;
      },
      spawnSyncImpl(command, args, options) {
        observedInvocations.push({
          command,
          args,
          options,
        });
        return { status: 0 };
      },
    });
    const expectedInvocation = createInstallAppDepsInvocation(electronAppRoot, {
      packageManagerExecPath: "/mock/pnpm.cjs",
      resolveRequireImpl() {
        return expectedCliPath;
      },
    });

    assert.equal(result.skipped, false);
    assert.deepEqual(result.nativeDependencies, ["better-sqlite3"]);
    assert.equal(observedInvocations.length, 1);
    assert.equal(observedInvocations[0].command, expectedInvocation.command);
    assert.deepEqual(observedInvocations[0].args, expectedInvocation.args);
    assert.equal(observedInvocations[0].args.includes("exec"), false);
    assert.equal(observedInvocations[0].options.cwd, electronAppRoot);
    assert.equal(observedInvocations[0].options.stdio, "inherit");
  } finally {
    removeTempDir(electronAppRoot);
  }
});

test("runElectronNativeDependencyRebuild 会把 Windows shim 解析参数继续透传到 install-app-deps 调用", () => {
  const electronAppRoot = createTempDir();
  const observedInvocations = [];
  const packageManagerExecPath =
    "C:\\Users\\tester\\AppData\\Local\\nvm\\v20.19.6\\node_modules\\pnpm\\bin\\pnpm.cjs";
  const pathEnv = "C:\\Users\\tester\\AppData\\Roaming\\npm;C:\\Windows\\System32";
  const expectedCliPath = path.join(
    electronAppRoot,
    "node_modules",
    "electron-builder",
    "out",
    "cli",
    "cli.js"
  );

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
    runElectronNativeDependencyRebuild({
      electronAppRoot,
      platform: "win32",
      packageManagerExecPath,
      pathEnv,
      existsSyncImpl(filePath) {
        return filePath === "C:\\Users\\tester\\AppData\\Roaming\\npm\\pnpm.cmd";
      },
      resolveRequireImpl() {
        return expectedCliPath;
      },
      spawnSyncImpl(command, args, options) {
        observedInvocations.push({ command, args, options });
        return { status: 0 };
      },
    });

    assert.equal(observedInvocations.length, 1);
    assert.equal(observedInvocations[0].command, process.execPath);
    assert.deepEqual(observedInvocations[0].args, [expectedCliPath, "install-app-deps"]);
    assert.equal(
      observedInvocations[0].options.env.npm_execpath,
      "C:\\Users\\tester\\AppData\\Roaming\\npm\\pnpm.cmd"
    );
  } finally {
    removeTempDir(electronAppRoot);
  }
});
