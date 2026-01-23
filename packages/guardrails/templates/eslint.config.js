/**
 * ESLint Configuration for Platform UI Apps
 * ==========================================
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST use this config.
 *
 * Copy this file to your app's root as: eslint.config.js
 *
 * This enforces:
 * 1. No raw HTML elements in JSX
 * 2. No direct @digdir imports
 * 3. TypeScript best practices
 */

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { createFlatConfig } from '@xala-technologies/guardrails/eslint';

export default tseslint.config(
  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React rules
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Platform UI Guardrails (MANDATORY)
  ...createFlatConfig({
    // Optional: add additional files where raw HTML is allowed
    allowInFiles: [
      // '**/*.stories.tsx', // Already included by default
    ],
  }),

  // Project-specific rules
  {
    rules: {
      // Add your custom rules here
      // But you CANNOT override Platform UI guardrails
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
    ],
  }
);
