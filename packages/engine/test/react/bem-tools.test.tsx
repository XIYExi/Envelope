/**
 * BEM Tools 单元测试
 *
 * 覆盖 DragResizeEngine 事件引擎 和 OffsetObserver 偏移计算。
 *
 * @author xiye
 * @date 2026-06-30
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DragResizeEngine } from '../../src/canvas/bem-tools/drag-resize-engine';
import { OffsetObserver } from '../../src/canvas/dragon/offset-observer';
import type { DomRectEntry } from '../../src/canvas/types';

/** 创建一个最小可用的 HTML 元素（仅 node 环境测试 DOM 绑定） */
function makeDiv(): HTMLElement {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
}

describe('DragResizeEngine', () => {
  let engine: DragResizeEngine;

  beforeEach(() => {
    engine = new DragResizeEngine();
  });

  afterEach(() => {
    engine.destroy();
  });

  it('from() 返回解绑函数', () => {
    const el = makeDiv();
    const unbind = engine.from(el, 'e');
    expect(typeof unbind).toBe('function');
    unbind();
    el.remove();
  });

  it('onResizeStart 在 pointerdown 时触发', () => {
    const el = makeDiv();
    const spy = vi.fn();
    engine.onResizeStart(spy);
    engine.from(el, 'e');
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, bubbles: true }));
    expect(spy).toHaveBeenCalledOnce();
    const payload = spy.mock.calls[0][0];
    expect(payload.direction).toBe('e');
    expect(payload.event).toBeInstanceOf(PointerEvent);
    el.remove();
  });

  it('onResize 在 pointermove 时触发并携带 moveX/moveY', () => {
    const el = makeDiv();
    const spy = vi.fn();
    engine.onResize(spy);
    engine.from(el, 'se');
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 110, clientY: 115, bubbles: true }));
    expect(spy).toHaveBeenCalled();
    const payload = spy.mock.calls[0][0];
    expect(payload.moveX).toBe(10);
    expect(payload.moveY).toBe(15);
    expect(payload.direction).toBe('se');
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    el.remove();
  });

  it('onResizeEnd 在 pointerup 时触发', () => {
    const el = makeDiv();
    const startSpy = vi.fn();
    const endSpy = vi.fn();
    engine.onResizeStart(startSpy);
    engine.onResizeEnd(endSpy);
    engine.from(el, 'n');
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 50, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { clientX: 60, clientY: 40, bubbles: true }));
    expect(startSpy).toHaveBeenCalledOnce();
    expect(endSpy).toHaveBeenCalledOnce();
    el.remove();
  });

  it('isResizing 在 pointerdown 后为 true，pointerup 后为 false', () => {
    const el = makeDiv();
    engine.from(el, 'w');
    expect(engine.isResizing).toBe(false);
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }));
    expect(engine.isResizing).toBe(true);
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    expect(engine.isResizing).toBe(false);
    el.remove();
  });

  it('destroy() 后事件不再触发', () => {
    const el = makeDiv();
    const spy = vi.fn();
    engine.onResizeStart(spy);
    engine.from(el, 'e');
    engine.destroy();
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 1, clientY: 1, bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
    el.remove();
  });

  it('unbind 后 pointerdown 不再绑定', () => {
    const el = makeDiv();
    const spy = vi.fn();
    const unbind = engine.from(el, 'e');
    engine.onResizeStart(spy);
    unbind();
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 1, clientY: 1, bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
    el.remove();
  });
});

describe('OffsetObserver', () => {
  it('getOffset 返回补偿后的坐标', () => {
    const domRects: Record<string, DomRectEntry> = {
      'comp-1': { top: 100, left: 200, width: 300, height: 150, bottom: 250, right: 500 },
    };
    const result = OffsetObserver.getOffset('comp-1', domRects, { panX: 10, panY: 20, zoom: 1 });
    expect(result).not.toBeNull();
    expect(result!.left).toBe(200);
    expect(result!.top).toBe(100);
    expect(result!.width).toBe(300);
    expect(result!.height).toBe(150);
    expect(result!.offsetLeft).toBe(210);
    expect(result!.offsetTop).toBe(120);
  });

  it('getOffset 在 zoom > 1 时正确缩放偏移', () => {
    const domRects: Record<string, DomRectEntry> = {
      'comp-2': { top: 50, left: 100, width: 200, height: 100, bottom: 150, right: 300 },
    };
    const result = OffsetObserver.getOffset('comp-2', domRects, { panX: 5, panY: 5, zoom: 2 });
    expect(result).not.toBeNull();
    expect(result!.offsetLeft).toBe(110);
    expect(result!.offsetTop).toBe(60);
    expect(result!.offsetWidth).toBe(200);
  });

  it('getOffset 对不存在的组件返回 null', () => {
    const domRects: Record<string, DomRectEntry> = {};
    const result = OffsetObserver.getOffset('missing', domRects, { panX: 0, panY: 0, zoom: 1 });
    expect(result).toBeNull();
  });

  it('hasOffset 正确判断组件是否注册', () => {
    const domRects: Record<string, DomRectEntry> = {
      'comp-3': { top: 0, left: 0, width: 10, height: 10, bottom: 10, right: 10 },
    };
    expect(OffsetObserver.hasOffset('comp-3', domRects)).toBe(true);
    expect(OffsetObserver.hasOffset('comp-4', domRects)).toBe(false);
  });
});
