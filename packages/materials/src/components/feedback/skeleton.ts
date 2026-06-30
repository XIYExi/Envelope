import type { MaterialDefinition } from "../../types/material";

export const skeletonMaterial: MaterialDefinition = {
  name: "Skeleton",
  displayName: "Skeleton",
  description: "A placeholder loading state for content.",
  category: "feedback",
  icon: "Loader2",
  editableProps: [
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      defaultValue: "h-4 w-full",
      group: "Styling",
      order: 10,
    },
  ],
};
