// @envelope/engine — Core lowcode engine
// Responsibilities:
//   - Schema layer: project/routes/pages/db/auth/flow schema definitions and validation (Zod)
//   - Schema versioning and migration
//   - Canvas renderer: simulated component rendering from JSON with DnD Kit
//   - Property editor: reflective FormEditor from component editableProps schemas
//   - Undo/redo: command-pattern history stack
//   - State: Zustand stores for editor state

export * from "./schemas/index";
export * from "./validation/index";

export const PACKAGE_NAME = "@envelope/engine";
export const VERSION = "3.0.0";
