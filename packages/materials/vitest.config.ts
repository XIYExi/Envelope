import { defineConfig } from "vitest/config";
import * as path from "path";

/**
 * 本包的 Vitest 配置（组件/类型注册等逻辑的单元测试入口）。
 *
 * 说明：
 * - 测试文件统一放在 test/ 下，便于 Turbo 的 inputs 规则收集。
 * - 保持 node 环境，避免因 DOM 环境引入额外依赖。
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
