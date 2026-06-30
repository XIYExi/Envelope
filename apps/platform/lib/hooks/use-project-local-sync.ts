"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  buildProjectSyncCompareViewModel,
  buildProjectSyncViewModel,
  confirmProjectSyncBaseline,
  fetchProjectSyncCompare,
  fetchProjectLocalSyncStatus,
  fetchProjectSyncTask,
  isProjectSyncUnsupportedError,
  startProjectSyncTask,
  type ProjectSyncAction,
  type ProjectSyncCompareResponseDTO,
  type ProjectLocalSyncStatusDTO,
  type ProjectSyncTaskSnapshotDTO,
  type StartProjectSyncResponse,
} from "@/lib/sync/project-sync-client";

const TASK_WS_CLIENT_ID_STORAGE_KEY = "envelope_task_ws_client_id";
const TASK_POLL_INTERVAL_MS = 1500;
const TASK_CLEAR_DELAY_MS = 2000;

type UseProjectLocalSyncOptions = {
  enabled?: boolean;
  onBeforeSync?: (action: ProjectSyncAction) => Promise<void> | void;
  successMessage?: string;
  pushSuccessMessage?: string;
  pullSuccessMessage?: string;
};

type ActiveTrackerRef = {
  taskId: string | null;
  statusUrl: string | null;
  finished: boolean;
  clearTimer: number | null;
  pollTimer: number | null;
  ws: WebSocket | null;
};

function createInitialTaskSnapshot(
  projectId: string,
  taskId: string,
  action: ProjectSyncAction = "push",
): ProjectSyncTaskSnapshotDTO {
  const now = Date.now();
  return {
    taskId,
    kind: action === "pull" ? "project_sync_pull" : "project_sync_push",
    projectId,
    state: "queued",
    stage: "任务已创建",
    percent: 0,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 前端项目 local 同步 hook。
 *
 * 能力：
 * - 查询项目当前同步状态；
 * - 一键启动同步任务；
 * - 优先消费 WS 推送，同时保留轮询兜底；
 * - 在完成或失败时统一触发 toast，并刷新状态缓存。
 */
export function useProjectLocalSync(projectId: string | null, options: UseProjectLocalSyncOptions = {}) {
  const {
    enabled = true,
    onBeforeSync,
    successMessage,
    pushSuccessMessage,
    pullSuccessMessage,
  } = options;
  const queryClient = useQueryClient();
  const trackerRef = useRef<ActiveTrackerRef>({
    taskId: null,
    statusUrl: null,
    finished: false,
    clearTimer: null,
    pollTimer: null,
    ws: null,
  });
  const [activeTask, setActiveTask] = useState<ProjectSyncTaskSnapshotDTO | null>(null);

  const clearTimers = useCallback(() => {
    if (trackerRef.current.pollTimer) {
      window.clearTimeout(trackerRef.current.pollTimer);
      trackerRef.current.pollTimer = null;
    }
    if (trackerRef.current.clearTimer) {
      window.clearTimeout(trackerRef.current.clearTimer);
      trackerRef.current.clearTimer = null;
    }
  }, []);

  const closeSocket = useCallback(() => {
    if (!trackerRef.current.ws) return;
    try {
      trackerRef.current.ws.close();
    } catch {
    }
    trackerRef.current.ws = null;
  }, []);

  const resetTracking = useCallback(() => {
    clearTimers();
    closeSocket();
    trackerRef.current.taskId = null;
    trackerRef.current.statusUrl = null;
    trackerRef.current.finished = false;
  }, [clearTimers, closeSocket]);

  const statusQuery = useQuery<ProjectLocalSyncStatusDTO, Error>({
    queryKey: ["project-local-sync-status", projectId],
    enabled: Boolean(projectId) && enabled,
    queryFn: () => fetchProjectLocalSyncStatus(projectId as string),
    retry: false,
    refetchInterval: (query) => (query.state.data?.state === "running" ? 3000 : false),
  });

  const unsupported = isProjectSyncUnsupportedError(statusQuery.error);
  const remoteProjectId = statusQuery.data?.remoteProjectId ?? null;
  const hasRunningTask = activeTask?.state === "queued" || activeTask?.state === "running";

  const compareQuery = useQuery<ProjectSyncCompareResponseDTO, Error>({
    queryKey: ["project-local-sync-compare", projectId, remoteProjectId],
    enabled: Boolean(projectId) && enabled && !unsupported && Boolean(remoteProjectId) && !hasRunningTask,
    queryFn: () => fetchProjectSyncCompare(projectId as string, { remoteProjectId: remoteProjectId ?? undefined }),
    retry: false,
    staleTime: 15_000,
  });

  const finalizeTask = useCallback((task: ProjectSyncTaskSnapshotDTO) => {
    trackerRef.current.finished = true;
    closeSocket();
    if (task.state === "done") {
      const nextSuccessMessage = task.kind === "project_sync_pull"
        ? (pullSuccessMessage ?? "项目已拉取到本地")
        : (pushSuccessMessage ?? successMessage ?? "项目已推送到远端");
      toast.success(nextSuccessMessage);
    } else if (task.state === "error") {
      toast.error(task.error || "项目同步失败");
    }
    void queryClient.invalidateQueries({ queryKey: ["project-local-sync-status", projectId] });
    void queryClient.invalidateQueries({ queryKey: ["project-local-sync-compare", projectId] });
    clearTimers();
    trackerRef.current.clearTimer = window.setTimeout(() => {
      setActiveTask((current) => (current?.taskId === task.taskId ? null : current));
      resetTracking();
    }, TASK_CLEAR_DELAY_MS);
  }, [
    clearTimers,
    closeSocket,
    projectId,
    pullSuccessMessage,
    pushSuccessMessage,
    queryClient,
    resetTracking,
    successMessage,
  ]);

  const applyTaskSnapshot = useCallback((task: ProjectSyncTaskSnapshotDTO) => {
    if (trackerRef.current.taskId && trackerRef.current.taskId !== task.taskId) return;
    trackerRef.current.taskId = task.taskId;
    setActiveTask(task);
    if (task.state === "done" || task.state === "error") {
      finalizeTask(task);
    } else {
      void queryClient.invalidateQueries({ queryKey: ["project-local-sync-status", projectId] });
    }
  }, [finalizeTask, projectId, queryClient]);

  const schedulePoll = useCallback((statusUrl: string, taskId: string, delayMs = TASK_POLL_INTERVAL_MS) => {
    clearTimers();
    trackerRef.current.pollTimer = window.setTimeout(async () => {
      if (trackerRef.current.finished || trackerRef.current.taskId !== taskId) return;
      try {
        const task = await fetchProjectSyncTask(statusUrl);
        applyTaskSnapshot(task);
        if (task.state !== "done" && task.state !== "error") {
          schedulePoll(statusUrl, taskId);
        }
      } catch {
        // 轮询属于兜底机制，读取失败时继续下一轮，避免 WS 抖动导致状态丢失。
        if (!trackerRef.current.finished && trackerRef.current.taskId === taskId) {
          schedulePoll(statusUrl, taskId, TASK_POLL_INTERVAL_MS * 2);
        }
      }
    }, delayMs);
  }, [applyTaskSnapshot, clearTimers]);

  const connectTaskWs = useCallback((input: StartProjectSyncResponse) => {
    if (typeof window === "undefined") return;
    if (typeof input.wsPort !== "number" || typeof input.wsPath !== "string") return;

    closeSocket();

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const ws = new WebSocket(`${protocol}://${host}:${input.wsPort}${input.wsPath}`);
    trackerRef.current.ws = ws;

    ws.onopen = () => {
      const existingClientId = window.localStorage.getItem(TASK_WS_CLIENT_ID_STORAGE_KEY);
      ws.send(JSON.stringify({ type: "register", ...(existingClientId ? { clientId: existingClientId } : {}) }));
      ws.send(JSON.stringify({ type: "subscribe", taskId: input.taskId }));
    };

    ws.onmessage = (event) => {
      let message: unknown;
      try {
        message = JSON.parse(String(event.data));
      } catch {
        return;
      }
      if (!message || typeof message !== "object") return;
      const record = message as Record<string, unknown>;
      if (record.type === "registered" && typeof record.clientId === "string") {
        window.localStorage.setItem(TASK_WS_CLIENT_ID_STORAGE_KEY, record.clientId);
        return;
      }
      if (record.type !== "snapshot") return;
      const payload = record.payload as Record<string, unknown> | undefined;
      const task = (payload?.task ?? payload) as ProjectSyncTaskSnapshotDTO | undefined;
      if (!task || (task.kind !== "project_sync_push" && task.kind !== "project_sync_pull")) return;
      applyTaskSnapshot(task);
    };

    ws.onerror = () => {
      try {
        ws.close();
      } catch {
      }
    };
  }, [applyTaskSnapshot, closeSocket]);

  const startTracking = useCallback((input: StartProjectSyncResponse) => {
    if (!projectId) return;
    resetTracking();
    trackerRef.current.taskId = input.taskId;
    trackerRef.current.statusUrl = input.statusUrl;
    trackerRef.current.finished = false;
    setActiveTask(createInitialTaskSnapshot(projectId, input.taskId, input.action));
    connectTaskWs(input);
    schedulePoll(input.statusUrl, input.taskId, 200);
  }, [connectTaskWs, projectId, resetTracking, schedulePoll]);

  /**
   * 根据状态接口返回的活跃任务恢复跟踪。
   *
   * 核心链路：
   * - 页面刷新后先读取 `/api/projects/[id]/sync`；
   * - 若存在活跃任务，则直接基于 taskId 恢复轮询；
   * - 这样即使丢失了首次创建任务时的前端上下文，也能继续展示精细进度。
   */
  const resumeTracking = useCallback((task: ProjectSyncTaskSnapshotDTO) => {
    if (!projectId) return;
    if (trackerRef.current.taskId === task.taskId && !trackerRef.current.finished) return;
    resetTracking();
    trackerRef.current.taskId = task.taskId;
    trackerRef.current.statusUrl = `/api/sync/tasks/${task.taskId}`;
    trackerRef.current.finished = false;
    setActiveTask(task);
    schedulePoll(`/api/sync/tasks/${task.taskId}`, task.taskId, 200);
  }, [projectId, resetTracking, schedulePoll]);

  const syncMutation = useMutation({
    mutationFn: async (input: { action: ProjectSyncAction; force?: boolean }) => {
      if (!projectId) {
        throw new Error("缺少项目 ID");
      }
      await onBeforeSync?.(input.action);
      return startProjectSyncTask(projectId, { action: input.action, force: input.force });
    },
    onSuccess: (payload) => {
      startTracking(payload);
    },
    onError: (error, input) => {
      const fallback = input.action === "pull" ? "启动拉取任务失败" : "启动推送任务失败";
      toast.error(error.message || fallback);
    },
  });

  const baselineMutation = useMutation({
    mutationFn: async () => {
      if (!projectId) {
        throw new Error("缺少项目 ID");
      }
      return confirmProjectSyncBaseline(projectId, {
        remoteProjectId: remoteProjectId ?? undefined,
      });
    },
    onSuccess: () => {
      toast.success("已将当前快照确认为同步基线");
      void queryClient.invalidateQueries({ queryKey: ["project-local-sync-status", projectId] });
      void queryClient.invalidateQueries({ queryKey: ["project-local-sync-compare", projectId] });
    },
    onError: (error) => {
      toast.error(error.message || "确认同步基线失败");
    },
  });

  useEffect(() => {
    return () => {
      resetTracking();
    };
  }, [resetTracking]);

  useEffect(() => {
    const activeServerTask = statusQuery.data?.activeTask;
    if (!activeServerTask) return;
    if (activeServerTask.state === "done" || activeServerTask.state === "error") return;
    if (activeTask?.taskId === activeServerTask.taskId) return;
    resumeTracking(activeServerTask);
  }, [activeTask?.taskId, resumeTracking, statusQuery.data?.activeTask]);

  const summary = useMemo(() => buildProjectSyncViewModel({
    status: unsupported ? null : statusQuery.data,
    task: activeTask,
    unsupported,
    error: unsupported ? null : statusQuery.error,
  }), [activeTask, statusQuery.data, statusQuery.error, unsupported]);

  const compareSummary = useMemo(() => buildProjectSyncCompareViewModel({
    status: unsupported ? null : statusQuery.data,
    compare: compareQuery.data?.compare ?? null,
    error: unsupported ? null : compareQuery.error,
  }), [compareQuery.data?.compare, compareQuery.error, statusQuery.data, unsupported]);

  return {
    status: unsupported ? null : statusQuery.data ?? null,
    task: activeTask,
    compareResult: compareQuery.data ?? null,
    compare: compareQuery.data?.compare ?? null,
    summary,
    compareSummary,
    unsupported,
    supported: Boolean(projectId) && !unsupported,
    isLoadingStatus: statusQuery.isLoading,
    isComparing: compareQuery.isLoading || compareQuery.isFetching,
    isSyncing: syncMutation.isPending || summary.isRunning,
    isResolvingBaseline: baselineMutation.isPending,
    canSync: Boolean(projectId) && !unsupported && !syncMutation.isPending && !baselineMutation.isPending && !summary.isRunning && compareSummary.canPush,
    canPush: Boolean(projectId) && !unsupported && !syncMutation.isPending && !baselineMutation.isPending && !summary.isRunning && compareSummary.canPush,
    canPull: Boolean(projectId) && !unsupported && !syncMutation.isPending && !baselineMutation.isPending && !summary.isRunning && compareSummary.canPull,
    push: async () => {
      await syncMutation.mutateAsync({ action: "push" });
    },
    pull: async () => {
      await syncMutation.mutateAsync({ action: "pull" });
    },
    sync: async () => {
      await syncMutation.mutateAsync({ action: "push" });
    },
    keepLocal: async () => {
      await syncMutation.mutateAsync({ action: "push", force: true });
    },
    keepRemote: async () => {
      await syncMutation.mutateAsync({ action: "pull", force: true });
    },
    setBaseline: async () => {
      await baselineMutation.mutateAsync();
    },
    refetchStatus: statusQuery.refetch,
    refetchCompare: compareQuery.refetch,
  };
}
