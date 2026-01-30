/**
 * Theme Configuration Validation Schemas
 *
 * Provides Zod schemas for validating tenant theme configurations.
 * Ensures theme customizations are valid before runtime application.
 *
 * @example
 * ```typescript
 * import { themeConfigSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const result = themeConfigSchema.safeParse(config);
 * if (result.success) {
 *   console.log('Valid theme:', result.data);
 * } else {
 *   console.error('Validation errors:', result.error);
 * }
 * ```
 */

import { z } from 'zod';

// =============================================================================
// Color Validation Utilities
// =============================================================================

/**
 * Regex for validating hex colors (#RGB, #RRGGBB, #RRGGBBAA)
 */
const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

/**
 * Regex for validating CSS color values (hex, rgb, rgba, hsl, hsla, named colors)
 */
const CSS_COLOR_REGEX =
  /^(#[A-Fa-f0-9]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|[a-z]+).*$/;

/**
 * Hex color schema with validation
 */
const hexColorSchema = z
  .string()
  .regex(HEX_COLOR_REGEX, 'Must be a valid hex color (e.g., #FF6B35, #FFF)')
  .describe('Hex color value');

/**
 * CSS color schema (accepts hex, rgb, rgba, hsl, hsla, named colors)
 */
const cssColorSchema = z
  .string()
  .regex(CSS_COLOR_REGEX, 'Must be a valid CSS color value')
  .describe('CSS color value');

// =============================================================================
// Typography Validation Utilities
// =============================================================================

/**
 * Regex for validating rem/em/px units
 */
const CSS_LENGTH_REGEX = /^[0-9]+(\.[0-9]+)?(rem|em|px)$/;

/**
 * CSS length value (rem, em, px)
 */
const cssLengthSchema = z
  .string()
  .regex(CSS_LENGTH_REGEX, 'Must be a valid CSS length with rem, em, or px units')
  .describe('CSS length value');

/**
 * Unitless number or CSS length
 */
const lineHeightSchema = z
  .union([z.number().positive(), z.string().regex(/^[0-9]+(\.[0-9]+)?(rem|em)?$/)])
  .describe('Line height (unitless number or CSS length)');

/**
 * Font family string (comma-separated list)
 */
const fontFamilySchema = z
  .string()
  .min(1, 'Font family cannot be empty')
  .describe('Font family (comma-separated list)');

// =============================================================================
// CSS Property Validation
// =============================================================================

/**
 * CSS border-radius value
 */
const borderRadiusSchema = z
  .string()
  .regex(/^[0-9]+(\.[0-9]+)?(px|rem|em|%)$/, 'Must be a valid border-radius value')
  .describe('Border radius value');

/**
 * CSS padding value
 */
const paddingSchema = z
  .string()
  .regex(
    /^[0-9]+(\.[0-9]+)?(px|rem|em)(\s+[0-9]+(\.[0-9]+)?(px|rem|em))*$/,
    'Must be a valid padding value',
  )
  .describe('Padding value');

/**
 * CSS box-shadow value
 */
const boxShadowSchema = z
  .string()
  .min(1, 'Box shadow cannot be empty')
  .describe('Box shadow value');

/**
 * CSS height value
 */
const heightSchema = cssLengthSchema;

// =============================================================================
// Color Schemas
// =============================================================================

/**
 * Accent colors schema for validating brand accent colors.
 * Validates base color, hover state, and contrast text color.
 *
 * @example
 * ```typescript
 * import { accentColorsSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const accentColors = {
 *   base: '#FF6B35',
 *   hover: '#E55A2B',
 *   contrast: '#FFFFFF'
 * };
 *
 * const result = accentColorsSchema.safeParse(accentColors);
 * ```
 */
export const accentColorsSchema = z
  .object({
    base: cssColorSchema.describe('Primary accent color (e.g., brand color)'),
    hover: cssColorSchema.describe('Accent hover state color'),
    contrast: cssColorSchema.describe('Contrast text color on accent background'),
  })
  .describe('Accent color configuration');

/**
 * Neutral colors schema for validating neutral/grayscale colors.
 * Validates background, surface, text, and border colors.
 *
 * @example
 * ```typescript
 * import { neutralColorsSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const neutralColors = {
 *   background: '#F8F9FA',
 *   surface: '#FFFFFF',
 *   surfaceHover: '#F1F3F5',
 *   text: '#212529',
 *   textSubtle: '#6C757D',
 *   border: '#DEE2E6'
 * };
 *
 * const result = neutralColorsSchema.safeParse(neutralColors);
 * ```
 */
export const neutralColorsSchema = z
  .object({
    background: cssColorSchema.describe('Page background color'),
    surface: cssColorSchema.describe('Surface color (cards, modals, etc.)'),
    surfaceHover: cssColorSchema.describe('Surface hover state color'),
    text: cssColorSchema.describe('Primary text color'),
    textSubtle: cssColorSchema.describe('Subtle/secondary text color'),
    border: cssColorSchema.describe('Border color'),
  })
  .describe('Neutral color configuration');

/**
 * Brand color set schema for a single color mode (light or dark).
 * Combines accent and neutral color configurations.
 *
 * @example
 * ```typescript
 * import { brandColorSetSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const lightMode = {
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
 *
 * const result = brandColorSetSchema.safeParse(lightMode);
 * ```
 */
export const brandColorSetSchema = z
  .object({
    accent: accentColorsSchema.optional(),
    neutral: neutralColorsSchema.optional(),
  })
  .describe('Complete color set for a theme mode');

/**
 * Brand colors schema for light and dark color modes.
 * Supports separate color configurations for each mode.
 *
 * @example
 * ```typescript
 * import { brandColorsSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const brandColors = {
 *   light: {
 *     accent: { base: '#FF6B35', hover: '#E55A2B', contrast: '#FFFFFF' },
 *     neutral: { background: '#F8F9FA', surface: '#FFFFFF', text: '#212529' }
 *   },
 *   dark: {
 *     accent: { base: '#FF8C5A', hover: '#FFA07A', contrast: '#1A1A1A' },
 *     neutral: { background: '#1A1A1A', surface: '#2D2D2D', text: '#E0E0E0' }
 *   }
 * };
 *
 * const result = brandColorsSchema.safeParse(brandColors);
 * ```
 */
export const brandColorsSchema = z
  .object({
    light: brandColorSetSchema.optional().describe('Light mode colors'),
    dark: brandColorSetSchema.optional().describe('Dark mode colors'),
  })
  .describe('Brand colors configuration for light and dark modes');

// =============================================================================
// Typography Schemas
// =============================================================================

/**
 * Font family configuration schema for customizing typefaces.
 * Supports separate fonts for body text, headings, and code.
 *
 * @example
 * ```typescript
 * import { fontFamilyConfigSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const fontFamily = {
 *   base: 'Inter, system-ui, sans-serif',
 *   heading: 'Montserrat, sans-serif',
 *   mono: 'Fira Code, monospace'
 * };
 *
 * const result = fontFamilyConfigSchema.safeParse(fontFamily);
 * ```
 */
export const fontFamilyConfigSchema = z
  .object({
    base: fontFamilySchema
      .optional()
      .describe('Base/body font family (e.g., "Inter, system-ui, sans-serif")'),
    heading: fontFamilySchema
      .optional()
      .describe('Heading font family (defaults to base if not specified)'),
    mono: fontFamilySchema
      .optional()
      .describe('Monospace font family for code (e.g., "Fira Code, monospace")'),
  })
  .describe('Font family configuration');

/**
 * Font size configuration schema for text sizing scale.
 * Values should use rem units for accessibility.
 *
 * @example
 * ```typescript
 * import { fontSizeSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const fontSize = {
 *   xs: '0.75rem',
 *   sm: '0.875rem',
 *   md: '1rem',
 *   lg: '1.125rem',
 *   xl: '1.25rem',
 *   '2xl': '1.5rem'
 * };
 *
 * const result = fontSizeSchema.safeParse(fontSize);
 * ```
 */
export const fontSizeSchema = z
  .object({
    xs: cssLengthSchema.optional().describe('Extra small text (e.g., "0.75rem")'),
    sm: cssLengthSchema.optional().describe('Small text (e.g., "0.875rem")'),
    md: cssLengthSchema.optional().describe('Medium/base text (e.g., "1rem")'),
    lg: cssLengthSchema.optional().describe('Large text (e.g., "1.125rem")'),
    xl: cssLengthSchema.optional().describe('Extra large text (e.g., "1.25rem")'),
    '2xl': cssLengthSchema.optional().describe('2x large text (e.g., "1.5rem")'),
  })
  .describe('Font size scale');

/**
 * Line height configuration schema for text spacing.
 * Values should be unitless multipliers or CSS lengths.
 *
 * @example
 * ```typescript
 * import { lineHeightConfigSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const lineHeight = {
 *   tight: 1.2,
 *   normal: 1.5,
 *   relaxed: 1.75
 * };
 *
 * const result = lineHeightConfigSchema.safeParse(lineHeight);
 * ```
 */
export const lineHeightConfigSchema = z
  .object({
    tight: lineHeightSchema.optional().describe('Tight line height for headings (e.g., 1.2)'),
    normal: lineHeightSchema.optional().describe('Normal line height for body text (e.g., 1.5)'),
    relaxed: lineHeightSchema
      .optional()
      .describe('Relaxed line height for readability (e.g., 1.75)'),
  })
  .describe('Line height configuration');

/**
 * Typography configuration schema for complete text styling.
 * Combines font family, size, and line height settings.
 *
 * @example
 * ```typescript
 * import { typographyConfigSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const typography = {
 *   fontFamily: {
 *     base: 'Inter, system-ui, sans-serif',
 *     heading: 'Montserrat, sans-serif'
 *   },
 *   fontSize: {
 *     md: '1rem',
 *     lg: '1.125rem'
 *   },
 *   lineHeight: {
 *     normal: 1.5,
 *     relaxed: 1.75
 *   }
 * };
 *
 * const result = typographyConfigSchema.safeParse(typography);
 * ```
 */
export const typographyConfigSchema = z
  .object({
    fontFamily: fontFamilyConfigSchema.optional().describe('Font family settings'),
    fontSize: fontSizeSchema.optional().describe('Font size scale'),
    lineHeight: lineHeightConfigSchema.optional().describe('Line height settings'),
  })
  .describe('Typography configuration');

// =============================================================================
// Component Variant Schemas
// =============================================================================

/**
 * Button variant customizations schema for button styling.
 * Allows customization of button appearance properties.
 *
 * @example
 * ```typescript
 * import { buttonVariantSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const buttonVariant = {
 *   borderRadius: '0.5rem',
 *   padding: '0.5rem 1rem'
 * };
 *
 * const result = buttonVariantSchema.safeParse(buttonVariant);
 * ```
 */
export const buttonVariantSchema = z
  .object({
    borderRadius: borderRadiusSchema.optional().describe('Border radius (e.g., "4px", "0.5rem")'),
    padding: paddingSchema.optional().describe('Default padding (e.g., "0.5rem 1rem")'),
  })
  .describe('Button variant customizations');

/**
 * Card variant customizations schema for card component styling.
 * Allows customization of card appearance properties.
 *
 * @example
 * ```typescript
 * import { cardVariantSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const cardVariant = {
 *   borderRadius: '0.5rem',
 *   boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
 * };
 *
 * const result = cardVariantSchema.safeParse(cardVariant);
 * ```
 */
export const cardVariantSchema = z
  .object({
    borderRadius: borderRadiusSchema.optional().describe('Border radius (e.g., "8px", "0.5rem")'),
    boxShadow: boxShadowSchema
      .optional()
      .describe('Box shadow (e.g., "0 2px 4px rgba(0,0,0,0.1)")'),
  })
  .describe('Card variant customizations');

/**
 * Input variant customizations schema for input component styling.
 * Allows customization of input field appearance properties.
 *
 * @example
 * ```typescript
 * import { inputVariantSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const inputVariant = {
 *   borderRadius: '0.25rem',
 *   height: '2.5rem'
 * };
 *
 * const result = inputVariantSchema.safeParse(inputVariant);
 * ```
 */
export const inputVariantSchema = z
  .object({
    borderRadius: borderRadiusSchema
      .optional()
      .describe('Border radius (e.g., "4px", "0.25rem")'),
    height: heightSchema.optional().describe('Default height (e.g., "2.5rem")'),
  })
  .describe('Input variant customizations');

/**
 * Component variants schema for customizing component styles.
 * Combines variant configurations for multiple component types.
 *
 * @example
 * ```typescript
 * import { componentVariantsSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const components = {
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
 *     height: '2.5rem'
 *   }
 * };
 *
 * const result = componentVariantsSchema.safeParse(components);
 * ```
 */
export const componentVariantsSchema = z
  .object({
    button: buttonVariantSchema.optional().describe('Button variant customizations'),
    card: cardVariantSchema.optional().describe('Card variant customizations'),
    input: inputVariantSchema.optional().describe('Input variant customizations'),
  })
  .describe('Component variant overrides');

// =============================================================================
// Theme Metadata Schema
// =============================================================================

/**
 * Theme metadata schema for optional theme information.
 * Provides additional context about the theme.
 *
 * @example
 * ```typescript
 * import { themeMetadataSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const metadata = {
 *   version: '1.0.0',
 *   author: 'Design Team',
 *   description: 'Corporate brand theme',
 *   updatedAt: '2024-01-15T10:30:00Z'
 * };
 *
 * const result = themeMetadataSchema.safeParse(metadata);
 * ```
 */
export const themeMetadataSchema = z
  .object({
    version: z.string().optional().describe('Theme version'),
    author: z.string().optional().describe('Theme author/creator'),
    description: z.string().optional().describe('Theme description'),
    updatedAt: z.string().optional().describe('Creation/update timestamp'),
  })
  .describe('Optional theme metadata');

// =============================================================================
// Theme Configuration Schema (Main Export)
// =============================================================================

/**
 * Tenant theme configuration schema
 *
 * Validates complete theme configuration for a specific tenant, supporting:
 * - Brand color overrides
 * - Typography customization
 * - Component variant overrides
 *
 * @example
 * ```typescript
 * const config = {
 *   tenantId: 'acme-corp',
 *   name: 'Acme Corporation',
 *   baseTheme: 'platform',
 *   colors: {
 *     light: {
 *       accent: {
 *         base: '#FF6B35',
 *         hover: '#E55A2B',
 *         contrast: '#FFFFFF'
 *       }
 *     }
 *   }
 * };
 *
 * const result = themeConfigSchema.safeParse(config);
 * ```
 */
export const themeConfigSchema = z
  .object({
    tenantId: z.string().min(1, 'Tenant ID is required').describe('Unique tenant identifier'),
    name: z.string().min(1, 'Theme name is required').describe('Display name for the theme'),
    baseTheme: z
      .enum(['digdir', 'altinn', 'brreg', 'digilist', 'xaheen', 'platform'])
      .describe('Base theme to extend from'),
    colors: brandColorsSchema.optional().describe('Brand color overrides'),
    typography: typographyConfigSchema.optional().describe('Typography customization'),
    components: componentVariantsSchema.optional().describe('Component variant overrides'),
    metadata: themeMetadataSchema.optional().describe('Optional metadata'),
  })
  .strict()
  .describe('Tenant theme configuration');

// =============================================================================
// Type Inference
// =============================================================================

/**
 * TypeScript type inferred from themeConfigSchema.
 * Use this type for type-safe theme configuration objects.
 *
 * @example
 * ```typescript
 * import type { ThemeConfigSchema } from '@xala-technologies/platform-ui/themes';
 *
 * const theme: ThemeConfigSchema = {
 *   tenantId: 'acme',
 *   name: 'ACME Corp',
 *   baseTheme: 'platform',
 *   colors: { light: { accent: { base: '#FF6B35', hover: '#E55A2B', contrast: '#FFF' } } }
 * };
 * ```
 */
export type ThemeConfigSchema = z.infer<typeof themeConfigSchema>;

/**
 * TypeScript type inferred from brandColorsSchema.
 * Use this type for type-safe brand color objects.
 */
export type BrandColorsSchema = z.infer<typeof brandColorsSchema>;

/**
 * TypeScript type inferred from typographyConfigSchema.
 * Use this type for type-safe typography configuration objects.
 */
export type TypographyConfigSchema = z.infer<typeof typographyConfigSchema>;

/**
 * TypeScript type inferred from componentVariantsSchema.
 * Use this type for type-safe component variant objects.
 */
export type ComponentVariantsSchema = z.infer<typeof componentVariantsSchema>;

// =============================================================================
// Validation Helper Functions
// =============================================================================

/**
 * Validate theme configuration with detailed error messages
 *
 * @param config - Theme configuration to validate
 * @returns Validation result with parsed data or error details
 *
 * @example
 * ```typescript
 * const result = validateThemeConfig(config);
 * if (result.success) {
 *   console.log('Valid theme:', result.data);
 * } else {
 *   console.error('Validation failed:', result.error.issues);
 * }
 * ```
 */
export function validateThemeConfig(config: unknown) {
  return themeConfigSchema.safeParse(config);
}

/**
 * Parse theme configuration (throws on validation error)
 *
 * @param config - Theme configuration to parse
 * @returns Parsed theme configuration
 * @throws {z.ZodError} If validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const theme = parseThemeConfig(config);
 *   console.log('Valid theme:', theme);
 * } catch (error) {
 *   console.error('Invalid theme:', error);
 * }
 * ```
 */
export function parseThemeConfig(config: unknown): ThemeConfigSchema {
  return themeConfigSchema.parse(config);
}
