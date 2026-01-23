/**
 * SlotCalendar Stories
 *
 * Calendar component for displaying and selecting time slots.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { SlotCalendar, type SlotCalendarProps } from '../../patterns/SlotCalendar';

const meta: Meta<typeof SlotCalendar> = {
  title: 'Patterns/SlotCalendar',
  component: SlotCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SlotCalendar

A calendar pattern for displaying and selecting available time slots.

### Features
- Week/day view modes
- Slot availability status (available, booked, selected)
- Multi-select support
- Time range display
- Responsive layout

### Usage

\`\`\`tsx
<SlotCalendar
  slots={[
    { id: '1', date: '2026-01-15', startTime: '09:00', endTime: '10:00', status: 'available' },
    { id: '2', date: '2026-01-15', startTime: '10:00', endTime: '11:00', status: 'booked' },
    // ...
  ]}
  selectedSlots={['1']}
  onSlotSelect={(slotId) => handleSelect(slotId)}
  onSlotDeselect={(slotId) => handleDeselect(slotId)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SlotCalendar>;

// Generate sample slots for a week
const generateWeekSlots = () => {
  const slots = [];
  const baseDate = new Date('2026-01-20');
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const statuses = [
    'available',
    'available',
    'booked',
    'available',
    'available',
    'booked',
    'available',
    'available',
  ];

  for (let day = 0; day < 7; day++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];

    times.forEach((time, i) => {
      const endHour = parseInt(time.split(':')[0]) + 1;
      slots.push({
        id: `${dateStr}-${time}`,
        date: dateStr,
        startTime: time,
        endTime: `${endHour.toString().padStart(2, '0')}:00`,
        status: statuses[(day + i) % statuses.length] as 'available' | 'booked',
      });
    });
  }

  return slots;
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    slots: generateWeekSlots(),
    selectedSlots: [],
    view: 'week',
    onSlotSelect: (slotId) => console.log('Selected:', slotId),
    onSlotDeselect: (slotId) => console.log('Deselected:', slotId),
  },
};

export const WithSelection: Story = {
  name: 'With Selected Slots',
  args: {
    slots: generateWeekSlots(),
    selectedSlots: ['2026-01-20-10:00', '2026-01-20-11:00'],
    view: 'week',
    onSlotSelect: (slotId) => console.log('Selected:', slotId),
    onSlotDeselect: (slotId) => console.log('Deselected:', slotId),
  },
};

export const DayView: Story = {
  name: 'Day View',
  args: {
    slots: generateWeekSlots().filter((s) => s.date === '2026-01-20'),
    selectedSlots: [],
    view: 'day',
    currentDate: '2026-01-20',
    onSlotSelect: (slotId) => console.log('Selected:', slotId),
    onSlotDeselect: (slotId) => console.log('Deselected:', slotId),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    slots: [],
    selectedSlots: [],
    isLoading: true,
    view: 'week',
  },
};

export const NoAvailability: Story = {
  name: 'No Available Slots',
  args: {
    slots: generateWeekSlots().map((s) => ({ ...s, status: 'booked' as const })),
    selectedSlots: [],
    view: 'week',
    emptyMessage: 'No available slots this week. Try selecting another date.',
  },
};

export const WithPricing: Story = {
  name: 'With Slot Pricing',
  args: {
    slots: generateWeekSlots().map((s) => ({
      ...s,
      price: s.status === 'available' ? (Math.random() > 0.5 ? 500 : 750) : undefined,
    })),
    selectedSlots: [],
    view: 'week',
    showPrices: true,
    currency: 'kr',
    onSlotSelect: (slotId) => console.log('Selected:', slotId),
    onSlotDeselect: (slotId) => console.log('Deselected:', slotId),
  },
};

export const MultiSelect: Story = {
  name: 'Multi-Select Mode',
  args: {
    slots: generateWeekSlots(),
    selectedSlots: ['2026-01-21-09:00', '2026-01-21-10:00', '2026-01-21-11:00'],
    view: 'week',
    allowMultiSelect: true,
    maxSelections: 5,
    onSlotSelect: (slotId) => console.log('Selected:', slotId),
    onSlotDeselect: (slotId) => console.log('Deselected:', slotId),
  },
};
