import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditorState, EditorActions, EditorSnapshot, EditorMode } from "./editor.types";

function takeSnapshot(state: EditorState): EditorSnapshot {
  return {
    selectedComponentId: state.selectedComponentId,
    canvasScale: state.canvasScale,
    canvasViewport: state.canvasViewport,
    leftPanelCollapsed: state.leftPanelCollapsed,
    rightPanelCollapsed: state.rightPanelCollapsed,
    activePanelTab: state.activePanelTab,
    editorMode: state.editorMode,
    isDirty: state.isDirty,
  };
}

export const useEditorStore = create<EditorState & EditorActions>()(
  persist(
    (set, get) => ({
      selectedComponentId: null,
      canvasScale: 1,
      canvasViewport: "desktop",
      leftPanelCollapsed: false,
      rightPanelCollapsed: false,
      activePanelTab: "components",
      editorMode: "pages" as EditorMode,
      isDirty: false,
      canUndo: false,
      canRedo: false,
      history: [] as EditorSnapshot[],
      historyIndex: -1,

      selectComponent: (id) => set({ selectedComponentId: id }),
      setCanvasScale: (canvasScale) => set({ canvasScale }),
      setCanvasViewport: (canvasViewport) => set({ canvasViewport }),
      toggleLeftPanel: () => set((s) => ({ leftPanelCollapsed: !s.leftPanelCollapsed })),
      toggleRightPanel: () => set((s) => ({ rightPanelCollapsed: !s.rightPanelCollapsed })),
      setActivePanelTab: (activePanelTab) => set({ activePanelTab }),
      setEditorMode: (editorMode) => set({ editorMode }),
      markDirty: () => set({ isDirty: true, canUndo: true }),
      markClean: () => set({ isDirty: false }),

      pushSnapshot: () => {
        const state = get();
        const snapshot = takeSnapshot(state);
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(snapshot);
        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
          canUndo: true,
          canRedo: false,
        });
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < 0) return;
        const snapshot = history[historyIndex];
        const newIndex = historyIndex - 1;
        set({
          ...snapshot,
          historyIndex: newIndex,
          canUndo: newIndex >= 0,
          canRedo: true,
        });
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex >= history.length - 1) return;
        const snapshot = history[historyIndex + 1];
        const newIndex = historyIndex + 1;
        set({
          ...snapshot,
          historyIndex: newIndex,
          canUndo: true,
          canRedo: newIndex < history.length - 1,
        });
      },
    }),
    {
      name: "editor-store",
      partialize: (state) => {
        const { history, historyIndex, canUndo, canRedo, ...persisted } = state;
        return persisted;
      },
    },
  ),
);
