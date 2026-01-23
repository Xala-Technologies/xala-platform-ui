import type { Meta, StoryObj } from '@storybook/react';
import { ResourceGrid } from '../../blocks/ResourceGrid';
import { Card, Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof ResourceGrid> = {
  title: 'Blocks/ResourceGrid',
  component: ResourceGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ResourceGrid

A responsive grid component for displaying resource cards. Strict responsive rules: 3 columns (large), 2 columns (tablet), 1 column (mobile).

### Features
- Responsive grid layout
- Configurable gap
- Minimum card width
- Maximum columns (1, 2, or 3)
- Design token compliant

### Usage
\`\`\`tsx
<ResourceGrid gap={24} minCardWidth={280} maxColumns={3}>
  <ResourceCard />
  <ResourceCard />
</ResourceGrid>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    maxColumns: {
      control: 'select',
      options: [1, 2, 3],
      description: 'Maximum columns',
    },
    gap: {
      control: 'number',
      description: 'Gap between cards (px)',
    },
    minCardWidth: {
      control: 'number',
      description: 'Minimum card width (px)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample card component
const SampleCard = ({ index }: { index: number }) => (
  <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
    <Paragraph data-size="sm">Resource Card {index + 1}</Paragraph>
  </Card>
);

// Three columns (default)
export const ThreeColumns: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// Two columns
export const TwoColumns: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={2}>
        {Array.from({ length: 4 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// Single column
export const SingleColumn: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={1}>
        {Array.from({ length: 3 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// Custom gap
export const CustomGap: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={32} minCardWidth={280} maxColumns={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// Many items
export const ManyItems: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={3}>
        {Array.from({ length: 12 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// Small gap
export const SmallGap: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={12} minCardWidth={280} maxColumns={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// Custom min card width
export const CustomMinCardWidth: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap={24} minCardWidth={320} maxColumns={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};

// With design token gap
export const WithDesignTokenGap: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)', width: '100%' }}>
      <ResourceGrid gap="var(--ds-spacing-6)" minCardWidth={280} maxColumns={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <SampleCard key={i} index={i} />
        ))}
      </ResourceGrid>
    </div>
  ),
};
