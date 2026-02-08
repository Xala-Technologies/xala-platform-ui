import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { FilterChipsBar } from '../../composed/FilterChipsBar';

const meta: Meta<typeof FilterChipsBar> = {
  title: 'Composed/FilterChipsBar',
  component: FilterChipsBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FilterChipsBar

Displays active filters as removable chips in a horizontal bar. Includes "Add Filter" button and "Clear All" option.

### Features
- Active filter chips with dismiss button
- "+ Add Filter" button
- Clear all option
- Overflow handling
- Custom labels

### Usage
\`\`\`tsx
<FilterChipsBar
  filters={activeFilters}
  onRemove={handleRemove}
  onClearAll={handleClearAll}
  onAddFilter={handleAddFilter}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onRemove: fn(),
  },
  argTypes: {
    showClearAll: {
      control: 'boolean',
      description: 'Show clear all button',
    },
    maxVisible: {
      control: 'number',
      description: 'Maximum visible chips before overflow',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const DefaultDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
          {
            id: '2',
            field: t('storybook.demo.type'),
            operator: 'contains',
            value: 'document',
            displayValue: t('storybook.demo.document'),
          },
        ]}
        onRemove={fn()}
        showClearAll={true}
      />
    </div>
  );
};

const SingleFilterDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
        ]}
        onRemove={fn()}
        showClearAll={true}
      />
    </div>
  );
};

const ManyFiltersDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
          {
            id: '2',
            field: t('storybook.demo.type'),
            operator: 'contains',
            value: 'document',
            displayValue: t('storybook.demo.document'),
          },
          {
            id: '3',
            field: t('storybook.demo.date'),
            operator: 'greater_than',
            value: '2024-01-01',
            displayValue: t('storybook.demo.afterDate'),
          },
          {
            id: '4',
            field: t('storybook.demo.category'),
            operator: 'equals',
            value: 'important',
            displayValue: t('storybook.demo.important'),
          },
          {
            id: '5',
            field: t('storybook.demo.owner'),
            operator: 'equals',
            value: 'john',
            displayValue: 'John Doe',
          },
        ]}
        onRemove={fn()}
        showClearAll={true}
      />
    </div>
  );
};

const WithAddFilterDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
          {
            id: '2',
            field: t('storybook.demo.type'),
            operator: 'contains',
            value: 'document',
            displayValue: t('storybook.demo.document'),
          },
        ]}
        onRemove={fn()}
        onAddFilter={fn()}
        addFilterLabel={t('storybook.demo.addFilter')}
        showClearAll={true}
      />
    </div>
  );
};

const WithoutClearAllDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
          {
            id: '2',
            field: t('storybook.demo.type'),
            operator: 'contains',
            value: 'document',
            displayValue: t('storybook.demo.document'),
          },
        ]}
        onRemove={fn()}
        showClearAll={false}
      />
    </div>
  );
};

const CustomLabelsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
        ]}
        onRemove={fn()}
        onAddFilter={fn()}
        addFilterLabel={t('storybook.demo.addFilter')}
        clearAllLabel={t('storybook.demo.clearAll')}
        showClearAll={true}
      />
    </div>
  );
};

const WithMaxVisibleDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.status.label'),
            operator: 'equals',
            value: 'active',
            displayValue: t('platform.status.active'),
          },
          {
            id: '2',
            field: t('storybook.demo.type'),
            operator: 'contains',
            value: 'document',
            displayValue: t('storybook.demo.document'),
          },
          {
            id: '3',
            field: t('storybook.demo.date'),
            operator: 'greater_than',
            value: '2024-01-01',
            displayValue: t('storybook.demo.afterDate'),
          },
          {
            id: '4',
            field: t('storybook.demo.category'),
            operator: 'equals',
            value: 'important',
            displayValue: t('storybook.demo.important'),
          },
          {
            id: '5',
            field: t('storybook.demo.owner'),
            operator: 'equals',
            value: 'john',
            displayValue: 'John Doe',
          },
        ]}
        onRemove={fn()}
        maxVisible={3}
        showClearAll={true}
      />
    </div>
  );
};

const DifferentOperatorsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar
        filters={[
          {
            id: '1',
            field: t('platform.common.name'),
            operator: 'contains',
            value: 'test',
            displayValue: 'test',
          },
          {
            id: '2',
            field: t('storybook.demo.age'),
            operator: 'greater_than',
            value: '18',
            displayValue: '18',
          },
          {
            id: '3',
            field: t('platform.status.label'),
            operator: 'is_not',
            value: 'deleted',
            displayValue: t('storybook.demo.deleted'),
          },
          {
            id: '4',
            field: t('platform.auth.email'),
            operator: 'is_empty',
            value: '',
            displayValue: '',
          },
        ]}
        onRemove={fn()}
        showClearAll={true}
      />
    </div>
  );
};

const EmptyDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <FilterChipsBar filters={[]} onRemove={fn()} onAddFilter={fn()} showClearAll={false} />
    </div>
  );
};

// Basic filter chips
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Single filter
export const SingleFilter: Story = {
  render: function Render() {
    return <SingleFilterDemo />;
  },
};

// Many filters
export const ManyFilters: Story = {
  render: function Render() {
    return <ManyFiltersDemo />;
  },
};

// With add filter button
export const WithAddFilter: Story = {
  render: function Render() {
    return <WithAddFilterDemo />;
  },
};

// Without clear all
export const WithoutClearAll: Story = {
  render: function Render() {
    return <WithoutClearAllDemo />;
  },
};

// Custom labels
export const CustomLabels: Story = {
  render: function Render() {
    return <CustomLabelsDemo />;
  },
};

// Max visible with overflow
export const WithMaxVisible: Story = {
  render: function Render() {
    return <WithMaxVisibleDemo />;
  },
};

// Different operators
export const DifferentOperators: Story = {
  render: function Render() {
    return <DifferentOperatorsDemo />;
  },
};

// Empty state
export const Empty: Story = {
  render: function Render() {
    return <EmptyDemo />;
  },
};
