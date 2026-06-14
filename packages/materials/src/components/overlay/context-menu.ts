import type { MaterialDefinition } from "../../types/material";

export const contextMenuMaterial: MaterialDefinition = {
  name: "ContextMenu",
  displayName: "Context Menu",
  description: "A contextual menu that appears on right-click.",
  category: "overlay",
  icon: "Menu",
  supportsChildren: true,
  editableProps: [
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
