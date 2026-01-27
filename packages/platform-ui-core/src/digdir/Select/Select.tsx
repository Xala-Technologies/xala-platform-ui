/**
 * Select Wrapper
 *
 * Thin wrapper around Digdir Select with Option compound component
 */
import React, { forwardRef } from 'react';
import { Select as DigdirSelect } from '@digdir/designsystemet-react';
import type { ComponentProps } from 'react';

export type SelectProps = ComponentProps<typeof DigdirSelect>;

// Create wrapper component
const SelectBase = forwardRef<HTMLSelectElement, SelectProps>(
    (props, ref) => {
        return <DigdirSelect ref={ref} {...props} />;
    }
);

SelectBase.displayName = 'Select';

// Create compound Select with Option attached
export const Select = Object.assign(SelectBase, {
    Option: DigdirSelect.Option,
});
