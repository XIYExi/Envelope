/**
 * validation/validate 单测
 *
 * 覆盖目标：
 * - validate：成功/失败的返回结构，错误 path 拼接规则，以及非 ZodError 的兜底分支
 * - validateOrThrow：失败时抛出 ZodError 的行为
 *
 * 说明：
 * - validate 是上层 API/导入导出流程的重要基础能力，返回结构必须稳定
 */
import { describe, expect, it } from "vitest";
import { z, ZodError } from "zod";
import { validate, validateOrThrow } from "../src/validation/validate";
import { createProjectSchema } from "../src/schemas";

describe("validation/validate", () => {
  it("validate：成功时返回 success=true 且 data 为解析后的类型安全结果（含默认值）", () => {
    const result = validate(createProjectSchema, { name: "demo" });
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("demo");
    expect(result.data?.schema_version).toBe("3.0.0");
    expect(result.data?.description).toBe("");
  });

  it("validate：失败时返回 success=false 且 errors.path 为点号拼接", () => {
    const schema = z.object({
      config: z.object({
        theme: z.object({
          primaryColor: z.string(),
        }),
      }),
    });

    const result = validate(schema, { config: { theme: { primaryColor: 123 } } });
    expect(result.success).toBe(false);
    expect(result.errors?.[0]?.path).toBe("config.theme.primaryColor");
    expect(result.errors?.[0]?.message).toContain("Expected string");
  });

  it("validate：当 parse 抛出非 ZodError 时走兜底分支", () => {
    const badSchema = {
      // 关键：用一个“伪 schema”模拟非 ZodError 的异常分支
      parse() {
        throw new Error("boom");
      },
    } as unknown as z.ZodSchema<unknown>;

    const result = validate(badSchema, { any: "value" });
    expect(result.success).toBe(false);
    expect(result.errors).toEqual([{ path: "", message: "Unknown validation error" }]);
  });

  it("validateOrThrow：失败时抛出 ZodError", () => {
    expect(() => validateOrThrow(z.object({ a: z.number() }), { a: "x" })).toThrow(ZodError);
  });
});

