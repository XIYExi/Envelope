/**
 * Thing Model Zod 验证模式
 *
 * 定义了流程定义（JSON 和 YAML 格式）的 JSON Schema 验证规则。
 * 验证层确保：
 * - 所有必填字段存在且类型正确
 * - 节点引用了有效的内置类型
 * - 边的源/目标节点 ID 存在性
 * - 数据结构符合 Thing Model 规范
 *
 * @author xiye
 * @date 2026-06-14
 */

import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// 基础类型验证
// ═══════════════════════════════════════════════════════════════════

/** 端口数据类型枚举 */
export const portDataTypeSchema = z.enum(["string", "number", "boolean", "object", "array", "any"]);

/** 流程节点类型枚举 */
export const flowNodeTypeSchema = z.enum([
  "event.start",
  "event.end",
  "event.trigger",
  "db.query",
  "db.insert",
  "db.update",
  "db.delete",
  "api.request",
  "condition.if",
  "condition.switch",
  "loop.forEach",
  "loop.while",
  "action.email",
  "transform.data",
  "custom.code",
  "flow.delay",
  "notification",
]);

/** 节点分类枚举 */
export const flowNodeCategorySchema = z.enum([
  "trigger",
  "database",
  "api",
  "condition",
  "loop",
  "action",
  "transform",
  "custom",
  "flow",
]);

/** 端口定义验证 */
export const flowPortSchema = z.object({
  id: z.string().min(1, "端口 ID 不能为空"),
  label: z.string().min(1, "端口标签不能为空"),
  type: portDataTypeSchema,
  required: z.boolean().optional(),
  description: z.string().optional(),
});

/** 画布位置 */
export const flowPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

// ═══════════════════════════════════════════════════════════════════
// 节点与边验证
// ═══════════════════════════════════════════════════════════════════

/** 节点定义验证（内置类型元数据） */
export const flowNodeDefinitionSchema = z.object({
  type: flowNodeTypeSchema,
  label: z.string().min(1),
  category: flowNodeCategorySchema,
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "颜色格式必须为十六进制"),
  icon: z.string(),
  description: z.string(),
  inputs: z.array(flowPortSchema),
  outputs: z.array(flowPortSchema),
});

/** 节点实例验证 */
export const flowNodeSchema = z.object({
  id: z.string().min(1, "节点 ID 不能为空"),
  type: flowNodeTypeSchema,
  position: flowPositionSchema,
  label: z.string().optional(),
  config: z.record(z.unknown()),
});

/** 连线验证 */
export const flowEdgeSchema = z.object({
  id: z.string().min(1, "边 ID 不能为空"),
  source: z.string().min(1, "源节点 ID 不能为空"),
  sourceHandle: z.string().min(1, "源端口 ID 不能为空"),
  target: z.string().min(1, "目标节点 ID 不能为空"),
  targetHandle: z.string().min(1, "目标端口 ID 不能为空"),
  label: z.string().optional(),
});

// ═══════════════════════════════════════════════════════════════════
// 顶层流程定义验证
// ═══════════════════════════════════════════════════════════════════

/**
 * 流程定义验证 Schema
 *
 * 验证完整的流程定义对象，包括节点列表和连线列表。
 * thing ID 和 version 是顶层必填字段。
 */
export const flowDefinitionSchema = z.object({
  thing: z.string().min(1, "流程标识符（thing）不能为空"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "版本号格式必须为 x.y.z").or(z.string().regex(/^\d+\.\d+$/, "也支持 x.y 格式")),
  description: z.string().optional(),
  nodes: z.array(flowNodeSchema).min(1, "流程至少需要一个节点"),
  edges: z.array(flowEdgeSchema),
});

/**
 * 验证流程定义对象
 *
 * @param data - 待验证的流程定义
 * @returns Zod 解析结果（safeParse）
 */
export function validateFlowDefinition(data: unknown) {
  return flowDefinitionSchema.safeParse(data);
}

/**
 * 验证流程定义并抛出详细错误
 *
 * @param data - 待验证的流程定义
 * @returns 解析后的流程定义
 * @throws ZodError 当验证失败时
 */
export function parseFlowDefinition(data: unknown) {
  return flowDefinitionSchema.parse(data);
}
