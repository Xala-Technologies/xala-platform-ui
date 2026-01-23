/**
 * Command Center Layout
 *
 * Uses platform-ui shell components - apps should never define their own layout components.
 */

import { useState } from 'react';
import {
  AppLayout,
  DashboardSidebar,
  DashboardHeader,
  ChartIcon,
  RefreshIcon,
  FileTextIcon,
  CheckCircleIcon,
  Button,
  Heading,
} from '@xala-technologies/platform-ui';
import type { SidebarSection } from '@xala-technologies/platform-ui';

const sidebarSections: SidebarSection[] = [
  {
    title: 'Navigation',
    items: [
      {
        name: 'Dashboard',
        description: 'Overview and metrics',
        href: '/',
        icon: <ChartIcon size={20} />,
      },
      {
        name: 'Workflows',
        description: 'Design workflow catalog',
        href: '/workflows',
        icon: <RefreshIcon size={20} />,
      },
      {
        name: 'Spec Editor',
        description: 'Edit component specs',
        href: '/specs',
        icon: <FileTextIcon size={20} />,
      },
      {
        name: 'Approvals',
        description: 'Approval status tracking',
        href: '/approvals',
        icon: <CheckCircleIcon size={20} />,
      },
    ],
  },
];

export function Layout() {
  const [searchValue, setSearchValue] = useState('');
  const [isDark, setIsDark] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // In a real app, this would filter/search content
    console.log('Search:', value);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    // In a real app, this would update the theme
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  return (
    <AppLayout
      sidebar={
        <DashboardSidebar
          title="Xala"
          subtitle="Command Center"
          sections={sidebarSections}
          width={320}
        />
      }
      header={
        <DashboardHeader
          leftSlot={
            <Heading level={1} data-size="sm">Design Governance</Heading>
          }
          searchPlaceholder="Search workflows, specs..."
          searchValue={searchValue}
          onSearchChange={handleSearch}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
          showNotifications
          notificationCount={3}
          onNotificationClick={handleNotificationClick}
          user={{
            name: 'Admin User',
            email: 'admin@xala.no',
          }}
          onLogout={() => console.log('Logout')}
          onSettingsClick={() => console.log('Settings')}
          onProfileClick={() => console.log('Profile')}
          actions={
            <Button variant="primary" data-size="sm">
              New Spec
            </Button>
          }
        />
      }
    />
  );
}
