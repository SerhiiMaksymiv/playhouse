import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,

  expect: {
    timeout:  30000,
  },

  fullyParallel: true,
  retries: 0,
  workers: 1,


  reporter: [
    [`allure-playwright`,
      {
        detail: true,
        resultsDir: "allure-results",
        suiteTitle: false,

        environmentInfo: {
          NodeVersion: process.version,
        },
      }
    ], 

    [`html`, { outputFolder: 'html-report', open: 'never' }],
  ],

  projects: [
    {
      name: 'audit',
      testDir: 'test',
      testMatch: /.*.spec.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        viewport: { width: 1936, height: 1056 },
        launchOptions: {
          args: [ (process.env.headless ? '--headless=new' : ''), '--hide-scrollbars']
        }
      }
    }
  ],
});
