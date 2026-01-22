import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
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
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@xala-technologies/platform', '@xala-technologies/platform/*'],
            message: '❌ BOUNDARY VIOLATION: UI package must not import from platform package. UI should be pure presentation components with no platform dependencies.',
          },
          {
            group: ['@xala-technologies/platform-schema', '@xala-technologies/platform-schema/*'],
            message: '❌ BOUNDARY VIOLATION: UI package must not import from platform-schema. UI components should not depend on database schemas.',
          },
          {
            group: ['@xala-technologies/governance', '@xala-technologies/governance/*'],
            message: '❌ BOUNDARY VIOLATION: UI package must not import from governance package. Keep UI dependencies minimal.',
          },
        ],
      }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.storybook/**', 'storybook-static/**'],
  },
];
