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

/**
 * Text 文本节点物料定义（内部）
 *
 * 用于在 Schema 的 children tree 中承载纯文本内容（例如聚合组件的 slots）。
 * 该物料默认作为内部组件注册（showInPalette=false），避免污染左侧物料面板。
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
export const textMaterial: MaterialDefinition = {
  name: "Text",
  displayName: "Text",
  description: "Internal text node used for slots/children tree.",
  category: "display",
  icon: "Type",
  supportsChildren: false,
  defaultProps: {
    text: "Text",
  },
  editableProps: [
    {
      key: "text",
      label: "Text",
      type: "text",
      defaultValue: "Text",
      group: "Content",
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
