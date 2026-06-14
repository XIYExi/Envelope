/**
 * Card 物料定义
 *
 * 定义了 Card 组件及其子组件的物料信息：
 * - Card: 卡片容器，用于包裹相关内容
 * - CardHeader: 卡片头部区域
 * - CardContent: 卡片内容区域
 * - CardFooter: 卡片底部区域
 *
 * Card 是最常用的布局组件之一，支持子组件嵌套。
 * 通过 isContainer: true 标记为容器组件，可以包裹其他组件。
 *
 * @author xiye
 * @date 2026/6/14
 */
import type { MaterialDefinition } from "../../types/material";

/**
 * Card 物料定义
 *
 * 卡片容器组件，用于将相关内容分组展示。
 * 支持子组件嵌套，可包含 CardHeader、CardContent、CardFooter 等。
 */
export const cardMaterial: MaterialDefinition = {
  name: "Card",
  displayName: "Card",
  description: "A container for grouping related content and actions.",
  category: "layout",
  icon: "Square",
  supportsChildren: true,
  isContainer: true,
  editableProps: [
    // ========== 样式配置 ==========
    {
      key: "className",
      label: "Tailwind Classes",
      type: "tailwind",
      group: "Styling",
      order: 10,
      comment: "Apply to the Card root element.",
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
 * CardHeader 物料定义
 *
 * 卡片头部区域，通常用于放置标题、描述等信息。
 * 支持子组件嵌套。
 */
export const cardHeaderMaterial: MaterialDefinition = {
  name: "CardHeader",
  displayName: "Card Header",
  description: "Header section of a Card component.",
  category: "layout",
  icon: "PanelTop",
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
  ],
};

/**
 * CardContent 物料定义
 *
 * 卡片内容区域，用于放置主要信息。
 * 支持子组件嵌套。
 */
export const cardContentMaterial: MaterialDefinition = {
  name: "CardContent",
  displayName: "Card Content",
  description: "Main content area of a Card.",
  category: "layout",
  icon: "AlignJustify",
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
  ],
};

/**
 * CardFooter 物料定义
 *
 * 卡片底部区域，通常用于放置操作按钮。
 * 支持子组件嵌套。
 */
export const cardFooterMaterial: MaterialDefinition = {
  name: "CardFooter",
  displayName: "Card Footer",
  description: "Footer section of a Card, typically for actions.",
  category: "layout",
  icon: "PanelBottom",
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
  ],
};
