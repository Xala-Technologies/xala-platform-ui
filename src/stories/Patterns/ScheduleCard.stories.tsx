/**
 * ScheduleCard Stories
 *
 * Schedule display component for showing time-based entries.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ScheduleCard, type ScheduleCardProps } from '@xala-technologies/platform-ui-digilist';
import type { ScheduleEntry } from '../../patterns/types';

const meta: Meta<typeof ScheduleCard> = {
  title: 'Patterns/ScheduleCard',
  component: ScheduleCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ScheduleCard

A generic schedule display component for showing time-based entries like operating hours.

### Features
- Day and hours display
- Current day highlighting (isToday)
- Closed/unavailable visual state
- Optional title
- Empty state support

### Usage

\`\`\`tsx
<ScheduleCard
  title="Opening Hours"
  entries={[
    { day: 'Monday', hours: '09:00 - 17:00' },
    { day: 'Tuesday', hours: '09:00 - 17:00', isToday: true },
    { day: 'Wednesday', hours: '09:00 - 17:00' },
    { day: 'Saturday', hours: 'Closed', isClosed: true },
    { day: 'Sunday', hours: 'Closed', isClosed: true },
  ]}
/>
\`\`\`

### Accessibility
- Semantic markup with proper heading levels
- Visual distinction for current day and closed states
- Color contrast meets WCAG standards
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleCard>;

// =============================================================================
// Sample Data
// =============================================================================

const standardWeek: ScheduleEntry[] = [
  { day: 'Monday', hours: '08:00 - 17:00' },
  { day: 'Tuesday', hours: '08:00 - 17:00' },
  { day: 'Wednesday', hours: '08:00 - 17:00' },
  { day: 'Thursday', hours: '08:00 - 17:00' },
  { day: 'Friday', hours: '08:00 - 17:00' },
  { day: 'Saturday', hours: '10:00 - 14:00' },
  { day: 'Sunday', hours: 'Closed', isClosed: true },
];

const standardWeekWithToday: ScheduleEntry[] = [
  { day: 'Monday', hours: '08:00 - 17:00' },
  { day: 'Tuesday', hours: '08:00 - 17:00' },
  { day: 'Wednesday', hours: '08:00 - 17:00', isToday: true },
  { day: 'Thursday', hours: '08:00 - 17:00' },
  { day: 'Friday', hours: '08:00 - 17:00' },
  { day: 'Saturday', hours: '10:00 - 14:00' },
  { day: 'Sunday', hours: 'Closed', isClosed: true },
];

const retailHours: ScheduleEntry[] = [
  { day: 'Monday', hours: '10:00 - 20:00' },
  { day: 'Tuesday', hours: '10:00 - 20:00' },
  { day: 'Wednesday', hours: '10:00 - 20:00' },
  { day: 'Thursday', hours: '10:00 - 21:00' },
  { day: 'Friday', hours: '10:00 - 21:00', isToday: true },
  { day: 'Saturday', hours: '10:00 - 18:00' },
  { day: 'Sunday', hours: '12:00 - 17:00' },
];

const serviceHours: ScheduleEntry[] = [
  { day: 'Monday - Friday', hours: '09:00 - 16:00' },
  { day: 'Saturday', hours: '10:00 - 14:00' },
  { day: 'Sunday', hours: 'Closed', isClosed: true },
];

const norwegianWeek: ScheduleEntry[] = [
  { day: 'Mandag', hours: '08:00 - 17:00' },
  { day: 'Tirsdag', hours: '08:00 - 17:00', isToday: true },
  { day: 'Onsdag', hours: '08:00 - 17:00' },
  { day: 'Torsdag', hours: '08:00 - 17:00' },
  { day: 'Fredag', hours: '08:00 - 16:00' },
  { day: 'Lørdag', hours: '10:00 - 14:00' },
  { day: 'Søndag', hours: 'Stengt', isClosed: true },
];

const flexibleAvailability: ScheduleEntry[] = [
  { day: 'Morning (06:00-12:00)', hours: 'Available' },
  { day: 'Afternoon (12:00-18:00)', hours: 'Booked', isClosed: true },
  { day: 'Evening (18:00-22:00)', hours: 'Available' },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    entries: standardWeek,
  },
};

export const WithTitle: Story = {
  name: 'With Title',
  args: {
    title: 'Opening Hours',
    entries: standardWeek,
  },
};

export const TodayHighlighted: Story = {
  name: 'Today Highlighted',
  args: {
    title: 'Opening Hours',
    entries: standardWeekWithToday,
  },
};

export const RetailStore: Story = {
  name: 'Domain Example: Retail Store',
  args: {
    title: 'Store Hours',
    entries: retailHours,
  },
};

export const ServiceCenter: Story = {
  name: 'Domain Example: Service Center',
  args: {
    title: 'Customer Service',
    entries: serviceHours,
  },
};

export const NorwegianLanguage: Story = {
  name: 'Norwegian Language (i18n)',
  args: {
    title: 'Åpningstider',
    entries: norwegianWeek,
    emptyText: 'Ingen timeplan tilgjengelig',
  },
};

export const FlexibleSchedule: Story = {
  name: 'Flexible Time Blocks',
  args: {
    title: 'Availability Today',
    entries: flexibleAvailability,
  },
};

export const AllClosed: Story = {
  name: 'All Closed',
  args: {
    title: 'Holiday Schedule',
    entries: [
      { day: 'Dec 24', hours: 'Closed', isClosed: true },
      { day: 'Dec 25', hours: 'Closed', isClosed: true },
      { day: 'Dec 26', hours: 'Closed', isClosed: true },
      { day: 'Dec 31', hours: '10:00 - 14:00' },
      { day: 'Jan 1', hours: 'Closed', isClosed: true },
    ],
  },
};

export const SingleEntry: Story = {
  name: 'Single Entry',
  args: {
    title: 'Today',
    entries: [{ day: 'Wednesday', hours: '08:00 - 17:00', isToday: true }],
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    entries: [],
    emptyText: 'No schedule available',
  },
};

export const CustomEmptyText: Story = {
  name: 'Custom Empty Text',
  args: {
    title: 'Availability',
    entries: [],
    emptyText: 'Contact us for availability information',
  },
};

export const LongHours: Story = {
  name: '24/7 Operation',
  args: {
    title: 'Access Hours',
    entries: [
      { day: 'Monday', hours: '24 hours' },
      { day: 'Tuesday', hours: '24 hours' },
      { day: 'Wednesday', hours: '24 hours', isToday: true },
      { day: 'Thursday', hours: '24 hours' },
      { day: 'Friday', hours: '24 hours' },
      { day: 'Saturday', hours: '24 hours' },
      { day: 'Sunday', hours: '24 hours' },
    ],
  },
};

export const MixedAvailability: Story = {
  name: 'Mixed Availability Status',
  args: {
    title: 'Resource Availability',
    entries: [
      { day: 'Room A', hours: 'Available' },
      { day: 'Room B', hours: 'Booked until 14:00', isClosed: true },
      { day: 'Room C', hours: 'Available', isToday: true },
      { day: 'Room D', hours: 'Under maintenance', isClosed: true },
      { day: 'Room E', hours: 'Available' },
    ],
  },
};

export const CompactList: Story = {
  name: 'Compact (3 Days)',
  args: {
    title: 'This Week',
    entries: [
      { day: 'Today', hours: '09:00 - 17:00', isToday: true },
      { day: 'Tomorrow', hours: '09:00 - 17:00' },
      { day: 'Day After', hours: '09:00 - 15:00' },
    ],
  },
};

export const MultipleSchedules: Story = {
  name: 'Multiple Schedules Comparison',
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ScheduleCard
          title="Main Office"
          entries={[
            { day: 'Mon - Fri', hours: '08:00 - 17:00' },
            { day: 'Weekend', hours: 'Closed', isClosed: true },
          ]}
        />
        <ScheduleCard
          title="Support Line"
          entries={[
            { day: 'Mon - Fri', hours: '09:00 - 20:00' },
            { day: 'Sat - Sun', hours: '10:00 - 16:00' },
          ]}
        />
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
