import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  LoadingScreen,
  AccessDeniedScreen,
  NotFoundScreen,
  ErrorScreen,
  PermissionGate,
  Stack,
  Paragraph,
  Card,
  Button,
} from '../../index';

/**
 * AuthComponents provides reusable components for authentication-related UI.
 *
 * ## Components
 * - LoadingScreen: Full page loading state
 * - AccessDeniedScreen: No permission error screen
 * - NotFoundScreen: 404 error screen
 * - ErrorScreen: Generic error screen
 * - PermissionGate: Conditional rendering based on permissions
 *
 * ## When to Use
 * - Authentication flows
 * - Error handling
 * - Permission checks
 */
const meta: Meta<typeof LoadingScreen> = {
  title: 'Blocks/AuthComponents',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingScreen>;

/**
 * LoadingScreen component
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    return <LoadingScreen message={t('storybook.authComponents.loading')} height="400px" />;
  },
};

/**
 * AccessDeniedScreen component
 */
export const AccessDenied: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.authComponents.accessDenied')}</Paragraph>
            <AccessDeniedScreen
              title={t('storybook.authComponents.accessDeniedTitle')}
              description={t('storybook.authComponents.accessDeniedDescription')}
              showBackButton
              backButtonText={t('storybook.authComponents.goBack')}
              onBack={() => console.log('Back clicked')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * NotFoundScreen component
 */
export const NotFound: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.authComponents.notFound')}</Paragraph>
            <NotFoundScreen
              title={t('storybook.authComponents.notFoundTitle')}
              description={t('storybook.authComponents.notFoundDescription')}
              showBackButton
              backButtonText={t('storybook.authComponents.goBack')}
              onBack={() => console.log('Back clicked')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ErrorScreen component
 */
export const Error: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.authComponents.error')}</Paragraph>
            <ErrorScreen
              title={t('storybook.authComponents.errorTitle')}
              description={t('storybook.authComponents.errorDescription')}
              showRetry
              retryButtonText={t('storybook.authComponents.retry')}
              onRetry={() => console.log('Retry clicked')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * PermissionGate component
 */
export const PermissionGateExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.authComponents.permissionGate')}</Paragraph>
            <PermissionGate
              hasPermission={true}
              fallback={
                <Paragraph data-size="sm">{t('storybook.authComponents.noPermission')}</Paragraph>
              }
            >
              <Paragraph data-size="sm">{t('storybook.authComponents.hasPermission')}</Paragraph>
            </PermissionGate>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
