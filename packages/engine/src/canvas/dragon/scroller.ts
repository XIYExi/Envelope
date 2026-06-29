/**
 * 画布自动滚动器
 *
 * 在拖拽操作中，当鼠标移到画布边缘时自动触发滚动。
 * 边缘触发距离默认为 30px，距边缘越近滚动速度越快（5~30px/frame）。
 *
 * 使用 requestAnimationFrame 实现平滑滚动，
 * 拖拽结束后需调用 cancel() 停止动画循环。
 *
 * 参考 lowcode-engine `designer/src/designer/scroller.ts`
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/designer/scroller.ts
 */

/**
 * 滚动控制参数
 */
export interface ScrollConfig {
  /** 是否启用自动滚动 */
  enabled: boolean;
  /** 触发自动滚动的边缘距离阈值（px），默认 30 */
  accuracy?: number;
  /** 最大滚动速度（px/frame），默认 30 */
  maxSpeed?: number;
  /** 最小滚动速度（px/frame），默认 5 */
  minSpeed?: number;
}

/** 默认配置 */
const DEFAULT_CONFIG: Required<ScrollConfig> = {
  enabled: true,
  accuracy: 30,
  maxSpeed: 30,
  minSpeed: 5,
};

/**
 * 可滚动容器的接口抽象
 *
 * 抽离滚动操作，使得 CanvasScroller 不依赖于具体 DOM 元素，
 * 便于测试和适配不同的容器实现（原生 div / iframe / 虚拟滚动）。
 */
export interface ScrollViewport {
  /** 当前水平滚动偏移量（px） */
  scrollLeft: number;
  /** 当前垂直滚动偏移量（px） */
  scrollTop: number;
  /** 内容总宽度（含溢出部分，px） */
  scrollWidth: number;
  /** 内容总高度（含溢出部分，px） */
  scrollHeight: number;
  /** 容器可见区域的宽度（px） */
  clientWidth: number;
  /** 容器可见区域的高度（px） */
  clientHeight: number;
  /** 滚动到指定位置 */
  scrollTo(x: number, y: number): void;
}

/**
 * 画布自动滚动器
 *
 * 使用示例：
 * ```
 * const scroller = new CanvasScroller({ accuracy: 40, maxSpeed: 20 });
 * // 在拖拽移动事件中调用：
 * scroller.scrolling(mouseX, mouseY, canvasRect, scrollableEl);
 * // 拖拽结束时：
 * scroller.cancel();
 * ```
 */
export class CanvasScroller {
  /** requestAnimationFrame 的 ID，用于取消动画 */
  private pid: number | undefined;
  /** 当前配置 */
  private config: Required<ScrollConfig>;

  constructor(config?: Partial<ScrollConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /** 当前是否启用自动滚动 */
  get isEnabled() {
    return this.config.enabled;
  }

  /** 动态开启/关闭自动滚动。关闭时会立即停止当前动画 */
  setEnabled(flag: boolean) {
    this.config.enabled = flag;
    if (!flag) this.cancel();
  }

  /**
   * 在每次拖拽移动事件中调用
   *
   * 计算鼠标到画布四边的距离，如果进入阈值区域则启动滚动动画，
   * 否则不做任何操作。
   *
   * @param clientX - 鼠标在视口中的 X 坐标（clientX）
   * @param clientY - 鼠标在视口中的 Y 坐标（clientY）
   * @param viewport - 可滚动视口的 DOMRect（getBoundingClientRect）
   * @param scrollable - 可滚动容器的抽象接口
   */
  scrolling(
    clientX: number,
    clientY: number,
    viewport: DOMRect,
    scrollable: ScrollViewport,
  ) {
    if (!this.config.enabled) return;
    this.cancel();

    const { accuracy, maxSpeed, minSpeed } = this.config;

    // 计算垂直方向和水平方向的速度值
    // ay > 0 = 向下滚动, ay < 0 = 向上滚动
    // ax > 0 = 向右滚动, ax < 0 = 向左滚动
    let ax = 0;
    let ay = 0;

    // 鼠标进入上边缘或下边缘阈值区域
    if (clientY < viewport.top + accuracy) {
      ay = -Math.min(Math.max(viewport.top + accuracy - clientY, minSpeed), maxSpeed);
    } else if (clientY > viewport.bottom - accuracy) {
      ay = Math.min(Math.max(clientY + accuracy - viewport.bottom, minSpeed), maxSpeed);
    }

    // 鼠标进入左边缘或右边缘阈值区域
    if (clientX < viewport.left + accuracy) {
      ax = -Math.min(Math.max(viewport.left + accuracy - clientX, minSpeed), maxSpeed);
    } else if (clientX > viewport.right - accuracy) {
      ax = Math.min(Math.max(clientX + accuracy - viewport.right, minSpeed), maxSpeed);
    }

    // 不需要滚动时直接返回
    if (!ax && !ay) return;

    // rAF 循环：持续递增滚动偏移，直到 cancel() 被调用
    const animate = () => {
      let sx = scrollable.scrollLeft + ax;
      let sy = scrollable.scrollTop + ay;
      // 钳制到有效滚动范围
      sx = Math.max(0, Math.min(sx, scrollable.scrollWidth - scrollable.clientWidth));
      sy = Math.max(0, Math.min(sy, scrollable.scrollHeight - scrollable.clientHeight));
      scrollable.scrollTo(sx, sy);
      this.pid = requestAnimationFrame(animate);
    };

    this.pid = requestAnimationFrame(animate);
  }

  /** 立即停止滚动动画 */
  cancel() {
    if (this.pid !== undefined) {
      cancelAnimationFrame(this.pid);
      this.pid = undefined;
    }
  }
}
