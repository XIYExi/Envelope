/**
 * FormGroup 复合物料定义
 *
 * 适配器模式：将 Label + Input + FormMessage 三个基础物料组合为单一可拖入的复合物料，
 * 用户一次拖入即可获得完整的表单字段结构（Label + Input + 校验提示）。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { MaterialDefinition } from "../../types/material";

/**
 * FormGroup 物料定义
 *
 * 复合物料：包含 Label、Input、FormMessage 三个子组件。
 * expandTo: 拖入画布时自动展开为三个子组件。
 */
export const formGroupMaterial: MaterialDefinition = {
  name: "FormGroup",
  displayName: "Form Group",
  description: "复合表单字段 — 包含 Label + Input + 校验提示",
  category: "form",
  icon: "rectangle-horizontal",
  showInPalette: true,
  isContainer: false,
  supportsChildren: false,
  slots: [
    {
      name: "content",
      label: "表单字段",
      allowedChildTypes: ["Label", "Input", "FormMessage"],
      max: 3,
    },
  ],
  expandTo: [
    { type: "Label", props: { text: "字段名" } },
    { type: "Input", props: { placeholder: "请输入", type: "text" } },
    { type: "FormMessage", props: {} },
  ],
  editableProps: [
    { key: "label", label: "标签文本", type: "text", defaultValue: "字段名", group: "基本" },
    { key: "placeholder", label: "占位文本", type: "text", defaultValue: "请输入", group: "基本" },
    { key: "required", label: "必填", type: "switch", defaultValue: false, group: "校验" },
    { key: "minLength", label: "最小长度", type: "number", defaultValue: 0, group: "校验", advanced: true },
    { key: "maxLength", label: "最大长度", type: "number", defaultValue: 0, group: "校验", advanced: true },
    { key: "pattern", label: "正则校验", type: "text", placeholder: "如 ^[a-z]+$", group: "校验", advanced: true },
  ],
  defaultProps: {
    label: "字段名",
    placeholder: "请输入",
    required: false,
  },
  shadcnImport: {
    path: "@/components/ui/form",
    components: ["FormItem", "FormLabel", "FormControl", "FormMessage"],
  },
};
