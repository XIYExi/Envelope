import { createServerSupabase } from "@/lib/supabase/server";
import type { ProjectAuth } from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

/**
 * 只读：获取项目鉴权配置（可能为空）
 *
 * 说明：
 * - 当前用于“配置归档导出（部分选择）”的资源列表展示
 * - 鉴权配置通常是单条记录，因此返回 maybeSingle
 */
export async function getProjectAuth(projectId: string): Promise<ProjectAuth | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("project_auth")
    .select("*")
    .eq("project_id", projectId)
    .maybeSingle<ProjectAuth>();

  if (error) {
    console.error("Failed to fetch project auth:", error);
    throw mapSupabaseAuthzError(error) ??
      new ApiError({ status: 500, code: "PROJECT_AUTH.GET_FAILED", message: "Failed to fetch project auth", details: error });
  }

  return data ?? null;
}

