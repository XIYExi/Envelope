/**
 * 节点配置面板 — 根据 configSchema 动态生成配置表单
 *
 * 设计模式：
 * - 策略模式：每种 ConfigFieldType 对应一种输入控件的渲染策略
 * - 适配器模式：将数据模型 schema 适配到 select 下拉选项
 *
 * @author xiye
 * @date 2026-06-25
 */

import { useMemo } from "react";
import type { Node } from "@xyflow/react";
import type { FlowNodeDefinition, ConfigField, DataModelSchema } from "../thing-model/types";

/** 节点配置面板属性 */
export interface NodeConfigPanelProps {
  /** 当前选中的 React Flow 节点 */
  node: Node;
  /** 选中节点的类型定义 */
  nodeDef: FlowNodeDefinition;
  /** 数据模型 Schema — 用于为 db.* 节点的 table 字段提供可选表名 */
  dataModels?: DataModelSchema;
  /** 配置变更回调 */
  onConfigChange: (nodeId: string, config: Record<string, unknown>) => void;
  /** 节点标签变更回调 */
  onLabelChange: (nodeId: string, label: string) => void;
  /** 删除节点回调 */
  onDelete: (nodeId: string) => void;
  /** 关闭面板回调 */
  onClose: () => void;
}

/**
 * 渲染单个配置字段控件的策略函数
 *
 * 策略模式核心：每种 ConfigFieldType 映射到一种 JSX 控件实现。
 * 通过查表 dispatchConfigField 统一分发。
 *
 * @param key - 字段键名
 * @param field - 字段定义
 * @param value - 当前值
 * @param onChange - 值变更回调
 * @param dataModels - 可选的数据模型（用于 table select 下拉适配）
 * @returns 控件 JSX
 */
function renderConfigField(
  key: string,
  field: ConfigField,
  value: unknown,
  onChange: (key: string, value: unknown) => void,
  dataModels?: DataModelSchema,
): JSX.Element {
  // 检查依赖条件：如果字段有 dependsOn，依赖不满足时隐藏
  if (field.dependsOn) {
    return <></>;
  }

  const baseInputClass = "w-full rounded border bg-background px-2 py-1 text-xs";
  const baseLabelClass = "mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase";
  const descriptionClass = "mt-0.5 text-[9px] text-muted-foreground leading-relaxed";

  const labelEl = (
    <label className={baseLabelClass}>
      {field.label}
      {field.required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );

  // 适配器模式：数据表名适配为 select 选项
  const getTableOptions = (): { label: string; value: string }[] | undefined => {
    if (dataModels?.tables && dataModels.tables.length > 0) {
      return dataModels.tables.map((t) => ({ label: t.name, value: t.name }));
    }
    return field.options;
  };

  let control: JSX.Element;

  switch (field.type) {
    // ── string 类型：文本输入框 ──
    case "string":
      control = (
        <input
          className={baseInputClass}
          type="text"
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      );
      break;

    // ── number 类型：数字输入框 ──
    case "number":
      control = (
        <input
          className={baseInputClass}
          type="number"
          value={(value as number) ?? field.default ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(key, e.target.value === "" ? undefined : Number(e.target.value))}
        />
      );
      break;

    // ── boolean 类型：复选框 ──
    case "boolean":
      control = (
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={(value as boolean) ?? field.default ?? false}
            onChange={(e) => onChange(key, e.target.checked)}
          />
          <span className="text-muted-foreground">{field.placeholder || field.label}</span>
        </label>
      );
      break;

    // ── select 类型：下拉选择框 ──
    case "select": {
      const options = getTableOptions() ?? field.options ?? [];
      control = (
        <select
          className={baseInputClass}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
        >
          <option value="" disabled>
            {field.placeholder || "请选择..."}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
      break;
    }

    // ── code 类型：多行代码编辑器风格文本域 ──
    case "code":
      control = (
        <div>
          {field.language && (
            <div className="mb-0.5 text-[9px] text-muted-foreground font-mono">
              {field.language.toUpperCase()}
            </div>
          )}
          <textarea
            className={`${baseInputClass} font-mono text-[11px] leading-relaxed resize-y min-h-[80px]`}
            value={(value as string) ?? ""}
            placeholder={field.placeholder}
            rows={5}
            onChange={(e) => onChange(key, e.target.value)}
            spellCheck={false}
          />
        </div>
      );
      break;

    // ── expression 类型：单行表达式输入，带 {{}} 前缀提示 ──
    case "expression":
      control = (
        <div className="flex items-center gap-0">
          <span className="rounded-l border border-r-0 bg-muted px-1.5 py-1 text-[10px] text-muted-foreground font-mono">
            {'{{'}{' '}
          </span>
          <input
            className={`${baseInputClass} rounded-l-none font-mono`}
            type="text"
            value={(value as string) ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </div>
      );
      break;

    // ── json 类型：JSON 编辑文本域 ──
    case "json":
      control = (
        <textarea
          className={`${baseInputClass} font-mono text-[11px] leading-relaxed resize-y min-h-[60px]`}
          value={typeof value === "string" ? (value as string) : JSON.stringify(value ?? field.default ?? "", null, 2)}
          placeholder={field.placeholder}
          rows={4}
          onChange={(e) => {
            // 尝试解析为 JSON 对象存储，失败则存字符串
            try {
              const parsed = JSON.parse(e.target.value);
              onChange(key, parsed);
            } catch {
              onChange(key, e.target.value);
            }
          }}
          spellCheck={false}
        />
      );
      break;

    default:
      control = (
        <input
          className={baseInputClass}
          type="text"
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      );
      break;
  }

  return (
    <div key={key}>
      {field.type !== "boolean" && labelEl}
      {control}
      {field.description && (
        <p className={descriptionClass}>{field.description}</p>
      )}
    </div>
  );
}

/**
 * 节点配置面板组件
 *
 * 分为静态部分（节点类型、ID、端口展示、描述、删除）和
 * 动态部分（根据 nodeDef.configSchema 遍历生成表单控件）。
 */
export function NodeConfigPanel({
  node,
  nodeDef,
  dataModels,
  onConfigChange,
  onLabelChange,
  onDelete,
  onClose,
}: NodeConfigPanelProps) {

  // 当前配置值
  const currentConfig = (node.data?.config as Record<string, unknown>) ?? {};

  /**
   * 单个配置字段值变更处理器
   *
   * @param key - 字段键名
   * @param value - 新值
   */
  const handleFieldChange = (key: string, value: unknown) => {
    onConfigChange(node.id, { ...currentConfig, [key]: value });
  };

  // 依赖检查：过滤出不满足 dependsOn 条件的字段
  const visibleSchema = useMemo(() => {
    if (!nodeDef.configSchema) return {};
    const result: Record<string, ConfigField> = {};
    for (const [key, field] of Object.entries(nodeDef.configSchema)) {
      if (field.dependsOn) {
        const depField = nodeDef.configSchema[field.dependsOn.field];
        const depValue = currentConfig[field.dependsOn.field] ?? depField?.default;
        if (depValue !== field.dependsOn.value) continue;
      }
      result[key] = field;
    }
    return result;
  }, [nodeDef.configSchema, currentConfig]);

  return (
    <div className="flex w-60 shrink-0 flex-col border-l bg-muted/30">
      {/* 面板头部 */}
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          节点配置
        </span>
        <button
          className="text-xs text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* ── 静态部分 ── */}

        {/* 节点类型 + 颜色标记 */}
        <div>
          <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
            节点类型
          </label>
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: nodeDef.color }}
            />
            <span>{nodeDef.label}</span>
          </div>
        </div>

        {/* 节点 ID */}
        <div>
          <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
            节点 ID
          </label>
          <code className="block select-all text-[10px] text-muted-foreground">
            {node.id.slice(0, 8)}
          </code>
        </div>

        {/* 节点标签编辑 */}
        <div>
          <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
            节点名称
          </label>
          <input
            className="w-full rounded border bg-background px-2 py-1 text-xs"
            value={(node.data?.label as string) ?? ""}
            onChange={(e) => onLabelChange(node.id, e.target.value)}
          />
        </div>

        {/* ── 动态部分：configSchema 表单 ── */}

        {Object.keys(visibleSchema).length > 0 && (
          <div className="border-t pt-2 space-y-2">
            <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
              配置项
            </label>
            {Object.entries(visibleSchema).map(([key, field]) =>
              renderConfigField(key, field, currentConfig[key], handleFieldChange, dataModels)
            )}
          </div>
        )}

        {/* 输入端口列表（只读） */}
        {nodeDef.inputs.length > 0 && (
          <div>
            <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
              输入端口 ({nodeDef.inputs.length})
            </label>
            <div className="space-y-0.5">
              {nodeDef.inputs.map((p) => (
                <div key={p.id} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="text-primary">●</span>
                  <span>{p.label}</span>
                  <span className="text-[9px] opacity-50">({p.type})</span>
                  {p.required && <span className="text-[9px] text-red-400">*</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 输出端口列表（只读） */}
        {nodeDef.outputs.length > 0 && (
          <div>
            <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
              输出端口 ({nodeDef.outputs.length})
            </label>
            <div className="space-y-0.5">
              {nodeDef.outputs.map((p) => (
                <div key={p.id} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="text-green-500">●</span>
                  <span>{p.label}</span>
                  <span className="text-[9px] opacity-50">({p.type})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 节点描述 */}
        {nodeDef.description && (
          <div>
            <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
              说明
            </label>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              {nodeDef.description}
            </p>
          </div>
        )}

        {/* 删除按钮 */}
        <div className="pt-2 border-t">
          <button
            className="w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
            onClick={() => onDelete(node.id)}
          >
            删除节点
          </button>
        </div>
      </div>
    </div>
  );
}
