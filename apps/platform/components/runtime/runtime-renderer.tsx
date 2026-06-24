/**
 * Runtime Renderer（ISC-35 Preview）
 *
 * 将编辑器中的 ComponentNode 渲染为"真实的 shadcn/ui 组件"，用于 Preview 模式：
 * - 根节点使用与编辑器一致的 12 列 Grid 布局（来自 CanvasComponent.position）
 * - 子节点按组件结构递归渲染（来自 ComponentNode.children）
 * - 应用页面级样式：pageBackground / pagePadding / pageMaxWidth
 * - 应用节点级样式：tailwindClasses（兼容 props.className 回退）
 *
 * P1/P2: 预览模式消费 eventBindings 实现事件交互
 * P3: 预览模式消费 dataBindings 显示模拟数据
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
"use client";

import type { ReactNode, MouseEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import type { CanvasComponent, CanvasState } from "@envelope/engine";
import type { ComponentNode } from "@envelope/engine";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const GRID_ROW_HEIGHT = 40;

function str(props: Record<string, unknown> | undefined, key: string): string | undefined {
  const v = props?.[key];
  return typeof v === "string" ? v : undefined;
}

function num(props: Record<string, unknown> | undefined, key: string): number | undefined {
  const v = props?.[key];
  return typeof v === "number" ? v : undefined;
}

function bool(props: Record<string, unknown> | undefined, key: string): boolean | undefined {
  const v = props?.[key];
  return typeof v === "boolean" ? v : undefined;
}

function arr<T = unknown>(props: Record<string, unknown> | undefined, key: string): T[] | undefined {
  const v = props?.[key];
  return Array.isArray(v) ? (v as T[]) : undefined;
}

/**
 * Tailwind className 的统一读取策略
 *
 * 约定：
 * - 首选 ComponentNode.tailwindClasses
 * - 兼容旧数据：若 tailwindClasses 为空则回退 props.className
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function getNodeClassName(node: ComponentNode): string {
  const canonical = typeof node.tailwindClasses === "string" ? node.tailwindClasses : "";
  const legacy = typeof node.props?.["className"] === "string" ? String(node.props["className"]) : "";
  return cn(canonical, legacy);
}

function getFirstTextChild(node: ComponentNode): string | null {
  const first = node.children?.[0];
  if (!first || first.type !== "Text") return null;
  const t = (first.props as Record<string, unknown> | undefined)?.text;
  return typeof t === "string" ? t : null;
}

function renderChildren(children: ComponentNode[] | undefined): ReactNode {
  if (!children || children.length === 0) return null;
  return children.map((c) => <RuntimeNodeRenderer key={c.id} node={c} />);
}

/* =========================================================================
 * P1/P2: 预览模式事件交互 — 在预览中调用绑定的 flow 或显示模拟 toast
 * ========================================================================= */

/**
 * P1: 预览模式中模拟调用 flow 的函数
 * 当 flow 后端可用时发送真实请求，否则显示 toast 提示
 *
 * @param flowId - 绑定的 flow ID
 * @param eventName - 触发的事件名称
 */
async function previewCallFlow(flowId: string, eventName: string): Promise<void> {
  try {
    // P2: 尝试发送真实请求至 flow API
    const res = await fetch(`/api/flows/${encodeURIComponent(flowId)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ input: { source: "preview", event: eventName } }),
    });
    if (res.ok) {
      const result = await res.json();
      toast.success(`Flow ${flowId} 执行成功`, {
        description: `耗时: ${JSON.stringify(result).length} bytes 响应`,
      });
      return;
    }
  } catch {
    // 后端不可用时降级为 toast 提示
  }
  toast(`Flow ${flowId} triggered (simulated)`, {
    description: `事件: ${eventName} | 预览模式 — 无后端响应`,
    icon: "⚡",
  });
}

/**
 * 获取节点指定事件的 flow ID 列表（K1: 支持 string[]）
 * eventBindings 结构: Record<string, string[]>
 */
function getBoundFlows(node: ComponentNode, eventName: string): string[] {
  if (!node.eventBindings) return [];
  const raw = node.eventBindings[eventName];
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter((f) => typeof f === "string");
  return [String(raw)];
}

/**
 * P1: 为交互组件生成 onClick 处理器，触发绑定的 flow 链
 * 支持多个 flow 依次执行（K1 兼容）
 */
function createEventHandler(node: ComponentNode, eventName = "onClick") {
  const flowIds = getBoundFlows(node, eventName);
  if (flowIds.length === 0) return undefined;
  return (e: MouseEvent | ChangeEvent) => {
    e.stopPropagation?.();
    // P1/P2: 依次调用绑定的 flow
    for (const fid of flowIds) {
      void previewCallFlow(fid, eventName);
    }
  };
}

/**
 * P3: 获取第一个 dataBinding 键名，用于判断组件是否绑定了数据
 * 用于在 Table 等组件中显示模拟数据
 */
function getFirstBindingKey(node: ComponentNode): string | null {
  if (!node.dataBindings) return null;
  const keys = Object.keys(node.dataBindings);
  if (keys.length === 0) return null;
  return keys[0] ?? null;
}

/**
 * P3: 根据 dataBindings 生成模拟数据值
 * 支持 table.column 格式 — 生成占位文本
 */
function getMockDataValue(node: ComponentNode, propKey?: string): string | undefined {
  if (!node.dataBindings) return undefined;
  const db = node.dataBindings;
  // 如果传入了特定 prop，查找它的绑定
  if (propKey && db[propKey]) {
    return mockFromBinding(db[propKey]);
  }
  // 取第一个绑定生成示例值
  const first = Object.values(db)[0];
  if (!first) return undefined;
  return mockFromBinding(first);
}

/**
 * P3: 根据绑定表达式生成模拟数据
 */
function mockFromBinding(binding: string): string {
  // L5: 搜索参数绑定
  if (binding.startsWith("{{") && binding.endsWith("}}")) {
    return `[${binding}]`;
  }
  // L4: table.column 类型
  const dot = binding.indexOf(".");
  if (dot === -1) return `[${binding} data]`;
  const column = binding.slice(dot + 1);
  if (column === "*") return `[table data]`;
  // 为常见列名生成有意义的模拟值
  const mocks: Record<string, string> = {
    name: "张三",
    title: "示例标题",
    email: "user@example.com",
    status: "活跃",
    amount: "¥1,200.00",
    date: "2026-06-23",
    phone: "138-0000-0000",
    address: "北京市朝阳区",
    description: "这是一段模拟的描述文本...",
    content: "模拟内容占位符",
  };
  return mocks[column] ?? `[${column}]`;
}

/**
 * P3: Table 组件的 dataBindings 模拟 — 生成 mock 行数据
 */
function getMockTableData(node: ComponentNode, columns: string[], rowCount: number): Record<string, string>[] {
  if (!node.dataBindings) {
    return Array.from({ length: rowCount }).map((_, r) =>
      Object.fromEntries(columns.map((c) => [c, `${c}-${r + 1}`])),
    );
  }
  // 优先使用 dataBindings 中绑定了 table.* 的列
  const boundColumns = Object.entries(node.dataBindings).filter(
    ([, v]) => v.includes(".") && !v.endsWith(".*"),
  );
  if (boundColumns.length === 0) {
    return Array.from({ length: rowCount }).map((_, r) =>
      Object.fromEntries(columns.map((c) => [c, mockFromBinding(`${c}.${c}`)])),
    );
  }
  return Array.from({ length: rowCount }).map((_, r) =>
    Object.fromEntries(
      columns.map((c) => {
        const bound = boundColumns.find(([prop]) => prop === c);
        return [c, bound ? mockFromBinding(bound[1]) : `${c}-${r + 1}`];
      }),
    ),
  );
}

/**
 * P3: 在具有 dataBindings 的组件上显示数据绑定标记
 */
function DataBindingBadge({ node, className }: { node: ComponentNode; className?: string }) {
  if (!node.dataBindings) return null;
  const count = Object.keys(node.dataBindings).length;
  return (
    <span
      className={cn(
        "ml-1 inline-flex items-center rounded bg-yellow-100 px-1 text-[10px] text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        className,
      )}
      title={`已绑定 ${count} 个数据源: ${Object.values(node.dataBindings).join(", ")}`}
    >
      ⚡{count}
    </span>
  );
}

/**
 * 为具有 dataBindings 的组件包裹 DataBindingBadge 标记
 * 消除各组件的重复条件渲染模版
 */
function WithDataBadge({ node, children, className, position = "inline" }: {
  node: ComponentNode;
  children: ReactNode;
  className?: string;
  position?: "inline" | "top-right" | "absolute-top-right";
}) {
  if (!node.dataBindings) return <>{children}</>;
  if (position === "inline") return <>{children}<DataBindingBadge node={node} className={className} /></>;
  if (position === "absolute-top-right") return (
    <div className="relative">
      {children}
      <span className="absolute -right-1 -top-1"><DataBindingBadge node={node} /></span>
    </div>
  );
  if (position === "top-right") return (
    <div className="relative">
      {children}
      <span className="absolute right-2 top-2"><DataBindingBadge node={node} /></span>
    </div>
  );
  return <>{children}</>;
}

function RuntimeNodeRenderer({ node }: { node: ComponentNode }) {
  const className = getNodeClassName(node);
  const props = node.props as Record<string, unknown> | undefined;

  switch (node.type) {
    case "Text": {
      const text = typeof props?.text === "string" ? String(props.text) : "";
      return <span className={cn(className)}>{text}</span>;
    }

    case "Button": {
      const variant = str(props, "variant") as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | undefined;
      const size = str(props, "size") as "default" | "sm" | "lg" | "icon" | undefined;
      const label = str(props, "label") ?? str(props, "text") ?? getFirstTextChild(node) ?? "Button";
      const disabled = bool(props, "disabled") ?? false;
      const onClick = createEventHandler(node, "onClick");
      const hasData = getFirstBindingKey(node);
      return (
        <Button variant={variant} size={size} className={className} disabled={disabled} onClick={onClick}>
          {node.children && node.children.length > 0 ? renderChildren(node.children) : label}
          {hasData ? <DataBindingBadge node={node} /> : null}
        </Button>
      );
    }

    case "Input": {
      const placeholder = str(props, "placeholder");
      const disabled = bool(props, "disabled") ?? false;
      const onChange = createEventHandler(node, "onChange");
      const mockValue = getMockDataValue(node, "defaultValue") ?? getMockDataValue(node);
      return (
        <WithDataBadge node={node} position="absolute-top-right">
          <Input
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={mockValue}
            onChange={onChange}
          />
        </WithDataBadge>
      );
    }

    case "Textarea": {
      const placeholder = str(props, "placeholder");
      const disabled = bool(props, "disabled") ?? false;
      const onChange = createEventHandler(node, "onChange");
      const mockValue = getMockDataValue(node);
      return (
        <WithDataBadge node={node} position="absolute-top-right">
          <Textarea
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={mockValue}
            onChange={onChange}
          />
        </WithDataBadge>
      );
    }

    case "Label": {
      const label = str(props, "label") ?? getFirstTextChild(node) ?? "Label";
      return <Label className={className}>{node.children && node.children.length > 0 ? renderChildren(node.children) : label}</Label>;
    }

    case "Checkbox": {
      const defaultChecked = bool(props, "defaultChecked");
      const disabled = bool(props, "disabled") ?? false;
      const onClick = createEventHandler(node, "onChange");
      return (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <Checkbox defaultChecked={defaultChecked} disabled={disabled} onClick={onClick} />
          {str(props, "label") ?? getFirstTextChild(node)}
          {node.dataBindings ? <DataBindingBadge node={node} /> : null}
        </span>
      );
    }

    case "RadioGroup": {
      const options = (arr<string>(props, "options") ?? []).filter((v) => typeof v === "string");
      const safeOptions = options.length > 0 ? options : ["Option 1", "Option 2"];
      const defaultValue = str(props, "defaultValue") ?? "0";
      const onValueChange = node.eventBindings?.onChange
        ? (value: string) => {
            for (const fid of getBoundFlows(node, "onChange")) {
              void previewCallFlow(fid, `onChange:${value}`);
            }
          }
        : undefined;
      return (
        <RadioGroup className={className} defaultValue={defaultValue} onValueChange={onValueChange}>
          {safeOptions.map((opt, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <RadioGroupItem value={String(idx)} />
              <span>{opt}</span>
            </span>
          ))}
          {node.dataBindings ? <DataBindingBadge node={node} /> : null}
        </RadioGroup>
      );
    }

    case "Select": {
      const placeholder = str(props, "placeholder") ?? "Select an option";
      const disabled = bool(props, "disabled") ?? false;
      const options = (arr<string>(props, "options") ?? []).filter((v) => typeof v === "string");
      const selectedIndex = Math.floor(num(props, "selectedIndex") ?? -1);
      const selected = selectedIndex >= 0 && selectedIndex < options.length ? options[selectedIndex] : undefined;
      const childItems = (node.children ?? []).filter((c) => c.type === "SelectItem");
      const items = childItems.length > 0 ? childItems : options.map((o, idx) => ({
        id: `select-item-${node.id}-${idx}`,
        type: "SelectItem",
        category: node.category,
        props: { value: o, label: o },
      })) satisfies ComponentNode[];
      const onValueChange = node.eventBindings?.onChange
        ? (value: string) => {
            const flowIds = getBoundFlows(node, "onChange");
            for (const fid of flowIds) {
              void previewCallFlow(fid, `onChange:${value}`);
            }
          }
        : undefined;

      return (
        <WithDataBadge node={node} position="absolute-top-right">
          <Select defaultValue={selected} disabled={disabled} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((it) => (
                <RuntimeNodeRenderer key={it.id} node={it} />
              ))}
            </SelectContent>
          </Select>
        </WithDataBadge>
      );
    }

    case "SelectItem": {
      const value = str(props, "value") ?? node.id;
      const disabled = bool(props, "disabled") ?? false;
      const label = str(props, "label") ?? getFirstTextChild(node) ?? value;
      return (
        <SelectItem value={value} disabled={disabled} className={className}>
          {node.children && node.children.length > 0 ? renderChildren(node.children) : label}
        </SelectItem>
      );
    }

    case "Switch": {
      const defaultChecked = bool(props, "defaultChecked");
      const disabled = bool(props, "disabled") ?? false;
      const onClick = createEventHandler(node, "onChange");
      return (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <Switch defaultChecked={defaultChecked} disabled={disabled} onClick={onClick} />
          {str(props, "label") ?? getFirstTextChild(node)}
          {node.dataBindings ? <DataBindingBadge node={node} /> : null}
        </span>
      );
    }

    case "Toggle": {
      const disabled = bool(props, "disabled") ?? false;
      const onClick = createEventHandler(node, "onClick");
      return (
        <Toggle className={className} disabled={disabled} onClick={onClick}>
          {node.children && node.children.length > 0 ? renderChildren(node.children) : str(props, "label") ?? "Toggle"}
          {node.dataBindings ? <DataBindingBadge node={node} /> : null}
        </Toggle>
      );
    }

    case "ToggleGroup": {
      const tgType = (str(props, "type") ?? "single") as "single" | "multiple";
      const disabled = bool(props, "disabled") ?? false;
      const options = (arr<string>(props, "options") ?? ["A", "B", "C"]).filter((v) => typeof v === "string");
      const isSingle = tgType !== "multiple";
      const onValueChange = node.eventBindings?.onChange
        ? isSingle
          ? (value: string) => {
              for (const fid of getBoundFlows(node, "onChange")) {
                void previewCallFlow(fid, `onChange:${value}`);
              }
            }
          : (values: string[]) => {
              for (const fid of getBoundFlows(node, "onChange")) {
                void previewCallFlow(fid, `onChange:${values.join(",")}`);
              }
            }
        : undefined;
      if (isSingle) {
        return (
          <ToggleGroup className={className} type="single" disabled={disabled} onValueChange={onValueChange as (value: string) => void}>
            {options.map((o) => (
              <ToggleGroupItem key={o} value={o}>
                {o}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        );
      }
      return (
        <ToggleGroup className={className} type="multiple" disabled={disabled} onValueChange={onValueChange as (values: string[]) => void}>
          {options.map((o) => (
            <ToggleGroupItem key={o} value={o}>
              {o}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      );
    }

    case "Slider": {
      const defaultValue = num(props, "defaultValue");
      const disabled = bool(props, "disabled") ?? false;
      const onValueChange = node.eventBindings?.onChange
        ? (value: number[]) => {
            const flowIds = getBoundFlows(node, "onChange");
            for (const fid of flowIds) {
              void previewCallFlow(fid, `onChange:${value.join(",")}`);
            }
          }
        : undefined;
      return <Slider className={className} defaultValue={typeof defaultValue === "number" ? [defaultValue] : undefined} disabled={disabled} onValueChange={onValueChange} />;
    }

    case "Badge": {
      const variant = str(props, "variant") as "default" | "secondary" | "destructive" | "outline" | undefined;
      const label = str(props, "label") ?? getFirstTextChild(node) ?? "Badge";
      return (
        <Badge className={className} variant={variant}>
          {node.children && node.children.length > 0 ? renderChildren(node.children) : label}
        </Badge>
      );
    }

    case "Avatar": {
      const src = str(props, "src") ?? str(props, "image");
      const alt = str(props, "alt") ?? "avatar";
      const fallback = str(props, "fallback") ?? str(props, "label") ?? "?";
      return (
        <Avatar className={className}>
          {src ? <AvatarImage src={src} alt={alt} /> : null}
          <AvatarFallback>{fallback.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      );
    }

    case "Separator":
      return <Separator className={className} />;

    case "Card":
      return <Card className={className}>{node.children && node.children.length > 0 ? renderChildren(node.children) : null}</Card>;
    case "CardHeader":
      return <CardHeader className={className}>{renderChildren(node.children)}</CardHeader>;
    case "CardTitle":
      return <CardTitle className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? str(props, "text")}</CardTitle>;
    case "CardDescription":
      return <CardDescription className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? str(props, "text")}</CardDescription>;
    case "CardContent":
      return <CardContent className={className}>{renderChildren(node.children)}</CardContent>;
    case "CardFooter":
      return <CardFooter className={className}>{renderChildren(node.children)}</CardFooter>;

    case "Tabs": {
      const orientation = (str(props, "orientation") as "horizontal" | "vertical" | undefined) ?? "horizontal";
      const explicitDefaultValue = str(props, "defaultValue");
      const activeIndex = Math.max(0, Math.floor(num(props, "activeIndex") ?? 0));
      const children = node.children ?? [];

      if (children.length > 0) {
        const triggers = children.flatMap((c) => (c.type === "TabsList" ? (c.children ?? []).filter((x) => x.type === "TabsTrigger") : []));
        const triggerValues = triggers.map((t) => (t.props as Record<string, unknown> | undefined)?.value).filter((v): v is string => typeof v === "string");
        const defaultValue = explicitDefaultValue ?? triggerValues[activeIndex] ?? triggerValues[0] ?? "tab-0";
        return (
          <Tabs className={className} defaultValue={defaultValue} orientation={orientation}>
            {renderChildren(children)}
          </Tabs>
        );
      }

      const tabs = (arr<{ label?: string; content?: string }>(props, "tabs") ?? []).filter(Boolean);
      const safeTabs = tabs.length > 0 ? tabs : [{ label: "Tab 1", content: "Tab content..." }];
      const values = safeTabs.map((_, idx) => `tab-${idx}`);
      const defaultValue = explicitDefaultValue ?? values[Math.min(activeIndex, values.length - 1)] ?? values[0] ?? "tab-0";
      const showList = bool(props, "showList") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <Tabs className={className} defaultValue={defaultValue} orientation={orientation}>
          {showList && (
            <TabsList>
              {safeTabs.map((t, idx) => (
                <TabsTrigger key={values[idx]} value={values[idx]!}>
                  {typeof t.label === "string" ? t.label : `Tab ${idx + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
          {showContent &&
            safeTabs.map((t, idx) => (
              <TabsContent key={values[idx]} value={values[idx]!}>
                {typeof t.content === "string" ? t.content : ""}
              </TabsContent>
            ))}
        </Tabs>
      );
    }

    case "TabsList":
      return <TabsList className={className}>{renderChildren(node.children)}</TabsList>;
    case "TabsTrigger": {
      const value = str(props, "value") ?? node.id;
      const disabled = bool(props, "disabled") ?? false;
      return (
        <TabsTrigger className={className} value={value} disabled={disabled}>
          {renderChildren(node.children) ?? getFirstTextChild(node) ?? value}
        </TabsTrigger>
      );
    }
    case "TabsContent": {
      const value = str(props, "value") ?? node.id;
      return (
        <TabsContent className={className} value={value}>
          {renderChildren(node.children)}
        </TabsContent>
      );
    }

    case "Accordion": {
      const type = (str(props, "type") as "single" | "multiple" | undefined) ?? "single";
      const collapsible = bool(props, "collapsible") ?? true;
      const children = node.children ?? [];
      if (children.length > 0) {
        return (
          <Accordion className={className} type={type} collapsible={collapsible}>
            {renderChildren(children)}
          </Accordion>
        );
      }
      const items = (arr<{ title?: string; content?: string }>(props, "items") ?? []).filter(Boolean);
      const safeItems = items.length > 0 ? items : [{ title: "Section 1", content: "Accordion content..." }];
      return (
        <Accordion className={className} type={type} collapsible={collapsible}>
          {safeItems.map((it, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{typeof it.title === "string" ? it.title : `Section ${idx + 1}`}</AccordionTrigger>
              <AccordionContent>{typeof it.content === "string" ? it.content : ""}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    case "AccordionItem": {
      const value = str(props, "value") ?? node.id;
      const disabled = bool(props, "disabled") ?? false;
      return (
        <AccordionItem className={className} value={value} disabled={disabled}>
          {renderChildren(node.children)}
        </AccordionItem>
      );
    }
    case "AccordionTrigger":
      return <AccordionTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Trigger"}</AccordionTrigger>;
    case "AccordionContent":
      return <AccordionContent className={className}>{renderChildren(node.children)}</AccordionContent>;

    case "Table": {
      const children = node.children ?? [];
      if (children.length > 0) {
        return <Table className={className}>{renderChildren(children)}</Table>;
      }
      const columns = (arr<string>(props, "columns") ?? []).filter((v) => typeof v === "string");
      const safeCols = columns.length > 0 ? columns : ["Col 1", "Col 2"];
      const rowCount = Math.max(0, Math.floor(num(props, "rowCount") ?? 2));
      const showHeader = bool(props, "showHeader") ?? true;
      // P3: 从 dataBindings 生成模拟数据
      const mockRows = getMockTableData(node, safeCols, rowCount);
      return (
        <WithDataBadge node={node} position="top-right">
          <Table className={className}>
            {showHeader && (
              <TableHeader>
                <TableRow>
                  {safeCols.map((c) => (
                    <TableHead key={c}>{c}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {mockRows.map((row, r) => (
                <TableRow key={r}>
                  {safeCols.map((c) => (
                    <TableCell key={c}>{row[c] ?? "..."}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </WithDataBadge>
      );
    }

    case "TableHeader":
      return <TableHeader className={className}>{renderChildren(node.children)}</TableHeader>;
    case "TableBody":
      return <TableBody className={className}>{renderChildren(node.children)}</TableBody>;
    case "TableRow":
      return <TableRow className={className}>{renderChildren(node.children)}</TableRow>;
    case "TableHead":
      return <TableHead className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</TableHead>;
    case "TableCell":
      return <TableCell className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</TableCell>;

    case "Alert":
      return <Alert className={className}>{renderChildren(node.children)}</Alert>;
    case "AlertTitle":
      return <AlertTitle className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</AlertTitle>;
    case "AlertDescription":
      return <AlertDescription className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</AlertDescription>;

    case "Progress": {
      const value = num(props, "value") ?? 0;
      return <Progress className={className} value={value} />;
    }

    case "Skeleton":
      return <Skeleton className={className} />;

    case "ScrollArea":
      return <ScrollArea className={className}>{renderChildren(node.children)}</ScrollArea>;

    case "AspectRatio": {
      const ratio = num(props, "ratio") ?? 1;
      return (
        <AspectRatio className={className} ratio={ratio}>
          {renderChildren(node.children)}
        </AspectRatio>
      );
    }

    case "ResizablePanelGroup": {
      const direction = (str(props, "direction") as "horizontal" | "vertical" | undefined) ?? "horizontal";
      const children = node.children ?? [];
      if (children.length > 0) {
        return (
          <ResizablePanelGroup className={className} direction={direction}>
            {renderChildren(children)}
          </ResizablePanelGroup>
        );
      }
      return (
        <ResizablePanelGroup className={className} direction={direction}>
          <ResizablePanel defaultSize={50}>Panel 1</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
        </ResizablePanelGroup>
      );
    }

    case "ResizablePanel": {
      const defaultSize = num(props, "defaultSize") ?? 50;
      return <ResizablePanel className={className} defaultSize={defaultSize}>{renderChildren(node.children)}</ResizablePanel>;
    }

    case "ResizableHandle":
      return <ResizableHandle className={className} />;

    case "Dialog": {
      const children = node.children ?? [];
      if (children.length > 0) return <Dialog>{renderChildren(children)}</Dialog>;

      const showTrigger = bool(props, "showTrigger") ?? true;
      const showHeader = bool(props, "showHeader") ?? true;
      const showDescription = bool(props, "showDescription") ?? true;
      const showFooter = bool(props, "showFooter") ?? true;
      const triggerText = str(props, "triggerText") ?? "Open";
      const titleText = str(props, "titleText") ?? "Dialog title";
      const descriptionText = str(props, "descriptionText") ?? "Dialog description...";
      const primaryActionText = str(props, "primaryActionText") ?? "Confirm";
      const secondaryActionText = str(props, "secondaryActionText") ?? "Cancel";

      return (
        <Dialog>
          {showTrigger && (
            <DialogTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </DialogTrigger>
          )}
          <DialogContent>
            {showHeader && (
              <DialogHeader>
                <DialogTitle>{titleText}</DialogTitle>
                {showDescription && <DialogDescription>{descriptionText}</DialogDescription>}
              </DialogHeader>
            )}
            {showFooter && (
              <DialogFooter>
                <Button variant="outline">{secondaryActionText}</Button>
                <Button>{primaryActionText}</Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      );
    }

    case "DialogTrigger":
      return <DialogTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Open"}</DialogTrigger>;
    case "DialogContent":
      return <DialogContent className={className}>{renderChildren(node.children)}</DialogContent>;
    case "DialogHeader":
      return <DialogHeader className={className}>{renderChildren(node.children)}</DialogHeader>;
    case "DialogTitle":
      return <DialogTitle className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</DialogTitle>;
    case "DialogDescription":
      return <DialogDescription className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</DialogDescription>;
    case "DialogFooter":
      return <DialogFooter className={className}>{renderChildren(node.children)}</DialogFooter>;

    case "Sheet": {
      const children = node.children ?? [];
      if (children.length > 0) return <Sheet>{renderChildren(children)}</Sheet>;
      const triggerText = str(props, "triggerText") ?? "Open";
      const titleText = str(props, "titleText") ?? "Sheet";
      const descriptionText = str(props, "descriptionText") ?? "Sheet description...";
      const bodyText = str(props, "bodyText") ?? "Sheet content...";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showHeader = bool(props, "showHeader") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <Sheet>
          {showTrigger && (
            <SheetTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </SheetTrigger>
          )}
          <SheetContent>
            {showHeader && (
              <SheetHeader>
                <SheetTitle>{titleText}</SheetTitle>
                <SheetDescription>{descriptionText}</SheetDescription>
              </SheetHeader>
            )}
            {showContent && <div className="mt-4">{bodyText}</div>}
          </SheetContent>
        </Sheet>
      );
    }

    case "SheetTrigger":
      return <SheetTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Open"}</SheetTrigger>;
    case "SheetContent":
      return <SheetContent className={className}>{renderChildren(node.children)}</SheetContent>;
    case "SheetHeader":
      return <SheetHeader className={className}>{renderChildren(node.children)}</SheetHeader>;
    case "SheetTitle":
      return <SheetTitle className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</SheetTitle>;
    case "SheetDescription":
      return <SheetDescription className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</SheetDescription>;

    case "AlertDialog": {
      const children = node.children ?? [];
      if (children.length > 0) return <AlertDialog>{renderChildren(children)}</AlertDialog>;

      const triggerText = str(props, "triggerText") ?? "Open";
      const titleText = str(props, "titleText") ?? "Are you absolutely sure?";
      const descriptionText = str(props, "descriptionText") ?? "This action cannot be undone.";
      const actionText = str(props, "actionText") ?? "Continue";
      const cancelText = str(props, "cancelText") ?? "Cancel";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showHeader = bool(props, "showHeader") ?? true;
      const showDescription = bool(props, "showDescription") ?? true;
      const showActions = bool(props, "showActions") ?? true;
      const showCancel = bool(props, "showCancel") ?? true;

      return (
        <AlertDialog>
          {showTrigger && (
            <AlertDialogTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </AlertDialogTrigger>
          )}
          <AlertDialogContent>
            {showHeader && (
              <AlertDialogHeader>
                <AlertDialogTitle>{titleText}</AlertDialogTitle>
                {showDescription && <AlertDialogDescription>{descriptionText}</AlertDialogDescription>}
              </AlertDialogHeader>
            )}
            {showActions && (
              <AlertDialogFooter>
                {showCancel && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
                <AlertDialogAction>{actionText}</AlertDialogAction>
              </AlertDialogFooter>
            )}
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    case "AlertDialogTrigger":
      return <AlertDialogTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Open"}</AlertDialogTrigger>;
    case "AlertDialogContent":
      return <AlertDialogContent className={className}>{renderChildren(node.children)}</AlertDialogContent>;
    case "AlertDialogHeader":
      return <AlertDialogHeader className={className}>{renderChildren(node.children)}</AlertDialogHeader>;
    case "AlertDialogTitle":
      return <AlertDialogTitle className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</AlertDialogTitle>;
    case "AlertDialogDescription":
      return <AlertDialogDescription className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</AlertDialogDescription>;
    case "AlertDialogFooter":
      return <AlertDialogFooter className={className}>{renderChildren(node.children)}</AlertDialogFooter>;
    case "AlertDialogAction":
      return <AlertDialogAction className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "OK"}</AlertDialogAction>;
    case "AlertDialogCancel":
      return <AlertDialogCancel className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Cancel"}</AlertDialogCancel>;

    case "Popover": {
      const children = node.children ?? [];
      if (children.length > 0) return <Popover>{renderChildren(children)}</Popover>;
      const triggerText = str(props, "triggerText") ?? "Open";
      const contentText = str(props, "contentText") ?? "Popover content...";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <Popover>
          {showTrigger && (
            <PopoverTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </PopoverTrigger>
          )}
          {showContent && <PopoverContent>{contentText}</PopoverContent>}
        </Popover>
      );
    }

    case "PopoverTrigger":
      return <PopoverTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Open"}</PopoverTrigger>;
    case "PopoverContent":
      return <PopoverContent className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</PopoverContent>;

    case "Tooltip": {
      const children = node.children ?? [];
      if (children.length > 0) {
        return (
          <TooltipProvider>
            <Tooltip>{renderChildren(children)}</Tooltip>
          </TooltipProvider>
        );
      }
      const triggerText = str(props, "triggerText") ?? "Hover me";
      const contentText = str(props, "contentText") ?? "Tooltip content...";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <TooltipProvider>
          <Tooltip>
            {showTrigger && (
              <TooltipTrigger asChild>
                <Button className={className} variant="outline">
                  {triggerText}
                </Button>
              </TooltipTrigger>
            )}
            {showContent && <TooltipContent>{contentText}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      );
    }

    case "TooltipTrigger":
      return <TooltipTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Hover"}</TooltipTrigger>;
    case "TooltipContent":
      return <TooltipContent className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</TooltipContent>;

    case "DropdownMenu": {
      const children = node.children ?? [];
      if (children.length > 0) return <DropdownMenu>{renderChildren(children)}</DropdownMenu>;
      const triggerText = str(props, "triggerText") ?? "Open";
      const items = (arr<string>(props, "items") ?? ["Item 1", "Item 2"]).filter((v) => typeof v === "string");
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <DropdownMenu>
          {showTrigger && (
            <DropdownMenuTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </DropdownMenuTrigger>
          )}
          {showContent && (
            <DropdownMenuContent>
              {items.map((it, idx) => (
                <DropdownMenuItem key={idx}>{it}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      );
    }

    case "DropdownMenuTrigger":
      return <DropdownMenuTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Open"}</DropdownMenuTrigger>;
    case "DropdownMenuContent":
      return <DropdownMenuContent className={className}>{renderChildren(node.children)}</DropdownMenuContent>;
    case "DropdownMenuItem":
      return <DropdownMenuItem className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Item"}</DropdownMenuItem>;

    case "ContextMenu": {
      const children = node.children ?? [];
      if (children.length > 0) return <ContextMenu>{renderChildren(children)}</ContextMenu>;
      const triggerText = str(props, "triggerText") ?? "Right click";
      const items = (arr<string>(props, "items") ?? ["Item 1", "Item 2"]).filter((v) => typeof v === "string");
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <ContextMenu>
          {showTrigger && (
            <ContextMenuTrigger className={cn("inline-flex", className)}>
              <Button variant="outline">{triggerText}</Button>
            </ContextMenuTrigger>
          )}
          {showContent && (
            <ContextMenuContent>
              {items.map((it, idx) => (
                <ContextMenuItem key={idx}>{it}</ContextMenuItem>
              ))}
            </ContextMenuContent>
          )}
        </ContextMenu>
      );
    }

    case "ContextMenuTrigger":
      return <ContextMenuTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Trigger"}</ContextMenuTrigger>;
    case "ContextMenuContent":
      return <ContextMenuContent className={className}>{renderChildren(node.children)}</ContextMenuContent>;
    case "ContextMenuItem":
      return <ContextMenuItem className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Item"}</ContextMenuItem>;

    case "HoverCard": {
      const children = node.children ?? [];
      if (children.length > 0) return <HoverCard>{renderChildren(children)}</HoverCard>;
      const triggerText = str(props, "triggerText") ?? "Hover me";
      const contentText = str(props, "contentText") ?? "Hover card content...";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <HoverCard>
          {showTrigger && (
            <HoverCardTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </HoverCardTrigger>
          )}
          {showContent && <HoverCardContent>{contentText}</HoverCardContent>}
        </HoverCard>
      );
    }

    case "HoverCardTrigger":
      return <HoverCardTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Hover"}</HoverCardTrigger>;
    case "HoverCardContent":
      return <HoverCardContent className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</HoverCardContent>;

    case "Drawer": {
      const children = node.children ?? [];
      if (children.length > 0) return <Drawer>{renderChildren(children)}</Drawer>;
      const triggerText = str(props, "triggerText") ?? "Open";
      const titleText = str(props, "titleText") ?? "Drawer";
      const contentText = str(props, "contentText") ?? "Drawer content...";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showHeader = bool(props, "showHeader") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <Drawer>
          {showTrigger && (
            <DrawerTrigger asChild>
              <Button className={className} variant="outline">
                {triggerText}
              </Button>
            </DrawerTrigger>
          )}
          <DrawerContent>
            {showHeader && (
              <DrawerHeader>
                <DrawerTitle>{titleText}</DrawerTitle>
                <DrawerDescription>{contentText}</DrawerDescription>
              </DrawerHeader>
            )}
            {showContent && <div className="p-4">{contentText}</div>}
          </DrawerContent>
        </Drawer>
      );
    }

    case "DrawerTrigger":
      return <DrawerTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Open"}</DrawerTrigger>;
    case "DrawerContent":
      return <DrawerContent className={className}>{renderChildren(node.children)}</DrawerContent>;
    case "DrawerHeader":
      return <DrawerHeader className={className}>{renderChildren(node.children)}</DrawerHeader>;
    case "DrawerTitle":
      return <DrawerTitle className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</DrawerTitle>;
    case "DrawerDescription":
      return <DrawerDescription className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</DrawerDescription>;

    case "Collapsible": {
      const children = node.children ?? [];
      if (children.length > 0) return <Collapsible className={className}>{renderChildren(children)}</Collapsible>;
      const triggerText = str(props, "triggerText") ?? "Toggle";
      const contentText = str(props, "contentText") ?? "Collapsible content...";
      const showTrigger = bool(props, "showTrigger") ?? true;
      const showContent = bool(props, "showContent") ?? true;
      return (
        <Collapsible className={className}>
          {showTrigger && (
            <CollapsibleTrigger asChild>
              <Button variant="outline">{triggerText}</Button>
            </CollapsibleTrigger>
          )}
          {showContent && <CollapsibleContent className="mt-2">{contentText}</CollapsibleContent>}
        </Collapsible>
      );
    }

    case "CollapsibleTrigger":
      return <CollapsibleTrigger className={className}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Toggle"}</CollapsibleTrigger>;
    case "CollapsibleContent":
      return <CollapsibleContent className={className}>{renderChildren(node.children) ?? getFirstTextChild(node)}</CollapsibleContent>;

    case "Breadcrumb": {
      const children = node.children ?? [];
      if (children.length > 0) return <Breadcrumb className={className}>{renderChildren(children)}</Breadcrumb>;
      const items = (arr<string>(props, "items") ?? ["Home", "Page", "Current"]).filter((v) => typeof v === "string");
      const safe = items.length > 0 ? items : ["Home"];
      return (
        <Breadcrumb className={className}>
          <BreadcrumbList>
            {safe.map((it, idx) => (
              <BreadcrumbItem key={idx}>
                {idx === safe.length - 1 ? <BreadcrumbPage>{it}</BreadcrumbPage> : <BreadcrumbLink href="#">{it}</BreadcrumbLink>}
                {idx < safe.length - 1 ? <BreadcrumbSeparator /> : null}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    case "BreadcrumbItem":
      return <BreadcrumbItem className={className}>{renderChildren(node.children)}</BreadcrumbItem>;
    case "BreadcrumbLink":
      return <BreadcrumbLink className={className} href={str(props, "href") ?? "#"}>{renderChildren(node.children) ?? getFirstTextChild(node) ?? "Link"}</BreadcrumbLink>;

    case "Pagination": {
      const children = node.children ?? [];
      if (children.length > 0) return <Pagination className={className}>{renderChildren(children)}</Pagination>;
      const pageCount = Math.max(1, Math.floor(num(props, "pageCount") ?? 5));
      const currentPage = Math.max(1, Math.min(pageCount, Math.floor(num(props, "currentPage") ?? 1)));
      const showPrevNext = bool(props, "showPrevNext") ?? true;
      const pages = Array.from({ length: Math.min(7, pageCount) }).map((_, i) => i + 1);
      return (
        <Pagination className={className}>
          <PaginationContent>
            {showPrevNext && (
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
            )}
            {pages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#" isActive={p === currentPage}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            {showPrevNext && (
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      );
    }

    case "PaginationItem":
      return <PaginationItem className={className}>{renderChildren(node.children)}</PaginationItem>;

    default:
      return (
        <div className={cn("rounded border border-dashed p-2 text-sm text-muted-foreground", className)}>
          <div className="font-medium">{node.type}</div>
          {node.children && node.children.length > 0 ? <div className="mt-2">{renderChildren(node.children)}</div> : null}
        </div>
      );
  }
}

/**
 * Runtime Preview 的页面级渲染器
 *
 * 根节点渲染规则：
 * - 使用 CanvasComponent.position 作为网格定位（与编辑器一致）
 * - 应用 pageBackground/pagePadding/pageMaxWidth（与编辑器右侧配置保持一致）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
export function RuntimePageRenderer({
  components,
  gridCols,
  gridGap,
  pageBackground,
  pagePadding,
  pageMaxWidth,
  viewportWidth,
  viewport,
}: {
  components: CanvasComponent[];
  gridCols: number;
  gridGap: number;
  pageBackground: string;
  pagePadding: number;
  pageMaxWidth: number | null;
  viewportWidth: number;
  viewport: CanvasState["viewport"];
}) {
  return (
    <div
      data-testid="runtime-preview-root"
      className="flex w-full justify-center"
    >
      <div
        data-testid="runtime-preview-viewport"
        className="w-full overflow-auto rounded-lg border bg-background shadow-sm"
        style={{
          width: `${viewportWidth}px`,
          backgroundColor: pageBackground,
        }}
        data-viewport={viewport}
      >
        <div
          data-testid="runtime-preview-grid"
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            gridAutoRows: `${GRID_ROW_HEIGHT}px`,
            gap: `${gridGap}px`,
            padding: `${pagePadding}px`,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: typeof pageMaxWidth === "number" && pageMaxWidth > 0 ? `${pageMaxWidth}px` : undefined,
            minHeight: "600px",
          }}
        >
          {components.map((comp) => {
            const { x, y, width, height } = comp.position;
            if (x < 1 || y < 1 || width < 1 || height < 1) return null;
            return (
              <div
                key={comp.id}
                data-testid={`runtime-preview-comp-${comp.id}`}
                className={getNodeClassName(comp.node)}
                style={{
                  gridColumn: `${x} / span ${width}`,
                  gridRow: `${y} / span ${height}`,
                  overflow: "hidden",
                }}
              >
                <RuntimeNodeRenderer node={comp.node} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
