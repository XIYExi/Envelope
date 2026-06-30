import { describe, expect, it } from "vitest";
import type { ComponentNode } from "../src/schemas/page.schema";
import { syncAggregateSlotsChildrenToProps, syncAggregateSlotsPropsToChildren } from "../src/slots";

function n(partial: Partial<ComponentNode> & Pick<ComponentNode, "id" | "type" | "category">): ComponentNode {
  return {
    name: `${partial.type}-${partial.id}`,
    ...partial,
  };
}

describe("slots/aggregate-slot-mapper", () => {
  it("Alert：props → children 支持 showTitle/showDescription 开关、二次 sync 复用与递归同步子聚合组件", () => {
    const alert = n({
      id: "alert-1",
      type: "Alert",
      category: "feedback",
      props: { showTitle: true, showDescription: true, titleText: 1 as unknown as string, descriptionText: 0 as unknown as string },
      children: [
        n({ id: "rest-card", type: "Card", category: "layout", props: { showHeader: false, showContent: true, contentText: "Inner" } }),
      ],
    });

    const first = syncAggregateSlotsPropsToChildren(alert);
    const titleTextId = first.children?.find((c) => c.type === "AlertTitle")?.children?.[0]?.id;
    const descTextId = first.children?.find((c) => c.type === "AlertDescription")?.children?.[0]?.id;
    expect(titleTextId).toBeDefined();
    expect(descTextId).toBeDefined();
    expect(((first.children?.find((c) => c.type === "AlertTitle")?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("1");
    expect(((first.children?.find((c) => c.type === "AlertDescription")?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("0");

    const restCard = first.children?.find((c) => c.type === "Card");
    expect(restCard?.children?.some((c) => c.type === "CardHeader")).toBe(false);
    expect(restCard?.children?.some((c) => c.type === "CardContent")).toBe(true);

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), showTitle: false, showDescription: true, descriptionText: "D2" },
    });
    expect(second.children?.some((c) => c.type === "AlertTitle")).toBe(false);
    expect(second.children?.some((c) => c.type === "AlertDescription")).toBe(true);
    expect(second.children?.find((c) => c.type === "AlertDescription")?.children?.[0]?.id).toBe(descTextId);
    expect(((second.children?.find((c) => c.type === "AlertDescription")?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("D2");
  });

  it("Card：props → children 支持按 show* 增删 slot 子节点，并尽量复用已有 Text id", () => {
    const base = n({
      id: "card-1",
      type: "Card",
      category: "layout",
      props: {
        showHeader: true,
        showContent: true,
        showFooter: false,
        headerText: "H",
        contentText: "C",
        footerText: "F",
      },
    });

    const first = syncAggregateSlotsPropsToChildren(base);
    expect(first.children?.map((c) => c.type).sort()).toEqual(["CardContent", "CardHeader"].sort());
    expect(first.children?.find((c) => c.type === "CardHeader")?.children?.[0]?.type).toBe("Text");
    expect((first.children?.find((c) => c.type === "CardHeader")?.children?.[0]?.props as Record<string, unknown>)?.text).toBe("H");

    const contentTextId = first.children?.find((c) => c.type === "CardContent")?.children?.[0]?.id;
    expect(contentTextId).toBeDefined();

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), showHeader: false, showFooter: true, footerText: "F2" },
    });

    expect(second.children?.some((c) => c.type === "CardHeader")).toBe(false);
    expect(second.children?.some((c) => c.type === "CardFooter")).toBe(true);
    expect(second.children?.find((c) => c.type === "CardContent")?.children?.[0]?.id).toBe(contentTextId);
    expect((second.children?.find((c) => c.type === "CardFooter")?.children?.[0]?.props as Record<string, unknown>)?.text).toBe("F2");
  });

  it("Card：children → props 能从 Text 节点反推 show* 与 *Text（含非字符串 text）", () => {
    const card = n({
      id: "card-2",
      type: "Card",
      category: "layout",
      children: [
        n({
          id: "h",
          type: "CardHeader",
          category: "layout",
          children: [n({ id: "ht", type: "Text", category: "layout", props: { text: "H1" } })],
        }),
        n({
          id: "c",
          type: "CardContent",
          category: "layout",
          children: [n({ id: "ct", type: "Text", category: "layout", props: { text: 123 } })],
        }),
      ],
    });

    const next = syncAggregateSlotsChildrenToProps(card);
    const p = next.props as Record<string, unknown>;
    expect(p.showHeader).toBe(true);
    expect(p.showContent).toBe(true);
    expect(p.showFooter).toBe(false);
    expect(p.headerText).toBe("H1");
    expect(p.contentText).toBe("123");
  });

  it("Tabs：props → children 支持 showList/showContent 与 activeIndex(字符串) 的兜底钳制", () => {
    const tabs = n({
      id: "tabs-1",
      type: "Tabs",
      category: "layout",
      props: {
        showList: false,
        showContent: true,
        activeIndex: "2",
        tabs: [
          { label: "A", content: "AA" },
        ],
      },
    });

    const next = syncAggregateSlotsPropsToChildren(tabs);
    expect(next.children?.some((c) => c.type === "TabsList")).toBe(false);
    expect(next.children?.some((c) => c.type === "TabsContent")).toBe(true);
    expect((next.props as Record<string, unknown>).defaultValue).toBe("tab-0");
  });

  it("Tabs：children → props 支持从 trigger/content 反推 tabs，并根据 defaultValue 回写 activeIndex", () => {
    const tabs = n({
      id: "tabs-2",
      type: "Tabs",
      category: "layout",
      props: { defaultValue: "tab-1" },
      children: [
        n({
          id: "list",
          type: "TabsList",
          category: "layout",
          children: [
            n({ id: "t1", type: "TabsTrigger", category: "layout", children: [n({ id: "t1x", type: "Text", category: "layout", props: { text: "T1" } })] }),
            n({ id: "t2", type: "TabsTrigger", category: "layout", children: [n({ id: "t2x", type: "Text", category: "layout", props: { text: "T2" } })] }),
          ],
        }),
        n({ id: "c1", type: "TabsContent", category: "layout", children: [n({ id: "c1x", type: "Text", category: "layout", props: { text: "C1" } })] }),
        n({ id: "c2", type: "TabsContent", category: "layout", children: [n({ id: "c2x", type: "Text", category: "layout", props: { text: "C2" } })] }),
      ],
    });

    const next = syncAggregateSlotsChildrenToProps(tabs);
    const p = next.props as Record<string, unknown>;
    expect(p.showList).toBe(true);
    expect(p.showContent).toBe(true);
    expect(p.activeIndex).toBe(1);
    expect(p.tabs).toEqual([
      { label: "T1", content: "C1" },
      { label: "T2", content: "C2" },
    ]);
  });

  it("Pagination：props → children 支持 Prev/Next 与 active page", () => {
    const pg = n({
      id: "pg-1",
      type: "Pagination",
      category: "navigation",
      props: { pageCount: 3, currentPage: 2, showPrevNext: true },
    });

    const next = syncAggregateSlotsPropsToChildren(pg);
    const items = next.children ?? [];
    expect(items.filter((c) => c.type === "PaginationItem")).toHaveLength(5);
    expect((items[0]?.props as Record<string, unknown>)?.kind).toBe("prev");
    expect((items[4]?.props as Record<string, unknown>)?.kind).toBe("next");
    expect((items.find((c) => (c.props as Record<string, unknown> | undefined)?.page === 2)?.props as Record<string, unknown>)?.active).toBe(true);
  });

  it("Pagination：children → props 支持反推 currentPage/pageCount/showPrevNext", () => {
    const pg = n({
      id: "pg-2",
      type: "Pagination",
      category: "navigation",
      children: [
        n({ id: "p", type: "PaginationItem", category: "navigation", props: { kind: "prev" }, children: [n({ id: "pt", type: "Text", category: "navigation", props: { text: "Prev" } })] }),
        n({ id: "p1", type: "PaginationItem", category: "navigation", props: { page: 1, active: false }, children: [n({ id: "p1t", type: "Text", category: "navigation", props: { text: "1" } })] }),
        n({ id: "p2", type: "PaginationItem", category: "navigation", props: { page: 2, active: true }, children: [n({ id: "p2t", type: "Text", category: "navigation", props: { text: "2" } })] }),
        n({ id: "n", type: "PaginationItem", category: "navigation", props: { kind: "next" }, children: [n({ id: "nt", type: "Text", category: "navigation", props: { text: "Next" } })] }),
      ],
    });

    const next = syncAggregateSlotsChildrenToProps(pg);
    const p = next.props as Record<string, unknown>;
    expect(p.pageCount).toBe(2);
    expect(p.currentPage).toBe(2);
    expect(p.showPrevNext).toBe(true);
  });

  it("ContextMenu：props ↔ children 支持 triggerText/items 的双向映射", () => {
    const menu = n({
      id: "cm-1",
      type: "ContextMenu",
      category: "overlay",
      props: { showTrigger: true, showContent: true, items: ["A", "B"] },
    });

    const toChildren = syncAggregateSlotsPropsToChildren(menu);
    expect(toChildren.children?.some((c) => c.type === "ContextMenuTrigger")).toBe(true);
    expect(toChildren.children?.some((c) => c.type === "ContextMenuContent")).toBe(true);
    expect(((toChildren.children?.find((c) => c.type === "ContextMenuTrigger")?.children?.[0]?.props) as Record<string, unknown>)?.text).toBe("Right click");

    const toProps = syncAggregateSlotsChildrenToProps(n({
      id: "cm-2",
      type: "ContextMenu",
      category: "overlay",
      children: [
        n({
          id: "tr",
          type: "ContextMenuTrigger",
          category: "overlay",
          children: [n({ id: "btn", type: "Button", category: "overlay", props: { text: "T" } })],
        }),
        n({
          id: "ct",
          type: "ContextMenuContent",
          category: "overlay",
          children: [
            n({ id: "i1", type: "ContextMenuItem", category: "overlay", children: [n({ id: "i1t", type: "Text", category: "overlay", props: { text: "X" } })] }),
            n({ id: "i2", type: "ContextMenuItem", category: "overlay", children: [n({ id: "i2t", type: "Text", category: "overlay", props: { text: "Y" } })] }),
          ],
        }),
      ],
    }));

    const p = toProps.props as Record<string, unknown>;
    expect(p.triggerText).toBe("T");
    expect(p.items).toEqual(["X", "Y"]);
  });

  it("Accordion：props → children 支持 items 映射/默认兜底与二次 sync 复用 trigger/content/Text", () => {
    const acc = n({
      id: "acc-1",
      type: "Accordion",
      category: "layout",
      props: {
        items: [
          { title: "A", content: "AA" },
          { title: 1, content: null },
          "bad",
        ],
      },
    });

    const first = syncAggregateSlotsPropsToChildren(acc);
    const firstItem = first.children?.find((c) => c.type === "AccordionItem");
    const firstTriggerTextId = firstItem?.children?.find((c) => c.type === "AccordionTrigger")?.children?.[0]?.id;
    expect(first.children?.filter((c) => c.type === "AccordionItem")).toHaveLength(2);
    expect(firstTriggerTextId).toBeDefined();

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), items: [{ title: "A2", content: "AA2" }] },
    });
    const secondItem = second.children?.find((c) => c.type === "AccordionItem");
    expect(second.children?.filter((c) => c.type === "AccordionItem")).toHaveLength(1);
    expect(secondItem?.id).toBe(firstItem?.id);
    expect(secondItem?.children?.find((c) => c.type === "AccordionTrigger")?.children?.[0]?.id).toBe(firstTriggerTextId);
    expect(((secondItem?.children?.find((c) => c.type === "AccordionTrigger")?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("A2");
  });

  it("Accordion：children → props 支持从 trigger/content 反推 items（含缺省兜底）", () => {
    const acc = n({
      id: "acc-2",
      type: "Accordion",
      category: "layout",
      children: [
        n({
          id: "it-1",
          type: "AccordionItem",
          category: "layout",
          children: [
            n({ id: "tr-1", type: "AccordionTrigger", category: "layout", children: [n({ id: "tt-1", type: "Text", category: "layout", props: { text: "T1" } })] }),
            n({ id: "ct-1", type: "AccordionContent", category: "layout", children: [] }),
          ],
        }),
      ],
    });

    const next = syncAggregateSlotsChildrenToProps(acc);
    expect((next.props as Record<string, unknown>).items).toEqual([{ title: "T1", content: "Accordion content..." }]);
  });

  it("Table：props → children 支持 showHeader/columns/rowCount 钳制与二次 sync 复用 cell id", () => {
    const table = n({
      id: "table-1",
      type: "Table",
      category: "data",
      props: { showHeader: true, columns: ["A", "B"], rowCount: "2" },
    });

    const first = syncAggregateSlotsPropsToChildren(table);
    const header = first.children?.find((c) => c.type === "TableHeader");
    const headerRow = header?.children?.find((c) => c.type === "TableRow");
    const headCells = headerRow?.children?.filter((c) => c.type === "TableHead") ?? [];
    const body = first.children?.find((c) => c.type === "TableBody");
    const firstRow = body?.children?.find((c) => c.type === "TableRow");
    const firstCell = firstRow?.children?.find((c) => c.type === "TableCell");
    expect(headCells).toHaveLength(2);
    expect(body?.children?.filter((c) => c.type === "TableRow")).toHaveLength(2);
    expect(firstCell?.id).toBeDefined();

    const headCellId = headCells[0]?.id;
    const bodyCellId = firstCell?.id;

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), columns: ["A", "B", "C"], rowCount: 2 },
    });
    const header2 = second.children?.find((c) => c.type === "TableHeader");
    const headCells2 = header2?.children?.find((c) => c.type === "TableRow")?.children?.filter((c) => c.type === "TableHead") ?? [];
    const body2 = second.children?.find((c) => c.type === "TableBody");
    const firstCell2 = body2?.children?.find((c) => c.type === "TableRow")?.children?.find((c) => c.type === "TableCell");
    expect(headCells2).toHaveLength(3);
    expect(headCells2[0]?.id).toBe(headCellId);
    expect(firstCell2?.id).toBe(bodyCellId);

    const third = syncAggregateSlotsPropsToChildren({
      ...second,
      props: { ...(second.props as Record<string, unknown>), showHeader: false, rowCount: -1, columns: "bad" as unknown as string[] },
    });
    expect(third.children?.some((c) => c.type === "TableHeader")).toBe(false);
    expect(third.children?.some((c) => c.type === "TableBody")).toBe(true);
    expect(third.children?.find((c) => c.type === "TableBody")?.children).toEqual([]);
  });

  it("Table：children → props 在 header 无 headCells 时不覆盖已有 columns", () => {
    const table = n({
      id: "table-2",
      type: "Table",
      category: "data",
      props: { columns: ["keep"] },
      children: [
        n({
          id: "th",
          type: "TableHeader",
          category: "data",
          children: [n({ id: "tr", type: "TableRow", category: "data", children: [] })],
        }),
        n({ id: "tb", type: "TableBody", category: "data", children: [] }),
      ],
    });

    const next = syncAggregateSlotsChildrenToProps(table);
    const p = next.props as Record<string, unknown>;
    expect(p.showHeader).toBe(true);
    expect(p.columns).toEqual(["keep"]);
    expect(p.rowCount).toBe(0);
  });

  it("ResizablePanelGroup：props → children 支持 showPanel*/showHandle 开关与 panel2 复用单 panel 分支", () => {
    const group = n({
      id: "rpg-1",
      type: "ResizablePanelGroup",
      category: "layout",
      props: { showPanel1: false, showPanel2: true, showHandle: false, panel2Text: "P2" },
      children: [
        n({
          id: "p-1",
          type: "ResizablePanel",
          category: "layout",
          children: [
            n({ id: "pt", type: "Text", category: "layout", props: { text: "Old" } }),
            n({ id: "pb", type: "Button", category: "layout", props: { text: "Rest" } }),
          ],
        }),
        n({ id: "h-1", type: "ResizableHandle", category: "layout" }),
      ],
    });

    const next = syncAggregateSlotsPropsToChildren(group);
    const panels = next.children?.filter((c) => c.type === "ResizablePanel") ?? [];
    expect(panels).toHaveLength(1);
    expect(panels[0]?.id).toBe("p-1");
    expect(((panels[0]?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("P2");
    expect(panels[0]?.children?.some((c) => c.type === "Button")).toBe(true);
    expect(next.children?.some((c) => c.type === "ResizableHandle")).toBe(false);
  });

  it("Select/RadioGroup：props → children 支持 options 过滤、index 复用与 children → props 的 label/Text 兜底", () => {
    const select = n({
      id: "sel-1",
      type: "Select",
      category: "form",
      props: { options: ["A", 1, "B", null] },
    });
    const firstSelect = syncAggregateSlotsPropsToChildren(select);
    const firstSelId = firstSelect.children?.[0]?.id;
    expect(firstSelect.children?.filter((c) => c.type === "SelectItem")).toHaveLength(2);
    const secondSelect = syncAggregateSlotsPropsToChildren({
      ...firstSelect,
      props: { ...(firstSelect.props as Record<string, unknown>), options: ["A", "B", "C"] },
    });
    expect(secondSelect.children?.[0]?.id).toBe(firstSelId);

    const select2 = n({
      id: "sel-2",
      type: "Select",
      category: "form",
      children: [
        n({ id: "s1", type: "SelectItem", category: "form", props: { value: "x", label: 1 }, children: [n({ id: "s1t", type: "Text", category: "form", props: { text: "T1" } })] }),
        n({ id: "s2", type: "SelectItem", category: "form", props: { value: "y", label: "L2" } }),
        n({ id: "s3", type: "SelectItem", category: "form", props: { value: "z" } }),
      ],
    });
    expect((syncAggregateSlotsChildrenToProps(select2).props as Record<string, unknown>).options).toEqual(["T1", "L2", "Option"]);

    const radio = n({
      id: "rg-1",
      type: "RadioGroup",
      category: "form",
      props: { options: ["R1", 2, "R2"] },
    });
    const firstRadio = syncAggregateSlotsPropsToChildren(radio);
    const firstRadioId = firstRadio.children?.[0]?.id;
    const secondRadio = syncAggregateSlotsPropsToChildren({
      ...firstRadio,
      props: { ...(firstRadio.props as Record<string, unknown>), options: ["R1", "R2", "R3"] },
    });
    expect(secondRadio.children?.[0]?.id).toBe(firstRadioId);

    const radio2 = n({
      id: "rg-2",
      type: "RadioGroup",
      category: "form",
      children: [
        n({ id: "r1", type: "RadioGroupItem", category: "form", props: { value: "x", label: 1 }, children: [n({ id: "r1t", type: "Text", category: "form", props: { text: "RT1" } })] }),
        n({ id: "r2", type: "RadioGroupItem", category: "form", props: { value: "y" } }),
      ],
    });
    expect((syncAggregateSlotsChildrenToProps(radio2).props as Record<string, unknown>).options).toEqual(["RT1", "Option"]);
  });

  it("Breadcrumb：props ↔ children 支持 items 映射、Text 复用与 children → props 默认兜底", () => {
    const bc = n({
      id: "bc-1",
      type: "Breadcrumb",
      category: "navigation",
      props: { items: ["Home", 1, "Docs"] },
    });
    const first = syncAggregateSlotsPropsToChildren(bc);
    const firstTextId = first.children?.[0]?.children?.[0]?.id;
    expect(first.children?.filter((c) => c.type === "BreadcrumbItem")).toHaveLength(2);

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), items: ["Home", "Docs", "API"] },
    });
    expect(second.children?.[0]?.children?.[0]?.id).toBe(firstTextId);

    const bc2 = n({
      id: "bc-2",
      type: "Breadcrumb",
      category: "navigation",
      children: [n({ id: "bi-1", type: "BreadcrumbItem", category: "navigation", children: [] })],
    });
    expect((syncAggregateSlotsChildrenToProps(bc2).props as Record<string, unknown>).items).toEqual(["Item 1"]);
  });

  it("Popover/Tooltip/HoverCard：props → children 支持 show* 与 contentText 空串分支；children → props 支持缺少 Text 时不回写 contentText", () => {
    const types = ["Popover", "Tooltip", "HoverCard"] as const;
    for (const type of types) {
      const base = n({
        id: `popup-${type}`,
        type,
        category: "overlay",
        props: { showTrigger: true, showContent: true, triggerText: `${type}-T`, contentText: `${type}-C` },
      });
      const first = syncAggregateSlotsPropsToChildren(base);
      const trigger = first.children?.find((c) => c.type.endsWith("Trigger"));
      const content = first.children?.find((c) => c.type.endsWith("Content"));
      const btnId = trigger?.children?.[0]?.id;
      expect(btnId).toBeDefined();
      expect(content?.children?.some((c) => c.type === "Text")).toBe(true);

      const second = syncAggregateSlotsPropsToChildren({
        ...first,
        props: { ...(first.props as Record<string, unknown>), showTrigger: false, showContent: true, contentText: "" },
      });
      const content2 = second.children?.find((c) => c.type.endsWith("Content"));
      expect(second.children?.some((c) => c.type.endsWith("Trigger"))).toBe(false);
      expect(content2?.children?.some((c) => c.type === "Text")).toBe(false);

      const toProps = syncAggregateSlotsChildrenToProps(n({
        id: `popup-${type}-2`,
        type,
        category: "overlay",
        props: { contentText: "keep" },
        children: [
          n({ id: "tr", type: `${type}Trigger`, category: "overlay", children: [n({ id: "b", type: "Button", category: "overlay", props: { text: "Btn" } })] }),
          n({ id: "ct", type: `${type}Content`, category: "overlay", children: [n({ id: "x", type: "Button", category: "overlay", props: { text: "NoText" } })] }),
        ],
      }));
      const p = toProps.props as Record<string, unknown>;
      expect(p.showTrigger).toBe(true);
      expect(p.showContent).toBe(true);
      expect(p.contentText).toBe("keep");
    }
  });

  it("DropdownMenu：props ↔ children 支持 trigger/items 复用、show* 开关与 children → props items 兜底", () => {
    const menu = n({
      id: "dm-1",
      type: "DropdownMenu",
      category: "overlay",
      props: { showTrigger: true, showContent: true, items: ["A", "B"] },
    });
    const first = syncAggregateSlotsPropsToChildren(menu);
    const firstItemId = first.children?.find((c) => c.type === "DropdownMenuContent")?.children?.[0]?.id;
    expect(first.children?.some((c) => c.type === "DropdownMenuTrigger")).toBe(true);
    expect(((first.children?.find((c) => c.type === "DropdownMenuTrigger")?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("Open");

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), showTrigger: false, items: ["A", "B", "C"] },
    });
    expect(second.children?.some((c) => c.type === "DropdownMenuTrigger")).toBe(false);
    expect(second.children?.find((c) => c.type === "DropdownMenuContent")?.children?.[0]?.id).toBe(firstItemId);

    const back = syncAggregateSlotsChildrenToProps(n({
      id: "dm-2",
      type: "DropdownMenu",
      category: "overlay",
      children: [
        n({ id: "ct", type: "DropdownMenuContent", category: "overlay", children: [n({ id: "i1", type: "DropdownMenuItem", category: "overlay", children: [] })] }),
      ],
    }));
    expect((back.props as Record<string, unknown>).items).toEqual(["Item 1"]);
  });

  it("Drawer：props → children 支持 showTrigger/showHeader/showContent 组合与 children → props 的回写", () => {
    const drawer = n({
      id: "dr-1",
      type: "Drawer",
      category: "overlay",
      props: { showTrigger: true, showHeader: true, showContent: false, triggerText: "Open1", titleText: "T1", contentText: "C1" },
    });
    const first = syncAggregateSlotsPropsToChildren(drawer);
    const triggerBtnId = first.children?.find((c) => c.type === "DrawerTrigger")?.children?.[0]?.id;
    expect(triggerBtnId).toBeDefined();
    const content = first.children?.find((c) => c.type === "DrawerContent");
    expect(content?.children?.some((c) => c.type === "DrawerHeader")).toBe(true);
    expect(content?.children?.some((c) => c.type === "Text")).toBe(false);

    const toProps = syncAggregateSlotsChildrenToProps(first);
    const p = toProps.props as Record<string, unknown>;
    expect(p.showTrigger).toBe(true);
    expect(p.showHeader).toBe(true);
    expect(p.showContent).toBe(false);
    expect(p.titleText).toBe("T1");
  });

  it("Collapsible：props ↔ children 支持 show* 开关与 children → props 在缺少 Text 时不回写 contentText", () => {
    const col = n({
      id: "col-1",
      type: "Collapsible",
      category: "layout",
      props: { showTrigger: true, showContent: true, triggerText: "T1", contentText: "C1" },
    });
    const first = syncAggregateSlotsPropsToChildren(col);
    const btnId = first.children?.find((c) => c.type === "CollapsibleTrigger")?.children?.[0]?.id;
    expect(btnId).toBeDefined();

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), showContent: false },
    });
    expect(second.children?.some((c) => c.type === "CollapsibleContent")).toBe(false);

    const back = syncAggregateSlotsChildrenToProps(n({
      id: "col-2",
      type: "Collapsible",
      category: "layout",
      props: { contentText: "keep" },
      children: [
        n({ id: "ct", type: "CollapsibleContent", category: "layout", children: [n({ id: "x", type: "Button", category: "layout", props: { text: "NoText" } })] }),
      ],
    }));
    expect((back.props as Record<string, unknown>).contentText).toBe("keep");
  });

  it("Dialog：props → children 覆盖 show* 组合、description 分支与 footer Button 复用", () => {
    const dialog = n({
      id: "dlg-1",
      type: "Dialog",
      category: "overlay",
      props: {
        showTrigger: true,
        showHeader: true,
        showDescription: false,
        showFooter: true,
        triggerText: "Open1",
        titleText: "T1",
        descriptionText: "D1",
        primaryActionText: "OK",
        secondaryActionText: "Cancel",
      },
    });
    const first = syncAggregateSlotsPropsToChildren(dialog);
    const footerButtons = first.children
      ?.find((c) => c.type === "DialogContent")
      ?.children?.find((c) => c.type === "DialogFooter")
      ?.children?.filter((c) => c.type === "Button") ?? [];
    const secondaryId = footerButtons[0]?.id;
    expect(first.children?.some((c) => c.type === "DialogTrigger")).toBe(true);
    expect(first.children?.find((c) => c.type === "DialogContent")?.children?.find((c) => c.type === "DialogHeader")?.children?.some((c) => c.type === "DialogDescription")).toBe(false);
    expect(secondaryId).toBeDefined();

    const second = syncAggregateSlotsPropsToChildren({
      ...first,
      props: { ...(first.props as Record<string, unknown>), showTrigger: false, showDescription: true, descriptionText: 123 as unknown as string, secondaryActionText: "Back" },
    });
    const footerButtons2 = second.children
      ?.find((c) => c.type === "DialogContent")
      ?.children?.find((c) => c.type === "DialogFooter")
      ?.children?.filter((c) => c.type === "Button") ?? [];
    expect(second.children?.some((c) => c.type === "DialogTrigger")).toBe(false);
    expect(second.children?.find((c) => c.type === "DialogContent")?.children?.find((c) => c.type === "DialogHeader")?.children?.some((c) => c.type === "DialogDescription")).toBe(true);
    expect(((second.children?.find((c) => c.type === "DialogContent")?.children?.find((c) => c.type === "DialogHeader")?.children?.find((c) => c.type === "DialogDescription")?.children?.[0]?.props as Record<string, unknown>)?.text)).toBe("123");
    expect(footerButtons2[0]?.id).toBe(secondaryId);
  });

  it("Dialog/Sheet：children → props 支持从 title/buttons/text 反推，并覆盖 pickTextFromNode 的 label 分支", () => {
    const dialog = n({
      id: "dlg-2",
      type: "Dialog",
      category: "overlay",
      props: { titleText: "KeepTitle", secondaryActionText: "KeepSecondary", primaryActionText: "KeepPrimary" },
      children: [
        n({ id: "ct", type: "DialogContent", category: "overlay", children: [
          n({ id: "hd", type: "DialogHeader", category: "overlay", children: [
            n({ id: "tt", type: "DialogTitle", category: "overlay", children: [n({ id: "t", type: "Text", category: "overlay", props: { text: 0 } })] }),
          ] }),
          n({ id: "ft", type: "DialogFooter", category: "overlay", children: [
            n({ id: "b1", type: "Button", category: "overlay", props: { label: "Back" } }),
            n({ id: "b2", type: "Button", category: "overlay", props: { text: "Go" } }),
          ] }),
        ] }),
      ],
    });
    const dp = syncAggregateSlotsChildrenToProps(dialog).props as Record<string, unknown>;
    expect(dp.titleText).toBe("0");
    expect(dp.showDescription).toBe(false);
    expect(dp.secondaryActionText).toBe("Back");
    expect(dp.primaryActionText).toBe("Go");

    const sheet = n({
      id: "sh-1",
      type: "Sheet",
      category: "overlay",
      props: { descriptionText: "keep" },
      children: [
        n({ id: "st", type: "SheetTrigger", category: "overlay", children: [n({ id: "btn", type: "Button", category: "overlay", props: { text: "Open2" } })] }),
        n({ id: "sc", type: "SheetContent", category: "overlay", children: [
          n({ id: "bh", type: "Text", category: "overlay", props: { text: "Body" } }),
        ] }),
      ],
    });
    const sp = syncAggregateSlotsChildrenToProps(sheet).props as Record<string, unknown>;
    expect(sp.showHeader).toBe(false);
    expect(sp.showContent).toBe(true);
    expect(sp.bodyText).toBe("Body");
    expect(sp.descriptionText).toBe("keep");
  });

  it("AlertDialog：props → children 覆盖 showActions/showCancel/showHeader/showDescription 分支；children → props 支持 action/cancel 组合回写", () => {
    const ad = n({
      id: "ad-1",
      type: "AlertDialog",
      category: "overlay",
      props: { showTrigger: false, showHeader: true, showDescription: false, showActions: true, showCancel: false, titleText: "T1", actionText: "Act" },
    });
    const first = syncAggregateSlotsPropsToChildren(ad);
    const content = first.children?.find((c) => c.type === "AlertDialogContent");
    expect(first.children?.some((c) => c.type === "AlertDialogTrigger")).toBe(false);
    expect(content?.children?.some((c) => c.type === "AlertDialogHeader")).toBe(true);
    expect(content?.children?.some((c) => c.type === "AlertDialogCancel")).toBe(false);
    expect(content?.children?.some((c) => c.type === "AlertDialogAction")).toBe(true);

    const back = syncAggregateSlotsChildrenToProps(n({
      id: "ad-2",
      type: "AlertDialog",
      category: "overlay",
      props: { actionText: "KeepAction", cancelText: "KeepCancel" },
      children: [
        n({ id: "ct", type: "AlertDialogContent", category: "overlay", children: [
          n({ id: "cn", type: "AlertDialogCancel", category: "overlay", children: [n({ id: "btn", type: "Button", category: "overlay", props: { text: "Cancel2" } })] }),
        ] }),
      ],
    }));
    const p = back.props as Record<string, unknown>;
    expect(p.showActions).toBe(true);
    expect(p.showCancel).toBe(true);
    expect(p.cancelText).toBe("Cancel2");
    expect(p.actionText).toBe("KeepAction");
  });

  it("未知聚合组件：保持节点不变", () => {
    const node = n({ id: "x", type: "Button", category: "form", props: { label: "OK" } });
    const next = syncAggregateSlotsPropsToChildren(node);
    expect(next).toEqual(node);
  });

  it("smoke：支持的聚合组件类型可 props→children→props 往返（覆盖 switch 分支）", () => {
    const types = [
      "Alert",
      "Card",
      "Tabs",
      "Accordion",
      "Table",
      "ResizablePanelGroup",
      "Select",
      "RadioGroup",
      "Breadcrumb",
      "Pagination",
      "Popover",
      "Tooltip",
      "HoverCard",
      "DropdownMenu",
      "ContextMenu",
      "Drawer",
      "Collapsible",
      "Dialog",
      "Sheet",
      "AlertDialog",
    ];

    for (const type of types) {
      const node = n({ id: `t-${type}`, type, category: "layout", props: {} });
      const toChildren = syncAggregateSlotsPropsToChildren(node);
      const back = syncAggregateSlotsChildrenToProps(toChildren);
      expect(back.type).toBe(type);
      expect(back.id).toBe(`t-${type}`);
    }
  });
});
