/**
 * 表达式模块统一导出
 *
 * Domain M — 响应式表达式系统
 */

export { validateExpression, isSimplePath } from "./evaluator";
// ValidationResult 类型与 validation/index 冲突, 使用时请从 evalutor.ts 直接导入
