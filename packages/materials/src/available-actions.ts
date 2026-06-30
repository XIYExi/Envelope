/**
 * 组件可用操作工厂
 *
 * 根据物料定义的 disableBehaviors 动态计算组件在编辑器中的可用操作列表。
 * 使用命令模式（Command Pattern），每个操作为一个独立配置单元。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 *
 * @reference lowcode-engine: packages/designer/src/component-meta.ts
 *   availableActions computed getter 的过滤逻辑
 */

import type { MaterialDefinition, ComponentAction } from './types/material';

/** 内置操作注册表（命令模式） */
const BUILTIN_ACTIONS: Record<string, ComponentAction> = {
  copy: {
    name: 'copy',
    label: '复制',
    icon: 'Copy',
    shortcut: 'Ctrl+D',
    condition: 'always',
  },
  delete: {
    name: 'delete',
    label: '删除',
    icon: 'Trash2',
    shortcut: 'Delete',
    condition: 'always',
  },
  move: {
    name: 'move',
    label: '移动',
    icon: 'Move',
    condition: 'always',
  },
  lock: {
    name: 'lock',
    label: '锁定',
    icon: 'Lock',
    condition: (component) => !component?.locked,
  },
  unlock: {
    name: 'unlock',
    label: '解锁',
    icon: 'Unlock',
    condition: (component) => component?.locked === true,
  },
  hide: {
    name: 'hide',
    label: '隐藏',
    icon: 'EyeOff',
    condition: (component) => component?.hidden !== true,
  },
};

/**
 * 构建可用操作列表
 *
 * 根据物料定义的 disableBehaviors 过滤内置操作：
 * - 未设置 disableBehaviors：返回所有操作
 * - 包含 '*'：返回所有 condition 为 'always' 的操作
 * - 其他情况：移除 disableBehaviors 中列出的操作
 *
 * @param def - 物料定义
 * @param component - 当前组件实例状态（可选，用于 condition 判断）
 * @returns 过滤后的可用操作列表
 */
export function buildAvailableActions(
  def: MaterialDefinition,
  component?: Record<string, unknown>,
): ComponentAction[] {
  const disabled = def.disableBehaviors;
  const ctx = component ?? {};

  // 未设置禁用列表，返回全部
  if (!disabled || disabled.length === 0) {
    return Object.values(BUILTIN_ACTIONS).filter((action) => {
      if (action.condition === 'always') return true;
      if (typeof action.condition === 'function') return action.condition(ctx);
      return true;
    });
  }

  // '*' 通配符：只保留 condition 为 'always' 的操作
  if (disabled.includes('*' as any)) {
    return Object.values(BUILTIN_ACTIONS).filter((a) => a.condition === 'always');
  }

  // 按禁用列表过滤
  return Object.values(BUILTIN_ACTIONS).filter((action) => {
    if (disabled.includes(action.name as any)) return false;
    if (action.condition === 'always') return true;
    if (typeof action.condition === 'function') return action.condition(ctx);
    return true;
  });
}
