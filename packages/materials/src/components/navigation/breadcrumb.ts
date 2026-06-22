import type { MaterialDefinition } from "../../types/material";

export const breadcrumbMaterial: MaterialDefinition = {
  name: "Breadcrumb",
  displayName: "Breadcrumb",
  description: "A navigation aid showing the user's location in a hierarchy.",
  category: "navigation",
  icon: "Slash",
  defaultProps: {
    items: ["Home", "Page", "Current"],
  },
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    {
      key: "items",
      label: "Items",
      type: "json",
      defaultValue: ["Home", "Page", "Current"],
      group: "Slots",
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

export const breadcrumbItemMaterial: MaterialDefinition = {
  name: "BreadcrumbItem",
  displayName: "Breadcrumb Item",
  description: "An individual item within a Breadcrumb navigation.",
  category: "navigation",
  icon: "ChevronRight",
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

export const breadcrumbLinkMaterial: MaterialDefinition = {
  name: "BreadcrumbLink",
  displayName: "Breadcrumb Link",
  description: "A clickable link within a Breadcrumb item.",
  category: "navigation",
  icon: "Link",
  supportsChildren: true,
  editableProps: [
    {
      key: "href",
      label: "URL",
      type: "text",
      defaultValue: "#",
      group: "Behavior",
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
