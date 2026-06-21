/**
 * @file Electron Builder 依赖文件映射辅助模块。
 * @description 负责递归解析 `electron-updater` 的生产依赖闭包，并把 pnpm
 * `.pnpm` 存储中的真实包目录转换为 electron-builder 可消费的显式文件映射。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const fs = require("fs");
const path = require("path");

/**
 * 读取并解析 package.json，供依赖闭包收集复用。
 * @param {string} packageJsonPath package.json 绝对路径。
 * @param {{ readFileSyncImpl?: typeof fs.readFileSync }} [options] 文件读取依赖。
 * @returns {{ name?: string, dependencies?: Record<string, string>, optionalDependencies?: Record<string, string> }} 包描述对象。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function readPackageJson(packageJsonPath, { readFileSyncImpl = fs.readFileSync } = {}) {
  return JSON.parse(readFileSyncImpl(packageJsonPath, "utf8"));
}

/**
 * 递归收集指定包的生产依赖闭包，并返回可直接复制的真实目录。
 * 这里显式解引用 pnpm `.pnpm` 存储中的包目录，避免 electron-builder 只复制
 * `electron-updater` 本体、却遗漏其 junction 形式传递依赖的问题。
 * @param {string} packageName 起始包名。
 * @param {{
 *   searchPaths?: string[],
 *   resolveRequireImpl?: typeof require.resolve,
 *   readFileSyncImpl?: typeof fs.readFileSync,
 *   pathImpl?: typeof path,
 *   visitedPackageJsonPaths?: Set<string>
 * }} [options] 解析依赖。
 * @returns {Array<{ packageName: string, packageDir: string }>} 已解析的包目录列表。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function collectPackageDependencyDirs(
  packageName,
  {
    searchPaths = [path.resolve(__dirname, "..")],
    resolveRequireImpl = require.resolve,
    readFileSyncImpl = fs.readFileSync,
    pathImpl = path,
    visitedPackageJsonPaths = new Set(),
  } = {}
) {
  const packageJsonPath = resolveRequireImpl(`${packageName}/package.json`, {
    paths: searchPaths,
  });
  if (visitedPackageJsonPaths.has(packageJsonPath)) {
    return [];
  }

  visitedPackageJsonPaths.add(packageJsonPath);
  const packageJson = readPackageJson(packageJsonPath, {
    readFileSyncImpl,
  });
  const packageDir = pathImpl.dirname(packageJsonPath);
  const dependencyNames = Object.keys({
    ...(packageJson.dependencies || {}),
    ...(packageJson.optionalDependencies || {}),
  }).sort();

  const dependencyDirs = dependencyNames.flatMap((dependencyName) =>
    collectPackageDependencyDirs(dependencyName, {
      searchPaths: [packageDir],
      resolveRequireImpl,
      readFileSyncImpl,
      pathImpl,
      visitedPackageJsonPaths,
    })
  );

  return [
    {
      packageName: packageJson.name || packageName,
      packageDir,
    },
    ...dependencyDirs,
  ];
}

/**
 * 为 electron-updater 生成一组显式文件映射，确保其传递依赖被铺平到最终产物根 `node_modules`。
 * @param {{
 *   resolveRequireImpl?: typeof require.resolve,
 *   readFileSyncImpl?: typeof fs.readFileSync,
 *   pathImpl?: typeof path
 * }} [options] 解析依赖。
 * @returns {Array<{ from: string, to: string, filter: string[] }>} electron-builder 文件映射集合。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
function createElectronUpdaterDependencyFileSets({
  resolveRequireImpl = require.resolve,
  readFileSyncImpl = fs.readFileSync,
  pathImpl = path,
} = {}) {
  const packages = collectPackageDependencyDirs("electron-updater", {
    resolveRequireImpl,
    readFileSyncImpl,
    pathImpl,
  });

  return packages
    .filter((dependency) => dependency.packageName !== "electron-updater")
    .map((dependency) => ({
      from: dependency.packageDir,
      to: pathImpl.join("node_modules", dependency.packageName),
      filter: ["**/*"],
    }));
}

module.exports = {
  collectPackageDependencyDirs,
  createElectronUpdaterDependencyFileSets,
  readPackageJson,
};
