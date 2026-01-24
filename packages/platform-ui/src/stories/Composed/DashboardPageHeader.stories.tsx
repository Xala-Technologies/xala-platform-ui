import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { DashboardPageHeader } from '../../composed/DashboardPageHeader';
import { Button, Badge } from '@digdir/designsystemet-react';
import { MapPin, Calendar, User } from 'lucide-react';

const meta: Meta<typeof DashboardPageHeader> = {
  title: 'Composed/DashboardPageHeader',
  component: DashboardPageHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## DashboardPageHeader

Professional page header with breadcrumbs, title, badge, metadata, actions, and tabs.

### Features
- Breadcrumb navigation
- Title with optional badge
- Metadata row with icons
- Primary and secondary actions
- Overflow menu
- Navigation tabs
- Last updated timestamp

### Usage
\`\`\`tsx
<DashboardPageHeader
  title="Page Title"
  subtitle="Page description"
  badge={<Badge>Active</Badge>}
  meta={[{ icon: <Icon />, label: 'Location' }]}
  primaryAction={<Button>Action</Button>}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.dashboard')}
      subtitle={t('storybook.demo.overviewOfResources')}
    />
  );
};

// Basic header
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// Wrapper for with badge story
const WithBadgeDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.projectAlpha')}
      subtitle={t('storybook.demo.activeDevelopmentProject')}
      badge={<Badge variant="success">{t('platform.status.active')}</Badge>}
    />
  );
};

// With badge
export const WithBadge: Story = {
  render: () => <WithBadgeDemo />,
};

// Wrapper for with breadcrumbs story
const WithBreadcrumbsDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.resourceDetails')}
      subtitle={t('storybook.demo.viewAndManageResource')}
      breadcrumb={
        <nav
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('platform.nav.home')}
          </a>
          {' / '}
          <a href="/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('storybook.demo.resources')}
          </a>
          {' / '}
          <span>{t('storybook.demo.details')}</span>
        </nav>
      }
    />
  );
};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
  render: () => <WithBreadcrumbsDemo />,
};

// Wrapper for with metadata story
const WithMetadataDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.meetingRoom101')}
      subtitle={t('storybook.demo.conferenceRoomFirstFloor')}
      meta={[
        { icon: <MapPin size={16} />, label: 'Storgata 1, Oslo' },
        { icon: <Calendar size={16} />, label: t('storybook.demo.availableToday') },
        { icon: <User size={16} />, label: `${t('storybook.demo.capacity')}: 20` },
      ]}
    />
  );
};

// With metadata
export const WithMetadata: Story = {
  render: () => <WithMetadataDemo />,
};

// Wrapper for with actions story
const WithActionsDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.documentEditor')}
      subtitle={t('storybook.demo.editYourDocument')}
      secondaryAction={
        <Button onClick={fn()} data-color="neutral" data-size="medium">
          {t('storybook.demo.share')}
        </Button>
      }
      primaryAction={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          {t('platform.common.saveChanges')}
        </Button>
      }
    />
  );
};

// With actions
export const WithActions: Story = {
  render: () => <WithActionsDemo />,
};

// Wrapper for with tabs story
const WithTabsDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.userProfile')}
      subtitle={t('storybook.demo.manageAccountSettings')}
      tabs={[
        { id: 'overview', label: t('storybook.demo.overview'), active: true },
        { id: 'settings', label: t('platform.nav.settings'), count: 3 },
        { id: 'activity', label: t('storybook.demo.activity') },
      ]}
      activeTab="overview"
      onTabChange={fn()}
    />
  );
};

// With tabs
export const WithTabs: Story = {
  render: () => <WithTabsDemo />,
};

// Wrapper for with tabs pill story
const WithTabsPillDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.projectDashboard')}
      subtitle={t('storybook.demo.trackProjectProgress')}
      tabs={[
        { id: 'overview', label: t('storybook.demo.overview'), active: true },
        { id: 'tasks', label: t('storybook.demo.tasks'), count: 12 },
        { id: 'team', label: t('storybook.demo.team') },
      ]}
      activeTab="overview"
      onTabChange={fn()}
      tabVariant="pill"
    />
  );
};

// With tabs (pill variant)
export const WithTabsPill: Story = {
  render: () => <WithTabsPillDemo />,
};

// Wrapper for complete story
const CompleteDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title={t('storybook.demo.resourceManagement')}
      subtitle={t('storybook.demo.manageAndOrganizeResources')}
      badge={<Badge variant="info">Beta</Badge>}
      breadcrumb={
        <nav
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('platform.nav.home')}
          </a>
          {' / '}
          {t('storybook.demo.resources')}
        </nav>
      }
      meta={[
        { icon: <MapPin size={16} />, label: 'Oslo, Norway' },
        { icon: <Calendar size={16} />, label: t('storybook.demo.updated2HoursAgo') },
      ]}
      lastUpdated={t('storybook.demo.lastUpdated2HoursAgo')}
      secondaryAction={
        <Button onClick={fn()} data-color="neutral" data-size="medium">
          {t('storybook.demo.export')}
        </Button>
      }
      primaryAction={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          {t('storybook.demo.createNew')}
        </Button>
      }
      tabs={[
        { id: 'all', label: t('storybook.demo.all'), count: 42, active: true },
        { id: 'active', label: t('platform.status.active'), count: 25 },
        { id: 'archived', label: t('storybook.demo.archived'), count: 17 },
      ]}
      activeTab="all"
      onTabChange={fn()}
    />
  );
};

// Complete example
export const Complete: Story = {
  render: () => <CompleteDemo />,
};

// Wrapper for minimal story
const MinimalDemo = () => {
  const t = useT();
  return <DashboardPageHeader title={t('storybook.demo.simplePage')} />;
};

// Minimal
export const Minimal: Story = {
  render: () => <MinimalDemo />,
};
