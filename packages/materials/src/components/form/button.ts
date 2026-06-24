/**
 * Button 按钮组件物料定义
 *
 * 基于 shadcn/ui Button 组件，支持：
 * - 6 种视觉变体（variant）
 * - 4 种尺寸（size）
 * - 禁用状态
 * - Tailwind CSS 自定义样式
 * - 子组件支持（可包裹文本、图标等）
 *
 * @see https://ui.shadcn.com/docs/components/button
 */
/**
 * Button 物料定义
 *
 * 定义了 Button 组件的物料信息，包括：
 * - 基本信息：名称、描述、分类、图标
 * - 可编辑属性：variant（变体）、size（尺寸）、disabled（禁用状态）
 * - 样式属性：className（Tailwind CSS 类名）
 * - 文档属性：comment（注释说明）
 *
 * Button 是最基础的表单组件，用于触发操作或事件。
 * 支持子组件（可以包含文本、图标等）。
 *
 * @author xiye
 * @date 2026/6/14
 */
import type { MaterialDefinition } from "../../types/material";

/**
 * Button 物料定义
 *
 * 基于 shadcn/ui Button 组件，支持以下配置：
 * - variant: 按钮变体（default/destructive/outline/secondary/ghost/link）
 * - size: 按钮尺寸（default/sm/lg/icon）
 * - disabled: 是否禁用
 * - className: 自定义 Tailwind CSS 类名
 */
export const buttonMaterial: MaterialDefinition = {
  name: "Button",
  displayName: "Button",
  description: "Triggers an action or event, such as submitting a form or opening a dialog.",
  category: "form",
  icon: "SquareMousePointer",
  supportsChildren: true,
  editableProps: [
    // ========== 行为配置 ==========
    {
      key: "submitType",
      label: "Submit Type",
      type: "select",
      options: [
        { label: "Button", value: "button" },
        { label: "Submit", value: "submit" },
      ],
      defaultValue: "button",
      group: "Behavior",
      order: 0,
    },
    // ========== 外观配置 ==========
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
    // ========== 状态配置 ==========
    {
      key: "disabled",
      label: "Disabled",
      type: "switch",
      defaultValue: false,
      group: "State",
      order: 3,
    },
    // ========== 样式配置 ==========
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Additional Tailwind CSS classes for the button.",
    },
    // ========== 文档配置 ==========
    {
      key: "comment",
      label: "Comment",
      type: "textarea",
      group: "Documentation",
      order: 20,
      comment: "Documentation note that will appear in generated code.",
    },
    {
      key: "onClick",
      label: "onClick Flow",
      type: "eventBinding",
      group: "Events",
      order: 30,
      comment: "Bind this event to a Flow (flow_id).",
    },
  ],
};
