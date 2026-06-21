/**
 * API 路由错误分支测试。
 *
 * 覆盖范围：
 * - export / archive / sync 至少三类路由；
 * - 401/403/404/400 四种典型错误状态；
 * - 响应体不应包含 raw stacktrace（避免泄漏服务端内部细节）。
 *
 * 说明：
 * - 这些路由在实现中依赖 `createServerSupabase()`（内部会触发 next/headers），因此这里通过 vitest mock 注入可控的 supabase stub；
 * - supabase stub 基于既有 `test/helpers/mock-supabase`，并按需补充 `auth.getSession()` 等接口。
 *
 * @author xiye
 * @date 2026-06-20
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetPlatformBackendConfigForTests } from "@/lib/backend/config";
import { createMockSupabase } from "./helpers/mock-supabase";
import { createServerSupabase } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => {
  return {
    createServerSupabase: vi.fn(),
  };
});

type MockedCreateServerSupabase = ReturnType<typeof vi.fn<() => Promise<any>>>;

function createRuntimeUserSession(userId = "u_test") {
  return {
    data: {
      session: {
        user: { id: userId },
        access_token: "token_test",
      },
    },
    error: null,
  };
}

function assertNoRawStacktrace(bodyText: string) {
  expect(bodyText).not.toMatch(/[\r\n]\s*at\s+\S+/);
  expect(bodyText).not.toMatch(/node_modules[\\/]/);
}

function assertNoStackField(payload: unknown) {
  if (!payload || typeof payload !== "object") return;
  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    expect(key).not.toBe("stack");
    assertNoStackField(value);
  }
}

const ENV_KEYS = ["ENVELOPE_PLATFORM_BACKEND", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const;
let previousEnv: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> = {};

beforeEach(() => {
  previousEnv = {};
  for (const key of ENV_KEYS) previousEnv[key] = process.env[key];

  process.env.ENVELOPE_PLATFORM_BACKEND = "supabase";
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.com";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon_key_test";
  resetPlatformBackendConfigForTests();

  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (previousEnv[key] === undefined) delete process.env[key];
    else process.env[key] = previousEnv[key];
  }
  resetPlatformBackendConfigForTests();
  vi.restoreAllMocks();
});

describe("api route error branches", () => {
  it("export/tasks 401：未登录时返回 401，且不泄漏堆栈", async () => {
    const supabase = createMockSupabase();
    supabase.auth.getSession = async () => ({ data: { session: null }, error: null });

    const mocked = createServerSupabase as unknown as MockedCreateServerSupabase;
    mocked.mockResolvedValue(supabase);

    const route = await import("@/app/api/export/tasks/[taskId]/route");
    const response = await route.GET(new Request("http://localhost/api/export/tasks/any"), { params: { taskId: "any" } });

    expect(response.status).toBe(401);
    const bodyText = await response.clone().text();
    assertNoRawStacktrace(bodyText);
    const payload = JSON.parse(bodyText);
    assertNoStackField(payload);
  });

  it("archive/import/tasks 400：缺少 file 时返回 400，且不泄漏堆栈", async () => {
    const supabase = createMockSupabase();
    supabase.auth.getSession = async () => createRuntimeUserSession("u_archive");

    const mocked = createServerSupabase as unknown as MockedCreateServerSupabase;
    mocked.mockResolvedValue(supabase);

    const route = await import("@/app/api/archive/import/tasks/route");
    const form = new FormData();
    form.set("options", JSON.stringify({ mode: "create" }));
    const request = new Request("http://localhost/api/archive/import/tasks", { method: "POST", body: form });

    const response = await route.POST(request);
    expect(response.status).toBe(400);
    const bodyText = await response.clone().text();
    assertNoRawStacktrace(bodyText);
    const payload = JSON.parse(bodyText);
    assertNoStackField(payload);
  });

  it("sync/tasks 404：任务不存在时返回 404，且不泄漏堆栈", async () => {
    const supabase = createMockSupabase();
    supabase.auth.getSession = async () => createRuntimeUserSession("u_sync");

    const mocked = createServerSupabase as unknown as MockedCreateServerSupabase;
    mocked.mockResolvedValue(supabase);

    const route = await import("@/app/api/sync/tasks/[taskId]/route");
    const response = await route.GET(new Request("http://localhost/api/sync/tasks/missing"), { params: { taskId: "missing" } });

    expect(response.status).toBe(404);
    const bodyText = await response.clone().text();
    assertNoRawStacktrace(bodyText);
    const payload = JSON.parse(bodyText);
    assertNoStackField(payload);
  });

  it("projects/[id]/export 403：Supabase 权限错误时返回 403，且不泄漏堆栈", async () => {
    const supabase = createMockSupabase();
    supabase.auth.getSession = async () => createRuntimeUserSession("u_export");

    const originalFrom = supabase.from.bind(supabase);
    supabase.from = (table: string) => {
      if (table === "projects") {
        const builder: any = {};
        builder.select = () => builder;
        builder.eq = () => builder;
        builder.single = async () => ({
          data: null,
          error: { status: 403, code: "42501", message: "permission denied for table projects" },
        });
        return builder;
      }
      return originalFrom(table);
    };

    const mocked = createServerSupabase as unknown as MockedCreateServerSupabase;
    mocked.mockResolvedValue(supabase);

    const route = await import("@/app/api/projects/[id]/export/route");
    const response = await route.GET(new Request("http://localhost/api/projects/p1/export"), { params: { id: "p1" } });

    expect(response.status).toBe(403);
    const bodyText = await response.clone().text();
    assertNoRawStacktrace(bodyText);
    const payload = JSON.parse(bodyText);
    assertNoStackField(payload);
  });
});

