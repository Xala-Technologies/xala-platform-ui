import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ToastProvider, useToast, Button, Stack } from '../../index';

/**
 * ToastProvider provides toast notifications with queue management.
 *
 * ## Features
 * - Multiple toast types (success, error, warning, info)
 * - Auto-dismiss
 * - Queue management
 * - Multiple positions
 * - Action buttons
 *
 * ## When to Use
 * - Success messages
 * - Error notifications
 * - Info messages
 * - Warning alerts
 */
const meta: Meta<typeof ToastProvider> = {
  title: 'Composed/NotificationToast',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
NotificationToast provides toast notifications with queue management.

## Features
- Multiple toast types (success, error, warning, info)
- Auto-dismiss
- Queue management
- Multiple positions
- Action buttons

## When to Use
- Success messages
- Error notifications
- Info messages
- Warning alerts
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// Helper component to trigger toasts
function ToastTrigger() {
  const t = useT();
  const { addToast } = useToast();
    return (
      <Stack direction="horizontal" spacing="var(--ds-spacing-2)" style={{ padding: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
        <Button
        data-color="success"
        onClick={() =>
          addToast({
            type: 'success',
            title: t('storybook.notificationToast.successTitle'),
            message: t('storybook.notificationToast.successMessage'),
          })
        }
      >
        {t('storybook.notificationToast.showSuccess')}
      </Button>
      <Button
        data-color="danger"
        onClick={() =>
          addToast({
            type: 'error',
            title: t('storybook.notificationToast.errorTitle'),
            message: t('storybook.notificationToast.errorMessage'),
          })
        }
      >
        {t('storybook.notificationToast.showError')}
      </Button>
      <Button
        data-color="warning"
        onClick={() =>
          addToast({
            type: 'warning',
            title: t('storybook.notificationToast.warningTitle'),
            message: t('storybook.notificationToast.warningMessage'),
          })
        }
      >
        {t('storybook.notificationToast.showWarning')}
      </Button>
      <Button
        data-color="info"
        onClick={() =>
          addToast({
            type: 'info',
            title: t('storybook.notificationToast.infoTitle'),
            message: t('storybook.notificationToast.infoMessage'),
          })
        }
      >
        {t('storybook.notificationToast.showInfo')}
      </Button>
      </Stack>
  );
}

/**
 * Default notification toast
 */
export const Default: Story = {
  render: function Render() {
    return (
      <>
        <ToastTrigger />
      </>
    );
  },
};

/**
 * Toast with action button
 */
export const WithAction: Story = {
  render: function Render() {
    const t = useT();
    const { addToast } = useToast();
    return (
      <>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Button
            data-color="accent"
            onClick={() =>
              addToast({
                type: 'success',
                title: t('storybook.notificationToast.actionTitle'),
                message: t('storybook.notificationToast.actionMessage'),
                action: {
                  label: t('storybook.notificationToast.undo'),
                  onClick: () => console.log('Undo clicked'),
                },
              })
            }
          >
            {t('storybook.notificationToast.showWithAction')}
          </Button>
        </Stack>
        <NotificationToast />
      </>
    );
  },
};

/**
 * Toast with custom duration
 */
export const CustomDuration: Story = {
  render: function Render() {
    const t = useT();
    const { addToast } = useToast();
    return (
      <>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Button
            data-color="accent"
            onClick={() =>
              addToast({
                type: 'info',
                title: t('storybook.notificationToast.customDurationTitle'),
                message: t('storybook.notificationToast.customDurationMessage'),
                duration: 10000,
              })
            }
          >
            {t('storybook.notificationToast.showCustomDuration')}
          </Button>
        </div>
        <NotificationToast />
      </>
    );
  },
};

/**
 * Multiple toasts
 */
export const Multiple: Story = {
  render: function Render() {
    const t = useT();
    const { addToast } = useToast();
    return (
      <>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Button
            data-color="accent"
            onClick={() => {
              addToast({ type: 'success', title: t('storybook.notificationToast.toast1') });
              setTimeout(() => addToast({ type: 'info', title: t('storybook.notificationToast.toast2') }), 500);
              setTimeout(() => addToast({ type: 'warning', title: t('storybook.notificationToast.toast3') }), 1000);
            }}
          >
            {t('storybook.notificationToast.showMultiple')}
          </Button>
        </div>
        <NotificationToast />
      </>
    );
  },
};
