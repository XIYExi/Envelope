import { randomUUID } from "node:crypto";
/**
 * 项目服务层。
 *
 * 职责：
 * - 对 API 层暴露统一的项目读写能力；
 * - 将“后端选择逻辑”下沉到 repository 门面；
 * - 在仍依赖 Supabase 深复制的链路上保留旧逻辑，确保兼容性。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第一阶段后端门面重构
 */
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import { isNotFoundError, mapSupabaseAuthzError } from "@/lib/backend/projects/supabase";
import { createServerSupabase } from "@/lib/supabase/server";
import type {
  Project,
  ProjectAuthInsert,
  ProjectEndpointInsert,
  ProjectFlowInsert,
  ProjectModelInsert,
  ProjectPageInsert,
  ProjectRouteInsert,
} from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

export async function getProjects(): Promise<Project[]> {
  return getProjectRepository().list();
}

export async function getProject(id: string): Promise<Project> {
  return getProjectRepository().get(id);
}

export async function createProject(input: { id?: string; name: string; description?: string; schema_version?: string; config?: Record<string, unknown> }): Promise<Project> {
  return getProjectRepository().create(input);
}

export async function updateProject(
  id: string,
  input: { name?: string; description?: string; config?: Record<string, unknown> },
): Promise<Project> {
  return getProjectRepository().update(id, input);
}

export async function deleteProject(id: string): Promise<void> {
  return getProjectRepository().delete(id);
}

/**
 * 复制项目。
 *
 * 核心链路：
 * - local 模式：直接交给本地 repository 做最小闭环复制；
 * - supabase 模式：沿用旧的深复制逻辑，确保 pages/routes/flows/models/endpoints/auth 一并复制；
 * - 这样可以在“先门面化、后分阶段迁移”的过程中保持已有能力不退化。
 *
 * @param id 原项目 ID
 * @param newName 新项目名称
 * @returns 复制后的新项目
 * @author xiye
 * @date 2026-06-20
 * @since `getProjectRepository()`
 */
export async function duplicateProject(id: string, newName: string): Promise<Project> {
  const backendConfig = getPlatformBackendConfig();
  if (backendConfig.mode === "local") {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const original = await getProject(id);

    /**
     * 本地模式下的深复制链路。
     *
     * 核心链路：
     * - 先复制项目主记录；
     * - 再通过统一资源门面复制 pages/routes/models/flows/endpoints/auth；
     * - 对需要跨资源引用的字段执行 ID 重映射，避免复制后形成悬空引用。
     *
     * @author xiye
     * @date 2026-06-20
     * @since `getProjectResourceRepository()`
     */
    const createdProject = await projectRepository.create({
      name: newName,
      description: original.description,
      config: original.config,
      schema_version: original.schema_version,
    });

    const [pages, routes, models, flows, endpoints, auth] = await Promise.all([
      resourceRepository.listPages(id),
      resourceRepository.listRoutes(id),
      resourceRepository.listModels(id),
      resourceRepository.listFlows(id),
      resourceRepository.listEndpoints(id),
      resourceRepository.getAuth(id),
    ]);

    const pageIdMap = new Map<string, string>();
    if (pages.length > 0) {
      const insertedPages = await resourceRepository.upsertPages(
        createdProject.id,
        pages.map((page) => ({
          path: page.path,
          title: page.title,
          description: page.description,
          schema: page.schema,
          metadata: page.metadata,
          sort_order: page.sort_order,
          is_published: page.is_published,
        })),
      );
      const insertedPagesByPath = new Map(insertedPages.map((page) => [page.path, page.id]));
      for (const originalPage of pages) {
        const newPageId = insertedPagesByPath.get(originalPage.path);
        if (newPageId) pageIdMap.set(originalPage.id, newPageId);
      }
    }

    const routeIdMap = new Map<string, string>();
    if (routes.length > 0) {
      const insertedRoutes = await resourceRepository.upsertRoutes(
        createdProject.id,
        routes.map((route) => ({
          path: route.path,
          page_id: route.page_id ? pageIdMap.get(route.page_id) ?? null : null,
          layout_id: route.layout_id,
          auth_required: route.auth_required,
          roles: route.roles,
          middleware_config: route.middleware_config,
          metadata: route.metadata,
          parent_route_id: null,
          sort_order: route.sort_order,
        })),
      );
      const insertedRoutesByPath = new Map(insertedRoutes.map((route) => [route.path, route.id]));
      for (const originalRoute of routes) {
        const newRouteId = insertedRoutesByPath.get(originalRoute.path);
        if (newRouteId) routeIdMap.set(originalRoute.id, newRouteId);
      }

      const routesWithParents = routes
        .filter((route) => route.parent_route_id)
        .map((route) => ({
          path: route.path,
          page_id: route.page_id ? pageIdMap.get(route.page_id) ?? null : null,
          layout_id: route.layout_id,
          auth_required: route.auth_required,
          roles: route.roles,
          middleware_config: route.middleware_config,
          metadata: route.metadata,
          parent_route_id: route.parent_route_id ? routeIdMap.get(route.parent_route_id) ?? null : null,
          sort_order: route.sort_order,
        }));
      if (routesWithParents.length > 0) {
        await resourceRepository.upsertRoutes(createdProject.id, routesWithParents);
      }
    }

    if (models.length > 0) {
      await resourceRepository.upsertModels(
        createdProject.id,
        models.map((model) => ({
          table_name: model.table_name,
          schema: model.schema,
          rls_policies: model.rls_policies,
        })),
      );
    }

    const flowIdMap = new Map<string, string>();
    if (flows.length > 0) {
      const duplicatedFlows = flows.map((flow) => {
        const duplicatedId = randomUUID();
        flowIdMap.set(flow.id, duplicatedId);
        return {
          id: duplicatedId,
          name: flow.name,
          description: flow.description,
          flow_type: flow.flow_type,
          yaml_content: flow.yaml_content,
          trigger_event: flow.trigger_event,
          is_active: flow.is_active,
        };
      });
      await resourceRepository.upsertFlows(createdProject.id, duplicatedFlows);
    }

    if (endpoints.length > 0) {
      await resourceRepository.upsertEndpoints(
        createdProject.id,
        endpoints.map((endpoint) => ({
          method: endpoint.method,
          path: endpoint.path,
          description: endpoint.description,
          request_schema: endpoint.request_schema,
          response_schema: endpoint.response_schema,
          middleware: endpoint.middleware,
          flow_id: endpoint.flow_id ? flowIdMap.get(endpoint.flow_id) ?? null : null,
          is_active: endpoint.is_active,
        })),
      );
    }

    if (auth) {
      await resourceRepository.upsertAuth(createdProject.id, {
        providers: auth.providers,
        redirect_urls: auth.redirect_urls,
        session_config: auth.session_config,
      });
    }

    return createdProject;
  }

  if (backendConfig.mode !== "supabase") {
    return getProjectRepository().duplicate(id, newName);
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw apiErrors.unauthorized();

  const original = await getProject(id);

  let createdProject: Project | null = null;
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: newName,
        description: original.description,
        config: original.config,
        schema_version: original.schema_version,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to duplicate project:", error);
      throw mapSupabaseAuthzError(error) ??
        new ApiError({ status: 500, code: "PROJECT.DUPLICATE_FAILED", message: "Failed to duplicate project", details: error });
    }

    createdProject = data;
    if (!createdProject) {
      throw new ApiError({
        status: 500,
        code: "PROJECT.DUPLICATE_FAILED",
        message: "Failed to duplicate project",
      });
    }
    const createdProjectId = createdProject.id;

    const { data: pages, error: pagesError } = await supabase
      .from("project_pages")
      .select("*")
      .eq("project_id", id)
      .order("sort_order", { ascending: true });

    if (pagesError) {
      console.error("Failed to fetch pages for duplication:", pagesError);
      throw mapSupabaseAuthzError(pagesError) ??
        new ApiError({
          status: 500,
          code: "PROJECT.DUPLICATE_FAILED",
          message: "Failed to duplicate project pages",
          details: pagesError,
        });
    }

    const pageIdMap = new Map<string, string>();
    if (pages && pages.length > 0) {
      const pageInserts: ProjectPageInsert[] = pages.map((p) => ({
        project_id: createdProjectId,
        path: p.path,
        title: p.title,
        description: p.description,
        schema: p.schema,
        metadata: p.metadata,
        sort_order: p.sort_order,
        is_published: p.is_published,
      }));

      const { data: insertedPages, error: insertPagesError } = await supabase
        .from("project_pages")
        .insert(pageInserts)
        .select("*");

      if (insertPagesError) {
        console.error("Failed to duplicate project pages:", insertPagesError);
        throw mapSupabaseAuthzError(insertPagesError) ??
          new ApiError({
            status: 500,
            code: "PROJECT.DUPLICATE_FAILED",
            message: "Failed to duplicate project pages",
            details: insertPagesError,
          });
      }

      const insertedPagesByPath = new Map((insertedPages ?? []).map((p) => [p.path, p.id]));
      for (const originalPage of pages) {
        const newPageId = insertedPagesByPath.get(originalPage.path);
        if (newPageId) pageIdMap.set(originalPage.id, newPageId);
      }
    }

    const { data: routes, error: routesError } = await supabase
      .from("project_routes")
      .select("*")
      .eq("project_id", id)
      .order("sort_order", { ascending: true });

    if (routesError) {
      console.error("Failed to fetch routes for duplication:", routesError);
      throw mapSupabaseAuthzError(routesError) ??
        new ApiError({
          status: 500,
          code: "PROJECT.DUPLICATE_FAILED",
          message: "Failed to duplicate project routes",
          details: routesError,
        });
    }

    const routeIdMap = new Map<string, string>();
    if (routes && routes.length > 0) {
      const routeInserts: ProjectRouteInsert[] = routes.map((r) => ({
        project_id: createdProjectId,
        path: r.path,
        page_id: r.page_id ? pageIdMap.get(r.page_id) ?? null : null,
        layout_id: r.layout_id,
        auth_required: r.auth_required,
        roles: r.roles,
        middleware_config: r.middleware_config,
        metadata: r.metadata,
        sort_order: r.sort_order,
        parent_route_id: null,
      }));

      const { data: insertedRoutes, error: insertRoutesError } = await supabase
        .from("project_routes")
        .insert(routeInserts)
        .select("*");

      if (insertRoutesError) {
        console.error("Failed to duplicate project routes:", insertRoutesError);
        throw mapSupabaseAuthzError(insertRoutesError) ??
          new ApiError({
            status: 500,
            code: "PROJECT.DUPLICATE_FAILED",
            message: "Failed to duplicate project routes",
            details: insertRoutesError,
          });
      }

      const insertedRoutesByPath = new Map((insertedRoutes ?? []).map((r) => [r.path, r.id]));
      for (const originalRoute of routes) {
        const newRouteId = insertedRoutesByPath.get(originalRoute.path);
        if (newRouteId) routeIdMap.set(originalRoute.id, newRouteId);
      }

      const updates = routes
        .filter((r) => r.parent_route_id)
        .map(async (r) => {
          const newRouteId = insertedRoutesByPath.get(r.path);
          const newParentId = r.parent_route_id ? routeIdMap.get(r.parent_route_id) : undefined;
          if (!newRouteId || !newParentId) return;
          const { error: updateError } = await supabase
            .from("project_routes")
            .update({ parent_route_id: newParentId })
            .eq("id", newRouteId);
          if (updateError) {
            throw mapSupabaseAuthzError(updateError) ??
              new ApiError({
                status: 500,
                code: "PROJECT.DUPLICATE_FAILED",
                message: "Failed to duplicate project route relationships",
                details: updateError,
              });
          }
        });

      await Promise.all(updates);
    }

    const flowIdMap = new Map<string, string>();
    const { data: flows, error: flowsError } = await supabase
      .from("project_flows")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });

    if (flowsError) {
      console.error("Failed to fetch flows for duplication:", flowsError);
      throw mapSupabaseAuthzError(flowsError) ??
        new ApiError({
          status: 500,
          code: "PROJECT.DUPLICATE_FAILED",
          message: "Failed to duplicate project flows",
          details: flowsError,
        });
    }

    for (const f of flows ?? []) {
      const insertFlow: ProjectFlowInsert = {
        project_id: createdProjectId,
        name: f.name,
        description: f.description,
        flow_type: f.flow_type,
        yaml_content: f.yaml_content,
        trigger_event: f.trigger_event,
        is_active: f.is_active,
      };
      const { data: newFlow, error: insertFlowError } = await supabase
        .from("project_flows")
        .insert(insertFlow)
        .select("*")
        .single();
      if (insertFlowError) {
        console.error("Failed to duplicate project flows:", insertFlowError);
        throw mapSupabaseAuthzError(insertFlowError) ??
          new ApiError({
            status: 500,
            code: "PROJECT.DUPLICATE_FAILED",
            message: "Failed to duplicate project flows",
            details: insertFlowError,
          });
      }
      flowIdMap.set(f.id, newFlow.id);
    }

    const { data: models, error: modelsError } = await supabase
      .from("project_models")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });

    if (modelsError) {
      console.error("Failed to fetch models for duplication:", modelsError);
      throw mapSupabaseAuthzError(modelsError) ??
        new ApiError({
          status: 500,
          code: "PROJECT.DUPLICATE_FAILED",
          message: "Failed to duplicate project models",
          details: modelsError,
        });
    }

    if (models && models.length > 0) {
      const modelInserts: ProjectModelInsert[] = models.map((m) => ({
        project_id: createdProjectId,
        table_name: m.table_name,
        schema: m.schema,
        rls_policies: m.rls_policies,
      }));

      const { error: insertModelsError } = await supabase.from("project_models").insert(modelInserts);
      if (insertModelsError) {
        console.error("Failed to duplicate project models:", insertModelsError);
        throw mapSupabaseAuthzError(insertModelsError) ??
          new ApiError({
            status: 500,
            code: "PROJECT.DUPLICATE_FAILED",
            message: "Failed to duplicate project models",
            details: insertModelsError,
          });
      }
    }

    const { data: endpoints, error: endpointsError } = await supabase
      .from("project_endpoints")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });

    if (endpointsError) {
      console.error("Failed to fetch endpoints for duplication:", endpointsError);
      throw mapSupabaseAuthzError(endpointsError) ??
        new ApiError({
          status: 500,
          code: "PROJECT.DUPLICATE_FAILED",
          message: "Failed to duplicate project endpoints",
          details: endpointsError,
        });
    }

    if (endpoints && endpoints.length > 0) {
      const endpointInserts: ProjectEndpointInsert[] = endpoints.map((e) => ({
        project_id: createdProjectId,
        method: e.method,
        path: e.path,
        description: e.description,
        request_schema: e.request_schema,
        response_schema: e.response_schema,
        middleware: e.middleware,
        flow_id: e.flow_id ? flowIdMap.get(e.flow_id) ?? null : null,
        is_active: e.is_active,
      }));

      const { error: insertEndpointsError } = await supabase.from("project_endpoints").insert(endpointInserts);
      if (insertEndpointsError) {
        console.error("Failed to duplicate project endpoints:", insertEndpointsError);
        throw mapSupabaseAuthzError(insertEndpointsError) ??
          new ApiError({
            status: 500,
            code: "PROJECT.DUPLICATE_FAILED",
            message: "Failed to duplicate project endpoints",
            details: insertEndpointsError,
          });
      }
    }

    const { data: auth, error: authError } = await supabase
      .from("project_auth")
      .select("*")
      .eq("project_id", id)
      .single();

    if (authError && !isNotFoundError(authError)) {
      console.error("Failed to fetch auth config for duplication:", authError);
      throw mapSupabaseAuthzError(authError) ??
        new ApiError({
          status: 500,
          code: "PROJECT.DUPLICATE_FAILED",
          message: "Failed to duplicate project auth config",
          details: authError,
        });
    }

    if (auth) {
      const insertAuth: ProjectAuthInsert = {
        project_id: createdProjectId,
        providers: auth.providers,
        redirect_urls: auth.redirect_urls,
        session_config: auth.session_config,
      };
      const { error: insertAuthError } = await supabase.from("project_auth").insert(insertAuth);
      if (insertAuthError) {
        console.error("Failed to duplicate project auth config:", insertAuthError);
        throw mapSupabaseAuthzError(insertAuthError) ??
          new ApiError({
            status: 500,
            code: "PROJECT.DUPLICATE_FAILED",
            message: "Failed to duplicate project auth config",
            details: insertAuthError,
          });
      }
    }

    return createdProject;
  } catch (error) {
    if (createdProject) {
      const { error: cleanupError } = await supabase.from("projects").delete().eq("id", createdProject.id);
      if (cleanupError) console.error("Failed to rollback duplicated project:", cleanupError);
    }
    throw error;
  }
}
