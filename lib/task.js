import lighthouseLib from 'lighthouse';
import { report } from './report.js';
const compare = (thresholds, newValue) => {
    const errors = [];
    const results = [];
    for (const key of Object.keys(thresholds)) {
        if (!thresholds[key] || !newValue[key])
            continue;
        thresholds[key] > newValue[key]
            ? errors.push(`${key} record is ${newValue[key]} and is under the ${thresholds[key]} threshold`)
            : results.push(`${key} record is ${newValue[key]} and desired threshold was ${thresholds[key]}`);
    }
    return { errors, results };
};
export const lighthouse = async ({ url, thresholds, opts = {}, config, reports, cdpPort, }) => {
    opts.port = cdpPort;
    if (!opts.onlyCategories) {
        opts.onlyCategories = Object.keys(thresholds);
    }
    const results = await lighthouseLib(url, { disableStorageReset: true, ...opts }, config);
    if (!results) {
        throw new Error('Lighthouse failed to run');
    }
    const categories = results.lhr.categories;
    const newValues = {};
    for (const key of Object.keys(categories)) {
        if (!categories[key].score)
            continue;
        newValues[key] = categories[key].score * 100;
    }
    for (var _ in reports) {
        var value = reports.formats;
        if (value) {
            await report(results, value, reports.directory, reports.name);
        }
    }
    const localComparison = compare(thresholds, newValues);
    return { comparison: localComparison, results };
};
