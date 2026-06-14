import type { MaterialDefinition } from "../../types/material";

export const popoverMaterial: MaterialDefinition = {
  name: "Popover",
  displayName: "Popover",
  description: "A floating card that appears on click, for supplemental content.",
  category: "overlay",
  icon: "MessageSquare",
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

export const popoverTriggerMaterial: MaterialDefinition = {
  name: "PopoverTrigger",
  displayName: "Popover Trigger",
  description: "The element that opens the Popover when clicked.",
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

export const popoverContentMaterial: MaterialDefinition = {
  name: "PopoverContent",
  displayName: "Popover Content",
  description: "The floating content container of a Popover.",
  category: "overlay",
  icon: "RectangleHorizontal",
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
      key: "side",
      label: "Side",
      type: "select",
      options: [
        { label: "Bottom", value: "bottom" },
        { label: "Top", value: "top" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      defaultValue: "bottom",
      group: "Appearance",
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
