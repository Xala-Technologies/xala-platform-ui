import type { Meta, StoryObj } from '@storybook/react';
import {
  AvailabilityLegend,
  defaultBookingLegendItems,
  defaultBookingLegendItemsEn,
} from '../../composed/AvailabilityLegend';

const meta: Meta<typeof AvailabilityLegend> = {
  title: 'Composed/AvailabilityLegend',
  component: AvailabilityLegend,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AvailabilityLegend

Displays a color/pattern legend for calendar slot statuses.
Used alongside SlotCalendar to explain availability indicators.

### Features
- Horizontal or vertical layout
- Size variants (sm/md)
- Pattern indicators for accessibility (not color-only)
- Norwegian and English presets included
- Interactive mode with click handler

### Accessibility
- Semantic list structure
- Color + pattern indicators
- Keyboard accessible when interactive
- Screen reader friendly labels
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default with all booking statuses (Norwegian)
export const Default: Story = {
  args: {
    items: defaultBookingLegendItems,
    layout: 'horizontal',
    size: 'md',
  },
};

// English labels
export const English: Story = {
  args: {
    items: defaultBookingLegendItemsEn,
    layout: 'horizontal',
    size: 'md',
  },
};

// Vertical layout
export const Vertical: Story = {
  args: {
    items: defaultBookingLegendItems,
    layout: 'vertical',
    size: 'md',
  },
};

// Small size
export const Small: Story = {
  args: {
    items: defaultBookingLegendItems,
    layout: 'horizontal',
    size: 'sm',
  },
};

// Minimal (just 2 statuses)
export const Minimal: Story = {
  args: {
    items: [
      {
        status: 'available',
        label: 'Ledig',
        color: 'var(--ds-color-success-base-default)',
        pattern: 'solid',
      },
      {
        status: 'booked',
        label: 'Booket',
        color: 'var(--ds-color-danger-base-default)',
        pattern: 'solid',
      },
    ],
    layout: 'horizontal',
    size: 'md',
  },
};

// Interactive (with click handler)
export const Interactive: Story = {
  args: {
    items: defaultBookingLegendItems,
    layout: 'horizontal',
    size: 'md',
    onItemClick: (status: string) => {
      // eslint-disable-next-line no-console
      console.log('Clicked status:', status);
      alert(`Clicked: ${status}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on a status to trigger an action. Useful for filtering calendar by status.',
      },
    },
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    items: [
      {
        status: 'premium',
        label: 'Premium',
        color: 'var(--ds-color-accent-base-default)',
        pattern: 'solid',
      },
      {
        status: 'standard',
        label: 'Standard',
        color: 'var(--ds-color-info-base-default)',
        pattern: 'solid',
      },
      {
        status: 'economy',
        label: 'Økonomi',
        color: 'var(--ds-color-neutral-base-default)',
        pattern: 'striped',
      },
    ],
    layout: 'horizontal',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom status colors for specialized use cases.',
      },
    },
  },
};
