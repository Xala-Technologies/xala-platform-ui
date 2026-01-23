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
            case 'running': return 'warning';
            case 'completed': return 'success';
            case 'failed': return 'danger';
            default: return 'neutral';
        }
    };

    return (
        <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--ds-color-neutral-border-default)' }}>
            <SidebarHeaderArea style={{ backgroundColor: 'var(--ds-color-neutral-surface-subtle)' }}>
                <Stack
                    direction="horizontal"
                    justify="between"
                    align="center"
                >
                    <Heading level={3} data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
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
                className="ds-terminal-block"
            // Note: CodeBlock has built-in border/radius which we might want to override to fit flush in the card
            // but relying on defaults is safer for strict compliance.
            />
        </Card>
    );
}
