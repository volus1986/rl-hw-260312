import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/sign');

  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Sign Up' })).toBeHidden();

  await page.getByRole('tab', { name: 'Sign Up' }).click();

  await expect(page.getByRole('button', { name: 'Sign In' })).toBeHidden();

  await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
});
