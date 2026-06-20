/**
 * local 项目同步后台任务管理。
 *
 * 职责：
 * - 复用任务 WS 推送机制，将本地项目推送 Supabase 的过程包装为后台任务；
 * - 统一管理任务生命周期、权限校验与超时清理；
 * - 为 `/api/projects/[id]/sync/tasks` 与 `/api/sync/tasks/[taskId]` 提供状态查询能力。
 *
 * @author xiye
 * @date 2026-06-20
 * @since local 同步引擎 v1
 */
import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { ArchiveExportOptions } from "@/lib/archive/archive-types";
import { ensureTaskWSServer, publishTaskSnapshot } from "@/lib/ws/task-ws-server";
import { pullRemoteProjectToLocal, pushLocalProjectToSupabase } from "./local-project-sync";

export type ProjectSyncTaskState = "queued" | "running" | "done" | "error";
export type ProjectSyncTaskKind = "project_sync_push" | "project_sync_pull";

export type ProjectSyncTaskSnapshot = {
  taskId: string;
  kind: ProjectSyncTaskKind;
  projectId: string;
  state: ProjectSyncTaskState;
  stage: string;
  percent: number;
  remoteProjectId?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};

type ProjectSyncTaskInternal = ProjectSyncTaskSnapshot & {
  ownerUserId: string;
  accessToken?: string;
  supabase?: SupabaseClient<Database>;
  force?: boolean;
  remoteProjectId?: string;
  archiveOptions?: ArchiveExportOptions;
  expiresAt: number;
  lastBroadcastAt: number;
  lastBroadcastPercent: number;
};

type ProjectSyncTaskManager = {
  tasks: Map<string, ProjectSyncTaskInternal>;
};

declare global {
  var __envelopeProjectSyncTaskManager: ProjectSyncTaskManager | undefined;
}

function getManager(): ProjectSyncTaskManager {
  const existing = globalThis.__envelopeProjectSyncTaskManager;
  if (existing) return existing;
  const manager: ProjectSyncTaskManager = {
    tasks: new Map(),
  };
  globalThis.__envelopeProjectSyncTaskManager = manager;
  return manager;
}

function cleanupExpired() {
  const now = Date.now();
  const manager = getManager();
  for (const [taskId, task] of manager.tasks) {
    if (task.expiresAt > now) continue;
    manager.tasks.delete(taskId);
  }
}

function broadcast(taskId: string) {
  const manager = getManager();
  const task = manager.tasks.get(taskId);
  if (!task) return;

  const now = Date.now();
  if (now - task.lastBroadcastAt < 200 && task.percent === task.lastBroadcastPercent && task.state === "running") return;
  task.lastBroadcastAt = now;
  task.lastBroadcastPercent = task.percent;
  publishTaskSnapshot(taskId, { kind: task.kind, task });
}

function createProjectSyncTask(input: {
  kind: ProjectSyncTaskKind;
  projectId: string;
  ownerUserId: string;
  accessToken?: string;
  supabase?: SupabaseClient<Database>;
  force?: boolean;
  remoteProjectId?: string;
  archiveOptions?: ArchiveExportOptions;
}): { taskId: string; wsPort: number; wsPath: string } {
  cleanupExpired();
  const { wsPort, wsPath } = ensureTaskWSServer();

  const now = Date.now();
  const taskId = randomUUID();
  const task: ProjectSyncTaskInternal = {
    taskId,
    kind: input.kind,
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    accessToken: input.accessToken,
    supabase: input.supabase,
    force: input.force,
    remoteProjectId: input.remoteProjectId,
    archiveOptions: input.archiveOptions,
    state: "queued",
    stage: "排队中",
    percent: 0,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + 30 * 60 * 1000,
    lastBroadcastAt: 0,
    lastBroadcastPercent: -1,
  };
  getManager().tasks.set(taskId, task);
  broadcast(taskId);
  void runProjectSyncTask(taskId);
  return { taskId, wsPort, wsPath };
}

/**
 * 创建项目推送同步任务。
 *
 * @param input 任务入参
 * @returns 任务 ID 与 WS 连接信息
 * @author xiye
 * @date 2026-06-20
 */
export function createProjectSyncPushTask(input: {
  projectId: string;
  ownerUserId: string;
  accessToken?: string;
  supabase?: SupabaseClient<Database>;
  force?: boolean;
  remoteProjectId?: string;
  archiveOptions?: ArchiveExportOptions;
}): { taskId: string; wsPort: number; wsPath: string } {
  return createProjectSyncTask({
    ...input,
    kind: "project_sync_push",
  });
}

/**
 * 创建项目拉取同步任务。
 *
 * @param input 任务入参
 * @returns 任务 ID 与 WS 连接信息
 * @author xiye
 * @date 2026-06-20
 */
export function createProjectSyncPullTask(input: {
  projectId: string;
  ownerUserId: string;
  accessToken?: string;
  supabase?: SupabaseClient<Database>;
  force?: boolean;
  remoteProjectId?: string;
  archiveOptions?: ArchiveExportOptions;
}): { taskId: string; wsPort: number; wsPath: string } {
  return createProjectSyncTask({
    ...input,
    kind: "project_sync_pull",
  });
}

async function runProjectSyncTask(taskId: string) {
  const manager = getManager();
  const task = manager.tasks.get(taskId);
  if (!task) return;

  const update = (
    patch: Partial<Pick<ProjectSyncTaskInternal, "state" | "stage" | "percent" | "remoteProjectId" | "error">>,
  ) => {
    const current = manager.tasks.get(taskId);
    if (!current) return;
    Object.assign(current, patch, { updatedAt: Date.now() });
    broadcast(taskId);
  };

  try {
    update({ state: "running", stage: "初始化", percent: 0 });
    const result = task.kind === "project_sync_pull"
      ? await pullRemoteProjectToLocal(
          {
            projectId: task.projectId,
            accessToken: task.accessToken,
            supabase: task.supabase,
            force: task.force,
            remoteProjectId: task.remoteProjectId,
            archiveOptions: task.archiveOptions,
          },
          (stage, percent) => {
            update({ stage, percent });
          },
        )
      : await pushLocalProjectToSupabase(
          {
            projectId: task.projectId,
            accessToken: task.accessToken,
            supabase: task.supabase,
            force: task.force,
            remoteProjectId: task.remoteProjectId,
            archiveOptions: task.archiveOptions,
          },
          (stage, percent) => {
            update({ stage, percent });
          },
        );

    const current = manager.tasks.get(taskId);
    if (current) current.accessToken = undefined;
    update({
      state: "done",
      stage: "完成",
      percent: 100,
      remoteProjectId: result.remoteProjectId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Project sync failed";
    const current = manager.tasks.get(taskId);
    if (current) current.accessToken = undefined;
    update({
      state: "error",
      stage: "失败",
      percent: 100,
      error: message,
    });
  }
}

/**
 * 查询指定用户可访问的同步任务。
 *
 * @param taskId 任务 ID
 * @param userId 用户 ID
 * @returns 任务快照；无权限或不存在时返回 `null`
 * @author xiye
 * @date 2026-06-20
 */
export function getProjectSyncTaskForUser(taskId: string, userId: string): ProjectSyncTaskSnapshot | null {
  cleanupExpired();
  const task = getManager().tasks.get(taskId);
  if (!task) return null;
  if (task.ownerUserId !== userId) return null;
  return {
    taskId: task.taskId,
    kind: task.kind,
    projectId: task.projectId,
    state: task.state,
    stage: task.stage,
    percent: task.percent,
    remoteProjectId: task.remoteProjectId,
    error: task.error,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

/**
 * 查询指定用户在某个项目上的当前活跃同步任务。
 *
 * 说明：
 * - 仅返回 `queued/running` 状态的任务；
 * - 用于页面刷新后恢复同步进度展示，不暴露其它用户任务；
 * - 若同一项目存在多个活跃任务，优先返回最近更新时间最大的任务。
 *
 * @param projectId 项目 ID
 * @param userId 用户 ID
 * @returns 当前项目的活跃同步任务；没有时返回 `null`
 * @author xiye
 * @date 2026-06-20
 * @since 同步体验收尾
 */
export function getActiveProjectSyncTaskForUser(projectId: string, userId: string): ProjectSyncTaskSnapshot | null {
  cleanupExpired();
  const candidates = Array.from(getManager().tasks.values())
    .filter((task) => task.projectId === projectId && task.ownerUserId === userId && (task.state === "queued" || task.state === "running"))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const task = candidates[0];
  if (!task) return null;
  return {
    taskId: task.taskId,
    kind: task.kind,
    projectId: task.projectId,
    state: task.state,
    stage: task.stage,
    percent: task.percent,
    remoteProjectId: task.remoteProjectId,
    error: task.error,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

/**
 * 仅供测试使用：重置任务管理器。
 *
 * @author xiye
 * @date 2026-06-20
 */
export function resetProjectSyncTaskManagerForTests() {
  getManager().tasks.clear();
}
