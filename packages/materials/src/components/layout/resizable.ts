import type { MaterialDefinition } from "../../types/material";

export const resizablePanelGroupMaterial: MaterialDefinition = {
  name: "ResizablePanelGroup",
  displayName: "Resizable Panel Group",
  description: "A container of panels that can be resized by dragging handles between them.",
  category: "layout",
  icon: "Columns2",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "direction",
      label: "Direction",
      type: "select",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
      defaultValue: "horizontal",
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

export const resizablePanelMaterial: MaterialDefinition = {
  name: "ResizablePanel",
  displayName: "Resizable Panel",
  description: "A resizable panel within a Resizable Panel Group.",
  category: "layout",
  icon: "RectangleVertical",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "defaultSize",
      label: "Default Size (%)",
      type: "number",
      defaultValue: 50,
      min: 1,
      max: 99,
      group: "Behavior",
      order: 1,
    },
    {
      key: "minSize",
      label: "Minimum Size (%)",
      type: "number",
      defaultValue: 10,
      min: 1,
      max: 99,
      group: "Behavior",
      order: 2,
    },
    {
      key: "maxSize",
      label: "Maximum Size (%)",
      type: "number",
      defaultValue: 90,
      min: 1,
      max: 99,
      group: "Behavior",
      order: 3,
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

export const resizableHandleMaterial: MaterialDefinition = {
  name: "ResizableHandle",
  displayName: "Resizable Handle",
  description: "The draggable divider between resizable panels.",
  category: "layout",
  icon: "GripVertical",
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
