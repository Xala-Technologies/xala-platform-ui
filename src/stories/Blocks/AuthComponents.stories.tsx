import type { Meta, StoryObj } from '@storybook/react';
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
    return <LoadingScreen message="Eksempel Tekst" height="400px" />;
  },
};

/**
 * AccessDeniedScreen component
 */
export const AccessDenied: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <AccessDeniedScreen
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              showBackButton
              backButtonText="Eksempel Tekst"
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
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <NotFoundScreen
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              showBackButton
              backButtonText="Eksempel Tekst"
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
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <ErrorScreen
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              showRetry
              retryButtonText="Eksempel Tekst"
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <PermissionGate
              hasPermission={true}
              fallback={
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              }
            >
              <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
            </PermissionGate>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
