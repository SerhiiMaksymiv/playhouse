import fs from 'fs';
import { playAudit } from '../src/audit.js';
import { Browser, chromium, Page, test } from '@playwright/test';

test.describe('reports example', () => {
  let reportDirectory: string;
  let reportFilename: string;
  let reportFileTypes: string[];
  let browser: Browser
  let page: Page

  test.beforeEach(async () => {
    reportDirectory = `${process.cwd()}/lighthouse`;
    reportFilename = 'reports-test';
    reportFileTypes = ['html'];
    reportFileTypes.forEach((type) => {
      var fileToDelete = `${reportDirectory}/${reportFilename}.${type}`;
      if (fs.existsSync(fileToDelete)) {
        fs.unlinkSync(fileToDelete);
      }
    });

    browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
    });
    page = await browser.newPage();
    await page.goto('https://angular.io/');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('writes json and html reports', async () => {
    const reportDirectory = `${process.cwd()}/lighthouse`;
    const reportFilename = 'reports-test';

    await playAudit({
      reports: {
        formats: 'html',
        name: reportFilename,
        directory: reportDirectory,
      },
      page: page,
      thresholds: {
        performance: 30,
      },
      port: 9222,
    });
 });
});
