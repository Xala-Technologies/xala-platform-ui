import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ProjectSelector, type ProjectItem, Stack } from '../../index';

/**
 * ProjectSelector provides a reusable project/workspace selector dropdown.
 *
 * ## Features
 * - Project selection dropdown
 * - Search/filter projects
 * - Custom project icons
 * - Project paths display
 *
 * ## When to Use
 * - Project switching
 * - Workspace selection
 * - Multi-project UIs
 */
const meta: Meta<typeof ProjectSelector> = {
  title: 'Composed/ProjectSelector',
  component: ProjectSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ProjectSelector provides a reusable project/workspace selector dropdown.

## Features
- Project selection dropdown
- Search/filter projects
- Custom project icons
- Project paths display

## When to Use
- Project switching
- Workspace selection
- Multi-project UIs
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectSelector>;

// Sample projects
const useSampleProjects = (): ProjectItem[] => {
  const t = useT();
  return [
    { id: '1', name: t('storybook.projectSelector.project1'), path: '/projects/project1' },
    { id: '2', name: t('storybook.projectSelector.project2'), path: '/projects/project2' },
    { id: '3', name: t('storybook.projectSelector.project3'), path: '/projects/project3' },
  ];
};

/**
 * Default project selector
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string>('1');
    const projects = useSampleProjects();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ProjectSelector
          projects={projects}
          selectedId={selectedId}
          onSelect={(project) => {
            setSelectedId(project.id);
            console.log('Selected:', project);
          }}
          label={t('storybook.projectSelector.selectProject')}
        />
      </div>
    );
  },
};

/**
 * Project selector without label
 */
export const WithoutLabel: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string>('1');
    const projects = useSampleProjects();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ProjectSelector
          projects={projects}
          selectedId={selectedId}
          onSelect={(project) => {
            setSelectedId(project.id);
            console.log('Selected:', project);
          }}
        />
      </Stack>
    );
  },
};

/**
 * Project selector with many projects
 */
export const ManyProjects: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string>('1');
    const projects: ProjectItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      name: t('storybook.projectSelector.projectNumber', { number: i + 1 }),
      path: `/projects/project${i + 1}`,
    }));
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ProjectSelector
          projects={projects}
          selectedId={selectedId}
          onSelect={(project) => {
            setSelectedId(project.id);
            console.log('Selected:', project);
          }}
          label={t('storybook.projectSelector.selectProject')}
        />
      </div>
    );
  },
};

/**
 * Small project selector
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string>('1');
    const projects = useSampleProjects();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ProjectSelector
          projects={projects}
          selectedId={selectedId}
          onSelect={(project) => {
            setSelectedId(project.id);
            console.log('Selected:', project);
          }}
          size="sm"
        />
      </div>
    );
  },
};

/**
 * Large project selector
 */
export const Large: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string>('1');
    const projects = useSampleProjects();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ProjectSelector
          projects={projects}
          selectedId={selectedId}
          onSelect={(project) => {
            setSelectedId(project.id);
            console.log('Selected:', project);
          }}
          size="lg"
        />
      </div>
    );
  },
};
