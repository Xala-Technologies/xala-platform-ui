import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { AppHeader, HeaderLogo, HeaderSearch, HeaderActions, Stack, Paragraph, Card, Button } from '../../index';
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.appHeader.description')}</Paragraph>
            <AppHeader
              logo={<HeaderLogo title={t('storybook.appHeader.appName')} />}
              search={<HeaderSearch placeholder={t('storybook.appHeader.searchPlaceholder')} />}
              actions={
                <HeaderActions>
                  <Button data-color="neutral" aria-label={t('storybook.appHeader.notifications')}>
                    <BellIcon />
                  </Button>
                  <Button data-color="neutral" aria-label={t('storybook.appHeader.profile')}>
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.appHeader.logoOnly')}</Paragraph>
            <AppHeader logo={<HeaderLogo title={t('storybook.appHeader.appName')} />} />
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.appHeader.nonSticky')}</Paragraph>
            <AppHeader
              sticky={false}
              logo={<HeaderLogo title={t('storybook.appHeader.appName')} />}
              search={<HeaderSearch placeholder={t('storybook.appHeader.searchPlaceholder')} />}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
