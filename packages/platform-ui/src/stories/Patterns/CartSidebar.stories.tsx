/**
 * CartSidebar Stories
 *
 * Sidebar component for displaying selected items with pricing.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  CartSidebar,
  type CartSidebarProps,
  type CartItem,
  type CartSummary,
} from '../../patterns/CartSidebar';
import { Paragraph, Alert } from '@digdir/designsystemet-react';

const meta: Meta<typeof CartSidebar> = {
  title: 'Patterns/CartSidebar',
  component: CartSidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CartSidebar

A domain-neutral sidebar component for displaying selected items with pricing.
Useful for booking carts, shopping carts, selection summaries, etc.

### Features
- Configurable item list with removal
- Price breakdown with tax
- Checkout/continue action
- Empty state
- Compact variant
- Currency formatting

### Usage

\`\`\`tsx
<CartSidebar
  items={[
    { id: '1', title: 'Meeting Room A', subtitle: 'Mon, Jan 15 • 09:00-11:00', price: 500 },
  ]}
  summary={{
    subtotal: 500,
    tax: 125,
    taxLabel: 'VAT (25%)',
    total: 625,
  }}
  onRemoveItem={(id) => handleRemove(id)}
  onCheckout={() => handleCheckout()}
/>
\`\`\`

### Accessibility
- Keyboard navigable
- Remove buttons have aria-labels
- Price values properly formatted
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '360px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CartSidebar>;

// =============================================================================
// Sample Icons
// =============================================================================

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const bookingItems: CartItem[] = [
  {
    id: '1',
    title: 'Meeting Room A',
    subtitle: 'Mon, Jan 15 • 09:00-11:00',
    price: 500,
    icon: <CalendarIcon />,
  },
  {
    id: '2',
    title: 'Meeting Room A',
    subtitle: 'Tue, Jan 16 • 14:00-16:00',
    price: 500,
    icon: <CalendarIcon />,
  },
  {
    id: '3',
    title: 'Conference Hall',
    subtitle: 'Wed, Jan 17 • 10:00-12:00',
    price: 1200,
    icon: <CalendarIcon />,
  },
];

const bookingSummary: CartSummary = {
  subtotal: 2200,
  tax: 550,
  taxLabel: 'VAT (25%)',
  total: 2750,
};

const productItems: CartItem[] = [
  {
    id: 'prod-1',
    title: 'Ergonomic Office Chair',
    subtitle: 'Black, Mesh Back',
    price: 4999,
    quantity: 1,
    icon: <BoxIcon />,
  },
  {
    id: 'prod-2',
    title: 'Standing Desk Frame',
    subtitle: 'White, Electric',
    price: 7999,
    quantity: 1,
    icon: <BoxIcon />,
  },
];

const productSummary: CartSummary = {
  subtotal: 12998,
  breakdownLines: [
    { label: 'Discount (10%)', amount: -1300, isDiscount: true },
    { label: 'Shipping', amount: 0, formattedAmount: 'Free' },
  ],
  tax: 2924,
  taxLabel: 'VAT (25%)',
  total: 14622,
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    items: bookingItems,
    summary: bookingSummary,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    items: [],
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: [bookingItems[0]],
    summary: {
      subtotal: 500,
      tax: 125,
      taxLabel: 'VAT (25%)',
      total: 625,
    },
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const ManyItems: Story = {
  name: 'Many Items',
  decorators: [
    (Story) => (
      <div style={{ width: '360px', height: '700px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      ...bookingItems,
      {
        id: '4',
        title: 'Small Meeting Room',
        subtitle: 'Thu, Jan 18 • 08:00-09:00',
        price: 250,
        icon: <CalendarIcon />,
      },
      {
        id: '5',
        title: 'Training Room',
        subtitle: 'Fri, Jan 19 • 13:00-17:00',
        price: 1600,
        icon: <CalendarIcon />,
      },
    ],
    summary: {
      subtotal: 4050,
      tax: 1012,
      taxLabel: 'VAT (25%)',
      total: 5062,
    },
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const CompactVariant: Story = {
  name: 'Compact Variant',
  args: {
    items: bookingItems.slice(0, 2),
    summary: {
      subtotal: 1000,
      tax: 250,
      taxLabel: 'VAT (25%)',
      total: 1250,
    },
    variant: 'compact',
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const WithoutRemove: Story = {
  name: 'Without Remove Option',
  args: {
    items: bookingItems.map((item) => ({ ...item, removable: false })),
    summary: bookingSummary,
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const WithoutCheckout: Story = {
  name: 'Without Checkout Button',
  args: {
    items: bookingItems,
    summary: bookingSummary,
    onRemoveItem: (id) => console.log('Remove:', id),
  },
};

export const CheckoutDisabled: Story = {
  name: 'Checkout Disabled',
  args: {
    items: bookingItems,
    summary: bookingSummary,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    checkoutDisabled: true,
  },
};

export const CheckoutLoading: Story = {
  name: 'Checkout Loading',
  args: {
    items: bookingItems,
    summary: bookingSummary,
    onCheckout: () => console.log('Checkout clicked'),
    checkoutLoading: true,
  },
};

export const WithBreakdownLines: Story = {
  name: 'With Breakdown Lines',
  args: {
    items: productItems,
    summary: productSummary,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    labels: {
      title: 'Your Cart',
      checkout: 'Proceed to Payment',
    },
  },
};

export const WithQuantities: Story = {
  name: 'With Quantities',
  args: {
    items: [
      { id: '1', title: 'Basic License', price: 299, quantity: 5 },
      { id: '2', title: 'Premium Add-on', price: 99, quantity: 3 },
    ],
    summary: {
      subtotal: 1792,
      tax: 448,
      taxLabel: 'VAT (25%)',
      total: 2240,
    },
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    labels: {
      title: 'Order Summary',
      checkout: 'Complete Purchase',
    },
  },
};

export const WithMetadata: Story = {
  name: 'With Item Metadata',
  args: {
    items: [
      {
        id: '1',
        title: 'Conference Hall A',
        subtitle: 'Mon, Jan 15 • 09:00-17:00',
        description: 'Full-day booking with catering',
        price: 5000,
        icon: <CalendarIcon />,
        metadata: [
          { label: 'Capacity', value: '50 people' },
          { label: 'Setup', value: 'Theater style' },
        ],
      },
    ],
    summary: {
      subtotal: 5000,
      breakdownLines: [{ label: 'Catering package', amount: 1500 }],
      tax: 1625,
      taxLabel: 'VAT (25%)',
      total: 8125,
    },
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const CustomCurrency: Story = {
  name: 'Custom Currency Format',
  args: {
    items: [
      { id: '1', title: 'Premium Subscription', subtitle: 'Annual', price: 9900 },
      { id: '2', title: 'Storage Add-on', subtitle: '100GB', price: 2400 },
    ],
    summary: {
      subtotal: 12300,
      tax: 2460,
      taxLabel: 'Tax (20%)',
      total: 14760,
    },
    formatCurrency: (amount) => `$${(amount / 100).toFixed(2)}`,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    items: [
      {
        id: '1',
        title: 'Møterom A',
        subtitle: 'Man 15. jan • 09:00-11:00',
        price: 500,
        icon: <CalendarIcon />,
      },
      {
        id: '2',
        title: 'Møterom A',
        subtitle: 'Tir 16. jan • 14:00-16:00',
        price: 500,
        icon: <CalendarIcon />,
      },
    ],
    summary: {
      subtotal: 1000,
      tax: 250,
      taxLabel: 'MVA (25%)',
      total: 1250,
    },
    formatCurrency: (amount) => `${amount.toLocaleString('nb-NO')} kr`,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    labels: {
      title: 'Din bestilling',
      emptyTitle: 'Ingen rom valgt',
      emptyDescription: 'Velg tidspunkter i kalenderen for å legge til rom',
      subtotalLabel: 'Delsum',
      totalLabel: 'Totalt',
      checkout: 'Fortsett til betaling',
      removeItem: 'Fjern {item}',
      itemCount: '{count} elementer',
    },
  },
};

export const BookingCart: Story = {
  name: 'Domain Example: Booking Cart',
  args: {
    items: bookingItems,
    summary: bookingSummary,
    formatCurrency: (amount) => `${amount.toLocaleString('nb-NO')} kr`,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    labels: {
      title: 'Selected Time Slots',
      checkout: 'Continue to booking details',
    },
  },
};

export const ShoppingCart: Story = {
  name: 'Domain Example: Shopping Cart',
  args: {
    items: productItems,
    summary: productSummary,
    formatCurrency: (amount) => `${amount.toLocaleString('nb-NO')} kr`,
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    labels: {
      title: 'Shopping Cart',
      checkout: 'Proceed to Checkout',
    },
  },
};

export const WithFooterContent: Story = {
  name: 'With Footer Content',
  args: {
    items: bookingItems.slice(0, 2),
    summary: {
      subtotal: 1000,
      tax: 250,
      taxLabel: 'VAT (25%)',
      total: 1250,
    },
    onRemoveItem: (id) => console.log('Remove:', id),
    onCheckout: () => console.log('Checkout clicked'),
    footerContent: (
      <Alert data-color="info" data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
        Free cancellation up to 24 hours before
      </Alert>
    ),
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  decorators: [
    (Story) => (
      <div style={{ width: '360px', height: '700px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [items, setItems] = React.useState<CartItem[]>([
      {
        id: '1',
        title: 'Meeting Room A',
        subtitle: 'Mon, Jan 15 • 09:00-11:00',
        price: 500,
        icon: <CalendarIcon />,
      },
      {
        id: '2',
        title: 'Meeting Room B',
        subtitle: 'Tue, Jan 16 • 14:00-16:00',
        price: 600,
        icon: <CalendarIcon />,
      },
    ]);
    const [loading, setLoading] = React.useState(false);

    const handleRemove = (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleCheckout = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert('Checkout successful!');
      }, 2000);
    };

    const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
    const tax = Math.round(subtotal * 0.25);
    const total = subtotal + tax;

    return (
      <CartSidebar
        items={items}
        summary={
          items.length > 0
            ? {
                subtotal,
                tax,
                taxLabel: 'VAT (25%)',
                total,
              }
            : undefined
        }
        formatCurrency={(amount) => `${amount.toLocaleString()} kr`}
        onRemoveItem={handleRemove}
        onCheckout={handleCheckout}
        checkoutLoading={loading}
        labels={{
          title: 'Your Booking',
          emptyTitle: 'No rooms selected',
          emptyDescription: 'Select time slots from the calendar',
          checkout: 'Book Now',
        }}
      />
    );
  },
};
