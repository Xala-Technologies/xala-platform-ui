/**
 * Command Terminal Component
 * 
 * Visualizes command execution logs in a terminal-like window.
 */

import { CodeBlock, StatusTag, Stack, Card, Text, Container } from '@xala-technologies/platform-ui';
import { useEffect, useRef } from 'react';

export interface CommandTerminalProps {
    logs: string[];
    status: 'idle' | 'running' | 'completed' | 'failed';
    height?: string;
}

export function CommandTerminal({ logs, status, height = '300px' }: CommandTerminalProps) {
    const endRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getStatusColor = () => {
        switch (status) {
            case 'running': return 'warning';
            case 'completed': return 'success';
            case 'failed': return 'danger';
            default: return 'neutral';
        }
    };

    return (
        <Card variant="tinted">
            {/* Terminal Header */}
            <Container
                fluid
                maxWidth="100%"
                padding="var(--ds-spacing-2)"
                px="var(--ds-spacing-3)"
                style={{
                    backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                    borderBottom: '1px solid var(--ds-color-neutral-border-default)'
                }}
            >
                <Stack
                    direction="horizontal"
                    justify="between"
                    align="center"
                >
                    <Text size="xs" weight="medium" color="var(--ds-color-neutral-text-subtle)">
                        TERMINAL OUTPUT
                    </Text>
                    <StatusTag size="sm" color={getStatusColor()}>
                        {status.toUpperCase()}
                    </StatusTag>
                </Stack>
            </Container>

            {/* Terminal Content */}
            <CodeBlock
                code={logs.join('\n') || 'Waiting for command...'}
                language="bash"
                maxHeight={height}
                showCopyButton
                showLineNumbers
                style={{
                    border: 'none',
                    borderRadius: 0,
                    backgroundColor: 'var(--ds-color-neutral-surface-default)'
                }}
            />
        </Card>
    );
}
