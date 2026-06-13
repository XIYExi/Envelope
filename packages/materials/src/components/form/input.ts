import type { MaterialDefinition } from "../../types/material";

export const inputMaterial: MaterialDefinition = {
  name: "Input",
  displayName: "Input",
  description: "A form input field for text entry.",
  category: "form",
  icon: "Type",
  defaultProps: {
    type: "text",
    placeholder: "",
  },
  editableProps: [
    {
      key: "type",
      label: "Input Type",
      type: "select",
      options: [
        { label: "Text", value: "text" },
        { label: "Email", value: "email" },
        { label: "Password", value: "password" },
        { label: "Number", value: "number" },
        { label: "URL", value: "url" },
      ],
      defaultValue: "text",
      group: "Behavior",
      order: 1,
    },
    {
      key: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "",
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
