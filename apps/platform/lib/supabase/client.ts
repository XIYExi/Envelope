import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createLocalSupabaseStub } from "@/lib/supabase/local-stub";
import { resolveSupabaseRuntimeState } from "@/lib/supabase/runtime";

/**
 * 创建浏览器端 Supabase Client（或 local stub）。
 *
 * local 模式策略：
 * - 当未配置 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` 时直接返回 stub；
 * - 让本地开发/桌面模式不再强制依赖 Supabase URL/KEY。
 *
 * @returns Supabase 客户端（可能为 stub）
 * @author xiye
 * @date 2026-06-22
 */
export function createClient(): SupabaseClient {
  const state = resolveSupabaseRuntimeState();
  if (!state.enabled || !state.config.url || !state.config.anonKey) {
    return createLocalSupabaseStub();
  }

  return createBrowserClient(state.config.url, state.config.anonKey);
}
