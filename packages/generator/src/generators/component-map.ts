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
import type { MaterialRegistry, MaterialDefinition } from "@envelope/materials";
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
 * 组合 Tailwind 类名（含兼容逻辑）
 *
 * 约定：
 * - 生成代码以 ComponentNode.tailwindClasses 为准；
 * - 为兼容旧页面 schema / 旧物料写入方式，会回退合并 props.className；
 * - extra 用于生成器内部追加基础布局类（如 flex/grid）。
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function cx(comp: ComponentNode, extra = ""): string {
  const tw = comp.tailwindClasses || "";
  const legacy = typeof (comp.props as Record<string, unknown> | undefined)?.["className"] === "string"
    ? String((comp.props as Record<string, unknown>)["className"])
    : "";
  if (!legacy && !tw && !extra) return "";
  return [legacy, tw, extra].filter(Boolean).join(" ");
}

/**
 * L3~L4: 从组件的 dataBindings 生成 JSX 属性列表
 *
 * 根据绑定格式生成对应的响应式 props：
 * - table.*        → prop={tableData}
 * - table.column   → prop={tableData?.[0]?.column}
 * - {{searchParams.param}} → prop={searchParams?.get("param")}
 *
 * 返回的 attrs 会在生成器中注入到组件 JSX 属性中，
 * 实现数据查询结果回填组件 props 的响应式更新（L3）。
 */
function dataBindingAttrs(comp: ComponentNode): string[] {
  if (!comp.dataBindings) return [];
  const attrs: string[] = [];
  for (const [prop, binding] of Object.entries(comp.dataBindings)) {
    // L5: 搜索参数绑定 — prop={searchParams?.get("name")}
    if (binding.startsWith("{{") && binding.endsWith("}}")) {
      const inner = binding.slice(2, -2).trim();
      const parts = inner.split(".");
      if (parts[0] === "searchParams") {
        const paramName = parts.slice(1).join(".");
        attrs.push(`${prop}={searchParams?.get(${tsStringLiteral(paramName)})}`);
      } else if (parts[0] === "params") {
        const paramName = parts.slice(1).join(".");
        attrs.push(`${prop}={params?.${paramName}}`);
      }
      continue;
    }
    // L4: 表.列 绑定 — prop={tableData?.[0]?.column}
    const dot = binding.indexOf(".");
    if (dot === -1) {
      attrs.push(`${prop}={${binding}Data}`);
    } else {
      const table = binding.slice(0, dot);
      const column = binding.slice(dot + 1);
      if (column === "*") {
        // L4: table.* 绑定 — 绑定整张表数据
        attrs.push(`${prop}={${table}Data}`);
      } else {
        // L4: table.column 绑定 — 取首行单列
        attrs.push(`${prop}={${table}Data?.[0]?.${column}}`);
      }
    }
  }
  return attrs;
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
 * K6: 生成 data-flow-output 响应式属性，驱动组件订阅 Zustand store
 *
 * 每个绑定 flow 生成一条 data-flow-output-{index} 属性，
 * 组件通过 useAppStore 订阅对应 flowId 的执行结果。
 */
/**
 * Domain M: 从组件的 expressionBindings 生成 JSX 属性列表
 *
 * 每个绑定 prop 对应一个表达式引用代码，
 * 在生成的页面中通过 evaluateExpression 求值。
 *
 * @param comp - 组件节点
 * @returns JSX 属性字符串数组
 */
function expressionAttrs(comp: ComponentNode): string[] {
  if (!comp.expressionBindings) return [];
  const attrs: string[] = [];
  for (const [prop, expr] of Object.entries(comp.expressionBindings)) {
    if (typeof expr !== "string" || !expr.trim()) continue;
    attrs.push(`${prop}={evaluateExpression(${tsStringLiteral(expr.trim())}, expressionContext)}`);
  }
  return attrs;
}

function flowOutputAttrs(comp: ComponentNode): string[] {
  if (!comp.eventBindings) return [];
  const attrs: string[] = [];
  let idx = 0;
  for (const raw of Object.values(comp.eventBindings)) {
    const ids: string[] = Array.isArray(raw) ? raw : [String(raw)];
    for (const fid of ids) {
      attrs.push(`data-flow-output-${idx}={useAppStore((s) => s.flowResults[${tsStringLiteral(fid)}])}`);
      idx++;
    }
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
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<div${attrStr}>\n${childrenJSX}${indent}</div>`;
  },

  "Card": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<Card${attrStr}>\n${childrenJSX}${indent}</Card>`;
  },

  "CardHeader": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    if (!childrenJSX) {
      const title = propStr(comp.props, "title");
      const description = propStr(comp.props, "description");
      return `${comment(comp, indent)}${indent}<CardHeader${attrStr}>\n${indent}  <CardTitle>${jsxText(title || "Title")}</CardTitle>\n${description ? `${indent}  <CardDescription>${jsxText(description)}</CardDescription>\n` : ""}${indent}</CardHeader>`;
    }
    return `${comment(comp, indent)}${indent}<CardHeader${attrStr}>\n${childrenJSX}${indent}</CardHeader>`;
  },

  "CardContent": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<CardContent${attrStr}>\n${childrenJSX}${indent}</CardContent>`;
  },

  "CardFooter": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<CardFooter${attrStr}>\n${childrenJSX}${indent}</CardFooter>`;
  },

  "CardTitle": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "Card Title");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<CardTitle${attrStr}>${jsxText(text)}</CardTitle>`;
  },

  "CardDescription": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<CardDescription${attrStr}>${jsxText(text)}</CardDescription>`;
  },

  "FlexCol": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "flex flex-col");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<div${attrStr}>\n${childrenJSX}${indent}</div>`;
  },

  "FlexRow": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "flex flex-row");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<div${attrStr}>\n${childrenJSX}${indent}</div>`;
  },

  "GridContainer": (comp, childrenJSX, indent) => {
    const tw = cx(comp, "grid");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<div${attrStr}>\n${childrenJSX}${indent}</div>`;
  },

  "Grid": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const cols = propNum(p, "columns", 3);
    const rows = propNum(p, "rows", 0);
    const gap = propNum(p, "gap", 4);
    const autoFlow = propStr(p, "autoFlow", "row");
    const justifyItems = propStr(p, "justifyItems", "stretch");
    const alignItems = propStr(p, "alignItems", "stretch");
    const areas = propStr(p, "areas", "");
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const styleParts: string[] = [
      `gridTemplateColumns: "repeat(${cols}, 1fr)"`,
    ];
    if (rows > 0) styleParts.push(`gridTemplateRows: "repeat(${rows}, 1fr)"`);
    styleParts.push(`gridAutoFlow: ${tsStringLiteral(autoFlow)}`);
    styleParts.push(`justifyItems: ${tsStringLiteral(justifyItems)}`);
    styleParts.push(`alignItems: ${tsStringLiteral(alignItems)}`);
    styleParts.push(`gap: "${gap * 4}px"`);
    if (areas) styleParts.push(`gridTemplateAreas: ${tsStringLiteral(areas)}`);
    attrs.push(`style={{ ${styleParts.join(", ")} }}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<div${attrStr}>\n${childrenJSX}${indent}</div>`;
  },

  "Section": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<section${attrStr}>\n${childrenJSX}${indent}</section>`;
  },

  "Separator": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const orientation = propStr(comp.props, "orientation", "horizontal");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    if (orientation !== "horizontal") attrs.push(jsxAttrString("orientation", orientation));
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<Separator${attrStr} />`;
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
    if (defaultValue) attrs.push(jsxAttrString("defaultValue", defaultValue));
    if (p?.cascadeField && p?.cascadeColumn) {
      attrs.push(`data-cascade-field={${tsStringLiteral(String(p.cascadeField))}}`);
      attrs.push(`data-cascade-column={${tsStringLiteral(String(p.cascadeColumn))}}`);
    }
    return `${comment(comp, indent)}${indent}<Select${attrs.length ? " " + attrs.join(" ") : ""}>\n${indent}  <SelectTrigger${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${indent}    <SelectValue ${jsxAttrString("placeholder", placeholder)} />\n${indent}  </SelectTrigger>\n${indent}  <SelectContent>\n${optionsJSX || `${indent}    ${childrenJSX}`}\n${indent}  </SelectContent>\n${indent}</Select>`;
  },

  "Checkbox": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const checked = propBool(p, "checked");
    const disabled = propBool(p, "disabled");
    const tw = cx(comp);
    const label = propStr(p, "label", "");
    const attrs: string[] = [];
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
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
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp), jsxAttrString("placeholder", placeholder)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<DatePicker${attrStr} />`;
  },

  /* ──────────────────────────────────────────────
   * Display 展示组件
   * ────────────────────────────────────────────── */

  "Badge": (comp, childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const variant = propStr(p, "variant", "default");
    const tw = cx(comp);
    const text = childrenJSX || jsxText(propStr(p, "text", "Badge"));
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp), jsxAttrString("variant", variant)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<Badge${attrStr}>${text}</Badge>`;
  },

  "Avatar": (comp, _childrenJSX, indent) => {
    const p = comp.props as Record<string, unknown> | undefined;
    const src = propStr(p, "src", "");
    const fallback = propStr(p, "fallback", "U");
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<Avatar${attrStr}>\n${indent}  <AvatarImage ${jsxAttrString("src", src)} />\n${indent}  <AvatarFallback>${jsxText(fallback)}</AvatarFallback>\n${indent}</Avatar>`;
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
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp), `value={${value}}`];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<Progress${attrStr} />`;
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
    attrs.push(...dataBindingAttrs(comp), ...expressionAttrs(comp));
    attrs.push(...eventAttrs(comp));
    attrs.push(...flowOutputAttrs(comp));
    if (tw) attrs.push(jsxAttrString("className", tw));
    return `${comment(comp, indent)}${indent}<Link${attrs.length ? " " + attrs.join(" ") : ""}>${text}</Link>`;
  },

  /* ──────────────────────────────────────────────
   * Data 数据组件
   * ────────────────────────────────────────────── */

  "Table": (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<Table${attrStr}>\n${childrenJSX}${indent}</Table>`;
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
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<TableHead${attrStr}>${childrenJSX || jsxText(propStr(comp.props, "text", "Head"))}</TableHead>`;
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
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<TableCell${attrStr}>${childrenJSX || jsxText(propStr(comp.props, "text", "Cell"))}</TableCell>`;
  },

  "TableCaption": (comp, _childrenJSX, indent) => {
    const tw = cx(comp);
    const text = propStr(comp.props, "text", "");
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `${comment(comp, indent)}${indent}<TableCaption${attrStr}>${jsxText(text)}</TableCaption>`;
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
 * 默认生成器工厂（策略模式）
 * ================================================================================================ */

/**
 * 为没有显式生成器的物料创建默认生成器
 *
 * 根据物料定义的 name 作为组件标签名，应用 Tailwind 类名、
 * 数据绑定、事件绑定等公共属性。
 * 策略模式：每个物料没有手写生成器时，使用此默认策略渲染。
 *
 * @param material - 物料定义
 * @returns 组件生成器函数
 */
function createDefaultGenerator(material: MaterialDefinition): ComponentGenerator {
  return (comp, childrenJSX, indent) => {
    const tw = cx(comp);
    const attrs: string[] = [...dataBindingAttrs(comp), ...expressionAttrs(comp), ...eventAttrs(comp), ...flowOutputAttrs(comp)];
    if (tw) attrs.push(`className={${tsStringLiteral(tw)}}`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    if (childrenJSX) {
      return `${comment(comp, indent)}${indent}<${material.name}${attrStr}>\n${childrenJSX}${indent}</${material.name}>`;
    }
    return `${comment(comp, indent)}${indent}<${material.name}${attrStr} />`;
  };
}

/**
 * 从注册表动态创建组件映射表
 *
 * 保留所有现有手写生成器（COMPONENT_MAP），
 * 然后遍历注册表中所有物料，为没有手写生成器的物料
 * 用 createDefaultGenerator 补全。
 *
 * 工厂模式：根据注册表的物料列表，自动组装完整的组件映射表。
 *
 * @param registry - 物料注册表（可选）
 * @returns 完整的组件名→生成器映射
 *
 * @example
 * const map = createComponentMap(registry);
 * const jsx = map["Button"]?.(comp, children, indent);
 */
export function createComponentMap(registry?: MaterialRegistry): Record<string, ComponentGenerator> {
  // 保留所有现有手写生成器
  const map: Record<string, ComponentGenerator> = { ...COMPONENT_MAP };

  if (registry) {
    const allMaterials = registry.getAll();
    for (const material of allMaterials) {
      if (!map[material.name]) {
        // 为没有显式生成器的物料创建默认生成器
        map[material.name] = createDefaultGenerator(material);
      }
    }
  }

  return map;
}

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
 * @param registry - 可选物料注册表，提供时用于生成默认生成器
 * @returns 完整的 JSX 代码字符串
 */
export function generateComponentJSX(comp: ComponentNode, depth = 0, registry?: MaterialRegistry): string {
  const indent = "  ".repeat(depth);

  // 递归渲染子组件（传递 registry 以支持深层默认生成器）
  let childrenJSX = "";
  if (comp.children && comp.children.length > 0) {
    childrenJSX = comp.children
      .map((child: ComponentNode) => generateComponentJSX(child, depth + 1, registry))
      .join("\n");
  }

  // 根据 registry 动态构建映射表，优先保留手写生成器
  const componentMap = registry ? createComponentMap(registry) : COMPONENT_MAP;
  const generator = componentMap[comp.type];
  let jsx: string;
  if (generator) {
    jsx = generator(comp, childrenJSX, indent);
  } else {
    // 未映射组件类型 — 生成带注释的 <div> 占位符
    const tw = cx(comp);
    const typeNote = sanitizeJsxComment(String(comp.type));
    jsx = `${comment(comp, indent)}${indent}{/* 未映射组件类型: ${typeNote} */}\n${indent}<div${tw ? ` ${jsxAttrString("className", tw)}` : ""}>\n${childrenJSX || `${indent}  {/* ${typeNote} */}`}\n${indent}</div>`;
  }

  // ===== Domain M: 表达式系统包装层 =====
  // visibleIf 在 repeat 内部（每个 repeat 项独立判断 visibleIf）

  // 1) visibleIf 包装
  if (comp.visibleIf) {
    const cond = comp.visibleIf.trim();
    jsx = `\n${indent}{evaluateExpression(${tsStringLiteral(cond)}, expressionContext) ? (${jsx}\n${indent}) : null}`;
  }

  // 2) repeat 包装（最外层）
  if (comp.repeat) {
    const source = comp.repeat.source;
    const itemName = comp.repeat.itemName || "item";
    const indexName = comp.repeat.indexName || "index";
    jsx = `\n${indent}{evaluateExpressionAsArray(${tsStringLiteral(source)}, expressionContext).map((${itemName}, ${indexName}) => (${jsx}\n${indent}))}`;
  }

  return jsx;
}
