/**
 * CompositionPreview Block
 *
 * Live preview for component compositions.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, Suspense } from 'react';
import { Card, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import { EyeIcon, CodeIcon } from '@navikt/aksel-icons';
import { cn } from '../utils';

export interface CompositionData {
  componentName: string;
  layer?: string;
  description?: string;
  props?: Record<string, unknown>;
}

export interface CompositionPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Component name to preview */
  componentName?: string;
  /** Composition data */
  composeData?: CompositionData;
  /** Generic composition */
  composition?: unknown;
  /** Custom render function */
  renderPreview?: () => React.ReactNode;
  /** Data test id */
  'data-testid'?: string;
}

export const CompositionPreview = forwardRef<HTMLDivElement, CompositionPreviewProps>(
  (
    { componentName, composeData, renderPreview, className, 'data-testid': testId, ...props },
    ref
  ) => {
    const name = componentName || composeData?.componentName || 'Component';
    const layer = composeData?.layer;
    const description = composeData?.description;

    return (
      <Card
        ref={ref}
        className={cn('ds-composition-preview', className)}
        data-color="neutral"
        data-testid={testId}
        {...props}
      >
        <Card.Block>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <EyeIcon />
            <Heading level={4} data-size="xs">
              {name}
            </Heading>
            {layer && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: 'var(--ds-border-radius-full)',
                  background: 'var(--ds-color-info-surface-default)',
                  color: 'var(--ds-color-info-base-default)',
                  textTransform: 'uppercase',
                }}
              >
                {layer}
              </span>
            )}
          </div>
          {description && (
            <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-1)', opacity: 0.7 }}>
              {description}
            </Paragraph>
          )}
        </Card.Block>

        <Card.Block>
          <div
            style={{
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'repeating-conic-gradient(var(--ds-color-neutral-surface-default) 0% 25%, var(--ds-color-neutral-border-subtle) 0% 50%) 50% / 16px 16px',
              borderRadius: 'var(--ds-border-radius-md)',
              padding: 'var(--ds-spacing-4)',
            }}
          >
            <Suspense
              fallback={
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                  <Spinner data-size="md" aria-hidden />
                  <Paragraph data-size="sm">Loading preview...</Paragraph>
                </div>
              }
            >
              {renderPreview ? (
                renderPreview()
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    opacity: 0.5,
                  }}
                >
                  <CodeIcon style={{ width: '48px', height: '48px' }} />
                  <Paragraph data-size="sm">Preview for &quot;{name}&quot;</Paragraph>
                </div>
              )}
            </Suspense>
          </div>
        </Card.Block>

        {composeData?.props && Object.keys(composeData.props).length > 0 && (
          <Card.Block>
            <Heading level={5} data-size="xs">
              Props
            </Heading>
            <div
              style={{
                marginTop: 'var(--ds-spacing-2)',
                fontFamily: 'monospace',
                fontSize: '12px',
                background: 'var(--ds-color-neutral-background-subtle)',
                padding: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              {JSON.stringify(composeData.props, null, 2)}
            </div>
          </Card.Block>
        )}
      </Card>
    );
  }
);

CompositionPreview.displayName = 'CompositionPreview';

export default CompositionPreview;
