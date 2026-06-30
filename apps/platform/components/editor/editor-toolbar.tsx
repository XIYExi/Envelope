/**
 * 编辑器工具栏 — 面板切换、撤销/重做、视口切换、删除、组件计数
 *
 * 位于编辑器顶部，提供核心操作的快捷入口。
 * 视口切换通过编辑器 store 统一管理（由 editor-layout 同步到画布 store）。
 *
 * WebSocket 连接管理已提取至 lib/hooks/：
 * - use-export.ts        标准项目导出
 * - use-archive-export.ts 配置归档导出
 * - use-archive-import.ts 配置归档导入
 * - use-project-sync.ts  项目同步状态
 * - use-task-websocket.ts 通用 WebSocket 抽象
 *
 * @author xiye
 * @date 2026-06-14
 * @since 3.0.0
 */
"use client";

import { useState } from "react";
import { useCanvasStore } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { useProjectPagesStore } from "@/stores/project-pages";
import { useExport } from "@/lib/hooks/use-export";
import { useArchiveExport } from "@/lib/hooks/use-archive-export";
import { useArchiveImport } from "@/lib/hooks/use-archive-import";
import { useProjectSync } from "@/lib/hooks/use-project-sync";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useSearchParams } from "next/navigation";
import { ConfigArchiveExportDialog } from "./config-archive-export-dialog";
import { ProjectSyncCompareDialog } from "@/components/project/project-sync-compare-dialog";
import type { ArchiveExportOptions } from "@/lib/archive/archive-types";
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
    zoom, setZoom, zoomToFit, zoomToSelection, positionMode, setPositionMode,
  } = useCanvasStore();
  const {
    toggleLeftPanel,
    toggleRightPanel,
    leftPanelCollapsed,
    rightPanelCollapsed,
    editorMode,
  } = useEditorStore();

  const { dirty, isSaving, error: pageError, flushAutosave } = useProjectPagesStore();

  // === 项目同步 ===
  const { sync, syncBusy } = useProjectSync(projectId);

  // === 标准导出 ===
  const exportHook = useExport({ projectId, dirty, flushAutosave });

  // === 配置归档导出 ===
  const archiveExport = useArchiveExport({ projectId, dirty, flushAutosave });

  // === 配置归档导入 ===
  const archiveImport = useArchiveImport();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [apiTestOpen, setApiTestOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [saveBadgeExpanded, setSaveBadgeExpanded] = useState(false);

  /** 删除选中组件（先压入快照以支持撤销） */
  const handleDelete = () => {
    if (useCanvasStore.getState().historyPast.length >= useCanvasStore.getState().historyLimit) {
      setDeleteConfirmOpen(true);
    } else {
      deleteSelected();
    }
  };

  /**
   * 视口切换
   *
   * U5: 视口状态单一 store，统一写入画布 store
   */
  const handleViewportChange = (vp: CanvasState["viewport"]) => {
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

      {/* 定位模式切换 */}
      <div className="ml-2 flex items-center rounded-md border">
        <button
          className={`h-7 rounded-l-md px-2 text-[10px] font-medium ${positionMode === "grid" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted"}`}
          onClick={() => setPositionMode("grid")}
          title="网格定位（12列CSS Grid）"
          type="button"
        >
          网格
        </button>
        <button
          className={`h-7 rounded-r-md px-2 text-[10px] font-medium ${positionMode === "free" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted"}`}
          onClick={() => setPositionMode("free")}
          title="自由定位（绝对定位）"
          type="button"
        >
          自由
        </button>
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
            disabled={!sync.canPush || syncBusy || exportHook.isExporting || archiveExport.isExporting || archiveImport.isImporting}
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
            disabled={!sync.canPull || syncBusy || exportHook.isExporting || archiveExport.isExporting || archiveImport.isImporting}
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
          {pageError && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={pageError}>
              保存失败
            </span>
          )}
          {exportHook.error && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={exportHook.error}>
              导出失败
            </span>
          )}
          {archiveExport.error && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={archiveExport.error}>
              配置导出失败
            </span>
          )}
          {archiveImport.error && (
            <span className="mr-1 max-w-48 truncate text-[10px] text-destructive" title={archiveImport.error}>
              配置导入失败
            </span>
          )}
          {exportHook.isExporting && exportHook.stage && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={exportHook.stage}>
              {exportHook.stage}
              {typeof exportHook.percent === "number" ? ` (${exportHook.percent}%)` : ""}
            </span>
          )}
          {archiveExport.isExporting && archiveExport.stage && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={archiveExport.stage}>
              {archiveExport.stage}
              {typeof archiveExport.percent === "number" ? ` (${archiveExport.percent}%)` : ""}
            </span>
          )}
          {archiveImport.isImporting && archiveImport.stage && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={archiveImport.stage}>
              {archiveImport.stage}
              {typeof archiveImport.percent === "number" ? ` (${archiveImport.percent}%)` : ""}
            </span>
          )}
          {!archiveImport.isImporting && archiveImport.resultProjectId && (
            <span className="mr-1 max-w-56 truncate text-[10px] text-muted-foreground" title={archiveImport.resultProjectId}>
              已导入：{archiveImport.resultProjectId.slice(0, 8)}
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
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[10px]"
              disabled={isSaving || !dirty}
              onClick={() => {
                if (saveBadgeExpanded) { void flushAutosave(); setSaveBadgeExpanded(false); }
                else { setSaveBadgeExpanded(true); }
              }}
              onBlur={() => setTimeout(() => setSaveBadgeExpanded(false), 200)}
              title={isSaving ? "保存中" : dirty ? "未保存更改" : "已保存"}
            >
              <Save className={`mr-1 h-3 w-3 ${isSaving ? "animate-pulse" : ""}`} />
              {saveBadgeExpanded ? (
                isSaving ? "保存中" : dirty ? "保存" : "已保存"
              ) : null}
            </Button>
            {saveBadgeExpanded && dirty && (
              <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border bg-popover p-2 text-[10px] shadow-md">
                <div className="text-muted-foreground">有未保存的更改</div>
                {pageError && <div className="mt-1 text-destructive">{pageError}</div>}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 h-6 w-full text-[10px]"
                  onClick={() => { void flushAutosave(); setSaveBadgeExpanded(false); }}
                >
                  立即保存
                </Button>
              </div>
            )}
          </div>
          {projectId && (
            <Button
              variant="outline"
              size="sm"
              className="ml-1 h-7 text-[10px]"
              disabled={isSaving || exportHook.isExporting || syncBusy}
              onClick={() => void exportHook.startExport()}
            >
              {exportHook.isExporting ? (
                <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
              ) : (
                <Download className="mr-1 h-3 w-3" />
              )}
              {exportHook.isExporting ? "导出中" : "导出"}
            </Button>
          )}
          {projectId && (
            <Button
              variant="outline"
              size="sm"
              className="ml-1 h-7 text-[10px]"
              disabled={isSaving || archiveExport.isExporting || exportHook.isExporting || syncBusy}
              onClick={() => archiveExport.setDialogOpen(true)}
              title="导出配置归档（ISC-20/98-101）"
            >
              {archiveExport.isExporting ? (
                <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
              ) : (
                <Download className="mr-1 h-3 w-3" />
              )}
              {archiveExport.isExporting ? "配置导出中" : "配置导出"}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="ml-1 h-7 text-[10px]"
            disabled={isSaving || archiveImport.isImporting || exportHook.isExporting || archiveExport.isExporting || syncBusy}
            onClick={archiveImport.pickFile}
            title="导入配置归档（ISC-20/98-101）"
          >
            {archiveImport.isImporting ? (
              <LoaderCircle className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Upload className="mr-1 h-3 w-3" />
            )}
            {archiveImport.isImporting ? "配置导入中" : "配置导入"}
          </Button>
          <input
            ref={archiveImport.fileInputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={(e) => void archiveImport.handleFileSelected(e.target.files?.[0] ?? null)}
          />
          <Separator orientation="vertical" className="mx-1 h-5" />
        </>
      )}

      <PagePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} />
      <ApiTestPanel open={apiTestOpen} onOpenChange={setApiTestOpen} />
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              撤销栈已满，删除后将无法撤销，是否继续？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => { deleteSelected(); setDeleteConfirmOpen(false); }}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ConfigArchiveExportDialog
        open={archiveExport.dialogOpen}
        onOpenChange={archiveExport.setDialogOpen}
        projectId={projectId}
        disabled={isSaving || archiveExport.isExporting || exportHook.isExporting || syncBusy}
        isExporting={archiveExport.isExporting}
        onConfirm={(options) => void archiveExport.startExport(options)}
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
