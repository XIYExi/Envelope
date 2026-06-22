import type { MaterialDefinition } from "../../types/material";

export const tooltipMaterial: MaterialDefinition = {
  name: "Tooltip",
  displayName: "Tooltip",
  description: "A small popup that displays on hover, providing additional info.",
  category: "overlay",
  icon: "Info",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showContent: true,
    triggerText: "Hover me",
    contentText: "Tooltip content...",
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
      defaultValue: "Hover me",
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
      key: "contentText",
      label: "Content Text",
      type: "text",
      defaultValue: "Tooltip content...",
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

export const tooltipTriggerMaterial: MaterialDefinition = {
  name: "TooltipTrigger",
  displayName: "Tooltip Trigger",
  description: "The element that triggers the Tooltip on hover.",
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

export const tooltipContentMaterial: MaterialDefinition = {
  name: "TooltipContent",
  displayName: "Tooltip Content",
  description: "The content displayed inside the Tooltip popup.",
  category: "overlay",
  icon: "MessageSquare",
  supportsChildren: true,
  editableProps: [
    {
      key: "side",
      label: "Side",
      type: "select",
      options: [
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      defaultValue: "top",
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
