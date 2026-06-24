import type { MaterialRegistry } from "@envelope/materials";

// Lazy registry holder - set once during app initialization
let _materialRegistry: MaterialRegistry | null = null;

export function setMaterialRegistry(registry: MaterialRegistry): void {
  _materialRegistry = registry;
}

export function isContainerType(type: string): boolean {
  if (_materialRegistry) {
    const material = _materialRegistry.get(type);
    if (material) return material.isContainer === true;
  }
  // Fallback: hardcoded list for SSR/test environments where registry is not available
  const FALLBACK_CONTAINER_TYPES = new Set([
    "Box", "Flex", "Container", "Grid",
    "Card", "CardHeader", "CardContent", "CardFooter",
    "Tabs", "TabsContent", "Accordion", "AccordionItem", "AccordionContent",
    "Table", "TableHeader", "TableBody", "TableRow",
    "Alert", "DialogContent", "SheetContent", "AlertDialogContent",
    "ScrollArea", "AspectRatio", "ResizablePanelGroup", "ResizablePanel",
    "Breadcrumb", "TabsList", "Pagination", "DrawerContent",
    "PopoverContent", "HoverCardContent", "CollapsibleContent",
    "DropdownMenuContent", "ContextMenuContent",
  ]);
  return FALLBACK_CONTAINER_TYPES.has(type);
}

// Shared utility functions and constants for canvas/slot modules
// All functions are kept identical to their original definitions to ensure zero behavioral change

export function newId(): string {
  return crypto.randomUUID();
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function propBool(props: Record<string, unknown> | undefined, key: string, fallback: boolean): boolean {
  const v = props?.[key];
  if (typeof v === "boolean") return v;
  if (v === undefined) return fallback;
  return Boolean(v);
}

export function propStr(props: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const v = props?.[key];
  if (typeof v === "string") return v;
  if (v === undefined || v === null) return fallback;
  return String(v);
}

export function propNum(props: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const v = props?.[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return fallback;
}

export function ensureProps(node: { props?: Record<string, unknown> }): Record<string, unknown> {
  return (node.props ?? {}) as Record<string, unknown>;
}

export function ensureChildren(node: { children?: any[] }): any[] {
  return (node as any).children ?? [];
}

export function cloneNode<T extends { props?: any; children?: any[] }>(node: T): T {
  return {
    ...node,
    props: node.props ? { ...(node.props as Record<string, unknown>) } : undefined,
    children: node.children ? node.children.map((c: any) => cloneNode(c)) : undefined,
  } as T;
}

export function makeTextNode(text: string, category: string, reuse?: { id: string; type: string }): { id: string; type: string; name: string; category: string; props: { text: string } } {
  const id = reuse?.type === "Text" ? reuse.id : newId();
  return { id, type: "Text", name: `Text-${id}`, category, props: { text } };
}

export function pickTextFromNode(node: { props?: Record<string, unknown>; type?: string; children?: any[] } | undefined): string | null {
  if (!node) return null;
  const p = node.props as Record<string, unknown> | undefined;
  if (node.type === "Text") {
    const t = p?.text;
    return typeof t === "string" ? t : t === undefined || t === null ? "" : String(t);
  }
  if (typeof p?.text === "string") return p.text;
  if (typeof p?.label === "string") return p.label;
  return null;
}

// Canvas grid constants (single source of truth)
export const CANVAS_CELL_WIDTH = 80;
export const CANVAS_CELL_HEIGHT = 40;
