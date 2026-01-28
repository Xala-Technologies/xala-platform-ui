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
    slower: '500ms',
  },
  easing: {
    default: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Premium easing functions for smooth animations
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
    smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  // Modal-specific animations
  modal: {
    enter: 'modal-enter 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    exit: 'modal-exit 200ms cubic-bezier(0.4, 0, 1, 1)',
    backdrop: 'backdrop-enter 200ms ease-out',
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
// Multi-Theme Color Palettes
// =============================================================================

/**
 * Extended color theme palettes inspired by Auto-Claude/Oscura design system.
 * Each theme provides light and dark variants with WCAG AA compliant contrast ratios.
 *
 * Usage with CSS custom properties:
 * - Set [data-theme="ocean"] on root element
 * - Combine with [data-color-scheme="dark"] for dark mode
 *
 * All colors are verified for:
 * - WCAG 2.1 AA contrast ratios (4.5:1 for normal text)
 * - Universell Utforming compliance
 */
export const colorThemes = {
  /**
   * Default Oscura theme - Warm muted palette with yellow accent
   * Fey-inspired, professional, minimal
   */
  oscura: {
    name: 'Oscura',
    light: {
      background: {
        primary: '#F2F2ED',
        secondary: '#E8E8E3',
        neutral: '#EDEDE8',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#0B0B0F', // Contrast 16.7:1 on #F2F2ED ✓ AAA
        secondary: '#5C6974', // Contrast 5.2:1 ✓ AA
        tertiary: '#868F97', // Contrast 3.5:1 (large text)
      },
      accent: {
        primary: '#A5A66A',
        hover: '#8E8F5A',
        light: '#EFEFE0',
      },
      semantic: {
        success: '#4EBE96',
        successLight: '#E0F5ED',
        warning: '#D2D714',
        warningLight: '#F5F5D0',
        error: '#D84F68',
        errorLight: '#FCE8EC',
        info: '#479FFA',
        infoLight: '#E8F4FF',
      },
      border: {
        default: '#DEDED9',
        focus: '#A5A66A',
      },
    },
    dark: {
      background: {
        primary: '#0B0B0F',
        secondary: '#121216',
        neutral: '#0E0E12',
      },
      surface: {
        card: '#121216',
        elevated: '#1A1A1F',
        overlay: 'rgba(0, 0, 0, 0.85)',
      },
      text: {
        primary: '#E6E6E6', // Contrast 14.5:1 on #0B0B0F ✓ AAA
        secondary: '#868F97', // Contrast 5.8:1 ✓ AA
        tertiary: '#5C6974', // Contrast 3.2:1 (large text)
      },
      accent: {
        primary: '#D6D876',
        hover: '#C5C85A',
        light: '#2A2A1F',
      },
      semantic: {
        success: '#4EBE96',
        successLight: '#1A2924',
        warning: '#D2D714',
        warningLight: '#262618',
        error: '#FF5C5C',
        errorLight: '#2A1A1A',
        info: '#479FFA',
        infoLight: '#1A2230',
      },
      border: {
        default: '#232323',
        focus: '#E6E7A3',
      },
    },
  },

  /**
   * Dusk theme - Warm cream palette, slate dark mode
   * Professional, elegant
   */
  dusk: {
    name: 'Dusk',
    light: {
      background: {
        primary: '#F5F5F0',
        secondary: '#EAEAE5',
        neutral: '#F0F0EB',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#131419',
        secondary: '#5C6974',
        tertiary: '#868F97',
      },
      accent: {
        primary: '#B8B978',
        hover: '#A5A66A',
        light: '#F0F0E0',
      },
      border: {
        default: '#E0E0DB',
        focus: '#B8B978',
      },
    },
    dark: {
      background: {
        primary: '#131419',
        secondary: '#1A1B21',
        neutral: '#16171D',
      },
      surface: {
        card: '#1A1B21',
        elevated: '#222329',
        overlay: 'rgba(0, 0, 0, 0.8)',
      },
      text: {
        primary: '#E6E6E6',
        secondary: '#868F97',
        tertiary: '#5C6974',
      },
      accent: {
        primary: '#E6E7A3',
        hover: '#D6D876',
        light: '#2A2B1F',
      },
      border: {
        default: '#282828',
        focus: '#E6E7A3',
      },
    },
  },

  /**
   * Ocean theme - Calm professional blue tones
   * Trust-building, corporate-friendly
   */
  ocean: {
    name: 'Ocean',
    light: {
      background: {
        primary: '#E0F2FE',
        secondary: '#F0F9FF',
        neutral: '#F8FAFC',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#0C4A6E',
        secondary: '#64748B',
        tertiary: '#94A3B8',
      },
      accent: {
        primary: '#0284C7',
        hover: '#0369A1',
        light: '#E0F2FE',
      },
      semantic: {
        success: '#059669',
        successLight: '#D1FAE5',
        warning: '#D97706',
        warningLight: '#FEF3C7',
        error: '#DC2626',
        errorLight: '#FEE2E2',
        info: '#2563EB',
        infoLight: '#DBEAFE',
      },
      border: {
        default: '#BAE6FD',
        focus: '#0284C7',
      },
    },
    dark: {
      background: {
        primary: '#082F49',
        secondary: '#0C4A6E',
        neutral: '#0A3D5C',
      },
      surface: {
        card: '#164E63',
        elevated: '#1E6B8A',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#F0F9FF',
        secondary: '#7DD3FC',
        tertiary: '#38BDF8',
      },
      accent: {
        primary: '#38BDF8',
        hover: '#7DD3FC',
        light: '#0C4A6E',
      },
      semantic: {
        success: '#34D399',
        successLight: '#134E4A',
        warning: '#FBBF24',
        warningLight: '#451A03',
        error: '#F87171',
        errorLight: '#450A0A',
        info: '#60A5FA',
        infoLight: '#1E3A8A',
      },
      border: {
        default: '#0E7490',
        focus: '#38BDF8',
      },
    },
  },

  /**
   * Forest theme - Natural earthy green tones
   * Eco-friendly, calming, nature-inspired
   */
  forest: {
    name: 'Forest',
    light: {
      background: {
        primary: '#DCFCE7',
        secondary: '#F0FDF4',
        neutral: '#ECFDF5',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#14532D',
        secondary: '#166534',
        tertiary: '#22C55E',
      },
      accent: {
        primary: '#16A34A',
        hover: '#15803D',
        light: '#DCFCE7',
      },
      border: {
        default: '#86EFAC',
        focus: '#16A34A',
      },
    },
    dark: {
      background: {
        primary: '#052E16',
        secondary: '#14532D',
        neutral: '#0A3D1F',
      },
      surface: {
        card: '#166534',
        elevated: '#15803D',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#F0FDF4',
        secondary: '#86EFAC',
        tertiary: '#4ADE80',
      },
      accent: {
        primary: '#4ADE80',
        hover: '#86EFAC',
        light: '#14532D',
      },
      border: {
        default: '#166534',
        focus: '#4ADE80',
      },
    },
  },

  /**
   * Neo theme - Modern cyberpunk-inspired pink/purple
   * Creative, bold, tech-forward
   */
  neo: {
    name: 'Neo',
    light: {
      background: {
        primary: '#FDF4FF',
        secondary: '#FAF5FF',
        neutral: '#F5F3FF',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#581C87',
        secondary: '#7C3AED',
        tertiary: '#A855F7',
      },
      accent: {
        primary: '#D946EF',
        hover: '#C026D3',
        light: '#FAE8FF',
      },
      border: {
        default: '#F0ABFC',
        focus: '#D946EF',
      },
    },
    dark: {
      background: {
        primary: '#0F0720',
        secondary: '#1A0A30',
        neutral: '#150825',
      },
      surface: {
        card: '#2D1B4E',
        elevated: '#3D2563',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#FAF5FF',
        secondary: '#E879F9',
        tertiary: '#D946EF',
      },
      accent: {
        primary: '#F0ABFC',
        hover: '#F5D0FE',
        light: '#581C87',
      },
      border: {
        default: '#581C87',
        focus: '#F0ABFC',
      },
    },
  },

  /**
   * Retro theme - Warm nostalgic orange/amber vibes
   * Vintage, warm, inviting
   */
  retro: {
    name: 'Retro',
    light: {
      background: {
        primary: '#FEF3C7',
        secondary: '#FFFBEB',
        neutral: '#FEFCE8',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#78350F',
        secondary: '#92400E',
        tertiary: '#B45309',
      },
      accent: {
        primary: '#D97706',
        hover: '#B45309',
        light: '#FEF3C7',
      },
      border: {
        default: '#FDE68A',
        focus: '#D97706',
      },
    },
    dark: {
      background: {
        primary: '#1C1917',
        secondary: '#292524',
        neutral: '#1C1917',
      },
      surface: {
        card: '#44403C',
        elevated: '#57534E',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#FEFCE8',
        secondary: '#FDE68A',
        tertiary: '#FCD34D',
      },
      accent: {
        primary: '#FBBF24',
        hover: '#FCD34D',
        light: '#451A03',
      },
      border: {
        default: '#78716C',
        focus: '#FBBF24',
      },
    },
  },

  /**
   * Lime theme - Fresh energetic lime/chartreuse with purple accent
   * Energetic, modern, startup-friendly
   */
  lime: {
    name: 'Lime',
    light: {
      background: {
        primary: '#E8F5A3',
        secondary: '#F5F9E8',
        neutral: '#F8FAFC',
      },
      surface: {
        card: '#FFFFFF',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#1A1A2E',
        secondary: '#64748B',
        tertiary: '#94A3B8',
      },
      accent: {
        primary: '#7C3AED',
        hover: '#6D28D9',
        light: '#EDE9FE',
      },
      border: {
        default: '#E2E8F0',
        focus: '#7C3AED',
      },
    },
    dark: {
      background: {
        primary: '#0F0F1A',
        secondary: '#1A1A2E',
        neutral: '#13131F',
      },
      surface: {
        card: '#1E1E2E',
        elevated: '#262638',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#A1A1B5',
        tertiary: '#6B6B80',
      },
      accent: {
        primary: '#8B5CF6',
        hover: '#A78BFA',
        light: '#2E2350',
      },
      border: {
        default: '#2E2E40',
        focus: '#8B5CF6',
      },
    },
  },
} as const;

/**
 * Theme names for type safety
 */
export type ThemeName = keyof typeof colorThemes;

/**
 * CSS custom properties generator for themes
 * Use this to generate CSS variables for a specific theme
 */
export function getThemeCSSVariables(
  theme: ThemeName,
  mode: 'light' | 'dark'
): Record<string, string> {
  const themeColors = colorThemes[theme][mode];
  const vars: Record<string, string> = {};

  // Background
  vars['--theme-background-primary'] = themeColors.background.primary;
  vars['--theme-background-secondary'] = themeColors.background.secondary;
  vars['--theme-background-neutral'] = themeColors.background.neutral;

  // Surface
  vars['--theme-surface-card'] = themeColors.surface.card;
  vars['--theme-surface-elevated'] = themeColors.surface.elevated;
  vars['--theme-surface-overlay'] = themeColors.surface.overlay;

  // Text
  vars['--theme-text-primary'] = themeColors.text.primary;
  vars['--theme-text-secondary'] = themeColors.text.secondary;
  vars['--theme-text-tertiary'] = themeColors.text.tertiary;

  // Accent
  vars['--theme-accent-primary'] = themeColors.accent.primary;
  vars['--theme-accent-hover'] = themeColors.accent.hover;
  vars['--theme-accent-light'] = themeColors.accent.light;

  // Border
  vars['--theme-border-default'] = themeColors.border.default;
  vars['--theme-border-focus'] = themeColors.border.focus;

  return vars;
}

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
  // Premium modal shadows for rich experience
  modalPremium:
    'var(--ds-extended-shadow-modal-premium, 0 20px 60px -15px rgb(0 0 0 / 0.3), 0 0 0 1px rgb(0 0 0 / 0.05))',
  modalBackdrop:
    'var(--ds-extended-shadow-modal-backdrop, 0 0 0 1px rgb(0 0 0 / 0.05), 0 8px 16px -4px rgb(0 0 0 / 0.1))',
  // Enhanced elevation shadows
  elevation1: 'var(--ds-extended-shadow-elevation-1, 0 1px 2px 0 rgb(0 0 0 / 0.05))',
  elevation2:
    'var(--ds-extended-shadow-elevation-2, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))',
  elevation3:
    'var(--ds-extended-shadow-elevation-3, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))',
  elevation4:
    'var(--ds-extended-shadow-elevation-4, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1))',
  elevation5:
    'var(--ds-extended-shadow-elevation-5, 0 25px 50px -12px rgb(0 0 0 / 0.25), 0 0 0 1px rgb(0 0 0 / 0.05))',
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
  // Premium modal spacing
  modal: {
    header: {
      padding: 'var(--ds-spacing-5) var(--ds-spacing-6)',
      gap: 'var(--ds-spacing-3)',
      compact: {
        padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
        gap: 'var(--ds-spacing-2)',
      },
    },
    content: {
      padding: 'var(--ds-spacing-6)',
      gap: 'var(--ds-spacing-5)',
      compact: {
        padding: 'var(--ds-spacing-5)',
        gap: 'var(--ds-spacing-4)',
      },
    },
    footer: {
      padding: 'var(--ds-spacing-5) var(--ds-spacing-6)',
      gap: 'var(--ds-spacing-3)',
      compact: {
        padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
        gap: 'var(--ds-spacing-2)',
      },
    },
    section: {
      gap: 'var(--ds-spacing-4)',
      compact: {
        gap: 'var(--ds-spacing-3)',
      },
    },
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
 * Follow mobile-first approach (min-width).
 *
 * These values MUST match the CSS custom properties in common-extensions.css:
 * - --ds-breakpoint-xs: 320px
 * - --ds-breakpoint-sm: 640px
 * - --ds-breakpoint-md: 768px (MOBILE_BREAKPOINT - sidebar collapse)
 * - --ds-breakpoint-lg: 1024px
 * - --ds-breakpoint-xl: 1280px
 * - --ds-breakpoint-2xl: 1536px
 *
 * @see packages/platform-ui/src/themes/common-extensions.css
 */
export const breakpoints = {
  /** Extra small: small phones (320px) */
  xs: '320px',
  /** Small: large phones, small tablets (640px) */
  sm: '640px',
  /** Medium: tablets - MOBILE_BREAKPOINT for sidebar collapse (768px) */
  md: '768px',
  /** Large: laptops, small desktops (1024px) */
  lg: '1024px',
  /** Extra large: desktops (1280px) */
  xl: '1280px',
  /** 2X large: large desktops, ultra-wide (1536px) */
  '2xl': '1536px',
  // Semantic aliases
  /** Mobile breakpoint - when sidebar collapses to drawer (768px) */
  mobile: '768px',
  /** Tablet breakpoint (1024px) */
  tablet: '1024px',
  /** Desktop breakpoint (1280px) */
  desktop: '1280px',
} as const;

/** Numeric breakpoint values for JavaScript comparisons */
export const breakpointValues = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

/** The mobile breakpoint value used by shell components (768px) */
export const MOBILE_BREAKPOINT = breakpointValues.md;

// =============================================================================
// Layout Tokens
// =============================================================================

/**
 * Layout tokens for consistent page structure.
 * These map to CSS custom properties in common-extensions.css.
 *
 * @see packages/platform-ui/src/themes/common-extensions.css
 */
export const layout = {
  // Container max-widths (map to --ds-size-container-*)
  container: {
    sm: '600px', // --ds-size-container-sm
    md: '960px', // --ds-size-container-md
    lg: '1200px', // --ds-size-container-lg
    max: '1440px', // --ds-size-container-max
    full: '100%',
  },
  // Sidebar widths (map to --ds-layout-sidebar-*)
  sidebar: {
    collapsed: '64px',
    compact: '200px',
    default: '256px',
    wide: '320px',
  },
  // Header heights (map to --ds-layout-header-*)
  header: {
    compact: '48px',
    default: '64px',
    tall: '80px',
  },
  // Content areas (map to --ds-layout-content-*)
  content: {
    maxWidth: '1200px',
    readableWidth: '65ch', // Optimal for reading (WCAG)
    narrowWidth: '45ch',
  },
  // Grid gutters (map to --ds-grid-gap-*)
  gridGap: {
    none: '0',
    xs: 'var(--ds-spacing-1)',
    sm: 'var(--ds-spacing-2)',
    md: 'var(--ds-spacing-4)',
    lg: 'var(--ds-spacing-6)',
    xl: 'var(--ds-spacing-8)',
    default: 'var(--ds-spacing-4)',
  },
} as const;

// =============================================================================
// Form & Validation Tokens
// =============================================================================

/**
 * Tokens for form states and validation feedback.
 * Designed for clear user feedback while maintaining accessibility.
 */
export const form = {
  // Validation states
  validation: {
    success: {
      borderColor: 'var(--ds-color-success-border-default)',
      backgroundColor: 'var(--ds-color-success-surface-default)',
      textColor: 'var(--ds-color-success-text-default)',
      iconColor: 'var(--ds-color-success-base-default)',
    },
    error: {
      borderColor: 'var(--ds-color-danger-border-default)',
      backgroundColor: 'var(--ds-color-danger-surface-default)',
      textColor: 'var(--ds-color-danger-text-default)',
      iconColor: 'var(--ds-color-danger-base-default)',
    },
    warning: {
      borderColor: 'var(--ds-color-warning-border-default)',
      backgroundColor: 'var(--ds-color-warning-surface-default)',
      textColor: 'var(--ds-color-warning-text-default)',
      iconColor: 'var(--ds-color-warning-base-default)',
    },
    info: {
      borderColor: 'var(--ds-color-info-border-default)',
      backgroundColor: 'var(--ds-color-info-surface-default)',
      textColor: 'var(--ds-color-info-text-default)',
      iconColor: 'var(--ds-color-info-base-default)',
    },
  },
  // Input states
  input: {
    default: {
      border: '1px solid var(--ds-color-neutral-border-default)',
      background: 'var(--ds-color-neutral-background-default)',
    },
    hover: {
      border: '1px solid var(--ds-color-neutral-border-strong)',
      background: 'var(--ds-color-neutral-background-default)',
    },
    focus: {
      border: '1px solid var(--ds-color-accent-border-default)',
      outline: '2px solid var(--ds-color-focus-outer)',
      outlineOffset: '2px',
    },
    disabled: {
      border: '1px solid var(--ds-color-neutral-border-subtle)',
      background: 'var(--ds-color-neutral-surface-default)',
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    readonly: {
      border: '1px solid var(--ds-color-neutral-border-subtle)',
      background: 'var(--ds-color-neutral-surface-subtle)',
    },
  },
  // Label styling
  label: {
    color: 'var(--ds-color-neutral-text-default)',
    requiredIndicator: 'var(--ds-color-danger-text-default)',
    optionalText: 'var(--ds-color-neutral-text-subtle)',
    disabledColor: 'var(--ds-color-neutral-text-subtle)',
  },
  // Helper/description text
  helper: {
    color: 'var(--ds-color-neutral-text-subtle)',
    errorColor: 'var(--ds-color-danger-text-default)',
    fontSize: 'var(--ds-font-size-sm)',
  },
  // Character counter
  counter: {
    color: 'var(--ds-color-neutral-text-subtle)',
    warningColor: 'var(--ds-color-warning-text-default)',
    errorColor: 'var(--ds-color-danger-text-default)',
  },
} as const;

// =============================================================================
// Notification & Alert Tokens
// =============================================================================

/**
 * Tokens for notifications, alerts, toasts, and banners.
 */
export const notification = {
  // Severity levels
  severity: {
    info: {
      background: 'var(--ds-color-info-surface-default)',
      border: 'var(--ds-color-info-border-default)',
      icon: 'var(--ds-color-info-base-default)',
      text: 'var(--ds-color-info-text-default)',
    },
    success: {
      background: 'var(--ds-color-success-surface-default)',
      border: 'var(--ds-color-success-border-default)',
      icon: 'var(--ds-color-success-base-default)',
      text: 'var(--ds-color-success-text-default)',
    },
    warning: {
      background: 'var(--ds-color-warning-surface-default)',
      border: 'var(--ds-color-warning-border-default)',
      icon: 'var(--ds-color-warning-base-default)',
      text: 'var(--ds-color-warning-text-default)',
    },
    error: {
      background: 'var(--ds-color-danger-surface-default)',
      border: 'var(--ds-color-danger-border-default)',
      icon: 'var(--ds-color-danger-base-default)',
      text: 'var(--ds-color-danger-text-default)',
    },
  },
  // Toast positioning
  toast: {
    offset: 'var(--ds-spacing-4)',
    gap: 'var(--ds-spacing-3)',
    maxWidth: '400px',
    minWidth: '300px',
    zIndex: zIndex.toast,
  },
  // Banner styling
  banner: {
    padding: 'var(--ds-spacing-4)',
    iconSize: 'var(--ds-sizing-5)',
    closeButtonSize: 'var(--ds-sizing-8)',
  },
  // Badge/count indicators
  badge: {
    minSize: 'var(--ds-sizing-5)',
    fontSize: 'var(--ds-font-size-xs)',
    fontWeight: 'var(--ds-font-weight-semibold)',
    background: 'var(--ds-color-danger-base-default)',
    color: 'var(--ds-color-danger-contrast-default)',
  },
} as const;

// =============================================================================
// Table & Data Grid Tokens
// =============================================================================

/**
 * Tokens for tables, data grids, and list views.
 */
export const table = {
  // Cell styling
  cell: {
    padding: {
      compact: 'var(--ds-spacing-2) var(--ds-spacing-3)',
      default: 'var(--ds-spacing-3) var(--ds-spacing-4)',
      comfortable: 'var(--ds-spacing-4) var(--ds-spacing-5)',
    },
    borderColor: 'var(--ds-color-neutral-border-subtle)',
  },
  // Header styling
  header: {
    background: 'var(--ds-color-neutral-surface-default)',
    fontWeight: 'var(--ds-font-weight-semibold)',
    textColor: 'var(--ds-color-neutral-text-default)',
    borderColor: 'var(--ds-color-neutral-border-default)',
  },
  // Row states
  row: {
    default: {
      background: 'var(--ds-color-neutral-background-default)',
    },
    hover: {
      background: 'var(--ds-color-neutral-surface-hover)',
    },
    selected: {
      background: 'var(--ds-color-accent-surface-default)',
      borderColor: 'var(--ds-color-accent-border-default)',
    },
    striped: {
      background: 'var(--ds-color-neutral-surface-default)',
    },
    disabled: {
      background: 'var(--ds-color-neutral-surface-default)',
      opacity: '0.5',
    },
  },
  // Sorting indicators
  sort: {
    activeColor: 'var(--ds-color-accent-base-default)',
    inactiveColor: 'var(--ds-color-neutral-text-subtle)',
    iconSize: 'var(--ds-sizing-4)',
  },
  // Pagination
  pagination: {
    gap: 'var(--ds-spacing-2)',
    buttonSize: 'var(--ds-sizing-9)',
  },
  // Empty state
  empty: {
    padding: 'var(--ds-spacing-10)',
    iconSize: 'var(--ds-sizing-12)',
    textColor: 'var(--ds-color-neutral-text-subtle)',
  },
} as const;

// =============================================================================
// Navigation Tokens
// =============================================================================

/**
 * Tokens for navigation components (menus, tabs, breadcrumbs).
 */
export const navigation = {
  // Menu items
  menu: {
    item: {
      padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
      gap: 'var(--ds-spacing-3)',
      borderRadius: 'var(--ds-border-radius-md)',
    },
    hover: {
      background: 'var(--ds-color-neutral-surface-hover)',
    },
    active: {
      background: 'var(--ds-color-accent-surface-default)',
      textColor: 'var(--ds-color-accent-text-default)',
      fontWeight: 'var(--ds-font-weight-medium)',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  // Tabs
  tabs: {
    gap: 'var(--ds-spacing-1)',
    indicator: {
      height: '2px',
      color: 'var(--ds-color-accent-base-default)',
      transition: 'all 0.2s ease',
    },
    item: {
      padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
      fontWeight: {
        default: 'var(--ds-font-weight-regular)',
        active: 'var(--ds-font-weight-medium)',
      },
    },
  },
  // Breadcrumbs
  breadcrumb: {
    gap: 'var(--ds-spacing-2)',
    separator: {
      color: 'var(--ds-color-neutral-text-subtle)',
      content: "'/'",
    },
    link: {
      color: 'var(--ds-color-neutral-text-subtle)',
      hoverColor: 'var(--ds-color-accent-text-default)',
    },
    current: {
      color: 'var(--ds-color-neutral-text-default)',
      fontWeight: 'var(--ds-font-weight-medium)',
    },
  },
  // Sidebar navigation
  sidebar: {
    width: layout.sidebar,
    background: 'var(--ds-color-neutral-background-default)',
    borderColor: 'var(--ds-color-neutral-border-default)',
    section: {
      padding: 'var(--ds-spacing-4)',
      titleColor: 'var(--ds-color-neutral-text-subtle)',
      titleFontSize: 'var(--ds-font-size-xs)',
      titleFontWeight: 'var(--ds-font-weight-semibold)',
      titleTextTransform: 'uppercase',
      titleLetterSpacing: '0.05em',
    },
  },
} as const;

// =============================================================================
// Theme Mode Tokens (Light/Dark)
// =============================================================================

/**
 * Tokens for theme mode switching.
 * Use CSS custom properties that change based on [data-color-scheme].
 */
export const themeMode = {
  // Surface backgrounds (adapt to theme)
  surface: {
    page: 'var(--ds-color-neutral-background-default)',
    raised: 'var(--ds-color-neutral-background-default)',
    overlay: 'var(--ds-color-neutral-background-default)',
    sunken: 'var(--ds-color-neutral-surface-default)',
  },
  // Text colors (adapt to theme)
  text: {
    primary: 'var(--ds-color-neutral-text-default)',
    secondary: 'var(--ds-color-neutral-text-subtle)',
    disabled: 'var(--ds-color-neutral-text-subtle)',
    inverse: 'var(--ds-color-neutral-contrast-default)',
  },
  // Border colors (adapt to theme)
  border: {
    default: 'var(--ds-color-neutral-border-default)',
    subtle: 'var(--ds-color-neutral-border-subtle)',
    strong: 'var(--ds-color-neutral-border-strong)',
  },
  // Transition for theme switching
  transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
} as const;

// =============================================================================
// Semantic State Tokens
// =============================================================================

/**
 * Semantic tokens for common UI states.
 */
export const states = {
  // Interactive states
  interactive: {
    default: {
      opacity: '1',
      cursor: 'pointer',
    },
    hover: {
      opacity: '0.9',
      transform: 'translateY(-1px)',
    },
    active: {
      opacity: '0.95',
      transform: 'translateY(0)',
    },
    focus: {
      outline: '2px solid var(--ds-color-focus-outer)',
      outlineOffset: '2px',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  // Loading states
  loading: {
    opacity: '0.7',
    cursor: 'wait',
    animation: motion.continuous.pulse,
  },
  // Empty states
  empty: {
    textColor: 'var(--ds-color-neutral-text-subtle)',
    iconColor: 'var(--ds-color-neutral-text-subtle)',
    background: 'var(--ds-color-neutral-surface-default)',
  },
  // Selected states
  selected: {
    background: 'var(--ds-color-accent-surface-default)',
    borderColor: 'var(--ds-color-accent-border-default)',
    textColor: 'var(--ds-color-accent-text-default)',
  },
  // Dragging states (drag-and-drop)
  dragging: {
    opacity: '0.8',
    shadow: shadows.lg,
    cursor: 'grabbing',
  },
  dropTarget: {
    background: 'var(--ds-color-accent-surface-default)',
    borderColor: 'var(--ds-color-accent-border-default)',
    borderStyle: 'dashed',
  },
} as const;

// =============================================================================
// Print Tokens
// =============================================================================

/**
 * Tokens for print-friendly styling.
 * Apply via @media print.
 */
export const print = {
  // Page setup
  page: {
    margin: '2cm',
    fontSize: '12pt',
    lineHeight: '1.5',
  },
  // Color overrides for print
  colors: {
    text: '#000000',
    background: '#ffffff',
    border: '#cccccc',
    link: '#000000',
  },
  // Hide elements in print
  hide: {
    display: 'none',
    visibility: 'hidden',
  },
  // Break controls
  breaks: {
    avoidInside: 'avoid',
    beforePage: 'page',
    afterPage: 'page',
  },
} as const;

// =============================================================================
// High Contrast Mode Tokens (WCAG AAA)
// =============================================================================

/**
 * Tokens for forced high contrast mode.
 * These are used when user has high contrast preferences.
 */
export const highContrast = {
  // Forced colors
  colors: {
    text: 'CanvasText',
    background: 'Canvas',
    link: 'LinkText',
    button: 'ButtonText',
    buttonBackground: 'ButtonFace',
    highlight: 'Highlight',
    highlightText: 'HighlightText',
  },
  // Border emphasis
  borders: {
    width: '2px',
    style: 'solid',
    color: 'CanvasText',
  },
  // Focus indicators (extra visible)
  focus: {
    outline: '3px solid Highlight',
    outlineOffset: '2px',
  },
} as const;

// =============================================================================
// Icon Tokens
// =============================================================================

/**
 * Tokens for icon styling and sizing.
 */
export const icons = {
  // Size scale
  size: {
    xs: 'var(--ds-sizing-3)', // 12px
    sm: 'var(--ds-sizing-4)', // 16px
    md: 'var(--ds-sizing-5)', // 20px
    lg: 'var(--ds-sizing-6)', // 24px
    xl: 'var(--ds-sizing-8)', // 32px
    '2xl': 'var(--ds-sizing-10)', // 40px
  },
  // Stroke width for outlined icons
  stroke: {
    thin: '1',
    regular: '1.5',
    medium: '2',
    bold: '2.5',
  },
  // Default colors
  color: {
    default: 'currentColor',
    subtle: 'var(--ds-color-neutral-text-subtle)',
    accent: 'var(--ds-color-accent-base-default)',
    success: 'var(--ds-color-success-base-default)',
    warning: 'var(--ds-color-warning-base-default)',
    danger: 'var(--ds-color-danger-base-default)',
    info: 'var(--ds-color-info-base-default)',
  },
} as const;

// =============================================================================
// Rich Layout Component Tokens
// =============================================================================

/**
 * Tokens for rich layout components commonly used in domain UIs.
 * These extend base Designsystemet for complex booking/selection flows.
 */
export const richLayout = {
  // Icon containers (circular/rounded icon backgrounds)
  iconContainer: {
    sizes: {
      sm: { size: '32px', iconSize: '16px', radius: 'var(--ds-border-radius-md)' },
      md: { size: '48px', iconSize: '20px', radius: 'var(--ds-border-radius-lg)' },
      lg: { size: '64px', iconSize: '28px', radius: 'var(--ds-border-radius-full)' },
      xl: { size: '80px', iconSize: '36px', radius: 'var(--ds-border-radius-full)' },
    },
    variants: {
      accent: {
        background:
          'linear-gradient(135deg, var(--ds-color-accent-surface-default) 0%, var(--ds-color-accent-surface-hover) 100%)',
        color: 'var(--ds-color-accent-base-default)',
      },
      success: {
        background: 'var(--ds-color-success-surface-default)',
        color: 'var(--ds-color-success-base-default)',
      },
      warning: {
        background: 'var(--ds-color-warning-surface-default)',
        color: 'var(--ds-color-warning-base-default)',
      },
      neutral: {
        background: 'var(--ds-color-neutral-surface-default)',
        color: 'var(--ds-color-neutral-text-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
      },
    },
  },

  // Selection cards (clickable option cards)
  selectionCard: {
    padding: 'var(--ds-spacing-4)',
    gap: 'var(--ds-spacing-3)',
    borderRadius: 'var(--ds-border-radius-lg)',
    transition: 'all 150ms ease',
    states: {
      default: {
        border: '2px solid var(--ds-color-neutral-border-default)',
        background: 'var(--ds-color-neutral-background-default)',
      },
      hover: {
        border: '2px solid var(--ds-color-neutral-border-strong)',
        background: 'var(--ds-color-neutral-surface-hover)',
      },
      selected: {
        border: '2px solid var(--ds-color-accent-border-default)',
        background: 'var(--ds-color-accent-surface-tinted)',
      },
      disabled: {
        border: '2px solid var(--ds-color-neutral-border-subtle)',
        background: 'var(--ds-color-neutral-surface-default)',
        opacity: '0.6',
      },
    },
  },

  // Login/auth prompt sections
  authPrompt: {
    padding: 'var(--ds-spacing-6)',
    gap: 'var(--ds-spacing-6)',
    maxWidth: '400px',
    textAlign: 'center',
    buttonGap: 'var(--ds-spacing-3)',
  },

  // Dividers with text (or/and separators)
  textDivider: {
    gap: 'var(--ds-spacing-3)',
    lineColor: 'var(--ds-color-neutral-border-subtle)',
    lineHeight: '1px',
    textColor: 'var(--ds-color-neutral-text-subtle)',
    fontSize: 'var(--ds-font-size-xs)',
  },

  // Info/security badges
  infoBadge: {
    padding: 'var(--ds-spacing-4)',
    gap: 'var(--ds-spacing-3)',
    borderRadius: 'var(--ds-border-radius-lg)',
    background: 'var(--ds-color-neutral-surface-subtle)',
    iconSize: '32px',
  },

  // Step indicators/wizards
  stepIndicator: {
    size: '32px',
    fontSize: 'var(--ds-font-size-sm)',
    fontWeight: 'var(--ds-font-weight-semibold)',
    gap: 'var(--ds-spacing-2)',
    lineWidth: '2px',
    states: {
      pending: {
        background: 'var(--ds-color-neutral-surface-default)',
        border: '2px solid var(--ds-color-neutral-border-default)',
        color: 'var(--ds-color-neutral-text-subtle)',
      },
      current: {
        background: 'var(--ds-color-accent-base-default)',
        border: 'none',
        color: 'var(--ds-color-accent-contrast-default)',
      },
      completed: {
        background: 'var(--ds-color-success-base-default)',
        border: 'none',
        color: 'var(--ds-color-success-contrast-default)',
      },
    },
  },

  // Price/summary displays
  priceSummary: {
    padding: 'var(--ds-spacing-4)',
    gap: 'var(--ds-spacing-3)',
    borderRadius: 'var(--ds-border-radius-md)',
    background: 'var(--ds-color-neutral-surface-default)',
    totalFontSize: 'var(--ds-font-size-xl)',
    totalFontWeight: 'var(--ds-font-weight-bold)',
    lineItemGap: 'var(--ds-spacing-2)',
  },

  // Calendar/slot selection
  slotGrid: {
    gap: 'var(--ds-spacing-1)',
    cellPadding: 'var(--ds-spacing-2)',
    cellBorderRadius: 'var(--ds-border-radius-sm)',
    states: {
      available: {
        background: 'var(--ds-color-success-surface-default)',
        color: 'var(--ds-color-success-text-default)',
        cursor: 'pointer',
      },
      selected: {
        background: 'var(--ds-color-accent-base-default)',
        color: 'var(--ds-color-accent-contrast-default)',
      },
      unavailable: {
        background: 'var(--ds-color-neutral-surface-default)',
        color: 'var(--ds-color-neutral-text-subtle)',
        cursor: 'not-allowed',
      },
      blocked: {
        background: 'var(--ds-color-danger-surface-default)',
        color: 'var(--ds-color-danger-text-default)',
      },
    },
  },

  // Sidebar/panel layouts
  sidePanel: {
    width: {
      sm: '320px',
      md: '400px',
      lg: '480px',
    },
    padding: 'var(--ds-spacing-6)',
    headerGap: 'var(--ds-spacing-4)',
    contentGap: 'var(--ds-spacing-6)',
    footerPadding: 'var(--ds-spacing-4)',
    background: 'var(--ds-color-neutral-background-default)',
    borderColor: 'var(--ds-color-neutral-border-default)',
  },
} as const;

// =============================================================================
// Aspect Ratio Tokens
// =============================================================================

/**
 * Common aspect ratios for media containers.
 */
export const aspectRatio = {
  square: '1 / 1',
  landscape: '4 / 3',
  portrait: '3 / 4',
  video: '16 / 9',
  cinema: '21 / 9',
  golden: '1.618 / 1',
  card: '3 / 2',
  thumbnail: '1 / 1',
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
  // Form & validation
  form,
  // Notifications & alerts
  notification,
  // Tables & data grids
  table,
  // Navigation
  navigation,
  // Theme mode (light/dark)
  themeMode,
  // Multi-theme color palettes
  colorThemes,
  // Semantic states
  states,
  // Print styles
  print,
  // High contrast mode (WCAG AAA)
  highContrast,
  // Icons
  icons,
  // Rich layout components (domain UIs)
  richLayout,
  // Aspect ratios
  aspectRatio,
} as const;

export default extendedTokens;
