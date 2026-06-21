/**
 * @file Electron Builder 打包配置。
 * @description 统一声明桌面端各平台产物、Windows NSIS 安装器与可选更新源配置，
 * 为安装包构建和 electron-updater 生成 `app-update.yml` 提供输入。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

const { createElectronUpdaterDependencyFileSets } = require("./scripts/electron-builder-dependency-files");

const publishUrl = process.env.ENVELOPE_UPDATE_FEED_URL;
const publishChannel = process.env.ENVELOPE_UPDATE_CHANNEL || "latest";

const config = {
  productName: "Envelope",
  appId: "com.envelope.platform",
  copyright: "Copyright © Envelope",
  npmRebuild: false, // 原生模块统一在 build:renderer 阶段先做 ABI 重建，避免打包阶段再次隐式改写依赖树。
  directories: {
    output: "release",
  },
  files: [
    "main/**/*",
    "preload/**/*",
    "package.json",
    // pnpm workspace 下 electron-updater 的传递依赖常以 junction 存在于 `.pnpm` 目录，
    // electron-builder 打包时可能只带上包本体而漏掉深层依赖，这里显式铺平复制以稳定 Windows 安装包运行时。
    ...createElectronUpdaterDependencyFileSets(),
  ],
  extraResources: [
    // traced runtime 的 `server.js` 需要由主进程直接 `spawn`。
    // 这里放到安装目录的真实 resources 下，避免被打进 `app.asar` 后在 Windows 上触发 ENOENT。
    {
      from: "platform-build",
      to: "platform-build",
      filter: ["**/*"],
    },
  ],
  mac: {
    category: "public.app-category.developer-tools",
    target: ["dmg", "zip"],
    icon: "assets/icon.icns",
  },
  dmg: {
    iconSize: 100,
    contents: [
      { x: 380, y: 280, type: "link", path: "/Applications" },
      { x: 110, y: 280, type: "file" },
    ],
    window: { width: 500, height: 500 },
  },
  linux: {
    target: ["AppImage", "deb"],
    icon: "assets/icon.png",
    category: "Development",
  },
  win: {
    // ISC-119 要求 Windows 产物收口为安装包链路，这里改为输出 NSIS 安装器，
    // 不再继续生成仅适合本地解压分发的目录包（dir）。
    target: ["nsis"],
    icon: "assets/icon.ico",
  },
  nsis: {
    // 保留向导式安装，便于测试和正式分发时自定义安装目录。
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    // 显式保留桌面与开始菜单快捷方式，避免切换安装链路后体验回退。
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "Envelope",
  },
};

if (publishUrl) {
  // electron-updater 依赖打包阶段生成的 app-update.yml；这里通过环境变量注入通用更新源，
  // 让 CI 可以按环境切换发布地址，同时避免把私有源硬编码进仓库。
  config.publish = [
    {
      provider: "generic",
      url: publishUrl,
      channel: publishChannel,
    },
  ];
}

module.exports = config;
