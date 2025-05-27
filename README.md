## Lightherhouse Playwright - NPM Package

[![NPM release](https://img.shields.io/npm/v/lighterhouse.svg 'NPM release')]([[https://www.npmjs.com/package/lightherhouse](https://www.npmjs.com/package/litgherhouse)](https://www.npmjs.com/package/litgherhouse))

[Lighthouse](https://developers.google.com/web/tools/lighthouse) is a tool developed by Google that analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices.

[Playwright](https://www.npmjs.com/package/playwright) is a Node library to automate Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

The purpose of this package is to produce web audit report for several pages in connected mode and in an automated (programmatic) way.

## Usage


### Installation

Add the `lighterhouse`, `playwright` & `lighthouse` & `puppeteer` libraries to your project:

```sh
$ npm install --save-dev lighterhouse playwright lighthouse pupperteer
```

### In your code

After completion of the Installation, you can use `lighterhouse` in your code to audit the current page.

In your test code you need to import `lighterhouse` and assign a `port` for the lighthouse scan. You can choose any non-allocated port.

```ts
import { playAudit } from '../src/audit.js';
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
```
