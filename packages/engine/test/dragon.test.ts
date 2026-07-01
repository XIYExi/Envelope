/**
 * Dragon 引擎单元测试
 *
 * 覆盖 Location、Detecting、Scroller、Dragon 核心逻辑。
 *
 * @author xiye
 * @date 2026-06-30
 */
import { describe, it, expect, vi } from 'vitest';
import { Location } from '../src/canvas/dragon/location';
import { Detecting } from '../src/canvas/dragon/detecting';
import { Dragon } from '../src/canvas/dragon/dragon';
import { CanvasScroller } from '../src/canvas/dragon/scroller';
import type { DragStartEvent, DragMoveEvent } from '@dnd-kit/core';
import type { CanvasComponent, DomRectEntry } from '../src/canvas/types';

/** 测试用 CanvasComponent 工厂 */
function makeComp(overrides: Partial<CanvasComponent['position']> & { id?: string; children?: CanvasComponent['node']['children'] } = {}): CanvasComponent {
  return {
    id: overrides.id ?? 'c-1',
    node: {
      id: overrides.id ?? 'c-1',
      type: 'Card',
      name: 'Card-1',
      category: 'layout',
      props: {},
      children: overrides.children ?? [],
    },
    position: {
      x: overrides.x ?? 1,
      y: overrides.y ?? 1,
      width: overrides.width ?? 6,
      height: overrides.height ?? 4,
    },
  };
}

describe('Location', () => {
  const C = { columnWidth: 80, gridGap: 4, pagePadding: 16, cellWidth: 80, cellHeight: 40, gridCols: 12 };
  const loc = new Location();

  it('compute 在鼠标不在任何容器内时返回 null', () => {
    const result = loc.compute({
      mouseX: 999, mouseY: 999,
      components: [makeComp()],
      selectedIds: [],
      positionMode: 'grid',
      ...C,
    });
    expect(result).toBeNull();
  });

  it('compute 在鼠标进入无子容器的容器时返回 cover', () => {
    const comp = makeComp({ x: 1, y: 1, width: 6, height: 4 });
    const result = loc.compute({
      mouseX: 200, mouseY: 100,
      components: [comp],
      selectedIds: [],
      positionMode: 'grid',
      ...C,
    });
    expect(result).not.toBeNull();
    expect(result!.type).toBe('cover');
    expect(result!.containerId).toBe(comp.id);
  });

  it('compute 排除拖拽自身', () => {
    const comp = makeComp({ id: 'self', x: 1, y: 1, width: 6, height: 4 });
    const result = loc.compute({
      mouseX: 200, mouseY: 100,
      components: [comp],
      selectedIds: ['self'],
      positionMode: 'grid',
      ...C,
    });
    expect(result).toBeNull();
  });

  it('computeAmongChildren 有 domRects 时使用实际矩形计算 before', () => {
    const domRects: Record<string, DomRectEntry> = {
      'child-a': { top: 50, left: 30, width: 200, height: 40, bottom: 90, right: 230 },
      'child-b': { top: 100, left: 30, width: 200, height: 40, bottom: 140, right: 230 },
    };
    const container = makeComp({
      id: 'container',
      x: 1, y: 1, width: 6, height: 4,
      children: [
        { id: 'child-a', type: 'Button', name: 'A', category: 'form', props: {} },
        { id: 'child-b', type: 'Button', name: 'B', category: 'form', props: {} },
      ],
    });

    const result = loc.compute({
      mouseX: 100, mouseY: 30,
      components: [container],
      selectedIds: [],
      positionMode: 'grid',
      domRects,
      ...C,
    });

    expect(result).not.toBeNull();
    expect(result!.type).toBe('before');
    expect(result!.nearNodeId).toBe('child-a');
    expect(result!.index).toBe(0);
  });

  it('computeAmongChildren 鼠标在子组件上时返回该组件 cover', () => {
    const domRects: Record<string, DomRectEntry> = {
      'child-a': { top: 50, left: 30, width: 200, height: 40, bottom: 90, right: 230 },
      'child-b': { top: 100, left: 30, width: 200, height: 40, bottom: 140, right: 230 },
    };
    const container = makeComp({
      id: 'container',
      x: 1, y: 1, width: 6, height: 4,
      children: [
        { id: 'child-a', type: 'Button', name: 'A', category: 'form', props: {} },
        { id: 'child-b', type: 'Button', name: 'B', category: 'form', props: {} },
      ],
    });

    const result = loc.compute({
      mouseX: 100, mouseY: 70,
      components: [container],
      selectedIds: [],
      positionMode: 'grid',
      domRects,
      ...C,
    });

    expect(result).not.toBeNull();
    expect(result!.type).toBe('cover');
    expect(result!.nearNodeId).toBe('child-a');
  });

  it('computeAmongChildren domRects 为空时回退到 cover（关键分支）', () => {
    const container = makeComp({
      id: 'container',
      x: 1, y: 1, width: 6, height: 4,
      children: [
        { id: 'child-a', type: 'Button', name: 'A', category: 'form', props: {} },
      ],
    });

    const result = loc.compute({
      mouseX: 200, mouseY: 100,
      components: [container],
      selectedIds: [],
      positionMode: 'grid',
      // domRects intentionally omitted
      ...C,
    });

    expect(result).not.toBeNull();
    expect(result!.type).toBe('cover');
    expect(result!.containerId).toBe('container');
    expect(result!.nearNodeId).toBeUndefined();
  });
});

describe('Detecting', () => {
  it('capture 设置 current 并通知 onChange', () => {
    const d = new Detecting();
    const spy = vi.fn();
    d.onChange(spy);
    d.capture('node-1');
    expect(d.current).toBe('node-1');
    expect(spy).toHaveBeenCalledWith('node-1');
  });

  it('release 仅当匹配时清除', () => {
    const d = new Detecting();
    d.capture('node-1');
    d.release('node-2'); // 不匹配，不清除
    expect(d.current).toBe('node-1');
    d.release('node-1');
    expect(d.current).toBeNull();
  });

  it('enable = false 时 capture 无效', () => {
    const d = new Detecting();
    d.enable = false;
    d.capture('node-1');
    expect(d.current).toBeNull();
  });

  it('reset 强制清除', () => {
    const d = new Detecting();
    d.capture('node-1');
    d.reset();
    expect(d.current).toBeNull();
  });

  it('onChange 返回取消订阅函数', () => {
    const d = new Detecting();
    const spy = vi.fn();
    const unsub = d.onChange(spy);
    unsub();
    d.capture('n');
    expect(spy).not.toHaveBeenCalled();
  });

  it('dispose 清理所有', () => {
    const d = new Detecting();
    d.capture('n');
    const spy = vi.fn();
    d.onChange(spy);
    d.dispose();
    expect(d.current).toBeNull();
  });
});

describe('Dragon', () => {
  it('onDragStart 解析 dragType 为 material', () => {
    const dragon = new Dragon();
    const mockEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    const ctx = dragon.onDragStart(mockEvent);
    expect(ctx.dragType).toBe('material');
    expect(ctx.materialName).toBe('Button');
  });

  it('onDragStart 解析 dragType 为 canvas-component', () => {
    const dragon = new Dragon();
    const mockEvent = {
      active: { data: { current: { componentId: 'comp-abc' } } },
    } as unknown as DragStartEvent;
    const ctx = dragon.onDragStart(mockEvent);
    expect(ctx.dragType).toBe('canvas-component');
    expect(ctx.componentId).toBe('comp-abc');
  });

  it('onDragEnd 重置所有状态', () => {
    const dragon = new Dragon();
    const mockEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(mockEvent);
    dragon.onDragEnd();
    expect(dragon.isDragging).toBe(false);
    expect(dragon.dragType).toBeNull();
    expect(dragon.activeId).toBeNull();
  });

  it('addSensor/removeSensor 增删感应器', () => {
    const dragon = new Dragon();
    const sensor = { sensorAvailable: true, isEnter: () => true };
    dragon.addSensor(sensor);
    dragon.addSensor(sensor);
    dragon.removeSensor(sensor);
    // API 可正常调用不抛错
    expect(true).toBe(true);
  });

  it('deltaToGrid 正确转换像素偏移到网格单位', () => {
    const dragon = new Dragon();
    const result = dragon.deltaToGrid(160, 80, 1);
    expect(result.dx).toBeCloseTo(2, 1);
    expect(result.dy).toBeCloseTo(2, 1);
  });

  // ========== Phase A: AutoScroll ==========

  it('V4-B4: onDragMove 靠近视口边缘时触发 scroller.scrolling', () => {
    const onScroll = vi.fn();
    const scroller = new CanvasScroller({ onScroll });
    const dragon = new Dragon({ scroller });

    const startEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    // mock rAF：jsdom 无 rAF，只执行一次回调（避免无限递归）
    let callCount = 0;
    const rafSpy = vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      if (callCount++ < 1) cb(0);
      return 0;
    });
    const cancelSpy = vi.stubGlobal('cancelAnimationFrame', () => {});

    const viewportRect = { top: 0, left: 0, bottom: 600, right: 800, width: 800, height: 600, x: 0, y: 0, toJSON: () => '' } as DOMRect;
    const moveEvent = {
      active: { data: { current: { materialName: 'Button' } } },
      delta: { x: 0, y: 0 },
      activatorEvent: { clientX: 5, clientY: 300 } as MouseEvent,
    } as unknown as DragMoveEvent;

    dragon.onDragMove(
      moveEvent,
      { zoom: 1, components: [], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 0, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      viewportRect,
      undefined,
      5,
      300,
    );

    expect(onScroll).toHaveBeenCalled();
    dragon.onDragEnd();
    vi.unstubAllGlobals();
  });

  it('V4-B4: onDragMove 鼠标在视口中央时不触发 scroller', () => {
    const onScroll = vi.fn();
    const scroller = new CanvasScroller({ onScroll });
    const dragon = new Dragon({ scroller });

    const startEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    const viewportRect = { top: 0, left: 0, bottom: 600, right: 800, width: 800, height: 600, x: 0, y: 0, toJSON: () => '' } as DOMRect;
    const moveEvent = {
      active: { data: { current: { materialName: 'Button' } } },
      delta: { x: 0, y: 0 },
      activatorEvent: { clientX: 400, clientY: 300 } as MouseEvent,
    } as unknown as DragMoveEvent;

    dragon.onDragMove(
      moveEvent,
      { zoom: 1, components: [], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 0, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      viewportRect,
      undefined,
      400,
      300,
    );

    expect(onScroll).not.toHaveBeenCalled();
    dragon.onDragEnd();
  });

  it('V4-B10: onDragEnd 调用 scroller.cancel 停止动画', () => {
    const cancelSpy = vi.spyOn(CanvasScroller.prototype, 'cancel');
    const dragon = new Dragon();

    const startEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);
    dragon.onDragEnd();

    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });

  // ========== Phase B: DropLocation ==========

  it('V4-B8: onDragMove 维护 currentDropLocation', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    // 容器组件在画布上
    const container = makeComp({ id: 'container', x: 1, y: 1, width: 6, height: 4, children: [] });
    const viewportRect = { top: 0, left: 0, bottom: 600, right: 800, width: 800, height: 600, x: 0, y: 0, toJSON: () => '' } as DOMRect;
    const moveEvent = {
      active: { data: { current: { materialName: 'Button' } } },
      delta: { x: 200, y: 100 },
      activatorEvent: { clientX: 0, clientY: 0 } as MouseEvent,
    } as unknown as DragMoveEvent;

    dragon.onDragMove(
      moveEvent,
      { zoom: 1, components: [container], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 16, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      viewportRect,
      undefined,
      200,
      100,
    );

    const loc = dragon.getDropLocation();
    expect(loc).not.toBeNull();
    expect(loc!.source).toBe('canvas');
    expect(loc!.targetContainerId).toBe('container');
    expect(loc!.detail.type).toBe('Children');
    expect(loc!.event.dragObject.materialName).toBe('Button');
    dragon.onDragEnd();
  });

  it('V4-B8: onDragEnd 清空 dropLocation 和 dragObject', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { componentId: 'comp-1' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    expect(dragon.getDragObject()).not.toBeNull();
    dragon.onDragEnd();
    expect(dragon.getDropLocation()).toBeNull();
    expect(dragon.getDragObject()).toBeNull();
  });

  it('V4-B8: getDragObject 返回正确的 type 和 id', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { componentId: 'comp-xyz' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    const obj = dragon.getDragObject();
    expect(obj).not.toBeNull();
    expect(obj!.type).toBe('canvas-component');
    expect(obj!.componentId).toBe('comp-xyz');
    dragon.onDragEnd();
  });

  // ========== Phase C: B8b tree-drop 协议收敛 ==========

  it('V4-B8b: registerTreeDrop 后 getDropLocation 返回 source="tree"', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { componentId: 'comp-1' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    dragon.registerTreeDrop({ parentId: 'container-1', index: 2 });

    // onDragMove 在无 canvas 容器时 dropTarget 为 null，应回退到 tree-drop
    dragon.onDragMove(
      { active: { data: { current: { componentId: 'comp-1' } } }, delta: { x: 0, y: 0 }, activatorEvent: { clientX: 0, clientY: 0 } as MouseEvent } as unknown as DragMoveEvent,
      { zoom: 1, components: [], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 0, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      undefined,
      undefined,
      0,
      0,
    );

    const loc = dragon.getDropLocation();
    expect(loc).not.toBeNull();
    expect(loc!.source).toBe('tree');
    expect(loc!.targetContainerId).toBe('container-1');
    expect(loc!.detail.index).toBe(2);
    expect(loc!.detail.type).toBe('Children');
    expect(loc!.detail.valid).toBe(true);

    dragon.onDragEnd();
  });

  it('V4-B8b: registerTreeDrop(null) 后 getDropLocation 返回 null', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    dragon.registerTreeDrop(null);

    dragon.onDragMove(
      { active: { data: { current: { materialName: 'Button' } } }, delta: { x: 0, y: 0 }, activatorEvent: { clientX: 0, clientY: 0 } as MouseEvent } as unknown as DragMoveEvent,
      { zoom: 1, components: [], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 0, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      undefined,
      undefined,
      0,
      0,
    );

    expect(dragon.getDropLocation()).toBeNull();
    dragon.onDragEnd();
  });

  it('V4-B8b: canvas locate 结果优先于 tree-drop 落点', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    // 同时设置 tree-drop 和 canvas 容器（canvas 优先）
    dragon.registerTreeDrop({ parentId: 'tree-container', index: 5 });

    const canvasContainer = makeComp({ id: 'canvas-container', x: 1, y: 1, width: 6, height: 4, children: [] });
    const viewportRect = { top: 0, left: 0, bottom: 600, right: 800, width: 800, height: 600, x: 0, y: 0, toJSON: () => '' } as DOMRect;

    dragon.onDragMove(
      { active: { data: { current: { materialName: 'Button' } } }, delta: { x: 200, y: 100 }, activatorEvent: { clientX: 0, clientY: 0 } as MouseEvent } as unknown as DragMoveEvent,
      { zoom: 1, components: [canvasContainer], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 16, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      viewportRect,
      undefined,
      200,
      100,
    );

    const loc = dragon.getDropLocation();
    expect(loc).not.toBeNull();
    // canvas 优先
    expect(loc!.source).toBe('canvas');
    expect(loc!.targetContainerId).toBe('canvas-container');

    dragon.onDragEnd();
  });

  it('V4-B8b: onDragEnd 清空 _treeDropTarget', () => {
    const dragon = new Dragon();
    const startEvent = {
      active: { data: { current: { componentId: 'comp-1' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent);

    dragon.registerTreeDrop({ parentId: 'c', index: 0 });
    dragon.onDragEnd();

    // onDragEnd 清空后，下次 onDragMove 不应产出 tree-drop
    const startEvent2 = {
      active: { data: { current: { materialName: 'Button' } } },
    } as unknown as DragStartEvent;
    dragon.onDragStart(startEvent2);
    dragon.onDragMove(
      { active: { data: { current: { materialName: 'Button' } } }, delta: { x: 0, y: 0 }, activatorEvent: { clientX: 0, clientY: 0 } as MouseEvent } as unknown as DragMoveEvent,
      { zoom: 1, components: [], selectedIds: [], gridCols: 12, positionMode: 'grid' },
      { width: 1440, padding: 0, gap: 4, cellWidth: 80, cellHeight: 40, columnWidth: 80 },
      undefined,
      undefined,
      0,
      0,
    );
    expect(dragon.getDropLocation()).toBeNull();
    dragon.onDragEnd();
  });
});
