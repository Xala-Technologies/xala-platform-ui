/**
 * Platform UI Styles Entry Point
 *
 * This is the ONLY place where design system styles should be imported.
 * Applications should import this module once at their entry point:
 *
 * @example
 * ```typescript
 * import '@xala-technologies/platform-ui/styles';
 * ```
 *
 * This includes:
 * - Inter font (all weights used by Designsystemet)
 * - Designsystemet base CSS
 * - Designsystemet theme CSS
 * - Global style reset and typography
 */

// =============================================================================
// Fonts - Inter font family used by Designsystemet
// =============================================================================
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// =============================================================================
// Designsystemet CSS - Base component styles
// =============================================================================
import '@digdir/designsystemet-css';

// =============================================================================
// Designsystemet Theme - Token definitions (neutral, danger, info, etc.)
// This provides all the CSS variables that components need
// =============================================================================
import '@digdir/designsystemet-css/theme';

/**
 * Theme Loading Strategy:
 *
 * Theme CSS is loaded dynamically by DesignsystemetProvider to allow runtime switching.
 * Theme URLs are configured in @xala-technologies/platform-ui/themes.
 * Applications should wrap their root with DesignsystemetProvider:
 *
 * @example
 * ```tsx
 * import '@xala-technologies/platform-ui/styles';
 * import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
 *
 * <DesignsystemetProvider theme="custom" colorScheme="light" size="md">
 *   <App />
 * </DesignsystemetProvider>
 * ```
 */

// =============================================================================
// Global Styles - Applied to document root
// =============================================================================
if (typeof document !== 'undefined') {
  // Apply font family to html and body
  const style = document.createElement('style');
  style.textContent = `
    html, body {
      font-family: var(--ds-font-family, 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 0;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(style);
}

export {}; // keep this as a module
