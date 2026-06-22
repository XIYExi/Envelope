import type { MaterialDefinition } from "../../types/material";

export const boxMaterial: MaterialDefinition = {
  name: "Box",
  displayName: "Box",
  description: "A plain div container with no default styling. Use as a building block for custom layout.",
  category: "layout",
  icon: "Square",
  defaultProps: {},
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Apply Tailwind classes for custom layout/styling (e.g., 'p-4 bg-gray-100').",
    },
  ],
};
