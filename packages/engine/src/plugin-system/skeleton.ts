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

  return {
    /**
     * 注册一个骨架项到指定插槽
     *
     * 同名项不可重复注册。注册后可通过 getItems() 查询。
     *
     * @param slot - 目标插槽名称
     * @param item - 骨架项定义
     */
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
    },

    /**
     * 从指定插槽移除一个骨架项
     *
     * @param slot - 目标插槽名称
     * @param name - 要移除的骨架项名称
     */
    unregister(slot: SkeletonSlot, name: string): void {
      const items = slots.get(slot);
      if (!items) return;

      const index = items.findIndex((i) => i.name === name);
      if (index !== -1) {
        items.splice(index, 1);
      }
    },

    /**
     * 获取指定插槽的所有骨架项（已按 priority 排序）
     *
     * @param slot - 目标插槽名称
     * @returns 排序后的骨架项列表
     */
    getItems(slot: SkeletonSlot): SkeletonItem[] {
      const items = slots.get(slot);
      if (!items) return [];
      return [...items].sort((a, b) => {
        const pa = a.priority ?? 999;
        const pb = b.priority ?? 999;
        return pa - pb;
      });
    },
  };
}
