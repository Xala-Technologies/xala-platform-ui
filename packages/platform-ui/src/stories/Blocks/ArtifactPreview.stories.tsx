import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ArtifactPreview, type Artifact, Stack } from '../../index';

/**
 * ArtifactPreview provides a preview panel for generated artifacts.
 *
 * ## Features
 * - Multiple artifact types (file, component, image, json, markdown)
 * - Tab navigation for multiple artifacts
 * - Content display
 * - Type-specific icons
 *
 * ## When to Use
 * - Code generators
 * - File previews
 * - Artifact viewers
 */
const meta: Meta<typeof ArtifactPreview> = {
  title: 'Blocks/ArtifactPreview',
  component: ArtifactPreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ArtifactPreview provides a preview panel for generated artifacts.

## Features
- Multiple artifact types (file, component, image, json, markdown)
- Tab navigation for multiple artifacts
- Content display
- Type-specific icons

## When to Use
- Code generators
- File previews
- Artifact viewers
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArtifactPreview>;

/**
 * Default artifact preview
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const artifact: Artifact = {
      id: '1',
      name: t('storybook.artifactPreview.component'),
      type: 'component',
      content: `export function Button() {
  return <button>Click me</button>;
}`,
      path: '/components/Button.tsx',
    };
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ArtifactPreview artifact={artifact} />
      </Stack>
    );
  },
};

/**
 * Artifact preview - JSON
 */
export const JSON: Story = {
  render: function Render() {
    const t = useT();
    const artifact: Artifact = {
      id: '1',
      name: t('storybook.artifactPreview.config'),
      type: 'json',
      content: JSON.stringify({ name: 'project', version: '1.0.0' }, null, 2),
      path: '/config.json',
    };
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ArtifactPreview artifact={artifact} />
      </Stack>
    );
  },
};

/**
 * Artifact preview - markdown
 */
export const Markdown: Story = {
  render: function Render() {
    const t = useT();
    const artifact: Artifact = {
      id: '1',
      name: t('storybook.artifactPreview.readme'),
      type: 'markdown',
      content: `# ${t('storybook.artifactPreview.readme')}\n\n${t('storybook.artifactPreview.readmeContent')}`,
      path: '/README.md',
    };
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ArtifactPreview artifact={artifact} />
      </Stack>
    );
  },
};

/**
 * Artifact preview - multiple artifacts
 */
export const Multiple: Story = {
  render: function Render() {
    const t = useT();
    const artifacts: Artifact[] = [
      {
        id: '1',
        name: t('storybook.artifactPreview.component'),
        type: 'component',
        content: `export function Button() {
  return <button>Click me</button>;
}`,
        path: '/components/Button.tsx',
      },
      {
        id: '2',
        name: t('storybook.artifactPreview.config'),
        type: 'json',
        content: JSON.stringify({ name: 'project' }, null, 2),
        path: '/config.json',
      },
      {
        id: '3',
        name: t('storybook.artifactPreview.readme'),
        type: 'markdown',
        content: `# ${t('storybook.artifactPreview.readme')}`,
        path: '/README.md',
      },
    ];
    return (
      <div style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ArtifactPreview artifacts={artifacts} />
      </div>
    );
  },
};

/**
 * Artifact preview - empty state
 */
export const Empty: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ArtifactPreview artifacts={[]} />
      </div>
    );
  },
};

/**
 * Artifact preview with custom height
 */
export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    const artifact: Artifact = {
      id: '1',
      name: t('storybook.artifactPreview.component'),
      type: 'component',
      content: Array.from({ length: 50 }, (_, i) => `// Line ${i + 1}`).join('\n'),
      path: '/components/Button.tsx',
    };
    return (
      <div style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ArtifactPreview artifact={artifact} maxHeight="300px" />
      </div>
    );
  },
};
