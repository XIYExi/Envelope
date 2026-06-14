/**
 * 编辑器工具栏 — 面板切换、撤销/重做、视口切换、删除、组件计数
 *
 * 位于编辑器顶部，提供核心操作的快捷入口。
 * 视口切换通过编辑器 store 统一管理（由 editor-layout 同步到画布 store）。
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { useCanvasStore } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import type { CanvasState } from "@envelope/engine";

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
 * - 撤销/重做（由 editor store 的 canUndo/canRedo 控制）
 * - 视口切换（通过 editor store 统一管理，避免双源写入）
 * - 组件计数
 * - 删除选中组件（无确认对话框，直接删除，可通过撤销恢复）
 * - 右面板切换按钮
 */
export function EditorToolbar() {
  const { viewport, setViewport, deleteSelected, selectedIds, components } = useCanvasStore();
  const {
    toggleLeftPanel,
    toggleRightPanel,
    leftPanelCollapsed,
    rightPanelCollapsed,
    canUndo,
    canRedo,
    undo,
    redo,
    pushSnapshot,
    setCanvasViewport,
  } = useEditorStore();

  /** 删除选中组件（先压入快照以支持撤销） */
  const handleDelete = () => {
    pushSnapshot();
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

      <div className="flex-1" />

      {/* 删除（仅在有选中组件时显示） */}
      {selectedIds.length > 0 && (
        <>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-5" />
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
