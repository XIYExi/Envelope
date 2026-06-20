import { createServerSupabase } from "@/lib/supabase/server";
import type { ProjectEndpoint, ProjectEndpointInsert } from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

export async function getProjectEndpoints(projectId: string): Promise<ProjectEndpoint[]> {
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
}

export async function upsertProjectEndpoints(projectId: string, endpoints: Omit<ProjectEndpointInsert, "project_id">[]): Promise<ProjectEndpoint[]> {
  const supabase = await createServerSupabase();
  const inserts: ProjectEndpointInsert[] = endpoints.map((e) => ({
    id: e.id,
    project_id: projectId,
    method: e.method,
    path: e.path,
    description: e.description ?? "",
    request_schema: e.request_schema ?? {},
    response_schema: e.response_schema ?? {},
    middleware: e.middleware ?? {},
    flow_id: e.flow_id ?? null,
    is_active: e.is_active ?? true,
  }));

  const { error } = await supabase
    .from("project_endpoints")
    .upsert(inserts, { onConflict: "id" });

  if (error) {
    console.error("Failed to upsert project endpoints:", error);
    throw mapSupabaseAuthzError(error) ??
      new ApiError({ status: 500, code: "PROJECT_ENDPOINTS.SAVE_FAILED", message: "Failed to save project endpoints", details: error });
  }

  return getProjectEndpoints(projectId);
}
