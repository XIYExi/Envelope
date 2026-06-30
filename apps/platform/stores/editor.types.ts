/**
 * 编辑器 Zustand 状态管理类型定义
 *
 * 定义了编辑器级状态（面板折叠、视图模式、撤销/重做等）的 TypeScript 类型，
 * 与画布级状态（组件、选中、缩放等）分离，各司其职。
 *
 * @author xiye
 * @date 2026-06-14
 */

/** 项目元数据 */
export interface Project {
  id: string;
  name: string;
  description: string;
  schemaVersion: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 编辑器主模式
 *
 * - "pages": 页面可视化编辑（默认）
 * - "data-models": 数据模型定义
 * - "routing": 路由配置
 * - "flows": 业务流程编排（开发中）
 * - "api": API 端点管理（开发中）
 */
export type EditorMode = "pages" | "data-models" | "routing" | "flows" | "api";

/**
 * 编辑器运行时状态
 *
 * 所有持久化的 UI 状态字段，不包括瞬时态（历史栈、索引、可撤销状态）。
 */
export interface EditorState {
  /** 当前在属性面板中选中的组件 ID */
  selectedComponentId: string | null;
  /** 画布缩放比例（0.25-2.0） */
  canvasScale: number;
  /** 左侧导航面板是否折叠 */
  leftPanelCollapsed: boolean;
  /** 右侧属性面板是否折叠 */
  rightPanelCollapsed: boolean;
  /** 左侧面板宽度（px） */
  leftPanelWidth: number;
  /** 右侧面板宽度（px） */
  rightPanelWidth: number;
  /** 属性面板当前激活的标签页 */
  activePanelTab: string;
  /** 编辑器当前主模式 */
  editorMode: EditorMode;
  /** 是否有未保存的修改 */
  isDirty: boolean;
  /** 是否可以执行撤销操作（瞬时态，不持久化） */
  canUndo: boolean;
  /** 是否可以执行重做操作（瞬时态，不持久化） */
  canRedo: boolean;
  /** 撤销历史栈（瞬时态，不持久化） */
  history: EditorSnapshot[];
  /** 历史栈当前索引（-1 表示无历史记录） */
  historyIndex: number;
}

/**
 * 编辑器快照
 *
 * pushSnapshot 时捕获的状态子集，用于撤销/重做。
 * 仅包含编辑器级 UI 状态，不包含画布组件级数据。
 */
export interface EditorSnapshot {
  /** 当前选中的组件 ID */
  selectedComponentId: string | null;
  /** 画布缩放比例 */
  canvasScale: number;
  /** 左侧导航面板是否折叠 */
  leftPanelCollapsed: boolean;
  /** 右侧属性面板是否折叠 */
  rightPanelCollapsed: boolean;
  /** 左侧面板宽度（px） */
  leftPanelWidth: number;
  /** 右侧面板宽度（px） */
  rightPanelWidth: number;
  /** 属性面板当前激活的标签页 */
  activePanelTab: string;
  /** 编辑器当前主模式 */
  editorMode: EditorMode;
  /** 是否有未保存的修改 */
  isDirty: boolean;
}

/**
 * 编辑器操作方法集合
 *
 * 所有修改编辑器状态的方法，通过 Zustand store 暴露给组件。
 */
export interface EditorActions {
  /** 选中画布上的一个组件（null 表示取消选中） */
  selectComponent: (id: string | null) => void;
  /** 设置画布缩放比例 */
  setCanvasScale: (scale: number) => void;
  /** 切换左侧面板折叠状态 */
  toggleLeftPanel: () => void;
  /** 切换右侧面板折叠状态 */
  toggleRightPanel: () => void;
  /** 设置左侧面板宽度 */
  setLeftPanelWidth: (width: number) => void;
  /** 设置右侧面板宽度 */
  setRightPanelWidth: (width: number) => void;
  /** 设置属性面板当前标签页 */
  setActivePanelTab: (tab: string) => void;
  /** 设置编辑器主模式 */
  setEditorMode: (mode: EditorMode) => void;
  /** 标记为有未保存修改 */
  markDirty: () => void;
  /** 标记为已保存 */
  markClean: () => void;
  /** 将当前状态压入历史栈（在变更前调用） */
  pushSnapshot: () => void;
  /** 撤销到上一个历史快照 */
  undo: () => void;
  /** 重做到下一个历史快照 */
  redo: () => void;
}
