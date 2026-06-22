import type { MaterialDefinition } from "../../types/material";

export const dialogMaterial: MaterialDefinition = {
  name: "Dialog",
  displayName: "Dialog",
  description: "A modal window that appears over the page for focused interactions.",
  category: "overlay",
  icon: "Monitor",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showHeader: true,
    showDescription: true,
    showFooter: true,
    triggerText: "Open",
    titleText: "Dialog title",
    descriptionText: "Dialog description...",
    primaryActionText: "Confirm",
    secondaryActionText: "Cancel",
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
      defaultValue: "Open",
      group: "Slots",
      order: 2,
    },
    {
      key: "showHeader",
      label: "Header",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 3,
    },
    {
      key: "titleText",
      label: "Title Text",
      type: "text",
      defaultValue: "Dialog title",
      group: "Slots",
      order: 4,
    },
    {
      key: "showDescription",
      label: "Description",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 5,
    },
    {
      key: "descriptionText",
      label: "Description Text",
      type: "text",
      defaultValue: "Dialog description...",
      group: "Slots",
      order: 6,
    },
    {
      key: "showFooter",
      label: "Footer",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 7,
    },
    {
      key: "primaryActionText",
      label: "Primary Action Text",
      type: "text",
      defaultValue: "Confirm",
      group: "Slots",
      order: 8,
    },
    {
      key: "secondaryActionText",
      label: "Secondary Action Text",
      type: "text",
      defaultValue: "Cancel",
      group: "Slots",
      order: 9,
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

export const dialogTriggerMaterial: MaterialDefinition = {
  name: "DialogTrigger",
  displayName: "Dialog Trigger",
  description: "The element that opens the Dialog when clicked.",
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

export const dialogContentMaterial: MaterialDefinition = {
  name: "DialogContent",
  displayName: "Dialog Content",
  description: "The main content container of a Dialog modal.",
  category: "overlay",
  icon: "RectangleHorizontal",
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
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
    },
  ],
};

export const dialogHeaderMaterial: MaterialDefinition = {
  name: "DialogHeader",
  displayName: "Dialog Header",
  description: "The header area of a Dialog containing title and description.",
  category: "overlay",
  icon: "PanelTop",
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

export const dialogTitleMaterial: MaterialDefinition = {
  name: "DialogTitle",
  displayName: "Dialog Title",
  description: "The accessible title heading for a Dialog.",
  category: "overlay",
  icon: "Heading",
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

export const dialogDescriptionMaterial: MaterialDefinition = {
  name: "DialogDescription",
  displayName: "Dialog Description",
  description: "The accessible description text below the Dialog title.",
  category: "overlay",
  icon: "AlignLeft",
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

export const dialogFooterMaterial: MaterialDefinition = {
  name: "DialogFooter",
  displayName: "Dialog Footer",
  description: "The footer area of a Dialog, typically for action buttons.",
  category: "overlay",
  icon: "PanelBottom",
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
