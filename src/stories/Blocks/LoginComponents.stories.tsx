import type { Meta, StoryObj } from '@storybook/react';
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <LoginOption
              icon={<IdPortenIcon />}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <LoginOption
                icon={<IdPortenIcon />}
                title="Eksempel Tekst"
                description="Eksempel Tekst"
                onClick={() => console.log('ID-porten clicked')}
              />
              <LoginOption
                icon={<MicrosoftIcon />}
                title="Eksempel Tekst"
                description="Eksempel Tekst"
                onClick={() => console.log('Microsoft clicked')}
              />
              <LoginOption
                icon={<GoogleIcon />}
                title="Eksempel Tekst"
                description="Eksempel Tekst"
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <FeatureItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <IntegrationBadge
              name="Eksempel Tekst"
              description="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
