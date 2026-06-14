/**
 * 物料模块入口
 *
 * 负责管理和导出所有低代码组件的物料定义（Material Definition）。
 * 每个 shadcn/ui 组件都有对应的物料定义，包含：
 * - schema: 使用 Zod 校验的 editableProps（可编辑属性）
 * - defaultProps: 组件的初始配置
 * - category: 组件分类（layout | form | display | feedback | navigation | data | overlay | custom）
 *
 * 物料系统的核心功能：
 * - 定义组件的可编辑属性和类型
 * - 提供组件注册和查询的 Registry
 * - 支持按分类检索组件
 *
 * @author xiye
 * @date 2026/6/13
 */

// 类型导出
export type {
  MaterialDefinition,
  MaterialRegistry,
  EditableProp,
  ComponentCategory,
} from "./types/material";

// Schema 和工具函数导出
export {
  materialDefinitionSchema,
  editablePropSchema,
  componentCategorySchema,
  getDefaultValue,
} from "./types/material";

// Registry 工厂函数
export { createRegistry } from "./registry";
export { createDefaultRegistry } from "./components/index";

// 表单组件
export { buttonMaterial, inputMaterial, labelMaterial } from "./components/form";
// 布局组件
export {
  cardMaterial,
  cardHeaderMaterial,
  cardContentMaterial,
  cardFooterMaterial,
  separatorMaterial,
} from "./components/layout";
// 展示组件
export { avatarMaterial, badgeMaterial } from "./components/display";
// 反馈组件
export { skeletonMaterial } from "./components/feedback";

export const PACKAGE_NAME = "@envelope/materials";
export const VERSION = "3.0.0";
