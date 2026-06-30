/**
 * Ctrl 键全局状态 — React Context 实现
 *
 * 将原先 renderer.tsx 中的模块级可变状态（_globalCtrlDown + 模块级事件监听器）
 * 替换为 React Context 模式，消除 SSR 泄漏风险与模块级副作用。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-23
 * @since ISC-R8
 */

"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

/** Ctrl 键按下状态上下文 */
const CtrlContext = createContext(false);

export interface CtrlProviderProps {
  children: ReactNode;
}

/**
 * Ctrl 键状态提供者
 *
 * 在组件挂载时注册 keydown/keyup 监听器，
 * 卸载时自动清理，无模块级副作用。
 */
export function CtrlProvider({ children }: CtrlProviderProps) {
  const [ctrlDown, setCtrlDown] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta") {
        setCtrlDown(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta") {
        setCtrlDown(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <CtrlContext.Provider value={ctrlDown}>{children}</CtrlContext.Provider>;
}

/**
 * 读取当前 Ctrl 键是否按下
 *
 * 用法与原有 `useCtrlDown()` 完全一致，签名兼容。
 * 在 CtrlProvider 外部使用时会默认返回 false（与旧行为一致）。
 * 
 * @returns 当前 Ctrl 键是否按下
 */
export function useCtrlDown(): boolean {
  return useContext(CtrlContext);
}
