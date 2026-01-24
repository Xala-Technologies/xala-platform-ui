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
 * These are bundled into platform-ui and injected at runtime.
 *
 * The CSS is loaded via virtual modules that are resolved at build time
 * by the bundleCssPlugin in tsup.config.ts.
 */

// =============================================================================
// Import CSS as strings via virtual modules (bundled by tsup)
// =============================================================================
import inter400 from 'virtual:inter-400';
import inter500 from 'virtual:inter-500';
import inter600 from 'virtual:inter-600';
import inter700 from 'virtual:inter-700';
import designsystemetCSS from 'virtual:designsystemet-css';
import designsystemetTheme from 'virtual:designsystemet-theme';

const STYLE_ID = 'xala-platform-base-styles';

/**
 * Injects all base styles (fonts, designsystemet CSS, global resets) into the document head.
 * This is called automatically when importing this module, but can also be called manually
 * for SSR scenarios or deferred loading.
 */
function injectBaseStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return; // Already injected

  const css = [
    // Fonts first
    inter400,
    inter500,
    inter600,
    inter700,
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

// Auto-inject on import
injectBaseStyles();

export { injectBaseStyles };
