import { ReportGenerator } from 'lighthouse/report/generator/report-generator.js';
import fs from 'fs/promises';
import { UserFlow, OutputMode, RunnerResult } from 'lighthouse';

export const report = async (results: RunnerResult, type: OutputMode | OutputMode[], dir?: string, name?: string): Promise<void> => {
  const directory = dir || `${process.cwd()}/lighthouse`;
  const fileName = name || `lighthouse-${new Date().getTime()}`
  const reportBody = ReportGenerator.generateReport(results.lhr, type);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(`${dir}/${fileName}.${type}`, reportBody);
};

export const flowReport = async (flow: UserFlow, dir?: string, name?: string): Promise<void> => {
  const directory = dir || `${process.cwd()}/lighthouse`;
  const fileName = name || `lighthouse-${new Date().getTime()}`
  const reportBody = await flow.generateReport()
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(`${dir}/${fileName}.html`, reportBody);
};

