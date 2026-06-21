import { describe, expect, it } from "vitest";
import { jsxText, sanitizeJsxComment, tsStringLiteral } from "../src/core/tsx-escape";

describe("@envelope/generator", () => {
  it("tsx escape helpers work", () => {
    expect(tsStringLiteral("a")).toBe("\"a\"");
    expect(jsxText("a")).toBe("{\"a\"}");
    expect(sanitizeJsxComment("x*/y")).toBe("x* /y");
  });
});
