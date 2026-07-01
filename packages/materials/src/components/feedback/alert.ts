import type { MaterialDefinition } from "../../types/material";

export const alertMaterial: MaterialDefinition = {
  name: "Alert",
  displayName: "Alert",
  description: "A banner for displaying important messages or feedback to the user.",
  category: "feedback",
  icon: "TriangleAlert",
  defaultProps: {
    showTitle: true,
    showDescription: true,
    titleText: "Alert",
    descriptionText: "Alert description...",
  },
  supportsChildren: true,
  isContainer: true,
  liveTextEditing: {
    paths: ["titleText", "descriptionText"],
  },
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
      key: "showTitle",
      label: "Title",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 2,
    },
    {
      key: "titleText",
      label: "Title Text",
      type: "text",
      defaultValue: "Alert",
      group: "Slots",
      order: 3,
    },
    {
      key: "showDescription",
      label: "Description",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 4,
    },
    {
      key: "descriptionText",
      label: "Description Text",
      type: "text",
      defaultValue: "Alert description...",
      group: "Slots",
      order: 5,
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
