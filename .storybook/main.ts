import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const getAbsolutePath = (packageName: string): string => {
  // For Storybook 10 ES modules, use a simpler approach
  return packageName;
};

const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      strictMode: false,
    },
  },
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['./public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-coverage',
    'storybook-dark-mode',
  ],
  docs: {},
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="/vendor/designsystemet.css" />
    <link rel="stylesheet" href="/themes/xala.css" />
    <link rel="stylesheet" href="/themes/xala-extensions.css" />
  `,
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  },
  viteFinal: async (config) => {
    const srcPath = new URL('../src', import.meta.url).pathname;
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          // Fix story imports - map /src to actual src directory
          '/src': srcPath,
          // Handle @xala-technologies/ui paths (new package) - order matters, more specific first
          '@xala-technologies/ui/blocks': `${srcPath}/blocks`,
          '@xala-technologies/ui/composed': `${srcPath}/composed`,
          '@xala-technologies/ui/primitives': `${srcPath}/primitives`,
          '@xala-technologies/ui/shells': `${srcPath}/shells`,
          '@xala-technologies/ui/patterns': `${srcPath}/patterns`,
          '@xala-technologies/ui/pages': `${srcPath}/pages`,
          '@xala-technologies/ui/themes': `${srcPath}/themes`,
          '@xala-technologies/ui/tokens': `${srcPath}/tokens`,
          '@xala-technologies/ui/types': `${srcPath}/types`,
          '@xala-technologies/ui': srcPath,
          // Legacy @xala-technologies/platform/ui paths (backwards compatibility)
          '@xala-technologies/platform/ui/blocks': `${srcPath}/blocks`,
          '@xala-technologies/platform/ui/composed': `${srcPath}/composed`,
          '@xala-technologies/platform/ui/primitives': `${srcPath}/primitives`,
          '@xala-technologies/platform/ui/shells': `${srcPath}/shells`,
          '@xala-technologies/platform/ui/patterns': `${srcPath}/patterns`,
          '@xala-technologies/platform/ui': srcPath,
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
      define: {
        ...config.define,
        // Fix for Chromatic: prevent Node.js APIs from being called in browser
        'process.env': {},
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [...(config.optimizeDeps?.exclude || [])],
        esbuildOptions: {
          ...config.optimizeDeps?.esbuildOptions,
          define: {
            global: 'globalThis',
          },
        },
      },
    };
  },
};

export default config;
