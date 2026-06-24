/**
 * 物料属性运行时校验器
 *
 * 根据物料的 editableProps 定义，在运行时对组件 props 进行校验。
 * 用于拦截非法属性值，防止不符合物料定义的数据写入编辑状态。
 *
 * 校验规则：
 * - select/radio: 值必须在 options 定义范围内
 * - number: 值必须在 min/max 范围内
 * - switch: 值必须是布尔类型
 * - 未知属性且不在 editableProps 中：仅 warning 不拦截
 *
 * @author xiye
 * @date 2026-06-23
 */

import type { MaterialDefinition } from "./types/material";

/**
 * 校验错误信息
 */
export interface ValidationError {
  /** 属性键名 */
  key: string;
  /** 错误消息 */
  message: string;
  /** 传入的非法值 */
  value: unknown;
}

/**
 * 校验组件 props 是否符合物料定义
 *
 * 遍历传入的 props，对照物料的 editableProps 逐字段校验。
 * 仅校验 editableProps 中明确定义的字段，未定义的字段不拦截。
 *
 * @param props - 待校验的属性对象
 * @param material - 物料定义（包含 editableProps）
 * @returns 校验错误数组（空数组表示全部通过）
 *
 * @example
 * const errors = validateProps({ variant: "invalid" }, buttonMaterial);
 * // => [{ key: "variant", message: "..." }]
 */
export function validateProps(
  props: Record<string, unknown>,
  material: MaterialDefinition,
): ValidationError[] {
  const errors: ValidationError[] = [];
  const editableProps = material.editableProps;
  if (!editableProps || editableProps.length === 0) return errors;

  // 为快速查找建立 editableProp 索引
  const propDefs = new Map(editableProps.map((p) => [p.key, p]));

  for (const [key, value] of Object.entries(props)) {
    const propDef = propDefs.get(key);
    if (!propDef) continue; // 未在 editableProps 中定义的字段，跳过

    // 值为 undefined 或 null 时跳过（允许清空属性）
    if (value === undefined || value === null) continue;

    switch (propDef.type) {
      case "select":
      case "radio": {
        const options = propDef.options;
        if (options && options.length > 0) {
          const validValues = new Set(options.map((o) => o.value));
          if (!validValues.has(String(value))) {
            errors.push({
              key,
              message: `属性 "${key}" 的值 "${String(value)}" 不在允许的选项中 [${Array.from(validValues).join(", ")}]`,
              value,
            });
          }
        }
        break;
      }

      case "number": {
        const num = Number(value);
        if (Number.isNaN(num)) {
          errors.push({
            key,
            message: `属性 "${key}" 需要数字类型，但收到 "${typeof value}"`,
            value,
          });
        } else if (propDef.min !== undefined && num < propDef.min) {
          errors.push({
            key,
            message: `属性 "${key}" 的值 ${num} 小于最小值 ${propDef.min}`,
            value,
          });
        } else if (propDef.max !== undefined && num > propDef.max) {
          errors.push({
            key,
            message: `属性 "${key}" 的值 ${num} 大于最大值 ${propDef.max}`,
            value,
          });
        }
        break;
      }

      case "switch": {
        if (typeof value !== "boolean") {
          errors.push({
            key,
            message: `属性 "${key}" 需要布尔类型，但收到 "${typeof value}"`,
            value,
          });
        }
        break;
      }

      default:
        // 其他类型（text, textarea, color, image, json, code, icon, tailwind, dataBinding, eventBinding）不做严格校验
        break;
    }
  }

  return errors;
}
