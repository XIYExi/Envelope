import type { MaterialDefinition } from "../../types/material";

export const collapsibleMaterial: MaterialDefinition = {
  name: "Collapsible",
  displayName: "Collapsible",
  description: "A component that toggles visibility of its content on click.",
  category: "overlay",
  icon: "ChevronsUpDown",
  supportsChildren: true,
  defaultProps: {
    triggerText: "Toggle",
    contentText: "Collapsible content...",
    showTrigger: true,
    showContent: true,
  },
  bindableEvents: ["onOpenChange"],
  editableProps: [
    {
      key: "defaultOpen",
      label: "Open by Default",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 1,
    },
    {
      key: "disabled",
      label: "Disabled",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 2,
    },
    {
      key: "showTrigger",
      label: "Trigger",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 3,
    },
    {
      key: "triggerText",
      label: "Trigger Text",
      type: "text",
      defaultValue: "Toggle",
      group: "Slots",
      order: 4,
    },
    {
      key: "showContent",
      label: "Content",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 5,
    },
    {
      key: "contentText",
      label: "Content Text",
      type: "text",
      defaultValue: "Collapsible content...",
      group: "Slots",
      order: 6,
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

export const collapsibleTriggerMaterial: MaterialDefinition = {
  name: "CollapsibleTrigger",
  displayName: "Collapsible Trigger",
  description: "The element that toggles the Collapsible content.",
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

export const collapsibleContentMaterial: MaterialDefinition = {
  name: "CollapsibleContent",
  displayName: "Collapsible Content",
  description: "The content that expands and collapses.",
  category: "overlay",
  icon: "AlignJustify",
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
