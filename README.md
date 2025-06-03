## Disclaimer
This package is designed specifically for my own use cases and is actively in development, do not use in production.
Big shout out to [playwright-lighthouse](https://github.com/abhinaba-ghosh/playwright-lighthouse) and [playwright-lighthouse-flow](https://github.com/TheCollegeHub/playwright-lighthouse-flow) for their amazing work.

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

Lighterhouse exposes a couple of functions to be used in your tests:
- `playAudit`: to run Lighthouse audits on a page
- `report`: to generate a report from the Lighthouse audit results

```ts
export const report = async (results: RunnerResult, type: OutputMode | OutputMode[], dir?: string, name?: string): Promise<void> => {
  const directory = dir || `${process.cwd()}/lighthouse`;
  const fileName = name || `lighthouse-${new Date().getTime()}`
  const reportBody = ReportGenerator.generateReport(results.lhr, type);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(`${dir}/${fileName}.${type}`, reportBody);
};
```

- `startFlow`: to start a Lighthouse UserFlow
- `flowReport`: to generate a `html` report from the Lighthouse UserFlow, with default `dir` and `name` values
```ts
export const flowReport = async (flow: UserFlow, dir?: string, name?: string): Promise<void> => {
  const directory = dir || `${process.cwd()}/lighthouse`;
  const fileName = name || `lighthouse-${new Date().getTime()}`
  const reportBody = await flow.generateReport();
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(`${dir}/${fileName}.html`, reportBody);
};
```

### In your code
How I'd use `playAudit`, with `port` and `browser` fixtures:

```ts
import getPort from 'get-port';
import { expect } from '@playwright/test'
import { config } from '@config'
import { playAudit } from 'lighterhouse'
import { chromium } from 'playwright';
import type { Browser } from 'playwright';

const lighthouseTest = baseTest.extend<{}, { port: number } >({
  port: [
    async ({}, use) => {
      // Assign a unique port for each playwright worker to support parallel tests
      const port = await getPort();
      await use(port);
    },
    { scope: 'worker' },
  ],
});

const lhsTest = lighthouseTest.extend<{}, { browser: Browser }>({
  browser: [
    async ({ port }, use) => {
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
      });
      await use(browser);
    },
    { scope: 'worker' },
  ],
})

const thresholds = {
  performance: 80,
  accessibility: 80,
  'best-practices': 80,
  pwa: 80,
}

lhsTest.describe('Page Audit', () => {

  lhsTest.beforeEach(async ({ browser, login }) => { 
    browser 
    login 
  })

  lhsTest('Home', async ({ port, home }) => {
    const name = `home-page-audit`

    const result = await playAudit({
      page: home.page,
      port,
      thresholds,
      reports: {
        name,
        directory: config.audit
      },
    })

    expect(result.comparison.results).toEqual([])
  })
})
```

Use `startFlow` will have same setup as `playAudit`, with `port` and `browser` fixtures:
```ts
...
    const flow = await startFlow({
      cdpPort: port,
    })

    await flow.startTimespan({ name: 'Editing Template' })

    await test.step('Start flow on the page', async () => {
      await page.click()
    })

    await flow.endTimespan()
    await flowReport(flow, config.audit, name)
...
```
