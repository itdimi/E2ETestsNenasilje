test('Kultura Sjecanja FullPage - https://kulturasjecanja.org/', async ({ page }) => {
    await page.goto('https://kulturasjecanja.org/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Kultura Sjecanja English FullPage - https://kulturasjecanja.org/en/', async ({ page }) => {
    await page.goto('https://kulturasjecanja.org/en/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
test('Kultura Sjecanja Izlozba FullPage - https://kulturasjecanja.org/izlozba/', async ({ page }) => {
    await page.goto('https://kulturasjecanja.org/izlozba/');
    await page.addStyleTag({ content: `.dsm-typing-wrapper { visibility: hidden !important; }` });
    await expect(page).toHaveScreenshot({ animations: 'disabled', fullPage: true });
})
