/**
 * 编辑器全局状态管理（Zustand + persist）
 *
 * 管理编辑器级别的 UI 状态：面板折叠、视图模式、撤销/重做历史。
 * 与画布级状态（useCanvasStore）分离 —— 前者管编辑器壳，后者管画布内容。
 *
 * @author xiye
 * @date 2026-06-14
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EditorState, EditorActions, EditorSnapshot, EditorMode } from "./editor.types";

/**
 * 从当前编辑器状态中提取快照
 *
 * 仅捕获需要参与撤销/重做的编辑器 UI 状态字段。
 * 注意：此快照不包含画布组件数据，撤销仅恢复编辑器壳状态。
 */
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

/**
 * 编辑器 Store
 *
 * 使用 Zustand persist 中间件持久化用户 UI 偏好（面板状态、视口选择等）。
 * 瞬时态（历史栈、撤销/重做标记）不参与持久化。
 */
export const useEditorStore = create<EditorState & EditorActions>()(
  persist(
    (set, get) => ({
      // ========== 初始状态 ==========
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

      // ========== 基础状态修改 ==========

      /** 选中画布组件 */
      selectComponent: (id) => set({ selectedComponentId: id }),

      /** 设置画布缩放比例 */
      setCanvasScale: (canvasScale) => set({ canvasScale }),

      /** 设置画布视口预设 */
      setCanvasViewport: (canvasViewport) => set({ canvasViewport }),

      /** 切换左侧面板 */
      toggleLeftPanel: () => set((s) => ({ leftPanelCollapsed: !s.leftPanelCollapsed })),

      /** 切换右侧面板 */
      toggleRightPanel: () => set((s) => ({ rightPanelCollapsed: !s.rightPanelCollapsed })),

      /** 设置属性面板标签页 */
      setActivePanelTab: (activePanelTab) => set({ activePanelTab }),

      /** 设置编辑器主模式 */
      setEditorMode: (editorMode) => set({ editorMode }),

      /** 标记为有未保存修改 */
      markDirty: () => set({ isDirty: true }),

      /** 标记为已保存 */
      markClean: () => set({ isDirty: false }),

      // ========== 撤销/重做历史栈 ==========

      /**
       * 将当前编辑器状态压入历史栈
       *
       * 应在可能改变编辑器 UI 状态的操作之前调用。
       * 注意：此方法仅保存编辑器壳状态，
       * 不保存画布组件数据（画布数据有独立的撤销机制）。
       */
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

      /**
       * 撤销到上一个历史快照
       *
       * 将编辑器 UI 状态恢复到上一个 pushSnapshot 时的状态。
       * 边界保护：historyIndex < 0 时不执行任何操作。
       */
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

      /**
       * 重做到下一个历史快照
       *
       * 边界保护：historyIndex >= history.length - 1 时不执行任何操作。
       */
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
      /**
       * 持久化过滤器
       *
       * 排除瞬时态字段（历史栈、撤销/重做标记），
       * 仅持久化用户 UI 偏好。
       */
      partialize: (state) => {
        const { history, historyIndex, canUndo, canRedo, ...persisted } = state;
        return persisted;
      },
    },
  ),
);
