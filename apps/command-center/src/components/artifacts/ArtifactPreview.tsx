/**
 * Artifact Preview Component
 * 
 * Displays generated artifacts (code/json/etc) in a side panel.
 */

import {
    CodeBlock,
    HorizontalLayout,
    SimpleSidebar,
    SidebarHeaderArea,
    SidebarScrollArea,
    MainContent,
    ExplorerItem,
    StatusTag,
    Heading,
    FileTextIcon,
    ListIcon,
    Stack,
    Card
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

    // Use Card as the container
    // HorizontalLayout inside to split sidebar and content
    return (
        <Card style={{ height: '600px', display: 'flex', flexDirection: 'column', border: '1px solid var(--ds-color-neutral-border-default)' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <HorizontalLayout fullHeight={false} style={{ height: '100%' }}>
                    <SimpleSidebar width="280px" bordered>
                        <SidebarHeaderArea>
                            <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                                <ListIcon size={16} />
                                <Heading level={3} data-size="xs">Artifacts ({artifacts.length})</Heading>
                            </Stack>
                        </SidebarHeaderArea>
                        <SidebarScrollArea>
                            {artifacts.map(artifact => (
                                <ExplorerItem
                                    key={artifact.id}
                                    title={artifact.name || artifact.path.split('/').pop() || 'Untitled'}
                                    description={artifact.path}
                                    selected={activeArtifactId === artifact.id}
                                    onClick={() => setActiveArtifactId(artifact.id)}
                                    icon={<FileTextIcon size={16} />}
                                />
                            ))}
                        </SidebarScrollArea>
                    </SimpleSidebar>

                    <MainContent style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {activeArtifact ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <CodeBlock
                                    code={activeArtifact.content || '// No content'}
                                    language={activeArtifact.path.endsWith('.json') ? 'json' : 'typescript'}
                                    maxHeight="100%"
                                    className="ds-code-block-full"
                                />
                            </div>
                        ) : (
                            <Stack align="center" justify="center" style={{ height: '100%' }}>
                                <StatusTag color="neutral">Select a file to preview</StatusTag>
                            </Stack>
                        )}
                    </MainContent>
                </HorizontalLayout>
            </div>
        </Card>
    );
}
