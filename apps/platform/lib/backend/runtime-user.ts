/**
 * 运行时用户上下文解析工具。
 *
 * 职责：
 * - 在 Supabase 模式下复用服务端 session 获取真实用户与 access token；
 * - 在 local 模式下返回固定的本地用户身份，避免业务链路仍强依赖云端会话；
 * - 让导出、归档、任务查询等 API 可以统一按“当前后端模式”取用户上下文。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第三阶段后端门面重构
 */
import { apiErrors } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { createServerSupabase } from "@/lib/supabase/server";

export type RuntimeRequestUser = {
  /** 当前请求拥有者 ID。 */
  userId: string;
  /** Supabase 模式下的访问令牌；本地模式无需提供。 */
  accessToken?: string;
};

/**
 * 获取当前请求的运行时用户信息。
 *
 * @returns 统一用户上下文
 * @author xiye
 * @date 2026-06-20
 */
export async function requireRuntimeRequestUser(): Promise<RuntimeRequestUser> {
  const backendConfig = getPlatformBackendConfig();
  if (backendConfig.mode === "local") {
    return {
      userId: backendConfig.localUserId,
    };
  }

  const supabase = await createServerSupabase();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData.session?.user?.id) throw apiErrors.unauthorized();

  return {
    userId: sessionData.session.user.id,
    accessToken: sessionData.session.access_token,
  };
}

/**
 * 仅获取当前请求用户 ID。
 *
 * @returns 当前请求用户 ID
 * @author xiye
 * @date 2026-06-20
 */
export async function requireRuntimeUserId(): Promise<string> {
  const user = await requireRuntimeRequestUser();
  return user.userId;
}
