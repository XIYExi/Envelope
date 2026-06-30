import { randomUUID } from "crypto";
import { readFile, unlink, writeFile } from "fs/promises";
import * as os from "os";
import * as path from "path";
import { createAccessTokenSupabase } from "@/lib/supabase/access-token";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { ensureTaskWSServer, publishTaskSnapshot } from "@/lib/ws/task-ws-server";
import type { ArchiveExportOptions, ArchiveImportOptions } from "./archive-types";
import { generateProjectArchiveZip } from "./export-archive";
import { parseArchiveZip } from "./archive-zip";
import { importProjectArchive } from "./import-archive";

/**
 * 配置归档任务管理（ISC-20 配套）
 *
 * 说明：
 * - 导出/导入都走“后台任务”模型，避免单次 HTTP 长连接超时
 * - 进度通过 Task WS Server 推送，支持断线重连
 * - 导出生成的 ZIP 会写入临时目录，下载后可继续短期复用（expiresAt）
 */
export type ArchiveTaskState = "queued" | "running" | "done" | "error";

export type ArchiveExportTaskSnapshot = {
  taskId: string;
  kind: "archive_export";
  projectId: string;
  state: ArchiveTaskState;
  stage: string;
  percent: number;
  fileName?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};

export type ArchiveImportTaskSnapshot = {
  taskId: string;
  kind: "archive_import";
  state: ArchiveTaskState;
  stage: string;
  percent: number;
  resultProjectId?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};

type ArchiveExportTaskInternal = ArchiveExportTaskSnapshot & {
  ownerUserId: string;
  accessToken?: string;
  options?: ArchiveExportOptions;
  filePath?: string;
  expiresAt: number;
  lastBroadcastAt: number;
  lastBroadcastPercent: number;
};

type ArchiveImportTaskInternal = ArchiveImportTaskSnapshot & {
  ownerUserId: string;
  accessToken?: string;
  options: ArchiveImportOptions;
  uploadPath: string;
  expiresAt: number;
  lastBroadcastAt: number;
  lastBroadcastPercent: number;
};

type ArchiveTaskManager = {
  exports: Map<string, ArchiveExportTaskInternal>;
  imports: Map<string, ArchiveImportTaskInternal>;
};

declare global {
  var __envelopeArchiveTaskManager: ArchiveTaskManager | undefined;
}

function getManager(): ArchiveTaskManager {
  const existing = globalThis.__envelopeArchiveTaskManager;
  if (existing) return existing;
  const manager: ArchiveTaskManager = {
    exports: new Map(),
    imports: new Map(),
  };
  globalThis.__envelopeArchiveTaskManager = manager;
  return manager;
}

function cleanupExpired() {
  const now = Date.now();
  const manager = getManager();
  for (const [taskId, task] of manager.exports) {
    if (task.expiresAt > now) continue;
    manager.exports.delete(taskId);
    if (task.filePath) void unlink(task.filePath).catch(() => {});
  }
  for (const [taskId, task] of manager.imports) {
    if (task.expiresAt > now) continue;
    manager.imports.delete(taskId);
    void unlink(task.uploadPath).catch(() => {});
  }
}

function broadcastExport(taskId: string) {
  const manager = getManager();
  const task = manager.exports.get(taskId);
  if (!task) return;

  const now = Date.now();
  if (now - task.lastBroadcastAt < 200 && task.percent === task.lastBroadcastPercent && task.state === "running") return;
  task.lastBroadcastAt = now;
  task.lastBroadcastPercent = task.percent;

  publishTaskSnapshot(taskId, { kind: task.kind, task });
}

function broadcastImport(taskId: string) {
  const manager = getManager();
  const task = manager.imports.get(taskId);
  if (!task) return;

  const now = Date.now();
  if (now - task.lastBroadcastAt < 200 && task.percent === task.lastBroadcastPercent && task.state === "running") return;
  task.lastBroadcastAt = now;
  task.lastBroadcastPercent = task.percent;

  publishTaskSnapshot(taskId, { kind: task.kind, task });
}

export function createArchiveExportTask(input: {
  projectId: string;
  ownerUserId: string;
  accessToken?: string;
  options?: ArchiveExportOptions;
}): { taskId: string; wsPort: number; wsPath: string } {
  cleanupExpired();
  const { wsPort, wsPath } = ensureTaskWSServer();

  const now = Date.now();
  const taskId = randomUUID();
  const task: ArchiveExportTaskInternal = {
    taskId,
    kind: "archive_export",
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    accessToken: input.accessToken,
    options: input.options,
    state: "queued",
    stage: "排队中",
    percent: 0,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + 30 * 60 * 1000,
    lastBroadcastAt: 0,
    lastBroadcastPercent: -1,
  };
  getManager().exports.set(taskId, task);
  broadcastExport(taskId);
  void runArchiveExportTask(taskId);
  return { taskId, wsPort, wsPath };
}

async function runArchiveExportTask(taskId: string) {
  const manager = getManager();
  const task = manager.exports.get(taskId);
  if (!task) return;

  const update = (patch: Partial<Pick<ArchiveExportTaskInternal, "state" | "stage" | "percent" | "fileName" | "error" | "filePath">>) => {
    const current = manager.exports.get(taskId);
    if (!current) return;
    Object.assign(current, patch, { updatedAt: Date.now() });
    broadcastExport(taskId);
  };

  try {
    update({ state: "running", stage: "初始化", percent: 0 });
    const supabase = task.accessToken ? createAccessTokenSupabase(task.accessToken) : null;
    const { bytes, fileName } = await generateProjectArchiveZip(supabase, task.projectId, task.options, (stage, percent) => {
      update({ stage, percent });
    });

    update({ stage: "写入文件", percent: 98 });
    const filePath = path.join(os.tmpdir(), `envelope-archive-export-${taskId}.zip`);
    await writeFile(filePath, bytes);
    const current = manager.exports.get(taskId);
    if (current) current.accessToken = undefined;
    update({ state: "done", stage: "完成", percent: 100, fileName, filePath });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Archive export failed";
    const current = manager.exports.get(taskId);
    if (current) current.accessToken = undefined;
    update({ state: "error", stage: "失败", percent: 100, error: message });
  }
}

export function getArchiveExportTaskForUser(taskId: string, userId: string): ArchiveExportTaskSnapshot | null {
  cleanupExpired();
  const task = getManager().exports.get(taskId);
  if (!task) return null;
  if (task.ownerUserId !== userId) return null;
  return {
    taskId: task.taskId,
    kind: task.kind,
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

export async function getArchiveExportZipForUser(
  taskId: string,
  userId: string,
): Promise<{ fileName: string; bytes: Uint8Array } | null> {
  cleanupExpired();
  const task = getManager().exports.get(taskId);
  if (!task || task.ownerUserId !== userId) return null;
  if (!task || task.state !== "done" || !task.fileName || !task.filePath) return null;
  const bytes = await readFile(task.filePath);
  task.expiresAt = Date.now() + 10 * 60 * 1000;
  return { fileName: task.fileName, bytes };
}

export async function createArchiveImportTask(input: {
  ownerUserId: string;
  accessToken?: string;
  uploadBytes: Uint8Array;
  options: ArchiveImportOptions;
}): Promise<{ taskId: string; wsPort: number; wsPath: string }> {
  cleanupExpired();
  const { wsPort, wsPath } = ensureTaskWSServer();

  const now = Date.now();
  const taskId = randomUUID();
  const uploadPath = path.join(os.tmpdir(), `envelope-archive-import-${taskId}.zip`);
  await writeFile(uploadPath, input.uploadBytes);

  const task: ArchiveImportTaskInternal = {
    taskId,
    kind: "archive_import",
    ownerUserId: input.ownerUserId,
    accessToken: input.accessToken,
    options: input.options,
    uploadPath,
    state: "queued",
    stage: "排队中",
    percent: 0,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + 30 * 60 * 1000,
    lastBroadcastAt: 0,
    lastBroadcastPercent: -1,
  };
  getManager().imports.set(taskId, task);
  broadcastImport(taskId);
  void runArchiveImportTask(taskId);
  return { taskId, wsPort, wsPath };
}

async function runArchiveImportTask(taskId: string) {
  const manager = getManager();
  const task = manager.imports.get(taskId);
  if (!task) return;

  const update = (patch: Partial<Pick<ArchiveImportTaskInternal, "state" | "stage" | "percent" | "error" | "resultProjectId">>) => {
    const current = manager.imports.get(taskId);
    if (!current) return;
    Object.assign(current, patch, { updatedAt: Date.now() });
    broadcastImport(taskId);
  };

  try {
    update({ state: "running", stage: "读取文件", percent: 5 });
    const backendConfig = getPlatformBackendConfig();
    if (backendConfig.mode === "supabase" && !task.accessToken) {
      throw new Error("Archive import requires access token in Supabase mode");
    }

    const supabase = task.accessToken ? createAccessTokenSupabase(task.accessToken) : null;
    const bytes = await readFile(task.uploadPath);
    const archive = parseArchiveZip(new Uint8Array(bytes));

    update({ stage: "写入数据库", percent: 20 });
    const result = await importProjectArchive(
      archive,
      task.options,
      {
        ownerUserId: task.ownerUserId,
        supabase,
      },
      (stage, percent) => {
        const mapped = 20 + Math.round(percent * 0.8);
        update({ stage, percent: Math.min(100, Math.max(20, mapped)) });
      },
    );

    const current = manager.imports.get(taskId);
    if (current) current.accessToken = undefined;
    update({ state: "done", stage: "完成", percent: 100, resultProjectId: result.projectId });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Archive import failed";
    const current = manager.imports.get(taskId);
    if (current) current.accessToken = undefined;
    update({ state: "error", stage: "失败", percent: 100, error: message });
  }
}

export function getArchiveImportTaskForUser(taskId: string, userId: string): ArchiveImportTaskSnapshot | null {
  cleanupExpired();
  const task = getManager().imports.get(taskId);
  if (!task) return null;
  if (task.ownerUserId !== userId) return null;
  return {
    taskId: task.taskId,
    kind: task.kind,
    state: task.state,
    stage: task.stage,
    percent: task.percent,
    resultProjectId: task.resultProjectId,
    error: task.error,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
