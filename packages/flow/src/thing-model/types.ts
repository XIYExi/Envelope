/**
 * Thing Model 核心类型定义 — 业务流程 DSL 的类型系统
 *
 * 定义了流程节点、连接、端口、节点注册等所有核心数据结构。
 * Thing Model 是 Envelope V3 的业务逻辑层：通过可视化的节点和连线
 * 来描述数据库操作、API 调用、条件分支、循环、数据转换等业务逻辑。
 *
 * @author xiye
 * @date 2026-06-14
 */

// ═══════════════════════════════════════════════════════════════════
// 基础类型
// ═══════════════════════════════════════════════════════════════════

/** 流程中所有内置节点类型的唯一标识符 */
export type FlowNodeType =
  | "event.start"
  | "event.end"
  | "event.trigger"
  | "db.query"
  | "db.insert"
  | "db.update"
  | "db.delete"
  | "api.request"
  | "condition.if"
  | "condition.switch"
  | "loop.forEach"
  | "loop.while"
  | "action.email"
  | "transform.data"
  | "custom.code"
  | "flow.delay"
  | "notification";

/** 节点在 UI 中的分类，用于组件面板分组显示 */
export type FlowNodeCategory =
  | "trigger"
  | "database"
  | "api"
  | "condition"
  | "loop"
  | "action"
  | "transform"
  | "custom"
  | "flow";

/** 端口数据类型 — Thing Model 的基本类型系统 */
export type PortDataType = "string" | "number" | "boolean" | "object" | "array" | "any";

/** 流程节点上的输入/输出端口定义 */
export interface FlowPort {
  /** 端口唯一标识符，例如 "table", "data", "result" */
  id: string;
  /** 端口显示名称，中文 */
  label: string;
  /** 端口数据类型 */
  type: PortDataType;
  /** 是否必须连接 */
  required?: boolean;
  /** 端口用途说明 */
  description?: string;
}

/** 流程节点在画布上的位置 */
export interface FlowPosition {
  x: number;
  y: number;
}

// ═══════════════════════════════════════════════════════════════════
// 节点定义与实例
// ═══════════════════════════════════════════════════════════════════

/**
 * 流程节点类型定义（静态元数据）
 *
 * 每个节点类型有固定的输入/输出端口和配置结构，
 * 此接口描述节点类型的"模板"。
 */
export interface FlowNodeDefinition {
  /** 节点类型唯一标识符 */
  type: FlowNodeType;
  /** 中文显示名称 */
  label: string;
  /** UI 分类 */
  category: FlowNodeCategory;
  /** React Flow 节点颜色（十六进制） */
  color: string;
  /** Lucide 图标名称 */
  icon: string;
  /** 功能说明 */
  description: string;
  /** 输入端口列表 */
  inputs: FlowPort[];
  /** 输出端口列表 */
  outputs: FlowPort[];
}

/**
 * 流程节点实例
 *
 * 节点的运行时表示，包含位置、配置和端口绑定信息。
 * 当从 YAML 解析或从 JSON 加载时生成此结构。
 */
export interface FlowNode {
  /** 节点实例唯一 ID */
  id: string;
  /** 引用的节点类型 */
  type: FlowNodeType;
  /** 画布位置 */
  position: FlowPosition;
  /** 用户自定义标签（可选，覆盖默认名称） */
  label?: string;
  /** 节点配置数据，格式由 node definition 的 configSchema 约束 */
  config: Record<string, unknown>;
}

/** 流程连线 — 两个节点端口之间的有向连接 */
export interface FlowEdge {
  /** 连线唯一 ID */
  id: string;
  /** 源节点 ID */
  source: string;
  /** 源节点输出端口 ID */
  sourceHandle: string;
  /** 目标节点 ID */
  target: string;
  /** 目标节点输入端口 ID */
  targetHandle: string;
  /** 连线标签（可选） */
  label?: string;
}

// ═══════════════════════════════════════════════════════════════════
// 流程定义
// ═══════════════════════════════════════════════════════════════════

/**
 * 完整的流程定义
 *
 * 包含所有节点和边的列表，是流程的顶层数据结构。
 * 支持 JSON 序列化和 YAML 序列化两种格式。
 */
export interface FlowDefinition {
  /** 流程唯一标识符（thing id） */
  thing: string;
  /** 流程版本号，遵循 semver */
  version: string;
  /** 流程功能描述 */
  description?: string;
  /** 流程中的所有节点 */
  nodes: FlowNode[];
  /** 流程中的所有连线 */
  edges: FlowEdge[];
}

// ═══════════════════════════════════════════════════════════════════
// 验证结果
// ═══════════════════════════════════════════════════════════════════

/** 单条验证错误信息 */
export interface ValidationError {
  /** 错误级别 */
  level: "error" | "warning";
  /** 相关节点或边 ID */
  nodeId?: string;
  edgeId?: string;
  /** 错误描述（中文） */
  message: string;
}

/** 流程验证结果 */
export interface ValidationResult {
  /** 是否通过验证（无 error 级别的错误） */
  valid: boolean;
  /** 所有错误和警告 */
  errors: ValidationError[];
}

// ═══════════════════════════════════════════════════════════════════
// 转换结果
// ═══════════════════════════════════════════════════════════════════

/** YAML ↔ JSON 转换方向 */
export type ConversionDirection = "json-to-yaml" | "yaml-to-json";

/** 转换操作结果 */
export interface ConversionResult {
  /** 操作是否成功 */
  success: boolean;
  /** 转换后的数据（成功时为字符串或对象） */
  data?: string | FlowDefinition;
  /** 失败时的错误信息 */
  error?: string;
}
