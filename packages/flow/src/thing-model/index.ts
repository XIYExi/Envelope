/**
 * Thing Model 模块 — 导出口
 *
 * @author xiye
 * @date 2026-06-14
 */

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
} from "./types";

export { isTypeCompatible } from "./types";

export {
  BUILT_IN_NODE_DEFINITIONS,
  NODE_DEFINITION_MAP,
  getNodeDefinitionsByCategory,
  getNodeDefinition,
} from "./node-definitions";

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
} from "./schema";
