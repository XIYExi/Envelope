/**
 * Document Model 单元测试
 *
 * 覆盖 NodeIndex（扁平索引）、NodeManager（树操作）、
 * SelectionManager（选中管理）的核心逻辑。
 *
 * @author xiye
 * @date 2026-06-30
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { NodeIndex } from '../src/canvas/document/node-index';
import { NodeManager } from '../src/canvas/document/node-manager';
import { SelectionManager } from '../src/canvas/document/selection-manager';
import type { CanvasComponent } from '../src/canvas/types';

/** 测试用 ComponentNode 工厂 */
function makeNode(partial: Partial<CanvasComponent['node']> = {}): CanvasComponent['node'] {
  return {
    id: partial.id ?? 'n-1',
    type: partial.type ?? 'Button',
    name: partial.name ?? `Button-${partial.id ?? 'n-1'}`,
    category: partial.category ?? 'form',
    props: partial.props ?? {},
    children: partial.children ?? [],
  };
}

/** 测试用 CanvasComponent 工厂 */
function makeComponent(partial: Partial<CanvasComponent> = {}): CanvasComponent {
  return {
    id: partial.id ?? 'c-1',
    node: partial.node ?? makeNode({ id: partial.id }),
    position: partial.position ?? { x: 1, y: 1, width: 3, height: 2 },
    ...partial,
  };
}

describe('NodeIndex', () => {
  let index: NodeIndex;

  beforeEach(() => {
    index = new NodeIndex();
  });

  it('rebuild 建立 id→NodeEntry 映射', () => {
    const comps = [makeComponent({ id: 'r-1', node: makeNode({ id: 'r-1' }) })];
    index.rebuild(comps);
    expect(index.has('r-1')).toBe(true);
    expect(index.size).toBe(1);
  });

  it('rebuild 递归索引嵌套子节点', () => {
    const child = makeNode({ id: 'child-1' });
    const comp = makeComponent({
      id: 'r-1',
      node: makeNode({ id: 'r-1', children: [child] }),
    });
    index.rebuild([comp]);
    expect(index.has('r-1')).toBe(true);
    expect(index.has('child-1')).toBe(true);
    expect(index.size).toBe(2);
  });

  it('get 返回 NodeEntry', () => {
    const comps = [makeComponent({ id: 'r-1', node: makeNode({ id: 'r-1' }) })];
    index.rebuild(comps);
    const entry = index.get('r-1');
    expect(entry).toBeDefined();
    expect(entry!.id).toBe('r-1');
    expect(entry!.depth).toBe(0);
    expect(entry!.parentId).toBeNull();
    expect(entry!.rootIndex).toBe(0);
  });

  it('get 对不存在的 ID 返回 undefined', () => {
    index.rebuild([]);
    expect(index.get('nonexistent')).toBeUndefined();
  });

  it('locate 自动重建索引当为空时', () => {
    const comps = [makeComponent({ id: 'r-1', node: makeNode({ id: 'r-1' }) })];
    const loc = index.locate(comps, 'r-1');
    expect(loc).not.toBeNull();
    expect(loc!.kind).toBe('root');
    expect(loc!.rootIndex).toBe(0);
  });

  it('locate 定位嵌套子节点', () => {
    const child = makeNode({ id: 'child-1' });
    const comp = makeComponent({
      id: 'r-1',
      node: makeNode({ id: 'r-1', children: [child] }),
    });
    const loc = index.locate([comp], 'child-1');
    expect(loc).not.toBeNull();
    expect(loc!.kind).toBe('child');
    expect(loc!.parentId).toBe('r-1');
    expect(loc!.index).toBe(0);
  });

  it('contains 判断祖先关系', () => {
    const inner = makeNode({ id: 'inner' });
    const child = makeNode({ id: 'child-1', children: [inner] });
    const comp = makeComponent({
      id: 'r-1',
      node: makeNode({ id: 'r-1', children: [child] }),
    });
    index.rebuild([comp]);
    expect(index.contains('r-1', 'inner')).toBe(true);
    expect(index.contains('child-1', 'r-1')).toBe(false);
    expect(index.contains('r-1', 'r-1')).toBe(true);
  });

  it('clear 清空索引', () => {
    const comps = [makeComponent({ id: 'r-1', node: makeNode({ id: 'r-1' }) })];
    index.rebuild(comps);
    index.clear();
    expect(index.size).toBe(0);
  });
});

describe('NodeManager', () => {
  let manager: NodeManager;
  let components: CanvasComponent[];

  beforeEach(() => {
    manager = new NodeManager();
    components = [];
  });

  it('addComponent 添加到根列表', () => {
    const comp = makeComponent({ id: 'new-c' });
    const next = manager.addComponent(components, comp, null, 0);
    expect(next).toHaveLength(1);
    expect(next[0]!.id).toBe('new-c');
    expect(manager.index.has('new-c')).toBe(true);
  });

  it('insertNode 插入子节点到容器', () => {
    const container = makeComponent({ id: 'container', node: makeNode({ id: 'container', type: 'Card' }) });
    components = [container];
    const child = makeNode({ id: 'child-n', type: 'Button' });
    const next = manager.insertNode(components, 'container', 0, child);
    const children = next[0]!.node.children ?? [];
    expect(children).toHaveLength(1);
    expect(children[0]!.id).toBe('child-n');
    expect(manager.index.has('child-n')).toBe(true);
  });

  it('removeNode 从根列表移除', () => {
    const comp = makeComponent({ id: 'r-1', node: makeNode({ id: 'r-1' }) });
    components = [comp];
    const { components: next, removed } = manager.removeNode(components, 'r-1');
    expect(next).toHaveLength(0);
    expect(removed).not.toBeNull();
    expect(removed!.id).toBe('r-1');
    expect(manager.index.has('r-1')).toBe(false);
  });

  it('removeNode 从嵌套子节点移除', () => {
    const child = makeNode({ id: 'child-n' });
    const container = makeComponent({
      id: 'container',
      node: makeNode({ id: 'container', type: 'Card', children: [child] }),
    });
    components = [container];
    const { components: next, removed } = manager.removeNode(components, 'child-n');
    expect(removed).not.toBeNull();
    expect(removed!.id).toBe('child-n');
    expect(next[0]!.node.children ?? []).toHaveLength(0);
  });

  it('moveNode 移动节点到不同父容器', () => {
    const src = makeComponent({ id: 'src', node: makeNode({ id: 'src' }) });
    const dest = makeComponent({ id: 'dest', node: makeNode({ id: 'dest', type: 'Card' }) });
    components = [src, dest];
    const next = manager.moveNode(components, 'src', { parentId: 'dest', index: 0 });
    expect(next).toHaveLength(1);
    expect(next[0]!.id).toBe('dest');
    const children = next[0]!.node.children ?? [];
    expect(children).toHaveLength(1);
    expect(children[0]!.id).toBe('src');
  });

  it('moveNode 禁止移动到自身子树内部', () => {
    const child = makeNode({ id: 'child-n' });
    const container = makeComponent({
      id: 'container',
      node: makeNode({ id: 'container', type: 'Card', children: [child] }),
    });
    components = [container];
    manager.index.rebuild(components);
    const next = manager.moveNode(components, 'container', { parentId: 'child-n', index: 0 });
    expect(next).toHaveLength(1);
    expect(next[0]!.node.children?.[0]?.id).toBe('child-n');
  });

  it('updateNode 更新节点属性', () => {
    const comp = makeComponent({
      id: 'r-1',
      node: makeNode({ id: 'r-1', props: { label: 'old' } }),
    });
    components = [comp];
    const next = manager.updateNode(components, 'r-1', { props: { label: 'new' } } as any);
    const p = next[0]!.node.props as Record<string, unknown>;
    expect(p.label).toBe('new');
  });

  it('findNode O(1) 查找', () => {
    const child = makeNode({ id: 'child-n', type: 'Button' });
    const container = makeComponent({
      id: 'container',
      node: makeNode({ id: 'container', type: 'Card', children: [child] }),
    });
    const result = manager.findNode([container], 'child-n');
    expect(result).not.toBeNull();
    expect(result!.id).toBe('child-n');
  });

  it('locate 定位', () => {
    const comp = makeComponent({ id: 'r-1', node: makeNode({ id: 'r-1' }) });
    const loc = manager.locate([comp], 'r-1');
    expect(loc).not.toBeNull();
    expect(loc!.kind).toBe('root');
  });
});

describe('SelectionManager', () => {
  const sm = new SelectionManager();

  it('getSelectedComponents 返回选中的根组件', () => {
    const c1 = makeComponent({ id: 'c1' });
    const c2 = makeComponent({ id: 'c2' });
    const result = sm.getSelectedComponents([c1, c2], ['c1']);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('c1');
  });

  it('getTopComponents 过滤有祖先在选中列表的子组件', () => {
    const child = makeNode({ id: 'child' });
    const c1 = makeComponent({
      id: 'c1',
      node: makeNode({ id: 'c1', type: 'Card', children: [child] }),
    });
    const index = new NodeIndex();
    index.rebuild([c1]);
    const result = sm.getTopComponents([c1], ['c1', 'child'], index);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('c1');
  });

  it('getPrimaryId 优先 activeNodeId', () => {
    expect(sm.getPrimaryId(['a', 'b'], 'a')).toBe('a');
  });

  it('getPrimaryId 降级到 selectedIds[0]', () => {
    expect(sm.getPrimaryId(['a', 'b'], null)).toBe('a');
  });

  it('isSelected 判断是否选中', () => {
    expect(sm.isSelected(['a', 'b'], 'a')).toBe(true);
    expect(sm.isSelected(['a', 'b'], 'c')).toBe(false);
  });

  it('toggle 切换选中', () => {
    expect(sm.toggle(['a', 'b'], 'a')).toEqual(['b']);
    expect(sm.toggle(['a', 'b'], 'c')).toEqual(['a', 'b', 'c']);
  });

  it('select 单选替换', () => {
    const result = sm.select(['a', 'b'], 'c', null);
    expect(result.selectedIds).toEqual(['c']);
    expect(result.activeNodeId).toBe('c');
  });

  it('selectAll 全选非隐藏组件', () => {
    const c1 = makeComponent({ id: 'c1' });
    const c2 = makeComponent({ id: 'c2', hidden: true });
    const c3 = makeComponent({ id: 'c3' });
    const ids = sm.selectAll([c1, c2, c3]);
    expect(ids).toEqual(['c1', 'c3']);
  });
});
