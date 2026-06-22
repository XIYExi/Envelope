/**
 * Runtime Renderer（ISC-35 Preview）
 *
 * 将编辑器中的 ComponentNode 渲染为“真实的 shadcn/ui 组件”，用于 Preview 模式：
 * - 根节点使用与编辑器一致的 12 列 Grid 布局（来自 CanvasComponent.position）
 * - 子节点按组件结构递归渲染（来自 ComponentNode.children）
 * - 应用页面级样式：pageBackground / pagePadding / pageMaxWidth
 * - 应用节点级样式：tailwindClasses（兼容 props.className 回退）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { CanvasComponent, CanvasState } from "@envelope/engine";
import type { ComponentNode } from "@envelope/engine";

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
      return (
        <Button variant={variant} size={size} className={className} disabled={disabled}>
          {node.children && node.children.length > 0 ? renderChildren(node.children) : label}
        </Button>
      );
    }

    case "Input": {
      const placeholder = str(props, "placeholder");
      const disabled = bool(props, "disabled") ?? false;
      return <Input className={className} placeholder={placeholder} disabled={disabled} />;
    }

    case "Textarea": {
      const placeholder = str(props, "placeholder");
      const disabled = bool(props, "disabled") ?? false;
      return <Textarea className={className} placeholder={placeholder} disabled={disabled} />;
    }

    case "Label": {
      const label = str(props, "label") ?? getFirstTextChild(node) ?? "Label";
      return <Label className={className}>{node.children && node.children.length > 0 ? renderChildren(node.children) : label}</Label>;
    }

    case "Checkbox": {
      const defaultChecked = bool(props, "defaultChecked");
      const disabled = bool(props, "disabled") ?? false;
      return (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <Checkbox defaultChecked={defaultChecked} disabled={disabled} />
          {str(props, "label") ?? getFirstTextChild(node)}
        </span>
      );
    }

    case "RadioGroup": {
      const options = (arr<string>(props, "options") ?? []).filter((v) => typeof v === "string");
      const safeOptions = options.length > 0 ? options : ["Option 1", "Option 2"];
      const defaultValue = str(props, "defaultValue") ?? "0";
      return (
        <RadioGroup className={className} defaultValue={defaultValue}>
          {safeOptions.map((opt, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <RadioGroupItem value={String(idx)} />
              <span>{opt}</span>
            </span>
          ))}
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

      return (
        <Select defaultValue={selected} disabled={disabled}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((it) => (
              <RuntimeNodeRenderer key={it.id} node={it} />
            ))}
          </SelectContent>
        </Select>
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
      return (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <Switch defaultChecked={defaultChecked} disabled={disabled} />
          {str(props, "label") ?? getFirstTextChild(node)}
        </span>
      );
    }

    case "Toggle": {
      const disabled = bool(props, "disabled") ?? false;
      return (
        <Toggle className={className} disabled={disabled}>
          {node.children && node.children.length > 0 ? renderChildren(node.children) : str(props, "label") ?? "Toggle"}
        </Toggle>
      );
    }

    case "ToggleGroup": {
      const type = (str(props, "type") as "single" | "multiple" | undefined) ?? "single";
      const disabled = bool(props, "disabled") ?? false;
      const options = (arr<string>(props, "options") ?? ["A", "B", "C"]).filter((v) => typeof v === "string");
      return (
        <ToggleGroup className={className} type={type} disabled={disabled}>
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
      return <Slider className={className} defaultValue={typeof defaultValue === "number" ? [defaultValue] : undefined} disabled={disabled} />;
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
      return (
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
            {Array.from({ length: rowCount }).map((_, r) => (
              <TableRow key={r}>
                {safeCols.map((c) => (
                  <TableCell key={c}>...</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
