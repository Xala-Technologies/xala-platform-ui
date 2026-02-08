import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { Alert } from '../../composed/Alert';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof Alert> = {
  title: 'Composed/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Alert

Inline alert banners for displaying contextual messages. Supports info, success, warning, and error variants.

### Features
- Four variants: info, success, warning, error
- Dismissible alerts
- Optional title
- Action button support
- Custom icons
- Proper ARIA roles

### Usage
\`\`\`tsx
<Alert
  variant="info"
  title="Information"
  dismissible={true}
  onDismiss={handleDismiss}
>
  This is an informational message.
</Alert>
\`\`\`
        `,
      },
    },
  },
  args: {
    onDismiss: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for info story
const InfoDemo = () => {
  const t = useT();
  return (
    <Alert variant="info" title={t('storybook.demo.information')} dismissible={false}>
      {t('storybook.demo.informationalMessage')}
    </Alert>
  );
};

// Info variant
export const Info: Story = {
  render: function Render() {
    return <InfoDemo />;
  },
};

// Wrapper for success story
const SuccessDemo = () => {
  const t = useT();
  return (
    <Alert variant="success" title={t('storybook.story.success')} dismissible={false}>
      {t('storybook.demo.changesSavedSuccessfully')}
    </Alert>
  );
};

// Success variant
export const Success: Story = {
  render: function Render() {
    return <SuccessDemo />;
  },
};

// Wrapper for warning story
const WarningDemo = () => {
  const t = useT();
  return (
    <Alert variant="warning" title={t('storybook.demo.warning')} dismissible={false}>
      {t('storybook.demo.reviewChangesBeforeProceeding')}
    </Alert>
  );
};

// Warning variant
export const Warning: Story = {
  render: function Render() {
    return <WarningDemo />;
  },
};

// Wrapper for error story
const ErrorDemo = () => {
  const t = useT();
  return (
    <Alert variant="error" title={t('storybook.story.error')} dismissible={false}>
      {t('storybook.demo.errorProcessingRequest')}
    </Alert>
  );
};

// Error variant
export const Error: Story = {
  render: function Render() {
    return <ErrorDemo />;
  },
};

// Wrapper for without title story
const WithoutTitleDemo = () => {
  const t = useT();
  return (
    <Alert variant="info" dismissible={false}>
      {t('storybook.demo.alertWithoutTitle')}
    </Alert>
  );
};

// Without title
export const WithoutTitle: Story = {
  render: function Render() {
    return <WithoutTitleDemo />;
  },
};

// Wrapper for dismissible story
const DismissibleDemo = () => {
  const t = useT();
  return (
    <Alert
      variant="info"
      title={t('storybook.demo.dismissibleAlert')}
      dismissible={true}
      onDismiss={fn()}
    >
      {t('storybook.demo.alertCanBeDismissed')}
    </Alert>
  );
};

// Dismissible
export const Dismissible: Story = {
  render: function Render() {
    return <DismissibleDemo />;
  },
};

// Wrapper for action story
const WithActionDemo = () => {
  const t = useT();
  return (
    <Alert
      variant="warning"
      title={t('storybook.demo.actionRequired')}
      dismissible={false}
      action={{
        label: t('storybook.demo.extendSession'),
        onClick: fn(),
      }}
    >
      {t('storybook.demo.sessionExpireSoon')}
    </Alert>
  );
};

// With action button
export const WithAction: Story = {
  render: function Render() {
    return <WithActionDemo />;
  },
};

// Wrapper for custom icon story
const WithCustomIconDemo = () => {
  const t = useT();
  return (
    <Alert
      variant="info"
      title={t('storybook.demo.customIcon')}
      dismissible={false}
      icon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      }
    >
      {t('storybook.demo.alertCustomIcon')}
    </Alert>
  );
};

// With custom icon
export const WithCustomIcon: Story = {
  render: function Render() {
    return <WithCustomIconDemo />;
  },
};

// Wrapper for long content story
const LongContentDemo = () => {
  const t = useT();
  return (
    <Alert
      variant="info"
      title={t('storybook.demo.detailedInformation')}
      dismissible={true}
      onDismiss={fn()}
    >
      {t('storybook.demo.longAlertContent')}
    </Alert>
  );
};

// Long content
export const LongContent: Story = {
  render: function Render() {
    return <LongContentDemo />;
  },
};

// Wrapper for all variants story
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
      <Alert variant="info" title={t('storybook.demo.info')}>
        {t('storybook.demo.informationalAlert')}
      </Alert>
      <Alert variant="success" title={t('storybook.story.success')}>
        {t('storybook.demo.operationSuccessful')}
      </Alert>
      <Alert variant="warning" title={t('storybook.demo.warning')}>
        {t('storybook.demo.pleaseReview')}
      </Alert>
      <Alert variant="error" title={t('storybook.story.error')}>
        {t('platform.errors.serverError')}
      </Alert>
    </div>
  );
};

// All variants showcase
export const AllVariants: Story = {
  render: function Render() {
    return <AllVariantsDemo />;
  },
};
