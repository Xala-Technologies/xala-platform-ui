/**
 * CommandTerminal Block
 *
 * Terminal-style output display for CLI commands.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import { Card, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import { Stack } from '../primitives';
import { cn } from '../utils';

export type TerminalStatus = 'idle' | 'running' | 'completed' | 'failed';

export interface CommandTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Command being executed */
  command?: string;
  /** Terminal output logs */
  logs?: string[];
  /** Current status */
  status?: TerminalStatus;
  /** Terminal title */
  title?: string;
  /** Max height before scrolling */
  maxHeight?: string;
  /** Data test id */
  'data-testid'?: string;
}

export const CommandTerminal = forwardRef<HTMLDivElement, CommandTerminalProps>(
  (
    {
      command,
      logs = [],
      status = 'idle',
      title,
      maxHeight = '400px',
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const outputRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new logs
    useEffect(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, [logs]);

    const statusColors: Record<TerminalStatus, string> = {
      idle: 'var(--ds-color-neutral-text-subtle)',
      running: 'var(--ds-color-info-base-default)',
      completed: 'var(--ds-color-success-base-default)',
      failed: 'var(--ds-color-danger-base-default)',
    };

    // Filter out data-size to avoid type conflict with Card
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'data-size': _dataSize, ...cardProps } = props as Record<string, unknown>;

    return (
      <Card
        ref={ref}
        className={cn('ds-command-terminal', className)}
        data-color="neutral"
        data-testid={testId}
        {...cardProps}
      >
        <Card.Block>
          <Stack direction="horizontal" align="center" justify="between">
            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              {/* Terminal dots */}
              <Stack direction="horizontal" gap="var(--ds-spacing-1)">
                <span
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: 'var(--ds-border-radius-full)',
                    background: 'var(--ds-color-danger-base-default)',
                  }}
                />
                <span
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: 'var(--ds-border-radius-full)',
                    background: 'var(--ds-color-warning-base-default)',
                  }}
                />
                <span
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: 'var(--ds-border-radius-full)',
                    background: 'var(--ds-color-success-base-default)',
                  }}
                />
              </Stack>
              <Heading level={4} data-size="xs">
                {title || 'Terminal'}
              </Heading>
            </Stack>

            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              {status === 'running' && <Spinner data-size="sm" aria-hidden />}
              <span
                style={{
                  fontSize: 'var(--ds-font-size-xs)',
                  fontWeight: 'var(--ds-font-weight-medium)' as unknown as number,
                  color: statusColors[status],
                  textTransform: 'uppercase',
                }}
              >
                {status}
              </span>
            </Stack>
          </Stack>
        </Card.Block>

        <Card.Block>
          <div
            ref={outputRef}
            style={{
              background: 'var(--ds-color-neutral-contrast-default)',
              color: 'var(--ds-color-neutral-text-on-inverted)',
              padding: 'var(--ds-spacing-3)',
              borderRadius: 'var(--ds-border-radius-md)',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: 1.5,
              maxHeight,
              overflowY: 'auto',
            }}
          >
            {command && (
              <div style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                <span style={{ color: 'var(--ds-color-success-base-default)' }}>$ </span>
                {command}
              </div>
            )}
            {logs.length === 0 && status === 'idle' && (
              <Paragraph data-size="sm" style={{ opacity: 0.5 }}>
                Waiting for output...
              </Paragraph>
            )}
            {logs.map((log, index) => (
              <Stack key={index} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {log}
              </Stack>
            ))}
          </div>
        </Card.Block>
      </Card>
    );
  }
);

CommandTerminal.displayName = 'CommandTerminal';

export default CommandTerminal;
