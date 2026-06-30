/**
 * 骨架系统 — 编辑器布局插槽注册表
 *
 * 提供面板注册和查询功能，允许插件向编辑器布局的指定插槽注册 UI 组件。
 * 参考 lowcode-engine-main/packages/editor-skeleton/src/skeleton.ts
 * 的 Skeleton 类设计，简化适配 Envelope 的 React 技术栈。
 *
 * 当前支持的插槽：
 * - left-nav：左侧导航栏模式切换项
 * - main-area：主内容区编辑器面板
 * - toolbar：顶部工具栏
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { SkeletonSlot, SkeletonItem, SkeletonAPI } from "./types";

/**
 * 创建骨架 API 实例
 *
 * 每个 PluginManager 实例对应一个骨架实例，
 * 所有插件共享同一个骨架注册表。
 *
 * @returns SkeletonAPI 实例
 */
export function createSkeleton(): SkeletonAPI {
  /** 插槽注册表，slot → SkeletonItem[] 的映射 */
  const slots = new Map<SkeletonSlot, SkeletonItem[]>([
    ["left-nav", []],
    ["main-area", []],
    ["toolbar", []],
  ]);

  /** 变更版本号，每次 register/unregister 递增 */
  let version = 0;

  /** 订阅者集合 */
  const listeners = new Set<() => void>();

  /** 通知所有订阅者 */
  function notify(): void {
    version++;
    listeners.forEach((l) => l());
  }

  return {
    register(slot: SkeletonSlot, item: SkeletonItem): void {
      const items = slots.get(slot);
      if (!items) {
        console.warn(`[Skeleton] unknown slot "${slot}", ignoring`);
        return;
      }

      const existing = items.find((i) => i.name === item.name);
      if (existing) {
        console.warn(`[Skeleton] item "${item.name}" already registered in slot "${slot}", skipping`);
        return;
      }

      items.push(item);
      notify();
    },

    unregister(slot: SkeletonSlot, name: string): void {
      const items = slots.get(slot);
      if (!items) return;

      const index = items.findIndex((i) => i.name === name);
      if (index !== -1) {
        items.splice(index, 1);
        notify();
      }
    },

    getItems(slot: SkeletonSlot): SkeletonItem[] {
      const items = slots.get(slot);
      if (!items) return [];
      return [...items].sort((a, b) => {
        const pa = a.priority ?? 999;
        const pb = b.priority ?? 999;
        return pa - pb;
      });
    },

    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    getVersion(): number {
      return version;
    },
  };
}
