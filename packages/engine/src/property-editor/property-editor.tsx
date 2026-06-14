/**
 * 动态属性编辑器 —— 根据材料定义的 editableProps 模式自动生成表单控件
 *
 * 支持 16 种字段类型：text、number、textarea、select、color、switch、
 * radio、image、richText、json、code、icon、tailwind、dataBinding、eventBinding
 *
 * @author xiye
 * @date 2026-06-14
 */

"use client";

import { type ChangeEvent } from "react";
import type { EditableProp } from "@envelope/materials";

/**
 * 属性编辑器组件的 Props 接口
 *
 * @param editableProps - 材料的可编辑属性定义数组
 * @param values - 当前属性值对象，key 为属性字段名
 * @param onChange - 属性值变更回调，接收字段 key 和新值
 */
export interface PropertyEditorProps {
  editableProps: EditableProp[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

/** 将可编辑属性按 group 字段分组，使用 Map 保证插入顺序 */
function groupProps(props: EditableProp[]): Map<string, EditableProp[]> {
  const map = new Map<string, EditableProp[]>();
  for (const p of props) {
    const g = p.group ?? "General";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(p);
  }
  return map;
}

/** 字段标签组件，显示标签文本、必填星号和注释说明 */
function FieldLabel({ label, required, comment }: { label: string; required?: boolean; comment?: string }) {
  return (
    <div className="mb-1">
      <label className="text-[10px] font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {comment && <p className="text-[9px] leading-tight text-muted-foreground">{comment}</p>}
    </div>
  );
}

/** 字段容器组件的通用 Props */
interface FieldWrapperProps {
  prop: EditableProp;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

/** 文本字段 —— 单行文本输入 */
function TextField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

/** 数字字段 —— 数值输入，空值时发送 undefined */
function NumberField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <input
        type="number"
        value={typeof value === "number" ? value : (prop.defaultValue as number | undefined) ?? 0}
        min={prop.min}
        max={prop.max}
        placeholder={prop.placeholder}
        onChange={(e) => onChange(prop.key, e.target.value === "" ? undefined : Number(e.target.value))}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

/** 文本域字段 —— 多行文本输入，支持垂直拖拽调整大小 */
function TextareaField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <textarea
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder}
        rows={3}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="w-full resize-y rounded border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

/** 下拉选择字段 —— 从 options 数组中渲染 <option> 列表 */
function SelectField({ prop, value, onChange }: FieldWrapperProps) {
  const options = prop.options ?? [];
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <select
        value={typeof value === "string" ? value : (prop.defaultValue as string | undefined) ?? ""}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** 颜色字段 —— 同时提供颜色选择器（type=color）和十六进制文本输入 */
function ColorField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={typeof value === "string" ? value : (prop.defaultValue as string) ?? "#000000"}
          onChange={(e) => onChange(prop.key, e.target.value)}
          className="h-7 w-10 cursor-pointer rounded border p-0"
        />
        <input
          type="text"
          value={typeof value === "string" ? value : (prop.defaultValue as string) ?? ""}
          onChange={(e) => onChange(prop.key, e.target.value)}
          className="h-7 flex-1 rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

/** 开关字段 —— 自定义 role="switch" 按钮，切换布尔值 */
function SwitchField({ prop, value, onChange }: FieldWrapperProps) {
  const checked = typeof value === "boolean" ? value : !!(prop.defaultValue);
  return (
    <div className="flex items-center justify-between">
      <div>
        <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(prop.key, !checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          checked ? "bg-blue-500" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}

/** 单选按钮组字段 —— 从 options 数组渲染一组 radio 按钮 */
function RadioField({ prop, value, onChange }: FieldWrapperProps) {
  const options = prop.options ?? [];
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <div className="space-y-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="radio"
              name={`radio-${prop.key}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(prop.key, opt.value)}
              className="accent-blue-500"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

/** 图片字段 —— URL 文本输入 + 背景图预览 */
function ImageField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder ?? "https://..."}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {typeof value === "string" && value.length > 0 && (
        <div className="mt-1 h-12 w-full rounded border bg-muted/30 bg-cover bg-center" style={{ backgroundImage: `url(${value})` }} />
      )}
    </div>
  );
}

/** 富文本字段 —— 多行文本输入（等宽字体），用于 HTML/Markdown 内容 */
function RichTextField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <textarea
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder ?? "Enter rich text..."}
        rows={4}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="w-full resize-y rounded border bg-background px-2 py-1 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

/** JSON 字段 —— JSON 文本编辑（等宽字体），实时校验并显示解析错误 */
function JsonField({ prop, value, onChange }: FieldWrapperProps) {
  const str = typeof value === "string" ? value : typeof value === "object" ? JSON.stringify(value, null, 2) : "";
  let parseError = false;
  if (str) { try { JSON.parse(str); } catch { parseError = true; } }
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <textarea
        value={str}
        placeholder={prop.placeholder ?? '{"key": "value"}'}
        rows={5}
        onChange={(e) => {
          onChange(prop.key, e.target.value);
        }}
        className={`w-full resize-y rounded border bg-background px-2 py-1 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 ${parseError ? "border-destructive" : ""}`}
      />
      {parseError && <p className="mt-0.5 text-[9px] text-destructive">Invalid JSON</p>}
    </div>
  );
}

function CodeField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <textarea
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder ?? "// Write your code here"}
        rows={6}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="w-full resize-y rounded border bg-slate-900 px-2 py-1 font-mono text-[10px] text-green-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

/** 图标字段 —— Lucide 图标名称输入，带用法提示 */
function IconField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <input
        type="text"
        value={typeof value === "string" ? value : (prop.defaultValue as string) ?? ""}
        placeholder={prop.placeholder ?? "e.g. Save, Trash2, User"}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="mt-0.5 text-[9px] text-muted-foreground">Lucide icon name</p>
    </div>
  );
}

function TailwindField({ prop, value, onChange }: FieldWrapperProps) {
  const classes = typeof value === "string" ? value : "";
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <input
        type="text"
        value={classes}
        placeholder={prop.placeholder ?? "e.g. p-4 bg-blue-500 rounded"}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {classes && (
        <div className="mt-1 space-y-0.5">
          {classes.split(/\s+/).filter(Boolean).slice(0, 8).map((cls, i) => (
            <span key={i} className="mr-0.5 inline-block rounded bg-muted px-1 py-0 text-[9px] font-mono text-muted-foreground">{cls}</span>
          ))}
          {classes.split(/\s+/).filter(Boolean).length > 8 && (
            <span className="text-[9px] text-muted-foreground">
              +{classes.split(/\s+/).filter(Boolean).length - 8} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** 数据绑定字段 —— 绑定到 Supabase 查询列，格式 table.column */
function DataBindField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment ?? "Bind this prop to a Supabase query column"} />
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder ?? "table.column"}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="mt-0.5 text-[9px] text-muted-foreground">Format: table.column</p>
    </div>
  );
}

/** 事件绑定字段 —— 绑定到业务流程，值为 Flow ID */
function EventBindField({ prop, value, onChange }: FieldWrapperProps) {
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment ?? "Bind this event to a business flow"} />
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder ?? "flow-id"}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="mt-0.5 text-[9px] text-muted-foreground">Bind to flow ID from Flows panel</p>
    </div>
  );
}

/** 字段类型 → React 组件的映射表，共 15 种类型，未知类型回退到 TextField */
const FIELD_COMPONENTS: Record<string, React.FC<FieldWrapperProps>> = {
  text: TextField,
  number: NumberField,
  textarea: TextareaField,
  select: SelectField,
  color: ColorField,
  switch: SwitchField,
  radio: RadioField,
  image: ImageField,
  richText: RichTextField,
  json: JsonField,
  code: CodeField,
  icon: IconField,
  tailwind: TailwindField,
  dataBinding: DataBindField,
  eventBinding: EventBindField,
};

/**
 * 动态属性编辑器组件，根据材料的 editableProps 模式自动生成表单控件
 *
 * 支持 16 种字段类型：文本、数字、文本域、下拉选择、颜色选择器、
 * 开关、单选按钮组、图片、富文本、JSON、代码、图标、Tailwind 类名、
 * 数据绑定和事件绑定
 *
 * @param editableProps - 可编辑属性定义数组，来自材料定义
 * @param values - 当前属性值对象
 * @param onChange - 属性值变更回调，接收字段 key 和新值
 */
export function PropertyEditor({ editableProps, values, onChange }: PropertyEditorProps) {
  const grouped = groupProps(editableProps);

  if (editableProps.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
        No editable properties defined for this component
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from(grouped.entries()).map(([group, props]) => (
        <div key={group}>
          <div className="mb-2 border-b pb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{group}</span>
          </div>
          <div className="space-y-3">
            {props
              .sort((a, b) => (a.order ?? 50) - (b.order ?? 50))
              .map((prop) => {
                const FieldComponent = FIELD_COMPONENTS[prop.type] ?? TextField;
                const value = values[prop.key] ?? prop.defaultValue;
                return (
                  <FieldComponent
                    key={prop.key}
                    prop={prop}
                    value={value}
                    onChange={onChange}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
