/**
 * SuccessView & ConfirmationView Stories
 *
 * Pattern components for success and confirmation states.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { SuccessView } from '../../patterns/SuccessView';
import { ConfirmationView } from '../../patterns/ConfirmationView';

// =============================================================================
// SuccessView Meta
// =============================================================================

const successMeta: Meta<typeof SuccessView> = {
  title: 'Patterns/SuccessView',
  component: SuccessView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SuccessView

A pattern component for displaying success states after completing actions.

### Features
- Success icon with animation
- Customizable title and message
- Optional action buttons
- Supports additional details

### Usage

\`\`\`tsx
<SuccessView
  title="Booking Confirmed!"
  message="Your booking has been successfully created."
  details={[
    { label: 'Booking ID', value: '#12345' },
    { label: 'Date', value: 'January 15, 2026' },
  ]}
  primaryAction={{ label: 'View Booking', onClick: () => navigate('/booking/12345') }}
  secondaryAction={{ label: 'Make Another', onClick: () => reset() }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default successMeta;
type SuccessStory = StoryObj<typeof SuccessView>;

// =============================================================================
// SuccessView Stories
// =============================================================================

export const BookingSuccess: SuccessStory = {
  name: 'Booking Success',
  args: {
    title: 'Booking Confirmed!',
    message:
      'Your booking has been successfully created. A confirmation email has been sent to your address.',
    details: [
      { label: 'Booking ID', value: '#BK-2026-12345' },
      { label: 'Resource', value: 'Conference Room Alpha' },
      { label: 'Date', value: 'Wednesday, January 15, 2026' },
      { label: 'Time', value: '09:00 - 12:00' },
      { label: 'Total', value: '1,500 kr' },
    ],
    primaryAction: {
      label: 'View Booking Details',
      onClick: () => console.log('View booking'),
    },
    secondaryAction: {
      label: 'Make Another Booking',
      onClick: () => console.log('New booking'),
    },
  },
};

export const PaymentSuccess: SuccessStory = {
  name: 'Payment Success',
  args: {
    title: 'Payment Successful',
    message: 'Your payment has been processed successfully.',
    details: [
      { label: 'Transaction ID', value: 'TXN-98765432' },
      { label: 'Amount', value: '2,500 kr' },
      { label: 'Method', value: 'Vipps' },
    ],
    primaryAction: {
      label: 'Download Receipt',
      onClick: () => console.log('Download'),
    },
    secondaryAction: {
      label: 'Return to Dashboard',
      onClick: () => console.log('Dashboard'),
    },
  },
};

export const RegistrationSuccess: SuccessStory = {
  name: 'Registration Success',
  args: {
    title: 'Welcome!',
    message:
      'Your account has been created successfully. Please check your email to verify your account.',
    primaryAction: {
      label: 'Go to Dashboard',
      onClick: () => console.log('Dashboard'),
    },
  },
};

export const SubmissionSuccess: SuccessStory = {
  name: 'Form Submission Success',
  args: {
    title: 'Application Submitted',
    message:
      'Your application has been received. We will review it and get back to you within 5 business days.',
    details: [
      { label: 'Reference Number', value: 'APP-2026-00123' },
      { label: 'Submitted', value: 'January 10, 2026 at 14:30' },
    ],
    primaryAction: {
      label: 'Track Application',
      onClick: () => console.log('Track'),
    },
  },
};

export const MinimalSuccess: SuccessStory = {
  name: 'Minimal Success',
  args: {
    title: 'Done!',
    message: 'Your changes have been saved.',
  },
};

// =============================================================================
// ConfirmationView Stories (as separate export)
// =============================================================================

export const ConfirmationDefault: StoryObj<typeof ConfirmationView> = {
  name: 'Confirmation View',
  render: () => (
    <ConfirmationView
      title="Confirm Your Booking"
      message="Please review your booking details before confirming."
      details={[
        { label: 'Resource', value: 'Meeting Room 3B' },
        { label: 'Date', value: 'January 20, 2026' },
        { label: 'Time', value: '10:00 - 11:00' },
        { label: 'Price', value: '500 kr' },
      ]}
      confirmAction={{
        label: 'Confirm Booking',
        onClick: () => console.log('Confirmed'),
      }}
      cancelAction={{
        label: 'Go Back',
        onClick: () => console.log('Cancelled'),
      }}
    />
  ),
};

export const DeleteConfirmation: StoryObj<typeof ConfirmationView> = {
  name: 'Delete Confirmation',
  render: () => (
    <ConfirmationView
      variant="danger"
      title="Delete Booking?"
      message="Are you sure you want to delete this booking? This action cannot be undone."
      details={[
        { label: 'Booking ID', value: '#BK-2026-12345' },
        { label: 'Resource', value: 'Conference Room Alpha' },
      ]}
      confirmAction={{
        label: 'Delete Booking',
        onClick: () => console.log('Deleted'),
        variant: 'danger',
      }}
      cancelAction={{
        label: 'Keep Booking',
        onClick: () => console.log('Cancelled'),
      }}
    />
  ),
};

export const CancelConfirmation: StoryObj<typeof ConfirmationView> = {
  name: 'Cancellation Confirmation',
  render: () => (
    <ConfirmationView
      variant="warning"
      title="Cancel Your Booking?"
      message="You will receive a full refund if you cancel now. Cancellations made within 24 hours of the booking are non-refundable."
      details={[
        { label: 'Booking ID', value: '#BK-2026-12345' },
        { label: 'Refund Amount', value: '1,500 kr' },
      ]}
      confirmAction={{
        label: 'Yes, Cancel Booking',
        onClick: () => console.log('Cancelled booking'),
      }}
      cancelAction={{
        label: 'Keep Booking',
        onClick: () => console.log('Kept'),
      }}
    />
  ),
};
