const path = require("path");

const PRODUCTION_RENDERER_CONTRACT_KIND = "electron-next-traced-renderer";
const PRODUCTION_RENDERER_CONTRACT_VERSION = 1;
const PRODUCTION_RENDERER_MODE = "next-traced-runtime";
const PRODUCTION_RENDERER_ROOT_DIRNAME = "platform-build";
const PRODUCTION_RENDERER_MANIFEST_FILE_NAME = "renderer-contract.json";
const PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH = "server.js";
const PRODUCTION_RENDERER_STATIC_DIR_RELATIVE_PATH = path.join(".next", "static");
const PRODUCTION_RENDERER_PUBLIC_DIR_RELATIVE_PATH = "public";

function resolveProductionRendererRoot(appRootDir) {
  return path.join(appRootDir, PRODUCTION_RENDERER_ROOT_DIRNAME);
}

function resolveProductionRendererManifestPath(appRootDir) {
  return path.join(resolveProductionRendererRoot(appRootDir), PRODUCTION_RENDERER_MANIFEST_FILE_NAME);
}

function resolveProductionRendererServerEntryPath(appRootDir) {
  return path.join(resolveProductionRendererRoot(appRootDir), PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH);
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
