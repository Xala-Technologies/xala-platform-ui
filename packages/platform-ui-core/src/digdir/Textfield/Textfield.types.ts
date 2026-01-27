/**
 * Textfield Wrapper Types
 *
 * Uses Digdir's Textfield props directly to ensure compatibility
 */
import type { ComponentProps } from 'react';
import type { Textfield } from '@digdir/designsystemet-react';

// Re-export Digdir's Textfield props for compatibility
export type TextfieldProps = ComponentProps<typeof Textfield> & {
    /**
     * Error message to display (convenience prop)
     */
    errorMessage?: string;

    /**
     * Character counter - max characters allowed
     */
    characterLimit?: number;
};
