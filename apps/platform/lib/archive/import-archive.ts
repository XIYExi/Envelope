import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type {
  Project,
  ProjectAuthInsert,
  ProjectEndpoint,
  ProjectEndpointInsert,
  ProjectFlow,
  ProjectFlowInsert,
  ProjectModelInsert,
  ProjectPage,
  ProjectPageInsert,
  ProjectRoute,
  ProjectRouteInsert,
} from "@/lib/supabase/types";
import type { ArchiveImportOptions, ProjectArchive } from "./archive-types";
import { apiErrors } from "@/lib/api/errors";

export type ArchiveImportProgressCallback = (stage: string, percent: number) => void;

/**
 * 配置归档导入（ISC-20/99）
 *
 * 特性：
 * - 支持导入为新项目（mode=create）
 * - 支持合并导入到已有项目（mode=merge）
 * - 支持冲突策略（overwrite/skip）与悬空引用策略（error/nullify/skip）
 *
 * 重要说明：
 * - 归档内跨表引用使用 *Key（pageKey/parentKey/flowKey），导入时会重写为新 UUID
 * - 这里的导入目标是“平台 Supabase 数据”，不是“生成代码项目”
 */
function dedupeByKey<T>(items: T[], keyFn: (i: T) => string): T[] {
  const map = new Map<string, T>();
  for (const i of items) map.set(keyFn(i), i);
  return Array.from(map.values());
}

function normalizeMiddleware(input: unknown): Record<string, unknown>[] {
  if (Array.isArray(input)) {
    return input.filter((x) => typeof x === "object" && x !== null && !Array.isArray(x)) as Record<string, unknown>[];
  }
  if (typeof input === "object" && input !== null) {
    return [input as Record<string, unknown>];
  }
  return [];
}

async function requireUserId(supabase: SupabaseClient<Database>): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw apiErrors.unauthorized();
  return data.user.id;
}

async function loadPagesByProject(supabase: SupabaseClient<Database>, projectId: string): Promise<ProjectPage[]> {
  const { data, error } = await supabase
    .from("project_pages")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .returns<ProjectPage[]>();
  if (error) throw error;
  return data ?? [];
}

async function loadRoutesByProject(supabase: SupabaseClient<Database>, projectId: string): Promise<ProjectRoute[]> {
  const { data, error } = await supabase
    .from("project_routes")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .returns<ProjectRoute[]>();
  if (error) throw error;
  return data ?? [];
}

async function loadFlowsByProject(supabase: SupabaseClient<Database>, projectId: string): Promise<ProjectFlow[]> {
  const { data, error } = await supabase
    .from("project_flows")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .returns<ProjectFlow[]>();
  if (error) throw error;
  return data ?? [];
}

function resolveDangling(policy: NonNullable<ArchiveImportOptions["danglingRefPolicy"]> | undefined): "error" | "nullify" | "skip" {
  return policy ?? "error";
}

export async function importProjectArchive(
  supabase: SupabaseClient<Database>,
  archive: ProjectArchive,
  options: ArchiveImportOptions,
  onProgress?: ArchiveImportProgressCallback,
): Promise<{ projectId: string }> {
  const conflict = options.conflictStrategy ?? "overwrite";
  const dangling = resolveDangling(options.danglingRefPolicy);

  onProgress?.("校验归档...", 0);
  if (archive.manifest.format !== "envelope.platform.archive") {
    throw apiErrors.validation({ format: archive.manifest.format }, "Unsupported archive format");
  }

  const userId = await requireUserId(supabase);

  const nowIso = new Date().toISOString();
  let projectId = options.targetProjectId;

  if (options.mode === "create") {
    onProgress?.("创建项目...", 5);
    const insert = {
      user_id: userId,
      name: archive.project.name || "Imported Project",
      description: archive.project.description ?? "",
      schema_version: archive.project.schema_version ?? archive.manifest.schemaVersion ?? "3.0.0",
      config: (archive.project.config ?? {}) as Record<string, unknown>,
      created_at: nowIso,
      updated_at: nowIso,
    };
    const { data, error } = await supabase.from("projects").insert(insert).select("*").single<Project>();
    if (error) throw error;
    projectId = data.id;
  } else {
    if (!projectId) throw apiErrors.validation({ targetProjectId: projectId }, "Missing targetProjectId for merge import");
  }

  onProgress?.("导入页面...", 15);
  const pages = dedupeByKey(archive.pages ?? [], (p) => p.key);
  if (pages.length > 0) {
    const inserts: ProjectPageInsert[] = pages.map((p) => ({
      project_id: projectId!,
      path: p.path,
      title: p.title,
      description: p.description ?? "",
      schema: (p.schema ?? {}) as Record<string, unknown>,
      metadata: (p.metadata ?? {}) as Record<string, unknown>,
      sort_order: p.sort_order ?? 0,
      is_published: p.is_published ?? false,
    }));
    if (options.mode === "create") {
      const { error } = await supabase.from("project_pages").insert(inserts);
      if (error) throw error;
    } else {
      if (conflict === "skip") {
        const existing = await loadPagesByProject(supabase, projectId!);
        const existSet = new Set(existing.map((x) => x.path));
        const filtered = inserts.filter((x) => !existSet.has(x.path));
        if (filtered.length > 0) {
          const { error } = await supabase.from("project_pages").insert(filtered);
          if (error) throw error;
        }
      } else {
        const { error } = await supabase.from("project_pages").upsert(inserts, { onConflict: "project_id,path" });
        if (error) throw error;
      }
    }
  }

  const pagesAfter = await loadPagesByProject(supabase, projectId!);
  const pageKeyToId = new Map(pagesAfter.map((p) => [p.path, p.id]));

  onProgress?.("导入流程...", 35);
  const flows = dedupeByKey(archive.flows ?? [], (f) => f.key);
  const flowKeyToId = new Map<string, string>();
  if (flows.length > 0) {
    if (options.mode === "create") {
      const inserts: ProjectFlowInsert[] = flows.map((f) => ({
        project_id: projectId!,
        name: f.name,
        description: f.description ?? "",
        flow_type: f.flow_type ?? "default",
        yaml_content: f.yaml_content ?? "",
        trigger_event: f.trigger_event ?? null,
        is_active: f.is_active ?? true,
      }));
      const { data, error } = await supabase.from("project_flows").insert(inserts).select("*").returns<ProjectFlow[]>();
      if (error) throw error;
      for (const row of data ?? []) {
        const found = flows.find((f) => f.name === row.name && f.yaml_content === row.yaml_content);
        if (found) flowKeyToId.set(found.key, row.id);
      }
    } else {
      const existing = await loadFlowsByProject(supabase, projectId!);
      const byName = new Map<string, ProjectFlow[]>();
      for (const f of existing) byName.set(f.name, [...(byName.get(f.name) ?? []), f]);

      for (const f of flows) {
        const candidates = byName.get(f.name) ?? [];
        if (candidates.length === 1 && conflict === "overwrite") {
          const target = candidates[0]!;
          const { error } = await supabase
            .from("project_flows")
            .update({
              description: f.description ?? "",
              flow_type: f.flow_type ?? "default",
              yaml_content: f.yaml_content ?? "",
              trigger_event: f.trigger_event ?? null,
              is_active: f.is_active ?? true,
            })
            .eq("id", target.id);
          if (error) throw error;
          flowKeyToId.set(f.key, target.id);
        } else if (conflict === "skip" && candidates.length > 0) {
          flowKeyToId.set(f.key, candidates[0]!.id);
        } else {
          const { data, error } = await supabase
            .from("project_flows")
            .insert({
              project_id: projectId!,
              name: f.name,
              description: f.description ?? "",
              flow_type: f.flow_type ?? "default",
              yaml_content: f.yaml_content ?? "",
              trigger_event: f.trigger_event ?? null,
              is_active: f.is_active ?? true,
            })
            .select("*")
            .single<ProjectFlow>();
          if (error) throw error;
          flowKeyToId.set(f.key, data.id);
        }
      }
    }
  }

  onProgress?.("导入数据模型...", 55);
  const models = dedupeByKey(archive.models ?? [], (m) => m.key);
  if (models.length > 0) {
    const inserts: ProjectModelInsert[] = models.map((m) => ({
      project_id: projectId!,
      table_name: m.table_name,
      schema: (m.schema ?? {}) as Record<string, unknown>,
      rls_policies: (m.rls_policies ?? []) as Record<string, unknown>[],
    }));
    if (options.mode === "create") {
      const { error } = await supabase.from("project_models").insert(inserts);
      if (error) throw error;
    } else {
      if (conflict === "skip") {
        const { data, error } = await supabase
          .from("project_models")
          .select("table_name")
          .eq("project_id", projectId!);
        if (error) throw error;
        const set = new Set((data ?? []).map((x) => (x as { table_name: string }).table_name));
        const filtered = inserts.filter((x) => !set.has(x.table_name));
        if (filtered.length > 0) {
          const { error: insertError } = await supabase.from("project_models").insert(filtered);
          if (insertError) throw insertError;
        }
      } else {
        const { error } = await supabase.from("project_models").upsert(inserts, { onConflict: "project_id,table_name" });
        if (error) throw error;
      }
    }
  }

  onProgress?.("导入路由...", 70);
  const routes = dedupeByKey(archive.routes ?? [], (r) => r.key);
  if (routes.length > 0) {
    const baseInserts: ProjectRouteInsert[] = routes.map((r) => {
      const pageId = r.pageKey ? pageKeyToId.get(r.pageKey) : null;
      if (r.pageKey && !pageId) {
        if (dangling === "error") throw apiErrors.validation({ pageKey: r.pageKey }, "Missing page for route");
        if (dangling === "skip") return null;
      }
      return {
        project_id: projectId!,
        path: r.path,
        page_id: pageId ?? null,
        layout_id: r.layout_id ?? null,
        auth_required: r.auth_required ?? false,
        roles: Array.isArray(r.roles) ? r.roles : [],
        middleware_config: (r.middleware_config ?? {}) as Record<string, unknown>,
        metadata: (r.metadata ?? {}) as Record<string, unknown>,
        parent_route_id: null,
        sort_order: r.sort_order ?? 0,
      };
    }).filter(Boolean) as ProjectRouteInsert[];

    if (options.mode === "create") {
      const { error } = await supabase.from("project_routes").insert(baseInserts);
      if (error) throw error;
    } else {
      if (conflict === "skip") {
        const existing = await loadRoutesByProject(supabase, projectId!);
        const existSet = new Set(existing.map((x) => x.path));
        const filtered = baseInserts.filter((x) => !existSet.has(x.path));
        if (filtered.length > 0) {
          const { error } = await supabase.from("project_routes").insert(filtered);
          if (error) throw error;
        }
      } else {
        const { error } = await supabase.from("project_routes").upsert(baseInserts, { onConflict: "project_id,path" });
        if (error) throw error;
      }
    }

    const routesAfter = await loadRoutesByProject(supabase, projectId!);
    const routeKeyToId = new Map(routesAfter.map((r) => [r.path, r.id]));

    for (const r of routes) {
      if (!r.parentKey) continue;
      const id = routeKeyToId.get(r.path);
      if (!id) continue;
      const parentId = routeKeyToId.get(r.parentKey);
      if (!parentId) {
        if (dangling === "error") throw apiErrors.validation({ parentKey: r.parentKey }, "Missing parent route");
        if (dangling === "skip") continue;
        if (dangling === "nullify") continue;
      }
      const { error } = await supabase.from("project_routes").update({ parent_route_id: parentId ?? null }).eq("id", id);
      if (error) throw error;
    }
  }

  onProgress?.("导入 API...", 85);
  const endpoints = dedupeByKey(archive.endpoints ?? [], (e) => e.key);
  const inserts: ProjectEndpointInsert[] = [];
  for (const e of endpoints) {
    let flowId: string | null = null;
    if (e.flowKey) {
      flowId = flowKeyToId.get(e.flowKey) ?? null;
      if (!flowId) {
        if (dangling === "error") throw apiErrors.validation({ flowKey: e.flowKey }, "Missing flow for endpoint");
        if (dangling === "skip") continue;
      }
    }

    inserts.push({
      project_id: projectId!,
      method: e.method,
      path: e.path,
      description: e.description ?? "",
      request_schema: (e.request_schema ?? {}) as Record<string, unknown>,
      response_schema: (e.response_schema ?? {}) as Record<string, unknown>,
      middleware: normalizeMiddleware(e.middleware),
      flow_id: flowId,
      is_active: e.is_active ?? true,
    });
  }

  if (inserts.length > 0) {
    if (options.mode === "create") {
      const { error } = await supabase.from("project_endpoints").insert(inserts);
      if (error) throw error;
    } else {
      if (conflict === "skip") {
        const { data, error } = await supabase
          .from("project_endpoints")
          .select("method,path")
          .eq("project_id", projectId!);
        if (error) throw error;
        const set = new Set((data ?? []).map((x) => `${(x as ProjectEndpoint).method} ${(x as ProjectEndpoint).path}`));
        const filtered = inserts.filter((x) => !set.has(`${x.method} ${x.path}`));
        if (filtered.length > 0) {
          const { error: insertError } = await supabase.from("project_endpoints").insert(filtered);
          if (insertError) throw insertError;
        }
      } else {
        const { error } = await supabase.from("project_endpoints").upsert(inserts, { onConflict: "project_id,method,path" });
        if (error) throw error;
      }
    }
  }

  if (archive.auth) {
    onProgress?.("导入认证配置...", 95);
    const authInsert: ProjectAuthInsert = {
      project_id: projectId!,
      providers: Array.isArray(archive.auth.providers) ? (archive.auth.providers as Record<string, unknown>[]) : [],
      redirect_urls: (archive.auth.redirect_urls ?? {}) as Record<string, unknown>,
      session_config: (archive.auth.session_config ?? {}) as Record<string, unknown>,
    };
    const { error } = await supabase.from("project_auth").upsert(authInsert, { onConflict: "project_id" });
    if (error) throw error;
  }

  onProgress?.("完成", 100);
  return { projectId: projectId! };
}
