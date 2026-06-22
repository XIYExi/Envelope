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
import { useSearchParams } from "next/navigation";
import { DndContext, useDroppable, pointerWithin, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { useCanvasStore, createComponentNode, CanvasRenderer, VIEWPORT_WIDTHS, type CanvasSnapshot } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { useProjectPagesStore, componentNodesToCanvasComponents } from "@/stores/project-pages";
import { useProjectFlowsStore } from "@/stores/project-flows";
import { EditorToolbar } from "./editor-toolbar";
import { MaterialPanel } from "./material-panel";
import { RightPanel } from "./right-panel";
import { LeftPanel } from "./left-panel";
import { DataModelEditor } from "./data-model-editor";
import { RoutingEditor } from "./routing-editor";
import { ApiEndpointEditor } from "./api-endpoint-editor";
import { ProjectFlowEditor } from "./project-flow-editor";
import { useFlowBindingStore } from "@envelope/flow";

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
    pageBackground, pagePadding,
    resizeComponent, setZoom, setPan,
  } = useCanvasStore();

  const viewportWidth = VIEWPORT_WIDTHS[viewport];
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  // 用 ref 保持 zoom 的最新值，避免 wheel 事件监听器因 zoom 变化而反复注销/注册
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  /** 合并 Droppable 的 ref 与本地 dropZoneRef */
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      dropZoneRef.current = node;
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
    const el = dropZoneRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [setZoom]);

  return (
    <div
      ref={combinedRef}
      className={`flex flex-1 min-h-0 overflow-hidden ${isOver ? "bg-blue-50/30" : ""}`}
    >
      <CanvasRenderer
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
        pageBackground={pageBackground}
        pagePadding={pagePadding}
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
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const {
    leftPanelCollapsed, rightPanelCollapsed,
    canvasViewport, editorMode,
  } = useEditorStore();
  const {
    components,
    setViewport,
    deleteSelected,
    undo,
    redo,
    copySelected,
    cutSelected,
    pasteClipboard,
    insertNode,
    moveNode,
    pageBackground,
    pagePadding,
  } = useCanvasStore();
  const isPageMode = editorMode === "pages";

  const {
    loadByProjectId,
    isLoading: isLoadingPages,
    initializedProjectId,
    setInitializedProjectId,
    getCurrentPage,
    currentPath,
  } = useProjectPagesStore();

  const {
    loadByProjectId: loadFlowsByProjectId,
    initializedProjectId: initializedFlowProjectId,
    setInitializedProjectId: setInitializedFlowProjectId,
    flows,
  } = useProjectFlowsStore();

  const appliedPageKeyRef = useRef<string | null>(null);
  const hydratingRef = useRef(false);
  const skipNextSyncRef = useRef(false);

  const registry = useMemo(() => createDefaultRegistry(), []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  /**
   * 物料名称 → 物料信息的快速查找表
   * 用于拖拽结束时根据物料名称获取分类信息
   */
  const materialMap = useMemo(() => {
    const map = new Map<string, { category: string }>();
    registry.getAll().forEach((m) => map.set(m.name, { category: m.category }));
    return map;
  }, [registry]);

  const parseTreeDropTarget = useCallback((overId: string): { parentId: string | null; index?: number } | null => {
    if (overId.startsWith("tree-drop:")) {
      const parts = overId.split(":");
      if (parts.length < 3) return null;
      const parentKey = parts[1]!;
      const idxStr = parts[2]!;
      const idx = Number(idxStr);
      return {
        parentId: parentKey === "root" ? null : parentKey,
        index: Number.isFinite(idx) ? idx : undefined,
      };
    }
    if (overId.startsWith("tree-container:")) {
      const parentId = overId.replace(/^tree-container:/, "");
      if (!parentId) return null;
      return { parentId, index: 999999 };
    }
    return null;
  }, []);

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
      if (!over) return;
      const overId = String(over.id);
      const treeTarget = parseTreeDropTarget(overId);

      const dragType = active.data.current?.type as string | undefined;
      const materialName = active.data.current?.materialName as string | undefined;
      const draggedNodeId = active.data.current?.componentId as string | undefined;

      if (treeTarget) {
        if (dragType === "material" && materialName) {
          const material = registry.get(materialName);
          const category = materialMap.get(materialName)?.category ?? material?.category ?? "layout";
          const defaultProps = material?.defaultProps ?? {};
          const node = createComponentNode(materialName, category, { ...defaultProps });
          insertNode(node, treeTarget);
          return;
        }
        if (dragType === "canvas-component" && draggedNodeId) {
          moveNode(draggedNodeId, treeTarget);
          return;
        }
        return;
      }

      if (overId !== "canvas-drop-zone" && !overId.startsWith("canvas")) return;
      if (dragType !== "material" || !materialName) return;
      const material = registry.get(materialName);
      const category = materialMap.get(materialName)?.category ?? material?.category ?? "layout";
      const defaultProps = material?.defaultProps ?? {};
      const node = createComponentNode(materialName, category, { ...defaultProps });
      insertNode(node, { parentId: null, index: components.length });
    },
    [components.length, insertNode, materialMap, moveNode, parseTreeDropTarget, registry],
  );

  const handleAddMaterial = useCallback(
    (materialName: string) => {
      const material = registry.get(materialName);
      const category = materialMap.get(materialName)?.category ?? material?.category ?? "layout";
      const defaultProps = material?.defaultProps ?? {};
      const node = createComponentNode(materialName, category, { ...defaultProps });
      insertNode(node, { parentId: null, index: components.length });
    },
    [components.length, insertNode, materialMap, registry],
  );

  // 编辑器 store 中的视口变化同步到画布 store
  useEffect(() => {
    setViewport(canvasViewport);
  }, [canvasViewport, setViewport]);

  useEffect(() => {
    if (!projectId || !isPageMode) return;
    if (initializedProjectId === projectId) return;
    appliedPageKeyRef.current = null;
    useProjectPagesStore.getState().cancelAutosave();
    setInitializedProjectId(projectId);
    loadByProjectId(projectId);
  }, [projectId, isPageMode, initializedProjectId, setInitializedProjectId, loadByProjectId]);

  useEffect(() => {
    if (!projectId) return;
    if (initializedFlowProjectId === projectId) return;
    setInitializedFlowProjectId(projectId);
    loadFlowsByProjectId(projectId);
  }, [projectId, initializedFlowProjectId, setInitializedFlowProjectId, loadFlowsByProjectId]);

  useEffect(() => {
    const desired = (flows ?? []).map((f) => ({ id: f.id, name: f.name }));
    const { flowList, registerFlow, unregisterFlow } = useFlowBindingStore.getState();

    const existingMap = new Map(flowList.map((f) => [f.id, f.name]));
    const desiredIds = new Set(desired.map((f) => f.id));

    for (const f of desired) {
      const existingName = existingMap.get(f.id);
      if (existingName !== f.name) {
        registerFlow(f.id, f.name);
      }
    }

    for (const id of existingMap.keys()) {
      if (!desiredIds.has(id)) {
        unregisterFlow(id);
      }
    }
  }, [flows]);

  useEffect(() => {
    if (!projectId || !isPageMode) return;
    if (isLoadingPages) return;
    const pageKey = `${projectId}:${currentPath ?? ""}`;
    if (appliedPageKeyRef.current === pageKey) return;
    const current = getCurrentPage();
    if (!current) return;

    hydratingRef.current = true;
    skipNextSyncRef.current = true;
    try {
      const canvasComponents = componentNodesToCanvasComponents(current.schema.components ?? []);
      const hydratePartial: Partial<CanvasSnapshot> = { components: canvasComponents, selectedIds: [] };
      if (current.schema.background?.color) hydratePartial.pageBackground = current.schema.background.color;
      if (typeof current.schema.padding === "number") hydratePartial.pagePadding = current.schema.padding;
      useCanvasStore.getState().hydrate(hydratePartial);
    } finally {
      hydratingRef.current = false;
      appliedPageKeyRef.current = pageKey;
    }
  }, [projectId, isPageMode, isLoadingPages, getCurrentPage, currentPath]);

  useEffect(() => {
    if (!isPageMode) return;
    if (hydratingRef.current) return;
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }
    useProjectPagesStore.getState().syncCurrentPageFromCanvas({ components, pageBackground, pagePadding });
    useProjectPagesStore.getState().scheduleAutosave(30_000);
  }, [components, isPageMode, pageBackground, pagePadding]);

  // 全局键盘快捷键（仅当不在输入框内且处于 pages 模式时生效）
  useEffect(() => {
    if (!isPageMode) return;
    function handleKeyDown(e: KeyboardEvent) {
      // 在输入框/文本域中不拦截快捷键
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.target instanceof HTMLElement && e.target.isContentEditable) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        copySelected();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault();
        cutSelected();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        pasteClipboard();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteSelected();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copySelected, cutSelected, deleteSelected, isPageMode, pasteClipboard, undo, redo]);


  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar />
      {isPageMode ? (
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
          autoScroll={false}
          sensors={sensors}
        >
          <div className="flex flex-1 overflow-hidden">
            {!leftPanelCollapsed && <LeftPanel collapsed={leftPanelCollapsed} />}
            <MaterialPanel collapsed={leftPanelCollapsed} onAddMaterial={handleAddMaterial} />
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
            {editorMode === "flows" && <ProjectFlowEditor />}
            {editorMode === "api" && <ApiEndpointEditor />}
          </div>
          <RightPanel collapsed={rightPanelCollapsed} />
        </div>
      )}
    </div>
  );
}
