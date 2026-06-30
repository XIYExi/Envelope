const path = require("path");

const PRODUCTION_RENDERER_CONTRACT_KIND = "electron-next-traced-renderer";
const PRODUCTION_RENDERER_CONTRACT_VERSION = 1;
const PRODUCTION_RENDERER_MODE = "next-traced-runtime";
const PRODUCTION_RENDERER_ROOT_DIRNAME = "platform-build";
const PRODUCTION_RENDERER_MANIFEST_FILE_NAME = "renderer-contract.json";
const PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH = "server.js";
const PRODUCTION_RENDERER_STATIC_DIR_RELATIVE_PATH = path.join(".next", "static");
const PRODUCTION_RENDERER_PUBLIC_DIR_RELATIVE_PATH = "public";

/**
 * 解析生产态 traced runtime 的根目录。
 * 开发/构建阶段使用工作区内的 Electron 应用根目录；
 * 打包运行阶段则改为使用 `process.resourcesPath` 指向的真实资源目录。
 * 这样可以避免把需要 `spawn` 的运行时入口留在 `app.asar` 内部。
 * @param {string} appRootDir 工作区内 Electron 应用根目录。
 * @param {{ resourcesPath?: string }} [options] 可选的打包资源根目录。
 * @returns {string} traced runtime 根目录绝对路径。
 */
function resolveProductionRendererRoot(appRootDir, options = {}) {
  const baseDir = options.resourcesPath || appRootDir;
  return path.join(baseDir, PRODUCTION_RENDERER_ROOT_DIRNAME);
}

/**
 * 解析生产渲染契约清单路径。
 * @param {string} appRootDir 工作区内 Electron 应用根目录。
 * @param {{ resourcesPath?: string }} [options] 可选的打包资源根目录。
 * @returns {string} 契约清单绝对路径。
 */
function resolveProductionRendererManifestPath(appRootDir, options = {}) {
  return path.join(
    resolveProductionRendererRoot(appRootDir, options),
    PRODUCTION_RENDERER_MANIFEST_FILE_NAME
  );
}

/**
 * 解析生产 traced runtime 固定入口路径。
 * @param {string} appRootDir 工作区内 Electron 应用根目录。
 * @param {{ resourcesPath?: string }} [options] 可选的打包资源根目录。
 * @returns {string} `server.js` 绝对路径。
 */
function resolveProductionRendererServerEntryPath(appRootDir, options = {}) {
  return path.join(
    resolveProductionRendererRoot(appRootDir, options),
    PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH
  );
}

module.exports = {
  PRODUCTION_RENDERER_CONTRACT_KIND,
  PRODUCTION_RENDERER_CONTRACT_VERSION,
  PRODUCTION_RENDERER_MODE,
  PRODUCTION_RENDERER_MANIFEST_FILE_NAME,
  PRODUCTION_RENDERER_PUBLIC_DIR_RELATIVE_PATH,
  PRODUCTION_RENDERER_ROOT_DIRNAME,
  PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH,
  PRODUCTION_RENDERER_STATIC_DIR_RELATIVE_PATH,
  resolveProductionRendererManifestPath,
  resolveProductionRendererRoot,
  resolveProductionRendererServerEntryPath,
};
