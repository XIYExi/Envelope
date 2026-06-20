/**
 * 组件类型 → JSX 代码生成器映射表
 *
 * 每个组件类型对应一个生成器函数，负责将 ComponentNode 转换为对应的
 * shadcn/ui React JSX 代码字符串。
 *
 * 支持递归嵌套：children 字段中的子组件会自动被 generateComponentJSX()
 * 递归渲染，生成器函数通过 childrenJSX 参数接收已渲染的子组件 JSX。
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { ComponentNode } from "@envelope/engine";
import { jsxText, sanitizeJsxComment, tsStringLiteral } from "../core/tsx-escape";
import { makeEventHandlerName } from "./event-handler-names";

/**
 * 组件生成器函数签名
 *
 * @param comp - 当前组件节点
 * @param childrenJSX - 已递归渲染的子组件 JSX 字符串
 * @param indent - 当前缩进字符串（空格）
 * @returns 生成的 JSX 代码字符串
 */
type ComponentGenerator = (
  comp: ComponentNode,
  childrenJSX: string,
  indent: string,
) => string;

/**
 * 从 props 中安全获取字符串值
 */
function propStr(props: Record<string, unknown> | undefined, key: string, fallback = ""): string {
  const v = props?.[key];
  if (v === undefined || v === null) return fallback;
  return String(v);
}

/**
 * 从 props 中安全获取布尔值
 */
function propBool(props: Record<string, unknown> | undefined, key: string, fallback = false): boolean {
  const v = props?.[key];
  if (v === undefined || v === null) return fallback;
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const lower = v.toLowerCase();
    return lower === "true" || lower === "1";
  }
  if (typeof v === "number") return v !== 0;
  return Boolean(v);
}

/**
 * 从 props 中安全获取数字值
 */
function propNum(props: Record<string, unknown> | undefined, key: string, fallback = 0): number {
  const v = props?.[key];
  if (v === undefined || v === null) return fallback;
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
}

function jsxAttrString(name: string, value: string): string {
  return `${name}={${tsStringLiteral(value)}}`;
}

/**
 * 生成条件性注释行
 */
function comment(comp: ComponentNode, indent: string): string {
  if (!comp.comment) return "";
  return `${indent}{/* ${sanitizeJsxComment(String(comp.comment))} */}\n`;
}

/**
 * 组合 tailwindClasses 和额外类名
 */
function cx(comp: ComponentNode, extra = ""): string {
  const tw = comp.tailwindClasses || "";
  if (!tw && !extra) return "";
  return [tw, extra].filter(Boolean).join(" ");
}

function eventAttrs(comp: ComponentNode): string[] {
  if (!comp.eventBindings) return [];
  const attrs: string[] = [];
  for (const event of Object.keys(comp.eventBindings)) {
    if (event === "onPageLoad" || event === "onPageUnload") continue;
    attrs.push(`${event}={${makeEventHandlerName(comp.id, event)}}`);
  }
  return attrs;
}

/**
 * shadcn/ui 组件导入映射表
 *
 * key: 组件类型名（ComponentNode.type）
 * value: { path: 导入路径, components: 需要导入的具名导出列表 }
 */
export const SHADCN_IMPORT_MAP: Record<string, { path: string; components: string[] }> = {
  // Layout
  "Card": { path: "@/components/ui/card", components: ["Card", "CardHeader", "CardFooter", "CardTitle", "CardDescription", "CardContent"] },
  "CardHeader": { path: "@/components/ui/card", components: [] },
  "CardContent": { path: "@/components/ui/card", components: [] },
  "CardFooter": { path: "@/components/ui/card", components: [] },
  "CardTitle": { path: "@/components/ui/card", components: [] },
  "CardDescription": { path: "@/components/ui/card", components: [] },
  "Separator": { path: "@/components/ui/separator", components: ["Separator"] },

  // Form
  "Button": { path: "@/components/ui/button", components: ["Button"] },
  "Input": { path: "@/components/ui/input", components: ["Input"] },
  "Textarea": { path: "@/components/ui/textarea", components: ["Textarea"] },
  "Select": { path: "@/components/ui/select", components: ["Select", "SelectContent", "SelectItem", "SelectTrigger", "SelectValue"] },
  "Checkbox": { path: "@/components/ui/checkbox", components: ["Checkbox"] },
  "Switch": { path: "@/components/ui/switch", components: ["Switch"] },
  "RadioGroup": { path: "@/components/ui/radio-group", components: ["RadioGroup", "RadioGroupItem"] },
  "Label": { path: "@/components/ui/label", components: ["Label"] },

  // Form (react-hook-form 集成)
  "FormItem": { path: "@/components/ui/form", components: ["FormItem"] },
  "FormLabel": { path: "@/components/ui/form", components: ["FormLabel"] },
  "FormControl": { path: "@/components/ui/form", components: ["FormControl"] },
  "FormMessage": { path: "@/components/ui/form", components: ["FormMessage"] },
  "DatePicker": { path: "@/components/ui/date-picker", components: ["DatePicker"] },

  // Display
  "Badge": { path: "@/components/ui/badge", components: ["Badge"] },
  "Avatar": { path: "@/components/ui/avatar", components: ["Avatar", "AvatarImage", "AvatarFallback"] },
  "Skeleton": { path: "@/components/ui/skeleton", components: ["Skeleton"] },
  "Tooltip": { path: "@/components/ui/tooltip", components: ["Tooltip", "TooltipContent", "TooltipProvider", "TooltipTrigger"] },
  "Progress": { path: "@/components/ui/progress", components: ["Progress"] },
  "HoverCard": { path: "@/components/ui/hover-card", components: ["HoverCard", "HoverCardContent", "HoverCardTrigger"] },

  // Feedback
  "Alert": { path: "@/components/ui/alert", components: ["Alert", "AlertDescription", "AlertTitle"] },
  "Dialog": { path: "@/components/ui/dialog", components: ["Dialog", "DialogContent", "DialogDescription", "DialogHeader", "DialogTitle", "DialogTrigger", "DialogFooter"] },
  "AlertDialog": { path: "@/components/ui/alert-dialog", components: ["AlertDialog", "AlertDialogAction", "AlertDialogCancel", "AlertDialogContent", "AlertDialogDescription", "AlertDialogFooter", "AlertDialogHeader", "AlertDialogTitle", "AlertDialogTrigger"] },
  "Sheet": { path: "@/components/ui/sheet", components: ["Sheet", "SheetContent", "SheetDescription", "SheetHeader", "SheetTitle", "SheetTrigger"] },

  // Navigation
  "Breadcrumb": { path: "@/components/ui/breadcrumb", components: ["Breadcrumb", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbList", "BreadcrumbPage", "BreadcrumbSeparator"] },
  "Tabs": { path: "@/components/ui/tabs", components: ["Tabs", "TabsContent", "TabsList", "TabsTrigger"] },
  "NavigationMenu": { path: "@/components/ui/navigation-menu", components: ["NavigationMenu", "NavigationMenuItem", "NavigationMenuLink", "NavigationMenuList", "NavigationMenuTrigger", "NavigationMenuContent"] },
  "Pagination": { path: "@/components/ui/pagination", components: ["Pagination", "PaginationContent", "PaginationEllipsis", "PaginationItem", "PaginationLink", "PaginationNext", "PaginationPrevious"] },

  // Data
  "Table": { path: "@/components/ui/table", components: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"] },
  "DataTable": { path: "@/components/ui/data-table", components: ["DataTable"] },
  "TableHead": { path: "@/components/ui/table", components: [] },
  "TableBody": { path: "@/components/ui/table", components: [] },
  "TableRow": { path: "@/components/ui/table", components: [] },
  "TableCell": { path: "@/components/ui/table", components: [] },
  "TableCaption": { path: "@/components/ui/table", components: [] },

  // Overlay
  "DropdownMenu": { path: "@/components/ui/dropdown-menu", components: ["DropdownMenu", "DropdownMenuContent", "DropdownMenuItem", "DropdownMenuGroup", "DropdownMenuLabel", "DropdownMenuSeparator", "DropdownMenuTrigger", "DropdownMenuShortcut"] },
  "Popover": { path: "@/components/ui/popover", components: ["Popover", "PopoverContent", "PopoverTrigger"] },
  "ContextMenu": { path: "@/components/ui/context-menu", components: ["ContextMenu", "ContextMenuContent", "ContextMenuItem", "ContextMenuSeparator", "ContextMenuTrigger"] },

  // Other
  "Link": { path: "next/link", components: [] }, // Next.js 内置 Link
};

/* ================================================================================================
 * 生成器函数映射表
 * ================================================================================================ */

/**
 * 组件类型 → 代码生成器 的完整映射表
 *
 * 每个键对应 ComponentNode.type，值为生成器函数。
 * 生成器函数接收组件节点、预渲染的子组件 JSX、当前缩进，
 * 返回该组件的 JSX 代码字符串。
 *
 * 分类覆盖：
 * - Layout: Container, Card 系列, FlexCol/Row, GridContainer, Section, Separator
 * - Form: Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Label + FormItem 系列
 * - Display: Badge, Avatar, Skeleton, Tooltip, Progress, HoverCard
 * - Feedback: Alert, Dialog, AlertDialog, Toast(占位), Sheet
 * - Navigation: Breadcrumb, Tabs, NavigationMenu, Pagination, Link
 * - Data: Table 系列, DataTable
 * - Overlay: DropdownMenu, Popover, ContextMenu
 */
export const COMPONENT_MAP: Record<string, ComponentGenerator> = {

  /* ──────────────────────────────────────────────
   * Layout 布局组件
   * ────────────────────────────────────────────── */

  "Container": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<div${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</div>`;
  },

  "Card": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Card${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</Card>`;
  },

  "CardHeader": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    if (!childrenJSX) {
      const title = propStr(comp.props, "title");
      const description = propStr(comp.props, "description");
      return `${comment(comp, indent)}${indent}<CardHeader${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <CardTitle>${jsxText(title || "Title")}</CardTitle>\n${description ? `${indent}  <CardDescription>${jsxText(description)}</CardDescription>\n` : ""}${indent}</CardHeader>`;
    }
    return `${comment(comp, indent)}${indent}<CardHeader${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</CardHeader>`;
  },

  "CardContent": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<CardContent${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</CardContent>`;
  },

  "CardFooter": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<CardFooter${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</CardFooter>`;
  },

  "CardTitle": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "Card Title");
    return `${comment(comp, indent)}${indent}<CardTitle${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(text)}</CardTitle>`;
  },

  "CardDescription": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "");
    return `${comment(comp, indent)}${indent}<CardDescription${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(text)}</CardDescription>`;
  },

  "FlexCol": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "flex flex-col");
    return `${comment(comp, indent)}${indent}<div ${jsxAttrString("className", tw)}>\n${childrenJSX}${indent}</div>`;
  },

  "FlexRow": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "flex flex-row");
    return `${comment(comp, indent)}${indent}<div ${jsxAttrString("className", tw)}>\n${childrenJSX}${indent}</div>`;
  },

  "GridContainer": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "grid");
    return `${comment(comp, indent)}${indent}<div ${jsxAttrString("className", tw)}>\n${childrenJSX}${indent}</div>`;
  },

  "Section": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<section${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</section>`;
  },

  "Separator": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const orientation = propStr(comp.props, "orientation", "horizontal");
    return `${comment(comp, indent)}${indent}<Separator${tw ? ` ${jsxAttrString("className", tw)}` : ""}${orientation !== "horizontal" ? ` ${jsxAttrString("orientation", orientation)}` : ""} />`;
  },

  /* ──────────────────────────────────────────────
   * Form 表单组件
   * ────────────────────────────────────────────── */

  "Button": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const variant = propStr(p, "variant", "default");
    const size = propStr(p, "size", "default");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs = [`variant={${tsStringLiteral(variant)}}`, `size={${tsStringLiteral(size)}}`];
    attrs.push(...eventAttrs(comp));
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const label = childrenJSX ? `\n${childrenJSX}\n${indent}` : jsxText(propStr(p, "text", "Button"));
    return `${comment(comp, indent)}${indent}<Button ${attrs.join(" ")}>${label}</Button>`;
  },

  "Input": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const inputType = propStr(p, "type", "text");
    const placeholder = propStr(p, "placeholder", "");
    const defaultValue = propStr(p, "defaultValue", "");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs: string[] = [jsxAttrString("type", inputType)];
    attrs.push(...eventAttrs(comp));
    if (placeholder) attrs.push(jsxAttrString("placeholder", placeholder));
    if (defaultValue) attrs.push(jsxAttrString("defaultValue", defaultValue));
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<Input ${attrs.join(" ")} />`;
  },

  "Textarea": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const placeholder = propStr(p, "placeholder", "");
    const rows = propNum(p, "rows", 3);
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs: string[] = [];
    attrs.push(...eventAttrs(comp));
    if (placeholder) attrs.push(jsxAttrString("placeholder", placeholder));
    if (rows) attrs.push(`rows={${rows}}`);
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<Textarea ${attrs.join(" ")} />`;
  },

  "Select": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const placeholder = propStr(p, "placeholder", "Select...");
    const defaultValue = propStr(p, "defaultValue", "");
    const tw = cx(comp);
    const options = (p?.options as Array<{ label: string; value: string }> | undefined) || [];
    const optionsJSX = options
      .map((opt) => `${indent}  <SelectItem ${jsxAttrString("value", opt.value)}>${jsxText(opt.label)}</SelectItem>`)
      .join("\n");
    const attrs: string[] = [];
    attrs.push(...eventAttrs(comp));
    if (defaultValue) attrs.push(jsxAttrString("defaultValue", defaultValue));
    return `${comment(comp, indent)}${indent}<Select${attrs.length ? " " + attrs.join(" ") : ""}>\n${indent}  <SelectTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}    <SelectValue ${jsxAttrString("placeholder", placeholder)} />\n${indent}  </SelectTrigger>\n${indent}  <SelectContent>\n${optionsJSX || `${indent}    ${childrenJSX}`}\n${indent}  </SelectContent>\n${indent}</Select>`;
  },

  "Checkbox": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const checked = propBool(p, "checked");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const label = propStr(p, "label", "");
    const attrs: string[] = [];
    attrs.push(...eventAttrs(comp));
    if (checked) attrs.push("defaultChecked");
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(jsxAttrString("className", tw));
    if (label) {
      return `${comment(comp, indent)}${indent}<div className="flex items-center gap-2">\n${indent}  <Checkbox ${attrs.join(" ")} />\n${indent}  <Label>${jsxText(label)}</Label>\n${indent}</div>`;
    }
    return `${comment(comp, indent)}${indent}<Checkbox ${attrs.join(" ")} />`;
  },

  "Switch": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const checked = propBool(p, "checked");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs: string[] = [];
    attrs.push(...eventAttrs(comp));
    if (checked) attrs.push("defaultChecked");
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<Switch ${attrs.join(" ")} />`;
  },

  "RadioGroup": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const defaultValue = propStr(p, "defaultValue", "");
    const tw = cx(comp);
    const options = (p?.options as Array<{ label: string; value: string }> | undefined) || [];
    const optionsJSX = options
      .map((opt) => `${indent}  <div className="flex items-center gap-2">\n${indent}    <RadioGroupItem ${jsxAttrString("value", opt.value)} ${jsxAttrString("id", opt.value)} />\n${indent}    <Label ${jsxAttrString("htmlFor", opt.value)}>${jsxText(opt.label)}</Label>\n${indent}  </div>`)
      .join("\n");
    const attrs: string[] = [];
    attrs.push(...eventAttrs(comp));
    if (defaultValue) attrs.push(jsxAttrString("defaultValue", defaultValue));
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<RadioGroup${attrs.length ? " " + attrs.join(" ") : ""}>\n${optionsJSX || childrenJSX}\n${indent}</RadioGroup>`;
  },

  "Label": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const htmlFor = propStr(p, "htmlFor", "");
    const tw = cx(comp);
    const text = childrenJSX || jsxText(propStr(p, "text", "Label"));
    const attrs: string[] = [];
    if (htmlFor) attrs.push(jsxAttrString("htmlFor", htmlFor));
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<Label${attrs.length ? " " + attrs.join(" ") : ""}>${text}</Label>`;
  },

  "FormItem": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormItem${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</FormItem>`;
  },

  "FormLabel": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const text = propStr(p, "text", "Label");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormLabel${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(text)}</FormLabel>`;
  },

  "FormControl": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormControl${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</FormControl>`;
  },

  "FormMessage": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormMessage${tw ? ` ${jsxAttrString("className", tw)}` : ""} />`;
  },

  "DatePicker": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const placeholder = propStr(p, "placeholder", "Pick a date");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<DatePicker${tw ? ` ${jsxAttrString("className", tw)}` : ""} ${jsxAttrString("placeholder", placeholder)} />`;
  },

  /* ──────────────────────────────────────────────
   * Display 展示组件
   * ────────────────────────────────────────────── */

  "Badge": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const variant = propStr(p, "variant", "default");
    const tw = cx(comp);
    const text = childrenJSX || jsxText(propStr(p, "text", "Badge"));
    return `${comment(comp, indent)}${indent}<Badge ${jsxAttrString("variant", variant)}${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${text}</Badge>`;
  },

  "Avatar": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const src = propStr(p, "src", "");
    const fallback = propStr(p, "fallback", "U");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Avatar${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <AvatarImage ${jsxAttrString("src", src)} />\n${indent}  <AvatarFallback>${jsxText(fallback)}</AvatarFallback>\n${indent}</Avatar>`;
  },

  "Skeleton": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    if (childrenJSX) {
      return `${comment(comp, indent)}${indent}<Skeleton${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</Skeleton>`;
    }
    const finalClass = [tw, "h-4 w-full rounded"].filter(Boolean).join(" ");
    return `${comment(comp, indent)}${indent}<Skeleton ${jsxAttrString("className", finalClass)} />`;
  },

  "Tooltip": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const content = propStr(p, "content", "Tooltip content");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TooltipProvider>\n${indent}  <Tooltip>\n${indent}    <TooltipTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}    </TooltipTrigger>\n${indent}    <TooltipContent>\n${indent}      <p>${jsxText(content)}</p>\n${indent}    </TooltipContent>\n${indent}  </Tooltip>\n${indent}</TooltipProvider>`;
  },

  "Progress": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const value = propNum(p, "value", 0);
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Progress value={${value}}${tw ? ` ${jsxAttrString("className", tw)}` : ""} />`;
  },

  "HoverCard": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const content = propStr(p, "content", "");
    const tw = cx(comp);
    const body = content ? jsxText(content) : childrenJSX;
    return `${comment(comp, indent)}${indent}<HoverCard>\n${indent}  <HoverCardTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}  </HoverCardTrigger>\n${indent}  <HoverCardContent>\n${indent}    ${body}\n${indent}  </HoverCardContent>\n${indent}</HoverCard>`;
  },

  /* ──────────────────────────────────────────────
   * Feedback 反馈组件
   * ────────────────────────────────────────────── */

  "Alert": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const variant = propStr(p, "variant", "default");
    const title = propStr(p, "title", "");
    const description = propStr(p, "description", "");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Alert ${jsxAttrString("variant", variant)}${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${title ? `${indent}  <AlertTitle>${jsxText(title)}</AlertTitle>\n` : ""}${description ? `${indent}  <AlertDescription>${jsxText(description)}</AlertDescription>\n` : ""}${childrenJSX}${indent}</Alert>`;
  },

  "Dialog": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "Dialog Title");
    const description = propStr(p, "description", "");
    const triggerLabel = propStr(p, "trigger", "Open");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Dialog>\n${indent}  <DialogTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(triggerLabel)}</DialogTrigger>\n${indent}  <DialogContent>\n${indent}    <DialogHeader>\n${indent}      <DialogTitle>${jsxText(title)}</DialogTitle>\n${description ? `${indent}      <DialogDescription>${jsxText(description)}</DialogDescription>\n` : ""}${indent}    </DialogHeader>\n${childrenJSX}${indent}  </DialogContent>\n${indent}</Dialog>`;
  },

  "AlertDialog": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "Are you sure?");
    const description = propStr(p, "description", "");
    const triggerLabel = propStr(p, "trigger", "Open");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<AlertDialog>\n${indent}  <AlertDialogTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(triggerLabel)}</AlertDialogTrigger>\n${indent}  <AlertDialogContent>\n${indent}    <AlertDialogHeader>\n${indent}      <AlertDialogTitle>${jsxText(title)}</AlertDialogTitle>\n${description ? `${indent}      <AlertDialogDescription>${jsxText(description)}</AlertDialogDescription>\n` : ""}${indent}    </AlertDialogHeader>\n${childrenJSX}${indent}  </AlertDialogContent>\n${indent}</AlertDialog>`;
  },

  "Toast": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "");
    const description = propStr(p, "description", "");
    const note = `Toast: ${title}${description ? ` — ${description}` : ""} — 由页面级 useToast 钩子管理`;
    return `${comment(comp, indent)}${indent}{/* ${sanitizeJsxComment(note)} */}`;
  },

  "Sheet": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "Sheet");
    const description = propStr(p, "description", "");
    const triggerLabel = propStr(p, "trigger", "Open");
    const side = propStr(p, "side", "right");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Sheet>\n${indent}  <SheetTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(triggerLabel)}</SheetTrigger>\n${indent}  <SheetContent ${jsxAttrString("side", side)}>\n${indent}    <SheetHeader>\n${indent}      <SheetTitle>${jsxText(title)}</SheetTitle>\n${description ? `${indent}      <SheetDescription>${jsxText(description)}</SheetDescription>\n` : ""}${indent}    </SheetHeader>\n${childrenJSX}${indent}  </SheetContent>\n${indent}</Sheet>`;
  },

  /* ──────────────────────────────────────────────
   * Navigation 导航组件
   * ────────────────────────────────────────────── */

  "Breadcrumb": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const items = (p?.items as Array<{ label: string; href?: string }> | undefined) || [];
    const tw = cx(comp);
    const itemsJSX = items
      .map((item, i) => {
        const isLast = i === items.length - 1;
        if (isLast) {
          return `${indent}  <BreadcrumbItem>\n${indent}    <BreadcrumbPage>${jsxText(item.label)}</BreadcrumbPage>\n${indent}  </BreadcrumbItem>`;
        }
        return `${indent}  <BreadcrumbItem>\n${indent}    <BreadcrumbLink ${jsxAttrString("href", item.href || "#")}>${jsxText(item.label)}</BreadcrumbLink>\n${indent}  </BreadcrumbItem>`;
      })
      .join("\n");
    return `${comment(comp, indent)}${indent}<Breadcrumb${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <BreadcrumbList>\n${itemsJSX}\n${indent}  </BreadcrumbList>\n${indent}</Breadcrumb>`;
  },

  "Tabs": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const defaultValue = propStr(p, "defaultValue", "tab-0");
    const items = (p?.items as Array<{ label: string; value: string }> | undefined) || [];
    const tw = cx(comp);
    const triggersJSX = items
      .map((item) => `${indent}    <TabsTrigger ${jsxAttrString("value", item.value)}>${jsxText(item.label)}</TabsTrigger>`)
      .join("\n");
    return `${comment(comp, indent)}${indent}<Tabs ${jsxAttrString("defaultValue", defaultValue)}${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <TabsList>\n${triggersJSX}\n${indent}  </TabsList>\n${childrenJSX}${indent}</Tabs>`;
  },

  "NavigationMenu": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const items = (p?.items as Array<{ label: string; href: string }> | undefined) || [];
    const tw = cx(comp);
    const itemsJSX = items
      .map((item) => `${indent}  <NavigationMenuItem>\n${indent}    <NavigationMenuLink ${jsxAttrString("href", item.href || "#")}>${jsxText(item.label)}</NavigationMenuLink>\n${indent}  </NavigationMenuItem>`)
      .join("\n");
    return `${comment(comp, indent)}${indent}<NavigationMenu${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <NavigationMenuList>\n${itemsJSX}\n${indent}  </NavigationMenuList>\n${indent}</NavigationMenu>`;
  },

  "Pagination": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const totalPages = propNum(p, "totalPages", 5);
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Pagination${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <PaginationContent>\n${indent}    <PaginationItem>\n${indent}      <PaginationPrevious href="#" />\n${indent}    </PaginationItem>\n${Array.from({ length: totalPages }, (_, i) => `${indent}    <PaginationItem>\n${indent}      <PaginationLink href="#">${i + 1}</PaginationLink>\n${indent}    </PaginationItem>`).join("\n")}\n${indent}    <PaginationItem>\n${indent}      <PaginationNext href="#" />\n${indent}    </PaginationItem>\n${indent}  </PaginationContent>\n${indent}</Pagination>`;
  },

  "Link": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const href = propStr(p, "href", "#");
    const tw = cx(comp);
    const text = childrenJSX || jsxText(propStr(p, "text", "Link"));
    const attrs: string[] = [jsxAttrString("href", href)];
    attrs.push(...eventAttrs(comp));
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<Link${attrs.length ? " " + attrs.join(" ") : ""}>${text}</Link>`;
  },

  /* ──────────────────────────────────────────────
   * Data 数据组件
   * ────────────────────────────────────────────── */

  "Table": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Table${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</Table>`;
  },

  "DataTable": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const columns = (p?.columns as Array<{ key: string; header: string }> | undefined) || [];
    const data = (p?.data as Array<Record<string, unknown>> | undefined) || [];
    const tw = cx(comp);
    const headerJSX = columns
      .map((col) => `${indent}      <TableHead>${jsxText(col.header)}</TableHead>`)
      .join("\n");
    const bodyJSX = data
      .map((row, ri) => {
        const cells = columns
          .map((col) => `${indent}        <TableCell>{/* ${sanitizeJsxComment(String(row[col.key] ?? ""))} */}</TableCell>`)
          .join("\n");
        return `${indent}    <TableRow key={${ri}}>\n${cells}\n${indent}    </TableRow>`;
      })
      .join("\n");
    return `${comment(comp, indent)}${indent}<Table${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}  <TableHeader>\n${indent}    <TableRow>\n${headerJSX}\n${indent}    </TableRow>\n${indent}  </TableHeader>\n${indent}  <TableBody>\n${bodyJSX}\n${indent}  </TableBody>\n${indent}</Table>`;
  },

  "TableHead": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableHead${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${childrenJSX || jsxText(propStr(comp.props, "text", "Head"))}</TableHead>`;
  },

  "TableBody": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableBody${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</TableBody>`;
  },

  "TableRow": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableRow${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX}${indent}</TableRow>`;
  },

  "TableCell": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableCell${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${childrenJSX || jsxText(propStr(comp.props, "text", "Cell"))}</TableCell>`;
  },

  "TableCaption": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "");
    return `${comment(comp, indent)}${indent}<TableCaption${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(text)}</TableCaption>`;
  },

  /* ──────────────────────────────────────────────
   * Overlay 覆盖层组件
   * ────────────────────────────────────────────── */

  "DropdownMenu": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const triggerLabel = propStr(p, "trigger", "Menu");
    const items = (p?.items as Array<{ label: string; onClick?: string }> | undefined) || [];
    const tw = cx(comp);
    const itemsJSX = items.length
      ? items.map((item) => `${indent}    <DropdownMenuItem>${jsxText(item.label)}</DropdownMenuItem>`).join("\n")
      : childrenJSX || `${indent}    <DropdownMenuItem>Item 1</DropdownMenuItem>`;
    return `${comment(comp, indent)}${indent}<DropdownMenu>\n${indent}  <DropdownMenuTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(triggerLabel)}</DropdownMenuTrigger>\n${indent}  <DropdownMenuContent>\n${itemsJSX}\n${indent}  </DropdownMenuContent>\n${indent}</DropdownMenu>`;
  },

  "Popover": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const triggerLabel = propStr(p, "trigger", "Open");
    const content = propStr(p, "content", "");
    const tw = cx(comp);
    const body = content ? jsxText(content) : childrenJSX;
    return `${comment(comp, indent)}${indent}<Popover>\n${indent}  <PopoverTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>${jsxText(triggerLabel)}</PopoverTrigger>\n${indent}  <PopoverContent>\n${indent}    ${body}\n${indent}  </PopoverContent>\n${indent}</Popover>`;
  },

  "ContextMenu": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const items = (p?.items as Array<{ label: string }> | undefined) || [];
    const tw = cx(comp);
    const itemsJSX = items.length
      ? items.map((item) => `${indent}    <ContextMenuItem>${jsxText(item.label)}</ContextMenuItem>`).join("\n")
      : childrenJSX || `${indent}    <ContextMenuItem>Action</ContextMenuItem>`;
    return `${comment(comp, indent)}${indent}<ContextMenu>\n${indent}  <ContextMenuTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX || `${indent}    ${jsxText("Right-click here")}`}\n${indent}  </ContextMenuTrigger>\n${indent}  <ContextMenuContent>\n${itemsJSX}\n${indent}  </ContextMenuContent>\n${indent}</ContextMenu>`;
  },
};

/* ================================================================================================
 * 递归 JSX 生成
 * ================================================================================================ */

/**
 * 递归地将 ComponentNode 树转换为 JSX 字符串
 *
 * 对于每个节点，先递归渲染其 children，再将结果传给对应类型的生成器函数。
 * 如果组件类型在 COMPONENT_MAP 中没有映射，生成一个带注释的 <div> 占位符。
 *
 * @param comp - 待渲染的组件节点
 * @param depth - 嵌套深度（决定缩进层级），根节点 depth=0
 * @returns 完整的 JSX 代码字符串
 */
export function generateComponentJSX(comp: ComponentNode, depth = 0): string {
  const indent = "  ".repeat(depth);

  // 递归渲染子组件
  let childrenJSX = "";
  if (comp.children && comp.children.length > 0) {
    childrenJSX = comp.children
      .map((child: ComponentNode) => generateComponentJSX(child, depth + 1))
      .join("\n");
  }

  // 查找生成器
  const generator = COMPONENT_MAP[comp.type];
  if (generator) {
    return generator(comp, childrenJSX, indent);
  }

  // 未映射组件类型 — 生成带注释的 <div> 占位符
  const tw = cx(comp);
  const typeNote = sanitizeJsxComment(String(comp.type));
  return `${comment(comp, indent)}${indent}{/* 未映射组件类型: ${typeNote} */}\n${indent}<div${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX || `${indent}  {/* ${typeNote} */}`}\n${indent}</div>`;
}
