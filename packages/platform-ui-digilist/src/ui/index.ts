/**
 * @xala-technologies/platform-ui-digilist/ui
 *
 * UI feature modules for Digilist domain applications.
 * These are connected UI compositions that combine:
 * - @xala-technologies/platform-ui components (design system)
 * - @digilist/client-sdk hooks (data fetching)
 * - App-specific state management (providers, contexts)
 *
 * ## Architecture
 *
 * ```
 * @digilist/features              → Pure business logic (NO React, NO UI)
 * @xala-technologies/platform-ui-digilist/ui/* → Connected UI (React + SDK)
 * @digilist/client-sdk            → API hooks and services
 * @xala-technologies/platform-ui  → Design system primitives
 * ```
 *
 * ## Available Modules
 *
 * - `./ui/backoffice` - Backoffice app providers, hooks, widgets
 * - `./ui/dashboard` - Dashboard app components and hooks
 * - `./ui/monitoring` - Monitoring app components and hooks
 * - `./ui/web` - Public web app components and hooks
 * - `./ui/docs` - Documentation app components and hooks
 * - `./ui/seasons` - Season-related UI components
 * - `./ui/settings` - Settings UI components and hooks
 * - `./ui/notifications` - Notification UI components
 * - `./ui/shared` - Shared components across apps
 */

// App-specific modules
export * from './backoffice';
export * from './dashboard';
export * from './monitoring';
export * from './web';
export * from './docs';

// Feature modules
export * from './seasons';
export * from './settings';
export * from './notifications';
export * from './shared';
