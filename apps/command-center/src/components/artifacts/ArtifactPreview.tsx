/**
 * Artifact Preview Component
 * 
 * Displays generated artifacts (code/json/etc) in a side panel.
 */

import {
    CodeBlock,
    Card,
    Stack,
    Text,
    StatusTag,
    Button,
    Container,
    ListIcon
} from '@xala-technologies/platform-ui';
import { GeneratedArtifact } from '../../registry/types';
import { useState } from 'react';

export interface ArtifactPreviewProps {
    artifacts: GeneratedArtifact[];
}

export function ArtifactPreview({ artifacts }: ArtifactPreviewProps) {
    const [activeArtifactId, setActiveArtifactId] = useState<string>(artifacts[0]?.id);
    const activeArtifact = artifacts.find(a => a.id === activeArtifactId);

    if (!artifacts.length) {
        return null;
    }

    return (
        <Card style={{ height: '100%' }} variant="tinted">
            <Stack spacing="0" style={{ height: '100%' }}>
                {/* Header */}
                <Container
                    fluid
                    maxWidth="100%"
                    padding="var(--ds-spacing-4)"
                    style={{
                        backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                        borderBottom: '1px solid var(--ds-color-neutral-border-default)'
                    }}
                >
                    <Stack direction="horizontal" justify="between" align="center">
                        <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                            <ListIcon size={16} color="var(--ds-color-neutral-text-subtle)" />
                            <Text weight="medium">Generated Artifacts</Text>
                        </Stack>
                        <StatusTag color="success" size="sm">{artifacts.length} Files</StatusTag>
                    </Stack>
                </Container>

                {/* Content Layout */}
                <Stack direction="horizontal" style={{ flex: 1, minHeight: 0 }} spacing="0">
                    {/* Sidebar List */}
                    <Container
                        padding={0}
                        style={{
                            width: '220px',
                            borderRight: '1px solid var(--ds-color-neutral-border-default)',
                            backgroundColor: 'var(--ds-color-neutral-surface-default)',
                            overflowY: 'auto'
                        }}
                    >
                        <Stack spacing="var(--ds-spacing-1)" style={{ padding: 'var(--ds-spacing-2)' }}>
                            {artifacts.map(artifact => (
                                <Button
                                    key={artifact.id}
                                    variant={activeArtifactId === artifact.id ? 'secondary' : 'tertiary'}
                                    onClick={() => setActiveArtifactId(artifact.id)}
                                    style={{
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        width: '100%'
                                    }}
                                    data-size="sm"
                                >
                                    <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                                        <ListIcon size={14} />
                                        <span style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            fontSize: 'var(--ds-font-size-sm)'
                                        }}>
                                            {artifact.path.split('/').pop()}
                                        </span>
                                    </Stack>
                                </Button>
                            ))}
                        </Stack>
                    </Container>

                    {/* Main Preview Area */}
                    <Container
                        padding={0}
                        style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                    >
                        {activeArtifact ? (
                            <CodeBlock
                                code={activeArtifact.content || '// No content'}
                                language={activeArtifact.path.endsWith('.json') ? 'json' : 'typescript'}
                                showLineNumbers
                                showCopyButton
                                maxHeight="100%"
                                style={{
                                    border: 'none',
                                    borderRadius: 0,
                                    flex: 1,
                                    height: '100%'
                                }}
                            />
                        ) : (
                            <Container padding="var(--ds-spacing-8)">
                                <Stack align="center" justify="center" style={{ height: '100%' }}>
                                    <Text color="var(--ds-color-neutral-text-subtle)">Select a file to preview</Text>
                                </Stack>
                            </Container>
                        )}
                    </Container>
                </Stack>
            </Stack>
        </Card>
    );
}
