/**
 * Artifact Diff Viewer Component
 * 
 * Displays side-by-side diff view for comparing artifact versions.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import {
    CodeBlock,
    HorizontalLayout,
    MainContent,
    Heading,
    Paragraph,
    Stack,
    Card,
    Tag,
} from '@xala-technologies/platform-ui';
import { GeneratedArtifact, ArtifactChange } from '../../registry/types';

export interface ArtifactDiffViewerProps {
    artifact: GeneratedArtifact;
    previousArtifact?: GeneratedArtifact;
    changes?: ArtifactChange[];
    'data-testid'?: string;
}

export function ArtifactDiffViewer({
    artifact,
    previousArtifact,
    changes,
    'data-testid': testId,
}: ArtifactDiffViewerProps) {
    // Use changes from props, or fall back to artifact.diff.changes
    const actualChanges = changes || artifact.diff?.changes || [];
    const hasChanges = actualChanges.length > 0;
    const hasPrevious = !!previousArtifact;

    if (!hasPrevious && !hasChanges) {
        return (
            <Card
                style={{
                    padding: 'var(--ds-spacing-4)',
                    backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                }}
                data-testid={testId}
            >
                <Stack spacing="var(--ds-spacing-2)">
                    <Heading level={4} data-size="sm">
                        No Previous Version
                    </Heading>
                    <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                        This is the first version of this artifact.
                    </Paragraph>
                </Stack>
            </Card>
        );
    }

    // Simple diff: show old and new side by side
    return (
        <Card
            style={{
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--ds-color-neutral-border-default)',
            }}
            data-testid={testId}
        >
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <HorizontalLayout fullHeight={false} style={{ height: '100%' }}>
                    {/* Previous Version */}
                    {hasPrevious && (
                        <MainContent
                            style={{
                                padding: 0,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRight: '1px solid var(--ds-color-neutral-border-default)',
                            }}
                        >
                            <div
                                style={{
                                    padding: 'var(--ds-spacing-3)',
                                    borderBottom: '1px solid var(--ds-color-neutral-border-default)',
                                    backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                                }}
                            >
                                <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                                    <Tag data-color="neutral" data-size="sm">
                                        Previous
                                    </Tag>
                                    <Heading level={4} data-size="xs">
                                        {previousArtifact.name || previousArtifact.path.split('/').pop() || 'Untitled'}
                                    </Heading>
                                </Stack>
                            </div>
                            <div style={{ flex: 1, overflow: 'auto' }}>
                                <CodeBlock
                                    code={previousArtifact.content || '// No content'}
                                    language={previousArtifact.path.endsWith('.json') ? 'json' : 'typescript'}
                                    maxHeight="100%"
                                />
                            </div>
                        </MainContent>
                    )}

                    {/* Current Version */}
                    <MainContent
                        style={{
                            padding: 0,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                padding: 'var(--ds-spacing-3)',
                                borderBottom: '1px solid var(--ds-color-neutral-border-default)',
                                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                            }}
                        >
                            <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                                <Tag data-color="accent" data-size="sm">
                                    Current
                                </Tag>
                                <Heading level={4} data-size="xs">
                                    {artifact.name || artifact.path.split('/').pop() || 'Untitled'}
                                </Heading>
                                {hasChanges && (
                                    <Tag data-color="info" data-size="sm">
                                        {actualChanges.length} change{actualChanges.length !== 1 ? 's' : ''}
                                    </Tag>
                                )}
                            </Stack>
                        </div>
                        <div style={{ flex: 1, overflow: 'auto' }}>
                            <CodeBlock
                                code={artifact.content || '// No content'}
                                language={artifact.path.endsWith('.json') ? 'json' : 'typescript'}
                                maxHeight="100%"
                            />
                        </div>
                    </MainContent>
                </HorizontalLayout>
            </div>

            {/* Change Summary */}
            {hasChanges && (
                <div
                    style={{
                        padding: 'var(--ds-spacing-3)',
                        borderTop: '1px solid var(--ds-color-neutral-border-default)',
                        backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                    }}
                >
                    <Stack spacing="var(--ds-spacing-2)">
                        <Heading level={4} data-size="xs">
                            Changes Summary
                        </Heading>
                        <Stack spacing="var(--ds-spacing-1)">
                            {actualChanges.map((change, index) => (
                                <Stack
                                    key={index}
                                    direction="horizontal"
                                    spacing="var(--ds-spacing-2)"
                                    style={{
                                        padding: 'var(--ds-spacing-2)',
                                        backgroundColor: 'var(--ds-color-neutral-surface-default)',
                                        borderRadius: 'var(--ds-border-radius-sm)',
                                    }}
                                >
                                    <Tag
                                        data-color={
                                            change.type === 'added'
                                                ? 'success'
                                                : change.type === 'removed'
                                                  ? 'danger'
                                                  : 'info'
                                        }
                                        data-size="sm"
                                    >
                                        {change.type}
                                    </Tag>
                                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                                        {change.path}
                                    </Paragraph>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </div>
            )}
        </Card>
    );
}
