import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { MemoryRouter } from 'react-router-dom';
import { DashboardSidebar, type SidebarSection } from '../../index';
import {
  HomeIcon,
  CalendarIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
  ChartIcon,
  BuildingIcon,
} from '../../index';

/**
 * DashboardSidebar provides navigation for dashboard applications.
 *
 * ## Features
 * - Collapsible navigation sections
 * - Active state highlighting
 * - User info footer
 * - Mobile-responsive drawer mode
 * - Badge support for notifications
 *
 * ## Accessibility
 * - Semantic nav structure
 * - Keyboard navigable
 * - Active states announced
 */
const meta: Meta<typeof DashboardSidebar> = {
  title: 'Shells/DashboardSidebar',
  component: DashboardSidebar,
  decorators: [
    (Story) => {
      const t = useT();
      return (
        <MemoryRouter initialEntries={['/']}>
          <div style={{ height: '600px', display: 'flex' }}>
            <Story />
            <div
              style={{
                flex: 1,
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-background-default)',
              }}
            >
              <p>{t('storybook.layout.mainContentArea')}</p>
            </div>
          </div>
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
DashboardSidebar is a navigation sidebar component for dashboard applications.

## Features
- Logo and title header section
- Grouped navigation items with icons
- Active state with accent highlight
- Badge support for counts/notifications
- User info footer section
- Mobile drawer mode for responsive design

## When to Use
- Dashboard applications
- Admin panels
- User portals (MinSide)
- Any app needing persistent navigation

## data-testid
- Sidebar: \`data-testid="dashboard-sidebar"\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardSidebar>;

// Sample logo
const SampleLogo = () => (
  <div
    style={{
      width: '40px',
      height: '40px',
      borderRadius: 'var(--ds-border-radius-md)',
      backgroundColor: 'var(--ds-color-accent-base-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
    }}
  >
    D
  </div>
);

// Sample navigation sections helper
const useDefaultSections = (): SidebarSection[] => {
  const t = useT();
  return [
    {
      title: t('storybook.sidebar.overview'),
      items: [
        {
          name: t('storybook.sidebar.home'),
          description: t('storybook.sidebar.yourStartPage'),
          href: '/',
          icon: <HomeIcon size={24} />,
        },
        {
          name: t('storybook.sidebar.myBookings'),
          description: t('storybook.sidebar.viewAndManageBookings'),
          href: '/resourceRequests',
          icon: <CalendarIcon size={24} />,
          badge: 3,
        },
        {
          name: t('storybook.sidebar.messages'),
          description: t('storybook.sidebar.conversationsAndAlerts'),
          href: '/messages',
          icon: <InboxIcon size={24} />,
          badge: 5,
          badgeColor: 'danger',
        },
      ],
    },
    {
      title: t('storybook.sidebar.administration'),
      items: [
        {
          name: t('storybook.sidebar.reports'),
          description: t('storybook.sidebar.statisticsAndAnalytics'),
          href: '/reports',
          icon: <ChartIcon size={24} />,
        },
        {
          name: t('storybook.sidebar.organizations'),
          description: t('storybook.sidebar.manageOrganizations'),
          href: '/organizations',
          icon: <BuildingIcon size={24} />,
        },
      ],
    },
    {
      title: t('platform.common.settings'),
      items: [
        {
          name: t('storybook.sidebar.profile'),
          description: t('storybook.sidebar.yourProfileAndAccount'),
          href: '/profile',
          icon: <UserIcon size={24} />,
        },
        {
          name: t('storybook.sidebar.notifications'),
          description: t('storybook.sidebar.notificationSettings'),
          href: '/notifications',
          icon: <BellIcon size={24} />,
        },
        {
          name: t('platform.common.settings'),
          description: t('storybook.sidebar.systemSettings'),
          href: '/settings',
          icon: <SettingsIcon size={24} />,
        },
      ],
    },
  ];
};

const useSampleUser = () => {
  const t = useT();
  return {
    name: t('storybook.sidebar.sampleUserName'),
    email: 'ola.nordmann@example.com',
  };
};

/**
 * Default sidebar with all sections
 */
export const Default: Story = {
  render: () => {
    const sections = useDefaultSections();
    const user = useSampleUser();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title="Digilist"
        subtitle={useT()('storybook.sidebar.myPage')}
        sections={sections}
        user={user}
      />
    );
  },
};

/**
 * Sidebar without user info
 */
export const WithoutUser: Story = {
  render: () => {
    const t = useT();
    const sections = useDefaultSections();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title="Digilist"
        subtitle={t('storybook.sidebar.admin')}
        sections={sections}
      />
    );
  },
};

/**
 * Sidebar without subtitle
 */
export const WithoutSubtitle: Story = {
  render: () => {
    const sections = useDefaultSections();
    const user = useSampleUser();
    return (
      <DashboardSidebar logo={<SampleLogo />} title="Digilist" sections={sections} user={user} />
    );
  },
};

/**
 * Minimal sidebar (no sections titles)
 */
export const MinimalSections: Story = {
  render: () => {
    const t = useT();
    const user = useSampleUser();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title={t('storybook.sidebar.app')}
        sections={[
          {
            items: [
              {
                name: t('platform.nav.dashboard'),
                description: t('storybook.layout.overview'),
                href: '/',
                icon: <HomeIcon size={24} />,
              },
              {
                name: t('storybook.sidebar.calendar'),
                description: t('storybook.sidebar.bookings'),
                href: '/calendar',
                icon: <CalendarIcon size={24} />,
              },
              {
                name: t('platform.common.settings'),
                description: t('storybook.sidebar.preferences'),
                href: '/settings',
                icon: <SettingsIcon size={24} />,
              },
            ],
          },
        ]}
        user={user}
      />
    );
  },
};

/**
 * Narrower width
 */
export const NarrowWidth: Story = {
  render: () => {
    const sections = useDefaultSections();
    const user = useSampleUser();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title="Digilist"
        sections={sections}
        user={user}
        width={300}
      />
    );
  },
};

/**
 * Wider width
 */
export const WideWidth: Story = {
  render: () => {
    const sections = useDefaultSections();
    const user = useSampleUser();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title="Digilist"
        sections={sections}
        user={user}
        width={500}
      />
    );
  },
};

/**
 * With many badges
 */
export const WithBadges: Story = {
  render: () => {
    const t = useT();
    const user = useSampleUser();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title="Digilist"
        subtitle={t('storybook.sidebar.notificationsDemo')}
        sections={[
          {
            title: t('storybook.sidebar.navigation'),
            items: [
              {
                name: t('storybook.sidebar.inbox'),
                description: t('storybook.sidebar.newMessages'),
                href: '/inbox',
                icon: <InboxIcon size={24} />,
                badge: 12,
              },
              {
                name: t('storybook.sidebar.tasks'),
                description: t('storybook.sidebar.pendingTasks'),
                href: '/tasks',
                icon: <CalendarIcon size={24} />,
                badge: 5,
              },
              {
                name: t('storybook.sidebar.alerts'),
                description: t('storybook.sidebar.systemAlerts'),
                href: '/alerts',
                icon: <BellIcon size={24} />,
                badge: 99,
              },
            ],
          },
        ]}
        user={user}
      />
    );
  },
};

/**
 * Backoffice admin layout
 */
export const BackofficeLayout: Story = {
  render: () => {
    const t = useT();
    return (
      <DashboardSidebar
        logo={<SampleLogo />}
        title={t('storybook.sidebar.backoffice')}
        subtitle={t('storybook.sidebar.administrator')}
        sections={[
          {
            title: t('platform.nav.dashboard'),
            items: [
              {
                name: t('storybook.sidebar.overview'),
                description: t('storybook.sidebar.mainOverview'),
                href: '/',
                icon: <HomeIcon size={24} />,
              },
              {
                name: t('storybook.sidebar.reports'),
                description: t('storybook.sidebar.statistics'),
                href: '/reports',
                icon: <ChartIcon size={24} />,
              },
            ],
          },
          {
            title: t('storybook.sidebar.bookings'),
            items: [
              {
                name: t('storybook.sidebar.allBookings'),
                description: t('storybook.sidebar.viewAllBookings'),
                href: '/resourceRequests',
                icon: <CalendarIcon size={24} />,
                badge: 15,
              },
              {
                name: t('storybook.sidebar.pending'),
                description: t('storybook.sidebar.approvalRequired'),
                href: '/pending',
                icon: <InboxIcon size={24} />,
                badge: 3,
              },
            ],
          },
          {
            title: t('storybook.sidebar.users'),
            items: [
              {
                name: t('storybook.sidebar.userAdministration'),
                description: t('storybook.sidebar.manageUsers'),
                href: '/users',
                icon: <UserIcon size={24} />,
              },
              {
                name: t('storybook.sidebar.organizations'),
                description: t('storybook.sidebar.manageOrg'),
                href: '/orgs',
                icon: <BuildingIcon size={24} />,
              },
            ],
          },
        ]}
        user={{
          name: t('storybook.sidebar.adminUser'),
          email: 'admin@kommune.no',
        }}
      />
    );
  },
};
