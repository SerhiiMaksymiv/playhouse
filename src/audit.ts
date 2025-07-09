import { LightherConfig, Thresholds, ScoreResult, FlowSettings } from './types.js';
import { UserFlow } from 'lighthouse';
import { lighthouse, flow } from './task.js';
import { report } from './report.js';

const defaultThresholds: Thresholds = {
  performance: 100,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
  pwa: 100,
};

export const startFlow = async function (settings: FlowSettings): Promise<UserFlow> {
  return flow({
    opts: settings.opts,
    config: settings.config,
    cdpPort: settings.cdpPort,
  });
};

export const playAudit = async function (auditConfig: LightherConfig): Promise<ScoreResult> {
  const result: ScoreResult = await lighthouse({
    url: auditConfig.url || auditConfig.page.url(),
    thresholds: auditConfig.thresholds || defaultThresholds,
    opts: auditConfig.opts,
    config: auditConfig.config,
    cdpPort: auditConfig.port,
  });

  if (auditConfig.reports) {
    await report(result.results, 'html', auditConfig.reports?.directory, auditConfig.reports?.name);
  }

  return result;
};
