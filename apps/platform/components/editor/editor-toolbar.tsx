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

const viewportIcons: Record<CanvasState["viewport"], React.ReactNode> = {
  desktop: <Monitor className="h-4 w-4" />,
  tablet: <Tablet className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  fluid: <Monitor className="h-4 w-4" />,
};

const viewportLabels: Record<CanvasState["viewport"], string> = {
  desktop: "Desktop (1440px)",
  tablet: "Tablet (768px)",
  mobile: "Mobile (375px)",
  fluid: "Fluid",
};

const viewports: CanvasState["viewport"][] = ["desktop", "tablet", "mobile", "fluid"];

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
  } = useEditorStore();

  const handleDelete = () => {
    pushSnapshot();
    deleteSelected();
  };

  const handleViewportChange = (vp: CanvasState["viewport"]) => {
    setViewport(vp);
  };

  return (
    <div className="flex h-10 items-center gap-1 border-b bg-background px-2">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleLeftPanel}>
        {leftPanelCollapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </Button>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!canUndo} onClick={undo}>
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!canRedo} onClick={redo}>
        <Redo2 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-5" />

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

      <span className="ml-1 text-[10px] text-muted-foreground">
        {components.length} components
      </span>

      <div className="flex-1" />

      {selectedIds.length > 0 && (
        <>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-5" />
        </>
      )}

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
