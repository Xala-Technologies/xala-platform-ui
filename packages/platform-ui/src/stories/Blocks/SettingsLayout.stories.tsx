import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  SettingsTabLayout,
  SettingsField,
  SettingsSection,
} from '../../blocks/settings/SettingsLayout';
import { Textfield, Button, Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof SettingsTabLayout> = {
  title: 'Blocks/SettingsLayout',
  component: SettingsTabLayout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SettingsLayout

Reusable layout components for settings tab content including SettingsTabLayout, SettingsField, and SettingsSection.

### Features
- Consistent settings page layout
- Field components with labels and descriptions
- Section grouping
- Design token compliant

### Usage
\`\`\`tsx
<SettingsTabLayout title="Settings" description="Manage your settings">
  <SettingsSection title="General">
    <SettingsField label="Name" description="Your display name">
      <Textfield />
    </SettingsField>
  </SettingsSection>
</SettingsTabLayout>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic layout
export const Default: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout
          title={t('platform.nav.settings')}
          description={t('storybook.demo.cardDescription')}
        >
          <SettingsField
            label={t('platform.auth.email')}
            description={t('storybook.demo.sampleText')}
          >
            <Textfield defaultValue="user@example.com" />
          </SettingsField>
          <SettingsField
            label={t('platform.nav.profile')}
            description={t('storybook.demo.sampleText')}
          >
            <Textfield defaultValue="John Doe" />
          </SettingsField>
        </SettingsTabLayout>
      </div>
    );
  },
};

// Without description
export const WithoutDescription: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout title={t('platform.nav.settings')}>
          <SettingsField label={t('platform.auth.email')}>
            <Textfield defaultValue="user@example.com" />
          </SettingsField>
          <SettingsField label={t('platform.nav.profile')}>
            <Textfield defaultValue="John Doe" />
          </SettingsField>
        </SettingsTabLayout>
      </div>
    );
  },
};

// With sections
export const WithSections: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout
          title={t('platform.nav.settings')}
          description={t('storybook.demo.cardDescription')}
        >
          <SettingsSection title={t('platform.common.details')}>
            <SettingsField
              label={t('platform.auth.email')}
              description={t('storybook.demo.sampleText')}
            >
              <Textfield defaultValue="user@example.com" />
            </SettingsField>
            <SettingsField
              label={t('platform.nav.profile')}
              description={t('storybook.demo.sampleText')}
            >
              <Textfield defaultValue="John Doe" />
            </SettingsField>
          </SettingsSection>
          <SettingsSection title={t('platform.auth.password')}>
            <SettingsField
              label={t('platform.auth.password')}
              description={t('storybook.demo.sampleText')}
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
            <SettingsField
              label={t('platform.common.details')}
              description={t('storybook.demo.sampleText')}
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
          </SettingsSection>
        </SettingsTabLayout>
      </div>
    );
  },
};

// Multiple sections
export const MultipleSections: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout
          title={t('platform.nav.settings')}
          description={t('storybook.demo.cardDescription')}
        >
          <SettingsSection title={t('platform.nav.profile')}>
            <SettingsField label={t('platform.nav.profile')}>
              <Textfield defaultValue="John Doe" />
            </SettingsField>
            <SettingsField
              label={t('platform.common.details')}
              description={t('storybook.demo.sampleText')}
            >
              <Textfield defaultValue="Software developer" />
            </SettingsField>
          </SettingsSection>
          <SettingsSection title={t('platform.common.notifications')}>
            <SettingsField
              label={t('platform.common.notifications')}
              description={t('storybook.demo.sampleText')}
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
            <SettingsField
              label={t('platform.common.notifications')}
              description={t('storybook.demo.sampleText')}
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
          </SettingsSection>
          <SettingsSection title={t('platform.common.details')}>
            <SettingsField
              label={t('platform.common.view')}
              description={t('storybook.demo.sampleText')}
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
          </SettingsSection>
        </SettingsTabLayout>
      </div>
    );
  },
};

// Field without description
export const FieldWithoutDescription: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout title={t('platform.nav.settings')}>
          <SettingsField label={t('platform.auth.email')}>
            <Textfield defaultValue="user@example.com" />
          </SettingsField>
          <SettingsField label={t('platform.nav.profile')}>
            <Textfield defaultValue="John Doe" />
          </SettingsField>
          <SettingsField
            label={t('platform.common.details')}
            description={t('storybook.demo.sampleText')}
          >
            <Textfield defaultValue="+47 123 45 678" />
          </SettingsField>
        </SettingsTabLayout>
      </div>
    );
  },
};
