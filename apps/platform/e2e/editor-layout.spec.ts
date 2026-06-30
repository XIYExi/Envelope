import { test, expect } from "@playwright/test";
import path from "path";

test.describe("/e2e/editor-layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/editor-layout");
    await expect(page.getByTestId("material-panel")).toBeVisible();
    await expect(page.getByTestId("canvas-container")).toBeVisible();
  });

  test("右侧 Max Width 设置会影响 canvas-grid 的 max-width", async ({ page }) => {
    const rightPanel = page.getByTestId("right-panel");
    const maxWidthSelect = rightPanel.getByText("Max Width", { exact: true }).locator("..").locator("select");

    await maxWidthSelect.selectOption("1024");

    const grid = page.getByTestId("canvas-grid");
    await expect(grid).toHaveCSS("max-width", "1024px");
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

  test("Tailwind Classes 写入 tailwindClasses 且画布预览合并生效", async ({ page }) => {
    await page.getByRole("tab", { name: /^Form\b/i }).click();

    const before = await page.locator('[data-canvas-comp="true"]').count();
    await page.getByTestId("material-item-Button").click();
    await expect(page.locator('[data-canvas-comp="true"]')).toHaveCount(before + 1);

    const comp = page.locator('[data-canvas-comp="true"]').nth(before);
    await comp.click();

    const rightPanel = page.getByTestId("right-panel");
    const tailwindInput = rightPanel.getByPlaceholder("e.g. p-4 bg-blue-500 rounded");

    await tailwindInput.fill("bg-red-500");
    await expect(comp).toHaveClass(/bg-red-500/);

    const canvasBg = page.locator('[data-canvas-bg="true"]');
    await canvasBg.click({ position: { x: 2, y: 2 } });
    await comp.click();
    await expect(tailwindInput).toHaveValue("bg-red-500");
  });

  test("Avatar：上传图片后右侧字段回填且画布回显", async ({ page }) => {
    await page.getByRole("tab", { name: /^Display\b/i }).click();

    const before = await page.locator('[data-canvas-comp="true"]').count();
    await page.getByTestId("material-item-Avatar").click();
    await expect(page.locator('[data-canvas-comp="true"]')).toHaveCount(before + 1);

    const avatar = page.locator('[data-canvas-comp="true"]').nth(before);
    await avatar.click();

    const rightPanel = page.getByTestId("right-panel");
    await expect(rightPanel.getByRole("button", { name: "上传图片" })).toBeVisible();

    const fileInput = rightPanel.locator('input[type="file"][aria-label="Image-文件选择"]');
    const fixture = path.resolve(__dirname, "../../..", "src/assets/absolute/img.png");

    const uploadResp = page.waitForResponse((resp) => resp.url().includes("/api/media/upload") && resp.status() === 201);
    await fileInput.setInputFiles(fixture);
    await uploadResp;

    const urlInput = rightPanel.getByPlaceholder("https://...");
    await expect.poll(async () => urlInput.inputValue()).toMatch(/\/api\/media\//);

    await expect(avatar.locator("img")).toHaveCount(1);
    await expect(avatar.locator("img")).toHaveAttribute("src", /\/api\/media\//);
  });
});
