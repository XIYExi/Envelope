const fs = require("fs");
const path = require("path");

const SETTINGS_FILE_NAME = "local-backend.json";
const DEFAULT_LOCAL_USER_ID = "local-user";
const DEFAULT_LOCAL_ROOT_DIRNAME = path.join(".envelope", "local");

function ensureDirectory(fsModule, dirPath) {
  fsModule.mkdirSync(dirPath, { recursive: true });
}

function sanitizeRootDir(rootDir) {
  if (typeof rootDir !== "string" || !rootDir.trim()) {
    throw new Error("本地后端根目录不能为空");
  }
  return path.resolve(rootDir.trim());
}

/**
 * 创建 Electron 桌面本地后端存储门面。
 *
 * 职责：
 * - 统一解析默认 local 根目录，默认落到用户 home；
 * - 持久化用户自定义根目录，避免每次启动都重新选择；
 * - 为 Next runtime 启动前生成受控的 local 环境变量；
 * - 在真正启动前确保目标目录存在，不存在则自动创建。
 *
 * @param {{
 *   app: { getPath: (name: string) => string }
 *   fsModule?: typeof import("fs")
 *   pathModule?: typeof import("path")
 * }} options 运行依赖。
 * @returns {{
 *   getSettingsPath: () => string,
 *   getDefaultRootDir: () => string,
 *   getCurrentRootDir: () => string,
 *   getSnapshot: () => { rootDir: string, source: "default" | "persisted" },
 *   setRootDir: (rootDir: string) => { rootDir: string, source: "persisted" },
 *   ensureCurrentRootDir: () => string,
 *   getRuntimeEnv: () => Record<string, string>
 * }} 本地后端门面。
 */
function createLocalBackendStorage({ app, fsModule = fs, pathModule = path }) {
  function getSettingsPath() {
    return pathModule.join(app.getPath("userData"), SETTINGS_FILE_NAME);
  }

  function getDefaultRootDir() {
    return pathModule.join(app.getPath("home"), DEFAULT_LOCAL_ROOT_DIRNAME);
  }

  function readPersistedSettings() {
    const settingsPath = getSettingsPath();
    try {
      const content = fsModule.readFileSync(settingsPath, "utf8");
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed.rootDir === "string" && parsed.rootDir.trim()) {
        return {
          rootDir: sanitizeRootDir(parsed.rootDir),
          source: "persisted",
        };
      }
    } catch (error) {
      if (error && error.code === "ENOENT") {
        return null;
      }
      throw new Error(`读取本地后端配置失败：${error instanceof Error ? error.message : String(error)}`);
    }

    return null;
  }

  function writeSettings(snapshot) {
    const settingsPath = getSettingsPath();
    ensureDirectory(fsModule, pathModule.dirname(settingsPath));
    fsModule.writeFileSync(
      settingsPath,
      `${JSON.stringify({ rootDir: snapshot.rootDir }, null, 2)}\n`,
      "utf8"
    );
  }

  function getSnapshot() {
    return (
      readPersistedSettings() || {
        rootDir: getDefaultRootDir(),
        source: "default",
      }
    );
  }

  function ensureCurrentRootDir() {
    const { rootDir } = getSnapshot();
    try {
      ensureDirectory(fsModule, rootDir);
      return rootDir;
    } catch (error) {
      throw new Error(
        `无法创建本地后端根目录：${rootDir}\n${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return {
    getSettingsPath,
    getDefaultRootDir,
    getCurrentRootDir() {
      return getSnapshot().rootDir;
    },
    getSnapshot,
    setRootDir(rootDir) {
      const normalizedRootDir = sanitizeRootDir(rootDir);
      try {
        ensureDirectory(fsModule, normalizedRootDir);
      } catch (error) {
        throw new Error(
          `无法创建本地后端根目录：${normalizedRootDir}\n${error instanceof Error ? error.message : String(error)}`
        );
      }

      const snapshot = {
        rootDir: normalizedRootDir,
        source: "persisted",
      };
      writeSettings(snapshot);
      return snapshot;
    },
    ensureCurrentRootDir,
    getRuntimeEnv() {
      const rootDir = ensureCurrentRootDir();
      return {
        ENVELOPE_PLATFORM_BACKEND: "local",
        ENVELOPE_LOCAL_ROOT: rootDir,
        ENVELOPE_LOCAL_SQLITE_PATH: pathModule.join(rootDir, "envelope.db"),
        ENVELOPE_LOCAL_MEDIA_ROOT: pathModule.join(rootDir, "media"),
        ENVELOPE_LOCAL_USER_ID: DEFAULT_LOCAL_USER_ID,
      };
    },
  };
}

module.exports = {
  DEFAULT_LOCAL_ROOT_DIRNAME,
  DEFAULT_LOCAL_USER_ID,
  SETTINGS_FILE_NAME,
  createLocalBackendStorage,
};
