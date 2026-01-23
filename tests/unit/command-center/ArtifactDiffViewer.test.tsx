/**
 * ArtifactDiffViewer Component Tests
 * 
 * Tests for the ArtifactDiffViewer component that displays artifact differences.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test-utils';
import { ArtifactDiffViewer } from '../../../apps/command-center/src/components/artifacts/ArtifactDiffViewer';
import type { GeneratedArtifact, ArtifactChange } from '../../../apps/command-center/src/registry/types';

describe('ArtifactDiffViewer', () => {
    const mockArtifact: GeneratedArtifact = {
        id: 'artifact-1',
        type: 'json',
        path: 'specs/Component.spec.json',
        name: 'Component Spec',
        content: JSON.stringify({ name: 'TestComponent', version: '1.0.0' }, null, 2),
        diff: {
            previousRevisionId: 'rev-1',
            changes: [
                {
                    type: 'added',
                    path: 'specs/Component.spec.json',
                    newValue: { name: 'TestComponent' },
                },
            ],
        },
    };

    const mockArtifactWithChanges: GeneratedArtifact = {
        ...mockArtifact,
        diff: {
            previousRevisionId: 'rev-1',
            changes: [
                {
                    type: 'added',
                    path: 'specs/Component.spec.json',
                    newValue: { name: 'TestComponent' },
                },
                {
                    type: 'modified',
                    path: 'specs/Component.spec.json',
                    oldValue: { version: '1.0.0' },
                    newValue: { version: '1.1.0' },
                },
                {
                    type: 'removed',
                    path: 'specs/Old.spec.json',
                    oldValue: { name: 'OldComponent' },
                },
            ],
        },
    };

    it('renders artifact name', () => {
        render(<ArtifactDiffViewer artifact={mockArtifact} />);
        
        expect(screen.getByText('Component Spec')).toBeInTheDocument();
    });

    it('displays current badge', () => {
        render(<ArtifactDiffViewer artifact={mockArtifact} />);
        
        expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('displays change count when changes exist', () => {
        render(<ArtifactDiffViewer artifact={mockArtifactWithChanges} />);
        
        expect(screen.getByText(/3 change/)).toBeInTheDocument();
    });

    it('displays added changes', () => {
        render(<ArtifactDiffViewer artifact={mockArtifactWithChanges} />);
        
        expect(screen.getByText('added')).toBeInTheDocument();
    });

    it('displays modified changes', () => {
        render(<ArtifactDiffViewer artifact={mockArtifactWithChanges} />);
        
        expect(screen.getByText('modified')).toBeInTheDocument();
    });

    it('displays removed changes', () => {
        render(<ArtifactDiffViewer artifact={mockArtifactWithChanges} />);
        
        expect(screen.getByText('removed')).toBeInTheDocument();
    });

    it('shows no changes when diff is empty', () => {
        const artifactWithoutChanges: GeneratedArtifact = {
            ...mockArtifact,
            diff: {
                previousRevisionId: 'rev-1',
                changes: [],
            },
        };
        
        render(<ArtifactDiffViewer artifact={artifactWithoutChanges} />);
        
        // When there are no changes and no previous artifact, shows "No Previous Version"
        expect(screen.getByText(/No Previous Version/)).toBeInTheDocument();
        expect(screen.getByText(/This is the first version/)).toBeInTheDocument();
    });

    it('renders artifact content in code block', () => {
        render(<ArtifactDiffViewer artifact={mockArtifact} />);
        
        // CodeBlock should render the content
        expect(screen.getByText(/TestComponent/)).toBeInTheDocument();
    });
});
