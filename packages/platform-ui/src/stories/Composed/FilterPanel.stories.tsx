import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { FilterPanel, type FilterField, type FilterCondition } from '../../index';
import { Button } from '@digdir/designsystemet-react';

/**
 * FilterPanel provides a dropdown/popover filter panel with condition builder.
 *
 * ## Features
 * - Column, Operator, Values headers
 * - Loading/generating states
 * - Where/AND/OR logic operators
 * - Multiple conditions
 * - Field types (text, number, select, date)
 *
 * ## When to Use
 * - Data table filtering
 * - Advanced search
 * - Query builders
 */
const meta: Meta<typeof FilterPanel> = {
  title: 'Composed/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FilterPanel provides a dropdown/popover filter panel with condition builder.

## Features
- Column, Operator, Values headers
- Loading/generating states with progress
- Where/AND/OR logic operators
- Multiple conditions
- Field types (text, number, select, date)

## When to Use
- Data table filtering
- Advanced search
- Query builders
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

// Sample fields
const useSampleFields = (): FilterField[] => {
  const t = useT();
  return [
    {
      id: 'name',
      label: t('storybook.filterPanel.name'),
      type: 'text',
    },
    {
      id: 'age',
      label: t('storybook.filterPanel.age'),
      type: 'number',
    },
    {
      id: 'status',
      label: t('storybook.filterPanel.status'),
      type: 'select',
      options: [
        { value: 'active', label: t('storybook.filterPanel.active') },
        { value: 'inactive', label: t('storybook.filterPanel.inactive') },
        { value: 'pending', label: t('storybook.filterPanel.pending') },
      ],
    },
    {
      id: 'date',
      label: t('storybook.filterPanel.date'),
      type: 'date',
    },
  ];
};

/**
 * Default filter panel
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [conditions, setConditions] = useState<FilterCondition[]>([]);
    const fields = useSampleFields();
    const anchorRef = { current: null } as React.RefObject<HTMLElement>;
    return (
      <div style={{ padding: 'var(--ds-spacing-4)', minHeight: '400px' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.filterPanel.openFilter')}</Button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          fields={fields}
          conditions={conditions}
          onChange={setConditions}
          anchorRef={anchorRef}
          title={t('storybook.filterPanel.filterData')}
        />
      </div>
    );
  },
};

/**
 * Filter panel with initial conditions
 */
export const WithConditions: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [conditions, setConditions] = useState<FilterCondition[]>([
      {
        id: '1',
        logic: 'where',
        fieldId: 'name',
        operator: 'contains',
        value: 'John',
      },
      {
        id: '2',
        logic: 'and',
        fieldId: 'status',
        operator: 'is',
        value: 'active',
      },
    ]);
    const fields = useSampleFields();
    const anchorRef = { current: null } as React.RefObject<HTMLElement>;
    return (
      <div style={{ padding: 'var(--ds-spacing-4)', minHeight: '400px' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.filterPanel.openFilter')}</Button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          fields={fields}
          conditions={conditions}
          onChange={setConditions}
          anchorRef={anchorRef}
          title={t('storybook.filterPanel.filterData')}
        />
      </div>
    );
  },
};

/**
 * Filter panel with loading state
 */
export const WithLoading: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [conditions, setConditions] = useState<FilterCondition[]>([
      {
        id: '1',
        logic: 'where',
        fieldId: 'name',
        operator: 'contains',
        value: 'John',
        isLoading: true,
        loadingText: t('storybook.filterPanel.generating'),
        loadingDuration: '2s',
      },
    ]);
    const fields = useSampleFields();
    const anchorRef = { current: null } as React.RefObject<HTMLElement>;
    return (
      <div style={{ padding: 'var(--ds-spacing-4)', minHeight: '400px' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.filterPanel.openFilter')}</Button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          fields={fields}
          conditions={conditions}
          onChange={setConditions}
          anchorRef={anchorRef}
          title={t('storybook.filterPanel.filterData')}
        />
      </div>
    );
  },
};

/**
 * Filter panel with apply button
 */
export const WithApplyButton: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [conditions, setConditions] = useState<FilterCondition[]>([]);
    const fields = useSampleFields();
    const anchorRef = { current: null } as React.RefObject<HTMLElement>;
    return (
      <div style={{ padding: 'var(--ds-spacing-4)', minHeight: '400px' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.filterPanel.openFilter')}</Button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          fields={fields}
          conditions={conditions}
          onChange={setConditions}
          onApply={() => {
            console.log('Apply filters:', conditions);
            setIsOpen(false);
          }}
          anchorRef={anchorRef}
          title={t('storybook.filterPanel.filterData')}
          showApplyButton
          applyButtonText={t('storybook.filterPanel.apply')}
        />
      </div>
    );
  },
};
