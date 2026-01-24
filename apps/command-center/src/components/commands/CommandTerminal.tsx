/**
 * Command Terminal Component
 *
 * Visualizes command execution logs in a terminal-like window.
 */

import {
  CodeBlock,
  StatusTag,
  Stack,
  Card,
  Heading,
  SidebarHeaderArea,
} from '@xala-technologies/platform-ui';
import { useEffect, useRef } from 'react';

export interface CommandTerminalProps {
  logs: string[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  height?: string;
}

export function CommandTerminal({ logs, status, height = '300px' }: CommandTerminalProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'warning';
      case 'completed':
        return 'success';
      case 'failed':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Card data-color="neutral">
      <SidebarHeaderArea data-color="subtle">
        <Stack direction="horizontal" justify="between" align="center">
          <Heading level={3} data-size="xs">
            TERMINAL OUTPUT
          </Heading>
          <StatusTag size="sm" color={getStatusColor()}>
            {status.toUpperCase()}
          </StatusTag>
        </Stack>
      </SidebarHeaderArea>

      <CodeBlock
        code={logs.join('\n') || 'Waiting for command...'}
        language="bash"
        maxHeight={height}
      />
    </Card>
  );
}
