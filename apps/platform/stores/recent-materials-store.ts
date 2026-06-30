/**
 * 最近使用物料状态管理
 *
 * 记录用户最近使用的物料项，用于在物料面板顶部展示"最近使用"分区。
 * 使用 Zustand 管理，会话级（不持久化到 localStorage）。
 *
 * 每次使用记录去重：同一物料重复使用会被移到列表末尾。
 * 默认保留最近 10 个物料。
 *
 * @author xiye
 * @date 2026-06-23
 * @since 3.0.0
 */
"use client";

import { create } from "zustand";

/** 最近使用数量上限 */
const MAX_RECENT = 10;

interface RecentMaterialsState {
  /** 最近使用的物料名称列表（去重，最新在末尾） */
  recentNames: string[];
  /** 记录一次物料使用 */
  recordUse: (name: string) => void;
}

export const useRecentMaterialsStore = create<RecentMaterialsState>((set) => ({
  recentNames: [],

  recordUse: (name) => {
    set((state) => {
      const filtered = state.recentNames.filter((n) => n !== name);
      const next = [...filtered, name];
      if (next.length > MAX_RECENT) {
        next.splice(0, next.length - MAX_RECENT);
      }
      return { recentNames: next };
    });
  },
}));
