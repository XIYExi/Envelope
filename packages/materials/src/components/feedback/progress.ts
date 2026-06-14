import type { MaterialDefinition } from "../../types/material";

export const progressMaterial: MaterialDefinition = {
  name: "Progress",
  displayName: "Progress",
  description: "Displays an indicator showing the completion progress of a task.",
  category: "feedback",
  icon: "Loader",
  editableProps: [
    {
      key: "value",
      label: "Value",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 100,
      group: "Behavior",
      order: 1,
    },
    {
      key: "max",
      label: "Maximum",
      type: "number",
      defaultValue: 100,
      min: 1,
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
