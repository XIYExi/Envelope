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
import { createDefaultRegistry, NestingValidator } from "@envelope/materials";
import { useCanvasStore, createComponentNode, CanvasRenderer, VIEWPORT_WIDTHS, CANVAS_CELL_SIZE, CANVAS_CELL_HEIGHT, isContainerType, findNodeLocation, Dragon, CanvasScroller, PluginManager, createModuleEventBus, EventBus, computeColumnWidth, RULER_SIZE, type CanvasSnapshot, type ComponentNode, type DropTargetInfo } from "@envelope/engine";
import type { EditorEventMap } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { useProjectPagesStore, componentNodesToCanvasComponents } from "@/stores/project-pages";
import { useProjectFlowsStore } from "@/stores/project-flows";
import { EditorToolbar } from "./editor-toolbar";
import { MaterialPanel } from "./material-panel";
import { RightPanel } from "./right-panel";
import { LeftPanel } from "./left-panel";
import { ResizeHandle } from "./ResizeHandle";
import { DataModelPlugin } from "./data-model-plugin";
import { RoutingPlugin } from "./routing-plugin";
import { FlowPlugin } from "./flow-plugin";
import { ApiPlugin } from "./api-plugin";
import { useFlowBindingStore } from "@envelope/flow";
import { Input } from "@/components/ui/input";
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
import { KeyboardShortcutsDialog } from "./keyboard-shortcuts-dialog";
import { toast } from "sonner";

/**
 * 画布放置区域组件
 *
 * 注册为 DnD Kit 的可放置区域，接收从素材面板拖来的组件。
 * 处理 Ctrl+滚轮缩放，渲染 CanvasRenderer 并传递所有画布状态。
 */
const CanvasDropZone = memo(function CanvasDropZone({ dragAlignInfo, dragon }: {
  dragAlignInfo: { gridX: number; gridY: number; gridWidth: number; gridHeight: number } | null;
  dragon: Dragon | null;
}) {
  const {
    components, selectedIds, activeNodeId, selectComponent, clearSelection,
    zoom, viewport, panX, panY, gridCols, gridGap,
    pageBackground, pagePadding, pageMaxWidth,
    resizeComponent, setZoom, setPan,
    selectNode, editScope, enterChildEdit, minRowHeight, positionMode,
  } = useCanvasStore();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);

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

  /** 双击容器组件时构建从根到目标的面包屑路径 */
  const handleDoubleClickComponent = useCallback((compId: string) => {
    const path: { id: string; type: string }[] = [];
    let currentId: string | null = compId;
    while (currentId) {
      const loc = findNodeLocation(components, currentId);
      if (!loc) break;
      path.unshift({ id: loc.node.id, type: loc.node.type });
      if (loc.kind === "root") break;
      currentId = loc.parentId;
    }
    enterChildEdit(compId, path);
  }, [components, enterChildEdit]);

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
        activeNodeId={activeNodeId}
        editScope={editScope}
        hoveredId={hoveredId}
        onSelect={selectComponent}
        onClearSelection={clearSelection}
        onSelectChild={(nodeId) => selectNode(nodeId)}
        onDoubleClickComponent={handleDoubleClickComponent}
        onExitChildEdit={() => useCanvasStore.getState().exitChildEdit()}
        onResize={resizeComponent}
        onHover={(id) => { if (!isResizing) setHoveredId(id); }}
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
        minRowHeight={minRowHeight}
        dragAlignInfo={dragAlignInfo}
        positionMode={positionMode}
        onResizeStart={() => { setIsResizing(true); if (dragon) dragon.detecting.enable = false; }}
        onResizeEnd={() => { setIsResizing(false); if (dragon) dragon.detecting.enable = true; }}
        isDragging={dragon?.isDragging ?? false}
        isResizing={isResizing}
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
    leftPanelWidth, rightPanelWidth,
    setLeftPanelWidth, setRightPanelWidth,
    editorMode,
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

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const renamingIdRef = useRef<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 同步 renamingId 到 ref，供键盘事件处理函数读取最新值
  useEffect(() => {
    renamingIdRef.current = renamingId;
  }, [renamingId]);

  const registry = useMemo(() => createDefaultRegistry(), []);

  // 编辑器模式切换时通过 EventBus 通知各模块
  useEffect(() => {
    editorBusRef.current?.emit('editor:modeChange', { mode: editorMode });
  }, [editorMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // Dragon 拖拽引擎（跨渲染周期保持单例）
  const dragonRef = useRef<Dragon | null>(null);
  if (!dragonRef.current) {
    dragonRef.current = new Dragon({
      scroller: new CanvasScroller({
        onScroll: (dx, dy) => {
          const s = useCanvasStore.getState();
          s.setPan(s.panX + dx, s.panY + dy);
        },
      }),
    });
  }
  const dragon = dragonRef.current;

  // 编辑器级事件总线（跨渲染周期保持单例）
  const editorBusRef = useRef<EventBus<EditorEventMap> | null>(null);
  if (!editorBusRef.current) {
    editorBusRef.current = createModuleEventBus<EditorEventMap>('Editor');
  }

  // 插件管理器（跨渲染周期保持单例）
  const pluginManagerRef = useRef<PluginManager | null>(null);
  if (!pluginManagerRef.current) {
    const pm = new PluginManager();
    pm.register('DataModelPlugin', DataModelPlugin, { name: 'DataModelPlugin', slots: ['main-area', 'left-nav'] });
    pm.register('RoutingPlugin',   RoutingPlugin,   { name: 'RoutingPlugin',   slots: ['main-area', 'left-nav'] });
    pm.register('FlowPlugin',      FlowPlugin,      { name: 'FlowPlugin',      slots: ['main-area', 'left-nav'] });
    pm.register('ApiPlugin',       ApiPlugin,       { name: 'ApiPlugin',       slots: ['main-area', 'left-nav'] });
    pm.init();
    pluginManagerRef.current = pm;
  }

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
    return isContainerType(type);
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

      // G10: 页面拖拽重排
      if (active.data.current?.type === "page") {
        if (overId.startsWith("page-drop:")) {
          const parts = overId.split(":");
          const toIndex = Number(parts[1]);
          if (!isNaN(toIndex)) {
            const { pages, reorderPages } = useProjectPagesStore.getState();
            const fromIndex = pages.findIndex((p) => p.path === active.data.current?.path);
            if (fromIndex >= 0 && fromIndex !== toIndex) {
              reorderPages(fromIndex, toIndex);
            }
          }
        }
        return;
      }

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
            const cs = useCanvasStore.getState();
            const viewportW = VIEWPORT_WIDTHS[cs.viewport];
            const dynColW = computeColumnWidth({ viewportWidth: viewportW - RULER_SIZE, pageMaxWidth: cs.pageMaxWidth, pagePadding: cs.pagePadding ?? 0, gridCols: cs.gridCols, gridGap: cs.gridGap });
            const newX = Math.round(comp.position.x + delta.x / (dynColW * curZoom));
            const newY = Math.round(comp.position.y + delta.y / (CANVAS_CELL_HEIGHT * curZoom));
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

        // 校验嵌套合法性：拖入 canvas-drop-zone 时 parent 为根级（无容器约束），跳过校验
        // 拖入容器时需要校验，容器 ID 从 overId 解析
        if (overId.startsWith("canvas-container:")) {
          const containerId = overId.replace(/^canvas-container:/, "");
          const containerComp = curComponents.find((c) => c.id === containerId);
          if (containerComp && materialName) {
            const allowed = NestingValidator.checkChildAllowed(
              containerComp.node.type, materialName,
              (name) => registry.get(name),
            );
            if (!allowed) {
              toast.error(`"${materialName}" 不能放在 "${containerComp.node.type}" 内部`, {
                description: `无法放置`,
              });
              return;
            }
          }
        }

        const node = createComponentNode(materialName, category, { ...defaultProps });
        // 使用动态列宽计算网格坐标（而非 CANVAS_CELL_SIZE=80 硬编码）
        const cs = useCanvasStore.getState();
        const viewportW = VIEWPORT_WIDTHS[cs.viewport];
        const dynColW = computeColumnWidth({ viewportWidth: viewportW - RULER_SIZE, pageMaxWidth: cs.pageMaxWidth, pagePadding: cs.pagePadding ?? 0, gridCols: cs.gridCols, gridGap: cs.gridGap });
        const x = Math.max(1, Math.round(delta.x / (dynColW * curZoom)));
        const y = Math.max(1, Math.round(delta.y / (CANVAS_CELL_HEIGHT * curZoom)));
        insertNode(node, {
          parentId: null,
          index: curComponents.length,
          position: { x, y, width: 3, height: 2 },
        });
        // 通过 EventBus 通知其他模块组件已放置
        editorBusRef.current?.emit('canvas:drop', { component: node, target: null });
        return;
      }

      // 画布内组件移动完成后通知（仅通知移动，不重复 emit drop）
      if (dragType === "canvas-component" && draggedNodeId) {
        editorBusRef.current?.emit('canvas:drop', { component: { id: draggedNodeId }, target: null });
      }
    },
    [insertNode, materialMap, moveComponent, moveNode, parseTreeDropTarget, registry, editorBusRef],
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
    useProjectPagesStore.getState().scheduleAutosave(5_000);
  }, [components, isPageMode, pageBackground, pagePadding, pageMaxWidth]);

  // 全局键盘快捷键（仅当不在输入框内且处于 pages 模式时生效）
  useEffect(() => {
    if (!isPageMode) return;
    function handleKeyDown(e: KeyboardEvent) {
      // 在输入框/文本域中不拦截快捷键
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
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
        const delta = deltas[e.key];
        if (!delta) return;
        const [dx, dy] = delta;
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
      // Ctrl+D 快速复制
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        copySelected();
        pasteClipboard();
        return;
      }
      // Ctrl+A 全选所有可见组件
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        useCanvasStore.getState().selectAll();
        return;
      }
      // Ctrl+= 放大
      if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "Equal" || e.key === "NumpadAdd")) {
        e.preventDefault();
        const currentZoom = useCanvasStore.getState().zoom;
        useCanvasStore.getState().setZoom(Math.min(2, currentZoom + 0.1));
        return;
      }
      // Ctrl+- 缩小
      if ((e.ctrlKey || e.metaKey) && (e.key === "-" || e.key === "Minus" || e.key === "NumpadSubtract")) {
        e.preventDefault();
        const currentZoom = useCanvasStore.getState().zoom;
        useCanvasStore.getState().setZoom(Math.max(0.25, currentZoom - 0.1));
        return;
      }
      // Ctrl+0 重置缩放和平移
      if ((e.ctrlKey || e.metaKey) && (e.key === "0" || e.key === "Numpad0")) {
        e.preventDefault();
        useCanvasStore.getState().setZoom(1);
        useCanvasStore.getState().setPan(0, 0);
        return;
      }
      // Tab / Shift+Tab 循环切换选中
      if (e.key === "Tab") {
        e.preventDefault();
        const state = useCanvasStore.getState();
        const visible = state.components.filter((c) => !c.hidden);
        if (visible.length === 0) return;
        const lastSelected = state.selectedIds[state.selectedIds.length - 1];
        const currentIndex = lastSelected ? visible.findIndex((c) => c.id === lastSelected) : -1;
        const nextIndex = currentIndex === -1
          ? (e.shiftKey ? visible.length - 1 : 0)
          : e.shiftKey
            ? (currentIndex - 1 + visible.length) % visible.length
            : (currentIndex + 1) % visible.length;
        const nextComp = visible[nextIndex];
        if (nextComp) state.selectComponent(nextComp.id);
        return;
      }
      // F2 内联重命名选中组件
      if (e.key === "F2") {
        e.preventDefault();
        const state = useCanvasStore.getState();
        const id = state.activeNodeId ?? state.selectedIds[0] ?? null;
        if (id) setRenamingId(id);
        return;
      }
      // ? (Shift+/) 打开快捷键帮助面板
      if (e.key === "/" && e.shiftKey) {
        e.preventDefault();
        setHelpOpen(true);
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        const canvasState = useCanvasStore.getState();
        if (canvasState.historyPast.length >= canvasState.historyLimit) {
          setDeleteConfirmOpen(true);
        } else {
          deleteSelected();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearSelection, copySelected, cutSelected, deleteSelected, isPageMode, pasteClipboard, undo, redo]);


  // 拖拽移动中计算插入位置、自动滚动、对齐辅助线（B10）
  // 自动滚动由 Dragon.onDragMove 内部协调 CanvasScroller
  // 通过 onScroll 回调 → store.setPan 实现
  const handleDragMove = useCallback((event: DragMoveEvent) => {
    const dragType = event.active.data.current?.type;
    if (dragType !== "canvas-component" && dragType !== "material") {
      useCanvasStore.getState().setDropTarget(null);
      setDragAlignInfo(null);
      return;
    }

    const el = document.querySelector<HTMLElement>('[data-role="canvas-viewport"]');
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const cs = useCanvasStore.getState();
    const viewportW = VIEWPORT_WIDTHS[cs.viewport];
    const padding = typeof cs.pagePadding === "number" ? cs.pagePadding : 0;
    const colW = computeColumnWidth({ viewportWidth: viewportW - RULER_SIZE, pageMaxWidth: cs.pageMaxWidth, pagePadding: padding, gridCols: cs.gridCols, gridGap: cs.gridGap });

    // 获取 canvas-grid 的 bounding rect 用于 Location 坐标归一化
    const gridEl = document.querySelector<HTMLElement>('[data-testid="canvas-grid"]');
    const gridRect = gridEl?.getBoundingClientRect();

    const result = dragon.onDragMove(
      event,
      {
        zoom: zoomRef2.current,
        components: componentsRef.current,
        selectedIds: cs.selectedIds,
        gridCols: cs.gridCols,
        positionMode: cs.positionMode,
        domRects: cs.domRects,
        gridRect,
      },
      {
        width: viewportW,
        padding,
        gap: cs.gridGap,
        cellWidth: CANVAS_CELL_SIZE,
        cellHeight: CANVAS_CELL_HEIGHT,
        columnWidth: colW,
      },
      rect,
    );

    setDragAlignInfo(result.alignInfo);
    useCanvasStore.getState().setDropTarget(result.dropTarget);
  }, [dragon]);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  // B10: 拖拽对齐辅助线 — 存储被拖组件的网格坐标用于计算对齐
  const [dragAlignInfo, setDragAlignInfo] = useState<{
    gridX: number; gridY: number; gridWidth: number; gridHeight: number;
  } | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    dragon.onDragStart(event);
    const name = dragon.activeId;
    setActiveDragId(name);
  }, [dragon]);
  const handleDragEndWrapper = useCallback((event: DragEndEvent) => {
    dragon.onDragEnd();
    setActiveDragId(null);
    setDragAlignInfo(null);
    useCanvasStore.getState().setDropTarget(null);
    handleDragEnd(event);
  }, [handleDragEnd, dragon]);

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
            {!leftPanelCollapsed ? <LeftPanel collapsed={leftPanelCollapsed} /> : null}
            {!leftPanelCollapsed && (
              <ResizeHandle edge="right" panelWidth={leftPanelWidth} collapsed={false} minWidth={160} maxWidth={400} onResize={(w) => setLeftPanelWidth?.(w)} />
            )}
            <MaterialPanel collapsed={leftPanelCollapsed} onAddMaterial={handleAddMaterial} />
            <CanvasDropZone dragAlignInfo={dragAlignInfo} dragon={dragon} />
            {!rightPanelCollapsed && (
              <ResizeHandle edge="left" panelWidth={rightPanelWidth} collapsed={false} minWidth={200} maxWidth={480} onResize={(w) => setRightPanelWidth?.(w)} />
            )}
            {!rightPanelCollapsed ? <RightPanel /> : null}
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
          {!leftPanelCollapsed ? (
            <LeftPanel
              collapsed={leftPanelCollapsed}
              pluginNavItems={pluginManagerRef.current?.getSkeleton().getItems('left-nav') ?? []}
            />
          ) : null}
          <div className="flex-1 overflow-hidden">
            {(() => {
              const mainItems = pluginManagerRef.current?.getSkeleton().getItems('main-area') ?? [];
              const CurrentComponent = mainItems.find((i) => i.name === editorMode)?.component;
              return CurrentComponent ? <CurrentComponent /> : null;
            })()}
          </div>
          {!rightPanelCollapsed ? <RightPanel /> : null}
        </div>
      )}
      {/* F2 内联重命名输入框 */}
      {renamingId && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setRenamingId(null)}>
          <Input
            autoFocus
            defaultValue={(() => {
              const comps = useCanvasStore.getState().components;
              for (const comp of comps) {
                if (comp.id === renamingId) return comp.node.name ?? "";
              }
              return "";
            })()}
            className="w-64"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const state = useCanvasStore.getState();
                state.updateNode(renamingId, { name: e.currentTarget.value });
                setRenamingId(null);
              }
              if (e.key === "Escape") setRenamingId(null);
              e.stopPropagation();
            }}
            onBlur={(e) => {
              if (renamingId) {
                const state = useCanvasStore.getState();
                state.updateNode(renamingId, { name: e.target.value });
              }
              setRenamingId(null);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <KeyboardShortcutsDialog open={helpOpen} onOpenChange={setHelpOpen} />
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
    </div>
  );
}
