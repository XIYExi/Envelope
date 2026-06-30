import { defineConfig } from "vitest/config";
import * as path from "path";

/**
 * 本包的 Vitest 配置。
 *
 * Flow 包内部包含 TS/TSX 源码，但默认测试仍按 node 环境运行；
 * 如后续需要测试 React/DOM 行为，可再按需切换到 jsdom 并补充依赖。
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
