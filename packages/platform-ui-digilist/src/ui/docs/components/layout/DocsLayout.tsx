/**
 * DocsLayout Component
 *
 * Main layout shell for the documentation app.
 * Features:
 * - Responsive sidebar on desktop
 * - Mobile-friendly with bottom navigation
 * - Optional right TOC for article pages
 */

import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BottomNavigation, type BottomNavigationItem, DashboardContent, HomeIcon, SearchIcon, BookOpenIcon } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import { DocsSidebar } from './DocsSidebar';
import { DocsHeader } from './DocsHeader';

const MOBILE_BREAKPOINT = 768;

export function DocsLayout() {
  const location = useLocation();
  const t = useT();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  // Track viewport size for mobile/desktop detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bottom navigation items for mobile
  const bottomNavItems: BottomNavigationItem[] = [
    {
      id: 'home',
      label: t('docs.nav.home') || 'Hjem',
      icon: <HomeIcon />,
      href: '/',
      active: location.pathname === '/',
    },
    {
      id: 'search',
      label: t('docs.nav.search') || 'Søk',
      icon: <SearchIcon />,
      href: '/search',
      active: location.pathname === '/search',
    },
    {
      id: 'guides',
      label: t('docs.nav.guides') || 'Guider',
      icon: <BookOpenIcon />,
      href: '/roles/web/end-user',
      active: location.pathname.startsWith('/roles'),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Sidebar - Desktop only */}
      {!isMobile && <DocsSidebar />}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <DocsHeader />

        <DashboardContent
          hasBottomNav={isMobile}
          data-testid="docs-content"
        >
          <Outlet />
        </DashboardContent>
      </div>

      {/* Bottom Navigation - Mobile only */}
      {isMobile && (
        <BottomNavigation
          items={bottomNavItems}
          fixed={true}
          variant="surface"
          showLabels={true}
          safeArea={true}
        />
      )}
    </div>
  );
}

export default DocsLayout;
