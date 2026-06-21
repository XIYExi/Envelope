/**
 * canvas/store 单测
 *
 * 覆盖目标：
 * - 组件移动/缩放的“边界钳制”规则（避免 store 内出现越界的布局状态）
 * - setGridCols 的规范化与对既有组件的回收钳制逻辑
 * - copySelected 的 ID 一致性要求（CanvasComponent.id 与 node.id 必须一致）
 * - undo/redo 与 batch 的历史记录逻辑（避免产生过多历史快照或遗漏快照）
 * - moveComponent 的 coalesce（短时间内多次拖动只产生一次历史记录）
 *
 * 说明：
 * - 这里不测试 React 视图层，只测试 Zustand store 的纯状态与 action 逻辑
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCanvasComponent, useCanvasStore } from "../src/canvas/store";
import type { CanvasComponent, CanvasSnapshot } from "../src/canvas/types";

/**
 * 获取一份“最小但完整”的快照，用于 hydrate 重置 store
 *
 * @param overrides - 需要覆盖的字段（用于构造特定场景）
 */
function baseSnapshot(overrides: Partial<CanvasSnapshot> = {}): CanvasSnapshot {
  return {
    components: [],
    selectedIds: [],
    zoom: 1,
    viewport: "desktop",
    gridCols: 12,
    gridGap: 4,
    panX: 0,
    panY: 0,
    pageBackground: "#ffffff",
    pagePadding: 16,
    ...overrides,
  };
}

/**
 * 将 store 重置为一个干净状态
 *
 * @param overrides - 快照覆盖字段（用于带初始数据的场景）
 */
function resetStore(overrides: Partial<CanvasSnapshot> = {}) {
  const s = useCanvasStore.getState();
  s.clearHistory();
  s.hydrate(baseSnapshot(overrides));
}

/**
 * 直接构造一个组件（用于定位/尺寸测试）
 *
 * @param partial - 覆盖字段（例如 position.x / position.width）
 */
function comp(partial: Partial<CanvasComponent> = {}): CanvasComponent {
  const c = createCanvasComponent("Button", "form", { label: "ok" }, []);
  return {
    ...c,
    ...partial,
    node: { ...c.node, ...(partial.node ?? {}) },
    position: { ...c.position, ...(partial.position ?? {}) },
  };
}

beforeEach(() => {
  resetStore();
});

describe("canvas/store", () => {
  it("setGridCols：会将输入规范化为 >=1 的整数，并回收钳制已有组件的 x/width", () => {
    const c1 = comp({ position: { x: 2, y: 1, width: 10, height: 2 } });
    const c2 = comp({ position: { x: 11, y: 1, width: 3, height: 2 } });
    resetStore({ components: [c1, c2] });

    useCanvasStore.getState().setGridCols(6.8);
    const next = useCanvasStore.getState();

    expect(next.gridCols).toBe(6);
    expect(next.components[0]?.position).toMatchObject({ x: 1, width: 6 });
    expect(next.components[1]?.position).toMatchObject({ x: 4, width: 3 });
  });

  it("moveComponent：x 会结合 width 与 gridCols 做右边界钳制，y 最小为 1 且会四舍五入", () => {
    const c = comp({ position: { x: 1, y: 1, width: 4, height: 2 } });
    resetStore({ components: [c] });

    useCanvasStore.getState().moveComponent(c.id, 999, -3.2);
    const moved = useCanvasStore.getState().components[0]!;

    expect(moved.position.x).toBe(9);
    expect(moved.position.y).toBe(1);
  });

  it("resizeComponent：width/height 最小为 1，且 width 会按 x 与 gridCols 的关系钳制到最大可用值", () => {
    const c = comp({ position: { x: 1, y: 1, width: 3, height: 2 } });
    resetStore({ components: [c] });

    useCanvasStore.getState().resizeComponent(c.id, 100, -10, 10, 0);
    const resized = useCanvasStore.getState().components[0]!;

    expect(resized.position.x).toBe(10);
    expect(resized.position.y).toBe(1);
    expect(resized.position.width).toBe(3);
    expect(resized.position.height).toBe(1);
  });

  it("copySelected：复制后组件/节点 ID 必须一致，且偏移后的 x 仍会被钳制到有效范围", () => {
    const nearRight = comp({ position: { x: 10, y: 2, width: 3, height: 2 } });
    resetStore({ components: [nearRight], selectedIds: [nearRight.id] });

    useCanvasStore.getState().copySelected();
    const st = useCanvasStore.getState();

    expect(st.components).toHaveLength(2);
    expect(st.selectedIds).toHaveLength(1);

    const copied = st.components[1]!;
    expect(copied.id).toBe("test-uuid-1");
    expect(copied.node.id).toBe(copied.id);
    expect(copied.node.name).toBe(`Button-${copied.id}`);
    expect(copied.position.x).toBe(10);
    expect(copied.position.y).toBe(3);
  });

  it("undo/redo：可以回退与前进组件列表，并维护 canUndo/canRedo", () => {
    const c = comp({ position: { x: 1, y: 1, width: 3, height: 2 } });

    useCanvasStore.getState().addComponent(c);
    expect(useCanvasStore.getState().components).toHaveLength(1);
    expect(useCanvasStore.getState().canUndo).toBe(true);

    useCanvasStore.getState().undo();
    expect(useCanvasStore.getState().components).toHaveLength(0);
    expect(useCanvasStore.getState().canRedo).toBe(true);

    useCanvasStore.getState().redo();
    expect(useCanvasStore.getState().components).toHaveLength(1);
  });

  it("batch：多次操作只生成一次历史快照（减少历史噪声）", () => {
    const s = useCanvasStore.getState();
    const c1 = comp();
    const c2 = comp();

    s.batch(() => {
      s.addComponent(c1);
      s.addComponent(c2);
    });

    const st = useCanvasStore.getState();
    expect(st.components).toHaveLength(2);
    expect(st.historyPast).toHaveLength(1);
  });

  it("moveComponent：短时间内连续调用会 coalesce，只产生一次历史记录", () => {
    const now = vi.spyOn(Date, "now");
    now.mockReturnValueOnce(1000);
    const c = comp({ position: { x: 1, y: 1, width: 3, height: 2 } });
    resetStore({ components: [c] });

    useCanvasStore.getState().moveComponent(c.id, 2, 1);
    expect(useCanvasStore.getState().historyPast).toHaveLength(1);

    now.mockReturnValueOnce(1100);
    useCanvasStore.getState().moveComponent(c.id, 3, 1);
    expect(useCanvasStore.getState().historyPast).toHaveLength(1);

    now.mockRestore();
  });

  it("selectComponent：支持单选与多选切换（multi=true 时会 toggle）", () => {
    const c1 = comp();
    const c2 = comp();
    resetStore({ components: [c1, c2] });

    const s = useCanvasStore.getState();
    s.selectComponent(c1.id);
    expect(useCanvasStore.getState().selectedIds).toEqual([c1.id]);

    s.selectComponent(c2.id, true);
    expect(useCanvasStore.getState().selectedIds.sort()).toEqual([c1.id, c2.id].sort());

    s.selectComponent(c1.id, true);
    expect(useCanvasStore.getState().selectedIds).toEqual([c2.id]);
  });

  it("removeComponent：会同步清理 selectedIds，避免悬空选择", () => {
    const c1 = comp();
    const c2 = comp();
    resetStore({ components: [c1, c2], selectedIds: [c2.id] });

    useCanvasStore.getState().removeComponent(c2.id);
    const st = useCanvasStore.getState();

    expect(st.components.map((c) => c.id)).toEqual([c1.id]);
    expect(st.selectedIds).toEqual([]);
  });

  it("updateComponent：可以更新组件的部分字段（例如 node.props 或 position）", () => {
    const c1 = comp({ position: { x: 1, y: 1, width: 3, height: 2 } });
    resetStore({ components: [c1] });

    useCanvasStore.getState().updateComponent(c1.id, {
      node: { ...c1.node, props: { label: "changed" } },
      position: { ...c1.position, x: 2 },
    });

    const updated = useCanvasStore.getState().components[0]!;
    expect(updated.node.props).toEqual({ label: "changed" });
    expect(updated.position.x).toBe(2);
  });

  it("deleteSelected/clearAll：可删除选中组件并清空画布", () => {
    const c1 = comp();
    const c2 = comp();
    resetStore({ components: [c1, c2], selectedIds: [c1.id] });

    useCanvasStore.getState().deleteSelected();
    expect(useCanvasStore.getState().components.map((c) => c.id)).toEqual([c2.id]);
    expect(useCanvasStore.getState().selectedIds).toEqual([]);

    useCanvasStore.getState().clearAll();
    expect(useCanvasStore.getState().components).toEqual([]);
  });

  it("getSelectedComponents：返回当前选中的组件列表", () => {
    const c1 = comp();
    const c2 = comp();
    resetStore({ components: [c1, c2], selectedIds: [c2.id] });

    const selected = useCanvasStore.getState().getSelectedComponents();
    expect(selected.map((c) => c.id)).toEqual([c2.id]);
  });

  it("setZoom：会钳制到 0.25~2 之间", () => {
    const s = useCanvasStore.getState();
    s.setZoom(100);
    expect(useCanvasStore.getState().zoom).toBe(2);
    s.setZoom(0.01);
    expect(useCanvasStore.getState().zoom).toBe(0.25);
  });

  it("createCanvasComponent：会将新组件默认放在已有组件下方（y 取最大 y+height）", () => {
    const existing = [
      comp({ position: { x: 1, y: 1, width: 3, height: 2 } }),
      comp({ position: { x: 1, y: 10, width: 3, height: 5 } }),
    ];

    const created = createCanvasComponent("Card", "layout", {}, existing);
    expect(created.position.y).toBe(15);
  });
});
