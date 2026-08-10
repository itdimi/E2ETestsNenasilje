test('Prirucnik FullPage - https://handbook.nenasilje.org/', async ({ page }) => {
    await page.goto('https://handbook.nenasilje.org/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Prirucnik English FullPage - https://handbook.nenasilje.org/en/', async ({ page }) => {
    await page.goto('https://handbook.nenasilje.org/en/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Prirucnik Igrice FullPage - https://handbook.nenasilje.org/pretraga-igrica/', async ({ page }) => {
    await page.goto('https://handbook.nenasilje.org/pretraga-igrica/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
