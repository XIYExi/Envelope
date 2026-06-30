import { describe, expect, it } from "vitest";
import { createRegistry } from "../src/registry";

describe("@envelope/materials", () => {
  it("registry can be created", () => {
    const registry = createRegistry();
    expect(registry.getAll()).toEqual([]);
  });
});
