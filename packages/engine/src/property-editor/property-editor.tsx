/**
 * 动态属性编辑器 —— 根据材料定义的 editableProps 模式自动生成表单控件
 *
 * 支持 16 种字段类型：text、number、textarea、select、color、switch、
 * radio、image、richText、json、code、icon、tailwind、dataBinding、eventBinding
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38（image 字段支持文件上传并回填 url）
 */

"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { createPortal } from "react-dom";
import type { EditableProp } from "@envelope/materials";

/**
 * 属性编辑器组件的 Props 接口
 *
 * @param editableProps - 材料的可编辑属性定义数组
 * @param values - 当前属性值对象，key 为属性字段名
 * @param onChange - 属性值变更回调，接收字段 key 和新值
 * @param flowList - 可选，可用流程列表，供 eventBinding 字段显示下拉选择
 */
export interface PropertyEditorProps {
  editableProps: EditableProp[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  flowList?: { id: string; name: string }[];
  /** 数据模型表列选项，供 dataBinding 字段级联选择 */
  tableOptions?: { name: string; columns: { name: string; type: string }[] }[];
  /** 导航到流程编辑器的回调 */
  onNavigateToFlows?: () => void;
  /** 校验错误记录，key 为属性字段名 */
  validationErrors?: Record<string, string>;
  /** 图片上传端点 URL */
  uploadEndpoint?: string;
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
  flowList?: { id: string; name: string }[];
  /** 数据模型表列选项，供 dataBinding 字段级联选择 */
  tableOptions?: { name: string; columns: { name: string; type: string }[] }[];
  /** 导航到流程编辑器的回调 */
  onNavigateToFlows?: () => void;
  /** 校验错误记录，key 为属性字段名 */
  validationErrors?: Record<string, string>;
  /** 图片上传端点 URL */
  uploadEndpoint?: string;
}

/** 文本字段 —— 单行文本输入 */
function TextField({ prop, value, onChange, validationErrors }: FieldWrapperProps) {
  const error = validationErrors?.[prop.key];
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className={`h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
      />
      {error && <p className="mt-0.5 text-[9px] text-destructive">{error}</p>}
    </div>
  );
}

/** 数字字段 —— 数值输入，空值时发送 undefined */
function NumberField({ prop, value, onChange, validationErrors }: FieldWrapperProps) {
  const error = validationErrors?.[prop.key];
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
        className={`h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
      />
      {error && <p className="mt-0.5 text-[9px] text-destructive">{error}</p>}
    </div>
  );
}

/** 文本域字段 —— 多行文本输入，支持垂直拖拽调整大小 */
function TextareaField({ prop, value, onChange, validationErrors }: FieldWrapperProps) {
  const error = validationErrors?.[prop.key];
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <textarea
        value={typeof value === "string" ? value : ""}
        placeholder={prop.placeholder}
        rows={3}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className={`w-full resize-y rounded border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
      />
      {error && <p className="mt-0.5 text-[9px] text-destructive">{error}</p>}
    </div>
  );
}

/** 下拉选择字段 —— 从 options 数组中渲染 <option> 列表 */
function SelectField({ prop, value, onChange, validationErrors }: FieldWrapperProps) {
  const error = validationErrors?.[prop.key];
  const options = prop.options ?? [];
  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <select
        value={typeof value === "string" ? value : (prop.defaultValue as string | undefined) ?? ""}
        onChange={(e) => onChange(prop.key, e.target.value)}
        className={`h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-0.5 text-[9px] text-destructive">{error}</p>}
    </div>
  );
}

/** 默认主题色 HSL 值回退列表，在 SSR 或无法读取 CSS 变量时使用 */
const defaultThemeColors = [
  "hsl(222.2 47.4% 11.2%)",
  "hsl(210 40% 96.1%)",
  "hsl(210 40% 98%)",
  "hsl(215.4 16.3% 46.9%)",
  "hsl(215 20.2% 65.1%)",
  "hsl(0 72.2% 50.6%)",
  "hsl(0 0% 100%)",
  "hsl(222.2 84% 4.9%)",
];

/** 从 CSS 变量读取 shadcn/ui 动态主题色 */
function getCSSThemeColors(): string[] {
  if (typeof document === "undefined") return defaultThemeColors;
  const style = getComputedStyle(document.documentElement);
  const colorNames = ["background", "foreground", "card", "popover", "primary", "secondary", "muted", "accent", "destructive", "border", "input", "ring"];
  const colors: string[] = [];
  for (const name of colorNames) {
    const val = style.getPropertyValue(`--${name}`).trim();
    if (val) colors.push(`hsl(${val})`);
  }
  return colors.length > 0 ? colors : defaultThemeColors;
}

/**
 * 颜色字段 —— 颜色选择器 + 十六进制文本输入 + 主题色预设色板
 *
 * 文本输入使用受控组件（内部 state）以避免输入过程中的闪烁，
 * 只在失焦时提交最终值。
 */
function ColorField({ prop, value, onChange, validationErrors }: FieldWrapperProps) {
  const hexValue = typeof value === "string" ? value : (prop.defaultValue as string) ?? "#000000";
  const [inputValue, setInputValue] = useState(hexValue);

  // 同步外部值变化
  useEffect(() => { setInputValue(hexValue); }, [hexValue]);

  /** 从 CSS 自定义属性读取 shadcn/ui 主题色 */
  const themeColors = useMemo(() => getCSSThemeColors(), []);

  const error = validationErrors?.[prop.key];

  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hexValue}
          onChange={(e) => onChange(prop.key, e.target.value)}
          className={`h-7 w-10 cursor-pointer rounded border p-0 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => onChange(prop.key, inputValue)}
          placeholder="#000000"
          className={`h-7 flex-1 rounded border bg-background px-2 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
        />
      </div>
      {error && <p className="mt-0.5 text-[9px] text-destructive">{error}</p>}
      {/* 主题色预设色板 */}
      <div className="mt-1 flex flex-wrap gap-1">
        {themeColors.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(prop.key, c)}
            className={`h-5 w-5 rounded-full border ${hexValue === c ? "ring-2 ring-blue-500 ring-offset-1" : ""}`}
            style={{ backgroundColor: c }}
            title={`主题色 ${i + 1}`}
          />
        ))}
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
function ImageField({ prop, value, onChange, uploadEndpoint, validationErrors }: FieldWrapperProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const error = validationErrors?.[prop.key];

  /**
   * 选择文件后立即上传到宿主应用的 `/api/media/upload`，并将返回的 url 写回 image 字段。
   *
   * @author xiye
   * @date 2026-06-22
   * @since ISC-38
   */
  async function uploadFile(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const endpoint = uploadEndpoint ?? "/api/media/upload";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const payload = await response.text().catch(() => "");
        throw new Error(payload || `Upload failed: ${response.status}`);
      }
      const data = (await response.json()) as { url?: unknown };
      if (!data || typeof data.url !== "string" || data.url.length === 0) {
        throw new Error("Invalid upload response");
      }
      onChange(prop.key, data.url);
    } catch (error) {
      console.error("[PropertyEditor] image upload failed:", error);
      setUploadError("上传失败，请重试");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <div className="flex gap-2">
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          placeholder={prop.placeholder ?? "https://..."}
          onChange={(e) => onChange(prop.key, e.target.value)}
          className={`h-7 flex-1 rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          aria-label={`${prop.label}-文件选择`}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            void uploadFile(file);
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="h-7 shrink-0 rounded border bg-background px-2 text-xs hover:bg-muted disabled:opacity-60"
        >
          {uploading ? "上传中..." : "上传图片"}
        </button>
      </div>
      {uploadError && <p className="mt-0.5 text-[9px] text-destructive">{uploadError}</p>}
      {error && <p className="mt-0.5 text-[9px] text-destructive">{error}</p>}
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

/**
 * JSON 表格编辑器 —— 对扁平 JSON 对象提供键值对表格编辑
 *
 * - 自动检测是否为扁平 JSON（值均为原始类型），扁平时渲染表格视图
 * - 非扁平或无效 JSON 回退到 JsonField 文本编辑
 * - 支持添加/删除行，实时构建 JSON 对象
 */
function JsonTableField({ prop, value, onChange }: FieldWrapperProps) {
  const parsed = useMemo(() => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) return value as Record<string, unknown>;
    if (typeof value === "string") { try { return JSON.parse(value); } catch { return null; } }
    return null;
  }, [value]);

  const isFlatObject = parsed !== null && Object.values(parsed).every(v => typeof v !== "object" || v === null);

  // 非扁平对象回退到文本编辑
  if (!isFlatObject) return <JsonField prop={prop} value={value} onChange={onChange} />;

  const rows = Object.entries(parsed!).map(([key, val]) => ({ key, value: typeof val === "string" ? val : JSON.stringify(val) }));

  const updateRows = (newRows: { key: string; value: string }[]) => {
    const obj: Record<string, unknown> = {};
    for (const r of newRows) {
      if (r.key.trim()) {
        try { obj[r.key] = JSON.parse(r.value); } catch { obj[r.key] = r.value; }
      }
    }
    onChange(prop.key, obj);
  };

  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment ?? "键值对表格编辑，支持添加/删除行"} />
      <div className="space-y-0.5 rounded border p-1">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-1">
            <input
              value={row.key}
              onChange={e => { const n = [...rows]; n[i] = { key: e.target.value, value: n[i]!.value }; updateRows(n); }}
              placeholder="key"
              className="h-6 w-[35%] rounded border px-1 text-[10px]"
            />
            <input
              value={row.value}
              onChange={e => { const n = [...rows]; n[i] = { key: n[i]!.key, value: e.target.value }; updateRows(n); }}
              placeholder="value"
              className="h-6 flex-1 rounded border px-1 text-[10px]"
            />
            <button type="button" onClick={() => updateRows(rows.filter((_, j) => j !== i))} className="h-6 w-6 rounded text-[10px] text-destructive hover:bg-destructive/10">×</button>
          </div>
        ))}
        <button type="button" onClick={() => updateRows([...rows, { key: "", value: "" }])} className="h-6 w-full rounded border border-dashed text-[10px] text-muted-foreground hover:bg-accent">
          + 添加属性
        </button>
      </div>
      <button type="button" onClick={() => onChange(prop.key, JSON.stringify(parsed, null, 2))} className="mt-1 text-[9px] text-blue-500">
        切换为 JSON 编辑
      </button>
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

/** Lucide 图标名称列表（缓存避免重复计算） */
const LUCIDE_ICON_NAMES = Object.keys(LucideIcons).filter(
  (k) => k.charAt(0) === k.charAt(0).toUpperCase() && typeof (LucideIcons as unknown as Record<string, unknown>)[k] === "function",
);

/**
 * Lucide 图标选择器弹窗
 *
 * 在属性编辑器中为 IconField 提供可视化图标选择能力。
 * 使用 createPortal 渲染到 document.body，避免 z-index 层叠问题。
 */
function IconPickerDialog({
  open,
  currentValue,
  onSelect,
  onClose,
}: {
  open: boolean;
  currentValue: string;
  onSelect: (name: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");

  const filteredNames = useMemo(() => {
    if (!search.trim()) return LUCIDE_ICON_NAMES.slice(0, 200);
    const q = search.trim().toLowerCase();
    return LUCIDE_ICON_NAMES.filter((name) => name.toLowerCase().includes(q));
  }, [search]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 max-h-[80vh] w-[520px] max-w-[90vw] rounded-lg border bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-medium">选择图标</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <div className="border-b px-4 py-2">
          <input
            type="text"
            placeholder="搜索图标..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="h-8 w-full rounded border bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-y-auto p-4" style={{ maxHeight: "60vh" }}>
          {filteredNames.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted-foreground">未找到匹配的图标</p>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {filteredNames.map((name) => {
                const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
                if (!IconComponent) return null;
                const isSelected = currentValue === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      onSelect(name);
                      onClose();
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-md border p-2 transition-colors hover:bg-accent",
                      isSelected ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-transparent",
                    )}
                    title={name}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="max-w-full truncate text-[8px] text-muted-foreground">{name}</span>
                  </button>
                );
              })}
            </div>
          )}
          {!search.trim() && LUCIDE_ICON_NAMES.length > 200 && (
            <p className="mt-3 text-center text-[9px] text-muted-foreground">
              显示前 200 个图标，输入关键词搜索更多
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** 图标字段 —— Lucide 图标名称输入，带图标预览和可视化选择器 */
function IconField({ prop, value, onChange }: FieldWrapperProps) {
  const [showPicker, setShowPicker] = useState(false);
  const iconName = typeof value === "string" ? value : "";

  const PreviewIcon = iconName
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
    : null;

  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment} />
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={iconName}
          placeholder={prop.placeholder ?? "e.g. Save, Trash2, User"}
          onChange={(e) => onChange(prop.key, e.target.value)}
          className="h-7 flex-1 rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="h-7 shrink-0 rounded border bg-background px-2 text-xs hover:bg-muted"
        >
          选择图标
        </button>
      </div>
      <p className="mt-0.5 text-[9px] text-muted-foreground">Lucide icon name</p>
      {PreviewIcon && (
        <div className="mt-1 flex items-center gap-2 rounded border bg-muted/20 px-2 py-1">
          <PreviewIcon className="h-4 w-4 text-foreground" />
          <span className="text-[10px] text-muted-foreground">{iconName}</span>
        </div>
      )}
      <IconPickerDialog
        open={showPicker}
        currentValue={iconName}
        onSelect={(name) => onChange(prop.key, name)}
        onClose={() => setShowPicker(false)}
      />
    </div>
  );
}

/** 简单的 class 合并工具 */
function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/** Tailwind 常用 class 分类预设，供快捷插入面板使用 */
const TAILWIND_CATEGORIES = [
  {
    id: "spacing",
    label: "间距",
    classes: ["p-2", "p-4", "p-6", "px-4", "py-2", "m-2", "m-4", "gap-2", "gap-4", "space-y-2", "space-x-2"],
  },
  {
    id: "color",
    label: "颜色",
    classes: ["text-primary", "text-muted-foreground", "bg-background", "bg-muted", "bg-accent", "border", "border-muted"],
  },
  {
    id: "typography",
    label: "排版",
    classes: ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "font-normal", "font-medium", "font-semibold", "font-bold", "text-center", "text-left"],
  },
  {
    id: "layout",
    label: "布局",
    classes: ["flex", "grid", "items-center", "justify-center", "flex-col", "flex-wrap", "w-full", "h-full", "rounded", "shadow-sm", "shadow-md"],
  },
];

function TailwindField({ prop, value, onChange }: FieldWrapperProps) {
  const classes = typeof value === "string" ? value : "";
  /** 当前展开的 Tailwind class 分类 id，null 表示全部收起 */
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  /** 将 class 追加到输入值中，已存在则跳过 */
  const handleAddClass = useCallback((cls: string) => {
    const currentSet = new Set(classes.trim().split(/\s+/).filter(Boolean));
    if (currentSet.has(cls)) return;
    const next = (classes.trim() + " " + cls).trim();
    onChange(prop.key, next);
  }, [classes, onChange]);

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

      {/* Tailwind 常用 class 分类快捷插入面板 */}
      <div className="mt-1.5 flex flex-wrap gap-1">
        {TAILWIND_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={cn(
              "rounded px-1.5 py-0.5 text-[9px] transition-colors",
              activeCategory === cat.id
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-muted text-muted-foreground hover:bg-accent",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 当前展开分类的 class 快捷按钮列表 */}
      {activeCategory && (
        <div className="mt-1 flex flex-wrap gap-0.5">
          {TAILWIND_CATEGORIES.find((c) => c.id === activeCategory)?.classes.map((cls) => {
            const isActive = classes.trim().split(/\s+/).includes(cls);
            return (
              <button
                key={cls}
                type="button"
                onClick={() => handleAddClass(cls)}
                className={cn(
                  "rounded px-1 py-0.5 font-mono text-[9px] transition-colors",
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-muted/60 text-muted-foreground hover:bg-accent",
                )}
              >
                {cls}
              </button>
            );
          })}
        </div>
      )}

      {/* 已输入的 class chip 列表（保留原逻辑） */}
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

/**
 * 数据绑定字段 —— 双 select 级联选择表列
 *
 * 从 tableOptions 中选择表名，再选择对应表的列名。
 * 无 tableOptions 时回退为文本输入（兼容旧模式）。
 */
function DataBindField({ prop, value, onChange, tableOptions }: FieldWrapperProps) {
  const [table, ...colParts] = (typeof value === "string" ? value : "").split(".");
  const col = colParts.join(".");
  const currentTable = tableOptions?.find(t => t.name === table) ?? null;
  const columns = currentTable?.columns ?? [];

  // 无 tableOptions 时回退为文本输入
  if (!tableOptions || tableOptions.length === 0) {
    return (
      <div>
        <FieldLabel label={prop.label} required={prop.required} comment={prop.comment ?? "从数据模型选择表列"} />
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          placeholder={prop.placeholder ?? "table.column"}
          onChange={(e) => onChange(prop.key, e.target.value)}
          className="h-7 w-full rounded border bg-background px-2 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-0.5 text-[9px] text-muted-foreground">格式: table.column</p>
      </div>
    );
  }

  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment ?? "从数据模型选择表列"} />
      <div className="flex items-center gap-1">
        <select
          value={table ?? ""}
          onChange={(e) => onChange(prop.key, e.target.value ? `${e.target.value}.` : "")}
          className="h-7 flex-1 rounded border bg-background px-1 text-[10px]"
        >
          <option value="">选择表...</option>
          {tableOptions.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
        </select>
        <span className="text-[10px] text-muted-foreground">.</span>
        <select
          value={col ?? ""}
          disabled={!currentTable}
          onChange={(e) => onChange(prop.key, `${table}.${e.target.value}`)}
          className="h-7 flex-1 rounded border bg-background px-1 text-[10px]"
        >
          <option value="">选择列...</option>
          {columns.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
      </div>
    </div>
  );
}

/** 事件绑定字段 —— 绑定到业务流程，有可用流程时显示下拉选择 */
/**
 * K3: 事件绑定字段 — 支持多 flow 选择
 *
 * eventBindings 值类型从 string 升级为 string[]。
 * - 下拉模式（有 flowList）：按住 Ctrl 多选
 * - 输入模式（无 flowList）：逗号分隔输入多个 flowId
 */
function EventBindField({ prop, value, onChange, flowList, onNavigateToFlows }: FieldWrapperProps) {
  // K3: 兼容 string（旧数据）和 string[]（新数据）
  const currentArray: string[] = Array.isArray(value)
    ? value
    : typeof value === "string" && value.trim().length > 0
      ? [value]
      : [];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt && opt.selected && opt.value) {
        selected.push(opt.value);
      }
    }
    onChange(prop.key, selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // K3: 逗号分隔转换为 string[]
    const parts = raw.split(",").map((s: string) => s.trim()).filter(Boolean);
    onChange(prop.key, parts);
  };

  return (
    <div>
      <FieldLabel label={prop.label} required={prop.required} comment={prop.comment ?? "将组件事件绑定到业务流程（可多选）"} />
      {flowList && flowList.length > 0 ? (
        <select
          multiple
          value={currentArray}
          onChange={handleSelectChange}
          className="h-20 w-full rounded border bg-background px-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {flowList.map((flow) => (
            <option key={flow.id} value={flow.id}>
              {flow.name} ({flow.id})
            </option>
          ))}
        </select>
      ) : (
        <div className="space-y-1">
          <input
            type="text"
            value={currentArray.join(", ")}
            placeholder={prop.placeholder ?? "flow-id1, flow-id2"}
            onChange={handleInputChange}
            className="h-7 w-full rounded border bg-background px-2 font-mono text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {onNavigateToFlows && (
            <button
              type="button"
              onClick={onNavigateToFlows}
              className="h-6 w-full rounded border border-dashed border-blue-300 bg-blue-50 text-[9px] text-blue-600 hover:bg-blue-100"
            >
              + 创建新流程并绑定到此事件
            </button>
          )}
        </div>
      )}
      <p className="mt-0.5 text-[9px] text-muted-foreground">
        {flowList && flowList.length > 0
          ? "按住 Ctrl 多选流程（按序执行）"
          : "逗号分隔输入多个 flowId，从 Flows 面板创建流程后可选择绑定"}
      </p>
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
  json: JsonTableField,
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
export function PropertyEditor({ editableProps, values, onChange, flowList, tableOptions, onNavigateToFlows, validationErrors: externalValidationErrors, uploadEndpoint }: PropertyEditorProps) {
  const grouped = groupProps(editableProps);

  /** 从 editableProps 的 required 标记和当前值计算校验错误 */
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = { ...externalValidationErrors };
    for (const prop of editableProps) {
      if (prop.required) {
        const val = values[prop.key] ?? prop.defaultValue;
        if (val === undefined || val === null || val === "") {
          errors[prop.key] = `${prop.label} 不能为空`;
        }
      }
    }
    return errors;
  }, [editableProps, values, externalValidationErrors]);

  // 从 localStorage 读取分组折叠状态
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("property-editor-collapsed-groups");
      if (saved) return new Set(JSON.parse(saved));
    } catch { /* ignore */ }
    // 默认折叠：组名包含 "Advanced"、平均 order > 80、或包含高级属性的组
    const defaults = new Set<string>();
    for (const [groupName, groupProps] of grouped.entries()) {
      const avgOrder = groupProps.reduce((sum, p) => sum + (p.order ?? 50), 0) / groupProps.length;
      const hasAdvanced = groupProps.some(p => p.advanced);
      if (groupName.includes("Advanced") || avgOrder > 80 || hasAdvanced) {
        defaults.add(groupName);
      }
    }
    return defaults;
  });

  // 切换分组折叠状态并持久化到 localStorage
  const toggleGroup = useCallback((groupName: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      try {
        localStorage.setItem("property-editor-collapsed-groups", JSON.stringify([...next]));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  if (editableProps.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
        No editable properties defined for this component
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from(grouped.entries()).map(([group, props]) => {
        const isCollapsed = collapsedGroups.has(group);
        return (
          <div key={group}>
            {/* 可点击的分组头部，点击切换折叠/展开 */}
            <button
              type="button"
              onClick={() => toggleGroup(group)}
              className="mb-2 flex w-full items-center justify-between border-b pb-1 cursor-pointer hover:text-foreground transition-colors"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group}
              </span>
              {/* 折叠指示箭头 */}
              <span className={`text-[10px] text-muted-foreground transition-transform duration-150 ${isCollapsed ? "" : "rotate-90"}`}>
                ▶
              </span>
            </button>
            {/* 折叠时隐藏属性字段区 */}
            {!isCollapsed && (
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
                        flowList={flowList}
                        tableOptions={tableOptions}
                        onNavigateToFlows={onNavigateToFlows}
                        validationErrors={validationErrors}
                        uploadEndpoint={uploadEndpoint}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
