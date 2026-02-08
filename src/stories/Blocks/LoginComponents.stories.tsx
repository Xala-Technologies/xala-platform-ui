import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  LoginOption,
  FeatureItem,
  IntegrationBadge,
  LoginFooterLink,
  LoginLayout,
  Stack,
  Paragraph,
  Card,
} from '../../index';
import { IdPortenIcon, MicrosoftIcon, GoogleIcon } from '../../index';

/**
 * LoginComponents provides reusable components for authentication pages.
 *
 * ## Components
 * - LoginOption: SSO provider button
 * - FeatureItem: Feature list item
 * - IntegrationBadge: Integration badge
 * - LoginFooterLink: Footer link
 * - LoginLayout: Login page layout
 *
 * ## When to Use
 * - Login pages
 * - Authentication flows
 * - SSO integration
 */
const meta: Meta<typeof LoginOption> = {
  title: 'Blocks/LoginComponents',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginOption>;

/**
 * LoginOption component
 */
export const LoginOptionExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.loginComponents.loginOption')}</Paragraph>
            <LoginOption
              icon={<IdPortenIcon />}
              title={t('storybook.loginComponents.idPorten')}
              description={t('storybook.loginComponents.idPortenDescription')}
              onClick={() => console.log('ID-porten clicked')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Multiple login options
 */
export const MultipleLoginOptions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.loginComponents.multipleOptions')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <LoginOption
                icon={<IdPortenIcon />}
                title={t('storybook.loginComponents.idPorten')}
                description={t('storybook.loginComponents.idPortenDescription')}
                onClick={() => console.log('ID-porten clicked')}
              />
              <LoginOption
                icon={<MicrosoftIcon />}
                title={t('storybook.loginComponents.microsoft')}
                description={t('storybook.loginComponents.microsoftDescription')}
                onClick={() => console.log('Microsoft clicked')}
              />
              <LoginOption
                icon={<GoogleIcon />}
                title={t('storybook.loginComponents.google')}
                description={t('storybook.loginComponents.googleDescription')}
                onClick={() => console.log('Google clicked')}
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * FeatureItem component
 */
export const FeatureItemExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.loginComponents.featureItem')}</Paragraph>
            <FeatureItem
              title={t('storybook.loginComponents.feature1')}
              description={t('storybook.loginComponents.feature1Description')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * IntegrationBadge component
 */
export const IntegrationBadgeExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.loginComponents.integrationBadge')}</Paragraph>
            <IntegrationBadge
              name={t('storybook.loginComponents.integrationName')}
              description={t('storybook.loginComponents.integrationDescription')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
