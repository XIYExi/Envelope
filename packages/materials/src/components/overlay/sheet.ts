import type { MaterialDefinition } from "../../types/material";

export const sheetMaterial: MaterialDefinition = {
  name: "Sheet",
  displayName: "Sheet",
  description: "A panel that slides in from the edge of the screen.",
  category: "overlay",
  icon: "PanelRight",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showHeader: true,
    showContent: true,
    triggerText: "Open",
    titleText: "Sheet",
    descriptionText: "Sheet description...",
    bodyText: "Sheet content...",
  },
  editableProps: [
    {
      key: "side",
      label: "Slide From",
      type: "select",
      options: [
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
      ],
      defaultValue: "right",
      group: "Appearance",
      order: 1,
    },
    {
      key: "showTrigger",
      label: "Trigger",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 2,
    },
    {
      key: "triggerText",
      label: "Trigger Text",
      type: "text",
      defaultValue: "Open",
      group: "Slots",
      order: 3,
    },
    {
      key: "showHeader",
      label: "Header",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 4,
    },
    {
      key: "titleText",
      label: "Title Text",
      type: "text",
      defaultValue: "Sheet",
      group: "Slots",
      order: 5,
    },
    {
      key: "descriptionText",
      label: "Description Text",
      type: "text",
      defaultValue: "Sheet description...",
      group: "Slots",
      order: 6,
    },
    {
      key: "showContent",
      label: "Content",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 7,
    },
    {
      key: "bodyText",
      label: "Body Text",
      type: "text",
      defaultValue: "Sheet content...",
      group: "Slots",
      order: 8,
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

export const sheetTriggerMaterial: MaterialDefinition = {
  name: "SheetTrigger",
  displayName: "Sheet Trigger",
  description: "The element that opens the Sheet when clicked.",
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

export const sheetContentMaterial: MaterialDefinition = {
  name: "SheetContent",
  displayName: "Sheet Content",
  description: "The main content container of a Sheet panel.",
  category: "overlay",
  icon: "RectangleHorizontal",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "side",
      label: "Slide From",
      type: "select",
      options: [
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
      ],
      defaultValue: "right",
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

export const sheetHeaderMaterial: MaterialDefinition = {
  name: "SheetHeader",
  displayName: "Sheet Header",
  description: "The header area of a Sheet containing title and description.",
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

export const sheetTitleMaterial: MaterialDefinition = {
  name: "SheetTitle",
  displayName: "Sheet Title",
  description: "The accessible title heading for a Sheet.",
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

export const sheetDescriptionMaterial: MaterialDefinition = {
  name: "SheetDescription",
  displayName: "Sheet Description",
  description: "The accessible description text below the Sheet title.",
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
