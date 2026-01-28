/**
 * AppLayout Component
 *
 * Flexible application layout component that provides a common structure
 * for sidebar + header + content layouts across all apps.
 *
 * Apps should provide their own Sidebar and Header components as props,
 * allowing for app-specific navigation and branding while standardizing
 * the layout structure.
 *
 * Supports responsive design with multiple breakpoints:
 * - sm: 640px (large phones)
 * - md: 768px (tablets) - default mobile breakpoint
 * - lg: 1024px (laptops)
 * - xl: 1280px (desktops)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <AppLayout
 *   sidebar={<MySidebar />}
 *   header={<MyHeader />}
 * />
 *
 * // With tablet breakpoint and responsive padding
 * <AppLayout
 *   sidebar={<MySidebar />}
 *   header={<MyHeader />}
 *   mobileBreakpoint="lg"
 *   contentPadding={{ base: 'sm', md: 'md', lg: 'lg' }}
 * />
 *
 * // With bottom navigation
 * <AppLayout
 *   sidebar={<MySidebar />}
 *   header={<MyHeader />}
 *   bottomNavItems={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/' },
 *   ]}
 * />
 * ```
 */

import { Outlet } from 'react-router-dom';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import { BottomNavigation, type BottomNavigationItem } from '../composed/bottom-navigation';
import { DashboardContent } from './DashboardContent';
import { MOBILE_BREAKPOINT } from '../tokens';
import { cn } from '../utils';
import {
  type PaddingSize,
  type ResponsivePadding,
  type Breakpoint,
  isResponsive,
  spacingTokenMap,
} from '../primitives/responsive-types';

// =============================================================================
// Types
// =============================================================================

export interface AppLayoutProps {
  /** Sidebar component (required) */
  sidebar: ReactNode;

  /** Header component (required) */
  header: ReactNode;

  /** Max width for content area (default: var(--ds-sizing-1400)) */
  maxContentWidth?: string;

  /**
   * Content padding. Can be a CSS value, token name, or responsive object.
   * Uses responsive defaults for sensible spacing at all breakpoints.
   *
   * @example contentPadding="md"
   * @example contentPadding={{ base: 'sm', md: 'md', lg: 'lg' }}
   * @example contentPadding="var(--ds-spacing-8)" // custom CSS value
   * @default { base: 'md', md: 'lg', lg: 'xl' } (16px → 20px → 24px)
   */
  contentPadding?: PaddingSize | ResponsivePadding | string;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;

  /** Additional content to render above main content (e.g., alerts, banners) */
  topContent?: ReactNode;

  /**
   * Mobile breakpoint in pixels.
   * Can also use preset strings: 'sm' (640), 'md' (768), 'lg' (1024), 'xl' (1280)
   * @default 768 (MOBILE_BREAKPOINT from tokens)
   */
  mobileBreakpoint?: number | 'sm' | 'md' | 'lg' | 'xl';

  /** Bottom navigation items for mobile (optional) */
  bottomNavItems?: BottomNavigationItem[];

  /** Whether to show sidebar on mobile (default: false) */
  showSidebarOnMobile?: boolean;
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Breakpoint values in pixels
 */
const breakpointValues: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/**
 * Check if padding is a spacing token
 */
function isPaddingToken(value: unknown): value is PaddingSize {
  return typeof value === 'string' && value in spacingTokenMap;
}

/**
 * Get CSS class for padding at breakpoint
 */
function getPaddingClass(breakpoint: Breakpoint, size: PaddingSize): string {
  if (breakpoint === 'base') {
    return `ds-p-${size}`;
  }
  return `ds-p-${breakpoint}-${size}`;
}

/**
 * Resolve breakpoint to pixel value
 */
function resolveBreakpoint(breakpoint: number | 'sm' | 'md' | 'lg' | 'xl'): number {
  if (typeof breakpoint === 'number') return breakpoint;
  return breakpointValues[breakpoint] ?? MOBILE_BREAKPOINT;
}

/** Default responsive padding: 16px → 20px → 24px */
const defaultContentPadding: ResponsivePadding = { base: 'md', md: 'lg', lg: 'xl' };

// =============================================================================
// Component
// =============================================================================

/**
 * AppLayout component with flexible sidebar + header + content structure
 */
export function AppLayout({
  sidebar,
  header,
  maxContentWidth = 'var(--ds-sizing-1400)',
  contentPadding = defaultContentPadding,
  className,
  style,
  topContent,
  mobileBreakpoint = MOBILE_BREAKPOINT,
  bottomNavItems,
  showSidebarOnMobile = false,
}: AppLayoutProps): React.ReactElement {
  const resolvedBreakpoint = resolveBreakpoint(mobileBreakpoint);

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < resolvedBreakpoint : false
  );

  // Track viewport size for mobile/desktop detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = (): void => {
      setIsMobile(window.innerWidth < resolvedBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resolvedBreakpoint]);

  // Build responsive padding classes for content
  const paddingClasses = useMemo(() => {
    if (!contentPadding) return [];

    // Responsive padding object - use CSS classes
    if (isResponsive(contentPadding)) {
      const classes: string[] = [];
      const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

      for (const bp of breakpoints) {
        const bpPadding = contentPadding[bp];
        if (bpPadding) {
          classes.push(getPaddingClass(bp, bpPadding));
        }
      }

      return classes;
    }

    // Token padding - use CSS class
    if (isPaddingToken(contentPadding)) {
      return [`ds-p-${contentPadding}`];
    }

    return [];
  }, [contentPadding]);

  // Determine if we should use inline styles for padding
  const useInlinePadding =
    contentPadding !== undefined &&
    !isResponsive(contentPadding) &&
    !isPaddingToken(contentPadding);

  const shouldShowSidebar = !isMobile || showSidebarOnMobile;
  const hasBottomNav = isMobile && bottomNavItems && bottomNavItems.length > 0;

  // Build content class name
  const contentClassName = cn(
    'ds-app-layout-content',
    paddingClasses.join(' ')
  );

  return (
    <div
      className={cn('ds-app-layout', className)}
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        ...style,
      }}
    >
      {/* Sidebar - Desktop only (or if showSidebarOnMobile is true) */}
      {shouldShowSidebar && sidebar}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        {header}

        {/* Top content (alerts, banners, etc.) */}
        {topContent}

        {/* Main content area */}
        <DashboardContent
          hasBottomNav={hasBottomNav}
          className={contentClassName}
          style={{
            padding: useInlinePadding ? (contentPadding as string) : undefined,
          }}
        >
          <div style={{ maxWidth: maxContentWidth, margin: '0 auto', width: '100%' }}>
            <Outlet />
          </div>
        </DashboardContent>
      </div>

      {/* Bottom Navigation - Mobile only */}
      {hasBottomNav && (
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
