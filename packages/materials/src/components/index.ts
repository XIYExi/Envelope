import { createRegistry } from "../registry";
import type { MaterialRegistry } from "../types/material";
import { cardMaterial, cardHeaderMaterial, cardContentMaterial, cardFooterMaterial, separatorMaterial } from "./layout";
import { buttonMaterial, inputMaterial, labelMaterial } from "./form";
import { avatarMaterial, badgeMaterial } from "./display";
import { skeletonMaterial } from "./feedback";

let defaultRegistry: MaterialRegistry | null = null;

export function createDefaultRegistry(): MaterialRegistry {
  if (defaultRegistry) return defaultRegistry;

  const registry = createRegistry();

  registry.registerAll([
    // Layout
    cardMaterial,
    cardHeaderMaterial,
    cardContentMaterial,
    cardFooterMaterial,
    separatorMaterial,

    // Form
    buttonMaterial,
    inputMaterial,
    labelMaterial,

    // Display
    avatarMaterial,
    badgeMaterial,

    // Feedback
    skeletonMaterial,
  ]);

  defaultRegistry = registry;
  return registry;
}
