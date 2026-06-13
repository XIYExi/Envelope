"use client";

import { useEditorStore } from "@/stores/editor";
import { EditorToolbar } from "./editor-toolbar";
import { LeftPanel } from "./left-panel";
import { EditorCanvas } from "./editor-canvas";
import { RightPanel } from "./right-panel";

export function EditorLayout() {
  const { leftPanelCollapsed, rightPanelCollapsed } = useEditorStore();

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel collapsed={leftPanelCollapsed} />
        <EditorCanvas />
        <RightPanel collapsed={rightPanelCollapsed} />
      </div>
    </div>
  );
}
