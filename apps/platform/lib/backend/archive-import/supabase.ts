/**
 * 归档导入写链路的 Supabase 适配器。
 *
 * 作用：
 * - 将归档导入门面映射到 Supabase `projects` 与 `project_*` 表操作；
 * - 让 archive task 可以显式注入 access token 对应的客户端；
 * - 保持云端模式下的导入行为，同时与 local 模式共用同一套上层业务逻辑。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 归档导入写链路门面化
 */
import type {
  Project,
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
import { ApiError } from "@/lib/api/errors";
import type { ArchiveImportRepository, ArchiveImportRepositoryContext } from "./types";

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
 * 创建 Supabase 版本的归档导入门面。
 *
 * @param context 归档导入上下文
 * @returns Supabase 归档导入适配器
 * @author xiye
 * @date 2026-06-20
 */
export function createSupabaseArchiveImportRepository(context: ArchiveImportRepositoryContext): ArchiveImportRepository {
  if (!context.supabase) {
    throw new ApiError({
      status: 500,
      code: "ARCHIVE_IMPORT.MISSING_SUPABASE_CLIENT",
      message: "Supabase archive import repository requires a Supabase client",
    });
  }

  const supabase = context.supabase;

  return {
    async createProject(input): Promise<Project> {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          ...(input.id ? { id: input.id } : {}),
          user_id: context.ownerUserId,
          name: input.name,
          description: input.description ?? "",
          schema_version: input.schema_version ?? "3.0.0",
          config: input.config ?? {},
        })
        .select("*")
        .single<Project>();
      if (error) throw error;
      return data;
    },

    async listPages(projectId: string): Promise<ProjectPage[]> {
      const { data, error } = await supabase
        .from("project_pages")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true })
        .returns<ProjectPage[]>();
      if (error) throw error;
      return data ?? [];
    },

    async upsertPages(projectId: string, pages) {
      const inserts: ProjectPageInsert[] = pages.map((page) => ({
        ...(page.id ? { id: page.id } : {}),
        project_id: projectId,
        path: page.path,
        title: page.title,
        description: page.description ?? "",
        schema: page.schema ?? {},
        metadata: page.metadata ?? {},
        sort_order: page.sort_order ?? 0,
        is_published: page.is_published ?? false,
      }));
      const { error } = await supabase.from("project_pages").upsert(inserts, { onConflict: "project_id,path" });
      if (error) throw error;
      return this.listPages(projectId);
    },

    async listRoutes(projectId: string): Promise<ProjectRoute[]> {
      const { data, error } = await supabase
        .from("project_routes")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true })
        .returns<ProjectRoute[]>();
      if (error) throw error;
      return data ?? [];
    },

    async upsertRoutes(projectId: string, routes) {
      const inserts: ProjectRouteInsert[] = routes.map((route) => ({
        ...(route.id ? { id: route.id } : {}),
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
      const { error } = await supabase.from("project_routes").upsert(inserts, { onConflict: "project_id,path" });
      if (error) throw error;
      return this.listRoutes(projectId);
    },

    async listFlows(projectId: string): Promise<ProjectFlow[]> {
      const { data, error } = await supabase
        .from("project_flows")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true })
        .returns<ProjectFlow[]>();
      if (error) throw error;
      return data ?? [];
    },

    async upsertFlows(projectId: string, flows) {
      const inserts: ProjectFlowInsert[] = flows.map((flow) => ({
        ...(flow.id ? { id: flow.id } : {}),
        project_id: projectId,
        name: flow.name,
        description: flow.description ?? "",
        flow_type: flow.flow_type ?? "action",
        yaml_content: flow.yaml_content ?? "",
        trigger_event: flow.trigger_event ?? null,
        is_active: flow.is_active ?? true,
      }));
      const { error } = await supabase.from("project_flows").upsert(inserts, { onConflict: "id" });
      if (error) throw error;
      return this.listFlows(projectId);
    },

    async listModels(projectId: string): Promise<ProjectModel[]> {
      const { data, error } = await supabase
        .from("project_models")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true })
        .returns<ProjectModel[]>();
      if (error) throw error;
      return data ?? [];
    },

    async upsertModels(projectId: string, models) {
      const inserts: ProjectModelInsert[] = models.map((model) => ({
        ...(model.id ? { id: model.id } : {}),
        project_id: projectId,
        table_name: model.table_name,
        schema: model.schema ?? {},
        rls_policies: model.rls_policies ?? [],
      }));
      const { error } = await supabase.from("project_models").upsert(inserts, { onConflict: "project_id,table_name" });
      if (error) throw error;
      return this.listModels(projectId);
    },

    async listEndpoints(projectId: string): Promise<ProjectEndpoint[]> {
      const { data, error } = await supabase
        .from("project_endpoints")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true })
        .returns<ProjectEndpoint[]>();
      if (error) throw error;
      return data ?? [];
    },

    async upsertEndpoints(projectId: string, endpoints) {
      const inserts: ProjectEndpointInsert[] = endpoints.map((endpoint) => ({
        ...(endpoint.id ? { id: endpoint.id } : {}),
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
      const { error } = await supabase.from("project_endpoints").upsert(inserts, { onConflict: "id" });
      if (error) throw error;
      return this.listEndpoints(projectId);
    },

    async getAuth(projectId: string): Promise<ProjectAuth | null> {
      const { data, error } = await supabase
        .from("project_auth")
        .select("*")
        .eq("project_id", projectId)
        .maybeSingle<ProjectAuth>();
      if (error) throw error;
      return data ?? null;
    },

    async upsertAuth(projectId: string, auth) {
      const insert: ProjectAuthInsert = {
        ...(auth.id ? { id: auth.id } : {}),
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
      if (error) throw error;
      return data;
    },
  };
}
