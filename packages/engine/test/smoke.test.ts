import { describe, expect, it } from "vitest";
import { createProjectSchema } from "../src/schemas";

describe("@envelope/engine", () => {
  it("schema can parse minimal input", () => {
    const parsed = createProjectSchema.parse({ name: "demo" });
    expect(parsed.name).toBe("demo");
    expect(parsed.schema_version).toBeTruthy();
  });
});
