const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  createLocalBackendStorage,
  SETTINGS_FILE_NAME,
} = require("../main/local-backend-storage");

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "envelope-local-backend-"));
}

function removeTempDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

test("local backend storage 默认把根目录放到用户 home 下", () => {
  const tempRoot = createTempDir();
  const app = {
    getPath(name) {
      if (name === "home") return path.join(tempRoot, "home");
      if (name === "userData") return path.join(tempRoot, "userData");
      throw new Error(`unexpected path key: ${name}`);
    },
  };

  try {
    const storage = createLocalBackendStorage({ app });
    const snapshot = storage.getSnapshot();

    assert.equal(snapshot.source, "default");
    assert.equal(snapshot.rootDir, path.join(tempRoot, "home", ".envelope", "local"));
    assert.equal(
      storage.getSettingsPath(),
      path.join(tempRoot, "userData", SETTINGS_FILE_NAME)
    );
  } finally {
    removeTempDir(tempRoot);
  }
});

test("setRootDir 会持久化用户修改的根目录并在新实例中复用", () => {
  const tempRoot = createTempDir();
  const customRoot = path.join(tempRoot, "workspace", "envelope-data");
  const app = {
    getPath(name) {
      if (name === "home") return path.join(tempRoot, "home");
      if (name === "userData") return path.join(tempRoot, "userData");
      throw new Error(`unexpected path key: ${name}`);
    },
  };

  try {
    const storage = createLocalBackendStorage({ app });
    const saved = storage.setRootDir(customRoot);
    const reloadedStorage = createLocalBackendStorage({ app });

    assert.equal(saved.rootDir, customRoot);
    assert.equal(saved.source, "persisted");
    assert.equal(reloadedStorage.getSnapshot().rootDir, customRoot);
    assert.equal(fs.existsSync(customRoot), true);
  } finally {
    removeTempDir(tempRoot);
  }
});

test("getRuntimeEnv 会自动创建根目录并生成 local runtime env", () => {
  const tempRoot = createTempDir();
  const app = {
    getPath(name) {
      if (name === "home") return path.join(tempRoot, "home");
      if (name === "userData") return path.join(tempRoot, "userData");
      throw new Error(`unexpected path key: ${name}`);
    },
  };

  try {
    const storage = createLocalBackendStorage({ app });
    const env = storage.getRuntimeEnv();

    assert.equal(env.ENVELOPE_PLATFORM_BACKEND, "local");
    assert.equal(env.ENVELOPE_LOCAL_ROOT, path.join(tempRoot, "home", ".envelope", "local"));
    assert.equal(
      env.ENVELOPE_LOCAL_SQLITE_PATH,
      path.join(tempRoot, "home", ".envelope", "local", "envelope.db")
    );
    assert.equal(
      env.ENVELOPE_LOCAL_MEDIA_ROOT,
      path.join(tempRoot, "home", ".envelope", "local", "media")
    );
    assert.equal(fs.existsSync(env.ENVELOPE_LOCAL_ROOT), true);
  } finally {
    removeTempDir(tempRoot);
  }
});

test("getRuntimeEnv 在目录创建失败时抛出明确错误", () => {
  const tempRoot = createTempDir();
  const app = {
    getPath(name) {
      if (name === "home") return path.join(tempRoot, "home");
      if (name === "userData") return path.join(tempRoot, "userData");
      throw new Error(`unexpected path key: ${name}`);
    },
  };
  const fsModule = {
    ...fs,
    mkdirSync(targetPath) {
      throw new Error(`permission denied: ${targetPath}`);
    },
  };

  try {
    const storage = createLocalBackendStorage({ app, fsModule });
    assert.throws(() => storage.getRuntimeEnv(), /无法创建本地后端根目录/);
  } finally {
    removeTempDir(tempRoot);
  }
});
