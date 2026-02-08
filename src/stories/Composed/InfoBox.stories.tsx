import type { Meta, StoryObj } from '@storybook/react';
import { InfoBox } from '../../index';

const meta: Meta<typeof InfoBox> = {
  title: 'Composed/InfoBox',
  component: InfoBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## InfoBox

Reusable colored info/status boxes. Supports different color variants matching the design system.

### Features
- Multiple variants (info, success, warning, danger, neutral)
- Optional title
- Colored backgrounds and borders
- Design token compliant

### Usage
\`\`\`tsx
<InfoBox variant="success" title="Success">
  Your changes have been saved.
</InfoBox>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description: 'InfoBox variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const InfoDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="info" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

const SuccessDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="success" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

const WarningDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="warning" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

const DangerDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="danger" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

const NeutralDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="neutral" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

const WithoutTitleDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="info">"Eksempel Tekst"</InfoBox>
    </div>
  );
};

const LongContentDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="info" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

const AllVariantsDemo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
        width: '600px',
      }}
    >
      <InfoBox variant="info" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
      <InfoBox variant="success" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
      <InfoBox variant="warning" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
      <InfoBox variant="danger" title="Eksempel Tekst">
        {t('platform.errors.serverError')}
      </InfoBox>
      <InfoBox variant="neutral" title="Eksempel Tekst">
        "Eksempel Tekst"
      </InfoBox>
    </div>
  );
};

// Info variant
export const Info: Story = {
  render: function Render() {
    return <InfoDemo />;
  },
};

// Success variant
export const Success: Story = {
  render: function Render() {
    return <SuccessDemo />;
  },
};

// Warning variant
export const Warning: Story = {
  render: function Render() {
    return <WarningDemo />;
  },
};

// Danger variant
export const Danger: Story = {
  render: function Render() {
    return <DangerDemo />;
  },
};

// Neutral variant
export const Neutral: Story = {
  render: function Render() {
    return <NeutralDemo />;
  },
};

// Without title
export const WithoutTitle: Story = {
  render: function Render() {
    return <WithoutTitleDemo />;
  },
};

// Long content
export const LongContent: Story = {
  render: function Render() {
    return <LongContentDemo />;
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: function Render() {
    return <AllVariantsDemo />;
  },
};
