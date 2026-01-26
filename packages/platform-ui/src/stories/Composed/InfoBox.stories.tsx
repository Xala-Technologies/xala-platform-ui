import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="info" title={t('storybook.demo.information')}>
        {t('storybook.demo.informationalMessage')}
      </InfoBox>
    </div>
  );
};

const SuccessDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="success" title={t('storybook.story.success')}>
        {t('storybook.demo.changesSavedSuccessfully')}
      </InfoBox>
    </div>
  );
};

const WarningDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="warning" title={t('storybook.demo.warning')}>
        {t('storybook.demo.reviewChangesBeforeProceeding')}
      </InfoBox>
    </div>
  );
};

const DangerDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="danger" title={t('storybook.story.error')}>
        {t('storybook.demo.errorProcessingRequest')}
      </InfoBox>
    </div>
  );
};

const NeutralDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="neutral" title={t('storybook.demo.note')}>
        {t('storybook.demo.neutralInfoBoxDescription')}
      </InfoBox>
    </div>
  );
};

const WithoutTitleDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="info">{t('storybook.demo.infoBoxWithoutTitle')}</InfoBox>
    </div>
  );
};

const LongContentDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <InfoBox variant="info" title={t('storybook.demo.detailedInformation')}>
        {t('storybook.demo.longInfoBoxContent')}
      </InfoBox>
    </div>
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
      <InfoBox variant="info" title={t('storybook.demo.info')}>
        {t('storybook.demo.informationalMessage')}
      </InfoBox>
      <InfoBox variant="success" title={t('storybook.story.success')}>
        {t('storybook.demo.operationSuccessful')}
      </InfoBox>
      <InfoBox variant="warning" title={t('storybook.demo.warning')}>
        {t('storybook.demo.pleaseReview')}
      </InfoBox>
      <InfoBox variant="danger" title={t('storybook.story.error')}>
        {t('platform.errors.serverError')}
      </InfoBox>
      <InfoBox variant="neutral" title={t('storybook.demo.note')}>
        {t('storybook.demo.neutralInfoBox')}
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
