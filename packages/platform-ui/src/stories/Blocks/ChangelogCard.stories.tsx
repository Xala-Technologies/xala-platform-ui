import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ChangelogCard, type ChangeItem, Stack } from '../../index';

/**
 * ChangelogCard displays changelog entries with version, date, and changes.
 *
 * ## Features
 * - Version display
 * - Change types (added, changed, fixed, removed, deprecated, security)
 * - Grouped changes
 * - Release links
 * - Latest/prerelease badges
 *
 * ## When to Use
 * - Changelog pages
 * - Release notes
 * - Version history
 */
const meta: Meta<typeof ChangelogCard> = {
  title: 'Blocks/ChangelogCard',
  component: ChangelogCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ChangelogCard displays changelog entries with version, date, and changes.

## Features
- Version display
- Change types (added, changed, fixed, removed, deprecated, security)
- Grouped changes
- Release links
- Latest/prerelease badges

## When to Use
- Changelog pages
- Release notes
- Version history
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChangelogCard>;

// Sample changes
const useSampleChanges = (): ChangeItem[] => {
  const t = useT();
  return [
    {
      type: 'added',
      description: t('storybook.changelogCard.addedFeature'),
      issueNumber: '#123',
    },
    {
      type: 'changed',
      description: t('storybook.changelogCard.changedBehavior'),
      issueNumber: '#456',
    },
    {
      type: 'fixed',
      description: t('storybook.changelogCard.fixedBug'),
      issueNumber: '#789',
    },
  ];
};

/**
 * Default changelog card
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const changes = useSampleChanges();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ChangelogCard
          version="1.2.0"
          date={new Date(2026, 0, 26)}
          changes={changes}
          releaseUrl="https://github.com/example/releases/tag/v1.2.0"
        />
      </Stack>
    );
  },
};

/**
 * Changelog card - latest version
 */
export const Latest: Story = {
  render: function Render() {
    const t = useT();
    const changes = useSampleChanges();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ChangelogCard
          version="1.2.0"
          date={new Date(2026, 0, 26)}
          changes={changes}
          isLatest
          releaseUrl="https://github.com/example/releases/tag/v1.2.0"
        />
      </Stack>
    );
  },
};

/**
 * Changelog card - prerelease
 */
export const Prerelease: Story = {
  render: function Render() {
    const t = useT();
    const changes = useSampleChanges();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ChangelogCard
          version="1.3.0-beta.1"
          date={new Date(2026, 0, 26)}
          changes={changes}
          isPrerelease
          releaseUrl="https://github.com/example/releases/tag/v1.3.0-beta.1"
        />
      </Stack>
    );
  },
};

/**
 * Changelog card with all change types
 */
export const AllChangeTypes: Story = {
  render: function Render() {
    const t = useT();
    const changes: ChangeItem[] = [
      { type: 'added', description: t('storybook.changelogCard.addedFeature') },
      { type: 'changed', description: t('storybook.changelogCard.changedBehavior') },
      { type: 'fixed', description: t('storybook.changelogCard.fixedBug') },
      { type: 'removed', description: t('storybook.changelogCard.removedFeature') },
      { type: 'deprecated', description: t('storybook.changelogCard.deprecatedApi') },
      { type: 'security', description: t('storybook.changelogCard.securityFix') },
    ];
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ChangelogCard
          version="1.2.0"
          date={new Date(2026, 0, 26)}
          changes={changes}
          releaseUrl="https://github.com/example/releases/tag/v1.2.0"
        />
      </Stack>
    );
  },
};

/**
 * Changelog card with title
 */
export const WithTitle: Story = {
  render: function Render() {
    const t = useT();
    const changes = useSampleChanges();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ChangelogCard
          version="1.2.0"
          title={t('storybook.changelogCard.majorRelease')}
          date={new Date(2026, 0, 26)}
          changes={changes}
          releaseUrl="https://github.com/example/releases/tag/v1.2.0"
        />
      </Stack>
    );
  },
};
