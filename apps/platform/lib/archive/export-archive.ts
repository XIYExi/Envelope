import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { apiErrors } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type {
  Project,
  ProjectAuth,
  ProjectEndpoint,
  ProjectFlow,
  ProjectModel,
  ProjectPage,
  ProjectRoute,
} from "@/lib/supabase/types";
import type {
  ArchiveExportOptions,
  ArchiveManifest,
  ArchivedAuth,
  ArchivedEndpoint,
  ArchivedFlow,
  ArchivedModel,
  ArchivedPage,
  ArchivedProject,
  ArchivedRoute,
  ProjectArchive,
  ProjectArchiveSnapshot,
} from "./archive-types";
import { archiveEndpointKey, archiveFlowKey } from "./archive-keys";
import { createArchiveZip } from "./archive-zip";
import { redactProjectConfig } from "./redaction";

export type ArchiveProgressCallback = (stage: string, percent: number) => void;

/**
 * 配置归档导出（ISC-20/98-101）
 *
 * - 数据源：Supabase（projects + project_* 表）
 * - 输出：ProjectArchive（内存对象）+ ZIP bytes
 * - selection：支持部分导出；并按引用关系做最小依赖闭包（例如 endpoints 引用的 flows）
 */
function normalizeSelection(options?: ArchiveExportOptions): NonNullable<ProjectArchive["manifest"]["selection"]> {
  const selection = options?.selection ?? {};
  return {
    project: true,
    pages: selection.pages ?? "all",
    routes: selection.routes ?? "all",
    models: selection.models ?? "all",
    flows: selection.flows ?? "all",
    endpoints: selection.endpoints ?? "all",
    auth: selection.auth ?? "all",
  };
}

async function readProjectSnapshotFromLocal(
  projectId: string,
  onProgress?: ArchiveProgressCallback,
): Promise<ProjectArchiveSnapshot> {
  onProgress?.("读取项目...", 0);
  const projectRepository = getProjectRepository();
  const resourceRepository = getProjectResourceRepository();
  const project = await projectRepository.get(projectId);
  const pages = await resourceRepository.listPages(projectId);
  const routes = await resourceRepository.listRoutes(projectId);
  const flows = await resourceRepository.listFlows(projectId);
  const models = await resourceRepository.listModels(projectId);
  const endpoints = await resourceRepository.listEndpoints(projectId);
  const auth = await resourceRepository.getAuth(projectId);

  onProgress?.("读取完成", 10);
  return {
    project,
    pages,
    routes,
    flows,
    models,
    endpoints,
    auth,
  };
}

export async function readSupabaseProjectSnapshot(
  supabase: SupabaseClient<Database>,
  projectId: string,
  onProgress?: ArchiveProgressCallback,
): Promise<ProjectArchiveSnapshot> {
  onProgress?.("读取远端项目...", 0);

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single<Project>();
  if (projectError) throw projectError;
  if (!project) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");

  const { data: pages, error: pagesError } = await supabase
    .from("project_pages")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .returns<ProjectPage[]>();
  if (pagesError) throw pagesError;

  const { data: routes, error: routesError } = await supabase
    .from("project_routes")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .returns<ProjectRoute[]>();
  if (routesError) throw routesError;

  const { data: flows, error: flowsError } = await supabase
    .from("project_flows")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .returns<ProjectFlow[]>();
  if (flowsError) throw flowsError;

  const { data: models, error: modelsError } = await supabase
    .from("project_models")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .returns<ProjectModel[]>();
  if (modelsError) throw modelsError;

  const { data: endpoints, error: endpointsError } = await supabase
    .from("project_endpoints")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .returns<ProjectEndpoint[]>();
  if (endpointsError) throw endpointsError;

  const { data: auth, error: authError } = await supabase
    .from("project_auth")
    .select("*")
    .eq("project_id", projectId)
    .maybeSingle<ProjectAuth>();
  if (authError) throw authError;

  onProgress?.("读取完成", 10);
  return {
    project,
    pages: pages ?? [],
    routes: routes ?? [],
    flows: flows ?? [],
    models: models ?? [],
    endpoints: endpoints ?? [],
    auth: auth ?? null,
  };
}

export async function readProjectSnapshot(
  supabase: SupabaseClient<Database> | null,
  projectId: string,
  onProgress?: ArchiveProgressCallback,
): Promise<ProjectArchiveSnapshot> {
  const backendConfig = getPlatformBackendConfig();
  if (backendConfig.mode === "local") {
    return readProjectSnapshotFromLocal(projectId, onProgress);
  }
  if (!supabase) {
    throw apiErrors.internal("Missing Supabase client for current backend mode", "ARCHIVE_EXPORT.MISSING_SUPABASE_CLIENT");
  }
  return readSupabaseProjectSnapshot(supabase, projectId, onProgress);
}

function pickBySelection<T>(
  all: T[],
  selector: "all" | string[],
  keyFn: (row: T) => string,
): T[] {
  if (selector === "all") return all;
  const set = new Set(selector);
  return all.filter((r) => set.has(keyFn(r)));
}

function expandRouteParents(routes: ProjectRoute[], selected: ProjectRoute[]): ProjectRoute[] {
  const byId = new Map(routes.map((r) => [r.id, r]));
  const set = new Map<string, ProjectRoute>();
  for (const r of selected) set.set(r.id, r);

  let changed = true;
  while (changed) {
    changed = false;
    for (const r of Array.from(set.values())) {
      const parentId = r.parent_route_id;
      if (!parentId) continue;
      if (set.has(parentId)) continue;
      const parent = byId.get(parentId);
      if (parent) {
        set.set(parent.id, parent);
        changed = true;
      }
    }
  }

  return Array.from(set.values()).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function buildProjectArchiveFromSnapshot(
  snapshot: ProjectArchiveSnapshot,
  options?: ArchiveExportOptions,
  onProgress?: ArchiveProgressCallback,
): ProjectArchive {
  const selection = normalizeSelection(options);
  onProgress?.("筛选资源...", 15);

  const pagesSelected = pickBySelection(snapshot.pages, selection.pages, (p) => p.path);
  const routesRawSelected = pickBySelection(snapshot.routes, selection.routes, (r) => r.path);
  const routesSelected = selection.routes === "all" ? snapshot.routes : expandRouteParents(snapshot.routes, routesRawSelected);

  const flowsSelectedBase = pickBySelection(snapshot.flows, selection.flows, archiveFlowKey);
  const endpointsSelected = pickBySelection(snapshot.endpoints, selection.endpoints, archiveEndpointKey);

  const referencedFlowIds = new Set(endpointsSelected.map((e) => e.flow_id).filter(Boolean) as string[]);
  const flowsSelected =
    selection.flows === "all"
      ? snapshot.flows
      : Array.from(new Map([...flowsSelectedBase, ...snapshot.flows.filter((f) => referencedFlowIds.has(f.id))].map((f) => [f.id, f])).values());

  const referencedPageIds = new Set(routesSelected.map((r) => r.page_id).filter(Boolean) as string[]);
  const pagesFinal =
    selection.pages === "all"
      ? snapshot.pages
      : Array.from(new Map([...pagesSelected, ...snapshot.pages.filter((p) => referencedPageIds.has(p.id))].map((p) => [p.id, p])).values());

  const modelsSelected = pickBySelection(snapshot.models, selection.models, (m) => m.table_name);

  const authSelected = selection.auth === "all" ? snapshot.auth : null;

  const { value: projectConfigRedacted, rules } = options?.redactSecrets === false
    ? { value: (snapshot.project.config ?? {}) as ProjectArchive["project"]["config"], rules: [] }
    : redactProjectConfig((snapshot.project.config ?? {}) as ProjectArchive["project"]["config"]);

  const manifest: ArchiveManifest = {
    format: "envelope.platform.archive",
    formatVersion: 1,
    schemaVersion: snapshot.project.schema_version ?? "3.0.0",
    exportedAt: new Date().toISOString(),
    source: { app: "@envelope/platform", appVersion: "3.0.0" },
    selection,
    redaction: { enabled: options?.redactSecrets !== false, rules },
  };

  const project: ArchivedProject = {
    originId: snapshot.project.id,
    name: snapshot.project.name,
    description: snapshot.project.description ?? "",
    config: projectConfigRedacted,
    schema_version: snapshot.project.schema_version ?? "3.0.0",
  };

  const pageIdToKey = new Map(pagesFinal.map((p) => [p.id, p.path]));
  const flowIdToKey = new Map(flowsSelected.map((f) => [f.id, archiveFlowKey(f)]));
  const routeIdToKey = new Map(routesSelected.map((r) => [r.id, r.path]));

  const pages: ArchivedPage[] = pagesFinal.map((p) => ({
    originId: p.id,
    key: p.path,
    path: p.path,
    title: p.title,
    description: p.description ?? "",
    schema: p.schema ?? {},
    metadata: p.metadata ?? {},
    sort_order: p.sort_order ?? 0,
    is_published: p.is_published ?? false,
  }));

  const routes: ArchivedRoute[] = routesSelected.map((r) => ({
    originId: r.id,
    key: r.path,
    path: r.path,
    parentKey: r.parent_route_id ? (routeIdToKey.get(r.parent_route_id) ?? null) : null,
    pageKey: r.page_id ? (pageIdToKey.get(r.page_id) ?? null) : null,
    layout_id: r.layout_id ?? null,
    auth_required: r.auth_required ?? false,
    roles: Array.isArray(r.roles) ? r.roles : [],
    middleware_config: (r.middleware_config ?? {}) as Record<string, unknown>,
    metadata: (r.metadata ?? {}) as Record<string, unknown>,
    sort_order: r.sort_order ?? 0,
  }));

  const flows: ArchivedFlow[] = flowsSelected.map((f) => ({
    originId: f.id,
    key: archiveFlowKey(f),
    name: f.name,
    description: f.description ?? "",
    flow_type: f.flow_type ?? "default",
    yaml_content: f.yaml_content ?? "",
    trigger_event: f.trigger_event ?? null,
    is_active: f.is_active ?? true,
  }));

  const models: ArchivedModel[] = modelsSelected.map((m) => ({
    originId: m.id,
    key: m.table_name,
    table_name: m.table_name,
    schema: (m.schema ?? {}) as Record<string, unknown>,
    rls_policies: (m.rls_policies ?? []) as Record<string, unknown>[],
  }));

  const endpoints: ArchivedEndpoint[] = endpointsSelected.map((e) => ({
    originId: e.id,
    key: archiveEndpointKey(e),
    method: e.method,
    path: e.path,
    description: e.description ?? "",
    request_schema: (e.request_schema ?? {}) as Record<string, unknown>,
    response_schema: (e.response_schema ?? {}) as Record<string, unknown>,
    middleware: e.middleware ?? [],
    flowKey: e.flow_id ? (flowIdToKey.get(e.flow_id) ?? null) : null,
    is_active: e.is_active ?? true,
  }));

  const auth: ArchivedAuth | undefined = authSelected
    ? {
        providers: authSelected.providers ?? [],
        redirect_urls: (authSelected.redirect_urls ?? {}) as Record<string, unknown>,
        session_config: (authSelected.session_config ?? {}) as Record<string, unknown>,
      }
    : undefined;

  const archive: ProjectArchive = {
    manifest,
    project,
    pages,
    routes,
    flows,
    models,
    endpoints,
    ...(auth ? { auth } : {}),
  };

  return archive;
}

export async function generateProjectArchiveZip(
  supabase: SupabaseClient<Database> | null,
  projectId: string,
  options?: ArchiveExportOptions,
  onProgress?: ArchiveProgressCallback,
): Promise<{ bytes: Uint8Array; fileName: string; archive: ProjectArchive }> {
  const snapshot = await readProjectSnapshot(supabase, projectId, (stage, percent) => {
    onProgress?.(stage, percent);
  });
  const archive = buildProjectArchiveFromSnapshot(snapshot, options, onProgress);

  onProgress?.("打包归档...", 90);
  const bytes = createArchiveZip(archive);

  const fileName = `${snapshot.project.name.replace(/[^a-zA-Z0-9._-]/g, "-") || "project"}-archive.zip`;
  onProgress?.("完成", 100);
  return { bytes, fileName, archive };
}
