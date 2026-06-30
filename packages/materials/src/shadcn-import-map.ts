/**
 * shadcn/ui 组件导入路径映射表
 *
 * 集中维护所有物料对应的 shadcn/ui 导入声明。
 * 生成器不再独立维护 SHADCN_IMPORT_MAP，改为从此处读取。
 * 新增组件只需在此新增一行 + 新增物料定义文件（ISC-J4）。
 *
 * key: 物料 name（如 "Button"、"Card"）
 * value: { path: 导入路径, components: 需要从该路径导入的组件名列表 }
 *
 * 子组件（如 CardHeader）的 components 为空数组，表示不额外导入（已通过父组件覆盖）。
 *
 * @author xiye
 * @date 2026-06-23
 */
export const SHADCN_IMPORT_MAP_DATA: Record<string, { path: string; components: string[] }> = {
  // ===== Layout 布局组件 =====
  "Card": { path: "@/components/ui/card", components: ["Card", "CardHeader", "CardFooter", "CardTitle", "CardDescription", "CardContent"] },
  "CardHeader": { path: "@/components/ui/card", components: [] },
  "CardContent": { path: "@/components/ui/card", components: [] },
  "CardFooter": { path: "@/components/ui/card", components: [] },
  "CardTitle": { path: "@/components/ui/card", components: [] },
  "CardDescription": { path: "@/components/ui/card", components: [] },
  "Separator": { path: "@/components/ui/separator", components: ["Separator"] },
  "ScrollArea": { path: "@/components/ui/scroll-area", components: ["ScrollArea"] },
  "AspectRatio": { path: "@/components/ui/aspect-ratio", components: ["AspectRatio"] },
  "ResizablePanelGroup": { path: "@/components/ui/resizable", components: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"] },
  "ResizablePanel": { path: "@/components/ui/resizable", components: [] },
  "ResizableHandle": { path: "@/components/ui/resizable", components: [] },

  // ===== HTML 基础元素（无 shadcn 导入，渲染为原生 div/等） =====
  "Box": { path: "", components: [] },
  "Flex": { path: "", components: [] },
  "Container": { path: "", components: [] },
  "Grid": { path: "", components: [] },

  // ===== Form 表单组件 =====
  "Button": { path: "@/components/ui/button", components: ["Button"] },
  "Input": { path: "@/components/ui/input", components: ["Input"] },
  "Textarea": { path: "@/components/ui/textarea", components: ["Textarea"] },
  "Select": { path: "@/components/ui/select", components: ["Select", "SelectContent", "SelectItem", "SelectTrigger", "SelectValue"] },
  "SelectItem": { path: "@/components/ui/select", components: [] },
  "Checkbox": { path: "@/components/ui/checkbox", components: ["Checkbox"] },
  "Switch": { path: "@/components/ui/switch", components: ["Switch"] },
  "RadioGroup": { path: "@/components/ui/radio-group", components: ["RadioGroup", "RadioGroupItem"] },
  "RadioGroupItem": { path: "@/components/ui/radio-group", components: [] },
  "Label": { path: "@/components/ui/label", components: ["Label"] },
  "Toggle": { path: "@/components/ui/toggle", components: ["Toggle"] },
  "ToggleGroup": { path: "@/components/ui/toggle-group", components: ["ToggleGroup", "ToggleGroupItem"] },
  "Slider": { path: "@/components/ui/slider", components: ["Slider"] },
  "FormItem": { path: "@/components/ui/form", components: ["FormItem"] },

  // ===== Display 展示组件 =====
  "Badge": { path: "@/components/ui/badge", components: ["Badge"] },
  "Avatar": { path: "@/components/ui/avatar", components: ["Avatar", "AvatarImage", "AvatarFallback"] },

  // ===== Feedback 反馈组件 =====
  "Skeleton": { path: "@/components/ui/skeleton", components: ["Skeleton"] },
  "Alert": { path: "@/components/ui/alert", components: ["Alert", "AlertDescription", "AlertTitle"] },
  "AlertTitle": { path: "@/components/ui/alert", components: [] },
  "AlertDescription": { path: "@/components/ui/alert", components: [] },
  "Progress": { path: "@/components/ui/progress", components: ["Progress"] },

  // ===== Navigation 导航组件 =====
  "Tabs": { path: "@/components/ui/tabs", components: ["Tabs", "TabsContent", "TabsList", "TabsTrigger"] },
  "TabsList": { path: "@/components/ui/tabs", components: [] },
  "TabsTrigger": { path: "@/components/ui/tabs", components: [] },
  "TabsContent": { path: "@/components/ui/tabs", components: [] },
  "Breadcrumb": { path: "@/components/ui/breadcrumb", components: ["Breadcrumb", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbList", "BreadcrumbPage", "BreadcrumbSeparator"] },
  "BreadcrumbItem": { path: "@/components/ui/breadcrumb", components: [] },
  "BreadcrumbLink": { path: "@/components/ui/breadcrumb", components: [] },
  "Pagination": { path: "@/components/ui/pagination", components: ["Pagination", "PaginationContent", "PaginationEllipsis", "PaginationItem", "PaginationLink", "PaginationNext", "PaginationPrevious"] },
  "PaginationItem": { path: "@/components/ui/pagination", components: [] },

  // ===== Data 数据组件 =====
  "Table": { path: "@/components/ui/table", components: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"] },
  "TableHeader": { path: "@/components/ui/table", components: [] },
  "TableBody": { path: "@/components/ui/table", components: [] },
  "TableRow": { path: "@/components/ui/table", components: [] },
  "TableHead": { path: "@/components/ui/table", components: [] },
  "TableCell": { path: "@/components/ui/table", components: [] },
  "Accordion": { path: "@/components/ui/accordion", components: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"] },
  "AccordionItem": { path: "@/components/ui/accordion", components: [] },
  "AccordionContent": { path: "@/components/ui/accordion", components: [] },
  "AccordionTrigger": { path: "@/components/ui/accordion", components: [] },

  // ===== Overlay 弹层组件 =====
  "Dialog": { path: "@/components/ui/dialog", components: ["Dialog", "DialogContent", "DialogDescription", "DialogHeader", "DialogTitle", "DialogTrigger", "DialogFooter"] },
  "DialogTrigger": { path: "@/components/ui/dialog", components: [] },
  "DialogContent": { path: "@/components/ui/dialog", components: [] },
  "DialogHeader": { path: "@/components/ui/dialog", components: [] },
  "DialogTitle": { path: "@/components/ui/dialog", components: [] },
  "DialogDescription": { path: "@/components/ui/dialog", components: [] },
  "DialogFooter": { path: "@/components/ui/dialog", components: [] },
  "Sheet": { path: "@/components/ui/sheet", components: ["Sheet", "SheetContent", "SheetDescription", "SheetHeader", "SheetTitle", "SheetTrigger"] },
  "SheetTrigger": { path: "@/components/ui/sheet", components: [] },
  "SheetContent": { path: "@/components/ui/sheet", components: [] },
  "SheetHeader": { path: "@/components/ui/sheet", components: [] },
  "SheetTitle": { path: "@/components/ui/sheet", components: [] },
  "SheetDescription": { path: "@/components/ui/sheet", components: [] },
  "AlertDialog": { path: "@/components/ui/alert-dialog", components: ["AlertDialog", "AlertDialogAction", "AlertDialogCancel", "AlertDialogContent", "AlertDialogDescription", "AlertDialogFooter", "AlertDialogHeader", "AlertDialogTitle", "AlertDialogTrigger"] },
  "AlertDialogTrigger": { path: "@/components/ui/alert-dialog", components: [] },
  "AlertDialogContent": { path: "@/components/ui/alert-dialog", components: [] },
  "AlertDialogHeader": { path: "@/components/ui/alert-dialog", components: [] },
  "AlertDialogAction": { path: "@/components/ui/alert-dialog", components: [] },
  "AlertDialogCancel": { path: "@/components/ui/alert-dialog", components: [] },
  "Popover": { path: "@/components/ui/popover", components: ["Popover", "PopoverContent", "PopoverTrigger"] },
  "PopoverTrigger": { path: "@/components/ui/popover", components: [] },
  "PopoverContent": { path: "@/components/ui/popover", components: [] },
  "Tooltip": { path: "@/components/ui/tooltip", components: ["Tooltip", "TooltipContent", "TooltipProvider", "TooltipTrigger"] },
  "TooltipTrigger": { path: "@/components/ui/tooltip", components: [] },
  "TooltipContent": { path: "@/components/ui/tooltip", components: [] },
  "DropdownMenu": { path: "@/components/ui/dropdown-menu", components: ["DropdownMenu", "DropdownMenuContent", "DropdownMenuItem", "DropdownMenuGroup", "DropdownMenuLabel", "DropdownMenuSeparator", "DropdownMenuTrigger", "DropdownMenuShortcut"] },
  "DropdownMenuTrigger": { path: "@/components/ui/dropdown-menu", components: [] },
  "DropdownMenuContent": { path: "@/components/ui/dropdown-menu", components: [] },
  "DropdownMenuItem": { path: "@/components/ui/dropdown-menu", components: [] },
  "ContextMenu": { path: "@/components/ui/context-menu", components: ["ContextMenu", "ContextMenuContent", "ContextMenuItem", "ContextMenuSeparator", "ContextMenuTrigger"] },
  "ContextMenuTrigger": { path: "@/components/ui/context-menu", components: [] },
  "ContextMenuContent": { path: "@/components/ui/context-menu", components: [] },
  "ContextMenuItem": { path: "@/components/ui/context-menu", components: [] },
  "HoverCard": { path: "@/components/ui/hover-card", components: ["HoverCard", "HoverCardContent", "HoverCardTrigger"] },
  "HoverCardTrigger": { path: "@/components/ui/hover-card", components: [] },
  "HoverCardContent": { path: "@/components/ui/hover-card", components: [] },
  "Drawer": { path: "@/components/ui/drawer", components: ["Drawer", "DrawerContent", "DrawerDescription", "DrawerHeader", "DrawerTitle", "DrawerTrigger", "DrawerFooter"] },
  "DrawerTrigger": { path: "@/components/ui/drawer", components: [] },
  "DrawerContent": { path: "@/components/ui/drawer", components: [] },
  "DrawerHeader": { path: "@/components/ui/drawer", components: [] },
  "Collapsible": { path: "@/components/ui/collapsible", components: ["Collapsible", "CollapsibleContent", "CollapsibleTrigger"] },
  "CollapsibleTrigger": { path: "@/components/ui/collapsible", components: [] },
  "CollapsibleContent": { path: "@/components/ui/collapsible", components: [] },
};
