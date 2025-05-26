import { ReportGenerator } from 'lighthouse/report/generator/report-generator.js';
import fs from 'fs/promises';
import { OutputMode, RunnerResult } from 'lighthouse';

export const report = async (results: RunnerResult, type: OutputMode | OutputMode[], dir?: string, name?: string): Promise<void> => {
  const directory = dir || `${process.cwd()}/lighthouse`;
  const fileName = name || `lighthouse-${new Date().getTime()}`
  const reportBody = ReportGenerator.generateReport(results.lhr, type);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(`${dir}/${fileName}.${type}`, reportBody);
};
