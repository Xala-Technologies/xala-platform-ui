import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="default"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithIconDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title={t('platform.nav.settings')}
        description="Eksempel Tekst"
        icon={<Settings size={20} />}
        variant="default"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithActionsDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
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
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithFooterDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
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
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const CollapsibleDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="default"
        size="md"
        collapsible={true}
        defaultCollapsed={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const OutlinedDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="outlined"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const ElevatedDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="elevated"
        size="md"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const SmallDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="default"
        size="sm"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const LargeDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="default"
        size="lg"
        collapsible={false}
        loading={false}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const LoadingDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard
        title="Eksempel Tekst"
        description="Eksempel Tekst"
        variant="default"
        size="md"
        collapsible={false}
        loading={true}
      >
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </SectionCard>
    </div>
  );
};

const WithSubComponentsDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SectionCard variant="default" size="md">
        <SectionCardHeader
          title="Eksempel Tekst"
          description="Eksempel Tekst"
          icon={<Settings size={20} />}
          actions={
            <Button onClick={fn()} data-color="accent" data-size="sm">
              {t('platform.common.edit')}
            </Button>
          }
        />
        <SectionCardContent>
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
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
  render: function Render() {
    return <DefaultDemo />;
  },
};

// With icon
export const WithIcon: Story = {
  render: function Render() {
    return <WithIconDemo />;
  },
};

// With actions
export const WithActions: Story = {
  render: function Render() {
    return <WithActionsDemo />;
  },
};

// With footer
export const WithFooter: Story = {
  render: function Render() {
    return <WithFooterDemo />;
  },
};

// Collapsible
export const Collapsible: Story = {
  render: function Render() {
    return <CollapsibleDemo />;
  },
};

// Variants
export const Outlined: Story = {
  render: function Render() {
    return <OutlinedDemo />;
  },
};

export const Elevated: Story = {
  render: function Render() {
    return <ElevatedDemo />;
  },
};

// Size variants
export const Small: Story = {
  render: function Render() {
    return <SmallDemo />;
  },
};

export const Large: Story = {
  render: function Render() {
    return <LargeDemo />;
  },
};

// Loading state
export const Loading: Story = {
  render: function Render() {
    return <LoadingDemo />;
  },
};

// Using sub-components
export const WithSubComponents: Story = {
  render: function Render() {
    return <WithSubComponentsDemo />;
  },
};
