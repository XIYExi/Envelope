/**
 * V5 Canvas Fidelity — 表单组件真实渲染
 *
 * 将模拟的表单组件替换为真实 shadcn 组件。
 * @reference apps/platform/components/ui/
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PreviewRenderFn } from "./types";
import { filterDesignProps, pstr, pbool, pnum } from "./types";

export const renderButton: PreviewRenderFn = (props, children) => {
  const label = pstr(props, "label", "Button");
  return (
    <Button
      variant={pstr(props, "variant", "default") as any}
      size={pstr(props, "size", "default") as any}
      disabled={pbool(props, "disabled")}
      data-design-mode="true"
      data-live-edit-prop="label"
      {...filterDesignProps(props)}
    >
      {children ?? label}
    </Button>
  );
};

export const renderInput: PreviewRenderFn = (props) => {
  return (
    <Input
      placeholder={pstr(props, "placeholder", "Input...")}
      disabled={pbool(props, "disabled")}
      data-design-mode="true"
      {...filterDesignProps(props, ["placeholder"])}
    />
  );
};

export const renderLabel: PreviewRenderFn = (props, children) => {
  return (
    <Label
      data-design-mode="true"
      data-live-edit-prop="label"
      {...filterDesignProps(props)}
    >
      {children ?? pstr(props, "label", "Label")}
    </Label>
  );
};

export const renderTextarea: PreviewRenderFn = (props) => {
  return (
    <Textarea
      placeholder={pstr(props, "placeholder", "Enter text...")}
      disabled={pbool(props, "disabled")}
      data-design-mode="true"
      {...filterDesignProps(props, ["placeholder"])}
    />
  );
};

export const renderCheckbox: PreviewRenderFn = (props) => {
  const label = pstr(props, "label", "Checkbox");
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={pbool(props, "defaultChecked")}
        disabled={pbool(props, "disabled")}
        data-design-mode="true"
      />
      <span className="text-xs">{label}</span>
    </div>
  );
};

export const renderSwitch: PreviewRenderFn = (props) => {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={pbool(props, "defaultChecked")}
        disabled={pbool(props, "disabled")}
        data-design-mode="true"
      />
      {pstr(props, "label") && <span className="text-xs">{pstr(props, "label")}</span>}
    </div>
  );
};

export const renderSlider: PreviewRenderFn = (props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Slider
        defaultValue={[pnum(props, "defaultValue", 50)]}
        max={pnum(props, "max", 100)}
        min={pnum(props, "min", 0)}
        step={pnum(props, "step", 1)}
        disabled={pbool(props, "disabled")}
        data-design-mode="true"
        className="flex-1"
      />
      <span className="text-[10px] text-muted-foreground tabular-nums">
        {pnum(props, "defaultValue", 50)}
      </span>
    </div>
  );
};

export const renderToggle: PreviewRenderFn = (props) => {
  return (
    <Toggle
      pressed={pbool(props, "defaultPressed")}
      disabled={pbool(props, "disabled")}
      data-design-mode="true"
      {...filterDesignProps(props)}
    >
      {pstr(props, "label", "Toggle")}
    </Toggle>
  );
};

export const renderToggleGroup: PreviewRenderFn = (props) => {
  const type = pstr(props, "type", "single") as "single" | "multiple";
  const items = (props.items as string[]) ?? ["A", "B", "C"];
  return (
    <ToggleGroup type={type} disabled={pbool(props, "disabled")} data-design-mode="true">
      {items.map((item) => (
        <ToggleGroup key={item} value={item} className="text-[10px]">
          {item}
        </ToggleGroup>
      ))}
    </ToggleGroup>
  );
};

export const renderSelect: PreviewRenderFn = (props) => {
  const placeholder = pstr(props, "placeholder", "Select...");
  const options = (props.options as Array<{ label: string; value: string }>) ?? [];
  const selected = pstr(props, "selected");
  return (
    <Select disabled={pbool(props, "disabled")}>
      <SelectTrigger className="h-8 text-xs" data-design-mode="true">
        <SelectValue placeholder={placeholder}>
          {selected || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
