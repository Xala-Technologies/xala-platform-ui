import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        'runtime/index': 'src/runtime/index.ts',
        'hooks/index': 'src/hooks/index.ts',
        'builder/index': 'src/builder/index.ts',
        'ai/index': 'src/ai/index.ts',
        'governance/index': 'src/governance/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: [
        'react',
        'react-dom',
        '@xala-technologies/platform-ui',
    ],
    treeshake: true,
})
