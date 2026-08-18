import { expect, test } from "@playwright/test";

const illustrationsPath = "/illustrations";

test.describe("gallery responsive layouts", () => {
  test("desktop shows rows layout and hides columns layout", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(illustrationsPath);

    const rowsLayout = page.locator(".rows-layout");
    const columnsLayout = page.locator(".columns-layout");
    const rowImages = rowsLayout.locator("img");

    await expect(rowsLayout).toBeVisible();
    await expect(columnsLayout).toBeHidden();
    await expect(rowImages.first()).toBeVisible();
    await expect(rowImages).not.toHaveCount(0);
  });

  test("mobile shows columns layout and renders images", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(illustrationsPath);

    const rowsLayout = page.locator(".rows-layout");
    const columnsLayout = page.locator(".columns-layout");
    const columnImages = columnsLayout.locator("img");

    await expect(rowsLayout).toBeHidden();
    await expect(columnsLayout).toBeVisible();
    await expect(columnImages.first()).toBeVisible();
    await expect(columnImages).not.toHaveCount(0);
  });
});