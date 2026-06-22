import type { MaterialDefinition } from "../../types/material";

export const paginationMaterial: MaterialDefinition = {
  name: "Pagination",
  displayName: "Pagination",
  description: "Navigation control for paginated content across multiple pages.",
  category: "navigation",
  icon: "SkipForward",
  supportsChildren: true,
  defaultProps: {
    pageCount: 5,
    currentPage: 1,
    showPrevNext: true,
  },
  editableProps: [
    {
      key: "pageCount",
      label: "Pages",
      type: "number",
      defaultValue: 5,
      group: "Slots",
      order: 1,
    },
    {
      key: "currentPage",
      label: "Current Page",
      type: "number",
      defaultValue: 1,
      group: "Slots",
      order: 2,
    },
    {
      key: "showPrevNext",
      label: "Prev/Next",
      type: "switch",
      defaultValue: true,
      group: "Slots",
      order: 3,
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
