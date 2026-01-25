import type { Meta, StoryObj } from '@storybook/react';
import { TicketRegistrationCard } from '../../blocks/TicketRegistrationCard';
import type { Registration } from '../../blocks/TicketRegistrationCard';

const meta: Meta<typeof TicketRegistrationCard> = {
    title: 'Blocks/TicketRegistrationCard',
    component: TicketRegistrationCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## TicketRegistrationCard

Display ticket/registration info for events.
Shows prices, capacity, registration status, deadlines.

### Features
- Multiple ticket prices
- Capacity bar visualization
- Registration status badges
- Deadline display
- Age restrictions
- External registration links

### Accessibility
- Semantic heading structure
- Status badges with text
- Clear action buttons
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Open with tickets
export const OpenWithTickets: Story = {
    args: {
        registration: {
            type: 'tickets',
            status: 'open',
            prices: [
                { label: 'Voksen', price: 250 },
                { label: 'Barn (6-15 år)', price: 125, description: 'Under 6 gratis' },
                { label: 'Student', price: 175 },
            ],
            capacity: { total: 100, available: 45 },
            registrationDeadline: '2024-09-01T12:00:00',
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Closing soon
export const ClosingSoon: Story = {
    args: {
        registration: {
            type: 'registration',
            status: 'closing_soon',
            capacity: { total: 30, available: 3 },
            registrationDeadline: '2024-08-25T18:00:00',
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Sold out
export const SoldOut: Story = {
    args: {
        registration: {
            type: 'tickets',
            status: 'sold_out',
            prices: [
                { label: 'Standard', price: 350 },
            ],
            capacity: { total: 50, available: 0 },
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Waitlist
export const Waitlist: Story = {
    args: {
        registration: {
            type: 'registration',
            status: 'waitlist',
            capacity: { total: 20, available: 0, waitlist: 5 },
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Free event
export const FreeEvent: Story = {
    args: {
        registration: {
            type: 'free',
            status: 'open',
            capacity: { total: 200, available: 156 },
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Upcoming
export const Upcoming: Story = {
    args: {
        registration: {
            type: 'tickets',
            status: 'upcoming',
            prices: [
                { label: 'Early Bird', price: 199 },
                { label: 'Standard', price: 299 },
            ],
            registrationOpens: '2024-08-20T10:00:00',
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// External registration
export const ExternalRegistration: Story = {
    args: {
        registration: {
            type: 'external',
            status: 'open',
            externalUrl: 'https://ticketmaster.no/event/12345',
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// With age restriction
export const WithAgeRestriction: Story = {
    args: {
        registration: {
            type: 'tickets',
            status: 'open',
            prices: [
                { label: 'Inngang', price: 450 },
            ],
            capacity: { total: 500, available: 234 },
            ageRestriction: 18,
        },
    },
    decorators: [(Story) => <div style={{ width: 350 }}><Story /></div>],
};

// Compact
export const Compact: Story = {
    args: {
        registration: {
            type: 'registration',
            status: 'open',
            capacity: { total: 25, available: 12 },
        },
        compact: true,
    },
    decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};
