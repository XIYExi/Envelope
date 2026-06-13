/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@envelope/engine",
    "@envelope/materials",
    "@envelope/flow",
    "@envelope/generator",
  ],
  experimental: {},
};

module.exports = nextConfig;
