import type { MaterialDefinition } from "../../types/material";

export const collapsibleMaterial: MaterialDefinition = {
  name: "Collapsible",
  displayName: "Collapsible",
  description: "A component that toggles visibility of its content on click.",
  category: "overlay",
  icon: "ChevronsUpDown",
  supportsChildren: true,
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
