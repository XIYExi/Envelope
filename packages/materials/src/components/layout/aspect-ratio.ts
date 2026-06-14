import type { MaterialDefinition } from "../../types/material";

export const aspectRatioMaterial: MaterialDefinition = {
  name: "AspectRatio",
  displayName: "Aspect Ratio",
  description: "A container that maintains a fixed aspect ratio for its content.",
  category: "layout",
  icon: "Crop",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "ratio",
      label: "Ratio",
      type: "number",
      defaultValue: 1,
      min: 0.1,
      max: 10,
      group: "Appearance",
      order: 1,
      comment: "Width / Height ratio. 16/9 = 1.778, 4/3 = 1.333, 1/1 = 1.",
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
