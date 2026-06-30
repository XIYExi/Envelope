type EnvLike = Record<string, string | undefined>;

export type SupabasePublicConfig = {
  url: string | null;
  anonKey: string | null;
};

export type SupabaseRuntimeState = {
  enabled: boolean;
  config: SupabasePublicConfig;
};

function normalize(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/**
 * 解析 Supabase 公开连接参数（URL/Anon Key）。
 *
 * 说明：
 * - 仅从环境变量中读取 `NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_ANON_KEY`；
 * - local 模式允许这两个变量缺失，并由上层选择“短路（stub）”逻辑；
 * - 该函数不依赖 Node API，可在 Edge Runtime / 浏览器打包上下文安全复用。
 *
 * @param env 环境变量集合
 * @returns 归一化后的 Supabase 公开配置
 * @author xiye
 * @date 2026-06-22
 */
export function resolveSupabasePublicConfig(env: EnvLike = process.env): SupabasePublicConfig {
  return {
    url: normalize(env.NEXT_PUBLIC_SUPABASE_URL),
    anonKey: normalize(env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  };
}

/**
 * 判断当前运行时是否启用 Supabase Auth。
 *
 * 规则：
 * - 同时存在 `NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 时，认为 Supabase Auth 可用；
 * - 缺失任一项时，认为处于 local/无 Supabase 的短路模式，上层应使用本地 stub，避免强制要求 URL/KEY。
 *
 * @param env 环境变量集合
 * @returns 是否启用 Supabase Auth
 * @author xiye
 * @date 2026-06-22
 */
export function isSupabaseAuthEnabled(env: EnvLike = process.env): boolean {
  const config = resolveSupabasePublicConfig(env);
  return Boolean(config.url && config.anonKey);
}

/**
 * 获取 Supabase 运行时状态（enabled + 解析后的配置）。
 *
 * @param env 环境变量集合
 * @returns Supabase 运行时状态
 * @author xiye
 * @date 2026-06-22
 */
export function resolveSupabaseRuntimeState(env: EnvLike = process.env): SupabaseRuntimeState {
  const config = resolveSupabasePublicConfig(env);
  return {
    enabled: Boolean(config.url && config.anonKey),
    config,
  };
}

