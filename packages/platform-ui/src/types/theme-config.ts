/**
 * Theme Configuration Types
 *
 * TypeScript types for multi-tenant theme customization.
 * Supports brand colors, typography, and component variant overrides per tenant.
 *
 * @example
 * ```typescript
 * import type { TenantThemeConfig, BrandColors, TypographyConfig } from '@xala-technologies/platform-ui/types';
 *
 * const tenantTheme: TenantThemeConfig = {
 *   tenantId: 'acme-corp',
 *   name: 'Acme Corporation',
 *   baseTheme: 'platform',
 *   colors: {
 *     light: {
 *       accent: { base: '#FF6B35', hover: '#E55A2B', contrast: '#FFFFFF' },
 *     },
 *   },
 *   typography: {
 *     fontFamily: {
 *       base: 'Inter, system-ui, sans-serif',
 *     },
 *   },
 * };
 * ```
 */

import type { ThemeId } from '../themes';

/**
 * Color mode for theme variants.
 * Supports light and dark color schemes.
 *
 * @example
 * ```typescript
 * import type { ColorMode } from '@xala-technologies/platform-ui/types';
 *
 * const mode: ColorMode = 'light';
 * // Or: const mode: ColorMode = 'dark';
 * ```
 */
export type ColorMode = 'light' | 'dark';

/**
 * Accent color configuration for brand colors.
 * Defines primary brand color and its variants.
 *
 * @example
 * ```typescript
 * import type { AccentColors } from '@xala-technologies/platform-ui/types';
 *
 * const accentColors: AccentColors = {
 *   base: '#FF6B35',      // Primary brand color
 *   hover: '#E55A2B',     // Darker shade for hover states
 *   contrast: '#FFFFFF'   // Text color on accent background (must meet WCAG AA contrast)
 * };
 * ```
 */
export interface AccentColors {
  /** Primary accent color (e.g., brand color) */
  base: string;
  /** Accent hover state color */
  hover: string;
  /** Contrast text color on accent background (for accessibility) */
  contrast: string;
}

/**
 * Neutral color configuration for grayscale/semantic colors.
 * Defines backgrounds, text, and border colors.
 *
 * @example
 * ```typescript
 * import type { NeutralColors } from '@xala-technologies/platform-ui/types';
 *
 * const neutralColors: NeutralColors = {
 *   background: '#F8F9FA',    // Page background
 *   surface: '#FFFFFF',       // Cards, modals, panels
 *   surfaceHover: '#F1F3F5',  // Surface hover state
 *   text: '#212529',          // Primary text (must meet WCAG AA on background)
 *   textSubtle: '#6C757D',    // Secondary/muted text
 *   border: '#DEE2E6'         // Borders and dividers
 * };
 * ```
 */
export interface NeutralColors {
  /** Page background color */
  background: string;
  /** Surface color (cards, modals, etc.) */
  surface: string;
  /** Surface hover state color */
  surfaceHover: string;
  /** Primary text color */
  text: string;
  /** Subtle/secondary text color */
  textSubtle: string;
  /** Border color */
  border: string;
}

/**
 * Complete color set for a single theme mode (light or dark).
 * Combines accent and neutral color configurations.
 *
 * @example
 * ```typescript
 * import type { BrandColorSet } from '@xala-technologies/platform-ui/types';
 *
 * const lightMode: BrandColorSet = {
 *   accent: {
 *     base: '#FF6B35',
 *     hover: '#E55A2B',
 *     contrast: '#FFFFFF'
 *   },
 *   neutral: {
 *     background: '#F8F9FA',
 *     surface: '#FFFFFF',
 *     surfaceHover: '#F1F3F5',
 *     text: '#212529',
 *     textSubtle: '#6C757D',
 *     border: '#DEE2E6'
 *   }
 * };
 * ```
 */
export interface BrandColorSet {
  /** Accent colors (primary, hover, contrast) */
  accent?: AccentColors;
  /** Neutral colors (backgrounds, text, borders) */
  neutral?: NeutralColors;
}

/**
 * Brand colors configuration for light and dark color modes.
 * Supports separate color palettes for each mode.
 *
 * @example
 * ```typescript
 * import type { BrandColors } from '@xala-technologies/platform-ui/types';
 *
 * const brandColors: BrandColors = {
 *   light: {
 *     accent: { base: '#FF6B35', hover: '#E55A2B', contrast: '#FFFFFF' },
 *     neutral: { background: '#F8F9FA', surface: '#FFFFFF', text: '#212529', textSubtle: '#6C757D', border: '#DEE2E6', surfaceHover: '#F1F3F5' }
 *   },
 *   dark: {
 *     accent: { base: '#FF8C5A', hover: '#FFA07A', contrast: '#1A1A1A' },
 *     neutral: { background: '#1A1A1A', surface: '#2D2D2D', text: '#E0E0E0', textSubtle: '#A0A0A0', border: '#404040', surfaceHover: '#3A3A3A' }
 *   }
 * };
 * ```
 */
export interface BrandColors {
  /** Light mode colors */
  light?: BrandColorSet;
  /** Dark mode colors */
  dark?: BrandColorSet;
}

/**
 * Font family configuration for text typefaces.
 * Allows separate fonts for body, headings, and code.
 *
 * @example
 * ```typescript
 * import type { FontFamily } from '@xala-technologies/platform-ui/types';
 *
 * const fontFamily: FontFamily = {
 *   base: 'Inter, system-ui, sans-serif',    // Body text font
 *   heading: 'Montserrat, sans-serif',       // Heading font (optional, defaults to base)
 *   mono: 'Fira Code, monospace'             // Code/monospace font
 * };
 * ```
 */
export interface FontFamily {
  /** Base/body font family (e.g., 'Inter, system-ui, sans-serif') */
  base?: string;
  /** Heading font family (defaults to base if not specified) */
  heading?: string;
  /** Monospace font family for code (e.g., 'Fira Code, monospace') */
  mono?: string;
}

/**
 * Font size configuration for text sizing scale.
 * Values should use rem units for accessibility.
 *
 * @example
 * ```typescript
 * import type { FontSize } from '@xala-technologies/platform-ui/types';
 *
 * const fontSize: FontSize = {
 *   xs: '0.75rem',    // 12px at base 16px
 *   sm: '0.875rem',   // 14px
 *   md: '1rem',       // 16px (base)
 *   lg: '1.125rem',   // 18px
 *   xl: '1.25rem',    // 20px
 *   '2xl': '1.5rem'   // 24px
 * };
 * ```
 */
export interface FontSize {
  /** Extra small text (e.g., '0.75rem') */
  xs?: string;
  /** Small text (e.g., '0.875rem') */
  sm?: string;
  /** Medium/base text (e.g., '1rem') */
  md?: string;
  /** Large text (e.g., '1.125rem') */
  lg?: string;
  /** Extra large text (e.g., '1.25rem') */
  xl?: string;
  /** 2x large text (e.g., '1.5rem') */
  '2xl'?: string;
}

/**
 * Line height configuration for text spacing.
 * Values should be unitless multipliers (recommended) or CSS lengths.
 *
 * @example
 * ```typescript
 * import type { LineHeight } from '@xala-technologies/platform-ui/types';
 *
 * const lineHeight: LineHeight = {
 *   tight: 1.2,     // For headings (minimum WCAG recommendation)
 *   normal: 1.5,    // For body text (WCAG 1.4.12 recommendation)
 *   relaxed: 1.75   // For enhanced readability
 * };
 * ```
 */
export interface LineHeight {
  /** Tight line height for headings (e.g., 1.2) */
  tight?: string | number;
  /** Normal line height for body text (e.g., 1.5) */
  normal?: string | number;
  /** Relaxed line height for readability (e.g., 1.75) */
  relaxed?: string | number;
}

/**
 * Typography configuration for complete text styling.
 * Combines font family, size, and line height settings.
 *
 * @example
 * ```typescript
 * import type { TypographyConfig } from '@xala-technologies/platform-ui/types';
 *
 * const typography: TypographyConfig = {
 *   fontFamily: {
 *     base: 'Inter, system-ui, sans-serif',
 *     heading: 'Montserrat, sans-serif',
 *     mono: 'Fira Code, monospace'
 *   },
 *   fontSize: {
 *     md: '1rem',
 *     lg: '1.125rem',
 *     xl: '1.25rem'
 *   },
 *   lineHeight: {
 *     tight: 1.2,
 *     normal: 1.5,
 *     relaxed: 1.75
 *   }
 * };
 * ```
 */
export interface TypographyConfig {
  /** Font family settings */
  fontFamily?: FontFamily;
  /** Font size scale */
  fontSize?: FontSize;
  /** Line height settings */
  lineHeight?: LineHeight;
}

/**
 * Component variant overrides for customizing component styles.
 * Allows fine-grained control over component appearance.
 *
 * @example
 * ```typescript
 * import type { ComponentVariants } from '@xala-technologies/platform-ui/types';
 *
 * const components: ComponentVariants = {
 *   button: {
 *     borderRadius: '0.5rem',
 *     padding: '0.5rem 1rem'
 *   },
 *   card: {
 *     borderRadius: '0.5rem',
 *     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
 *   },
 *   input: {
 *     borderRadius: '0.25rem',
 *     height: '2.5rem'  // Minimum 44px (2.75rem) recommended for touch targets
 *   }
 * };
 * ```
 */
export interface ComponentVariants {
  /** Button variant customizations */
  button?: {
    /** Border radius (e.g., '4px', '0.5rem') */
    borderRadius?: string;
    /** Default padding (e.g., '0.5rem 1rem') */
    padding?: string;
  };
  /** Card variant customizations */
  card?: {
    /** Border radius (e.g., '8px', '0.5rem') */
    borderRadius?: string;
    /** Box shadow (e.g., '0 2px 4px rgba(0,0,0,0.1)') */
    boxShadow?: string;
  };
  /** Input variant customizations */
  input?: {
    /** Border radius (e.g., '4px', '0.25rem') */
    borderRadius?: string;
    /** Default height (e.g., '2.5rem') */
    height?: string;
  };
}

/**
 * Tenant theme configuration
 *
 * Complete theme configuration for a specific tenant, supporting:
 * - Brand color overrides
 * - Typography customization
 * - Component variant overrides
 */
export interface TenantThemeConfig {
  /** Unique tenant identifier */
  tenantId: string;
  /** Display name for the theme */
  name: string;
  /** Base theme to extend from (e.g., 'platform', 'digdir') */
  baseTheme: ThemeId;
  /** Brand color overrides for light and dark modes */
  colors?: BrandColors;
  /** Typography customization */
  typography?: TypographyConfig;
  /** Component variant overrides */
  components?: ComponentVariants;
  /** Optional metadata */
  metadata?: {
    /** Theme version */
    version?: string;
    /** Theme author/creator */
    author?: string;
    /** Theme description */
    description?: string;
    /** Creation/update timestamp */
    updatedAt?: string;
  };
}

/**
 * Theme validation result containing validation status and issues.
 * Used to report schema validation and accessibility check results.
 *
 * @example
 * ```typescript
 * import type { ThemeValidationResult } from '@xala-technologies/platform-ui/types';
 * import { validateTheme } from '@xala-technologies/platform-ui/themes';
 *
 * const result: ThemeValidationResult = validateTheme(config);
 *
 * if (!result.valid) {
 *   console.error('Validation errors:', result.errors);
 * }
 * if (result.warnings && result.warnings.length > 0) {
 *   console.warn('Validation warnings:', result.warnings);
 * }
 * ```
 */
export interface ThemeValidationResult {
  /** Whether the theme is valid */
  valid: boolean;
  /** Validation errors (if any) */
  errors?: Array<{
    /** Error path (e.g., 'colors.light.accent.base') */
    path: string;
    /** Error message */
    message: string;
  }>;
  /** Validation warnings (non-blocking issues) */
  warnings?: Array<{
    /** Warning path */
    path: string;
    /** Warning message */
    message: string;
  }>;
}

/**
 * Theme registration options for controlling theme registration behavior.
 * Provides flags for validation, accessibility checks, and override behavior.
 *
 * @example
 * ```typescript
 * import type { ThemeRegistrationOptions } from '@xala-technologies/platform-ui/types';
 * import { registerCustomTheme } from '@xala-technologies/platform-ui/themes';
 *
 * const options: ThemeRegistrationOptions = {
 *   validate: true,                  // Validate schema before registration (default: true)
 *   skipAccessibilityChecks: false,  // Run accessibility checks (default: false)
 *   override: false                  // Don't override existing themes (default: false)
 * };
 *
 * registerCustomTheme(themeConfig, options);
 * ```
 */
export interface ThemeRegistrationOptions {
  /** Whether to validate the theme before registration */
  validate?: boolean;
  /** Whether to skip accessibility checks */
  skipAccessibilityChecks?: boolean;
  /** Whether to override an existing theme with the same tenantId */
  override?: boolean;
}
