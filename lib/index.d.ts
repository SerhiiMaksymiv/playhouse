import { report } from './report.js';
export * from './types.js';
export { report };
declare const _default: {
    audit: (auditConfig: import("./types.js").LightherConfig) => Promise<import("./types.js").ScoreResult>;
};
export default _default;
export declare const version = "1.0.0";
export declare const libraryName = "playhouse";
