import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
  const t = useT();
  return (
    <StatusBanner
      variant="info"
      title={t('storybook.demo.information')}
      description={t('storybook.demo.informationalBannerDescription')}
    />
  );
};

const SuccessBannerDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="success"
      title={t('storybook.story.success')}
      description={t('storybook.demo.changesSavedSuccessfully')}
    />
  );
};

const WarningBannerDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="warning"
      title={t('storybook.demo.warning')}
      description={t('storybook.demo.reviewChangesBeforeProceeding')}
    />
  );
};

const DangerBannerDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="danger"
      title={t('storybook.story.error')}
      description={t('storybook.demo.errorProcessingRequest')}
    />
  );
};

const NeutralBannerDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="neutral"
      title={t('storybook.demo.notice')}
      description={t('storybook.demo.neutralBannerDescription')}
    />
  );
};

const WithoutDescriptionDemo = () => {
  const t = useT();
  return <StatusBanner variant="success" title={t('storybook.demo.operationCompleted')} />;
};

const CustomIconDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="info"
      title={t('storybook.demo.customIcon')}
      description={t('storybook.demo.customIconDescription')}
      icon={<Info size={24} />}
    />
  );
};

const WithActionDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="warning"
      title={t('storybook.demo.actionRequired')}
      description={t('storybook.demo.sessionExpiringSoon')}
      action={
        <Button onClick={() => alert('Action clicked')} data-color="accent" data-size="sm">
          {t('storybook.demo.extendSession')}
        </Button>
      }
    />
  );
};

const LongContentDemo = () => {
  const t = useT();
  return (
    <StatusBanner
      variant="info"
      title={t('storybook.demo.detailedInformation')}
      description={t('storybook.demo.longContentDescription')}
    />
  );
};

const AllVariantsDemo = () => {
  const t = useT();
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
        title={t('storybook.demo.info')}
        description={t('storybook.demo.informationalBanner')}
      />
      <StatusBanner
        variant="success"
        title={t('storybook.story.success')}
        description={t('storybook.demo.operationSuccessful')}
      />
      <StatusBanner
        variant="warning"
        title={t('storybook.demo.warning')}
        description={t('storybook.demo.pleaseReview')}
      />
      <StatusBanner
        variant="danger"
        title={t('storybook.story.error')}
        description={t('platform.errors.serverError')}
      />
      <StatusBanner
        variant="neutral"
        title={t('storybook.demo.notice')}
        description={t('storybook.demo.neutralBanner')}
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
