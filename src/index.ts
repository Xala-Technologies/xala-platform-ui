/**
 * @xala-technologies/platform-ui
 *
 * Standalone Design System for the Xala Platform.
 * Built on Norwegian Designsystemet (@digdir/designsystemet-react).
 *
 * ## Simplified 3-Layer Architecture
 *
 * - **primitives/** - Designsystemet component wrappers
 * - **components/** - Composed multi-component compositions
 * - **layouts/** - Application shells and page layouts
 * - **features/** - Domain-specific components
 *
 * ## Import Examples
 *
 * ```tsx
 * // Subpath imports (recommended for tree-shaking)
 * import { Button, Card } from '@xala-technologies/platform-ui/primitives';
 * import { DataTable, Modal } from '@xala-technologies/platform-ui/components';
 * import { AppLayout } from '@xala-technologies/platform-ui/layouts';
 * import { BookingForm } from '@xala-technologies/platform-ui/features/booking';
 *
 * // Main export (imports entire library - not recommended)
 * import { Button, Card, AppLayout } from '@xala-technologies/platform-ui';
 * ```
 */

// =============================================================================
// Primitives - Designsystemet wrappers
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
// Components - Composed components
// =============================================================================
export * from './components';

// =============================================================================
// Layouts - Application shells and page layouts
// =============================================================================
export * from './layouts';

// =============================================================================
// Themes - Theme utilities
// =============================================================================
export * from './themes';

// =============================================================================
// Utilities
// =============================================================================
export { cn } from './utils';

// =============================================================================
// NOTE: Feature components are available via subpath imports:
// import { BookingForm } from '@xala-technologies/platform-ui/features/booking';
// import { SlotCalendar } from '@xala-technologies/platform-ui/features/calendar';
// =============================================================================
