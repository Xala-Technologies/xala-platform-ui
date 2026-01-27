/**
 * Textarea Wrapper
 *
 * Thin wrapper around Digdir Textarea with ref forwarding
 */
import React, { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { Textarea as DigdirTextarea } from '@digdir/designsystemet-react';
import type { ComponentProps } from 'react';

export type TextareaProps = ComponentProps<typeof DigdirTextarea>;

export const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>> = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (props, ref) => {
        return <DigdirTextarea ref={ref} {...props} />;
    }
);

Textarea.displayName = 'Textarea';
