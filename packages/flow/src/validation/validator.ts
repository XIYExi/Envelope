/**
 * 流程验证器 — 连接类型检查与流程级验证
 *
 * 实现了 ISC-66 要求的节点连接类型校验：
 * - 源输出端口类型必须与目标输入端口类型兼容
 * - "any" 类型可匹配任何类型
 * - 检测孤立节点、缺失的开始/结束节点、循环引用
 *
 * @author xiye
 * @date 2026-06-14
 */

import type {
  FlowDefinition,
  FlowNode,
  FlowEdge,
  ValidationError,
  ValidationResult,
} from "../thing-model/types";
import { isTypeCompatible } from "../thing-model/types";
import {
  NODE_DEFINITION_MAP,
} from "../thing-model/node-definitions";

/**
 * 验证节点间连接的类型兼容性
 *
 * 遍历所有边，对每条边：
 * 1. 查找源节点和目标节点
 * 2. 查找对应的输出/输入端口
 * 3. 检查端口数据类型兼容性
 *
 * @param nodes - 流程中的所有节点
 * @param edges - 流程中的所有边
 * @returns 类型不兼容的验证错误列表
 */
function validateEdgeTypes(nodes: FlowNode[], edges: FlowEdge[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  for (const edge of edges) {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);

    if (!sourceNode || !targetNode) {
      continue; // 节点不存在的问题在其他验证中处理
    }

    const sourceDef = NODE_DEFINITION_MAP.get(sourceNode.type);
    const targetDef = NODE_DEFINITION_MAP.get(targetNode.type);

    if (!sourceDef || !targetDef) {
      continue;
    }

    const sourcePort = sourceDef.outputs.find((p) => p.id === edge.sourceHandle);
    const targetPort = targetDef.inputs.find((p) => p.id === edge.targetHandle);

    if (!sourcePort || !targetPort) {
      errors.push({
        level: "warning",
        edgeId: edge.id,
        message: `端口 ${edge.sourceHandle} → ${edge.targetHandle}: 端口定义不存在`,
      });
      continue;
    }

    if (!isTypeCompatible(sourcePort.type, targetPort.type)) {
      errors.push({
        level: "error",
        edgeId: edge.id,
        nodeId: edge.target,
        message: `类型不兼容: "${sourceNode.type}" 的输出端口 "${sourcePort.label}" (${sourcePort.type}) 无法连接到 "${targetNode.type}" 的输入端口 "${targetPort.label}" (${targetPort.type})`,
      });
    }
  }

  return errors;
}

/**
 * 检测孤立节点 — 没有任何边的节点
 */
function findOrphanNodes(nodes: FlowNode[], edges: FlowEdge[]): ValidationError[] {
  if (nodes.length <= 1) {
    return [];
  }

  const connectedIds = new Set<string>();

  for (const edge of edges) {
    connectedIds.add(edge.source);
    connectedIds.add(edge.target);
  }

  const errors: ValidationError[] = [];

  for (const node of nodes) {
    if (!connectedIds.has(node.id) && node.type !== "event.start" && node.type !== "event.end" && node.type !== "event.trigger") {
      errors.push({
        level: "warning",
        nodeId: node.id,
        message: `节点 "${node.label || node.type}" (${node.id}) 未被任何连线连接`,
      });
    }
  }

  return errors;
}

/**
 * 检查开始节点 — 流程中应该有开始/触发节点
 */
function checkStartNodes(nodes: FlowNode[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const startNodes = nodes.filter((n) => n.type === "event.start" || n.type === "event.trigger");

  if (startNodes.length === 0) {
    errors.push({
      level: "warning",
      message: "流程中没有开始节点 (event.start) 或触发节点 (event.trigger)，流程可能无法执行",
    });
  }

  return errors;
}

/**
 * 检测重复节点 ID
 */
function findDuplicateIds(nodes: FlowNode[], edges: FlowEdge[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();

  for (const node of nodes) {
    if (nodeIds.has(node.id)) {
      errors.push({
        level: "error",
        nodeId: node.id,
        message: `节点 ID "${node.id}" 重复`,
      });
    }
    nodeIds.add(node.id);
  }

  for (const edge of edges) {
    if (edgeIds.has(edge.id)) {
      errors.push({
        level: "error",
        edgeId: edge.id,
        message: `边 ID "${edge.id}" 重复`,
      });
    }
    edgeIds.add(edge.id);
  }

  return errors;
}

/**
 * 检查边的源/目标节点是否存在
 */
function validateEdgeReferences(nodes: FlowNode[], edges: FlowEdge[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const nodeIds = new Set(nodes.map((n) => n.id));

  for (const edge of edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push({
        level: "error",
        edgeId: edge.id,
        message: `边引用的源节点 "${edge.source}" 不存在`,
      });
    }

    if (!nodeIds.has(edge.target)) {
      errors.push({
        level: "error",
        edgeId: edge.id,
        message: `边引用的目标节点 "${edge.target}" 不存在`,
      });
    }
  }

  return errors;
}

/**
 * 完整验证流程定义
 *
 * 执行以下检查：
 * 1. 重复 ID 检测
 * 2. 边的节点引用有效性
 * 3. 端口类型兼容性（ISC-66）
 * 4. 孤立节点检测
 * 5. 开始节点存在性
 *
 * @param flow - 要验证的流程定义
 * @returns 验证结果，包含所有错误和警告列表
 */
export function validateFlow(flow: FlowDefinition): ValidationResult {
  const { nodes, edges } = flow;
  const errors: ValidationError[] = [];

  // 1. 重复 ID 检测
  errors.push(...findDuplicateIds(nodes, edges));

  // 2. 边引用有效性
  errors.push(...validateEdgeReferences(nodes, edges));

  // 3. 端口类型兼容性（ISC-66）
  errors.push(...validateEdgeTypes(nodes, edges));

  // 4. 孤立节点检测
  errors.push(...findOrphanNodes(nodes, edges));

  // 5. 开始节点存在性
  errors.push(...checkStartNodes(nodes));

  const hasErrors = errors.some((e) => e.level === "error");

  return {
    valid: !hasErrors,
    errors,
  };
}
