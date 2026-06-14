import type { MaterialDefinition } from "../../types/material";

export const checkboxMaterial: MaterialDefinition = {
  name: "Checkbox",
  displayName: "Checkbox",
  description: "A control that allows selecting multiple options from a set.",
  category: "form",
  icon: "CheckSquare",
  supportsChildren: true,
  editableProps: [
    {
      key: "label",
      label: "Label Text",
      type: "text",
      defaultValue: "Checkbox",
      group: "Content",
      order: 1,
    },
    {
      key: "defaultChecked",
      label: "Checked by Default",
      type: "switch",
      defaultValue: false,
      group: "State",
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
