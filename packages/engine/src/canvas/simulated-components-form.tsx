/**
 * 模拟组件渲染 — 表单与展示类组件
 *
 * 从 renderer.tsx 提取的表单/输入/展示类组件的画布模拟渲染。
 * 每个组件类型对应一个渲染函数，在画布上预览组件的外观。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";
import type { CanvasComponent } from "./types";
import { cn, pstr, pnum, pbool, parr } from "./renderer-utils";

export interface SimulatedComponentProps {
  comp: CanvasComponent;
  variant: "root" | "child";
  onSelectChild?: (nodeId: string) => void;
}

/** 模拟 Button 组件渲染 */
export function renderButton({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const size = pstr(props, "size", "default");
  const label = pstr(props, "label", "Button");
  const variantVal = pstr(props, "variant", "default");
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs";
  const variantClass: string = ({
    default: "bg-primary text-primary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border bg-background",
    secondary: "bg-secondary text-secondary-foreground",
    ghost: "",
    link: "underline text-primary",
  } as Record<string, string>)[variantVal] ?? "bg-primary text-primary-foreground";
  return (
    <button
      className={cn("inline-flex items-center justify-center rounded-md font-medium", sizeClass, variantClass)}
      tabIndex={-1}
      data-live-edit-prop="label"
    >
      {label}
    </button>
  );
}

/** 模拟 Input 组件渲染 */
export function renderInput({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  return (
    <div className="flex h-8 items-center rounded-md border bg-background px-2 text-xs text-muted-foreground">
      {pstr(props, "placeholder", "Input...")}
    </div>
  );
}

/** 模拟 Textarea 组件渲染 */
export function renderTextarea({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  return (
    <div className="flex h-full items-start rounded-md border bg-background p-2 text-xs text-muted-foreground">
      {pstr(props, "placeholder", "Enter text...")}
    </div>
  );
}

/** 模拟 Label 组件渲染 */
export function renderLabel({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  return <span className="text-xs font-medium" data-live-edit-prop="label">{pstr(props, "label", "Label")}</span>;
}

/** 模拟 Checkbox 组件渲染 */
export function renderCheckbox({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const checked = pbool(props, "defaultChecked");
  const label = pstr(props, "label", "Checkbox");
  return (
    <label className="inline-flex items-center gap-2 text-xs">
      <span className={cn("flex h-4 w-4 items-center justify-center rounded border text-[10px]", checked ? "bg-primary border-primary text-primary-foreground" : "")}>
        {checked ? "✓" : ""}
      </span>
      {label}
    </label>
  );
}

/** 模拟 RadioGroup 组件渲染 */
export function renderRadioGroup({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const options = parr<string>(props, "options", ["Option 1", "Option 2"]).filter((v) => typeof v === "string");
  const safe = options.length > 0 ? options : ["Option"];
  return (
    <div className="flex flex-col gap-1">
      {safe.slice(0, 6).map((label, idx) => (
        <label key={idx} className="inline-flex items-center gap-1.5 text-xs">
          <span className={cn("inline-block h-3 w-3 rounded-full border", idx === 0 && "border-2 border-primary")} />
          {label}
        </label>
      ))}
    </div>
  );
}

/** 模拟 Switch 组件渲染 */
export function renderSwitch({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const checked = pbool(props, "defaultChecked");
  return (
    <label className="inline-flex items-center gap-2 text-xs">
      <span className={cn("flex h-5 w-9 items-center rounded-full p-0.5 transition-colors", checked ? "bg-primary justify-end" : "bg-muted justify-start")}>
        <span className="h-4 w-4 rounded-full bg-background shadow" />
      </span>
      {pstr(props, "label", "")}
    </label>
  );
}

/** 模拟 Select 组件渲染 */
export function renderSelect({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const placeholder = pstr(props, "placeholder", "Select...");
  const options = parr<string>(props, "options", []).filter((v) => typeof v === "string");
  const selectedIndex = Math.floor(pnum(props, "selectedIndex", -1));
  const selected = selectedIndex >= 0 && selectedIndex < options.length ? options[selectedIndex] : null;
  const cascadeField = pstr(props, "cascadeField", "");
  return (
    <div className="flex h-8 items-center justify-between rounded-md border bg-background px-2 text-xs text-muted-foreground">
      <span className={cn(selected ? "text-foreground" : "")}>{selected ?? placeholder}</span>
      <div className="flex items-center gap-1">
        {cascadeField && (
          <span className="text-[8px] text-blue-400">联级: {cascadeField}</span>
        )}
        <span>▼</span>
      </div>
    </div>
  );
}

/** 模拟 Slider 组件渲染 */
export function renderSlider({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 flex-1 rounded-full bg-muted">
        <div className="absolute h-2 rounded-full bg-primary" style={{ width: `${pnum(props, "defaultValue", 50)}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground">{pnum(props, "defaultValue", 50)}</span>
    </div>
  );
}

/** 模拟 Toggle 组件渲染 */
export function renderToggle({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const active = pbool(props, "pressed");
  return (
    <div className={cn("inline-flex items-center rounded-md px-3 py-1 text-xs font-medium", active ? "bg-muted" : "")}>
      {pstr(props, "label", "Toggle")}
    </div>
  );
}

/** 模拟 ToggleGroup 组件渲染 */
export function renderToggleGroup({ comp: _comp, variant: _variant }: SimulatedComponentProps) {
  return (
    <div className="inline-flex items-center rounded-md border">
      <div className="rounded-l-md bg-muted px-2 py-1 text-[10px] font-medium">A</div>
      <div className="border-l px-2 py-1 text-[10px]">B</div>
      <div className="border-l rounded-r-md px-2 py-1 text-[10px]">C</div>
    </div>
  );
}

/** 模拟 Avatar 组件渲染 */
export function renderAvatar({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const src = pstr(props, "src", pstr(props, "image", ""));
  const initial = String(pstr(props, "label", pstr(props, "name", "?"))).charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
      {src ? (
        <img src={src} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs font-medium text-muted-foreground">{initial}</span>
      )}
    </div>
  );
}

/** 模拟 Badge 组件渲染 */
export function renderBadge({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const variantVal = pstr(props, "variant", "default");
  const variantClass: string = ({
    default: "bg-primary/15 text-primary",
    secondary: "bg-muted text-muted-foreground",
    destructive: "bg-destructive/15 text-destructive",
    outline: "border",
  } as Record<string, string>)[variantVal] ?? "bg-primary/15 text-primary";
  return (
    <span className={cn("inline-flex items-center rounded-full font-medium px-2 py-0.5 text-[10px]", variantClass)} data-live-edit-prop="text">
      {pstr(props, "text", pstr(props, "label", "Badge"))}
    </span>
  );
}

/** 模拟 Skeleton 组件渲染 */
export function renderSkeleton({ comp: _comp, variant: _variant }: SimulatedComponentProps) {
  return <div className="h-full w-full animate-pulse rounded bg-muted" />;
}

/** 模拟 Alert 组件渲染 */
export function renderAlert({ comp, variant: _variant, onSelectChild }: SimulatedComponentProps) {
  const { props, children } = comp.node;
  const variantVal = pstr(props, "variant", "default");
  const variantColor = variantVal === "destructive" ? "border-destructive/50 bg-destructive/10" : "border-primary/50 bg-primary/5";
  const showTitle = props?.showTitle !== false;
  const showDescription = props?.showDescription !== false;
  const titleText = pstr(props, "titleText", "Alert");
  const descriptionText = pstr(props, "descriptionText", "Alert description...");
  return (
    <div className={cn("flex h-full flex-col gap-1 rounded-lg border p-2", variantColor)}>
      {children && children.length > 0 ? (
        <ChildrenSlot components={children} onSelectChild={onSelectChild} />
      ) : (
        <>
          {showTitle && <span className="text-[10px] font-semibold" data-live-edit-prop="titleText">⚠ {titleText}</span>}
          {showDescription && <span className="text-[10px] text-muted-foreground" data-live-edit-prop="descriptionText">{descriptionText}</span>}
        </>
      )}
    </div>
  );
}

/** 模拟 Progress 组件渲染 */
export function renderProgress({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const value = pnum(props, "value", 0);
  return (
    <div className="h-2 w-full rounded-full bg-muted">
      <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

/** 模拟 Breadcrumb 组件渲染 */
export function renderBreadcrumb({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const items = parr<string>(props, "items", ["Home", "Page", "Current"]).filter((v) => typeof v === "string");
  const safe = items.length > 0 ? items : ["Home", "Current"];
  return (
    <div className="inline-flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
      {safe.map((it, idx) => (
        <span key={idx} className="inline-flex items-center gap-1">
          {idx > 0 && <span>/</span>}
          <span className={cn(idx === safe.length - 1 && "font-medium text-foreground")}>{it}</span>
        </span>
      ))}
    </div>
  );
}

/** 模拟 Pagination 组件渲染 */
export function renderPagination({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const pageCount = Math.max(1, Math.floor(pnum(props, "pageCount", 5)));
  const currentPage = Math.max(1, Math.min(pageCount, Math.floor(pnum(props, "currentPage", 1))));
  const showPrevNext = props?.showPrevNext !== false;
  const pages = Array.from({ length: Math.min(7, pageCount) }).map((_, i) => i + 1);
  return (
    <div className="inline-flex items-center gap-1">
      {showPrevNext && <div className="rounded border px-1.5 py-0.5 text-[10px]">‹</div>}
      {pages.map((p) => (
        <div
          key={p}
          className={cn(
            "rounded border px-1.5 py-0.5 text-[10px]",
            p === currentPage && "border-primary bg-primary text-primary-foreground",
          )}
        >
          {p}
        </div>
      ))}
      {showPrevNext && <div className="rounded border px-1.5 py-0.5 text-[10px]">›</div>}
    </div>
  );
}

/** ChildrenSlot 组件的导入（由 simulated-content.tsx 提供，此处仅声明引用） */
import { ChildrenSlot } from "./simulated-content";

/** 模拟 Text 组件渲染 */
export function renderText({ comp, variant: _variant }: SimulatedComponentProps) {
  const { props } = comp.node;
  const text = pstr(props, "text", "Text");
  const className = pstr(props, "className", "");
  return (
    <span className={cn("text-sm", className)} data-live-edit-prop="text">
      {text}
    </span>
  );
}
