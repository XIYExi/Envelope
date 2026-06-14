/**
 * 反馈组件物料定义
 *
 * 定义了反馈类组件的物料信息：
 * - Skeleton: 骨架屏加载占位组件
 *
 * 反馈组件用于向用户提供状态反馈，如加载中、错误提示等。
 *
 * @author xiye
 * @date 2026/6/14
 */
import type { MaterialDefinition } from "../../types/material";

/**
 * Skeleton 物料定义
 *
 * 骨架屏加载占位组件，用于内容加载时的占位显示。
 * 默认高度 16px，宽度 100%，可通过 Tailwind CSS 自定义。
 */
export const skeletonMaterial: MaterialDefinition = {
  name: "Skeleton",
  displayName: "Skeleton",
  description: "A placeholder loading state for content.",
  category: "feedback",
  icon: "Loader2",
  editableProps: [
    // ========== 样式配置 ==========
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
