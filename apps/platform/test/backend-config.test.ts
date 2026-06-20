/**
 * 后端运行时配置测试。
 *
 * 验证点：
 * - `supabase` 模式可以正确读取云端连接参数；
 * - `local` 模式可以生成默认本地目录；
 * - `custom` 模式在配置缺失时能及时失败，避免运行期连锁错误。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `resolvePlatformBackendConfig()`
 */
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ApiError } from "@/lib/api/errors";
import { resetPlatformBackendConfigForTests, resolvePlatformBackendConfig } from "@/lib/backend/config";

afterEach(() => {
  resetPlatformBackendConfigForTests();
});

describe("platform backend config", () => {
  it("resolves supabase mode from env", () => {
    const config = resolvePlatformBackendConfig({
      ENVELOPE_PLATFORM_BACKEND: "supabase",
      NEXT_PUBLIC_SUPABASE_URL: "https://demo.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    });

    expect(config).toMatchObject({
      mode: "supabase",
      storageMode: "supabase",
      supabaseUrl: "https://demo.supabase.co",
    });
  });

  it("builds default local paths", () => {
    const config = resolvePlatformBackendConfig({
      ENVELOPE_PLATFORM_BACKEND: "local",
    });

    expect(config.mode).toBe("local");
    expect(config.storageMode).toBe("local");
    expect(config.sqlitePath).toBe(path.join(process.cwd(), ".envelope", "local", "envelope.db"));
    expect(config.mediaRoot).toBe(path.join(process.cwd(), ".envelope", "local", "media"));
  });

  it("rejects incomplete custom config", () => {
    expect(() =>
      resolvePlatformBackendConfig({
        ENVELOPE_PLATFORM_BACKEND: "custom",
        ENVELOPE_CUSTOM_DATABASE_URL: "postgres://localhost:5432/demo",
      }),
    ).toThrow(ApiError);
  });
});
