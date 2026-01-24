/**
 * StepperHeader Stories
 *
 * Multi-step progress indicator component.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  StepperHeader,
  type StepperHeaderProps,
  type StepperStep,
} from '../../patterns/StepperHeader';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof StepperHeader> = {
  title: 'Patterns/StepperHeader',
  component: StepperHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## StepperHeader

A domain-neutral multi-step progress indicator.

### Features
- Step icons and numbers
- Completed/current/upcoming states
- Progress text
- Multiple variants (default, compact, pills)
- Connector lines between steps
- Optional title and subtitle

### Usage

\`\`\`tsx
<StepperHeader
  steps={[
    { id: 'select', label: 'Select Items' },
    { id: 'details', label: 'Enter Details' },
    { id: 'confirm', label: 'Confirm' },
  ]}
  currentStep={1}
  title="Checkout"
/>
\`\`\`

### Accessibility
- Semantic heading structure
- Visual progress indicators
- Clear step labeling
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StepperHeader>;

// =============================================================================
// Sample Icons
// =============================================================================

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const HeaderCalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const bookingSteps: StepperStep[] = [
  { id: 'select', label: 'Select Time', icon: <CalendarIcon /> },
  { id: 'details', label: 'Your Details', icon: <UserIcon /> },
  { id: 'payment', label: 'Payment', icon: <CreditCardIcon /> },
  { id: 'confirm', label: 'Confirmation', icon: <CheckCircleIcon /> },
];

const checkoutSteps: StepperStep[] = [
  { id: 'cart', label: 'Review Cart' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'complete', label: 'Complete' },
];

const onboardingSteps: StepperStep[] = [
  { id: 'account', label: 'Create Account', description: 'Set up your credentials' },
  { id: 'profile', label: 'Your Profile', description: 'Tell us about yourself' },
  { id: 'preferences', label: 'Preferences', description: 'Customize your experience' },
  { id: 'done', label: 'All Done', description: "You're ready to go!" },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    steps: bookingSteps,
    currentStep: 1,
    title: 'Book a Room',
    headerIcon: <HeaderCalendarIcon />,
  },
};

export const FirstStep: Story = {
  name: 'First Step',
  args: {
    steps: bookingSteps,
    currentStep: 0,
    title: 'Book a Room',
    headerIcon: <HeaderCalendarIcon />,
  },
};

export const LastStep: Story = {
  name: 'Last Step (All Completed)',
  args: {
    steps: bookingSteps,
    currentStep: 3,
    title: 'Book a Room',
    headerIcon: <HeaderCalendarIcon />,
  },
};

export const WithoutIcons: Story = {
  name: 'Without Step Icons',
  args: {
    steps: checkoutSteps,
    currentStep: 1,
    title: 'Checkout',
  },
};

export const PillsVariant: Story = {
  name: 'Pills Variant',
  args: {
    steps: bookingSteps,
    currentStep: 2,
    title: 'Room Booking',
    headerIcon: <HeaderCalendarIcon />,
    variant: 'pills',
  },
};

export const CompactVariant: Story = {
  name: 'Compact Variant',
  args: {
    steps: bookingSteps,
    currentStep: 1,
    title: 'Book a Room',
    headerIcon: <HeaderCalendarIcon />,
    compact: true,
  },
};

export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    steps: checkoutSteps,
    currentStep: 2,
    showProgress: true,
  },
};

export const WithoutProgress: Story = {
  name: 'Without Progress Text',
  args: {
    steps: bookingSteps,
    currentStep: 1,
    title: 'Book a Room',
    showProgress: false,
  },
};

export const ThreeSteps: Story = {
  name: 'Three Steps',
  args: {
    steps: checkoutSteps.slice(0, 3),
    currentStep: 1,
    title: 'Quick Checkout',
  },
};

export const FiveSteps: Story = {
  name: 'Five Steps',
  args: {
    steps: [
      { id: '1', label: 'Start' },
      { id: '2', label: 'Info' },
      { id: '3', label: 'Options' },
      { id: '4', label: 'Review' },
      { id: '5', label: 'Done' },
    ],
    currentStep: 2,
    title: 'Extended Flow',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    steps: bookingSteps,
    currentStep: 1,
    title: 'Book a Room',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    steps: bookingSteps,
    currentStep: 1,
    title: 'Book a Room',
    size: 'lg',
  },
};

export const WithSubtitle: Story = {
  name: 'With Subtitle',
  args: {
    steps: bookingSteps,
    currentStep: 1,
    title: 'Meeting Room A',
    subtitle: 'Conference Center, Floor 3',
    headerIcon: <HeaderCalendarIcon />,
  },
};

export const OnlyCurrentLabel: Story = {
  name: 'Only Current Step Label',
  args: {
    steps: checkoutSteps,
    currentStep: 2,
    title: 'Checkout',
    showAllLabels: false,
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    steps: [
      { id: 'select', label: 'Velg tid', icon: <CalendarIcon /> },
      { id: 'details', label: 'Dine opplysninger', icon: <UserIcon /> },
      { id: 'payment', label: 'Betaling', icon: <CreditCardIcon /> },
      { id: 'confirm', label: 'Bekreftelse', icon: <CheckCircleIcon /> },
    ],
    currentStep: 1,
    title: 'Bestill rom',
    headerIcon: <HeaderCalendarIcon />,
    labels: {
      stepProgress: 'Steg {current} av {total}',
    },
  },
};

export const OnboardingFlow: Story = {
  name: 'Domain Example: Onboarding',
  args: {
    steps: onboardingSteps,
    currentStep: 1,
    title: 'Welcome to Platform',
    subtitle: 'Let us set you up',
    variant: 'pills',
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: () => {
    const t = useT();
    const [currentStep, setCurrentStep] = React.useState(0);

    const steps: StepperStep[] = [
      { id: 'select', label: 'Select Items', icon: <CalendarIcon /> },
      { id: 'details', label: 'Enter Details', icon: <UserIcon /> },
      { id: 'payment', label: 'Payment', icon: <CreditCardIcon /> },
      { id: 'confirm', label: 'Confirmation', icon: <CheckCircleIcon /> },
    ];

    return (
      <div>
        <StepperHeader
          steps={steps}
          currentStep={currentStep}
          title="Interactive Wizard"
          headerIcon={<HeaderCalendarIcon />}
        />

        <div
          style={{
            padding: 'var(--ds-spacing-6)',
            textAlign: 'center',
          }}
        >
          <p style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            {t('storybook.patterns.currentStep')}: <strong>{steps[currentStep].label}</strong>
          </p>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'center' }}>
            <Button
              variant="secondary"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              type="button"
            >
              {t('platform.common.previous')}
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              type="button"
            >
              {t('platform.common.next')}
            </Button>
          </div>

          <div style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Button
              variant="tertiary"
              onClick={() => setCurrentStep(0)}
              type="button"
              data-size="sm"
            >
              {t('platform.common.reset')}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
