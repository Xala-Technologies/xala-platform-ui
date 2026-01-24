/**
 * KeyFacts Stories
 *
 * Key facts/stats display pattern with auto-icons.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import { KeyFacts, type KeyFactItem } from '../../patterns/KeyFacts';

const meta: Meta<typeof KeyFacts> = {
  title: 'Patterns/KeyFacts',
  component: KeyFacts,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## KeyFacts

A domain-neutral component for displaying key facts/stats as horizontal badges with auto-icons.

### Features
- Auto-icon selection based on fact type
- Custom icon support
- Multiple variants (default, compact, prominent)
- Size variants (sm, md, lg)
- Overflow handling with "+X more"
- Optional labels alongside values

### Usage

\`\`\`tsx
<KeyFacts
  facts={[
    { type: 'capacity', value: '25 people' },
    { type: 'area', value: '120 m²' },
    { type: 'duration', value: '2 hours' },
  ]}
/>
\`\`\`

### Accessibility
- Semantic list structure
- Tooltips for additional context
- Clear visual hierarchy
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KeyFacts>;

// =============================================================================
// Sample Icons
// =============================================================================

const WheelchairIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="4.5" r="2.5" />
    <path d="M12 7v8" />
    <path d="M7 12h10" />
    <path d="M9 21l3-6 3 6" />
  </svg>
);

const WifiIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const roomFacts: KeyFactItem[] = [
  { type: 'capacity', value: '25 people' },
  { type: 'area', value: '120 m²' },
  { type: 'duration', value: 'Min 2 hours' },
  { type: 'price', value: '500 kr/hour' },
];

const eventFacts: KeyFactItem[] = [
  { type: 'date', value: 'Jan 15, 2024' },
  { type: 'time', value: '09:00 - 17:00' },
  { type: 'location', value: 'Conference Center' },
  { type: 'capacity', value: '100 seats' },
];

const productFacts: KeyFactItem[] = [
  { type: 'quantity', value: '5 available' },
  { type: 'price', value: '$49.99' },
  { type: 'rating', value: '4.8 (120 reviews)' },
  { type: 'status', value: 'In Stock' },
];

const bookingFacts: KeyFactItem[] = [
  { type: 'date', label: 'Date', value: 'Mon 15 Jan' },
  { type: 'time', label: 'Time', value: '09:00 - 11:00' },
  { type: 'capacity', label: 'Attendees', value: '10 people' },
  { type: 'location', label: 'Room', value: 'Meeting Room A' },
  { type: 'price', label: 'Total', value: '1,500 kr' },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    facts: roomFacts,
  },
};

export const EventDetails: Story = {
  name: 'Event Details',
  args: {
    facts: eventFacts,
  },
};

export const ProductInfo: Story = {
  name: 'Product Information',
  args: {
    facts: productFacts,
  },
};

export const WithLabels: Story = {
  name: 'With Labels',
  args: {
    facts: bookingFacts,
    showLabels: true,
  },
};

export const CompactVariant: Story = {
  name: 'Compact Variant',
  args: {
    facts: roomFacts,
    variant: 'compact',
  },
};

export const ProminentVariant: Story = {
  name: 'Prominent Variant',
  args: {
    facts: roomFacts,
    variant: 'prominent',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    facts: roomFacts,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    facts: roomFacts,
    size: 'lg',
  },
};

export const WithMaxVisible: Story = {
  name: 'With Max Visible (Overflow)',
  args: {
    facts: bookingFacts,
    maxVisible: 3,
  },
};

export const WithCustomIcons: Story = {
  name: 'With Custom Icons',
  args: {
    facts: [
      { type: 'capacity', value: '25 people' },
      { type: 'custom', value: 'Wheelchair Accessible', icon: <WheelchairIcon /> },
      { type: 'custom', value: 'Free WiFi', icon: <WifiIcon /> },
      { type: 'price', value: '500 kr/hour' },
    ],
  },
};

export const SingleFact: Story = {
  name: 'Single Fact',
  args: {
    facts: [{ type: 'capacity', value: '25 people' }],
  },
};

export const ManyFacts: Story = {
  name: 'Many Facts',
  args: {
    facts: [
      { type: 'capacity', value: '50' },
      { type: 'area', value: '200 m²' },
      { type: 'duration', value: '4 hrs' },
      { type: 'price', value: '2,000 kr' },
      { type: 'date', value: 'Jan 20' },
      { type: 'location', value: 'Building A' },
    ],
    size: 'sm',
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m²' },
      { type: 'duration', label: 'Varighet', value: 'Min 2 timer' },
      { type: 'price', label: 'Pris', value: '500 kr/time' },
    ],
    showLabels: true,
    labels: {
      moreText: '+{count} mer',
    },
  },
};

export const ResourceCard: Story = {
  name: 'Domain Example: Resource Card',
  render: () => (
    <div
      style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: 'var(--ds-spacing-2)',
          fontSize: 'var(--ds-font-size-lg)',
        }}
      >
        Conference Room Alpha
      </h3>
      <p
        style={{
          margin: 0,
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-neutral-text-subtle)',
          fontSize: 'var(--ds-font-size-sm)',
        }}
      >
        Modern meeting space with AV equipment
      </p>
      <KeyFacts
        facts={[
          { type: 'capacity', value: '20 people' },
          { type: 'area', value: '45 m²' },
          { type: 'price', value: '750 kr/hr' },
        ]}
        variant="compact"
        size="sm"
      />
    </div>
  ),
};

export const BookingSummary: Story = {
  name: 'Domain Example: Booking Summary',
  render: () => (
    <div
      style={{
        padding: 'var(--ds-spacing-5)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-accent-border-subtle)',
      }}
    >
      <h4
        style={{
          margin: 0,
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-accent-text-default)',
        }}
      >
        Booking Confirmed
      </h4>
      <KeyFacts
        facts={[
          { type: 'date', label: 'Date', value: 'Mon 15 Jan 2024' },
          { type: 'time', label: 'Time', value: '09:00 - 12:00' },
          { type: 'location', label: 'Room', value: 'Meeting Room B' },
          { type: 'capacity', label: 'Guests', value: '8 people' },
        ]}
        showLabels={true}
        variant="prominent"
      />
    </div>
  ),
};
