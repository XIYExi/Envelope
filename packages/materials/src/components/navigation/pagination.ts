import type { MaterialDefinition } from "../../types/material";

export const paginationMaterial: MaterialDefinition = {
  name: "Pagination",
  displayName: "Pagination",
  description: "Navigation control for paginated content across multiple pages.",
  category: "navigation",
  icon: "SkipForward",
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

export const paginationItemMaterial: MaterialDefinition = {
  name: "PaginationItem",
  displayName: "Pagination Item",
  description: "An individual page or action item in pagination.",
  category: "navigation",
  icon: "Square",
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
