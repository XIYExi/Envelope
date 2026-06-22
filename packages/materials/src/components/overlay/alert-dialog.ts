import type { MaterialDefinition } from "../../types/material";

export const alertDialogMaterial: MaterialDefinition = {
  name: "AlertDialog",
  displayName: "Alert Dialog",
  description: "A modal that interrupts the user for important confirmations.",
  category: "overlay",
  icon: "AlertTriangle",
  supportsChildren: true,
  defaultProps: {
    showTrigger: true,
    showHeader: true,
    showDescription: true,
    showActions: true,
    showCancel: true,
    triggerText: "Open",
    titleText: "Are you absolutely sure?",
    descriptionText: "This action cannot be undone.",
    actionText: "Continue",
    cancelText: "Cancel",
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
      defaultValue: "Are you absolutely sure?",
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
      defaultValue: "This action cannot be undone.",
      group: "Slots",
      order: 6,
    },
    {
      key: "showActions",
      label: "Actions",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 7,
    },
    {
      key: "actionText",
      label: "Action Text",
      type: "text",
      defaultValue: "Continue",
      group: "Slots",
      order: 8,
    },
    {
      key: "showCancel",
      label: "Cancel",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 9,
    },
    {
      key: "cancelText",
      label: "Cancel Text",
      type: "text",
      defaultValue: "Cancel",
      group: "Slots",
      order: 10,
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

export const alertDialogTriggerMaterial: MaterialDefinition = {
  name: "AlertDialogTrigger",
  displayName: "Alert Dialog Trigger",
  description: "The element that opens the Alert Dialog when clicked.",
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

export const alertDialogContentMaterial: MaterialDefinition = {
  name: "AlertDialogContent",
  displayName: "Alert Dialog Content",
  description: "The main content container of an Alert Dialog.",
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

export const alertDialogHeaderMaterial: MaterialDefinition = {
  name: "AlertDialogHeader",
  displayName: "Alert Dialog Header",
  description: "The header area of an Alert Dialog.",
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

export const alertDialogActionMaterial: MaterialDefinition = {
  name: "AlertDialogAction",
  displayName: "Alert Dialog Action",
  description: "The confirm/action button in an Alert Dialog.",
  category: "overlay",
  icon: "Check",
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

export const alertDialogCancelMaterial: MaterialDefinition = {
  name: "AlertDialogCancel",
  displayName: "Alert Dialog Cancel",
  description: "The cancel button in an Alert Dialog.",
  category: "overlay",
  icon: "X",
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
