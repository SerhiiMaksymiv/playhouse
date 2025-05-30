import { LightherConfig, Thresholds, Reports, ScoreResult, FlowSettings } from './types.js';
import type { UserFlow } from 'lighthouse';
import { lighthouse, flow } from './task.js';

const defaultThresholds: Thresholds = {
  performance: 100,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
  pwa: 100,
};

export const playAudit = async function (auditConfig: LightherConfig): Promise<ScoreResult> {
  return lighthouse({
    url: auditConfig.url || auditConfig.page.url(),
    thresholds: auditConfig.thresholds || defaultThresholds,
    opts: auditConfig.opts,
    config: auditConfig.config,
    cdpPort: auditConfig.port,
  });
};

export const startFlow = async function (settings: FlowSettings): Promise<UserFlow> {
  return flow({
    opts: settings.opts,
    config: settings.config,
    cdpPort: settings.cdpPort,
  });
};
