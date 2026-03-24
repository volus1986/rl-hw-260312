import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/items");

  // await page.pause();

  await expect(page.getByRole("heading", { name: "Items" })).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "ID", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "User ID" }),
  ).toBeVisible();

  await expect(page.getByRole("columnheader", { name: "Title" })).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Prev", exact: true }),
  ).toBeDisabled();

  await expect(
    page.getByRole("button", { name: "Next", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next", exact: true }).click();

  await expect(
    page.getByRole("button", { name: "Next", exact: true }),
  ).toBeEnabled();

  await expect(
    page.getByRole("button", { name: "Prev", exact: true }),
  ).toBeDisabled();
});
