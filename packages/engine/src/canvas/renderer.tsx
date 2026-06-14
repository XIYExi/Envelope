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

import { forwardRef, useCallback, useRef, useState, useEffect, type CSSProperties, type MouseEvent as RMouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import type { CanvasComponent } from "./types";

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
      return (
        <div className="flex h-full flex-col rounded-lg border bg-card p-3">
          <div className="mb-1 text-xs font-semibold text-muted-foreground">{pstr(props, "label", "Card")}</div>
          <div className="flex-1">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );
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
          <div className="flex gap-1 border-b pb-1">
            <div className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium">Tab 1</div>
            <div className="rounded px-2 py-0.5 text-[10px] text-muted-foreground">Tab 2</div>
            <div className="rounded px-2 py-0.5 text-[10px] text-muted-foreground">Tab 3</div>
          </div>
          <div className="flex-1 p-2">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );
    case "TabsContent":
      return <div className="p-1 text-xs">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;

    case "Accordion":
      return (
        <div className="flex h-full flex-col gap-0.5">
          <div className="flex items-center justify-between rounded bg-muted/50 px-2 py-1 text-[10px] font-medium">
            <span>Section 1</span><span>▼</span>
          </div>
          <div className="p-1">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );

    case "Table":
      return (
        <div className="flex h-full flex-col text-[10px]">
          <div className="flex border-b bg-muted/50 font-medium">
            <div className="flex-1 px-1 py-0.5">Col 1</div>
            <div className="flex-1 border-l px-1 py-0.5">Col 2</div>
            <div className="flex-1 border-l px-1 py-0.5">Col 3</div>
          </div>
          <div className="flex border-b">
            <div className="flex-1 px-1 py-0.5">...</div>
            <div className="flex-1 border-l px-1 py-0.5">...</div>
            <div className="flex-1 border-l px-1 py-0.5">...</div>
          </div>
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

    case "RadioGroup":
      return (
        <div className="flex flex-col gap-1">
          <label className="inline-flex items-center gap-1.5 text-xs"><span className="inline-block h-3 w-3 rounded-full border-2 border-primary"></span>Option 1</label>
          <label className="inline-flex items-center gap-1.5 text-xs"><span className="inline-block h-3 w-3 rounded-full border"></span>Option 2</label>
        </div>
      );

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

    case "Select":
      return (
        <div className="flex h-8 items-center justify-between rounded-md border bg-background px-2 text-xs text-muted-foreground">
          <span>{pstr(props, "placeholder", "Select...")}</span>
          <span>▼</span>
        </div>
      );

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
      return (
        <div className={cn("flex h-full flex-col gap-1 rounded-lg border p-2", variantColor)}>
          <span className="text-[10px] font-semibold">⚠ Alert</span>
          {comp.node.children && <ChildrenSlot components={comp.node.children} />}
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
    case "Breadcrumb":
      return <div className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">Home / <span className="font-medium text-foreground">Current</span></div>;
    case "Pagination":
      return (
        <div className="inline-flex items-center gap-1">
          <div className="rounded border px-1.5 py-0.5 text-[10px]">‹</div>
          <div className="rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">1</div>
          <div className="rounded border px-1.5 py-0.5 text-[10px]">2</div>
          <div className="rounded border px-1.5 py-0.5 text-[10px]">3</div>
          <div className="rounded border px-1.5 py-0.5 text-[10px]">›</div>
        </div>
      );

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

    case "ResizablePanelGroup":
      return (
        <div className="flex h-full">
          <div className="flex-1 border-r-2 p-1 text-[10px]">Panel 1</div>
          <div className="w-1.5 cursor-col-resize bg-muted" />
          <div className="flex-1 p-1 text-[10px]">Panel 2</div>
        </div>
      );

    // ===== Overlay components =====
    case "Dialog":
    case "Sheet":
    case "AlertDialog":
    case "Popover":
    case "Tooltip":
    case "HoverCard":
    case "Drawer":
      return <div className="flex h-full items-center justify-center rounded border-2 border-dashed border-muted-foreground/30 text-[10px] text-muted-foreground">{type}</div>;

    case "DropdownMenu":
    case "ContextMenu":
      return (
        <div className="rounded border bg-background p-1 shadow">
          <div className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">Item 1</div>
          <div className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">Item 2</div>
          <div className="my-0.5 border-t" />
          <div className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">Item 3</div>
        </div>
      );

    case "Collapsible":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1 text-[10px] font-medium">▶ {pstr(props, "label", "Toggle")}</div>
          <div className="flex-1 p-1">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
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
 */
function ChildrenSlot({ components }: { components: { type: string; props?: Record<string, unknown>; id: string }[] }) {
  if (!components || components.length === 0) return null;
  return (
    <div className="space-y-1">
      {components.map((child) => (
        <SimulatedChildContent key={child.id} type={child.type} props={child.props} />
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
function SimulatedChildContent({ type, props }: { type: string; props?: Record<string, unknown> }) {
  switch (type) {
    case "Button":
      return <button className="inline-flex items-center rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground" tabIndex={-1}>{(props?.label as string) || "Btn"}</button>;
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
      return <div className="rounded-t border-b bg-muted/30 p-1 text-[10px] font-medium">Header</div>;
    case "CardContent":
      return <div className="p-1 text-[10px] text-muted-foreground">Content</div>;
    case "CardFooter":
      return <div className="rounded-b border-t bg-muted/10 p-1 text-[10px]">Footer</div>;
    case "TabsList":
      return <div className="inline-flex gap-0.5 rounded bg-muted p-0.5 text-[10px]"><span className="rounded bg-background px-1">Tab</span></div>;
    case "TabsTrigger":
      return <span className="inline-flex rounded px-1 py-0.5 text-[10px] font-medium">Tab</span>;
    case "BreadcrumbItem":
      return <span className="text-[10px] text-muted-foreground">/ Page</span>;
    case "BreadcrumbLink":
      return <span className="text-[10px] text-primary underline">Link</span>;
    case "DropdownMenuItem":
      return <div className="rounded px-1 py-0.5 text-[10px] hover:bg-muted">Action</div>;
    case "TableHeader":
      return <div className="flex border-b bg-muted/50 font-medium text-[10px]"><div className="flex-1 px-1">H1</div><div className="flex-1 px-1">H2</div></div>;
    case "TableBody":
      return <div className="text-[10px]"><div className="flex border-b"><div className="flex-1 px-1">D1</div><div className="flex-1 px-1">D2</div></div></div>;
    case "TableRow":
      return <div className="flex border-b text-[10px]"><div className="flex-1 px-1">Cell</div></div>;
    default:
      return <div className="rounded bg-muted/30 px-1 py-0.5 text-[10px] text-muted-foreground">{type}</div>;
  }
}

// ===== 缩放手柄 =====

/**
 * 缩放手柄方向
 *
 * 八个方向（四边 + 四角），命名使用小写罗盘缩写：
 * n=上, s=下, e=右, w=左, ne=右上, nw=左上, se=右下, sw=左下
 */
type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/**
 * 各方向缩放手柄的定位样式
 *
 * 手柄定位在组件的边缘或角落外侧 50% 处，
 * 使用负 margin 使手柄视觉居中于边缘线上。
 */
const resizeHandleStyles: Record<ResizeDirection, CSSProperties> = {
  n:  { top: -RESIZE_HANDLE_SIZE/2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "n-resize" },
  s:  { bottom: -RESIZE_HANDLE_SIZE/2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "s-resize" },
  e:  { right: -RESIZE_HANDLE_SIZE/2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "e-resize" },
  w:  { left: -RESIZE_HANDLE_SIZE/2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "w-resize" },
  ne: { top: -RESIZE_HANDLE_SIZE/2, right: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "ne-resize" },
  nw: { top: -RESIZE_HANDLE_SIZE/2, left: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "nw-resize" },
  se: { bottom: -RESIZE_HANDLE_SIZE/2, right: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "se-resize" },
  sw: { bottom: -RESIZE_HANDLE_SIZE/2, left: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "sw-resize" },
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
  }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef({ x: 0, y: 0 });

    // 存储 onPan 的最新引用以避免 useCallback 依赖变化
    const onPanRef = useRef(onPan);
    onPanRef.current = onPan;

    const handleMouseDown = useCallback((e: RMouseEvent) => {
      const target = e.target;
      const isCanvasBg = target === e.currentTarget
        || (target instanceof HTMLElement && target.dataset.canvasBg === "true");
      if (isCanvasBg) {
        if (e.button === 0) {
          setIsPanning(true);
          panStart.current = { x: e.clientX - panX, y: e.clientY - panY };
        }
      }
    }, [panX, panY]);

    const handleMouseMove = useCallback((e: RMouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        onPanRef.current(dx, dy);
      }
    }, [isPanning]);

    const handleMouseUp = useCallback(() => {
      setIsPanning(false);
    }, []);

    useEffect(() => {
      if (!isPanning) return;
      window.addEventListener("mouseup", handleMouseUp);
      return () => window.removeEventListener("mouseup", handleMouseUp);
    }, [isPanning, handleMouseUp]);

    return (
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-muted/30"
        style={{ cursor: isPanning ? "grabbing" : "default" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
          }}
          onClick={(e) => {
            if (e.target instanceof HTMLElement && e.target.dataset.canvasBg === "true") {
              onClearSelection();
            }
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
            className="relative grid p-4"
            style={{
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: `${gridGap}px`,
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
                      className="absolute z-10 rounded-full border border-blue-500 bg-white hover:bg-blue-100"
                      style={resizeHandleStyles[dir]}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const startClientX = e.clientX;
                        const startClientY = e.clientY;
                        const startW = width;
                        const startH = height;
                        const startGridX = x;
                        const startGridY = y;

                        const handleMove = (ev: MouseEvent) => {
                          const dx = (ev.clientX - startClientX) / (CELL_WIDTH * zoom);
                          const dy = (ev.clientY - startClientY) / (CELL_HEIGHT * zoom);

                          let newW = startW;
                          let newH = startH;
                          let newX = startGridX;
                          let newY = startGridY;

                          if (dir.includes("e")) newW = Math.round(Math.max(1, startW + dx));
                          if (dir.includes("w")) {
                            const delta = Math.round(dx);
                            newW = Math.max(1, startW - delta);
                            newX = startGridX + delta;
                          }
                          if (dir.includes("s")) newH = Math.round(Math.max(1, startH + dy));
                          if (dir.includes("n")) {
                            const delta = Math.round(dy);
                            newH = Math.max(1, startH - delta);
                            newY = startGridY + delta;
                          }

                          onResize(comp.id, newW, newH, newX, newY);
                        };

                        const handleUp = () => {
                          window.removeEventListener("mousemove", handleMove);
                          window.removeEventListener("mouseup", handleUp);
                        };

                        window.addEventListener("mousemove", handleMove);
                        window.addEventListener("mouseup", handleUp);
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
