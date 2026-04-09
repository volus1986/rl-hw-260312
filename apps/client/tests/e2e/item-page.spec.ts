import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('banner').getByRole('link', { name: 'Items' }).click();
  await page.getByRole('link', { name: 'Details' }).first().click();

  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();

  await page.getByRole('tab', { name: 'DE' }).click();

  await expect(page.getByRole('heading', { name: 'Einzelheiten' })).toBeVisible();
});
