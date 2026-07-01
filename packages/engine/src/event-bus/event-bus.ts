/**
 * EventBus — 基于 mitt 的同步事件总线
 *
 * 提供与 lowcode-engine `createModuleEventBus` 一致的工厂模式：
 *
 * ```ts
 * const bus = createModuleEventBus<EditorEventMap>('Canvas');
 * bus.on('canvas:select', ({ id }) => { ... });
 * bus.emit('canvas:select', { id: 'abc', ids: ['abc'] });
 * ```
 *
 * @reference 参考 lowcode-engine-main/packages/editor-core/src/event-bus.ts
 *   createModuleEventBus 工厂模式，底层改用浏览器原生 mitt（200 bytes）而非 Node events 模块。
 */

import mitt from 'mitt';

export interface EventBusConfig {
  namespace?: string;
  enableLogging?: boolean;
}

/**
 * 类型安全的事件总线
 *
 * T 为事件映射类型：{ eventName: payloadType }
 * 使用方式：new EventBus<EditorEventMap>({ namespace: 'Canvas' })
 */
export class EventBus<T extends Record<string, unknown>> {
  private mittEmitter = mitt<T>();
  private config: { namespace: string; enableLogging: boolean };

  constructor(config?: EventBusConfig) {
    this.config = {
      namespace: '',
      enableLogging: false,
      ...config,
    };
  }

  /**
   * 注册事件监听
   * @returns 取消订阅函数
   */
  on<K extends keyof T>(type: K, handler: (payload: T[K]) => void): () => void {
    this.mittEmitter.on(type, handler as any);
    return () => this.mittEmitter.off(type, handler as any);
  }

  /**
   * 取消事件监听
   */
  off<K extends keyof T>(type: K, handler: (payload: T[K]) => void): void {
    this.mittEmitter.off(type, handler as any);
  }

  /**
   * 触发事件
   */
  emit<K extends keyof T>(type: K, payload: T[K]): void {
    if (this.config.enableLogging) {
      const prefix = this.config.namespace
        ? `[EventBus:${this.config.namespace}]`
        : '[EventBus]';
      console.log(`${prefix} emit:`, String(type), payload);
    }
    this.mittEmitter.emit(type, payload);
  }

  /**
   * 单次监听：触发后自动解除
   * @returns 取消订阅函数（可在触发前手动取消）
   */
  once<K extends keyof T>(type: K, handler: (payload: T[K]) => void): () => void {
    const wrapped = (p: T[K]) => {
      handler(p);
      this.mittEmitter.off(type, wrapped as any);
    };
    this.mittEmitter.on(type, wrapped as any);
    return () => this.mittEmitter.off(type, wrapped as any);
  }

  /**
   * 销毁总线，清除所有监听器
   */
  destroy(): void {
    this.mittEmitter.all.clear();
  }

  /**
   * 带命名空间前缀的 emit
   *
   * 对齐 lowcode-engine `Designer.postEvent(event, ...args)` →
   * `this.editor.eventBus.emit(\`designer.${event}\`, ...args)` 的命名空间模式。
   *
   * 若实例有 namespace，自动拼接 `${namespace}.${String(type)}` 作为实际事件名；
   * 若无 namespace，降级为普通 emit（透传 type）。
   *
   * @reference lowcode-engine-main/packages/designer/src/designer/designer.ts:303-304
   */
  prefixedEmit<K extends keyof T>(type: K, payload: T[K]): void {
    if (this.config.namespace) {
      const fullKey = `${this.config.namespace}.${String(type)}` as unknown as K;
      this.emit(fullKey, payload);
    } else {
      this.emit(type, payload);
    }
  }

  /**
   * 带命名空间前缀的 on
   *
   * 与 prefixedEmit 配对使用，自动拼接 `${namespace}.${String(type)}` 作为实际事件名。
   * 若无 namespace，降级为普通 on。
   *
   * @returns 取消订阅函数
   */
  prefixedOn<K extends keyof T>(type: K, handler: (payload: T[K]) => void): () => void {
    if (this.config.namespace) {
      const fullKey = `${this.config.namespace}.${String(type)}` as unknown as K;
      return this.on(fullKey, handler);
    }
    return this.on(type, handler);
  }

  /**
   * 当前注册的事件类型集合（仅用于调试/测试）
   */
  get eventTypes(): string[] {
    return Array.from(this.mittEmitter.all.keys()).map(String);
  }
}

/**
 * 创建模块级事件总线
 *
 * @param namespace 可选命名空间，用于日志标识
 * @returns EventBus 实例
 *
 * @example
 * ```ts
 * const bus = createModuleEventBus<EditorEventMap>('Canvas');
 * bus.on('canvas:select', handler);
 * ```
 */
export function createModuleEventBus<T extends Record<string, unknown> = Record<string, unknown>>(
  namespace?: string,
): EventBus<T> {
  return new EventBus<T>({ namespace });
}
