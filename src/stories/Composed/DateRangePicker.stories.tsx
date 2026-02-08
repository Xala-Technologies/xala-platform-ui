import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { DateRangePicker, type DateRange } from '../../index';

/**
 * DateRangePicker provides date range selection with presets and calendar UI.
 *
 * ## Features
 * - Date range selection
 * - Preset options (Today, Yesterday, Last 7 days, etc.)
 * - Calendar UI
 * - Min/max date constraints
 * - Error states
 *
 * ## When to Use
 * - Filtering by date range
 * - Report date selection
 * - Booking date selection
 */
const meta: Meta<typeof DateRangePicker> = {
  title: 'Composed/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DateRangePicker provides date range selection with presets and calendar UI.

## Features
- Date range selection (start and end dates)
- Preset options (Today, Yesterday, Last 7 days, etc.)
- Calendar UI for custom date selection
- Min/max date constraints
- Error states

## When to Use
- Filtering by date range
- Report date selection
- Booking date selection
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

/**
 * Default date range picker
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Date range picker with value
 */
export const WithValue: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange>({
      start: new Date(2026, 0, 1),
      end: new Date(2026, 0, 31),
    });
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Date range picker with label
 */
export const WithLabel: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          label={t('storybook.dateRangePicker.dateRange')}
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Date range picker with custom presets
 */
export const WithCustomPresets: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    const presets = [
      {
        id: 'last-week',
        label: t('storybook.dateRangePicker.lastWeek'),
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 7);
          return { start, end };
        },
      },
      {
        id: 'this-year',
        label: t('storybook.dateRangePicker.thisYear'),
        getValue: () => {
          const start = new Date(new Date().getFullYear(), 0, 1);
          const end = new Date();
          return { start, end };
        },
      },
    ];
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          presets={presets}
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Date range picker with min/max dates
 */
export const WithConstraints: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 3);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          minDate={minDate}
          maxDate={maxDate}
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Date range picker with error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          error={t('storybook.dateRangePicker.errorMessage')}
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Disabled date range picker
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<DateRange>({
      start: new Date(2026, 0, 1),
      end: new Date(2026, 0, 31),
    });
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <DateRangePicker
          value={value}
          onChange={setValue}
          disabled
          placeholder={t('storybook.dateRangePicker.selectDateRange')}
        />
      </div>
    );
  },
};
