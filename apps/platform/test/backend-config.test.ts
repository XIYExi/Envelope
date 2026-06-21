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
import {
  resetPlatformBackendConfigForTests,
  resolveDefaultLocalBackendRoot,
  resolvePlatformBackendConfig,
} from "@/lib/backend/config";

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

  it("defaults to local backend and builds local paths under user home", () => {
    const config = resolvePlatformBackendConfig({
      HOME: "/mock-home",
    });

    expect(config.mode).toBe("local");
    expect(config.storageMode).toBe("local");
    expect(config.localRoot).toBe(path.join("/mock-home", ".envelope", "local"));
    expect(config.sqlitePath).toBe(path.join("/mock-home", ".envelope", "local", "envelope.db"));
    expect(config.mediaRoot).toBe(path.join("/mock-home", ".envelope", "local", "media"));
  });

  it("prefers ENVELOPE_LOCAL_ROOT when provided", () => {
    const config = resolvePlatformBackendConfig({
      ENVELOPE_PLATFORM_BACKEND: "local",
      ENVELOPE_LOCAL_ROOT: path.join("/custom", "envelope-data"),
    });

    expect(config.localRoot).toBe(path.join("/custom", "envelope-data"));
    expect(config.sqlitePath).toBe(path.join("/custom", "envelope-data", "envelope.db"));
    expect(config.mediaRoot).toBe(path.join("/custom", "envelope-data", "media"));
  });

  it("resolveDefaultLocalBackendRoot reads HOME style env first", () => {
    expect(
      resolveDefaultLocalBackendRoot({
        HOME: "/demo-home",
      }),
    ).toBe(path.join("/demo-home", ".envelope", "local"));
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
