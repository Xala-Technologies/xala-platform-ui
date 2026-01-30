/**
 * ESLint Configuration for Platform UI Consumers
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST extend this config.
 * This ensures consistent code quality and design system compliance.
 *
 * ERROR MESSAGES reference the UX Lexicon for AI and developer guidance.
 * See: docs/ux-lexicon/AI_CONTRACT.mdx
 */

import {
  ELEMENT_MAPPINGS,
  FORBIDDEN_ELEMENTS,
  generateErrorMessage,
  getElementMapping,
  type ElementMapping,
} from './element-mappings.js';

export interface ESLintRuleConfig {
  [key: string]: unknown;
}

// Re-export element mappings for programmatic use
export {
  ELEMENT_MAPPINGS,
  FORBIDDEN_ELEMENTS,
  getElementMapping,
  generateErrorMessage,
  type ElementMapping,
};

/**
 * Forbidden imports - apps should use platform-ui instead of direct @digdir imports
 */
export const forbiddenImports = [
  {
    name: '@digdir/designsystemet-react',
    message:
      'Import from @xala-technologies/platform-ui instead. Designsystemet components are re-exported with proper theming. See: docs/ux-lexicon/AI_CONTRACT.mdx',
  },
  {
    name: '@digdir/designsystemet-css',
    message:
      'CSS is already included via @xala-technologies/platform-ui/styles. Remove this import.',
  },
];

/**
 * Raw HTML elements forbidden in JSX
 * @deprecated Use FORBIDDEN_ELEMENTS from element-mappings instead
 */
export const forbiddenElements = FORBIDDEN_ELEMENTS;

/**
 * Generate ESLint no-restricted-syntax rules for raw HTML elements
 * Each rule includes:
 * - Preferred Platform UI component
 * - Alternative components
 * - Import path
 * - Example code
 * - Decision guide
 * - Lexicon reference
 */
export function generateRawHtmlRules(): ESLintRuleConfig[] {
  return ELEMENT_MAPPINGS.map((mapping) => ({
    selector: `JSXOpeningElement[name.name="${mapping.element}"]`,
    message: generateErrorMessage(mapping.element),
  }));
}

/**
 * ESLint configuration preset for Platform UI consuming apps
 *
 * Usage in app's eslint.config.js:
 * ```
 * import { eslintPreset } from '@xala-technologies/guardrails/eslint';
 * export default [
 *   ...eslintPreset,
 *   // your custom rules
 * ];
 * ```
 */
export const eslintPreset = {
  rules: {
    // Forbidden imports
    'no-restricted-imports': [
      'error',
      {
        paths: forbiddenImports,
      },
    ],

    // Forbidden raw HTML elements
    'no-restricted-syntax': ['error', ...generateRawHtmlRules()],

    // Require design token variables for inline styles
    // This is a custom rule that can be enforced
  },

  // Override for specific file patterns
  overrides: [
    {
      // Allow raw HTML in story files
      files: ['**/*.stories.tsx', '**/*.stories.ts'],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
    {
      // Allow raw HTML in test files
      files: ['**/*.test.tsx', '**/*.test.ts', '**/*.spec.tsx', '**/*.spec.ts'],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
  ],
};

/**
 * Flat config format for ESLint 9+
 */
export function createFlatConfig(options?: { allowInFiles?: string[] }) {
  const { allowInFiles = [] } = options || {};

  return [
    {
      name: 'platform-ui/core',
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: forbiddenImports,
          },
        ],
        'no-restricted-syntax': ['error', ...generateRawHtmlRules()],
      },
    },
    {
      name: 'platform-ui/stories',
      files: ['**/*.stories.tsx', '**/*.stories.ts', ...allowInFiles],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
    {
      name: 'platform-ui/tests',
      files: ['**/*.test.tsx', '**/*.test.ts', '**/*.spec.tsx', '**/*.spec.ts'],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },
  ];
}

export default eslintPreset;
