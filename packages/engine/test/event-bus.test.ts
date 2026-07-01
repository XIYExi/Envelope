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

  // ========== V4-E2: 命名空间自动前缀 ==========

  it('V4-E2: prefixedEmit 自动拼接 namespace.type 作为事件名', () => {
    const bus = new EventBus<TestEvents>({ namespace: 'editor' });
    const handler = vi.fn();
    bus.on('editor.test:event', handler);
    bus.prefixedEmit('test:event', { value: 99 });
    expect(handler).toHaveBeenCalledWith({ value: 99 });
  });

  it('V4-E2: prefixedOn 自动拼接 namespace.type 监听正确事件', () => {
    const bus = new EventBus<TestEvents>({ namespace: 'editor' });
    const handler = vi.fn();
    bus.prefixedOn('test:event', handler);
    bus.emit('editor.test:event', { value: 42 });
    expect(handler).toHaveBeenCalledWith({ value: 42 });
  });

  it('V4-E2: prefixedOn 返回 unsubscribe 可正常取消', () => {
    const bus = new EventBus<TestEvents>({ namespace: 'editor' });
    const handler = vi.fn();
    const unsub = bus.prefixedOn('test:event', handler);
    unsub();
    bus.emit('editor.test:event', { value: 1 });
    expect(handler).not.toHaveBeenCalled();
  });

  it('V4-E2: 无 namespace 时 prefixedEmit 降级为普通 emit', () => {
    const bus = new EventBus<TestEvents>();
    const handler = vi.fn();
    bus.on('test:event', handler);
    bus.prefixedEmit('test:event', { value: 77 });
    expect(handler).toHaveBeenCalledWith({ value: 77 });
  });

  it('V4-E2: 无 namespace 时 prefixedOn 降级为普通 on', () => {
    const bus = new EventBus<TestEvents>();
    const handler = vi.fn();
    bus.prefixedOn('test:event', handler);
    bus.emit('test:event', { value: 55 });
    expect(handler).toHaveBeenCalledWith({ value: 55 });
  });

  it('V4-E2: prefixedOn + prefixedEmit 对称匹配', () => {
    const bus = new EventBus<TestEvents>({ namespace: 'canvas' });
    const handler = vi.fn();
    bus.prefixedOn('test:string', handler);
    bus.prefixedEmit('test:string', 'prefixed-match');
    expect(handler).toHaveBeenCalledWith('prefixed-match');
  });

  // ========== V4-E3: Event-driven selection (integration pattern) ==========

  it('V4-E3: canvas:select 事件驱动 RightPanel 选中状态更新', () => {
    type EditorEvents = {
      'canvas:select': { id: string | null; ids: string[] };
    };

    const bus = new EventBus<EditorEvents>();
    const received: { id: string | null; ids: string[] }[] = [];

    const unsub = bus.on('canvas:select', (payload) => {
      received.push({ ...payload });
    });

    bus.emit('canvas:select', { id: 'node-a', ids: ['node-a'] });
    bus.emit('canvas:select', { id: 'node-b', ids: ['node-a', 'node-b'] });
    bus.emit('canvas:select', { id: null, ids: [] });

    expect(received).toHaveLength(3);
    expect(received[0]).toEqual({ id: 'node-a', ids: ['node-a'] });
    expect(received[1]).toEqual({ id: 'node-b', ids: ['node-a', 'node-b'] });
    expect(received[2]).toEqual({ id: null, ids: [] });

    unsub();
    bus.emit('canvas:select', { id: 'node-c', ids: ['node-c'] });
    expect(received).toHaveLength(3); // unsub 后不再接收
  });

  it('V4-E3: 多个 listener 可同时订阅 canvas:select 事件', () => {
    type EditorEvents = {
      'canvas:select': { id: string | null; ids: string[] };
    };

    const bus = new EventBus<EditorEvents>();
    const handlerA = vi.fn();
    const handlerB = vi.fn();

    bus.on('canvas:select', handlerA);
    bus.on('canvas:select', handlerB);
    bus.emit('canvas:select', { id: 'x', ids: ['x'] });

    expect(handlerA).toHaveBeenCalledWith({ id: 'x', ids: ['x'] });
    expect(handlerB).toHaveBeenCalledWith({ id: 'x', ids: ['x'] });
  });

  // ========== V4-E4: FlowEditor → Canvas 事件驱动 ==========

  it('V4-E4: flow:execute 事件正确携带 flowId 和 triggerData', () => {
    type EditorEvents = {
      'flow:execute': { flowId: string; triggerData: unknown };
    };

    const bus = new EventBus<EditorEvents>();
    const handler = vi.fn();
    bus.on('flow:execute', handler);

    bus.emit('flow:execute', { flowId: 'flow-abc', triggerData: { userId: 42 } });
    expect(handler).toHaveBeenCalledWith({ flowId: 'flow-abc', triggerData: { userId: 42 } });
  });

  it('V4-E4: flow:complete 事件正确携带 flowId 和 result', () => {
    type EditorEvents = {
      'flow:complete': { flowId: string; result: unknown };
    };

    const bus = new EventBus<EditorEvents>();
    const handler = vi.fn();
    bus.on('flow:complete', handler);

    bus.emit('flow:complete', { flowId: 'flow-xyz', result: { success: true, output: 'done' } });
    expect(handler).toHaveBeenCalledWith({ flowId: 'flow-xyz', result: { success: true, output: 'done' } });
  });

  it('V4-E4: flow:execute → flow:complete 事件序列', () => {
    type EditorEvents = {
      'flow:execute': { flowId: string; triggerData: unknown };
      'flow:complete': { flowId: string; result: unknown };
    };

    const bus = new EventBus<EditorEvents>();
    const sequence: string[] = [];

    bus.on('flow:execute', () => sequence.push('execute'));
    bus.on('flow:complete', () => sequence.push('complete'));

    bus.emit('flow:execute', { flowId: 'f1', triggerData: null });
    bus.emit('flow:complete', { flowId: 'f1', result: { ok: true } });

    expect(sequence).toEqual(['execute', 'complete']);
  });
});
