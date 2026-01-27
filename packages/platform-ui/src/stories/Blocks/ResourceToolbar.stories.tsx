import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ResourceToolbar } from '@xala-technologies/platform-ui-digilist';

const meta: Meta<typeof ResourceToolbar> = {
  title: 'Blocks/ResourceToolbar',
  component: ResourceToolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceToolbar

A toolbar component for resource pages with filter button, count, and view toggles. Uses Digdir ToggleGroup for view mode selection.

### Features
- Resource count display
- Filter button with active filter count badge
- View mode toggles (grid, list, map, table)
- Customizable available views
- Norwegian labels

### Usage
\`\`\`tsx
<ResourceToolbar
  count={42}
  countLabel="resources"
  activeFilterCount={3}
  onFilterClick={handleFilterClick}
  viewMode="grid"
  onViewModeChange={handleViewChange}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onFilterClick: fn(),
    onViewModeChange: fn(),
  },
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['grid', 'list', 'map', 'table'],
      description: 'Current view mode',
    },
    showViewToggle: {
      control: 'boolean',
      description: 'Show view mode toggles',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic toolbar
export const Default: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'grid',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// With active filters
export const WithActiveFilters: Story = {
  args: {
    count: 15,
    countLabel: 'resources',
    activeFilterCount: 3,
    viewMode: 'list',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// Grid view selected
export const GridView: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'grid',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// List view selected
export const ListView: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'list',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// Map view selected
export const MapView: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'map',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// Table view selected
export const TableView: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'table',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// Limited views
export const LimitedViews: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'grid',
    showViewToggle: true,
    availableViews: ['grid', 'list'],
  },
};

// Without view toggle
export const WithoutViewToggle: Story = {
  args: {
    count: 42,
    countLabel: 'resources',
    activeFilterCount: 2,
    showViewToggle: false,
  },
};

// Custom count label
export const CustomCountLabel: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceToolbar
        count={15}
        countLabel={t('storybook.demo.cardTitle')}
        activeFilterCount={0}
        viewMode="grid"
        showViewToggle={true}
        availableViews={['grid', 'list', 'map']}
        onFilterClick={fn()}
        onViewModeChange={fn()}
      />
    );
  },
};

// Zero count
export const ZeroCount: Story = {
  args: {
    count: 0,
    countLabel: 'resources',
    activeFilterCount: 0,
    viewMode: 'grid',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};

// Large count
export const LargeCount: Story = {
  args: {
    count: 1250,
    countLabel: 'resources',
    activeFilterCount: 5,
    viewMode: 'grid',
    showViewToggle: true,
    availableViews: ['grid', 'list', 'map', 'table'],
  },
};
