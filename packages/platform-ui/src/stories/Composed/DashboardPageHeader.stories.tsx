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

// Basic header
export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of your resources',
  },
};

// With badge
export const WithBadge: Story = {
  args: {
    title: 'Project Alpha',
    subtitle: 'Active development project',
    badge: <Badge variant="success">Active</Badge>,
  },
};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
  args: {
    title: 'Resource Details',
    subtitle: 'View and manage resource information',
    breadcrumb: (
      <nav
        style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}
      >
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </a>
        {' / '}
        <a href="/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
          Resources
        </a>
        {' / '}
        <span>Details</span>
      </nav>
    ),
  },
};

// With metadata
export const WithMetadata: Story = {
  args: {
    title: 'Meeting Room 101',
    subtitle: 'Conference room on the first floor',
    meta: [
      { icon: <MapPin size={16} />, label: 'Storgata 1, Oslo' },
      { icon: <Calendar size={16} />, label: 'Available today' },
      { icon: <User size={16} />, label: 'Capacity: 20' },
    ],
  },
};

// With actions
export const WithActions: Story = {
  args: {
    title: 'Document Editor',
    subtitle: 'Edit your document',
    secondaryAction: (
      <Button onClick={fn()} data-color="neutral" data-size="medium">
        Share
      </Button>
    ),
    primaryAction: (
      <Button onClick={fn()} data-color="accent" data-size="medium">
        Save Changes
      </Button>
    ),
  },
};

// With tabs
export const WithTabs: Story = {
  args: {
    title: 'User Profile',
    subtitle: 'Manage your account settings',
    tabs: [
      { id: 'overview', label: 'Overview', active: true },
      { id: 'settings', label: 'Settings', count: 3 },
      { id: 'activity', label: 'Activity' },
    ],
    activeTab: 'overview',
    onTabChange: fn(),
  },
};

// With tabs (pill variant)
export const WithTabsPill: Story = {
  args: {
    title: 'Project Dashboard',
    subtitle: 'Track project progress',
    tabs: [
      { id: 'overview', label: 'Overview', active: true },
      { id: 'tasks', label: 'Tasks', count: 12 },
      { id: 'team', label: 'Team' },
    ],
    activeTab: 'overview',
    onTabChange: fn(),
    tabVariant: 'pill',
  },
};

// Complete example
export const Complete: Story = {
  args: {
    title: 'Resource Management',
    subtitle: 'Manage and organize your resources',
    badge: <Badge variant="info">Beta</Badge>,
    breadcrumb: (
      <nav
        style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}
      >
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </a>
        {' / Resources'}
      </nav>
    ),
    meta: [
      { icon: <MapPin size={16} />, label: 'Oslo, Norway' },
      { icon: <Calendar size={16} />, label: 'Updated 2 hours ago' },
    ],
    lastUpdated: 'Last updated 2 hours ago',
    secondaryAction: (
      <Button onClick={fn()} data-color="neutral" data-size="medium">
        Export
      </Button>
    ),
    primaryAction: (
      <Button onClick={fn()} data-color="accent" data-size="medium">
        Create New
      </Button>
    ),
    tabs: [
      { id: 'all', label: 'All', count: 42, active: true },
      { id: 'active', label: 'Active', count: 25 },
      { id: 'archived', label: 'Archived', count: 17 },
    ],
    activeTab: 'all',
    onTabChange: fn(),
  },
};

// Minimal
export const Minimal: Story = {
  args: {
    title: 'Simple Page',
  },
};
