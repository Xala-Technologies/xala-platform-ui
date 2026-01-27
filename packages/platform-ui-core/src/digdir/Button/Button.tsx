/**
 * Button Wrapper
 *
 * Thin wrapper around Digdir Button providing:
 * - Consistent prop naming (variant, color)
 * - Loading state with spinner
 * - Icon support (left/right)
 * - A11y enforcement for icon-only buttons
 *
 * Note: Digdir uses data-size attribute, not size prop
 */
import React, { forwardRef } from 'react';
import { Button as DigdirButton, Spinner } from '@digdir/designsystemet-react';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            color = 'accent',
            loading = false,
            fullWidth = false,
            icon,
            iconRight,
            iconOnly = false,
            disabled,
            children,
            className,
            style,
            'aria-label': ariaLabel,
            'data-size': dataSize = 'md',
            ...props
        },
        ref
    ) => {
        // A11y enforcement: icon-only buttons must have aria-label
        // Only warn in development (check done at runtime, not build time)
        if (iconOnly && !ariaLabel && typeof window !== 'undefined') {
            // Development warning - best effort, no build-time process check
            try {
                // @ts-expect-error - process may not exist in browser
                if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
                    console.warn(
                        '[Button] Icon-only buttons require an aria-label for accessibility.'
                    );
                }
            } catch {
                // Ignore if process is not available
            }
        }

        // Map our color prop to Digdir's color prop
        const digdirColor = color === 'danger' ? 'danger' : color === 'neutral' ? 'neutral' : 'accent';

        return (
            <DigdirButton
                ref={ref}
                variant={variant}
                data-size={dataSize as 'sm' | 'md' | 'lg'}
                color={digdirColor}
                disabled={disabled || loading}
                aria-label={ariaLabel}
                aria-busy={loading}
                className={className}
                style={{
                    width: fullWidth ? '100%' : undefined,
                    ...style,
                }}
                {...props}
            >
                {loading ? (
                    <>
                        <Spinner aria-hidden="true" />
                        {!iconOnly && children && <span style={{ marginLeft: 'var(--ds-spacing-2)' }}>{children}</span>}
                    </>
                ) : (
                    <>
                        {icon && <span aria-hidden="true">{icon}</span>}
                        {!iconOnly && children}
                        {iconRight && <span aria-hidden="true">{iconRight}</span>}
                    </>
                )}
            </DigdirButton>
        );
    }
);

Button.displayName = 'Button';
