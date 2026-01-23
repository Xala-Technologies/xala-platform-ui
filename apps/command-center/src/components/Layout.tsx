/**
 * Command Center Layout
 *
 * Uses platform-ui shell components - apps should never define their own layout components.
 */

import { useState, useEffect } from 'react';
import {
  AppLayout,
  DashboardSidebar,
  DashboardHeader,
  ChartIcon,
  RefreshIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@xala-technologies/platform-ui';
import type { SidebarSection } from '@xala-technologies/platform-ui';
import { TESTIDS } from '../constants/testids';
import { ApiKeyModal } from './settings/ApiKeyModal';
import { providerRegistry } from '../lib/ai';
import { useTheme } from '../main';

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
      {
        name: 'Revisions',
        description: 'View and compare revisions',
        href: '/revisions',
        icon: <ClockIcon size={20} />,
      },
      {
        name: 'Commands',
        description: 'Execute CLI commands safely',
        href: '/commands',
        icon: <RefreshIcon size={20} />,
      },
    ],
  },
];

export function Layout() {
  const { colorScheme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Check API key on mount
  useEffect(() => {
    if (!providerRegistry.isInitialized()) {
      setShowApiKeyModal(true);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log('Search:', value);
  };

  return (
    <>
      <AppLayout
        data-testid={TESTIDS.common.content}
        sidebar={
          <DashboardSidebar
            title="Xala"
            subtitle="Command Center"
            sections={sidebarSections}
            width={320}
            data-testid={TESTIDS.common.sidebar}
          />
        }
        header={
          <DashboardHeader
            data-testid={TESTIDS.common.header}
            searchPlaceholder="Search workflows, specs..."
            searchValue={searchValue}
            onSearchChange={handleSearch}
            showThemeToggle
            isDark={colorScheme === 'dark'}
            onThemeToggle={toggleTheme}
          />
        }
      />
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onKeySet={() => {
          setShowApiKeyModal(false);
        }}
      />
    </>
  );
}


