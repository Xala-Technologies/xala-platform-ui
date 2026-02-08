import type { Meta, StoryObj } from '@storybook/react';
import {
  AppHeader,
  HeaderLogo,
  HeaderSearch,
  HeaderActions,
  Stack,
  Paragraph,
  Card,
  Button,
} from '../../index';
import { UserIcon, BellIcon } from '../../index';

/**
 * AppHeader provides the main application header with logo, search, and actions.
 *
 * ## Features
 * - Logo support
 * - Search integration
 * - Action buttons
 * - Sticky positioning
 * - Skip link for accessibility
 *
 * ## When to Use
 * - Application headers
 * - Main navigation headers
 * - Global headers
 */
const meta: Meta<typeof AppHeader> = {
  title: 'Composed/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

/**
 * Default app header
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <AppHeader
              logo={<HeaderLogo title="Eksempel Tekst" />}
              search={<HeaderSearch placeholder="Eksempel Tekst" />}
              actions={
                <HeaderActions>
                  <Button data-color="neutral" aria-label="Eksempel Tekst">
                    <BellIcon />
                  </Button>
                  <Button data-color="neutral" aria-label="Eksempel Tekst">
                    <UserIcon />
                  </Button>
                </HeaderActions>
              }
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Header with logo only
 */
export const LogoOnly: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <AppHeader logo={<HeaderLogo title="Eksempel Tekst" />} />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Non-sticky header
 */
export const NonSticky: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <AppHeader
              sticky={false}
              logo={<HeaderLogo title="Eksempel Tekst" />}
              search={<HeaderSearch placeholder="Eksempel Tekst" />}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
