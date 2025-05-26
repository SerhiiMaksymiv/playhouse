import lighthouseLib, { RunnerResult } from 'lighthouse';
import { Thresholds, ScoreResult, Settings, CompareResult, ThresholdKeys } from './types.js';
import { report } from './report.js';

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
  config,
  reports,
  cdpPort,
}: Settings): Promise<ScoreResult> => {

  opts.port = cdpPort;

  if (!opts.onlyCategories) {
    opts.onlyCategories = Object.keys(thresholds);
  }

  const results: RunnerResult | undefined = await lighthouseLib(
    url,
    { disableStorageReset: true, ...opts },
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

  for (var _ in reports) {
    var value = reports.formats
    if (value) {
      await report(
        results,
        value,
        reports.directory,
        reports.name
      );
    }
  }

  const localComparison = compare(thresholds, newValues);
  return { comparison: localComparison, results };
};
