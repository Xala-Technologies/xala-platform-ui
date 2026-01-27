/**
 * Button Wrapper Types
 *
 * Extends Digdir Button with Xala conventions
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    /**
     * Button variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'tertiary';

    /**
     * Button color/intent
     * @default 'accent'
     */
    color?: 'accent' | 'neutral' | 'danger';

    /**
     * Loading state - shows spinner and disables button
     */
    loading?: boolean;

    /**
     * Full width button
     */
    fullWidth?: boolean;

    /**
     * Icon to display before children
     */
    icon?: ReactNode;

    /**
     * Icon to display after children
     */
    iconRight?: ReactNode;

    /**
     * Icon-only button (requires aria-label)
     */
    iconOnly?: boolean;

    /**
     * As child pattern for custom elements
     */
    asChild?: boolean;

    /**
     * Button children
     */
    children?: ReactNode;
}
