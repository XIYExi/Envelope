/**
 * @envelope/flow — 业务逻辑流程引擎
 *
 * Envelope V3 的业务逻辑层核心包，提供：
 * - Thing Model 规范：属性/服务/事件的 DSL 类型系统
 * - 17 种内置节点类型：数据库操作、API 请求、条件/循环、邮件、通知等
 * - YAML ↔ JSON ↔ Visual Flow 双向转换
 * - 流程验证：类型检查、连接规则、完整性校验
 *
 * @author xiye
 * @date 2026-06-14
 */

export const PACKAGE_NAME = "@envelope/flow";
export const VERSION = "3.0.0";

// ═══════════════════════════════════════════════════════════════
// Thing Model
// ═══════════════════════════════════════════════════════════════

export type {
  FlowNodeType,
  FlowNodeCategory,
  PortDataType,
  FlowPort,
  FlowPosition,
  FlowNodeDefinition,
  FlowNode,
  FlowEdge,
  FlowDefinition,
  ValidationError,
  ValidationResult,
  ConversionDirection,
  ConversionResult,
  ConfigFieldType,
  ConfigField,
  DataModelColumn,
  DataModelTable,
  DataModelSchema,
  NodeExecutionState,
  FlowExecutionResult,
} from "./thing-model/types";

export { isTypeCompatible } from "./thing-model/types";

export {
  BUILT_IN_NODE_DEFINITIONS,
  NODE_DEFINITION_MAP,
  getNodeDefinitionsByCategory,
  getNodeDefinition,
} from "./thing-model/node-definitions";

export {
  flowNodeSchema,
  flowEdgeSchema,
  flowDefinitionSchema,
  flowNodeTypeSchema,
  flowPortSchema,
  flowPositionSchema,
  flowNodeDefinitionSchema,
  validateFlowDefinition,
  parseFlowDefinition,
} from "./thing-model/schema";

// ═══════════════════════════════════════════════════════════════
// YAML 转换
// ═══════════════════════════════════════════════════════════════

export {
  yamlToJson,
  jsonToYaml,
  jsonToYamlFile,
  validateRoundTrip,
} from "./yaml/converter";

// ═══════════════════════════════════════════════════════════════
// 流程验证
// ═══════════════════════════════════════════════════════════════

export {
  validateFlow,
} from "./validation/validator";

// ═══════════════════════════════════════════════════════════════
// 可视化编辑器
// ═══════════════════════════════════════════════════════════════

export { FlowEditor, NodeConfigPanel, ExecutionMonitor, executeFlowLocally } from "./editor";

// ═══════════════════════════════════════════════════════════════
// 流程绑定
// ═══════════════════════════════════════════════════════════════

export type {
  BindableEvent,
  EventBindingKey,
  ParsedEventBinding,
  EventBindingMap,
  EndpointBindingMap,
  FlowBindingState,
  FlowBindingActions,
  FlowBindingStore,
} from "./binding/types";

export {
  makeEventBindingKey,
  parseEventBindingKey,
} from "./binding/types";

export {
  useFlowBindingStore,
} from "./binding/store";

// ═══════════════════════════════════════════════════════════════
// 流程模板 (F15)
// ═══════════════════════════════════════════════════════════════

export type {
  FlowTemplate,
  FlowTemplateCategory,
} from "./templates/registry";

export {
  getAllTemplates,
  getTemplate,
  getTemplatesByCategory,
} from "./templates/registry";

export {
  exportTemplate,
  importTemplate,
} from "./templates/export";
