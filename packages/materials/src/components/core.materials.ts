import type { MaterialDefinition } from "../types/material";

export const buttonMaterial: MaterialDefinition = {
  name: "Button",
  displayName: "Button",
  description: "Triggers an action or event, such as submitting a form or opening a dialog.",
  category: "form",
  icon: "SquareMousePointer",
  supportsChildren: true,
  defaultProps: {
    variant: "default",
    size: "default",
  },
  editableProps: [
    {
      key: "variant",
      label: "Variant",
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Secondary", value: "secondary" },
        { label: "Ghost", value: "ghost" },
        { label: "Link", value: "link" },
      ],
      defaultValue: "default",
      group: "Appearance",
      order: 1,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Large", value: "lg" },
        { label: "Icon", value: "icon" },
      ],
      defaultValue: "default",
      group: "Appearance",
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
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Additional Tailwind CSS classes for the button.",
    },
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
      comment: "Documentation note that will appear in generated code.",
    },
  ],
};

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

export const labelMaterial: MaterialDefinition = {
  name: "Label",
  displayName: "Label",
  description: "Renders an accessible label for form controls.",
  category: "form",
  icon: "Baseline",
  supportsChildren: true,
  editableProps: [
    {
      key: "htmlFor",
      label: "For Input ID",
      type: "text",
      group: "Behavior",
      order: 1,
      comment: "The id of the form element this label is associated with.",
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

export const separatorMaterial: MaterialDefinition = {
  name: "Separator",
  displayName: "Separator",
  description: "A visual divider between content sections.",
  category: "layout",
  icon: "Minus",
  editableProps: [
    {
      key: "orientation",
      label: "Orientation",
      type: "select",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
      defaultValue: "horizontal",
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
      group: "Styling",
      order: 10,
      defaultValue: "h-4 w-full",
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
