import { LightherConfig, Thresholds, Reports, ScoreResult } from './types.js';
import type { UserFlow } from 'lighthouse';
import { lighthouse, start } from './task.js';

const defaultThresholds: Thresholds = {
  performance: 100,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
  pwa: 100,
};

const defaultReports: Reports = {
  formats: 'html',
  name: `lighthouse-${new Date().getTime()}`,
  directory: `${process.cwd()}/lighthouse`,
};

export const playAudit = async function (auditConfig: LightherConfig): Promise<ScoreResult> {
  return lighthouse({
    url: auditConfig.url || auditConfig.page.url(),
    thresholds: auditConfig.thresholds || defaultThresholds,
    opts: auditConfig.opts,
    config: auditConfig.config,
    reports: auditConfig.reports || defaultReports,
    cdpPort: auditConfig.port,
  });
};

export const startFlow = async function (): Promise<UserFlow> {
  return start();
};
