import { defineConfig, devices } from '@playwright/test';

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    // Reporter to use. See https://playwright.dev/docs/test-reporters
    // Email reporter only on CI runs that explicitly opt in (daily scheduled
    // check) - manual runs re-baseline snapshots and must not send mail.
    reporter: process.env.CI ? [
        ['line'],
        ['html', { open: 'never' }],
        ...(process.env.SEND_FAILURE_EMAIL === '1' ? [['./email-reporter.ts'] as const] : []),
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
        // The monitored sites can be slow; the default 5s screenshot timeout
        // caused flaky failures on CI runners.
        timeout: 30000,
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.02,
        },
        toHaveScreenshot: {
            timeout: 30000,
        },
    },
});
