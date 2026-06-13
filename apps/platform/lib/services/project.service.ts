import { createServerSupabase } from "@/lib/supabase/server";
import type {
  Project,
  ProjectInsert,
  ProjectPageInsert,
  ProjectRouteInsert,
} from "@/lib/supabase/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data;
}

export async function getProject(id: string): Promise<Project> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(`Failed to fetch project: ${error.message}`);
  return data;
}

export async function createProject(input: Omit<ProjectInsert, "user_id">): Promise<Project> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (error) throw new Error(`Failed to create project: ${error.message}`);
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

  if (error) throw new Error(`Failed to update project: ${error.message}`);
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete project: ${error.message}`);
}

export async function duplicateProject(id: string, newName: string): Promise<Project> {
  const original = await getProject(id);
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: newName,
      description: `Copy of ${original.name}`,
      config: original.config,
      schema_version: original.schema_version,
      user_id: original.user_id,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to duplicate project: ${error.message}`);

  const { data: pages } = await supabase
    .from("project_pages")
    .select("*")
    .eq("project_id", id);

  if (pages && pages.length > 0) {
    const pageInserts: ProjectPageInsert[] = pages.map((p) => ({
      project_id: data.id,
      path: p.path,
      title: p.title,
      description: p.description,
      schema: p.schema,
      metadata: p.metadata,
      sort_order: p.sort_order,
    }));
    await supabase.from("project_pages").insert(pageInserts);
  }

  const { data: routes } = await supabase
    .from("project_routes")
    .select("*")
    .eq("project_id", id);

  if (routes && routes.length > 0) {
    const routeInserts: ProjectRouteInsert[] = routes.map((r) => ({
      project_id: data.id,
      path: r.path,
      layout_id: r.layout_id,
      auth_required: r.auth_required,
      roles: r.roles,
      middleware_config: r.middleware_config,
      metadata: r.metadata,
      sort_order: r.sort_order,
    }));
    await supabase.from("project_routes").insert(routeInserts);
  }

  return data;
}
