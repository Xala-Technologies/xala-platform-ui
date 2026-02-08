import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuantitySlotCalendar } from '@xala-technologies/platform-ui-digilist';
import type { QuantitySlot } from '@xala-technologies/platform-ui-digilist';

const meta: Meta<typeof QuantitySlotCalendar> = {
  title: 'Patterns/QuantitySlotCalendar',
  component: QuantitySlotCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## QuantitySlotCalendar

Calendar with quantity-based availability per slot.
Shows how many items are available in each time slot.

### Features
- Week view with day columns
- Quantity indicators
- Sold out / limited / available states
- Optional pricing per slot
- Navigation controls

### Accessibility
- aria-pressed for selected slots
- Button roles for selectable items
- Color + text indicators
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample slots
const generateSlots = (baseDate: Date): QuantitySlot[] => {
  const slots: QuantitySlot[] = [];
  for (let d = 0; d < 7; d++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + d);
    const dateStr = date.toISOString().split('T')[0];

    // Add time slots
    for (let h = 9; h <= 17; h += 2) {
      const available = Math.floor(Math.random() * 6);
      slots.push({
        id: `${dateStr}-${h}`,
        date: dateStr,
        time: `${h.toString().padStart(2, '0')}:00`,
        totalQuantity: 5,
        availableQuantity: available,
        price: 250,
      });
    }
  }
  return slots;
};

// Interactive example
function InteractiveCalendar() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleDate, setVisibleDate] = useState(new Date());
  const slots = generateSlots(visibleDate);

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    setVisibleDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') newDate.setDate(newDate.getDate() - 7);
      else if (direction === 'next') newDate.setDate(newDate.getDate() + 7);
      else return new Date();
      return newDate;
    });
  };

  return (
    <div style={{ width: 700 }}>
      <QuantitySlotCalendar
        slots={slots}
        selectedSlotId={selectedId}
        visibleDate={visibleDate}
        onSlotSelect={(slot) => setSelectedId(slot.id)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <InteractiveCalendar />,
};

// Mix of availability
export const MixedAvailability: Story = {
  args: {
    slots: [
      { id: '1', date: '2024-09-01', time: '10:00', totalQuantity: 5, availableQuantity: 5 },
      {
        id: '2',
        date: '2024-09-01',
        time: '12:00',
        totalQuantity: 5,
        availableQuantity: 2,
        price: 250,
      },
      { id: '3', date: '2024-09-01', time: '14:00', totalQuantity: 5, availableQuantity: 0 },
      {
        id: '4',
        date: '2024-09-02',
        time: '10:00',
        totalQuantity: 3,
        availableQuantity: 1,
        price: 300,
      },
      { id: '5', date: '2024-09-02', time: '14:00', totalQuantity: 3, availableQuantity: 3 },
      { id: '6', date: '2024-09-03', time: '10:00', totalQuantity: 5, availableQuantity: 4 },
    ],
    visibleDate: new Date('2024-09-01'),
    daysToShow: 5,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

// English labels
export const EnglishLabels: Story = {
  args: {
    slots: [
      { id: '1', date: '2024-09-01', time: '09:00', totalQuantity: 4, availableQuantity: 2 },
      { id: '2', date: '2024-09-01', time: '11:00', totalQuantity: 4, availableQuantity: 0 },
      { id: '3', date: '2024-09-02', time: '09:00', totalQuantity: 4, availableQuantity: 4 },
    ],
    visibleDate: new Date('2024-09-01'),
    daysToShow: 3,
    labels: {
      title: 'Select Time',
      prev: '←',
      next: '→',
      today: 'Today',
      available: 'available',
      soldOut: 'Sold Out',
      limited: 'Limited',
      of: 'of',
      currency: '$',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
};
