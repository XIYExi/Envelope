/**
 * 流程绑定 Zustand Store — 管理流程与组件事件、API 端点的关联关系
 *
 * 作为流程（@envelope/flow）与页面编辑器（@envelope/engine）之间的桥梁。
 * 存储三种数据：
 * - flowList: 所有可用的流程列表（由 FlowEditor 维护）
 * - eventBindings: 组件事件 → 流程 ID 的映射
 * - endpointBindings: API 路由 → 流程 ID 的映射
 *
 * @author xiye
 * @date 2026-06-14
 */

import { create } from "zustand";
import type { FlowBindingStore, FlowBindingState, BindableEvent } from "./types";
import { makeEventBindingKey } from "./types";

/** 初始状态 */
const initialState: FlowBindingState = {
  eventBindings: {},
  endpointBindings: {},
  flowList: [],
};

/**
 * 流程绑定 Store
 *
 * 跨编辑器模式共享：
 * - FlowEditor (F13) 调用 registerFlow/unregisterFlow 维护流程列表
 * - 属性编辑器 (right-panel) 调用 bindEvent/getEventBinding
 * - 路由编辑器 (routing-editor) 调用 bindEndpoint/getEndpointBinding
 */
export const useFlowBindingStore = create<FlowBindingStore>((set, get) => ({
  ...initialState,

  // ═══════════════════════════════════════════════════════════════
  // 流程注册
  // ═══════════════════════════════════════════════════════════════

  /**
   * 注册一个流程到可用列表（显示在下拉选择中）
   *
   * @param id - 流程 ID
   * @param name - 流程显示名称
   */
  registerFlow(id: string, name: string) {
    set((state) => {
      const exists = state.flowList.some((f) => f.id === id);
      if (exists) {
        return {
          flowList: state.flowList.map((f) => (f.id === id ? { ...f, name } : f)),
        };
      }
      return { flowList: [...state.flowList, { id, name }] };
    });
  },

  /**
   * 从可用列表注销一个流程，并清理所有关联的绑定
   *
   * @param id - 流程 ID
   */
  unregisterFlow(id: string) {
    set((state) => {
      const eventBindings = { ...state.eventBindings };
      const endpointBindings = { ...state.endpointBindings };
      // K3: eventBindings 值改为 string[]，需遍历数组移除
      for (const key of Object.keys(eventBindings)) {
        const arr = eventBindings[key];
        if (Array.isArray(arr)) {
          const filtered = arr.filter((fid) => fid !== id);
          if (filtered.length === 0) {
            delete eventBindings[key];
          } else {
            eventBindings[key] = filtered;
          }
        }
      }
      for (const key of Object.keys(endpointBindings)) {
        if (endpointBindings[key] === id) delete endpointBindings[key];
      }
      return {
        flowList: state.flowList.filter((f) => f.id !== id),
        eventBindings,
        endpointBindings,
      };
    });
  },

  // ═══════════════════════════════════════════════════════════════
  // 事件绑定
  // ═══════════════════════════════════════════════════════════════

  /**
   * K3: 绑定组件事件到多个流程（依次执行）
   *
   * @param componentId - 画布组件 ID
   * @param event - 可绑定事件名称
   * @param flowIds - 流程 ID 列表，空数组则清除绑定
   */
  bindEvent(componentId: string, event: BindableEvent, flowIds: string[]) {
    const key = makeEventBindingKey(componentId, event);
    set((state) => {
      if (!flowIds || flowIds.length === 0) {
        const next = { ...state.eventBindings };
        delete next[key];
        return { eventBindings: next };
      }
      return {
        eventBindings: { ...state.eventBindings, [key]: flowIds },
      };
    });
  },

  /**
   * 解除组件事件绑定
   *
   * @param componentId - 画布组件 ID
   * @param event - 可绑定事件名称
   */
  unbindEvent(componentId: string, event: BindableEvent) {
    const key = makeEventBindingKey(componentId, event);
    set((state) => {
      const next = { ...state.eventBindings };
      delete next[key];
      return { eventBindings: next };
    });
  },

  /**
   * K3: 查询组件事件绑定的流程 ID 列表
   *
   * @param componentId - 画布组件 ID
   * @param event - 可绑定事件名称
   * @returns 绑定的流程 ID 数组，未绑定时返回 undefined
   */
  getEventBinding(componentId: string, event: BindableEvent): string[] | undefined {
    const key = makeEventBindingKey(componentId, event);
    return get().eventBindings[key];
  },

  /**
   * K3: 按事件类型查询所有组件的绑定 flow ID 列表（去重合并）
   *
   * @param eventType - 事件类型
   * @returns 所有绑定了该事件的 flow ID 列表
   */
  getEventBindings(eventType: BindableEvent): string[] {
    const all = get().eventBindings;
    const result = new Set<string>();
    for (const [key, flowIds] of Object.entries(all)) {
      if (key.endsWith(`::${eventType}`)) {
        for (const id of flowIds) {
          result.add(id);
        }
      }
    }
    return Array.from(result);
  },

  // ═══════════════════════════════════════════════════════════════
  // 端点绑定
  // ═══════════════════════════════════════════════════════════════

  /**
   * 绑定 API 端点路由到流程处理器
   *
   * @param routeId - 路由编辑器中的路由 ID
   * @param flowId - 流程 ID
   */
  bindEndpoint(routeId: string, flowId: string) {
    set((state) => ({
      endpointBindings: { ...state.endpointBindings, [routeId]: flowId },
    }));
  },

  /**
   * 解除 API 端点路由的流程绑定
   *
   * @param routeId - 路由编辑器中的路由 ID
   */
  unbindEndpoint(routeId: string) {
    set((state) => {
      const next = { ...state.endpointBindings };
      delete next[routeId];
      return { endpointBindings: next };
    });
  },

  /**
   * 查询端点路由绑定的流程 ID
   *
   * @param routeId - 路由编辑器中的路由 ID
   * @returns 绑定的流程 ID，未绑定时返回 undefined
   */
  getEndpointBinding(routeId: string): string | undefined {
    return get().endpointBindings[routeId];
  },

  /**
   * 清空所有绑定和流程列表
   */
  clearAll() {
    set(initialState);
  },
}));
