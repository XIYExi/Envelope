import type { MaterialRegistry, MaterialDefinition, ComponentCategory } from "./types/material";
import { materialDefinitionSchema } from "./types/material";

export function createRegistry(): MaterialRegistry {
  const components = new Map<string, MaterialDefinition>();

  return {
    getByCategory(category: ComponentCategory): MaterialDefinition[] {
      const result: MaterialDefinition[] = [];
      components.forEach((def) => {
        if (def.category === category) result.push(def);
      });
      return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    },

    getAll(): MaterialDefinition[] {
      const result: MaterialDefinition[] = [];
      components.forEach((def) => result.push(def));
      return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    },

    register(def: MaterialDefinition): void {
      const parsed = materialDefinitionSchema.safeParse(def);
      if (!parsed.success) {
        console.error(`Invalid material "${def.name}":`, parsed.error.flatten());
        return;
      }
      components.set(def.name, parsed.data);
    },

    registerAll(defs: MaterialDefinition[]): void {
      defs.forEach((def) => this.register(def));
    },

    get(name: string): MaterialDefinition | undefined {
      return components.get(name);
    },
  };
}
