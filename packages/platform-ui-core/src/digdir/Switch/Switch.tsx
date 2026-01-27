/**
 * Switch Wrapper
 *
 * Thin wrapper around Digdir Switch with ref forwarding
 */
import React, { forwardRef } from 'react';
import { Switch as DigdirSwitch } from '@digdir/designsystemet-react';
import type { ComponentProps } from 'react';

export type SwitchProps = ComponentProps<typeof DigdirSwitch>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (props, ref) => {
        return <DigdirSwitch ref={ref} {...props} />;
    }
);

Switch.displayName = 'Switch';
