import { test, expect } from '@playwright/test';

test('O Nama', async ({ page }) => {
  await page.goto('https://nenasilje.org/o-nama-2026/');
  await expect(page).toHaveScreenshot();
});
