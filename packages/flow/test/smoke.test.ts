import { describe, expect, it } from "vitest";
import { yamlToJson } from "../src/yaml/converter";

describe("@envelope/flow", () => {
  it("yaml converter rejects empty input", () => {
    const result = yamlToJson("");
    expect(result.success).toBe(false);
  });
});
