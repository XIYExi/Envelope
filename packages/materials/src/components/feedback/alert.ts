import type { MaterialDefinition } from "../../types/material";

export const alertMaterial: MaterialDefinition = {
  name: "Alert",
  displayName: "Alert",
  description: "A banner for displaying important messages or feedback to the user.",
  category: "feedback",
  icon: "TriangleAlert",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "variant",
      label: "Variant",
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Destructive", value: "destructive" },
      ],
      defaultValue: "default",
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
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
    },
  ],
};

export const alertTitleMaterial: MaterialDefinition = {
  name: "AlertTitle",
  displayName: "Alert Title",
  description: "The heading text within an Alert component.",
  category: "feedback",
  icon: "Heading",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};

export const alertDescriptionMaterial: MaterialDefinition = {
  name: "AlertDescription",
  displayName: "Alert Description",
  description: "The body text within an Alert component.",
  category: "feedback",
  icon: "AlignLeft",
  supportsChildren: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};
