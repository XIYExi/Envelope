/**
 * V5 Canvas Fidelity — previewRender 注册入口
 *
 * 在 platform 应用初始化时调用 registerPreviewRenderers(registry)，
 * 为每个物料注入真实 shadcn 组件渲染函数。
 *
 * UnifiedSimulatedContent (engine) 已优先检查 previewRender（lines 90-104），
 * 有 previewRender 时使用真实渲染，无时 fallback 到 switch-case 模拟渲染。
 *
 * 对齐 lowcode-engine SimulatorRendererContainer.buildComponents() 的组件解析模式。
 * @reference lowcode-engine-main/packages/react-simulator-renderer/src/renderer.ts:362-372
 */

import type { MaterialRegistry } from "@envelope/materials";
import type { PreviewRenderFn } from "./types";

// 表单组件
import {
  renderButton, renderInput, renderLabel, renderTextarea,
  renderCheckbox, renderSwitch, renderSlider, renderToggle,
  renderToggleGroup, renderSelect,
} from "./form";

// 展示组件
import {
  renderAvatar, renderBadge, renderAlert, renderProgress,
  renderSkeleton, renderText, renderBreadcrumb, renderPagination,
} from "./display";

// 布局容器
import {
  renderCard, renderCardHeader, renderCardContent, renderCardFooter,
  renderSeparator, renderScrollArea, renderAspectRatio,
  renderBox, renderFlex, renderContainer, renderGrid, renderForm,
} from "./layout";

// 复合组件
import {
  renderTabs, renderTabsContent, renderAccordion,
  renderTable, renderResizablePanelGroup,
} from "./composite";

// 覆盖层组件
import {
  renderDialog, renderDialogContent,
  renderAlertDialog, renderAlertDialogContent,
  renderSheet, renderSheetContent,
  renderPopover, renderTooltip, renderHoverCard,
  renderDrawer, renderDropdownMenu, renderContextMenu,
  renderCollapsible,
} from "./overlay";

/**
 * 物料名称 → 真实渲染函数的映射表
 *
 * 未在此表中的物料将 fallback 到 SimulatedContent switch-case。
 */
const RENDERERS: Record<string, PreviewRenderFn> = {
  // 表单组件 (10)
  Button: renderButton,
  Input: renderInput,
  Label: renderLabel,
  Textarea: renderTextarea,
  Checkbox: renderCheckbox,
  Switch: renderSwitch,
  Slider: renderSlider,
  Toggle: renderToggle,
  ToggleGroup: renderToggleGroup,
  Select: renderSelect,

  // 展示组件 (8)
  Avatar: renderAvatar,
  Badge: renderBadge,
  Alert: renderAlert,
  Progress: renderProgress,
  Skeleton: renderSkeleton,
  Text: renderText,
  Breadcrumb: renderBreadcrumb,
  Pagination: renderPagination,

  // 布局容器 (11)
  Card: renderCard,
  CardHeader: renderCardHeader,
  CardContent: renderCardContent,
  CardFooter: renderCardFooter,
  Separator: renderSeparator,
  ScrollArea: renderScrollArea,
  AspectRatio: renderAspectRatio,
  Box: renderBox,
  Flex: renderFlex,
  Container: renderContainer,
  Grid: renderGrid,

  // Form (1)
  Form: renderForm,

  // 复合组件 (5)
  Tabs: renderTabs,
  TabsContent: renderTabsContent,
  Accordion: renderAccordion,
  Table: renderTable,
  ResizablePanelGroup: renderResizablePanelGroup,

  // 覆盖层组件 (16)
  Dialog: renderDialog,
  DialogContent: renderDialogContent,
  AlertDialog: renderAlertDialog,
  AlertDialogContent: renderAlertDialogContent,
  Sheet: renderSheet,
  SheetContent: renderSheetContent,
  Popover: renderPopover,
  Tooltip: renderTooltip,
  HoverCard: renderHoverCard,
  Drawer: renderDrawer,
  DropdownMenu: renderDropdownMenu,
  ContextMenu: renderContextMenu,
  Collapsible: renderCollapsible,
};

/**
 * 为物料注册表中的物料注入 previewRender
 *
 * 在 createDefaultRegistry() 之后调用：
 * ```ts
 * const registry = createDefaultRegistry();
 * registerPreviewRenderers(registry);
 * setMaterialRegistry(registry);
 * ```
 *
 * @param registry - 物料注册表实例
 */
export function registerPreviewRenderers(registry: MaterialRegistry): void {
  for (const [name, renderFn] of Object.entries(RENDERERS)) {
    const def = registry.get(name);
    if (def) {
      (def as Record<string, unknown>).previewRender = renderFn;
    }
  }
}

// Re-export types
export type { PreviewRenderFn } from "./types";
export { filterDesignProps } from "./types";
