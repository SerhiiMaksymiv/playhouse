import { playAudit } from './audit.js';
import { report } from './report.js';

const audit = playAudit

export * from './types.js';
export { report }
export default { audit };

export const version = '1.0.0';
export const libraryName = 'playhouse';
