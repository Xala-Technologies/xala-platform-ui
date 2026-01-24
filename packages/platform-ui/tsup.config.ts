import { defineConfig } from 'tsup';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import type { Plugin } from 'esbuild';

// Create require function for ESM context
const require = createRequire(import.meta.url);

/**
 * Plugin to bundle CSS from node_modules as inline strings.
 * This allows platform-ui to ship with all CSS bundled, so consuming apps
 * don't need to install @digdir/designsystemet-css or @fontsource/inter.
 *
 * Uses a virtual module approach: intercepts specific CSS imports and
 * replaces them with JavaScript modules that export the CSS content as strings.
 */
const bundleCssPlugin: Plugin = {
  name: 'bundle-css',
  setup(build) {
    // Map of virtual module names to their resolved CSS file paths
    // Note: Using package exports (not direct file paths) for proper resolution
    const cssModules: Record<string, string> = {
      'virtual:inter-400': '@fontsource/inter/400.css',
      'virtual:inter-500': '@fontsource/inter/500.css',
      'virtual:inter-600': '@fontsource/inter/600.css',
      'virtual:inter-700': '@fontsource/inter/700.css',
      // designsystemet-css uses package exports: "." → dist/src/index.css
      'virtual:designsystemet-css': '@digdir/designsystemet-css',
      // designsystemet-css uses package exports: "./theme" → dist/theme/designsystemet.css
      'virtual:designsystemet-theme': '@digdir/designsystemet-css/theme',
    };

    // Resolve virtual module imports
    build.onResolve({ filter: /^virtual:/ }, (args) => {
      const cssPath = cssModules[args.path];
      if (cssPath) {
        try {
          // Resolve the actual CSS file path using require.resolve
          const resolvedPath = require.resolve(cssPath);
          return {
            path: resolvedPath,
            namespace: 'bundled-css',
            pluginData: { originalPath: args.path },
          };
        } catch (e) {
          console.error(`Failed to resolve CSS module ${args.path}:`, e);
          return undefined;
        }
      }
      return undefined;
    });

    // Load CSS files as JS modules exporting the CSS string
    build.onLoad({ filter: /.*/, namespace: 'bundled-css' }, async (args) => {
      try {
        const contents = await fs.promises.readFile(args.path, 'utf8');
        return {
          contents: `export default ${JSON.stringify(contents)};`,
          loader: 'js',
        };
      } catch (e) {
        console.error(`Failed to read CSS file ${args.path}:`, e);
        return {
          contents: 'export default "";',
          loader: 'js',
        };
      }
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
    // React and router are peer dependencies - apps provide these
    'react',
    'react-dom',
    'react-router-dom',
    // React components from designsystemet - external (needs React context)
    '@digdir/designsystemet-react',
    // Zod for validation - external (commonly used, tree-shakeable)
    'zod',
    // NOTE: CSS and fonts are NOT external - they are BUNDLED into platform-ui
    // so consuming apps only need to import '@xala-technologies/platform-ui/styles'
    // without installing @digdir/designsystemet-css or @fontsource/inter
  ],
  esbuildPlugins: [bundleCssPlugin],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  // Handle regular CSS imports as raw text for inline injection
  loader: {
    '.css': 'text',
  },
});
