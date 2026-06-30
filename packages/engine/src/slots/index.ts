/**
 * Slots 模块入口
 *
 * 聚合组件的 slots ↔ children tree 映射相关工具集中在此导出，
 * 供画布 store 与平台侧 schema 转换使用。
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
export * from "./aggregate-slot-mapper";
export { getSlotsForType } from "./slot-engine";

