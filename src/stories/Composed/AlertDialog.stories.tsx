import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { AlertDialog, Stack, Paragraph, Card, Button } from '../../index';

/**
 * AlertDialog provides an alert dialog for informational messages.
 *
 * ## Features
 * - Multiple variants (info, success, warning, danger)
 * - Simple close action
 * - Customizable text
 *
 * ## When to Use
 * - Information messages
 * - Success notifications
 * - Warning alerts
 * - Error messages
 */
const meta: Meta<typeof AlertDialog> = {
  title: 'Composed/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

/**
 * Default alert dialog
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.alertDialog.description')}</Paragraph>
            <Button onClick={() => setOpen(true)}>{t('storybook.alertDialog.openDialog')}</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title={t('storybook.alertDialog.title')}
              description={t('storybook.alertDialog.descriptionText')}
              closeText={t('storybook.alertDialog.close')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Info variant
 */
export const Info: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.alertDialog.info')}</Paragraph>
            <Button onClick={() => setOpen(true)}>{t('storybook.alertDialog.openDialog')}</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title={t('storybook.alertDialog.infoTitle')}
              description={t('storybook.alertDialog.infoDescription')}
              closeText={t('storybook.alertDialog.close')}
              variant="info"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Success variant
 */
export const Success: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.alertDialog.success')}</Paragraph>
            <Button onClick={() => setOpen(true)}>{t('storybook.alertDialog.openDialog')}</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title={t('storybook.alertDialog.successTitle')}
              description={t('storybook.alertDialog.successDescription')}
              closeText={t('storybook.alertDialog.close')}
              variant="success"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Warning variant
 */
export const Warning: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.alertDialog.warning')}</Paragraph>
            <Button onClick={() => setOpen(true)}>{t('storybook.alertDialog.openDialog')}</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title={t('storybook.alertDialog.warningTitle')}
              description={t('storybook.alertDialog.warningDescription')}
              closeText={t('storybook.alertDialog.close')}
              variant="warning"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Danger variant
 */
export const Danger: Story = {
  render: function Render() {
    const t = useT();
    const [open, setOpen] = useState(false);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.alertDialog.danger')}</Paragraph>
            <Button onClick={() => setOpen(true)}>{t('storybook.alertDialog.openDialog')}</Button>
            <AlertDialog
              open={open}
              onClose={() => setOpen(false)}
              title={t('storybook.alertDialog.dangerTitle')}
              description={t('storybook.alertDialog.dangerDescription')}
              closeText={t('storybook.alertDialog.close')}
              variant="danger"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
