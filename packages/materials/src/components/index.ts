import { createRegistry } from "../registry";
import { cardMaterial, cardHeaderMaterial, cardContentMaterial, cardFooterMaterial, separatorMaterial } from "./layout";
import { buttonMaterial, inputMaterial, labelMaterial } from "./form";
import { avatarMaterial, badgeMaterial } from "./display";
import { skeletonMaterial } from "./feedback";

export function createDefaultRegistry() {
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

  return registry;
}
