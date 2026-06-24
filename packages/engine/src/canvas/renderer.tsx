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

import React, { forwardRef, useCallback, useMemo, useRef, useState, useEffect, type CSSProperties, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { twMerge } from "tailwind-merge";
import type { CanvasComponent } from "./types";
import { calcResizeNext, snapGridDelta, type ResizeDirection } from "./resize-utils";
import { createComponentDragItem } from "./dnd";
import type { ComponentNode } from "../schemas/page.schema";

import { useCtrlDown } from "./ctrl-context";
import { Minimap } from "./minimap";
import { HorizontalRuler, VerticalRuler } from "./ruler";
import { CANVAS_CELL_HEIGHT as CELL_HEIGHT, CANVAS_CELL_WIDTH as CELL_WIDTH, isContainerType } from "../shared/canvas-utils";

/** 缩放手柄的视觉尺寸（px） */
const RESIZE_HANDLE_SIZE = 12;

/** 标尺的宽/高（px） */
const RULER_SIZE = 20;

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
 * 解析画布预览用的 Tailwind 类名
 *
 * 约定：
 * - 真实来源为 ComponentNode.tailwindClasses
 * - 为兼容旧数据，若 tailwindClasses 为空则回退读取 props.className
 * - 渲染时仍然会与 CanvasRenderer 自身的交互样式（选中态边框等）做 twMerge 合并
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function getPreviewTailwindClasses(node: ComponentNode): string {
  const canonical = typeof node.tailwindClasses === "string" ? node.tailwindClasses : "";
  const legacy = typeof node.props?.["className"] === "string" ? String(node.props["className"]) : "";
  return cn(canonical, legacy);
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
/**
 * 子节点选中回调上下文
 *
 * 用于在 SimulatedContent → ChildrenSlot → SimulatedChildContent 之间传递
 * 嵌套子组件点击选中回调，避免逐层透传 props 修改大量调用点。
 */
const SelectChildContext = React.createContext<((nodeId: string) => void) | null>(null);

function SimulatedContent({ comp, onSelectChild }: { comp: CanvasComponent; onSelectChild?: (nodeId: string) => void }) {
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
      /**
       * Avatar 在画布编辑态使用 simulated 渲染：
       * - 若 props.src / props.image 存在，则直接回显图片；
       * - 否则回退为首字母（避免空白占位）。
       *
       * 备注：之所以同时兼容 src/image，是为了兼容历史 schema 与物料字段命名差异。
       */
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
      return <div className="h-full w-full animate-pulse rounded bg-muted" />;
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
    case "Box":
      return (
        <div className="flex h-full min-h-[60px] items-center justify-center rounded border-2 border-dashed border-muted-foreground/30 bg-muted/10 text-[10px] text-muted-foreground">
          {comp.node.children && comp.node.children.length > 0 ? (
            <div className="w-full p-2"><ChildrenSlot components={comp.node.children} /></div>
          ) : (
            <span>Box (empty div)</span>
          )}
        </div>
      );
    case "Flex":
      return (
        <div className={cn(
          "flex h-full min-h-[60px] gap-2 rounded border-2 border-dashed border-muted-foreground/30 bg-muted/10 p-2",
          pstr(props, "direction", "row") === "column" ? "flex-col" : "flex-row",
          (props?.wrap === true || pstr(props, "wrap", "") === "wrap") ? "flex-wrap" : "",
          pstr(props, "justify", "start") === "center" ? "justify-center" : pstr(props, "justify", "start") === "end" ? "justify-end" : pstr(props, "justify", "start") === "between" ? "justify-between" : "justify-start",
          pstr(props, "align", "start") === "center" ? "items-center" : pstr(props, "align", "start") === "end" ? "items-end" : pstr(props, "align", "start") === "stretch" ? "items-stretch" : "items-start",
        )}>
          {comp.node.children && comp.node.children.length > 0 ? (
            <ChildrenSlot components={comp.node.children} />
          ) : (
            <span className="mx-auto self-center text-[10px] text-muted-foreground">Flex Container</span>
          )}
        </div>
      );
    case "Container":
      return (
        <div className="flex h-full min-h-[60px] flex-col rounded border-2 border-dashed border-muted-foreground/20 bg-background">
          <div className="border-b border-dashed px-2 py-1 text-[9px] font-medium text-muted-foreground/60">Container</div>
          <div className="flex-1" style={{ maxWidth: pnum(props, "maxWidth", 1200) > 0 ? `${pnum(props, "maxWidth", 1200)}px` : undefined, margin: "0 auto", width: "100%" }}>
            {comp.node.children && comp.node.children.length > 0 ? (
              <div className="p-2"><ChildrenSlot components={comp.node.children} /></div>
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-[10px] text-muted-foreground">
                Centered Container ({pstr(props, "maxWidthText", "1200px")})
              </div>
            )}
          </div>
        </div>
      );
    case "Grid":
      return (
        <div className={cn(
          "h-full min-h-[60px] rounded border-2 border-dashed border-muted-foreground/30 bg-muted/10 p-2",
        )}>
          <div className="mb-1 text-[9px] font-medium text-muted-foreground/60">
            Grid ({pstr(props, "columns", "3")} cols)
          </div>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${pnum(props, "columns", 3)}, 1fr)` }}
          >
            {comp.node.children && comp.node.children.length > 0 ? (
              <div className="col-span-full"><ChildrenSlot components={comp.node.children} /></div>
            ) : (
              Array.from({ length: pnum(props, "columns", 3) }).map((_, i) => (
                <div key={i} className="flex h-10 items-center justify-center rounded bg-muted/20 text-[9px] text-muted-foreground">
                  {i + 1}
                </div>
              ))
            )}
          </div>
        </div>
      );

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
function ChildrenSlot({ components, onSelectChild: explicitOnSelectChild }: { components: ComponentNode[]; onSelectChild?: (nodeId: string) => void }) {
  const contextOnSelectChild = React.useContext(SelectChildContext);
  const resolvedOnSelectChild = explicitOnSelectChild ?? contextOnSelectChild;

  if (!components || components.length === 0) return null;
  return (
    <div className="space-y-1">
      {components.map((child) => (
        <SimulatedChildContent key={child.id} node={child} onSelectChild={resolvedOnSelectChild ?? undefined} />
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
function SimulatedChildContent({ node, onSelectChild }: { node: ComponentNode; onSelectChild?: (nodeId: string) => void }) {
  const { type, props } = node;
  const children = node.children ?? [];
  const childText = (() => {
    const first = children[0];
    if (!first) return "";
    if (first.type !== "Text") return "";
    const t = (first.props as Record<string, unknown> | undefined)?.text;
    return typeof t === "string" ? t : "";
  })();

  const handleChildClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectChild?.(node.id);
  }, [node.id, onSelectChild]);

  const inner = (() => {
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
      return (() => {
        const src = pstr(props, "src", pstr(props, "image", ""));
        return (
          <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-muted text-[10px]">
            {src ? <img src={src} alt="Avatar" className="h-full w-full object-cover" /> : "?"}
          </span>
        );
      })();
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
    case "Box":
      return (
        <div className="rounded border-2 border-dashed border-muted-foreground/20 bg-muted/5 p-1 text-[10px] text-muted-foreground">
          {children.length > 0 ? <ChildrenSlot components={children} /> : "Box"}
        </div>
      );
    case "Flex":
      return (
        <div className="flex items-center gap-1 rounded border-2 border-dashed border-muted-foreground/20 bg-muted/5 p-1 text-[10px] text-muted-foreground">
          {children.length > 0 ? <ChildrenSlot components={children} /> : "Flex"}
        </div>
      );
    case "Container":
      return (
        <div className="rounded border-2 border-dashed border-muted-foreground/20 bg-muted/5 p-1 text-[10px] text-muted-foreground">
          {children.length > 0 ? <ChildrenSlot components={children} /> : "Container"}
        </div>
      );
    case "Grid":
      return (
        <div className="rounded border-2 border-dashed border-muted-foreground/20 bg-muted/5 p-1 text-[10px] text-muted-foreground">
          {children.length > 0 ? <ChildrenSlot components={children} /> : "Grid"}
        </div>
      );
    case "AlertTitle":
      return <span className="text-[10px] font-semibold">{(props?.text as string) || "Alert Title"}</span>;
    case "AlertDescription":
      return <span className="text-[10px] text-muted-foreground">{(props?.text as string) || "Alert description"}</span>;
    case "DialogTitle":
      return <span className="text-[10px] font-semibold">{(props?.text as string) || "Dialog Title"}</span>;
    case "DialogDescription":
      return <span className="text-[10px] text-muted-foreground">{(props?.text as string) || "Dialog description"}</span>;
    case "DialogHeader":
    case "SheetHeader":
    case "AlertDialogHeader":
    case "DrawerHeader":
      return (
        <div className="rounded bg-muted/20 p-1 text-[10px] font-medium">
          {childText || type}
          {children.length > 0 ? <div className="mt-1 font-normal"><ChildrenSlot components={children} /></div> : null}
        </div>
      );
    case "DialogFooter":
    case "AlertDialogFooter":
      return (
        <div className="flex items-center justify-end gap-1 rounded bg-muted/10 p-1 text-[10px]">
          {children.length > 0 ? <ChildrenSlot components={children} /> : type}
        </div>
      );
    case "SheetTitle":
    case "SheetDescription":
      return <span className="text-[10px]">{childText || type}</span>;
    case "DialogTrigger":
    case "SheetTrigger":
    case "AlertDialogTrigger":
    case "DrawerTrigger":
    case "PopoverTrigger":
    case "TooltipTrigger":
    case "HoverCardTrigger":
    case "DropdownMenuTrigger":
    case "ContextMenuTrigger":
    case "CollapsibleTrigger":
      return (
        <div className="rounded border bg-muted/10 p-1 text-[10px] text-muted-foreground">
          {children.length > 0 ? <ChildrenSlot components={children} /> : type}
        </div>
      );
    case "DialogContent":
    case "SheetContent":
    case "AlertDialogContent":
    case "DrawerContent":
    case "PopoverContent":
    case "HoverCardContent":
    case "DropdownMenuContent":
    case "ContextMenuContent":
    case "CollapsibleContent":
      return (
        <div className="rounded border bg-muted/5 p-1 text-[10px] text-muted-foreground">
          {children.length > 0 ? <ChildrenSlot components={children} /> : type}
        </div>
      );
    case "AccordionItem":
      return (
        <div className="rounded border bg-muted/10 p-1 text-[10px]">
          {children.length > 0 ? <ChildrenSlot components={children} /> : "AccordionItem"}
        </div>
      );
    case "AccordionTrigger":
      return <div className="text-[10px] font-medium">{childText || "Section"}</div>;
    case "AccordionContent":
      return <div className="text-[10px] text-muted-foreground pl-1">{children.length > 0 ? <ChildrenSlot components={children} /> : (childText || "Content")}</div>;
    case "TableHead":
      return <span className="text-[10px] font-medium">{childText || "Head"}</span>;
    case "TableCell":
      return <span className="text-[10px]">{childText || "Cell"}</span>;
    case "BreadcrumbItem":
      return <span className="text-[10px] text-muted-foreground">{childText || "/ Page"}</span>;
    case "BreadcrumbLink":
      return <span className="text-[10px] text-primary underline">{childText || "Link"}</span>;
    case "PaginationItem":
      return <span className="text-[10px]">{childText || "1"}</span>;
    case "ResizableHandle":
      return <div className="mx-0.5 h-full w-0.5 bg-muted" />;
    case "SelectItem":
    case "RadioGroupItem":
    case "DropdownMenuItem":
    case "ContextMenuItem":
      return <div className="rounded px-1 py-0.5 text-[10px] hover:bg-muted">{childText || type}</div>;
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
  })();

  return (
    <div data-child-node-id={node.id} onClick={handleChildClick} className="cursor-pointer">
      {inner}
    </div>
  );
}

// ===== 画布组件项（包装 useDraggable / useDroppable） =====

/**
 * 单个画布组件的渲染包装器
 *
 * 为每个组件绑定 useDraggable（可拖拽）和 useDroppable（容器可接收拖入），
 * 同时保留原有选中、缩放手柄等功能。
 */
const CanvasComponentItem = React.memo(function CanvasComponentItem({
  comp, x, y, width, height, isSelected, isHovered, previewTailwind,
  gridCols, zoom, onSelect, onHover, onResize, activeResizeCleanupRef,
  isPrimary, onSelectChild, onDoubleClick, isDimmed, minRowHeight,
}: {
  comp: CanvasComponent;
  x: number; y: number; width: number; height: number;
  isSelected: boolean; isHovered: boolean; previewTailwind: string;
  gridCols: number; zoom: number;
  onSelect: (id: string, multi?: boolean) => void;
  onHover: (id: string | null) => void;
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  activeResizeCleanupRef: React.MutableRefObject<(() => void) | null>;
  isPrimary?: boolean;
  onSelectChild?: (nodeId: string) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  isDimmed?: boolean;
  minRowHeight?: number;
}) {
  const isLocked = comp.locked === true;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `canvas-comp:${comp.id}`,
    data: createComponentDragItem(comp.id),
    disabled: isLocked,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `canvas-container:${comp.id}`,
    data: { parentId: comp.id, type: comp.node.type },
    disabled: !isContainerType(comp.node.type),
  });

  const ctrlDown = useCtrlDown();

  const mergedRef = useCallback((node: HTMLDivElement | null) => {
    setNodeRef(node);
    setDropRef(node);
  }, [setNodeRef, setDropRef]);

  const handleMouseEnter = useCallback(() => { onHover(comp.id); }, [comp.id, onHover]);
  const handleMouseLeave = useCallback(() => { onHover(null); }, [onHover]);

  const handleClick = useCallback((e: RMouseEvent) => {
    e.stopPropagation();
    onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
  }, [comp.id, onSelect]);

  return (
    <div
      ref={mergedRef}
      data-canvas-comp="true"
      data-canvas-comp-id={comp.id}
      data-testid={`canvas-comp-${comp.id}`}
      className={cn(
        previewTailwind,
        "group relative rounded-md border transition-all duration-100",
        isSelected && isPrimary
          ? "border-blue-500 ring-2 ring-blue-200 shadow-md z-20"
          : isSelected && !isPrimary
            ? "border-blue-300 border-dashed ring-1 ring-blue-100/50 z-20"
            : isHovered
              ? "border-blue-400 ring-1 ring-blue-100 shadow-sm z-10"
              : "border-transparent",
        isDragging && "opacity-50",
        isOver && "ring-2 ring-blue-400/50",
        isDimmed && "opacity-30 pointer-events-none",
      )}
      style={{
        gridColumn: `${x} / span ${width}`,
        gridRow: `${y} / span ${height}`,
        minHeight: (minRowHeight ?? CELL_HEIGHT) > 0 ? `${height * (minRowHeight ?? CELL_HEIGHT)}px` : undefined,
      } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      {...listeners}
      {...attributes}
    >
      {isContainerType(comp.node.type) && (
        <div className={cn(
          "absolute left-1 top-1 z-30 rounded px-1.5 py-0.5 text-[9px] font-medium text-white",
          isSelected ? "bg-blue-500" : isHovered ? "bg-blue-400/80" : "bg-blue-500/80",
        )}>
          {comp.node.type}
        </div>
      )}

      {/* 内容区：Ctrl 按下时 pointer-events 穿透（让组件原声事件响应），否则由上层捕获点击用于选中 */}
      <div
        className="h-full w-full"
        style={{ pointerEvents: ctrlDown ? "auto" : "none" } as CSSProperties}
        data-ctrl-gate="true"
      >
        <SelectChildContext.Provider value={onSelectChild ?? null}>
          <SimulatedContent comp={comp} />
        </SelectChildContext.Provider>
      </div>

      {/* 选中标记 */}
      {isSelected && (
        <div className="absolute -right-1.5 -top-1.5 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow transition-transform duration-150 scale-100">
          ✓
        </div>
      )}

      {/* 缩放手柄（锁定状态下不显示） */}
      {isSelected && !isLocked && allResizeDirections.map((dir) => (
        <div
          key={dir}
          data-canvas-resize-handle={dir}
          data-testid={`canvas-resize-handle-${comp.id}-${dir}`}
          className="absolute z-10 rounded-full border border-blue-500 bg-white hover:bg-blue-100"
          style={{ ...resizeHandleStyles[dir], touchAction: "none" }}
          onPointerDown={(e: RPointerEvent<HTMLDivElement>) => {
            e.stopPropagation();
            e.preventDefault();
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
              } catch {
                // ignore release error
              }
              el.removeEventListener("pointermove", syncResize);
              el.removeEventListener("pointerup", cleanup);
              el.removeEventListener("pointercancel", cleanup);
              el.removeEventListener("lostpointercapture", cleanup);
              window.removeEventListener("pointermove", syncResize);
              window.removeEventListener("pointerup", cleanup);
              window.removeEventListener("pointercancel", cleanup);
              activeResizeCleanupRef.current = null;
            };

            el.addEventListener("pointermove", syncResize);
            el.addEventListener("pointerup", cleanup);
            el.addEventListener("pointercancel", cleanup);
            el.addEventListener("lostpointercapture", cleanup);
            let captured = false;
            try {
              el.setPointerCapture(pointerId);
              captured = el.hasPointerCapture(pointerId);
            } catch {
              captured = false;
            }
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
});

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

// ===== 多选包围盒覆盖层 =====

/**
 * 多选包围盒覆盖层组件
 *
 * 当选中多个组件时，渲染一个包围所有选中组件的最小外接矩形，
 * 帮助用户直观了解当前多选的范围。
 *
 * @param props.components - 被选中的组件列表（CanvasComponent[]）
 * @param props.columnWidth - 每列的像素宽度
 * @param props.gridGap - 网格间距（px）
 * @param props.gridCols - 网格列数
 */
function BoundingBoxOverlay({ components, columnWidth, gridGap, gridCols }: {
  components: CanvasComponent[];
  columnWidth: number;
  gridGap: number;
  gridCols: number;
}) {
  if (components.length < 2) return null;

  const cellW = columnWidth + gridGap;
  const cellH = CELL_HEIGHT + gridGap;

  const minX = Math.min(...components.map((c) => c.position.x));
  const minY = Math.min(...components.map((c) => c.position.y));
  const maxRight = Math.max(...components.map((c) => c.position.x + c.position.width));
  const maxBottom = Math.max(...components.map((c) => c.position.y + c.position.height));

  const leftPx = (minX - 1) * cellW;
  const topPx = (minY - 1) * cellH;
  const widthPx = (maxRight - minX) * cellW - gridGap;
  const heightPx = (maxBottom - minY) * cellH - gridGap;

  return (
    <div
      className="pointer-events-none absolute border-2 border-dashed border-blue-400 bg-blue-100/20"
      style={{
        left: `${leftPx}px`,
        top: `${topPx}px`,
        width: `${widthPx}px`,
        height: `${heightPx}px`,
      }}
    />
  );
}

// ===== 面包屑导航栏（子编辑模式） =====

/**
 * 子组件编辑模式下的面包屑导航栏
 *
 * 显示当前编辑路径，点击可逐级退出回到对应层级。
 */
function BreadcrumbBar({ editScope, onNavigate }: {
  editScope: { rootId: string; path: { id: string; type: string }[] };
  onNavigate: (index: number) => void;
}) {
  const crumbs = editScope.path;
  return (
    <div className="flex items-center gap-1 border-b bg-muted/30 px-3 py-1 text-[10px]">
      <span className="text-muted-foreground">Edit:</span>
      <button className="rounded px-1.5 py-0.5 font-medium text-blue-600 hover:bg-blue-50" onClick={() => onNavigate(-1)}>Root</button>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.id}>
          <span className="text-muted-foreground">/</span>
          <button
            className="rounded px-1.5 py-0.5 text-blue-600 hover:bg-blue-50"
            onClick={() => onNavigate(idx)}
          >
            {crumb.type}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

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
  /** 当前"主选中"的节点 ID */
  activeNodeId?: string | null;
  /** 子组件编辑模式作用域（为空时表示正常模式） */
  editScope?: { rootId: string; path: { id: string; type: string }[] } | null;
  /** 当前 hover 的组件 ID（鼠标移入时高亮） */
  hoveredId: string | null;
  /** 选中组件回调（id: 组件ID, multi: 是否多选模式） */
  onSelect: (id: string, multi?: boolean) => void;
  /** 清除所有选中状态回调 */
  onClearSelection: () => void;
  /** 选中嵌套子节点回调（用于点击 children 中的子组件） */
  onSelectChild?: (nodeId: string) => void;
  /** 双击组件回调（容器组件双击进入子编辑模式） */
  onDoubleClickComponent?: (compId: string) => void;
  /** 退出子组件编辑模式回调 */
  onExitChildEdit?: () => void;
  /** 调整组件尺寸回调（width, height: 列/行跨度；x, y 可选用于 w/n 把手） */
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  /** Hover 状态回调 */
  onHover: (id: string | null) => void;
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
  pageMaxWidth?: number | null;
  /** 组件最小行高（px），设为 0 时自适应由内容撑开 */
  minRowHeight?: number;
}

// ===== 框选覆盖层 =====

/**
 * 框选矩形覆盖层组件
 *
 * 在画布空白区拖拽时显示蓝色半透明矩形，表示框选范围。
 */
function MarqueeOverlay({ marquee }: { marquee: { startX: number; startY: number; currentX: number; currentY: number } }) {
  const left = Math.min(marquee.startX, marquee.currentX);
  const top = Math.min(marquee.startY, marquee.currentY);
  const width = Math.abs(marquee.currentX - marquee.startX);
  const height = Math.abs(marquee.currentY - marquee.startY);

  if (width < 1 && height < 1) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 border-2 border-blue-400 bg-blue-100/30"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
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
    components, selectedIds, activeNodeId: activeNodeIdProp, editScope, hoveredId, onSelect, onClearSelection, onSelectChild, onDoubleClickComponent, onExitChildEdit, onResize, onHover,
    zoom, viewportWidth, panX, panY, onPan, gridCols, gridGap,
    pageBackground, pagePadding, pageMaxWidth, minRowHeight,
  }, ref) {
    const activeNodeId = activeNodeIdProp ?? null;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef({ x: 0, y: 0 });
    /** 当前正在进行的缩放交互清理函数（用于组件卸载/下一次缩放前强制收尾） */
    const activeResizeCleanupRef = useRef<(() => void) | null>(null);
    /** 框选状态 */
    const [marquee, setMarquee] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
    const marqueeStartRef = useRef<{ x: number; y: number; clientX: number; clientY: number } | null>(null);
    const marqueeRef = useRef<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

    // 存储 onPan 的最新引用以避免 useCallback 依赖变化
    const onPanRef = useRef(onPan);
    onPanRef.current = onPan;

    const componentsRef = useRef(components);
    componentsRef.current = components;
    const onSelectRef = useRef(onSelect);
    onSelectRef.current = onSelect;
    const onClearSelectionRef = useRef(onClearSelection);
    onClearSelectionRef.current = onClearSelection;

    const columnWidth = useMemo(() => {
      const maxW = typeof pageMaxWidth === "number" && pageMaxWidth > 0 ? pageMaxWidth : viewportWidth;
      const effectiveWidth = Math.min(viewportWidth, maxW);
      const padding = typeof pagePadding === "number" ? pagePadding : 0;
      const contentWidth = effectiveWidth - 2 * padding;
      const gap = gridGap ?? 0;
      return Math.max(1, (contentWidth - (gridCols - 1) * gap) / gridCols);
    }, [viewportWidth, pageMaxWidth, pagePadding, gridCols, gridGap]);

    const handleMouseDown = useCallback((e: RMouseEvent) => {
      if (e.button !== 0) return;
      if (!(e.target instanceof HTMLElement)) return;

      // 关键：只有点在"非组件区域"的空白处才允许开始框选；组件区域交由选中/缩放等交互处理
      if (e.target.closest('[data-canvas-comp="true"]')) return;

      // 允许两种空白区开始框选：
      // 1) 外层容器的空白（e.target === e.currentTarget）
      // 2) 画布内部的空白（目标在 data-canvas-bg 容器内，但不在组件内）
      const inCanvas = !!e.target.closest('[data-canvas-bg="true"]');
      const isBlankArea = e.target === e.currentTarget || inCanvas;
      if (!isBlankArea) return;

      const canvasEl = containerRef.current?.querySelector('[data-canvas-bg="true"]') as HTMLElement | null;
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        marqueeStartRef.current = { x, y, clientX: e.clientX, clientY: e.clientY };
        setMarquee({ startX: x, startY: y, currentX: x, currentY: y });
      }
    }, [zoom]);

    /** 框选鼠标移动处理 */
    const handleMarqueeMove = useCallback((e: MouseEvent) => {
      if (!marqueeStartRef.current) return;
      const start = marqueeStartRef.current;
      const canvasEl = containerRef.current?.querySelector('[data-canvas-bg="true"]') as HTMLElement | null;
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / zoom;
      const cy = (e.clientY - rect.top) / zoom;
      const nextMarquee = { startX: start.x, startY: start.y, currentX: cx, currentY: cy };
      marqueeRef.current = nextMarquee;
      setMarquee(nextMarquee);
    }, [zoom]);

    /** 框选完成处理 */
    const handleMarqueeUp = useCallback((e: MouseEvent) => {
      const start = marqueeStartRef.current;
      marqueeStartRef.current = null;
      setMarquee(null);

      if (!start) return;

      // 距离 < 5px 判定为单击，清除选中
      const dist = Math.hypot(e.clientX - start.clientX, e.clientY - start.clientY);
      if (dist < 5) {
        onClearSelectionRef.current();
        return;
      }

      // 计算框选矩形（像素坐标）
      const endX = marqueeRef.current?.currentX ?? start.x;
      const endY = marqueeRef.current?.currentY ?? start.y;
      const left = Math.min(start.x, endX);
      const top = Math.min(start.y, endY);
      const right = Math.max(start.x, endX);
      const bottom = Math.max(start.y, endY);

      // 将像素坐标转换为网格单位
      const columnWidth = columnWidthRef.current;
      const gap = gridGapRef.current;
      const cellW = columnWidth + gap;
      const cellH = CELL_HEIGHT + gap;

      const gridLeft = Math.max(1, Math.floor(left / cellW) + 1);
      const gridRight = Math.max(1, Math.ceil(right / cellW));
      const gridTop = Math.max(1, Math.floor(top / cellH) + 1);
      const gridBottom = Math.max(1, Math.ceil(bottom / cellH));

      // 碰撞检测：组件的网格矩形与框选矩形有交集
      const hitIds: string[] = [];
      for (const comp of componentsRef.current) {
        if (comp.hidden) continue;
        const cx = comp.position.x;
        const cy = comp.position.y;
        const cw = cx + comp.position.width - 1;
        const ch = cy + comp.position.height - 1;
        const overlap = cx <= gridRight && cw >= gridLeft && cy <= gridBottom && ch >= gridTop;
        if (overlap) hitIds.push(comp.id);
      }

      if (hitIds.length > 0) {
        // 框选到的第一个组件设为主选中
        const first = hitIds[0]!;
        onSelectRef.current(first, false);
        for (let i = 1; i < hitIds.length; i++) {
          onSelectRef.current(hitIds[i]!, true);
        }
      } else {
        onClearSelectionRef.current();
      }
    }, [zoom]);

    const columnWidthRef = useRef(columnWidth);
    columnWidthRef.current = columnWidth;
    const gridGapRef = useRef(gridGap);
    gridGapRef.current = gridGap;

    useEffect(() => {
      if (!marquee) return;
      window.addEventListener("mousemove", handleMarqueeMove);
      window.addEventListener("mouseup", handleMarqueeUp);
      return () => {
        window.removeEventListener("mousemove", handleMarqueeMove);
        window.removeEventListener("mouseup", handleMarqueeUp);
      };
    }, [marquee, handleMarqueeUp, handleMarqueeMove]);

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
          {/* 子编辑模式面包屑 */}
          {editScope && (
            <BreadcrumbBar
              editScope={editScope}
              onNavigate={(idx) => {
                if (idx === -1) onExitChildEdit?.();
              }}
            />
          )}
          {/* 框选覆盖层 */}
          {marquee && <MarqueeOverlay marquee={marquee} />}
          {/* 标尺 + 组件网格区域 */}
          <div className="flex">
            <VerticalRuler
              width={RULER_SIZE}
              height={600}
              zoom={zoom}
              panY={panY}
            />
            <div className="flex-1 min-w-0">
              <HorizontalRuler
                width={viewportWidth}
                height={RULER_SIZE}
                zoom={zoom}
                panX={panX}
              />
              {/* 组件网格 */}
              <div
                data-testid="canvas-grid"
                className="relative grid"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gap: `${gridGap}px`,
                  padding: typeof pagePadding === "number" ? `${pagePadding}px` : undefined,
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: typeof pageMaxWidth === "number" && pageMaxWidth > 0 ? `${pageMaxWidth}px` : undefined,
                  backgroundImage: `linear-gradient(rgba(128,128,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.12) 1px, transparent 1px)`,
                  backgroundSize: `${columnWidth}px ${CELL_HEIGHT}px`,
                }}
              >
                {components.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/10">
                      <span className="text-2xl text-muted-foreground/40">+</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">拖拽组件到此处</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">从左侧组件面板拖拽组件到画布上</p>
                  </div>
                )}
                {components.length > 0 && components.every((c) => c.hidden) && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-sm font-medium text-muted-foreground">所有组件已隐藏</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">在工具栏中取消隐藏以显示组件</p>
                  </div>
                )}

                {/* 多选包围盒（仅当选中两个及以上组件时显示） */}
                {components.filter((c) => !c.hidden && selectedIds.includes(c.id)).length > 1 && (
                  <BoundingBoxOverlay
                    components={components.filter((c) => !c.hidden && selectedIds.includes(c.id))}
                    columnWidth={columnWidth}
                    gridGap={gridGap}
                    gridCols={gridCols}
                  />
                )}

                {components.filter((c) => !c.hidden).map((comp) => {
                  const { x: rawX, y: rawY, width: rawW, height: rawH } = comp.position;
                  if (rawX < 1 || rawY < 1 || rawW < 1 || rawH < 1) return null;

                  const x = Math.max(1, Math.min(gridCols, rawX));
                  const y = Math.max(1, rawY);
                  const width = Math.max(1, Math.min(gridCols - x + 1, rawW));
                  const height = Math.max(1, rawH);
                  const isSelected = selectedIds.includes(comp.id);
                  const isPrimary = activeNodeId
                    ? activeNodeId === comp.id
                    : selectedIds.length > 0 && selectedIds[0] === comp.id;
                  const isDimmed = editScope != null && comp.id !== editScope.rootId;
                  const previewTailwind = getPreviewTailwindClasses(comp.node);

                  const isHovered = hoveredId === comp.id;

                  return (
                    <CanvasComponentItem
                      key={comp.id}
                      comp={comp}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      isSelected={isSelected}
                      isPrimary={isPrimary}
                      isDimmed={isDimmed}
                      isHovered={isHovered}
                      previewTailwind={previewTailwind}
                      gridCols={gridCols}
                      zoom={zoom}
                      onSelect={onSelect}
                      onSelectChild={onSelectChild}
                      onDoubleClick={isContainerType(comp.node.type) ? () => onDoubleClickComponent?.(comp.id) : undefined}
                      onHover={onHover}
                      onResize={onResize}
                      activeResizeCleanupRef={activeResizeCleanupRef}
                      minRowHeight={minRowHeight}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* 小地图：仅在存在组件时显示 */}
        {components.length > 0 && (
          <Minimap
            components={components}
            zoom={zoom}
            panX={panX}
            panY={panY}
            viewportWidth={viewportWidth}
            viewportHeight={600}
            columnWidth={columnWidth}
            gridCols={gridCols}
            gridGap={gridGap}
            cellHeight={CELL_HEIGHT}
            onPan={onPan}
            onZoom={(z) => {}}
          />
        )}
      </div>
    );
  },
);
