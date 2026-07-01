/**
 * V5 Canvas Fidelity — 复合组件真实渲染
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { PreviewRenderFn } from "./types";
import { pstr, pnum } from "./types";

export const renderTabs: PreviewRenderFn = (props, children) => {
  const defaultValue = pstr(props, "defaultValue", "tab1");
  const tabs = (props.tabs as Array<{ id: string; label: string }>) ?? [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
  ];
  return (
    <Tabs defaultValue={defaultValue} data-design-mode="true">
      <TabsList className="h-7">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="text-[10px] h-6">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children ?? (
        <TabsContent value={defaultValue} className="p-2">
          <div className="text-xs text-muted-foreground">Tab content</div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export const renderTabsContent: PreviewRenderFn = (props, children) => {
  return (
    <TabsContent
      value={pstr(props, "value", "tab1")}
      data-design-mode="true"
      className="p-2"
    >
      {children ?? <div className="text-xs text-muted-foreground">Tab content</div>}
    </TabsContent>
  );
};

export const renderAccordion: PreviewRenderFn = (props, children) => {
  const type = pstr(props, "type", "single") as "single" | "multiple";
  const items = (props.items as Array<{ id: string; label: string; content?: string }>) ?? [
    { id: "item1", label: "Item 1", content: "Content 1" },
  ];
  return (
    <Accordion type={type} collapsible data-design-mode="true">
      {children ?? items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-xs py-2">{item.label}</AccordionTrigger>
          <AccordionContent className="text-xs pb-2">
            {item.content ?? ""}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const renderTable: PreviewRenderFn = (props, children) => {
  const cols = pnum(props, "cols", 3);
  const rows = pnum(props, "rows", 3);
  return (
    <Table data-design-mode="true">
      <TableHeader>
        <TableRow>
          {Array.from({ length: cols }).map((_, i) => (
            <TableHead key={i} className="text-[10px] h-7">
              Column {i + 1}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {children ?? Array.from({ length: rows }).map((_, row) => (
          <TableRow key={row}>
            {Array.from({ length: cols }).map((_, col) => (
              <TableCell key={col} className="text-[10px] py-1">
                Cell {row + 1},{col + 1}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const renderResizablePanelGroup: PreviewRenderFn = (props, children) => {
  const direction = pstr(props, "direction", "horizontal") as "horizontal" | "vertical";
  const panels = pnum(props, "panels", 2);
  return (
    <ResizablePanelGroup direction={direction} data-design-mode="true" className="min-h-[60px]">
      {children ?? Array.from({ length: panels }).map((_, i) => (
        <ResizablePanel key={i} defaultSize={100 / panels}>
          <div className="flex h-full items-center justify-center rounded border border-dashed text-[10px] text-muted-foreground">
            Panel {i + 1}
          </div>
        </ResizablePanel>
      ))}
      {children && panels > 1 && Array.from({ length: panels - 1 }).map((_, i) => (
        <ResizableHandle key={i} />
      ))}
    </ResizablePanelGroup>
  );
};
