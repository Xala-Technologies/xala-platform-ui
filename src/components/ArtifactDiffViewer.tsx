/**
 * ArtifactDiffViewer Block
 *
 * Diff viewer for comparing artifact versions.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, useState } from 'react';
import { Card, Heading, Paragraph, ToggleGroup } from '@digdir/designsystemet-react';
import { Stack } from '../primitives';
import { PlusIcon, MinusIcon, ArrowsUpDownIcon } from '@navikt/aksel-icons';
import { cn } from '../utils';

export interface ArtifactChange {
  type: 'added' | 'removed' | 'modified';
  path: string;
  oldValue?: string;
  newValue?: string;
}

export interface ArtifactDiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Artifact being compared */
  artifact?: unknown;
  /** Previous version for comparison */
  previousArtifact?: unknown;
  /** File name */
  fileName?: string;
  /** Old content */
  oldContent?: string;
  /** New content */
  newContent?: string;
  /** Structured changes */
  changes?: ArtifactChange[];
  /** Max height */
  maxHeight?: string;
  /** Data test id */
  'data-testid'?: string;
}

export const ArtifactDiffViewer = forwardRef<HTMLDivElement, ArtifactDiffViewerProps>(
  (
    {
      fileName,
      oldContent = '',
      newContent = '',
      changes = [],
      maxHeight = '500px',
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');

    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');

    const changeColors: Record<ArtifactChange['type'], { bg: string; text: string }> = {
      added: {
        bg: 'var(--ds-color-success-surface-default)',
        text: 'var(--ds-color-success-base-default)',
      },
      removed: {
        bg: 'var(--ds-color-danger-surface-default)',
        text: 'var(--ds-color-danger-base-default)',
      },
      modified: {
        bg: 'var(--ds-color-warning-surface-default)',
        text: 'var(--ds-color-warning-base-default)',
      },
    };

    // Filter out data-size to avoid type conflict with Card
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'data-size': _dataSize, ...cardProps } = props as Record<string, unknown>;

    return (
      <Card
        ref={ref}
        className={cn('ds-artifact-diff-viewer', className)}
        data-color="neutral"
        data-testid={testId}
        {...cardProps}
      >
        <Card.Block>
          <Stack direction="horizontal" align="center" justify="between">
            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              <ArrowsUpDownIcon />
              <Heading level={4} data-size="xs">
                {fileName || 'Diff View'}
              </Heading>
            </Stack>
            <ToggleGroup
              value={viewMode}
              onChange={(v) => setViewMode(v as 'unified' | 'split')}
              data-size="sm"
            >
              <ToggleGroup.Item value="unified">Unified</ToggleGroup.Item>
              <ToggleGroup.Item value="split">Split</ToggleGroup.Item>
            </ToggleGroup>
          </Stack>
        </Card.Block>

        {/* Structured changes */}
        {changes.length > 0 && (
          <Card.Block>
            <Heading level={5} data-size="xs">
              Changes ({changes.length})
            </Heading>
            <Stack
              direction="vertical"
              spacing="var(--ds-spacing-1)"
              style={{ marginTop: 'var(--ds-spacing-2)' }}
            >
              {changes.map((change, i) => {
                const colors = changeColors[change.type];
                return (
                  <Stack
                    key={i}
                    direction="horizontal"
                    align="center"
                    gap="var(--ds-spacing-2)"
                    style={{
                      padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                      background: colors.bg,
                      borderRadius: 'var(--ds-border-radius-sm)',
                    }}
                  >
                    {change.type === 'added' && <PlusIcon style={{ color: colors.text }} />}
                    {change.type === 'removed' && <MinusIcon style={{ color: colors.text }} />}
                    {change.type === 'modified' && (
                      <ArrowsUpDownIcon style={{ color: colors.text }} />
                    )}
                    <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>{change.path}</span>
                  </Stack>
                );
              })}
            </Stack>
          </Card.Block>
        )}

        {/* Content diff */}
        <Card.Block>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: 1.6,
              maxHeight,
              overflowY: 'auto',
              background: 'var(--ds-color-neutral-background-subtle)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            {viewMode === 'unified' ? (
              <Stack style={{ padding: 'var(--ds-spacing-2)' }}>
                {oldLines.map((line, i) => (
                  <Stack
                    key={`old-${i}`}
                    style={{
                      padding: '2px 8px',
                      background:
                        line !== newLines[i] ? 'var(--ds-color-danger-surface-default)' : undefined,
                    }}
                  >
                    <span
                      style={{ color: 'var(--ds-color-neutral-text-subtle)', marginRight: '12px' }}
                    >
                      {i + 1}
                    </span>
                    {line}
                  </Stack>
                ))}
              </Stack>
            ) : (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    flex: 1,
                    padding: 'var(--ds-spacing-2)',
                    borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
                  }}
                >
                  <Paragraph
                    data-size="xs"
                    style={{ marginBottom: 'var(--ds-spacing-1)', opacity: 0.6 }}
                  >
                    Old
                  </Paragraph>
                  {oldLines.map((line, i) => (
                    <div key={i} style={{ padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 'var(--ds-spacing-2)' }}>
                  <Paragraph
                    data-size="xs"
                    style={{ marginBottom: 'var(--ds-spacing-1)', opacity: 0.6 }}
                  >
                    New
                  </Paragraph>
                  {newLines.map((line, i) => (
                    <Stack key={i} style={{ padding: '2px 0' }}>
                      {line}
                    </Stack>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card.Block>
      </Card>
    );
  }
);

ArtifactDiffViewer.displayName = 'ArtifactDiffViewer';

export default ArtifactDiffViewer;
