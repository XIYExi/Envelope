"use client";

import { forwardRef, useCallback, useRef, useState, useEffect, type CSSProperties, type MouseEvent as RMouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import type { CanvasComponent } from "./types";

const CELL_HEIGHT = 40;
const CELL_WIDTH = 80;
const RESIZE_HANDLE_SIZE = 8;

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(...inputs.filter(Boolean).map(String));
}

/** Simulate a component's visual representation from its type and props */
function pstr(props: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const v = props?.[key];
  return typeof v === "string" ? v : fallback;
}
function pnum(props: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const v = props?.[key];
  return typeof v === "number" ? v : fallback;
}
function pbool(props: Record<string, unknown> | undefined, key: string): boolean {
  return !!props?.[key];
}

function SimulatedContent({ comp }: { comp: CanvasComponent }) {
  const { type, props } = comp.node;

  switch (type) {
    // ===== Container components =====
    case "Card":
      return (
        <div className="flex h-full flex-col rounded-lg border bg-card p-3">
          <div className="mb-1 text-xs font-semibold text-muted-foreground">{pstr(props, "label", "Card")}</div>
          <div className="flex-1">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );
    case "CardHeader":
      return <div className="flex items-center gap-2 p-2 text-xs font-medium">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
    case "CardContent":
      return <div className="flex-1 p-2 text-xs text-muted-foreground">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;
    case "CardFooter":
      return <div className="flex items-center justify-end gap-2 border-t p-2">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;

    case "DialogContent":
    case "SheetContent":
    case "AlertDialogContent":
      return (
        <div className="flex h-full flex-col rounded-lg border-2 border-primary/30 bg-background p-3 shadow-lg">
          <div className="mb-1 text-xs font-semibold">{pstr(props, "label", type.replace("Content", ""))}</div>
          <div className="flex-1 text-xs text-muted-foreground">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );

    case "Tabs":
      return (
        <div className="flex h-full flex-col">
          <div className="flex gap-1 border-b pb-1">
            <div className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium">Tab 1</div>
            <div className="rounded px-2 py-0.5 text-[10px] text-muted-foreground">Tab 2</div>
            <div className="rounded px-2 py-0.5 text-[10px] text-muted-foreground">Tab 3</div>
          </div>
          <div className="flex-1 p-2">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );
    case "TabsContent":
      return <div className="p-1 text-xs">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>;

    case "Accordion":
      return (
        <div className="flex h-full flex-col gap-0.5">
          <div className="flex items-center justify-between rounded bg-muted/50 px-2 py-1 text-[10px] font-medium">
            <span>Section 1</span><span>▼</span>
          </div>
          <div className="p-1">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );

    case "Table":
      return (
        <div className="flex h-full flex-col text-[10px]">
          <div className="flex border-b bg-muted/50 font-medium">
            <div className="flex-1 px-1 py-0.5">Col 1</div>
            <div className="flex-1 border-l px-1 py-0.5">Col 2</div>
            <div className="flex-1 border-l px-1 py-0.5">Col 3</div>
          </div>
          <div className="flex border-b">
            <div className="flex-1 px-1 py-0.5">...</div>
            <div className="flex-1 border-l px-1 py-0.5">...</div>
            <div className="flex-1 border-l px-1 py-0.5">...</div>
          </div>
        </div>
      );

    // ===== Form components =====
    case "Button": {
      const variant = pstr(props, "variant", "default");
      const size = pstr(props, "size", "default");
      const label = pstr(props, "label", "Button");
      const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : size === "lg" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs";
      const variantClass: string = ({
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "",
        link: "underline text-primary",
      } as Record<string, string>)[variant] ?? "bg-primary text-primary-foreground";
      return (
        <button
          className={cn("inline-flex items-center justify-center rounded-md font-medium", sizeClass, variantClass)}
          tabIndex={-1}
        >
          {label}
        </button>
      );
    }

    case "Input":
      return (
        <div className="flex h-8 items-center rounded-md border bg-background px-2 text-xs text-muted-foreground">
          {pstr(props, "placeholder", "Input...")}
        </div>
      );

    case "Textarea":
      return (
        <div className="flex h-full items-start rounded-md border bg-background p-2 text-xs text-muted-foreground">
          {pstr(props, "placeholder", "Enter text...")}
        </div>
      );

    case "Label":
      return <span className="text-xs font-medium">{pstr(props, "label", "Label")}</span>;

    case "Checkbox": {
      const checked = pbool(props, "defaultChecked");
      const label = pstr(props, "label", "Checkbox");
      return (
        <label className="inline-flex items-center gap-2 text-xs">
          <span className={cn("flex h-4 w-4 items-center justify-center rounded border", checked ? "bg-primary border-primary text-primary-foreground" : "")}>
            {checked ? "✓" : ""}
          </span>
          {label}
        </label>
      );
    }

    case "RadioGroup":
      return (
        <div className="flex flex-col gap-1">
          <label className="inline-flex items-center gap-1.5 text-xs"><span className="inline-block h-3 w-3 rounded-full border-2 border-primary"></span>Option 1</label>
          <label className="inline-flex items-center gap-1.5 text-xs"><span className="inline-block h-3 w-3 rounded-full border"></span>Option 2</label>
        </div>
      );

    case "Switch": {
      const checked = pbool(props, "defaultChecked");
      return (
        <label className="inline-flex items-center gap-2 text-xs">
          <span className={cn("flex h-5 w-9 items-center rounded-full p-0.5 transition-colors", checked ? "bg-primary justify-end" : "bg-muted justify-start")}>
            <span className="h-4 w-4 rounded-full bg-background shadow" />
          </span>
          {pstr(props, "label", "")}
        </label>
      );
    }

    case "Select":
      return (
        <div className="flex h-8 items-center justify-between rounded-md border bg-background px-2 text-xs text-muted-foreground">
          <span>{pstr(props, "placeholder", "Select...")}</span>
          <span>▼</span>
        </div>
      );

    case "Slider":
      return (
        <div className="flex items-center gap-2">
          <div className="relative h-2 flex-1 rounded-full bg-muted">
            <div className="absolute h-2 rounded-full bg-primary" style={{ width: `${pnum(props, "defaultValue", 50)}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground">{pnum(props, "defaultValue", 50)}</span>
        </div>
      );

    case "Toggle": {
      const active = pbool(props, "pressed");
      return (
        <div className={cn("inline-flex items-center rounded-md px-3 py-1 text-xs font-medium", active ? "bg-muted" : "")}>
          {pstr(props, "label", "Toggle")}
        </div>
      );
    }

    case "ToggleGroup":
      return (
        <div className="inline-flex items-center rounded-md border">
          <div className="rounded-l-md bg-muted px-2 py-1 text-[10px] font-medium">A</div>
          <div className="border-l px-2 py-1 text-[10px]">B</div>
          <div className="border-l rounded-r-md px-2 py-1 text-[10px]">C</div>
        </div>
      );

    // ===== Display components =====
    case "Avatar": {
      const initial = String(pstr(props, "label", pstr(props, "name", "?"))).charAt(0).toUpperCase();
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <span className="text-xs font-medium text-muted-foreground">{initial}</span>
        </div>
      );
    }

    case "Badge": {
      const variant = pstr(props, "variant", "default");
      const variantClass: string = ({
        default: "bg-primary/15 text-primary",
        secondary: "bg-muted text-muted-foreground",
        destructive: "bg-destructive/15 text-destructive",
        outline: "border",
      } as Record<string, string>)[variant] ?? "bg-primary/15 text-primary";
      return (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", variantClass)}>
          {pstr(props, "label", "Badge")}
        </span>
      );
    }

    // ===== Feedback components =====
    case "Skeleton": {
      const className = pstr(props, "className", "h-4 w-full");
      return <div className={cn("animate-pulse rounded bg-muted", className)} />;
    }

    case "Alert": {
      const variant = pstr(props, "variant", "default");
      const variantColor = variant === "destructive" ? "border-destructive/50 bg-destructive/10" : "border-primary/50 bg-primary/5";
      return (
        <div className={cn("flex h-full flex-col gap-1 rounded-lg border p-2", variantColor)}>
          <span className="text-[10px] font-semibold">⚠ Alert</span>
          {comp.node.children && <ChildrenSlot components={comp.node.children} />}
        </div>
      );
    }

    case "Progress": {
      const value = pnum(props, "value", 0);
      return (
        <div className="h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
        </div>
      );
    }

    // ===== Navigation components =====
    case "Breadcrumb":
      return <div className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">Home / <span className="font-medium text-foreground">Current</span></div>;
    case "Pagination":
      return (
        <div className="inline-flex items-center gap-1">
          <div className="rounded border px-1.5 py-0.5 text-[10px]">‹</div>
          <div className="rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">1</div>
          <div className="rounded border px-1.5 py-0.5 text-[10px]">2</div>
          <div className="rounded border px-1.5 py-0.5 text-[10px]">3</div>
          <div className="rounded border px-1.5 py-0.5 text-[10px]">›</div>
        </div>
      );

    // ===== Layout components =====
    case "Separator":
      return <hr className="border-muted" />;
    case "ScrollArea":
      return (
        <div className="flex h-full items-center justify-center overflow-hidden rounded border text-[10px] text-muted-foreground">
          {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : "Scroll Area"}
        </div>
      );

    case "AspectRatio":
      return (
        <div className="flex h-full w-full items-center justify-center rounded border-2 border-dashed bg-muted/30 text-[10px] text-muted-foreground">
          {comp.node.children ? <ChildrenSlot components={comp.node.children} /> : `${pnum(props, "ratio", 1)}:1`}
        </div>
      );

    case "ResizablePanelGroup":
      return (
        <div className="flex h-full">
          <div className="flex-1 border-r-2 p-1 text-[10px]">Panel 1</div>
          <div className="w-1.5 cursor-col-resize bg-muted" />
          <div className="flex-1 p-1 text-[10px]">Panel 2</div>
        </div>
      );

    // ===== Overlay components =====
    case "Dialog":
    case "Sheet":
    case "AlertDialog":
    case "Popover":
    case "Tooltip":
    case "HoverCard":
    case "Drawer":
      return <div className="flex h-full items-center justify-center rounded border-2 border-dashed border-muted-foreground/30 text-[10px] text-muted-foreground">{type}</div>;

    case "DropdownMenu":
    case "ContextMenu":
      return (
        <div className="rounded border bg-background p-1 shadow">
          <div className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">Item 1</div>
          <div className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">Item 2</div>
          <div className="my-0.5 border-t" />
          <div className="rounded px-2 py-0.5 text-[10px] hover:bg-muted">Item 3</div>
        </div>
      );

    case "Collapsible":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-1 text-[10px] font-medium">▶ {pstr(props, "label", "Toggle")}</div>
          <div className="flex-1 p-1">{comp.node.children && <ChildrenSlot components={comp.node.children} />}</div>
        </div>
      );

    // ===== Default fallback =====
    default:
      return (
        <div className="flex h-full items-center justify-center rounded bg-muted/30 text-[10px] font-medium text-muted-foreground">
          {type}
        </div>
      );
  }
}

/** Render a list of child component nodes (for nested rendering) */
function ChildrenSlot({ components }: { components: { type: string; props?: Record<string, unknown>; id: string }[] }) {
  if (!components || components.length === 0) return null;
  return (
    <div className="space-y-1">
      {components.map((child) => (
        <SimulatedChildContent key={child.id} type={child.type} props={child.props} />
      ))}
    </div>
  );
}

function SimulatedChildContent({ type, props }: { type: string; props?: Record<string, unknown> }) {
  switch (type) {
    case "Button":
      return <button className="inline-flex items-center rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground" tabIndex={-1}>{(props?.label as string) || "Btn"}</button>;
    case "Input":
      return <div className="h-6 rounded border bg-background px-1 text-[10px] leading-6 text-muted-foreground">{(props?.placeholder as string) || "Input"}</div>;
    case "Label":
      return <span className="text-[10px] font-medium">{(props?.label as string) || "Label"}</span>;
    case "Badge":
      return <span className="inline-flex rounded-full bg-primary/15 px-1.5 py-0 text-[10px] font-medium text-primary">{(props?.label as string) || "Badge"}</span>;
    case "Avatar":
      return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px]">?</span>;
    case "Separator":
      return <hr className="border-muted" />;
    case "Skeleton":
      return <div className="h-3 animate-pulse rounded bg-muted" />;
    case "Alert":
      return <div className="rounded border border-primary/50 px-1 py-0.5 text-[10px]">⚠ Alert</div>;
    case "Progress":
      return <div className="h-1.5 w-20 rounded-full bg-muted"><div className="h-1.5 w-1/2 rounded-full bg-primary" /></div>;
    case "Checkbox":
      return <label className="inline-flex items-center gap-1 text-[10px]"><span className="flex h-3 w-3 items-center justify-center rounded border">✓</span>{(props?.label as string) || ""}</label>;
    case "Switch":
      return <span className="inline-flex h-4 w-7 items-center rounded-full bg-primary p-0.5"><span className="h-3 w-3 rounded-full bg-background" /></span>;
    case "CardHeader":
      return <div className="rounded-t border-b bg-muted/30 p-1 text-[10px] font-medium">Header</div>;
    case "CardContent":
      return <div className="p-1 text-[10px] text-muted-foreground">Content</div>;
    case "CardFooter":
      return <div className="rounded-b border-t bg-muted/10 p-1 text-[10px]">Footer</div>;
    case "TabsList":
      return <div className="inline-flex gap-0.5 rounded bg-muted p-0.5 text-[10px]"><span className="rounded bg-background px-1">Tab</span></div>;
    case "TabsTrigger":
      return <span className="inline-flex rounded px-1 py-0.5 text-[10px] font-medium">Tab</span>;
    case "BreadcrumbItem":
      return <span className="text-[10px] text-muted-foreground">/ Page</span>;
    case "BreadcrumbLink":
      return <span className="text-[10px] text-primary underline">Link</span>;
    case "DropdownMenuItem":
      return <div className="rounded px-1 py-0.5 text-[10px] hover:bg-muted">Action</div>;
    case "TableHeader":
      return <div className="flex border-b bg-muted/50 font-medium text-[10px]"><div className="flex-1 px-1">H1</div><div className="flex-1 px-1">H2</div></div>;
    case "TableBody":
      return <div className="text-[10px]"><div className="flex border-b"><div className="flex-1 px-1">D1</div><div className="flex-1 px-1">D2</div></div></div>;
    case "TableRow":
      return <div className="flex border-b text-[10px]"><div className="flex-1 px-1">Cell</div></div>;
    default:
      return <div className="rounded bg-muted/30 px-1 py-0.5 text-[10px] text-muted-foreground">{type}</div>;
  }
}

// ===== Resize Handle =====

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const resizeHandleStyles: Record<ResizeDirection, CSSProperties> = {
  n:  { top: -RESIZE_HANDLE_SIZE/2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "n-resize" },
  s:  { bottom: -RESIZE_HANDLE_SIZE/2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "s-resize" },
  e:  { right: -RESIZE_HANDLE_SIZE/2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "e-resize" },
  w:  { left: -RESIZE_HANDLE_SIZE/2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "w-resize" },
  ne: { top: -RESIZE_HANDLE_SIZE/2, right: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "ne-resize" },
  nw: { top: -RESIZE_HANDLE_SIZE/2, left: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "nw-resize" },
  se: { bottom: -RESIZE_HANDLE_SIZE/2, right: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "se-resize" },
  sw: { bottom: -RESIZE_HANDLE_SIZE/2, left: -RESIZE_HANDLE_SIZE/2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "sw-resize" },
};

const allResizeDirections: ResizeDirection[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

// ===== Main Canvas Renderer =====

interface CanvasRendererProps {
  components: CanvasComponent[];
  selectedIds: string[];
  onSelect: (id: string, multi?: boolean) => void;
  onClearSelection: () => void;
  onResize: (id: string, width: number, height: number) => void;
  zoom: number;
  viewportWidth: number;
  panX: number;
  panY: number;
  onPan: (dx: number, dy: number) => void;
  gridCols: number;
  gridGap: number;
}

export const CanvasRenderer = forwardRef<HTMLDivElement, CanvasRendererProps>(
  function CanvasRenderer({
    components, selectedIds, onSelect, onClearSelection, onResize,
    zoom, viewportWidth, panX, panY, onPan, gridCols, gridGap,
  }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef({ x: 0, y: 0 });

    const handleMouseDown = useCallback((e: RMouseEvent) => {
      if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.canvasBg === "true") {
        if (e.button === 0) {
          setIsPanning(true);
          panStart.current = { x: e.clientX - panX, y: e.clientY - panY };
        }
      }
    }, [panX, panY]);

    const handleMouseMove = useCallback((e: RMouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        onPan(panX + dx, panY + dy);
      }
    }, [isPanning, panX, panY, onPan]);

    const handleMouseUp = useCallback(() => {
      setIsPanning(false);
    }, []);

    useEffect(() => {
      if (!isPanning) return;
      window.addEventListener("mouseup", handleMouseUp);
      return () => window.removeEventListener("mouseup", handleMouseUp);
    }, [isPanning, handleMouseUp]);

    return (
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-muted/30"
        style={{ cursor: isPanning ? "grabbing" : "default" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={ref}
          data-canvas-bg="true"
          className="absolute top-4 rounded-lg border bg-background shadow-sm transition-shadow"
          style={{
            left: `${panX + 16}px`,
            top: `${panY + 16}px`,
            width: `${viewportWidth}px`,
            minHeight: "600px",
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).dataset.canvasBg === "true") {
              onClearSelection();
            }
          }}
        >
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)`,
              backgroundSize: `${CELL_WIDTH}px ${CELL_HEIGHT}px`,
            }}
          />

          {/* Components grid */}
          <div
            className="relative grid p-4"
            style={{
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: `${gridGap}px`,
            }}
          >
            {components.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p className="text-sm font-medium">Drop components here</p>
                <p className="mt-1 text-xs">Drag from the component panel on the left</p>
              </div>
            )}

            {components.map((comp) => {
              const { x: rawX, y: rawY, width: rawW, height: rawH } = comp.position;
              if (rawX < 1 || rawY < 1 || rawW < 1 || rawH < 1) return null;

              const x = Math.max(1, Math.min(gridCols, rawX));
              const y = Math.max(1, rawY);
              const width = Math.max(1, Math.min(gridCols - x + 1, rawW));
              const height = Math.max(1, rawH);
              const isSelected = selectedIds.includes(comp.id);

              return (
                <div
                  key={comp.id}
                  className={cn(
                    "group relative rounded-md border-2 transition-all",
                    isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent hover:border-blue-300",
                  )}
                  style={{
                    gridColumn: `${x} / span ${width}`,
                    gridRow: `${y} / span ${height}`,
                    minHeight: `${height * CELL_HEIGHT}px`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
                  }}
                >
                  <SimulatedContent comp={comp} />

                  {/* Selection badge */}
                  {isSelected && (
                    <div className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow">
                      ✓
                    </div>
                  )}

                  {/* Resize handles */}
                  {isSelected && allResizeDirections.map((dir) => (
                    <div
                      key={dir}
                      className="absolute z-10 rounded-full border border-blue-500 bg-white hover:bg-blue-100"
                      style={resizeHandleStyles[dir]}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const startW = width;
                        const startH = height;

                        const handleMove = (ev: globalThis.MouseEvent) => {
                          const dx = (ev.clientX - startX) / (CELL_WIDTH * zoom);
                          const dy = (ev.clientY - startY) / (CELL_HEIGHT * zoom);

                          let newW = startW;
                          let newH = startH;

                          if (dir.includes("e")) newW = Math.max(1, Math.round(startW + dx));
                          if (dir.includes("w")) newW = Math.max(1, Math.round(startW - dx));
                          if (dir.includes("s")) newH = Math.max(1, Math.round(startH + dy));
                          if (dir.includes("n")) newH = Math.max(1, Math.round(startH - dy));

                          onResize(comp.id, newW, newH);
                        };

                        const handleUp = () => {
                          window.removeEventListener("mousemove", handleMove);
                          window.removeEventListener("mouseup", handleUp);
                        };

                        window.addEventListener("mousemove", handleMove);
                        window.addEventListener("mouseup", handleUp);
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
