import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ReviewStep } from '../../patterns/ReviewStep';
import type { ReviewSection } from '../../patterns/types';
import { Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';

const meta: Meta<typeof ReviewStep> = {
  title: 'Patterns/ReviewStep',
  component: ReviewStep,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ReviewStep

A domain-neutral review/confirmation step component for displaying summary sections before final submission.

### Features
- Optional header with icon, title, and message
- Multiple review sections with edit capability
- Key-value item display with optional icons
- Terms checkbox with validation
- Additional content slot

### Usage
\`\`\`tsx
import { ReviewStep } from '@xala-technologies/platform-ui/patterns';

<ReviewStep
  title="Review Your Booking"
  message="Please verify all details before confirming."
  sections={[
    {
      id: 'resource',
      title: 'Selected Resource',
      items: [
        { label: 'Venue', value: 'Main Court' },
        { label: 'Date', value: 'January 25, 2026' },
      ],
      onEdit: () => goToStep(0),
      editLabel: 'Change',
    },
  ]}
  terms={{
    label: 'I agree to the terms and conditions',
    checked: termsAccepted,
    onChange: setTermsAccepted,
  }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample sections for reuse
const bookingSections: ReviewSection[] = [
  {
    id: 'venue',
    title: 'Venue Details',
    icon: <MapPin size={16} />,
    items: [
      { label: 'Name', value: 'Main Basketball Court' },
      { label: 'Location', value: 'Building A, Floor 2' },
      { label: 'Type', value: 'Indoor Court' },
    ],
    onEdit: fn(),
    editLabel: 'Change',
  },
  {
    id: 'schedule',
    title: 'Date & Time',
    icon: <Calendar size={16} />,
    items: [
      { label: 'Date', value: 'Saturday, January 25, 2026' },
      { label: 'Time', value: '10:00 AM - 12:00 PM' },
      { label: 'Duration', value: '2 hours' },
    ],
    onEdit: fn(),
    editLabel: 'Change',
  },
  {
    id: 'payment',
    title: 'Payment Summary',
    icon: <CreditCard size={16} />,
    items: [
      { label: 'Court rental', value: '$60.00' },
      { label: 'Equipment', value: '$20.00' },
      { label: 'Total', value: '$80.00' },
    ],
  },
];

// Default story
export const Default: Story = {
  args: {
    title: 'Review Your Booking',
    message: 'Please verify all details below before confirming your reservation.',
    sections: bookingSections,
  },
};

// With sections only (no header)
export const SectionsOnly: Story = {
  args: {
    sections: bookingSections,
  },
};

// With terms checkbox
export const WithTermsCheckbox: Story = {
  args: {
    title: 'Confirm Your Order',
    message: 'Review your order details and accept the terms to proceed.',
    sections: [
      {
        id: 'order',
        title: 'Order Summary',
        items: [
          { label: 'Product', value: 'Annual Membership' },
          { label: 'Plan', value: 'Premium' },
          { label: 'Billing', value: 'Monthly ($49/mo)' },
        ],
        onEdit: fn(),
        editLabel: 'Edit',
      },
      {
        id: 'total',
        title: 'Payment',
        items: [
          { label: 'First payment', value: '$49.00' },
          { label: 'Due today', value: '$49.00' },
        ],
      },
    ],
    terms: {
      label: 'I agree to the Terms of Service and Privacy Policy',
      checked: false,
      onChange: fn(),
    },
  },
};

// With terms error
export const WithTermsError: Story = {
  args: {
    title: 'Complete Registration',
    message: 'Review your information and accept the terms.',
    sections: [
      {
        id: 'profile',
        title: 'Profile Information',
        items: [
          { label: 'Name', value: 'John Smith' },
          { label: 'Email', value: 'john.smith@example.com' },
          { label: 'Phone', value: '+1 (555) 123-4567' },
        ],
        onEdit: fn(),
        editLabel: 'Edit',
      },
    ],
    terms: {
      label: 'I have read and agree to the Terms of Service',
      checked: false,
      onChange: fn(),
      error: 'You must accept the terms to continue',
    },
  },
};

// Editable sections
export const EditableSections: Story = {
  args: {
    sections: [
      {
        id: 'shipping',
        title: 'Shipping Address',
        items: [
          { label: 'Name', value: 'Jane Doe' },
          { label: 'Street', value: '123 Main Street' },
          { label: 'City', value: 'New York, NY 10001' },
          { label: 'Country', value: 'United States' },
        ],
        onEdit: fn(),
        editLabel: 'Edit',
      },
      {
        id: 'billing',
        title: 'Billing Information',
        items: [
          { label: 'Card', value: '**** **** **** 4242' },
          { label: 'Expires', value: '12/28' },
        ],
        onEdit: fn(),
        editLabel: 'Change',
      },
      {
        id: 'delivery',
        title: 'Delivery Options',
        items: [
          { label: 'Method', value: 'Express Shipping' },
          { label: 'Estimated', value: '2-3 business days' },
          { label: 'Cost', value: '$15.00' },
        ],
        onEdit: fn(),
        editLabel: 'Change',
      },
    ],
  },
};

// With icons in items
export const WithItemIcons: Story = {
  args: {
    title: 'Appointment Summary',
    message: 'Your appointment has been scheduled.',
    sections: [
      {
        id: 'appointment',
        title: 'Appointment Details',
        items: [
          {
            label: 'Date',
            value: 'Friday, January 24, 2026',
            icon: <Calendar size={14} />,
          },
          {
            label: 'Time',
            value: '2:30 PM - 3:30 PM',
            icon: <Clock size={14} />,
          },
          {
            label: 'Location',
            value: 'Office A, Room 102',
            icon: <MapPin size={14} />,
          },
          {
            label: 'Attendees',
            value: '2 people',
            icon: <Users size={14} />,
          },
        ],
      },
    ],
  },
};

// Custom icon
export const CustomIcon: Story = {
  args: {
    title: 'Order Complete',
    message: 'Thank you! Your order has been placed successfully.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    sections: [
      {
        id: 'order',
        title: 'Order Details',
        items: [
          { label: 'Order Number', value: '#ORD-2026-0125' },
          { label: 'Items', value: '3 products' },
          { label: 'Total', value: '$156.99' },
        ],
      },
      {
        id: 'shipping',
        title: 'Shipping',
        items: [
          { label: 'Method', value: 'Standard Delivery' },
          { label: 'Expected', value: 'Jan 28 - Jan 30, 2026' },
        ],
      },
    ],
  },
};

// Simple review (minimal)
export const SimpleReview: Story = {
  args: {
    sections: [
      {
        id: 'summary',
        title: 'Quick Summary',
        items: [
          { label: 'Item', value: 'Monthly Subscription' },
          { label: 'Amount', value: '$29.99/month' },
        ],
      },
    ],
    terms: {
      label: 'I accept the subscription terms',
      checked: true,
      onChange: fn(),
    },
  },
};
