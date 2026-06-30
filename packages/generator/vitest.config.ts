import { defineConfig } from "vitest/config";
import * as path from "path";

/**
 * 本包的 Vitest 配置（生成器相关逻辑通常是纯 Node 侧代码）。
 *
 * 关键点：
 * - environment 使用 node，便于测试文件系统/字符串生成等逻辑。
 * - 提供 @ -> src 的别名，测试文件可以更清晰地引用源码。
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
