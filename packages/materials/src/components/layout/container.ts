import type { MaterialDefinition } from "../../types/material";

export const containerMaterial: MaterialDefinition = {
  name: "Container",
  displayName: "Container",
  description: "A centered container with configurable max-width. Use for page-level content wrapping.",
  category: "layout",
  icon: "AlignCenter",
  defaultProps: {
    maxWidth: 1200,
  },
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "maxWidth",
      label: "Max Width (px)",
      type: "number",
      defaultValue: 1200,
      min: 320,
      max: 1920,
      group: "Layout",
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
