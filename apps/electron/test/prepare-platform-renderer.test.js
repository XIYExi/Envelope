const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  PRODUCTION_RENDERER_CONTRACT_KIND,
  PRODUCTION_RENDERER_CONTRACT_VERSION,
  PRODUCTION_RENDERER_MODE,
  resolveProductionRendererManifestPath,
  resolveProductionRendererRoot,
  resolveProductionRendererServerEntryPath,
} = require("../main/bootstrap/renderer-build-contract");
const {
  copyResolvedModuleClosure,
  preparePlatformRenderer,
} = require("../scripts/prepare-platform-renderer");

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

function writeTraceManifest(traceManifestPath, tracedFiles) {
  const traceManifestDir = path.dirname(traceManifestPath);
  writeFile(
    traceManifestPath,
    JSON.stringify(
      {
        version: 1,
        files: tracedFiles.map((filePath) =>
          path.relative(traceManifestDir, filePath).replace(/\\/g, "/")
        ),
      },
      null,
      2
    )
  );
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("preparePlatformRenderer 基于 required-server-files 和 nft traces 手工组装自包含运行时", () => {
  const workspaceRoot = createTempDir();
  const electronAppRoot = path.join(workspaceRoot, "apps", "electron");
  const platformAppRoot = path.join(workspaceRoot, "apps", "platform");
  const nextDistDir = path.join(platformAppRoot, ".next");
  const platformPackageJsonPath = path.join(platformAppRoot, "package.json");
  const rootPackageJsonPath = path.join(workspaceRoot, "package.json");
  const nextPackageJsonPath = path.join(workspaceRoot, "node_modules", "next", "package.json");
  const nextEntryPath = path.join(workspaceRoot, "node_modules", "next", "dist", "server", "next.js");
  const nextEntryTracePath = `${nextEntryPath}.nft.json`;
  const nextRuntimePath = path.join(
    workspaceRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "lib",
    "start-server.js"
  );
  const nextRuntimeTracePath = `${nextRuntimePath}.nft.json`;
  const nextRuntimeHelperPath = path.join(
    workspaceRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "lib",
    "start-server-helper.js"
  );
  const routeModulePath = path.join(nextDistDir, "server", "app", "page.js");
  const routeTracePath = path.join(nextDistDir, "server", "app", "page.js.nft.json");
  const nextServerTracePath = path.join(nextDistDir, "next-server.js.nft.json");
  const requiredServerFilesPath = path.join(nextDistDir, "required-server-files.json");

  writeFile(platformPackageJsonPath, '{"name":"@envelope/platform"}');
  writeFile(rootPackageJsonPath, '{"name":"envelope"}');
  writeFile(nextPackageJsonPath, '{"name":"next","main":"./dist/server/next.js"}');
  writeFile(nextEntryPath, "module.exports = function next() { return null; };");
  writeTraceManifest(nextEntryTracePath, [nextPackageJsonPath]);
  writeFile(
    nextRuntimeHelperPath,
    "module.exports = function buildServerResult() { return Promise.resolve(); };"
  );
  writeFile(
    nextRuntimePath,
    'const buildServerResult = require("./start-server-helper"); module.exports = { startServer() { return buildServerResult(); } };'
  );
  writeTraceManifest(nextRuntimeTracePath, [nextRuntimeHelperPath]);
  writeFile(path.join(nextDistDir, "BUILD_ID"), "build-id");
  writeFile(path.join(nextDistDir, "routes-manifest.json"), "{}");
  writeFile(path.join(nextDistDir, "build-manifest.json"), "{}");
  writeFile(path.join(nextDistDir, "prerender-manifest.json"), "{}");
  writeFile(path.join(nextDistDir, "react-loadable-manifest.json"), "{}");
  writeFile(path.join(nextDistDir, "server", "middleware-manifest.json"), "{}");
  writeFile(path.join(nextDistDir, "server", "font-manifest.json"), "{}");
  writeFile(routeModulePath, "module.exports = 'page';");
  writeTraceManifest(routeTracePath, [routeModulePath]);
  writeTraceManifest(nextServerTracePath, [
    rootPackageJsonPath,
    platformPackageJsonPath,
    path.join(nextDistDir, "BUILD_ID"),
    path.join(nextDistDir, "server", "middleware-manifest.json"),
  ]);
  writeFile(
    requiredServerFilesPath,
    JSON.stringify(
      {
        version: 1,
        appDir: platformAppRoot,
        relativeAppDir: "apps/platform",
        config: {
          distDir: ".next",
          experimental: {
            outputFileTracingRoot: workspaceRoot,
          },
        },
        files: [
          ".next/routes-manifest.json",
          ".next/build-manifest.json",
          ".next/prerender-manifest.json",
          ".next/react-loadable-manifest.json",
          ".next/server/middleware-manifest.json",
          ".next/server/font-manifest.json",
          ".next/BUILD_ID",
        ],
        ignore: [],
      },
      null,
      2
    )
  );
  writeFile(path.join(nextDistDir, "static", "chunks", "main.js"), "chunk");
  writeFile(path.join(platformAppRoot, "public", "favicon.ico"), "ico");

  try {
    const result = preparePlatformRenderer({
      electronAppRoot,
      platformAppRoot,
    });

    const rendererRoot = resolveProductionRendererRoot(electronAppRoot);
    const manifestPath = resolveProductionRendererManifestPath(electronAppRoot);
    const serverEntryPath = resolveProductionRendererServerEntryPath(electronAppRoot);

    assert.equal(result.rendererRoot, rendererRoot);
    assert.equal(result.serverEntryPath, serverEntryPath);
    assert.equal(result.manifestPath, manifestPath);
    assert.equal(result.relativeAppDir, "apps/platform");
    assert.equal(fs.existsSync(path.join(rendererRoot, "server.js")), true);
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "apps", "platform", ".next", "static", "chunks", "main.js")),
      true
    );
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "apps", "platform", "public", "favicon.ico")),
      true
    );
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "apps", "platform", ".next", "server", "app", "page.js")),
      true
    );
    assert.equal(
      fs.existsSync(
        path.join(rendererRoot, "node_modules", "next", "dist", "server", "lib", "start-server.js")
      ),
      true
    );
    assert.equal(
      fs.existsSync(
        path.join(
          rendererRoot,
          "node_modules",
          "next",
          "dist",
          "server",
          "lib",
          "start-server-helper.js"
        )
      ),
      true
    );
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "next", "dist", "server", "next.js")),
      true
    );
    assert.equal(fs.existsSync(path.join(rendererRoot, "node_modules", "next", "package.json")), true);
    assert.equal(fs.existsSync(path.join(rendererRoot, "package.json")), true);
    assert.equal(fs.existsSync(path.join(rendererRoot, "apps", "platform", "package.json")), true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const serverEntryContent = fs.readFileSync(serverEntryPath, "utf8");

    assert.equal(manifest.kind, PRODUCTION_RENDERER_CONTRACT_KIND);
    assert.equal(manifest.contractVersion, PRODUCTION_RENDERER_CONTRACT_VERSION);
    assert.equal(manifest.rendererMode, PRODUCTION_RENDERER_MODE);
    assert.equal(manifest.selfContained, true);
    assert.equal(manifest.serverEntry, "server.js");
    assert.equal(manifest.relativeAppDir, "apps/platform");
    assert.equal(manifest.staticDir, "apps/platform/.next/static");
    assert.equal(manifest.publicDir, "apps/platform/public");
    assert.equal("source" in manifest, false);
    assert.match(serverEntryContent, /__NEXT_PRIVATE_STANDALONE_CONFIG/);
    assert.match(serverEntryContent, /process\.chdir\(dir\)/);
    assert.doesNotMatch(serverEntryContent, new RegExp(escapeRegExp(workspaceRoot)));
    execFileSync(process.execPath, [serverEntryPath], {
      cwd: rendererRoot,
      env: {
        ...process.env,
        HOSTNAME: "127.0.0.1",
        PORT: "3100",
      },
      stdio: "pipe",
    });
  } finally {
    removeTempDir(workspaceRoot);
  }
});

test("copyResolvedModuleClosure 会补齐生成期直连模块的 sibling nft 闭包", () => {
  const workspaceRoot = createTempDir();
  const rendererRoot = path.join(workspaceRoot, "renderer");
  const tracedEntryPath = path.join(workspaceRoot, "node_modules", "runtime", "entry.js");
  const tracedHelperPath = path.join(workspaceRoot, "node_modules", "runtime", "helper.js");
  const tracedManifestPath = `${tracedEntryPath}.nft.json`;
  const copiedRelativePaths = new Set();

  writeFile(tracedEntryPath, 'module.exports = require("./helper");');
  writeFile(tracedHelperPath, "module.exports = 1;");
  writeTraceManifest(tracedManifestPath, [tracedHelperPath]);

  try {
    copyResolvedModuleClosure(tracedEntryPath, {
      rendererRoot,
      tracingRoot: workspaceRoot,
      copiedRelativePaths,
    });

    assert.equal(fs.existsSync(path.join(rendererRoot, "node_modules", "runtime", "entry.js")), true);
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "runtime", "entry.js.nft.json")),
      true
    );
    assert.equal(fs.existsSync(path.join(rendererRoot, "node_modules", "runtime", "helper.js")), true);
  } finally {
    removeTempDir(workspaceRoot);
  }
});

test("preparePlatformRenderer 会根据 next-minimal-server 等真实 trace 镜像 Next 外部运行时依赖", () => {
  const workspaceRoot = createTempDir();
  const electronAppRoot = path.join(workspaceRoot, "apps", "electron");
  const platformAppRoot = path.join(workspaceRoot, "apps", "platform");
  const nextDistDir = path.join(platformAppRoot, ".next");
  const platformPackageJsonPath = path.join(platformAppRoot, "package.json");
  const nextPackageJsonPath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "package.json"
  );
  const nextEntryPath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "next.js"
  );
  const nextRuntimePath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "lib",
    "start-server.js"
  );
  const styledJsxPackageJsonPath = path.join(
    platformAppRoot,
    "node_modules",
    "styled-jsx",
    "package.json"
  );
  const styledJsxEntryPath = path.join(
    platformAppRoot,
    "node_modules",
    "styled-jsx",
    "index.js"
  );
  const nextMinimalServerTracePath = path.join(nextDistDir, "next-minimal-server.js.nft.json");
  const nextServerTracePath = path.join(nextDistDir, "next-server.js.nft.json");
  const requiredServerFilesPath = path.join(nextDistDir, "required-server-files.json");

  writeFile(platformPackageJsonPath, '{"name":"@envelope/platform"}');
  writeFile(nextPackageJsonPath, '{"name":"next","main":"./dist/server/next.js"}');
  writeFile(nextEntryPath, "module.exports = function next() { return null; };");
  writeFile(
    nextRuntimePath,
    'module.exports = { startServer() { return Promise.resolve("ok"); } };'
  );
  writeFile(styledJsxPackageJsonPath, '{"name":"styled-jsx","main":"./index.js"}');
  writeFile(styledJsxEntryPath, "module.exports = function styledJsx() { return null; };");
  writeTraceManifest(nextMinimalServerTracePath, [styledJsxPackageJsonPath, styledJsxEntryPath]);
  writeTraceManifest(nextServerTracePath, [
    nextRuntimePath,
    nextEntryPath,
    nextPackageJsonPath,
    platformPackageJsonPath,
  ]);
  writeFile(
    requiredServerFilesPath,
    JSON.stringify(
      {
        version: 1,
        appDir: platformAppRoot,
        relativeAppDir: "apps/platform",
        config: {
          distDir: ".next",
          experimental: {
            outputFileTracingRoot: workspaceRoot,
          },
        },
        files: [],
        ignore: [],
      },
      null,
      2
    )
  );
  writeFile(path.join(nextDistDir, "static", "chunks", "main.js"), "chunk");

  try {
    preparePlatformRenderer({
      electronAppRoot,
      platformAppRoot,
    });

    const rendererRoot = resolveProductionRendererRoot(electronAppRoot);
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "styled-jsx", "package.json")),
      true
    );
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "styled-jsx", "index.js")),
      true
    );
  } finally {
    removeTempDir(workspaceRoot);
  }
});

test("preparePlatformRenderer 优先消费 next-minimal-server trace 补齐 @next/env 运行时闭包", () => {
  const workspaceRoot = createTempDir();
  const electronAppRoot = path.join(workspaceRoot, "apps", "electron");
  const platformAppRoot = path.join(workspaceRoot, "apps", "platform");
  const nextDistDir = path.join(platformAppRoot, ".next");
  const platformPackageJsonPath = path.join(platformAppRoot, "package.json");
  const nextPackageJsonPath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "package.json"
  );
  const nextEntryPath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "next.js"
  );
  const nextRuntimePath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "lib",
    "start-server.js"
  );
  const nextEnvPackageJsonPath = path.join(
    platformAppRoot,
    "node_modules",
    "@next",
    "env",
    "package.json"
  );
  const nextEnvEntryPath = path.join(
    platformAppRoot,
    "node_modules",
    "@next",
    "env",
    "dist",
    "index.js"
  );
  const nextMinimalServerTracePath = path.join(nextDistDir, "next-minimal-server.js.nft.json");
  const nextServerTracePath = path.join(nextDistDir, "next-server.js.nft.json");
  const requiredServerFilesPath = path.join(nextDistDir, "required-server-files.json");

  writeFile(platformPackageJsonPath, '{"name":"@envelope/platform"}');
  writeFile(nextPackageJsonPath, '{"name":"next","main":"./dist/server/next.js"}');
  writeFile(nextEntryPath, "module.exports = function next() { return null; };");
  writeFile(
    nextRuntimePath,
    'module.exports = { startServer() { return Promise.resolve("ok"); } };'
  );
  writeFile(
    nextEnvPackageJsonPath,
    JSON.stringify(
      {
        name: "@next/env",
        exports: {
          ".": "./dist/index.js",
        },
      },
      null,
      2
    )
  );
  writeFile(nextEnvEntryPath, "module.exports = { loadEnvConfig() { return null; } };");
  writeTraceManifest(nextMinimalServerTracePath, [nextEnvPackageJsonPath, nextEnvEntryPath]);
  writeTraceManifest(nextServerTracePath, [
    nextRuntimePath,
    nextEntryPath,
    nextPackageJsonPath,
    platformPackageJsonPath,
  ]);
  writeFile(
    requiredServerFilesPath,
    JSON.stringify(
      {
        version: 1,
        appDir: platformAppRoot,
        relativeAppDir: "apps/platform",
        config: {
          distDir: ".next",
          experimental: {
            outputFileTracingRoot: workspaceRoot,
          },
        },
        files: [],
        ignore: [],
      },
      null,
      2
    )
  );
  writeFile(path.join(nextDistDir, "static", "chunks", "main.js"), "chunk");

  try {
    preparePlatformRenderer({
      electronAppRoot,
      platformAppRoot,
    });

    const rendererRoot = resolveProductionRendererRoot(electronAppRoot);
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "@next", "env", "package.json")),
      true
    );
    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "@next", "env", "dist", "index.js")),
      true
    );
  } finally {
    removeTempDir(workspaceRoot);
  }
});

test("preparePlatformRenderer 生成的根 server.js 按镜像 app 目录解析 next 依赖并通过生产烟测", () => {
  const workspaceRoot = createTempDir();
  const electronAppRoot = path.join(workspaceRoot, "apps", "electron");
  const platformAppRoot = path.join(workspaceRoot, "apps", "platform");
  const nextDistDir = path.join(platformAppRoot, ".next");
  const platformPackageJsonPath = path.join(platformAppRoot, "package.json");
  const reactPackageJsonPath = path.join(platformAppRoot, "node_modules", "react", "package.json");
  const reactEntryPath = path.join(platformAppRoot, "node_modules", "react", "index.js");
  const nextPackageJsonPath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "package.json"
  );
  const nextEntryPath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "next.js"
  );
  const nextRuntimePath = path.join(
    platformAppRoot,
    "node_modules",
    "next",
    "dist",
    "server",
    "lib",
    "start-server.js"
  );
  const nextServerTracePath = path.join(nextDistDir, "next-server.js.nft.json");
  const requiredServerFilesPath = path.join(nextDistDir, "required-server-files.json");

  writeFile(platformPackageJsonPath, '{"name":"@envelope/platform"}');
  writeFile(reactPackageJsonPath, '{"name":"react","main":"./index.js"}');
  writeFile(reactEntryPath, "module.exports = { version: '18.3.0' };");
  writeFile(nextPackageJsonPath, '{"name":"next","main":"./dist/server/next.js"}');
  writeFile(nextEntryPath, "module.exports = function next() { return null; };");
  writeFile(
    nextRuntimePath,
    'const React = require("react"); module.exports = { startServer() { return Promise.resolve(React.version); } };'
  );
  writeTraceManifest(`${nextRuntimePath}.nft.json`, [reactPackageJsonPath, reactEntryPath]);
  writeFile(path.join(nextDistDir, "BUILD_ID"), "build-id");
  writeFile(path.join(nextDistDir, "routes-manifest.json"), "{}");
  writeTraceManifest(nextServerTracePath, [
    nextRuntimePath,
    nextEntryPath,
    nextPackageJsonPath,
    platformPackageJsonPath,
    path.join(nextDistDir, "BUILD_ID"),
  ]);
  writeFile(
    requiredServerFilesPath,
    JSON.stringify(
      {
        version: 1,
        appDir: platformAppRoot,
        relativeAppDir: "apps/platform",
        config: {
          distDir: ".next",
          experimental: {
            outputFileTracingRoot: workspaceRoot,
          },
        },
        files: [".next/routes-manifest.json", ".next/BUILD_ID"],
        ignore: [],
      },
      null,
      2
    )
  );
  writeFile(path.join(nextDistDir, "static", "chunks", "main.js"), "chunk");

  try {
    const { serverEntryPath } = preparePlatformRenderer({
      electronAppRoot,
      platformAppRoot,
    });
    const rendererRoot = resolveProductionRendererRoot(electronAppRoot);
    const serverEntryContent = fs.readFileSync(serverEntryPath, "utf8");

    assert.equal(
      fs.existsSync(path.join(rendererRoot, "node_modules", "next", "package.json")),
      false
    );
    assert.equal(
      fs.existsSync(
        path.join(rendererRoot, "apps", "platform", "node_modules", "next", "package.json")
      ),
      true
    );
    assert.equal(fs.existsSync(path.join(rendererRoot, "node_modules", "react", "package.json")), true);
    assert.match(serverEntryContent, /createRequire/);
    assert.match(serverEntryContent, /requireFromApp\("next"\)/);
    assert.match(serverEntryContent, /requireFromApp\("next\/dist\/server\/lib\/start-server"\)/);

    execFileSync(process.execPath, [serverEntryPath], {
      cwd: rendererRoot,
      env: {
        ...process.env,
        HOSTNAME: "127.0.0.1",
        PORT: "3101",
      },
      stdio: "pipe",
    });
  } finally {
    removeTempDir(workspaceRoot);
  }
});

test("preparePlatformRenderer 缺少 required-server-files 清单时直接失败，避免回退到工作区路径", () => {
  const workspaceRoot = createTempDir();
  const electronAppRoot = path.join(workspaceRoot, "apps", "electron");
  const platformAppRoot = path.join(workspaceRoot, "apps", "platform");

  writeFile(path.join(platformAppRoot, ".next", "BUILD_ID"), "build-id");
  writeFile(path.join(platformAppRoot, ".next", "static", "chunks", "main.js"), "chunk");

  try {
    assert.throws(
      () =>
        preparePlatformRenderer({
          electronAppRoot,
          platformAppRoot,
        }),
      /required-server-files|不再允许回退到工作区路径/
    );
  } finally {
    removeTempDir(workspaceRoot);
  }
});
