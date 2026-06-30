/**
 * 事件总线类型定义
 *
 * EditorEventMap 是编辑器全局事件注册表。
 * 每个事件名映射到对应的 payload 类型，emit/on 时自动类型推导。
 */

export interface EditorEventMap {
  'canvas:select': { id: string | null; ids: string[] };
  'canvas:drop': { component: unknown; target: unknown };
  'editor:modeChange': { mode: string };
  'flow:execute': { flowId: string; triggerData: unknown };
  'flow:complete': { flowId: string; result: unknown };
  'document:change': { changeType: 'add' | 'remove' | 'move' | 'update'; ids: string[] };
  'material:register': { types: string[] };
  'editor:save': { pageId: string };
  'panel:resize': { side: 'left' | 'right'; width: number };
}

export type EventHandler<T = unknown> = (payload: T) => void;

export type Unsubscribe = () => void;
