import { createRegistry } from "../registry";
import type { MaterialRegistry } from "../types/material";

import { cardMaterial, cardHeaderMaterial, cardContentMaterial, cardFooterMaterial, separatorMaterial } from "./layout";
import { scrollAreaMaterial } from "./layout";
import { aspectRatioMaterial } from "./layout";
import { resizablePanelGroupMaterial, resizablePanelMaterial, resizableHandleMaterial } from "./layout";

import { buttonMaterial, inputMaterial, labelMaterial } from "./form";
import { textareaMaterial } from "./form";
import { checkboxMaterial } from "./form";
import { radioGroupMaterial, radioGroupItemMaterial } from "./form";
import { selectMaterial, selectItemMaterial } from "./form";
import { switchMaterial } from "./form";
import { toggleMaterial, toggleGroupMaterial } from "./form";
import { sliderMaterial } from "./form";

import { avatarMaterial, badgeMaterial } from "./display";

import { skeletonMaterial } from "./feedback";
import { alertMaterial, alertTitleMaterial, alertDescriptionMaterial } from "./feedback";
import { progressMaterial } from "./feedback";

import { tabsMaterial, tabsListMaterial, tabsTriggerMaterial, tabsContentMaterial } from "./navigation";
import { breadcrumbMaterial, breadcrumbItemMaterial, breadcrumbLinkMaterial } from "./navigation";
import { paginationMaterial, paginationItemMaterial } from "./navigation";

import { tableMaterial, tableHeaderMaterial, tableBodyMaterial, tableRowMaterial, tableHeadMaterial, tableCellMaterial } from "./data";
import { accordionMaterial, accordionItemMaterial, accordionTriggerMaterial, accordionContentMaterial } from "./data";

import {
  dialogMaterial, dialogTriggerMaterial, dialogContentMaterial,
  dialogHeaderMaterial, dialogTitleMaterial, dialogDescriptionMaterial, dialogFooterMaterial,
} from "./overlay";
import {
  sheetMaterial, sheetTriggerMaterial, sheetContentMaterial,
  sheetHeaderMaterial, sheetTitleMaterial, sheetDescriptionMaterial,
} from "./overlay";
import {
  alertDialogMaterial, alertDialogTriggerMaterial, alertDialogContentMaterial,
  alertDialogHeaderMaterial, alertDialogActionMaterial, alertDialogCancelMaterial,
} from "./overlay";
import { popoverMaterial, popoverTriggerMaterial, popoverContentMaterial } from "./overlay";
import { tooltipMaterial, tooltipTriggerMaterial, tooltipContentMaterial } from "./overlay";
import { dropdownMenuMaterial, dropdownMenuTriggerMaterial, dropdownMenuContentMaterial, dropdownMenuItemMaterial } from "./overlay";
import { contextMenuMaterial, contextMenuTriggerMaterial, contextMenuContentMaterial } from "./overlay";
import { hoverCardMaterial, hoverCardTriggerMaterial, hoverCardContentMaterial } from "./overlay";
import { drawerMaterial, drawerTriggerMaterial, drawerContentMaterial, drawerHeaderMaterial } from "./overlay";
import { collapsibleMaterial, collapsibleTriggerMaterial, collapsibleContentMaterial } from "./overlay";

let defaultRegistry: MaterialRegistry | null = null;

export function createDefaultRegistry(): MaterialRegistry {
  if (defaultRegistry) return defaultRegistry;

  const registry = createRegistry();

  registry.registerAll([
    // ========== 布局组件 ==========
    cardMaterial,
    cardHeaderMaterial,
    cardContentMaterial,
    cardFooterMaterial,
    separatorMaterial,
    scrollAreaMaterial,
    aspectRatioMaterial,
    resizablePanelGroupMaterial,
    resizablePanelMaterial,
    resizableHandleMaterial,

    // ========== 表单组件 ==========
    buttonMaterial,
    inputMaterial,
    labelMaterial,
    textareaMaterial,
    checkboxMaterial,
    radioGroupMaterial,
    radioGroupItemMaterial,
    selectMaterial,
    selectItemMaterial,
    switchMaterial,
    toggleMaterial,
    toggleGroupMaterial,
    sliderMaterial,

    // ========== 展示组件 ==========
    avatarMaterial,
    badgeMaterial,

    // ========== 反馈组件 ==========
    skeletonMaterial,
    alertMaterial,
    alertTitleMaterial,
    alertDescriptionMaterial,
    progressMaterial,

    // ========== 导航组件 ==========
    tabsMaterial,
    tabsListMaterial,
    tabsTriggerMaterial,
    tabsContentMaterial,
    breadcrumbMaterial,
    breadcrumbItemMaterial,
    breadcrumbLinkMaterial,
    paginationMaterial,
    paginationItemMaterial,

    // ========== 数据组件 ==========
    tableMaterial,
    tableHeaderMaterial,
    tableBodyMaterial,
    tableRowMaterial,
    tableHeadMaterial,
    tableCellMaterial,
    accordionMaterial,
    accordionItemMaterial,
    accordionTriggerMaterial,
    accordionContentMaterial,

    // ========== 弹层组件 ==========
    dialogMaterial,
    dialogTriggerMaterial,
    dialogContentMaterial,
    dialogHeaderMaterial,
    dialogTitleMaterial,
    dialogDescriptionMaterial,
    dialogFooterMaterial,
    sheetMaterial,
    sheetTriggerMaterial,
    sheetContentMaterial,
    sheetHeaderMaterial,
    sheetTitleMaterial,
    sheetDescriptionMaterial,
    alertDialogMaterial,
    alertDialogTriggerMaterial,
    alertDialogContentMaterial,
    alertDialogHeaderMaterial,
    alertDialogActionMaterial,
    alertDialogCancelMaterial,
    popoverMaterial,
    popoverTriggerMaterial,
    popoverContentMaterial,
    tooltipMaterial,
    tooltipTriggerMaterial,
    tooltipContentMaterial,
    dropdownMenuMaterial,
    dropdownMenuTriggerMaterial,
    dropdownMenuContentMaterial,
    dropdownMenuItemMaterial,
    contextMenuMaterial,
    contextMenuTriggerMaterial,
    contextMenuContentMaterial,
    hoverCardMaterial,
    hoverCardTriggerMaterial,
    hoverCardContentMaterial,
    drawerMaterial,
    drawerTriggerMaterial,
    drawerContentMaterial,
    drawerHeaderMaterial,
    collapsibleMaterial,
    collapsibleTriggerMaterial,
    collapsibleContentMaterial,
  ]);

  defaultRegistry = registry;
  return registry;
}
