/**
 * V5 Canvas Fidelity — 布局容器真实渲染
 *
 * 将模拟的布局容器组件替换为真实 shadcn 组件。
 * Box/Flex/Container/Grid/Form 无对应 shadcn，用原生 div 渲染。
 */

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { PreviewRenderFn } from "./types";
import { pstr, filterDesignProps } from "./types";

export const renderCard: PreviewRenderFn = (props, children) => {
  return (
    <Card className={pstr(props, "className", "")} data-design-mode="true">
      {children ?? (
        <CardContent className="p-4 text-muted-foreground text-xs">
          Drop components here
        </CardContent>
      )}
    </Card>
  );
};

export const renderCardHeader: PreviewRenderFn = (props, children) => {
  return (
    <CardHeader data-design-mode="true">
      <CardTitle className="text-sm">{pstr(props, "title", "Card Header")}</CardTitle>
      {children}
    </CardHeader>
  );
};

export const renderCardContent: PreviewRenderFn = (props, children) => {
  return (
    <CardContent data-design-mode="true" className={pstr(props, "className", "")}>
      {children ?? <span className="text-xs text-muted-foreground">Content</span>}
    </CardContent>
  );
};

export const renderCardFooter: PreviewRenderFn = (props, children) => {
  return (
    <CardFooter data-design-mode="true" className={pstr(props, "className", "")}>
      {children ?? <span className="text-xs text-muted-foreground">Footer</span>}
    </CardFooter>
  );
};

export const renderSeparator: PreviewRenderFn = (props) => {
  return <Separator data-design-mode="true" className={pstr(props, "className", "my-2")} />;
};

export const renderScrollArea: PreviewRenderFn = (props, children) => {
  return (
    <ScrollArea data-design-mode="true" className={pstr(props, "className", "h-full w-full")}>
      {children ?? (
        <div className="p-4 text-xs text-muted-foreground">
          Scrollable content
        </div>
      )}
    </ScrollArea>
  );
};

export const renderAspectRatio: PreviewRenderFn = (props, children) => {
  const ratio = (props.ratio as number) ?? 16 / 9;
  return (
    <AspectRatio ratio={ratio} data-design-mode="true">
      {children ?? (
        <div className="flex h-full items-center justify-center border border-dashed text-xs text-muted-foreground">
          {ratio}:1
        </div>
      )}
    </AspectRatio>
  );
};

/** Box: 原生 div + className（无对应 shadcn 组件） */
export const renderBox: PreviewRenderFn = (props, children) => {
  const dir = pstr(props, "direction", "vertical");
  const align = pstr(props, "align", "start");
  const justify = pstr(props, "justify", "start");
  const gap = pstr(props, "gap", "4");
  const padding = pstr(props, "padding", "4");
  const isRow = dir === "horizontal";

  const alignMap: Record<string, string> = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
  const justifyMap: Record<string, string> = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between", around: "justify-around" };

  return (
    <div
      className={`flex ${isRow ? "flex-row" : "flex-col"} ${alignMap[align] ?? ""} ${justifyMap[justify] ?? ""} gap-${gap} p-${padding}`}
      data-design-mode="true"
      {...filterDesignProps(props, ["direction", "align", "justify", "gap", "padding"])}
    >
      {children ?? <span className="text-xs text-muted-foreground">Box</span>}
    </div>
  );
};

/** Flex: 原生 div + flex className（无对应 shadcn 组件） */
export const renderFlex: PreviewRenderFn = (props, children) => {
  const dir = pstr(props, "direction", "row");
  const wrap = props.wrap === true ? "flex-wrap" : "";
  const align = pstr(props, "align", "center");
  const justify = pstr(props, "justify", "start");
  const gap = pstr(props, "gap", "2");

  const alignMap: Record<string, string> = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch", baseline: "items-baseline" };
  const justifyMap: Record<string, string> = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between", around: "justify-around", evenly: "justify-evenly" };

  return (
    <div
      className={`flex ${dir === "column" ? "flex-col" : "flex-row"} ${wrap} ${alignMap[align] ?? ""} ${justifyMap[justify] ?? ""} gap-${gap}`}
      data-design-mode="true"
      {...filterDesignProps(props, ["direction", "wrap", "align", "justify", "gap"])}
    >
      {children ?? <span className="text-xs text-muted-foreground">Flex</span>}
    </div>
  );
};

/** Container: 原生 div + container className（无对应 shadcn 组件） */
export const renderContainer: PreviewRenderFn = (props, children) => {
  const maxWidth = pstr(props, "maxWidth", "container");
  return (
    <div
      className={`${maxWidth === "container" ? "container" : "max-w-" + maxWidth} mx-auto`}
      data-design-mode="true"
      {...filterDesignProps(props, ["maxWidth"])}
    >
      {children ?? <span className="text-xs text-muted-foreground">Container</span>}
    </div>
  );
};

/** Grid: 原生 div + grid className（无对应 shadcn 组件） */
export const renderGrid: PreviewRenderFn = (props, children) => {
  const cols = pstr(props, "cols", "3");
  const gap = pstr(props, "gap", "4");
  return (
    <div
      className={`grid grid-cols-${cols} gap-${gap}`}
      data-design-mode="true"
      {...filterDesignProps(props, ["cols", "gap"])}
    >
      {children ?? Array.from({ length: Number(cols) }).map((_, i) => (
        <div key={i} className="rounded border border-dashed p-2 text-center text-[10px] text-muted-foreground">
          Cell {i + 1}
        </div>
      ))}
    </div>
  );
};

/** Form: 原生 form 元素（无对应 shadcn 组件） */
export const renderForm: PreviewRenderFn = (props, children) => {
  return (
    <form
      className="space-y-3"
      data-design-mode="true"
      {...filterDesignProps(props)}
    >
      {children ?? <span className="text-xs text-muted-foreground">Form content</span>}
    </form>
  );
};
