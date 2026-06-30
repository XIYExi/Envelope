import { describe, it, expect, vi } from 'vitest';
import { EventBus, createModuleEventBus } from '../src/event-bus';

// 测试用事件类型
type TestEvents = {
  'test:event': { value: number };
  'test:string': string;
  'test:void': void;
};

describe('EventBus', () => {
  it('V4-E1: on + emit — handler 被调用且 payload 正确', () => {
    const bus = new EventBus<TestEvents>();
    const handler = vi.fn();
    bus.on('test:event', handler);
    bus.emit('test:event', { value: 42 });
    expect(handler).toHaveBeenCalledWith({ value: 42 });
  });

  it('V4-E1: off — 取消注册后 handler 不再被调用', () => {
    const bus = new EventBus<TestEvents>();
    const handler = vi.fn();
    bus.on('test:event', handler);
    bus.off('test:event', handler);
    bus.emit('test:event', { value: 1 });
    expect(handler).not.toHaveBeenCalled();
  });

  it('V4-E1: on 返回的 unsubscribe 可取消订阅', () => {
    const bus = createModuleEventBus<TestEvents>('Test');
    const handler = vi.fn();
    const unsub = bus.on('test:event', handler);
    unsub();
    bus.emit('test:event', { value: 1 });
    expect(handler).not.toHaveBeenCalled();
  });

  it('V4-E1: once — handler 只触发一次', () => {
    const bus = new EventBus<TestEvents>();
    const handler = vi.fn();
    bus.once('test:event', handler);
    bus.emit('test:event', { value: 1 });
    bus.emit('test:event', { value: 2 });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('V4-E6: enableLogging 输出调试日志（spy console.log）', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const bus = new EventBus<TestEvents>({ namespace: 'Test', enableLogging: true });
    bus.emit('test:string', 'hello');
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[EventBus:Test] emit:'),
      'test:string',
      'hello',
    );
    spy.mockRestore();
  });

  it('V4-E1: 多个 handler 注册到同一事件全部执行', () => {
    const bus = createModuleEventBus<TestEvents>('Multi');
    const a = vi.fn();
    const b = vi.fn();
    bus.on('test:event', a);
    bus.on('test:event', b);
    bus.emit('test:event', { value: 1 });
    expect(a).toHaveBeenCalledOnce();
    expect(b).toHaveBeenCalledOnce();
  });

  it('V4-E1: off 不存在的 handler 不抛错', () => {
    const bus = new EventBus<TestEvents>();
    expect(() => bus.off('test:event', vi.fn())).not.toThrow();
  });

  it('destroy 清除所有 handler', () => {
    const bus = createModuleEventBus<TestEvents>('Destroy');
    const handler = vi.fn();
    bus.on('test:event', handler);
    bus.destroy();
    bus.emit('test:event', { value: 1 });
    expect(handler).not.toHaveBeenCalled();
  });

  it('createModuleEventBus 返回可用的 EventBus 实例', () => {
    const bus = createModuleEventBus<TestEvents>('TestModule');
    expect(bus).toBeInstanceOf(EventBus);
    const handler = vi.fn();
    bus.on('test:string', handler);
    bus.emit('test:string', 'works');
    expect(handler).toHaveBeenCalledWith('works');
  });

  it('void 事件的 emit/on 正常工作', () => {
    const bus = new EventBus<TestEvents>();
    const handler = vi.fn();
    bus.on('test:void', handler);
    bus.emit('test:void', undefined as any);
    expect(handler).toHaveBeenCalledOnce();
  });
});
