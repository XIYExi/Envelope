/**
 * 聚合组件 Slot 配置注册表
 *
 * 声明式描述各组件的 slots ↔ children 映射关系。
 * 所有复杂组件使用 customMapper 指向专用处理函数。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { AggregateSlotConfig } from "./slot-engine-types";
import { cardMapper } from "./slot-mappers/card";
import { tabsMapper } from "./slot-mappers/tabs";
import { accordionMapper } from "./slot-mappers/accordion";
import { tableMapper } from "./slot-mappers/table";
import { paginationMapper } from "./slot-mappers/pagination";
import { overlayMapper } from "./slot-mappers/overlay";
import { drawerMapper } from "./slot-mappers/drawer";
import { menuMapper } from "./slot-mappers/menu";
import { selectMapper } from "./slot-mappers/select";
import { radioGroupMapper } from "./slot-mappers/radio-group";
import { breadcrumbMapper } from "./slot-mappers/breadcrumb";
import { popoverMapper, tooltipMapper, hoverCardMapper } from "./slot-mappers/popup";
import { collapsibleMapper } from "./slot-mappers/collapsible";
import { resizablePanelGroupMapper } from "./slot-mappers/resizable-panel-group";

/** 完整配置注册表 */
export const SLOT_CONFIGS: Record<string, AggregateSlotConfig> = {
  // ===== 容器/布局 — 复杂 mapper =====
  Card: { type: "Card", customMapper: cardMapper },
  Tabs: { type: "Tabs", customMapper: tabsMapper },
  Accordion: { type: "Accordion", customMapper: accordionMapper },
  Table: { type: "Table", customMapper: tableMapper },
  Pagination: { type: "Pagination", customMapper: paginationMapper },

  // ===== 覆盖层 — 复杂 mapper =====
  Dialog: { type: "Dialog", customMapper: overlayMapper },
  Sheet: { type: "Sheet", customMapper: overlayMapper },
  AlertDialog: { type: "AlertDialog", customMapper: overlayMapper },
  Drawer: { type: "Drawer", customMapper: drawerMapper },

  // ===== 菜单 — 复杂 mapper =====
  DropdownMenu: { type: "DropdownMenu", customMapper: menuMapper },
  ContextMenu: { type: "ContextMenu", customMapper: menuMapper },

  // ===== 表单组件 — custom mapper =====
  Select: { type: "Select", customMapper: selectMapper },
  RadioGroup: { type: "RadioGroup", customMapper: radioGroupMapper },

  // ===== 导航 — custom mapper =====
  Breadcrumb: { type: "Breadcrumb", customMapper: breadcrumbMapper },

  // ===== 弹出层 — custom mapper =====
  Popover: { type: "Popover", customMapper: popoverMapper },
  Tooltip: { type: "Tooltip", customMapper: tooltipMapper },
  HoverCard: { type: "HoverCard", customMapper: hoverCardMapper },

  // ===== 折叠/面板 — custom mapper =====
  Collapsible: { type: "Collapsible", customMapper: collapsibleMapper },
  ResizablePanelGroup: { type: "ResizablePanelGroup", customMapper: resizablePanelGroupMapper },

  // ===== 简单组件 — 声明式（引擎处理） =====
  Alert: {
    type: "Alert",
    slots: [
      { propKey: "showTitle", kind: "boolean", default: true, controlsVisibility: "titleText" },
      { propKey: "titleText", kind: "text", default: "Alert", childType: "AlertTitle" },
      { propKey: "showDescription", kind: "boolean", default: true, controlsVisibility: "descriptionText" },
      { propKey: "descriptionText", kind: "text", default: "Alert description...", childType: "AlertDescription" },
    ],
  },
};
