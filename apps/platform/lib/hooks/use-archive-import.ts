/**
 * 配置归档导入 WebSocket 管理 Hook
 *
 * 封装文件上传、导入任务的创建与 WebSocket 监听流程。
 *
 * @author xiye
 * @date 2026-06-25
 */

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useTaskWebSocket } from "./use-task-websocket";

const WS_CLIENT_ID_KEY = "envelope_task_ws_client_id";

export function useArchiveImport() {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [percent, setPercent] = useState<number | null>(null);
  const [resultProjectId, setResultProjectId] = useState<string | null>(null);

  const taskIdRef = useRef<string | null>(null);
  const wsPortRef = useRef(0);
  const wsPathRef = useRef("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const webSocket = useTaskWebSocket({
    taskId: taskIdRef.current,
    wsPort: wsPortRef.current,
    wsPath: wsPathRef.current,
    clientIdStorageKey: WS_CLIENT_ID_KEY,
    active: isImporting,
    taskKind: "archive_import",
    onSnapshot(task) {
      const s = task.stage;
      const p = task.percent;
      if (typeof s === "string") setStage(s);
      if (typeof p === "number") setPercent(p);
      if (typeof task.resultProjectId === "string") setResultProjectId(task.resultProjectId);
    },
    onDone() {
      taskIdRef.current = null;
      setIsImporting(false);
    },
    onError(message) {
      setError(message);
      toast.error(message);
      taskIdRef.current = null;
      setIsImporting(false);
    },
  });

  const pickFile = useCallback(() => {
    if (isImporting) return;
    fileInputRef.current?.click();
  }, [isImporting]);

  const handleFileSelected = useCallback(async (file: File | null) => {
    if (!file || isImporting) return;
    setIsImporting(true);
    setError(null);
    setStage("上传中");
    setPercent(0);
    setResultProjectId(null);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("options", JSON.stringify({ mode: "create", conflictStrategy: "overwrite", danglingRefPolicy: "error" }));

      const res = await fetch(`/api/archive/import/tasks`, { method: "POST", body: form });
      if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const payload = (await res.json()) as { error?: { message?: string } };
          throw new Error(payload.error?.message || `Import failed: ${res.status}`);
        }
        throw new Error(`Import failed: ${res.status}`);
      }

      const payload = (await res.json()) as {
        taskId?: string; wsPort?: number; wsPath?: string;
      };
      if (!payload.taskId || typeof payload.wsPort !== "number" || typeof payload.wsPath !== "string") {
        throw new Error("Invalid archive import task response");
      }
      taskIdRef.current = payload.taskId;
      wsPortRef.current = payload.wsPort;
      wsPathRef.current = payload.wsPath;
      setStage("导入中");
      setPercent(1);
      webSocket.connect();
    } catch (e) {
      const message = e instanceof Error ? e.message : "导入失败";
      setError(message);
      toast.error(message);
      taskIdRef.current = null;
      setStage(null);
      setPercent(null);
      setIsImporting(false);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isImporting, webSocket]);

  return { isImporting, error, stage, percent, resultProjectId, fileInputRef, pickFile, handleFileSelected };
}
