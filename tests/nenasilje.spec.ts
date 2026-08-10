import { test, expect } from '@playwright/test';

test('Random Page - https://nenasilje.org/umjetnicka-akcija-u-kumanovu/', async ({ page }) => {
    await page.goto('https://nenasilje.org/umjetnicka-akcija-u-kumanovu/');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot({ animations: 'disabled' });
})
test('O Nama - https://nenasilje.org/o-nama-2026/', async ({ page }) => {
    await page.goto('https://nenasilje.org/o-nama-2026/');
    await expect(page).toHaveScreenshot({ animations: 'disabled' });
});
test('O Nama Scrolled - https://nenasilje.org/o-nama-2026/', async ({ page }) => {
    await page.goto('https://nenasilje.org/o-nama-2026/');
    for (let i = 0; i < 20; i++) await page.mouse.wheel(0, 2000);
    await expect(page).toHaveScreenshot({ animations: 'disabled' });
});
test('CNA - https://nenasilje.org/', async ({ page }) => {
    await page.goto('https://nenasilje.org/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled' });
})
test('CNA FullPage - https://nenasilje.org/', async ({ page }) => {
    await page.goto('https://nenasilje.org/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('CNA English FullPage - https://nenasilje.org/en', async ({ page }) => {
    await page.goto('https://nenasilje.org/en');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
