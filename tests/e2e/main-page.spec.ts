import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("rl hw 260312");

  // Expect for Items link exists
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Items" }),
  ).toBeVisible();

  // Expect for Login link exists
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Login" }),
  ).toBeVisible();

  await expect(page.getByRole("tab", { name: "EN" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "DE" })).toBeVisible();
});
