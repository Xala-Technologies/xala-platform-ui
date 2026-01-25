/**
 * ArtifactPreview Block
 *
 * Preview panel for generated artifacts (files, components, etc).
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, useState } from 'react';
import { Card, Heading, Paragraph, Tabs } from '@digdir/designsystemet-react';
import { FileIcon, CodeIcon, ImageIcon } from '@navikt/aksel-icons';
import { cn } from '../utils';

export interface Artifact {
  id: string;
  name: string;
  type: 'file' | 'component' | 'image' | 'json' | 'markdown';
  content?: string;
  path?: string;
}

export interface ArtifactPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Single artifact to preview */
  artifact?: Artifact;
  /** Multiple artifacts to preview */
  artifacts?: Artifact[];
  /** Max content height */
  maxHeight?: string;
  /** Data test id */
  'data-testid'?: string;
}

export const ArtifactPreview = forwardRef<HTMLDivElement, ArtifactPreviewProps>(
  (
    { artifact, artifacts = [], maxHeight = '400px', className, 'data-testid': testId, ...props },
    ref
  ) => {
    const allArtifacts = artifact ? [artifact] : artifacts;
    const [selectedId, setSelectedId] = useState(allArtifacts[0]?.id);

    const getIcon = (type: Artifact['type']) => {
      switch (type) {
        case 'component':
          return <CodeIcon />;
        case 'image':
          return <ImageIcon />;
        default:
          return <FileIcon />;
      }
    };

    const selectedArtifact = allArtifacts.find((a) => a.id === selectedId) || allArtifacts[0];

    if (allArtifacts.length === 0) {
      return (
        <Card
          ref={ref}
          className={cn('ds-artifact-preview', className)}
          data-color="neutral"
          data-testid={testId}
          {...props}
        >
          <Card.Block>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-8)',
                opacity: 0.5,
              }}
            >
              <FileIcon style={{ width: '48px', height: '48px' }} />
              <Paragraph data-size="md">No artifacts to preview</Paragraph>
            </div>
          </Card.Block>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        className={cn('ds-artifact-preview', className)}
        data-color="neutral"
        data-testid={testId}
        {...props}
      >
        {allArtifacts.length > 1 && (
          <Card.Block>
            <Tabs value={selectedId} onChange={setSelectedId} data-size="sm">
              <Tabs.List>
                {allArtifacts.map((a) => (
                  <Tabs.Tab key={a.id} value={a.id}>
                    {getIcon(a.type)}
                    {a.name}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
          </Card.Block>
        )}

        <Card.Block>
          {selectedArtifact && (
            <>
              {allArtifacts.length === 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    marginBottom: 'var(--ds-spacing-2)',
                  }}
                >
                  {getIcon(selectedArtifact.type)}
                  <Heading level={4} data-size="xs">
                    {selectedArtifact.name}
                  </Heading>
                </div>
              )}

              {selectedArtifact.path && (
                <Paragraph
                  data-size="xs"
                  style={{ opacity: 0.6, marginBottom: 'var(--ds-spacing-2)' }}
                >
                  {selectedArtifact.path}
                </Paragraph>
              )}

              <div
                style={{
                  background: 'var(--ds-color-neutral-background-subtle)',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  maxHeight,
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedArtifact.content || 'No content available'}
              </div>
            </>
          )}
        </Card.Block>
      </Card>
    );
  }
);

ArtifactPreview.displayName = 'ArtifactPreview';

export default ArtifactPreview;
