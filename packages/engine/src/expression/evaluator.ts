/**
 * 编译时表达式验证器
 *
 * 在代码生成阶段对表达式进行轻量语法校验，
 * 提前发现表达式错误，不等待运行时崩溃。
 *
 * Domain M — 响应式表达式系统
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
  referencedKeys: string[];
}

/**
 * 验证表达式语法
 * - 禁止函数调用（无安全风险）
 * - 括号匹配
 * - 二元操作符两侧非空
 */
export function validateExpression(expr: string): ValidationResult {
  const trimmed = expr.startsWith("{{") && expr.endsWith("}}")
    ? expr.slice(2, -2).trim()
    : expr.trim();

  if (!trimmed) {
    return { valid: false, error: "表达式为空", referencedKeys: [] };
  }

  const errors: string[] = [];
  const referencedKeys = new Set<string>();

  // 安全检查：禁止函数调用
  const funcCallPattern = /[a-zA-Z_$][\w$]*\s*\(/g;
  let match;
  while ((match = funcCallPattern.exec(trimmed)) !== null) {
    const funcName = match[0].replace(/\s*\($/, "");
    const allowedBuiltins = ["String", "Number", "Boolean", "Math"];
    if (!allowedBuiltins.includes(funcName)) {
      errors.push(`禁止函数调用: "${funcName}()"`);
    }
  }

  // 安全检查：禁止 eval、Function、new
  const forbidden = /\b(eval|Function|new\s+Function|import|require)\b/;
  if (forbidden.test(trimmed)) {
    errors.push("禁止使用 eval/Function/import/require");
  }

  // 括号匹配
  let depth = 0;
  for (const ch of trimmed) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth < 0) {
      errors.push("括号不匹配：多余的右括号");
      break;
    }
  }
  if (depth > 0) errors.push("括号不匹配：缺少右括号");

  // 提取引用路径
  const pathPattern = /[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*|\[\d+\])*/g;
  while ((match = pathPattern.exec(trimmed)) !== null) {
    referencedKeys.add(match[0]);
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join("; ") : undefined,
    referencedKeys: Array.from(referencedKeys),
  };
}

/**
 * 检测表达式是否是纯路径引用（无运算）
 */
export function isSimplePath(expr: string): boolean {
  const trimmed = expr.startsWith("{{") && expr.endsWith("}}")
    ? expr.slice(2, -2).trim()
    : expr.trim();
  return /^[a-zA-Z_$][\w$.]*(\[\d+\])*$/.test(trimmed) && !trimmed.includes(" ");
}
