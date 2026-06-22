import type { MaterialDefinition } from "../../types/material";

export const tabsMaterial: MaterialDefinition = {
  name: "Tabs",
  displayName: "Tabs",
  description: "A set of layered sections of content, displayed one at a time.",
  category: "navigation",
  icon: "LayoutPanelTop",
  defaultProps: {
    showList: true,
    showContent: true,
    activeIndex: 0,
    tabs: [
      { label: "Tab 1", content: "Tab content..." },
      { label: "Tab 2", content: "Tab content..." },
      { label: "Tab 3", content: "Tab content..." },
    ],
  },
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "defaultValue",
      label: "Default Tab Value",
      type: "text",
      defaultValue: "",
      group: "Behavior",
      order: 1,
    },
    {
      key: "orientation",
      label: "Orientation",
      type: "select",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
      defaultValue: "horizontal",
      group: "Appearance",
      order: 2,
    },
    {
      key: "showList",
      label: "List",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 3,
    },
    {
      key: "tabs",
      label: "Tabs",
      type: "json",
      defaultValue: [
        { label: "Tab 1", content: "Tab content..." },
        { label: "Tab 2", content: "Tab content..." },
        { label: "Tab 3", content: "Tab content..." },
      ],
      group: "Slots",
      order: 4,
    },
    {
      key: "activeIndex",
      label: "Active Index",
      type: "number",
      defaultValue: 0,
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

export const tabsListMaterial: MaterialDefinition = {
  name: "TabsList",
  displayName: "Tabs List",
  description: "The container for tab triggers within a Tabs component.",
  category: "navigation",
  icon: "Rows3",
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

export const tabsTriggerMaterial: MaterialDefinition = {
  name: "TabsTrigger",
  displayName: "Tabs Trigger",
  description: "A button that activates its associated tab content.",
  category: "navigation",
  icon: "RectangleHorizontal",
  supportsChildren: true,
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

export const tabsContentMaterial: MaterialDefinition = {
  name: "TabsContent",
  displayName: "Tabs Content",
  description: "The content panel associated with a tab trigger.",
  category: "navigation",
  icon: "AlignJustify",
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
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};
