/**
 * HotkeyManager — 轻量级快捷键管理器
 *
 * 对齐 lowcode-engine IPublicApiHotkey 的最小子集。
 * 每个 PluginContext 持有一个独立实例，destroy 时统一清理。
 *
 * 简化策略（相对 lowcode-engine）：
 * - 不实现 key sequence（"g i" 序列）
 * - 不实现 workspace-aware 路由
 * - 不实现 SPECIAL_ALIASES 全量映射（仅做 ctrl/cmd/alt/shift/mod 规范化）
 * - bind 返回 Disposable 函数（对齐 shell 约定）
 *
 * @reference lowcode-engine-main/packages/editor-core/src/hotkey.ts
 * @reference lowcode-engine-main/packages/shell/src/api/hotkey.ts:43-52 bind 返回 dispose
 */

import type { HotkeyAPI } from "./types";

/** 解析快捷键组合字符串为规范化片段 */
function parseCombo(combo: string): { ctrl: boolean; meta: boolean; alt: boolean; shift: boolean; key: string } {
  const parts = combo.toLowerCase().split("+").map((p) => p.trim());
  let ctrl = false;
  let meta = false;
  let alt = false;
  let shift = false;
  let key = "";

  for (const part of parts) {
    switch (part) {
      case "ctrl":
      case "control":
        ctrl = true;
        break;
      case "cmd":
      case "command":
      case "meta":
      case "mod":
        // mod 在 Mac 上 = meta，其他平台 = ctrl；这里统一设 meta，由调用环境判定
        meta = true;
        break;
      case "alt":
      case "option":
        alt = true;
        break;
      case "shift":
        shift = true;
        break;
      default:
        key = part;
    }
  }

  return { ctrl, meta, alt, shift, key };
}

/** 判断 KeyboardEvent 是否匹配给定规范化片段 */
function matches(e: KeyboardEvent, combo: ReturnType<typeof parseCombo>): boolean {
  const key = e.key.toLowerCase();
  if (key !== combo.key) return false;
  if (e.ctrlKey !== combo.ctrl) return false;
  if (e.metaKey !== combo.meta) return false;
  if (e.altKey !== combo.alt) return false;
  if (e.shiftKey !== combo.shift) return false;
  return true;
}

/**
 * 快捷键管理器
 *
 * 每个插件实例独立持有一个，绑定在 document 上。
 * destroy() 时自动移除所有监听器，防止内存泄漏。
 */
export class HotkeyManager implements HotkeyAPI {
  /** 已注册的绑定记录 */
  private bindings: Array<{ combo: ReturnType<typeof parseCombo>; callback: (e: KeyboardEvent) => void }> = [];
  /** document 级 keydown 监听器 */
  private listener: ((e: KeyboardEvent) => void) | null = null;
  /** 是否已激活 */
  private active = true;

  constructor() {
    this.listener = (e: KeyboardEvent) => {
      if (!this.active) return;
      for (const binding of this.bindings) {
        if (matches(e, binding.combo)) {
          binding.callback(e);
        }
      }
    };
    // SSR / Node 环境（如单元测试）下 document 不存在，延迟到客户端挂载
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", this.listener);
    }
  }

  /**
   * 绑定快捷键组合
   * @returns 取消绑定函数
   */
  bind(combos: string, callback: (e: KeyboardEvent) => void): () => void {
    const combo = parseCombo(combos);
    const entry = { combo, callback };
    this.bindings.push(entry);

    return () => {
      const idx = this.bindings.indexOf(entry);
      if (idx > -1) this.bindings.splice(idx, 1);
    };
  }

  /**
   * 销毁管理器，移除所有监听器
   */
  destroy(): void {
    this.active = false;
    this.bindings = [];
    if (this.listener && typeof document !== "undefined") {
      document.removeEventListener("keydown", this.listener);
      this.listener = null;
    }
  }
}
