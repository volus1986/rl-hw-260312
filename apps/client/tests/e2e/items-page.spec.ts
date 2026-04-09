import { expect, test } from '@playwright/test';

test('items page', async ({ page }) => {
  await page.goto('/items');

  // await page.pause();

  await expect(page.getByRole('heading', { name: 'Items' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Details' }).first()).toBeVisible();

  await expect(page.getByRole('button', { name: 'Prev', exact: true })).toBeDisabled();

  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeEnabled();

  await expect(page.getByRole('button', { name: 'Prev', exact: true })).toBeEnabled();

  await page.getByRole('button', { name: 'Prev', exact: true }).click();

  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeEnabled();

  await expect(page.getByRole('button', { name: 'Prev', exact: true })).toBeDisabled();
});
