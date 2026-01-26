import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { DemoLoginDialog, Stack, Paragraph, Card, Button } from '../../index';

/**
 * DemoLoginDialog provides a reusable demo login dialog for all applications.
 *
 * ## Features
 * - Proper Designsystemet form layout
 * - Field-level validation with native error display
 * - Real-time error clearing
 * - Loading states
 * - Accessible form controls
 *
 * ## When to Use
 * - Demo environments
 * - Development testing
 * - User demonstrations
 */
const meta: Meta<typeof DemoLoginDialog> = {
  title: 'Composed/DemoLoginDialog',
  component: DemoLoginDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DemoLoginDialog>;

/**
 * Default demo login dialog
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.demoLoginDialog.description')}</Paragraph>
            <Button onClick={() => setOpen(true)}>{t('storybook.demoLoginDialog.openDialog')}</Button>
            <DemoLoginDialog
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={async (data) => {
                console.log('Login data:', data);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setOpen(false);
              }}
              title={t('storybook.demoLoginDialog.title')}
              description={t('storybook.demoLoginDialog.descriptionText')}
              cancelText={t('storybook.demoLoginDialog.cancel')}
              submitText={t('storybook.demoLoginDialog.submit')}
              loadingText={t('storybook.demoLoginDialog.loading')}
              validationMessages={{
                nameRequired: t('storybook.demoLoginDialog.nameRequired'),
                emailRequired: t('storybook.demoLoginDialog.emailRequired'),
                tokenRequired: t('storybook.demoLoginDialog.tokenRequired'),
                invalidEmail: t('storybook.demoLoginDialog.invalidEmail'),
              }}
              labels={{
                name: t('storybook.demoLoginDialog.name'),
                email: t('storybook.demoLoginDialog.email'),
                token: t('storybook.demoLoginDialog.token'),
              }}
              placeholders={{
                name: t('storybook.demoLoginDialog.namePlaceholder'),
                email: t('storybook.demoLoginDialog.emailPlaceholder'),
                token: t('storybook.demoLoginDialog.tokenPlaceholder'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Dialog with error state
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(true);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.demoLoginDialog.withError')}</Paragraph>
            <DemoLoginDialog
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={async () => {
                throw new Error('Login failed');
              }}
              title={t('storybook.demoLoginDialog.title')}
              description={t('storybook.demoLoginDialog.descriptionText')}
              cancelText={t('storybook.demoLoginDialog.cancel')}
              submitText={t('storybook.demoLoginDialog.submit')}
              loadingText={t('storybook.demoLoginDialog.loading')}
              validationMessages={{
                nameRequired: t('storybook.demoLoginDialog.nameRequired'),
                emailRequired: t('storybook.demoLoginDialog.emailRequired'),
                tokenRequired: t('storybook.demoLoginDialog.tokenRequired'),
                invalidEmail: t('storybook.demoLoginDialog.invalidEmail'),
              }}
              labels={{
                name: t('storybook.demoLoginDialog.name'),
                email: t('storybook.demoLoginDialog.email'),
                token: t('storybook.demoLoginDialog.token'),
              }}
              placeholders={{
                name: t('storybook.demoLoginDialog.namePlaceholder'),
                email: t('storybook.demoLoginDialog.emailPlaceholder'),
                token: t('storybook.demoLoginDialog.tokenPlaceholder'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
