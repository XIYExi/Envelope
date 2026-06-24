/**
 * FormItem 复合物料定义
 *
 * 拖入画布时自动展开为 Label + Input 的组合结构。
 * 用户可通过属性面板编辑 label 文本和 placeholder。
 *
 * @author xiye
 * @date 2026-06-23
 */
import type { MaterialDefinition } from "../../types/material";

export const formItemMaterial: MaterialDefinition = {
  name: "FormItem",
  displayName: "Form Item",
  description: "Label + Input 组合",
  category: "form",
  icon: "RectangleHorizontal",
  isContainer: true,
  supportsChildren: true,
  showInPalette: true,
  maxChildren: 4,
  defaultProps: {
    label: "字段名",
  },
  expandTo: [
    { type: "Label", props: { text: "字段名" } },
    { type: "Input", props: { placeholder: "请输入..." } },
  ],
  editableProps: [
    {
      key: "label",
      type: "text",
      label: "标签文本",
      group: "Content",
      order: 1,
      comment: "修改此值会同步更新 Label 子组件的 text",
    },
  ],
  thumbnail: {
    preset: "input",
  },
};
