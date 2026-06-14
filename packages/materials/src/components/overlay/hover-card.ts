import type { MaterialDefinition } from "../../types/material";

export const hoverCardMaterial: MaterialDefinition = {
  name: "HoverCard",
  displayName: "Hover Card",
  description: "A preview card that appears on hover for additional context.",
  category: "overlay",
  icon: "MousePointerSquare",
  supportsChildren: true,
  editableProps: [
    {
      key: "openDelay",
      label: "Open Delay (ms)",
      type: "number",
      defaultValue: 700,
      min: 0,
      max: 3000,
      group: "Behavior",
      order: 1,
    },
    {
      key: "closeDelay",
      label: "Close Delay (ms)",
      type: "number",
      defaultValue: 300,
      min: 0,
      max: 3000,
      group: "Behavior",
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

export const hoverCardTriggerMaterial: MaterialDefinition = {
  name: "HoverCardTrigger",
  displayName: "Hover Card Trigger",
  description: "The element that triggers the Hover Card on hover.",
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

export const hoverCardContentMaterial: MaterialDefinition = {
  name: "HoverCardContent",
  displayName: "Hover Card Content",
  description: "The floating content panel of a Hover Card.",
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
