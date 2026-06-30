import type { PageSchema, ProjectConfig } from "@envelope/engine";
import type {
  ProjectAuth,
  ProjectEndpoint,
  ProjectFlow,
  ProjectModel,
  ProjectPage,
  ProjectRoute,
  Project,
} from "@/lib/supabase/types";

/**
 * 项目“配置归档包”（ISC-20/98-101）
 *
 * 设计目标：
 * - 不生成代码，只打包平台配置（Supabase 表数据的等价表示）
 * - ZIP 容器内以 JSON 为主，Flow 额外落一份 YAML（便于人类阅读/编辑）
 * - 支持“部分导出/部分导入”（selection）
 * - 支持“导入为新项目”与“合并导入到已有项目”
 *
 * 归档中的跨资源引用统一使用 *Key（而不是 UUID）：
 * - route.pageKey 关联 page.key（通常是 page.path）
 * - route.parentKey 关联 route.key（通常是 route.path）
 * - endpoint.flowKey 关联 flow.key（稳定键）
 */
export type ArchiveFormat = "envelope.platform.archive";

export type ArchiveSelection =
  | {
      project?: true;
      pages?: "all" | string[];
      routes?: "all" | string[];
      models?: "all" | string[];
      flows?: "all" | string[];
      endpoints?: "all" | string[];
      auth?: "all" | "none";
    }
  | undefined;

export type ArchiveExportOptions = {
  selection?: ArchiveSelection;
  redactSecrets?: boolean;
};

export type ArchiveImportMode = "create" | "merge";

export type ArchiveImportOptions = {
  mode: ArchiveImportMode;
  targetProjectId?: string;
  conflictStrategy?: "overwrite" | "skip";
  danglingRefPolicy?: "error" | "nullify" | "skip";
};

export type ArchiveManifest = {
  format: ArchiveFormat;
  formatVersion: 1;
  schemaVersion: string;
  exportedAt: string;
  source: {
    app: "@envelope/platform";
    appVersion: string;
  };
  selection: NonNullable<ArchiveSelection>;
  redaction: {
    enabled: boolean;
    rules: string[];
  };
};

export type ArchivedProject = {
  originId?: string;
  name: string;
  description?: string;
  config: ProjectConfig;
  schema_version?: string;
};

export type ArchivedPage = {
  originId?: string;
  key: string;
  path: string;
  title: string;
  description?: string;
  schema: Partial<PageSchema> | Record<string, unknown>;
  metadata?: Record<string, unknown>;
  sort_order?: number;
  is_published?: boolean;
};

export type ArchivedRoute = {
  originId?: string;
  key: string;
  path: string;
  parentKey?: string | null;
  pageKey?: string | null;
  layout_id?: string | null;
  auth_required?: boolean;
  roles?: string[];
  middleware_config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  sort_order?: number;
};

export type ArchivedFlow = {
  originId?: string;
  key: string;
  name: string;
  description?: string;
  flow_type?: string;
  yaml_content: string;
  trigger_event?: string | null;
  is_active?: boolean;
};

export type ArchivedModel = {
  originId?: string;
  key: string;
  table_name: string;
  schema: Record<string, unknown>;
  rls_policies?: Record<string, unknown>[];
};

export type ArchivedEndpoint = {
  originId?: string;
  key: string;
  method: ProjectEndpoint["method"];
  path: string;
  description?: string;
  request_schema?: Record<string, unknown>;
  response_schema?: Record<string, unknown>;
  middleware?: unknown;
  flowKey?: string | null;
  is_active?: boolean;
};

export type ArchivedAuth = {
  providers?: unknown;
  redirect_urls?: Record<string, unknown> | null;
  session_config?: Record<string, unknown> | null;
};

export type ProjectArchive = {
  manifest: ArchiveManifest;
  project: ArchivedProject;
  pages: ArchivedPage[];
  routes: ArchivedRoute[];
  flows: ArchivedFlow[];
  models: ArchivedModel[];
  endpoints: ArchivedEndpoint[];
  auth?: ArchivedAuth;
};

export type ProjectArchiveSnapshot = {
  project: Project;
  pages: ProjectPage[];
  routes: ProjectRoute[];
  flows: ProjectFlow[];
  models: ProjectModel[];
  endpoints: ProjectEndpoint[];
  auth: ProjectAuth | null;
};
