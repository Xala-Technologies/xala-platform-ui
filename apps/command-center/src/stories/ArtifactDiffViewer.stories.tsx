/**
 * ArtifactDiffViewer Stories
 *
 * Storybook stories for the ArtifactDiffViewer component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ArtifactDiffViewer } from '../components/artifacts/ArtifactDiffViewer';
import type { GeneratedArtifact, ArtifactChange } from '../registry/types';

const meta: Meta<typeof ArtifactDiffViewer> = {
  title: 'CommandCenter/Artifacts/ArtifactDiffViewer',
  component: ArtifactDiffViewer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArtifactDiffViewer>;

const sampleArtifact: GeneratedArtifact = {
  id: '1',
  type: 'json',
  path: '/generated/COMPOSE_ResourceCard.json',
  name: 'COMPOSE_ResourceCard.json',
  content: JSON.stringify(
    {
      componentName: 'ResourceCard',
      layer: 'patterns',
      props: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: false },
      },
    },
    null,
    2
  ),
};

const samplePreviousArtifact: GeneratedArtifact = {
  id: '2',
  type: 'json',
  path: '/generated/COMPOSE_ResourceCard.json',
  name: 'COMPOSE_ResourceCard.json',
  content: JSON.stringify(
    {
      componentName: 'ResourceCard',
      layer: 'blocks',
      props: {
        title: { type: 'string', required: true },
      },
    },
    null,
    2
  ),
};

const sampleChanges: ArtifactChange[] = [
  {
    type: 'modified',
    path: '/layer',
    oldValue: 'blocks',
    newValue: 'patterns',
  },
  {
    type: 'added',
    path: '/props/description',
    newValue: { type: 'string', required: false },
  },
];

export const Default: Story = {
  args: {
    artifact: sampleArtifact,
  },
};

export const WithPreviousVersion: Story = {
  args: {
    artifact: sampleArtifact,
    previousArtifact: samplePreviousArtifact,
  },
};

export const WithChanges: Story = {
  args: {
    artifact: sampleArtifact,
    previousArtifact: samplePreviousArtifact,
    changes: sampleChanges,
  },
};

export const NoPreviousVersion: Story = {
  args: {
    artifact: sampleArtifact,
  },
};
