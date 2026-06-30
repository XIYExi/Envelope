import type { MaterialDefinition } from "../../types/material";

export const contextMenuMaterial: MaterialDefinition = {
  name: "ContextMenu",
  displayName: "Context Menu",
  description: "A contextual menu that appears on right-click.",
  category: "overlay",
  icon: "Menu",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showContent: true,
    triggerText: "Right click",
    items: ["Action 1", "Action 2", "Action 3"],
  },
  editableProps: [
    {
      key: "showTrigger",
      label: "Trigger",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 1,
    },
    {
      key: "triggerText",
      label: "Trigger Text",
      type: "text",
      defaultValue: "Right click",
      group: "Slots",
      order: 2,
    },
    {
      key: "showContent",
      label: "Content",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 3,
    },
    {
      key: "items",
      label: "Items",
      type: "json",
      defaultValue: ["Action 1", "Action 2", "Action 3"],
      group: "Slots",
      order: 4,
    },
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
    },
  ],
};

export const contextMenuTriggerMaterial: MaterialDefinition = {
  name: "ContextMenuTrigger",
  displayName: "Context Menu Trigger",
  description: "The element that opens the Context Menu on right-click.",
  category: "overlay",
  icon: "MousePointer",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

export const contextMenuContentMaterial: MaterialDefinition = {
  name: "ContextMenuContent",
  displayName: "Context Menu Content",
  description: "The floating panel containing context menu items.",
  category: "overlay",
  icon: "RectangleVertical",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

/**
 * ContextMenuItem 物料定义（内部）
 *
 * 用于 ContextMenuContent 内的菜单项节点。
 * 该物料默认在注册表中以 internal 方式注册（showInPalette=false）。
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
export const contextMenuItemMaterial: MaterialDefinition = {
  name: "ContextMenuItem",
  displayName: "Context Menu Item",
  description: "An individual action item within a Context Menu.",
  category: "overlay",
  icon: "Dot",
  supportsChildren: true,
  editableProps: [
    {
      key: "disabled",
      label: "Disabled",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 1,
    },
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};
