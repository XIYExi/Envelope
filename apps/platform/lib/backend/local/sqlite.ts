/**
 * 本地 SQLite 连接与迁移初始化工具。
 *
 * 职责：
 * - 为 `local` 模式准备数据库文件与媒体目录；
 * - 维护 SQLite 连接缓存，避免重复创建连接；
 * - 承担本地表结构迁移职责，覆盖 projects/pages/routes/models/flows/endpoints/auth 基础闭环；
 * - 为 local 同步引擎 v1 准备同步状态表与脏标记表。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第一阶段后端门面重构
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import type { RuntimeBackendConfig } from "@/lib/backend/config";

const dbCache = new Map<string, Database.Database>();

/**
 * 确保目标文件的父目录存在。
 *
 * @param filePath 目标文件绝对路径
 * @author xiye
 * @date 2026-06-20
 */
function ensureParentDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * 准备本地模式运行所需的文件系统目录。
 *
 * 核心链路：
 * - 先为 SQLite 文件准备父目录；
 * - 再创建媒体文件根目录；
 * - 这样后续 repository 写数据或图片时不会再关心目录存在性。
 *
 * @param config 本地后端配置
 * @author xiye
 * @date 2026-06-20
 */
export function ensureLocalBackendFilesystem(config: RuntimeBackendConfig) {
  if (config.mode !== "local") return;
  ensureParentDir(config.sqlitePath);
  try {
    fs.mkdirSync(config.mediaRoot, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== "EPERM") {
      throw error;
    }
    /**
     * Windows 某些沙箱/受限运行环境下，会拒绝在默认媒体目录提前建空目录。
     * 项目列表等只读链路并不依赖 mediaRoot，因此这里允许延迟到真正写媒体文件时再创建，
     * 避免本地 SQLite 已可用时仍被无关目录初始化阻断。
     */
  }
}

/**
 * 执行本地 SQLite 的基础迁移。
 *
 * 当前覆盖 `projects/project_pages/project_routes/project_models/project_flows/project_endpoints/project_auth`
 * 以及同步引擎使用的 `project_sync_state/project_sync_dirty_resources`，
 * 用于承接项目基础信息、编辑器资源和本地推送到 Supabase 的同步元数据。
 *
 * @param db SQLite 数据库连接
 * @author xiye
 * @date 2026-06-20
 */
function migrate(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      -- 资源归属用户 ID：与 Supabase projects.user_id 对齐
      user_id TEXT NOT NULL,
      -- 项目名称
      name TEXT NOT NULL,
      -- 项目描述
      description TEXT NOT NULL DEFAULT '',
      -- Schema 版本号，保持与云端结构一致
      schema_version TEXT NOT NULL DEFAULT '3.0.0',
      -- 项目配置 JSON
      config TEXT NOT NULL DEFAULT '{}',
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 最近成功同步到云端的时间，后续同步引擎会使用
      synced_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);

    CREATE TABLE IF NOT EXISTS project_pages (
      id TEXT PRIMARY KEY,
      -- 关联项目 ID：指向 projects.id
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      -- 页面访问路径，如 "/"、"/dashboard"
      path TEXT NOT NULL,
      -- 页面标题
      title TEXT NOT NULL,
      -- 页面描述
      description TEXT NOT NULL DEFAULT '',
      -- 页面 Schema JSON
      schema TEXT NOT NULL DEFAULT '{}',
      -- 页面元数据 JSON
      metadata TEXT NOT NULL DEFAULT '{}',
      -- 页面排序值
      sort_order INTEGER NOT NULL DEFAULT 0,
      -- 是否已发布
      is_published INTEGER NOT NULL DEFAULT 0,
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(project_id, path)
    );

    CREATE INDEX IF NOT EXISTS idx_project_pages_project_sort ON project_pages(project_id, sort_order);

    CREATE TABLE IF NOT EXISTS project_routes (
      id TEXT PRIMARY KEY,
      -- 关联项目 ID：指向 projects.id
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      -- 路由路径
      path TEXT NOT NULL,
      -- 关联页面 ID：指向 project_pages.id
      page_id TEXT REFERENCES project_pages(id) ON DELETE SET NULL,
      -- 布局标识
      layout_id TEXT,
      -- 是否要求登录
      auth_required INTEGER NOT NULL DEFAULT 0,
      -- 允许访问的角色数组 JSON
      roles TEXT NOT NULL DEFAULT '[]',
      -- 中间件配置 JSON
      middleware_config TEXT NOT NULL DEFAULT '{}',
      -- 路由元数据 JSON
      metadata TEXT NOT NULL DEFAULT '{}',
      -- 父级路由 ID：形成树形结构
      parent_route_id TEXT REFERENCES project_routes(id) ON DELETE CASCADE,
      -- 路由排序值
      sort_order INTEGER NOT NULL DEFAULT 0,
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(project_id, path)
    );

    CREATE INDEX IF NOT EXISTS idx_project_routes_project_sort ON project_routes(project_id, sort_order);

    CREATE TABLE IF NOT EXISTS project_models (
      id TEXT PRIMARY KEY,
      -- 关联项目 ID：指向 projects.id
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      -- 模型表名
      table_name TEXT NOT NULL,
      -- 数据模型 Schema JSON
      schema TEXT NOT NULL DEFAULT '{}',
      -- RLS 策略数组 JSON
      rls_policies TEXT NOT NULL DEFAULT '[]',
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(project_id, table_name)
    );

    CREATE INDEX IF NOT EXISTS idx_project_models_project_created ON project_models(project_id, created_at);

    CREATE TABLE IF NOT EXISTS project_flows (
      id TEXT PRIMARY KEY,
      -- 关联项目 ID：指向 projects.id
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      -- 流程名称
      name TEXT NOT NULL,
      -- 流程描述
      description TEXT NOT NULL DEFAULT '',
      -- 流程类型
      flow_type TEXT NOT NULL DEFAULT 'action',
      -- YAML 内容
      yaml_content TEXT NOT NULL DEFAULT '',
      -- 触发事件
      trigger_event TEXT,
      -- 是否启用
      is_active INTEGER NOT NULL DEFAULT 1,
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_project_flows_project_created ON project_flows(project_id, created_at);

    CREATE TABLE IF NOT EXISTS project_endpoints (
      id TEXT PRIMARY KEY,
      -- 关联项目 ID：指向 projects.id
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      -- HTTP 方法
      method TEXT NOT NULL,
      -- API 路径
      path TEXT NOT NULL,
      -- API 描述
      description TEXT NOT NULL DEFAULT '',
      -- 请求 Schema JSON
      request_schema TEXT NOT NULL DEFAULT '{}',
      -- 响应 Schema JSON
      response_schema TEXT NOT NULL DEFAULT '{}',
      -- 中间件数组 JSON
      middleware TEXT NOT NULL DEFAULT '[]',
      -- 关联流程 ID：指向 project_flows.id
      flow_id TEXT REFERENCES project_flows(id) ON DELETE SET NULL,
      -- 是否启用
      is_active INTEGER NOT NULL DEFAULT 1,
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(project_id, method, path)
    );

    CREATE INDEX IF NOT EXISTS idx_project_endpoints_project_created ON project_endpoints(project_id, created_at);

    CREATE TABLE IF NOT EXISTS project_auth (
      id TEXT PRIMARY KEY,
      -- 关联项目 ID：一对一指向 projects.id
      project_id TEXT NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
      -- 鉴权提供商数组 JSON
      providers TEXT NOT NULL DEFAULT '[]',
      -- 鉴权跳转地址配置 JSON
      redirect_urls TEXT NOT NULL DEFAULT '{}',
      -- Session 配置 JSON
      session_config TEXT NOT NULL DEFAULT '{}',
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS project_sync_state (
      -- 关联项目 ID：一对一指向 projects.id
      project_id TEXT PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
      -- 云端对应项目 ID：首次推送成功后记录，后续走 merge 同步
      remote_project_id TEXT,
      -- 最近一次成功同步完成时间
      last_synced_at TEXT,
      -- 最近一次同步开始时间
      last_sync_started_at TEXT,
      -- 最近一次同步结束时间
      last_sync_finished_at TEXT,
      -- 最近一次同步状态：idle/dirty/running/synced/error
      last_sync_status TEXT NOT NULL DEFAULT 'idle',
      -- 最近一次同步失败错误信息
      last_sync_error TEXT,
      -- 最近一次确认与远端一致的快照基线，用于后续双向比较与冲突检测
      sync_base_snapshot_json TEXT,
      -- 当前脏数据首次出现时间
      dirty_since TEXT,
      -- 创建时间
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 更新时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_project_sync_state_status ON project_sync_state(last_sync_status, updated_at DESC);

    CREATE TABLE IF NOT EXISTS project_sync_dirty_resources (
      -- 关联项目 ID
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      -- 脏资源类型：project/pages/routes/models/flows/endpoints/auth
      resource_kind TEXT NOT NULL,
      -- 脏资源标识：通常是 path/table_name/natural key
      resource_key TEXT NOT NULL,
      -- 首次标脏时间
      first_dirty_at TEXT NOT NULL DEFAULT (datetime('now')),
      -- 最近一次更新脏标记时间
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (project_id, resource_kind, resource_key)
    );

    CREATE INDEX IF NOT EXISTS idx_project_sync_dirty_project_updated
      ON project_sync_dirty_resources(project_id, updated_at DESC);
  `);
  const columns = db.prepare("PRAGMA table_info(projects)").all() as Array<{ name: string }>;
  const columnNames = new Set(columns.map((column) => column.name));
  if (!columnNames.has("user_id")) {
    db.exec(`ALTER TABLE projects ADD COLUMN user_id TEXT NOT NULL DEFAULT 'local-user';`);
  }
  if (!columnNames.has("synced_at")) {
    db.exec(`ALTER TABLE projects ADD COLUMN synced_at TEXT;`);
  }

  const syncStateColumns = db.prepare("PRAGMA table_info(project_sync_state)").all() as Array<{ name: string }>;
  const syncStateColumnNames = new Set(syncStateColumns.map((column) => column.name));
  if (!syncStateColumnNames.has("remote_project_id")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN remote_project_id TEXT;`);
  }
  if (!syncStateColumnNames.has("last_synced_at")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN last_synced_at TEXT;`);
  }
  if (!syncStateColumnNames.has("last_sync_started_at")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN last_sync_started_at TEXT;`);
  }
  if (!syncStateColumnNames.has("last_sync_finished_at")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN last_sync_finished_at TEXT;`);
  }
  if (!syncStateColumnNames.has("last_sync_status")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN last_sync_status TEXT NOT NULL DEFAULT 'idle';`);
  }
  if (!syncStateColumnNames.has("last_sync_error")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN last_sync_error TEXT;`);
  }
  if (!syncStateColumnNames.has("sync_base_snapshot_json")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN sync_base_snapshot_json TEXT;`);
  }
  if (!syncStateColumnNames.has("dirty_since")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN dirty_since TEXT;`);
  }
  if (!syncStateColumnNames.has("created_at")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN created_at TEXT NOT NULL DEFAULT (datetime('now'));`);
  }
  if (!syncStateColumnNames.has("updated_at")) {
    db.exec(`ALTER TABLE project_sync_state ADD COLUMN updated_at TEXT NOT NULL DEFAULT (datetime('now'));`);
  }
}

/**
 * 获取本地 SQLite 连接。
 *
 * 核心链路：
 * - 校验必须处于 `local` 模式；
 * - 准备文件系统目录；
 * - 命中缓存则直接返回；
 * - 首次创建连接时自动执行迁移并写入缓存。
 *
 * @param config 本地后端配置
 * @returns 当前 sqlitePath 对应的连接实例
 * @author xiye
 * @date 2026-06-20
 */
export function getLocalSQLite(config: RuntimeBackendConfig): Database.Database {
  if (config.mode !== "local") {
    throw new Error("Local SQLite is only available for local backend mode");
  }

  ensureLocalBackendFilesystem(config);
  const cached = dbCache.get(config.sqlitePath);
  if (cached) return cached;

  const db = new Database(config.sqlitePath);
  migrate(db);
  dbCache.set(config.sqlitePath, db);
  return db;
}

/**
 * 关闭当前进程内缓存的所有 SQLite 连接。
 *
 * 主要用于测试结束后的资源回收，避免 Windows 文件锁影响临时目录删除。
 *
 * @author xiye
 * @date 2026-06-20
 */
export function closeLocalSQLiteConnections() {
  for (const db of dbCache.values()) {
    db.close();
  }
  dbCache.clear();
}
