import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Global ignores MUST be first
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.storybook/**',
      '**/storybook-static/**',
      '**/stories/**',
      '**/AccessibilityDashboard.tsx',
      '**/apps/**',
      // Domain-coupled components excluded from platform-ui build
      '**/*Connected.tsx',
      '**/features/booking/engine/**',
      '**/features/calendar/components/**',
      // Explicit paths for platform-ui package
      'packages/platform-ui/src/features/**/*Connected.tsx',
      'packages/platform-ui/src/features/booking/engine/**',
      'packages/platform-ui/src/features/calendar/components/**',
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

      // TypeScript handles undefined variables better than ESLint
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

      // Design system rules - only flag semantic elements that should be replaced
      // Note: Inline styles with design tokens (var(--ds-*)) are allowed per design system rules
      // Note: Layout divs/span with design tokens are allowed
      'no-restricted-syntax': ['warn',
        {
          selector: 'JSXElement[openingElement.name.name=/^(p|h1|h2|h3|h4|h5|h6|button)$/]',
          message: '⚠️ DESIGN SYSTEM: Prefer Designsystemet components (Heading, Paragraph, Button) over raw HTML.',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // =========================================================================
  // Platform-UI-Core: Enforce Digdir wrapper usage
  // =========================================================================
  {
    files: ['packages/platform-ui-core/src/**/*.{ts,tsx}'],
    ignores: [
      // Allow wrapper files to import directly from Digdir
      'packages/platform-ui-core/src/digdir/**',
      'packages/platform-ui-core/src/primitives/components.ts',
    ],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@digdir/designsystemet-react'],
            message: '❌ WRAPPER VIOLATION: Import from "src/digdir/" or "../digdir" instead of directly from @digdir/designsystemet-react.',
          },
        ],
      }],
    },
  },
];
