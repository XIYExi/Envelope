/**
 * Schema 校验工具
 *
 * 提供通用的数据校验函数，用于在运行时验证 JSON 数据是否符合 Zod Schema。
 *
 * 使用场景：
 * - API 接口校验请求体（如 POST /api/projects）
 * - 保存页面/路由/数据库配置前校验数据合法性
 * - 代码生成前确保源数据结构正确
 * - 导入项目文件时校验格式
 *
 * 两个校验函数的区别：
 * - validate(): 返回 { success, data, errors }，不抛异常，适合 API 校验
 * - validateOrThrow(): 直接返回数据或抛出异常，适合内部调用
 *
 * @author xiye
 * @date 2026/6/13
 */
import { ZodError, type ZodSchema } from "zod";

/**
 * 校验结果接口
 * @template T 校验成功后的数据类型
 */
export interface ValidationResult<T = unknown> {
  /** 是否校验通过 */
  success: boolean;
  /** 校验通过时的数据（已解析为正确的类型） */
  data?: T;
  /** 校验失败时的错误列表 */
  errors?: Array<{
    /** 错误字段路径（如 "config.theme.primaryColor"） */
    path: string;
    /** 错误描述（如 "Expected string, received number"） */
    message: string;
  }>;
}

/**
 * 安全校验函数（不抛异常）
 *
 * @param schema - Zod Schema 定义
 * @param data - 待校验的数据
 * @returns 校验结果对象
 *
 * @example
 * // 校验项目创建请求
 * const result = validate(createProjectSchema, requestBody);
 * if (!result.success) {
 *   return NextResponse.json({ errors: result.errors }, { status: 400 });
 * }
 * // result.data 是类型安全的 CreateProjectInput
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
  try {
    // 使用 Zod 的 parse 方法进行校验，成功返回解析后的数据
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    // 捕获 Zod 校验错误，格式化为友好的错误信息
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.errors.map((e) => ({
          // 将路径数组转为点号分隔的字符串，如 "config.theme.primaryColor"
          path: e.path.join("."),
          message: e.message,
        })),
      };
    }
    // 非 Zod 错误（理论上不会发生）
    return {
      success: false,
      errors: [{ path: "", message: "Unknown validation error" }],
    };
  }
}

/**
 * 严格校验函数（校验失败时抛出异常）
 *
 * 与 validate() 的区别：
 * - 成功时直接返回类型安全的数据
 * - 失败时抛出 ZodError，包含详细的错误信息
 *
 * 适合内部调用，调用方可以用 try-catch 处理
 *
 * @param schema - Zod Schema 定义
 * @param data - 待校验的数据
 * @returns 校验通过的类型安全数据
 * @throws ZodError 校验失败时抛出
 *
 * @example
 * // 校验并使用数据
 * try {
 *   const project = validateOrThrow(projectConfigSchema, rawData);
 *   // project 的类型是 ProjectConfig，可以直接使用
 *   console.log(project.theme.primaryColor);
 * } catch (e) {
 *   if (e instanceof ZodError) {
 *     console.error("配置格式错误:", e.errors);
 *   }
 * }
 */
export function validateOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
