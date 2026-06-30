/**
 * ResizablePanelGroup 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const resizablePanelGroupMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const category = next.category;

    const showPanel1 = propBool(p, "showPanel1", true);
    const showHandle = propBool(p, "showHandle", true);
    const showPanel2 = propBool(p, "showPanel2", true);
    const panel1Text = propStr(p, "panel1Text", "Panel 1");
    const panel2Text = propStr(p, "panel2Text", "Panel 2");

    const existing = ensureChildrenArray(next);
    const reusePanels = existing.filter((c) => c.type === "ResizablePanel");
    const reuseHandles = existing.filter((c) => c.type === "ResizableHandle");

    const children: ComponentNode[] = [];

    if (showPanel1) {
      const reusePanel = reusePanels[0];
      const id = reusePanel?.id ?? newId();
      const panelChildren = ensureChildrenArray(reusePanel ?? ({} as ComponentNode));
      const textReuse = panelChildren.find((c) => c.type === "Text");
      const rest = panelChildren.filter((c) => c.type !== "Text");
      children.push({
        id,
        type: "ResizablePanel",
        name: `ResizablePanel-${id}`,
        category,
        props: reusePanel?.props,
        children: [makeTextNode(panel1Text, category, textReuse), ...rest],
      });
    }

    if (showHandle) {
      const reuseHandle = reuseHandles[0];
      const id = reuseHandle?.id ?? newId();
      children.push({
        id,
        type: "ResizableHandle",
        name: `ResizableHandle-${id}`,
        category,
        props: reuseHandle?.props,
      });
    }

    if (showPanel2) {
      const reusePanel = reusePanels[1] ?? reusePanels[0];
      const id = reusePanel?.id ?? newId();
      const panelChildren = ensureChildrenArray(reusePanel ?? ({} as ComponentNode));
      const textReuse = panelChildren.find((c) => c.type === "Text");
      const rest = panelChildren.filter((c) => c.type !== "Text");
      children.push({
        id,
        type: "ResizablePanel",
        name: `ResizablePanel-${id}`,
        category,
        props: reusePanel?.props,
        children: [makeTextNode(panel2Text, category, textReuse), ...rest],
      });
    }

    next.children = children.length > 0 ? children : undefined;
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },

  childrenToProps(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const children = ensureChildrenArray(next);

    const panels = children.filter((c) => c.type === "ResizablePanel");
    const handles = children.filter((c) => c.type === "ResizableHandle");

    p.showPanel1 = panels.length >= 1;
    p.showPanel2 = panels.length >= 2;
    p.showHandle = handles.length > 0;

    if (panels[0]) p.panel1Text = pickTextFromNode(panels[0].children?.[0]) ?? propStr(p, "panel1Text", "Panel 1");
    if (panels[1]) p.panel2Text = pickTextFromNode(panels[1].children?.[0]) ?? propStr(p, "panel2Text", "Panel 2");

    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },
};
