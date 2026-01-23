import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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

// Basic filter chips
export const Default: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
      { id: '2', field: 'Type', operator: 'contains', value: 'document', displayValue: 'Document' },
    ],
    onRemove: fn(),
    showClearAll: true,
  },
};

// Single filter
export const SingleFilter: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
    ],
    onRemove: fn(),
    showClearAll: true,
  },
};

// Many filters
export const ManyFilters: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
      { id: '2', field: 'Type', operator: 'contains', value: 'document', displayValue: 'Document' },
      {
        id: '3',
        field: 'Date',
        operator: 'greater_than',
        value: '2024-01-01',
        displayValue: 'After 2024-01-01',
      },
      {
        id: '4',
        field: 'Category',
        operator: 'equals',
        value: 'important',
        displayValue: 'Important',
      },
      { id: '5', field: 'Owner', operator: 'equals', value: 'john', displayValue: 'John Doe' },
    ],
    onRemove: fn(),
    showClearAll: true,
  },
};

// With add filter button
export const WithAddFilter: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
      { id: '2', field: 'Type', operator: 'contains', value: 'document', displayValue: 'Document' },
    ],
    onRemove: fn(),
    onAddFilter: fn(),
    addFilterLabel: 'Add Filter',
    showClearAll: true,
  },
};

// Without clear all
export const WithoutClearAll: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
      { id: '2', field: 'Type', operator: 'contains', value: 'document', displayValue: 'Document' },
    ],
    onRemove: fn(),
    showClearAll: false,
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
    ],
    onRemove: fn(),
    onAddFilter: fn(),
    addFilterLabel: 'Legg til filter',
    clearAllLabel: 'Fjern alle',
    showClearAll: true,
  },
};

// Max visible with overflow
export const WithMaxVisible: Story = {
  args: {
    filters: [
      { id: '1', field: 'Status', operator: 'equals', value: 'active', displayValue: 'Active' },
      { id: '2', field: 'Type', operator: 'contains', value: 'document', displayValue: 'Document' },
      {
        id: '3',
        field: 'Date',
        operator: 'greater_than',
        value: '2024-01-01',
        displayValue: 'After 2024-01-01',
      },
      {
        id: '4',
        field: 'Category',
        operator: 'equals',
        value: 'important',
        displayValue: 'Important',
      },
      { id: '5', field: 'Owner', operator: 'equals', value: 'john', displayValue: 'John Doe' },
    ],
    onRemove: fn(),
    maxVisible: 3,
    showClearAll: true,
  },
};

// Different operators
export const DifferentOperators: Story = {
  args: {
    filters: [
      { id: '1', field: 'Name', operator: 'contains', value: 'test', displayValue: 'test' },
      { id: '2', field: 'Age', operator: 'greater_than', value: '18', displayValue: '18' },
      { id: '3', field: 'Status', operator: 'is_not', value: 'deleted', displayValue: 'deleted' },
      { id: '4', field: 'Email', operator: 'is_empty', value: '', displayValue: '' },
    ],
    onRemove: fn(),
    showClearAll: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    filters: [],
    onRemove: fn(),
    onAddFilter: fn(),
    showClearAll: false,
  },
};
