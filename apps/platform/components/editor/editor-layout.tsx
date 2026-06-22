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

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { useSearchParams } from "next/navigation";
import { DndContext, useDroppable, pointerWithin, DragOverlay, type DragEndEvent, type DragMoveEvent, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { useCanvasStore, createComponentNode, CanvasRenderer, VIEWPORT_WIDTHS, CANVAS_CELL_SIZE, CANVAS_CELL_HEIGHT, COMPONENT_TYPES_THAT_SUPPORT_CHILDREN, type CanvasSnapshot } from "@envelope/engine";
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
    pageBackground, pagePadding, pageMaxWidth,
    resizeComponent, setZoom, setPan,
  } = useCanvasStore();

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const viewportWidth = VIEWPORT_WIDTHS[viewport];
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  // 用 ref 保持 zoom 的最新值，避免 wheel 事件监听器因 zoom 变化而反复注销/注册
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const panXRef = useRef(panX);
  panXRef.current = panX;
  const panYRef = useRef(panY);
  panYRef.current = panY;

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
        const oldZoom = zoomRef.current;
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        const newZoom = Math.min(2.0, Math.max(0.25, oldZoom + delta));

        if (newZoom !== oldZoom) {
          const el = dropZoneRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const ratio = newZoom / oldZoom;
            const newPanX = mouseX - (mouseX - (panXRef.current + 16)) * ratio - 16;
            const newPanY = mouseY - (mouseY - (panYRef.current + 16)) * ratio - 16;
            setZoom(newZoom);
            setPan(newPanX, newPanY);
          }
        } else {
          setZoom(newZoom);
        }
      }
    };
    const el = dropZoneRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [setZoom, setPan]);

  return (
    <div
      ref={combinedRef}
      data-role="canvas-viewport"
      className={`flex flex-1 min-h-0 overflow-hidden ${isOver ? "bg-blue-50/30" : ""}`}
    >
      <CanvasRenderer
        components={components}
        selectedIds={selectedIds}
        hoveredId={hoveredId}
        onSelect={selectComponent}
        onClearSelection={clearSelection}
        onResize={resizeComponent}
        onHover={setHoveredId}
        zoom={zoom}
        viewportWidth={viewportWidth}
        panX={panX}
        panY={panY}
        onPan={(x, y) => setPan(x, y)}
        gridCols={gridCols}
        gridGap={gridGap}
        pageBackground={pageBackground}
        pagePadding={pagePadding}
        pageMaxWidth={pageMaxWidth}
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
    moveComponent,
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
    pageMaxWidth,
    clearSelection,
    zoom,
    panX,
    panY,
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

  const componentsRef = useRef(components);
  componentsRef.current = components;
  const panXRef = useRef(panX);
  panXRef.current = panX;
  const panYRef = useRef(panY);
  panYRef.current = panY;
  const zoomRef2 = useRef(zoom);
  zoomRef2.current = zoom;

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

  function canComponentAcceptChildren(type: string): boolean {
    return COMPONENT_TYPES_THAT_SUPPORT_CHILDREN.has(type);
  }

  /**
   * 拖拽结束处理
   *
   * 处理三种拖拽场景：
   * 1. 从画布拖拽组件到画布另一位置（canvas-component → canvas-drop-zone）
   * 2. 从画布拖拽组件到容器组件（canvas-component → canvas-container:*）
   * 3. 从素材面板拖拽新组件到画布（material → canvas-drop-zone）
   *
   * 均使用 event.delta 计算精确的网格坐标，缩放校正基于当前 zoom。
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
      const { delta } = event;

      const curComponents = componentsRef.current;
      const curZoom = zoomRef2.current;

      if (dragType === "canvas-component" && draggedNodeId) {
        if (overId === "canvas-drop-zone") {
          const comp = curComponents.find((c) => c.id === draggedNodeId);
          if (comp) {
            const newX = comp.position.x + delta.x / (CANVAS_CELL_SIZE * curZoom);
            const newY = comp.position.y + delta.y / (CANVAS_CELL_HEIGHT * curZoom);
            moveComponent(draggedNodeId, newX, newY);
          }
          return;
        }
        if (overId.startsWith("canvas-container:")) {
          const containerId = overId.replace(/^canvas-container:/, "");
          if (containerId) {
            const container = curComponents.find((c) => c.id === containerId);
            if (container && canComponentAcceptChildren(container.node.type)) {
              moveNode(draggedNodeId, { parentId: containerId });
            }
          }
          return;
        }
        return;
      }

      if (dragType === "material" && materialName && overId === "canvas-drop-zone") {
        const material = registry.get(materialName);
        const category = materialMap.get(materialName)?.category ?? material?.category ?? "layout";
        const defaultProps = material?.defaultProps ?? {};
        const node = createComponentNode(materialName, category, { ...defaultProps });
        insertNode(node, { parentId: null, index: curComponents.length });
        const x = Math.max(1, Math.round(delta.x / (CANVAS_CELL_SIZE * curZoom)));
        const y = Math.max(1, Math.round(delta.y / (CANVAS_CELL_HEIGHT * curZoom)));
        moveComponent(node.id, x, y);
        return;
      }
    },
    [insertNode, materialMap, moveComponent, moveNode, parseTreeDropTarget, registry],
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
      hydratePartial.pageMaxWidth = typeof current.schema.pageMaxWidth === "number" && current.schema.pageMaxWidth > 0 ? current.schema.pageMaxWidth : null;
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
    useProjectPagesStore.getState().syncCurrentPageFromCanvas({ components, pageBackground, pagePadding, pageMaxWidth });
    useProjectPagesStore.getState().scheduleAutosave(30_000);
  }, [components, isPageMode, pageBackground, pagePadding, pageMaxWidth]);

  // 全局键盘快捷键（仅当不在输入框内且处于 pages 模式时生效）
  useEffect(() => {
    if (!isPageMode) return;
    function handleKeyDown(e: KeyboardEvent) {
      // 在输入框/文本域中不拦截快捷键
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.target instanceof HTMLElement && e.target.isContentEditable) return;

      // Ctrl+S（或 Cmd+S）立即保存当前页面
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        useProjectPagesStore.getState().flushAutosave();
        return;
      }
      // 按下 Escape 清除当前选中
      if (e.key === "Escape") {
        e.preventDefault();
        clearSelection();
        return;
      }
      // 方向键微调选中组件在网格中的位置
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const deltas: Record<string, [number, number]> = {
          ArrowLeft: [-step, 0],
          ArrowRight: [step, 0],
          ArrowUp: [0, -step],
          ArrowDown: [0, step],
        };
        const [dx, dy] = deltas[e.key];
        const curComponents = useCanvasStore.getState().components;
        const curSelectedIds = useCanvasStore.getState().selectedIds;
        for (const id of curSelectedIds) {
          const comp = curComponents.find((c) => c.id === id);
          if (!comp) continue;
          moveComponent(id, comp.position.x + dx, comp.position.y + dy);
        }
        return;
      }
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
  }, [clearSelection, copySelected, cutSelected, deleteSelected, isPageMode, pasteClipboard, undo, redo]);


  // ===== 自定义 autoScroll：拖拽到画布边缘时自动平移 =====
  // 由于画布使用 overflow-hidden + transform 实现平移，非原生 scroll，
  // 因此不能依赖 dnd-kit 的 autoScroll props（依赖原生 scroll 事件），需自行实现。
  // 原理：onDragMove 中检测鼠标距画布边界的距离，计算出平移方向/速度存入 ref，
  //       由 requestAnimationFrame 循环持续读取该 ref 并调用 setPan。
  const scrollDirRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // rAF 循环：持续读取 scrollDirRef 并调用 setPan，实现平滑平移
  useEffect(() => {
    function tick() {
      const dir = scrollDirRef.current;
      if (dir.x !== 0 || dir.y !== 0) {
        const state = useCanvasStore.getState();
        state.setPan(state.panX + dir.x, state.panY + dir.y);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // 拖拽移动中检测鼠标是否位于画布边缘，计算需要自动平移的方向和速度
  const handleDragMove = useCallback((event: DragMoveEvent) => {
    // 仅对画布组件重排或从素材面板拖拽新组件到画布时启用自动平移
    const dragType = event.active.data.current?.type;
    if (dragType !== "canvas-component" && dragType !== "material") {
      scrollDirRef.current = { x: 0, y: 0 };
      return;
    }

    const me = event.activatorEvent;
    if (!(me instanceof MouseEvent)) return;

    // 查找画布容器的 DOM 边界
    const el = document.querySelector<HTMLElement>('[data-role="canvas-viewport"]');
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // 边缘触发阈值（像素）和最大平移速度（像素/帧）
    const EDGE_THRESHOLD = 30;
    const MAX_SPEED = 15;

    // 计算鼠标距画布四边的距离，越靠近边缘平移速度越快
    const distLeft = me.clientX - rect.left;
    const distRight = rect.right - me.clientX;
    const distTop = me.clientY - rect.top;
    const distBottom = rect.bottom - me.clientY;

    let dx = 0;
    let dy = 0;

    if (distLeft < EDGE_THRESHOLD) {
      dx = -MAX_SPEED * (1 - distLeft / EDGE_THRESHOLD);
    } else if (distRight < EDGE_THRESHOLD) {
      dx = MAX_SPEED * (1 - distRight / EDGE_THRESHOLD);
    }

    if (distTop < EDGE_THRESHOLD) {
      dy = -MAX_SPEED * (1 - distTop / EDGE_THRESHOLD);
    } else if (distBottom < EDGE_THRESHOLD) {
      dy = MAX_SPEED * (1 - distBottom / EDGE_THRESHOLD);
    }

    scrollDirRef.current = { x: dx, y: dy };
  }, []);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const name = event.active.data.current?.materialName as string | undefined
      ?? event.active.data.current?.componentId as string | undefined;
    setActiveDragId(name ?? null);
  }, []);
  const handleDragEndWrapper = useCallback((event: DragEndEvent) => {
    setActiveDragId(null);
    // 停止 autoScroll 平移
    scrollDirRef.current = { x: 0, y: 0 };
    handleDragEnd(event);
  }, [handleDragEnd]);

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar />
      {isPageMode ? (
        <DndContext
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEndWrapper}
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
          <DragOverlay dropAnimation={null}>
            {activeDragId && (
              <div className="flex items-center gap-2 rounded-md border border-blue-400 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 shadow-lg">
                <span>⊕</span>
                <span>{activeDragId}</span>
              </div>
            )}
          </DragOverlay>
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
