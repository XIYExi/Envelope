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
export {
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
} from "./components/core.materials";

export const PACKAGE_NAME = "@envelope/materials";
export const VERSION = "3.0.0";
