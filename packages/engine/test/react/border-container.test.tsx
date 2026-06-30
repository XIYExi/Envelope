/**
 * BorderContainer 渲染测试
 *
 * 覆盖 dropTarget → 容器查找 → DOM rect / computePixelRect 回退 → JSX 输出。
 *
 * @author xiye
 * @date 2026-06-30
 */
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { BorderContainer } from '../../src/canvas/bem-tools/border-container';
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

const gridParams = {
  columnWidth: 80,
  gridGap: 4,
  pagePadding: 16,
  cellWidth: 80,
  cellHeight: 40,
  positionMode: 'grid' as const,
};

describe('BorderContainer', () => {
  it('dropTarget 为 null 时不渲染', () => {
    const { container } = render(
      <BorderContainer
        dropTarget={null}
        components={[makeComp()]}
        domRects={{}}
        {...gridParams}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });

  it('dropTarget.type 不是 cover 时不渲染', () => {
    const dt: DropTargetInfo = {
      type: 'before',
      rect: { x: 0, y: 0, width: 100, height: 100 },
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[makeComp()]}
        domRects={{}}
        {...gridParams}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });

  it('dropTarget.type = cover 且有匹配的容器时渲染', () => {
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 50, y: 50, width: 200, height: 100 },
      containerId: 'c-1',
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[makeComp({ id: 'c-1' })]}
        domRects={{}}
        {...gridParams}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeTruthy();
    expect(container.querySelector('.bem-border-container-label')).toBeTruthy();
  });

  it('使用 domRects 中的实际矩形定位', () => {
    const domRects: Record<string, DomRectEntry> = {
      'c-1': { top: 60, left: 100, width: 300, height: 120, bottom: 180, right: 400 },
    };
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 0, y: 0, width: 0, height: 0 },
      containerId: 'c-1',
    };
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[makeComp({ id: 'c-1' })]}
        domRects={domRects}
        {...gridParams}
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
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 0, y: 0, width: 100, height: 100 },
      containerId: 'btn-1',
    };
    const comp = makeComp({ id: 'btn-1', node: { id: 'btn-1', type: 'Button', name: 'Btn', category: 'form', props: {} } });
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[comp]}
        domRects={{}}
        {...gridParams}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });

  it('隐藏组件不渲染', () => {
    const dt: DropTargetInfo = {
      type: 'cover',
      rect: { x: 0, y: 0, width: 100, height: 100 },
      containerId: 'c-1',
    };
    const comp = makeComp({ id: 'c-1', hidden: true });
    const { container } = render(
      <BorderContainer
        dropTarget={dt}
        components={[comp]}
        domRects={{}}
        {...gridParams}
      />,
    );
    expect(container.querySelector('.bem-border-container')).toBeNull();
  });
});
