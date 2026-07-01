import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { CanvasRenderer } from "../../src/canvas/renderer";
import { CanvasHost } from "../../src/canvas/canvas-host";
import type { CanvasComponent, DomRectEntry } from "../../src/canvas/types";

function createComp(
  id: string,
  type: string,
  props?: Record<string, unknown>,
  position?: { x: number; y: number; width: number; height: number },
  children?: { id: string; type: string; category: string; props?: Record<string, unknown> }[],
): CanvasComponent {
  return {
    id,
    node: {
      id,
      type,
      category: "test",
      props,
      children,
    },
    position: position ?? { x: 1, y: 1, width: 2, height: 1 },
  };
}

/** 创建测试用 CanvasHost（V6: BemTools 需要 host 才能渲染） */
function makeHost(components: CanvasComponent[], domRects?: Record<string, DomRectEntry>): CanvasHost {
  const host = new CanvasHost({
    viewport: { panX: 0, panY: 0, zoom: 1 },
    grid: {
      columnWidth: 80,
      gap: 8,
      padding: 16,
      cellWidth: 80,
      cellHeight: 40,
      gridCols: 12,
      positionMode: "grid",
    },
  });
  host.setComponents(components);
  if (domRects) host.setDomRects(domRects);
  return host;
}

describe("CanvasRenderer（React）", () => {
  it("可以渲染常见组件占位并覆盖主要分支", () => {
    const components: CanvasComponent[] = [
      createComp("btn-1", "Button", { label: "提交", variant: "unknown" }, { x: 1, y: 1, width: 2, height: 1 }),
      createComp("checkbox-1", "Checkbox", { label: "勾选我", defaultChecked: true }, { x: 3, y: 1, width: 2, height: 1 }),
      createComp("badge-1", "Badge", { label: "NEW", variant: "secondary" }, { x: 5, y: 1, width: 2, height: 1 }),
      createComp("slider-1", "Slider", { defaultValue: 70 }, { x: 7, y: 1, width: 3, height: 1 }),
      createComp(
        "card-1",
        "Card",
        { label: "卡片" },
        { x: 1, y: 2, width: 4, height: 2 },
        [
          { id: "card-child-1", type: "Button", category: "form", props: { label: "子按钮" } },
          { id: "card-child-2", type: "Input", category: "form", props: { placeholder: "子输入" } },
          { id: "card-child-3", type: "Separator", category: "layout" },
          { id: "card-child-4", type: "Badge", category: "display", props: { label: "子徽章" } },
          { id: "card-child-5", type: "Progress", category: "feedback" },
          { id: "card-child-6", type: "Switch", category: "form" },
        ],
      ),
      createComp("unknown-1", "UnknownWidget", undefined, { x: 5, y: 2, width: 3, height: 1 }),
      createComp("aspect-1", "AspectRatio", { ratio: 16 / 9 }, { x: 8, y: 2, width: 4, height: 2 }),
      createComp("progress-1", "Progress", { value: 35 }, { x: 1, y: 4, width: 4, height: 1 }),
      createComp("alert-1", "Alert", { variant: "destructive" }, { x: 5, y: 4, width: 4, height: 1 }),
      createComp("input-1", "Input", { placeholder: "请输入" }, { x: 9, y: 4, width: 4, height: 1 }),
      createComp("textarea-1", "Textarea", { placeholder: "多行" }, { x: 1, y: 5, width: 4, height: 2 }),
      createComp("label-1", "Label", { label: "标签" }, { x: 5, y: 5, width: 2, height: 1 }),
      createComp("switch-1", "Switch", { label: "开关", defaultChecked: true }, { x: 7, y: 5, width: 2, height: 1 }),
      createComp("select-1", "Select", { placeholder: "请选择" }, { x: 9, y: 5, width: 4, height: 1 }),
      createComp("toggle-1", "Toggle", { label: "切换", pressed: true }, { x: 1, y: 7, width: 2, height: 1 }),
      createComp("toggle-group-1", "ToggleGroup", undefined, { x: 3, y: 7, width: 3, height: 1 }),
      createComp("avatar-1", "Avatar", { label: "Alice" }, { x: 6, y: 7, width: 2, height: 1 }),
      createComp("skeleton-1", "Skeleton", { className: "h-4 w-full" }, { x: 8, y: 7, width: 4, height: 1 }),
      createComp("breadcrumb-1", "Breadcrumb", undefined, { x: 1, y: 8, width: 4, height: 1 }),
      createComp("pagination-1", "Pagination", undefined, { x: 5, y: 8, width: 4, height: 1 }),
      createComp("scroll-1", "ScrollArea", undefined, { x: 9, y: 8, width: 4, height: 1 }),
      createComp("panel-1", "ResizablePanelGroup", undefined, { x: 1, y: 9, width: 6, height: 2 }),
      createComp("menu-1", "DropdownMenu", undefined, { x: 7, y: 9, width: 3, height: 1 }),
      createComp("collapsible-1", "Collapsible", { label: "折叠" }, { x: 10, y: 9, width: 3, height: 1 }),
      createComp("overlay-1", "Dialog", undefined, { x: 1, y: 11, width: 4, height: 1 }),
      createComp("tabs-1", "Tabs", undefined, { x: 5, y: 11, width: 4, height: 2 }),
      createComp("accordion-1", "Accordion", undefined, { x: 9, y: 11, width: 4, height: 2 }),
      createComp("table-1", "Table", undefined, { x: 1, y: 13, width: 6, height: 2 }),
      createComp("sep-1", "Separator", undefined, { x: 7, y: 13, width: 5, height: 1 }),
      createComp("radio-1", "RadioGroup", undefined, { x: 1, y: 15, width: 4, height: 2 }),
      createComp("invalid-1", "Button", { label: "无效" }, { x: 0, y: 1, width: 2, height: 1 }),
    ];

    render(
      <CanvasRenderer
        components={components}
        selectedIds={[]}
        onSelect={vi.fn()}
        onClearSelection={vi.fn()}
        onResize={vi.fn()}
        zoom={1}
        viewportWidth={800}
        panX={0}
        panY={0}
        onPan={vi.fn()}
        gridCols={12}
        gridGap={8}
        pageBackground="#fff"
        pagePadding={16}
      />,
    );

    // 通过断言少量关键文本，确保渲染链路完整且各分支被实际执行
    expect(screen.getByText("提交")).toBeInTheDocument();
    expect(screen.getByText("勾选我")).toBeInTheDocument();
    expect(screen.getByText("卡片")).toBeInTheDocument();
    expect(screen.getByText("子按钮")).toBeInTheDocument();
    expect(screen.getByText("子徽章")).toBeInTheDocument();
    expect(screen.getByText("UnknownWidget")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("标签")).toBeInTheDocument();
    expect(screen.getByText(/折叠/)).toBeInTheDocument();

    // 关键分支：非法网格坐标的组件应直接返回 null，不参与渲染
    expect(screen.queryByText("无效")).not.toBeInTheDocument();
  });

  it("空画布时展示引导文案（关键分支）", () => {
    render(
      <CanvasRenderer
        components={[]}
        selectedIds={[]}
        onSelect={vi.fn()}
        onClearSelection={vi.fn()}
        onResize={vi.fn()}
        zoom={1}
        viewportWidth={800}
        panX={0}
        panY={0}
        onPan={vi.fn()}
        gridCols={12}
        gridGap={8}
      />,
    );

    expect(screen.getByText("拖拽组件到此处")).toBeInTheDocument();
  });

  it("点击组件触发选中回调；点击空白触发清选回调（关键交互）", () => {
    const onSelect = vi.fn();
    const onClearSelection = vi.fn();

    const { container } = render(
      <CanvasRenderer
        components={[createComp("btn-1", "Button", { label: "Click Me" }, { x: 1, y: 1, width: 2, height: 1 })]}
        selectedIds={[]}
        onSelect={onSelect}
        onClearSelection={onClearSelection}
        onResize={vi.fn()}
        zoom={1}
        viewportWidth={800}
        panX={0}
        panY={0}
        onPan={vi.fn()}
        gridCols={12}
        gridGap={8}
      />,
    );

    // 选中：模拟 Ctrl 多选场景，覆盖 multi 分支
    const compEl = container.querySelector('[data-canvas-comp="true"]') as HTMLElement | null;
    expect(compEl).toBeTruthy();
    fireEvent.click(compEl!, { ctrlKey: true });
    expect(onSelect).toHaveBeenCalledWith("btn-1", true);

    // 清选：点击背景容器空白处（不在组件区域内）
    const bgEl = container.querySelector('[data-canvas-bg="true"]') as HTMLElement | null;
    expect(bgEl).toBeTruthy();
    fireEvent.click(bgEl!);
    expect(onClearSelection).toHaveBeenCalledTimes(1);
  });

  it("拖拽空白区域触发框选而非平移", async () => {
    const onClearSelection = vi.fn();
    const onSelect = vi.fn();

    const { container } = render(
      <CanvasRenderer
        components={[createComp("btn-1", "Button", { label: "A" }, { x: 1, y: 1, width: 2, height: 1 })]}
        selectedIds={[]}
        onSelect={onSelect}
        onClearSelection={onClearSelection}
        onResize={vi.fn()}
        zoom={1}
        viewportWidth={800}
        panX={0}
        panY={0}
        onPan={vi.fn()}
        gridCols={12}
        gridGap={8}
      />,
    );

    // 约定：CanvasRenderer 最外层容器绑定 onMouseDown，用于在"空白区"开始框选
    const outer = container.firstElementChild as HTMLElement | null;
    expect(outer).toBeTruthy();

    fireEvent.mouseDown(outer!, { button: 0, clientX: 100, clientY: 100 });

    // mousemove 后触发框选，此时鼠标移动到组件区域上方但距离 <5px 视为单击
    await waitFor(() => {
      fireEvent.mouseMove(window, { clientX: 102, clientY: 102 });
    });

    // 距离 < 5px 判定为单击，清除选中
    fireEvent.mouseUp(window);
    expect(onClearSelection).toHaveBeenCalled();
  });

  it("拖拽缩放手柄触发 resize 回调（关键分支）", async () => {
    const onResize = vi.fn();
    const comps = [createComp("box-1", "Card", { label: "Box" }, { x: 1, y: 1, width: 2, height: 2 })];
    const host = makeHost(comps);

    const { container } = render(
      <CanvasRenderer
        host={host}
        components={comps}
        selectedIds={["box-1"]}
        activeNodeId="box-1"
        onSelect={vi.fn()}
        onClearSelection={vi.fn()}
        onResize={onResize}
        zoom={1}
        viewportWidth={800}
        panX={0}
        panY={0}
        onPan={vi.fn()}
        gridCols={12}
        gridGap={8}
      />,
    );

    // BEM Tools 缩放手柄在覆盖层中，使用 bem-resize-handle + cursor 查询
    const handle = container.querySelector('.bem-resize-handle.se') as HTMLElement | undefined;
    expect(handle).toBeTruthy();

    // 说明：renderer 内部使用网格单位换算
    // - 横向 1 格 = 80px（CELL_WIDTH）
    // - 纵向 1 格 = 40px（CELL_HEIGHT）
    fireEvent.pointerDown(handle!, { pointerId: 1, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(document, { pointerId: 1, clientX: 80, clientY: 40 });

    await waitFor(() => {
      expect(onResize).toHaveBeenCalled();
    });

    // se 方向：只会增加 width/height，不会改变 x/y
    expect(onResize).toHaveBeenLastCalledWith("box-1", 3, 3, 1, 1);

    fireEvent.pointerUp(document, { pointerId: 1 });
  });

  it("缩放手柄使用 window 监听退化路径（关键分支）", async () => {
    const onResize = vi.fn();
    const comps = [createComp("box-1", "Card", { label: "Box" }, { x: 1, y: 1, width: 2, height: 2 })];
    const host = makeHost(comps);

    const { container } = render(
      <CanvasRenderer
        host={host}
        components={comps}
        selectedIds={["box-1"]}
        activeNodeId="box-1"
        onSelect={vi.fn()}
        onClearSelection={vi.fn()}
        onResize={onResize}
        zoom={1}
        viewportWidth={800}
        panX={0}
        panY={0}
        onPan={vi.fn()}
        gridCols={12}
        gridGap={8}
      />,
    );

    const handle = container.querySelector('.bem-resize-handle.se') as HTMLElement | undefined;
    expect(handle).toBeTruthy();

    // 通过添加 window 级事件来验证退化路径
    fireEvent.pointerDown(handle!, { pointerId: 1, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(document, { pointerId: 1, clientX: 80, clientY: 40 });

    await waitFor(() => {
      expect(onResize).toHaveBeenCalled();
    });

    expect(onResize).toHaveBeenLastCalledWith("box-1", 3, 3, 1, 1);

    fireEvent.pointerUp(document, { pointerId: 1 });
  });
});
