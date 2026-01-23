import type { Meta, StoryObj } from '@storybook/react';
import { SettingsTabLayout, SettingsField, SettingsSection } from '../../blocks/settings/SettingsLayout';
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
  render: () => (
    <div style={{ width: '700px' }}>
      <SettingsTabLayout title="Settings" description="Manage your account settings">
        <SettingsField label="Email" description="Your email address">
          <Textfield defaultValue="user@example.com" />
        </SettingsField>
        <SettingsField label="Name" description="Your display name">
          <Textfield defaultValue="John Doe" />
        </SettingsField>
      </SettingsTabLayout>
    </div>
  ),
};

// Without description
export const WithoutDescription: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <SettingsTabLayout title="Settings">
        <SettingsField label="Email">
          <Textfield defaultValue="user@example.com" />
        </SettingsField>
        <SettingsField label="Name">
          <Textfield defaultValue="John Doe" />
        </SettingsField>
      </SettingsTabLayout>
    </div>
  ),
};

// With sections
export const WithSections: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <SettingsTabLayout title="Settings" description="Manage your account settings">
        <SettingsSection title="General">
          <SettingsField label="Email" description="Your email address">
            <Textfield defaultValue="user@example.com" />
          </SettingsField>
          <SettingsField label="Name" description="Your display name">
            <Textfield defaultValue="John Doe" />
          </SettingsField>
        </SettingsSection>
        <SettingsSection title="Security">
          <SettingsField label="Password" description="Change your password">
            <Button>Change Password</Button>
          </SettingsField>
          <SettingsField label="Two-Factor Authentication" description="Enable 2FA for extra security">
            <Button>Enable 2FA</Button>
          </SettingsField>
        </SettingsSection>
      </SettingsTabLayout>
    </div>
  ),
};

// Multiple sections
export const MultipleSections: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <SettingsTabLayout title="Account Settings" description="Manage all your account preferences">
        <SettingsSection title="Profile">
          <SettingsField label="Display Name">
            <Textfield defaultValue="John Doe" />
          </SettingsField>
          <SettingsField label="Bio" description="Tell us about yourself">
            <Textfield defaultValue="Software developer" />
          </SettingsField>
        </SettingsSection>
        <SettingsSection title="Notifications">
          <SettingsField label="Email Notifications" description="Receive email notifications">
            <Button>Configure</Button>
          </SettingsField>
          <SettingsField label="Push Notifications" description="Receive push notifications">
            <Button>Configure</Button>
          </SettingsField>
        </SettingsSection>
        <SettingsSection title="Privacy">
          <SettingsField label="Profile Visibility" description="Who can see your profile">
            <Button>Configure</Button>
          </SettingsField>
        </SettingsSection>
      </SettingsTabLayout>
    </div>
  ),
};

// Field without description
export const FieldWithoutDescription: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <SettingsTabLayout title="Settings">
        <SettingsField label="Email">
          <Textfield defaultValue="user@example.com" />
        </SettingsField>
        <SettingsField label="Name">
          <Textfield defaultValue="John Doe" />
        </SettingsField>
        <SettingsField label="Phone" description="Your phone number">
          <Textfield defaultValue="+47 123 45 678" />
        </SettingsField>
      </SettingsTabLayout>
    </div>
  ),
};
