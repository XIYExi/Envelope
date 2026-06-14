/**
 * 默认物料注册表
 *
 * 创建并导出包含所有内置组件的默认注册表实例。
 * 使用单例模式，确保全局只有一个注册表实例。
 *
 * 内置组件分类：
 * - layout: 布局组件（Card、Separator 等）
 * - form: 表单组件（Button、Input、Label 等）
 * - display: 展示组件（Avatar、Badge 等）
 * - feedback: 反馈组件（Skeleton 等）
 *
 * @author xiye
 * @date 2026/6/13
 */
/**
 * 物料组件入口
 *
 * 统一导出所有预定义的物料组件，并提供默认注册表工厂函数。
 * 包含以下分类的组件：
 * - layout: Card、CardHeader、CardContent、CardFooter、Separator
 * - form: Button、Input、Label
 * - display: Avatar、Badge
 * - feedback: Skeleton
 *
 * @author xiye
 * @date 2026/6/14
 */
import { createRegistry } from "../registry";
import type { MaterialRegistry } from "../types/material";
import { cardMaterial, cardHeaderMaterial, cardContentMaterial, cardFooterMaterial, separatorMaterial } from "./layout";
import { buttonMaterial, inputMaterial, labelMaterial } from "./form";
import { avatarMaterial, badgeMaterial } from "./display";
import { skeletonMaterial } from "./feedback";

/** 默认注册表单例（懒加载） */
let defaultRegistry: MaterialRegistry | null = null;

/**
 * 创建默认物料注册表
 *
 * 返回一个预注册了所有内置物料的注册表实例。
 * 使用单例模式，首次调用时创建，后续调用返回缓存实例。
 *
 * @returns 包含所有内置物料的注册表
 *
 * @example
 * const registry = createDefaultRegistry();
 * const allMaterials = registry.getAll();
 * const formMaterials = registry.getByCategory("form");
 */
export function createDefaultRegistry(): MaterialRegistry {
  if (defaultRegistry) return defaultRegistry;

  const registry = createRegistry();

  registry.registerAll([
    // ========== 布局组件 ==========
    cardMaterial,
    cardHeaderMaterial,
    cardContentMaterial,
    cardFooterMaterial,
    separatorMaterial,

    // ========== 表单组件 ==========
    buttonMaterial,
    inputMaterial,
    labelMaterial,

    // ========== 展示组件 ==========
    avatarMaterial,
    badgeMaterial,

    // ========== 反馈组件 ==========
    skeletonMaterial,
  ]);

  defaultRegistry = registry;
  return registry;
}
