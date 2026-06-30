/**
 * Label 标签组件物料定义
 *
 * 基于 shadcn/ui Label 组件，用于表单控件的无障碍标签。
 * 支持 htmlFor 关联输入框，可包裹文本子组件。
 *
 * @see https://ui.shadcn.com/docs/components/label
 */
import type { MaterialDefinition } from "../../types/material";

export const labelMaterial: MaterialDefinition = {
  name: "Label",
  displayName: "Label",
  description: "Renders an accessible label for form controls.",
  category: "form",
  icon: "Baseline",
  supportsChildren: true,
  editableProps: [
    // 行为配置
    {
      key: "htmlFor",
      label: "For Input ID",
      type: "text",
      group: "Behavior",
      order: 1,
      comment: "The id of the form element this label is associated with.",
    },
    // 样式配置
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
    },
  ],
};
