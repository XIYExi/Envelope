import { createServerSupabase } from "@/lib/supabase/server";
import type { ProjectModel } from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

/**
 * 只读：获取项目数据模型配置
 *
 * 说明：
 * - 当前用于“配置归档导出（部分选择）”的资源列表展示
 * - 写入接口后续再按编辑器能力补齐
 */
export async function getProjectModels(projectId: string): Promise<ProjectModel[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("project_models")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch project models:", error);
    throw mapSupabaseAuthzError(error) ??
      new ApiError({ status: 500, code: "PROJECT_MODELS.LIST_FAILED", message: "Failed to fetch project models", details: error });
  }

  return data ?? [];
}

