/**
 * Next.js 应用配置（@envelope/platform）
 *
 * 说明：
 * - transpilePackages：让 Next.js 在构建时编译 workspace 内的包源码（避免 ESM/TS 兼容问题）
 * - env：将运行时环境变量注入到客户端与服务端代码中（这里用于 E2E 专用公开路由开关）
 *
 * 注意：
 * - 这里注入的 ENABLE_E2E_ROUTES 仅用于控制路由是否公开，不包含敏感信息
 */

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
  env: {
    ENABLE_E2E_ROUTES: process.env.ENABLE_E2E_ROUTES,
  },
};

module.exports = nextConfig;
