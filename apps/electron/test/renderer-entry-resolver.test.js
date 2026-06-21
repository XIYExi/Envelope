const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  DEFAULT_DEV_RENDERER_URL,
  resolveRendererLaunchPlan,
} = require("../main/bootstrap/renderer-entry-resolver");
const {
  PRODUCTION_RENDERER_CONTRACT_KIND,
  PRODUCTION_RENDERER_CONTRACT_VERSION,
  PRODUCTION_RENDERER_MODE,
  PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH,
  resolveProductionRendererManifestPath,
  resolveProductionRendererRoot,
  resolveProductionRendererServerEntryPath,
} = require("../main/bootstrap/renderer-build-contract");

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "envelope-electron-"));
}

function removeTempDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function writeProductionRendererContract(
  appRootDir,
  overrides = {}
) {
  const rendererRoot = resolveProductionRendererRoot(appRootDir);
  const entryPath = resolveProductionRendererServerEntryPath(appRootDir);
  const manifestPath = resolveProductionRendererManifestPath(appRootDir);

  fs.mkdirSync(path.dirname(entryPath), { recursive: true });
  fs.mkdirSync(path.join(rendererRoot, ".next", "static"), { recursive: true });
  fs.writeFileSync(entryPath, "console.log('server ready')", "utf8");
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        kind: PRODUCTION_RENDERER_CONTRACT_KIND,
        contractVersion: PRODUCTION_RENDERER_CONTRACT_VERSION,
        rendererMode: PRODUCTION_RENDERER_MODE,
        selfContained: true,
        serverEntry: PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH,
        staticDir: ".next/static",
        ...overrides,
      },
      null,
      2
    ),
    "utf8"
  );

  return { entryPath, manifestPath };
}

test("开发模式默认走本地 dev server", () => {
  const plan = resolveRendererLaunchPlan({
    app: { isPackaged: false },
    env: {},
  });

  assert.equal(plan.kind, "url");
  assert.equal(plan.entry, DEFAULT_DEV_RENDERER_URL);
  assert.deepEqual(plan.trust.allowedOrigins, ["http://127.0.0.1:3000"]);
});

test("生产模式忽略远程渲染地址，仅接受受控的本地 traced runtime 服务入口", () => {
  const appRootDir = createTempDir();

  const { entryPath } = writeProductionRendererContract(appRootDir);

  try {
    const plan = resolveRendererLaunchPlan({
      app: { isPackaged: true },
      appRootDir,
      env: {
        ELECTRON_RENDERER_URL: "https://desktop.example.com/app",
      },
    });

    assert.equal(plan.kind, "loopback");
    assert.equal(plan.entry, entryPath);
    assert.deepEqual(plan.trust.allowedOrigins, []);
    assert.deepEqual(plan.trust.allowedFilePaths, []);
  } finally {
    removeTempDir(appRootDir);
  }
});

test("生产模式在契约清单缺失时返回 unresolved", () => {
  const appRootDir = createTempDir();

  try {
    const plan = resolveRendererLaunchPlan({
      app: { isPackaged: true },
      env: {},
      appRootDir,
    });

    assert.equal(plan.kind, "unresolved");
    assert.match(plan.suggestions.join("\n"), /renderer-contract\.json/);
    assert.match(plan.suggestions.join("\n"), /缺少生产渲染契约清单/);
  } finally {
    removeTempDir(appRootDir);
  }
});

test("生产模式在契约入口不匹配时拒绝加载", () => {
  const appRootDir = createTempDir();

  writeProductionRendererContract(appRootDir, {
    serverEntry: path.join("server", "app", "inner.html").replace(/\\/g, "/"),
  });

  try {
    const plan = resolveRendererLaunchPlan({
      app: { isPackaged: true },
      env: {},
      appRootDir,
    });

    assert.equal(plan.kind, "unresolved");
    assert.match(plan.suggestions.join("\n"), /生产渲染契约不匹配/);
  } finally {
    removeTempDir(appRootDir);
  }
});

test("生产模式在契约声明非自包含时拒绝加载", () => {
  const appRootDir = createTempDir();

  writeProductionRendererContract(appRootDir, {
    selfContained: false,
  });

  try {
    const plan = resolveRendererLaunchPlan({
      app: { isPackaged: true },
      env: {},
      appRootDir,
    });

    assert.equal(plan.kind, "unresolved");
    assert.match(plan.suggestions.join("\n"), /selfContained=true/);
  } finally {
    removeTempDir(appRootDir);
  }
});

test("生产模式通过固定 server.js 启动受控的本地 traced runtime loopback 服务", () => {
  const appRootDir = createTempDir();
  const { entryPath, manifestPath } = writeProductionRendererContract(appRootDir);

  try {
    const plan = resolveRendererLaunchPlan({
      app: { isPackaged: true },
      env: {},
      appRootDir,
    });

    assert.equal(plan.kind, "loopback");
    assert.equal(plan.entry, entryPath);
    assert.equal(plan.contractManifestPath, manifestPath);
    assert.deepEqual(plan.trust.allowedFilePaths, []);
  } finally {
    removeTempDir(appRootDir);
  }
});

test("生产模式不再依赖递归发现静态 html 入口", () => {
  const appRootDir = createTempDir();

  try {
    const plan = resolveRendererLaunchPlan({
      app: { isPackaged: true },
      env: {},
      appRootDir,
    });

    assert.equal(plan.kind, "unresolved");
  } finally {
    removeTempDir(appRootDir);
  }
});
