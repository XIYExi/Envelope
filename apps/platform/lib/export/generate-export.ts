import { zipSync, strToU8 } from "fflate";
import { generateProject } from "@envelope/generator";
import type { AuthConfig, DbSchema, PageSchema, ProjectConfig, RouteNode, RoutesConfig } from "@envelope/engine";
import type { SupabaseClient } from "@supabase/supabase-js";
import { apiErrors } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { Database } from "@/lib/supabase/database.types";
import type {
  ProjectAuth,
  ProjectEndpoint,
  ProjectFlow,
  ProjectModel,
  ProjectPage,
  ProjectRoute,
  Project,
} from "@/lib/supabase/types";

export type ExportProgressCallback = (stage: string, percent: number) => void;

type ProjectExportSource = {
  project: Project;
  pages: ProjectPage[];
  flows: ProjectFlow[];
  endpoints: ProjectEndpoint[];
  routes: ProjectRoute[];
  models: ProjectModel[];
  auth: ProjectAuth | null;
};

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: unknown }).code === "PGRST116";
}

function buildRouteTree(rows: ProjectRoute[]): RouteNode[] {
  const nodes = new Map<string, RouteNode>();
  const children = new Map<string, string[]>();
  const order = new Map<string, number>();
  const roots: string[] = [];

  for (const r of rows) {
    order.set(r.id, r.sort_order ?? 0);
    nodes.set(r.id, {
      id: r.id,
      path: r.path,
      pageId: r.page_id ?? undefined,
      layoutId: r.layout_id ?? undefined,
      authRequired: r.auth_required ?? undefined,
      roles: r.roles && r.roles.length > 0 ? r.roles : undefined,
      middlewareConfig: r.middleware_config ?? undefined,
      metadata: (r.metadata ?? undefined) as RouteNode["metadata"],
    });
  }

  for (const r of rows) {
    const parent = r.parent_route_id;
    if (parent && parent !== r.id && nodes.has(parent)) {
      const list = children.get(parent) ?? [];
      list.push(r.id);
      children.set(parent, list);
    } else {
      roots.push(r.id);
    }
  }

  const sortIds = (ids: string[]) => ids.sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
  sortIds(roots);
  for (const list of children.values()) sortIds(list);

  const visited = new Set<string>();
  const build = (id: string): RouteNode | null => {
    if (visited.has(id)) return null;
    visited.add(id);
    const node = nodes.get(id);
    if (!node) return null;
    const childIds = children.get(id) ?? [];
    const childNodes = childIds.map(build).filter(Boolean) as RouteNode[];
    if (childNodes.length > 0) node.children = childNodes;
    return node;
  };

  return roots.map(build).filter(Boolean) as RouteNode[];
}

function normalizeRedirectUrls(input: Record<string, unknown> | null | undefined): AuthConfig["redirectUrls"] {
  const afterLogin = input?.afterLogin ?? input?.after_login;
  const afterLogout = input?.afterLogout ?? input?.after_logout;
  const afterSignup = input?.afterSignup ?? input?.after_signup;
  const emailConfirmation = input?.emailConfirmation ?? input?.email_confirmation;

  return {
    afterLogin: typeof afterLogin === "string" ? afterLogin : "/",
    afterLogout: typeof afterLogout === "string" ? afterLogout : "/login",
    afterSignup: typeof afterSignup === "string" ? afterSignup : "/",
    emailConfirmation: typeof emailConfirmation === "string" ? emailConfirmation : undefined,
  };
}

function normalizeSessionConfig(input: Record<string, unknown> | null | undefined): AuthConfig["session"] {
  const duration = input?.duration ?? input?.sessionDuration ?? input?.session_duration;
  const refreshTokenRotation =
    input?.refreshTokenRotation ?? input?.refresh_token_rotation ?? input?.refreshTokenRotate ?? input?.refresh_token_rotate;

  return {
    duration: typeof duration === "number" ? duration : 3600,
    refreshTokenRotation: typeof refreshTokenRotation === "boolean" ? refreshTokenRotation : true,
  };
}

function normalizeAuthProviders(input: unknown): AuthConfig["providers"] {
  const allowed = new Set<AuthConfig["providers"][number]["name"]>([
    "email",
    "google",
    "github",
    "gitlab",
    "azure",
    "discord",
  ]);
  const providers = Array.isArray(input)
    ? input
        .map((p) => {
          if (!p || typeof p !== "object") return null;
          const record = p as Record<string, unknown>;
          const name = record.name;
          if (typeof name !== "string" || !allowed.has(name as AuthConfig["providers"][number]["name"])) return null;
          const enabled = record.enabled;
          const config = record.config;
          return {
            name: name as AuthConfig["providers"][number]["name"],
            enabled: typeof enabled === "boolean" ? enabled : true,
            config: typeof config === "object" && config !== null && !Array.isArray(config) ? (config as Record<string, string>) : {},
          };
        })
        .filter(Boolean)
    : [];

  return providers.length > 0 ? (providers as AuthConfig["providers"]) : [{ name: "email", enabled: true, config: {} }];
}

function normalizeDbSchemaTable(model: ProjectModel): DbSchema["tables"][number] | null {
  const schema = (model.schema ?? {}) as Record<string, unknown>;
  const name = typeof schema.name === "string" && schema.name.trim() ? schema.name : model.table_name;
  if (typeof name !== "string" || !name.trim()) return null;

  const columnsInput = schema.columns;
  const columns = Array.isArray(columnsInput)
    ? columnsInput
        .map((c) => {
          if (!c || typeof c !== "object") return null;
          const col = c as Record<string, unknown>;
          const colName = col.name;
          const colType = col.type;
          if (typeof colName !== "string" || !colName.trim()) return null;
          if (typeof colType !== "string" || !colType.trim()) return null;
          return { ...col, name: colName, type: colType };
        })
        .filter(Boolean)
    : [];
  if (columns.length === 0) return null;

  const indexesInput = schema.indexes;
  const indexes = Array.isArray(indexesInput)
    ? indexesInput
        .map((idx) => {
          if (!idx || typeof idx !== "object") return null;
          const index = idx as Record<string, unknown>;
          const indexName = index.name;
          const indexColumns = index.columns;
          if (typeof indexName !== "string" || !indexName.trim()) return null;
          if (!Array.isArray(indexColumns) || indexColumns.some((c) => typeof c !== "string" || !c.trim())) return null;
          const type = index.type;
          const safeType = type === "btree" || type === "gin" || type === "gist" ? type : "btree";
          return {
            ...index,
            name: indexName,
            columns: indexColumns as string[],
            type: safeType,
            unique: typeof index.unique === "boolean" ? index.unique : false,
          };
        })
        .filter(Boolean)
    : [];

  const rlsEnabled = typeof schema.rlsEnabled === "boolean" ? schema.rlsEnabled : true;
  const policiesInput = schema.rlsPolicies ?? model.rls_policies ?? [];
  const rlsPolicies = Array.isArray(policiesInput)
    ? policiesInput
        .map((p) => {
          if (!p || typeof p !== "object") return null;
          const policy = p as Record<string, unknown>;
          const policyName = policy.name;
          const operation = policy.operation;
          const using = policy.using;
          const check = policy.check;
          if (typeof policyName !== "string" || !policyName.trim()) return null;
          if (operation !== "SELECT" && operation !== "INSERT" && operation !== "UPDATE" && operation !== "DELETE" && operation !== "ALL") return null;
          if (typeof using !== "string" || !using.trim()) return null;
          if (typeof check !== "undefined" && typeof check !== "string") return null;
          return { name: policyName, operation, using, check };
        })
        .filter(Boolean)
    : [];

  const comment = typeof schema.comment === "string" ? schema.comment : undefined;

  return {
    name,
    columns: columns as DbSchema["tables"][number]["columns"],
    indexes: indexes as DbSchema["tables"][number]["indexes"],
    rlsEnabled: rlsEnabled as DbSchema["tables"][number]["rlsEnabled"],
    rlsPolicies: rlsPolicies as DbSchema["tables"][number]["rlsPolicies"],
    comment,
  };
}

export async function generateProjectZip(
  supabase: SupabaseClient<Database> | null,
  projectId: string,
  onProgress?: ExportProgressCallback,
): Promise<{ zipped: Uint8Array; fileName: string; projectName: string }> {
  const report = (stage: string, percent: number) => onProgress?.(stage, percent);
  const backendConfig = getPlatformBackendConfig();
  let source: ProjectExportSource;

  report("读取项目数据...", 0);
  if (backendConfig.mode === "local") {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    source = {
      project: await projectRepository.get(projectId),
      pages: await resourceRepository.listPages(projectId),
      flows: await resourceRepository.listFlows(projectId),
      endpoints: await resourceRepository.listEndpoints(projectId),
      routes: await resourceRepository.listRoutes(projectId),
      models: await resourceRepository.listModels(projectId),
      auth: await resourceRepository.getAuth(projectId),
    };
  } else {
    if (!supabase) {
      throw apiErrors.internal("Missing Supabase client for current backend mode", "EXPORT.MISSING_SUPABASE_CLIENT");
    }

    const { data: projectRow, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single<Project>();
    if (projectError) throw projectError;
    if (!projectRow) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");

    const { data: pagesData, error: pagesError } = await supabase
      .from("project_pages")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .returns<ProjectPage[]>();
    if (pagesError) throw pagesError;

    const { data: flowsData, error: flowsError } = await supabase
      .from("project_flows")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true })
      .returns<ProjectFlow[]>();
    if (flowsError) throw flowsError;

    const { data: endpointsData, error: endpointsError } = await supabase
      .from("project_endpoints")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true })
      .returns<ProjectEndpoint[]>();
    if (endpointsError) throw endpointsError;

    const { data: routesData, error: routesError } = await supabase
      .from("project_routes")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .returns<ProjectRoute[]>();
    if (routesError) throw routesError;

    const { data: modelsData, error: modelsError } = await supabase
      .from("project_models")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true })
      .returns<ProjectModel[]>();
    if (modelsError) throw modelsError;

    const { data: authData, error: authError } = await supabase
      .from("project_auth")
      .select("*")
      .eq("project_id", projectId)
      .single<ProjectAuth>();
    if (authError && !isNotFoundError(authError)) throw authError;

    source = {
      project: projectRow,
      pages: pagesData ?? [],
      flows: flowsData ?? [],
      endpoints: endpointsData ?? [],
      routes: routesData ?? [],
      models: modelsData ?? [],
      auth: authData ?? null,
    };
  }
  report("读取页面完成", 5);
  report("读取流程完成", 8);
  report("读取 API 完成", 10);

  const projectConfig = (source.project.config ?? {}) as ProjectConfig;
  const pages = source.pages.map((p) => {
    const schema = (p.schema ?? {}) as Partial<PageSchema>;
    return {
      ...schema,
      version: schema.version ?? "3.0.0",
      path: p.path ?? schema.path ?? "/",
      title: p.title ?? schema.title ?? "Untitled",
      description: p.description ?? schema.description ?? "",
      metadata: (p.metadata ?? schema.metadata ?? {}) as PageSchema["metadata"],
    } as PageSchema;
  });

  const routesConfig: RoutesConfig | undefined =
    source.routes.length > 0
      ? { version: "3.0.0", routes: buildRouteTree(source.routes) }
      : source.pages.length > 0
        ? {
            version: "3.0.0",
            routes: source.pages
              .slice()
              .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
              .map((p) => ({
                id: p.id,
                path: p.path,
                pageId: p.path,
                metadata: {
                  title: p.title,
                  description: p.description || undefined,
                },
              })),
          }
        : undefined;

  const dbSchema: DbSchema | undefined = source.models.length > 0
    ? {
        version: "3.0.0",
        enums: [],
        tables: source.models.map(normalizeDbSchemaTable).filter(Boolean) as DbSchema["tables"],
      }
    : undefined;

  const authConfig: AuthConfig | undefined = source.auth
    ? {
        version: "3.0.0",
        providers: normalizeAuthProviders(source.auth.providers),
        redirectUrls: normalizeRedirectUrls(source.auth.redirect_urls),
        session: normalizeSessionConfig(source.auth.session_config),
      }
    : undefined;

  report("生成代码...", 12);
  const { files, projectName } = await generateProject(
    {
      projectName: source.project.name ?? "envelope-export",
      project: projectConfig,
      routes: routesConfig,
      pages,
      dbSchema,
      auth: authConfig,
      flows: source.flows.map((f) => ({
        id: f.id,
        name: f.name,
        yaml_content: f.yaml_content ?? "",
        description: f.description ?? "",
      })),
      endpoints: source.endpoints.map((e) => ({
        id: e.id,
        method: e.method,
        path: e.path,
        flow_id: e.flow_id ?? null,
      })),
    },
    (stage, percent) => {
      const mapped = 12 + Math.round(percent * 0.78);
      report(stage, Math.max(12, Math.min(90, mapped)));
    },
  );

  report("打包 ZIP...", 92);
  const zipInput: Record<string, Uint8Array> = {};
  for (const f of files) zipInput[f.path] = strToU8(f.content);
  const zipped = zipSync(zipInput, { level: 6 });

  const safeName = (projectName || "envelope-export").replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${safeName}.zip`;
  report("完成", 100);

  return { zipped, fileName, projectName };
}

