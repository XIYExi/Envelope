/**
 * 模拟组件渲染 — 覆盖层类组件
 *
 * 从 simulated-components-layout.tsx 提取的 Dialog / Sheet / AlertDialog / Popover /
 * Tooltip / HoverCard / Drawer / DropdownMenu / ContextMenu / Collapsible 的画布模拟渲染。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";
import type { SimulatedLayoutProps } from "./simulated-components-layout";
import { cn, pstr, pnum, parr } from "./renderer-utils";
import { ChildrenSlot } from "./simulated-content";

/** 模拟 DialogContent / SheetContent / AlertDialogContent 组件渲染 */
export function renderDialogSheetContent({ comp, variant }: SimulatedLayoutProps) {
  const { type, props } = comp.node;
  const isCompact = variant === "child";
  return (
    <div className={cn("flex h-full flex-col rounded-lg border-2 border-primary/30 bg-background shadow-lg", isCompact ? "p-1" : "p-3")}>
      <div className={cn("font-semibold", isCompact ? "mb-0.5 text-[10px]" : "mb-1 text-xs")}>{pstr(props, "label", type.replace("Content", ""))}</div>
      <div className={cn("flex-1 text-muted-foreground", isCompact ? "text-[10px]" : "text-xs")}>{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
    </div>
  );
}

/** 模拟 Dialog 组件渲染 */
export function renderDialog({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 AlertDialog 组件渲染 */
export function renderAlertDialog({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 Sheet 组件渲染 */
export function renderSheet({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 Popover 组件渲染 */
export function renderPopover({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 Tooltip 组件渲染 */
export function renderTooltip({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 HoverCard 组件渲染 */
export function renderHoverCard({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 Drawer 组件渲染 */
export function renderDrawer({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 DropdownMenu / ContextMenu 组件渲染 */
export function renderMenu({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { type, props } = comp.node;
  const items = parr<string>(props, "items", ["Item 1", "Item 2", "Item 3"]).filter((v) => typeof v === "string");
  const safe = items.length > 0 ? items : ["Item 1"];
  return (
    <div className="flex h-full flex-col gap-2">
      {(props?.showTrigger !== false) && (
        <button className="inline-flex w-fit items-center rounded border bg-background px-2 py-0.5 text-[10px]" tabIndex={-1}>
          {pstr(props, "triggerText", type === "ContextMenu" ? "Right click" : "Open")}
        </button>
      )}
      {(props?.showContent !== false) && (
        <div className="rounded border bg-background p-1 shadow">
          {safe.slice(0, 6).map((it, idx) => (
            <div key={idx} className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">{it}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/** 模拟 Collapsible 组件渲染 */
export function renderCollapsible({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props, children } = comp.node;
  return (
    <div className="flex h-full flex-col">
      {(props?.showTrigger !== false) && (
        <div className="flex items-center gap-1 text-[10px] font-medium">▶ {pstr(props, "triggerText", pstr(props, "label", "Toggle"))}</div>
      )}
      <div className="flex-1 p-1">
        {children && children.length > 0 ? (
          <ChildrenSlot components={children} />
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
}

/** 默认兜底渲染（未知组件类型或紧凑模式子组件） */
export function renderFallback({ comp, variant, onSelectChild }: SimulatedLayoutProps) {
  const { type } = comp.node;
  const isCompact = variant === "child";
  if (isCompact) {
    const children = comp.node.children ?? [];
    const firstChild = children[0];
    const childText = firstChild?.type === "Text" ? (firstChild.props as Record<string, unknown> | undefined)?.text : "";
    return (
      <div className="rounded bg-muted/30 px-1 py-0.5 text-[10px] text-muted-foreground">
        <span className="font-medium">{type}</span>
        {typeof childText === "string" && childText ? <span className="ml-1 text-muted-foreground">· {childText}</span> : null}
        {children.length > 0 && type !== "Text" ? (
          <div className="mt-1">
            <ChildrenSlot components={children} onSelectChild={onSelectChild} />
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center rounded bg-muted/30 text-[10px] font-medium text-muted-foreground">
      {type}
    </div>
  );
}
