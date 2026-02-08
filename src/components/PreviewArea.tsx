/**
 * PreviewArea Block
 *
 * Container for previewing components in playground/storybook contexts.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { Card } from '@digdir/designsystemet-react';
import { cn } from '../utils';

export interface PreviewAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Minimum height of the preview area
   * @default '300px'
   */
  minHeight?: string;

  /**
   * Background style
   * @default 'subtle'
   */
  background?: 'default' | 'subtle' | 'transparent' | 'checkerboard';

  /**
   * Whether to center content
   * @default true
   */
  centered?: boolean;

  children: React.ReactNode;
}

export const PreviewArea = forwardRef<HTMLDivElement, PreviewAreaProps>(
  (
    {
      minHeight = '300px',
      background = 'subtle',
      centered = true,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const getBackgroundStyle = () => {
      switch (background) {
        case 'default':
          return 'var(--ds-color-neutral-background-default)';
        case 'subtle':
          return 'var(--ds-color-neutral-background-subtle)';
        case 'transparent':
          return 'transparent';
        case 'checkerboard':
          return `
            repeating-conic-gradient(
              var(--ds-color-neutral-surface-default) 0% 25%,
              var(--ds-color-neutral-border-subtle) 0% 50%
            ) 50% / 20px 20px
          `;
        default:
          return 'var(--ds-color-neutral-background-subtle)';
      }
    };

    // Filter out data-size to avoid type conflict with Card
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'data-size': _dataSize, ...cardProps } = props as Record<string, unknown>;

    return (
      <Card className={cn('ds-preview-area', className)} style={style} {...cardProps}>
        <div
          ref={ref}
          style={{
            padding: 'var(--ds-spacing-8)',
            display: centered ? 'flex' : 'block',
            justifyContent: centered ? 'center' : undefined,
            alignItems: centered ? 'center' : undefined,
            minHeight,
            background: getBackgroundStyle(),
          }}
        >
          {children}
        </div>
      </Card>
    );
  }
);

PreviewArea.displayName = 'PreviewArea';

export default PreviewArea;
