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
  cardHover:
    'var(--ds-extended-shadow-card-hover, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))',
  dropdown:
    'var(--ds-extended-shadow-dropdown, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))',
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
  accent:
    'var(--ds-extended-gradient-accent, linear-gradient(135deg, var(--ds-color-accent-base-default), var(--ds-color-accent-base-hover)))',
  success:
    'var(--ds-extended-gradient-success, linear-gradient(135deg, var(--ds-color-success-base-default), var(--ds-color-success-base-hover)))',
  // Background gradients
  subtle:
    'linear-gradient(180deg, var(--ds-color-neutral-background-default) 0%, var(--ds-color-neutral-background-subtle) 100%)',
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
    backdropFilter: 'blur(8px)',
  },
  // Data sensitivity indicators (color-coded for quick recognition)
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
    consent: 'var(--ds-color-success-base-default)',
  },
  // Consent states
  consent: {
    granted: 'var(--ds-color-success-surface-default)',
    denied: 'var(--ds-color-danger-surface-default)',
    pending: 'var(--ds-color-warning-surface-default)',
    expired: 'var(--ds-color-neutral-surface-default)',
  },
  // Data retention indicators
  retention: {
    active: 'var(--ds-color-success-base-default)',
    nearExpiry: 'var(--ds-color-warning-base-default)',
    expired: 'var(--ds-color-danger-base-default)',
  },
} as const;

// =============================================================================
// Professional UI Enhancement Tokens
// =============================================================================

/**
 * Tokens for creating polished, professional interfaces.
 * These add visual depth and refinement while maintaining accessibility.
 */
export const professional = {
  // Glass morphism effects (with fallbacks)
  glass: {
    background: 'var(--ds-extended-glass-bg, rgba(255, 255, 255, 0.7))',
    backgroundDark: 'var(--ds-extended-glass-bg-dark, rgba(0, 0, 0, 0.5))',
    blur: 'blur(12px)',
    border: '1px solid var(--ds-extended-glass-border, rgba(255, 255, 255, 0.2))',
  },
  // Subtle texture overlays
  texture: {
    noise:
      "var(--ds-extended-texture-noise, url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\"))",
    grid: 'var(--ds-extended-texture-grid, repeating-linear-gradient(0deg, transparent, transparent 49px, var(--ds-color-neutral-border-subtle) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, var(--ds-color-neutral-border-subtle) 50px))',
    dots: 'var(--ds-extended-texture-dots, radial-gradient(circle, var(--ds-color-neutral-border-subtle) 1px, transparent 1px))',
  },
  // Elevated surfaces (cards, modals, popovers)
  elevation: {
    flat: {
      shadow: 'none',
      border: '1px solid var(--ds-color-neutral-border-default)',
    },
    raised: {
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid var(--ds-color-neutral-border-subtle)',
    },
    floating: {
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      border: '1px solid var(--ds-color-neutral-border-subtle)',
    },
    overlay: {
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      border: 'none',
    },
    prominent: {
      shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      border: 'none',
    },
  },
  // Interactive states for rich feedback
  interactive: {
    hover: {
      scale: 'scale(1.02)',
      translateY: 'translateY(-2px)',
      brightness: 'brightness(1.05)',
    },
    active: {
      scale: 'scale(0.98)',
      translateY: 'translateY(0)',
      brightness: 'brightness(0.95)',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      filter: 'grayscale(0.3)',
    },
  },
  // Skeleton loading states
  skeleton: {
    background: 'var(--ds-color-neutral-surface-default)',
    shimmer:
      'linear-gradient(90deg, transparent 0%, var(--ds-color-neutral-surface-subtle) 50%, transparent 100%)',
    animationDuration: '1.5s',
  },
  // Dividers and separators
  divider: {
    color: 'var(--ds-color-neutral-border-default)',
    colorSubtle: 'var(--ds-color-neutral-border-subtle)',
    thickness: '1px',
    spacing: 'var(--ds-spacing-4)',
  },
} as const;

// =============================================================================
// Data Visualization Tokens
// =============================================================================

/**
 * Color palette for charts, graphs, and data visualization.
 * Designed for accessibility with sufficient contrast between adjacent colors.
 */
export const dataViz = {
  // Sequential color scale (single hue, varying intensity)
  sequential: {
    1: 'var(--ds-extended-dataviz-seq-1, #e0f2fe)',
    2: 'var(--ds-extended-dataviz-seq-2, #bae6fd)',
    3: 'var(--ds-extended-dataviz-seq-3, #7dd3fc)',
    4: 'var(--ds-extended-dataviz-seq-4, #38bdf8)',
    5: 'var(--ds-extended-dataviz-seq-5, #0ea5e9)',
    6: 'var(--ds-extended-dataviz-seq-6, #0284c7)',
    7: 'var(--ds-extended-dataviz-seq-7, #0369a1)',
  },
  // Categorical colors (distinct hues for categories)
  categorical: {
    1: 'var(--ds-extended-dataviz-cat-1, #3b82f6)', // Blue
    2: 'var(--ds-extended-dataviz-cat-2, #10b981)', // Emerald
    3: 'var(--ds-extended-dataviz-cat-3, #f59e0b)', // Amber
    4: 'var(--ds-extended-dataviz-cat-4, #ef4444)', // Red
    5: 'var(--ds-extended-dataviz-cat-5, #8b5cf6)', // Violet
    6: 'var(--ds-extended-dataviz-cat-6, #ec4899)', // Pink
    7: 'var(--ds-extended-dataviz-cat-7, #06b6d4)', // Cyan
    8: 'var(--ds-extended-dataviz-cat-8, #84cc16)', // Lime
  },
  // Diverging scale (for values above/below a midpoint)
  diverging: {
    negative3: 'var(--ds-extended-dataviz-div-n3, #dc2626)',
    negative2: 'var(--ds-extended-dataviz-div-n2, #f87171)',
    negative1: 'var(--ds-extended-dataviz-div-n1, #fca5a5)',
    neutral: 'var(--ds-extended-dataviz-div-0, #f5f5f5)',
    positive1: 'var(--ds-extended-dataviz-div-p1, #86efac)',
    positive2: 'var(--ds-extended-dataviz-div-p2, #22c55e)',
    positive3: 'var(--ds-extended-dataviz-div-p3, #16a34a)',
  },
  // Semantic colors for data states
  semantic: {
    positive: 'var(--ds-color-success-base-default)',
    negative: 'var(--ds-color-danger-base-default)',
    neutral: 'var(--ds-color-neutral-base-default)',
    highlight: 'var(--ds-color-accent-base-default)',
  },
} as const;

// =============================================================================
// Motion & Animation Tokens (WCAG compliant)
// =============================================================================

/**
 * Animation tokens with prefers-reduced-motion support.
 * All animations respect user accessibility preferences.
 */
export const motion = {
  // Entrance animations
  enter: {
    fadeIn: 'fadeIn 0.2s ease-out',
    slideUp: 'slideUp 0.25s ease-out',
    slideDown: 'slideDown 0.25s ease-out',
    slideLeft: 'slideLeft 0.25s ease-out',
    slideRight: 'slideRight 0.25s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    // Reduced motion alternatives
    reducedFadeIn: 'fadeIn 0.01ms ease-out',
  },
  // Exit animations
  exit: {
    fadeOut: 'fadeOut 0.15s ease-in',
    slideUp: 'slideUpOut 0.2s ease-in',
    slideDown: 'slideDownOut 0.2s ease-in',
    scaleOut: 'scaleOut 0.15s ease-in',
  },
  // Continuous animations
  continuous: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    spin: 'spin 1s linear infinite',
    bounce: 'bounce 1s ease-in-out infinite',
    shimmer: 'shimmer 1.5s ease-in-out infinite',
  },
  // Timing functions for natural feel
  easing: {
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snap: 'cubic-bezier(0, 0, 0.2, 1)',
    anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  // Duration scale
  duration: {
    instant: '0ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
} as const;

// =============================================================================
// Responsive Breakpoints
// =============================================================================

/**
 * Breakpoint tokens for responsive design.
 * Follow mobile-first approach.
 */
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  // Named breakpoints for common devices
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1536px',
} as const;

// =============================================================================
// Layout Tokens
// =============================================================================

/**
 * Layout tokens for consistent page structure.
 */
export const layout = {
  // Container max-widths
  container: {
    xs: '320px',
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
    full: '100%',
  },
  // Sidebar widths
  sidebar: {
    collapsed: '64px',
    compact: '200px',
    default: '256px',
    wide: '320px',
  },
  // Header heights
  header: {
    compact: '48px',
    default: '64px',
    tall: '80px',
  },
  // Content areas
  content: {
    maxWidth: '1200px',
    readableWidth: '65ch', // Optimal for reading (WCAG)
    narrowWidth: '45ch',
  },
  // Grid gutters
  gutter: {
    xs: 'var(--ds-spacing-2)',
    sm: 'var(--ds-spacing-4)',
    md: 'var(--ds-spacing-6)',
    lg: 'var(--ds-spacing-8)',
  },
} as const;

// =============================================================================
// Export all tokens
// =============================================================================

export const extendedTokens = {
  // Core tokens
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
  // Compliance tokens (WCAG / Universell Utforming)
  accessibility,
  // Compliance tokens (GDPR / Personvern)
  privacy,
  // Professional UI enrichment
  professional,
  dataViz,
  motion,
  breakpoints,
  layout,
} as const;

export default extendedTokens;
