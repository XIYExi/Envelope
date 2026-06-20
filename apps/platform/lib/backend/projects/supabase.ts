/**
 * 项目资源的 Supabase 适配器。
 *
 * 作用：
 * - 将统一的 `ProjectRepository` 接口映射到 Supabase 表操作；
 * - 保持现有云端模式行为不变；
 * - 为 service 层提供无感切换能力。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `ProjectRepository`
 */
import { createServerSupabase } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";
import type { CreateProjectInput, ProjectRepository, UpdateProjectInput } from "./types";

/**
 * 判断 Supabase 是否返回了“记录不存在”错误。
 *
 * @param error Supabase 异常对象
 * @author xiye
 * @date 2026-06-20
 */
function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: unknown }).code === "PGRST116";
}

/**
 * 将 Supabase 的鉴权错误映射为平台统一 API 错误。
 *
 * @param error Supabase 异常对象
 * @returns 平台统一错误；非鉴权错误时返回 null
 * @author xiye
 * @date 2026-06-20
 */
function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

/**
 * 创建 Supabase 项目仓储。
 *
 * 核心链路：
 * - service 调用统一仓储接口；
 * - 仓储内部再通过 Supabase Client 访问 `projects` 表；
 * - 这样上层无需直接依赖任何 Supabase 细节。
 *
 * @returns Supabase 版本的项目仓储实现
 * @author xiye
 * @date 2026-06-20
 */
export function createSupabaseProjectRepository(): ProjectRepository {
  return {
    async list() {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });
      if (error) {
        console.error("Failed to fetch projects:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT.LIST_FAILED", message: "Failed to fetch projects", details: error });
      }
      return data;
    },

    async get(id: string) {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
      if (error) {
        console.error("Failed to fetch project:", error);
        if (isNotFoundError(error)) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT.GET_FAILED", message: "Failed to fetch project", details: error });
      }
      return data;
    },

    async create(input: CreateProjectInput) {
      const supabase = await createServerSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw apiErrors.unauthorized();
      const { data, error } = await supabase.from("projects").insert({ ...input, user_id: user.id }).select().single();
      if (error) {
        console.error("Failed to create project:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT.CREATE_FAILED", message: "Failed to create project", details: error });
      }
      return data;
    },

    async update(id: string, input: UpdateProjectInput) {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase.from("projects").update(input).eq("id", id).select().single();
      if (error) {
        console.error("Failed to update project:", error);
        if (isNotFoundError(error)) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT.UPDATE_FAILED", message: "Failed to update project", details: error });
      }
      return data;
    },

    async delete(id: string) {
      const supabase = await createServerSupabase();
      const { error } = await supabase.from("projects").delete().eq("id", id).select("id").single();
      if (error) {
        console.error("Failed to delete project:", error);
        if (isNotFoundError(error)) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT.DELETE_FAILED", message: "Failed to delete project", details: error });
      }
    },

    async duplicate() {
      throw new ApiError({
        status: 500,
        code: "PROJECT.DUPLICATE_UNSUPPORTED",
        message: "Use service-level duplication for Supabase backend",
      });
    },
  };
}

export { isNotFoundError, mapSupabaseAuthzError };
