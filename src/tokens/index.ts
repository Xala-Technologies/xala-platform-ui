/**
 * Design Tokens
 *
 * Design tokens for the platform UI package.
 * This package uses Norwegian Designsystemet CSS variables as the foundation.
 *
 * @module @xala-technologies/platform-ui/tokens
 */

// Color palette for Avatar component
export const AVATAR_COLOR_PALETTE = [
    '#0066CC', // Blue
    '#00A0A0', // Teal
    '#CC6600', // Orange
    '#9933CC', // Purple
    '#CC0066', // Pink
    '#00CC66', // Green
    '#CC3300', // Red
    '#6600CC', // Violet
] as const;

// Typography tokens (Designsystemet uses CSS variables)
export const typography = {
    // Font families
    fontFamily: {
        base: 'Inter, system-ui, sans-serif',
        heading: 'Inter, system-ui, sans-serif',
        mono: 'Fira Code, monospace',
    },
    // Font sizes (use Designsystemet CSS vars in practice)
    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
    },
    // Font weights
    fontWeight: {
        normal: 400,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    // Line heights
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
    // Letter spacing
    letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
    },
} as const;

// Spacing tokens (Designsystemet uses --ds-spacing-*)
export const spacing = {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    modal: {
        header: {
            compact: {
                padding: '1rem 1.5rem',
                gap: '1rem',
            },
        },
        content: {
            compact: {
                padding: '1.5rem',
            },
        },
        section: {
            compact: {
                gap: '1rem',
            },
        },
        footer: {
            compact: {
                padding: '1rem 1.5rem',
                gap: '1rem',
            },
        },
    },
} as const;

// Shadow tokens
export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    elevation1: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation2: '0 4px 8px rgba(0, 0, 0, 0.12)',
    elevation3: '0 8px 16px rgba(0, 0, 0, 0.15)',
    modalPremium: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

// Border tokens
export const borders = {
    radius: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
    },
    width: {
        thin: '1px',
        base: '2px',
        medium: '2px',
        thick: '4px',
    },
} as const;

// Animation tokens
export const animation = {
    duration: {
        fast: '150ms',
        base: '200ms',
        normal: '200ms',
        slow: '300ms',
        slower: '500ms',
    },
    easing: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
} as const;

// Transition tokens
export const transitions = {
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    card: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    modal: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    button: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Opacity tokens
export const opacity = {
    0: '0',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    100: '1',
    light: '0.1',
    subtle: '0.3',
} as const;

// Component-specific tokens
export const components = {
    modal: {
        overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
        },
    },
    card: {
        borderRadius: '0.5rem',
        padding: '1rem',
        shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        minHeight: {
            md: '300px',
        },
    },
    button: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Responsive breakpoint constant (768px - tablet/mobile boundary)
export const MOBILE_BREAKPOINT = 768;

// Default export
const tokens = {
    typography,
    spacing,
    shadows,
    borders,
    animation,
    transitions,
    opacity,
    components,
    AVATAR_COLOR_PALETTE,
} as const;

export default tokens;
