import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ExplorerShell, ExplorerPanel, ExplorerEmptyState } from '../../index';
import { Heading, Paragraph, Card, Button } from '@digdir/designsystemet-react';
import { BookOpenIcon, SearchIcon, FilterIcon } from '../../index';

/**
 * ExplorerShell provides a three-panel layout for explorer applications.
 *
 * ## Features
 * - Header with title, subtitle, and actions
 * - Optional toolbar below header
 * - Sidebar panel (configurable width)
 * - Main content area
 * - Empty state component
 *
 * ## When to Use
 * - Documentation explorers
 * - Story browsers
 * - File explorers
 * - Navigation-heavy applications
 */
const meta: Meta<typeof ExplorerShell> = {
  title: 'Shells/ExplorerShell',
  component: ExplorerShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
ExplorerShell provides a professional three-panel layout for explorer applications.

## Features
- Header with title, subtitle, icon, and actions
- Optional toolbar section
- Sidebar panel (configurable width)
- Main content area with ExplorerPanel
- ExplorerEmptyState for empty states

## When to Use
- Documentation explorers
- Story browsers
- File explorers
- Any navigation-heavy application
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExplorerShell>;

// Sample sidebar content
const SampleSidebar = () => {
  const t = useT();
  return (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <Card data-color="neutral" data-size="medium">
        <Card.Header>
          <Heading level={3} data-size="sm">
            {t('storybook.explorer.navigation')}
          </Heading>
        </Card.Header>
        <Card.Content>
          <Paragraph data-size="sm">{t('storybook.explorer.sidebarContent')}</Paragraph>
        </Card.Content>
      </Card>
    </div>
  );
};

// Sample toolbar
const SampleToolbar = () => {
  const t = useT();
  return (
    <div
      style={{
        padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        alignItems: 'center',
      }}
    >
      <Button data-size="sm" data-color="neutral" variant="tertiary">
        <SearchIcon size={16} />
        {t('storybook.explorer.search')}
      </Button>
      <Button data-size="sm" data-color="neutral" variant="tertiary">
        <FilterIcon size={16} />
        {t('storybook.explorer.filter')}
      </Button>
    </div>
  );
};

/**
 * Default explorer shell with all features
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ExplorerShell
        title={t('storybook.explorer.storyExplorer')}
        subtitle={t('storybook.explorer.componentCatalog')}
        icon={<BookOpenIcon size={24} />}
        headerActions={
          <Button data-size="sm" data-color="accent">
            {t('storybook.explorer.newStory')}
          </Button>
        }
        toolbar={<SampleToolbar />}
        sidebar={<SampleSidebar />}
      >
        <ExplorerPanel
          title={t('storybook.explorer.storyViewer')}
          subtitle={t('storybook.explorer.selectStoryToView')}
        >
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <Card data-color="neutral" data-size="medium">
              <Card.Content>
                <Paragraph data-size="md">{t('storybook.explorer.mainContent')}</Paragraph>
              </Card.Content>
            </Card>
          </div>
        </ExplorerPanel>
      </ExplorerShell>
    );
  },
};

/**
 * Explorer shell without toolbar
 */
export const WithoutToolbar: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ExplorerShell
        title={t('storybook.explorer.storyExplorer')}
        subtitle={t('storybook.explorer.componentCatalog')}
        icon={<BookOpenIcon size={24} />}
        sidebar={<SampleSidebar />}
      >
        <ExplorerPanel title={t('storybook.explorer.storyViewer')}>
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <Card data-color="neutral" data-size="medium">
              <Card.Content>
                <Paragraph data-size="md">{t('storybook.explorer.mainContent')}</Paragraph>
              </Card.Content>
            </Card>
          </div>
        </ExplorerPanel>
      </ExplorerShell>
    );
  },
};

/**
 * Explorer shell with empty state
 */
export const WithEmptyState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ExplorerShell
        title={t('storybook.explorer.storyExplorer')}
        subtitle={t('storybook.explorer.componentCatalog')}
        icon={<BookOpenIcon size={24} />}
        sidebar={<SampleSidebar />}
      >
        <ExplorerPanel
          isEmpty
          emptyState={
            <ExplorerEmptyState
              icon={<BookOpenIcon size={48} />}
              title={t('storybook.explorer.noStories')}
              description={t('storybook.explorer.noStoriesDescription')}
              action={
                <Button data-color="accent">{t('storybook.explorer.createFirstStory')}</Button>
              }
            />
          }
        />
      </ExplorerShell>
    );
  },
};

/**
 * Explorer shell with stats in empty state
 */
export const WithStats: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ExplorerShell
        title={t('storybook.explorer.storyExplorer')}
        subtitle={t('storybook.explorer.componentCatalog')}
        icon={<BookOpenIcon size={24} />}
        sidebar={<SampleSidebar />}
      >
        <ExplorerPanel
          isEmpty
          emptyState={
            <ExplorerEmptyState
              icon={<BookOpenIcon size={48} />}
              title={t('storybook.explorer.overview')}
              description={t('storybook.explorer.statsDescription')}
              stats={[
                { value: '150', label: t('storybook.explorer.stories') },
                { value: '45', label: t('storybook.explorer.components') },
                { value: '12', label: t('storybook.explorer.patterns') },
              ]}
            />
          }
        />
      </ExplorerShell>
    );
  },
};

/**
 * Explorer shell with custom sidebar width
 */
export const CustomSidebarWidth: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ExplorerShell
        title={t('storybook.explorer.storyExplorer')}
        subtitle={t('storybook.explorer.componentCatalog')}
        icon={<BookOpenIcon size={24} />}
        sidebarWidth="400px"
        sidebar={<SampleSidebar />}
      >
        <ExplorerPanel title={t('storybook.explorer.storyViewer')}>
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <Card data-color="neutral" data-size="medium">
              <Card.Content>
                <Paragraph data-size="md">{t('storybook.explorer.widerSidebar')}</Paragraph>
              </Card.Content>
            </Card>
          </div>
        </ExplorerPanel>
      </ExplorerShell>
    );
  },
};

/**
 * Explorer shell with back action
 */
export const WithBackAction: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ExplorerShell
        title={t('storybook.explorer.storyExplorer')}
        subtitle={t('storybook.explorer.componentCatalog')}
        icon={<BookOpenIcon size={24} />}
        backAction={
          <Button data-size="sm" data-color="neutral" variant="tertiary">
            {t('storybook.explorer.back')}
          </Button>
        }
        sidebar={<SampleSidebar />}
      >
        <ExplorerPanel title={t('storybook.explorer.storyViewer')}>
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <Card data-color="neutral" data-size="medium">
              <Card.Content>
                <Paragraph data-size="md">{t('storybook.explorer.mainContent')}</Paragraph>
              </Card.Content>
            </Card>
          </div>
        </ExplorerPanel>
      </ExplorerShell>
    );
  },
};
