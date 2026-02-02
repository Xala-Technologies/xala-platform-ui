import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        'runtime/index': 'src/runtime/index.ts',
        'hooks/index': 'src/hooks/index.ts',
        'builder/index': 'src/builder/index.ts',
        'ai/index': 'src/ai/index.ts',
        'governance/index': 'src/governance/index.ts',
        'cli/scaffold-app': 'src/cli/scaffold-app.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: [
        'react',
        'react-dom',
        'react-router-dom',
        '@xala-technologies/platform-ui',
    ],
    // Disable tree-shaking to prevent stripping of router components
    treeshake: false,
    // Enable JSX for React components
    esbuildOptions(options) {
        options.jsx = 'automatic'
        options.jsxImportSource = 'react'
    },
})

