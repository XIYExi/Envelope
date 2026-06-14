/**
 * @envelope/engine — 核心低代码引擎
 *
 * 负责：
 *   - Schema 层：项目/路由/页面/数据库/认证/流程的 Schema 定义与校验（Zod）
 *   - 版本迁移：Schema 版本管理与数据迁移
 *   - 画布渲染：从 JSON 模拟组件渲染（DnD Kit）
 *   - 属性编辑器：根据材料 editableProps 反射生成表单
 *   - 撤销/重做：命令模式历史栈
 *   - 状态管理：Zustand 编辑器状态存储
 *
 * @author xiye
 * @date 2026-06-14
 */

// @envelope/engine — Core lowcode engine
// Responsibilities:
//   - Schema layer: project/routes/pages/db/auth/flow schema definitions and validation (Zod)
//   - Schema versioning and migration
//   - Canvas renderer: simulated component rendering from JSON with DnD Kit
//   - Property editor: reflective FormEditor from component editableProps schemas
//   - Undo/redo: command-pattern history stack
//   - State: Zustand stores for editor state

export * from "./schemas/index";
export * from "./validation/index";
export * from "./canvas/index";
export * from "./property-editor/index";

/** 包名称常量 */
export const PACKAGE_NAME = "@envelope/engine";
/** 当前引擎版本 */
export const VERSION = "3.0.0";
