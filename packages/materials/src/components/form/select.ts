import type { MaterialDefinition } from "../../types/material";

export const selectMaterial: MaterialDefinition = {
  name: "Select",
  displayName: "Select",
  description: "Displays a list of options for the user to pick from, triggered by a button.",
  category: "form",
  icon: "ChevronDown",
  supportsChildren: true,
  editableProps: [
    {
      key: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "Select an option",
      group: "Content",
      order: 1,
    },
    {
      key: "disabled",
      label: "Disabled",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 2,
    },
    {
      key: "required",
      label: "Required",
      type: "switch",
      defaultValue: false,
      group: "Validation",
      order: 3,
    },
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Apply to the Select trigger button.",
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

export const selectItemMaterial: MaterialDefinition = {
  name: "SelectItem",
  displayName: "Select Item",
  description: "An individual option within a Select component.",
  category: "form",
  icon: "Dot",
  supportsChildren: true,
  editableProps: [
    {
      key: "value",
      label: "Value",
      type: "text",
      defaultValue: "",
      required: true,
      group: "Behavior",
      order: 1,
    },
    {
      key: "label",
      label: "Label",
      type: "text",
      defaultValue: "Option",
      group: "Content",
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
  ],
};
