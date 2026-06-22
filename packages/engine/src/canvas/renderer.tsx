/**
 * 画布渲染器
 *
 * 将画布状态渲染为可视化的网格布局，支持：
 * - 组件的可视化呈现（模拟组件外观）
 * - 拖拽平移（鼠标拖动画布空白区域）
 * - 组件选中与多选（Ctrl/Shift/Meta 键）
 * - 八向缩放手柄（拖拽组件边缘或角落调整大小）
 * - 缩放变换（Ctrl+滚轮）
 *
 * 网格使用 CSS Grid 布局，每个组件通过 gridColumn/gridRow 定位。
 * 所有坐标以网格单位计算（1 为基准），渲染时转换为 CSS 网格位置。
 *
 * @author xiye
 * @date 2026-06-14
 */

"use client";

import { forwardRef, useCallback, useRef, useState, useEffect, type CSSProperties, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent } from "react";
import { twMerge } from "tailwind-merge";
import type { CanvasComponent } from "./types";
import { calcResizeNext, snapGridDelta, type ResizeDirection } from "./resize-utils";
import type { ComponentNode } from "../schemas/page.schema";

/** 单个网格单元格的渲染高度（px），对应 CSS Grid 的隐式行高 */
const CELL_HEIGHT = 40;
/** 单个网格单元格的渲染宽度（px），对应 CSS Grid 的列宽 */
const CELL_WIDTH = 80;
/** 缩放手柄的视觉尺寸（px） */
const RESIZE_HANDLE_SIZE = 8;

/**
 * 条件类名合并工具函数
 *
 * 过滤掉假值后使用 tailwind-merge 合并类名，解决 Tailwind 类名冲突。
 *
 * @param inputs - 类名字符串或假值
 * @returns 合并后的类名字符串
 */
function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(...inputs.filter(Boolean).map(String));
}

/**
 * 安全地从组件属性中提取字符串值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @param fallback - 属性不存在或类型不匹配时的默认值
 * @returns 提取的字符串值
 */
function pstr(props: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const v = props?.[key];
  return typeof v === "string" ? v : fallback;
}

/**
 * 安全地从组件属性中提取数字值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @param fallback - 属性不存在或类型不匹配时的默认值
 * @returns 提取的数字值
 */
function pnum(props: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const v = props?.[key];
  return typeof v === "number" ? v : fallback;
}

/**
 * 安全地从组件属性中提取布尔值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @returns 属性的布尔值（通过 !! 转换）
 */
function pbool(props: Record<string, unknown> | undefined, key: string): boolean {
  return !!props?.[key];
}

function parr<T = unknown>(props: Record<string, unknown> | undefined, key: string, fallback: T[]): T[] {
  const v = props?.[key];
  return Array.isArray(v) ? (v as T[]) : fallback;
}

/**
 * 模拟组件视觉呈现
 *
 * 根据组件类型和属性渲染对应的视觉占位符，
 * 让用户在画布上预览组件外观而不执行实际逻辑。
 *
 * @param props - 组件属性
 * @param props.comp - 画布组件数据
 */
function SimulatedContent({ comp }: { comp: CanvasComponent }) {
  const { type, props } = comp.node;

  switch (type) {
    // ===== Container components =====
    case "Card":
      {
        const children = comp.node.children ?? [];
        const hasChildren = children.length > 0;
        const showHeader = props?.showHeader !== false;
        const showContent = props?.showContent !== false;
        const showFooter = !!props?.showFooter;
        const headerText = pstr(props, "headerText", "Header");
        const contentText = pstr(props, "contentText", "Content");
        const footerText = pstr(props, "footerText", "Footer");
        return (
          <div className="flex h-full flex-col rounded-lg border bg-card p-3">
            <div className="mb-1 text-xs font-semibold text-muted-foreground">{pstr(props, "label", "Card")}</div>
            <div className="flex-1">
              {hasChildren ? (
                <ChildrenSlot components={children} />
              ) : (
                <div className="space-y-1">
                  {showHeader && <div className="rounded border bg-muted/30 p-1 text-[10px] font-medium">{headerText}</div>}
                  {showContent && <div className="rounded border bg-background p-1 text-[10px] text-muted-foreground">{contentText}</div>}
                  {showFooter && <div className="rounded border bg-muted/10 p-1 text-[10px]">{footerText}</div>}
                </div>
              )}
            </div>
          </div>
        );
      }
    case "CardHeader":
      return <div className="flex items-center gap-2 p-2 text-xs font-medium">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
    case "CardContent":
      return <div className="flex-1 p-2 text-xs text-muted-foreground">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
    case "CardFooter":
      return <div className="flex items-center justify-end gap-2 border-t p-2">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;

    case "DialogContent":
    case "SheetContent":
    case "AlertDialogContent":
      return (
        <div className="flex h-full flex-col rounded-lg border-2 border-primary/30 bg-background p-3 shadow-lg">
          <div className="mb-1 text-xs font-semibold">{pstr(props, "label", type.replace("Content", ""))}</div>
          <div className="flex-1 text-xs text-muted-foreground">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );

    case "Tabs":
      return (
        <div className="flex h-full flex-col">
          {comp.node.children && comp.node.children.length > 0 ? (
            <div className="flex-1 p-2">
              <ChildrenSlot components={comp.node.children} />
            </div>
          ) : (
            (() => {
              const showList = props?.showList !== false;
              const showContent = props?.showContent !== false;
              const tabs = parr<{ label?: string; content?: string }>(props, "tabs", [
                { label: "Tab 1", content: "Tab content..." },
                { label: "Tab 2", content: "Tab content..." },
                { label: "Tab 3", content: "Tab content..." },
              ]);
              const activeIndex = Math.max(0, Math.min(tabs.length - 1, Math.floor(pnum(props, "activeIndex", 0))));
              return (
                <>
                  {showList && (
                    <div className="flex gap-1 border-b pb-1">
                      {tabs.slice(0, 6).map((t, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "rounded px-2 py-0.5 text-[10px]",
                            idx === activeIndex ? "bg-muted font-medium" : "text-muted-foreground",
                          )}
                        >
                          {typeof t?.label === "string" ? t.label : `Tab ${idx + 1}`}
                        </div>
                      ))}
                    </div>
                  )}
                  {showContent && (
                    <div className="flex-1 p-2 text-[10px] text-muted-foreground">
                      {typeof tabs[activeIndex]?.content === "string" ? tabs[activeIndex].content : "Tab content..."}
                    </div>
                  )}
                </>
              );
            })()
          )}
        </div>
      );
    case "TabsContent":
      return <div className="p-1 text-xs">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;

    case "Accordion":
      return (
        <div className="flex h-full flex-col gap-0.5">
          {comp.node.children && comp.node.children.length > 0 ? (
            <div className="p-1">
              <ChildrenSlot components={comp.node.children} />
            </div>
          ) : (
            (() => {
              const items = parr<{ title?: string; content?: string }>(props, "items", [
                { title: "Section 1", content: "Accordion content..." },
              ]);
              return (
                <>
                  {items.map((it, idx) => (
                    <div key={idx} className="rounded border">
                      <div className="flex items-center justify-between bg-muted/50 px-2 py-1 text-[10px] font-medium">
                        <span>{typeof it?.title === "string" ? it.title : `Section ${idx + 1}`}</span><span>▼</span>
                      </div>
                      <div className="px-2 py-1 text-[10px] text-muted-foreground">
                        {typeof it?.content === "string" ? it.content : "Accordion content..."}
                      </div>
                    </div>
                  ))}
                </>
              );
            })()
          )}
        </div>
      );

    case "Table":
      return (
        <div className="flex h-full flex-col text-[10px]">
          {comp.node.children && comp.node.children.length > 0 ? (
            <ChildrenSlot components={comp.node.children} />
          ) : (
            (() => {
              const showHeader = props?.showHeader !== false;
              const columns = parr<string>(props, "columns", ["Col 1", "Col 2", "Col 3"]).filter((c) => typeof c === "string");
              const safeCols = columns.length > 0 ? columns : ["Col 1"];
              const rowCount = Math.max(0, Math.floor(pnum(props, "rowCount", 2)));
              return (
                <>
                  {showHeader && (
                    <div className="flex border-b bg-muted/50 font-medium">
                      {safeCols.map((c, i) => (
                        <div key={i} className={cn("flex-1 px-1 py-0.5", i > 0 && "border-l")}>{c}</div>
                      ))}
                    </div>
                  )}
                  {Array.from({ length: rowCount }).map((_, r) => (
                    <div key={r} className="flex border-b">
                      {safeCols.map((_, i) => (
                        <div key={i} className={cn("flex-1 px-1 py-0.5 text-muted-foreground", i > 0 && "border-l")}>...</div>
                      ))}
                    </div>
                  ))}
                </>
              );
            })()
          )}
        </div>
      );

    // ===== Form components =====
    case "Button": {
      const variant = pstr(props, "variant", "default");
      const size = pstr(props, "size", "default");
      const label = pstr(props, "label", "Button");
      const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs";
      const variantClass: string = ({
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "",
        link: "underline text-primary",
      } as Record<string, string>)[variant] ?? "bg-primary text-primary-foreground";
      return (
        <button
          className={cn("inline-flex items-center justify-center rounded-md font-medium", sizeClass, variantClass)}
          tabIndex={-1}
        >
          {label}
        </button>
      );
    }

    case "Input":
      return (
        <div className="flex h-8 items-center rounded-md border bg-background px-2 text-xs text-muted-foreground">
          {pstr(props, "placeholder", "Input...")}
        </div>
      );

    case "Textarea":
      return (
        <div className="flex h-full items-start rounded-md border bg-background p-2 text-xs text-muted-foreground">
          {pstr(props, "placeholder", "Enter text...")}
        </div>
      );

    case "Label":
      return <span className="text-xs font-medium">{pstr(props, "label", "Label")}</span>;

    case "Checkbox": {
      const checked = pbool(props, "defaultChecked");
      const label = pstr(props, "label", "Checkbox");
      return (
        <label className="inline-flex items-center gap-2 text-xs">
          <span className={cn("flex h-4 w-4 items-center justify-center rounded border", checked ? "bg-primary border-primary text-primary-foreground" : "")}>
            {checked ? "✓" : ""}
          </span>
          {label}
        </label>
      );
    }

    case "RadioGroup": {
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

    case "Switch": {
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

    case "Select": {
      const placeholder = pstr(props, "placeholder", "Select...");
      const options = parr<string>(props, "options", []).filter((v) => typeof v === "string");
      const selectedIndex = Math.floor(pnum(props, "selectedIndex", -1));
      const selected = selectedIndex >= 0 && selectedIndex < options.length ? options[selectedIndex] : null;
      return (
        <div className="flex h-8 items-center justify-between rounded-md border bg-background px-2 text-xs text-muted-foreground">
          <span className={cn(selected ? "text-foreground" : "")}>{selected ?? placeholder}</span>
          <span>▼</span>
        </div>
      );
    }

    case "Slider":
      return (
        <div className="flex items-center gap-2">
          <div className="relative h-2 flex-1 rounded-full bg-muted">
            <div className="absolute h-2 rounded-full bg-primary" style={{ width: `${pnum(props, "defaultValue", 50)}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground">{pnum(props, "defaultValue", 50)}</span>
        </div>
      );

    case "Toggle": {
      const active = pbool(props, "pressed");
      return (
        <div className={cn("inline-flex items-center rounded-md px-3 py-1 text-xs font-medium", active ? "bg-muted" : "")}>
          {pstr(props, "label", "Toggle")}
        </div>
      );
    }

    case "ToggleGroup":
      return (
        <div className="inline-flex items-center rounded-md border">
          <div className="rounded-l-md bg-muted px-2 py-1 text-[10px] font-medium">A</div>
          <div className="border-l px-2 py-1 text-[10px]">B</div>
          <div className="border-l rounded-r-md px-2 py-1 text-[10px]">C</div>
        </div>
      );

    // ===== Display components =====
    case "Avatar": {
      const initial = String(pstr(props, "label", pstr(props, "name", "?"))).charAt(0).toUpperCase();
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <span className="text-xs font-medium text-muted-foreground">{initial}</span>
        </div>
      );
    }

    case "Badge": {
      const variant = pstr(props, "variant", "default");
      const variantClass: string = ({
        default: "bg-primary/15 text-primary",
        secondary: "bg-muted text-muted-foreground",
        destructive: "bg-destructive/15 text-destructive",
        outline: "border",
      } as Record<string, string>)[variant] ?? "bg-primary/15 text-primary";
      return (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", variantClass)}>
          {pstr(props, "label", "Badge")}
        </span>
      );
    }

    // ===== Feedback components =====
    case "Skeleton": {
      const className = pstr(props, "className", "h-4 w-full");
      return <div className={cn("animate-pulse rounded bg-muted", className)} />;
    }

    case "Alert": {
      const variant = pstr(props, "variant", "default");
      const variantColor = variant === "destructive" ? "border-destructive/50 bg-destructive/10" : "border-primary/50 bg-primary/5";
      const showTitle = props?.showTitle !== false;
      const showDescription = props?.showDescription !== false;
      const titleText = pstr(props, "titleText", "Alert");
      const descriptionText = pstr(props, "descriptionText", "Alert description...");
      return (
        <div className={cn("flex h-full flex-col gap-1 rounded-lg border p-2", variantColor)}>
          {comp.node.children && comp.node.children.length > 0 ? (
            <ChildrenSlot components={comp.node.children} />
          ) : (
            <>
              {showTitle && <span className="text-[10px] font-semibold">⚠ {titleText}</span>}
              {showDescription && <span className="text-[10px] text-muted-foreground">{descriptionText}</span>}
            </>
          )}
        </div>
      );
    }

    case "Progress": {
      const value = pnum(props, "value", 0);
      return (
        <div className="h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
        </div>
      );
    }

    // ===== Navigation components =====
    case "Breadcrumb": {
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
    case "Pagination": {
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

    // ===== Layout components =====
    case "Separator":
      return <hr className="border-muted" />;
    case "ScrollArea":
      return (
        <div className="flex h-full items-center justify-center overflow-hidden rounded border text-[10px] text-muted-foreground">
          {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : "Scroll Area"}
        </div>
      );

    case "AspectRatio":
      return (
        <div className="flex h-full w-full items-center justify-center rounded border-2 border-dashed bg-muted/30 text-[10px] text-muted-foreground">
          {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : `${pnum(props, "ratio", 1)}:1`}
        </div>
      );

    case "ResizablePanelGroup": {
      if (comp.node.children && comp.node.children.length > 0) {
        return <ChildrenSlot components={comp.node.children} />;
      }
      const direction = pstr(props, "direction", "horizontal");
      const showPanel1 = props?.showPanel1 !== false;
      const showHandle = props?.showHandle !== false;
      const showPanel2 = props?.showPanel2 !== false;
      const panel1Text = pstr(props, "panel1Text", "Panel 1");
      const panel2Text = pstr(props, "panel2Text", "Panel 2");
      const isVertical = direction === "vertical";
      return (
        <div className={cn("flex h-full", isVertical ? "flex-col" : "")}>
          {showPanel1 && <div className={cn("flex-1 p-1 text-[10px]", !isVertical && showHandle && "border-r-2", isVertical && showHandle && "border-b-2")}>{panel1Text}</div>}
          {showHandle && <div className={cn(isVertical ? "h-1.5 w-full cursor-row-resize" : "h-full w-1.5 cursor-col-resize", "bg-muted")} />}
          {showPanel2 && <div className="flex-1 p-1 text-[10px]">{panel2Text}</div>}
        </div>
      );
    }

    // ===== Overlay components =====
    case "Dialog": {
      const showTrigger = props?.showTrigger !== false;
      const showHeader = props?.showHeader !== false;
      const showDescription = props?.showDescription !== false;
      const showFooter = props?.showFooter !== false;
      const triggerText = pstr(props, "triggerText", "Open");
      const titleText = pstr(props, "titleText", "Dialog title");
      const descriptionText = pstr(props, "descriptionText", "Dialog description...");
      const primaryActionText = pstr(props, "primaryActionText", "Confirm");
      const secondaryActionText = pstr(props, "secondaryActionText", "Cancel");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          <div className="flex-1 rounded-lg border-2 border-primary/30 bg-background p-2 shadow-sm">
            {showHeader && <div className="text-xs font-semibold">{titleText}</div>}
            {showDescription && <div className="mt-0.5 text-[10px] text-muted-foreground">{descriptionText}</div>}
            {showFooter && (
              <div className="mt-2 flex items-center justify-end gap-1">
                <button className="rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{secondaryActionText}</button>
                <button className="rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground" tabIndex={-1}>{primaryActionText}</button>
              </div>
            )}
          </div>
        </div>
      );
    }

    case "AlertDialog": {
      const showTrigger = props?.showTrigger !== false;
      const showHeader = props?.showHeader !== false;
      const showDescription = props?.showDescription !== false;
      const showActions = props?.showActions !== false;
      const showCancel = props?.showCancel !== false;
      const triggerText = pstr(props, "triggerText", "Open");
      const titleText = pstr(props, "titleText", "Are you absolutely sure?");
      const descriptionText = pstr(props, "descriptionText", "This action cannot be undone.");
      const actionText = pstr(props, "actionText", "Continue");
      const cancelText = pstr(props, "cancelText", "Cancel");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          <div className="flex-1 rounded-lg border-2 border-destructive/30 bg-background p-2 shadow-sm">
            {showHeader && <div className="text-xs font-semibold">{titleText}</div>}
            {showDescription && <div className="mt-0.5 text-[10px] text-muted-foreground">{descriptionText}</div>}
            {showActions && (
              <div className="mt-2 flex items-center justify-end gap-1">
                {showCancel && <button className="rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{cancelText}</button>}
                <button className="rounded bg-destructive px-2 py-0.5 text-[10px] text-destructive-foreground" tabIndex={-1}>{actionText}</button>
              </div>
            )}
          </div>
        </div>
      );
    }

    case "Sheet": {
      const showTrigger = props?.showTrigger !== false;
      const showHeader = props?.showHeader !== false;
      const showContent = props?.showContent !== false;
      const triggerText = pstr(props, "triggerText", "Open");
      const titleText = pstr(props, "titleText", "Sheet");
      const descriptionText = pstr(props, "descriptionText", "Sheet description...");
      const bodyText = pstr(props, "bodyText", "Sheet content...");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          <div className="flex-1 rounded-lg border-2 border-primary/30 bg-background p-2 shadow-sm">
            {showHeader && (
              <>
                <div className="text-xs font-semibold">{titleText}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{descriptionText}</div>
              </>
            )}
            {showContent && <div className="mt-2 rounded border bg-muted/10 p-2 text-[10px] text-muted-foreground">{bodyText}</div>}
          </div>
        </div>
      );
    }

    case "Popover": {
      const showTrigger = props?.showTrigger !== false;
      const showContent = props?.showContent !== false;
      const triggerText = pstr(props, "triggerText", "Open");
      const contentText = pstr(props, "contentText", "Popover content...");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          {showContent && <div className="flex-1 rounded-lg border bg-background p-2 text-[10px] text-muted-foreground shadow-sm">{contentText}</div>}
        </div>
      );
    }

    case "Tooltip": {
      const showTrigger = props?.showTrigger !== false;
      const showContent = props?.showContent !== false;
      const triggerText = pstr(props, "triggerText", "Hover me");
      const contentText = pstr(props, "contentText", "Tooltip content...");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          {showContent && <div className="w-fit rounded bg-foreground px-2 py-1 text-[10px] text-background">{contentText}</div>}
        </div>
      );
    }

    case "HoverCard": {
      const showTrigger = props?.showTrigger !== false;
      const showContent = props?.showContent !== false;
      const triggerText = pstr(props, "triggerText", "Hover me");
      const contentText = pstr(props, "contentText", "Hover card content...");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          {showContent && <div className="flex-1 rounded-lg border bg-background p-2 text-[10px] text-muted-foreground shadow-sm">{contentText}</div>}
        </div>
      );
    }

    case "Drawer": {
      const showTrigger = props?.showTrigger !== false;
      const showHeader = props?.showHeader !== false;
      const showContent = props?.showContent !== false;
      const triggerText = pstr(props, "triggerText", "Open");
      const titleText = pstr(props, "titleText", "Drawer");
      const contentText = pstr(props, "contentText", "Drawer content...");
      return (
        <div className="flex h-full flex-col gap-2">
          {showTrigger && <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>{triggerText}</button>}
          <div className="flex-1 rounded-lg border bg-background p-2 shadow-sm">
            {showHeader && <div className="text-xs font-semibold">{titleText}</div>}
            {showContent && <div className="mt-2 text-[10px] text-muted-foreground">{contentText}</div>}
          </div>
        </div>
      );
    }

    case "DropdownMenu":
    case "ContextMenu":
      return (
        <div className="flex h-full flex-col gap-2">
          {(props?.showTrigger !== false) && (
            <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>
              {pstr(props, "triggerText", type === "ContextMenu" ? "Right click" : "Open")}
            </button>
          )}
          {(props?.showContent !== false) && (
            <div className="rounded border bg-background p-1 shadow">
              {(() => {
                const items = parr<string>(props, "items", ["Item 1", "Item 2", "Item 3"]).filter((v) => typeof v === "string");
                const safe = items.length > 0 ? items : ["Item 1"];
                return safe.slice(0, 6).map((it, idx) => (
                  <div key={idx} className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">{it}</div>
                ));
              })()}
            </div>
          )}
        </div>
      );

    case "Collapsible":
      return (
        <div className="flex h-full flex-col">
          {(props?.showTrigger !== false) && (
            <div className="flex items-center gap-1 text-[10px] font-medium">▶ {pstr(props, "triggerText", pstr(props, "label", "Toggle"))}</div>
          )}
          <div className="flex-1 p-1">
            {comp.node.children && comp.node.children.length > 0 ? (
              <ChildrenSlot components={comp.node.children} />
            ) : (
              (props?.showContent !== false) && (
                <div className="rounded border bg-muted/10 p-1 text-[10px] text-muted-foreground">
                  {pstr(props, "contentText", "Collapsible content...")}
                </div>
              )
            )}
          </div>
        </div>
      );

    // ===== Default fallback =====
    default:
      return (
        <div className="flex h-full items-center justify-center rounded bg-muted/30 text-[10px] font-medium text-muted-foreground">
          {type}
        </div>
      );
  }
}

/**
 * 渲染嵌套子组件列表
 *
 * 用于容器组件（Card、Tabs 等）内部的子组件渲染。
 * 当 children 为空或不存在时返回 null。
 *
 * @param props - 组件属性
 * @param props.components - 子组件节点数组
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function ChildrenSlot({ components }: { components: ComponentNode[] }) {
  if (!components || components.length === 0) return null;
  return (
    <div className="space-y-1">
      {components.map((child) => (
        <SimulatedChildContent key={child.id} node={child} />
      ))}
    </div>
  );
}

/**
 * 渲染单个子组件的简化视觉表示
 *
 * 相比 SimulatedContent，子组件使用更紧凑的样式（更小的字体、无边框等），
 * 适合在容器内部展示。
 *
 * @param props - 组件属性
 * @param props.type - 组件类型名称
 * @param props.props - 组件属性对象（可选）
 */
function SimulatedChildContent({ node }: { node: ComponentNode }) {
  const { type, props } = node;
  const children = node.children ?? [];
  const childText = (() => {
    const first = children[0];
    if (!first) return "";
    if (first.type !== "Text") return "";
    const t = (first.props as Record<string, unknown> | undefined)?.text;
    return typeof t === "string" ? t : "";
  })();

  switch (type) {
    case "Button":
      return (
        <button className="inline-flex items-center rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground" tabIndex={-1}>
          {(props?.label as string) || (props?.text as string) || "Btn"}
        </button>
      );
    case "Input":
      return <div className="h-6 rounded border bg-background px-1 text-[10px] leading-6 text-muted-foreground">{(props?.placeholder as string) || "Input"}</div>;
    case "Label":
      return <span className="text-[10px] font-medium">{(props?.label as string) || "Label"}</span>;
    case "Badge":
      return <span className="inline-flex rounded-full bg-primary/15 px-1.5 py-0 text-[10px] font-medium text-primary">{(props?.label as string) || "Badge"}</span>;
    case "Avatar":
      return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px]">?</span>;
    case "Separator":
      return <hr className="border-muted" />;
    case "Skeleton":
      return <div className="h-3 animate-pulse rounded bg-muted" />;
    case "Alert":
      return <div className="rounded border border-primary/50 px-1 py-0.5 text-[10px]">⚠ Alert</div>;
    case "Progress":
      return <div className="h-1.5 w-20 rounded-full bg-muted"><div className="h-1.5 w-1/2 rounded-full bg-primary" /></div>;
    case "Checkbox":
      return <label className="inline-flex items-center gap-1 text-[10px]"><span className="flex h-3 w-3 items-center justify-center rounded border">✓</span>{(props?.label as string) || ""}</label>;
    case "Switch":
      return <span className="inline-flex h-4 w-7 items-center rounded-full bg-primary p-0.5"><span className="h-3 w-3 rounded-full bg-background" /></span>;
    case "CardHeader":
      return (
        <div className="rounded-t border-b bg-muted/30 p-1 text-[10px] font-medium">
          {childText || "Header"}
          {children.length > 0 ? <div className="mt-1 font-normal"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "CardContent":
      return (
        <div className="p-1 text-[10px] text-muted-foreground">
          {childText || "Content"}
          {children.length > 0 ? <div className="mt-1"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "CardFooter":
      return (
        <div className="rounded-b border-t bg-muted/10 p-1 text-[10px]">
          {childText || "Footer"}
          {children.length > 0 ? <div className="mt-1"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "TabsList":
      return (
        <div className="inline-flex gap-0.5 rounded bg-muted p-0.5 text-[10px]">
          {children.length > 0 ? (
            children.slice(0, 6).map((c) => (
              <span key={c.id} className="rounded bg-background px-1">
                {((c.children?.[0]?.props as Record<string, unknown> | undefined)?.text as string) || "Tab"}
              </span>
            ))
          ) : (
            <span className="rounded bg-background px-1">Tab</span>
          )}
        </div>
      );
    case "TabsTrigger":
      return <span className="inline-flex rounded px-1 py-0.5 text-[10px] font-medium">{childText || "Tab"}</span>;
    case "BreadcrumbItem":
      return <span className="text-[10px] text-muted-foreground">{childText || "/ Page"}</span>;
    case "BreadcrumbLink":
      return <span className="text-[10px] text-primary underline">{childText || "Link"}</span>;
    case "DropdownMenuItem":
      return <div className="rounded px-1 py-0.5 text-[10px] hover:bg-muted">Action</div>;
    case "TableHeader":
      return (
        <div className="rounded border bg-muted/20 p-1 text-[10px] font-medium">
          <div>TableHeader</div>
          {children.length > 0 ? <div className="mt-1 font-normal"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "TableBody":
      return (
        <div className="rounded border bg-background p-1 text-[10px]">
          <div className="font-medium">TableBody</div>
          {children.length > 0 ? <div className="mt-1"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "TableRow":
      return (
        <div className="rounded border bg-background/50 p-1 text-[10px]">
          <div className="font-medium">TableRow</div>
          {children.length > 0 ? <div className="mt-1"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "Text":
      return <span className="text-[10px] text-foreground">{(props?.text as string) || ""}</span>;
    default:
      return (
        <div className="rounded bg-muted/30 px-1 py-0.5 text-[10px] text-muted-foreground">
          <span className="font-medium">{type}</span>
          {childText ? <span className="ml-1 text-muted-foreground">· {childText}</span> : null}
          {children.length > 0 && type !== "Text" ? (
            <div className="mt-1">
              <ChildrenSlot components={children} />
            </div>
          ) : null}
        </div>
      );
  }
}

// ===== 缩放手柄 =====

/**
 * 各方向缩放手柄的定位样式
 *
 * 手柄定位在组件的边缘或角落外侧 50% 处，
 * 使用负 margin 使手柄视觉居中于边缘线上。
 */
const resizeHandleStyles: Record<ResizeDirection, CSSProperties> = {
  n: { top: -RESIZE_HANDLE_SIZE / 2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "n-resize" },
  s: { bottom: -RESIZE_HANDLE_SIZE / 2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "s-resize" },
  e: { right: -RESIZE_HANDLE_SIZE / 2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "e-resize" },
  w: { left: -RESIZE_HANDLE_SIZE / 2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "w-resize" },
  ne: { top: -RESIZE_HANDLE_SIZE / 2, right: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "ne-resize" },
  nw: { top: -RESIZE_HANDLE_SIZE / 2, left: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "nw-resize" },
  se: { bottom: -RESIZE_HANDLE_SIZE / 2, right: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "se-resize" },
  sw: { bottom: -RESIZE_HANDLE_SIZE / 2, left: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "sw-resize" },
};

/** 所有缩放手柄方向的数组，用于遍历渲染 */
const allResizeDirections: ResizeDirection[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

// ===== 主画布渲染器 =====

/**
 * CanvasRenderer 组件的 Props
 *
 * 接收画布状态（组件列表、选中、缩放、平移等）和回调函数，
 * 不直接依赖 Zustand Store，由父组件桥接。
 */
interface CanvasRendererProps {
  /** 画布上的所有组件 */
  components: CanvasComponent[];
  /** 当前选中的组件 ID 列表 */
  selectedIds: string[];
  /** 选中组件回调（id: 组件ID, multi: 是否多选模式） */
  onSelect: (id: string, multi?: boolean) => void;
  /** 清除所有选中状态回调 */
  onClearSelection: () => void;
  /** 调整组件尺寸回调（width, height: 列/行跨度；x, y 可选用于 w/n 把手） */
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  /** 当前缩放比例 */
  zoom: number;
  /** 当前视口的画布宽度（px） */
  viewportWidth: number;
  /** 当前水平平移偏移量（px） */
  panX: number;
  /** 当前垂直平移偏移量（px） */
  panY: number;
  /** 平移回调（dx, dy: 新的绝对平移位置） */
  onPan: (dx: number, dy: number) => void;
  /** 网格列数 */
  gridCols: number;
  /** 网格间距（px） */
  gridGap: number;
  pageBackground?: string;
  pagePadding?: number;
}

/**
 * 画布渲染器组件
 *
 * 将画布状态渲染为可交互的网格编辑器。
 * 使用 forwardRef 将内部画布 div 的引用暴露给父组件（用于滚轮缩放等）。
 *
 * 交互行为：
 * - 点击空白区域：清除选中
 * - 点击组件：选中（Ctrl/Shift/Meta + 点击 = 多选）
 * - 拖拽空白区域：平移画布（鼠标左键）
 * - 拖拽缩放手柄：调整组件尺寸
 *
 * @param ref - 转发给内部画布 div 的 ref，用于父组件绑定事件
 */
export const CanvasRenderer = forwardRef<HTMLDivElement, CanvasRendererProps>(
  function CanvasRenderer({
    components, selectedIds, onSelect, onClearSelection, onResize,
    zoom, viewportWidth, panX, panY, onPan, gridCols, gridGap,
    pageBackground, pagePadding,
  }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef({ x: 0, y: 0 });
    /** 当前正在进行的缩放交互清理函数（用于组件卸载/下一次缩放前强制收尾） */
    const activeResizeCleanupRef = useRef<(() => void) | null>(null);

    // 存储 onPan 的最新引用以避免 useCallback 依赖变化
    const onPanRef = useRef(onPan);
    onPanRef.current = onPan;

    const handleMouseDown = useCallback((e: RMouseEvent) => {
      if (e.button !== 0) return;
      if (!(e.target instanceof HTMLElement)) return;

      // 关键：只有点在“非组件区域”的空白处才允许开始平移；组件区域交由选中/缩放等交互处理
      if (e.target.closest('[data-canvas-comp="true"]')) return;

      // 允许两种空白区开始平移：
      // 1) 外层容器的空白（e.target === e.currentTarget）
      // 2) 画布内部的空白（目标在 data-canvas-bg 容器内，但不在组件内）
      const inCanvas = !!e.target.closest('[data-canvas-bg="true"]');
      const isBlankArea = e.target === e.currentTarget || inCanvas;
      if (!isBlankArea) return;

      setIsPanning(true);
      panStart.current = { x: e.clientX - panX, y: e.clientY - panY };
    }, [panX, panY]);

    /**
     * 平移过程的 mousemove 处理函数（绑定到 window）
     *
     * 关键点：
     * - 使用 window 监听，避免光标移出容器后丢失 mousemove 导致“拖拽断开/卡住”
     * - 不依赖 React 合成事件体系，确保在全局范围内稳定收到事件
     *
     * @param e - 原生 MouseEvent
     */
    const handlePanMouseMove = useCallback((e: MouseEvent) => {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      onPanRef.current(dx, dy);
    }, []);

    const handleMouseUp = useCallback(() => {
      setIsPanning(false);
    }, []);

    useEffect(() => {
      if (!isPanning) return;
      window.addEventListener("mousemove", handlePanMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handlePanMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isPanning, handleMouseUp, handlePanMouseMove]);

    useEffect(() => {
      return () => {
        activeResizeCleanupRef.current?.();
        activeResizeCleanupRef.current = null;
      };
    }, []);

    return (
      <div
        ref={containerRef}
        data-testid="canvas-container"
        className="relative flex-1 overflow-hidden bg-muted/30"
        style={{ cursor: isPanning ? "grabbing" : "default" }}
        onMouseDown={handleMouseDown}
      >
        <div
          ref={ref}
          data-canvas-bg="true"
          className="absolute top-4 rounded-lg border bg-background shadow-sm transition-shadow"
          style={{
            left: `${panX + 16}px`,
            top: `${panY + 16}px`,
            width: `${viewportWidth}px`,
            minHeight: "600px",
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            backgroundColor: pageBackground,
          }}
          onClick={(e) => {
            // 关键：点击空白区清选不应依赖 “target 恰好等于背景容器”，因为空白区的 target 可能是内部网格容器
            if (!(e.target instanceof HTMLElement)) return;
            if (e.target.closest('[data-canvas-comp="true"]')) return;
            onClearSelection();
          }}
        >
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)`,
              backgroundSize: `${CELL_WIDTH}px ${CELL_HEIGHT}px`,
            }}
          />

          {/* 组件网格 */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: `${gridGap}px`,
              padding: typeof pagePadding === "number" ? `${pagePadding}px` : undefined,
            }}
          >
            {components.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p className="text-sm font-medium">Drop components here</p>
                <p className="mt-1 text-xs">Drag from the component panel on the left</p>
              </div>
            )}

            {components.map((comp) => {
              const { x: rawX, y: rawY, width: rawW, height: rawH } = comp.position;
              if (rawX < 1 || rawY < 1 || rawW < 1 || rawH < 1) return null;

              const x = Math.max(1, Math.min(gridCols, rawX));
              const y = Math.max(1, rawY);
              const width = Math.max(1, Math.min(gridCols - x + 1, rawW));
              const height = Math.max(1, rawH);
              const isSelected = selectedIds.includes(comp.id);

              return (
                <div
                  key={comp.id}
                  data-canvas-comp="true"
                  data-canvas-comp-id={comp.id}
                  data-testid={`canvas-comp-${comp.id}`}
                  className={cn(
                    "group relative rounded-md border-2 transition-all",
                    isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent hover:border-blue-300",
                  )}
                  style={{
                    gridColumn: `${x} / span ${width}`,
                    gridRow: `${y} / span ${height}`,
                    minHeight: `${height * CELL_HEIGHT}px`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
                  }}
                >
                  <SimulatedContent comp={comp} />

                  {/* 选中标记 */}
                  {isSelected && (
                    <div className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow">
                      ✓
                    </div>
                  )}

                  {/* 缩放手柄 */}
                  {isSelected && allResizeDirections.map((dir) => (
                    <div
                      key={dir}
                      data-canvas-resize-handle={dir}
                      data-testid={`canvas-resize-handle-${comp.id}-${dir}`}
                      className="absolute z-10 rounded-full border border-blue-500 bg-white hover:bg-blue-100"
                      style={{ ...resizeHandleStyles[dir], touchAction: "none" }}
                      onPointerDown={(e: RPointerEvent<HTMLDivElement>) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // 同一时间只允许一个缩放会话，开始新的缩放前先把旧监听/捕获全部清理掉
                        activeResizeCleanupRef.current?.();

                        const el = e.currentTarget;
                        const pointerId = e.pointerId;
                        const startClientX = e.clientX;
                        const startClientY = e.clientY;

                        const startState = { x, y, width, height, gridCols };
                        let lastSent = { x, y, width, height };

                        const syncResize = (ev: PointerEvent) => {
                          if (ev.pointerId !== pointerId) return;

                          const rawDx = (ev.clientX - startClientX) / (CELL_WIDTH * zoom);
                          const rawDy = (ev.clientY - startClientY) / (CELL_HEIGHT * zoom);
                          // 关键：对齐到整数网格并做边界钳制，避免缩放在临界值附近抖动/越界
                          const deltaCols = snapGridDelta(rawDx);
                          const deltaRows = snapGridDelta(rawDy);

                          const next = calcResizeNext(dir, startState, deltaCols, deltaRows);

                          if (
                            next.x === lastSent.x
                            && next.y === lastSent.y
                            && next.width === lastSent.width
                            && next.height === lastSent.height
                          ) {
                            return;
                          }

                          lastSent = next;
                          onResize(comp.id, next.width, next.height, next.x, next.y);
                        };

                        const cleanup = () => {
                          try {
                            el.releasePointerCapture(pointerId);
                          } catch { }
                          el.removeEventListener("pointermove", syncResize);
                          el.removeEventListener("pointerup", cleanup);
                          el.removeEventListener("pointercancel", cleanup);
                          el.removeEventListener("lostpointercapture", cleanup);
                          window.removeEventListener("pointermove", syncResize);
                          window.removeEventListener("pointerup", cleanup);
                          window.removeEventListener("pointercancel", cleanup);
                          activeResizeCleanupRef.current = null;
                        };

                        // 使用 PointerEvent + pointer capture：即使指针移出手柄/组件，也能持续收到 move/up 事件
                        el.addEventListener("pointermove", syncResize);
                        el.addEventListener("pointerup", cleanup);
                        el.addEventListener("pointercancel", cleanup);
                        el.addEventListener("lostpointercapture", cleanup);
                        // 关键：某些浏览器/边界情况下 setPointerCapture 可能抛异常，这里做兜底避免直接中断交互
                        let captured = false;
                        try {
                          el.setPointerCapture(pointerId);
                          captured = el.hasPointerCapture(pointerId);
                        } catch {
                          captured = false;
                        }
                        // 若无法 capture，则退化为 window 级监听，保证 resize 不会因为指针移出而中断
                        if (!captured) {
                          window.addEventListener("pointermove", syncResize);
                          window.addEventListener("pointerup", cleanup);
                          window.addEventListener("pointercancel", cleanup);
                        }
                        activeResizeCleanupRef.current = cleanup;
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
