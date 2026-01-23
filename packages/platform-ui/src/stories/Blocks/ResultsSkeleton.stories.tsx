import type { Meta, StoryObj } from '@storybook/react';
import { ResultsSkeleton } from '../../blocks/ResultsSkeleton';

const meta: Meta<typeof ResultsSkeleton> = {
  title: 'Blocks/ResultsSkeleton',
  component: ResultsSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResultsSkeleton

Loading skeleton component for resource object results. Supports grid and list view modes with animated shimmer effect.

### Features
- Grid view skeleton
- List view skeleton
- Animated shimmer effect
- Customizable count
- Customizable heights

### Usage
\`\`\`tsx
<ResultsSkeleton viewMode="grid" count={6} />
<ResultsSkeleton viewMode="list" count={3} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['grid', 'list'],
      description: 'View mode for skeleton layout',
    },
    count: {
      control: 'number',
      description: 'Number of skeleton items',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Grid view skeleton
export const GridView: Story = {
  args: {
    viewMode: 'grid',
    count: 6,
    cardHeight: 380,
  },
};

// List view skeleton
export const ListView: Story = {
  args: {
    viewMode: 'list',
    count: 3,
    listItemHeight: 200,
  },
};

// Few items
export const FewItems: Story = {
  args: {
    viewMode: 'grid',
    count: 3,
    cardHeight: 380,
  },
};

// Many items
export const ManyItems: Story = {
  args: {
    viewMode: 'grid',
    count: 12,
    cardHeight: 380,
  },
};

// Custom card height
export const CustomCardHeight: Story = {
  args: {
    viewMode: 'grid',
    count: 6,
    cardHeight: 450,
  },
};

// Custom list item height
export const CustomListItemHeight: Story = {
  args: {
    viewMode: 'list',
    count: 3,
    listItemHeight: 250,
  },
};

// Single item
export const SingleItem: Story = {
  args: {
    viewMode: 'grid',
    count: 1,
    cardHeight: 380,
  },
};
