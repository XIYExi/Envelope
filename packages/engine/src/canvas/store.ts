/**
 * 画布状态管理（Zustand Store）
 *
 * 使用 Zustand 管理画布的全局状态，包括：
 * - 组件的增删改查
 * - 组件的选中/取消选中（支持多选）
 * - 组件的移动和尺寸调整（带网格边界限制）
 * - 缩放、视口、网格配置
 * - 复制/删除/清空等批量操作
 *
 * 所有状态更新都是不可变的——通过 set() 返回新对象，
 * 不直接修改旧状态，确保 React 能正确触发重渲染。
 *
 * @author xiye
 * @date 2026/6/13
 */
import { create } from "zustand";
import type { CanvasState, CanvasActions, CanvasComponent } from "./types";

/**
 * 生成唯一 ID
 *
 * 使用 Web Crypto API 生成 UUID v4，用于画布组件和节点的唯一标识。
 * 比 Math.random() 更可靠，碰撞概率极低。
 */
function generateId(): string {
  return crypto.randomUUID();
}

/**
 * 画布 Zustand Store
 *
 * 将 CanvasState（状态）和 CanvasActions（操作）合并为一个 store。
 * 组件通过 useCanvasStore() hook 访问状态和操作。
 *
 * @example
 * // 在组件中使用
 * function Toolbar() {
 *   const addComponent = useCanvasStore(s => s.addComponent);
 *   const components = useCanvasStore(s => s.components);
 * }
 */
export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  // ========== 初始状态 ==========
  components: [],
  selectedIds: [],
  zoom: 1,
  viewport: "desktop",
  gridCols: 12,
  gridGap: 4,

  // ========== 组件操作 ==========

  /**
   * 添加组件到画布
   * @param comp - 完整的 CanvasComponent 对象（含 id、node、position）
   */
  addComponent: (comp) =>
    set((state) => ({ components: [...state.components, comp] })),

  /**
   * 移除组件
   *
   * 同时从 components 和 selectedIds 中移除，
   * 避免删除后仍显示选中状态。
   *
   * @param id - 要移除的组件 ID
   */
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    })),

  /**
   * 部分更新组件
   *
   * 只更新传入的字段，其他字段保持不变。
   * 使用展开运算符合并，实现不可变更新。
   *
   * @param id - 要更新的组件 ID
   * @param updates - 要更新的字段（不含 id）
   */
  updateComponent: (id, updates) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      ),
    })),

  /**
   * 选中组件
   *
   * 单选模式：直接替换选中列表为当前 ID
   * 多选模式（multi=true）：切换当前 ID 的选中状态
   *   - 已选中 → 取消选中
   *   - 未选中 → 追加到选中列表
   *
   * @param id - 组件 ID
   * @param multi - 是否多选模式（Ctrl/Shift 点击时为 true）
   */
  selectComponent: (id, multi = false) =>
    set((state) => {
      if (multi) {
        const already = state.selectedIds.includes(id);
        return {
          selectedIds: already
            ? state.selectedIds.filter((s) => s !== id)
            : [...state.selectedIds, id],
        };
      }
      return { selectedIds: [id] };
    }),

  /** 清空所有选中状态 */
  clearSelection: () => set({ selectedIds: [] }),

  /**
   * 移动组件到指定位置
   *
   * 自动限制在网格范围内：
   * - x 限制在 1-12（不能超出 12 列）
   * - y 最小为 1（不能超出顶部）
   *
   * @param id - 组件 ID
   * @param x - 目标列位置
   * @param y - 目标行位置
   */
  moveComponent: (id, x, y) =>
    set((state) => ({
      components: state.components.map((c) => {
        if (c.id !== id) return c;
        const clampedX = Math.max(1, Math.min(12, x));
        const clampedY = Math.max(1, y);
        return { ...c, position: { ...c.position, x: clampedX, y: clampedY } };
      }),
    })),

  /**
   * 调整组件尺寸
   *
   * 自动限制：
   * - width 最小 1，最大不能超出网格右边界
   * - height 最小 1
   *
   * @param id - 组件 ID
   * @param width - 目标宽度（列数）
   * @param height - 目标高度（行数）
   */
  resizeComponent: (id, width, height) =>
    set((state) => ({
      components: state.components.map((c) => {
        if (c.id !== id) return c;
        const clampedWidth = Math.max(1, Math.min(12 - c.position.x + 1, width));
        const clampedHeight = Math.max(1, height);
        return { ...c, position: { ...c.position, width: clampedWidth, height: clampedHeight } };
      }),
    })),

  /** 设置缩放比例 */
  setZoom: (zoom) => set({ zoom }),
  /** 设置视口类型 */
  setViewport: (viewport) => set({ viewport }),
  /** 设置网格列数 */
  setGridCols: (gridCols) => set({ gridCols }),
  /** 设置网格间距 */
  setGridGap: (gridGap) => set({ gridGap }),

  /**
   * 复制选中的组件
   *
   * 流程：
   * 1. 从当前 components 中提取选中的组件
   * 2. 深拷贝每个组件的 node（structuredClone）
   * 3. 为副本生成新的 ID（画布 ID 和节点 ID 都重新生成）
   * 4. 偏移位置：x+2, y+1，避免完全重叠
   * 5. 将副本添加到画布，并自动选中
   */
  copySelected: () => {
    const { components, selectedIds } = get();
    const componentMap = new Map(components.map((c) => [c.id, c]));
    const copies = selectedIds
      .map((sid) => componentMap.get(sid))
      .filter(Boolean) as CanvasComponent[];

    const newComps: CanvasComponent[] = copies.map((c) => {
      const clonedNode = structuredClone(c.node);
      clonedNode.id = generateId();
      return {
        id: generateId(),
        node: clonedNode,
        position: { ...c.position, x: c.position.x + 2, y: c.position.y + 1 },
      };
    });

    set((state) => ({
      components: [...state.components, ...newComps],
      selectedIds: newComps.map((c) => c.id),
    }));
  },

  /**
   * 删除选中的组件
   *
   * 从 components 中过滤掉选中的组件，
   * 同时清空 selectedIds。
   */
  deleteSelected: () => {
    const { selectedIds } = get();
    set((state) => ({
      components: state.components.filter((c) => !selectedIds.includes(c.id)),
      selectedIds: [],
    }));
  },

  /**
   * 清空画布
   *
   * 移除所有组件并清空选中状态。
   * 用于"新建画布"或"重置"场景。
   */
  clearAll: () => set({ components: [], selectedIds: [] }),

  /**
   * 获取所有选中组件的完整数据
   *
   * @returns 选中组件的 CanvasComponent 数组
   */
  getSelectedComponents: () => {
    const { components, selectedIds } = get();
    return components.filter((c) => selectedIds.includes(c.id));
  },
}));

/**
 * 创建画布组件
 *
 * 工厂函数，用于从素材面板拖拽或代码创建新组件。
 * 自动计算 y 位置：新组件放在现有组件下方（最大 y + height）。
 *
 * @param type - 组件类型名称（如 "Button"、"Card"）
 * @param category - 组件分类（如 "form"、"layout"、"display"）
 * @param props - 组件属性（默认空对象）
 * @param existingComponents - 画布上已有的组件列表（用于计算 y 位置）
 * @returns 新的 CanvasComponent 对象，默认位于第 1 列、宽度 3、高度 2
 *
 * @example
 * const btn = createCanvasComponent("Button", "form", { label: "Click me" });
 * // btn.position: { x: 1, y: 1, width: 3, height: 2 }
 */
export function createCanvasComponent(
  type: string,
  category: string,
  props: Record<string, unknown> = {},
  existingComponents: CanvasComponent[] = [],
): CanvasComponent {
  // 计算 y 位置：放在所有现有组件的下方
  let y = 1;
  if (existingComponents.length > 0) {
    y = Math.max(...existingComponents.map((c) => c.position.y + c.position.height));
  }
  const id = generateId();
  return {
    id,
    node: {
      id,
      type,
      name: `${type}-${id}`,
      category,
      props,
    },
    position: { x: 1, y, width: 3, height: 2 },
  };
}
