import type { MaterialDefinition } from "../../types/material";

export const separatorMaterial: MaterialDefinition = {
  name: "Separator",
  displayName: "Separator",
  description: "A visual divider between content sections.",
  category: "layout",
  icon: "Minus",
  editableProps: [
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
