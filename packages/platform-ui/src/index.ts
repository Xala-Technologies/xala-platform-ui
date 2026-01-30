/**
 * @xala-technologies/platform/ui
 *
 * Unified Design System for the Xala Platform.
 * Built on @digdir/designsystemet-react with custom extensions.
 *
 * ## Import Examples
 *
 * ```tsx
 * // All components from single import
 * import { Button, Card, AppLayout } from '@xala-technologies/platform/ui';
 *
 * // Form Builder components
 * import { FieldRenderer, SchemaForm, DynamicForm } from '@xala-technologies/platform/ui';
 *
 * // Or use subpath imports for smaller bundles
 * import { Button, Card } from '@xala-technologies/platform/ui/primitives';
 * import { PageHeader, SchemaForm } from '@xala-technologies/platform/ui/composed';
 * import { AppLayout } from '@xala-technologies/platform/ui/shells';
 * import { DynamicForm } from '@xala-technologies/platform/ui/patterns';
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
// Blocks - Business logic components
// =============================================================================
export * from './blocks';

// =============================================================================
// Shells - Application shells
// =============================================================================
export * from './shells';

// =============================================================================
// Pages - Full page layouts
// =============================================================================
export * from './pages';

// =============================================================================
// Patterns - High-level platform-specific components
// =============================================================================
export * from './patterns';

// =============================================================================
// Themes - Theme utilities
// =============================================================================
export * from './themes';

// =============================================================================
// Types - Use subpath @xala-technologies/platform/ui/types for full type exports
// Types are also available through composed/blocks/patterns modules
// =============================================================================
// Commented out to avoid duplicate exports - types are already in their modules
// export * from './types';

// =============================================================================
// Utilities
// =============================================================================
export { cn } from './utils';

// =============================================================================
// Form Builder - Declarative schema-driven form generation
// Components: FieldRenderer (primitives), SchemaForm (composed), DynamicForm (patterns)
// All form builder components are available via the wildcard exports above:
// - FieldRenderer: Field rendering from schema definitions (primitives layer)
// - SchemaForm: Schema-driven forms with Zod validation (composed layer)
// - DynamicForm: Advanced forms with conditional fields & dependencies (patterns layer)
// - Types: FormSchema, FieldDefinition, DynamicFormSchema, etc. (from respective layers)
// =============================================================================

// =============================================================================
// Domain-Specific Components
// Note: Domain-specific components are in @xala-technologies/platform-ui-digilist
// Import them directly from that package
// =============================================================================
