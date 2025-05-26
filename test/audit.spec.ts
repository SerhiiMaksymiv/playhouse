import { playAudit } from '../src/audit.ts';
import { test, chromium, Browser, Page, expect } from '@playwright/test';

test.describe('audit example', () => {
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

  test('audits page', async () => {
    const result = await playAudit({
      page: page,
      thresholds: {
        performance: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
        pwa: 50,
      },
      port: 9223,
    });

    expect(result.comparison.errors).toEqual([]);
  });
});
