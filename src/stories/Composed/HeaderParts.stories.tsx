import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <HeaderLogo
              title="Eksempel Tekst"
              subtitle="Eksempel Tekst"
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
    const [searchValue, setSearchValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <HeaderSearch
              placeholder="Eksempel Tekst"
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <HeaderActions>
              <Button data-color="neutral" aria-label="Eksempel Tekst">
                <BellIcon />
              </Button>
              <Button data-color="neutral" aria-label="Eksempel Tekst">
                <SettingsIcon />
              </Button>
              <Button data-color="neutral" aria-label="Eksempel Tekst">
                <UserIcon />
              </Button>
            </HeaderActions>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
