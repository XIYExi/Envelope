/**
 * 模拟内容协调器
 *
 * 协调表单类组件（simulated-components-form.tsx）和布局类组件（simulated-components-layout.tsx）的渲染，
 * 提供统一入口 UnifiedSimulatedContent 和子组件插槽 ChildrenSlot。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";
import type { CanvasComponent } from "./types";
import type { ComponentNode } from "../schemas/page.schema";
import { getMaterialRegistry } from "../shared/canvas-utils";

/** 子节点选中回调上下文 */
export const SelectChildContext = React.createContext<((nodeId: string) => void) | null>(null);

import {
  renderButton, renderInput, renderTextarea, renderLabel, renderCheckbox,
  renderRadioGroup, renderSwitch, renderSelect, renderSlider, renderToggle,
  renderToggleGroup, renderAvatar, renderBadge, renderSkeleton, renderAlert,
  renderProgress, renderBreadcrumb, renderPagination,
} from "./simulated-components-form";

import {
  renderCard, renderCardHeader, renderCardContent, renderCardFooter,
  renderTabs, renderTabsContent, renderAccordion,
  renderTable, renderBox, renderFlex, renderContainer, renderGrid,
  renderForm, renderSeparator, renderScrollArea, renderAspectRatio,
  renderResizablePanelGroup,
} from "./simulated-components-layout";

import {
  renderDialogSheetContent, renderDialog, renderAlertDialog, renderSheet,
  renderPopover, renderTooltip, renderHoverCard, renderDrawer, renderMenu,
  renderCollapsible, renderFallback,
} from "./simulated-components-overlay";

/**
 * 渲染嵌套子组件列表
 *
 * 用于容器组件内部子组件的渲染。
 * 当 children 为空或不存在时返回 null。
 */
export function ChildrenSlot({ components, onSelectChild: explicitOnSelectChild }: { components: ComponentNode[]; onSelectChild?: (nodeId: string) => void }) {
  const contextOnSelectChild = React.useContext(SelectChildContext);
  const resolvedOnSelectChild = explicitOnSelectChild ?? contextOnSelectChild;

  if (!components || components.length === 0) return null;
  return (
    <div className="space-y-1">
      {components.map((child) => {
        const childCanvasComp: CanvasComponent = {
          id: child.id,
          node: child,
          position: { x: 1, y: 1, width: 1, height: 1 },
        };
        return (
          <UnifiedSimulatedContent key={child.id} comp={childCanvasComp} variant="child" onSelectChild={resolvedOnSelectChild ?? undefined} />
        );
      })}
    </div>
  );
}

/**
 * 模拟组件视觉呈现（统一版本）
 *
 * 合并原 SimulatedContent 和 SimulatedChildContent 功能，
 * 通过 variant 控制根级/子组件样式。
 */
export function UnifiedSimulatedContent({ comp, variant = "root", onSelectChild }: { comp: CanvasComponent; variant?: "root" | "child"; onSelectChild?: (nodeId: string) => void }) {
  const { type } = comp.node;
  const isCompact = variant === "child";

  // A7: 优先检查物料注册表中的 previewRender 覆盖
  if (!isCompact) {
    const registry = getMaterialRegistry();
    if (registry) {
      const def = registry.get(type);
      if (def?.previewRender) {
        const children = comp.node.children ?? [];
        const rendered = def.previewRender(
          (comp.node.props ?? {}) as Record<string, unknown>,
          children.length > 0 ? <ChildrenSlot components={children} /> : undefined,
        );
        if (rendered != null) return <>{rendered}</>;
      }
    }
  }

  const props: Parameters<typeof renderButton>[0] = { comp, variant, onSelectChild };

  switch (type) {
    // 表单组件
    case "Button": return renderButton(props);
    case "Input": return renderInput(props);
    case "Textarea": return renderTextarea(props);
    case "Label": return renderLabel(props);
    case "Checkbox": return renderCheckbox(props);
    case "RadioGroup": return renderRadioGroup(props);
    case "Switch": return renderSwitch(props);
    case "Select": return renderSelect(props);
    case "Slider": return renderSlider(props);
    case "Toggle": return renderToggle(props);
    case "ToggleGroup": return renderToggleGroup(props);
    case "Avatar": return renderAvatar(props);
    case "Badge": return renderBadge(props);
    case "Skeleton": return renderSkeleton(props);
    case "Alert": return renderAlert(props);
    case "Progress": return renderProgress(props);
    case "Breadcrumb": return renderBreadcrumb(props);
    case "Pagination": return renderPagination(props);

    // 布局/容器组件
    case "Card": return renderCard(props);
    case "CardHeader": return renderCardHeader(props);
    case "CardContent": return renderCardContent(props);
    case "CardFooter": return renderCardFooter(props);
    case "DialogContent":
    case "SheetContent":
    case "AlertDialogContent": return renderDialogSheetContent(props);
    case "Tabs": return renderTabs(props);
    case "TabsContent": return renderTabsContent(props);
    case "Accordion": return renderAccordion(props);
    case "Table": return renderTable(props);
    case "Box": return renderBox(props);
    case "Flex": return renderFlex(props);
    case "Container": return renderContainer(props);
    case "Grid": return renderGrid(props);
    case "Form": return renderForm(props);
    case "Separator": return renderSeparator(props);
    case "ScrollArea": return renderScrollArea(props);
    case "AspectRatio": return renderAspectRatio(props);
    case "ResizablePanelGroup": return renderResizablePanelGroup(props);
    case "Dialog": return renderDialog(props);
    case "AlertDialog": return renderAlertDialog(props);
    case "Sheet": return renderSheet(props);
    case "Popover": return renderPopover(props);
    case "Tooltip": return renderTooltip(props);
    case "HoverCard": return renderHoverCard(props);
    case "Drawer": return renderDrawer(props);
    case "DropdownMenu":
    case "ContextMenu": return renderMenu(props);
    case "Collapsible": return renderCollapsible(props);

    default: return renderFallback(props);
  }
}
