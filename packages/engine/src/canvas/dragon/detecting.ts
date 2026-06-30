/**
 * 悬停检测管理器
 *
 * 管理与选中系统分离的悬停状态。
 * 在拖拽/缩放等操作期间可通过 enable 开关临时禁用，
 * 避免操作过程中出现不必要的悬停闪烁。
 *
 * 参考 lowcode-engine `designer/src/designer/detecting.ts`
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/designer/detecting.ts
 */

/**
 * 悬停状态变化的监听器回调
 * @param nodeId - 被悬停的组件 ID，null 表示无悬停
 */
export type DetectingListener = (nodeId: string | null) => void;

/**
 * 悬停检测管理器
 *
 * 独立于 Selection 系统维护当前悬停的组件 ID。
 * 通过 capture/release 控制悬停状态，通过 onChange 订阅变化。
 *
 * 使用示例：
 * ```
 * const detecting = new Detecting();
 * detecting.capture('comp-123'); // 设置悬停
 * detecting.release('comp-123'); // 清除悬停
 * detecting.enable = false;      // 临时禁用（拖拽/缩放时）
 * ```
 */
export class Detecting {
  /** 是否启用悬停检测 */
  private _enable = true;

  /** 当前悬停的组件 ID */
  private _current: string | null = null;

  /** 状态变化监听器列表 */
  private listeners = new Set<DetectingListener>();

  /** 是否启用悬停检测。设为 false 时会自动清除当前悬停状态 */
  get enable() {
    return this._enable;
  }

  set enable(flag: boolean) {
    this._enable = flag;
    if (!flag) {
      this._current = null;
      this.notify();
    }
  }

  /** 当前悬停的组件 ID */
  get current(): string | null {
    return this._current;
  }

  /**
   * 捕获悬停状态
   * 仅在 enable 为 true 且节点 ID 发生变化时才更新
   */
  capture(nodeId: string | null) {
    if (!this._enable) return;
    if (this._current !== nodeId) {
      this._current = nodeId;
      this.notify();
    }
  }

  /**
   * 释放悬停状态
   * 仅在当前状态与传入的 nodeId 一致时才清除
   */
  release(nodeId: string | null) {
    if (this._current === nodeId) {
      this._current = null;
      this.notify();
    }
  }

  /** 强制重置悬停状态 */
  reset() {
    if (this._current !== null) {
      this._current = null;
      this.notify();
    }
  }

  /**
   * 订阅悬停状态变化
   * @returns 取消订阅的函数
   */
  onChange(fn: DetectingListener) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  /** 通知所有监听器当前状态已变化 */
  private notify() {
    this.listeners.forEach(fn => fn(this._current));
  }

  /** 销毁管理器，清理所有监听器和状态 */
  dispose() {
    this.listeners.clear();
    this._current = null;
  }
}
