/**
 * ResourceGrid Stories
 *
 * Responsive grid component for displaying resource cards.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ResourceGrid, type ResourceGridProps } from '../../patterns/ResourceGrid';
import { Card, Heading, Paragraph, Tag } from '@digdir/designsystemet-react';

const meta: Meta<typeof ResourceGrid> = {
  title: 'Patterns/ResourceGrid',
  component: ResourceGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ResourceGrid

A responsive grid component for displaying resource cards with loading and empty states.

### Features
- CSS Grid with responsive columns
- Auto-fill responsive behavior
- Loading skeleton state
- Empty state support
- Custom key extraction

### Usage

\`\`\`tsx
<ResourceGrid
  items={resources}
  renderItem={(item) => <ResourceCard {...item} />}
  columns={{ default: 3, md: 2, sm: 1 }}
  gap="md"
  loading={isLoading}
  loadingCount={6}
  emptyState={<EmptyState message="No items found" />}
/>
\`\`\`

### Accessibility
- Uses semantic list markup (role="list", role="listitem")
- aria-busy during loading states
- Skeleton animations respect prefers-reduced-motion
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResourceGrid<SampleResource>>;

// =============================================================================
// Sample Types and Data
// =============================================================================

interface SampleResource {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'available' | 'booked' | 'maintenance';
  price: string;
}

const sampleResources: SampleResource[] = [
  {
    id: '1',
    title: 'Conference Room Alpha',
    description: 'Large meeting room with projector and video conferencing',
    category: 'Meeting Room',
    status: 'available',
    price: '500 kr/hour',
  },
  {
    id: '2',
    title: 'Workshop Space',
    description: 'Flexible space for workshops and training sessions',
    category: 'Workshop',
    status: 'available',
    price: '800 kr/hour',
  },
  {
    id: '3',
    title: 'Hot Desk Area',
    description: 'Open plan workspace with shared amenities',
    category: 'Desk',
    status: 'booked',
    price: '150 kr/day',
  },
  {
    id: '4',
    title: 'Private Office',
    description: 'Quiet private office for focused work',
    category: 'Office',
    status: 'available',
    price: '300 kr/day',
  },
  {
    id: '5',
    title: 'Event Hall',
    description: 'Large venue for events and conferences',
    category: 'Event',
    status: 'maintenance',
    price: '5000 kr/day',
  },
  {
    id: '6',
    title: 'Podcast Studio',
    description: 'Soundproofed studio with recording equipment',
    category: 'Studio',
    status: 'available',
    price: '400 kr/hour',
  },
];

// Simple card renderer for stories
function SimpleResourceCard({ resource }: { resource: SampleResource }) {
  const statusColors: Record<string, 'neutral' | 'first' | 'second' | 'third'> = {
    available: 'second',
    booked: 'third',
    maintenance: 'neutral',
  };

  const statusLabels: Record<string, string> = {
    available: 'Available',
    booked: 'Booked',
    maintenance: 'Maintenance',
  };

  return (
    <Card
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--ds-spacing-5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--ds-spacing-2)',
        }}
      >
        <Tag data-size="sm" data-color="neutral">
          {resource.category}
        </Tag>
        <Tag data-size="sm" data-color={statusColors[resource.status]}>
          {statusLabels[resource.status]}
        </Tag>
      </div>
      <Heading level={3} data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)' }}>
        {resource.title}
      </Heading>
      <Paragraph
        data-size="sm"
        style={{ margin: 0, flex: 1, color: 'var(--ds-color-neutral-text-subtle)' }}
      >
        {resource.description}
      </Paragraph>
      <Paragraph
        data-size="md"
        style={{ margin: 0, marginTop: 'var(--ds-spacing-3)', fontWeight: 600 }}
      >
        {resource.price}
      </Paragraph>
    </Card>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    items: sampleResources,
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
  },
};

export const TwoColumns: Story = {
  name: 'Two Columns',
  args: {
    items: sampleResources.slice(0, 4),
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 2, sm: 1 },
    gap: 'md',
  },
};

export const FourColumns: Story = {
  name: 'Four Columns',
  args: {
    items: sampleResources,
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 4, lg: 3, md: 2, sm: 1 },
    gap: 'md',
  },
};

export const SmallGap: Story = {
  name: 'Small Gap',
  args: {
    items: sampleResources,
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'sm',
  },
};

export const LargeGap: Story = {
  name: 'Large Gap',
  args: {
    items: sampleResources,
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'lg',
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    items: [],
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
    loading: true,
    loadingCount: 6,
  },
};

export const LoadingWithItems: Story = {
  name: 'Loading With Existing Items',
  args: {
    items: sampleResources.slice(0, 3),
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
    loading: true,
  },
};

export const EmptyState: Story = {
  name: 'Empty State (Default)',
  args: {
    items: [],
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
  },
};

export const CustomEmptyState: Story = {
  name: 'Custom Empty State',
  args: {
    items: [],
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
    emptyState: (
      <div
        style={{
          gridColumn: '1 / -1',
          padding: 'var(--ds-spacing-8)',
          textAlign: 'center',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          border: '2px dashed var(--ds-color-neutral-border-default)',
        }}
      >
        <Heading level={3} data-size="sm" style={{ margin: 0 }}>
          No resources found
        </Heading>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          Try adjusting your filters or search criteria
        </Paragraph>
      </div>
    ),
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: sampleResources.slice(0, 1),
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
  },
};

export const CustomMinWidth: Story = {
  name: 'Custom Min Item Width',
  args: {
    items: sampleResources,
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 4, md: 2, sm: 1 },
    gap: 'md',
    minItemWidth: 220,
  },
};

export const WithKeyExtractor: Story = {
  name: 'With Custom Key Extractor',
  args: {
    items: sampleResources,
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 3, md: 2, sm: 1 },
    gap: 'md',
    keyExtractor: (item) => `resource-${item.id}-${item.category}`,
  },
};

export const ManyItems: Story = {
  name: 'Many Items (12)',
  args: {
    items: [...sampleResources, ...sampleResources.map((r) => ({ ...r, id: `${r.id}-copy` }))],
    renderItem: (item) => <SimpleResourceCard resource={item} />,
    columns: { default: 4, lg: 3, md: 2, sm: 1 },
    gap: 'md',
  },
};

export const GapComparison: Story = {
  name: 'Gap Size Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <Paragraph data-size="md" style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Small Gap
        </Paragraph>
        <ResourceGrid
          items={sampleResources.slice(0, 3)}
          renderItem={(item) => <SimpleResourceCard resource={item} />}
          columns={{ default: 3 }}
          gap="sm"
        />
      </div>
      <div>
        <Paragraph data-size="md" style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Medium Gap
        </Paragraph>
        <ResourceGrid
          items={sampleResources.slice(0, 3)}
          renderItem={(item) => <SimpleResourceCard resource={item} />}
          columns={{ default: 3 }}
          gap="md"
        />
      </div>
      <div>
        <Paragraph data-size="md" style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Large Gap
        </Paragraph>
        <ResourceGrid
          items={sampleResources.slice(0, 3)}
          renderItem={(item) => <SimpleResourceCard resource={item} />}
          columns={{ default: 3 }}
          gap="lg"
        />
      </div>
    </div>
  ),
};
