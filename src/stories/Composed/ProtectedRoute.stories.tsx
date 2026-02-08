import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ProtectedRoute, Stack, Paragraph, Card } from '../../index';

/**
 * ProtectedRoute provides route protection with authentication, role, and capability checks.
 *
 * ## Features
 * - Authentication checks
 * - Role-based access control
 * - Capability-based access control
 * - Flow context preservation
 * - Loading states
 * - Access denied handling
 *
 * ## When to Use
 * - Protected routes
 * - Authentication gating
 * - Role-based routing
 */
const meta: Meta<typeof ProtectedRoute> = {
  title: 'Composed/ProtectedRoute',
  component: ProtectedRoute,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProtectedRoute>;

/**
 * Loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.protectedRoute.loading')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.protectedRoute.loadingNote')}</Paragraph>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Authenticated state
 */
export const Authenticated: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.protectedRoute.authenticated')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.protectedRoute.authenticatedNote')}</Paragraph>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Access denied state
 */
export const AccessDenied: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.protectedRoute.accessDenied')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.protectedRoute.accessDeniedNote')}</Paragraph>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
