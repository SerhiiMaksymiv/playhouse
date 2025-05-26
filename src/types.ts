import type { Page } from 'playwright-core';
import type { Flags, Config, RunnerResult, OutputMode } from 'lighthouse';

export type ThresholdKeys = keyof Thresholds;

export type Thresholds = {
  performance?: number;
  accessibility?: number;
  'best-practices'?: number;
  seo?: number;
  pwa?: number;
};

export type LightherConfig = {
  page: Page;
  url?: string;
  port: number;
  thresholds: Thresholds;
  opts?: Flags;
  config?: Config
  reports?: Reports
  ignoreError?: boolean;
  disableLogs?: boolean;
  ignoreBrowserName?: boolean;
}

export type CompareResult = {
  errors: string[];
  results: string[];
}

export type ScoreResult = {
  comparison: CompareResult;
  results: RunnerResult;
}

export type Reports = {
  formats: OutputMode | OutputMode[];
  directory?: string;
  name?: string;
}

export type Settings = {
  url: string;
  thresholds: Thresholds;
  opts?: Flags
  config?: Config
  reports?: Reports
  cdpPort: number
}
