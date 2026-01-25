import type { Meta, StoryObj } from '@storybook/react';
import { EventScheduleCard } from '../../blocks/EventScheduleCard';
import type { EventSchedule } from '../../blocks/EventScheduleCard';

const meta: Meta<typeof EventScheduleCard> = {
    title: 'Blocks/EventScheduleCard',
    component: EventScheduleCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## EventScheduleCard

Display event schedule with recurring patterns and exceptions.
Shows dates, times, and recurrence information.

### Features
- Single event, recurring, and series types
- Time slots display
- Recurrence pattern description
- Exception count
- Compact mode

### Accessibility
- Semantic heading structure
- Icons + text (not icon-only)
        `,
            },
        },
    },
    argTypes: {
        compact: {
            control: 'boolean',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Single event
export const SingleEvent: Story = {
    args: {
        schedule: {
            type: 'single',
            startDate: '2024-09-15',
            timeSlots: [{ start: '18:00', end: '21:00' }],
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Recurring weekly
export const RecurringWeekly: Story = {
    args: {
        schedule: {
            type: 'recurring',
            startDate: '2024-09-01',
            endDate: '2024-12-15',
            recurrence: {
                pattern: 'weekly',
                days: ['monday', 'wednesday'],
            },
            timeSlots: [{ start: '18:00', end: '20:00' }],
            occurrenceCount: 28,
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Multiple time slots
export const MultipleSessions: Story = {
    args: {
        schedule: {
            type: 'recurring',
            startDate: '2024-09-01',
            endDate: '2024-11-30',
            recurrence: {
                pattern: 'weekly',
                days: ['saturday'],
            },
            timeSlots: [
                { start: '09:00', end: '10:30', label: 'Nybegynnere' },
                { start: '11:00', end: '12:30', label: 'Viderekommende' },
            ],
            occurrenceCount: 12,
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// With exceptions
export const WithExceptions: Story = {
    args: {
        schedule: {
            type: 'recurring',
            startDate: '2024-09-01',
            endDate: '2024-12-15',
            recurrence: {
                pattern: 'weekly',
                days: ['tuesday', 'thursday'],
            },
            timeSlots: [{ start: '17:00', end: '19:00' }],
            occurrenceCount: 28,
            exceptions: ['2024-09-24', '2024-10-01', '2024-12-24'],
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Compact
export const Compact: Story = {
    args: {
        schedule: {
            type: 'single',
            startDate: '2024-09-15',
            timeSlots: [{ start: '14:00', end: '16:00' }],
        },
        compact: true,
    },
    decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

// Series
export const Series: Story = {
    args: {
        schedule: {
            type: 'series',
            startDate: '2024-09-01',
            endDate: '2024-09-30',
            timeSlots: [{ start: '19:00', end: '21:00' }],
            occurrenceCount: 5,
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};
