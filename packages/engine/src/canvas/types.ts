/**
 * 画布类型定义
 *
 * 定义了可视化画布编辑器的核心数据结构：
 * - CanvasComponent: 画布上的单个组件，包含组件节点数据和位置信息
 * - CanvasState: 画布的全局状态（组件列表、选中状态、缩放、视口等）
 * - CanvasActions: 画布的操作方法（增删改查、移动、缩放等）
 * - DragItem: 拖拽过程中的数据载体
 *
 * 画布使用 12 列 CSS Grid 布局系统，
 * 每个组件通过 position 中的 x/y/width/height 定位在网格中。
 *
 * @author xiye
 * @date 2026/6/13
 */
import type { ComponentNode } from "../schemas/page.schema";

/**
 * 画布组件
 *
 * 画布上的一个可交互组件，是 ComponentNode（数据层）和
 * 位置信息（布局层）的组合体。
 *
 * 与 ComponentNode 的区别：
 * - ComponentNode 描述"这个组件是什么"（类型、属性、子组件）
 * - CanvasComponent 额外描述"这个组件在哪"（x, y, width, height）
 */
export interface CanvasComponent {
  /** 画布组件的唯一 ID（与 ComponentNode.id 不同，用于画布层面的标识） */
  id: string;
  /** 关联的组件节点数据（类型、属性、子组件树等） */
  node: ComponentNode;
  /** 组件在网格中的位置和尺寸 */
  position: {
    /** 列位置（1-12，对应 12 列 Grid） */
    x: number;
    /** 行位置（从 1 开始，向下递增） */
    y: number;
    /** 占据的列数（宽度） */
    width: number;
    /** 占据的行数（高度） */
    height: number;
  };
}

/**
 * 画布状态
 *
 * 描述画布的完整快照，包括所有组件、选中状态、缩放比例等。
 * 与 CanvasActions 一起构成 Zustand store 的完整类型。
 */
export interface CanvasState {
  /** 画布上所有组件的列表 */
  components: CanvasComponent[];
  /** 当前选中的组件 ID 列表（支持多选） */
  selectedIds: string[];
  /** 缩放比例（1 = 100%，0.5 = 50%，2 = 200%） */
  zoom: number;
  /** 当前视口类型，影响画布宽度和布局参考 */
  viewport: "mobile" | "tablet" | "desktop" | "fluid";
  /** 网格列数（默认 12） */
  gridCols: number;
  /** 网格间距（单位 px） */
  gridGap: number;
}

/**
 * 画布操作方法
 *
 * 定义了所有可以对画布执行的操作，由 Zustand store 实现。
 * 所有操作都是纯函数式的——通过 set() 返回新状态，不直接修改旧状态。
 */
export interface CanvasActions {
  /** 添加一个组件到画布 */
  addComponent: (comp: CanvasComponent) => void;
  /** 根据 ID 移除一个组件，同时取消其选中状态 */
  removeComponent: (id: string) => void;
  /** 部分更新一个组件的属性（除 id 外的任意字段） */
  updateComponent: (id: string, updates: Partial<Omit<CanvasComponent, "id">>) => void;
  /**
   * 选中一个组件
   * @param id - 要选中的组件 ID
   * @param multi - 是否追加到现有选中列表（Ctrl/Shift 多选）
   */
  selectComponent: (id: string, multi?: boolean) => void;
  /** 清空所有选中状态 */
  clearSelection: () => void;
  /** 移动组件到指定网格位置（自动限制在 12 列范围内） */
  moveComponent: (id: string, x: number, y: number) => void;
  /** 调整组件尺寸（自动限制不超出网格边界） */
  resizeComponent: (id: string, width: number, height: number) => void;
  /** 设置缩放比例 */
  setZoom: (zoom: number) => void;
  /** 设置视口类型 */
  setViewport: (viewport: CanvasState["viewport"]) => void;
  /** 设置网格列数 */
  setGridCols: (cols: number) => void;
  /** 设置网格间距 */
  setGridGap: (gap: number) => void;
  /** 复制所有选中的组件（自动偏移位置并生成新 ID） */
  copySelected: () => void;
  /** 删除所有选中的组件 */
  deleteSelected: () => void;
  /** 清空画布（移除所有组件） */
  clearAll: () => void;
  /** 获取所有选中组件的完整数据 */
  getSelectedComponents: () => CanvasComponent[];
}

/**
 * 拖拽项类型
 *
 * 区分两种拖拽来源：
 * - "material": 从左侧素材面板拖出的新组件
 * - "canvas-component": 在画布内拖动已有组件（移动位置）
 */
export type DragItemType = "material" | "canvas-component";

/**
 * 拖拽数据载体
 *
 * 在拖拽过程中传递的数据结构，根据 type 不同携带不同的附加信息。
 * 用于 dnd.ts 中的拖拽工厂函数创建。
 */
export interface DragItem {
  /** 拖拽类型：素材 or 画布组件 */
  type: DragItemType;
  /** 素材类型名称（如 "Button"、"Card"），仅 type="material" 时有值 */
  materialName?: string;
  /** 画布组件 ID，仅 type="canvas-component" 时有值 */
  componentId?: string;
}
