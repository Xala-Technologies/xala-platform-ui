import type { Meta, StoryObj } from '@storybook/react';
import { ReturnPolicyCard } from '../../blocks/ReturnPolicyCard';
import type { ReturnPolicy } from '../../blocks/ReturnPolicyCard';

const meta: Meta<typeof ReturnPolicyCard> = {
    title: 'Blocks/ReturnPolicyCard',
    component: ReturnPolicyCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## ReturnPolicyCard

Display return/cancellation policy for rentals and bookings.
Shows deadline, refund terms, and conditions.

### Features
- Policy type badge (flexible/moderate/strict/custom)
- Cancellation deadline display
- Refund percentage
- Conditions list
- Compact mode

### Accessibility
- Semantic heading structure
- List for conditions
- Descriptive text
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

// Flexible policy
export const FlexiblePolicy: Story = {
    args: {
        policy: {
            type: 'flexible',
            cancellationDeadline: 24,
            refundPercent: 100,
            lateRefundPercent: 50,
            conditions: [
                'Gratis avbestilling opptil 24 timer før',
                '50% refusjon ved senere avbestilling',
                'Ingen refusjon ved uteblivelse',
            ],
        },
    },
    decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

// Moderate policy
export const ModeratePolicy: Story = {
    args: {
        policy: {
            type: 'moderate',
            cancellationDeadline: 48,
            refundPercent: 100,
            lateRefundPercent: 0,
            conditions: [
                'Gratis avbestilling opptil 48 timer før',
                'Ingen refusjon ved sen avbestilling',
            ],
        },
    },
    decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

// Strict policy
export const StrictPolicy: Story = {
    args: {
        policy: {
            type: 'strict',
            cancellationDeadline: 168, // 7 days
            refundPercent: 50,
            lateRefundPercent: 0,
            conditions: [
                '50% refusjon ved avbestilling 7 dager før',
                'Ingen refusjon etter dette',
                'Forsikring anbefales',
            ],
        },
    },
    decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

// Custom policy
export const CustomPolicy: Story = {
    args: {
        policy: {
            type: 'custom',
            customDescription: 'Kontakt oss for avbestillingsvilkår. Spesielle betingelser gjelder for helger og helligdager.',
            conditions: [
                'Sesongbaserte avbestillingsregler',
                'Depositum kr 1000 refunderes ikke',
            ],
        },
    },
    decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

// Compact mode
export const Compact: Story = {
    args: {
        policy: {
            type: 'flexible',
            cancellationDeadline: 24,
            refundPercent: 100,
        },
        compact: true,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// English labels
export const EnglishLabels: Story = {
    args: {
        policy: {
            type: 'moderate',
            cancellationDeadline: 48,
            refundPercent: 100,
            lateRefundPercent: 0,
            conditions: [
                'Free cancellation up to 48 hours before',
                'No refund for late cancellation',
            ],
        },
        labels: {
            title: 'Cancellation Policy',
            flexible: 'Flexible',
            moderate: 'Moderate',
            strict: 'Strict',
            custom: 'Custom',
            cancellationDeadline: 'Cancellation Deadline',
            refund: 'Refund',
            lateRefund: 'Late Cancellation',
            conditions: 'Terms',
            hoursBeforeStart: 'hours before start',
            refundText: '% refund',
            noRefund: 'No refund',
        },
    },
    decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

// Minimal
export const Minimal: Story = {
    args: {
        policy: {
            type: 'flexible',
            cancellationDeadline: 24,
            refundPercent: 100,
        },
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
