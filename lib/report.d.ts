import { OutputMode, RunnerResult } from 'lighthouse';
export declare const report: (results: RunnerResult, type: OutputMode | OutputMode[], dir?: string, name?: string) => Promise<void>;
