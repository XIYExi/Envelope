/**
 * BorderContainer 渲染测试
 *
 * 覆盖 dropTarget → 容器查找 → DOM rect / computePixelRect 回退 → JSX 输出。
 *
 * V6: BorderContainer 通过 CanvasHost.getComponentRect() 统一获取 rect。
 *
 * @author xiye
 * @date 2026-06-30
 */
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { BorderContainer } from '../../src/canvas/bem-tools/border-container';
import { CanvasHost } from '../../src/canvas/canvas-host';
import type { CanvasComponent, DropTargetInfo, DomRectEntry } from '../../src/canvas/types';

function makeComp(overrides: Partial<CanvasComponent> = {}): CanvasComponent {
  return {
    id: overrides.id ?? 'c-1',
    node: {
      id: overrides.id ?? 'c-1',
      type: overrides.node?.type ?? 'Card',
      name: overrides.node?.name ?? 'Card-1',
      category: overrides.node?.category ?? 'layout',
      props: overrides.node?.props ?? {},
      children: overrides.node?.children ?? [],
    },
    position: overrides.position ?? { x: 1, y: 1, width: 6, height: 4 },
    hidden: overrides.hidden,
  };
}

/** 创建测试用 CanvasHost */
function makeHost(components: CanvasComponent[], domRects: Record<string, DomRectEntry> = {}): CanvasHost {
  const host = new CanvasHost({
    viewport: { panX: 0, panY: 0, zoom: 1 },
    grid: {
      columnWidth: 80,
      gap: 4,
      padding: 16,
      cellWidth: 80,
      cellHeight: 40,
      gridCols: 12,
      positionMode: 'grid',
    },
  });
  host.setComponents(components);
  host.setDomRects(domRects);
  return host;
}

describe('BorderContainer', () => {
  it('dropTarget 为 null 时不渲染', () => {
    const host = makeHost([makeComp()]);
    const { container } = render(
      <BorderContainer
        dropTarget={null}
        components={[makeComp()]}
        host={host}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });

  it('dropTarget.type 不是 cover 时不渲染', () => {
    const dt: DropTargetInfo = {
      type: 'before',
      rect: { x: 0, y: 0, width: 100, height: 100 },
    };
    const host = makeHost([makeComp()]);
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[makeComp()]}
        host={host}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });

  it('dropTarget.type = cover 且有匹配的容器时渲染', () => {
    const comp = makeComp({ id: 'c-1' });
    const host = makeHost([comp]);
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 50, y: 50, width: 200, height: 100 },
      containerId: 'c-1',
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[comp]}
        host={host}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeTruthy();
    expect(container.querySelector('.bem-border-container-label')).toBeTruthy();
  });

  it('使用 domRects 中的实际矩形定位', () => {
    const comp = makeComp({ id: 'c-1' });
    const domRects: Record<string, DomRectEntry> = {
      'c-1': { top: 60, left: 100, width: 300, height: 120, bottom: 180, right: 400 },
    };
    const host = makeHost([comp], domRects);
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 0, y: 0, width: 0, height: 0 },
      containerId: 'c-1',
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[comp]}
        host={host}
      />,
    );
    const el = container.querySelector('.bem-border-container') as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.style.left).toBe('100px');
    expect(el.style.top).toBe('60px');
    expect(el.style.width).toBe('300px');
    expect(el.style.height).toBe('120px');
  });

  it('非容器类型不渲染', () => {
    const comp = makeComp({ id: 'btn-1', node: { id: 'btn-1', type: 'Button', name: 'Btn', category: 'form', props: {} } });
    const host = makeHost([comp]);
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 0, y: 0, width: 100, height: 100 },
      containerId: 'btn-1',
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[comp]}
        host={host}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });

  it('隐藏组件不渲染', () => {
    const comp = makeComp({ id: 'c-1', hidden: true });
    const host = makeHost([comp]);
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 0, y: 0, width: 100, height: 100 },
      containerId: 'c-1',
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[comp]}
        host={host}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });
});
