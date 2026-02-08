import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DemoRoleSwitcher, Stack, Paragraph, Card, Button } from '../../index';

/**
 * DemoRoleSwitcher provides role-based demo login switcher.
 *
 * ## Features
 * - One-click demo login per role
 * - No manual token entry required
 * - Keyboard accessible
 * - Loading states
 *
 * ## When to Use
 * - Demo environments
 * - Development testing
 * - User demonstrations
 */
const meta: Meta<typeof DemoRoleSwitcher> = {
  title: 'Composed/DemoRoleSwitcher',
  component: DemoRoleSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DemoRoleSwitcher>;

/**
 * Default role switcher
 */
export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [loadingRole, setLoadingRole] = useState<
      null | 'admin' | 'case_handler' | 'org_admin' | 'org_member'
    >(null);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Button onClick={() => setOpen(true)}>
              "Eksempel Tekst"
            </Button>
            <DemoRoleSwitcher
              open={open}
              onClose={() => setOpen(false)}
              onRoleSelect={async (key) => {
                setLoadingRole(key);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setLoadingRole(null);
                setOpen(false);
                console.log('Selected role:', key);
              }}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              cancelText="Eksempel Tekst"
              loadingRole={loadingRole}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Role switcher with custom options
 */
export const CustomOptions: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    const [loadingRole, setLoadingRole] = useState<
      null | 'admin' | 'case_handler' | 'org_admin' | 'org_member'
    >(null);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <DemoRoleSwitcher
              open={open}
              onClose={() => setOpen(false)}
              onRoleSelect={async (key) => {
                setLoadingRole(key);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setLoadingRole(null);
                setOpen(false);
              }}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              cancelText="Eksempel Tekst"
              options={[
                {
                  key: 'admin',
                  label: t('storybook.demoRoleSwitcher.admin'),
                  description: t('storybook.demoRoleSwitcher.adminDescription'),
                },
                {
                  key: 'case_handler',
                  label: t('storybook.demoRoleSwitcher.caseHandler'),
                  description: t('storybook.demoRoleSwitcher.caseHandlerDescription'),
                },
              ]}
              loadingRole={loadingRole}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Role switcher with error
 */
export const WithError: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <DemoRoleSwitcher
              open={open}
              onClose={() => setOpen(false)}
              onRoleSelect={async () => {
                throw new Error('Role selection failed');
              }}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              cancelText="Eksempel Tekst"
              error="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
