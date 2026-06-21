const fs = require("fs");
const path = require("path");
const {
  PRODUCTION_RENDERER_CONTRACT_KIND,
  PRODUCTION_RENDERER_CONTRACT_VERSION,
  PRODUCTION_RENDERER_MODE,
  PRODUCTION_RENDERER_PUBLIC_DIR_RELATIVE_PATH,
  PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH,
  PRODUCTION_RENDERER_STATIC_DIR_RELATIVE_PATH,
  resolveProductionRendererManifestPath,
  resolveProductionRendererRoot,
  resolveProductionRendererServerEntryPath,
} = require("../main/bootstrap/renderer-build-contract");

const NEXT_DIST_DIR_NAME = ".next";
const REQUIRED_SERVER_FILES_MANIFEST_NAME = "required-server-files.json";
const NEXT_SERVER_TRACE_MANIFEST_NAME = "next-server.js.nft.json";
const NFT_MANIFEST_SUFFIX = ".nft.json";
const GENERATED_SERVER_RUNTIME_DEPENDENCIES = [
  {
    request: "next",
    label: "server.js 直连的 next 包入口",
    includeTraceClosure: true,
  },
  {
    request: "next/package.json",
    label: "server.js 直连的 next 包元数据",
  },
  {
    request: "next/dist/server/lib/start-server",
    label: "server.js 直连的 start-server 入口",
    includeTraceClosure: true,
  },
];

function ensureDirectoryReady(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeManifestPath(relativePath) {
  return relativePath.replace(/\\/g, "/");
}

function ensurePathInside(rootPath, targetPath, label) {
  const relativePath = path.relative(rootPath, targetPath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`${label} 超出了 tracing root，无法复制：${targetPath}`);
  }
}

function copyPathDereferenced(sourcePath, targetPath) {
  const sourceStats = fs.lstatSync(sourcePath);

  if (sourceStats.isSymbolicLink()) {
    const dereferencedPath = fs.realpathSync(sourcePath);
    const dereferencedStats = fs.statSync(dereferencedPath);

    if (dereferencedStats.isDirectory()) {
      copyDirectoryContents(dereferencedPath, targetPath);
      return;
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(dereferencedPath, targetPath);
    return;
  }

  if (sourceStats.isDirectory()) {
    copyDirectoryContents(sourcePath, targetPath);
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}

function copyDirectoryContents(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    // 生产包必须是自包含的，这里显式解引用符号链接，避免把工作区链接带入安装产物。
    copyPathDereferenced(sourcePath, targetPath);
  }
}

function readJsonFile(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`读取 ${label} 失败：${filePath}\n${error.message}`);
  }
}

function copyPathIntoRenderer(sourcePath, options) {
  const { rendererRoot, tracingRoot, copiedRelativePaths } = options;
  ensurePathInside(tracingRoot, sourcePath, "待复制文件");

  const targetRelativePath = normalizeManifestPath(path.relative(tracingRoot, sourcePath));
  if (copiedRelativePaths.has(targetRelativePath)) {
    return targetRelativePath;
  }

  copiedRelativePaths.add(targetRelativePath);
  copyPathDereferenced(sourcePath, path.join(rendererRoot, targetRelativePath));
  return targetRelativePath;
}

function collectTraceManifestPaths(rootDir) {
  const collectedPaths = [];

  function visit(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(NFT_MANIFEST_SUFFIX)) {
        collectedPaths.push(entryPath);
      }
    }
  }

  visit(rootDir);
  return collectedPaths.sort();
}

function copyTraceManifest(traceManifestPath, options) {
  const traceData = readJsonFile(traceManifestPath, "nft trace 清单");
  if (!Array.isArray(traceData.files)) {
    throw new Error(`nft trace 清单格式非法，缺少 files 数组：${traceManifestPath}`);
  }

  const traceManifestDir = path.dirname(traceManifestPath);
  copyPathIntoRenderer(traceManifestPath, options);

  for (const relativeFile of traceData.files) {
    const tracedPath = path.resolve(traceManifestDir, relativeFile);
    if (!fs.existsSync(tracedPath)) {
      throw new Error(`nft trace 引用的文件不存在：${tracedPath}`);
    }
    copyPathIntoRenderer(tracedPath, options);
  }

  const siblingEntryPath = traceManifestPath.slice(0, -NFT_MANIFEST_SUFFIX.length);
  if (fs.existsSync(siblingEntryPath)) {
    copyPathIntoRenderer(siblingEntryPath, options);
  }
}

function copyOptionalFile(sourcePath, options) {
  if (fs.existsSync(sourcePath)) {
    copyPathIntoRenderer(sourcePath, options);
  }
}

function copyResolvedModuleClosure(resolvedPath, options) {
  copyPathIntoRenderer(resolvedPath, options);

  const siblingTraceManifestPath = `${resolvedPath}${NFT_MANIFEST_SUFFIX}`;
  if (!fs.existsSync(siblingTraceManifestPath)) {
    return;
  }

  // 生成出来的根 server.js 不会进入 Next 的 tracing 图，这里额外补齐其直连模块自己的 nft 闭包。
  copyTraceManifest(siblingTraceManifestPath, options);
}

function copyGeneratedServerRuntimeDependencies(options) {
  const { platformAppRoot, tracingRoot } = options;

  for (const dependency of GENERATED_SERVER_RUNTIME_DEPENDENCIES) {
    let resolvedPath;

    try {
      resolvedPath = require.resolve(dependency.request, {
        paths: [platformAppRoot],
      });
    } catch (error) {
      throw new Error(
        `无法解析 ${dependency.label}：${dependency.request}\n${error.message}`
      );
    }

    // 生成出来的 server.js 不会再经过 nft 追踪，这里把它的直接依赖显式补齐，确保运行时闭包成立。
    ensurePathInside(tracingRoot, resolvedPath, dependency.label);
    if (dependency.includeTraceClosure) {
      copyResolvedModuleClosure(resolvedPath, options);
      continue;
    }
    copyPathIntoRenderer(resolvedPath, options);
  }
}

function buildRuntimeServerEntry(options) {
  const { nextConfig, relativeAppDir } = options;
  const appDirSegments = relativeAppDir ? relativeAppDir.split(/[\\/]+/).filter(Boolean) : [];
  const serializedConfig = JSON.stringify(nextConfig);

  return [
    'const path = require("path");',
    'const { createRequire } = require("module");',
    "",
    `const dir = path.join(__dirname, ...${JSON.stringify(appDirSegments)});`,
    'const requireFromApp = createRequire(path.join(dir, "package.json"));',
    "",
    'process.env.NODE_ENV = "production";',
    "process.chdir(dir);",
    "",
    "// 维持与 Next 内建最小 server.js 一致的启动契约，方便 Electron 继续复用 loopback 模式。",
    "if (!process.env.NEXT_MANUAL_SIG_HANDLE) {",
    '  process.on("SIGTERM", () => process.exit(0));',
    '  process.on("SIGINT", () => process.exit(0));',
    "}",
    "",
    'const currentPort = parseInt(process.env.PORT, 10) || 3000;',
    'const hostname = process.env.HOSTNAME || "127.0.0.1";',
    "let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10);",
    `const nextConfig = ${serializedConfig};`,
    "",
    "process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);",
    "",
    "// 根 server.js 位于镜像 app 目录外层，这里显式按镜像 app 目录解析 next 依赖。",
    'requireFromApp("next");',
    'const { startServer } = requireFromApp("next/dist/server/lib/start-server");',
    "",
    "if (",
    "  Number.isNaN(keepAliveTimeout) ||",
    "  !Number.isFinite(keepAliveTimeout) ||",
    "  keepAliveTimeout < 0",
    ") {",
    "  keepAliveTimeout = undefined;",
    "}",
    "",
    "startServer({",
    "  dir,",
    "  isDev: false,",
    "  config: nextConfig,",
    "  hostname,",
    "  port: currentPort,",
    "  allowRetry: false,",
    "  keepAliveTimeout,",
    "}).catch((error) => {",
    "  console.error(error);",
    "  process.exit(1);",
    "});",
    "",
  ].join("\n");
}

function preparePlatformRenderer(options = {}) {
  const electronAppRoot = options.electronAppRoot || path.resolve(__dirname, "..");
  const platformAppRoot = options.platformAppRoot || path.join(electronAppRoot, "..", "platform");
  const nextDistDir = path.join(platformAppRoot, NEXT_DIST_DIR_NAME);
  const requiredServerFilesPath = path.join(
    nextDistDir,
    REQUIRED_SERVER_FILES_MANIFEST_NAME
  );
  const nextServerTracePath = path.join(nextDistDir, NEXT_SERVER_TRACE_MANIFEST_NAME);
  const staticSource = path.join(nextDistDir, "static");
  const publicSource = path.join(platformAppRoot, "public");
  const rendererRoot = resolveProductionRendererRoot(electronAppRoot);
  const serverEntryPath = resolveProductionRendererServerEntryPath(electronAppRoot);
  const manifestPath = resolveProductionRendererManifestPath(electronAppRoot);

  if (!fs.existsSync(staticSource)) {
    throw new Error(`未找到 Next 静态资源目录：${staticSource}`);
  }

  if (!fs.existsSync(requiredServerFilesPath)) {
    throw new Error(
      [
        "未找到 Next required-server-files 清单，无法组装自包含的 traced runtime。",
        `请确认已在 apps/platform 构建出：${requiredServerFilesPath}`,
        "当前生产链路不再允许回退到工作区路径启动 next start。",
      ].join("\n")
    );
  }

  if (!fs.existsSync(nextServerTracePath)) {
    throw new Error(
      [
        "未找到 Next 生产服务的 nft trace 清单，无法组装自包含的 traced runtime。",
        `请确认已在 apps/platform 构建出：${nextServerTracePath}`,
      ].join("\n")
    );
  }

  const requiredServerFiles = readJsonFile(
    requiredServerFilesPath,
    "required-server-files 清单"
  );
  const tracingRoot =
    requiredServerFiles.config?.experimental?.outputFileTracingRoot || platformAppRoot;
  const relativeAppDir = path.relative(tracingRoot, platformAppRoot);
  const mirroredAppRoot = path.join(rendererRoot, relativeAppDir);
  const copiedRelativePaths = new Set();
  const copyOptions = {
    rendererRoot,
    tracingRoot,
    copiedRelativePaths,
  };

  ensureDirectoryReady(rendererRoot);
  copyPathIntoRenderer(requiredServerFilesPath, copyOptions);
  copyOptionalFile(path.join(platformAppRoot, "package.json"), copyOptions);
  copyOptionalFile(path.join(tracingRoot, "package.json"), copyOptions);

  for (const relativeFile of requiredServerFiles.files || []) {
    const sourcePath = path.join(platformAppRoot, relativeFile);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`required-server-files 引用的文件不存在：${sourcePath}`);
    }
    copyPathIntoRenderer(sourcePath, copyOptions);
  }

  for (const traceManifestPath of collectTraceManifestPaths(nextDistDir)) {
    copyTraceManifest(traceManifestPath, copyOptions);
  }

  copyGeneratedServerRuntimeDependencies({
    platformAppRoot,
    tracingRoot,
    rendererRoot,
    copiedRelativePaths,
  });

  copyDirectoryContents(
    staticSource,
    path.join(mirroredAppRoot, PRODUCTION_RENDERER_STATIC_DIR_RELATIVE_PATH)
  );
  if (fs.existsSync(publicSource)) {
    copyDirectoryContents(
      publicSource,
      path.join(mirroredAppRoot, PRODUCTION_RENDERER_PUBLIC_DIR_RELATIVE_PATH)
    );
  }

  fs.writeFileSync(
    serverEntryPath,
    buildRuntimeServerEntry({
      nextConfig: requiredServerFiles.config || {},
      relativeAppDir,
    }),
    "utf8"
  );

  const manifest = {
    kind: PRODUCTION_RENDERER_CONTRACT_KIND,
    contractVersion: PRODUCTION_RENDERER_CONTRACT_VERSION,
    rendererMode: PRODUCTION_RENDERER_MODE,
    selfContained: true,
    serverEntry: PRODUCTION_RENDERER_SERVER_ENTRY_RELATIVE_PATH,
    relativeAppDir: normalizeManifestPath(relativeAppDir || "."),
    staticDir: normalizeManifestPath(
      path.join(relativeAppDir, PRODUCTION_RENDERER_STATIC_DIR_RELATIVE_PATH)
    ),
    publicDir: fs.existsSync(publicSource)
      ? normalizeManifestPath(
          path.join(relativeAppDir, PRODUCTION_RENDERER_PUBLIC_DIR_RELATIVE_PATH)
        )
      : null,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  return {
    rendererRoot,
    serverEntryPath,
    manifestPath,
    relativeAppDir: manifest.relativeAppDir,
  };
}

function main() {
  preparePlatformRenderer();
}

if (require.main === module) {
  main();
}

module.exports = {
  copyDirectoryContents,
  copyResolvedModuleClosure,
  preparePlatformRenderer,
};
