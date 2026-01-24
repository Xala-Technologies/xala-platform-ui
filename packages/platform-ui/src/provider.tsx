/**
 * React provider for managing Designsystemet theme and styling.
 *
 * This provider handles runtime theme switching by injecting theme CSS
 * inline via <style> elements. Themes are bundled into the package,
 * so no external CSS files are needed in the app's public folder.
 *
 * @example
 * ```tsx
 * import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
 *
 * function App() {
 *   return (
 *     <DesignsystemetProvider theme="custom" colorScheme="auto" size="auto">
 *       <YourApp />
 *     </DesignsystemetProvider>
 *   );
 * }
 * ```
 */
import React from 'react';
import { DEFAULT_THEME, getThemeCSS, hasCustomCSS, type ThemeId } from './themes';

/**
 * Available color scheme options for the design system.
 */
export type ColorScheme = 'light' | 'dark' | 'auto';

/**
 * Available size modes for component scaling.
 * 'auto' enables viewport-based responsive switching.
 */
export type DsSize = 'sm' | 'md' | 'lg' | 'auto';

/**
 * Available typography presets.
 */
export type Typography = 'primary' | 'secondary';

/**
 * Props for the DesignsystemetProvider component.
 */
export type DesignsystemetProviderProps = {
  /** Child components to be wrapped */
  children: React.ReactNode;
  /** Theme identifier for tenant branding */
  theme?: ThemeId;
  /** Color scheme preference */
  colorScheme?: ColorScheme;
  /** Component size mode */
  size?: DsSize;
  /** Typography preset */
  typography?: Typography;
  /**
   * Element type to render as the wrapper. Defaults to 'div'.
   * Use 'html' or 'body' to set attributes directly on document elements.
   */
  rootAs?: keyof JSX.IntrinsicElements;
};

const THEME_STYLE_ID = 'xala-platform-theme';

/**
 * Injects theme CSS inline via a <style> element.
 *
 * This approach bundles theme CSS into the package, eliminating
 * the need for external CSS files in the app's public folder.
 * Theme changes are applied instantly without network requests.
 *
 * @param themeId - Theme identifier to inject
 */
function injectThemeCSS(themeId: ThemeId): void {
  if (typeof document === 'undefined') return;

  // Remove existing theme style
  const existingStyle = document.getElementById(THEME_STYLE_ID);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Only inject if theme has custom CSS
  if (!hasCustomCSS(themeId)) {
    return;
  }

  // Create and inject new theme style
  const css = getThemeCSS(themeId);
  if (css) {
    const style = document.createElement('style');
    style.id = THEME_STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }
}

/**
 * React provider component for Designsystemet theming.
 *
 * Manages theme loading through inline <style> injection and applies
 * data attributes for styling variations. Theme changes are applied
 * instantly without page reload or network requests.
 *
 * @param props - Provider configuration props
 * @returns JSX element with theme context
 */
export function DesignsystemetProvider({
  children,
  theme = DEFAULT_THEME,
  colorScheme = 'auto',
  size = 'auto',
  typography = 'primary',
  rootAs: Root = 'div',
}: DesignsystemetProviderProps) {
  React.useEffect(() => {
    // Inject theme CSS inline
    injectThemeCSS(theme);

    // Set attributes on html element for CSS targeting
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    document.documentElement.setAttribute('data-size', size);
    document.documentElement.setAttribute('data-typography', typography);
  }, [theme, colorScheme, size, typography]);

  return (
    <Root data-color-scheme={colorScheme} data-size={size} data-typography={typography}>
      {children}
    </Root>
  );
}
