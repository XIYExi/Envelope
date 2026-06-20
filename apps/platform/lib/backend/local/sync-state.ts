/**
 * local 模式项目同步状态与脏标记管理。
 *
 * 职责：
 * - 维护 SQLite 中的项目同步状态表与脏资源表；
 * - 为本地仓储写链路提供统一的“标脏”入口，避免重复散落在各个 service；
 * - 为同步 API 与后台任务提供可直接消费的项目同步状态快照。
 *
 * @author xiye
 * @date 2026-06-20
 * @since local 同步引擎 v1
 */
import type { RuntimeBackendConfig } from "@/lib/backend/config";
import { ApiError } from "@/lib/api/errors";
import type { ProjectSyncComparableSnapshot } from "@/lib/sync/project-sync-snapshot";
import { parseComparableSnapshot } from "@/lib/sync/project-sync-snapshot";
import { getLocalSQLite } from "./sqlite";

export const localSyncResourceKinds = [
  "project",
  "pages",
  "routes",
  "models",
  "flows",
  "endpoints",
  "auth",
] as const;

export type LocalSyncResourceKind = (typeof localSyncResourceKinds)[number];
export type LocalSyncLifecycleState = "idle" | "dirty" | "running" | "synced" | "error";

export type ProjectSyncDirtyMark = {
  /** 脏资源类型。 */
  resourceKind: LocalSyncResourceKind;
  /** 脏资源标识。 */
  resourceKey: string;
};

type LocalProjectSyncStateRow = {
  project_id: string;
  remote_project_id: string | null;
  last_synced_at: string | null;
  last_sync_started_at: string | null;
  last_sync_finished_at: string | null;
  last_sync_status: LocalSyncLifecycleState;
  last_sync_error: string | null;
  sync_base_snapshot_json: string | null;
  dirty_since: string | null;
  created_at: string;
  updated_at: string;
};

type LocalProjectSyncDirtyRow = {
  project_id: string;
  resource_kind: LocalSyncResourceKind;
  resource_key: string;
  first_dirty_at: string;
  updated_at: string;
};

export type ProjectLocalSyncStatus = {
  /** 当前项目 ID。 */
  projectId: string;
  /** 当前后端模式。 */
  backendMode: "local";
  /** 聚合后的同步状态。 */
  state: LocalSyncLifecycleState;
  /** 当前是否存在未同步的本地改动。 */
  dirty: boolean;
  /** 脏资源类型汇总。 */
  dirtyResources: LocalSyncResourceKind[];
  /** 每类脏资源的计数。 */
  dirtyCounts: Partial<Record<LocalSyncResourceKind, number>>;
  /** 最近一次开始出现脏数据的时间。 */
  dirtySince: string | null;
  /** 最近一次成功同步时间。 */
  lastSyncedAt: string | null;
  /** 最近一次同步开始时间。 */
  lastSyncStartedAt: string | null;
  /** 最近一次同步结束时间。 */
  lastSyncFinishedAt: string | null;
  /** 最近一次同步失败信息。 */
  lastSyncError: string | null;
  /** 最近一次确认与远端一致的快照基线。 */
  syncBaseSnapshot: ProjectSyncComparableSnapshot | null;
  /** 远端 Supabase 项目 ID。 */
  remoteProjectId: string | null;
  /** 状态记录创建时间。 */
  createdAt: string | null;
  /** 状态记录更新时间。 */
  updatedAt: string | null;
};

function getNow() {
  return new Date().toISOString();
}

function assertLocalConfig(config: RuntimeBackendConfig): asserts config is Extract<RuntimeBackendConfig, { mode: "local" }> {
  if (config.mode !== "local") {
    throw new ApiError({
      status: 500,
      code: "SYNC.LOCAL_ONLY",
      message: "Project sync state is only available in local backend mode",
    });
  }
}

function ensureSyncStateRow(db: ReturnType<typeof getLocalSQLite>, projectId: string) {
  const now = getNow();
  db.prepare(`
    INSERT INTO project_sync_state (
      project_id,
      last_sync_status,
      created_at,
      updated_at
    ) VALUES (
      @project_id,
      'idle',
      @created_at,
      @updated_at
    )
    ON CONFLICT(project_id) DO NOTHING
  `).run({
    project_id: projectId,
    created_at: now,
    updated_at: now,
  });
}

/**
 * 为项目资源写操作记录脏标记。
 *
 * @param config local 后端配置
 * @param projectId 项目 ID
 * @param marks 本次写入涉及的资源标记
 * @author xiye
 * @date 2026-06-20
 */
export function markProjectDirty(config: RuntimeBackendConfig, projectId: string, marks: ProjectSyncDirtyMark[]) {
  assertLocalConfig(config);
  if (marks.length === 0) return;

  const db = getLocalSQLite(config);
  const now = getNow();
  const upsertDirty = db.prepare(`
    INSERT INTO project_sync_dirty_resources (
      project_id,
      resource_kind,
      resource_key,
      first_dirty_at,
      updated_at
    ) VALUES (
      @project_id,
      @resource_kind,
      @resource_key,
      @first_dirty_at,
      @updated_at
    )
    ON CONFLICT(project_id, resource_kind, resource_key) DO UPDATE SET
      updated_at = excluded.updated_at
  `);

  const transaction = db.transaction((inputMarks: ProjectSyncDirtyMark[]) => {
    ensureSyncStateRow(db, projectId);
    for (const mark of inputMarks) {
      upsertDirty.run({
        project_id: projectId,
        resource_kind: mark.resourceKind,
        resource_key: mark.resourceKey,
        first_dirty_at: now,
        updated_at: now,
      });
    }

    db.prepare(`
      UPDATE project_sync_state
      SET
        dirty_since = COALESCE(dirty_since, @now),
        last_sync_status = CASE
          WHEN last_sync_status = 'running' THEN 'running'
          ELSE 'dirty'
        END,
        last_sync_error = NULL,
        updated_at = @now
      WHERE project_id = @project_id
    `).run({
      project_id: projectId,
      now,
    });
  });

  transaction(marks);
}

/**
 * 记录项目同步开始。
 *
 * @param config local 后端配置
 * @param projectId 项目 ID
 * @author xiye
 * @date 2026-06-20
 */
export function markProjectSyncRunning(config: RuntimeBackendConfig, projectId: string) {
  assertLocalConfig(config);
  const db = getLocalSQLite(config);
  const now = getNow();
  const transaction = db.transaction(() => {
    ensureSyncStateRow(db, projectId);
    db.prepare(`
      UPDATE project_sync_state
      SET
        last_sync_status = 'running',
        last_sync_started_at = @now,
        last_sync_finished_at = NULL,
        last_sync_error = NULL,
        updated_at = @now
      WHERE project_id = @project_id
    `).run({
      project_id: projectId,
      now,
    });
  });
  transaction();
}

/**
 * 记录项目同步成功，并清空当前脏标记。
 *
 * @param config local 后端配置
 * @param projectId 项目 ID
 * @param remoteProjectId Supabase 远端项目 ID
 * @author xiye
 * @date 2026-06-20
 */
export function markProjectSyncSucceeded(
  config: RuntimeBackendConfig,
  projectId: string,
  remoteProjectId: string,
  syncBaseSnapshot?: ProjectSyncComparableSnapshot | null,
) {
  assertLocalConfig(config);
  const db = getLocalSQLite(config);
  const now = getNow();
  const transaction = db.transaction(() => {
    ensureSyncStateRow(db, projectId);
    db.prepare("DELETE FROM project_sync_dirty_resources WHERE project_id = ?").run(projectId);
    db.prepare(`
      UPDATE project_sync_state
      SET
        remote_project_id = @remote_project_id,
        last_synced_at = @now,
        last_sync_started_at = COALESCE(last_sync_started_at, @now),
        last_sync_finished_at = @now,
        last_sync_status = 'synced',
        last_sync_error = NULL,
        sync_base_snapshot_json = @sync_base_snapshot_json,
        dirty_since = NULL,
        updated_at = @now
      WHERE project_id = @project_id
    `).run({
      project_id: projectId,
      remote_project_id: remoteProjectId,
      sync_base_snapshot_json: syncBaseSnapshot ? JSON.stringify(syncBaseSnapshot) : null,
      now,
    });
    db.prepare("UPDATE projects SET synced_at = @now WHERE id = @project_id").run({
      project_id: projectId,
      now,
    });
  });
  transaction();
}

/**
 * 记录项目同步失败。
 *
 * @param config local 后端配置
 * @param projectId 项目 ID
 * @param errorMessage 错误信息
 * @author xiye
 * @date 2026-06-20
 */
export function markProjectSyncFailed(config: RuntimeBackendConfig, projectId: string, errorMessage: string) {
  assertLocalConfig(config);
  const db = getLocalSQLite(config);
  const now = getNow();
  const transaction = db.transaction(() => {
    ensureSyncStateRow(db, projectId);
    db.prepare(`
      UPDATE project_sync_state
      SET
        last_sync_status = 'error',
        last_sync_finished_at = @now,
        last_sync_error = @error,
        updated_at = @now
      WHERE project_id = @project_id
    `).run({
      project_id: projectId,
      error: errorMessage,
      now,
    });
  });
  transaction();
}

/**
 * 查询项目当前同步状态。
 *
 * @param config local 后端配置
 * @param projectId 项目 ID
 * @returns 可直接返回给 API 的同步状态快照
 * @author xiye
 * @date 2026-06-20
 */
export function getProjectSyncStatus(config: RuntimeBackendConfig, projectId: string): ProjectLocalSyncStatus {
  assertLocalConfig(config);
  const db = getLocalSQLite(config);
  const stateRow = db.prepare("SELECT * FROM project_sync_state WHERE project_id = ?").get(projectId) as LocalProjectSyncStateRow | undefined;
  const dirtyRows = db
    .prepare("SELECT * FROM project_sync_dirty_resources WHERE project_id = ? ORDER BY updated_at DESC")
    .all(projectId) as LocalProjectSyncDirtyRow[];

  const dirtyCounts: Partial<Record<LocalSyncResourceKind, number>> = {};
  for (const row of dirtyRows) {
    dirtyCounts[row.resource_kind] = (dirtyCounts[row.resource_kind] ?? 0) + 1;
  }

  const dirtyResources = localSyncResourceKinds.filter((kind) => (dirtyCounts[kind] ?? 0) > 0);
  const dirty = dirtyRows.length > 0;

  let state: LocalSyncLifecycleState = "idle";
  if (stateRow?.last_sync_status === "running") {
    state = "running";
  } else if (stateRow?.last_sync_status === "error") {
    state = "error";
  } else if (dirty) {
    state = "dirty";
  } else if (stateRow?.last_synced_at) {
    state = "synced";
  }

  return {
    projectId,
    backendMode: "local",
    state,
    dirty,
    dirtyResources,
    dirtyCounts,
    dirtySince: stateRow?.dirty_since ?? null,
    lastSyncedAt: stateRow?.last_synced_at ?? null,
    lastSyncStartedAt: stateRow?.last_sync_started_at ?? null,
    lastSyncFinishedAt: stateRow?.last_sync_finished_at ?? null,
    lastSyncError: stateRow?.last_sync_error ?? null,
    syncBaseSnapshot: parseComparableSnapshot(stateRow?.sync_base_snapshot_json ?? null),
    remoteProjectId: stateRow?.remote_project_id ?? null,
    createdAt: stateRow?.created_at ?? null,
    updatedAt: stateRow?.updated_at ?? null,
  };
}
