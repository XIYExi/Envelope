import type { MaterialRegistry, MaterialDefinition, ComponentCategory } from "./types/material";

export function createRegistry(): MaterialRegistry {
  const components = new Map<string, MaterialDefinition>();

  return {
    components,

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
      if (components.has(def.name)) {
        console.warn(`Material "${def.name}" is already registered, overwriting.`);
      }
      components.set(def.name, def);
    },

    registerAll(defs: MaterialDefinition[]): void {
      defs.forEach((def) => this.register(def));
    },
  };
}
