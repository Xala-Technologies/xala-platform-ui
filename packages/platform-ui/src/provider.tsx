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
 *
 * @example RTL Support
 * ```tsx
 * import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
 *
 * function App() {
 *   return (
 *     <DesignsystemetProvider locale="ar" direction="auto">
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
 * Text direction options.
 * - 'ltr': Left-to-right (default for most languages)
 * - 'rtl': Right-to-left (for Arabic, Hebrew, etc.)
 * - 'auto': Automatically detect based on locale
 */
export type Direction = 'ltr' | 'rtl' | 'auto';

/**
 * RTL locales that should automatically use right-to-left direction.
 */
const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'] as const;

/**
 * Determines the text direction based on locale.
 *
 * @param locale - BCP 47 language tag (e.g., 'ar', 'he', 'en-US')
 * @returns 'rtl' for RTL languages, 'ltr' otherwise
 */
export function getAutoDirection(locale: string): 'ltr' | 'rtl' {
  // Extract the language code from locale (handles 'ar-SA', 'he-IL', etc.)
  const languageCode = locale.split('-')[0].toLowerCase();
  return RTL_LOCALES.includes(languageCode as (typeof RTL_LOCALES)[number]) ? 'rtl' : 'ltr';
}

/**
 * Direction context value type.
 */
export type DirectionContextValue = 'ltr' | 'rtl';

/**
 * React context for text direction.
 * Provides the resolved direction ('ltr' or 'rtl') to child components.
 */
export const DirectionContext = React.createContext<DirectionContextValue>('ltr');

/**
 * Hook to access the current text direction.
 *
 * @returns The current direction ('ltr' or 'rtl')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const direction = useDirection();
 *   return <div style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>Content</div>;
 * }
 * ```
 */
export function useDirection(): DirectionContextValue {
  return React.useContext(DirectionContext);
}

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
   * Text direction for the application.
   * - 'ltr': Left-to-right (default)
   * - 'rtl': Right-to-left
   * - 'auto': Automatically detect based on locale
   */
  direction?: Direction;
  /**
   * BCP 47 locale tag (e.g., 'nb', 'en-US', 'ar').
   * Used for setting the document language and auto-detecting direction.
   * @default 'nb'
   */
  locale?: string;
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
 * Also manages text direction (LTR/RTL) and locale settings for
 * internationalization support.
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
  direction = 'ltr',
  locale = 'nb',
  rootAs: Root = 'div',
}: DesignsystemetProviderProps) {
  // Resolve the actual direction (handle 'auto' mode)
  const resolvedDirection: DirectionContextValue =
    direction === 'auto' ? getAutoDirection(locale) : direction;

  React.useEffect(() => {
    // Inject theme CSS inline
    injectThemeCSS(theme);

    // Set attributes on html element for CSS targeting
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    document.documentElement.setAttribute('data-size', size);
    document.documentElement.setAttribute('data-typography', typography);

    // Set direction and language attributes on document element
    document.documentElement.dir = resolvedDirection;
    document.documentElement.lang = locale;
  }, [theme, colorScheme, size, typography, resolvedDirection, locale]);

  return (
    <DirectionContext.Provider value={resolvedDirection}>
      <Root
        data-color-scheme={colorScheme}
        data-size={size}
        data-typography={typography}
        dir={resolvedDirection}
      >
        {children}
      </Root>
    </DirectionContext.Provider>
  );
}
