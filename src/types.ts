import type { Page } from '@playwright/test';
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
  thresholds?: Thresholds;
  opts?: Flags;
  config?: Config
  reports?: Reports
  ignoreError?: boolean;
  disableLogs?: boolean;
  ignoreBrowserName?: boolean;
  settings?: 'mobile' | 'desktop'
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
  formats?: OutputMode | OutputMode[];
  directory?: string;
  name?: string;
}

export type Settings = {
  url: string;
  thresholds: Thresholds;
  opts?: Flags
  config?: Config
  cdpPort: number
  settings?: 'mobile' | 'desktop'
}

export type FlowSettings = Pick<Settings, | 'opts' | 'config' | 'cdpPort'>

