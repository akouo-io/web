import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

/**
 * Base flat config: JS + TypeScript, no framework rules.
 * Used directly by `@akouo/theme` and the repo root; composed into `react.js`.
 */
export default [
  {
    ignores: [
      "**/dist/**",
      "**/out/**",
      "**/build/**",
      "**/.next/**",
      "**/node_modules/**",
      "**/*.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // TypeScript's own checker handles undefined references; the core rule
    // produces false positives on types and globals.
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "no-undef": "off",
    },
  },
];
