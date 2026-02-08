import type { Meta, StoryObj } from '@storybook/react';
import { StatusBanner } from '../../composed/StatusBanner';
import { Button } from '@digdir/designsystemet-react';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const meta: Meta<typeof StatusBanner> = {
  title: 'Composed/StatusBanner',
  component: StatusBanner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StatusBanner

Contextual status banners for detail pages. Displays status information with icon and description.

### Features
- Multiple variants (info, success, warning, danger, neutral)
- Custom icons
- Action buttons
- Title and description
- Design token compliant

### Usage
\`\`\`tsx
<StatusBanner
  variant="success"
  title="Success"
  description="Your changes have been saved."
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description: 'Banner variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const InfoBannerDemo = () => {
  return (
    <StatusBanner
      variant="info"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

const SuccessBannerDemo = () => {
  return (
    <StatusBanner
      variant="success"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

const WarningBannerDemo = () => {
  return (
    <StatusBanner
      variant="warning"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

const DangerBannerDemo = () => {
  return (
    <StatusBanner
      variant="danger"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

const NeutralBannerDemo = () => {
  return (
    <StatusBanner
      variant="neutral"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

const WithoutDescriptionDemo = () => {
  return <StatusBanner variant="success" title="Eksempel Tekst" />;
};

const CustomIconDemo = () => {
  return (
    <StatusBanner
      variant="info"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
      icon={<Info size={24} />}
    />
  );
};

const WithActionDemo = () => {
  return (
    <StatusBanner
      variant="warning"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
      action={
        <Button onClick={() => alert('Action clicked')} data-color="accent" data-size="sm">
          "Eksempel Tekst"
        </Button>
      }
    />
  );
};

const LongContentDemo = () => {
  return (
    <StatusBanner
      variant="info"
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
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
      <StatusBanner
        variant="info"
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      />
      <StatusBanner
        variant="success"
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      />
      <StatusBanner
        variant="warning"
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      />
      <StatusBanner
        variant="danger"
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      />
      <StatusBanner
        variant="neutral"
        title="Eksempel Tekst"
        description="Eksempel Tekst"
      />
    </div>
  );
};

// Info variant
export const InfoBanner: Story = {
  render: function Render() {
    return <InfoBannerDemo />;
  },
};

// Success variant
export const Success: Story = {
  render: function Render() {
    return <SuccessBannerDemo />;
  },
};

// Warning variant
export const Warning: Story = {
  render: function Render() {
    return <WarningBannerDemo />;
  },
};

// Danger variant
export const Danger: Story = {
  render: function Render() {
    return <DangerBannerDemo />;
  },
};

// Neutral variant
export const Neutral: Story = {
  render: function Render() {
    return <NeutralBannerDemo />;
  },
};

// Without description
export const WithoutDescription: Story = {
  render: function Render() {
    return <WithoutDescriptionDemo />;
  },
};

// With custom icon
export const CustomIcon: Story = {
  render: function Render() {
    return <CustomIconDemo />;
  },
};

// With action button
export const WithAction: Story = {
  render: function Render() {
    return <WithActionDemo />;
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
