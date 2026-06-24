import type { MaterialDefinition } from "../../types/material";

export const formMaterial: MaterialDefinition = {
  name: "Form",
  displayName: "Form",
  description: "表单容器，自动聚合子字段值，提交时作为 event.data 传递给 Flow",
  category: "form",
  icon: "FileText",
  isContainer: true,
  supportsChildren: true,
  defaultProps: { name: "form" },
  editableProps: [
    { key: "name", label: "表单标识", type: "text", defaultValue: "form", group: "Behavior", order: 1, comment: "表单的唯一标识，提交数据时作为 key 前缀" },
    { key: "className", label: "Tailwind Classes", type: "tailwind", group: "Styling", order: 10 },
  ],
  bindableEvents: ["onSubmit"],
};
