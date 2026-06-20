/**
 * 项目编辑器资源的本地 SQLite 适配器。
 *
 * 职责：
 * - 在 `local` 模式下，用 SQLite 模拟 Supabase 对六类编辑器资源的基础读写行为；
 * - 对外返回统一的 Supabase Row 结构，保证上层 service 与 API 不感知底层差异；
 * - 与项目门面共用同一份本地数据库文件，便于后续扩展同步与离线能力。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `ProjectResourceRepository`
 */
import crypto from "node:crypto";
import type { RuntimeBackendConfig } from "@/lib/backend/config";
import { getLocalSQLite } from "@/lib/backend/local/sqlite";
import { markProjectDirty, type LocalSyncResourceKind, type ProjectSyncDirtyMark } from "@/lib/backend/local/sync-state";
import { ApiError } from "@/lib/api/errors";
import type {
  ProjectAuth,
  ProjectEndpoint,
  ProjectFlow,
  ProjectModel,
  ProjectPage,
  ProjectRoute,
} from "@/lib/supabase/types";
import type {
  ProjectResourceRepository,
  SaveProjectAuthInput,
  SaveProjectEndpointInput,
  SaveProjectFlowInput,
  SaveProjectModelInput,
  SaveProjectPageInput,
  SaveProjectRouteInput,
} from "./types";

type LocalProjectPageRow = {
  /** 页面主键。 */
  id: string;
  /** 所属项目 ID。 */
  project_id: string;
  /** 页面路径。 */
  path: string;
  /** 页面标题。 */
  title: string;
  /** 页面描述。 */
  description: string;
  /** 页面 schema JSON 字符串。 */
  schema: string;
  /** 页面元数据 JSON 字符串。 */
  metadata: string;
  /** 排序权重。 */
  sort_order: number;
  /** 是否已发布。 */
  is_published: number;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

type LocalProjectRouteRow = {
  /** 路由主键。 */
  id: string;
  /** 所属项目 ID。 */
  project_id: string;
  /** 路由路径。 */
  path: string;
  /** 关联页面 ID。 */
  page_id: string | null;
  /** 关联布局 ID。 */
  layout_id: string | null;
  /** 是否要求鉴权。 */
  auth_required: number;
  /** 路由角色数组 JSON 字符串。 */
  roles: string;
  /** 路由中间件配置 JSON 字符串。 */
  middleware_config: string;
  /** 路由元数据 JSON 字符串。 */
  metadata: string;
  /** 父路由 ID。 */
  parent_route_id: string | null;
  /** 排序权重。 */
  sort_order: number;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

type LocalProjectModelRow = {
  /** 数据模型主键。 */
  id: string;
  /** 所属项目 ID。 */
  project_id: string;
  /** 表名。 */
  table_name: string;
  /** 数据模型 schema JSON 字符串。 */
  schema: string;
  /** RLS 策略数组 JSON 字符串。 */
  rls_policies: string;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

type LocalProjectFlowRow = {
  /** 流程主键。 */
  id: string;
  /** 所属项目 ID。 */
  project_id: string;
  /** 流程名称。 */
  name: string;
  /** 流程描述。 */
  description: string;
  /** 流程类型。 */
  flow_type: string;
  /** YAML 内容。 */
  yaml_content: string;
  /** 触发事件。 */
  trigger_event: string | null;
  /** 是否启用。 */
  is_active: number;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

type LocalProjectEndpointRow = {
  /** API 主键。 */
  id: string;
  /** 所属项目 ID。 */
  project_id: string;
  /** HTTP 方法。 */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** 路径。 */
  path: string;
  /** 描述。 */
  description: string;
  /** 请求 schema JSON 字符串。 */
  request_schema: string;
  /** 响应 schema JSON 字符串。 */
  response_schema: string;
  /** 中间件数组 JSON 字符串。 */
  middleware: string;
  /** 关联流程 ID。 */
  flow_id: string | null;
  /** 是否启用。 */
  is_active: number;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

type LocalProjectAuthRow = {
  /** 鉴权配置主键。 */
  id: string;
  /** 所属项目 ID。 */
  project_id: string;
  /** 提供商数组 JSON 字符串。 */
  providers: string;
  /** 跳转地址配置 JSON 字符串。 */
  redirect_urls: string;
  /** Session 配置 JSON 字符串。 */
  session_config: string;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

/**
 * 获取统一 ISO 时间戳。
 *
 * @author xiye
 * @date 2026-06-20
 */
function getNow() {
  return new Date().toISOString();
}

/**
 * 规范化中间件配置，兼容单对象与对象数组输入。
 *
 * @param input 原始中间件配置
 * @returns 统一的中间件数组
 * @author xiye
 * @date 2026-06-20
 */
function normalizeMiddleware(input: unknown): Record<string, unknown>[] {
  if (Array.isArray(input)) {
    return input.filter((item) => typeof item === "object" && item !== null && !Array.isArray(item)) as Record<string, unknown>[];
  }
  if (typeof input === "object" && input !== null) {
    return [input as Record<string, unknown>];
  }
  return [];
}

/**
 * 统一生成本次资源写入对应的脏标记。
 *
 * @param resourceKind 资源类型
 * @param resourceKeys 资源标识集合
 * @returns 去重后的脏标记数组
 * @author xiye
 * @date 2026-06-20
 */
function buildDirtyMarks(resourceKind: LocalSyncResourceKind, resourceKeys: string[]): ProjectSyncDirtyMark[] {
  return Array.from(new Set(resourceKeys.filter(Boolean))).map((resourceKey) => ({
    resourceKind,
    resourceKey,
  }));
}

/**
 * 将 SQLite 页面行映射为统一 `ProjectPage` 结构。
 *
 * @param row SQLite 页面记录
 * @returns 平台统一页面对象
 * @author xiye
 * @date 2026-06-20
 */
function mapPageRow(row: LocalProjectPageRow): ProjectPage {
  return {
    id: row.id,
    project_id: row.project_id,
    path: row.path,
    title: row.title,
    description: row.description,
    schema: JSON.parse(row.schema || "{}") as Record<string, unknown>,
    metadata: JSON.parse(row.metadata || "{}") as Record<string, unknown>,
    sort_order: row.sort_order,
    is_published: Boolean(row.is_published),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 将 SQLite 路由行映射为统一 `ProjectRoute` 结构。
 *
 * @param row SQLite 路由记录
 * @returns 平台统一路由对象
 * @author xiye
 * @date 2026-06-20
 */
function mapRouteRow(row: LocalProjectRouteRow): ProjectRoute {
  return {
    id: row.id,
    project_id: row.project_id,
    path: row.path,
    page_id: row.page_id,
    layout_id: row.layout_id,
    auth_required: Boolean(row.auth_required),
    roles: JSON.parse(row.roles || "[]") as string[],
    middleware_config: JSON.parse(row.middleware_config || "{}") as Record<string, unknown>,
    metadata: JSON.parse(row.metadata || "{}") as Record<string, unknown>,
    parent_route_id: row.parent_route_id,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 将 SQLite 数据模型行映射为统一 `ProjectModel` 结构。
 *
 * @param row SQLite 数据模型记录
 * @returns 平台统一数据模型对象
 * @author xiye
 * @date 2026-06-20
 */
function mapModelRow(row: LocalProjectModelRow): ProjectModel {
  return {
    id: row.id,
    project_id: row.project_id,
    table_name: row.table_name,
    schema: JSON.parse(row.schema || "{}") as Record<string, unknown>,
    rls_policies: JSON.parse(row.rls_policies || "[]") as Record<string, unknown>[],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 将 SQLite 流程行映射为统一 `ProjectFlow` 结构。
 *
 * @param row SQLite 流程记录
 * @returns 平台统一流程对象
 * @author xiye
 * @date 2026-06-20
 */
function mapFlowRow(row: LocalProjectFlowRow): ProjectFlow {
  return {
    id: row.id,
    project_id: row.project_id,
    name: row.name,
    description: row.description,
    flow_type: row.flow_type,
    yaml_content: row.yaml_content,
    trigger_event: row.trigger_event,
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 将 SQLite API 行映射为统一 `ProjectEndpoint` 结构。
 *
 * @param row SQLite API 记录
 * @returns 平台统一 API 对象
 * @author xiye
 * @date 2026-06-20
 */
function mapEndpointRow(row: LocalProjectEndpointRow): ProjectEndpoint {
  return {
    id: row.id,
    project_id: row.project_id,
    method: row.method,
    path: row.path,
    description: row.description,
    request_schema: JSON.parse(row.request_schema || "{}") as Record<string, unknown>,
    response_schema: JSON.parse(row.response_schema || "{}") as Record<string, unknown>,
    middleware: JSON.parse(row.middleware || "[]") as Record<string, unknown>[],
    flow_id: row.flow_id,
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 将 SQLite 鉴权配置行映射为统一 `ProjectAuth` 结构。
 *
 * @param row SQLite 鉴权记录
 * @returns 平台统一鉴权配置
 * @author xiye
 * @date 2026-06-20
 */
function mapAuthRow(row: LocalProjectAuthRow): ProjectAuth {
  return {
    id: row.id,
    project_id: row.project_id,
    providers: JSON.parse(row.providers || "[]") as Record<string, unknown>[],
    redirect_urls: JSON.parse(row.redirect_urls || "{}") as Record<string, unknown>,
    session_config: JSON.parse(row.session_config || "{}") as Record<string, unknown>,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 创建本地 SQLite 项目资源仓储。
 *
 * 核心链路：
 * - service 通过统一资源门面调用 `pages/routes/models/flows/endpoints/auth`；
 * - 仓储在本地 SQLite 中执行查询或批量 upsert；
 * - 查询结果最终映射回与 Supabase 一致的资源结构。
 *
 * @param config 本地后端运行配置
 * @returns local 模式下的项目资源仓储实现
 * @author xiye
 * @date 2026-06-20
 */
export function createLocalProjectResourceRepository(config: RuntimeBackendConfig): ProjectResourceRepository {
  if (config.mode !== "local") {
    throw new ApiError({
      status: 500,
      code: "BACKEND.INVALID_REPOSITORY",
      message: "Local project resource repository requires local backend config",
    });
  }

  return {
    async listPages(projectId: string): Promise<ProjectPage[]> {
      const db = getLocalSQLite(config);
      const rows = db
        .prepare("SELECT * FROM project_pages WHERE project_id = ? ORDER BY sort_order ASC, created_at ASC")
        .all(projectId) as LocalProjectPageRow[];
      return rows.map((row) => mapPageRow(row));
    },

    async upsertPages(projectId: string, pages: SaveProjectPageInput[]): Promise<ProjectPage[]> {
      const db = getLocalSQLite(config);
      const upsert = db.prepare(`
        INSERT INTO project_pages (
          id, project_id, path, title, description, schema, metadata, sort_order, is_published, created_at, updated_at
        ) VALUES (
          @id, @project_id, @path, @title, @description, @schema, @metadata, @sort_order, @is_published, @created_at, @updated_at
        )
        ON CONFLICT(project_id, path) DO UPDATE SET
          title = excluded.title,
          description = excluded.description,
          schema = excluded.schema,
          metadata = excluded.metadata,
          sort_order = excluded.sort_order,
          is_published = excluded.is_published,
          updated_at = excluded.updated_at
      `);
      const transaction = db.transaction((inputs: SaveProjectPageInput[]) => {
        for (const page of inputs) {
          const now = getNow();
          upsert.run({
            id: page.id ?? crypto.randomUUID(),
            project_id: projectId,
            path: page.path,
            title: page.title,
            description: page.description ?? "",
            schema: JSON.stringify(page.schema ?? {}),
            metadata: JSON.stringify(page.metadata ?? {}),
            sort_order: page.sort_order ?? 0,
            is_published: (page.is_published ?? false) ? 1 : 0,
            created_at: now,
            updated_at: now,
          });
        }
      });
      transaction(pages);
      markProjectDirty(config, projectId, buildDirtyMarks("pages", pages.map((page) => page.path)));
      return this.listPages(projectId);
    },

    async listRoutes(projectId: string): Promise<ProjectRoute[]> {
      const db = getLocalSQLite(config);
      const rows = db
        .prepare("SELECT * FROM project_routes WHERE project_id = ? ORDER BY sort_order ASC, created_at ASC")
        .all(projectId) as LocalProjectRouteRow[];
      return rows.map((row) => mapRouteRow(row));
    },

    async upsertRoutes(projectId: string, routes: SaveProjectRouteInput[]): Promise<ProjectRoute[]> {
      const db = getLocalSQLite(config);
      const upsert = db.prepare(`
        INSERT INTO project_routes (
          id, project_id, path, page_id, layout_id, auth_required, roles, middleware_config, metadata, parent_route_id, sort_order, created_at, updated_at
        ) VALUES (
          @id, @project_id, @path, @page_id, @layout_id, @auth_required, @roles, @middleware_config, @metadata, @parent_route_id, @sort_order, @created_at, @updated_at
        )
        ON CONFLICT(project_id, path) DO UPDATE SET
          page_id = excluded.page_id,
          layout_id = excluded.layout_id,
          auth_required = excluded.auth_required,
          roles = excluded.roles,
          middleware_config = excluded.middleware_config,
          metadata = excluded.metadata,
          parent_route_id = excluded.parent_route_id,
          sort_order = excluded.sort_order,
          updated_at = excluded.updated_at
      `);
      const transaction = db.transaction((inputs: SaveProjectRouteInput[]) => {
        for (const route of inputs) {
          const now = getNow();
          upsert.run({
            id: route.id ?? crypto.randomUUID(),
            project_id: projectId,
            path: route.path,
            page_id: route.page_id ?? null,
            layout_id: route.layout_id ?? null,
            auth_required: (route.auth_required ?? false) ? 1 : 0,
            roles: JSON.stringify(route.roles ?? []),
            middleware_config: JSON.stringify(route.middleware_config ?? {}),
            metadata: JSON.stringify(route.metadata ?? {}),
            parent_route_id: route.parent_route_id ?? null,
            sort_order: route.sort_order ?? 0,
            created_at: now,
            updated_at: now,
          });
        }
      });
      transaction(routes);
      markProjectDirty(config, projectId, buildDirtyMarks("routes", routes.map((route) => route.path)));
      return this.listRoutes(projectId);
    },

    async listModels(projectId: string): Promise<ProjectModel[]> {
      const db = getLocalSQLite(config);
      const rows = db
        .prepare("SELECT * FROM project_models WHERE project_id = ? ORDER BY created_at ASC")
        .all(projectId) as LocalProjectModelRow[];
      return rows.map((row) => mapModelRow(row));
    },

    async upsertModels(projectId: string, models: SaveProjectModelInput[]): Promise<ProjectModel[]> {
      const db = getLocalSQLite(config);
      const upsert = db.prepare(`
        INSERT INTO project_models (
          id, project_id, table_name, schema, rls_policies, created_at, updated_at
        ) VALUES (
          @id, @project_id, @table_name, @schema, @rls_policies, @created_at, @updated_at
        )
        ON CONFLICT(project_id, table_name) DO UPDATE SET
          schema = excluded.schema,
          rls_policies = excluded.rls_policies,
          updated_at = excluded.updated_at
      `);
      const transaction = db.transaction((inputs: SaveProjectModelInput[]) => {
        for (const model of inputs) {
          const now = getNow();
          upsert.run({
            id: model.id ?? crypto.randomUUID(),
            project_id: projectId,
            table_name: model.table_name,
            schema: JSON.stringify(model.schema ?? {}),
            rls_policies: JSON.stringify(model.rls_policies ?? []),
            created_at: now,
            updated_at: now,
          });
        }
      });
      transaction(models);
      markProjectDirty(config, projectId, buildDirtyMarks("models", models.map((model) => model.table_name)));
      return this.listModels(projectId);
    },

    async listFlows(projectId: string): Promise<ProjectFlow[]> {
      const db = getLocalSQLite(config);
      const rows = db
        .prepare("SELECT * FROM project_flows WHERE project_id = ? ORDER BY created_at ASC")
        .all(projectId) as LocalProjectFlowRow[];
      return rows.map((row) => mapFlowRow(row));
    },

    async upsertFlows(projectId: string, flows: SaveProjectFlowInput[]): Promise<ProjectFlow[]> {
      const db = getLocalSQLite(config);
      const upsert = db.prepare(`
        INSERT INTO project_flows (
          id, project_id, name, description, flow_type, yaml_content, trigger_event, is_active, created_at, updated_at
        ) VALUES (
          @id, @project_id, @name, @description, @flow_type, @yaml_content, @trigger_event, @is_active, @created_at, @updated_at
        )
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          description = excluded.description,
          flow_type = excluded.flow_type,
          yaml_content = excluded.yaml_content,
          trigger_event = excluded.trigger_event,
          is_active = excluded.is_active,
          updated_at = excluded.updated_at
      `);
      const transaction = db.transaction((inputs: SaveProjectFlowInput[]) => {
        for (const flow of inputs) {
          const now = getNow();
          upsert.run({
            id: flow.id ?? crypto.randomUUID(),
            project_id: projectId,
            name: flow.name,
            description: flow.description ?? "",
            flow_type: flow.flow_type ?? "action",
            yaml_content: flow.yaml_content ?? "",
            trigger_event: flow.trigger_event ?? null,
            is_active: (flow.is_active ?? true) ? 1 : 0,
            created_at: now,
            updated_at: now,
          });
        }
      });
      transaction(flows);
      markProjectDirty(
        config,
        projectId,
        buildDirtyMarks("flows", flows.map((flow, index) => flow.id ?? `${flow.name}:${index}`)),
      );
      return this.listFlows(projectId);
    },

    async listEndpoints(projectId: string): Promise<ProjectEndpoint[]> {
      const db = getLocalSQLite(config);
      const rows = db
        .prepare("SELECT * FROM project_endpoints WHERE project_id = ? ORDER BY created_at ASC")
        .all(projectId) as LocalProjectEndpointRow[];
      return rows.map((row) => mapEndpointRow(row));
    },

    async upsertEndpoints(projectId: string, endpoints: SaveProjectEndpointInput[]): Promise<ProjectEndpoint[]> {
      const db = getLocalSQLite(config);
      const upsert = db.prepare(`
        INSERT INTO project_endpoints (
          id, project_id, method, path, description, request_schema, response_schema, middleware, flow_id, is_active, created_at, updated_at
        ) VALUES (
          @id, @project_id, @method, @path, @description, @request_schema, @response_schema, @middleware, @flow_id, @is_active, @created_at, @updated_at
        )
        ON CONFLICT(project_id, method, path) DO UPDATE SET
          description = excluded.description,
          request_schema = excluded.request_schema,
          response_schema = excluded.response_schema,
          middleware = excluded.middleware,
          flow_id = excluded.flow_id,
          is_active = excluded.is_active,
          updated_at = excluded.updated_at
      `);
      const transaction = db.transaction((inputs: SaveProjectEndpointInput[]) => {
        for (const endpoint of inputs) {
          const now = getNow();
          upsert.run({
            id: endpoint.id ?? crypto.randomUUID(),
            project_id: projectId,
            method: endpoint.method,
            path: endpoint.path,
            description: endpoint.description ?? "",
            request_schema: JSON.stringify(endpoint.request_schema ?? {}),
            response_schema: JSON.stringify(endpoint.response_schema ?? {}),
            middleware: JSON.stringify(normalizeMiddleware(endpoint.middleware)),
            flow_id: endpoint.flow_id ?? null,
            is_active: (endpoint.is_active ?? true) ? 1 : 0,
            created_at: now,
            updated_at: now,
          });
        }
      });
      transaction(endpoints);
      markProjectDirty(
        config,
        projectId,
        buildDirtyMarks("endpoints", endpoints.map((endpoint) => `${endpoint.method} ${endpoint.path}`)),
      );
      return this.listEndpoints(projectId);
    },

    async getAuth(projectId: string): Promise<ProjectAuth | null> {
      const db = getLocalSQLite(config);
      const row = db
        .prepare("SELECT * FROM project_auth WHERE project_id = ?")
        .get(projectId) as LocalProjectAuthRow | undefined;
      return row ? mapAuthRow(row) : null;
    },

    async upsertAuth(projectId: string, auth: SaveProjectAuthInput): Promise<ProjectAuth> {
      const db = getLocalSQLite(config);
      const now = getNow();
      db.prepare(`
        INSERT INTO project_auth (
          id, project_id, providers, redirect_urls, session_config, created_at, updated_at
        ) VALUES (
          @id, @project_id, @providers, @redirect_urls, @session_config, @created_at, @updated_at
        )
        ON CONFLICT(project_id) DO UPDATE SET
          providers = excluded.providers,
          redirect_urls = excluded.redirect_urls,
          session_config = excluded.session_config,
          updated_at = excluded.updated_at
      `).run({
        id: auth.id ?? crypto.randomUUID(),
        project_id: projectId,
        providers: JSON.stringify(Array.isArray(auth.providers) ? auth.providers : []),
        redirect_urls: JSON.stringify(auth.redirect_urls ?? {}),
        session_config: JSON.stringify(auth.session_config ?? {}),
        created_at: now,
        updated_at: now,
      });
      markProjectDirty(config, projectId, buildDirtyMarks("auth", ["singleton"]));

      const saved = await this.getAuth(projectId);
      if (!saved) {
        throw new ApiError({
          status: 500,
          code: "PROJECT_AUTH.SAVE_FAILED",
          message: "Failed to save project auth",
        });
      }
      return saved;
    },
  };
}
