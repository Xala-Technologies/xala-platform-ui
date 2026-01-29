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
        // 'features/rental-object-details': 'src/features/rental-object-details/index.ts', // TODO: Fix missing component files
        'features/reviews': 'src/features/reviews/index.ts',
        'features/gdpr': 'src/features/gdpr/index.ts',
        'features/settings': 'src/features/settings/index.ts',
        'features/notifications': 'src/features/notifications/index.ts',
        'features/notification-reports': 'src/features/notification-reports/index.ts',
        'features/organizations': 'src/features/organizations/index.ts',
        'features/docs': 'src/features/docs/index.ts',

        // UI modules
        'ui/backoffice/index': 'src/ui/backoffice/index.ts',
        'ui/dashboard/index': 'src/ui/dashboard/index.ts',
        'ui/docs/index': 'src/ui/docs/index.ts',
        'ui/monitoring/index': 'src/ui/monitoring/index.ts',
        'ui/notifications/index': 'src/ui/notifications/index.ts',
        'ui/seasons/index': 'src/ui/seasons/index.ts',
        'ui/settings/index': 'src/ui/settings/index.ts',
        'ui/shared/index': 'src/ui/shared/index.ts',
        'ui/web/index': 'src/ui/web/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    external: [
        // React
        'react',
        'react-dom',
        'react-router-dom',
        // UI packages
        '@digdir/designsystemet-react',
        '@xala-technologies/platform-ui-core',
        '@xala-technologies/platform-ui',
        'lucide-react',
        // Platform packages (all subpaths)
        '@xala-technologies/platform',
        '@xala-technologies/platform/auth',
        '@xala-technologies/platform/runtime',
        '@xalatechnologies/platform',
        '@xalatechnologies/platform/auth',
        '@xalatechnologies/platform/runtime',
        // Domain packages (all subpaths)
        '@digilist/client-sdk',
        '@digilist/client-sdk/hooks',
        '@digilist/client-sdk/types',
        '@digilist/runtime',
        '@digilist/platform-bridge',
        '@digilist/platform-bridge/hooks',
        // Data/query
        '@tanstack/react-query',
        'zod',
        // Date handling
        'date-fns',
        // Maps
        'mapbox-gl',
        'react-map-gl',
        // Other common deps
        '@sentry/react',
        'i18next',
        'react-i18next',
    ],
    esbuildOptions(options) {
        options.jsx = 'automatic';
    },
});
