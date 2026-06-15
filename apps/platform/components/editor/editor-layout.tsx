/**
 * 编辑器主布局组件 — 集成 DndContext、画布渲染器、左右面板和工具栏
 *
 * 负责：
 * - 拖拽事件处理（素材面板 → 画布放置）
 * - Ctrl+滚轮缩放（阻止浏览器默认行为）
 * - 全局键盘快捷键（Copy/Cut/Delete，阻止输入框内触发）
 * - 编辑器模式切换（页面编辑 / 数据模型 / 路由 / 流程 / API）
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, memo } from "react";
import { DndContext, useDroppable, pointerWithin, type DragEndEvent } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { useCanvasStore, createCanvasComponent, CanvasRenderer, VIEWPORT_WIDTHS } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { EditorToolbar } from "./editor-toolbar";
import { MaterialPanel } from "./material-panel";
import { RightPanel } from "./right-panel";
import { LeftPanel } from "./left-panel";
import { DataModelEditor } from "./data-model-editor";
import { RoutingEditor } from "./routing-editor";
import { ApiEndpointEditor } from "./api-endpoint-editor";
import { FlowEditor } from "@envelope/flow";

/**
 * 画布放置区域组件
 *
 * 注册为 DnD Kit 的可放置区域，接收从素材面板拖来的组件。
 * 处理 Ctrl+滚轮缩放，渲染 CanvasRenderer 并传递所有画布状态。
 */
const CanvasDropZone = memo(function CanvasDropZone() {
  const {
    components, selectedIds, selectComponent, clearSelection,
    zoom, viewport, panX, panY, gridCols, gridGap,
    resizeComponent, setZoom, setPan,
  } = useCanvasStore();

  const viewportWidth = VIEWPORT_WIDTHS[viewport];
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  // 用 ref 保持 zoom 的最新值，避免 wheel 事件监听器因 zoom 变化而反复注销/注册
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  /** 合并 Droppable 的 ref 与本地 canvasRef */
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      canvasRef.current = node;
    },
    [setNodeRef],
  );

  useEffect(() => {
    /** Ctrl+滚轮缩放处理（阻止浏览器默认缩放行为） */
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        const newZoom = Math.min(2.0, Math.max(0.25, zoomRef.current + delta));
        setZoom(newZoom);
      }
    };
    const el = canvasRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [setZoom]);

  return (
    <div
      ref={combinedRef}
      className={`flex-1 overflow-hidden ${isOver ? "bg-blue-50/30" : ""}`}
    >
      <CanvasRenderer
        ref={canvasRef as React.Ref<HTMLDivElement>}
        components={components}
        selectedIds={selectedIds}
        onSelect={selectComponent}
        onClearSelection={clearSelection}
        onResize={resizeComponent}
        zoom={zoom}
        viewportWidth={viewportWidth}
        panX={panX}
        panY={panY}
        onPan={(x, y) => setPan(x, y)}
        gridCols={gridCols}
        gridGap={gridGap}
      />
    </div>
  );
});

/**
 * 编辑器主布局
 *
 * 外层容器：垂直 flex（工具栏 + 主体）。
 * 当 editorMode === "pages" 时，主体包含 DndContext 包裹的左/中/右三栏。
 * 其他模式渲染对应的专属编辑器（数据模型、路由等）。
 */
export function EditorLayout() {
  const {
    leftPanelCollapsed, rightPanelCollapsed, pushSnapshot,
    canvasViewport, editorMode,
  } = useEditorStore();
  const { addComponent, copySelected, components, setViewport } = useCanvasStore();
  const isPageMode = editorMode === "pages";

  const registry = useMemo(() => createDefaultRegistry(), []);

  /**
   * 物料名称 → 物料信息的快速查找表
   * 用于拖拽结束时根据物料名称获取分类信息
   */
  const materialMap = useMemo(() => {
    const map = new Map<string, { category: string }>();
    registry.getAll().forEach((m) => map.set(m.name, { category: m.category }));
    return map;
  }, [registry]);

  /**
   * 拖拽结束处理
   *
   * 从素材面板拖拽组件到画布放置区时触发。
   * 注意：当前版本不计算精确的放置坐标，
   * 新组件会被添加到画布的下一行默认位置（x=1, y=下一行）。
   * 后续版本将基于 DragEndEvent.delta 计算缩放后的精确坐标。
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || over.id !== "canvas-drop-zone") return;

      const materialName = active.data.current?.materialName as string | undefined;
      if (!materialName) return;

      const material = materialMap.get(materialName);
      const category = material?.category ?? "layout";

      const comp = createCanvasComponent(materialName, category, {}, components);
      pushSnapshot();
      addComponent(comp);
    },
    [addComponent, pushSnapshot, materialMap, components],
  );

  // 编辑器 store 中的视口变化同步到画布 store
  useEffect(() => {
    setViewport(canvasViewport);
  }, [canvasViewport, setViewport]);

  // 全局键盘快捷键（仅当不在输入框内且处于 pages 模式时生效）
  useEffect(() => {
    if (!isPageMode) return;
    /**
     * 键盘事件处理
     *
     * Ctrl+C: 复制选中组件
     * Ctrl+X: 剪切选中组件（复制后删除）
     * Delete/Backspace: 删除选中组件
     * 所有操作前自动压入快照以支持撤销
     */
    function handleKeyDown(e: KeyboardEvent) {
      // 在输入框/文本域中不拦截快捷键
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        pushSnapshot();
        copySelected();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault();
        pushSnapshot();
        copySelected();
        setTimeout(() => {
          useCanvasStore.getState().deleteSelected();
        }, 0);
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        pushSnapshot();
        useCanvasStore.getState().deleteSelected();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copySelected, pushSnapshot, isPageMode]);


  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar />
      {isPageMode ? (
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
          autoScroll={false}
        >
          <div className="flex flex-1 overflow-hidden">
            {!leftPanelCollapsed && <LeftPanel collapsed={leftPanelCollapsed} />}
            <MaterialPanel collapsed={leftPanelCollapsed} />
            <CanvasDropZone />
            <RightPanel collapsed={rightPanelCollapsed} />
          </div>
        </DndContext>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {!leftPanelCollapsed && <LeftPanel collapsed={leftPanelCollapsed} />}
          <div className="flex-1 overflow-hidden">
            {editorMode === "data-models" && <DataModelEditor />}
            {editorMode === "routing" && <RoutingEditor />}
            {editorMode === "flows" && <FlowEditor />}
            {editorMode === "api" && <ApiEndpointEditor />}
          </div>
          <RightPanel collapsed={rightPanelCollapsed} />
        </div>
      )}
    </div>
  );
}
