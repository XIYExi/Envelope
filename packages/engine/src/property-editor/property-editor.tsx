"use client";

import { useCallback, type ChangeEvent } from "react";
import type { EditableProp } from "@envelope/materials";

export interface PropertyEditorProps {
  editableProps: EditableProp[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

/** Group editable props by their `group` field, preserving order */
function groupProps(props: EditableProp[]): Map<string, EditableProp[]> {
  const map = new Map<string, EditableProp[]>();
  for (const p of props) {
    const g = p.group ?? "General";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(p);
  }
  return map;
}

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

interface FieldWrapperProps {
  prop: EditableProp;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

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
