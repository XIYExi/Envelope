/**
 * 项目编辑器资源的 Supabase 适配器。
 *
 * 作用：
 * - 将统一的 `ProjectResourceRepository` 接口映射到 Supabase 表操作；
 * - 保持云端模式下 `pages/routes/models/flows/endpoints/auth` 的现有行为不变；
 * - 让 service 层不再散落着对具体表名和查询细节的直接依赖。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `ProjectResourceRepository`
 */
import { createServerSupabase } from "@/lib/supabase/server";
import type {
  ProjectAuth,
  ProjectAuthInsert,
  ProjectEndpoint,
  ProjectEndpointInsert,
  ProjectFlow,
  ProjectFlowInsert,
  ProjectModel,
  ProjectModelInsert,
  ProjectPage,
  ProjectPageInsert,
  ProjectRoute,
  ProjectRouteInsert,
} from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";
import type {
  ProjectResourceRepository,
  SaveProjectAuthInput,
  SaveProjectEndpointInput,
  SaveProjectFlowInput,
  SaveProjectModelInput,
  SaveProjectPageInput,
  SaveProjectRouteInput,
} from "./types";

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

function normalizeMiddleware(input: unknown): Record<string, unknown>[] {
  if (Array.isArray(input)) {
    return input.filter((item) => typeof item === "object" && item !== null && !Array.isArray(item)) as Record<string, unknown>[];
  }
  if (typeof input === "object" && input !== null) {
    return [input as Record<string, unknown>];
  }
  return [];
}

/**
 * 创建 Supabase 版本的项目资源仓储。
 *
 * 核心链路：
 * - service 通过统一接口发起资源查询或保存；
 * - 仓储内部再映射到 `project_pages/project_routes/project_models` 表；
 * - 这样云端实现细节被收敛在适配器内部。
 *
 * @returns Supabase 项目资源仓储实现
 * @author xiye
 * @date 2026-06-20
 */
export function createSupabaseProjectResourceRepository(): ProjectResourceRepository {
  return {
    async listPages(projectId: string): Promise<ProjectPage[]> {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from("project_pages")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch project pages:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_PAGES.LIST_FAILED", message: "Failed to fetch project pages", details: error });
      }

      return data ?? [];
    },

    async upsertPages(projectId: string, pages: SaveProjectPageInput[]): Promise<ProjectPage[]> {
      const supabase = await createServerSupabase();
      const inserts: ProjectPageInsert[] = pages.map((page) => ({
        id: page.id,
        project_id: projectId,
        path: page.path,
        title: page.title,
        description: page.description ?? "",
        schema: page.schema ?? {},
        metadata: page.metadata ?? {},
        sort_order: page.sort_order ?? 0,
        is_published: page.is_published ?? false,
      }));

      const { error } = await supabase
        .from("project_pages")
        .upsert(inserts, { onConflict: "project_id,path" });

      if (error) {
        console.error("Failed to upsert project pages:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_PAGES.SAVE_FAILED", message: "Failed to save project pages", details: error });
      }

      return this.listPages(projectId);
    },

    async listRoutes(projectId: string): Promise<ProjectRoute[]> {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from("project_routes")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch project routes:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_ROUTES.LIST_FAILED", message: "Failed to fetch project routes", details: error });
      }

      return data ?? [];
    },

    async upsertRoutes(projectId: string, routes: SaveProjectRouteInput[]): Promise<ProjectRoute[]> {
      const supabase = await createServerSupabase();
      const inserts: ProjectRouteInsert[] = routes.map((route) => ({
        id: route.id,
        project_id: projectId,
        path: route.path,
        page_id: route.page_id ?? null,
        layout_id: route.layout_id ?? null,
        auth_required: route.auth_required ?? false,
        roles: route.roles ?? [],
        middleware_config: route.middleware_config ?? {},
        metadata: route.metadata ?? {},
        parent_route_id: route.parent_route_id ?? null,
        sort_order: route.sort_order ?? 0,
      }));

      const { error } = await supabase
        .from("project_routes")
        .upsert(inserts, { onConflict: "project_id,path" });

      if (error) {
        console.error("Failed to upsert project routes:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_ROUTES.SAVE_FAILED", message: "Failed to save project routes", details: error });
      }

      return this.listRoutes(projectId);
    },

    async listModels(projectId: string): Promise<ProjectModel[]> {
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
    },

    async upsertModels(projectId: string, models: SaveProjectModelInput[]): Promise<ProjectModel[]> {
      const supabase = await createServerSupabase();
      const inserts: ProjectModelInsert[] = models.map((model) => ({
        id: model.id,
        project_id: projectId,
        table_name: model.table_name,
        schema: model.schema ?? {},
        rls_policies: model.rls_policies ?? [],
      }));

      const { error } = await supabase
        .from("project_models")
        .upsert(inserts, { onConflict: "project_id,table_name" });

      if (error) {
        console.error("Failed to upsert project models:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_MODELS.SAVE_FAILED", message: "Failed to save project models", details: error });
      }

      return this.listModels(projectId);
    },

    async listFlows(projectId: string): Promise<ProjectFlow[]> {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from("project_flows")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Failed to fetch project flows:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_FLOWS.LIST_FAILED", message: "Failed to fetch project flows", details: error });
      }

      return data ?? [];
    },

    async upsertFlows(projectId: string, flows: SaveProjectFlowInput[]): Promise<ProjectFlow[]> {
      const supabase = await createServerSupabase();
      const inserts: ProjectFlowInsert[] = flows.map((flow) => ({
        id: flow.id,
        project_id: projectId,
        name: flow.name,
        description: flow.description ?? "",
        flow_type: flow.flow_type ?? "action",
        yaml_content: flow.yaml_content ?? "",
        trigger_event: flow.trigger_event ?? null,
        is_active: flow.is_active ?? true,
      }));

      const { error } = await supabase
        .from("project_flows")
        .upsert(inserts, { onConflict: "id" });

      if (error) {
        console.error("Failed to upsert project flows:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_FLOWS.SAVE_FAILED", message: "Failed to save project flows", details: error });
      }

      return this.listFlows(projectId);
    },

    async listEndpoints(projectId: string): Promise<ProjectEndpoint[]> {
      const supabase = await createServerSupabase();
      const { data, error } = await supabase
        .from("project_endpoints")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Failed to fetch project endpoints:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_ENDPOINTS.LIST_FAILED", message: "Failed to fetch project endpoints", details: error });
      }

      return data ?? [];
    },

    async upsertEndpoints(projectId: string, endpoints: SaveProjectEndpointInput[]): Promise<ProjectEndpoint[]> {
      const supabase = await createServerSupabase();
      const inserts: ProjectEndpointInsert[] = endpoints.map((endpoint) => ({
        id: endpoint.id,
        project_id: projectId,
        method: endpoint.method,
        path: endpoint.path,
        description: endpoint.description ?? "",
        request_schema: endpoint.request_schema ?? {},
        response_schema: endpoint.response_schema ?? {},
        middleware: normalizeMiddleware(endpoint.middleware),
        flow_id: endpoint.flow_id ?? null,
        is_active: endpoint.is_active ?? true,
      }));

      const { error } = await supabase
        .from("project_endpoints")
        .upsert(inserts, { onConflict: "id" });

      if (error) {
        console.error("Failed to upsert project endpoints:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_ENDPOINTS.SAVE_FAILED", message: "Failed to save project endpoints", details: error });
      }

      return this.listEndpoints(projectId);
    },

    async getAuth(projectId: string): Promise<ProjectAuth | null> {
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
    },

    async upsertAuth(projectId: string, auth: SaveProjectAuthInput): Promise<ProjectAuth> {
      const supabase = await createServerSupabase();
      const insert: ProjectAuthInsert = {
        id: auth.id,
        project_id: projectId,
        providers: Array.isArray(auth.providers) ? auth.providers : [],
        redirect_urls: auth.redirect_urls ?? {},
        session_config: auth.session_config ?? {},
      };

      const { data, error } = await supabase
        .from("project_auth")
        .upsert(insert, { onConflict: "project_id" })
        .select("*")
        .single<ProjectAuth>();

      if (error) {
        console.error("Failed to upsert project auth:", error);
        throw mapSupabaseAuthzError(error) ??
          new ApiError({ status: 500, code: "PROJECT_AUTH.SAVE_FAILED", message: "Failed to save project auth", details: error });
      }

      return data;
    },
  };
}
