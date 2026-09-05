import { expect, test } from "@playwright/test";

test("style switching and url restoration work together", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("Build a style lab that feels composed, collectible, and alive."),
  ).toBeVisible();

  await page.getByTestId("style-button-acid-graphics").click();
  await page.getByTestId("slider-glass").focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");

  await expect(page).toHaveURL(/style=acid-graphics/);
  await expect(page).toHaveURL(/glass=45/);

  await page.goto(
    "/?style=minimalism&tab=showcase&motion=12&depth=34&border=56&radius=78&density=43&glass=21",
  );

  await expect(page.getByTestId("theme-root")).toHaveAttribute(
    "data-style",
    "minimalism",
  );
  await expect(page.getByTestId("slider-motion")).toHaveValue("12");
});
