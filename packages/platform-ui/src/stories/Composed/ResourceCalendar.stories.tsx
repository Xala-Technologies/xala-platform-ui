import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ResourceCalendar, type CalendarSlot, type CalendarSelection, Stack } from '../../index';

/**
 * ResourceCalendar provides a calendar for resource availability.
 *
 * ## Features
 * - Time slot selection
 * - Multiple statuses (available, reserved, booked, blocked)
 * - Price display
 * - Action buttons
 * - Date navigation
 *
 * ## When to Use
 * - Resource booking
 * - Availability calendars
 * - Time slot selection
 *
 * ## Note
 * This component uses CSS imports which violates design system rules.
 * Consider refactoring to use only design tokens.
 */
const meta: Meta<typeof ResourceCalendar> = {
  title: 'Composed/ResourceCalendar',
  component: ResourceCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ResourceCalendar provides a calendar for resource availability.

## Features
- Time slot selection
- Multiple statuses (available, reserved, booked, blocked)
- Price display
- Action buttons
- Date navigation

## When to Use
- Resource booking
- Availability calendars
- Time slot selection

## Note
This component uses CSS imports which violates design system rules.
Consider refactoring to use only design tokens.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResourceCalendar>;

// Sample calendar slots
const useSampleSlots = (): CalendarSlot[] => {
  const baseDate = new Date(2026, 0, 26);
  const slots: CalendarSlot[] = [];
  
  for (let hour = 9; hour < 17; hour++) {
    const start = new Date(baseDate);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(baseDate);
    end.setHours(hour + 1, 0, 0, 0);
    
    slots.push({
      id: `slot-${hour}`,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: hour % 3 === 0 ? 'RESERVED' : 'AVAILABLE',
      price: hour % 2 === 0 ? 500 : undefined,
      currency: 'NOK',
      availableActions: hour % 3 === 0 ? [] : ['BOOK'],
    });
  }
  
  return slots;
};

/**
 * Default resource calendar
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [selection, setSelection] = useState<CalendarSelection | undefined>(undefined);
    const slots = useSampleSlots();
    return (
      <div style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ResourceCalendar
          slots={slots}
          selection={selection}
          onSelectionChange={setSelection}
          onSlotClick={(slot) => console.log('Slot clicked:', slot)}
          onBook={(sel) => console.log('Book:', sel)}
          t={(key) => t(key)}
        />
      </Stack>
    );
  },
};

/**
 * Resource calendar with selection
 */
export const WithSelection: Story = {
  render: function Render() {
    const t = useT();
    const slots = useSampleSlots();
    const [selection, setSelection] = useState<CalendarSelection>({
      startTime: slots[0]?.startTime,
      endTime: slots[0]?.endTime,
    });
    return (
      <div style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ResourceCalendar
          slots={slots}
          selection={selection}
          onSelectionChange={setSelection}
          onSlotClick={(slot) => console.log('Slot clicked:', slot)}
          onBook={(sel) => console.log('Book:', sel)}
          t={(key) => t(key)}
        />
      </Stack>
    );
  },
};

/**
 * Resource calendar with multiple statuses
 */
export const MultipleStatuses: Story = {
  render: function Render() {
    const t = useT();
    const baseDate = new Date(2026, 0, 26);
    const slots: CalendarSlot[] = [
      {
        id: '1',
        startTime: new Date(baseDate.setHours(9, 0, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(10, 0, 0, 0)).toISOString(),
        status: 'AVAILABLE',
        price: 500,
        currency: 'NOK',
        availableActions: ['BOOK'],
      },
      {
        id: '2',
        startTime: new Date(baseDate.setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(11, 0, 0, 0)).toISOString(),
        status: 'RESERVED',
        availableActions: [],
      },
      {
        id: '3',
        startTime: new Date(baseDate.setHours(11, 0, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(12, 0, 0, 0)).toISOString(),
        status: 'BOOKED',
        availableActions: [],
      },
      {
        id: '4',
        startTime: new Date(baseDate.setHours(12, 0, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(13, 0, 0, 0)).toISOString(),
        status: 'BLOCKED',
        availableActions: [],
      },
    ];
    const [selection, setSelection] = useState<CalendarSelection | undefined>(undefined);
    return (
      <div style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <ResourceCalendar
          slots={slots}
          selection={selection}
          onSelectionChange={setSelection}
          onSlotClick={(slot) => console.log('Slot clicked:', slot)}
          onBook={(sel) => console.log('Book:', sel)}
          t={(key) => t(key)}
        />
      </Stack>
    );
  },
};
