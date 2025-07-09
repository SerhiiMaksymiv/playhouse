import lighthouseLib, { RunnerResult, startFlow, UserFlow, desktopConfig } from 'lighthouse';
import { Thresholds, ScoreResult, Settings, CompareResult, ThresholdKeys, FlowSettings } from './types';
import puppeteer from 'puppeteer';

const compare = (thresholds: Thresholds, newValue: Thresholds): CompareResult => {
  const errors: string[] = [];
  const results: string[] = [];

  for (const key of Object.keys(thresholds) as ThresholdKeys[]) {
    if (!thresholds[key] || !newValue[key]) continue
    thresholds[key] > newValue[key]
      ? errors.push(`${key} record is ${newValue[key]} and is under the ${thresholds[key]} threshold`)
      : results.push(`${key} record is ${newValue[key]} and desired threshold was ${thresholds[key]}`)
  }

  return { errors, results }
};

export const lighthouse = async ({
  url,
  thresholds,
  opts = {},
  config = desktopConfig,
  cdpPort,
}: Settings): Promise<ScoreResult> => {

  opts.port = cdpPort;

  if (!opts.onlyCategories) {
    opts.onlyCategories = Object.keys(thresholds);
  }

  const results: RunnerResult | undefined = await lighthouseLib(
    url,
    { 
      screenEmulation: { mobile: false },
      formFactor: 'desktop',
      disableStorageReset: true, 
      ...opts 
    },
    config
  );

  if (!results) {
    throw new Error('Lighthouse failed to run');
  }

  const categories = results.lhr.categories
  const newValues: Thresholds = {}

  for (const key of Object.keys(categories) as ThresholdKeys[]) {
    if (!categories[key].score) continue
    newValues[key] = categories[key].score * 100
  }

  const localComparison = compare(thresholds, newValues);
  return { comparison: localComparison, results };
};

export const flow = async ({
  cdpPort = 9223,
}: FlowSettings): Promise<UserFlow> => {
  const debuggerUrl = `http://localhost:${cdpPort}/json/version`;
  const res = await fetch(debuggerUrl);
  const data = await res.json();

  if (!data) {
    throw new Error('Unable to get debugger url data');
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: data.webSocketDebuggerUrl,
  });

  if (!browser) {
    throw new Error('Puppeteer failed to connect to browser');
  }

  const [page] = await browser.pages();
  return startFlow(page, { config: desktopConfig });
};
