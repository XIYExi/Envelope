import { createServerSupabase } from "@/lib/supabase/server";
import type { ProjectFlow, ProjectFlowInsert } from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

export async function getProjectFlows(projectId: string): Promise<ProjectFlow[]> {
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
}

export async function upsertProjectFlows(projectId: string, flows: Omit<ProjectFlowInsert, "project_id">[]): Promise<ProjectFlow[]> {
  const supabase = await createServerSupabase();
  const inserts: ProjectFlowInsert[] = flows.map((f) => ({
    id: f.id,
    project_id: projectId,
    name: f.name,
    description: f.description ?? "",
    flow_type: f.flow_type ?? "action",
    yaml_content: f.yaml_content ?? "",
    trigger_event: f.trigger_event ?? null,
    is_active: f.is_active ?? true,
  }));

  const { error } = await supabase
    .from("project_flows")
    .upsert(inserts, { onConflict: "id" });

  if (error) {
    console.error("Failed to upsert project flows:", error);
    throw mapSupabaseAuthzError(error) ??
      new ApiError({ status: 500, code: "PROJECT_FLOWS.SAVE_FAILED", message: "Failed to save project flows", details: error });
  }

  return getProjectFlows(projectId);
}

