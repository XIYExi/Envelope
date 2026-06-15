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
  if (typeof v === "string") return v === "true";
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

/**
 * 安全转义 JSX 文本内容中的特殊字符
 * 防止 `<`, `>`, `{`, `}` 破坏 JSX 解析
 */
function escapeText(s: string): string {
  return s
    .replace(/</g, "{'<'}")
    .replace(/>/g, "{'>'}")
    .replace(/\{/g, "{'{'}")
    .replace(/\}/g, "{'}'}");
}

/**
 * 安全转义 JSX 属性值中的引号
 */
function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;");
}

/**
 * 生成条件性注释行
 */
function comment(comp: ComponentNode, indent: string): string {
  if (!comp.comment) return "";
  return `${indent}{/* ${comp.comment} */}\n`;
}

/**
 * 组合 tailwindClasses 和额外类名
 */
function cx(comp: ComponentNode, extra = ""): string {
  const tw = comp.tailwindClasses || "";
  if (!tw && !extra) return "";
  return [tw, extra].filter(Boolean).join(" ");
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
    const childIndent = indent + "  ";
    return `${comment(comp, indent)}${indent}<div${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</div>`;
  },

  "Card": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Card${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</Card>`;
  },

  "CardHeader": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    if (!childrenJSX) {
      const title = propStr(comp.props, "title");
      const description = propStr(comp.props, "description");
      return `${comment(comp, indent)}${indent}<CardHeader${tw ? ` className="${escapeAttr(tw)}"` : ""}>\n${indent}  <CardTitle>${escapeText(title || "Title")}</CardTitle>\n${description ? `${indent}  <CardDescription>${escapeText(description)}</CardDescription>\n` : ""}${indent}</CardHeader>`;
    }
    return `${comment(comp, indent)}${indent}<CardHeader${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</CardHeader>`;
  },

  "CardContent": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<CardContent${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</CardContent>`;
  },

  "CardFooter": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<CardFooter${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</CardFooter>`;
  },

  "CardTitle": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "Card Title");
    return `${comment(comp, indent)}${indent}<CardTitle${tw ? ` className="${escapeAttr(tw)}"` : ""}>${escapeText(text)}</CardTitle>`;
  },

  "CardDescription": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "");
    return `${comment(comp, indent)}${indent}<CardDescription${tw ? ` className="${escapeAttr(tw)}"` : ""}>${escapeText(text)}</CardDescription>`;
  },

  "FlexCol": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "flex flex-col");
    return `${comment(comp, indent)}${indent}<div className="${tw}">\n${childrenJSX}${indent}</div>`;
  },

  "FlexRow": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "flex flex-row");
    return `${comment(comp, indent)}${indent}<div className="${tw}">\n${childrenJSX}${indent}</div>`;
  },

  "GridContainer": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "grid");
    return `${comment(comp, indent)}${indent}<div className="${tw}">\n${childrenJSX}${indent}</div>`;
  },

  "Section": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<section${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</section>`;
  },

  "Separator": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const orientation = propStr(comp.props, "orientation", "horizontal");
    return `${comment(comp, indent)}${indent}<Separator${tw ? ` className="${tw}"` : ""}${orientation !== "horizontal" ? ` orientation="${orientation}"` : ""} />`;
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
    const attrs = [`variant="${variant}"`, `size="${size}"`];
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(`className="${tw}"`);
    const label = childrenJSX ? `\n${childrenJSX}\n${indent}` : escapeText(propStr(p, "text", "Button"));
    return `${comment(comp, indent)}${indent}<Button ${attrs.join(" ")}>${label}</Button>`;
  },

  "Input": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const inputType = propStr(p, "type", "text");
    const placeholder = propStr(p, "placeholder", "");
    const defaultValue = propStr(p, "defaultValue", "");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs: string[] = [`type="${inputType}"`];
    if (placeholder) attrs.push(`placeholder="${placeholder}"`);
    if (defaultValue) attrs.push(`defaultValue="${defaultValue}"`);
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(`className="${tw}"`);
    return `${comment(comp, indent)}${indent}<Input ${attrs.join(" ")} />`;
  },

  "Textarea": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const placeholder = propStr(p, "placeholder", "");
    const rows = propNum(p, "rows", 3);
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs: string[] = [];
    if (placeholder) attrs.push(`placeholder="${placeholder}"`);
    if (rows) attrs.push(`rows={${rows}}`);
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(`className="${tw}"`);
    return `${comment(comp, indent)}${indent}<Textarea ${attrs.join(" ")} />`;
  },

  "Select": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const placeholder = propStr(p, "placeholder", "Select...");
    const defaultValue = propStr(p, "defaultValue", "");
    const tw = cx(comp);
    const options = (p?.options as Array<{ label: string; value: string }> | undefined) || [];
    const optionsJSX = options
      .map((opt) => `${indent}  <SelectItem value="${escapeAttr(opt.value)}">${escapeText(opt.label)}</SelectItem>`)
      .join("\n");
    return `${comment(comp, indent)}${indent}<Select${defaultValue ? ` defaultValue="${defaultValue}"` : ""}>\n${indent}  <SelectTrigger${tw ? ` className="${tw}"` : ""}>\n${indent}    <SelectValue placeholder="${placeholder}" />\n${indent}  </SelectTrigger>\n${indent}  <SelectContent>\n${optionsJSX || `${indent}    ${childrenJSX}`}\n${indent}  </SelectContent>\n${indent}</Select>`;
  },

  "Checkbox": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const checked = propBool(p, "checked");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const label = propStr(p, "label", "");
    const attrs: string[] = [];
    if (checked) attrs.push("defaultChecked");
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(`className="${tw}"`);
    if (label) {
      return `${comment(comp, indent)}${indent}<div className="flex items-center gap-2">\n${indent}  <Checkbox ${attrs.join(" ")} />\n${indent}  <Label>${escapeText(label)}</Label>\n${indent}</div>`;
    }
    return `${comment(comp, indent)}${indent}<Checkbox ${attrs.join(" ")} />`;
  },

  "Switch": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const checked = propBool(p, "checked");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const attrs: string[] = [];
    if (checked) attrs.push("defaultChecked");
    if (disabled) attrs.push("disabled");
    if (tw) attrs.push(`className="${tw}"`);
    return `${comment(comp, indent)}${indent}<Switch ${attrs.join(" ")} />`;
  },

  "RadioGroup": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const defaultValue = propStr(p, "defaultValue", "");
    const tw = cx(comp);
    const options = (p?.options as Array<{ label: string; value: string }> | undefined) || [];
    const optionsJSX = options
      .map((opt) => `${indent}  <div className="flex items-center gap-2">\n${indent}    <RadioGroupItem value="${escapeAttr(opt.value)}" id="${escapeAttr(opt.value)}" />\n${indent}    <Label htmlFor="${escapeAttr(opt.value)}">${escapeText(opt.label)}</Label>\n${indent}  </div>`)
      .join("\n");
    return `${comment(comp, indent)}${indent}<RadioGroup${defaultValue ? ` defaultValue="${defaultValue}"` : ""}${tw ? ` className="${tw}"` : ""}>\n${optionsJSX || childrenJSX}\n${indent}</RadioGroup>`;
  },

  "Label": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const htmlFor = propStr(p, "htmlFor", "");
    const tw = cx(comp);
    const text = childrenJSX || escapeText(propStr(p, "text", "Label"));
    const attrs: string[] = [];
    if (htmlFor) attrs.push(`htmlFor="${escapeAttr(htmlFor)}"`);
    if (tw) attrs.push(`className="${escapeAttr(tw)}"`);
    return `${comment(comp, indent)}${indent}<Label${attrs.length ? " " + attrs.join(" ") : ""}>${text}</Label>`;
  },

  "FormItem": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormItem${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</FormItem>`;
  },

  "FormLabel": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const text = propStr(p, "text", "Label");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormLabel${tw ? ` className="${escapeAttr(tw)}"` : ""}>${escapeText(text)}</FormLabel>`;
  },

  "FormControl": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormControl${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</FormControl>`;
  },

  "FormMessage": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<FormMessage${tw ? ` className="${tw}"` : ""} />`;
  },

  "DatePicker": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const placeholder = propStr(p, "placeholder", "Pick a date");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<DatePicker${tw ? ` className="${tw}"` : ""} placeholder="${placeholder}" />`;
  },

  /* ──────────────────────────────────────────────
   * Display 展示组件
   * ────────────────────────────────────────────── */

  "Badge": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const variant = propStr(p, "variant", "default");
    const tw = cx(comp);
    const text = childrenJSX || escapeText(propStr(p, "text", "Badge"));
    return `${comment(comp, indent)}${indent}<Badge variant="${escapeAttr(variant)}"${tw ? ` className="${escapeAttr(tw)}"` : ""}>${text}</Badge>`;
  },

  "Avatar": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const src = propStr(p, "src", "");
    const fallback = propStr(p, "fallback", "U");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Avatar${tw ? ` className="${tw}"` : ""}>\n${indent}  <AvatarImage src="${src}" />\n${indent}  <AvatarFallback>${fallback}</AvatarFallback>\n${indent}</Avatar>`;
  },

  "Skeleton": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    if (childrenJSX) {
      return `${comment(comp, indent)}${indent}<Skeleton${tw ? ` className="${escapeAttr(tw)}"` : ""}>\n${childrenJSX}${indent}</Skeleton>`;
    }
    const finalClass = [tw, "h-4 w-full rounded"].filter(Boolean).join(" ");
    return `${comment(comp, indent)}${indent}<Skeleton className="${escapeAttr(finalClass)}" />`;
  },

  "Tooltip": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const content = propStr(p, "content", "Tooltip content");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TooltipProvider>\n${indent}  <Tooltip>\n${indent}    <TooltipTrigger${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}    </TooltipTrigger>\n${indent}    <TooltipContent>\n${indent}      <p>${content}</p>\n${indent}    </TooltipContent>\n${indent}  </Tooltip>\n${indent}</TooltipProvider>`;
  },

  "Progress": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const value = propNum(p, "value", 0);
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Progress value={${value}}${tw ? ` className="${tw}"` : ""} />`;
  },

  "HoverCard": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const content = propStr(p, "content", "");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<HoverCard>\n${indent}  <HoverCardTrigger${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}  </HoverCardTrigger>\n${indent}  <HoverCardContent>\n${indent}    ${content || childrenJSX}\n${indent}  </HoverCardContent>\n${indent}</HoverCard>`;
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
    return `${comment(comp, indent)}${indent}<Alert variant="${escapeAttr(variant)}"${tw ? ` className="${escapeAttr(tw)}"` : ""}>\n${title ? `${indent}  <AlertTitle>${escapeText(title)}</AlertTitle>\n` : ""}${description ? `${indent}  <AlertDescription>${escapeText(description)}</AlertDescription>\n` : ""}${childrenJSX}${indent}</Alert>`;
  },

  "Dialog": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "Dialog Title");
    const description = propStr(p, "description", "");
    const triggerLabel = propStr(p, "trigger", "Open");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Dialog>\n${indent}  <DialogTrigger${tw ? ` className="${escapeAttr(tw)}"` : ""}>${escapeText(triggerLabel)}</DialogTrigger>\n${indent}  <DialogContent>\n${indent}    <DialogHeader>\n${indent}      <DialogTitle>${escapeText(title)}</DialogTitle>\n${description ? `${indent}      <DialogDescription>${escapeText(description)}</DialogDescription>\n` : ""}${indent}    </DialogHeader>\n${childrenJSX}${indent}  </DialogContent>\n${indent}</Dialog>`;
  },

  "AlertDialog": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "Are you sure?");
    const description = propStr(p, "description", "");
    const triggerLabel = propStr(p, "trigger", "Open");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<AlertDialog>\n${indent}  <AlertDialogTrigger${tw ? ` className="${escapeAttr(tw)}"` : ""}>${escapeText(triggerLabel)}</AlertDialogTrigger>\n${indent}  <AlertDialogContent>\n${indent}    <AlertDialogHeader>\n${indent}      <AlertDialogTitle>${escapeText(title)}</AlertDialogTitle>\n${description ? `${indent}      <AlertDialogDescription>${escapeText(description)}</AlertDialogDescription>\n` : ""}${indent}    </AlertDialogHeader>\n${childrenJSX}${indent}  </AlertDialogContent>\n${indent}</AlertDialog>`;
  },

  "Toast": (comp, _childrenJSX, indent) => {
    // Toast 不在行内生成 — 由页面级 useToast hook 管理
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "");
    const description = propStr(p, "description", "");
    return `${comment(comp, indent)}${indent}{/* Toast: ${title}${description ? ` — ${description}` : ""} — 由页面级 useToast 钩子管理 */}`;
  },

  "Sheet": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const title = propStr(p, "title", "Sheet");
    const description = propStr(p, "description", "");
    const triggerLabel = propStr(p, "trigger", "Open");
    const side = propStr(p, "side", "right");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Sheet>\n${indent}  <SheetTrigger${tw ? ` className="${escapeAttr(tw)}"` : ""}>${escapeText(triggerLabel)}</SheetTrigger>\n${indent}  <SheetContent side="${escapeAttr(side)}">\n${indent}    <SheetHeader>\n${indent}      <SheetTitle>${escapeText(title)}</SheetTitle>\n${description ? `${indent}      <SheetDescription>${escapeText(description)}</SheetDescription>\n` : ""}${indent}    </SheetHeader>\n${childrenJSX}${indent}  </SheetContent>\n${indent}</Sheet>`;
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
          return `${indent}  <BreadcrumbItem>\n${indent}    <BreadcrumbPage>${escapeText(item.label)}</BreadcrumbPage>\n${indent}  </BreadcrumbItem>`;
        }
        return `${indent}  <BreadcrumbItem>\n${indent}    <BreadcrumbLink href="${escapeAttr(item.href || "#")}">${escapeText(item.label)}</BreadcrumbLink>\n${indent}  </BreadcrumbItem>`;
      })
      .join("\n");
    return `${comment(comp, indent)}${indent}<Breadcrumb${tw ? ` className="${tw}"` : ""}>\n${indent}  <BreadcrumbList>\n${itemsJSX}\n${indent}  </BreadcrumbList>\n${indent}</Breadcrumb>`;
  },

  "Tabs": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const defaultValue = propStr(p, "defaultValue", "tab-0");
    const items = (p?.items as Array<{ label: string; value: string }> | undefined) || [];
    const tw = cx(comp);
    const triggersJSX = items
      .map((item) => `${indent}    <TabsTrigger value="${item.value}">${item.label}</TabsTrigger>`)
      .join("\n");
    return `${comment(comp, indent)}${indent}<Tabs defaultValue="${defaultValue}"${tw ? ` className="${tw}"` : ""}>\n${indent}  <TabsList>\n${triggersJSX}\n${indent}  </TabsList>\n${childrenJSX}${indent}</Tabs>`;
  },

  "NavigationMenu": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const items = (p?.items as Array<{ label: string; href: string }> | undefined) || [];
    const tw = cx(comp);
    const itemsJSX = items
      .map((item) => `${indent}  <NavigationMenuItem>\n${indent}    <NavigationMenuLink href="${escapeAttr(item.href || "#")}">${escapeText(item.label)}</NavigationMenuLink>\n${indent}  </NavigationMenuItem>`)
      .join("\n");
    return `${comment(comp, indent)}${indent}<NavigationMenu${tw ? ` className="${tw}"` : ""}>\n${indent}  <NavigationMenuList>\n${itemsJSX}\n${indent}  </NavigationMenuList>\n${indent}</NavigationMenu>`;
  },

  "Pagination": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const totalPages = propNum(p, "totalPages", 5);
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Pagination${tw ? ` className="${tw}"` : ""}>\n${indent}  <PaginationContent>\n${indent}    <PaginationItem>\n${indent}      <PaginationPrevious href="#" />\n${indent}    </PaginationItem>\n${Array.from({ length: totalPages }, (_, i) => `${indent}    <PaginationItem>\n${indent}      <PaginationLink href="#">${i + 1}</PaginationLink>\n${indent}    </PaginationItem>`).join("\n")}\n${indent}    <PaginationItem>\n${indent}      <PaginationNext href="#" />\n${indent}    </PaginationItem>\n${indent}  </PaginationContent>\n${indent}</Pagination>`;
  },

  "Link": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const href = propStr(p, "href", "#");
    const tw = cx(comp);
    const text = childrenJSX || propStr(p, "text", "Link");
    return `${comment(comp, indent)}${indent}<Link href="${href}"${tw ? ` className="${tw}"` : ""}>${text}</Link>`;
  },

  /* ──────────────────────────────────────────────
   * Data 数据组件
   * ────────────────────────────────────────────── */

  "Table": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Table${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</Table>`;
  },

  "DataTable": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const columns = (p?.columns as Array<{ key: string; header: string }> | undefined) || [];
    const data = (p?.data as Array<Record<string, unknown>> | undefined) || [];
    const tw = cx(comp);
    const headerJSX = columns
      .map((col) => `${indent}      <TableHead>${col.header}</TableHead>`)
      .join("\n");
    const bodyJSX = data
      .map((row, ri) => {
        const cells = columns
          .map((col) => `${indent}        <TableCell>{/* ${String(row[col.key] ?? "")} */}</TableCell>`)
          .join("\n");
        return `${indent}    <TableRow key={${ri}}>\n${cells}\n${indent}    </TableRow>`;
      })
      .join("\n");
    return `${comment(comp, indent)}${indent}<Table${tw ? ` className="${tw}"` : ""}>\n${indent}  <TableHeader>\n${indent}    <TableRow>\n${headerJSX}\n${indent}    </TableRow>\n${indent}  </TableHeader>\n${indent}  <TableBody>\n${bodyJSX}\n${indent}  </TableBody>\n${indent}</Table>`;
  },

  "TableHead": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableHead${tw ? ` className="${tw}"` : ""}>${childrenJSX || propStr(comp.props, "text", "Head")}</TableHead>`;
  },

  "TableBody": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableBody${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</TableBody>`;
  },

  "TableRow": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableRow${tw ? ` className="${tw}"` : ""}>\n${childrenJSX}${indent}</TableRow>`;
  },

  "TableCell": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<TableCell${tw ? ` className="${tw}"` : ""}>${childrenJSX || propStr(comp.props, "text", "Cell")}</TableCell>`;
  },

  "TableCaption": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "");
    return `${comment(comp, indent)}${indent}<TableCaption${tw ? ` className="${tw}"` : ""}>${text}</TableCaption>`;
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
      ? items.map((item) => `${indent}    <DropdownMenuItem>${escapeText(item.label)}</DropdownMenuItem>`).join("\n")
      : childrenJSX || `${indent}    <DropdownMenuItem>Item 1</DropdownMenuItem>`;
    return `${comment(comp, indent)}${indent}<DropdownMenu>\n${indent}  <DropdownMenuTrigger${tw ? ` className="${tw}"` : ""}>${triggerLabel}</DropdownMenuTrigger>\n${indent}  <DropdownMenuContent>\n${itemsJSX}\n${indent}  </DropdownMenuContent>\n${indent}</DropdownMenu>`;
  },

  "Popover": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const triggerLabel = propStr(p, "trigger", "Open");
    const content = propStr(p, "content", "");
    const tw = cx(comp);
    return `${comment(comp, indent)}${indent}<Popover>\n${indent}  <PopoverTrigger${tw ? ` className="${tw}"` : ""}>${triggerLabel}</PopoverTrigger>\n${indent}  <PopoverContent>\n${indent}    ${content || childrenJSX}\n${indent}  </PopoverContent>\n${indent}</Popover>`;
  },

  "ContextMenu": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const items = (p?.items as Array<{ label: string }> | undefined) || [];
    const tw = cx(comp);
    const itemsJSX = items.length
      ? items.map((item) => `${indent}    <ContextMenuItem>${item.label}</ContextMenuItem>`).join("\n")
      : childrenJSX || `${indent}    <ContextMenuItem>Action</ContextMenuItem>`;
    return `${comment(comp, indent)}${indent}<ContextMenu>\n${indent}  <ContextMenuTrigger${tw ? ` className="${tw}"` : ""}>\n${childrenJSX || `${indent}    Right-click here`}\n${indent}  </ContextMenuTrigger>\n${indent}  <ContextMenuContent>\n${itemsJSX}\n${indent}  </ContextMenuContent>\n${indent}</ContextMenu>`;
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
  return `${comment(comp, indent)}${indent}{/* 未映射组件类型: ${comp.type} */}\n${indent}<div${tw ? ` className="${tw}"` : ""}>\n${childrenJSX || `${indent}  {/* ${comp.type} */}`}\n${indent}</div>`;
}
