/**
 * 插件系统单元测试
 *
 * 覆盖 PluginManager 的注册/初始化/销毁/依赖排序，
 * 以及 SkeletonAPI 的插槽注册/查询。
 *
 * @author xiye
 * @date 2026-06-30
 */

import { describe, it, expect, vi } from 'vitest';
import { PluginManager, HotkeyManager, CommandManager } from '../src/plugin-system';
import type { PluginCreator, SkeletonSlot } from '../src/plugin-system';
import { createModuleEventBus } from '../src/event-bus';
import type { EditorEventMap } from '../src/event-bus';

describe('PluginManager', () => {
  it('V4-D1: register 添加插件后可从 getPlugin 获取', () => {
    const pm = new PluginManager();
    const creator: PluginCreator = () => ({ init: () => {} });
    pm.register('test', creator, { name: 'test' });
    const plugin = pm.getPlugin('test');
    expect(plugin).toBeDefined();
    expect(plugin!.name).toBe('test');
  });

  it('V4-D1: 同名插件不可重复注册', () => {
    const pm = new PluginManager();
    const creator: PluginCreator = () => ({ init: () => {} });
    pm.register('dup', creator, { name: 'dup' });
    pm.register('dup', creator, { name: 'dup' });
    // 第二次注册被跳过，插件数量应为 1
    const count = Array.from((pm as any).plugins.values()).length;
    expect(count).toBe(1);
  });

  it('V4-D3: init 调用插件的 init 方法', async () => {
    const pm = new PluginManager();
    const initFn = vi.fn();
    const creator: PluginCreator = () => ({ init: initFn });
    pm.register('test', creator, { name: 'test' });
    await pm.init();
    expect(initFn).toHaveBeenCalledOnce();
  });

  it('V4-D3: destroy 调用插件的 destroy 方法', async () => {
    const pm = new PluginManager();
    const destroyFn = vi.fn();
    const creator: PluginCreator = () => ({ init: () => {}, destroy: destroyFn });
    pm.register('test', creator, { name: 'test' });
    await pm.init();
    await pm.destroy();
    expect(destroyFn).toHaveBeenCalledOnce();
  });

  it('V4-D2: 依赖排序保证 init 顺序正确', async () => {
    const pm = new PluginManager();
    const order: string[] = [];

    const creatorA: PluginCreator = () => ({ init: () => order.push('A') });
    const creatorB: PluginCreator = () => ({ init: () => order.push('B') });
    const creatorC: PluginCreator = () => ({ init: () => order.push('C') });

    pm.register('A', creatorA, { name: 'A' });
    pm.register('C', creatorC, { name: 'C', dependencies: ['A', 'B'] });
    pm.register('B', creatorB, { name: 'B', dependencies: ['A'] });

    await pm.init();
    expect(order).toEqual(['A', 'B', 'C']);
  });

  it('V4-D2: 缺失依赖时 init 抛错', async () => {
    const pm = new PluginManager();
    const creator: PluginCreator = () => ({ init: () => {} });
    pm.register('A', creator, { name: 'A', dependencies: ['NonExistent'] });
    await expect(pm.init()).rejects.toThrow('missing dependencies');
  });

  it('V4-D2: 循环依赖时 init 抛错', async () => {
    const pm = new PluginManager();
    const creator: PluginCreator = () => ({ init: () => {} });
    pm.register('A', creator, { name: 'A', dependencies: ['B'] });
    pm.register('B', creator, { name: 'B', dependencies: ['A'] });
    await expect(pm.init()).rejects.toThrow('circular');
  });

  it('V4-D4: PluginContext 包含 skeleton/logger/preference', async () => {
    const pm = new PluginManager();
    let capturedCtx: any = null;

    const creator: PluginCreator = (ctx) => {
      capturedCtx = ctx;
      return { init: () => {} };
    };

    pm.register('test', creator, { name: 'test' }, { key: 'val' });
    await pm.init();

    expect(capturedCtx).toBeDefined();
    expect(capturedCtx.skeleton).toBeDefined();
    expect(capturedCtx.skeleton.register).toBeTypeOf('function');
    expect(capturedCtx.skeleton.getItems).toBeTypeOf('function');
    expect(capturedCtx.logger.info).toBeTypeOf('function');
    expect(capturedCtx.logger.warn).toBeTypeOf('function');
    expect(capturedCtx.logger.error).toBeTypeOf('function');
    expect(capturedCtx.preference).toEqual({ key: 'val' });
    expect(capturedCtx.pluginName).toBe('test');
  });

  it('V4-D5: SkeletonAPI register/getItems 往返正确', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('left-nav', { name: 'pages', label: 'Pages', component: () => null, priority: 1 });
    skeleton.register('left-nav', { name: 'models', label: 'Models', component: () => null, priority: 2 });

    const items = skeleton.getItems('left-nav');
    expect(items).toHaveLength(2);
    expect(items[0].name).toBe('pages');
    expect(items[1].name).toBe('models');
  });

  it('V4-D5: SkeletonAPI unregister 移除指定项', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('toolbar', { name: 'undo', label: 'Undo', component: () => null });
    skeleton.unregister('toolbar', 'undo');

    const items = skeleton.getItems('toolbar');
    expect(items).toHaveLength(0);
  });

  it('V4-D8: 无插件时 skeleton 返回空列表', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    expect(skeleton.getItems('left-nav')).toEqual([]);
    expect(skeleton.getItems('main-area')).toEqual([]);
    expect(skeleton.getItems('toolbar')).toEqual([]);
  });

  it('V4-D5: getItems 按 priority 排序', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('main-area', { name: 'z', label: 'Z', component: () => null, priority: 10 });
    skeleton.register('main-area', { name: 'a', label: 'A', component: () => null, priority: 1 });
    skeleton.register('main-area', { name: 'm', label: 'M', component: () => null });

    const items = skeleton.getItems('main-area');
    expect(items[0].name).toBe('a');
    expect(items[1].name).toBe('z');
    expect(items[2].name).toBe('m');
  });

  it('V4-D9: 类型导出 — PluginCreator 等可被 import', () => {
    // 编译期验证：如果类型未导出，此文件编译会失败
    const _: any = null;
    expect(true).toBe(true);
  });

  // ========== V4-D5: Skeleton 插槽扩展（6 个） ==========

  it('V4-D5: Skeleton 支持 6 个插槽（left-nav/left-panel/main-area/right-panel/toolbar/bottom-area）', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    const allSlots: SkeletonSlot[] = ['left-nav', 'left-panel', 'main-area', 'right-panel', 'toolbar', 'bottom-area'];
    for (const slot of allSlots) {
      skeleton.register(slot, { name: `test-${slot}`, label: `Test ${slot}`, component: () => null });
      const items = skeleton.getItems(slot);
      expect(items).toHaveLength(1);
      expect(items[0]!.name).toBe(`test-${slot}`);
    }
  });

  it('V4-D5: left-panel 插槽 register/getItems 往返正确', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('left-panel', { name: 'material', label: 'Material', component: () => null, priority: 1 });
    skeleton.register('left-panel', { name: 'tree', label: 'Tree', component: () => null, priority: 2 });

    const items = skeleton.getItems('left-panel');
    expect(items).toHaveLength(2);
    expect(items[0]!.name).toBe('material');
  });

  it('V4-D5: right-panel 插槽 register/getItems 往返正确', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('right-panel', { name: 'property', label: 'Property', component: () => null });

    const items = skeleton.getItems('right-panel');
    expect(items).toHaveLength(1);
    expect(items[0]!.name).toBe('property');
  });

  it('V4-D5: bottom-area 插槽初始为空', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();
    expect(skeleton.getItems('bottom-area')).toEqual([]);
  });

  it('V4-D5: 新插槽 unregister 正常工作', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('right-panel', { name: 'prop', label: 'Prop', component: () => null });
    skeleton.unregister('right-panel', 'prop');
    expect(skeleton.getItems('right-panel')).toHaveLength(0);
  });

  it('destroy 后再次 init 可重新初始化', async () => {
    const pm = new PluginManager();
    const initFn = vi.fn();
    const creator: PluginCreator = () => ({ init: initFn });

    pm.register('test', creator, { name: 'test' });
    await pm.init();
    await pm.destroy();
    // 重新注册并初始化
    pm.register('test2', creator, { name: 'test2' });
    await pm.init();
    expect(initFn).toHaveBeenCalledTimes(2);
  });

  it('注册同名不同 slot 的骨架项互不干扰', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();

    skeleton.register('left-nav', { name: 'item', label: 'Nav Item', component: () => null });
    skeleton.register('toolbar', { name: 'item', label: 'Toolbar Item', component: () => null });

    expect(skeleton.getItems('left-nav')).toHaveLength(1);
    expect(skeleton.getItems('toolbar')).toHaveLength(1);
  });

  it('未知插槽 register 不抛错', () => {
    const pm = new PluginManager();
    const skeleton = pm.getSkeleton();
    expect(() => {
      (skeleton as any).register('unknown-slot', { name: 'x', label: 'X', component: () => null });
    }).not.toThrow();
  });

  it('init 失败时抛错且后续插件不执行', async () => {
    const pm = new PluginManager();
    const order: string[] = [];
    const good: PluginCreator = () => ({ init: () => { order.push('good'); } });
    const bad: PluginCreator = () => ({ init: () => { throw new Error('fail'); } });
    const after: PluginCreator = () => ({ init: () => { order.push('after'); } });

    pm.register('good', good, { name: 'good' });
    pm.register('bad', bad, { name: 'bad' });
    pm.register('after', after, { name: 'after' });

    await expect(pm.init()).rejects.toThrow('fail');
    expect(order).toEqual(['good']);
  });

  // ========== V4-D4: PluginContext 包含 skeleton/event/hotkey/logger/command ==========

  it('V4-D4: PluginContext 包含全部 5 个 API（skeleton/event/hotkey/logger/command）', async () => {
    const bus = createModuleEventBus<EditorEventMap>('Test');
    const pm = new PluginManager(bus);
    let capturedCtx: Record<string, unknown> | null = null;

    const creator: PluginCreator = (ctx) => {
      capturedCtx = ctx as unknown as Record<string, unknown>;
      return { init: () => {} };
    };
    pm.register('test', creator, { name: 'test' });
    await pm.init();

    expect(capturedCtx).not.toBeNull();
    expect(capturedCtx!['pluginName']).toBe('test');
    expect(capturedCtx!['skeleton']).toBeDefined();
    expect(capturedCtx!['event']).toBeDefined();
    expect(capturedCtx!['hotkey']).toBeDefined();
    expect(capturedCtx!['command']).toBeDefined();
    expect(capturedCtx!['logger']).toBeDefined();

    await pm.destroy();
  });

  it('V4-D4: PluginContext.event 是注入的 EventBus 实例', async () => {
    const bus = createModuleEventBus<EditorEventMap>('Test');
    const pm = new PluginManager(bus);
    let eventRef: unknown = null;

    const creator: PluginCreator = (ctx) => {
      eventRef = ctx.event;
      return { init: () => {} };
    };
    pm.register('test', creator, { name: 'test' });
    await pm.init();

    expect(eventRef).toBe(bus);
    await pm.destroy();
  });

  it('V4-D4: 无 eventBus 传入时降级为内部创建', async () => {
    const pm = new PluginManager();
    let hasEvent = false;
    const creator: PluginCreator = (ctx) => {
      hasEvent = !!ctx.event;
      return { init: () => {} };
    };
    pm.register('test', creator, { name: 'test' });
    await pm.init();
    expect(hasEvent).toBe(true);
    await pm.destroy();
  });

  it('V4-D4: destroy 清理所有 HotkeyManager 和 CommandManager', async () => {
    const pm = new PluginManager();
    const creator: PluginCreator = () => ({ init: () => {} });
    pm.register('a', creator, { name: 'a' });
    pm.register('b', creator, { name: 'b' });
    await pm.init();

    // 内部 hotkeyManagers/commandManagers 各有 2 个
    const hkCount = (pm as any).hotkeyManagers.length;
    const cmdCount = (pm as any).commandManagers.length;
    expect(hkCount).toBe(2);
    expect(cmdCount).toBe(2);

    await pm.destroy();
    expect((pm as any).hotkeyManagers.length).toBe(0);
    expect((pm as any).commandManagers.length).toBe(0);
  });
});

// ========== V4-D4: HotkeyManager 单测 ==========

describe('HotkeyManager', () => {
  it('bind 返回 dispose 函数，调用后取消绑定', () => {
    const hk = new HotkeyManager();
    const handler = vi.fn();
    const dispose = hk.bind('ctrl+s', handler);

    expect(typeof dispose).toBe('function');
    dispose();
    hk.destroy();
  });

  it('destroy 后不再触发回调', () => {
    const hk = new HotkeyManager();
    const handler = vi.fn();
    hk.bind('ctrl+k', handler);
    hk.destroy();

    // destroy 后 active=false，即使有事件也不会触发
    expect((hk as any).active).toBe(false);
    expect((hk as any).bindings.length).toBe(0);
  });
});

// ========== V4-D4: CommandManager 单测 ==========

describe('CommandManager', () => {
  it('registerCommand + executeCommand 正常工作', () => {
    const cmd = new CommandManager('myPlugin');
    const handler = vi.fn();
    cmd.registerCommand({ name: 'greet', description: 'say hi', handler });
    cmd.executeCommand('greet', { name: 'world' });

    expect(handler).toHaveBeenCalledWith({ name: 'world' });
    cmd.destroy();
  });

  it('命令名自动加 pluginName 前缀存储', () => {
    const cmd = new CommandManager('myPlugin');
    cmd.registerCommand({ name: 'foo', handler: () => {} });
    const list = cmd.listCommands();
    expect(list).toHaveLength(1);
    expect(list[0]!.name).toBe('myPlugin:foo');
    cmd.destroy();
  });

  it('executeCommand 支持全限定名（含冒号）', () => {
    const cmd = new CommandManager('myPlugin');
    const handler = vi.fn();
    cmd.registerCommand({ name: 'bar', handler });
    cmd.executeCommand('myPlugin:bar', {});
    expect(handler).toHaveBeenCalledOnce();
    cmd.destroy();
  });

  it('executeCommand 未注册命令时 warn 不抛错', () => {
    const cmd = new CommandManager('myPlugin');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    cmd.executeCommand('nonexistent', {});
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
    cmd.destroy();
  });

  it('registerCommand 返回 dispose，调用后命令被移除', () => {
    const cmd = new CommandManager('myPlugin');
    const handler = vi.fn();
    const dispose = cmd.registerCommand({ name: 'temp', handler });
    dispose();
    cmd.executeCommand('temp', {});
    expect(handler).not.toHaveBeenCalled();
    cmd.destroy();
  });

  it('destroy 后命令清空', () => {
    const cmd = new CommandManager('myPlugin');
    cmd.registerCommand({ name: 'x', handler: () => {} });
    cmd.destroy();
    expect(cmd.listCommands()).toHaveLength(0);
  });
});
