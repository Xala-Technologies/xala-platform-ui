import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
      title={t('platform.nav.dashboard')}
      subtitle="Eksempel Tekst"
    />
  );
};

// Basic header
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for with badge story
const WithBadgeDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
      badge={<Badge variant="success">{t('platform.status.active')}</Badge>}
    />
  );
};

// With badge
export const WithBadge: Story = {
  render: function Render() {
    return <WithBadgeDemo />;
  },
};

// Wrapper for with breadcrumbs story
const WithBreadcrumbsDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
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
            "Eksempel Tekst"
          </a>
          {' / '}
          <span>"Eksempel Tekst"</span>
        </nav>
      }
    />
  );
};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
  render: function Render() {
    return <WithBreadcrumbsDemo />;
  },
};

// Wrapper for with metadata story
const WithMetadataDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
      meta={[
        { icon: <MapPin size={16} />, label: 'Storgata 1, Oslo' },
        { icon: <Calendar size={16} />, label: t('storybook.demo.availableToday') },
        { icon: <User size={16} />, label: `$"Eksempel Tekst": 20` },
      ]}
    />
  );
};

// With metadata
export const WithMetadata: Story = {
  render: function Render() {
    return <WithMetadataDemo />;
  },
};

// Wrapper for with actions story
const WithActionsDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
      secondaryAction={
        <Button onClick={fn()} data-color="neutral" data-size="medium">
          "Eksempel Tekst"
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
  render: function Render() {
    return <WithActionsDemo />;
  },
};

// Wrapper for with tabs story
const WithTabsDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
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
  render: function Render() {
    return <WithTabsDemo />;
  },
};

// Wrapper for with tabs pill story
const WithTabsPillDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
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
  render: function Render() {
    return <WithTabsPillDemo />;
  },
};

// Wrapper for complete story
const CompleteDemo = () => {
  const t = useT();
  return (
    <DashboardPageHeader
      title="Eksempel Tekst"
      subtitle="Eksempel Tekst"
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
          "Eksempel Tekst"
        </nav>
      }
      meta={[
        { icon: <MapPin size={16} />, label: 'Oslo, Norway' },
        { icon: <Calendar size={16} />, label: t('storybook.demo.updated2HoursAgo') },
      ]}
      lastUpdated="Eksempel Tekst"
      secondaryAction={
        <Button onClick={fn()} data-color="neutral" data-size="medium">
          "Eksempel Tekst"
        </Button>
      }
      primaryAction={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          "Eksempel Tekst"
        </Button>
      }
      tabs={[
        { id: 'all', label: t('platform.common.all'), count: 42, active: true },
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
  render: function Render() {
    return <CompleteDemo />;
  },
};

// Wrapper for minimal story
const MinimalDemo = () => {
  const t = useT();
  return <DashboardPageHeader title="Eksempel Tekst" />;
};

// Minimal
export const Minimal: Story = {
  render: function Render() {
    return <MinimalDemo />;
  },
};
