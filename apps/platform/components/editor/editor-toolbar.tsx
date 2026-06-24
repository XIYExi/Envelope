/**
 * 编辑器工具栏 — 面板切换、撤销/重做、视口切换、删除、组件计数
 *
 * 位于编辑器顶部，提供核心操作的快捷入口。
 * 视口切换通过编辑器 store 统一管理（由 editor-layout 同步到画布 store）。
 *
 * @author xiye
 * @date 2026-06-14
 * @since 3.0.0
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCanvasStore } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { useProjectPagesStore } from "@/stores/project-pages";
import { useProjectFlowsStore } from "@/stores/project-flows";
import { useProjectEndpointsStore } from "@/stores/project-endpoints";
import { useProjectLocalSync } from "@/lib/hooks/use-project-local-sync";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import type { ArchiveExportOptions } from "@/lib/archive/archive-types";
import { ConfigArchiveExportDialog } from "./config-archive-export-dialog";
import { ProjectSyncCompareDialog } from "@/components/project/project-sync-compare-dialog";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  Trash2,
  Save,
  Download,
  LoaderCircle,
  Upload,
  RefreshCw,
  Eye,
  Terminal,
  Lock,
  LockOpen,
  EyeOff,
  ChevronsUp,
  ChevronsDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { CanvasState } from "@envelope/engine";
import { PagePreviewDialog } from "./page-preview-dialog";
import { ApiTestPanel } from "@/components/runtime/api-test-panel";

/** 视口图标映射 */
const viewportIcons: Record<CanvasState["viewport"], React.ReactNode> = {
  desktop: <Monitor className="h-4 w-4" />,
  tablet: <Tablet className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  fluid: <Monitor className="h-4 w-4" />,
};

/** 视口显示名称 */
const viewportLabels: Record<CanvasState["viewport"], string> = {
  desktop: "Desktop (1440px)",
  tablet: "Tablet (768px)",
  mobile: "Mobile (375px)",
  fluid: "Fluid",
};

/** 可用视口列表 */
const viewports: CanvasState["viewport"][] = ["desktop", "tablet", "mobile", "fluid"];

/**
 * 编辑器工具栏
 *
 * - 左面板切换按钮
 * - 撤销/重做（由 canvas store 的 canUndo/canRedo 控制）
 * - 视口切换（通过 editor store 统一管理，避免双源写入）
 * - 组件计数
 * - 删除选中组件（无确认对话框，直接删除，可通过撤销恢复）
 * - 右面板切换按钮
 */
export function EditorToolbar() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const {
    viewport, setViewport, deleteSelected, selectedIds, components, canUndo, canRedo, undo, redo,
    toggleLock, toggleHidden, zIndexMove, alignSelected, distributeSelected,
    zoom, setZoom, zoomToFit, zoomToSelection,
  } = useCanvasStore();
  const {
    toggleLeftPanel,
    toggleRightPanel,
    leftPanelCollapsed,
    rightPanelCollapsed,
    setCanvasViewport,
    editorMode,
  } = useEditorStore();

  const { dirty, isSaving, error, flushAutosave, pages, currentPath, setCurrentPath } = useProjectPagesStore();
  const flowSaving = useProjectFlowsStore((state) => state.isSaving);
  const endpointSaving = useProjectEndpointsStore((state) => state.isSaving);

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportStage, setExportStage] = useState<string | null>(null);
  const [exportPercent, setExportPercent] = useState<number | null>(null);
  const exportWsRef = useRef<WebSocket | null>(null);
  const exportTaskIdRef = useRef<string | null>(null);
  const exportDownloadUrlRef = useRef<string | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const exportPingTimerRef = useRef<number | null>(null);

  const [isArchiveExporting, setIsArchiveExporting] = useState(false);
  const [archiveExportError, setArchiveExportError] = useState<string | null>(null);
  const [archiveExportStage, setArchiveExportStage] = useState<string | null>(null);
  const [archiveExportPercent, setArchiveExportPercent] = useState<number | null>(null);
  const [archiveExportDialogOpen, setArchiveExportDialogOpen] = useState(false);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const archiveExportWsRef = useRef<WebSocket | null>(null);
  const archiveExportTaskIdRef = useRef<string | null>(null);
  const archiveExportDownloadUrlRef = useRef<string | null>(null);
  const archiveExportReconnectRef = useRef(0);
  const archiveExportPingTimerRef = useRef<number | null>(null);

  const [isArchiveImporting, setIsArchiveImporting] = useState(false);
  const [archiveImportError, setArchiveImportError] = useState<string | null>(null);
  const [archiveImportStage, setArchiveImportStage] = useState<string | null>(null);
  const [archiveImportPercent, setArchiveImportPercent] = useState<number | null>(null);
  const [archiveImportResultProjectId, setArchiveImportResultProjectId] = useState<string | null>(null);
  const archiveImportWsRef = useRef<WebSocket | null>(null);
  const archiveImportTaskIdRef = useRef<string | null>(null);
  const archiveImportReconnectRef = useRef(0);
  const importFileInputRef = useRef<HTMLInputElement | null>(null);
  const archiveImportPingTimerRef = useRef<number | null>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [apiTestOpen, setApiTestOpen] = useState(false);

  const wsClientIdStorageKey = "envelope_task_ws_client_id";
  const sync = useProjectLocalSync(projectId, {
    successMessage: "项目已同步到远端",
    onBeforeSync: async () => {
      const pageStore = useProjectPagesStore.getState();
      if (!pageStore.dirty) return;

      await pageStore.flushAutosave();
      const latestPageState = useProjectPagesStore.getState();
      if (latestPageState.error || latestPageState.dirty) {
        throw new Error(latestPageState.error || "页面仍有未保存变更，请先保存后再同步");
      }
    },
  });
  const syncBusy = sync.isSyncing || sync.isResolvingBaseline || flowSaving || endpointSaving || isSaving;

  const getFileNameFromContentDisposition = (value: string | null | undefined) => {
    if (!value) return null;
    const utf8Match = value.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
      try {
        return decodeURIComponent(utf8Match[1]);
      } catch {
        return utf8Match[1];
      }
    }
    const match = value.match(/filename\s*=\s*"([^"]+)"/i) ?? value.match(/filename\s*=\s*([^;]+)/i);
    return match?.[1]?.trim() ?? null;
  };

  const downloadExport = async (downloadUrl: string, fallbackName: string) => {
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
    a.download = getFileNameFromContentDisposition(res.headers.get("content-disposition")) ?? fallbackName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  const connectExportWs = (wsPort: number, wsPath: string) => {
    const taskId = exportTaskIdRef.current;
    if (!taskId) return;

    if (exportWsRef.current) {
      try {
        exportWsRef.current.close();
      } catch {
      }
      exportWsRef.current = null;
    }
    if (exportPingTimerRef.current) {
      window.clearInterval(exportPingTimerRef.current);
      exportPingTimerRef.current = null;
    }

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const url = `${protocol}://${host}:${wsPort}${wsPath}`;

    const ws = new WebSocket(url);
    exportWsRef.current = ws;

    ws.onopen = () => {
      reconnectAttemptsRef.current = 0;
      const existingClientId = window.localStorage.getItem(wsClientIdStorageKey);
      ws.send(JSON.stringify({ type: "register", ...(existingClientId ? { clientId: existingClientId } : {}) }));
      ws.send(JSON.stringify({ type: "subscribe", taskId }));
      if (!exportPingTimerRef.current) {
        exportPingTimerRef.current = window.setInterval(() => {
          try {
            ws.send(JSON.stringify({ type: "ping" }));
          } catch {
          }
        }, 20_000);
      }
    };

    ws.onmessage = async (event) => {
      let msg: unknown;
      try {
        msg = JSON.parse(String(event.data));
      } catch {
        return;
      }
      if (!msg || typeof msg !== "object") return;
      const record = msg as Record<string, unknown>;
      if (record.type === "registered" && typeof record.clientId === "string") {
        window.localStorage.setItem(wsClientIdStorageKey, record.clientId);
        return;
      }
      if (record.type !== "snapshot") return;
      const payload = record.payload as Record<string, unknown> | undefined;
      const task = (payload?.task ?? payload) as Record<string, unknown> | undefined;
      if (!task) return;

      const state = task.state;
      const stage = task.stage;
      const percent = task.percent;
      if (typeof stage === "string") setExportStage(stage);
      if (typeof percent === "number") setExportPercent(percent);

      if (state === "done") {
        const downloadUrl = exportDownloadUrlRef.current;
        exportTaskIdRef.current = null;
        exportDownloadUrlRef.current = null;
        try {
          ws.close();
        } catch {
        }
        exportWsRef.current = null;
        if (exportPingTimerRef.current) {
          window.clearInterval(exportPingTimerRef.current);
          exportPingTimerRef.current = null;
        }

        if (downloadUrl && projectId) {
          try {
            await downloadExport(downloadUrl, `project-${projectId.slice(0, 8)}.zip`);
          } catch (e) {
            const message = e instanceof Error ? e.message : "导出失败";
            setExportError(message);
            toast.error(message);
          }
        }

        setIsExporting(false);
      }

      if (state === "error") {
        const err = task.error;
        const message = typeof err === "string" ? err : "导出失败";
        setExportError(message);
        toast.error(message);
        exportTaskIdRef.current = null;
        exportDownloadUrlRef.current = null;
        setIsExporting(false);
        try {
          ws.close();
        } catch {
        }
        exportWsRef.current = null;
        if (exportPingTimerRef.current) {
          window.clearInterval(exportPingTimerRef.current);
          exportPingTimerRef.current = null;
        }
      }
    };

    ws.onclose = () => {
      if (!exportTaskIdRef.current) return;
      if (!isExporting) return;
      const attempt = reconnectAttemptsRef.current + 1;
      reconnectAttemptsRef.current = attempt;
      const delay = Math.min(2000 * attempt, 10_000);
      setTimeout(() => connectExportWs(wsPort, wsPath), delay);
    };

    ws.onerror = () => {
      try {
        ws.close();
      } catch {
      }
    };
  };

  const connectArchiveExportWs = (wsPort: number, wsPath: string) => {
    const taskId = archiveExportTaskIdRef.current;
    if (!taskId) return;

    if (archiveExportWsRef.current) {
      try {
        archiveExportWsRef.current.close();
      } catch {
      }
      archiveExportWsRef.current = null;
    }
    if (archiveExportPingTimerRef.current) {
      window.clearInterval(archiveExportPingTimerRef.current);
      archiveExportPingTimerRef.current = null;
    }

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const url = `${protocol}://${host}:${wsPort}${wsPath}`;

    const ws = new WebSocket(url);
    archiveExportWsRef.current = ws;

    ws.onopen = () => {
      archiveExportReconnectRef.current = 0;
      const existingClientId = window.localStorage.getItem(wsClientIdStorageKey);
      ws.send(JSON.stringify({ type: "register", ...(existingClientId ? { clientId: existingClientId } : {}) }));
      ws.send(JSON.stringify({ type: "subscribe", taskId }));
      if (!archiveExportPingTimerRef.current) {
        archiveExportPingTimerRef.current = window.setInterval(() => {
          try {
            ws.send(JSON.stringify({ type: "ping" }));
          } catch {
          }
        }, 20_000);
      }
    };

    ws.onmessage = async (event) => {
      let msg: unknown;
      try {
        msg = JSON.parse(String(event.data));
      } catch {
        return;
      }
      if (!msg || typeof msg !== "object") return;
      const record = msg as Record<string, unknown>;
      if (record.type === "registered" && typeof record.clientId === "string") {
        window.localStorage.setItem(wsClientIdStorageKey, record.clientId);
        return;
      }
      if (record.type !== "snapshot") return;
      const payload = record.payload as Record<string, unknown> | undefined;
      const task = (payload?.task ?? payload) as Record<string, unknown> | undefined;
      if (!task || task.kind !== "archive_export") return;

      const state = task.state;
      const stage = task.stage;
      const percent = task.percent;
      if (typeof stage === "string") setArchiveExportStage(stage);
      if (typeof percent === "number") setArchiveExportPercent(percent);

      if (state === "done") {
        const downloadUrl = archiveExportDownloadUrlRef.current;
        archiveExportTaskIdRef.current = null;
        archiveExportDownloadUrlRef.current = null;
        try {
          ws.close();
        } catch {
        }
        archiveExportWsRef.current = null;
        if (archiveExportPingTimerRef.current) {
          window.clearInterval(archiveExportPingTimerRef.current);
          archiveExportPingTimerRef.current = null;
        }

        if (downloadUrl && projectId) {
          try {
            await downloadExport(downloadUrl, `project-${projectId.slice(0, 8)}-archive.zip`);
          } catch (e) {
            const message = e instanceof Error ? e.message : "导出失败";
            setArchiveExportError(message);
            toast.error(message);
          }
        }
        setIsArchiveExporting(false);
      }

      if (state === "error") {
        const err = task.error;
        const message = typeof err === "string" ? err : "导出失败";
        setArchiveExportError(message);
        toast.error(message);
        archiveExportTaskIdRef.current = null;
        archiveExportDownloadUrlRef.current = null;
        setIsArchiveExporting(false);
        try {
          ws.close();
        } catch {
        }
        archiveExportWsRef.current = null;
        if (archiveExportPingTimerRef.current) {
          window.clearInterval(archiveExportPingTimerRef.current);
          archiveExportPingTimerRef.current = null;
        }
      }
    };

    ws.onclose = () => {
      if (!archiveExportTaskIdRef.current) return;
      if (!isArchiveExporting) return;
      const attempt = archiveExportReconnectRef.current + 1;
      archiveExportReconnectRef.current = attempt;
      const delay = Math.min(2000 * attempt, 10_000);
      setTimeout(() => connectArchiveExportWs(wsPort, wsPath), delay);
    };

    ws.onerror = () => {
      try {
        ws.close();
      } catch {
      }
    };
  };

  const connectArchiveImportWs = (wsPort: number, wsPath: string) => {
    const taskId = archiveImportTaskIdRef.current;
    if (!taskId) return;

    if (archiveImportWsRef.current) {
      try {
        archiveImportWsRef.current.close();
      } catch {
      }
      archiveImportWsRef.current = null;
    }
    if (archiveImportPingTimerRef.current) {
      window.clearInterval(archiveImportPingTimerRef.current);
      archiveImportPingTimerRef.current = null;
    }

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const url = `${protocol}://${host}:${wsPort}${wsPath}`;

    const ws = new WebSocket(url);
    archiveImportWsRef.current = ws;

    ws.onopen = () => {
      archiveImportReconnectRef.current = 0;
      const existingClientId = window.localStorage.getItem(wsClientIdStorageKey);
      ws.send(JSON.stringify({ type: "register", ...(existingClientId ? { clientId: existingClientId } : {}) }));
      ws.send(JSON.stringify({ type: "subscribe", taskId }));
      if (!archiveImportPingTimerRef.current) {
        archiveImportPingTimerRef.current = window.setInterval(() => {
          try {
            ws.send(JSON.stringify({ type: "ping" }));
          } catch {
          }
        }, 20_000);
      }
    };

    ws.onmessage = (event) => {
      let msg: unknown;
      try {
        msg = JSON.parse(String(event.data));
      } catch {
        return;
      }
      if (!msg || typeof msg !== "object") return;
      const record = msg as Record<string, unknown>;
      if (record.type === "registered" && typeof record.clientId === "string") {
        window.localStorage.setItem(wsClientIdStorageKey, record.clientId);
        return;
      }
      if (record.type !== "snapshot") return;
      const payload = record.payload as Record<string, unknown> | undefined;
      const task = (payload?.task ?? payload) as Record<string, unknown> | undefined;
      if (!task || task.kind !== "archive_import") return;

      const state = task.state;
      const stage = task.stage;
      const percent = task.percent;
      if (typeof stage === "string") setArchiveImportStage(stage);
      if (typeof percent === "number") setArchiveImportPercent(percent);

      if (typeof task.resultProjectId === "string") setArchiveImportResultProjectId(task.resultProjectId);

      if (state === "done") {
        archiveImportTaskIdRef.current = null;
        try {
          ws.close();
        } catch {
        }
        archiveImportWsRef.current = null;
        if (archiveImportPingTimerRef.current) {
          window.clearInterval(archiveImportPingTimerRef.current);
          archiveImportPingTimerRef.current = null;
        }
        setIsArchiveImporting(false);
      }

      if (state === "error") {
        const err = task.error;
        const message = typeof err === "string" ? err : "导入失败";
        setArchiveImportError(message);
        toast.error(message);
        archiveImportTaskIdRef.current = null;
        setIsArchiveImporting(false);
        try {
          ws.close();
        } catch {
        }
        archiveImportWsRef.current = null;
        if (archiveImportPingTimerRef.current) {
          window.clearInterval(archiveImportPingTimerRef.current);
          archiveImportPingTimerRef.current = null;
        }
      }
    };

    ws.onclose = () => {
      if (!archiveImportTaskIdRef.current) return;
      if (!isArchiveImporting) return;
      const attempt = archiveImportReconnectRef.current + 1;
      archiveImportReconnectRef.current = attempt;
      const delay = Math.min(2000 * attempt, 10_000);
      setTimeout(() => connectArchiveImportWs(wsPort, wsPath), delay);
    };

    ws.onerror = () => {
      try {
        ws.close();
      } catch {
      }
    };
  };

  useEffect(() => {
    return () => {
      if (exportWsRef.current) {
        try {
          exportWsRef.current.close();
        } catch {
        }
        exportWsRef.current = null;
      }
      if (exportPingTimerRef.current) {
        window.clearInterval(exportPingTimerRef.current);
        exportPingTimerRef.current = null;
      }
      if (archiveExportWsRef.current) {
        try {
          archiveExportWsRef.current.close();
        } catch {
        }
        archiveExportWsRef.current = null;
      }
      if (archiveExportPingTimerRef.current) {
        window.clearInterval(archiveExportPingTimerRef.current);
        archiveExportPingTimerRef.current = null;
      }
      if (archiveImportWsRef.current) {
        try {
          archiveImportWsRef.current.close();
        } catch {
        }
        archiveImportWsRef.current = null;
      }
      if (archiveImportPingTimerRef.current) {
        window.clearInterval(archiveImportPingTimerRef.current);
        archiveImportPingTimerRef.current = null;
      }
    };
  }, []);

  const handleExport = async () => {
    if (!projectId) return;
    if (isExporting) return;
    setIsExporting(true);
    setExportError(null);
    setExportStage("准备导出");
    setExportPercent(0);
    try {
      if (dirty) {
        setExportStage("保存中");
        await flushAutosave();
      }
      setExportStage("启动任务");
      const res = await fetch(`/api/projects/${projectId}/export/tasks`, { method: "POST" });
      if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const payload = (await res.json()) as { error?: { message?: string } };
          throw new Error(payload.error?.message || `Export failed: ${res.status}`);
        }
        throw new Error(`Export failed: ${res.status}`);
      }
      const payload = (await res.json()) as {
        taskId?: string;
        wsPort?: number;
        wsPath?: string;
        downloadUrl?: string;
      };
      if (!payload.taskId || typeof payload.wsPort !== "number" || typeof payload.wsPath !== "string" || !payload.downloadUrl) {
        throw new Error("Invalid export task response");
      }
      exportTaskIdRef.current = payload.taskId;
      exportDownloadUrlRef.current = payload.downloadUrl;
      setExportStage("导出中");
      setExportPercent(1);
      connectExportWs(payload.wsPort, payload.wsPath);
    } catch (e) {
      const message = e instanceof Error ? e.message : "导出失败";
      setExportError(message);
      toast.error(message);
      exportTaskIdRef.current = null;
      exportDownloadUrlRef.current = null;
      setExportStage(null);
      setExportPercent(null);
      setIsExporting(false);
    }
  };

  const handleArchiveExport = async (options?: ArchiveExportOptions) => {
    if (!projectId) return;
    if (isArchiveExporting) return;
    setIsArchiveExporting(true);
    setArchiveExportError(null);
    setArchiveExportStage("准备导出配置包");
    setArchiveExportPercent(0);
    try {
      if (dirty) {
        setArchiveExportStage("保存中");
        await flushAutosave();
      }
      setArchiveExportStage("启动任务");
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
        taskId?: string;
        wsPort?: number;
        wsPath?: string;
        downloadUrl?: string;
      };
      if (!payload.taskId || typeof payload.wsPort !== "number" || typeof payload.wsPath !== "string" || !payload.downloadUrl) {
        throw new Error("Invalid archive export task response");
      }
      archiveExportTaskIdRef.current = payload.taskId;
      archiveExportDownloadUrlRef.current = payload.downloadUrl;
      setArchiveExportStage("导出中");
      setArchiveExportPercent(1);
      connectArchiveExportWs(payload.wsPort, payload.wsPath);
    } catch (e) {
      const message = e instanceof Error ? e.message : "导出失败";
      setArchiveExportError(message);
      toast.error(message);
      archiveExportTaskIdRef.current = null;
      archiveExportDownloadUrlRef.current = null;
      setArchiveExportStage(null);
      setArchiveExportPercent(null);
      setIsArchiveExporting(false);
    }
  };

  const handleArchiveImportPickFile = () => {
    if (isArchiveImporting) return;
    importFileInputRef.current?.click();
  };

  const handleArchiveImportFileSelected = async (file: File | null) => {
    if (!file) return;
    if (isArchiveImporting) return;
    setIsArchiveImporting(true);
    setArchiveImportError(null);
    setArchiveImportStage("上传中");
    setArchiveImportPercent(0);
    setArchiveImportResultProjectId(null);
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
        taskId?: string;
        wsPort?: number;
        wsPath?: string;
      };
      if (!payload.taskId || typeof payload.wsPort !== "number" || typeof payload.wsPath !== "string") {
        throw new Error("Invalid archive import task response");
      }
      archiveImportTaskIdRef.current = payload.taskId;
      setArchiveImportStage("导入中");
      setArchiveImportPercent(1);
      connectArchiveImportWs(payload.wsPort, payload.wsPath);
    } catch (e) {
      const message = e instanceof Error ? e.message : "导入失败";
      setArchiveImportError(message);
      toast.error(message);
      archiveImportTaskIdRef.current = null;
      setArchiveImportStage(null);
      setArchiveImportPercent(null);
      setIsArchiveImporting(false);
    } finally {
      if (importFileInputRef.current) importFileInputRef.current.value = "";
    }
  };


  /** 删除选中组件（先压入快照以支持撤销） */
  const handleDelete = () => {
    deleteSelected();
  };

  /**
   * 视口切换
   *
   * 同时更新编辑器 store（持久化偏好）和画布 store（即时生效）。
   * 画布 store 的 viewport 是渲染用的事实来源，
   * 编辑器 store 的 canvasViewport 是持久化偏好。
   */
  const handleViewportChange = (vp: CanvasState["viewport"]) => {
    setCanvasViewport(vp);
    setViewport(vp);
  };

  return (
    <div className="flex h-10 items-center gap-1 border-b bg-background px-2">
      {/* 左面板切换 */}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleLeftPanel}>
        {leftPanelCollapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </Button>

      <Separator orientation="vertical" className="mx-1 h-5" />

      {/* 撤销 */}
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!canUndo} onClick={undo}>
        <Undo2 className="h-4 w-4" />
      </Button>
      {/* 重做 */}
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!canRedo} onClick={redo}>
        <Redo2 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-5" />

      {/* 视口切换 */}
      <div className="flex items-center rounded-md border">
        {viewports.map((vp) => (
          <Button
            key={vp}
            variant={viewport === vp ? "secondary" : "ghost"}
            size="sm"
            className="h-7 rounded-none px-2 first:rounded-l-md last:rounded-r-md"
            onClick={() => handleViewportChange(vp)}
            title={viewportLabels[vp]}
          >
            {viewportIcons[vp]}
          </Button>
        ))}
      </div>

      {/* 组件计数 */}
      <span className="ml-1 text-[10px] text-muted-foreground">
        {components.length} components
      </span>

      {/* 缩放控制 */}
      <div className="ml-2 flex items-center gap-1">
        <button
          className="rounded p-1 text-muted-foreground hover:bg-muted"
          onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}
          title="缩小"
          type="button"
        >
          <span className="text-xs">−</span>
        </button>
        <input
          type="number"
          value={Math.round(zoom * 100)}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!isNaN(v) && v >= 25 && v <= 200) setZoom(v / 100);
          }}
          className="h-6 w-14 rounded border bg-background px-1 text-center text-xs"
          min={25}
          max={200}
        />
        <span className="text-xs text-muted-foreground">%</span>
        <button
          className="rounded p-1 text-muted-foreground hover:bg-muted"
          onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          title="放大"
          type="button"
        >
          <span className="text-xs">+</span>
        </button>
        <button
          className="ml-1 rounded p-1 text-muted-foreground hover:bg-muted"
          onClick={zoomToFit}
          title="缩放至全部组件"
          type="button"
        >
          <span className="text-xs">⊞</span>
        </button>
        {selectedIds.length > 0 && (
          <button
            className="rounded p-1 text-muted-foreground hover:bg-muted"
            onClick={zoomToSelection}
            title="缩放至选中组件"
            type="button"
          >
            <span className="text-xs">⊡</span>
          </button>
        )}
      </div>

      <div className="flex-1" />

      {projectId && sync.supported && (
        <>
          <Badge variant={sync.summary.badgeVariant} className="mr-1 text-[10px]">
            {sync.summary.badgeLabel}
          </Badge>
          <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={sync.summary.detail ?? undefined}>
            {sync.summary.detail ?? "本地同步状态可用"}
          </span>
          <Badge variant={sync.compareSummary.badgeVariant} className="mr-1 text-[10px]">
            {sync.compareSummary.badgeLabel}
          </Badge>
          {sync.compareSummary.conflictCount > 0 && (
            <Badge variant="destructive" className="mr-1 text-[10px]">
              冲突 {sync.compareSummary.conflictCount}
            </Badge>
          )}
          {sync.compareSummary.localOnlyCount > 0 && (
            <Badge variant="default" className="mr-1 text-[10px]">
              本地 {sync.compareSummary.localOnlyCount}
            </Badge>
          )}
          {sync.compareSummary.remoteOnlyCount > 0 && (
            <Badge variant="secondary" className="mr-1 text-[10px]">
              远端 {sync.compareSummary.remoteOnlyCount}
            </Badge>
          )}
          <span className="mr-1 max-w-64 truncate text-[10px] text-muted-foreground" title={sync.compareSummary.detail ?? undefined}>
            {sync.compareSummary.detail ?? "比较结果暂不可用"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="mr-1 h-7 text-[10px]"
            disabled={!sync.compareResult && sync.isComparing}
            onClick={() => setCompareDialogOpen(true)}
          >
            Compare 详情
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[10px]"
            disabled={!sync.canPush || syncBusy || isExporting || isArchiveExporting || isArchiveImporting}
            onClick={() => void sync.push()}
          >
            {sync.isSyncing ? (
              <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Upload className="mr-1 h-3 w-3" />
            )}
            {sync.isSyncing ? "处理中" : "Push"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="ml-1 h-7 text-[10px]"
            disabled={!sync.canPull || syncBusy || isExporting || isArchiveExporting || isArchiveImporting}
            onClick={() => void sync.pull()}
          >
            {sync.isSyncing ? (
              <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Download className="mr-1 h-3 w-3" />
            )}
            {sync.isSyncing ? "处理中" : "Pull"}
          </Button>
          <Separator orientation="vertical" className="mx-1 h-5" />
        </>
      )}

      {editorMode === "pages" && (
        <>
          {error && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={error}>
              保存失败
            </span>
          )}
          {exportError && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={exportError}>
              导出失败
            </span>
          )}
          {archiveExportError && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={archiveExportError}>
              配置导出失败
            </span>
          )}
          {archiveImportError && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={archiveImportError}>
              配置导入失败
            </span>
          )}
          {isExporting && exportStage && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={exportStage}>
              {exportStage}
              {typeof exportPercent === "number" ? ` (${exportPercent}%)` : ""}
            </span>
          )}
          {isArchiveExporting && archiveExportStage && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={archiveExportStage}>
              {archiveExportStage}
              {typeof archiveExportPercent === "number" ? ` (${archiveExportPercent}%)` : ""}
            </span>
          )}
          {isArchiveImporting && archiveImportStage && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={archiveImportStage}>
              {archiveImportStage}
              {typeof archiveImportPercent === "number" ? ` (${archiveImportPercent}%)` : ""}
            </span>
          )}
          {!isArchiveImporting && archiveImportResultProjectId && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={archiveImportResultProjectId}>
              已导入：{archiveImportResultProjectId.slice(0, 8)}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mr-1 h-7 text-[10px]"
            data-testid="toolbar-preview-button"
            onClick={() => setPreviewOpen(true)}
            title="ISC-35 Preview"
          >
            <Eye className="mr-1 h-3 w-3" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="mr-1 h-7 text-[10px]"
            onClick={() => setApiTestOpen(true)}
            title="P6/P7: API 端点测试"
          >
            <Terminal className="mr-1 h-3 w-3" />
            API 测试
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[10px]"
            disabled={isSaving || !dirty}
            onClick={() => void flushAutosave()}
          >
            <Save className="mr-1 h-3 w-3" />
            {isSaving ? "保存中" : dirty ? "保存" : "已保存"}
          </Button>
          {projectId && (
            <Button
              variant="outline"
              size="sm"
              className="ml-1 h-7 text-[10px]"
              disabled={isSaving || isExporting || syncBusy}
              onClick={() => void handleExport()}
            >
              {isExporting ? (
                <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
              ) : (
                <Download className="mr-1 h-3 w-3" />
              )}
              {isExporting ? "导出中" : "导出"}
            </Button>
          )}
          {projectId && (
            <Button
              variant="outline"
              size="sm"
              className="ml-1 h-7 text-[10px]"
              disabled={isSaving || isArchiveExporting || isExporting || syncBusy}
              onClick={() => setArchiveExportDialogOpen(true)}
              title="导出配置归档（ISC-20/98-101）"
            >
              {isArchiveExporting ? (
                <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
              ) : (
                <Download className="mr-1 h-3 w-3" />
              )}
              {isArchiveExporting ? "配置导出中" : "配置导出"}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="ml-1 h-7 text-[10px]"
            disabled={isSaving || isArchiveImporting || isExporting || isArchiveExporting || syncBusy}
            onClick={handleArchiveImportPickFile}
            title="导入配置归档（ISC-20/98-101）"
          >
            {isArchiveImporting ? (
              <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Upload className="mr-1 h-3 w-3" />
            )}
            {isArchiveImporting ? "配置导入中" : "配置导入"}
          </Button>
          <input
            ref={importFileInputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={(e) => void handleArchiveImportFileSelected(e.target.files?.[0] ?? null)}
          />
          <Separator orientation="vertical" className="mx-1 h-5" />
        </>
      )}

      <PagePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} />
      <ApiTestPanel open={apiTestOpen} onOpenChange={setApiTestOpen} />

      <ConfigArchiveExportDialog
        open={archiveExportDialogOpen}
        onOpenChange={setArchiveExportDialogOpen}
        projectId={projectId}
        disabled={isSaving || isArchiveExporting || isExporting || syncBusy}
        isExporting={isArchiveExporting}
        onConfirm={(options) => void handleArchiveExport(options)}
      />
      <ProjectSyncCompareDialog
        open={compareDialogOpen}
        onOpenChange={setCompareDialogOpen}
        compareResult={sync.compareResult}
        compareSummary={sync.compareSummary}
        disabled={!sync.supported}
        isSubmitting={syncBusy}
        onKeepLocal={sync.keepLocal}
        onKeepRemote={sync.keepRemote}
        onSetBaseline={sync.setBaseline}
      />

      {/* 选中操作区（仅在有选中组件时显示） */}
      {selectedIds.length > 0 && (
        <>
          {/* Z-Order 按钮组 */}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => zIndexMove(selectedIds, "top")} title="置顶">
            <ChevronsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => zIndexMove(selectedIds, "up")} title="上移">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => zIndexMove(selectedIds, "down")} title="下移">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => zIndexMove(selectedIds, "bottom")} title="置底">
            <ChevronsDown className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* 锁定/隐藏按钮（单选时精确操作） */}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleLock(selectedIds[0]!)} title="锁定/解锁">
            {components.find((c) => c.id === selectedIds[0])?.locked ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleHidden(selectedIds[0]!)} title="隐藏/显示">
            {components.find((c) => c.id === selectedIds[0])?.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* 多选对齐按钮组 */}
          {selectedIds.length > 1 && (
            <>
              <div className="flex items-center rounded-md border text-[10px]">
                <Button variant="ghost" size="sm" className="h-7 rounded-none px-1.5 first:rounded-l-md" onClick={() => alignSelected("left")} title="左对齐">
                  ≡
                </Button>
                <Button variant="ghost" size="sm" className="h-7 rounded-none px-1.5 border-x" onClick={() => alignSelected("centerH")} title="水平居中">
                  ╳
                </Button>
                <Button variant="ghost" size="sm" className="h-7 rounded-none px-1.5 last:rounded-r-md" onClick={() => alignSelected("right")} title="右对齐">
                  ≡
                </Button>
              </div>
              <div className="flex items-center rounded-md border text-[10px]">
                <Button variant="ghost" size="sm" className="h-7 rounded-none px-1.5 first:rounded-l-md" onClick={() => alignSelected("top")} title="顶部对齐">
                  ☰
                </Button>
                <Button variant="ghost" size="sm" className="h-7 rounded-none px-1.5 border-x" onClick={() => alignSelected("centerV")} title="垂直居中">
                  ╳
                </Button>
                <Button variant="ghost" size="sm" className="h-7 rounded-none px-1.5 last:rounded-r-md" onClick={() => alignSelected("bottom")} title="底部对齐">
                  ☰
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => distributeSelected("horizontal")} title="水平分布" style={{ fontSize: 12 }}>
                ↔
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => distributeSelected("vertical")} title="垂直分布" style={{ fontSize: 12 }}>
                ↕
              </Button>
            </>
          )}

          <Separator orientation="vertical" className="mx-1 h-5" />

          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* 右面板切换 */}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleRightPanel}>
        {rightPanelCollapsed ? (
          <PanelRightOpen className="h-4 w-4" />
        ) : (
          <PanelRightClose className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
