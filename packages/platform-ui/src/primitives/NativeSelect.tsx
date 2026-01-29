/* eslint-disable no-restricted-syntax */
/**
 * NativeSelect Component
 * Simple wrapper around native HTML select element with DS styling
 */

import React, { useId } from 'react';
import { Paragraph, Label } from '@digdir/designsystemet-react';

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Label for the select */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  description?: string;
}

export function NativeSelect({
  label,
  error,
  description,
  children,
  className,
  id: providedId,
  ...props
}: NativeSelectProps) {
  const generatedId = useId();
  const id = providedId || generatedId;

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}
    >
      {label && (
        <Label
          htmlFor={id}
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 'var(--ds-font-weight-medium)',
            color: error ? 'var(--ds-color-danger-text)' : 'var(--ds-color-neutral-text-default)',
          }}
        >
          {label}
          {props.required && <span style={{ color: 'var(--ds-color-danger-text)' }}> *</span>}
        </Label>
      )}

      {description && !error && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {description}
        </Paragraph>
      )}

      <select
        {...props}
        id={id}
        style={{
          width: '100%',
          padding: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-md)',
          lineHeight: 'var(--ds-line-height-md)',
          color: 'var(--ds-color-neutral-text-default)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: `1px solid ${error ? 'var(--ds-color-danger-border)' : 'var(--ds-color-neutral-border-default)'}`,
          borderRadius: 'var(--ds-border-radius-md)',
          outline: 'none',
          cursor: 'pointer',
          ...props.style,
        }}
      >
        {children}
      </select>

      {error && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-danger-text)',
          }}
        >
          {error}
        </Paragraph>
      )}
    </div>
  );
}
