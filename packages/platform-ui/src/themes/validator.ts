/**
 * Theme Validator with Accessibility Checks
 *
 * Validates theme configurations for accessibility compliance according to WCAG 2.1 guidelines.
 * Ensures color contrast, typography, and component sizing meet accessibility standards.
 *
 * @example
 * ```typescript
 * import { validateThemeAccessibility } from '@xala-technologies/platform-ui/themes';
 *
 * const result = validateThemeAccessibility(themeConfig);
 * if (result.isValid) {
 *   console.log('Theme passes accessibility checks');
 * } else {
 *   console.warn('Accessibility issues:', result.warnings);
 *   console.error('Accessibility errors:', result.errors);
 * }
 * ```
 */

import type { ThemeConfigSchema } from './schema';
import { validateThemeConfig } from './schema';

// =============================================================================
// Types
// =============================================================================

/**
 * Severity level for validation issues.
 * - error: Critical issues that violate WCAG Level A/AA (must fix)
 * - warning: Non-critical issues or WCAG AAA recommendations
 * - info: Informational messages about best practices
 *
 * @example
 * ```typescript
 * import type { ValidationSeverity } from '@xala-technologies/platform-ui/themes';
 *
 * const severity: ValidationSeverity = 'error';
 * ```
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

/**
 * Validation issue details for a single accessibility or validation problem.
 * Includes severity, location, description, and suggested fix.
 *
 * @example
 * ```typescript
 * import type { ValidationIssue } from '@xala-technologies/platform-ui/themes';
 *
 * const issue: ValidationIssue = {
 *   severity: 'error',
 *   criterion: '1.4.3',
 *   message: 'Contrast ratio 3.2:1 fails WCAG AA requirement (4.5:1)',
 *   path: 'colors.light.accent',
 *   suggestion: 'Adjust colors to achieve 4.5:1 contrast ratio'
 * };
 * ```
 */
export interface ValidationIssue {
  /** Severity level of the issue */
  severity: ValidationSeverity;
  /** WCAG success criterion (e.g., '1.4.3', '1.4.6') */
  criterion?: string;
  /** Human-readable message */
  message: string;
  /** Path to the problematic value (e.g., 'colors.light.accent.base') */
  path: string;
  /** Suggested fix */
  suggestion?: string;
}

/**
 * Accessibility validation result containing all validation issues.
 * Categorizes issues by severity: errors (must fix), warnings (should fix), and info (nice to have).
 *
 * @example
 * ```typescript
 * import type { AccessibilityValidationResult } from '@xala-technologies/platform-ui/themes';
 * import { validateThemeAccessibility } from '@xala-technologies/platform-ui/themes';
 *
 * const result: AccessibilityValidationResult = validateThemeAccessibility(config);
 *
 * if (!result.isValid) {
 *   console.error('Critical issues:', result.errors);
 * }
 * if (result.warnings.length > 0) {
 *   console.warn('Recommendations:', result.warnings);
 * }
 * ```
 */
export interface AccessibilityValidationResult {
  /** Whether the theme passes all required checks */
  isValid: boolean;
  /** Critical accessibility errors (WCAG Level A/AA violations) */
  errors: ValidationIssue[];
  /** Non-critical warnings (best practices, WCAG AAA) */
  warnings: ValidationIssue[];
  /** Informational messages */
  info: ValidationIssue[];
}

// =============================================================================
// Color Parsing Utilities
// =============================================================================

/**
 * RGB color representation
 */
interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

/**
 * Parse hex color to RGB
 */
function parseHexColor(hex: string): RGB | null {
  const cleaned = hex.replace('#', '');

  // Handle shorthand (#RGB)
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b };
  }

  // Handle full format (#RRGGBB or #RRGGBBAA)
  if (cleaned.length === 6 || cleaned.length === 8) {
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    return { r, g, b };
  }

  return null;
}

/**
 * Parse rgb/rgba color string to RGB
 */
function parseRgbColor(color: string): RGB | null {
  const match = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return null;

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

/**
 * Parse hsl/hsla color string to RGB
 */
function parseHslColor(color: string): RGB | null {
  const match = color.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/i);
  if (!match) return null;

  const h = parseInt(match[1], 10) / 360;
  const s = parseInt(match[2], 10) / 100;
  const l = parseInt(match[3], 10) / 100;

  // HSL to RGB conversion
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Parse CSS color string to RGB
 */
function parseColor(color: string): RGB | null {
  const trimmed = color.trim().toLowerCase();

  // Hex colors
  if (trimmed.startsWith('#')) {
    return parseHexColor(trimmed);
  }

  // RGB/RGBA colors
  if (trimmed.startsWith('rgb')) {
    return parseRgbColor(trimmed);
  }

  // HSL/HSLA colors
  if (trimmed.startsWith('hsl')) {
    return parseHslColor(trimmed);
  }

  // Named colors (basic set)
  const namedColors: Record<string, RGB> = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, b: 0 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    yellow: { r: 255, g: 255, b: 0 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 },
  };

  return namedColors[trimmed] || null;
}

// =============================================================================
// Contrast Calculation (WCAG 2.1)
// =============================================================================

/**
 * Calculate relative luminance for a color (WCAG 2.1)
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getRelativeLuminance(rgb: RGB): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors (WCAG 2.1)
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);

  if (!rgb1 || !rgb2) return null;

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// =============================================================================
// WCAG Contrast Requirements
// =============================================================================

/**
 * Minimum contrast ratios per WCAG 2.1
 */
const WCAG_CONTRAST = {
  AA_NORMAL: 4.5, // Level AA for normal text (<18pt or <14pt bold)
  AA_LARGE: 3.0, // Level AA for large text (≥18pt or ≥14pt bold)
  AAA_NORMAL: 7.0, // Level AAA for normal text
  AAA_LARGE: 4.5, // Level AAA for large text
};

/**
 * Check if contrast meets WCAG AA requirements for normal text
 */
function meetsWCAGAA(ratio: number | null): boolean {
  return ratio !== null && ratio >= WCAG_CONTRAST.AA_NORMAL;
}

/**
 * Check if contrast meets WCAG AA requirements for large text
 */
function meetsWCAGAALarge(ratio: number | null): boolean {
  return ratio !== null && ratio >= WCAG_CONTRAST.AA_LARGE;
}

// =============================================================================
// Typography Validation
// =============================================================================

/**
 * Parse CSS length value to pixels (approximate)
 */
function parseLengthToPx(value: string): number | null {
  const match = value.match(/^([0-9.]+)(px|rem|em)$/);
  if (!match) return null;

  const num = parseFloat(match[1]);
  const unit = match[2];

  // Convert to pixels (assuming 16px base font size)
  switch (unit) {
    case 'px':
      return num;
    case 'rem':
    case 'em':
      return num * 16;
    default:
      return null;
  }
}

/**
 * Validate font size for accessibility
 */
function validateFontSize(size: string, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const px = parseLengthToPx(size);

  if (px === null) {
    issues.push({
      severity: 'error',
      message: `Invalid font size format: ${size}`,
      path,
      suggestion: 'Use px, rem, or em units (e.g., "16px", "1rem")',
    });
    return issues;
  }

  // WCAG recommends minimum 12px (0.75rem) for body text
  if (px < 12) {
    issues.push({
      severity: 'error',
      criterion: '1.4.4',
      message: `Font size ${size} (${px}px) is below minimum recommended size of 12px`,
      path,
      suggestion: 'Use at least 0.75rem (12px) for readability',
    });
  } else if (px < 14) {
    issues.push({
      severity: 'warning',
      criterion: '1.4.4',
      message: `Font size ${size} (${px}px) is smaller than recommended 14px for body text`,
      path,
      suggestion: 'Consider using at least 0.875rem (14px) for better readability',
    });
  }

  return issues;
}

/**
 * Validate line height for accessibility
 */
function validateLineHeight(lineHeight: number | string, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const value = typeof lineHeight === 'number' ? lineHeight : parseFloat(lineHeight);

  if (isNaN(value)) {
    issues.push({
      severity: 'error',
      message: `Invalid line height: ${lineHeight}`,
      path,
      suggestion: 'Use a number (e.g., 1.5) or valid CSS length',
    });
    return issues;
  }

  // WCAG 1.4.12 recommends 1.5 for body text
  if (value < 1.2) {
    issues.push({
      severity: 'error',
      criterion: '1.4.12',
      message: `Line height ${value} is too tight for readability`,
      path,
      suggestion: 'Use at least 1.5 for body text, 1.2 minimum for headings',
    });
  } else if (value < 1.5 && path.includes('normal')) {
    issues.push({
      severity: 'warning',
      criterion: '1.4.12',
      message: `Line height ${value} is below recommended 1.5 for body text`,
      path,
      suggestion: 'Use 1.5 or higher for optimal readability',
    });
  }

  return issues;
}

// =============================================================================
// Component Size Validation
// =============================================================================

/**
 * Validate component sizes for touch accessibility
 */
function validateTouchTargetSize(size: string, path: string, component: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const px = parseLengthToPx(size);

  if (px === null) {
    issues.push({
      severity: 'error',
      message: `Invalid size format: ${size}`,
      path,
      suggestion: 'Use px, rem, or em units',
    });
    return issues;
  }

  // WCAG 2.5.5 recommends minimum 44x44px for touch targets
  const MIN_TOUCH_TARGET = 44;

  if (component === 'button' && px < MIN_TOUCH_TARGET) {
    issues.push({
      severity: 'warning',
      criterion: '2.5.5',
      message: `${component} size ${size} (${px}px) is below recommended ${MIN_TOUCH_TARGET}px for touch targets`,
      path,
      suggestion: `Use at least ${MIN_TOUCH_TARGET}px (2.75rem) for better mobile accessibility`,
    });
  }

  return issues;
}

// =============================================================================
// Main Validation Functions
// =============================================================================

/**
 * Validate color contrast for a color set
 */
function validateColorContrast(
  colors: Record<string, string>,
  mode: 'light' | 'dark',
  basePath: string,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check accent contrast (base vs contrast)
  if (colors.accentBase && colors.accentContrast) {
    const ratio = getContrastRatio(colors.accentBase, colors.accentContrast);
    const path = `${basePath}.accent`;

    if (!meetsWCAGAA(ratio)) {
      issues.push({
        severity: 'error',
        criterion: '1.4.3',
        message: `Accent color contrast ratio ${ratio?.toFixed(2)} fails WCAG AA requirement (4.5:1)`,
        path,
        suggestion: 'Adjust accent base or contrast colors to achieve 4.5:1 ratio',
      });
    } else if (ratio && ratio < WCAG_CONTRAST.AAA_NORMAL) {
      issues.push({
        severity: 'warning',
        criterion: '1.4.6',
        message: `Accent color contrast ratio ${ratio.toFixed(2)} below AAA standard (7:1)`,
        path,
        suggestion: 'Consider improving contrast for AAA compliance',
      });
    }
  }

  // Check neutral text contrast (text vs background)
  if (colors.neutralText && colors.neutralBackground) {
    const ratio = getContrastRatio(colors.neutralText, colors.neutralBackground);
    const path = `${basePath}.neutral.text`;

    if (!meetsWCAGAA(ratio)) {
      issues.push({
        severity: 'error',
        criterion: '1.4.3',
        message: `Text/background contrast ratio ${ratio?.toFixed(2)} fails WCAG AA (4.5:1)`,
        path,
        suggestion: 'Increase contrast between text and background colors',
      });
    }
  }

  // Check subtle text contrast
  if (colors.neutralTextSubtle && colors.neutralBackground) {
    const ratio = getContrastRatio(colors.neutralTextSubtle, colors.neutralBackground);
    const path = `${basePath}.neutral.textSubtle`;

    if (!meetsWCAGAALarge(ratio)) {
      issues.push({
        severity: 'error',
        criterion: '1.4.3',
        message: `Subtle text contrast ratio ${ratio?.toFixed(2)} fails WCAG AA for large text (3:1)`,
        path,
        suggestion: 'Subtle text should have at least 3:1 contrast for large text',
      });
    } else if (!meetsWCAGAA(ratio)) {
      issues.push({
        severity: 'warning',
        criterion: '1.4.3',
        message: `Subtle text contrast ratio ${ratio?.toFixed(2)} may not be suitable for small text`,
        path,
        suggestion: 'Use this color only for large text or non-critical content',
      });
    }
  }

  // Check border contrast
  if (colors.neutralBorder && colors.neutralBackground) {
    const ratio = getContrastRatio(colors.neutralBorder, colors.neutralBackground);
    const path = `${basePath}.neutral.border`;

    if (ratio && ratio < 3.0) {
      issues.push({
        severity: 'warning',
        criterion: '1.4.11',
        message: `Border contrast ratio ${ratio.toFixed(2)} is below recommended 3:1`,
        path,
        suggestion: 'Borders should have at least 3:1 contrast for visibility',
      });
    }
  }

  return issues;
}

/**
 * Validate typography configuration
 */
function validateTypography(
  config: ThemeConfigSchema,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!config.typography) return issues;

  // Validate font sizes
  if (config.typography.fontSize) {
    const sizes = config.typography.fontSize;
    const sizeKeys: Array<keyof typeof sizes> = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

    for (const key of sizeKeys) {
      const size = sizes[key];
      if (size) {
        issues.push(...validateFontSize(size, `typography.fontSize.${key}`));
      }
    }
  }

  // Validate line heights
  if (config.typography.lineHeight) {
    const lineHeights = config.typography.lineHeight;

    if (lineHeights.tight) {
      issues.push(...validateLineHeight(lineHeights.tight, 'typography.lineHeight.tight'));
    }
    if (lineHeights.normal) {
      issues.push(...validateLineHeight(lineHeights.normal, 'typography.lineHeight.normal'));
    }
    if (lineHeights.relaxed) {
      issues.push(...validateLineHeight(lineHeights.relaxed, 'typography.lineHeight.relaxed'));
    }
  }

  return issues;
}

/**
 * Validate component variants
 */
function validateComponents(
  config: ThemeConfigSchema,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!config.components) return issues;

  // Validate button sizing
  if (config.components.button?.height) {
    issues.push(
      ...validateTouchTargetSize(
        config.components.button.height,
        'components.button.height',
        'button',
      ),
    );
  }

  // Validate input sizing
  if (config.components.input?.height) {
    issues.push(
      ...validateTouchTargetSize(
        config.components.input.height,
        'components.input.height',
        'input',
      ),
    );
  }

  return issues;
}

/**
 * Validate theme configuration for accessibility compliance
 *
 * Performs comprehensive accessibility checks including:
 * - Color contrast ratios (WCAG 2.1 Level AA/AAA)
 * - Typography sizing and spacing
 * - Touch target sizes
 * - Component accessibility
 *
 * @param config - Theme configuration to validate
 * @returns Validation result with errors, warnings, and info
 *
 * @example
 * ```typescript
 * const result = validateThemeAccessibility(themeConfig);
 *
 * if (!result.isValid) {
 *   console.error('Accessibility errors:', result.errors);
 *   console.warn('Warnings:', result.warnings);
 * }
 * ```
 */
export function validateThemeAccessibility(
  config: ThemeConfigSchema,
): AccessibilityValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const info: ValidationIssue[] = [];

  // Validate light mode colors
  if (config.colors?.light) {
    const lightColors: Record<string, string> = {};

    if (config.colors.light.accent) {
      lightColors.accentBase = config.colors.light.accent.base;
      lightColors.accentHover = config.colors.light.accent.hover;
      lightColors.accentContrast = config.colors.light.accent.contrast;
    }

    if (config.colors.light.neutral) {
      lightColors.neutralBackground = config.colors.light.neutral.background;
      lightColors.neutralSurface = config.colors.light.neutral.surface;
      lightColors.neutralText = config.colors.light.neutral.text;
      lightColors.neutralTextSubtle = config.colors.light.neutral.textSubtle;
      lightColors.neutralBorder = config.colors.light.neutral.border;
    }

    const lightIssues = validateColorContrast(lightColors, 'light', 'colors.light');
    errors.push(...lightIssues.filter((i) => i.severity === 'error'));
    warnings.push(...lightIssues.filter((i) => i.severity === 'warning'));
    info.push(...lightIssues.filter((i) => i.severity === 'info'));
  }

  // Validate dark mode colors
  if (config.colors?.dark) {
    const darkColors: Record<string, string> = {};

    if (config.colors.dark.accent) {
      darkColors.accentBase = config.colors.dark.accent.base;
      darkColors.accentHover = config.colors.dark.accent.hover;
      darkColors.accentContrast = config.colors.dark.accent.contrast;
    }

    if (config.colors.dark.neutral) {
      darkColors.neutralBackground = config.colors.dark.neutral.background;
      darkColors.neutralSurface = config.colors.dark.neutral.surface;
      darkColors.neutralText = config.colors.dark.neutral.text;
      darkColors.neutralTextSubtle = config.colors.dark.neutral.textSubtle;
      darkColors.neutralBorder = config.colors.dark.neutral.border;
    }

    const darkIssues = validateColorContrast(darkColors, 'dark', 'colors.dark');
    errors.push(...darkIssues.filter((i) => i.severity === 'error'));
    warnings.push(...darkIssues.filter((i) => i.severity === 'warning'));
    info.push(...darkIssues.filter((i) => i.severity === 'info'));
  }

  // Validate typography
  const typographyIssues = validateTypography(config);
  errors.push(...typographyIssues.filter((i) => i.severity === 'error'));
  warnings.push(...typographyIssues.filter((i) => i.severity === 'warning'));
  info.push(...typographyIssues.filter((i) => i.severity === 'info'));

  // Validate components
  const componentIssues = validateComponents(config);
  errors.push(...componentIssues.filter((i) => i.severity === 'error'));
  warnings.push(...componentIssues.filter((i) => i.severity === 'warning'));
  info.push(...componentIssues.filter((i) => i.severity === 'info'));

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    info,
  };
}

/**
 * Validate theme configuration with both schema and accessibility checks
 *
 * Combines Zod schema validation with accessibility validation for complete theme validation.
 *
 * @param config - Theme configuration to validate
 * @returns Combined validation result
 *
 * @example
 * ```typescript
 * import { validateTheme } from '@xala-technologies/platform-ui/themes';
 *
 * const result = validateTheme(themeConfig);
 *
 * if (!result.schemaValid) {
 *   console.error('Schema errors:', result.schemaErrors);
 * }
 *
 * if (!result.accessibilityValid) {
 *   console.error('Accessibility errors:', result.accessibility.errors);
 * }
 * ```
 */
export function validateTheme(config: unknown) {
  // First validate schema
  const schemaResult = validateThemeConfig(config);

  if (!schemaResult.success) {
    return {
      schemaValid: false,
      schemaErrors: schemaResult.error.issues,
      accessibilityValid: false,
      accessibility: {
        isValid: false,
        errors: [
          {
            severity: 'error' as const,
            message: 'Schema validation failed. Fix schema errors before accessibility validation.',
            path: 'root',
          },
        ],
        warnings: [],
        info: [],
      },
    };
  }

  // Then validate accessibility
  const accessibilityResult = validateThemeAccessibility(schemaResult.data);

  return {
    schemaValid: true,
    schemaErrors: [],
    accessibilityValid: accessibilityResult.isValid,
    accessibility: accessibilityResult,
  };
}
