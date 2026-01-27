/**
 * DocsLayout Component
 *
 * Main layout shell for the documentation app.
 * Features:
 * - Responsive sidebar on desktop
 * - Mobile-friendly with bottom navigation
 * - Optional right TOC for article pages
 *
 * Pure presentational component - receives data via props and emits events via callbacks.
 */

import { useState, useEffect } from 'react';
import { BottomNavigation, type BottomNavigationItem } from '../../../../composed';
import { DashboardContent } from '../../../../shells';
import { DocsSidebar, type DocsSidebarLabels } from './DocsSidebar';
import { DocsHeader, type DocsHeaderLabels } from './DocsHeader';
import type { DocsNavItem, DocsNavSection } from '../../types';

const MOBILE_BREAKPOINT = 768;

export interface DocsLayoutLabels {
  header: DocsHeaderLabels;
  sidebar: DocsSidebarLabels;
  mobileNavHome: string;
  mobileNavSearch: string;
  mobileNavGuides: string;
}

export interface DocsLayoutProps {
  /** Labels for all text content */
  labels: DocsLayoutLabels;
  /** Navigation sections for sidebar */
  navSections: DocsNavSection[];
  /** Current pathname */
  currentPath: string;
  /** Current locale */
  locale: string;
  /** Mobile navigation items */
  mobileNavItems?: BottomNavigationItem[];
  /** Logo URL */
  logoUrl?: string;
  /** Children to render in the content area */
  children: React.ReactNode;
  /** Callback when search is submitted */
  onSearch: (query: string) => void;
  /** Callback when locale is toggled */
  onLocaleToggle: () => void;
  /** Callback when a nav item is clicked */
  onNavItemClick?: (item: DocsNavItem) => void;
  /** Optional initial search query */
  initialSearchQuery?: string;
}

export function DocsLayout({
  labels,
  navSections,
  currentPath,
  locale,
  mobileNavItems,
  logoUrl,
  children,
  onSearch,
  onLocaleToggle,
  onNavItemClick,
  initialSearchQuery,
}: DocsLayoutProps) {
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

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar - Desktop only */}
      {!isMobile && (
        <DocsSidebar
          sections={navSections}
          labels={labels.sidebar}
          currentPath={currentPath}
          logoUrl={logoUrl}
          onNavItemClick={onNavItemClick}
        />
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <DocsHeader
          labels={labels.header}
          locale={locale}
          onSearch={onSearch}
          onLocaleToggle={onLocaleToggle}
          initialSearchQuery={initialSearchQuery}
        />

        <DashboardContent hasBottomNav={isMobile} data-testid="docs-content">
          {children}
        </DashboardContent>
      </div>

      {/* Bottom Navigation - Mobile only */}
      {isMobile && mobileNavItems && (
        <BottomNavigation
          items={mobileNavItems}
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
