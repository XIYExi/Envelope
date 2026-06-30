/**
 * Document Model 类型定义
 *
 * 提供 NodeIndex 和 NodeManager 使用的核心类型。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 */

import type { ComponentNode } from "../../schemas/page.schema";

/**
 * 节点索引条目
 *
 * 扁平化存储节点在树中的位置信息，
 * 由 NodeIndex 在每次树操作后重建。
 */
export interface NodeEntry {
  /** 节点 ID */
  id: string;
  /** 父节点 ID（根节点为 null） */
  parentId: string | null;
  /** 嵌套深度（根节点为 0） */
  depth: number;
  /** 从根到当前节点的路径 ID 数组 */
  path: string[];
  /** 所在 CanvasComponent 在根列表中的索引 */
  rootIndex: number;
}

/**
 * 节点位置信息
 *
 * 与 tree-ops.ts 中原 NodeLocation 类型兼容，
 * 区分根级节点和嵌套子节点。
 */
export type NodeLocation =
  | {
      /** 根级节点：直接位于 CanvasComponent[] 中 */
      kind: "root";
      /** 在 CanvasComponent[] 中的索引 */
      rootIndex: number;
      /** 根 CanvasComponent 的 ID */
      rootId: string;
      /** 对应的 ComponentNode */
      node: ComponentNode;
    }
  | {
      /** 嵌套子节点：位于某个 CanvasComponent.node.children 中 */
      kind: "child";
      /** 所在根 CanvasComponent 的索引 */
      rootIndex: number;
      /** 所在根 CanvasComponent 的 ID */
      rootId: string;
      /** 父节点 ID */
      parentId: string;
      /** 在父节点 children 数组中的索引 */
      index: number;
      /** 对应的 ComponentNode */
      node: ComponentNode;
    };
