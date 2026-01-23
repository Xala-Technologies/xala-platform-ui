import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.storybook/**',
      'storybook-static/**',
      'src/stories/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': react,
      'react-hooks': reactHooks,
    },
    rules: {
      // TypeScript rules
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // TypeScript handles undefined checking - disable ESLint's no-undef
      'no-undef': 'off',

      // Boundary rules
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@xala-technologies/platform', '@xala-technologies/platform/*'],
            message: '❌ BOUNDARY VIOLATION: UI package must not import from platform package.',
          },
          {
            group: ['@xala-technologies/platform-schema', '@xala-technologies/platform-schema/*'],
            message: '❌ BOUNDARY VIOLATION: UI package must not import from platform-schema.',
          },
          {
            group: ['@xala-technologies/governance', '@xala-technologies/governance/*'],
            message: '❌ BOUNDARY VIOLATION: UI package must not import from governance package.',
          },
        ],
      }],

      // Design system rules (warnings for gradual migration)
      'no-restricted-syntax': ['warn',
        {
          selector: 'JSXElement[openingElement.name.name=/^(div|span|p|h1|h2|h3|h4|h5|h6|section|article|header|footer|nav|aside|main)$/]',
          message: '⚠️ Prefer Designsystemet components (Box, Heading, Paragraph) over raw HTML.',
        },
        {
          selector: 'JSXAttribute[name.name="style"]',
          message: '⚠️ Prefer data attributes (data-size, data-color) over inline styles.',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
