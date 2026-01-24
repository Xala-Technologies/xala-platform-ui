/**
 * Theme registry for runtime tenant branding switching.
 *
 * This module provides theme CSS that can be injected inline by the provider.
 * Themes are bundled into the package - no external files needed.
 *
 * @example
 * ```typescript
 * import { THEME_CSS, DEFAULT_THEME, type ThemeId } from '@xala-technologies/platform-ui/themes';
 *
 * // Get theme CSS for inline injection
 * const css = THEME_CSS[DEFAULT_THEME];
 * ```
 */

// Import theme CSS as raw strings
// Note: ?raw suffix is needed for Vite (Storybook) compatibility
// tsup handles this via esbuild plugin that strips ?raw and loads as text
import xalaTheme from './xala.css?raw';
import xalaExtensions from './xala-extensions.css?raw';

export type ThemeId = 'digdir' | 'altinn' | 'brreg' | 'custom';

/**
 * Bundled theme CSS content for inline injection.
 * Each theme is an array of CSS strings that get concatenated.
 * Empty array means use designsystemet defaults (no override).
 */
export const THEME_CSS: Record<ThemeId, string[]> = {
  // Official themes - use designsystemet defaults
  digdir: [],
  altinn: [],
  brreg: [],
  // Custom Xala theme - bundled CSS
  custom: [xalaTheme, xalaExtensions],
};

/**
 * Get theme CSS as concatenated string.
 */
export function getThemeCSS(themeId: ThemeId): string {
  const css = THEME_CSS[themeId] || [];
  return css.join('\n');
}

/**
 * Check if theme has custom CSS (vs using defaults).
 */
export function hasCustomCSS(themeId: ThemeId): boolean {
  const css = THEME_CSS[themeId];
  return Array.isArray(css) && css.length > 0;
}

// Custom is the default theme for tenant applications
export const DEFAULT_THEME: ThemeId = 'custom';

// Legacy exports for backwards compatibility (deprecated)
/** @deprecated Use THEME_CSS instead */
export const THEMES = THEME_CSS;
/** @deprecated Use getThemeCSS instead */
export function getThemeUrls(themeId: ThemeId): string[] {
  // Return empty array - URLs are no longer used
  return [];
}
