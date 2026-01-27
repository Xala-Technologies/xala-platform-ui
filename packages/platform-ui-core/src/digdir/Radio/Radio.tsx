/**
 * Radio Wrapper
 *
 * Thin wrapper around Digdir Radio with ref forwarding
 */
import React, { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { Radio as DigdirRadio } from '@digdir/designsystemet-react';
import type { ComponentProps } from 'react';

export type RadioProps = ComponentProps<typeof DigdirRadio>;

export const Radio: ForwardRefExoticComponent<RadioProps & RefAttributes<HTMLInputElement>> = forwardRef<HTMLInputElement, RadioProps>(
    (props, ref) => {
        return <DigdirRadio ref={ref} {...props} />;
    }
);

Radio.displayName = 'Radio';
