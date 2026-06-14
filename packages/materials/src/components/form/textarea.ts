import type { MaterialDefinition } from "../../types/material";

export const textareaMaterial: MaterialDefinition = {
  name: "Textarea",
  displayName: "Textarea",
  description: "A multi-line text input for longer form content.",
  category: "form",
  icon: "Text",
  editableProps: [
    {
      key: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "",
      group: "Content",
      order: 1,
    },
    {
      key: "rows",
      label: "Rows",
      type: "number",
      defaultValue: 3,
      min: 1,
      max: 20,
      group: "Appearance",
      order: 2,
    },
    {
      key: "disabled",
      label: "Disabled",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 3,
    },
    {
      key: "required",
      label: "Required",
      type: "switch",
      defaultValue: false,
      group: "Validation",
      order: 4,
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
