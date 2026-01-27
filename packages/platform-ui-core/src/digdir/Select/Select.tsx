/**
 * Select Wrapper
 *
 * Thin wrapper around Digdir Select with Option compound component
 */
import React, { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { Select as DigdirSelect } from '@digdir/designsystemet-react';
import type { ComponentProps } from 'react';

export type SelectProps = ComponentProps<typeof DigdirSelect>;

// Create wrapper component with explicit type
const SelectBase: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLSelectElement>> = forwardRef<HTMLSelectElement, SelectProps>(
    (props, ref) => {
        return <DigdirSelect ref={ref} {...props} />;
    }
);

SelectBase.displayName = 'Select';

// Export Option type explicitly
type SelectOptionProps = ComponentProps<typeof DigdirSelect.Option>;

// Create compound Select with Option attached - cast to any then back to proper interface
export const Select: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLSelectElement>> & {
    Option: typeof DigdirSelect.Option;
} = Object.assign(SelectBase, {
    Option: DigdirSelect.Option,
});
