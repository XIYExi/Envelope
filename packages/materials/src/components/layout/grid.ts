import type { MaterialDefinition } from "../../types/material";

export const gridMaterial: MaterialDefinition = {
  name: "Grid",
  displayName: "Grid",
  description: "A CSS Grid container with configurable columns. Great for responsive layouts.",
  category: "layout",
  icon: "Grid3x3",
  defaultProps: {
    columns: 3,
    gap: "4",
  },
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "columns",
      label: "Columns",
      type: "number",
      defaultValue: 3,
      min: 1,
      max: 12,
      group: "Layout",
      order: 1,
    },
    {
      key: "gap",
      label: "Gap",
      type: "text",
      defaultValue: "4",
      group: "Layout",
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
