import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  HeaderLogo,
  HeaderSearch,
  HeaderActions,
  Stack,
  Paragraph,
  Card,
  Button,
} from '../../index';
import { UserIcon, BellIcon, SettingsIcon } from '../../index';

/**
 * HeaderParts provides individual components for header sections.
 *
 * ## Components
 * - HeaderLogo: Logo display component
 * - HeaderSearch: Search input with dropdown
 * - HeaderActions: Action buttons container
 *
 * ## When to Use
 * - Building custom headers
 * - Header composition
 * - Header customization
 */
const meta: Meta<typeof HeaderLogo> = {
  title: 'Composed/HeaderParts',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeaderLogo>;

/**
 * HeaderLogo component
 */
export const Logo: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.headerParts.logo')}</Paragraph>
            <HeaderLogo
              title={t('storybook.headerParts.appName')}
              subtitle={t('storybook.headerParts.subtitle')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * HeaderSearch component
 */
export const Search: Story = {
  render: function Render() {
    const t = useT();
    const [searchValue, setSearchValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.headerParts.search')}</Paragraph>
            <HeaderSearch
              placeholder={t('storybook.headerParts.searchPlaceholder')}
              value={searchValue}
              onSearchChange={setSearchValue}
              onSearch={(value) => console.log('Search:', value)}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * HeaderActions component
 */
export const Actions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.headerParts.actions')}</Paragraph>
            <HeaderActions>
              <Button data-color="neutral" aria-label={t('storybook.headerParts.notifications')}>
                <BellIcon />
              </Button>
              <Button data-color="neutral" aria-label={t('storybook.headerParts.settings')}>
                <SettingsIcon />
              </Button>
              <Button data-color="neutral" aria-label={t('storybook.headerParts.profile')}>
                <UserIcon />
              </Button>
            </HeaderActions>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
