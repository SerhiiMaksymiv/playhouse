import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,

  expect: {
    timeout:  30000,
  },

  fullyParallel: true,
  retries: 1,
  workers: 1,

  reporter: [
    [`html`, { outputFolder: 'html-report', open: 'never' }],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: [ (process.env.headless ? '--headless=new' : ''), '--hide-scrollbars']
    }
  },

  projects: [
    {
      name: 'audit',
      testDir: 'test',
      testMatch: /.*.spec.ts/,
      use: { 
        ...devices['Desktop Chrome']
      }
    }
  ],
});
