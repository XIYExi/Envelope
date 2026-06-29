/**
 * BEM Tools 插件管理器
 * 
 * 允许外部插件注册自定义覆盖层工具，
 * 所有注册的工具会在 BemTools 组件中统一渲染。
 * 
 * 工具组件必须实现一个无参构造函数，
 * 并在渲染时接收一个 key 属性（可选）。
 * 这是为了确保在 React 中正确使用 key 来维护组件状态。
 * 
 * 注册时，工具组件的名称作为唯一标识，不能重复。
 * 注册后，工具组件会在 BemTools 组件中显示为一个可点击的图标。
 * 
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 */
"use client";

import type { ComponentType } from "react";

// 插件工具组件类型：一个仅接收 key 的 React 组件
export type BemToolComponent = ComponentType<{ key?: number }>;

/**
 * BEM Tools 插件管理器
 *
 * 允许外部插件注册自定义覆盖层工具，
 * 所有注册的工具会在 BemTools 组件中统一渲染。
 */
class BemToolsManagerImpl {
  // 工具注册表，以名称作为唯一标识
  private tools = new Map<string, BemToolComponent>();

  /**
   * 注册一个工具组件
   * 同名组件不可重复注册（防止多次初始化）
   */
  add(name: string, comp: BemToolComponent) {
    if (this.tools.has(name)) {
      console.warn(`[BemTools] tool "${name}" already registered, skipping`);
      return;
    }
    this.tools.set(name, comp);
  }

  /** 移除已注册的工具 */
  remove(name: string) {
    this.tools.delete(name);
  }

  /** 获取所有已注册的工具组件列表 */
  getAll(): BemToolComponent[] {
    return Array.from(this.tools.values());
  }
}

// 全局单例实例
export const bemToolsManager = new BemToolsManagerImpl();
