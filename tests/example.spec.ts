import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://nenasilje.org/');
  await expect(page).toHaveScreenshot();
});
