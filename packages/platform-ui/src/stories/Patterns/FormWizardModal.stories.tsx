/**
 * FormWizardModal Stories
 *
 * Multi-step form wizard modal component.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormWizardModal, type FormWizardModalProps } from '../../patterns/FormWizardModal';
import type { PatternWizardStep } from '../../patterns/types';
import {
  Paragraph,
  Textfield,
  Label,
  Select,
  Checkbox,
  Button,
} from '@digdir/designsystemet-react';

const meta: Meta<typeof FormWizardModal> = {
  title: 'Patterns/FormWizardModal',
  component: FormWizardModal,
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
        <Select id="category">
          <option value="">Select category</option>
          <option value="meeting">Meeting</option>
          <option value="workshop">Workshop</option>
          <option value="event">Event</option>
        </Select>
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
// Helper Component - Prevents multiple modals opening in docs
// =============================================================================

function WizardWithTrigger({
  buttonLabel = 'Open Wizard',
  children,
  ...args
}: Omit<FormWizardModalProps, 'isOpen' | 'onClose'> & {
  buttonLabel?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(args.currentStepIndex ?? 0);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(args.currentStepIndex ?? 0);
    }
  }, [isOpen, args.currentStepIndex]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonLabel}</Button>
      <FormWizardModal
        {...args}
        isOpen={isOpen}
        currentStepIndex={currentStep}
        onNext={() => {
          if (currentStep < args.steps.length - 1) {
            setCurrentStep(currentStep + 1);
          }
          args.onNext?.();
        }}
        onBack={() => {
          if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
          }
          args.onBack?.();
        }}
        onComplete={() => {
          setIsOpen(false);
          setCurrentStep(0);
          args.onComplete?.();
        }}
        onClose={() => {
          setIsOpen(false);
          setCurrentStep(0);
        }}
      >
        {children}
      </FormWizardModal>
    </>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Wizard">
      <DetailsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Create New Item',
  },
};

export const SecondStep: Story = {
  name: 'Second Step',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Step 2">
      <OptionsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 1,
    title: 'Create New Item',
  },
};

export const FinalStep: Story = {
  name: 'Final Step',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Final Step">
      <ConfirmStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 2,
    title: 'Create New Item',
  },
};

export const WithSubtitle: Story = {
  name: 'With Subtitle',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open With Subtitle">
      <DetailsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Create Booking',
    subtitle: 'Complete all steps to confirm your reservation',
  },
};

export const FourSteps: Story = {
  name: 'Four Steps',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open 4-Step Wizard">
      <DetailsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: fourSteps,
    currentStepIndex: 1,
    title: 'Book Resource',
  },
};

export const FiveSteps: Story = {
  name: 'Five Steps',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open 5-Step Wizard">
      <OptionsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: fiveSteps,
    currentStepIndex: 2,
    title: 'Registration',
  },
};

export const CompletingState: Story = {
  name: 'Completing (Loading)',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Loading State">
      <ConfirmStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 2,
    title: 'Create New Item',
    isCompleting: true,
  },
};

export const CannotProceed: Story = {
  name: 'Cannot Proceed (Validation)',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Validation Example">
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
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Create New Item',
    canGoNext: false,
  },
};

export const NoStepIndicator: Story = {
  name: 'Without Step Indicator',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open No Indicator">
      <DetailsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: threeSteps,
    currentStepIndex: 0,
    title: 'Quick Action',
    showStepIndicator: false,
  },
};

export const SingleStep: Story = {
  name: 'Single Step',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Single Step">
      <DetailsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: [{ id: 'only', title: 'Details' }],
    currentStepIndex: 0,
    title: 'Edit Item',
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Åpne Wizard">
      <OptionsStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: [
      { id: 'detaljer', title: 'Detaljer' },
      { id: 'alternativer', title: 'Alternativer' },
      { id: 'bekreft', title: 'Bekreft' },
    ],
    currentStepIndex: 1,
    title: 'Ny Bestilling',
    subtitle: 'Fullfør alle stegene for å bekrefte',
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
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Booking Wizard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Textfield
          label="Meeting Title"
          placeholder="Enter meeting title"
          defaultValue="Q1 Planning Session"
        />
        <Textfield label="Number of Attendees" type="number" defaultValue="8" />
        <div>
          <Label htmlFor="equipment">Additional Equipment</Label>
          <Select id="equipment">
            <option value="">None</option>
            <option value="projector">Projector</option>
            <option value="whiteboard">Whiteboard</option>
            <option value="video">Video Conferencing</option>
          </Select>
        </div>
      </div>
    </WizardWithTrigger>
  ),
  args: {
    steps: [
      { id: 'select', title: 'Select Resource' },
      { id: 'datetime', title: 'Date & Time' },
      { id: 'details', title: 'Details' },
      { id: 'confirm', title: 'Confirm' },
    ],
    currentStepIndex: 2,
    title: 'Book Meeting Room',
    subtitle: 'Conference Room Alpha - Jan 15, 2026',
  },
};

export const RegistrationWizard: Story = {
  name: 'Domain Example: Registration',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Registration">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Textfield label="Email" type="email" placeholder="your@email.com" />
        <Textfield label="Password" type="password" placeholder="Create a password" />
        <Textfield label="Confirm Password" type="password" placeholder="Confirm your password" />
      </div>
    </WizardWithTrigger>
  ),
  args: {
    steps: [
      { id: 'account', title: 'Account' },
      { id: 'profile', title: 'Profile' },
      { id: 'verify', title: 'Verify' },
    ],
    currentStepIndex: 0,
    title: 'Create Account',
  },
};

export const WithCompletedSteps: Story = {
  name: 'With Completed Steps',
  render: (args) => (
    <WizardWithTrigger {...args} buttonLabel="Open Completed Steps">
      <ConfirmStep />
    </WizardWithTrigger>
  ),
  args: {
    steps: [
      { id: 'details', title: 'Details', isCompleted: true },
      { id: 'options', title: 'Options', isCompleted: true },
      { id: 'confirm', title: 'Confirm' },
    ],
    currentStepIndex: 2,
    title: 'Almost Done!',
  },
};

export const StepIndicatorVariants: Story = {
  name: 'Step Progress States',
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">Click buttons to see different step states:</Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          <WizardWithTrigger
            steps={fourSteps}
            currentStepIndex={0}
            title="Progress: Beginning"
            buttonLabel="Step 1 of 4"
          >
            <Paragraph>First step content</Paragraph>
          </WizardWithTrigger>
          <WizardWithTrigger
            steps={fourSteps.map((s, i) => ({ ...s, isCompleted: i < 1 }))}
            currentStepIndex={1}
            title="Progress: In Progress"
            buttonLabel="Step 2 of 4"
          >
            <Paragraph>Second step content</Paragraph>
          </WizardWithTrigger>
          <WizardWithTrigger
            steps={fourSteps.map((s, i) => ({ ...s, isCompleted: i < 3 }))}
            currentStepIndex={3}
            title="Progress: Final Step"
            buttonLabel="Step 4 of 4"
          >
            <Paragraph>Final step content</Paragraph>
          </WizardWithTrigger>
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
