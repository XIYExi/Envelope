/**
 * 收藏物料状态管理
 *
 * 用户可以收藏/取消收藏物料项，收藏列表会持久化到 localStorage。
 * 收藏的物料在面板上以星标标记，并提供独立分区展示。
 *
 * @author xiye
 * @date 2026-06-23
 * @since 3.0.0
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteMaterialsState {
  /** 收藏的物料名称集合（Set 序列化为数组） */
  favoriteNames: string[];
  /** 切换指定物料的收藏状态 */
  toggleFavorite: (name: string) => void;
  /** 判断指定物料是否已收藏 */
  isFavorite: (name: string) => boolean;
}

export const useFavoriteMaterialsStore = create<FavoriteMaterialsState>()(
  persist(
    (set, get) => ({
      favoriteNames: [],

      toggleFavorite: (name) => {
        set((state) => {
          const exists = state.favoriteNames.includes(name);
          return {
            favoriteNames: exists
              ? state.favoriteNames.filter((n) => n !== name)
              : [...state.favoriteNames, name],
          };
        });
      },

      isFavorite: (name) => get().favoriteNames.includes(name),
    }),
    {
      name: "envelope-favorite-materials",
    },
  ),
);
