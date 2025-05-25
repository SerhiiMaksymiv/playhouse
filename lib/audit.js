import { lighthouse } from './task.js';
const defaultThresholds = {
    performance: 100,
    accessibility: 100,
    'best-practices': 100,
    seo: 100,
    pwa: 100,
};
const defaultReports = {
    formats: 'html',
    name: `lighthouse-${new Date().getTime()}`,
    directory: `${process.cwd()}/lighthouse`,
};
export const playAudit = async function (auditConfig) {
    return lighthouse({
        url: auditConfig.url || auditConfig.page.url(),
        thresholds: auditConfig.thresholds || defaultThresholds,
        opts: auditConfig.opts,
        config: auditConfig.config,
        reports: auditConfig.reports || defaultReports,
        cdpPort: auditConfig.port,
    });
};
