/**
 * Preview mode 最小 e2e 验收用例（只作为验收脚本提交，不在本任务中运行）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
import { test, expect } from "@playwright/test";

test.describe("ISC-35 Preview mode", () => {
  test("点击 Preview 按钮后展示真实组件渲染（以 Button 为例）", async ({ page }) => {
    await page.goto("/e2e/editor-layout");

    await page.getByRole("tab", { name: /^Form\b/i }).click();
    await page.getByTestId("material-item-Button").click();

    await page.getByTestId("toolbar-preview-button").click();

    const dialog = page.getByTestId("preview-dialog");
    await expect(dialog).toBeVisible();

    const previewRoot = dialog.getByTestId("runtime-preview-root");
    await expect(previewRoot).toBeVisible();

    const previewButton = dialog.getByRole("button", { name: /^Button$/i }).first();
    await expect(previewButton).toBeVisible();
    await expect(previewButton).toHaveClass(/ring-offset-background/);
  });
});
