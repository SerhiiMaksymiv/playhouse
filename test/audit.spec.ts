import { playAudit } from '../src/audit.js';
import { attachmentPath, ContentType } from 'allure-js-commons'
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

  test('audit mobile page', async () => {
    const result = await playAudit({
      page: page,
      port: 9223,
      settings: 'mobile',
      reports: {
        formats: ['html'],
        directory: `${process.cwd()}/audit-test-results`,
        name: 'audit',
      },
    });

    try {
      expect(result.comparison.errors).toEqual([])
    } catch (e) {
      await attachmentPath("Audit", `${process.cwd()}/audit-test-results/audit.html`, {
        contentType: ContentType.HTML,
      });

      throw e
    }
  });

  test('audit desktop page', async () => {
    const result = await playAudit({
      page: page,
      port: 9223,
      reports: {
        formats: ['html'],
        directory: `${process.cwd()}/audit-test-results`,
        name: 'audit',
      },
    });

    try {
      expect(result.comparison.errors).toEqual([])
    } catch (e) {
      await attachmentPath("Audit", `${process.cwd()}/audit-test-results/audit.html`, {
        contentType: ContentType.HTML,
      });

      throw e
    }
  });
});
