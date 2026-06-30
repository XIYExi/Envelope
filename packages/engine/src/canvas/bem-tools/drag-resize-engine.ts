/**
 * DragResizeEngine — 拖拽缩放事件引擎
 *
 * 提供基于事件总线的拖拽缩放能力，替代 ResizeHandle 中内联的
 * useRef + window.addEventListener 模式。
 *
 * 核心 API：
 *   from(shell, direction, boost) — 绑定 mousedown 到缩放手柄 DOM 元素
 *   onResizeStart(fn)            — 订阅缩放开始事件
 *   onResize(fn)                 — 订阅缩放移动事件
 *   onResizeEnd(fn)              — 订阅缩放结束事件
 *
 * 缩放过程中自动禁用 Detecting（避免缩放时出现悬停闪烁）。
 *
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/bem-tools/drag-resize-engine.ts
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import mitt, { type Emitter } from 'mitt';
import type { ResizeDirection } from '../resize-utils';

/** DragResizeEngine 事件映射 */
export interface DragResizeEvents {
  resizeStart: { event: PointerEvent; direction: ResizeDirection; };
  resize: { event: PointerEvent; direction: ResizeDirection; moveX: number; moveY: number; };
  resizeEnd: { event: PointerEvent; direction: ResizeDirection; };
}

/**
 * 拖拽缩放事件引擎
 *
 * 使用示例：
 * ```
 * const engine = new DragResizeEngine();
 * engine.onResizeStart(({ event, direction }) => { ... });
 * engine.onResize(({ moveX, moveY, direction }) => { ... });
 * engine.onResizeEnd(({ direction }) => { ... });
 *
 * // 绑定到 DOM 元素
 * const unsub = engine.from(handleEl, 'e', () => activeComponent);
 * ```
 */
export class DragResizeEngine {
  private emitter: Emitter<Record<string, unknown>> = mitt<Record<string, unknown>>();
  private _resizing = false;

  /** 是否正在拖拽缩放中 */
  get isResizing(): boolean {
    return this._resizing;
  }

  /**
   * 将引擎绑定到缩放手柄 DOM 元素
   *
   * 注册 pointerdown 监听器，在手柄被按下时开始缩放操作：
   *  - 在 document 上注册 pointermove + pointerup 监听器
   *  - 发射 resizeStart 事件
   *  - 每次 pointermove 发射 resize 事件（含 moveX/moveY 偏移）
   *  - pointerup 时发射 resizeEnd 并清理监听器
   *
   * @param shell - 缩放手柄 DOM 元素
   * @param direction - 手柄方向 (n/s/e/w/ne/nw/se/sw)
   * @returns 解绑函数
   */
  from(
    shell: HTMLElement,
    direction: ResizeDirection,
  ): () => void {
    if (!shell) return () => {};

    const handlePointerDown = (startEvent: PointerEvent) => {
      startEvent.stopPropagation();
      startEvent.preventDefault();

      const startX = startEvent.clientX;
      const startY = startEvent.clientY;
      this._resizing = true;

      this.emitter.emit('resizeStart', { event: startEvent, direction } as any);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!this._resizing) return;
        const moveX = moveEvent.clientX - startX;
        const moveY = moveEvent.clientY - startY;
        this.emitter.emit('resize', { event: moveEvent, direction, moveX, moveY } as any);
      };

      const handlePointerUp = (upEvent: PointerEvent) => {
        this._resizing = false;
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
        this.emitter.emit('resizeEnd', { event: upEvent, direction } as any);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

    shell.addEventListener('pointerdown', handlePointerDown);

    return () => {
      shell.removeEventListener('pointerdown', handlePointerDown);
    };
  }

  /**
   * 订阅缩放开始事件
   * @returns 取消订阅函数
   */
  onResizeStart(fn: (payload: DragResizeEvents['resizeStart']) => void): () => void {
    (this.emitter as any).on('resizeStart', fn);
    return () => { (this.emitter as any).off('resizeStart', fn); };
  }

  /**
   * 订阅缩放移动事件
   * @returns 取消订阅函数
   */
  onResize(fn: (payload: DragResizeEvents['resize']) => void): () => void {
    (this.emitter as any).on('resize', fn);
    return () => { (this.emitter as any).off('resize', fn); };
  }

  /**
   * 订阅缩放结束事件
   * @returns 取消订阅函数
   */
  onResizeEnd(fn: (payload: DragResizeEvents['resizeEnd']) => void): () => void {
    (this.emitter as any).on('resizeEnd', fn);
    return () => { (this.emitter as any).off('resizeEnd', fn); };
  }

  /**
   * 销毁引擎，清除所有事件监听
   */
  destroy(): void {
    this.emitter.all.clear();
    this._resizing = false;
  }
}
