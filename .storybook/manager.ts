import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

// Xala Design System theme using Designsystemet tokens
const xalaTheme = create({
  base: 'light',
  
  // Branding
  brandTitle: 'Xala Design System',
  brandUrl: 'https://xala.no',
  brandImage: undefined,
  brandTarget: '_self',
  
  // Typography - Inter font family
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "Courier New", monospace',
  
  // Colors from Xala theme tokens
  colorPrimary: '#0062BA', // --ds-color-accent-base-default
  colorSecondary: '#0062BA',
  
  // UI
  appBg: '#f6f8fa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#d0d7de',
  appBorderRadius: 4,
  
  // Text colors
  textColor: '#1e2b3c',
  textInverseColor: '#ffffff',
  textMutedColor: '#57606a',
  
  // Toolbar
  barTextColor: '#1e2b3c',
  barSelectedColor: '#0062BA',
  barHoverColor: '#0969da',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d0d7de',
  inputTextColor: '#1e2b3c',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: xalaTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});
