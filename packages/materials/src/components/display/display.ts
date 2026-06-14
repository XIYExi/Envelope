import type { MaterialDefinition } from "../../types/material";

export const avatarMaterial: MaterialDefinition = {
  name: "Avatar",
  displayName: "Avatar",
  description: "An image element with a fallback for user representation.",
  category: "display",
  icon: "UserCircle",
  supportsChildren: true,
  editableProps: [
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

export const badgeMaterial: MaterialDefinition = {
  name: "Badge",
  displayName: "Badge",
  description: "A small count and labeling component.",
  category: "display",
  icon: "Tag",
  supportsChildren: true,
  editableProps: [
    {
      key: "variant",
      label: "Variant",
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
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
  ],
};
