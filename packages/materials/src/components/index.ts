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

import { avatarMaterial, badgeMaterial, textMaterial } from "./display";

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
import { contextMenuMaterial, contextMenuTriggerMaterial, contextMenuContentMaterial, contextMenuItemMaterial } from "./overlay";
import { hoverCardMaterial, hoverCardTriggerMaterial, hoverCardContentMaterial } from "./overlay";
import { drawerMaterial, drawerTriggerMaterial, drawerContentMaterial, drawerHeaderMaterial } from "./overlay";
import { collapsibleMaterial, collapsibleTriggerMaterial, collapsibleContentMaterial } from "./overlay";

let defaultRegistry: MaterialRegistry | null = null;

export function createDefaultRegistry(): MaterialRegistry {
  if (defaultRegistry) return defaultRegistry;

  const registry = createRegistry();

  const internal = <T extends { showInPalette?: boolean }>(def: T): T => ({ ...def, showInPalette: false });

  registry.registerAll([
    // ========== 布局组件 ==========
    cardMaterial,
    internal(cardHeaderMaterial),
    internal(cardContentMaterial),
    internal(cardFooterMaterial),
    separatorMaterial,
    scrollAreaMaterial,
    aspectRatioMaterial,
    resizablePanelGroupMaterial,
    internal(resizablePanelMaterial),
    internal(resizableHandleMaterial),

    // ========== 表单组件 ==========
    buttonMaterial,
    inputMaterial,
    labelMaterial,
    textareaMaterial,
    checkboxMaterial,
    radioGroupMaterial,
    internal(radioGroupItemMaterial),
    selectMaterial,
    internal(selectItemMaterial),
    switchMaterial,
    toggleMaterial,
    toggleGroupMaterial,
    sliderMaterial,

    // ========== 展示组件 ==========
    avatarMaterial,
    badgeMaterial,
    internal(textMaterial),

    // ========== 反馈组件 ==========
    skeletonMaterial,
    alertMaterial,
    internal(alertTitleMaterial),
    internal(alertDescriptionMaterial),
    progressMaterial,

    // ========== 导航组件 ==========
    tabsMaterial,
    internal(tabsListMaterial),
    internal(tabsTriggerMaterial),
    internal(tabsContentMaterial),
    breadcrumbMaterial,
    internal(breadcrumbItemMaterial),
    internal(breadcrumbLinkMaterial),
    paginationMaterial,
    internal(paginationItemMaterial),

    // ========== 数据组件 ==========
    tableMaterial,
    internal(tableHeaderMaterial),
    internal(tableBodyMaterial),
    internal(tableRowMaterial),
    internal(tableHeadMaterial),
    internal(tableCellMaterial),
    accordionMaterial,
    internal(accordionItemMaterial),
    internal(accordionTriggerMaterial),
    internal(accordionContentMaterial),

    // ========== 弹层组件 ==========
    dialogMaterial,
    internal(dialogTriggerMaterial),
    internal(dialogContentMaterial),
    internal(dialogHeaderMaterial),
    internal(dialogTitleMaterial),
    internal(dialogDescriptionMaterial),
    internal(dialogFooterMaterial),
    sheetMaterial,
    internal(sheetTriggerMaterial),
    internal(sheetContentMaterial),
    internal(sheetHeaderMaterial),
    internal(sheetTitleMaterial),
    internal(sheetDescriptionMaterial),
    alertDialogMaterial,
    internal(alertDialogTriggerMaterial),
    internal(alertDialogContentMaterial),
    internal(alertDialogHeaderMaterial),
    internal(alertDialogActionMaterial),
    internal(alertDialogCancelMaterial),
    popoverMaterial,
    internal(popoverTriggerMaterial),
    internal(popoverContentMaterial),
    tooltipMaterial,
    internal(tooltipTriggerMaterial),
    internal(tooltipContentMaterial),
    dropdownMenuMaterial,
    internal(dropdownMenuTriggerMaterial),
    internal(dropdownMenuContentMaterial),
    internal(dropdownMenuItemMaterial),
    contextMenuMaterial,
    internal(contextMenuTriggerMaterial),
    internal(contextMenuContentMaterial),
    internal(contextMenuItemMaterial),
    hoverCardMaterial,
    internal(hoverCardTriggerMaterial),
    internal(hoverCardContentMaterial),
    drawerMaterial,
    internal(drawerTriggerMaterial),
    internal(drawerContentMaterial),
    internal(drawerHeaderMaterial),
    collapsibleMaterial,
    internal(collapsibleTriggerMaterial),
    internal(collapsibleContentMaterial),
  ]);

  defaultRegistry = registry;
  return registry;
}
