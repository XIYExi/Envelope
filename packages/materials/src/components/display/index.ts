/**
 * 展示组件物料定义
 *
 * 定义了展示类组件的物料信息：
 * - Avatar: 用户头像组件
 * - Badge: 标签/徽章组件
 *
 * 展示组件主要用于数据展示，不处理用户输入。
 *
 * @author xiye
 * @date 2026/6/14
 */
import type { MaterialDefinition } from "../../types/material";

/**
 * Avatar 物料定义
 *
 * 用户头像组件，支持图片显示和 fallback 回退。
 * 当图片加载失败时，可以显示默认头像或首字母。
 */
export const avatarMaterial: MaterialDefinition = {
  name: "Avatar",
  displayName: "Avatar",
  description: "An image element with a fallback for user representation.",
  category: "display",
  icon: "UserCircle",
  supportsChildren: true,
  editableProps: [
    // ========== 样式配置 ==========
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
    // ========== 文档配置 ==========
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
    },
  ],
};

/**
 * Badge 物料定义
 *
 * 标签/徽章组件，用于显示状态、计数或分类标签。
 * 支持多种变体：default/secondary/destructive/outline。
 */
export const badgeMaterial: MaterialDefinition = {
  name: "Badge",
  displayName: "Badge",
  description: "A small count and labeling component.",
  category: "display",
  icon: "Tag",
  supportsChildren: true,
  editableProps: [
    // ========== 外观配置 ==========
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
    // ========== 样式配置 ==========
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};
