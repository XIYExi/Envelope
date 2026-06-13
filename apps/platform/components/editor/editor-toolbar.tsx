"use client";

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
  MousePointer2,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import type { EditorState } from "@/stores/editor.types";

const viewportIcons: Record<EditorState["canvasViewport"], React.ReactNode> = {
  desktop: <Monitor className="h-4 w-4" />,
  tablet: <Tablet className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  fluid: <MousePointer2 className="h-4 w-4" />,
};

const viewportLabels: Record<EditorState["canvasViewport"], string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
  fluid: "Fluid",
};

const viewports = ["desktop", "tablet", "mobile", "fluid"] as const;

export function EditorToolbar() {
  const {
    canvasViewport,
    setCanvasViewport,
    toggleLeftPanel,
    toggleRightPanel,
    leftPanelCollapsed,
    rightPanelCollapsed,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useEditorStore();

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
            variant={canvasViewport === vp ? "secondary" : "ghost"}
            size="sm"
            className="h-7 rounded-none px-2 first:rounded-l-md last:rounded-r-md"
            onClick={() => setCanvasViewport(vp)}
            title={viewportLabels[vp]}
          >
            {viewportIcons[vp]}
          </Button>
        ))}
      </div>

      <div className="flex-1" />

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
