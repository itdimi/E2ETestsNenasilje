test('Biber FullPage - https://biber.nenasilje.org/', async ({ page }) => {
    await page.goto('https://biber.nenasilje.org/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Biber English FullPage - https://biber.nenasilje.org/?lang=en', async ({ page }) => {
    await page.goto('https://biber.nenasilje.org/?lang=en');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Biber Shqip FullPage - https://biber.nenasilje.org/per-ne/?lang=sq', async ({ page }) => {
    await page.goto('https://biber.nenasilje.org/?lang=sq');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Biber Makedonski FullPage - https://biber.nenasilje.org/?lang=mk', async ({ page }) => {
    await page.goto('https://biber.nenasilje.org/?lang=mk');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Biber biber 06 FullPage - https://biber.nenasilje.org/biber-06-2025/', async ({ page }) => {
    await page.goto('https://biber.nenasilje.org/biber-06-2025/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
