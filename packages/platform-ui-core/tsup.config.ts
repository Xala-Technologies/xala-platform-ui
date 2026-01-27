import { defineConfig } from 'tsup';
import * as fs from 'fs';
import { createRequire } from 'module';
import type { Plugin } from 'esbuild';

// Create require function for ESM context
const require = createRequire(import.meta.url);

/**
 * Plugin to bundle CSS from node_modules as inline strings.
 */
const bundleCssPlugin: Plugin = {
    name: 'bundle-css',
    setup(build) {
        const cssModules: Record<string, string> = {
            'virtual:designsystemet-css': '@digdir/designsystemet-css',
            'virtual:designsystemet-theme': '@digdir/designsystemet-css/theme',
        };

        build.onResolve({ filter: /^virtual:/ }, (args) => {
            const cssPath = cssModules[args.path];
            if (cssPath) {
                try {
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
        'zod',
    ],
    esbuildPlugins: [bundleCssPlugin],
    esbuildOptions(options) {
        options.jsx = 'automatic';
    },
    loader: {
        '.css': 'text',
    },
});
