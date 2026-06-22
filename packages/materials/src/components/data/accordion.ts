import type { MaterialDefinition } from "../../types/material";

export const accordionMaterial: MaterialDefinition = {
  name: "Accordion",
  displayName: "Accordion",
  description: "A vertically stacked set of expandable and collapsible sections.",
  category: "data",
  icon: "ChevronsUpDown",
  defaultProps: {
    items: [
      { title: "Section 1", content: "Accordion content..." },
      { title: "Section 2", content: "Accordion content..." },
    ],
  },
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "type",
      label: "Selection Type",
      type: "select",
      options: [
        { label: "Single", value: "single" },
        { label: "Multiple", value: "multiple" },
      ],
      defaultValue: "single",
      group: "Behavior",
      order: 1,
    },
    {
      key: "collapsible",
      label: "Collapsible",
      type: "switch",
      defaultValue: true,
      group: "Behavior",
      order: 2,
      comment: "Allow all items to be collapsed.",
    },
    {
      key: "items",
      label: "Items",
      type: "json",
      defaultValue: [
        { title: "Section 1", content: "Accordion content..." },
        { title: "Section 2", content: "Accordion content..." },
      ],
      group: "Slots",
      order: 3,
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

export const accordionItemMaterial: MaterialDefinition = {
  name: "AccordionItem",
  displayName: "Accordion Item",
  description: "A single collapsible section within an Accordion.",
  category: "data",
  icon: "PanelBottom",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "value",
      label: "Value",
      type: "text",
      defaultValue: "",
      required: true,
      group: "Behavior",
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
  ],
};

export const accordionTriggerMaterial: MaterialDefinition = {
  name: "AccordionTrigger",
  displayName: "Accordion Trigger",
  description: "The clickable header that expands and collapses its content.",
  category: "data",
  icon: "ChevronDown",
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

export const accordionContentMaterial: MaterialDefinition = {
  name: "AccordionContent",
  displayName: "Accordion Content",
  description: "The collapsible content panel within an Accordion item.",
  category: "data",
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
