import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createLocalSupabaseStub } from "@/lib/supabase/local-stub";
import { resolveSupabaseRuntimeState } from "@/lib/supabase/runtime";

/**
 * 创建服务端 Supabase Client（或 local stub）。
 *
 * local 模式策略：
 * - 当未配置 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` 时直接返回 stub；
 * - middleware、auth 回调等链路可在 local 模式“短路”，避免强制要求 Supabase URL/KEY。
 *
 * @returns Supabase 客户端（可能为 stub）
 * @author xiye
 * @date 2026-06-22
 */
export async function createServerSupabase(): Promise<SupabaseClient> {
  const state = resolveSupabaseRuntimeState();
  if (!state.enabled || !state.config.url || !state.config.anonKey) {
    return createLocalSupabaseStub();
  }

  const cookieStore = await cookies();

  return createServerClient(
    state.config.url,
    state.config.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}
