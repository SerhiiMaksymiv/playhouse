import { startFlow } from '../src/audit.js';
import { flowReport } from '../src/report.js';
import { test, chromium, Browser, Page } from '@playwright/test';

test.describe('flow example', () => {
  let browser: Browser
  let page: Page

  test.beforeEach(async () => {
    browser = await chromium.launch({
      args: ['--remote-debugging-port=9223'],
    });
    page = await browser.newPage();
    await page.goto('https://angular.io/');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('flow page', async () => {
    const flow = await startFlow({
      cdpPort: 9223,
    });
    await flow.startTimespan();
    await page.waitForTimeout(3000)
    await flow.endTimespan();

    const reportDirectory = `${process.cwd()}/lighthouse`;
    const reportFilename = 'flow-report-test';
    await flowReport(flow, reportDirectory, reportFilename);
  });
});
