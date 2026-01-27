/**
 * Checkbox Wrapper
 *
 * Thin wrapper around Digdir Checkbox with ref forwarding
 */
import React, { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { Checkbox as DigdirCheckbox } from '@digdir/designsystemet-react';
import type { ComponentProps } from 'react';

export type CheckboxProps = ComponentProps<typeof DigdirCheckbox>;

export const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>> = forwardRef<HTMLInputElement, CheckboxProps>(
    (props, ref) => {
        return <DigdirCheckbox ref={ref} {...props} />;
    }
);

Checkbox.displayName = 'Checkbox';
