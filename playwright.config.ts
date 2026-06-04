import { defineConfig, devices } from '@playwright/test';

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    // Reporter to use. See https://playwright.dev/docs/test-reporters
    reporter: process.env.CI ? [
        ['html', { open: 'never' }],
        ['./email-reporter.ts'],
    ] : [['html', { open: 'never' }]],
    use: {
        screenshot: 'on',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    expect: {
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.01,
        },
    },
});
