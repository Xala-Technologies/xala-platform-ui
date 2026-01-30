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
 *     <DesignsystemetProvider theme="digilist" colorScheme="auto" size="md">
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
 *
 * @example Multi-Tenant Theming
 * ```tsx
 * import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
 *
 * const tenantTheme = {
 *   tenantId: 'acme-corp',
 *   name: 'Acme Corporation',
 *   baseTheme: 'platform',
 *   colors: {
 *     light: {
 *       accent: { base: '#FF6B35', hover: '#E55A2B', contrast: '#FFFFFF' },
 *     },
 *   },
 *   typography: {
 *     fontFamily: { base: 'Inter, system-ui, sans-serif' },
 *   },
 * };
 *
 * function App() {
 *   return (
 *     <DesignsystemetProvider tenantTheme={tenantTheme}>
 *       <YourApp />
 *     </DesignsystemetProvider>
 *   );
 * }
 * ```
 */
import React from 'react';
import {
  DEFAULT_THEME,
  getThemeCSS,
  getCustomThemeCSS,
  hasCustomCSS,
  registerCustomTheme,
  type ThemeId,
} from './themes';
import type { TenantThemeConfig } from './types/theme-config';
import { validateTheme } from './themes/validator';

/**
 * Available color scheme options for the design system.
 */
export type ColorScheme = 'light' | 'dark' | 'auto';

/**
 * Available size modes for component scaling.
 * Designsystemet v1 only supports sm, md, lg.
 */
export type DsSize = 'sm' | 'md' | 'lg';

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
  /**
   * Custom tenant theme configuration.
   * When provided, overrides the base theme with custom brand colors, typography, and component variants.
   * The theme is validated for accessibility compliance before being applied.
   *
   * @example
   * ```tsx
   * const tenantTheme = {
   *   tenantId: 'acme-corp',
   *   name: 'Acme Corporation',
   *   baseTheme: 'platform',
   *   colors: {
   *     light: {
   *       accent: { base: '#FF6B35', hover: '#E55A2B', contrast: '#FFFFFF' },
   *     },
   *   },
   * };
   * <DesignsystemetProvider tenantTheme={tenantTheme}>...</DesignsystemetProvider>
   * ```
   */
  tenantTheme?: TenantThemeConfig;
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
 * @param tenantTheme - Optional custom tenant theme configuration
 */
function injectThemeCSS(themeId: ThemeId, tenantTheme?: TenantThemeConfig): void {
  if (typeof document === 'undefined') return;

  // Remove existing theme style
  const existingStyle = document.getElementById(THEME_STYLE_ID);
  if (existingStyle) {
    existingStyle.remove();
  }

  let css: string | undefined;

  // If tenantTheme is provided, use custom theme CSS
  if (tenantTheme) {
    css = getCustomThemeCSS(tenantTheme.tenantId);
  } else {
    // Use standard theme CSS
    if (hasCustomCSS(themeId)) {
      css = getThemeCSS(themeId);
    }
  }

  // Create and inject theme style
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
 * Supports multi-tenant theming through the `tenantTheme` prop,
 * which allows runtime customization of brand colors, typography,
 * and component variants with automatic accessibility validation.
 *
 * @param props - Provider configuration props
 * @returns JSX element with theme context
 */
export function DesignsystemetProvider({
  children,
  theme = DEFAULT_THEME,
  tenantTheme,
  colorScheme = 'auto',
  size = 'md',
  typography = 'primary',
  direction = 'ltr',
  locale = 'nb',
  rootAs: Root = 'div',
}: DesignsystemetProviderProps) {
  // Track the previous tenant theme ID for cleanup during theme switching
  const previousTenantIdRef = React.useRef<string | undefined>(undefined);

  // Resolve the actual direction (handle 'auto' mode)
  const resolvedDirection: DirectionContextValue =
    direction === 'auto' ? getAutoDirection(locale) : direction;

  React.useEffect(() => {
    const currentTenantId = tenantTheme?.tenantId;
    const previousTenantId = previousTenantIdRef.current;

    // Log runtime theme switching events
    if (previousTenantId !== currentTenantId) {
      if (previousTenantId && currentTenantId) {
        // Switching from one tenant theme to another
        // eslint-disable-next-line no-console
        console.info(`[Theme] Switching from tenant "${previousTenantId}" to tenant "${currentTenantId}"`);
      } else if (previousTenantId && !currentTenantId) {
        // Switching from tenant theme to standard theme
        // eslint-disable-next-line no-console
        console.info(`[Theme] Switching from tenant theme "${previousTenantId}" to standard theme "${theme}"`);
      } else if (!previousTenantId && currentTenantId) {
        // Switching from standard theme to tenant theme (initial load with tenant theme)
        // eslint-disable-next-line no-console
        console.info(`[Theme] Applying tenant theme "${currentTenantId}" (base: ${tenantTheme?.baseTheme ?? theme})`);
      }
    }

    // Validate and register tenant theme if provided
    if (tenantTheme) {
      try {
        // Validate schema and accessibility compliance
        const validationResult = validateTheme(tenantTheme);

        // Log schema validation errors
        if (!validationResult.schemaValid && validationResult.schemaErrors.length > 0) {
          validationResult.schemaErrors.forEach((error) => {
            // eslint-disable-next-line no-console
            console.warn(
              `[Theme Schema Error] ${error.path.join('.')}: ${error.message}`,
            );
          });
        }

        // Log accessibility validation errors (non-blocking warnings)
        if (!validationResult.accessibilityValid && validationResult.accessibility.errors.length > 0) {
          validationResult.accessibility.errors.forEach((error) => {
            const suggestion = 'suggestion' in error && error.suggestion ? ` - ${error.suggestion}` : '';
            // eslint-disable-next-line no-console
            console.warn(
              `[Theme Accessibility] ${error.path}: ${error.message}${suggestion}`,
            );
          });
        }

        // Log validation warnings
        if (validationResult.accessibility.warnings.length > 0) {
          validationResult.accessibility.warnings.forEach((warning) => {
            // eslint-disable-next-line no-console
            console.warn(`[Theme Warning] ${warning.path}: ${warning.message}`);
          });
        }

        // Register the custom theme (will merge with base theme)
        // Use override: true to allow re-registration when theme config changes
        registerCustomTheme(tenantTheme, {
          validate: true,
          skipAccessibilityChecks: false,
          override: true,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[Theme Registration Error]', error);
      }
    }

    // Update the ref to track current tenant ID for next render
    previousTenantIdRef.current = currentTenantId;

    // Inject theme CSS inline (custom tenant theme or standard theme)
    injectThemeCSS(theme, tenantTheme);

    // Set attributes on html element for CSS targeting
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    document.documentElement.setAttribute('data-size', size);
    document.documentElement.setAttribute('data-typography', typography);

    // Set direction and language attributes on document element
    document.documentElement.dir = resolvedDirection;
    document.documentElement.lang = locale;
  }, [theme, tenantTheme, colorScheme, size, typography, resolvedDirection, locale]);

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
