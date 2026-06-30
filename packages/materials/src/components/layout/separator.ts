/**
 * Separator 分隔线组件物料定义
 *
 * 基于 shadcn/ui Separator 组件，用于内容区域之间的视觉分隔。
 * 支持水平和垂直两种方向。
 *
 * @see https://ui.shadcn.com/docs/components/separator
 */
import type { MaterialDefinition } from "../../types/material";

export const separatorMaterial: MaterialDefinition = {
  name: "Separator",
  displayName: "Separator",
  description: "A visual divider between content sections.",
  category: "layout",
  icon: "Minus",
  editableProps: [
    // 外观配置
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
