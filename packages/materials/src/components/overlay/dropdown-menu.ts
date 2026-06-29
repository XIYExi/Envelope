import type { MaterialDefinition } from "../../types/material";

export const dropdownMenuMaterial: MaterialDefinition = {
  name: "DropdownMenu",
  displayName: "Dropdown Menu",
  description: "A contextual menu that drops down from a trigger element.",
  category: "overlay",
  icon: "ChevronDown",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showContent: true,
    triggerText: "Open",
    items: ["Item 1", "Item 2", "Item 3"],
  },
  bindableEvents: ["onOpenChange", "onSelect"],
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
      defaultValue: "Open",
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
      defaultValue: ["Item 1", "Item 2", "Item 3"],
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

export const dropdownMenuTriggerMaterial: MaterialDefinition = {
  name: "DropdownMenuTrigger",
  displayName: "Dropdown Trigger",
  description: "The element that opens the Dropdown Menu when clicked.",
  category: "overlay",
  icon: "MousePointerClick",
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

export const dropdownMenuContentMaterial: MaterialDefinition = {
  name: "DropdownMenuContent",
  displayName: "Dropdown Content",
  description: "The dropdown panel containing menu items.",
  category: "overlay",
  icon: "RectangleVertical",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "align",
      label: "Alignment",
      type: "select",
      options: [
        { label: "Center", value: "center" },
        { label: "Start", value: "start" },
        { label: "End", value: "end" },
      ],
      defaultValue: "center",
      group: "Appearance",
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

export const dropdownMenuItemMaterial: MaterialDefinition = {
  name: "DropdownMenuItem",
  displayName: "Dropdown Item",
  description: "An individual item within a Dropdown Menu.",
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
