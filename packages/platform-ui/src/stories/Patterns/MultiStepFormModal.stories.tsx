import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import * as React from 'react';
import { Paragraph, Checkbox, Button } from '@digdir/designsystemet-react';
import { MultiStepFormModal } from '../../patterns/MultiStepFormModal';
import { ReviewStep } from '../../patterns/ReviewStep';
import { PricingSummary } from '@xala-technologies/platform-ui-digilist';
import type { FormStep } from '../../patterns/MultiStepFormModal';
import type { ReviewSection } from '../../patterns/types';

const meta: Meta<typeof MultiStepFormModal> = {
  title: 'Patterns/MultiStepFormModal',
  component: MultiStepFormModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false,
      iframeHeight: 700,
      source: {
        type: 'code',
        state: 'closed',
      },
      description: {
        component: `
## MultiStepFormModal

A configurable multi-step form wizard in a modal dialog with sidebar support.

### Features
- Visual step indicator with completion states
- Optional sidebar (e.g., for pricing summary)
- Step validation support
- Loading state for submissions
- Responsive design
- Three size options (md, lg, xl)

### Usage
\`\`\`tsx
import { MultiStepFormModal } from '@xala-technologies/platform-ui/patterns';

const steps: FormStep[] = [
  {
    id: 'selection',
    title: 'Select Items',
    content: <SelectionStep />,
  },
  {
    id: 'details',
    title: 'Enter Details',
    content: <DetailsStep />,
    isOptional: true,
  },
  {
    id: 'review',
    title: 'Review',
    content: <ReviewStep sections={sections} />,
  },
];

<MultiStepFormModal
  open={isOpen}
  title="Complete Your Booking"
  steps={steps}
  currentStep={currentStep}
  labels={{
    back: 'Back',
    next: 'Continue',
    submit: 'Confirm',
    cancel: 'Cancel',
  }}
  onStepChange={setCurrentStep}
  onSubmit={handleSubmit}
  onClose={() => setIsOpen(false)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg', 'xl'],
      description: 'Modal size',
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Current step index (0-based)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample step content components
const SelectionStepContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
    <Paragraph data-size="sm">Choose a resource to book from the options below.</Paragraph>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--ds-spacing-3)',
      }}
    >
      {['Basketball Court', 'Tennis Court', 'Swimming Pool', 'Soccer Field'].map((item) => (
        <div
          key={item}
          style={{
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
            borderRadius: 'var(--ds-border-radius-lg)',
            cursor: 'pointer',
          }}
        >
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {item}
          </Paragraph>
        </div>
      ))}
    </div>
  </div>
);

const DetailsStepContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
    <Paragraph data-size="sm">Enter the booking details below.</Paragraph>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
      }}
    >
      <Paragraph data-size="sm" style={{ margin: 0 }}>
        <strong>Date:</strong> January 25, 2026
      </Paragraph>
      <Paragraph data-size="sm" style={{ margin: 0 }}>
        <strong>Time:</strong> 10:00 AM - 11:00 AM
      </Paragraph>
      <Paragraph data-size="sm" style={{ margin: 0 }}>
        <strong>Participants:</strong> 4
      </Paragraph>
    </div>
  </div>
);

const sampleReviewSections: ReviewSection[] = [
  {
    id: 'resource',
    title: 'Selected Resource',
    items: [
      { label: 'Venue', value: 'Basketball Court' },
      { label: 'Location', value: 'Building A, Floor 2' },
    ],
  },
  {
    id: 'schedule',
    title: 'Schedule',
    items: [
      { label: 'Date', value: 'January 25, 2026' },
      { label: 'Time', value: '10:00 AM - 11:00 AM' },
      { label: 'Duration', value: '1 hour' },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    items: [
      { label: 'Court rental', value: '$30.00' },
      { label: 'Total', value: '$30.00' },
    ],
  },
];

const ReviewStepContent = (
  <ReviewStep
    sections={sampleReviewSections}
    terms={{
      label: 'I agree to the booking terms and cancellation policy',
      checked: false,
      onChange: () => {},
    }}
  />
);

// Sample steps
const sampleSteps: FormStep[] = [
  {
    id: 'selection',
    title: 'Select',
    description: 'Choose a resource to book',
    content: SelectionStepContent,
  },
  {
    id: 'details',
    title: 'Details',
    description: 'Enter booking details',
    content: DetailsStepContent,
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Confirm your booking',
    content: ReviewStepContent,
  },
];

// =============================================================================
// Helper Component - Prevents multiple modals opening in docs
// =============================================================================

function ModalWithTrigger({
  buttonLabel = 'Open Modal',
  ...args
}: React.ComponentProps<typeof MultiStepFormModal> & { buttonLabel?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(args.currentStep ?? 0);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(args.currentStep ?? 0);
    }
  }, [isOpen, args.currentStep]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonLabel}</Button>
      <MultiStepFormModal
        {...args}
        open={isOpen}
        currentStep={currentStep}
        onStepChange={(step) => {
          setCurrentStep(step);
          args.onStepChange?.(step);
        }}
        onSubmit={() => {
          setIsOpen(false);
          args.onSubmit?.();
        }}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
      />
    </>
  );
}

// Default story
export const Default: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Booking Modal" />,
  args: {
    title: 'Book a Resource',
    subtitle: 'Complete the form to make a reservation',
    steps: sampleSteps,
    currentStep: 0,
    labels: {
      back: 'Back',
      next: 'Continue',
      submit: 'Confirm Booking',
      cancel: 'Cancel',
      stepIndicator: 'Step {current} of {total}',
    },
    onStepChange: fn(),
    onSubmit: fn(),
    onClose: fn(),
  },
};

// Second step
export const SecondStep: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Step 2" />,
  args: {
    ...Default.args,
    currentStep: 1,
  },
};

// Final step
export const FinalStep: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Final Step" />,
  args: {
    ...Default.args,
    currentStep: 2,
  },
};

// Single step
export const SingleStep: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Quick Form" />,
  args: {
    title: 'Quick Form',
    steps: [
      {
        id: 'form',
        title: 'Enter Details',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm">Fill in your details below.</Paragraph>
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-lg)',
              }}
            >
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                Form fields would go here.
              </Paragraph>
            </div>
          </div>
        ),
      },
    ],
    currentStep: 0,
    labels: {
      submit: 'Submit',
      cancel: 'Cancel',
    },
    onStepChange: fn(),
    onSubmit: fn(),
    onClose: fn(),
    size: 'md',
  },
};

// With sidebar
export const WithSidebar: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open With Sidebar" />,
  args: {
    title: 'Book a Court',
    subtitle: 'Reserve your playing time',
    steps: sampleSteps,
    currentStep: 1,
    labels: {
      back: 'Back',
      next: 'Continue',
      submit: 'Pay & Confirm',
      cancel: 'Cancel',
    },
    sidebar: (
      <PricingSummary
        items={[
          { id: '1', label: 'Court rental (1 hour)', amount: '$30.00', type: 'base' },
          { id: '2', label: 'Equipment rental', amount: '$10.00', type: 'base' },
          { id: '3', label: 'Member discount', amount: '-$5.00', type: 'discount' },
          { id: '4', label: 'Service fee', amount: '$2.00', type: 'fee' },
        ]}
        total={{
          label: 'Total',
          amount: '$37.00',
        }}
      />
    ),
    showSidebar: true,
    onStepChange: fn(),
    onSubmit: fn(),
    onClose: fn(),
    size: 'lg',
  },
};

// Loading state
export const LoadingState: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Loading State" />,
  args: {
    title: 'Submit Form',
    steps: [
      {
        id: 'form',
        title: 'Enter Details',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm">Your form is being submitted...</Paragraph>
          </div>
        ),
      },
    ],
    currentStep: 0,
    labels: {
      submit: 'Submitting...',
      cancel: 'Cancel',
    },
    isSubmitting: true,
    onStepChange: fn(),
    onSubmit: fn(),
    onClose: fn(),
    size: 'md',
  },
};

// Cannot proceed (validation)
export const CannotProceed: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Validation Example" />,
  args: {
    title: 'Required Fields',
    steps: [
      {
        id: 'form',
        title: 'Enter Details',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              The submit button is disabled because validation failed.
            </Paragraph>
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-danger-surface-default)',
                borderRadius: 'var(--ds-border-radius-lg)',
              }}
            >
              <Paragraph
                data-size="sm"
                style={{ margin: 0, color: 'var(--ds-color-danger-text-default)' }}
              >
                Please fill in all required fields.
              </Paragraph>
            </div>
          </div>
        ),
      },
    ],
    currentStep: 0,
    labels: {
      submit: 'Submit',
      cancel: 'Cancel',
    },
    canProceed: false,
    onStepChange: fn(),
    onSubmit: fn(),
    onClose: fn(),
    size: 'md',
  },
};

// With optional step
export const WithOptionalStep: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Optional Step" />,
  args: {
    title: 'Registration',
    steps: [
      {
        id: 'required',
        title: 'Required Info',
        content: <Paragraph data-size="sm">Required information goes here.</Paragraph>,
      },
      {
        id: 'optional',
        title: 'Preferences',
        isOptional: true,
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Paragraph data-size="sm">Optional preferences:</Paragraph>
            <Checkbox label="Receive promotional emails" />
            <Checkbox label="Enable SMS notifications" />
          </div>
        ),
      },
      {
        id: 'confirm',
        title: 'Confirm',
        content: <Paragraph data-size="sm">Review and confirm your registration.</Paragraph>,
      },
    ],
    currentStep: 1,
    labels: {
      back: 'Previous',
      next: 'Next',
      submit: 'Complete',
      cancel: 'Cancel',
      optional: '(optional)',
    },
    onStepChange: fn(),
    onSubmit: fn(),
    onClose: fn(),
    size: 'lg',
  },
};

// Medium size
export const SizeMedium: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Medium Size" />,
  args: {
    ...SingleStep.args,
    title: 'Medium Size Modal',
    size: 'md',
  },
};

// Large size
export const SizeLarge: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Large Size" />,
  args: {
    ...Default.args,
    title: 'Large Size Modal',
    size: 'lg',
  },
};

// Extra large size
export const SizeExtraLarge: Story = {
  render: (args) => <ModalWithTrigger {...args} buttonLabel="Open Extra Large Size" />,
  args: {
    ...Default.args,
    title: 'Extra Large Size Modal',
    size: 'xl',
  },
};
