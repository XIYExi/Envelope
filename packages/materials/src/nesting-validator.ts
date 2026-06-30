/**
 * 嵌套规则校验器
 *
 * 校验组件间的父子嵌套关系是否合法。
 * 基于物料定义中的 nestingRules 配置（parentWhitelist / childWhitelist）进行验证。
 *
 * 使用策略模式（Strategy Pattern），
 * 通过物料注册表查找函数将校验逻辑与注册表解耦。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 *
 * @reference lowcode-engine: packages/designer/src/component-meta.ts
 *   checkNestingUp() / checkNestingDown() 的校验逻辑
 */

import type { MaterialDefinition } from './types/material';

/**
 * 物料查找函数类型
 *
 * 用于从注册表或缓存中按名称获取物料定义。
 * 将校验器与具体的注册表实现解耦。
 */
export type MaterialLookup = (name: string) => MaterialDefinition | undefined;

/**
 * 嵌套规则校验器
 *
 * 提供静态方法校验组件间的父-子嵌套关系。
 * 所有方法为纯函数，不持有状态，方便测试。
 */
export class NestingValidator {
  /**
   * 校验父组件是否允许包含指定子组件类型
   *
   * 检查父组件的 childWhitelist：
   * - 未设置 childWhitelist（undefined）：允许，默认不限制
   * - 空数组（[]）：不允许包含任何子组件
   * - 非空数组：仅允许包含白名单中的组件类型
   *
   * @param parentType - 父组件类型名称
   * @param childType - 子组件类型名称
   * @param lookup - 物料查找函数
   * @returns true 表示允许嵌套
   */
  static checkChildAllowed(
    parentType: string,
    childType: string,
    lookup: MaterialLookup,
  ): boolean {
    const parent = lookup(parentType);
    if (!parent) return true;

    const whitelist = parent.nestingRules?.childWhitelist;
    if (whitelist === undefined) return true;
    if (whitelist.length === 0) return false;

    return whitelist.includes(childType);
  }

  /**
   * 校验子组件是否允许被放置在指定的父组件内
   *
   * 检查子组件的 parentWhitelist：
   * - 未设置 parentWhitelist（undefined）：允许，默认不限制
   * - 非空数组：仅允许放在白名单中的父组件内
   *
   * @param childType - 子组件类型名称
   * @param parentType - 父组件类型名称
   * @param lookup - 物料查找函数
   * @returns true 表示允许放置
   */
  static checkParentAllowed(
    childType: string,
    parentType: string,
    lookup: MaterialLookup,
  ): boolean {
    const child = lookup(childType);
    if (!child) return true;

    const whitelist = child.nestingRules?.parentWhitelist;
    if (whitelist === undefined) return true;
    if (whitelist.length === 0) return false;

    return whitelist.includes(parentType);
  }

  /**
   * 综合校验：检查 parentType 是否可包含 childType
   *
   * 同时检查父组件的 childWhitelist 和子组件的 parentWhitelist，
   * 两者都通过才返回 true。
   *
   * @param parentType - 父组件类型名称
   * @param childType - 子组件类型名称
   * @param lookup - 物料查找函数
   * @returns true 表示嵌套关系合法
   */
  static checkNesting(
    parentType: string,
    childType: string,
    lookup: MaterialLookup,
  ): boolean {
    return (
      NestingValidator.checkChildAllowed(parentType, childType, lookup) &&
      NestingValidator.checkParentAllowed(childType, parentType, lookup)
    );
  }
}
