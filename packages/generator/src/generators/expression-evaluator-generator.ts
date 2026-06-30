/**
 * 表达式运行时求值器 — 代码生成器
 *
 * 为没有手写生成器的页面生成通用的表达式运行时。
 * 生成的文件位于用户项目的 lib/expression/evaluator.ts。
 *
 * Domain M — 响应式表达式系统
 */

export interface VirtualFile {
  path: string;
  content: string;
}

/**
 * 生成表达式运行时求值器代码
 *
 * @returns 虚拟文件对象，包含 getByPath + evaluateExpression
 */
export function generateExpressionEvaluator(): VirtualFile {
  const content = `/**
 * 表达式运行时求值器
 *
 * 提供安全路径取值和表达式求值功能，支持：
 * - 点号路径：a.b.c
 * - 数组索引：items[0].name
 * - 比较运算：== != > < >= <=
 * - 逻辑运算：&& || !
 * - 算术运算：+ - * / %
 * - 三元条件：cond ? a : b
 * - 字面量："string", 123, true, false, null
 */

/**
 * 按点号路径安全取值
 *
 * @param obj - 源对象
 * @param path - 点号路径（如 "a.b.c" 或 "items[0].name"）
 * @returns 路径对应的值，路径不存在时返回 undefined
 *
 * @example
 * getByPath({ a: { b: [1, 2] } }, "a.b[0]") // → 1
 */
export function getByPath(obj: unknown, path: string): unknown {
  if (obj == null) return undefined;
  const p = path.replace(/^\\$/, "").replace(/^\\./, "");
  if (!p) return obj;
  const parts = p.split(".").filter(Boolean);
  let cur: unknown = obj;

  for (const part of parts) {
    if (cur == null) return undefined;
    // 处理数组索引：item[0] 或 items.0
    const bracketMatch = part.match(/^([\\w$]+)\\[(\\d+)\\]$/);
    if (bracketMatch) {
      const key = bracketMatch[1];
      const idx = parseInt(bracketMatch[2], 10);
      cur = (cur as Record<string, unknown>)[key];
      if (cur == null) return undefined;
      if (Array.isArray(cur)) {
        cur = cur[idx];
      } else {
        return undefined;
      }
    } else if (typeof cur === "object" && cur !== null && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      const idx = parseInt(part, 10);
      if (!isNaN(idx) && Array.isArray(cur)) {
        cur = cur[idx];
      } else {
        return undefined;
      }
    }
  }

  return cur;
}

/**
 * 求值表达式
 *
 * @param expr - 表达式字符串，可选 {{...}} 包裹
 * @param context - 上下文对象，所有 field 暴露给表达式
 * @returns 表达式求值结果，失败时返回 undefined
 *
 * @example
 * evaluateExpression("user.age >= 18", { user: { age: 20 } }) // → true
 */
export function evaluateExpression(
  expr: string,
  context: Record<string, unknown>,
): unknown {
  if (!expr) return undefined;

  // 剥离可选的 {{...}} 包裹
  const trimmed = expr.startsWith("{{") && expr.endsWith("}}")
    ? expr.slice(2, -2).trim()
    : expr.trim();

  if (!trimmed) return undefined;

  // 纯路径短路：无空格、无运算符，直接 getByPath
  if (
    /^[a-zA-Z_$][\\w$.]*(\\[\\d+\\])*$/.test(trimmed) &&
    !trimmed.includes(" ") &&
    !trimmed.includes("(")
  ) {
    return getByPath(context, trimmed);
  }

  // 运算表达式：使用 new Function 在限定作用域内求值
  try {
    const keys = Object.keys(context);
    const vals = Object.values(context);
    const fn = new Function(...keys, \`return (\${trimmed});\`);
    return fn(...vals);
  } catch (_e) {
    return undefined;
  }
}

/**
 * 求值表达式并确保返回数组
 *
 * 用于 repeat 循环渲染的数据源。
 *
 * @param expr - 数组表达式
 * @param context - 上下文对象
 * @returns 数组（非数组时返回空数组）
 */
export function evaluateExpressionAsArray(
  expr: string,
  context: Record<string, unknown>,
): unknown[] {
  const result = evaluateExpression(expr, context);
  if (Array.isArray(result)) return result;
  return [];
}
`;

  return { path: "lib/expression/evaluator.ts", content };
}
