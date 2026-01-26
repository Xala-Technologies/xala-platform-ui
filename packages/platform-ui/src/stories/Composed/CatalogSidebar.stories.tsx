import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { CatalogSidebar, type CatalogItem, Stack } from '../../index';

/**
 * CatalogSidebar provides searchable, filterable catalog navigation.
 *
 * ## Features
 * - Search functionality
 * - Category filters
 * - Type filters
 * - Grouped items
 * - Loading states
 *
 * ## When to Use
 * - Story explorers
 * - File browsers
 * - Navigation panels
 */
const meta: Meta<typeof CatalogSidebar> = {
  title: 'Composed/CatalogSidebar',
  component: CatalogSidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CatalogSidebar provides searchable, filterable catalog navigation.

## Features
- Search functionality
- Category filters
- Type filters
- Grouped items
- Loading states

## When to Use
- Story explorers
- File browsers
- Navigation panels
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CatalogSidebar>;

// Sample catalog items
const useSampleItems = (): CatalogItem[] => {
  const t = useT();
  return [
    {
      id: '1',
      label: t('storybook.catalogSidebar.button'),
      subtitle: 'Button.stories.tsx',
      category: t('storybook.catalogSidebar.components'),
      type: 'story',
    },
    {
      id: '2',
      label: t('storybook.catalogSidebar.input'),
      subtitle: 'Input.stories.tsx',
      category: t('storybook.catalogSidebar.components'),
      type: 'story',
    },
    {
      id: '3',
      label: t('storybook.catalogSidebar.modal'),
      subtitle: 'Modal.stories.tsx',
      category: t('storybook.catalogSidebar.composed'),
      type: 'story',
    },
    {
      id: '4',
      label: t('storybook.catalogSidebar.documentation'),
      subtitle: 'README.md',
      category: t('storybook.catalogSidebar.docs'),
      type: 'doc',
    },
  ];
};

/**
 * Default catalog sidebar
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ width: '300px', height: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CatalogSidebar
          items={items}
          selectedId={selectedId}
          onSelect={(item) => {
            setSelectedId(item.id);
            console.log('Selected:', item);
          }}
        />
      </Stack>
    );
  },
};

/**
 * Catalog sidebar with filters
 */
export const WithFilters: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ width: '300px', height: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CatalogSidebar
          items={items}
          selectedId={selectedId}
          onSelect={(item) => {
            setSelectedId(item.id);
            console.log('Selected:', item);
          }}
          categoryFilters={[
            { value: 'all', label: t('storybook.catalogSidebar.all'), count: 4 },
            { value: 'components', label: t('storybook.catalogSidebar.components'), count: 2 },
            { value: 'composed', label: t('storybook.catalogSidebar.composed'), count: 1 },
          ]}
          typeFilters={[
            { value: 'all', label: t('storybook.catalogSidebar.all'), count: 4 },
            { value: 'story', label: t('storybook.catalogSidebar.stories'), count: 3 },
            { value: 'doc', label: t('storybook.catalogSidebar.docs'), count: 1 },
          ]}
        />
      </Stack>
    );
  },
};

/**
 * Catalog sidebar with loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ width: '300px', height: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CatalogSidebar items={[]} loading />
      </Stack>
    );
  },
};

/**
 * Catalog sidebar with error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ width: '300px', height: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CatalogSidebar
          items={[]}
          error={t('storybook.catalogSidebar.errorMessage')}
        />
      </Stack>
    );
  },
};

/**
 * Catalog sidebar with many items
 */
export const ManyItems: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const items: CatalogItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      label: t('storybook.catalogSidebar.itemNumber', { number: i + 1 }),
      category: i % 2 === 0 ? t('storybook.catalogSidebar.components') : t('storybook.catalogSidebar.composed'),
      type: i % 3 === 0 ? 'story' : 'file',
    }));
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ width: '300px', height: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CatalogSidebar
          items={items}
          selectedId={selectedId}
          onSelect={(item) => {
            setSelectedId(item.id);
            console.log('Selected:', item);
          }}
        />
      </Stack>
    );
  },
};
