import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        // Main entry
        index: 'src/index.ts',

        // Sub-modules
        'blocks/index': 'src/blocks/index.ts',
        'patterns/index': 'src/patterns/index.ts',
        'types/index': 'src/types/index.ts',

        // Feature modules
        'features/booking': 'src/features/booking/index.ts',
        'features/calendar': 'src/features/calendar/index.ts',
        'features/seasons': 'src/features/seasons/index.ts',
        'features/rental-objects': 'src/features/rental-objects/index.ts',
        'features/rental-object-details': 'src/features/rental-object-details/index.ts',
        'features/reviews': 'src/features/reviews/index.ts',
        'features/gdpr': 'src/features/gdpr/index.ts',
        'features/settings': 'src/features/settings/index.ts',
        'features/notifications': 'src/features/notifications/index.ts',
        'features/notification-reports': 'src/features/notification-reports/index.ts',
        'features/organizations': 'src/features/organizations/index.ts',
        'features/docs': 'src/features/docs/index.ts',
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
        '@xala-technologies/platform-ui-core',
        'zod',
    ],
    esbuildOptions(options) {
        options.jsx = 'automatic';
    },
});
