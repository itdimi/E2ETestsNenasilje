import { test, expect } from '@playwright/test';

test('ONMS FullPage - https://onms.nenasilje.org/', async ({ page }) => {
    await page.goto('https://onms.nenasilje.org/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('ONMS English FullPage - https://onms.nenasilje.org/?lang=en', async ({ page }) => {
    await page.goto('https://onms.nenasilje.org/?lang=en');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('ONMS Mjesta stradanja - https://onms.nenasilje.org/category/mjesta-stradanja/', async ({ page }) => {
    await page.goto('https://onms.nenasilje.org/category/mjesta-stradanja/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
