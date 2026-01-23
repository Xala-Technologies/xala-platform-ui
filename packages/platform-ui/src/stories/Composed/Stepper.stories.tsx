import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Stepper, Wizard } from '../../composed/Stepper';
import { useState } from 'react';
import { Button, Paragraph, Heading } from '@digdir/designsystemet-react';
import { CheckCircle, User, Settings, CreditCard } from 'lucide-react';

const meta: Meta<typeof Stepper> = {
  title: 'Composed/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Stepper & Wizard

Multi-step form navigation with progress indicators. Supports horizontal and vertical orientations.

### Features
- Step indicators with status (pending, current, completed, error)
- Clickable steps (optional)
- Horizontal and vertical orientations
- Size variants
- Wizard component for multi-step forms

### Usage
\`\`\`tsx
<Stepper
  steps={steps}
  currentStep={2}
  onStepClick={handleStepClick}
  orientation="horizontal"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onStepClick: fn(),
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stepper orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Stepper size',
    },
    allowClickPrevious: {
      control: 'boolean',
      description: 'Allow clicking previous steps',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample steps
const sampleSteps = [
  { id: '1', title: 'Account', description: 'Create account' },
  { id: '2', title: 'Profile', description: 'Set up profile' },
  { id: '3', title: 'Settings', description: 'Configure settings' },
  { id: '4', title: 'Review', description: 'Review and confirm' },
];

const stepsWithIcons = [
  { id: '1', title: 'Account', description: 'Create account', icon: <User size={16} /> },
  { id: '2', title: 'Profile', description: 'Set up profile', icon: <Settings size={16} /> },
  { id: '3', title: 'Payment', description: 'Payment info', icon: <CreditCard size={16} /> },
  { id: '4', title: 'Review', description: 'Review and confirm', icon: <CheckCircle size={16} /> },
];

// Horizontal stepper
export const Horizontal: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
    orientation: 'horizontal',
    size: 'md',
    allowClickPrevious: true,
  },
};

// Vertical stepper
export const Vertical: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
    orientation: 'vertical',
    size: 'md',
    allowClickPrevious: true,
  },
};

// First step
export const FirstStep: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 0,
    orientation: 'horizontal',
    size: 'md',
    allowClickPrevious: false,
  },
};

// Last step
export const LastStep: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 3,
    orientation: 'horizontal',
    size: 'md',
    allowClickPrevious: true,
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
    orientation: 'horizontal',
    size: 'sm',
    allowClickPrevious: true,
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
    orientation: 'horizontal',
    size: 'lg',
    allowClickPrevious: true,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    currentStep: 2,
    orientation: 'horizontal',
    size: 'md',
    allowClickPrevious: true,
  },
};

// With optional step
export const WithOptionalStep: Story = {
  args: {
    steps: [
      ...sampleSteps.slice(0, 2),
      { id: '3', title: 'Settings', description: 'Configure settings', optional: true },
      ...sampleSteps.slice(3),
    ],
    currentStep: 2,
    orientation: 'horizontal',
    size: 'md',
    allowClickPrevious: true,
  },
};

// Interactive stepper
export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Stepper
          steps={sampleSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          orientation="horizontal"
          size="md"
          allowClickPrevious={true}
        />
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            data-color="neutral"
            data-size="medium"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(sampleSteps.length - 1, currentStep + 1))}
            disabled={currentStep === sampleSteps.length - 1}
            data-color="accent"
            data-size="medium"
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

// Wizard component
export const WizardExample: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
      { id: '1', title: 'Step 1', description: 'First step' },
      { id: '2', title: 'Step 2', description: 'Second step' },
      { id: '3', title: 'Step 3', description: 'Final step' },
    ];

    return (
      <Wizard
        steps={steps}
        showStepIndicator={true}
        nextLabel="Next"
        prevLabel="Previous"
        completeLabel="Complete"
        cancelLabel="Cancel"
        onComplete={fn()}
        onCancel={fn()}
      >
        <div>
          <Heading level={3} data-size="sm">
            Step 1 Content
          </Heading>
          <Paragraph data-size="sm">This is the content for step 1.</Paragraph>
        </div>
        <div>
          <Heading level={3} data-size="sm">
            Step 2 Content
          </Heading>
          <Paragraph data-size="sm">This is the content for step 2.</Paragraph>
        </div>
        <div>
          <Heading level={3} data-size="sm">
            Step 3 Content
          </Heading>
          <Paragraph data-size="sm">This is the content for step 3.</Paragraph>
        </div>
      </Wizard>
    );
  },
};
