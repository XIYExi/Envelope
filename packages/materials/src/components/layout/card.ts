import type { MaterialDefinition } from "../../types/material";

export const cardMaterial: MaterialDefinition = {
  name: "Card",
  displayName: "Card",
  description: "A container for grouping related content and actions.",
  category: "layout",
  icon: "Square",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Apply to the Card root element.",
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

export const cardHeaderMaterial: MaterialDefinition = {
  name: "CardHeader",
  displayName: "Card Header",
  description: "Header section of a Card component.",
  category: "layout",
  icon: "PanelTop",
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

export const cardContentMaterial: MaterialDefinition = {
  name: "CardContent",
  displayName: "Card Content",
  description: "Main content area of a Card.",
  category: "layout",
  icon: "AlignJustify",
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

export const cardFooterMaterial: MaterialDefinition = {
  name: "CardFooter",
  displayName: "Card Footer",
  description: "Footer section of a Card, typically for actions.",
  category: "layout",
  icon: "PanelBottom",
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
