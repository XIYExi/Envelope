"use client";

/**
 * 前端 local 同步客户端。
 *
 * 职责：
 * - 统一封装同步状态查询、启动任务与任务状态轮询的 HTTP 调用；
 * - 提供列表页与编辑器工具栏共用的展示文案，避免多处重复拼装；
 * - 将服务端 API 错误标准化为可直接展示的前端错误对象。
 *
 * @author xiye
 * @date 2026-06-20
 */

export type LocalSyncResourceKind =
  | "project"
  | "pages"
  | "routes"
  | "models"
  | "flows"
  | "endpoints"
  | "auth";

export type LocalSyncLifecycleState = "idle" | "dirty" | "running" | "synced" | "error";
export type ProjectSyncTaskState = "queued" | "running" | "done" | "error";
export type ProjectSyncTaskKind = "project_sync_push" | "project_sync_pull";
export type ProjectSyncAction = "push" | "pull";
export type ProjectSyncBadgeVariant = "default" | "secondary" | "destructive" | "outline";

export type ProjectLocalSyncStatusDTO = {
  projectId: string;
  backendMode: "local";
  state: LocalSyncLifecycleState;
  dirty: boolean;
  dirtyResources: LocalSyncResourceKind[];
  dirtyCounts: Partial<Record<LocalSyncResourceKind, number>>;
  dirtySince: string | null;
  lastSyncedAt: string | null;
  lastSyncStartedAt: string | null;
  lastSyncFinishedAt: string | null;
  lastSyncError: string | null;
  syncBaseSnapshot?: {
    summary?: {
      fingerprint?: string;
      totalResources?: number;
    };
  } | null;
  remoteProjectId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  /** 当前仍在执行中的同步任务快照；页面刷新后可据此恢复进度跟踪。 */
  activeTask?: ProjectSyncTaskSnapshotDTO | null;
};

export type ProjectSyncTaskSnapshotDTO = {
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

export type ProjectSyncSnapshotSummaryDTO = {
  fingerprint: string;
  totalResources: number;
  resourceCounts: Partial<Record<LocalSyncResourceKind, number>>;
};

export type ProjectSyncSnapshotChangeDTO = {
  resourceKind: LocalSyncResourceKind;
  resourceKey: string;
  change: "added" | "modified" | "deleted";
};

export type ProjectSyncConflictItemDTO = {
  resourceKind: LocalSyncResourceKind;
  resourceKey: string;
  localChange: "added" | "modified" | "deleted";
  remoteChange: "added" | "modified" | "deleted";
};

export type ProjectSyncCompareResultDTO = {
  baselineAvailable: boolean;
  baselineRequired: boolean;
  local: ProjectSyncSnapshotSummaryDTO;
  remote: ProjectSyncSnapshotSummaryDTO;
  baseline: ProjectSyncSnapshotSummaryDTO | null;
  localOnlyCount: number;
  remoteOnlyCount: number;
  conflictCount: number;
  hasConflicts: boolean;
  canPush: boolean;
  canPull: boolean;
  localOnlyChanges: ProjectSyncSnapshotChangeDTO[];
  remoteOnlyChanges: ProjectSyncSnapshotChangeDTO[];
  conflicts: ProjectSyncConflictItemDTO[];
};

export type ProjectSyncCompareResponseDTO = {
  projectId: string;
  remoteProjectId: string;
  status: ProjectLocalSyncStatusDTO;
  compare: ProjectSyncCompareResultDTO;
};

export type ConfirmProjectSyncBaselineResponseDTO = ProjectSyncCompareResponseDTO;

export type StartProjectSyncResponse = {
  action: ProjectSyncAction;
  taskId: string;
  wsPort?: number;
  wsPath?: string;
  statusUrl: string;
};

export type ProjectSyncClientError = Error & {
  status?: number;
  code?: string;
  details?: unknown;
};

export type ProjectSyncViewModel = {
  badgeLabel: string;
  badgeVariant: ProjectSyncBadgeVariant;
  detail: string | null;
  progress: number | null;
  isRunning: boolean;
};

export type ProjectSyncCompareViewModel = {
  badgeLabel: string;
  badgeVariant: ProjectSyncBadgeVariant;
  detail: string | null;
  localOnlyCount: number;
  remoteOnlyCount: number;
  conflictCount: number;
  canPush: boolean;
  canPull: boolean;
};

type ApiErrorEnvelope = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

const syncResourceLabels: Record<LocalSyncResourceKind, string> = {
  project: "项目",
  pages: "页面",
  routes: "路由",
  models: "数据模型",
  flows: "流程",
  endpoints: "接口",
  auth: "鉴权",
};

function createClientError(message: string, extras?: Partial<ProjectSyncClientError>): ProjectSyncClientError {
  return Object.assign(new Error(message), extras);
}

async function readApiError(res: Response, fallback: string): Promise<ProjectSyncClientError> {
  try {
    const payload = (await res.json()) as ApiErrorEnvelope;
    const message = payload.error?.message?.trim() || fallback;
    return createClientError(message, {
      status: res.status,
      code: payload.error?.code,
      details: payload.error?.details,
    });
  } catch {
    return createClientError(fallback, { status: res.status });
  }
}

/**
 * 判断同步接口是否因为“非 local 模式”而不可用。
 */
export function isProjectSyncUnsupportedError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const record = error as { status?: unknown; code?: unknown };
  return record.status === 409 && record.code === "SYNC.UNSUPPORTED_BACKEND";
}

/**
 * 查询项目 local 同步状态。
 */
export async function fetchProjectLocalSyncStatus(projectId: string): Promise<ProjectLocalSyncStatusDTO> {
  const res = await fetch(`/api/projects/${projectId}/sync`, { method: "GET" });
  if (!res.ok) {
    throw await readApiError(res, "获取同步状态失败");
  }
  const payload = (await res.json()) as { status: ProjectLocalSyncStatusDTO };
  return payload.status;
}

/**
 * 创建项目同步任务。
 */
export async function startProjectSyncTask(
  projectId: string,
  input: {
    action?: ProjectSyncAction;
    force?: boolean;
    remoteProjectId?: string;
  } = {},
): Promise<StartProjectSyncResponse> {
  const res = await fetch(`/api/projects/${projectId}/sync/tasks`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw await readApiError(res, "启动同步任务失败");
  }
  return (await res.json()) as StartProjectSyncResponse;
}

/**
 * 查询项目与远端之间的 compare 结果。
 */
export async function fetchProjectSyncCompare(
  projectId: string,
  input: {
    remoteProjectId?: string;
  } = {},
): Promise<ProjectSyncCompareResponseDTO> {
  const res = await fetch(`/api/projects/${projectId}/sync/compare`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw await readApiError(res, "获取同步比较结果失败");
  }
  return (await res.json()) as ProjectSyncCompareResponseDTO;
}

/**
 * 在本地与远端已一致时，确认当前快照为同步基线。
 */
export async function confirmProjectSyncBaseline(
  projectId: string,
  input: {
    remoteProjectId?: string;
  } = {},
): Promise<ConfirmProjectSyncBaselineResponseDTO> {
  const res = await fetch(`/api/projects/${projectId}/sync/baseline`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw await readApiError(res, "确认同步基线失败");
  }
  return (await res.json()) as ConfirmProjectSyncBaselineResponseDTO;
}

/**
 * 查询同步任务状态。
 */
export async function fetchProjectSyncTask(statusUrl: string): Promise<ProjectSyncTaskSnapshotDTO> {
  const res = await fetch(statusUrl, { method: "GET" });
  if (!res.ok) {
    throw await readApiError(res, "获取同步任务状态失败");
  }
  const payload = (await res.json()) as { task: ProjectSyncTaskSnapshotDTO };
  return payload.task;
}

function formatTimestamp(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function summarizeDirtyCounts(status: ProjectLocalSyncStatusDTO): string | null {
  const entries = Object.entries(status.dirtyCounts)
    .filter((entry): entry is [LocalSyncResourceKind, number] => typeof entry[1] === "number" && entry[1] > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([kind, count]) => `${syncResourceLabels[kind]} ${count} 项`);

  if (entries.length === 0) return null;
  return `待同步：${entries.join("、")}`;
}

function formatCompareMetrics(compare: ProjectSyncCompareResultDTO): string {
  return `冲突 ${compare.conflictCount} / 本地差异 ${compare.localOnlyCount} / 远端差异 ${compare.remoteOnlyCount}`;
}

export function getProjectSyncResourceLabel(kind: LocalSyncResourceKind): string {
  return syncResourceLabels[kind];
}

export function getProjectSyncChangeLabel(change: ProjectSyncSnapshotChangeDTO["change"]): string {
  switch (change) {
    case "added":
      return "新增";
    case "modified":
      return "修改";
    case "deleted":
      return "删除";
    default:
      return change;
  }
}

/**
 * 将服务端状态与任务快照折叠为统一的前端展示模型。
 */
export function buildProjectSyncViewModel(input: {
  status?: ProjectLocalSyncStatusDTO | null;
  task?: ProjectSyncTaskSnapshotDTO | null;
  unsupported?: boolean;
  error?: Error | null;
}): ProjectSyncViewModel {
  const { status, task, unsupported, error } = input;

  if (unsupported) {
    return {
      badgeLabel: "云端模式",
      badgeVariant: "outline",
      detail: "当前环境不需要 local 同步",
      progress: null,
      isRunning: false,
    };
  }

  if (task?.state === "queued" || task?.state === "running") {
    return {
      badgeLabel: "同步中",
      badgeVariant: "secondary",
      detail: `${task.stage}${typeof task.percent === "number" ? ` (${task.percent}%)` : ""}`,
      progress: typeof task.percent === "number" ? task.percent : null,
      isRunning: true,
    };
  }

  if (task?.state === "error") {
    return {
      badgeLabel: "同步失败",
      badgeVariant: "destructive",
      detail: task.error || task.stage || "同步任务失败",
      progress: typeof task.percent === "number" ? task.percent : null,
      isRunning: false,
    };
  }

  if (error && !status) {
    return {
      badgeLabel: "状态异常",
      badgeVariant: "destructive",
      detail: error.message,
      progress: null,
      isRunning: false,
    };
  }

  if (!status) {
    return {
      badgeLabel: "加载中",
      badgeVariant: "outline",
      detail: "正在查询本地同步状态",
      progress: null,
      isRunning: false,
    };
  }

  if (status.state === "running") {
    return {
      badgeLabel: "同步中",
      badgeVariant: "secondary",
      detail: "后台正在执行同步任务",
      progress: null,
      isRunning: true,
    };
  }

  if (status.state === "error") {
    return {
      badgeLabel: "同步失败",
      badgeVariant: "destructive",
      detail: status.lastSyncError || "最近一次同步执行失败",
      progress: null,
      isRunning: false,
    };
  }

  if (status.state === "dirty") {
    return {
      badgeLabel: "待同步",
      badgeVariant: "default",
      detail: summarizeDirtyCounts(status) || "存在未同步的本地改动",
      progress: null,
      isRunning: false,
    };
  }

  if (status.state === "synced") {
    const lastSyncedText = formatTimestamp(status.lastSyncedAt);
    return {
      badgeLabel: "已同步",
      badgeVariant: "outline",
      detail: lastSyncedText ? `上次同步：${lastSyncedText}` : "本地与远端已同步",
      progress: null,
      isRunning: false,
    };
  }

  return {
    badgeLabel: "未同步",
    badgeVariant: "outline",
    detail: "尚未执行首次同步",
    progress: null,
    isRunning: false,
  };
}

/**
 * 将 compare 结果整理为统一的摘要文案与按钮可用性。
 */
export function buildProjectSyncCompareViewModel(input: {
  status?: ProjectLocalSyncStatusDTO | null;
  compare?: ProjectSyncCompareResultDTO | null;
  error?: Error | null;
}): ProjectSyncCompareViewModel {
  const { status, compare, error } = input;

  if (error) {
    return {
      badgeLabel: "比较异常",
      badgeVariant: "destructive",
      detail: error.message,
      localOnlyCount: 0,
      remoteOnlyCount: 0,
      conflictCount: 0,
      canPush: false,
      canPull: false,
    };
  }

  if (!status?.remoteProjectId) {
    return {
      badgeLabel: "未建远端",
      badgeVariant: "outline",
      detail: "尚未关联远端项目，首次 Push 会创建远端快照并建立同步基线。",
      localOnlyCount: 0,
      remoteOnlyCount: 0,
      conflictCount: 0,
      canPush: true,
      canPull: false,
    };
  }

  if (!compare) {
    return {
      badgeLabel: "比较中",
      badgeVariant: "secondary",
      detail: "正在读取本地与远端快照差异。",
      localOnlyCount: 0,
      remoteOnlyCount: 0,
      conflictCount: 0,
      canPush: false,
      canPull: false,
    };
  }

  const metrics = formatCompareMetrics(compare);
  if (compare.baselineRequired) {
    return {
      badgeLabel: "缺少基线",
      badgeVariant: "destructive",
      detail: `${metrics}；缺少可用同步基线，暂不允许自动 Push / Pull。`,
      localOnlyCount: compare.localOnlyCount,
      remoteOnlyCount: compare.remoteOnlyCount,
      conflictCount: compare.conflictCount,
      canPush: compare.canPush,
      canPull: compare.canPull,
    };
  }

  if (compare.hasConflicts) {
    return {
      badgeLabel: "存在冲突",
      badgeVariant: "destructive",
      detail: `${metrics}；检测到同资源双端改动，需先人工处理冲突。`,
      localOnlyCount: compare.localOnlyCount,
      remoteOnlyCount: compare.remoteOnlyCount,
      conflictCount: compare.conflictCount,
      canPush: compare.canPush,
      canPull: compare.canPull,
    };
  }

  if (compare.localOnlyCount > 0 && compare.remoteOnlyCount > 0) {
    return {
      badgeLabel: "双端分叉",
      badgeVariant: "secondary",
      detail: `${metrics}；本地与远端都存在非冲突改动，v1 暂不自动合并。`,
      localOnlyCount: compare.localOnlyCount,
      remoteOnlyCount: compare.remoteOnlyCount,
      conflictCount: compare.conflictCount,
      canPush: compare.canPush,
      canPull: compare.canPull,
    };
  }

  if (compare.localOnlyCount > 0) {
    return {
      badgeLabel: "本地领先",
      badgeVariant: "default",
      detail: `${metrics}；可直接 Push 到远端。`,
      localOnlyCount: compare.localOnlyCount,
      remoteOnlyCount: compare.remoteOnlyCount,
      conflictCount: compare.conflictCount,
      canPush: compare.canPush,
      canPull: compare.canPull,
    };
  }

  if (compare.remoteOnlyCount > 0) {
    return {
      badgeLabel: "远端领先",
      badgeVariant: "secondary",
      detail: `${metrics}；可直接 Pull 到本地。`,
      localOnlyCount: compare.localOnlyCount,
      remoteOnlyCount: compare.remoteOnlyCount,
      conflictCount: compare.conflictCount,
      canPush: compare.canPush,
      canPull: compare.canPull,
    };
  }

  return {
    badgeLabel: "已对齐",
    badgeVariant: "outline",
    detail: `${metrics}；本地与远端快照一致。`,
    localOnlyCount: compare.localOnlyCount,
    remoteOnlyCount: compare.remoteOnlyCount,
    conflictCount: compare.conflictCount,
    canPush: compare.canPush,
    canPull: compare.canPull,
  };
}
