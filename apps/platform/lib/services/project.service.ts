import { createServerSupabase } from "@/lib/supabase/server";
import type {
  Project,
  ProjectInsert,
  ProjectAuthInsert,
  ProjectEndpointInsert,
  ProjectFlowInsert,
  ProjectModelInsert,
  ProjectPageInsert,
  ProjectRouteInsert,
} from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: unknown }).code === "PGRST116";
}

function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error);
    throw mapSupabaseAuthzError(error) ?? new ApiError({ status: 500, code: "PROJECT.LIST_FAILED", message: "Failed to fetch projects", details: error });
  }
  return data;
}

export async function getProject(id: string): Promise<Project> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch project:", error);
    if (isNotFoundError(error)) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
    throw mapSupabaseAuthzError(error) ?? new ApiError({ status: 500, code: "PROJECT.GET_FAILED", message: "Failed to fetch project", details: error });
  }
  return data;
}

export async function createProject(input: Omit<ProjectInsert, "user_id">): Promise<Project> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw apiErrors.unauthorized();

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error("Failed to create project:", error);
    throw mapSupabaseAuthzError(error) ?? new ApiError({ status: 500, code: "PROJECT.CREATE_FAILED", message: "Failed to create project", details: error });
  }
  return data;
}

export async function updateProject(
  id: string,
  input: { name?: string; description?: string; config?: Record<string, unknown> },
): Promise<Project> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update project:", error);
    if (isNotFoundError(error)) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
    throw mapSupabaseAuthzError(error) ?? new ApiError({ status: 500, code: "PROJECT.UPDATE_FAILED", message: "Failed to update project", details: error });
  }
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("projects").delete().eq("id", id).select("id").single();
  if (error) {
    console.error("Failed to delete project:", error);
    if (isNotFoundError(error)) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
    throw mapSupabaseAuthzError(error) ?? new ApiError({ status: 500, code: "PROJECT.DELETE_FAILED", message: "Failed to delete project", details: error });
  }
}

export async function duplicateProject(id: string, newName: string): Promise<Project> {
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
        project_id: createdProject.id,
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
        project_id: createdProject.id,
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
        project_id: createdProject.id,
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
        project_id: createdProject.id,
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
        project_id: createdProject.id,
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
        project_id: createdProject.id,
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
