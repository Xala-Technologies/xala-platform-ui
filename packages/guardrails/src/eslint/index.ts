/**
 * ESLint Configuration for Platform UI Consumers
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST extend this config.
 * This ensures consistent code quality and design system compliance.
 */

export interface ESLintRuleConfig {
  [key: string]: unknown;
}

/**
 * Forbidden imports - apps should use platform-ui instead of direct @digdir imports
 */
export const forbiddenImports = [
  {
    name: '@digdir/designsystemet-react',
    message: 'Import from @xala-technologies/platform-ui instead',
  },
  {
    name: '@digdir/designsystemet-css',
    message: 'CSS is already included via @xala-technologies/platform-ui',
  },
];

/**
 * Raw HTML elements forbidden in JSX
 */
export const forbiddenElements = [
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'section',
  'article',
  'header',
  'footer',
  'nav',
  'aside',
  'main',
  'button',
  'a',
  'input',
  'select',
  'textarea',
  'label',
  'ul',
  'ol',
  'li',
  'table',
  'tr',
  'td',
  'th',
  'form',
];

/**
 * Generate ESLint no-restricted-syntax rules for raw HTML elements
 */
export function generateRawHtmlRules(): ESLintRuleConfig[] {
  return forbiddenElements.map((element) => ({
    selector: `JSXOpeningElement[name.name="${element}"]`,
    message: `Raw <${element}> is forbidden. Use platform-ui components instead.`,
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
