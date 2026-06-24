/**
 * 内置流程节点类型定义库
 *
 * 定义了 Envelope V3 支持的所有内置节点类型，包括：
 * - 事件触发器（start, end, trigger）
 * - 数据库操作（query, insert, update, delete）
 * - API 请求
 * - 条件与循环（if/switch, forEach/while）
 * - 动作节点（email, notification, delay）
 * - 数据转换与自定义代码
 *
 * 每个节点类型定义了固定的输入/输出端口（端口类型校验用）、
 * UI 标签、图标和颜色，供 Visual Flow Editor (F13) 和
 * Code Generator (F17) 使用。
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { FlowNodeDefinition, FlowNodeType, ConfigField } from "./types";

/**
 * 所有内置节点类型定义集合
 *
 * 按 ISC-64 要求包含 12 种核心节点类型，外加 3 种事件触发器
 * 和 2 种变体类型（switch, while），共计 17 种。
 */
export const BUILT_IN_NODE_DEFINITIONS: FlowNodeDefinition[] = [
  // ═══════════════════════════════════════════════════════════════
  // 触发器节点 (Trigger)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "event.start",
    label: "开始",
    category: "trigger",
    color: "#22c55e",
    icon: "Play",
    description: "流程的起始节点，每个流程有且仅有一个开始节点",
    inputs: [],
    outputs: [
      { id: "out", label: "输出", type: "any", description: "流程启动信号" },
    ],
  },
  {
    type: "event.end",
    label: "结束",
    category: "trigger",
    color: "#ef4444",
    icon: "StopCircle",
    description: "流程的终止节点，可以有多个结束节点代表不同的结束状态",
    inputs: [
      { id: "in", label: "输入", type: "any", description: "流程结束信号" },
    ],
    outputs: [],
  },
  {
    type: "event.trigger",
    label: "事件触发",
    category: "trigger",
    color: "#f59e0b",
    icon: "Zap",
    description: "绑定到页面组件事件（onClick、onSubmit）的外部触发入口",
    inputs: [],
    outputs: [
      { id: "data", label: "事件数据", type: "object", description: "事件携带的上下文数据" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 数据库节点 (Database)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "db.query",
    label: "数据库查询",
    category: "database",
    color: "#3b82f6",
    icon: "Database",
    description: "执行 SELECT 查询，从数据表读取数据",
    inputs: [
      { id: "table", label: "数据表", type: "string", required: true, description: "要查询的表名" },
      { id: "where", label: "查询条件", type: "object", description: "WHERE 子句的条件对象" },
      { id: "columns", label: "返回字段", type: "array", description: "SELECT 的字段列表" },
      { id: "orderBy", label: "排序", type: "string", description: "ORDER BY 子句" },
      { id: "limit", label: "条数限制", type: "number", description: "返回行数上限" },
    ],
    outputs: [
      { id: "result", label: "查询结果", type: "array", description: "查询返回的行数组" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      table: { type: "select", label: "数据表", required: true, placeholder: "选择数据表" },
      limit: { type: "number", label: "限制条数", default: 50, placeholder: "最多返回记录数" },
      orderBy: { type: "string", label: "排序字段", placeholder: "如 created_at desc" },
    },
  },
  {
    type: "db.insert",
    label: "数据库插入",
    category: "database",
    color: "#3b82f6",
    icon: "FilePlus",
    description: "执行 INSERT 操作，向数据表插入新行",
    inputs: [
      { id: "table", label: "数据表", type: "string", required: true, description: "要插入的表名" },
      { id: "data", label: "插入数据", type: "object", required: true, description: "要插入的行数据对象" },
    ],
    outputs: [
      { id: "record", label: "插入记录", type: "object", description: "插入后的完整记录" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      table: { type: "select", label: "数据表", required: true, placeholder: "选择数据表" },
    },
  },
  {
    type: "db.update",
    label: "数据库更新",
    category: "database",
    color: "#3b82f6",
    icon: "FileEdit",
    description: "执行 UPDATE 操作，修改数据表中的现有行",
    inputs: [
      { id: "table", label: "数据表", type: "string", required: true, description: "要更新的表名" },
      { id: "where", label: "更新条件", type: "object", required: true, description: "WHERE 子句" },
      { id: "data", label: "更新数据", type: "object", required: true, description: "要修改的字段和值" },
    ],
    outputs: [
      { id: "count", label: "影响行数", type: "number", description: "被更新的行数" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      table: { type: "select", label: "数据表", required: true, placeholder: "选择数据表" },
    },
  },
  {
    type: "db.delete",
    label: "数据库删除",
    category: "database",
    color: "#3b82f6",
    icon: "Trash2",
    description: "执行 DELETE 操作，从数据表删除行",
    inputs: [
      { id: "table", label: "数据表", type: "string", required: true, description: "要删除的表名" },
      { id: "where", label: "删除条件", type: "object", required: true, description: "WHERE 子句" },
    ],
    outputs: [
      { id: "count", label: "影响行数", type: "number", description: "被删除的行数" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      table: { type: "select", label: "数据表", required: true, placeholder: "选择数据表" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // API 节点 (API)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "api.request",
    label: "API 请求",
    category: "api",
    color: "#8b5cf6",
    icon: "Globe",
    description: "发送 HTTP 请求到外部 API 服务",
    inputs: [
      { id: "url", label: "请求地址", type: "string", required: true, description: "HTTP 请求 URL" },
      { id: "method", label: "请求方法", type: "string", required: true, description: "GET / POST / PUT / DELETE" },
      { id: "headers", label: "请求头", type: "object", description: "HTTP Headers 对象" },
      { id: "body", label: "请求体", type: "any", description: "请求 body 数据" },
    ],
    outputs: [
      { id: "response", label: "响应数据", type: "object", description: "API 返回的响应体" },
      { id: "status", label: "状态码", type: "number", description: "HTTP 状态码" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      url: { type: "string", label: "请求地址", required: true, placeholder: "https://api.example.com/endpoint" },
      method: { type: "select", label: "请求方法", required: true, options: [
        { label: "GET", value: "GET" },
        { label: "POST", value: "POST" },
        { label: "PUT", value: "PUT" },
        { label: "DELETE", value: "DELETE" },
      ]},
      headers: { type: "json", label: "请求头", placeholder: '{"Content-Type": "application/json"}' },
      timeout: { type: "number", label: "超时时间(ms)", default: 30000, placeholder: "请求超时毫秒数" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 条件节点 (Condition)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "condition.if",
    label: "条件判断",
    category: "condition",
    color: "#f59e0b",
    icon: "GitBranch",
    description: "根据布尔表达式的结果选择不同的执行路径",
    inputs: [
      { id: "condition", label: "条件表达式", type: "any", required: true, description: "求值为布尔值的表达式" },
    ],
    outputs: [
      { id: "true", label: "为真", type: "any", description: "条件成立时的输出" },
      { id: "false", label: "为假", type: "any", description: "条件不成立时的输出" },
    ],
  },
  {
    type: "condition.switch",
    label: "多路分支",
    category: "condition",
    color: "#f59e0b",
    icon: "ArrowLeftRight",
    description: "根据值匹配多个 case 分支",
    inputs: [
      { id: "value", label: "匹配值", type: "any", required: true, description: "要进行匹配的值" },
    ],
    outputs: [
      { id: "default", label: "默认", type: "any", description: "无匹配时的默认输出" },
    ],
    configSchema: {
      cases: { type: "json", label: "分支定义", placeholder: '[{ "label": "选项A", "value": "a" }]', description: "JSON 数组，每项包含 label 和 value" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 循环节点 (Loop)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "loop.forEach",
    label: "遍历循环",
    category: "loop",
    color: "#06b6d4",
    icon: "Repeat",
    description: "遍历数组中的每个元素，对每个元素执行子流程",
    inputs: [
      { id: "items", label: "遍历数组", type: "array", required: true, description: "要遍历的数组数据" },
    ],
    outputs: [
      { id: "item", label: "当前元素", type: "any", description: "数组中的当前元素" },
      { id: "index", label: "当前索引", type: "number", description: "当前元素的索引（从 0 开始）" },
      { id: "done", label: "遍历完成", type: "boolean", description: "所有元素处理完毕的信号" },
    ],
  },
  {
    type: "loop.while",
    label: "条件循环",
    category: "loop",
    color: "#06b6d4",
    icon: "RefreshCw",
    description: "当条件为真时反复执行子流程",
    inputs: [
      { id: "condition", label: "循环条件", type: "boolean", required: true, description: "循环继续执行的条件" },
    ],
    outputs: [
      { id: "body", label: "循环体", type: "any", description: "每次循环的输出数据" },
      { id: "done", label: "循环结束", type: "boolean", description: "条件为假时的退出信号" },
    ],
    configSchema: {
      maxIterations: { type: "number", label: "最大循环次数", default: 100, placeholder: "防止无限循环" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 动作节点 (Action)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "action.email",
    label: "发送邮件",
    category: "action",
    color: "#ec4899",
    icon: "Mail",
    description: "通过邮件服务发送邮件通知",
    inputs: [
      { id: "to", label: "收件人", type: "string", required: true, description: "收件人邮箱地址" },
      { id: "subject", label: "邮件主题", type: "string", required: true, description: "邮件标题" },
      { id: "body", label: "邮件正文", type: "string", description: "HTML 或纯文本正文" },
      { id: "template", label: "模板名称", type: "string", description: "邮件模板 ID" },
    ],
    outputs: [
      { id: "sent", label: "发送状态", type: "boolean", description: "是否发送成功" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      to: { type: "string", label: "收件人", required: true, placeholder: "user@example.com" },
      subject: { type: "string", label: "邮件主题", required: true, placeholder: "邮件标题" },
      template: { type: "select", label: "邮件模板", placeholder: "选择邮件模板" },
      cc: { type: "string", label: "抄送", placeholder: "cc@example.com" },
      bcc: { type: "string", label: "密送", placeholder: "bcc@example.com" },
    },
  },
  {
    type: "notification",
    label: "通知",
    category: "action",
    color: "#ec4899",
    icon: "Bell",
    description: "向用户发送应用内通知或推送通知",
    inputs: [
      { id: "title", label: "通知标题", type: "string", required: true, description: "通知的标题文本" },
      { id: "message", label: "通知内容", type: "string", required: true, description: "通知的正文内容" },
      { id: "type", label: "通知类型", type: "string", description: "success / error / warning / info" },
    ],
    outputs: [
      { id: "shown", label: "已显示", type: "boolean", description: "通知是否成功显示" },
    ],
    configSchema: {
      type: { type: "select", label: "通知类型", options: [
        { label: "成功", value: "success" },
        { label: "错误", value: "error" },
        { label: "警告", value: "warning" },
        { label: "信息", value: "info" },
      ]},
      persistent: { type: "boolean", label: "持久化通知", default: false, description: "是否常驻显示直到用户手动关闭" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 转换与自定义节点 (Transform & Custom)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "transform.data",
    label: "数据转换",
    category: "transform",
    color: "#10b981",
    icon: "Shuffle",
    description: "对输入数据进行映射、过滤、聚合等转换操作",
    inputs: [
      { id: "input", label: "输入数据", type: "any", required: true, description: "待转换的源数据" },
      { id: "expression", label: "转换表达式", type: "string", description: "JavaScript 表达式或映射定义" },
    ],
    outputs: [
      { id: "result", label: "转换结果", type: "any", description: "转换后的输出数据" },
      { id: "error", label: "错误信息", type: "string", description: "失败时的错误详情" },
    ],
    configSchema: {
      expression: { type: "expression", label: "转换表达式", placeholder: "data.items.map(i => i.name)", description: "JavaScript 表达式，输入数据可用 data 变量访问" },
    },
  },
  {
    type: "custom.code",
    label: "自定义代码",
    category: "custom",
    color: "#6b7280",
    icon: "Code2",
    description: "执行用户编写的自定义 TypeScript 代码，拥有全部上下文访问权限",
    inputs: [
      { id: "context", label: "上下文数据", type: "object", description: "传入代码的上下文对象" },
    ],
    outputs: [
      { id: "result", label: "执行结果", type: "any", description: "代码返回的值" },
      { id: "error", label: "错误信息", type: "string", description: "代码异常的详情" },
    ],
    configSchema: {
      code: { type: "code", label: "自定义代码", language: "typescript", placeholder: "// 在此编写 TypeScript 代码\nreturn context.data;", description: "拥有 flow 上下文全部访问权限的 TypeScript 代码" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 流程控制节点 (Flow Control)
  // ═══════════════════════════════════════════════════════════════

  {
    type: "flow.delay",
    label: "延时",
    category: "flow",
    color: "#64748b",
    icon: "Clock",
    description: "暂停流程执行指定的毫秒数",
    inputs: [
      { id: "milliseconds", label: "延时时长", type: "number", required: true, description: "延迟的毫秒数" },
    ],
    outputs: [
      { id: "done", label: "完成", type: "boolean", description: "延时结束信号" },
    ],
    configSchema: {
      milliseconds: { type: "number", label: "延时毫秒数", default: 1000, placeholder: "延迟的毫秒数" },
    },
  },
];

/**
 * 按类型快速查找节点定义
 */
export const NODE_DEFINITION_MAP = new Map<FlowNodeType, FlowNodeDefinition>(
  BUILT_IN_NODE_DEFINITIONS.map((def) => [def.type, def])
);

/**
 * 按分类获取节点定义列表
 *
 * @param category - 节点分类
 * @returns 该分类下的所有节点定义
 */
export function getNodeDefinitionsByCategory(category: FlowNodeDefinition["category"]): FlowNodeDefinition[] {
  return BUILT_IN_NODE_DEFINITIONS.filter((def) => def.category === category);
}

/**
 * 根据节点类型获取其定义
 *
 * @param type - 节点类型标识符
 * @returns 节点定义，如果类型不存在则返回 undefined
 */
export function getNodeDefinition(type: FlowNodeType): FlowNodeDefinition | undefined {
  return NODE_DEFINITION_MAP.get(type);
}
