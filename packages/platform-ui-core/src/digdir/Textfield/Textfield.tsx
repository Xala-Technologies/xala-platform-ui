/**
 * Textfield Wrapper
 *
 * Thin wrapper around Digdir Textfield providing:
 * - Consistent prop naming
 * - Error state handling
 * - Character limit display
 */
import React, { forwardRef } from 'react';
import { Textfield as DigdirTextfield } from '@digdir/designsystemet-react';
import type { TextfieldProps } from './Textfield.types';

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
    (
        {
            errorMessage,
            characterLimit,
            value,
            error,
            ...props
        },
        ref
    ) => {
        // Calculate remaining characters if limit is set
        const currentLength = typeof value === 'string' ? value.length : 0;
        const remainingChars = characterLimit ? characterLimit - currentLength : undefined;
        const isOverLimit = remainingChars !== undefined && remainingChars < 0;

        const hasError = error || isOverLimit;

        return (
            <DigdirTextfield
                ref={ref}
                error={hasError}
                value={value}
                aria-invalid={hasError ? 'true' : undefined}
                {...props}
            />
        );
    }
);

Textfield.displayName = 'Textfield';

// Alias for convenience
export const Input = Textfield;
