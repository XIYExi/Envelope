import { create } from "zustand";
import type { EditorState, EditorActions } from "./editor.types";

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
  selectedComponentId: null,
  canvasScale: 1,
  canvasViewport: "desktop",
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  activePanelTab: "components",
  isDirty: false,

  selectComponent: (id) => set({ selectedComponentId: id }),
  setCanvasScale: (canvasScale) => set({ canvasScale }),
  setCanvasViewport: (canvasViewport) => set({ canvasViewport }),
  toggleLeftPanel: () => set((s) => ({ leftPanelCollapsed: !s.leftPanelCollapsed })),
  toggleRightPanel: () => set((s) => ({ rightPanelCollapsed: !s.rightPanelCollapsed })),
  setActivePanelTab: (activePanelTab) => set({ activePanelTab }),
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
}));
