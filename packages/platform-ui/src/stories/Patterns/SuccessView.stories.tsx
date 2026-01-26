import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { SuccessView, Stack, Paragraph, Card } from '../../index';
import { CheckCircleIcon } from '../../index';

/**
 * SuccessView provides a domain-neutral success screen pattern.
 *
 * ## Features
 * - Success icon
 * - Title and message
 * - Optional details
 * - Primary and secondary actions
 *
 * ## When to Use
 * - Success pages
 * - Confirmation screens
 * - Completion states
 */
const meta: Meta<typeof SuccessView> = {
  title: 'Patterns/SuccessView',
  component: SuccessView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SuccessView>;

/**
 * Default success view
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.successView.description')}</Paragraph>
            <SuccessView
              title={t('storybook.successView.title')}
              message={t('storybook.successView.message')}
              primaryAction={{
                label: t('storybook.successView.continue'),
                onClick: () => console.log('Continue clicked'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Success view with details
 */
export const WithDetails: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.successView.withDetails')}</Paragraph>
            <SuccessView
              title={t('storybook.successView.title')}
              message={t('storybook.successView.message')}
              details={[
                { label: t('storybook.successView.reference'), value: 'REF-12345' },
                { label: t('storybook.successView.status'), value: t('storybook.successView.confirmed') },
              ]}
              primaryAction={{
                label: t('storybook.successView.continue'),
                onClick: () => console.log('Continue clicked'),
              }}
              secondaryAction={{
                label: t('storybook.successView.backToHome'),
                onClick: () => console.log('Back to home clicked'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Success view with custom icon
 */
export const WithCustomIcon: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.successView.withCustomIcon')}</Paragraph>
            <SuccessView
              icon={<CheckCircleIcon />}
              title={t('storybook.successView.title')}
              message={t('storybook.successView.message')}
              primaryAction={{
                label: t('storybook.successView.continue'),
                onClick: () => console.log('Continue clicked'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
