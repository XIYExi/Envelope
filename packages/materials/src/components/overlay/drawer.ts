import type { MaterialDefinition } from "../../types/material";

export const drawerMaterial: MaterialDefinition = {
  name: "Drawer",
  displayName: "Drawer",
  description: "A sliding panel that appears from the bottom for mobile-friendly interactions.",
  category: "overlay",
  icon: "PanelBottom",
  supportsChildren: true,
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
