export type {
  MaterialDefinition,
  MaterialRegistry,
  EditableProp,
  ComponentCategory,
} from "./types/material";

export {
  materialDefinitionSchema,
  editablePropSchema,
  componentCategorySchema,
  getDefaultValue,
} from "./types/material";

export { createRegistry } from "./registry";
export { createDefaultRegistry } from "./components/index";

// ========== 表单组件 ==========
export { buttonMaterial, inputMaterial, labelMaterial } from "./components/form";
export { textareaMaterial } from "./components/form";
export { checkboxMaterial } from "./components/form";
export { radioGroupMaterial, radioGroupItemMaterial } from "./components/form";
export { selectMaterial, selectItemMaterial } from "./components/form";
export { switchMaterial } from "./components/form";
export { toggleMaterial, toggleGroupMaterial } from "./components/form";
export { sliderMaterial } from "./components/form";

// ========== 布局组件 ==========
export {
  cardMaterial, cardHeaderMaterial, cardContentMaterial, cardFooterMaterial, separatorMaterial,
} from "./components/layout";
export { scrollAreaMaterial } from "./components/layout";
export { aspectRatioMaterial } from "./components/layout";
export { resizablePanelGroupMaterial, resizablePanelMaterial, resizableHandleMaterial } from "./components/layout";

// ========== 展示组件 ==========
export { avatarMaterial, badgeMaterial } from "./components/display";

// ========== 反馈组件 ==========
export { skeletonMaterial } from "./components/feedback";
export { alertMaterial, alertTitleMaterial, alertDescriptionMaterial } from "./components/feedback";
export { progressMaterial } from "./components/feedback";

// ========== 导航组件 ==========
export { tabsMaterial, tabsListMaterial, tabsTriggerMaterial, tabsContentMaterial } from "./components/navigation";
export { breadcrumbMaterial, breadcrumbItemMaterial, breadcrumbLinkMaterial } from "./components/navigation";
export { paginationMaterial, paginationItemMaterial } from "./components/navigation";

// ========== 数据组件 ==========
export {
  tableMaterial, tableHeaderMaterial, tableBodyMaterial,
  tableRowMaterial, tableHeadMaterial, tableCellMaterial,
} from "./components/data";
export { accordionMaterial, accordionItemMaterial, accordionTriggerMaterial, accordionContentMaterial } from "./components/data";

// ========== 弹层组件 ==========
export {
  dialogMaterial, dialogTriggerMaterial, dialogContentMaterial,
  dialogHeaderMaterial, dialogTitleMaterial, dialogDescriptionMaterial, dialogFooterMaterial,
} from "./components/overlay";
export {
  sheetMaterial, sheetTriggerMaterial, sheetContentMaterial,
  sheetHeaderMaterial, sheetTitleMaterial, sheetDescriptionMaterial,
} from "./components/overlay";
export {
  alertDialogMaterial, alertDialogTriggerMaterial, alertDialogContentMaterial,
  alertDialogHeaderMaterial, alertDialogActionMaterial, alertDialogCancelMaterial,
} from "./components/overlay";
export { popoverMaterial, popoverTriggerMaterial, popoverContentMaterial } from "./components/overlay";
export { tooltipMaterial, tooltipTriggerMaterial, tooltipContentMaterial } from "./components/overlay";
export {
  dropdownMenuMaterial, dropdownMenuTriggerMaterial, dropdownMenuContentMaterial, dropdownMenuItemMaterial,
} from "./components/overlay";
export { contextMenuMaterial, contextMenuTriggerMaterial, contextMenuContentMaterial } from "./components/overlay";
export { hoverCardMaterial, hoverCardTriggerMaterial, hoverCardContentMaterial } from "./components/overlay";
export { drawerMaterial, drawerTriggerMaterial, drawerContentMaterial, drawerHeaderMaterial } from "./components/overlay";
export { collapsibleMaterial, collapsibleTriggerMaterial, collapsibleContentMaterial } from "./components/overlay";

export const PACKAGE_NAME = "@envelope/materials";
export const VERSION = "3.0.0";
