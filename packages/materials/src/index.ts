// @envelope/materials — Component material schemas and registries
// Each shadcn/ui component has a material definition:
//   - schema: Zod-validated editableProps
//   - defaultProps: initial component configuration
//   - category: layout | form | display | feedback | navigation | data | overlay | custom

export type {
  MaterialDefinition,
  MaterialRegistry,
  EditableProp,
  ComponentCategory,
} from "./types/material";

export {
  materialDefinitionSchema,
  editablePropSchema,
  componentCategorySchema,
} from "./types/material";

export { createRegistry } from "./registry";
export { createDefaultRegistry } from "./components/index";

// Form components
export { buttonMaterial, inputMaterial, labelMaterial } from "./components/form";
// Layout components
export {
  cardMaterial,
  cardHeaderMaterial,
  cardContentMaterial,
  cardFooterMaterial,
  separatorMaterial,
} from "./components/layout";
// Display components
export { avatarMaterial, badgeMaterial } from "./components/display";
// Feedback components
export { skeletonMaterial } from "./components/feedback";

export const PACKAGE_NAME = "@envelope/materials";
export const VERSION = "3.0.0";
