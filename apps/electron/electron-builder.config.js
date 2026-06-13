module.exports = {
  productName: "Envelope",
  appId: "com.envelope.platform",
  copyright: "Copyright © Envelope",
  npmRebuild: false,
  directories: {
    output: "release",
  },
  files: [
    "main/**/*",
    "preload/**/*",
    "package.json",
    "platform-build/**/*",
  ],
  extraResources: [],
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
    target: ["dir"],
    icon: "assets/icon.ico",
  },
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "Envelope",
  },
};
