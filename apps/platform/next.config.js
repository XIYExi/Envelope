const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // monorepo 中的工作区包需要纳入 trace，后续由 Electron 手工组装自包含运行时。
    outputFileTracingRoot: path.join(__dirname, "..", ".."),
  },
  eslint: {
    // 当前工作树存在历史 lint 存量，先避免其阻塞渲染端构建链路。
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    "@envelope/engine",
    "@envelope/materials",
    "@envelope/flow",
    "@envelope/generator",
  ],
};

module.exports = nextConfig;
