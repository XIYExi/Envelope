import { z } from "zod";

export const editablePropSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum([
    "text",
    "number",
    "textarea",
    "select",
    "color",
    "switch",
    "radio",
    "image",
    "richText",
    "json",
    "code",
    "icon",
    "tailwind",
    "dataBinding",
    "eventBinding",
  ]),
  defaultValue: z.unknown().optional(),
  options: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  comment: z.string().optional(),
  group: z.string().optional(),
  order: z.number().optional(),
});

export type EditableProp = z.infer<typeof editablePropSchema>;

export const componentCategorySchema = z.enum([
  "layout",
  "form",
  "display",
  "feedback",
  "navigation",
  "data",
  "overlay",
  "custom",
]);

export type ComponentCategory = z.infer<typeof componentCategorySchema>;

export const materialDefinitionSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  description: z.string().optional(),
  category: componentCategorySchema,
  icon: z.string().optional(),
  editableProps: z.array(editablePropSchema).optional(),
  defaultProps: z.record(z.unknown()).optional(),
  defaultChildren: z.array(z.string()).optional(),
  supportsChildren: z.boolean().optional(),
  maxChildren: z.number().optional(),
  isContainer: z.boolean().optional(),
  tailwindClasses: z.string().optional(),
  documentation: z.string().optional(),
});

export type MaterialDefinition = z.infer<typeof materialDefinitionSchema>;

export interface MaterialRegistry {
  getByCategory: (category: ComponentCategory) => MaterialDefinition[];
  getAll: () => MaterialDefinition[];
  get: (name: string) => MaterialDefinition | undefined;
  register: (def: MaterialDefinition) => void;
  registerAll: (defs: MaterialDefinition[]) => void;
}
