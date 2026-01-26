import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { RentalObjectAvailabilityCalendar, type CalendarCell, type CalendarSelection, Stack } from '../../index';

/**
 * RentalObjectAvailabilityCalendar provides a calendar for rental object availability.
 *
 * ## Features
 * - Multiple modes (TIME_SLOTS, ALL_DAY, MULTI_DAY)
 * - Availability display
 * - Date range selection
 * - Legend support
 *
 * ## When to Use
 * - Rental object booking
 * - Availability calendars
 * - Time slot selection
 */
const meta: Meta<typeof RentalObjectAvailabilityCalendar> = {
  title: 'Blocks/RentalObjectAvailabilityCalendar',
  component: RentalObjectAvailabilityCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
RentalObjectAvailabilityCalendar provides a calendar for rental object availability.

## Features
- Multiple modes (TIME_SLOTS, ALL_DAY, MULTI_DAY)
- Availability display
- Date range selection
- Legend support

## When to Use
- Rental object booking
- Availability calendars
- Time slot selection
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RentalObjectAvailabilityCalendar>;

// Sample calendar cells
const useSampleCells = (): CalendarCell[] => {
  const baseDate = new Date(2026, 0, 26);
  const cells: CalendarCell[] = [];
  
  for (let hour = 9; hour < 17; hour++) {
    const start = new Date(baseDate);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(baseDate);
    end.setHours(hour + 1, 0, 0, 0);
    
    cells.push({
      id: `cell-${hour}`,
      date: start.toISOString().split('T')[0] ?? '',
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: hour % 3 === 0 ? 'unavailable' : 'available',
      price: hour % 2 === 0 ? 500 : undefined,
    });
  }
  
  return cells;
};

/**
 * Default calendar (TIME_SLOTS mode)
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 26));
    const [selection, setSelection] = useState<CalendarSelection | undefined>(undefined);
    const cells = useSampleCells();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <RentalObjectAvailabilityCalendar
          mode="TIME_SLOTS"
          cells={cells}
          selection={selection}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onCellClick={(cell) => console.log('Cell clicked:', cell)}
          onSelectionChange={setSelection}
          title={t('storybook.rentalCalendar.selectTime')}
          subtitle={t('storybook.rentalCalendar.chooseTimeSlot')}
        />
      </Stack>
    );
  },
};

/**
 * Calendar - ALL_DAY mode
 */
export const AllDay: Story = {
  render: function Render() {
    const t = useT();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 26));
    const [selection, setSelection] = useState<CalendarSelection | undefined>(undefined);
    const cells: CalendarCell[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(2026, 0, 1 + i);
      return {
        id: `cell-${i}`,
        date: date.toISOString().split('T')[0] ?? '',
        startTime: date.toISOString(),
        endTime: date.toISOString(),
        status: i % 3 === 0 ? 'unavailable' : 'available',
      };
    });
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <RentalObjectAvailabilityCalendar
          mode="ALL_DAY"
          cells={cells}
          selection={selection}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onCellClick={(cell) => console.log('Cell clicked:', cell)}
          onSelectionChange={setSelection}
          title={t('storybook.rentalCalendar.selectDate')}
        />
      </div>
    );
  },
};

/**
 * Calendar - MULTI_DAY mode
 */
export const MultiDay: Story = {
  render: function Render() {
    const t = useT();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 26));
    const [selection, setSelection] = useState<CalendarSelection | undefined>(undefined);
    const cells: CalendarCell[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(2026, 0, 1 + i);
      return {
        id: `cell-${i}`,
        date: date.toISOString().split('T')[0] ?? '',
        startTime: date.toISOString(),
        endTime: date.toISOString(),
        status: i % 3 === 0 ? 'unavailable' : 'available',
      };
    });
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <RentalObjectAvailabilityCalendar
          mode="MULTI_DAY"
          cells={cells}
          selection={selection}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onCellClick={(cell) => console.log('Cell clicked:', cell)}
          onSelectionChange={setSelection}
          title={t('storybook.rentalCalendar.selectDateRange')}
        />
      </div>
    );
  },
};

/**
 * Calendar with legend
 */
export const WithLegend: Story = {
  render: function Render() {
    const t = useT();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 26));
    const [selection, setSelection] = useState<CalendarSelection | undefined>(undefined);
    const cells = useSampleCells();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <RentalObjectAvailabilityCalendar
          mode="TIME_SLOTS"
          cells={cells}
          selection={selection}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onCellClick={(cell) => console.log('Cell clicked:', cell)}
          onSelectionChange={setSelection}
          legend={[
            { status: 'available', label: t('storybook.rentalCalendar.available') },
            { status: 'unavailable', label: t('storybook.rentalCalendar.unavailable') },
          ]}
          title={t('storybook.rentalCalendar.selectTime')}
        />
      </div>
    );
  },
};
