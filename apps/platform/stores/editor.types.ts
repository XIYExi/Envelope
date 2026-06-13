export interface Project {
  id: string;
  name: string;
  description: string;
  schemaVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  selectedComponentId: string | null;
  canvasScale: number;
  canvasViewport: "mobile" | "tablet" | "desktop" | "fluid";
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  activePanelTab: string;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  history: EditorSnapshot[];
  historyIndex: number;
}

export interface EditorSnapshot {
  selectedComponentId: string | null;
  canvasScale: number;
  canvasViewport: "mobile" | "tablet" | "desktop" | "fluid";
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  activePanelTab: string;
  isDirty: boolean;
}

export interface EditorActions {
  selectComponent: (id: string | null) => void;
  setCanvasScale: (scale: number) => void;
  setCanvasViewport: (viewport: EditorState["canvasViewport"]) => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  setActivePanelTab: (tab: string) => void;
  markDirty: () => void;
  markClean: () => void;
  pushSnapshot: () => void;
  undo: () => void;
  redo: () => void;
}
