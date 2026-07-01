/**
 * V5 Canvas Fidelity — 覆盖层组件静态预览
 *
 * 覆盖层组件（Dialog/Popover/Tooltip 等）在 pointer-events:none 下无法打开 portal。
 * 渲染为静态外观预览，不响应交互。
 *
 * 对齐 lowcode-engine designMode="design"：设计模式下组件不响应交互，只展示外观。
 * @reference lowcode-engine-main/packages/react-simulator-renderer/src/renderer-view.tsx:179
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { PreviewRenderFn } from "./types";
import { pstr } from "./types";

/** 通用静态预览包装：渲染为带虚线边框的标签，不打开 portal */
function staticPreview(label: string, triggerText?: string): React.ReactNode {
  return (
    <div className="inline-flex items-center gap-2 rounded border border-dashed px-3 py-1.5 text-xs" data-design-mode="true">
      <span className="text-muted-foreground">[{label}]</span>
      <span>{triggerText ?? "Trigger"}</span>
    </div>
  );
}

export const renderDialog: PreviewRenderFn = (props, children) => {
  if (children) {
    // 当有 children 时渲染完整 Dialog 结构（用于 Dialog/Trigger/Content 组合场景）
    return <div data-design-mode="true">{children}</div>;
  }
  return staticPreview("Dialog", pstr(props, "triggerText"));
};

export const renderDialogContent = (props: Record<string, unknown>, children?: React.ReactNode) => {
  return (
    <Dialog defaultOpen data-design-mode="true">
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-sm">{pstr(props, "title", "Dialog Title")}</DialogTitle>
          {(props.description as string) && (
            <DialogDescription className="text-xs">{pstr(props, "description", "")}</DialogDescription>
          )}
        </DialogHeader>
        {children ?? <div className="text-xs text-muted-foreground">Dialog content</div>}
      </DialogContent>
    </Dialog>
  );
};

export const renderAlertDialog: PreviewRenderFn = (props, children) => {
  if (children) return <div data-design-mode="true">{children}</div>;
  return staticPreview("AlertDialog", pstr(props, "triggerText"));
};

export const renderAlertDialogContent = (props: Record<string, unknown>, children?: React.ReactNode) => {
  return (
    <AlertDialog defaultOpen data-design-mode="true">
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm">{pstr(props, "title", "Are you sure?")}</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">{pstr(props, "description", "This action cannot be undone.")}</AlertDialogDescription>
        </AlertDialogHeader>
        {children ?? <div className="flex justify-end gap-2"><span className="text-[10px]">Cancel</span><span className="text-[10px] font-semibold">Continue</span></div>}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const renderSheet: PreviewRenderFn = (props, children) => {
  if (children) return <div data-design-mode="true">{children}</div>;
  return staticPreview("Sheet", pstr(props, "triggerText"));
};

export const renderSheetContent = (props: Record<string, unknown>, children?: React.ReactNode) => {
  const side = pstr(props, "side", "right") as "left" | "right" | "top" | "bottom";
  return (
    <Sheet defaultOpen data-design-mode="true">
      <SheetContent side={side} className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-sm">{pstr(props, "title", "Sheet Title")}</SheetTitle>
          <SheetDescription className="text-xs">{pstr(props, "description", "Sheet description")}</SheetDescription>
        </SheetHeader>
        {children ?? <div className="text-xs text-muted-foreground">Sheet content</div>}
      </SheetContent>
    </Sheet>
  );
};

export const renderPopover: PreviewRenderFn = (props, children) => {
  if (children) {
    return (
      <Popover defaultOpen data-design-mode="true">
        <PopoverTrigger className="inline-flex items-center text-xs">
          {pstr(props, "triggerText", "Open")}
        </PopoverTrigger>
        <PopoverContent className="w-48">
          {children}
        </PopoverContent>
      </Popover>
    );
  }
  return staticPreview("Popover", pstr(props, "triggerText"));
};

export const renderTooltip: PreviewRenderFn = (props, children) => {
  return (
    <Tooltip defaultOpen data-design-mode="true">
      <TooltipTrigger className="text-xs underline decoration-dotted">
        {children ?? pstr(props, "triggerText", "Hover me")}
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{pstr(props, "content", "Tooltip text")}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const renderHoverCard: PreviewRenderFn = (props) => {
  return (
    <HoverCard defaultOpen data-design-mode="true">
      <HoverCardTrigger className="text-xs underline decoration-dotted">
        {pstr(props, "triggerText", "Hover")}
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{pstr(props, "title", "Card Title")}</h4>
          <p className="text-xs text-muted-foreground">{pstr(props, "description", "Card description goes here.")}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const renderDrawer: PreviewRenderFn = (props) => {
  return (
    <Drawer defaultOpen data-design-mode="true">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-sm">{pstr(props, "title", "Drawer Title")}</DrawerTitle>
          <DrawerDescription className="text-xs">{pstr(props, "description", "Drawer description")}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-xs text-muted-foreground">Drawer content</div>
      </DrawerContent>
    </Drawer>
  );
};

export const renderDropdownMenu: PreviewRenderFn = (props) => {
  const items = (props.items as string[]) ?? ["Item 1", "Item 2", "Item 3"];
  return (
    <DropdownMenu defaultOpen data-design-mode="true">
      <DropdownMenuTrigger className="inline-flex items-center text-xs">
        {pstr(props, "triggerText", "Menu")}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, i) => (
          <DropdownMenuItem key={i} className="text-xs">{item}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const renderContextMenu: PreviewRenderFn = (props) => {
  const items = (props.items as string[]) ?? ["Copy", "Cut", "Paste"];
  return (
    <div data-design-mode="true">
      <div className="inline-flex items-center text-xs rounded border px-2 py-1 cursor-default">
        {pstr(props, "triggerText", "Right Click")}
      </div>
      <span className="text-[9px] text-muted-foreground ml-2">[ContextMenu: {items.join(", ")}]</span>
    </div>
  );
};

export const renderCollapsible: PreviewRenderFn = (props, children) => {
  return (
    <Collapsible defaultOpen data-design-mode="true">
      <CollapsibleTrigger className="flex items-center gap-1 text-xs font-medium">
        {pstr(props, "triggerText", "Toggle")}
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 space-y-1">
        {children ?? <div className="text-xs text-muted-foreground">Collapsible content</div>}
      </CollapsibleContent>
    </Collapsible>
  );
};
