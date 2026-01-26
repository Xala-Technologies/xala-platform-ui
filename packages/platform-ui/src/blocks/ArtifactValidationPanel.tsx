/**
 * ArtifactValidationPanel Block
 *
 * Panel showing validation results for artifacts.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import {
  CheckmarkCircleIcon,
  XMarkOctagonIcon,
  ExclamationmarkTriangleIcon,
} from '@navikt/aksel-icons';
import { cn } from '../utils';

export interface ValidationResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'warning' | 'pending';
  message?: string;
  details?: string[];
}

export interface ArtifactValidationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Single validation result */
  validationResult?: ValidationResult;
  /** Multiple validation results */
  validationResults?: ValidationResult[];
  /** Panel title */
  title?: string;
  /** Data test id */
  'data-testid'?: string;
}

export const ArtifactValidationPanel = forwardRef<HTMLDivElement, ArtifactValidationPanelProps>(
  (
    {
      validationResult,
      validationResults = [],
      title = 'Validation Results',
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const allResults = validationResult ? [validationResult] : validationResults;

    const statusConfig: Record<
      ValidationResult['status'],
      { icon: React.ReactNode; color: string }
    > = {
      passed: {
        icon: <CheckmarkCircleIcon />,
        color: 'var(--ds-color-success-base-default)',
      },
      failed: {
        icon: <XMarkOctagonIcon />,
        color: 'var(--ds-color-danger-base-default)',
      },
      warning: {
        icon: <ExclamationmarkTriangleIcon />,
        color: 'var(--ds-color-warning-base-default)',
      },
      pending: {
        icon: <ExclamationmarkTriangleIcon />,
        color: 'var(--ds-color-neutral-text-subtle)',
      },
    };

    const passedCount = allResults.filter((r) => r.status === 'passed').length;
    const failedCount = allResults.filter((r) => r.status === 'failed').length;

    // Filter out data-size to avoid type conflict with Card
    const { 'data-size': _dataSize, ...cardProps } = props as Record<string, unknown>;

    return (
      <Card
        ref={ref}
        className={cn('ds-artifact-validation-panel', className)}
        data-color="neutral"
        data-testid={testId}
        {...cardProps}
      >
        <Card.Block>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Heading level={3} data-size="sm">
              {title}
            </Heading>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
              <span style={{ color: 'var(--ds-color-success-base-default)', fontSize: '14px' }}>
                ✓ {passedCount}
              </span>
              <span style={{ color: 'var(--ds-color-danger-base-default)', fontSize: '14px' }}>
                ✗ {failedCount}
              </span>
            </div>
          </div>
        </Card.Block>

        {allResults.length === 0 ? (
          <Card.Block>
            <Paragraph data-size="sm" style={{ opacity: 0.5, textAlign: 'center' }}>
              No validation results
            </Paragraph>
          </Card.Block>
        ) : (
          <Card.Block>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
              {allResults.map((result) => {
                const config = statusConfig[result.status];
                return (
                  <div
                    key={result.id}
                    style={{
                      padding: 'var(--ds-spacing-2)',
                      background: 'var(--ds-color-neutral-background-subtle)',
                      borderRadius: 'var(--ds-border-radius-md)',
                      borderLeft: `3px solid ${config.color}`,
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}
                    >
                      <span style={{ color: config.color }}>{config.icon}</span>
                      <Paragraph data-size="sm" style={{ flex: 1, fontWeight: 500 }}>
                        {result.name}
                      </Paragraph>
                      <span
                        style={{
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          color: config.color,
                          fontWeight: 500,
                        }}
                      >
                        {result.status}
                      </span>
                    </div>
                    {result.message && (
                      <Paragraph
                        data-size="xs"
                        style={{ marginTop: 'var(--ds-spacing-1)', opacity: 0.7 }}
                      >
                        {result.message}
                      </Paragraph>
                    )}
                    {result.details && result.details.length > 0 && (
                      <div
                        style={{ marginTop: 'var(--ds-spacing-1)', fontSize: '12px', opacity: 0.6 }}
                      >
                        {result.details.map((detail, i) => (
                          <div key={i}>• {detail}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card.Block>
        )}
      </Card>
    );
  }
);

ArtifactValidationPanel.displayName = 'ArtifactValidationPanel';

export default ArtifactValidationPanel;
