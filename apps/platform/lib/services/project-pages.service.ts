import { createServerSupabase } from "@/lib/supabase/server";
import type { ProjectPage, ProjectPageInsert } from "@/lib/supabase/types";
import { ApiError, apiErrors } from "@/lib/api/errors";

function mapSupabaseAuthzError(error: unknown): ApiError | null {
  if (typeof error !== "object" || error === null) return null;
  const status = "status" in error ? (error as { status?: unknown }).status : undefined;
  if (status === 401) return apiErrors.unauthorized();
  if (status === 403) return apiErrors.forbidden();
  return null;
}

export async function getProjectPages(projectId: string): Promise<ProjectPage[]> {
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
}

export async function upsertProjectPages(projectId: string, pages: Omit<ProjectPageInsert, "project_id">[]): Promise<ProjectPage[]> {
  const supabase = await createServerSupabase();
  const inserts: ProjectPageInsert[] = pages.map((p) => ({
    project_id: projectId,
    path: p.path,
    title: p.title,
    description: p.description ?? "",
    schema: p.schema ?? {},
    metadata: p.metadata ?? {},
    sort_order: p.sort_order ?? 0,
    is_published: p.is_published ?? false,
  }));

  const { error } = await supabase
    .from("project_pages")
    .upsert(inserts, { onConflict: "project_id,path" });

  if (error) {
    console.error("Failed to upsert project pages:", error);
    throw mapSupabaseAuthzError(error) ??
      new ApiError({ status: 500, code: "PROJECT_PAGES.SAVE_FAILED", message: "Failed to save project pages", details: error });
  }

  return getProjectPages(projectId);
}

