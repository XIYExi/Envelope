/**
 * 内置物料元数据转换器
 *
 * 提供系统级和内置插件级的默认 transducer。
 * 使用策略模式（Strategy Pattern），每个 transducer 为一个独立策略。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 *
 * @reference lowcode-engine: packages/designer/src/transducers/index.ts
 *   legacyIssues（level 2）+ componentDefaults（level 100）
 */

import type { MetadataTransducer, MaterialDefinition } from './types/material';

/**
 * 组件默认值推断转换器
 *
 * 自动推断容器类组件的嵌套规则：
 * - 名为 Xxx.Group 的组件 → 设置 childWhitelist: [Xxx]
 * - 名为 Xxx.Item / Xxx.Node / Xxx.Option 的组件 → 设置 parentWhitelist: [Xxx]
 * - 名为 Xxx.Content / Xxx.Body 且已有容器父的组件 → 设置 parentWhitelist: [Xxx]
 *
 * 如果组件已显式声明 nestingRules，则不覆盖。
 *
 * @reference lowcode-engine: packages/designer/src/transducers/index.ts componentDefaults
 */
export const componentDefaults: MetadataTransducer = (meta) => {
  // 已显式声明嵌套规则，不覆盖
  if (meta.nestingRules) return meta;

  const name = meta.name;
  let nestingRules: MaterialDefinition['nestingRules'] | undefined;

  // 匹配 Xxx.Group 模式 → 自动推断 childWhitelist
  const groupMatch = /^(.+)Group$/.exec(name);
  if (groupMatch && groupMatch[1]) {
    nestingRules = { childWhitelist: [groupMatch[1]] };
    return { ...meta, nestingRules };
  }

  // 匹配 Xxx.Item / Xxx.Option 模式 → 自动推断 parentWhitelist
  const itemMatch = /^(.+)(Item|Option)$/.exec(name);
  if (itemMatch && itemMatch[1]) {
    nestingRules = { parentWhitelist: [itemMatch[1]] };
    return { ...meta, nestingRules };
  }

  return meta;
};

// @reference lowcode-engine level 值: 0-9 系统级, 10-99 内置插件级, 100+ 应用级
componentDefaults.level = 50;
componentDefaults.id = 'component-defaults';

/**
 * 内置转换器注册表
 *
 * 所有内置 transducer 的集合，可用于批量注册到 Registry。
 * 按 level 升序排列，确保执行顺序正确。
 */
export const BUILTIN_TRANSDUCERS: MetadataTransducer[] = [
  componentDefaults,
].sort((a, b) => (a.level ?? 100) - (b.level ?? 100));
