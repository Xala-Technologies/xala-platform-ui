import type { Meta, StoryObj } from '@storybook/react';
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
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout
          title={t('platform.nav.settings')}
          description="Eksempel Tekst"
        >
          <SettingsField
            label={t('platform.auth.email')}
            description="Eksempel Tekst"
          >
            <Textfield defaultValue="user@example.com" />
          </SettingsField>
          <SettingsField
            label={t('platform.nav.profile')}
            description="Eksempel Tekst"
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
  render: function Render() {
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
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout
          title={t('platform.nav.settings')}
          description="Eksempel Tekst"
        >
          <SettingsSection title={t('platform.common.details')}>
            <SettingsField
              label={t('platform.auth.email')}
              description="Eksempel Tekst"
            >
              <Textfield defaultValue="user@example.com" />
            </SettingsField>
            <SettingsField
              label={t('platform.nav.profile')}
              description="Eksempel Tekst"
            >
              <Textfield defaultValue="John Doe" />
            </SettingsField>
          </SettingsSection>
          <SettingsSection title={t('platform.auth.password')}>
            <SettingsField
              label={t('platform.auth.password')}
              description="Eksempel Tekst"
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
            <SettingsField
              label={t('platform.common.details')}
              description="Eksempel Tekst"
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
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '700px' }}>
        <SettingsTabLayout
          title={t('platform.nav.settings')}
          description="Eksempel Tekst"
        >
          <SettingsSection title={t('platform.nav.profile')}>
            <SettingsField label={t('platform.nav.profile')}>
              <Textfield defaultValue="John Doe" />
            </SettingsField>
            <SettingsField
              label={t('platform.common.details')}
              description="Eksempel Tekst"
            >
              <Textfield defaultValue="Software developer" />
            </SettingsField>
          </SettingsSection>
          <SettingsSection title={t('platform.common.notifications')}>
            <SettingsField
              label={t('platform.common.notifications')}
              description="Eksempel Tekst"
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
            <SettingsField
              label={t('platform.common.notifications')}
              description="Eksempel Tekst"
            >
              <Button>{t('platform.common.edit')}</Button>
            </SettingsField>
          </SettingsSection>
          <SettingsSection title={t('platform.common.details')}>
            <SettingsField
              label={t('platform.common.view')}
              description="Eksempel Tekst"
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
  render: function Render() {
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
            description="Eksempel Tekst"
          >
            <Textfield defaultValue="+47 123 45 678" />
          </SettingsField>
        </SettingsTabLayout>
      </div>
    );
  },
};
