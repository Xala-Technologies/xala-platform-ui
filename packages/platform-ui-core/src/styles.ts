/**
 * Platform UI Styles Entry Point
 *
 * This bundles ALL required CSS so apps only need:
 * import '@xala-technologies/platform-ui/styles';
 *
 * Apps should NOT need to install:
 * - @digdir/designsystemet-css
 * - @fontsource/inter
 *
 * Fonts are loaded from Google Fonts CDN for reliable cross-origin loading.
 * Design system CSS is bundled inline.
 */

// =============================================================================
// Import designsystemet CSS via virtual modules (bundled by tsup)
// =============================================================================
import designsystemetCSS from 'virtual:designsystemet-css';
import designsystemetTheme from 'virtual:designsystemet-theme';

const STYLE_ID = 'xala-platform-base-styles';
const FONT_LINK_ID = 'xala-platform-fonts';

/**
 * Injects Inter font via Google Fonts CDN.
 * This is more reliable than bundling @fontsource CSS which references
 * local font files that won't resolve when CSS is injected inline.
 */
function injectFonts(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(FONT_LINK_ID)) return; // Already injected

  // Preconnect for faster font loading
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnect);

  const preconnectGstatic = document.createElement('link');
  preconnectGstatic.rel = 'preconnect';
  preconnectGstatic.href = 'https://fonts.gstatic.com';
  preconnectGstatic.crossOrigin = 'anonymous';
  document.head.appendChild(preconnectGstatic);

  // Load Inter font from Google Fonts
  const fontLink = document.createElement('link');
  fontLink.id = FONT_LINK_ID;
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(fontLink);
}

/**
 * Injects all base styles (designsystemet CSS, global resets) into the document head.
 * This is called automatically when importing this module, but can also be called manually
 * for SSR scenarios or deferred loading.
 */
function injectBaseStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return; // Already injected

  const css = [
    // Designsystemet base styles
    designsystemetCSS,
    // Designsystemet theme (CSS variables)
    designsystemetTheme,
    // Global resets and defaults
    `
/* Platform UI Global Resets */
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
`,
  ].join('\n');

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

// Auto-inject fonts and styles on import
injectFonts();
injectBaseStyles();

export { injectBaseStyles, injectFonts };
