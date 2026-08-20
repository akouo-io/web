import base from "@akouo/eslint-config/base";

/**
 * Root config — lints repo-level files (this file, workspace tooling).
 * Each workspace ships its own `eslint.config.js`; `pnpm lint` runs them all.
 */
export default [...base];
