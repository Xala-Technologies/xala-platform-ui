/**
 * SlotCalendar Stories
 *
 * Calendar component for displaying and selecting time slots.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SlotCalendar, type SlotCalendarProps } from '@xala-technologies/platform-ui-digilist';
import type { CalendarCell, LegendItem } from '../../patterns/types';

const meta: Meta<typeof SlotCalendar> = {
  title: 'Patterns/SlotCalendar',
  component: SlotCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## SlotCalendar

A domain-neutral calendar pattern for displaying and selecting time slots.
Supports week, month, and day views with various selection modes.

### Features
- Week/month/day view modes
- Slot availability status (available, unavailable, selected, partial, blocked)
- Single, multiple, and range selection modes
- Navigation controls
- Legend display
- Responsive layout

### Usage

\`\`\`tsx
<SlotCalendar
  cells={[
    { id: '1', date: new Date('2026-01-20'), status: 'available', label: '09:00' },
    { id: '2', date: new Date('2026-01-20'), status: 'unavailable', label: '10:00' },
  ]}
  visibleStart={new Date('2026-01-20')}
  viewMode="week"
  selectionMode="multiple"
  onCellClick={(cell) => console.log('Clicked:', cell)}
  onSelectionChange={(ids) => console.log('Selection:', ids)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SlotCalendar>;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Generate sample cells for a week starting from a given date
 */
function generateWeekCells(startDate: Date): CalendarCell[] {
  const cells: CalendarCell[] = [];
  const statuses: CalendarCell['status'][] = [
    'available',
    'available',
    'unavailable',
    'available',
    'available',
    'blocked',
    'available',
    'partial',
  ];

  for (let day = 0; day < 7; day++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day);

    // Generate time slots for each day (8am to 5pm)
    for (let hour = 8; hour < 17; hour++) {
      const cellDate = new Date(date);
      cellDate.setHours(hour, 0, 0, 0);

      const statusIndex = (day + hour) % statuses.length;

      cells.push({
        id: `${date.toISOString().split('T')[0]}-${hour.toString().padStart(2, '0')}:00`,
        date: cellDate,
        status: statuses[statusIndex],
        label: `${hour.toString().padStart(2, '0')}:00`,
        price: statuses[statusIndex] === 'available' ? `${450 + hour * 25} kr` : undefined,
      });
    }
  }

  return cells;
}

/**
 * Generate cells for a single day
 */
function generateDayCells(date: Date): CalendarCell[] {
  const cells: CalendarCell[] = [];
  const statuses: CalendarCell['status'][] = ['available', 'unavailable', 'available', 'blocked'];

  for (let hour = 8; hour < 17; hour++) {
    const cellDate = new Date(date);
    cellDate.setHours(hour, 0, 0, 0);

    cells.push({
      id: `${date.toISOString().split('T')[0]}-${hour.toString().padStart(2, '0')}:00`,
      date: cellDate,
      status: statuses[hour % statuses.length],
      label: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`,
    });
  }

  return cells;
}

const defaultLegend: LegendItem[] = [
  { status: 'available', label: 'Available', color: 'var(--ds-color-success-surface-default)' },
  { status: 'unavailable', label: 'Unavailable', color: 'var(--ds-color-neutral-surface-hover)' },
  { status: 'selected', label: 'Selected', color: 'var(--ds-color-accent-surface-default)' },
  { status: 'partial', label: 'Partial', color: 'var(--ds-color-warning-surface-default)' },
  { status: 'blocked', label: 'Blocked', color: 'var(--ds-color-danger-surface-default)' },
];

const baseDate = new Date('2026-01-20');

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
    onNavigate: (direction) => console.log('Navigate:', direction),
    onViewModeChange: (mode) => console.log('View mode:', mode),
  },
};

export const WithSelection: Story = {
  name: 'With Pre-selected Cells',
  args: {
    cells: generateWeekCells(baseDate),
    selectedCellIds: ['2026-01-20-10:00', '2026-01-20-11:00', '2026-01-20-12:00'],
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const DayView: Story = {
  name: 'Day View',
  args: {
    cells: generateDayCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'day',
    selectionMode: 'single',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const MonthView: Story = {
  name: 'Month View',
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'month',
    selectionMode: 'multiple',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const SingleSelect: Story = {
  name: 'Single Selection Mode',
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'single',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const RangeSelect: Story = {
  name: 'Range Selection Mode',
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'range',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const NoLegend: Story = {
  name: 'Without Legend',
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    showLegend: false,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const CustomHours: Story = {
  name: 'Custom Hour Range',
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    startHour: 6,
    endHour: 22,
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const CustomLabels: Story = {
  name: 'Custom Labels (Norwegian)',
  args: {
    cells: generateWeekCells(baseDate),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    labels: {
      today: 'I dag',
      prev: 'Forrige',
      next: 'Neste',
      week: 'Uke',
      month: 'Måned',
      day: 'Dag',
      time: 'Tid',
      legendTitle: 'Forklaring',
    },
    legend: [
      { status: 'available', label: 'Ledig', color: 'var(--ds-color-success-surface-default)' },
      {
        status: 'unavailable',
        label: 'Opptatt',
        color: 'var(--ds-color-neutral-surface-hover)',
      },
      { status: 'selected', label: 'Valgt', color: 'var(--ds-color-accent-surface-default)' },
      { status: 'partial', label: 'Delvis', color: 'var(--ds-color-warning-surface-default)' },
      { status: 'blocked', label: 'Blokkert', color: 'var(--ds-color-danger-surface-default)' },
    ],
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const EmptyCells: Story = {
  name: 'Empty Calendar',
  args: {
    cells: [],
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

export const AllBlocked: Story = {
  name: 'All Slots Blocked',
  args: {
    cells: generateWeekCells(baseDate).map((cell) => ({
      ...cell,
      status: 'blocked' as const,
    })),
    visibleStart: baseDate,
    viewMode: 'week',
    selectionMode: 'multiple',
    legend: defaultLegend,
    showLegend: true,
    onCellClick: (cell) => console.log('Clicked:', cell),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
};

/**
 * Interactive example with state management
 */
function InteractiveCalendar(props: SlotCalendarProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(props.selectedCellIds || []);
  const [viewMode, setViewMode] = React.useState(props.viewMode || 'week');
  const [visibleStart, setVisibleStart] = React.useState(props.visibleStart);

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(visibleStart);
    if (direction === 'today') {
      setVisibleStart(new Date());
    } else if (direction === 'prev') {
      if (viewMode === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else if (viewMode === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }
      setVisibleStart(newDate);
    } else {
      if (viewMode === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else if (viewMode === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      setVisibleStart(newDate);
    }
  };

  return (
    <SlotCalendar
      {...props}
      selectedCellIds={selectedIds}
      viewMode={viewMode}
      visibleStart={visibleStart}
      onSelectionChange={setSelectedIds}
      onViewModeChange={setViewMode}
      onNavigate={handleNavigate}
    />
  );
}

export const Interactive: Story = {
  name: 'Interactive Demo',
  render: (args) => <InteractiveCalendar {...args} />,
  args: {
    cells: generateWeekCells(new Date()),
    visibleStart: new Date(),
    viewMode: 'week',
    selectionMode: 'multiple',
    legend: defaultLegend,
    showLegend: true,
  },
};
