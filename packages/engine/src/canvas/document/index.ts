/**
 * Document Model 模块入口
 *
 * 提供 NodeIndex（扁平索引）、NodeManager（树操作）、
 * SelectionManager（选中管理）等核心基础设施。
 *
 * @author xiye
 * @date 2026-06-29
 */

export { NodeIndex } from "./node-index";
export { NodeManager } from "./node-manager";
export { SelectionManager } from "./selection-manager";
export type { NodeEntry, NodeLocation } from "./types";
