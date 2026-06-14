"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { DndContext, useDroppable, pointerWithin, type DragEndEvent } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { useCanvasStore, createCanvasComponent, CanvasRenderer, VIEWPORT_WIDTHS } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { EditorToolbar } from "./editor-toolbar";
import { MaterialPanel } from "./material-panel";
import { RightPanel } from "./right-panel";
import { LeftPanel } from "./left-panel";

function CanvasDropZone() {
  const {
    components, selectedIds, selectComponent, clearSelection,
    zoom, viewport, panX, panY, gridCols, gridGap,
    resizeComponent, setZoom, setPan,
  } = useCanvasStore();

  const viewportWidth = VIEWPORT_WIDTHS[viewport];
  const canvasRef = useRef<HTMLDivElement>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        setZoom(zoom + delta);
      }
    };
    const el = canvasRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [zoom, setZoom]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        (canvasRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
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
}

export function EditorLayout() {
  const { leftPanelCollapsed, rightPanelCollapsed, pushSnapshot, canvasViewport } = useEditorStore();
  const { addComponent, copySelected, components, setViewport } = useCanvasStore();

  const registry = useMemo(() => createDefaultRegistry(), []);

  const materialMap = useMemo(() => {
    const map = new Map<string, { category: string }>();
    registry.getAll().forEach((m) => map.set(m.name, { category: m.category }));
    return map;
  }, [registry]);

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

  useEffect(() => {
    setViewport(canvasViewport);
  }, [canvasViewport, setViewport]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
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
        // After copying, delete selection
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
  }, [copySelected, pushSnapshot]);

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar />
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
    </div>
  );
}
