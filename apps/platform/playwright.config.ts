import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright 配置（apps/platform）
 *
 * 关键点：
 * - webServer 使用 next dev 启动本地服务，确保用例运行时有真实的浏览器环境
 * - 注入 ENABLE_E2E_ROUTES=1，用于开放 /e2e 路由前缀（仅测试用途）
 * - 默认使用 Playwright 自带浏览器（CI 适配）。若本地下载受限，可通过环境变量切换使用系统浏览器通道：
 *   - PLAYWRIGHT_CHANNEL=chrome   // 使用本机已安装的 Chrome（无需 playwright install）
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    env: {
      ...process.env,
      ENABLE_E2E_ROUTES: "1",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
      },
    },
  ],
});
