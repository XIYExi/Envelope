/**
 * Input 输入框组件物料定义
 *
 * 基于 shadcn/ui Input 组件，支持：
 * - 5 种输入类型（text/email/password/number/url）
 * - 占位文本配置
 * - 禁用和必填状态
 * - Tailwind CSS 自定义样式
 *
 * @see https://ui.shadcn.com/docs/components/input
 */
import type { MaterialDefinition } from "../../types/material";

export const inputMaterial: MaterialDefinition = {
  name: "Input",
  displayName: "Input",
  description: "A form input field for text entry.",
  category: "form",
  icon: "Type",
  editableProps: [
    // 行为配置
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
    // 内容配置
    {
      key: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "",
      group: "Content",
      order: 2,
    },
    // 状态配置
    {
      key: "disabled",
      label: "Disabled",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 3,
    },
    // 校验配置
    {
      key: "required",
      label: "Required",
      type: "switch",
      defaultValue: false,
      group: "Validation",
      order: 4,
    },
    // 样式配置
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
    // 文档配置
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
    },
  ],
};
