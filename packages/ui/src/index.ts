/**
 * @akouo/ui — shared React component library.
 *
 * Components build on tokens from `@akouo/theme`, never the other way around
 * (theme ← ui ← apps).
 */
export const UI_PACKAGE = "@akouo/ui" as const;

export { Button } from "./Button";
export type { ButtonProps } from "./Button";
