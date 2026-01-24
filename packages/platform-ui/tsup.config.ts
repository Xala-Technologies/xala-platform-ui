import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // Main entry
    index: 'src/index.ts',

    // Sub-modules for tree-shaking
    'primitives/index': 'src/primitives/index.ts',
    'composed/index': 'src/composed/index.ts',
    'shells/index': 'src/shells/index.ts',
    'blocks/index': 'src/blocks/index.ts',
    'themes/index': 'src/themes/index.ts',
    'patterns/index': 'src/patterns/index.ts',
    'pages/index': 'src/pages/index.ts',
    'tokens/index': 'src/tokens/index.ts',
    'types/index': 'src/types/index.ts',
    styles: 'src/styles.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    '@digdir/designsystemet-react',
    '@digdir/designsystemet-css',
    '@digdir/designsystemet-css/theme',
    '@digdir/designsystemet-css/theme.css',
    '@fontsource/inter',
    '@fontsource/inter/400.css',
    '@fontsource/inter/500.css',
    '@fontsource/inter/600.css',
    '@fontsource/inter/700.css',
    'zod',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  // Handle CSS imports as raw text for inline injection
  loader: {
    '.css': 'text',
  },
});
