import { Page } from 'playwright-core';
import { Flags, Config, OutputMode, RunnerResult } from 'lighthouse';

type ThresholdKeys = keyof Thresholds;
type Thresholds = {
    performance?: number;
    accessibility?: number;
    'best-practices'?: number;
    seo?: number;
    pwa?: number;
};
type LightherConfig = {
    page: Page;
    url?: string;
    port: number;
    thresholds: Thresholds;
    opts?: Flags;
    config?: Config;
    reports?: Reports;
    ignoreError?: boolean;
    disableLogs?: boolean;
    ignoreBrowserName?: boolean;
};
type CompareResult = {
    errors: string[];
    results: string[];
};
type ScoreResult = {
    comparison: CompareResult;
    results: RunnerResult;
};
type Reports = {
    formats: OutputMode | OutputMode[];
    directory?: string;
    name?: string;
};
type Settings = {
    url: string;
    thresholds: Thresholds;
    opts?: Flags;
    config?: Config;
    reports?: Reports;
    cdpPort: number;
};

declare const report: (results: RunnerResult, type: OutputMode | OutputMode[], dir?: string, name?: string) => Promise<void>;

declare const _default: {
    audit: (auditConfig: LightherConfig) => Promise<ScoreResult>;
};

declare const version = "1.0.0";
declare const libraryName = "playhouse";

export { type CompareResult, type LightherConfig, type Reports, type ScoreResult, type Settings, type ThresholdKeys, type Thresholds, _default as default, libraryName, report, version };
