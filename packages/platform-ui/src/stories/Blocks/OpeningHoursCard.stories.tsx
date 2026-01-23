import type { Meta, StoryObj } from '@storybook/react';
import { OpeningHoursCard } from '../../blocks/OpeningHoursCard';

const meta: Meta<typeof OpeningHoursCard> = {
  title: 'Blocks/OpeningHoursCard',
  component: OpeningHoursCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## OpeningHoursCard

Card displaying opening hours in a table format. Supports highlighting the current day.

### Features
- Day-by-day opening hours display
- Current day highlighting
- Closed day indication
- Norwegian day names support
- Clean table layout

### Usage
\`\`\`tsx
<OpeningHoursCard
  hours={[
    { day: 'Mandag-Fredag', hours: '08:00 - 22:00' },
    { day: 'Lørdag', hours: '09:00 - 20:00' },
    { day: 'Søndag', hours: '10:00 - 18:00' },
  ]}
  highlightToday
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    highlightToday: {
      control: 'boolean',
      description: "Highlight today's row",
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard opening hours
export const Default: Story = {
  args: {
    hours: [
      { day: 'Mandag-Fredag', hours: '08:00 - 22:00' },
      { day: 'Lørdag', hours: '09:00 - 20:00' },
      { day: 'Søndag', hours: '10:00 - 18:00' },
    ],
    title: 'Åpningstider',
    highlightToday: true,
  },
};

// All days
export const AllDays: Story = {
  args: {
    hours: [
      { day: 'Mandag', hours: '08:00 - 20:00' },
      { day: 'Tirsdag', hours: '08:00 - 20:00' },
      { day: 'Onsdag', hours: '08:00 - 20:00' },
      { day: 'Torsdag', hours: '08:00 - 20:00' },
      { day: 'Fredag', hours: '08:00 - 20:00' },
      { day: 'Lørdag', hours: '10:00 - 18:00' },
      { day: 'Søndag', hours: 'Stengt' },
    ],
    title: 'Åpningstider',
    highlightToday: true,
  },
};

// With closed days
export const WithClosedDays: Story = {
  args: {
    hours: [
      { day: 'Mandag-Fredag', hours: '08:00 - 22:00' },
      { day: 'Lørdag', hours: '09:00 - 20:00' },
      { day: 'Søndag', hours: 'Stengt', isClosed: true },
    ],
    title: 'Åpningstider',
    highlightToday: true,
  },
};

// Without highlighting
export const WithoutHighlighting: Story = {
  args: {
    hours: [
      { day: 'Mandag-Fredag', hours: '08:00 - 22:00' },
      { day: 'Lørdag', hours: '09:00 - 20:00' },
      { day: 'Søndag', hours: '10:00 - 18:00' },
    ],
    title: 'Åpningstider',
    highlightToday: false,
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    hours: [
      { day: 'Mandag-Fredag', hours: '08:00 - 22:00' },
      { day: 'Lørdag', hours: '09:00 - 20:00' },
      { day: 'Søndag', hours: '10:00 - 18:00' },
    ],
    highlightToday: true,
  },
};

// Extended hours
export const ExtendedHours: Story = {
  args: {
    hours: [
      { day: 'Mandag', hours: '06:00 - 23:00' },
      { day: 'Tirsdag', hours: '06:00 - 23:00' },
      { day: 'Onsdag', hours: '06:00 - 23:00' },
      { day: 'Torsdag', hours: '06:00 - 23:00' },
      { day: 'Fredag', hours: '06:00 - 01:00' },
      { day: 'Lørdag', hours: '08:00 - 01:00' },
      { day: 'Søndag', hours: '10:00 - 22:00' },
    ],
    title: 'Åpningstider',
    highlightToday: true,
  },
};
