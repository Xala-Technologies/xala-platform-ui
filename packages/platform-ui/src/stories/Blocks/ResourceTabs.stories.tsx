import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ResourceTabs } from '../../blocks/ResourceTabs';
import { Paragraph, Heading } from '@digdir/designsystemet-react';
import { Info, Settings, FileText, Calendar } from 'lucide-react';

const meta: Meta<typeof ResourceTabs> = {
  title: 'Blocks/ResourceTabs',
  component: ResourceTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceTabs

Tabbed navigation component for resource detail pages. Supports dynamic tabs based on resource type and available content.

### Features
- Dynamic tab configuration
- Tab icons
- Badge counts
- Visible/hidden tabs
- Multiple variants
- Tab content panels

### Usage
\`\`\`tsx
<ResourceTabs
  tabs={[
    { id: 'overview', label: 'Overview', content: <div>Content</div> },
    { id: 'details', label: 'Details', content: <div>Details</div> },
  ]}
  activeTab="overview"
  onTabChange={handleTabChange}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onTabChange: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'subtle'],
      description: 'Tab list variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs
export const Default: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'settings',
            label: t('platform.nav.settings'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        onTabChange={fn()}
      />
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            icon: <Info size={16} />,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            icon: <FileText size={16} />,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'settings',
            label: t('platform.nav.settings'),
            icon: <Settings size={16} />,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        onTabChange={fn()}
      />
    );
  },
};

// With badges
export const WithBadges: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            badge: 3,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            badge: 12,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'calendar',
            label: t('platform.nav.dashboard'),
            badge: 'New',
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        onTabChange={fn()}
      />
    );
  },
};

// With icons and badges
export const WithIconsAndBadges: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            icon: <Info size={16} />,
            badge: 3,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            icon: <FileText size={16} />,
            badge: 12,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'calendar',
            label: t('platform.nav.dashboard'),
            icon: <Calendar size={16} />,
            badge: 'New',
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        onTabChange={fn()}
      />
    );
  },
};

// Secondary variant
export const SecondaryVariant: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        variant="secondary"
        onTabChange={fn()}
      />
    );
  },
};

// Subtle variant
export const SubtleVariant: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        variant="subtle"
        onTabChange={fn()}
      />
    );
  },
};

// With hidden tabs
export const WithHiddenTabs: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            visible: true,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            visible: true,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
          {
            id: 'hidden',
            label: 'Hidden',
            visible: false,
            content: <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>,
          },
        ]}
        activeTab="overview"
        onTabChange={fn()}
      />
    );
  },
};

// Rich content
export const RichContent: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceTabs
        tabs={[
          {
            id: 'overview',
            label: t('platform.common.view'),
            content: (
              <div>
                <Heading level={3} data-size="sm">
                  {t('storybook.demo.cardTitle')}
                </Heading>
                <Paragraph data-size="sm">{t('storybook.demo.cardDescription')}</Paragraph>
              </div>
            ),
          },
          {
            id: 'details',
            label: t('platform.common.details'),
            content: (
              <div>
                <Heading level={3} data-size="sm">
                  {t('storybook.demo.cardTitle')}
                </Heading>
                <Paragraph data-size="sm">{t('storybook.demo.cardDescription')}</Paragraph>
              </div>
            ),
          },
        ]}
        activeTab="overview"
        onTabChange={fn()}
      />
    );
  },
};
