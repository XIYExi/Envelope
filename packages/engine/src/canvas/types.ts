/**
 * 画布核心类型定义
 *
 * 定义画布系统的所有核心类型和接口：
 * - CanvasComponent: 画布上的单个组件，包含位置、尺寸和组件节点数据
 * - CanvasState: 画布的完整状态（缩放、平移、网格等）
 * - CanvasActions: 画布的所有操作（增删改查、缩放平移等）
 * - DragItem: 拖拽操作的数据载体
 *
 * 画布使用 12 列 CSS Grid 布局，组件位置用列/行号表示（从 1 开始）。
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { ComponentNode } from "../schemas/page.schema";

/**
 * 画布组件
 *
 * 将 ComponentNode 与画布上的位置和尺寸绑定。
 * position 的 x/y 表示网格列/行起始位置，width/height 表示列/行跨度。
 * 所有坐标基于 1（即第 1 列/行 = 1）。
 *
 * @example
 * // 一个位于第 3 列、第 1 行，占 4 列宽、2 行高的 Button 组件
 * const btn: CanvasComponent = {
 *   id: "abc-123",
 *   node: { id: "abc-123", type: "Button", category: "form", props: { label: "Click" } },
 *   position: { x: 3, y: 1, width: 4, height: 2 },
 * };
 */
export interface CanvasComponent {
  /** 画布上的组件唯一 ID（与 ComponentNode.id 对应） */
  id: string;
  /** 组件节点数据（类型、属性、子组件等） */
  node: ComponentNode;
  /** 组件在画布上的位置与尺寸（网格单位，1 为基准） */
  position: {
    /** 起始列号（1 ~ gridCols） */
    x: number;
    /** 起始行号（>= 1） */
    y: number;
    /** 列跨度（>= 1） */
    width: number;
    /** 行跨度（>= 1） */
    height: number;
  };
  /** 是否锁定（锁定后不可拖拽/缩放） */
  locked?: boolean;
  /** 是否隐藏（隐藏后在画布上不可见） */
  hidden?: boolean;
}

export interface CanvasSnapshot {
  components: CanvasComponent[];
  selectedIds: string[];
  /** 当前"主选中"的节点 ID（用于属性面板、剪贴板等单目标操作） */
  activeNodeId: string | null;
  zoom: number;
  viewport: CanvasState["viewport"];
  gridCols: number;
  gridGap: number;
  minRowHeight: number;
  panX: number;
  panY: number;
  pageBackground: string;
  pagePadding: number;
  pageMaxWidth: number | null;
  /** 子组件编辑模式作用域 */
  editScope?: { rootId: string; path: { id: string; type: string }[] } | null;
  /** 定位模式 */
  positionMode: "grid" | "free";
}

export type CanvasClipboardItem =
  | {
      kind: "canvas-component";
      component: CanvasComponent;
    }
  | {
      kind: "component-node";
      node: ComponentNode;
    };

export interface CanvasClipboard {
  mode: "copy" | "cut";
  items: CanvasClipboardItem[];
}

/**
 * 画布状态
 *
 * 包含所有影响画布渲染和交互的状态字段。
 * 通过 Zustand store 管理，与 CanvasActions 组合使用。
 */
export interface CanvasState {
  /** 画布上的所有组件 */
  components: CanvasComponent[];
  /** 当前选中的组件 ID 列表 */
  selectedIds: string[];
  /** 当前“主选中”的节点 ID（可指向根组件或任意嵌套子节点） */
  activeNodeId: string | null;
  /** 缩放比例（0.25 ~ 2.0） */
  zoom: number;
  /** 视口类型（移动端/平板/桌面/自适应） */
  viewport: "mobile" | "tablet" | "desktop" | "fluid";
  /** 网格列数（默认 12） */
  gridCols: number;
  /** 网格间距（px） */
  gridGap: number;
  /** 组件最小行高（px），设为 0 时自适应由内容撑开 */
  minRowHeight: number;
  /** 水平平移偏移量（px） */
  panX: number;
  /** 垂直平移偏移量（px） */
  panY: number;
  /** 页面背景色 */
  pageBackground: string;
  /** 页面内边距（px） */
  pagePadding: number;
  /** 页面内容最大宽度（px）；null 表示不限制 */
  pageMaxWidth: number | null;

  /** 内部剪贴板（用于 Cut/Copy/Paste 闭环） */
  clipboard: CanvasClipboard | null;

  /** 子组件编辑模式的作用域（为空时表示正常模式） */
  editScope: { rootId: string; path: { id: string; type: string }[] } | null;

  /** 定位模式: grid = 12列网格, free = 自由定位（绝对定位） */
  positionMode: "grid" | "free";

  canUndo: boolean;
  canRedo: boolean;
  historyPast: CanvasSnapshot[];
  historyFuture: CanvasSnapshot[];
  historyLimit: number;
}

/**
 * 画布操作接口
 *
 * 定义了所有可对画布执行的操作。
 * 包含组件 CRUD、选择、移动、缩放、平移、拷贝/删除等功能。
 */
export interface CanvasActions {
  /** 向画布添加一个组件 */
  addComponent: (comp: CanvasComponent) => void;
  /** 从画布移除指定组件（同时清除其选中状态） */
  removeComponent: (id: string) => void;
  /** 更新组件的部分属性（不包括 id） */
  updateComponent: (id: string, updates: Partial<Omit<CanvasComponent, "id">>) => void;
  /** 选中（或取消选中）一个组件，multi 为 true 时支持多选 */
  selectComponent: (id: string, multi?: boolean) => void;
  /** 选中组件树中的任意节点（会自动联动根组件选中态） */
  selectNode: (nodeId: string) => void;
  /** 清除所有选中状态 */
  clearSelection: () => void;
  /** 移动组件到指定网格位置（x, y 自动钳制到有效范围） */
  moveComponent: (id: string, x: number, y: number) => void;
  /** 调整组件尺寸（width, height 为列/行跨度）；x, y 可选，用于左侧/上方把手调整位置 */
  resizeComponent: (id: string, width: number, height: number, x?: number, y?: number) => void;
  /** 设置缩放比例（自动钳制到 0.25 ~ 2.0） */
  setZoom: (zoom: number) => void;
  /** 缩放到适配所有可见组件 */
  zoomToFit: () => void;
  /** 缩放到适配当前选中组件 */
  zoomToSelection: () => void;
  /** 设置视口类型 */
  setViewport: (viewport: CanvasState["viewport"]) => void;
  /** 设置网格列数 */
  setGridCols: (cols: number) => void;
  /** 设置网格间距 */
  setGridGap: (gap: number) => void;
  /** 设置组件最小行高（px），设为 0 表示自适应内容撑开 */
  setMinRowHeight: (height: number) => void;
  /** 设置平移偏移量 */
  setPan: (x: number, y: number) => void;
  /** 设置页面背景色 */
  setPageBackground: (color: string) => void;
  /** 设置页面内边距 */
  setPagePadding: (padding: number) => void;
  /** 设置页面内容最大宽度（px）；传 null 表示不限制 */
  setPageMaxWidth: (maxWidth: number | null) => void;
  /** 复制当前选中内容到内部剪贴板 */
  copySelected: () => void;
  /** 剪切当前选中内容到内部剪贴板 */
  cutSelected: () => void;
  /** 将内部剪贴板内容粘贴到目标位置（不传则按当前选中推断） */
  pasteClipboard: (target?: { parentId: string | null; index?: number }) => void;
  /** 将一个新节点插入到目标位置（支持 root 与嵌套插入） */
  insertNode: (node: ComponentNode, target: { parentId: string | null; index?: number; position?: { x: number; y: number; width?: number; height?: number } }) => void;
  /** 在组件树中移动/重排节点（支持 root ↔ 嵌套） */
  moveNode: (nodeId: string, target: { parentId: string | null; index?: number }) => void;
  /** 更新组件树中的任意节点（根或嵌套） */
  updateNode: (nodeId: string, updates: Partial<Omit<ComponentNode, "id">>) => void;
  /** 删除当前选中的组件 */
  deleteSelected: () => void;
  /** 清空画布上的所有组件 */
  clearAll: () => void;
  /** 获取当前选中的组件列表 */
  getSelectedComponents: () => CanvasComponent[];
  /** 全选所有可见（非隐藏）组件 */
  selectAll: () => void;

  /** 切换组件的锁定状态 */
  toggleLock: (id: string) => void;
  /** 切换组件的隐藏状态 */
  toggleHidden: (id: string) => void;
  /** 批量切换多个组件的锁定状态 */
  batchToggleLock: (ids: string[]) => void;
  /** 批量切换多个组件的隐藏状态 */
  batchToggleHidden: (ids: string[]) => void;
  /** Z-Order 移动：上移/下移/置顶/置底 */
  zIndexMove: (ids: string[], direction: "up" | "down" | "top" | "bottom") => void;
  /** 对齐选中组件 */
  alignSelected: (direction: "left" | "centerH" | "right" | "top" | "centerV" | "bottom") => void;
  /** 分布选中组件 */
  distributeSelected: (direction: "horizontal" | "vertical") => void;
  /** 批量更新选中组件的共有属性 */
  batchUpdateSelectedProps: (key: string, value: unknown) => void;
  /** 进入子组件编辑模式 */
  enterChildEdit: (rootId: string, path: { id: string; type: string }[]) => void;
  /** 退出子组件编辑模式 */
  exitChildEdit: () => void;

  setPositionMode: (mode: "grid" | "free") => void;

  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  hydrate: (partial: Partial<CanvasSnapshot>) => void;
  batch: (fn: () => void) => void;
}

/**
 * 拖拽项的类型标识
 *
 * - "material": 从素材面板拖出的新组件
 * - "canvas-component": 画布内拖动的已有组件
 */
export type DragItemType = "material" | "canvas-component";

/**
 * 拖拽项数据
 *
 * 在拖拽操作中传递的数据载体。
 * 当 type 为 "material" 时使用 materialName；
 * 当 type 为 "canvas-component" 时使用 componentId。
 */
export interface DragItem {
  /** 拖拽类型 */
  type: DragItemType;
  /** 素材组件名称（拖拽类型为 "material" 时使用） */
  materialName?: string;
  /** 画布组件 ID（拖拽类型为 "canvas-component" 时使用） */
  componentId?: string;
}

/**
 * 各视口类型对应的画布宽度（px）
 *
 * 当 viewport 为 "fluid" 时使用 1920px 作为基准宽度。
 */
export const VIEWPORT_WIDTHS: Record<CanvasState["viewport"], number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
  fluid: 1920,
};
