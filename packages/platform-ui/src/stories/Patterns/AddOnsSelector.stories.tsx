/**
 * AddOnsSelector Stories
 *
 * Pattern for selecting optional add-ons with quantity controls.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  AddOnsSelector,
  type AddOnsSelectorProps,
  type AddOnItem,
  type SelectedAddOn,
} from '../../patterns/AddOnsSelector';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof AddOnsSelector> = {
  title: 'Patterns/AddOnsSelector',
  component: AddOnsSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AddOnsSelector

A domain-neutral pattern for selecting optional add-ons with quantity controls.

### Features
- Checkbox selection with quantity controls
- Category grouping
- Price display with unit labels
- Required/approval badges
- Total calculation
- Size variants

### Usage

\`\`\`tsx
<AddOnsSelector
  addOns={[
    { id: '1', name: 'Projector', price: 500, unit: 'per_booking' },
    { id: '2', name: 'Catering', price: 150, unit: 'per_person', maxQuantity: 50 },
  ]}
  selectedAddOns={selectedAddOns}
  onChange={setSelectedAddOns}
  formatPrice={(price) => \`\${price} kr\`}
/>
\`\`\`

### Accessibility
- Checkboxes have aria-labels
- Quantity buttons have accessible labels
- Keyboard navigable
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddOnsSelector>;

// =============================================================================
// Sample Icons
// =============================================================================

const ProjectorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="6" cy="12" r="2" />
    <line x1="10" y1="12" x2="18" y2="12" />
  </svg>
);

const UtensilsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const ChairIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
    <path d="M5 18v2" />
    <path d="M19 18v2" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const bookingAddOns: AddOnItem[] = [
  {
    id: '1',
    name: 'Projector & Screen',
    description: 'Full HD projector with 100" screen',
    price: 500,
    unit: 'per_booking',
    icon: <ProjectorIcon />,
  },
  {
    id: '2',
    name: 'Video Conferencing',
    description: 'Zoom/Teams ready setup',
    price: 300,
    unit: 'per_booking',
  },
  {
    id: '3',
    name: 'Catering - Coffee Service',
    description: 'Coffee, tea, and pastries',
    price: 75,
    unit: 'per_person',
    maxQuantity: 50,
    category: 'Catering',
    icon: <UtensilsIcon />,
  },
  {
    id: '4',
    name: 'Catering - Lunch',
    description: 'Full lunch buffet',
    price: 250,
    unit: 'per_person',
    maxQuantity: 50,
    category: 'Catering',
    icon: <UtensilsIcon />,
  },
  {
    id: '5',
    name: 'Extra Chairs',
    price: 25,
    unit: 'per_unit',
    maxQuantity: 20,
    category: 'Furniture',
    icon: <ChairIcon />,
  },
];

const subscriptionAddOns: AddOnItem[] = [
  {
    id: 'storage',
    name: 'Extra Storage',
    description: '100GB additional cloud storage',
    price: 99,
    unit: 'per_booking',
    maxQuantity: 10,
  },
  {
    id: 'users',
    name: 'Additional Users',
    description: 'Add team members to your plan',
    price: 49,
    unit: 'per_unit',
    maxQuantity: 50,
  },
  {
    id: 'support',
    name: 'Priority Support',
    description: '24/7 phone and chat support',
    price: 199,
    unit: 'per_booking',
    isRequired: false,
  },
  {
    id: 'api',
    name: 'API Access',
    description: 'Full REST API access',
    price: 299,
    unit: 'per_booking',
    requiresApproval: true,
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    addOns: bookingAddOns.slice(0, 3),
    selectedAddOns: [],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
  },
};

export const WithSelection: Story = {
  name: 'With Pre-selected Items',
  args: {
    addOns: bookingAddOns.slice(0, 3),
    selectedAddOns: [
      { addOnId: '1', quantity: 1 },
      { addOnId: '3', quantity: 10 },
    ],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
  },
};

export const WithCategories: Story = {
  name: 'With Categories',
  args: {
    addOns: bookingAddOns,
    selectedAddOns: [],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
    groupByCategory: true,
  },
};

export const WithoutCategories: Story = {
  name: 'Without Category Grouping',
  args: {
    addOns: bookingAddOns,
    selectedAddOns: [],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
    groupByCategory: false,
  },
};

export const SubscriptionAddOns: Story = {
  name: 'Domain Example: Subscription Add-ons',
  args: {
    addOns: subscriptionAddOns,
    selectedAddOns: [{ addOnId: 'storage', quantity: 2 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `$${price}/mo`,
    labels: {
      title: 'Plan Add-ons',
      selectedCount: '{count} add-ons',
      totalLabel: 'Monthly total',
    },
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    addOns: bookingAddOns.slice(0, 3),
    selectedAddOns: [{ addOnId: '1', quantity: 1 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    addOns: bookingAddOns.slice(0, 3),
    selectedAddOns: [{ addOnId: '1', quantity: 1 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
    size: 'lg',
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    addOns: bookingAddOns.slice(0, 3),
    selectedAddOns: [{ addOnId: '1', quantity: 1 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
    disabled: true,
  },
};

export const WithoutTotal: Story = {
  name: 'Without Total Section',
  args: {
    addOns: bookingAddOns.slice(0, 3),
    selectedAddOns: [{ addOnId: '1', quantity: 1 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price} kr`,
    showTotal: false,
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    addOns: [
      {
        id: '1',
        name: 'Projektor',
        description: 'Full HD projektor med lerret',
        price: 500,
        unit: 'per_booking',
      },
      {
        id: '2',
        name: 'Kaffe-service',
        description: 'Kaffe, te og wienerbrød',
        price: 75,
        unit: 'per_person',
        maxQuantity: 50,
      },
    ],
    selectedAddOns: [{ addOnId: '2', quantity: 15 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `${price.toLocaleString('nb-NO')} kr`,
    labels: {
      title: 'Tilleggstjenester',
      selectedCount: '{count} valgt',
      quantity: 'Antall',
      totalLabel: 'Tillegg totalt',
      unitPerBooking: '/bestilling',
      unitPerPerson: '/person',
    },
  },
};

export const RequiredAndApproval: Story = {
  name: 'With Required & Approval Badges',
  args: {
    addOns: [
      {
        id: '1',
        name: 'Basic Setup Fee',
        description: 'One-time setup and configuration',
        price: 500,
        unit: 'per_booking',
        isRequired: true,
      },
      {
        id: '2',
        name: 'Custom Integration',
        description: 'Connect with your existing systems',
        price: 2000,
        unit: 'per_booking',
        requiresApproval: true,
      },
      {
        id: '3',
        name: 'Training Session',
        description: '2-hour training for your team',
        price: 1500,
        unit: 'per_booking',
      },
    ],
    selectedAddOns: [{ addOnId: '1', quantity: 1 }],
    onChange: (selected) => console.log('Selected:', selected),
    formatPrice: (price) => `$${price}`,
    labels: {
      required: 'Required',
      requiresApproval: 'Needs approval',
    },
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: function Render() {
    const [selectedAddOns, setSelectedAddOns] = React.useState<SelectedAddOn[]>([]);

    const addOns: AddOnItem[] = [
      {
        id: 'av',
        name: 'AV Equipment',
        description: 'Projector, screen, and sound system',
        price: 750,
        unit: 'per_booking',
        icon: <ProjectorIcon />,
      },
      {
        id: 'coffee',
        name: 'Coffee Service',
        description: 'Unlimited coffee and tea',
        price: 50,
        unit: 'per_person',
        maxQuantity: 30,
        icon: <UtensilsIcon />,
      },
      {
        id: 'lunch',
        name: 'Lunch Buffet',
        description: 'Full lunch with vegetarian options',
        price: 175,
        unit: 'per_person',
        maxQuantity: 30,
        icon: <UtensilsIcon />,
      },
      {
        id: 'chairs',
        name: 'Extra Seating',
        description: 'Additional chairs',
        price: 25,
        unit: 'per_unit',
        maxQuantity: 20,
        icon: <ChairIcon />,
      },
    ];

    const calculateTotal = () => {
      return selectedAddOns.reduce((total, selected) => {
        const addOn = addOns.find((a) => a.id === selected.addOnId);
        if (!addOn) return total;
        return total + addOn.price * selected.quantity;
      }, 0);
    };

    return (
      <div>
        <AddOnsSelector
          addOns={addOns}
          selectedAddOns={selectedAddOns}
          onChange={setSelectedAddOns}
          formatPrice={(price) => `${price.toLocaleString()} kr`}
          labels={{
            title: 'Meeting Room Extras',
          }}
        />

        {selectedAddOns.length > 0 && (
          <div
            style={{
              marginTop: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              <strong>Your selections:</strong>
            </Paragraph>
            {selectedAddOns.map((s) => {
              const addOn = addOns.find((a) => a.id === s.addOnId);
              return (
                <Paragraph key={s.addOnId} data-size="sm" style={{ margin: 0 }}>
                  {addOn?.name} x {s.quantity} ={' '}
                  {((addOn?.price || 0) * s.quantity).toLocaleString()} kr
                </Paragraph>
              );
            })}
            <Paragraph
              data-size="sm"
              style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', fontWeight: 'bold' }}
            >
              Grand Total: {calculateTotal().toLocaleString()} kr
            </Paragraph>
          </div>
        )}
      </div>
    );
  },
};
