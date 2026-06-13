"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  DndContext,
  useDroppable,
  pointerWithin,
  type DragEndEvent,
} from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { useCanvasStore, createCanvasComponent, CanvasRenderer } from "@envelope/engine";
import { useEditorStore } from "@/stores/editor";
import { EditorToolbar } from "./editor-toolbar";
import { MaterialPanel } from "./material-panel";
import { RightPanel } from "./right-panel";

function CanvasDropZone() {
  const zoom = useEditorStore((_s) => 1);
  const { components, selectedIds, selectComponent, clearSelection } = useCanvasStore();

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 overflow-auto bg-muted/30 p-4 ${isOver ? "bg-blue-50/50" : ""}`}
    >
      <CanvasRenderer
        components={components}
        selectedIds={selectedIds}
        onSelect={selectComponent}
        onClearSelection={clearSelection}
        zoom={zoom}
      />
    </div>
  );
}

export function EditorLayout() {
  const { leftPanelCollapsed, rightPanelCollapsed, pushSnapshot } = useEditorStore();
  const { addComponent, copySelected, deleteSelected } = useCanvasStore();

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

      const comp = createCanvasComponent(materialName, category, {});
      pushSnapshot();
      addComponent(comp);
    },
    [addComponent, pushSnapshot, materialMap],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        pushSnapshot();
        copySelected();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        pushSnapshot();
        deleteSelected();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copySelected, deleteSelected, pushSnapshot]);

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar />
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        autoScroll={false}
      >
        <div className="flex flex-1 overflow-hidden">
          <MaterialPanel collapsed={leftPanelCollapsed} />
          <CanvasDropZone />
          <RightPanel collapsed={rightPanelCollapsed} />
        </div>
      </DndContext>
    </div>
  );
}
