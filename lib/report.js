import { ReportGenerator } from 'lighthouse/report/generator/report-generator.js';
import fs from 'fs/promises';
export const report = async (results, type, dir, name) => {
    const directory = dir || `${process.cwd()}/lighthouse`;
    const fileName = name || `lighthouse-${new Date().getTime()}`;
    const reportBody = ReportGenerator.generateReport(results.lhr, type);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(`${dir}/${fileName}.${type}`, reportBody);
};
