import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import type { EditableProp } from "@envelope/materials";
import { PropertyEditor } from "../../src/property-editor/property-editor";

function PropertyEditorHarness({
  editableProps,
  initialValues,
  onChangeSpy,
  flowList,
}: {
  editableProps: EditableProp[];
  initialValues: Record<string, unknown>;
  onChangeSpy: (key: string, value: unknown) => void;
  flowList?: { id: string; name: string }[];
}) {
  const [values, setValues] = React.useState<Record<string, unknown>>(initialValues);

  return (
    <PropertyEditor
      editableProps={editableProps}
      values={values}
      onChange={(key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        onChangeSpy(key, value);
      }}
      flowList={flowList}
    />
  );
}

describe("PropertyEditor（React）", () => {
  it("当 editableProps 为空时展示空态（关键分支）", () => {
    render(
      <PropertyEditor
        editableProps={[]}
        values={{}}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText("No editable properties defined for this component")).toBeInTheDocument();
  });

  it("可以按分组/排序渲染，并触发关键交互回调（文本、数字、开关、JSON、Tailwind、事件绑定）", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const editableProps: EditableProp[] = [
      // 说明：通过 order 控制同组内排序，覆盖 sort 分支
      { key: "title", label: "标题", type: "text", placeholder: "请输入标题", group: "General", order: 1 },
      { key: "count", label: "数量", type: "number", placeholder: "请输入数量", group: "General", order: 2, defaultValue: 0 },
      { key: "enabled", label: "启用", type: "switch", group: "General", order: 3, defaultValue: false },
      // 说明：JSON 用于覆盖解析错误提示分支（Invalid JSON）
      { key: "config", label: "配置", type: "json", group: "Advanced", order: 1 },
      // 说明：Tailwind 字段用于覆盖 “超过 8 个 class 显示 +N more” 分支
      { key: "className", label: "样式", type: "tailwind", group: "Advanced", order: 2 },
      // 说明：eventBinding 在 flowList 存在时会渲染下拉框，覆盖 select 分支
      { key: "onClick", label: "点击事件", type: "eventBinding", group: "Events", order: 1 },
    ];

    render(
      <PropertyEditorHarness
        editableProps={editableProps}
        initialValues={{
          title: "初始标题",
          count: 10,
          enabled: false,
          config: "{",
          className: "p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10",
          onClick: "",
        }}
        onChangeSpy={onChange}
        flowList={[
          { id: "flow-1", name: "创建订单" },
          { id: "flow-2", name: "删除订单" },
        ]}
      />,
    );

    // 分组标题渲染（覆盖 groupProps + 分组遍历）
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();

    // 文本输入：模拟用户修改标题，验证回调参数
    const titleInput = screen.getByPlaceholderText("请输入标题");
    onChange.mockClear();
    await user.clear(titleInput);
    await user.type(titleInput, "新标题");
    expect(onChange).toHaveBeenLastCalledWith("title", "新标题");

    // 数字输入：清空输入时应发送 undefined（覆盖 NumberField 的空值分支）
    const countInput = screen.getByPlaceholderText("请输入数量");
    onChange.mockClear();
    await user.clear(countInput);
    expect(onChange).toHaveBeenLastCalledWith("count", undefined);

    // 开关：点击后应切换为 true（覆盖 SwitchField 的 checked 分支）
    const switchBtn = screen.getByRole("switch");
    onChange.mockClear();
    await user.click(switchBtn);
    expect(onChange).toHaveBeenLastCalledWith("enabled", true);

    // JSON 解析错误提示（覆盖 JsonField 的 parseError 分支）
    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();

    // Tailwind 超过 8 个 class 时显示 “+N more”
    expect(screen.getByText("+2 more")).toBeInTheDocument();

    // 事件绑定：flowList 存在时使用下拉框，选择后触发回调
    const eventSelect = screen.getByRole("combobox");
    onChange.mockClear();
    await user.selectOptions(eventSelect, "flow-1");
    expect(onChange).toHaveBeenLastCalledWith("onClick", "flow-1");
  });

  it("事件绑定：当 flowList 为空时回退到文本输入（关键分支）", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const editableProps: EditableProp[] = [
      { key: "onSubmit", label: "提交事件", type: "eventBinding", group: "Events", order: 1, placeholder: "flow-id" },
    ];

    render(
      <PropertyEditorHarness
        editableProps={editableProps}
        initialValues={{ onSubmit: "" }}
        onChangeSpy={onChange}
      />,
    );

    // 说明：flowList 未传入时，EventBindField 会渲染 input 分支
    const input = screen.getByPlaceholderText("flow-id");
    onChange.mockClear();
    await user.type(input, "flow-xyz");
    expect(onChange).toHaveBeenLastCalledWith("onSubmit", "flow-xyz");

    expect(screen.getByText("从 Flows 面板创建流程后，此处可选择绑定")).toBeInTheDocument();
  });

  it("image 字段支持选择文件并上传后写回 url（关键分支）", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ key: "uploads/2026/06/demo.png", url: "/api/media/uploads/2026/06/demo.png" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const editableProps: EditableProp[] = [
      { key: "image", label: "图片", type: "image", group: "General", order: 1 },
    ];

    render(
      <PropertyEditorHarness
        editableProps={editableProps}
        initialValues={{ image: "" }}
        onChangeSpy={onChange}
      />,
    );

    const input = screen.getByLabelText("图片-文件选择") as HTMLInputElement;
    const file = new File([new Uint8Array([1, 2, 3])], "demo.png", { type: "image/png" });
    await user.upload(input, file);

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith("image", "/api/media/uploads/2026/06/demo.png");
    });

    vi.unstubAllGlobals();
  });
});
