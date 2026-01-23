/**
 * Extended Design Tokens
 *
 * Custom tokens that extend the Designsystemet base tokens.
 * All custom values must be defined here - no raw CSS values in components.
 *
 * @module @xala-technologies/platform/ui/tokens/extended
 */

// =============================================================================
// Avatar Color Palette
// =============================================================================

/**
 * Extended color palette for avatars when Digdir tokens are exhausted.
 * These complement the base accent/info/success/warning colors.
 */
export const avatarColors = {
  purple: 'var(--ds-extended-avatar-purple, #8B5CF6)',
  pink: 'var(--ds-extended-avatar-pink, #EC4899)',
  teal: 'var(--ds-extended-avatar-teal, #14B8A6)',
  orange: 'var(--ds-extended-avatar-orange, #F97316)',
  indigo: 'var(--ds-extended-avatar-indigo, #6366F1)',
  cyan: 'var(--ds-extended-avatar-cyan, #06B6D4)',
  rose: 'var(--ds-extended-avatar-rose, #F43F5E)',
  emerald: 'var(--ds-extended-avatar-emerald, #10B981)',
} as const;

/**
 * All avatar colors including Digdir base tokens
 */
export const AVATAR_COLOR_PALETTE = [
  'var(--ds-color-accent-base-default)',
  'var(--ds-color-info-base-default)',
  'var(--ds-color-success-base-default)',
  'var(--ds-color-warning-base-default)',
  avatarColors.purple,
  avatarColors.pink,
  avatarColors.teal,
  avatarColors.orange,
] as const;

// =============================================================================
// Size Tokens
// =============================================================================

/**
 * Standard component sizes using Digdir spacing tokens
 */
export const sizes = {
  avatar: {
    xs: 'var(--ds-sizing-6)', // 24px
    sm: 'var(--ds-sizing-8)', // 32px
    md: 'var(--ds-sizing-10)', // 40px
    lg: 'var(--ds-sizing-14)', // 56px
    xl: 'var(--ds-sizing-20)', // 80px
  },
  icon: {
    xs: 'var(--ds-sizing-3)', // 12px
    sm: 'var(--ds-sizing-4)', // 16px
    md: 'var(--ds-sizing-5)', // 20px
    lg: 'var(--ds-sizing-6)', // 24px
    xl: 'var(--ds-sizing-8)', // 32px
  },
  statusIndicator: {
    xs: 'var(--ds-sizing-2)', // 8px
    sm: 'var(--ds-sizing-2-5)', // 10px
    md: 'var(--ds-sizing-3)', // 12px
    lg: 'var(--ds-sizing-3-5)', // 14px
    xl: 'var(--ds-sizing-4)', // 16px
  },
  touchTarget: {
    minimum: 'var(--ds-sizing-11)', // 44px - WCAG minimum
  },
} as const;

// =============================================================================
// Animation Tokens
// =============================================================================

export const animation = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easing: {
    default: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// =============================================================================
// Z-Index Tokens
// =============================================================================

export const zIndex = {
  dropdown: 'var(--ds-z-index-dropdown, 1000)',
  sticky: 'var(--ds-z-index-sticky, 1020)',
  fixed: 'var(--ds-z-index-fixed, 1030)',
  modalBackdrop: 'var(--ds-z-index-modal-backdrop, 1040)',
  modal: 'var(--ds-z-index-modal, 1050)',
  popover: 'var(--ds-z-index-popover, 1060)',
  tooltip: 'var(--ds-z-index-tooltip, 1070)',
  toast: 'var(--ds-z-index-toast, 1080)',
  skipLink: 'var(--ds-z-index-skip-link, 9999)',
} as const;

// =============================================================================
// Shadow Tokens (extending Digdir)
// =============================================================================

export const shadows = {
  none: 'none',
  sm: 'var(--ds-shadow-sm)',
  md: 'var(--ds-shadow-md)',
  lg: 'var(--ds-shadow-lg)',
  xl: 'var(--ds-shadow-xl)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  focus: 'var(--ds-shadow-focus)',
  // Enhanced shadows for rich UI
  card: 'var(--ds-extended-shadow-card, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))',
  cardHover: 'var(--ds-extended-shadow-card-hover, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))',
  dropdown: 'var(--ds-extended-shadow-dropdown, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))',
  modal: 'var(--ds-extended-shadow-modal, 0 25px 50px -12px rgb(0 0 0 / 0.25))',
} as const;

// =============================================================================
// Typography Tokens (extending Digdir)
// =============================================================================

export const typography = {
  fontWeight: {
    regular: 'var(--ds-font-weight-regular, 400)',
    medium: 'var(--ds-font-weight-medium, 500)',
    semibold: 'var(--ds-font-weight-semibold, 600)',
    bold: 'var(--ds-font-weight-bold, 700)',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

// =============================================================================
// Extended Spacing Tokens
// =============================================================================

export const spacing = {
  // Named spacing for semantic use
  card: {
    padding: 'var(--ds-spacing-5)',
    gap: 'var(--ds-spacing-4)',
  },
  section: {
    padding: 'var(--ds-spacing-8)',
    gap: 'var(--ds-spacing-6)',
  },
  page: {
    padding: 'var(--ds-spacing-10)',
    maxWidth: '1440px',
  },
  inline: {
    xs: 'var(--ds-spacing-1)',
    sm: 'var(--ds-spacing-2)',
    md: 'var(--ds-spacing-3)',
    lg: 'var(--ds-spacing-4)',
  },
} as const;

// =============================================================================
// Border Tokens (extending Digdir)
// =============================================================================

export const borders = {
  radius: {
    none: '0',
    xs: 'var(--ds-border-radius-sm)',
    sm: 'var(--ds-border-radius-md)',
    md: 'var(--ds-border-radius-lg)',
    lg: 'var(--ds-border-radius-xl)',
    xl: 'var(--ds-border-radius-2xl)',
    full: 'var(--ds-border-radius-full)',
    // Enhanced radii for modern UI
    card: 'var(--ds-extended-radius-card, 12px)',
    button: 'var(--ds-extended-radius-button, 8px)',
    input: 'var(--ds-extended-radius-input, 6px)',
    badge: 'var(--ds-extended-radius-badge, 9999px)',
  },
  width: {
    none: '0',
    thin: 'var(--ds-border-width-default)',
    medium: 'var(--ds-border-width-medium)',
    thick: 'var(--ds-extended-border-thick, 3px)',
  },
} as const;

// =============================================================================
// Opacity Tokens
// =============================================================================

export const opacity = {
  transparent: '0',
  subtle: '0.1',
  light: '0.25',
  medium: '0.5',
  strong: '0.75',
  heavy: '0.9',
  opaque: '1',
  // Semantic opacity
  disabled: '0.5',
  hover: '0.8',
  overlay: '0.6',
  backdrop: '0.5',
} as const;

// =============================================================================
// Transition Tokens
// =============================================================================

export const transitions = {
  // Pre-built transitions for common use cases
  default: 'all 0.2s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.3s ease',
  colors: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
  opacity: 'opacity 0.2s ease',
  transform: 'transform 0.2s ease',
  shadow: 'box-shadow 0.2s ease',
  // Component-specific
  button: 'all 0.15s ease',
  card: 'transform 0.2s ease, box-shadow 0.2s ease',
  modal: 'opacity 0.2s ease, transform 0.2s ease',
} as const;

// =============================================================================
// Gradient Tokens
// =============================================================================

export const gradients = {
  // Subtle overlays for images
  imageOverlay: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)',
  imageOverlayLight: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%)',
  // Accent gradients
  accent: 'var(--ds-extended-gradient-accent, linear-gradient(135deg, var(--ds-color-accent-base-default), var(--ds-color-accent-base-hover)))',
  success: 'var(--ds-extended-gradient-success, linear-gradient(135deg, var(--ds-color-success-base-default), var(--ds-color-success-base-hover)))',
  // Background gradients
  subtle: 'linear-gradient(180deg, var(--ds-color-neutral-background-default) 0%, var(--ds-color-neutral-background-subtle) 100%)',
} as const;

// =============================================================================
// Component-Specific Tokens
// =============================================================================

export const components = {
  badge: {
    height: {
      sm: 'var(--ds-spacing-4)',
      md: 'var(--ds-spacing-5)',
      lg: 'var(--ds-spacing-6)',
    },
    padding: {
      sm: '0 var(--ds-spacing-1-5)',
      md: '0 var(--ds-spacing-2)',
      lg: '0 var(--ds-spacing-3)',
    },
  },
  button: {
    height: {
      sm: 'var(--ds-sizing-8)',
      md: 'var(--ds-sizing-10)',
      lg: 'var(--ds-sizing-12)',
    },
  },
  input: {
    height: {
      sm: 'var(--ds-sizing-8)',
      md: 'var(--ds-sizing-10)',
      lg: 'var(--ds-sizing-12)',
    },
  },
  card: {
    minHeight: {
      sm: '120px',
      md: '200px',
      lg: '300px',
    },
  },
  avatar: {
    sizes: sizes.avatar,
  },
  statusDot: {
    sizes: sizes.statusIndicator,
  },
} as const;

// =============================================================================
// WCAG / Accessibility Tokens (Universell Utforming)
// =============================================================================

/**
 * Accessibility tokens following WCAG 2.1 AAA and Norwegian
 * Universell Utforming requirements.
 */
export const accessibility = {
  // Minimum touch target sizes (WCAG 2.5.5 AAA = 44x44px)
  touchTarget: {
    minimum: 'var(--ds-sizing-11)', // 44px - WCAG AAA minimum
    recommended: 'var(--ds-sizing-12)', // 48px - Google Material recommendation
  },
  // Focus indicators (WCAG 2.4.7)
  focus: {
    outlineWidth: 'var(--ds-extended-focus-width, 2px)',
    outlineOffset: 'var(--ds-extended-focus-offset, 2px)',
    outlineColor: 'var(--ds-color-focus-outer)',
    outlineStyle: 'solid',
  },
  // Skip link for keyboard navigation
  skipLink: {
    zIndex: zIndex.skipLink,
  },
  // Reduced motion preferences
  motion: {
    // Use for users who prefer reduced motion
    reducedDuration: '0.01ms',
    reducedTransition: 'none',
  },
  // Color contrast helpers (WCAG 1.4.3 AA = 4.5:1, AAA = 7:1)
  contrast: {
    // These should meet at minimum AA (4.5:1)
    textOnLight: 'var(--ds-color-neutral-text-default)',
    textOnDark: 'var(--ds-color-neutral-contrast-default)',
    textOnAccent: 'var(--ds-color-accent-contrast-default)',
  },
  // Screen reader only styles
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
} as const;

// =============================================================================
// GDPR / Privacy Tokens
// =============================================================================

/**
 * Tokens for GDPR-compliant UI patterns.
 * Used for consent banners, privacy notices, data handling indicators.
 */
export const privacy = {
  // Consent banner styling
  banner: {
    backgroundColor: 'var(--ds-color-neutral-background-default)',
    borderColor: 'var(--ds-color-neutral-border-default)',
    padding: 'var(--ds-spacing-6)',
    zIndex: zIndex.modal,
  },
  // Data sensitivity indicators
  sensitivity: {
    public: 'var(--ds-color-success-surface-default)',
    internal: 'var(--ds-color-info-surface-default)',
    confidential: 'var(--ds-color-warning-surface-default)',
    restricted: 'var(--ds-color-danger-surface-default)',
  },
  // Action colors for data operations
  actions: {
    export: 'var(--ds-color-info-base-default)',
    delete: 'var(--ds-color-danger-base-default)',
    anonymize: 'var(--ds-color-warning-base-default)',
  },
} as const;

// =============================================================================
// Export all tokens
// =============================================================================

export const extendedTokens = {
  avatarColors,
  AVATAR_COLOR_PALETTE,
  sizes,
  animation,
  zIndex,
  shadows,
  typography,
  spacing,
  borders,
  opacity,
  transitions,
  gradients,
  components,
  accessibility,
  privacy,
} as const;

export default extendedTokens;
