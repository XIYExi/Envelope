import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * Playwright E2E：覆盖 /e2e/canvas 的核心交互用例。
 *
 * 说明：
 * - 测试用例尽量通过 data-testid / data-* 属性定位，避免依赖视觉样式或复杂 DOM 结构。
 * - 每个用例执行前都会重置画布 state，确保断言可重复、可复现。
 */
async function mustBox(locator: Locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("无法获取元素的 bounding box（元素可能不可见或尚未渲染完成）");
  return box;
}

async function readPanState(page: Page) {
  const text = (await page.getByTestId("e2e-state-pan").textContent()) ?? "";
  const match = /pan:\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/.exec(text);
  if (!match) throw new Error(`无法解析 pan state：${text}`);
  return { x: Number(match[1]), y: Number(match[2]) };
}

async function readInput1Position(page: Page) {
  const text = (await page.getByTestId("e2e-state-input-1").textContent()) ?? "";
  const match = /e2e-input-1:\s*x=(\d+),\s*y=(\d+),\s*w=(\d+),\s*h=(\d+)/.exec(text);
  if (!match) throw new Error(`无法解析 e2e-input-1 position：${text}`);
  return { x: Number(match[1]), y: Number(match[2]), w: Number(match[3]), h: Number(match[4]) };
}

async function dragHandleBy(page: Page, handle: Locator, dx: number, dy: number) {
  await handle.scrollIntoViewIfNeeded();
  const b = await mustBox(handle);
  const startX = b.x + b.width / 2;
  const startY = b.y + b.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + dx, startY + dy, { steps: 15 });
  await page.mouse.up();
}

test.describe("/e2e/canvas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/e2e/canvas");
    await page.getByTestId("e2e-reset-components").click();
    await page.getByTestId("e2e-reset-view").click();
    await expect(page.getByTestId("e2e-state-selected")).toHaveText(/selectedIds:\s*\[\]/);
  });

  test("空白点击清选", async ({ page }) => {
    const comp = page.getByTestId("canvas-comp-e2e-card-1");
    await comp.click();
    await expect(page.getByTestId("e2e-state-selected")).toContainText('["e2e-card-1"]');

    const bg = page.locator('[data-canvas-bg="true"]');
    const bgBox = await mustBox(bg);
    await bg.click({ position: { x: bgBox.width - 10, y: bgBox.height - 10 } });

    await expect(page.getByTestId("e2e-state-selected")).toHaveText(/selectedIds:\s*\[\]/);
    await expect(comp.locator("[data-canvas-resize-handle]")).toHaveCount(0);
  });

  test("组件点击出现选中轮廓与 handles", async ({ page }) => {
    const comp = page.getByTestId("canvas-comp-e2e-input-1");
    await comp.click();

    await expect(page.getByTestId("e2e-state-selected")).toContainText('["e2e-input-1"]');
    await expect(comp).toHaveClass(/border-blue-500/);
    await expect(comp.locator("[data-canvas-resize-handle]")).toHaveCount(8);
  });

  test("拖拽缩放手柄触发尺寸变化", async ({ page }) => {
    const comp = page.getByTestId("canvas-comp-e2e-input-1");
    await comp.click();

    const before = await readInput1Position(page);
    const seHandle = comp.locator('[data-canvas-resize-handle="se"]');

    await dragHandleBy(page, seHandle, 200, 80);

    await expect.poll(async () => (await readInput1Position(page)).w).toBeGreaterThan(before.w);
    await expect.poll(async () => (await readInput1Position(page)).h).toBeGreaterThan(before.h);
  });

  test("平移画布 offset 变化", async ({ page }) => {
    await page.getByTestId("e2e-reset-view").click();
    const before = await readPanState(page);
    expect(before).toEqual({ x: 0, y: 0 });

    const container = page.getByTestId("canvas-container");
    const box = await mustBox(container);
    const startX = box.x + 10;
    const startY = box.y + 10;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 180, startY + 120, { steps: 10 });
    await page.mouse.up();

    await expect.poll(async () => readPanState(page)).not.toEqual({ x: 0, y: 0 });
  });
});
