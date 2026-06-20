import { randomUUID } from "crypto";
import { writeFile, readFile, unlink } from "fs/promises";
import * as os from "os";
import * as path from "path";
import { createAccessTokenSupabase } from "@/lib/supabase/access-token";
import { generateProjectZip, type ExportProgressCallback } from "@/lib/export/generate-export";
import { ensureTaskWSServer, publishTaskSnapshot } from "@/lib/ws/task-ws-server";

export type ExportTaskState = "queued" | "running" | "done" | "error";

export type ExportTaskSnapshot = {
  taskId: string;
  projectId: string;
  state: ExportTaskState;
  stage: string;
  percent: number;
  fileName?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};

type ExportTaskInternal = ExportTaskSnapshot & {
  ownerUserId: string;
  accessToken?: string;
  filePath?: string;
  expiresAt: number;
  lastBroadcastAt: number;
  lastBroadcastPercent: number;
};

type ExportTaskManager = {
  tasks: Map<string, ExportTaskInternal>;
};

declare global {
  var __envelopeExportTaskManager: ExportTaskManager | undefined;
}

function getManager(): ExportTaskManager {
  const existing = globalThis.__envelopeExportTaskManager;
  if (existing) return existing;

  const manager: ExportTaskManager = {
    tasks: new Map(),
  };
  globalThis.__envelopeExportTaskManager = manager;
  return manager;
}

function broadcastSnapshot(taskId: string) {
  const manager = getManager();
  const task = manager.tasks.get(taskId);
  if (!task) return;

  const now = Date.now();
  if (now - task.lastBroadcastAt < 200 && task.percent === task.lastBroadcastPercent && task.state === "running") return;
  task.lastBroadcastAt = now;
  task.lastBroadcastPercent = task.percent;

  publishTaskSnapshot(taskId, {
    task: {
      taskId: task.taskId,
      projectId: task.projectId,
      state: task.state,
      stage: task.stage,
      percent: task.percent,
      fileName: task.fileName,
      error: task.error,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    } satisfies ExportTaskSnapshot,
  });
}

function cleanupExpiredTasks() {
  const manager = getManager();
  const now = Date.now();
  for (const [taskId, task] of manager.tasks) {
    if (task.expiresAt > now) continue;
    manager.tasks.delete(taskId);
    if (task.filePath) {
      void unlink(task.filePath).catch(() => {});
    }
  }
}

export function createExportTask(input: {
  projectId: string;
  ownerUserId: string;
  accessToken: string;
}): { taskId: string; wsPort: number; wsPath: string } {
  cleanupExpiredTasks();
  const { wsPort, wsPath } = ensureTaskWSServer();
  const manager = getManager();

  const now = Date.now();
  const taskId = randomUUID();
  const task: ExportTaskInternal = {
    taskId,
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    accessToken: input.accessToken,
    state: "queued",
    stage: "排队中",
    percent: 0,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + 30 * 60 * 1000,
    lastBroadcastAt: 0,
    lastBroadcastPercent: -1,
  };
  manager.tasks.set(taskId, task);
  broadcastSnapshot(taskId);

  void runTask(taskId);

  return { taskId, wsPort, wsPath };
}

async function runTask(taskId: string) {
  const manager = getManager();
  const task = manager.tasks.get(taskId);
  if (!task || !task.accessToken) return;

  const update = (patch: Partial<Pick<ExportTaskInternal, "state" | "stage" | "percent" | "fileName" | "error" | "filePath">>) => {
    const current = manager.tasks.get(taskId);
    if (!current) return;
    Object.assign(current, patch, { updatedAt: Date.now() });
    broadcastSnapshot(taskId);
  };

  try {
    update({ state: "running", stage: "初始化", percent: 0 });
    const supabase = createAccessTokenSupabase(task.accessToken);

    const onProgress: ExportProgressCallback = (stage, percent) => {
      update({ stage, percent });
    };

    const { zipped, fileName } = await generateProjectZip(supabase, task.projectId, onProgress);

    update({ stage: "写入文件", percent: 98 });
    const filePath = path.join(os.tmpdir(), `envelope-export-${taskId}.zip`);
    await writeFile(filePath, zipped);

    const current = manager.tasks.get(taskId);
    if (current) current.accessToken = undefined;
    update({ state: "done", stage: "完成", percent: 100, filePath, fileName });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Export failed";
    const current = manager.tasks.get(taskId);
    if (current) current.accessToken = undefined;
    update({ state: "error", stage: "失败", percent: 100, error: message });
  }
}

export function getExportTaskForUser(taskId: string, userId: string): ExportTaskSnapshot | null {
  cleanupExpiredTasks();
  const manager = getManager();
  const task = manager.tasks.get(taskId);
  if (!task) return null;
  if (task.ownerUserId !== userId) return null;
  return {
    taskId: task.taskId,
    projectId: task.projectId,
    state: task.state,
    stage: task.stage,
    percent: task.percent,
    fileName: task.fileName,
    error: task.error,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

export async function getExportTaskZipForUser(
  taskId: string,
  userId: string,
): Promise<{ fileName: string; bytes: Uint8Array } | null> {
  cleanupExpiredTasks();
  const manager = getManager();
  const task = manager.tasks.get(taskId);
  if (!task || task.ownerUserId !== userId) return null;
  if (!task || task.state !== "done" || !task.filePath || !task.fileName) return null;
  const bytes = await readFile(task.filePath);
  task.expiresAt = Date.now() + 10 * 60 * 1000;
  return { fileName: task.fileName, bytes };
}
