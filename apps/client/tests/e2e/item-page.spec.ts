import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('banner').getByRole('link', { name: 'Items' }).click();
  await page.getByRole('cell', { name: '1' }).first().click();

  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();

  await page.getByRole('tab', { name: 'DE' }).click();

  await expect(page.getByRole('heading', { name: 'Einzelheiten' })).toBeVisible();
});
