import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import {
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  SectionCardFooter,
} from '../../composed/SectionCard';
import { Button, Paragraph } from '@digdir/designsystemet-react';
import { Settings, User, FileText } from 'lucide-react';

const meta: Meta<typeof SectionCard> = {
  title: 'Composed/SectionCard',
  component: SectionCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SectionCard

Consistent section containers for page content. Provides standardized header, content, and footer areas.

### Features
- Header with title, description, icon, and actions
- Content area
- Footer with actions
- Variants (default, outlined, elevated)
- Size variants
- Collapsible sections
- Loading state

### Usage
\`\`\`tsx
<SectionCard
  title="Section Title"
  description="Section description"
  icon={<Icon />}
  actions={<Button>Action</Button>}
>
  Content here
</SectionCard>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Card variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size',
    },
    collapsible: {
      control: 'boolean',
      description: 'Make section collapsible',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const DefaultDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.sectionTitle')}
        description={t('storybook.demo.sectionDescription')}
        variant="default"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.sectionContentArea')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithIconDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('platform.nav.settings')}
        description={t('storybook.demo.manageAccountSettings')}
        icon={<Settings size={20} />}
        variant="default"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.settingsContentGoesHere')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithActionsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.userProfile')}
        description={t('storybook.demo.viewEditProfile')}
        icon={<User size={20} />}
        actions={
          <Button onClick={fn()} data-color="accent" data-size="sm">
            {t('platform.common.edit')}
          </Button>
        }
        variant="default"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.profileContentGoesHere')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithFooterDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.document')}
        description={t('storybook.demo.documentDetails')}
        icon={<FileText size={20} />}
        footer={
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
            <Button onClick={fn()} data-color="neutral" data-size="sm">
              {t('platform.common.cancel')}
            </Button>
            <Button onClick={fn()} data-color="accent" data-size="sm">
              {t('platform.common.save')}
            </Button>
          </div>
        }
        variant="default"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.documentContentGoesHere')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const CollapsibleDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.collapsibleSection')}
        description={t('storybook.demo.clickToExpandOrCollapse')}
        variant="default"
        size="md"
        collapsible={true}
        defaultCollapsed={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.collapsibleContentDescription')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const OutlinedDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.outlinedVariant')}
        description={t('storybook.demo.outlinedVariantDescription')}
        variant="outlined"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.outlinedVariantContent')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const ElevatedDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.elevatedVariant')}
        description={t('storybook.demo.elevatedVariantDescription')}
        variant="elevated"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.elevatedVariantContent')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const SmallDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.smallSize')}
        description={t('storybook.demo.smallSectionCard')}
        variant="default"
        size="sm"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.smallContent')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const LargeDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.largeSize')}
        description={t('storybook.demo.largeSectionCard')}
        variant="default"
        size="lg"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">{t('storybook.demo.largeContent')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const LoadingDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('storybook.demo.loadingSection')}
        description={t('storybook.demo.sectionIsLoading')}
        variant="default"
        size="md"
        collapsible={false}
        loading={true}
      >
        <Paragraph data-size="sm">{t('storybook.demo.content')}</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithSubComponentsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SectionCard variant="default" size="md">
        <SectionCardHeader
          title={t('storybook.demo.sectionTitle')}
          description={t('storybook.demo.sectionDescription')}
          icon={<Settings size={20} />}
          actions={
            <Button onClick={fn()} data-color="accent" data-size="sm">
              {t('platform.common.edit')}
            </Button>
          }
        />
        <SectionCardContent>
          <Paragraph data-size="sm">{t('storybook.demo.subComponentsDescription')}</Paragraph>
        </SectionCardContent>
        <SectionCardFooter alignment="right">
          <Button onClick={fn()} data-color="neutral" data-size="sm">
            {t('platform.common.cancel')}
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="sm">
            {t('platform.common.save')}
          </Button>
        </SectionCardFooter>
      </SectionCard>
    </div>
  );
};

// Basic section card
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// With icon
export const WithIcon: Story = {
  render: () => <WithIconDemo />,
};

// With actions
export const WithActions: Story = {
  render: () => <WithActionsDemo />,
};

// With footer
export const WithFooter: Story = {
  render: () => <WithFooterDemo />,
};

// Collapsible
export const Collapsible: Story = {
  render: () => <CollapsibleDemo />,
};

// Variants
export const Outlined: Story = {
  render: () => <OutlinedDemo />,
};

export const Elevated: Story = {
  render: () => <ElevatedDemo />,
};

// Size variants
export const Small: Story = {
  render: () => <SmallDemo />,
};

export const Large: Story = {
  render: () => <LargeDemo />,
};

// Loading state
export const Loading: Story = {
  render: () => <LoadingDemo />,
};

// Using sub-components
export const WithSubComponents: Story = {
  render: () => <WithSubComponentsDemo />,
};
