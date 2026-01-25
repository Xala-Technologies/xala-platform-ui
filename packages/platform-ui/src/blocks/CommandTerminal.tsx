/**
 * CommandTerminal Block
 *
 * Terminal-style output display for CLI commands.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import { Card, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
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

    return (
      <Card
        ref={ref}
        className={cn('ds-command-terminal', className)}
        data-color="neutral"
        data-testid={testId}
        {...props}
      >
        <Card.Block>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              {/* Terminal dots */}
              <div style={{ display: 'flex', gap: '4px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--ds-color-danger-base-default)',
                  }}
                />
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--ds-color-warning-base-default)',
                  }}
                />
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--ds-color-success-base-default)',
                  }}
                />
              </div>
              <Heading level={4} data-size="xs">
                {title || 'Terminal'}
              </Heading>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              {status === 'running' && <Spinner data-size="sm" aria-hidden />}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: statusColors[status],
                  textTransform: 'uppercase',
                }}
              >
                {status}
              </span>
            </div>
          </div>
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
              <div key={index} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {log}
              </div>
            ))}
          </div>
        </Card.Block>
      </Card>
    );
  }
);

CommandTerminal.displayName = 'CommandTerminal';

export default CommandTerminal;
