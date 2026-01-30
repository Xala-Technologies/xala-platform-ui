/**
 * @xala-technologies/platform-ui-core
 *
 * Universal Design System for the Xala Platform - Core Package.
 * Built on @digdir/designsystemet-react with custom extensions.
 * 
 * This package contains ONLY universal, domain-agnostic UI components.
 * For Digilist-specific components, use @xala-technologies/platform-ui-digilist.
 *
 * ## Import Examples
 *
 * ```tsx
 * // All components from single import
 * import { Button, Card, AppLayout } from '@xala-technologies/platform-ui-core';
 *
 * // Or use subpath imports for smaller bundles
 * import { Button, Card } from '@xala-technologies/platform-ui-core/primitives';
 * import { PageHeader } from '@xala-technologies/platform-ui-core/composed';
 * import { AppLayout } from '@xala-technologies/platform-ui-core/shells';
 * ```
 */

// =============================================================================
// Primitives - Base components (icons, container, grid, @digdir components)
// =============================================================================
export * from './primitives';

// =============================================================================
// Provider & Theme
// =============================================================================
export {
    DesignsystemetProvider,
    DirectionContext,
    useDirection,
    getAutoDirection,
} from './provider';
export type {
    DesignsystemetProviderProps,
    ColorScheme,
    DsSize,
    Typography,
    Direction,
    DirectionContextValue,
} from './provider';
export { ThemeProvider, useTheme } from './ThemeProvider';
export type { ThemeProviderProps, ThemeContextValue } from './ThemeProvider';
export { StoryProvider } from './StoryProvider';
export type { StoryProviderProps } from './StoryProvider';

// =============================================================================
// Composed Components
// =============================================================================
export * from './composed';

// =============================================================================
// Blocks - Universal business logic components
// =============================================================================
export * from './blocks';

// =============================================================================
// Shells - Application shells
// =============================================================================
export * from './shells';

// =============================================================================
// Patterns - High-level universal patterns
// =============================================================================
export * from './patterns';

// =============================================================================
// Themes - Theme utilities
// =============================================================================
export * from './themes';

// =============================================================================
// Utilities
// =============================================================================
export { cn } from './utils';

// =============================================================================
// i18n Registration
// =============================================================================
// Core UI provides minimal i18n strings for universal components
// Apps must call this during bootstrap after creating the i18n instance
export function registerCoreI18n(i18n: { addResourceBundle: (lng: string, ns: string, resources: object) => void }): void {
    // Register core UI namespace with minimal universal strings
    const coreResources = {
        buttons: {
            submit: 'Send',
            cancel: 'Avbryt',
            close: 'Lukk',
            save: 'Lagre',
            delete: 'Slett',
            edit: 'Rediger',
            back: 'Tilbake',
            next: 'Neste',
            confirm: 'Bekreft',
            retry: 'Prøv igjen',
        },
        errors: {
            required: 'Dette feltet er påkrevd',
            generic: 'Noe gikk galt',
            network: 'Nettverksfeil',
            notFound: 'Ikke funnet',
            unauthorized: 'Ikke autorisert',
        },
        states: {
            loading: 'Laster...',
            empty: 'Ingen resultater',
            error: 'Feil oppstod',
        },
    };

    i18n.addResourceBundle('nb', 'core', coreResources);
    i18n.addResourceBundle('no', 'core', coreResources);

    // English fallback
    i18n.addResourceBundle('en', 'core', {
        buttons: {
            submit: 'Submit',
            cancel: 'Cancel',
            close: 'Close',
            save: 'Save',
            delete: 'Delete',
            edit: 'Edit',
            back: 'Back',
            next: 'Next',
            confirm: 'Confirm',
            retry: 'Retry',
        },
        errors: {
            required: 'This field is required',
            generic: 'Something went wrong',
            network: 'Network error',
            notFound: 'Not found',
            unauthorized: 'Unauthorized',
        },
        states: {
            loading: 'Loading...',
            empty: 'No results',
            error: 'An error occurred',
        },
    });
}
