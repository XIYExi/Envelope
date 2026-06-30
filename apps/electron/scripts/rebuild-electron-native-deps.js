/**
 * @file Electron 原生依赖重建脚本。
 * @description 负责在 Electron 打包前重建 `better-sqlite3` 等原生依赖的 ABI，
 * 同时兼容 Windows 下 `nvm + pnpm.cjs`、PowerShell shim 与 PATH 可执行入口的差异。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ELECTRON_NATIVE_DEPENDENCIES = ["better-sqlite3"];
const ELECTRON_BUILDER_CLI_MODULE = "electron-builder/out/cli/cli.js";
const NODE_SCRIPT_EXTENSIONS = new Set([".js", ".cjs", ".mjs"]);
const WINDOWS_NATIVE_COMMAND_EXTENSIONS = new Set([".exe", ".cmd", ".bat", ".com"]);
const WINDOWS_PATH_ENV_KEYS = ["PATH", "Path"];

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

function resolveExistingSiblingCommand(execPath, options = {}) {
  const existsSyncImpl = options.existsSyncImpl || fs.existsSync;
  const parsedPath = path.parse(execPath);

  for (const extension of WINDOWS_NATIVE_COMMAND_EXTENSIONS) {
    const siblingPath = path.join(parsedPath.dir, `${parsedPath.name}${extension}`);
    if (existsSyncImpl(siblingPath)) {
      return {
        command: siblingPath,
        args: [],
      };
    }
  }

  return null;
}

/**
 * 从 PATH 中解析 Windows 可执行命令。
 * @param {string} commandName 目标命令名，不含扩展名。
 * @param {{ existsSyncImpl?: typeof fs.existsSync, pathEnv?: string }} [options] 可选依赖。
 * @returns {string | null} 命中的可执行文件绝对路径；未命中时返回 null。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolveCommandFromPath(commandName, options = {}) {
  const existsSyncImpl = options.existsSyncImpl || fs.existsSync;
  const pathEnv =
    options.pathEnv ||
    WINDOWS_PATH_ENV_KEYS.map((key) => process.env[key]).find(
      (value) => typeof value === "string" && value.length > 0
    );

  if (!commandName || !pathEnv) {
    return null;
  }

  for (const dirPath of pathEnv.split(path.delimiter)) {
    if (!dirPath) {
      continue;
    }

    for (const extension of WINDOWS_NATIVE_COMMAND_EXTENSIONS) {
      const candidatePath = path.join(dirPath, `${commandName}${extension}`);
      if (existsSyncImpl(candidatePath)) {
        return candidatePath;
      }
    }
  }

  return null;
}

/**
 * 在 Windows 环境中为包管理器入口解析真正可执行的命令。
 * @param {string} execPath npm_execpath 或包管理器入口路径。
 * @param {{ existsSyncImpl?: typeof fs.existsSync, pathEnv?: string }} [options] 解析依赖。
 * @returns {{ command: string, args: string[] } | null} 可执行命令调用描述。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolveExistingWindowsCommand(execPath, options = {}) {
  const siblingCommandInvocation = resolveExistingSiblingCommand(execPath, {
    existsSyncImpl: options.existsSyncImpl,
  });
  if (siblingCommandInvocation) {
    return siblingCommandInvocation;
  }

  const commandFromPath = resolveCommandFromPath(path.parse(execPath).name, {
    existsSyncImpl: options.existsSyncImpl,
    pathEnv: options.pathEnv,
  });
  if (commandFromPath) {
    return {
      command: commandFromPath,
      args: [],
    };
  }

  return null;
}

/**
 * 解析包管理器实际调用方式。
 * @param {string | undefined} packageManagerExecPath 当前环境传入的 npm_execpath。
 * @param {{ platform?: NodeJS.Platform, existsSyncImpl?: typeof fs.existsSync, pathEnv?: string }} [options] 运行时选项。
 * @returns {{ command: string, args: string[] }} 子进程调用描述。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolvePackageManagerInvocation(packageManagerExecPath = process.env.npm_execpath, options = {}) {
  const platform = options.platform || process.platform;

  if (packageManagerExecPath) {
    // 复用当前脚本所在的包管理器入口，避免直接依赖 pnpm / pnpm.cmd 的平台差异。
    const normalizedExecPath = packageManagerExecPath.toLowerCase();
    const execExtension = path.extname(normalizedExecPath);
    const shouldInvokeViaNode = NODE_SCRIPT_EXTENSIONS.has(execExtension);

    if (!shouldInvokeViaNode) {
      if (WINDOWS_NATIVE_COMMAND_EXTENSIONS.has(execExtension)) {
        return {
          command: packageManagerExecPath,
          args: [],
        };
      }

      if (platform === "win32") {
        // nvm / Corepack / pnpm 的 Windows 安装形态比较分裂：
        // npm_execpath 既可能是 .ps1、无扩展 shim，也可能只有 PATH 里存在 pnpm.cmd。
        // 这里先查同目录，再回退到 PATH，避免把不可执行入口直接交给 spawn。
        const windowsCommandInvocation = resolveExistingWindowsCommand(packageManagerExecPath, {
          existsSyncImpl: options.existsSyncImpl,
          pathEnv: options.pathEnv,
        });
        if (windowsCommandInvocation) {
          return windowsCommandInvocation;
        }
      }

      return {
        command: packageManagerExecPath,
        args: [],
      };
    }

    return {
      command: process.execPath,
      args: [packageManagerExecPath],
    };
  }

  return {
    command: process.platform === "win32" ? "pnpm.cmd" : "pnpm",
    args: [],
  };
}

/**
 * 解析可安全透传给 electron-builder 的 npm_execpath。
 * @param {string | undefined} packageManagerExecPath 当前环境传入的 npm_execpath。
 * @param {{ platform?: NodeJS.Platform, existsSyncImpl?: typeof fs.existsSync, pathEnv?: string }} [options] 运行时选项。
 * @returns {string | undefined} 可执行入口路径；不存在时返回 undefined。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolveExecutablePackageManagerExecPath(
  packageManagerExecPath = process.env.npm_execpath,
  options = {}
) {
  if (!packageManagerExecPath) {
    return undefined;
  }

  const platform = options.platform || process.platform;
  if (platform !== "win32") {
    return packageManagerExecPath;
  }

  const execExtension = path.extname(packageManagerExecPath.toLowerCase());
  if (WINDOWS_NATIVE_COMMAND_EXTENSIONS.has(execExtension)) {
    return packageManagerExecPath;
  }

  const siblingCommandInvocation = resolveExistingWindowsCommand(packageManagerExecPath, {
    existsSyncImpl: options.existsSyncImpl,
    pathEnv: options.pathEnv,
  });
  if (siblingCommandInvocation) {
    return siblingCommandInvocation.command;
  }

  return packageManagerExecPath;
}

/**
 * 解析当前工作区内的 electron-builder CLI 入口。
 * @param {string} electronAppRoot Electron 应用根目录。
 * @param {{ resolveRequireImpl?: typeof require.resolve }} [options] 解析依赖。
 * @returns {{ command: string, args: string[] } | null} 命中本地 CLI 时返回调用描述，否则返回 null。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function resolveElectronBuilderCliInvocation(electronAppRoot, options = {}) {
  const resolveImpl = options.resolveRequireImpl || require.resolve;

  try {
    const electronBuilderCliPath = resolveImpl(ELECTRON_BUILDER_CLI_MODULE, {
      paths: [electronAppRoot],
    });

    return {
      command: process.execPath,
      args: [electronBuilderCliPath],
    };
  } catch (error) {
    return null;
  }
}
/**
 * 构造 electron-builder `install-app-deps` 的调用参数。
 * @param {string} electronAppRoot Electron 应用根目录。
 * @param {{ resolveRequireImpl?: typeof require.resolve, packageManagerExecPath?: string, platform?: NodeJS.Platform, existsSyncImpl?: typeof fs.existsSync, pathEnv?: string }} [options] 调用依赖。
 * @returns {{ command: string, args: string[], options: import("child_process").SpawnSyncOptions }} 调用描述。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

function createInstallAppDepsInvocation(electronAppRoot, options = {}) {
  const electronBuilderCliInvocation = resolveElectronBuilderCliInvocation(electronAppRoot, {
    resolveRequireImpl: options.resolveRequireImpl,
  });
  const executablePackageManagerExecPath = resolveExecutablePackageManagerExecPath(
    options.packageManagerExecPath,
    {
      platform: options.platform,
      existsSyncImpl: options.existsSyncImpl,
      pathEnv: options.pathEnv,
    }
  );
  const commandInvocation =
    electronBuilderCliInvocation ||
    resolvePackageManagerInvocation(options.packageManagerExecPath, {
      platform: options.platform,
      existsSyncImpl: options.existsSyncImpl,
      pathEnv: options.pathEnv,
    });

  return {
    command: commandInvocation.command,
    args: [
      ...commandInvocation.args,
      "install-app-deps",
      // Windows 下优先直连本地 electron-builder CLI，避免依赖 shell 包装脚本的可执行细节。
      // 当前 electron-builder CLI 的 install-app-deps 子命令不读取独立配置文件，
      // 这里不能再传 --config，否则 build:renderer 会在原生依赖重建阶段直接失败。
    ],
    options: {
      cwd: electronAppRoot,
      env: {
        ...process.env,
        // electron-builder 在 install-app-deps 内部仍会读取 npm_execpath；
        // Windows 下这里必须传真正可执行的 shim，避免 .ps1 / 无扩展入口导致重建失败。
        ...(executablePackageManagerExecPath
          ? {
            npm_execpath: executablePackageManagerExecPath,
          }
          : {}),
      },
      stdio: "inherit",
    },
  };
}

/**
 * 执行 Electron 原生依赖 ABI 重建。
 * @param {{ electronAppRoot?: string, spawnSyncImpl?: typeof spawnSync, packageManagerExecPath?: string, resolveRequireImpl?: typeof require.resolve, platform?: NodeJS.Platform, existsSyncImpl?: typeof fs.existsSync, pathEnv?: string }} [options] 运行依赖。
 * @returns {{ skipped: boolean, nativeDependencies: string[], command?: string, args?: string[] }} 重建结果。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
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

  const invocation = createInstallAppDepsInvocation(electronAppRoot, {
    packageManagerExecPath: options.packageManagerExecPath,
    resolveRequireImpl: options.resolveRequireImpl,
    platform: options.platform,
    existsSyncImpl: options.existsSyncImpl,
    pathEnv: options.pathEnv,
  });
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
  ELECTRON_BUILDER_CLI_MODULE,
  createInstallAppDepsInvocation,
  getNativeDependenciesToRebuild,
  resolveElectronBuilderCliInvocation,
  resolveExecutablePackageManagerExecPath,
  resolvePackageManagerInvocation,
  runElectronNativeDependencyRebuild,
};
