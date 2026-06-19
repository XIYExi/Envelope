/**
 * 流程绑定类型定义 — 将业务流程连接到页面事件和 API 端点
 *
 * 绑定系统实现了 ISC-71 和 ISC-72：
 * - ISC-71: 流程可绑定到页面组件的 onClick / onSubmit / onPageLoad 等事件
 * - ISC-72: 流程可绑定到 API 端点作为 POST / PUT / DELETE 的处理器
 *
 * 绑定键约定：
 * - 事件绑定: `${componentId}::${eventName}` → flowId
 * - 端点绑定: `${routeId}` → flowId
 *
 * @author xiye
 * @date 2026-06-14
 */

// ═══════════════════════════════════════════════════════════════════
// 事件绑定
// ═══════════════════════════════════════════════════════════════════

/** 组件支持的可绑定事件类型 */
export type BindableEvent =
  | "onClick"
  | "onSubmit"
  | "onChange"
  | "onFocus"
  | "onBlur"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onKeyDown"
  | "onPageLoad"
  | "onPageUnload";

/** 事件绑定键: componentId::eventName */
export type EventBindingKey = `${string}::${BindableEvent}`;

/** 解构事件绑定键 */
export interface ParsedEventBinding {
  /** 画布组件 ID */
  componentId: string;
  /** 绑定的事件名称 */
  event: BindableEvent;
}

/** 事件绑定映射表 */
export type EventBindingMap = Record<string, string>;

// ═══════════════════════════════════════════════════════════════════
// 端点绑定
// ═══════════════════════════════════════════════════════════════════

/** 端点绑定映射表 */
export type EndpointBindingMap = Record<string, string>;

// ═══════════════════════════════════════════════════════════════════
// 绑定 Store 接口
// ═══════════════════════════════════════════════════════════════════

/** 流程绑定状态 */
export interface FlowBindingState {
  /** 组件事件 → 流程 ID 的映射 */
  eventBindings: EventBindingMap;
  /** API 端点路由 ID → 流程 ID 的映射 */
  endpointBindings: EndpointBindingMap;
  /** 流程 ID 列表（用于下拉选择，由 FlowEditor 维护） */
  flowList: { id: string; name: string }[];
}

/** 流程绑定操作 */
export interface FlowBindingActions {
  /** 注册一个流程（添加到可选列表） */
  registerFlow: (id: string, name: string) => void;
  /** 注销一个流程 */
  unregisterFlow: (id: string) => void;
  /** 绑定组件事件到流程 */
  bindEvent: (componentId: string, event: BindableEvent, flowId: string) => void;
  /** 解除组件事件绑定 */
  unbindEvent: (componentId: string, event: BindableEvent) => void;
  /** 获取组件事件的绑定流程 ID */
  getEventBinding: (componentId: string, event: BindableEvent) => string | undefined;
  /** 绑定 API 端点路由到流程 */
  bindEndpoint: (routeId: string, flowId: string) => void;
  /** 解除 API 端点路由绑定 */
  unbindEndpoint: (routeId: string) => void;
  /** 获取端点路由的绑定流程 ID */
  getEndpointBinding: (routeId: string) => string | undefined;
  /** 清空所有绑定 */
  clearAll: () => void;
}

/** 完整的流程绑定 Store 类型 */
export type FlowBindingStore = FlowBindingState & FlowBindingActions;

// ═══════════════════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════════════════

/**
 * 构造事件绑定键
 *
 * @param componentId - 画布组件 ID
 * @param event - 事件名称
 * @returns 绑定键字符串，格式: "componentId::event"
 */
export function makeEventBindingKey(componentId: string, event: BindableEvent): EventBindingKey {
  return `${componentId}::${event}`;
}

/**
 * 解析事件绑定键
 *
 * @param key - 绑定键字符串，格式: "componentId::event"
 * @returns 解析后的 componentId 和 event，键格式无效返回 null
 */
export function parseEventBindingKey(key: string): ParsedEventBinding | null {
  const lastSep = key.lastIndexOf("::");
  if (lastSep <= 0 || lastSep + 2 >= key.length) return null;
  const componentId = key.slice(0, lastSep);
  const eventRaw = key.slice(lastSep + 2);
  const VALID_EVENTS = new Set<BindableEvent>([
    "onClick", "onSubmit", "onChange", "onFocus", "onBlur",
    "onMouseEnter", "onMouseLeave", "onKeyDown", "onPageLoad", "onPageUnload",
  ]);
  if (!VALID_EVENTS.has(eventRaw as BindableEvent)) return null;
  return {
    componentId,
    event: eventRaw as BindableEvent,
  };
}
