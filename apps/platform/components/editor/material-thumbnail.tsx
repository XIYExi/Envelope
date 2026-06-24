/**
 * 物料缩略图预览组件
 *
 * 为物料面板中的每个物料项渲染小型外观预览图。
 * 使用预设方案匹配常用组件类型，回退到显示 Lucide 图标。
 *
 * @author xiye
 * @date 2026-06-23
 */
"use client";

import { useMemo } from "react";
import type { MaterialDefinition } from "@envelope/materials";

/**
 * 内置缩略图预设渲染器
 *
 * 每个预设返回一个包含 className 和内部内容的配置对象，
 * 由 MaterialThumbnail 统一渲染为固定大小的预览方块。
 */
const PRESET_RENDERERS: Record<string, () => { className: string; inner: string }> = {
  button: () => ({
    className: "flex items-center justify-center rounded bg-primary text-primary-foreground text-[8px] font-medium w-full h-full",
    inner: "Btn",
  }),
  "button-outline": () => ({
    className: "flex items-center justify-center rounded border border-primary text-primary text-[8px] font-medium w-full h-full bg-background",
    inner: "Btn",
  }),
  input: () => ({
    className: "flex items-center rounded border border-input bg-background px-1.5 w-full h-full",
    inner: "",
  }),
  textarea: () => ({
    className: "flex items-start rounded border border-input bg-background px-1 pt-1 w-full h-full",
    inner: "",
  }),
  label: () => ({
    className: "flex items-center text-[8px] text-foreground w-full h-full",
    inner: "Label",
  }),
  card: () => ({
    className: "flex flex-col gap-0.5 rounded-lg border bg-background p-1 w-full h-full",
    inner: "",
  }),
  badge: () => ({
    className: "flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[7px] font-medium w-3/4 h-1/2 mx-auto",
    inner: "New",
  }),
  avatar: () => ({
    className: "flex items-center justify-center rounded-full bg-muted text-[8px] text-muted-foreground w-4 h-4 mx-auto mt-1",
    inner: "A",
  }),
  switch: () => ({
    className: "flex items-center pl-0.5 w-3/4 mx-auto h-full",
    inner: "",
  }),
  checkbox: () => ({
    className: "flex items-center justify-center w-3 h-3 mx-auto mt-1 rounded border border-input bg-background",
    inner: "",
  }),
  separator: () => ({
    className: "flex items-center w-full h-full",
    inner: "",
  }),
  skeleton: () => ({
    className: "flex items-center w-full h-full",
    inner: "",
  }),
  table: () => ({
    className: "flex flex-col gap-0.5 w-full h-full",
    inner: "",
  }),
  tabs: () => ({
    className: "flex flex-col gap-0.5 w-full h-full",
    inner: "",
  }),
};

export function MaterialThumbnail({ material }: { material: MaterialDefinition }) {
  const renderer = material.thumbnail?.preset
    ? PRESET_RENDERERS[material.thumbnail.preset]
    : null;

  const preview = useMemo(() => renderer?.(), [renderer]);

  // 无匹配预设时返回 null，让父组件显示 Lucide icon 回退
  if (!preview) {
    return null;
  }

  return (
    <div className="flex h-6 w-8 shrink-0 items-center justify-center overflow-hidden rounded border bg-background">
      <div className={preview.className}>
        {preview.inner}
      </div>
    </div>
  );
}
