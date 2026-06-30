import { defineConfig } from "vitest/config";
import * as path from "path";

/**
 * 本包的 Vitest 配置。
 *
 * 说明：
 * - 在 monorepo + Turbo 场景下，将每个 package 的测试配置收敛在包内，便于独立运行与缓存命中。
 * - 目前默认使用 node 环境，避免引入额外的 DOM 依赖（如 jsdom）。
 */
export default defineConfig({
  test: {
    environment: "node",
    /**
     * React 侧组件测试需要 DOM 能力，因此单独匹配到 jsdom 环境。
     *
     * 说明：
     * - 其余纯逻辑测试继续使用 node，避免额外的 DOM 依赖影响运行速度与稳定性
     * - 用例统一放在 test/react 目录，便于识别与维护
     */
    environmentMatchGlobs: [["test/react/**/*.test.tsx", "jsdom"]],
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
    setupFiles: ["test/setup.ts"],
    coverage: {
      enabled: true,
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "html", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.d.ts"],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
