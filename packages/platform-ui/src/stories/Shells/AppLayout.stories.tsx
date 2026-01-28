import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { MemoryRouter } from 'react-router-dom';
import { AppLayout } from '../../index';
import { DashboardSidebar } from '../../index';
import { DashboardHeader } from '../../index';
import { Heading, Paragraph, Card, Button } from '@digdir/designsystemet-react';
import { HomeIcon, CalendarIcon, SettingsIcon } from '../../index';

/**
 * AppLayout provides a flexible application layout with sidebar, header, and content.
 *
 * ## Features
 * - Sidebar navigation (desktop)
 * - Header component
 * - Main content area with max-width constraint
 * - Optional bottom navigation (mobile)
 * - Responsive design
 *
 * ## When to Use
 * - Dashboard applications
 * - Admin panels
 * - Any app needing sidebar + header layout
 */
const meta: Meta<typeof AppLayout> = {
  title: 'Shells/AppLayout',
  component: AppLayout,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
AppLayout provides a flexible application layout structure.

## Features
- Sidebar component (required)
- Header component (required)
- Main content area with configurable max-width
- Optional bottom navigation for mobile
- Responsive design with mobile breakpoint

## When to Use
- Dashboard applications
- Admin panels
- Any app needing sidebar + header layout

## Mobile Behavior
- Sidebar hidden on mobile (unless showSidebarOnMobile is true)
- Bottom navigation shown on mobile if provided
- Content padding adjusts for bottom navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

// Sample sidebar
const SampleSidebar = () => {
  const t = useT();
  return (
    <DashboardSidebar
      logo={
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
      }
      title="Digilist"
      sections={[
        {
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
            },
            {
              name: t('platform.common.settings'),
              description: t('storybook.sidebar.systemSettings'),
              href: '/settings',
              icon: <SettingsIcon size={24} />,
            },
          ],
        },
      ]}
      user={{
        name: t('storybook.sidebar.sampleUserName'),
        email: 'ola.nordmann@example.com',
      }}
    />
  );
};

// Sample header
const SampleHeader = () => {
  const t = useT();
  return (
    <DashboardHeader
      logo={
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
      }
      user={{
        name: t('storybook.sidebar.sampleUserName'),
        email: 'ola.nordmann@example.com',
      }}
      showThemeToggle
      isDark={false}
      onThemeToggle={() => console.log('Toggle theme')}
      showNotifications
      notificationCount={3}
      onNotificationClick={() => console.log('Notifications')}
      onLogout={() => console.log('Logout')}
    />
  );
};

/**
 * Default app layout with sidebar and header
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppLayout sidebar={<SampleSidebar />} header={<SampleHeader />}>
        <div>
          <Heading level={1} data-size="lg">
            {t('storybook.appLayout.dashboard')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.appLayout.welcomeMessage')}</Paragraph>
          <Card
            data-color="neutral"
            data-size="medium"
            style={{ marginTop: 'var(--ds-spacing-4)' }}
          >
            <Card.Block>
              <Paragraph data-size="sm">{t('storybook.appLayout.contentArea')}</Paragraph>
            </Card.Block>
          </Card>
        </div>
      </AppLayout>
    );
  },
};

/**
 * App layout with custom max width
 */
export const CustomMaxWidth: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppLayout
        sidebar={<SampleSidebar />}
        header={<SampleHeader />}
        maxContentWidth="var(--ds-sizing-1200)"
      >
        <div>
          <Heading level={1} data-size="lg">
            {t('storybook.appLayout.dashboard')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.appLayout.narrowerContent')}</Paragraph>
        </div>
      </AppLayout>
    );
  },
};

/**
 * App layout with top content (alerts/banners)
 */
export const WithTopContent: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppLayout
        sidebar={<SampleSidebar />}
        header={<SampleHeader />}
        topContent={
          <div
            style={{
              padding: 'var(--ds-spacing-3) var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-warning-surface-default)',
              borderBottom: '1px solid var(--ds-color-warning-border-subtle)',
            }}
          >
            <Paragraph
              data-size="sm"
              style={{ margin: 0, color: 'var(--ds-color-warning-text-default)' }}
            >
              {t('storybook.appLayout.maintenanceNotice')}
            </Paragraph>
          </div>
        }
      >
        <div>
          <Heading level={1} data-size="lg">
            {t('storybook.appLayout.dashboard')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.appLayout.contentArea')}</Paragraph>
        </div>
      </AppLayout>
    );
  },
};

/**
 * App layout with bottom navigation (mobile)
 */
export const WithBottomNavigation: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppLayout
        sidebar={<SampleSidebar />}
        header={<SampleHeader />}
        bottomNavItems={[
          {
            id: 'home',
            label: t('storybook.sidebar.home'),
            icon: <HomeIcon size={20} />,
            href: '/',
            active: true,
          },
          {
            id: 'resourceRequests',
            label: t('storybook.sidebar.myBookings'),
            icon: <CalendarIcon size={20} />,
            href: '/resourceRequests',
          },
          {
            id: 'settings',
            label: t('platform.common.settings'),
            icon: <SettingsIcon size={20} />,
            href: '/settings',
          },
        ]}
      >
        <div>
          <Heading level={1} data-size="lg">
            {t('storybook.appLayout.dashboard')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.appLayout.mobileView')}</Paragraph>
        </div>
      </AppLayout>
    );
  },
};

/**
 * App layout with custom content padding
 */
export const CustomPadding: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppLayout
        sidebar={<SampleSidebar />}
        header={<SampleHeader />}
        contentPadding="var(--ds-spacing-12)"
      >
        <div>
          <Heading level={1} data-size="lg">
            {t('storybook.appLayout.dashboard')}
          </Heading>
          <Paragraph data-size="md">{t('storybook.appLayout.customPadding')}</Paragraph>
        </div>
      </AppLayout>
    );
  },
};
