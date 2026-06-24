/**
 * 配置归档导出 WebSocket 管理 Hook
 *
 * 封装归档导出任务的创建、WebSocket 监听与下载流程。
 *
 * @author xiye
 * @date 2026-06-25
 */

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useTaskWebSocket } from "./use-task-websocket";
import type { ArchiveExportOptions } from "@/lib/archive/archive-types";

const WS_CLIENT_ID_KEY = "envelope_task_ws_client_id";

function getFileNameFromDisposition(value: string | null | undefined): string | null {
  if (!value) return null;
  const utf8Match = value.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    try { return decodeURIComponent(utf8Match[1]); } catch { return utf8Match[1]; }
  }
  const match = value.match(/filename\s*=\s*"([^"]+)"/i) ?? value.match(/filename\s*=\s*([^;]+)/i);
  return match?.[1]?.trim() ?? null;
}

async function downloadFile(downloadUrl: string, fallbackName: string) {
  const res = await fetch(downloadUrl, { method: "GET" });
  if (!res.ok) {
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const payload = (await res.json()) as { error?: { message?: string } };
      throw new Error(payload.error?.message || `Download failed: ${res.status}`);
    }
    throw new Error(`Download failed: ${res.status}`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = getFileNameFromDisposition(res.headers.get("content-disposition")) ?? fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

interface UseArchiveExportOptions {
  projectId: string | null;
  dirty: boolean;
  flushAutosave: () => Promise<unknown>;
}

export function useArchiveExport({ projectId, dirty, flushAutosave }: UseArchiveExportOptions) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [percent, setPercent] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const taskIdRef = useRef<string | null>(null);
  const downloadUrlRef = useRef<string | null>(null);
  const wsPortRef = useRef(0);
  const wsPathRef = useRef("");

  const webSocket = useTaskWebSocket({
    taskId: taskIdRef.current,
    wsPort: wsPortRef.current,
    wsPath: wsPathRef.current,
    clientIdStorageKey: WS_CLIENT_ID_KEY,
    active: isExporting,
    taskKind: "archive_export",
    onSnapshot(task) {
      const s = task.stage;
      const p = task.percent;
      if (typeof s === "string") setStage(s);
      if (typeof p === "number") setPercent(p);
    },
    onDone() {
      const url = downloadUrlRef.current;
      taskIdRef.current = null;
      downloadUrlRef.current = null;

      if (url && projectId) {
        downloadFile(url, `project-${projectId.slice(0, 8)}-archive.zip`).catch((e) => {
          const message = e instanceof Error ? e.message : "导出失败";
          setError(message);
          toast.error(message);
        });
      }
      setIsExporting(false);
    },
    onError(message) {
      setError(message);
      toast.error(message);
      taskIdRef.current = null;
      downloadUrlRef.current = null;
      setIsExporting(false);
    },
  });

  const startExport = useCallback(async (options?: ArchiveExportOptions) => {
    if (!projectId || isExporting) return;
    setIsExporting(true);
    setError(null);
    setStage("准备导出配置包");
    setPercent(0);

    try {
      if (dirty) {
        setStage("保存中");
        await flushAutosave();
      }
      setStage("启动任务");
      const res = await fetch(`/api/projects/${projectId}/archive/tasks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(options ?? { redactSecrets: true }),
      });
      if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const payload = (await res.json()) as { error?: { message?: string } };
          throw new Error(payload.error?.message || `Export failed: ${res.status}`);
        }
        throw new Error(`Export failed: ${res.status}`);
      }
      const payload = (await res.json()) as {
        taskId?: string; wsPort?: number; wsPath?: string; downloadUrl?: string;
      };
      if (!payload.taskId || typeof payload.wsPort !== "number" || typeof payload.wsPath !== "string" || !payload.downloadUrl) {
        throw new Error("Invalid archive export task response");
      }
      taskIdRef.current = payload.taskId;
      downloadUrlRef.current = payload.downloadUrl;
      wsPortRef.current = payload.wsPort;
      wsPathRef.current = payload.wsPath;
      setStage("导出中");
      setPercent(1);
      webSocket.connect();
    } catch (e) {
      const message = e instanceof Error ? e.message : "导出失败";
      setError(message);
      toast.error(message);
      taskIdRef.current = null;
      downloadUrlRef.current = null;
      setStage(null);
      setPercent(null);
      setIsExporting(false);
    }
  }, [projectId, isExporting, dirty, flushAutosave, webSocket]);

  return { isExporting, error, stage, percent, dialogOpen, setDialogOpen, startExport };
}
