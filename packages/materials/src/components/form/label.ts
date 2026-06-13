import type { MaterialDefinition } from "../../types/material";

export const labelMaterial: MaterialDefinition = {
  name: "Label",
  displayName: "Label",
  description: "Renders an accessible label for form controls.",
  category: "form",
  icon: "Baseline",
  supportsChildren: true,
  editableProps: [
    {
      key: "htmlFor",
      label: "For Input ID",
      type: "text",
      group: "Behavior",
      order: 1,
      comment: "The id of the form element this label is associated with.",
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
