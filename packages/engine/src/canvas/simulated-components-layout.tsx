/**
 * 模拟组件渲染 — 布局与容器类组件
 *
 * 从 renderer.tsx 提取的容器/布局类组件的画布模拟渲染。
 * 覆盖层类组件已拆分至 simulated-components-overlay.tsx。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";
import type { CSSProperties } from "react";
import type { CanvasComponent } from "./types";
import type { ComponentNode } from "../schemas/page.schema";
import { cn, pstr, pnum, parr } from "./renderer-utils";
import { ChildrenSlot } from "./simulated-content";

export interface SimulatedLayoutProps {
  comp: CanvasComponent;
  variant: "root" | "child";
  onSelectChild?: (nodeId: string) => void;
}

/** 模拟 Card 组件渲染 */
export function renderCard({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
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

/** 模拟 CardHeader 组件渲染 */
export function renderCardHeader({ comp, variant: _variant }: SimulatedLayoutProps) {
  return <div className="flex items-center gap-2 p-2 text-xs font-medium">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
}

/** 模拟 CardContent 组件渲染 */
export function renderCardContent({ comp, variant: _variant }: SimulatedLayoutProps) {
  return <div className="flex-1 p-2 text-xs text-muted-foreground">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
}

/** 模拟 CardFooter 组件渲染 */
export function renderCardFooter({ comp, variant: _variant }: SimulatedLayoutProps) {
  return <div className="flex items-center justify-end gap-2 border-t p-2">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
}

/** 模拟 Tabs 组件渲染 */
export function renderTabs({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props, children } = comp.node;
  return (
    <div className="flex h-full flex-col">
      {children && children.length > 0 ? (
        <div className="flex-1 p-2">
          <ChildrenSlot components={children} />
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
}

/** 模拟 TabsContent 组件渲染 */
export function renderTabsContent({ comp, variant: _variant }: SimulatedLayoutProps) {
  return <div className="p-1 text-xs">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
}

/** 模拟 Accordion 组件渲染 */
export function renderAccordion({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props, children } = comp.node;
  return (
    <div className="flex h-full flex-col gap-0.5">
      {children && children.length > 0 ? (
        <div className="p-1">
          <ChildrenSlot components={children} />
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
}

/** 模拟 Table 组件渲染 */
export function renderTable({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props, children } = comp.node;
  return (
    <div className="flex h-full flex-col text-[10px]">
      {children && children.length > 0 ? (
        <ChildrenSlot components={children} />
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
}

/** 模拟 Box 组件渲染 */
export function renderBox({ comp, variant: _variant }: SimulatedLayoutProps) {
  return (
    <div className="flex h-full min-h-[60px] items-center justify-center rounded border-2 border-dashed border-muted-foreground/30 bg-muted/10 text-[10px] text-muted-foreground">
      {comp.node.children && comp.node.children.length > 0 ? (
        <div className="w-full p-2"><ChildrenSlot components={comp.node.children} /></div>
      ) : (
        <span>Box (empty div)</span>
      )}
    </div>
  );
}

/** 模拟 Flex 组件渲染 */
export function renderFlex({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
  const gap = pnum(props, "gap", 4);
  return (
    <div className={cn(
      "flex h-full min-h-[60px] rounded border-2 border-dashed border-muted-foreground/30 bg-muted/10 p-2",
      pstr(props, "direction", "row") === "column" ? "flex-col" : "flex-row",
      (props?.wrap === true || pstr(props, "wrap", "") === "wrap") ? "flex-wrap" : "",
      pstr(props, "justify", "start") === "center" ? "justify-center" : pstr(props, "justify", "start") === "end" ? "justify-end" : pstr(props, "justify", "start") === "between" ? "justify-between" : pstr(props, "justify", "start") === "around" ? "justify-around" : pstr(props, "justify", "start") === "evenly" ? "justify-evenly" : "justify-start",
      pstr(props, "align", "start") === "center" ? "items-center" : pstr(props, "align", "start") === "end" ? "items-end" : pstr(props, "align", "start") === "stretch" ? "items-stretch" : pstr(props, "align", "start") === "baseline" ? "items-baseline" : "items-start",
    )} style={{ gap: `${gap * 4}px` } as CSSProperties}>
      {comp.node.children && comp.node.children.length > 0 ? (
        <ChildrenSlot components={comp.node.children} />
      ) : (
        <span className="mx-auto self-center text-[10px] text-muted-foreground">Flex Container</span>
      )}
    </div>
  );
}

/** 模拟 Container 组件渲染 */
export function renderContainer({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
  const paddingX = pnum(props, "paddingX", 16);
  const paddingY = pnum(props, "paddingY", 16);
  const marginTop = pnum(props, "marginTop", 0);
  const marginBottom = pnum(props, "marginBottom", 0);
  return (
    <div className="flex h-full min-h-[60px] flex-col rounded border-2 border-dashed border-muted-foreground/20 bg-background">
      <div className="border-b border-dashed px-2 py-1 text-[9px] font-medium text-muted-foreground/60">Container</div>
      <div className="flex-1" style={{ maxWidth: pnum(props, "maxWidth", 1200) > 0 ? `${pnum(props, "maxWidth", 1200)}px` : undefined, margin: `0 auto`, width: "100%", paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px`, paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px`, marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` } as CSSProperties}>
        {comp.node.children && comp.node.children.length > 0 ? (
          <div><ChildrenSlot components={comp.node.children} /></div>
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
            Centered Container ({pstr(props, "maxWidthText", "1200px")})
          </div>
        )}
      </div>
    </div>
  );
}

/** 模拟 Grid 组件渲染 */
export function renderGrid({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
  const gap = pnum(props, "gap", 4);
  const rows = pnum(props, "rows", 0);
  const autoFlow = pstr(props, "autoFlow", "row");
  const justifyItems = pstr(props, "justifyItems", "stretch");
  const alignItems = pstr(props, "alignItems", "stretch");
  const areas = pstr(props, "areas", "");
  return (
    <div className="h-full min-h-[60px] rounded border-2 border-dashed border-muted-foreground/30 bg-muted/10 p-2">
      <div className="mb-1 text-[9px] font-medium text-muted-foreground/60">
        Grid ({pstr(props, "columns", "3")} cols{rows > 0 ? ` x ${rows} rows` : ""})
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${pnum(props, "columns", 3)}, 1fr)`,
          gridTemplateRows: rows > 0 ? `repeat(${rows}, 1fr)` : undefined,
          gridAutoFlow: autoFlow,
          justifyItems: justifyItems,
          alignItems: alignItems,
          gap: `${gap * 4}px`,
          ...(areas ? { gridTemplateAreas: areas } : {}),
        } as CSSProperties}
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
}

/** 模拟 Form 组件渲染 */
export function renderForm({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
  return (
    <div className="flex h-full flex-col rounded-lg border-2 border-blue-200 bg-blue-50/20 p-3">
      <div className="mb-1 text-xs font-semibold text-blue-600">
        📋 {pstr(props, "name", "Form")}
      </div>
      <div className="flex-1">
        {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : (
          <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
            拖入表单字段组件
          </div>
        )}
      </div>
    </div>
  );
}

/** 模拟 Separator 组件渲染 */
export function renderSeparator({ comp: _comp, variant: _variant }: SimulatedLayoutProps) {
  return <hr className="border-muted" />;
}

/** 模拟 ScrollArea 组件渲染 */
export function renderScrollArea({ comp, variant: _variant }: SimulatedLayoutProps) {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden rounded border text-[10px] text-muted-foreground">
      {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : "Scroll Area"}
    </div>
  );
}

/** 模拟 AspectRatio 组件渲染 */
export function renderAspectRatio({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props } = comp.node;
  return (
    <div className="flex h-full w-full items-center justify-center rounded border-2 border-dashed bg-muted/30 text-[10px] text-muted-foreground">
      {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : `${pnum(props, "ratio", 1)}:1`}
    </div>
  );
}

/** 模拟 ResizablePanelGroup 组件渲染 */
export function renderResizablePanelGroup({ comp, variant: _variant }: SimulatedLayoutProps) {
  const { props, children } = comp.node;
  if (children && children.length > 0) {
    return <ChildrenSlot components={children} />;
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
