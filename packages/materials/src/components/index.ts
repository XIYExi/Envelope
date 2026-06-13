import { createRegistry } from "../registry";
import {
  buttonMaterial,
  inputMaterial,
  labelMaterial,
  cardMaterial,
  cardHeaderMaterial,
  cardContentMaterial,
  cardFooterMaterial,
  separatorMaterial,
  avatarMaterial,
  skeletonMaterial,
  badgeMaterial,
} from "./core.materials";

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
