import type { MaterialDefinition } from "../../types/material";

export const scrollAreaMaterial: MaterialDefinition = {
  name: "ScrollArea",
  displayName: "Scroll Area",
  description: "A scrollable container with custom scrollbar styling.",
  category: "layout",
  icon: "Scroll",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "orientation",
      label: "Orientation",
      type: "select",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
        { label: "Both", value: "both" },
      ],
      defaultValue: "vertical",
      group: "Appearance",
      order: 1,
    },
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Set height/width to constrain the scrollable area.",
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
