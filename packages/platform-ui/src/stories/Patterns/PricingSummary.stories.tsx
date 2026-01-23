/**
 * PricingSummary Stories
 *
 * Component for displaying pricing breakdowns in booking/checkout flows.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { PricingSummary, type PricingSummaryProps } from '../../patterns/PricingSummary';

const meta: Meta<typeof PricingSummary> = {
  title: 'Patterns/PricingSummary',
  component: PricingSummary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PricingSummary

A pattern component for displaying pricing breakdowns in booking and checkout flows.

### Features
- Line items with labels and amounts
- Support for discounts and fees
- Total calculation
- Currency formatting
- Loading state support

### Usage

\`\`\`tsx
<PricingSummary
  lineItems={[
    { id: '1', label: 'Room booking (3 hours)', amount: 1500 },
    { id: '2', label: 'Catering service', amount: 500 },
    { id: '3', label: 'Member discount', amount: -200, isDiscount: true },
  ]}
  total={1800}
  currency="kr"
  currencyPosition="suffix"
/>
\`\`\`
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
type Story = StoryObj<typeof PricingSummary>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    lineItems: [
      { id: '1', label: 'Room booking (3 hours)', amount: 1500 },
      { id: '2', label: 'Equipment rental', amount: 300 },
      { id: '3', label: 'Service fee', amount: 100 },
    ],
    total: 1900,
    currency: 'kr',
    currencyPosition: 'suffix',
  },
};

export const WithDiscount: Story = {
  name: 'With Discount',
  args: {
    lineItems: [
      { id: '1', label: 'Conference room (full day)', amount: 5000 },
      { id: '2', label: 'Catering (25 persons)', amount: 2500 },
      { id: '3', label: 'AV Equipment', amount: 800 },
      { id: '4', label: 'Member discount (10%)', amount: -830, isDiscount: true },
    ],
    total: 7470,
    currency: 'kr',
    currencyPosition: 'suffix',
  },
};

export const SimpleBooking: Story = {
  name: 'Simple Booking',
  args: {
    lineItems: [{ id: '1', label: 'Meeting room (1 hour)', amount: 500 }],
    total: 500,
    currency: 'kr',
    currencyPosition: 'suffix',
  },
};

export const WithSubtotal: Story = {
  name: 'With Subtotal & Taxes',
  args: {
    lineItems: [
      { id: '1', label: 'Workshop space (4 hours)', amount: 3200 },
      { id: '2', label: 'Projector rental', amount: 400 },
    ],
    subtotal: 3600,
    taxes: [{ id: 'vat', label: 'MVA (25%)', amount: 900 }],
    total: 4500,
    currency: 'kr',
    currencyPosition: 'suffix',
  },
};

export const Loading: Story = {
  args: {
    lineItems: [],
    total: 0,
    isLoading: true,
    currency: 'kr',
  },
};

export const DollarCurrency: Story = {
  name: 'USD Currency (Prefix)',
  args: {
    lineItems: [
      { id: '1', label: 'Meeting room (2 hours)', amount: 150 },
      { id: '2', label: 'Refreshments', amount: 25 },
    ],
    total: 175,
    currency: '$',
    currencyPosition: 'prefix',
  },
};

export const ComprehensiveExample: Story = {
  name: 'Comprehensive Booking',
  args: {
    title: 'Booking Summary',
    lineItems: [
      { id: '1', label: 'Storsal Sentrum (Full day)', amount: 15000 },
      { id: '2', label: 'Technical equipment package', amount: 2500 },
      { id: '3', label: 'Catering - Lunch (50 guests)', amount: 7500 },
      { id: '4', label: 'Catering - Coffee breaks (2x)', amount: 2000 },
      { id: '5', label: 'Cleaning service', amount: 1500 },
      { id: '6', label: 'Early bird discount', amount: -2850, isDiscount: true },
    ],
    subtotal: 25650,
    taxes: [{ id: 'vat', label: 'MVA (25%)', amount: 6412 }],
    total: 32062,
    currency: 'kr',
    currencyPosition: 'suffix',
    showCurrencyCode: true,
  },
};
