/**
 * F15 Flow Template Export/Import — 模板的 YAML 序列化与反序列化
 *
 * 提供将 FlowDefinition 序列化为带模板元数据头的 YAML 字符串，
 * 以及从 YAML 字符串中解析回 FlowDefinition 的功能。
 *
 * YAML 模板格式在标准 FlowDefinition YAML 之上增加模板元数据注释头：
 * ```
 * # Envelope V3 Flow Template
 * # Name: 用户注册
 * # Category: auth
 * # Description: 验证输入 → 检查已有用户 → 插入用户 → 发送欢迎邮件
 * #
 * thing: template-signup
 * ...
 * ```
 *
 * 导入时可兼容标准 FlowDefinition YAML（无模板元数据头）和
 * 带模板元数据头的 YAML 两种格式。
 *
 * @author xiye
 * @date 2026-06-14
 */

import YAML from "yaml";
import type { FlowDefinition } from "../thing-model/types";
import { flowDefinitionSchema } from "../thing-model/schema";

/**
 * 将 FlowDefinition 序列化为带模板元数据头的 YAML 字符串
 *
 * 在标准 FlowDefinition YAML 之上添加模板元数据注释头，
 * 包含模板名称、分类、描述等信息，便于跨项目共享和版本控制。
 *
 * @param flowDef - 要导出的流程定义
 * @returns 带模板元数据头的 YAML 字符串
 */
export function exportTemplate(flowDef: FlowDefinition): string {
  const headerLines: string[] = [
    "# Envelope V3 Flow Template",
    `# Thing: ${flowDef.thing}`,
    `# Version: ${flowDef.version}`,
    ...(flowDef.description ? [`# Description: ${flowDef.description}`] : []),
    "#",
    "# 此模板可被 Envelope V3 编辑器导入。",
    "# 导入后节点和连线将替换当前画布内容。",
    "#",
    "",
  ];

  const header = headerLines.join("\n");

  const doc = new YAML.Document(flowDef);
  const body = doc.toString({
    indent: 2,
    lineWidth: 0,
  });

  return header + body;
}

/**
 * 从 YAML 字符串中解析 FlowDefinition
 *
 * 兼容两种格式：
 * 1. 带模板元数据注释头的模板 YAML（通过 exportTemplate 生成）
 * 2. 标准 FlowDefinition YAML（通过 jsonToYamlFile 生成）
 *
 * 解析时会自动过滤掉 YAML 注释行，仅提取 thing/nodes/edges 等结构化数据。
 *
 * @param yamlString - YAML 格式的模板或流程定义字符串
 * @returns 解析后的 FlowDefinition 对象
 * @throws 如果 YAML 格式不合法或不符合 FlowDefinition schema
 */
export function importTemplate(yamlString: string): FlowDefinition {
  if (!yamlString || yamlString.trim().length === 0) {
    throw new Error("YAML 内容为空，无法导入模板");
  }

  const parsed = YAML.parse(yamlString);

  if (!parsed || typeof parsed !== "object") {
    throw new Error("YAML 解析结果不是有效的对象");
  }

  const validationResult = flowDefinitionSchema.safeParse(parsed);

  if (!validationResult.success) {
    const messages = validationResult.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`模板格式不符合 Thing Model 规范:\n${messages}`);
  }

  return validationResult.data;
}
