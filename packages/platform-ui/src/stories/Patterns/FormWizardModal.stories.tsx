/**
 * FormWizardModal Stories
 *
 * Multi-step form wizard modal component.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import { FormWizardModal, type FormWizardModalProps } from '../../patterns/FormWizardModal';
import type { PatternWizardStep } from '../../patterns/types';
import { Paragraph, Textfield, Label, NativeSelect, Checkbox } from '@digdir/designsystemet-react';

const meta: Meta<typeof FormWizardModal> = {
  title: 'Patterns/FormWizardModal',
  component: FormWizardModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FormWizardModal

A domain-neutral modal wizard component for multi-step forms.

### Features
- Step indicator with progress tracking
- Back/Next/Complete navigation
- Customizable labels (i18n support)
- Loading state for completion
- Responsive design

### Usage

\`\`\`tsx
const steps: PatternWizardStep[] = [
  { id: 'details', title: 'Details', isActive: true },
  { id: 'confirm', title: 'Confirm' },
  { id: 'complete', title: 'Complete' },
];

<FormWizardModal
  isOpen={showWizard}
  steps={steps}
  currentStepIndex={currentStep}
  title="Create Booking"
  onNext={() => setCurrentStep(s => s + 1)}
  onBack={() => setCurrentStep(s => s - 1)}
  onComplete={handleSubmit}
  onClose={() => setShowWizard(false)}
>
  <StepContent step={currentStep} />
</FormWizardModal>
\`\`\`

### Accessibility
- Uses native dialog element
- Focus trapped within modal
- Escape key closes modal
- Step indicator with aria-current
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormWizardModal>;

// =============================================================================
// Sample Step Content Components
// =============================================================================

function DetailsStep() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div>
        <Textfield label="Title" placeholder="Enter a title" />
      </div>
      <div>
        <Textfield label="Description" placeholder="Enter a description" />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <NativeSelect id="category">
          <option value="">Select category</option>
          <option value="meeting">Meeting</option>
          <option value="workshop">Workshop</option>
          <option value="event">Event</option>
        </NativeSelect>
      </div>
    </div>
  );
}

function OptionsStep() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Paragraph data-size="sm">Configure your preferences:</Paragraph>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Checkbox value="notifications">Enable notifications</Checkbox>
        <Checkbox value="reminders">Send reminders</Checkbox>
        <Checkbox value="calendar">Add to calendar</Checkbox>
      </div>
    </div>
  );
}

function ConfirmStep() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Paragraph data-size="md">Please review your information before submitting.</Paragraph>
      <div
        style={{
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          padding: 'var(--ds-spacing-4)',
          borderRadius: 'var(--ds-border-radius-md)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>Title</span>
          <span>My Booking</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>Category</span>
          <span>Meeting</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>Notifications</span>
          <span>Enabled</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Sample Steps
// =============================================================================

const threeSteps: PatternWizardStep[] = [
  { id: 'details', title: 'Details' },
  { id: 'options', title: 'Options' },
  { id: 'confirm', title: 'Confirm' },
];

const fourSteps: PatternWizardStep[] = [
  { id: 'info', title: 'Information' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'review', title: 'Review' },
  { id: 'payment', title: 'Payment' },
];

const fiveSteps: PatternWizardStep[] = [
  { id: 'personal', title: 'Personal' },
  { id: 'address', title: 'Address' },
  { id: 'preferences', title: 'Preferences' },
  { id: 'verification', title: 'Verify' },
  { id: 'complete', title: 'Complete' },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Create New Item',
    children: <DetailsStep />,
  },
};

export const SecondStep: Story = {
  name: 'Second Step',
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 1,
    title: 'Create New Item',
    children: <OptionsStep />,
  },
};

export const FinalStep: Story = {
  name: 'Final Step',
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 2,
    title: 'Create New Item',
    children: <ConfirmStep />,
  },
};

export const WithSubtitle: Story = {
  name: 'With Subtitle',
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Create Booking',
    subtitle: 'Complete all steps to confirm your reservation',
    children: <DetailsStep />,
  },
};

export const FourSteps: Story = {
  name: 'Four Steps',
  args: {
    isOpen: true,
    steps: fourSteps,
    currentStepIndex: 1,
    title: 'Book Resource',
    children: <DetailsStep />,
  },
};

export const FiveSteps: Story = {
  name: 'Five Steps',
  args: {
    isOpen: true,
    steps: fiveSteps,
    currentStepIndex: 2,
    title: 'Registration',
    children: <OptionsStep />,
  },
};

export const CompletingState: Story = {
  name: 'Completing (Loading)',
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 2,
    title: 'Create New Item',
    children: <ConfirmStep />,
    isCompleting: true,
  },
};

export const CannotProceed: Story = {
  name: 'Cannot Proceed (Validation)',
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Create New Item',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Textfield
          label="Required Field"
          placeholder="This field is required"
          error="Please fill in this field"
        />
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
          Please complete all required fields to continue.
        </Paragraph>
      </div>
    ),
    canGoNext: false,
  },
};

export const NoStepIndicator: Story = {
  name: 'Without Step Indicator',
  args: {
    isOpen: true,
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Quick Action',
    children: <DetailsStep />,
    showStepIndicator: false,
  },
};

export const SingleStep: Story = {
  name: 'Single Step',
  args: {
    isOpen: true,
    steps: [{ id: 'only', title: 'Details' }],
    currentStepIndex: 0,
    title: 'Edit Item',
    children: <DetailsStep />,
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    isOpen: true,
    steps: [
      { id: 'detaljer', title: 'Detaljer' },
      { id: 'alternativer', title: 'Alternativer' },
      { id: 'bekreft', title: 'Bekreft' },
    ],
    currentStepIndex: 1,
    title: 'Ny Bestilling',
    subtitle: 'Fullfør alle stegene for å bekrefte',
    children: <OptionsStep />,
    labels: {
      back: 'Tilbake',
      next: 'Neste',
      complete: 'Fullfør',
      cancel: 'Avbryt',
      stepOf: 'Steg {current} av {total}',
    },
  },
};

export const BookingWizard: Story = {
  name: 'Domain Example: Booking Wizard',
  args: {
    isOpen: true,
    steps: [
      { id: 'select', title: 'Select Resource' },
      { id: 'datetime', title: 'Date & Time' },
      { id: 'details', title: 'Details' },
      { id: 'confirm', title: 'Confirm' },
    ],
    currentStepIndex: 2,
    title: 'Book Meeting Room',
    subtitle: 'Conference Room Alpha - Jan 15, 2026',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Textfield
          label="Meeting Title"
          placeholder="Enter meeting title"
          defaultValue="Q1 Planning Session"
        />
        <Textfield label="Number of Attendees" type="number" defaultValue="8" />
        <div>
          <Label htmlFor="equipment">Additional Equipment</Label>
          <NativeSelect id="equipment">
            <option value="">None</option>
            <option value="projector">Projector</option>
            <option value="whiteboard">Whiteboard</option>
            <option value="video">Video Conferencing</option>
          </NativeSelect>
        </div>
      </div>
    ),
  },
};

export const RegistrationWizard: Story = {
  name: 'Domain Example: Registration',
  args: {
    isOpen: true,
    steps: [
      { id: 'account', title: 'Account' },
      { id: 'profile', title: 'Profile' },
      { id: 'verify', title: 'Verify' },
    ],
    currentStepIndex: 0,
    title: 'Create Account',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Textfield label="Email" type="email" placeholder="your@email.com" />
        <Textfield label="Password" type="password" placeholder="Create a password" />
        <Textfield label="Confirm Password" type="password" placeholder="Confirm your password" />
      </div>
    ),
  },
};

export const WithCompletedSteps: Story = {
  name: 'With Completed Steps',
  args: {
    isOpen: true,
    steps: [
      { id: 'details', title: 'Details', isCompleted: true },
      { id: 'options', title: 'Options', isCompleted: true },
      { id: 'confirm', title: 'Confirm' },
    ],
    currentStepIndex: 2,
    title: 'Almost Done!',
    children: <ConfirmStep />,
  },
};

export const StepIndicatorVariants: Story = {
  name: 'Step Progress States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <Paragraph data-size="sm" style={{ marginBottom: '1rem' }}>
          Step 1 of 4 (Beginning)
        </Paragraph>
        <FormWizardModal
          isOpen={true}
          steps={fourSteps}
          currentStepIndex={0}
          title="Progress: Beginning"
          children={<Paragraph>First step content</Paragraph>}
        />
      </div>
      <div>
        <Paragraph data-size="sm" style={{ marginBottom: '1rem' }}>
          Step 2 of 4 (In Progress)
        </Paragraph>
        <FormWizardModal
          isOpen={true}
          steps={fourSteps.map((s, i) => ({ ...s, isCompleted: i < 1 }))}
          currentStepIndex={1}
          title="Progress: In Progress"
          children={<Paragraph>Second step content</Paragraph>}
        />
      </div>
      <div>
        <Paragraph data-size="sm" style={{ marginBottom: '1rem' }}>
          Step 4 of 4 (Final)
        </Paragraph>
        <FormWizardModal
          isOpen={true}
          steps={fourSteps.map((s, i) => ({ ...s, isCompleted: i < 3 }))}
          currentStepIndex={3}
          title="Progress: Final Step"
          children={<Paragraph>Final step content</Paragraph>}
        />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
