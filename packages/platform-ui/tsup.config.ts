import { defineConfig } from 'tsup';
import * as fs from 'fs';
import * as path from 'path';
import type { Plugin } from 'esbuild';

/**
 * Plugin to handle ?raw CSS imports.
 * Strips the ?raw suffix and loads the file as raw text.
 * This makes imports compatible with both Vite (Storybook) and tsup.
 */
const rawCssPlugin: Plugin = {
  name: 'raw-css',
  setup(build) {
    // Handle imports ending with ?raw
    build.onResolve({ filter: /\.css\?raw$/ }, (args) => {
      // Strip ?raw and resolve the actual file path
      const filePath = args.path.replace(/\?raw$/, '');
      const resolved = path.resolve(args.resolveDir, filePath);
      return {
        path: resolved,
        namespace: 'raw-css',
      };
    });

    // Load the CSS content as text
    build.onLoad({ filter: /.*/, namespace: 'raw-css' }, async (args) => {
      const contents = await fs.promises.readFile(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(contents)};`,
        loader: 'js',
      };
    });
  },
};

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
  esbuildPlugins: [rawCssPlugin],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  // Handle regular CSS imports as raw text for inline injection
  loader: {
    '.css': 'text',
  },
});
