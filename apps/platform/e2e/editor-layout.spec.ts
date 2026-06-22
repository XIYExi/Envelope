import { test, expect } from "@playwright/test";

test.describe("/e2e/editor-layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/editor-layout");
    await expect(page.getByTestId("material-panel")).toBeVisible();
    await expect(page.getByTestId("canvas-container")).toBeVisible();
  });

  test("物料项渲染 icon 且子组件不出现在菜单", async ({ page }) => {
    await expect(page.getByTestId("material-item-Card").locator("svg")).toHaveCount(1);
    await expect(page.getByText("Card Header")).toHaveCount(0);
    await expect(page.getByText("Dialog Title")).toHaveCount(0);
    await expect(page.getByText("Tabs List")).toHaveCount(0);
    await expect(page.getByText("Accordion Item")).toHaveCount(0);
    await expect(page.getByText("Select Item")).toHaveCount(0);
  });

  test("点击物料可新增组件并渲染", async ({ page }) => {
    await expect(page.getByText("Drop components here")).toBeVisible();
    await page.getByTestId("material-item-Card").click();
    await expect(page.locator('[data-canvas-comp="true"]')).toHaveCount(1);
    await expect(page.getByText("Drop components here")).toHaveCount(0);
  });

  test("拖拽物料到画布可新增组件", async ({ page }) => {
    const item = page.getByTestId("material-item-Card");
    const canvas = page.getByTestId("canvas-container");

    const itemBox = await item.boundingBox();
    const canvasBox = await canvas.boundingBox();
    if (!itemBox || !canvasBox) throw new Error("missing bounding box");

    await page.mouse.move(itemBox.x + itemBox.width / 2, itemBox.y + itemBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2, { steps: 12 });
    await page.mouse.up();

    await expect(page.locator('[data-canvas-comp="true"]')).toHaveCount(1);
  });

  test("Card 选中后右侧 Slots 配置可见", async ({ page }) => {
    await page.getByTestId("material-item-Card").click();
    await page.locator('[data-canvas-comp="true"]').first().click();
    await expect(page.getByText("Slots")).toBeVisible();
    await expect(page.getByText("Header Text")).toBeVisible();
    await expect(page.getByText("Content Text")).toBeVisible();
    await expect(page.getByText("Footer Text")).toBeVisible();
  });

  test("多个聚合组件选中后右侧 Slots 配置可见", async ({ page }) => {
    const cases: Array<{ name: string; category: string; expectText: string[] }> = [
      { name: "Dialog", category: "Overlay", expectText: ["Trigger Text", "Title Text", "Description Text"] },
      { name: "Sheet", category: "Overlay", expectText: ["Trigger Text", "Title Text", "Body Text"] },
      { name: "AlertDialog", category: "Overlay", expectText: ["Trigger Text", "Action Text", "Cancel Text"] },
      { name: "Tabs", category: "Navigation", expectText: ["Active Index"] },
      { name: "Accordion", category: "Data", expectText: ["Items"] },
      { name: "Table", category: "Data", expectText: ["Columns", "Rows"] },
      { name: "Select", category: "Form", expectText: ["Options", "Selected Index"] },
      { name: "RadioGroup", category: "Form", expectText: ["Options"] },
      { name: "Breadcrumb", category: "Navigation", expectText: ["Items"] },
      { name: "Pagination", category: "Navigation", expectText: ["Pages", "Current Page"] },
    ];

    for (const c of cases) {
      await page.getByRole("tab", { name: new RegExp(`^${c.category}\\b`, "i") }).click();
      const before = await page.locator('[data-canvas-comp="true"]').count();
      await page.getByTestId(`material-item-${c.name}`).click();
      await expect(page.locator('[data-canvas-comp="true"]')).toHaveCount(before + 1);
      await page.locator('[data-canvas-comp="true"]').nth(before).click();
      const rightPanel = page.getByTestId("right-panel");
      await expect(rightPanel.getByText("Slots")).toBeVisible();
      for (const t of c.expectText) {
        await expect(rightPanel.getByText(t, { exact: true })).toBeVisible();
      }
    }
  });
});
