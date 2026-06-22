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
import { createCanvasComponent, createComponentNode, useCanvasStore } from "../src/canvas/store";
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
    activeNodeId: null,
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

  it("Copy/Paste：copySelected 只写入内部剪贴板，pasteClipboard 会生成新 ID 并保持 node.id 与组件 id 一致", () => {
    const nearRight = comp({ position: { x: 10, y: 2, width: 3, height: 2 } });
    resetStore({ components: [nearRight], selectedIds: [nearRight.id], activeNodeId: nearRight.id });

    useCanvasStore.getState().copySelected();
    const st = useCanvasStore.getState();

    expect(st.components).toHaveLength(1);
    expect(st.clipboard?.mode).toBe("copy");
    expect(st.clipboard?.items[0]?.kind).toBe("canvas-component");

    useCanvasStore.getState().pasteClipboard();
    const pastedState = useCanvasStore.getState();
    expect(pastedState.components).toHaveLength(2);

    const pasted = pastedState.components[1]!;
    expect(pasted.id).toBe("test-uuid-1");
    expect(pasted.node.id).toBe(pasted.id);
    expect(pasted.node.name).toBe(`Button-${pasted.id}`);
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

  it("insertNode：支持将新节点插入到任意父节点 children，并联动 selectedIds/activeNodeId", () => {
    const root = createCanvasComponent("Card", "layout", {}, []);
    resetStore({ components: [root], selectedIds: [root.id], activeNodeId: root.id });

    const child = createComponentNode("Button", "form", { label: "nested" });
    useCanvasStore.getState().insertNode(child, { parentId: root.id, index: 0 });

    const st = useCanvasStore.getState();
    expect(st.components).toHaveLength(1);
    expect(st.selectedIds).toEqual([root.id]);
    expect(st.activeNodeId).toBe(child.id);
    expect(st.components[0]!.node.children?.some((n) => n.id === child.id)).toBe(true);
  });

  it("moveNode：支持将根组件移动为另一个组件的子节点（嵌套插入）", () => {
    const c1 = createCanvasComponent("Button", "form", { label: "A" }, []);
    const c2 = createCanvasComponent("Card", "layout", {}, []);
    resetStore({ components: [c1, c2], selectedIds: [c1.id], activeNodeId: c1.id });

    useCanvasStore.getState().moveNode(c1.id, { parentId: c2.id, index: 0 });
    const st = useCanvasStore.getState();

    expect(st.components).toHaveLength(1);
    expect(st.components[0]!.id).toBe(c2.id);
    expect(st.components[0]!.node.children?.some((n) => n.id === c1.id)).toBe(true);
  });

  it("copySelected：多选根组件时会把多项写入 clipboard.items", () => {
    const c1 = comp();
    const c2 = comp();
    resetStore({ components: [c1, c2], selectedIds: [c1.id, c2.id], activeNodeId: c1.id });

    useCanvasStore.getState().copySelected();
    const st = useCanvasStore.getState();
    expect(st.clipboard?.mode).toBe("copy");
    expect(st.clipboard?.items).toHaveLength(2);
    expect(st.clipboard?.items.every((it) => it.kind === "canvas-component")).toBe(true);
  });

  it("copy/paste：当 activeNodeId 指向子节点时，复制的是 component-node，粘贴默认插入到同一父节点之后", () => {
    const root = createCanvasComponent("Box", "layout", {}, []);
    const a = createComponentNode("Button", "form", { label: "A" });
    const b = createComponentNode("Button", "form", { label: "B" });
    root.node = { ...root.node, children: [a, b] };
    resetStore({ components: [root], selectedIds: [root.id], activeNodeId: a.id });

    useCanvasStore.getState().copySelected();
    expect(useCanvasStore.getState().clipboard?.items[0]?.kind).toBe("component-node");

    useCanvasStore.getState().pasteClipboard();
    const st = useCanvasStore.getState();
    const children = st.components[0]!.node.children ?? [];
    expect(children).toHaveLength(3);
    expect(children[0]!.id).toBe(a.id);
    expect(children[1]!.id).toBe("test-uuid-3");
    expect(children[2]!.id).toBe(b.id);
    expect(st.activeNodeId).toBe("test-uuid-3");
  });

  it("cut/paste：cutSelected 会删除子节点并将 clipboard.mode 置为 cut；pasteClipboard 后会自动清空 clipboard", () => {
    const root = createCanvasComponent("Box", "layout", {}, []);
    const a = createComponentNode("Button", "form", { label: "A" });
    root.node = { ...root.node, children: [a] };
    resetStore({ components: [root], selectedIds: [root.id], activeNodeId: a.id });

    useCanvasStore.getState().cutSelected();
    const afterCut = useCanvasStore.getState();
    expect(afterCut.clipboard?.mode).toBe("cut");
    expect(afterCut.components[0]!.node.children ?? []).toHaveLength(0);

    useCanvasStore.getState().pasteClipboard({ parentId: root.id, index: 0 });
    const st = useCanvasStore.getState();
    expect(st.components[0]!.node.children ?? []).toHaveLength(1);
    expect(st.components[0]!.node.children?.[0]?.id).toBe("test-uuid-2");
    expect(st.clipboard).toBe(null);
  });

  it("deleteSelected：当 activeNodeId 指向子节点时会删除该子节点，并回退选择到根组件", () => {
    const root = createCanvasComponent("Box", "layout", {}, []);
    const a = createComponentNode("Button", "form", { label: "A" });
    const b = createComponentNode("Button", "form", { label: "B" });
    root.node = { ...root.node, children: [a, b] };
    resetStore({ components: [root], selectedIds: [root.id], activeNodeId: a.id });

    useCanvasStore.getState().deleteSelected();
    const st = useCanvasStore.getState();
    expect(st.components[0]!.node.children?.map((c) => c.id)).toEqual([b.id]);
    expect(st.selectedIds).toEqual([root.id]);
    expect(st.activeNodeId).toBe(root.id);
  });

  it("moveNode：禁止把节点移动到自身子树内部（避免循环）", () => {
    const root = createCanvasComponent("Box", "layout", {}, []);
    const a = createComponentNode("Button", "form", { label: "A" });
    root.node = { ...root.node, children: [a] };
    resetStore({ components: [root], selectedIds: [root.id], activeNodeId: root.id });

    useCanvasStore.getState().moveNode(root.id, { parentId: a.id, index: 0 });
    const st = useCanvasStore.getState();
    expect(st.components).toHaveLength(1);
    expect(st.components[0]!.id).toBe(root.id);
    expect(st.components[0]!.node.children?.[0]?.id).toBe(a.id);
  });

  it("moveNode：同一父节点内移动时会根据 originIndex 调整 index，避免 off-by-one", () => {
    const root = createCanvasComponent("Box", "layout", {}, []);
    const a = createComponentNode("Button", "form", { label: "A" });
    const b = createComponentNode("Button", "form", { label: "B" });
    const c = createComponentNode("Button", "form", { label: "C" });
    root.node = { ...root.node, children: [a, b, c] };
    resetStore({ components: [root], selectedIds: [root.id], activeNodeId: b.id });

    useCanvasStore.getState().moveNode(b.id, { parentId: root.id, index: 3 });
    const children = useCanvasStore.getState().components[0]!.node.children ?? [];
    expect(children.map((x) => x.id)).toEqual([a.id, c.id, b.id]);
  });
});
