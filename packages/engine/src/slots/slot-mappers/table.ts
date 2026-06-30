/**
 * Table 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propNum, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const tableMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const category = next.category;

    const showHeader = propBool(p, "showHeader", true);
    const columnsRaw = p.columns;
    const columns = Array.isArray(columnsRaw) ? columnsRaw.filter((v) => typeof v === "string") as string[] : [];
    const safeColumns = columns.length > 0 ? columns : ["Col 1"];
    const rowCount = Math.max(0, Math.floor(propNum(p, "rowCount", 2)));

    const existing = ensureChildrenArray(next);
    const reuseHeader = existing.find((c) => c.type === "TableHeader");
    const reuseBody = existing.find((c) => c.type === "TableBody");

    const nextChildren: ComponentNode[] = [];

    if (showHeader) {
      const headerId = reuseHeader?.id ?? newId();
      const reuseHeaderRow = reuseHeader ? ensureChildrenArray(reuseHeader).find((c) => c.type === "TableRow") : undefined;
      const reuseHeads = reuseHeaderRow ? ensureChildrenArray(reuseHeaderRow).filter((c) => c.type === "TableHead") : [];

      const headCells: ComponentNode[] = safeColumns.map((col, i) => {
        const reuse = reuseHeads[i];
        const id = reuse?.id ?? newId();
        const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
        return {
          id,
          type: "TableHead",
          name: `TableHead-${id}`,
          category,
          props: reuse?.props,
          children: [makeTextNode(col, category, reuseText)],
        };
      });

      const rowId = reuseHeaderRow?.id ?? newId();
      nextChildren.push({
        id: headerId,
        type: "TableHeader",
        name: `TableHeader-${headerId}`,
        category,
        props: reuseHeader?.props,
        children: [
          {
            id: rowId,
            type: "TableRow",
            name: `TableRow-${rowId}`,
            category,
            props: reuseHeaderRow?.props,
            children: headCells,
          },
        ],
      });
    }

    const bodyId = reuseBody?.id ?? newId();
    const reuseRows = reuseBody ? ensureChildrenArray(reuseBody).filter((c) => c.type === "TableRow") : [];

    const bodyRows: ComponentNode[] = Array.from({ length: rowCount }, (_, r) => {
      const reuseRow = reuseRows[r];
      const rowId = reuseRow?.id ?? newId();
      const reuseCells = ensureChildrenArray(reuseRow ?? ({} as ComponentNode)).filter((c) => c.type === "TableCell");
      const cells: ComponentNode[] = safeColumns.map((_, c) => {
        const reuseCell = reuseCells[c];
        const cellId = reuseCell?.id ?? newId();
        const reuseText = ensureChildrenArray(reuseCell ?? ({} as ComponentNode)).find((x) => x.type === "Text");
        return {
          id: cellId,
          type: "TableCell",
          name: `TableCell-${cellId}`,
          category,
          props: reuseCell?.props,
          children: [makeTextNode(`Cell ${r + 1}-${c + 1}`, category, reuseText)],
        };
      });
      return {
        id: rowId,
        type: "TableRow",
        name: `TableRow-${rowId}`,
        category,
        props: reuseRow?.props,
        children: cells,
      };
    });

    nextChildren.push({
      id: bodyId,
      type: "TableBody",
      name: `TableBody-${bodyId}`,
      category,
      props: reuseBody?.props,
      children: bodyRows,
    });

    next.children = nextChildren.length > 0 ? nextChildren : undefined;
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },

  childrenToProps(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const children = ensureChildrenArray(next);
    const header = children.find((c) => c.type === "TableHeader");
    const body = children.find((c) => c.type === "TableBody");
    p.showHeader = Boolean(header);

    const headerRow = header ? ensureChildrenArray(header).find((c) => c.type === "TableRow") : undefined;
    const headCells = headerRow ? ensureChildrenArray(headerRow).filter((c) => c.type === "TableHead") : [];
    if (headCells.length > 0) {
      p.columns = headCells.map((hc, i) => pickTextFromNode(hc.children?.[0]) ?? `Col ${i + 1}`);
    }

    const bodyRows = body ? ensureChildrenArray(body).filter((c) => c.type === "TableRow") : [];
    p.rowCount = bodyRows.length;

    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },
};
