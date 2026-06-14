import type { MaterialDefinition } from "../../types/material";

export const alertDialogMaterial: MaterialDefinition = {
  name: "AlertDialog",
  displayName: "Alert Dialog",
  description: "A modal that interrupts the user for important confirmations.",
  category: "overlay",
  icon: "AlertTriangle",
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
