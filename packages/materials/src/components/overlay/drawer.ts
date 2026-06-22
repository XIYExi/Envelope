import type { MaterialDefinition } from "../../types/material";

export const drawerMaterial: MaterialDefinition = {
  name: "Drawer",
  displayName: "Drawer",
  description: "A sliding panel that appears from the bottom for mobile-friendly interactions.",
  category: "overlay",
  icon: "PanelBottom",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showHeader: true,
    showContent: true,
    triggerText: "Open",
    titleText: "Drawer",
    contentText: "Drawer content...",
  },
  editableProps: [
    {
      key: "shouldScaleBackground",
      label: "Scale Background",
      type: "switch",
      defaultValue: true,
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
      defaultValue: "Drawer",
      group: "Slots",
      order: 5,
    },
    {
      key: "showContent",
      label: "Content",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 6,
    },
    {
      key: "contentText",
      label: "Content Text",
      type: "text",
      defaultValue: "Drawer content...",
      group: "Slots",
      order: 7,
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

export const drawerTriggerMaterial: MaterialDefinition = {
  name: "DrawerTrigger",
  displayName: "Drawer Trigger",
  description: "The element that opens the Drawer when clicked.",
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

export const drawerContentMaterial: MaterialDefinition = {
  name: "DrawerContent",
  displayName: "Drawer Content",
  description: "The main content container of a Drawer panel.",
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
  ],
};

export const drawerHeaderMaterial: MaterialDefinition = {
  name: "DrawerHeader",
  displayName: "Drawer Header",
  description: "The header area of a Drawer.",
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
