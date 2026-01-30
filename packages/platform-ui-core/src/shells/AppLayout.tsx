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
 * Supports mobile-first responsive design with optional bottom navigation
 * for mobile devices.
 */

import { Outlet } from 'react-router-dom';
import { ReactNode, useState, useEffect, type ErrorInfo } from 'react';
import { BottomNavigation, type BottomNavigationItem } from '../composed/bottom-navigation';
import { MOBILE_BREAKPOINT } from '../tokens';
import {
  ErrorBoundary,
  type ErrorBoundaryLabels,
  type EnhancedErrorContext,
} from '../blocks/ErrorBoundary';

export interface AppLayoutProps {
  /** Sidebar component (required) */
  sidebar: ReactNode;

  /** Header component (required) */
  header: ReactNode;

  /** Max width for content area (default: var(--ds-sizing-1400)) */
  maxContentWidth?: string;

  /** Content padding (default: var(--ds-spacing-8)) */
  contentPadding?: string;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;

  /** Additional content to render above main content (e.g., alerts, banners) */
  topContent?: ReactNode;

  /** Mobile breakpoint in pixels (default: MOBILE_BREAKPOINT from tokens - 768px) */
  mobileBreakpoint?: number;

  /** Bottom navigation items for mobile (optional) */
  bottomNavItems?: BottomNavigationItem[];

  /** Whether to show sidebar on mobile (default: false) */
  showSidebarOnMobile?: boolean;

  /** Enable error boundary around main content (default: false) */
  enableErrorBoundary?: boolean;

  /** Error boundary callback when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo, context?: EnhancedErrorContext) => void;

  /** Enhanced error context for error tracking */
  errorContext?: EnhancedErrorContext;

  /** Error boundary labels for i18n */
  errorBoundaryLabels?: Partial<ErrorBoundaryLabels>;

  /** Custom error title */
  errorTitle?: string;

  /** Custom error description */
  errorDescription?: string;

  /** Show retry button in error screen (default: true) */
  showErrorRetryButton?: boolean;

  /** Custom retry button text */
  errorRetryButtonText?: string;

  /** Custom retry handler */
  onErrorRetry?: () => void;
}

/**
 * AppLayout component with flexible sidebar + header + content structure
 *
 * @example
 * ```tsx
 * <AppLayout
 *   sidebar={<MySidebar />}
 *   header={<MyHeader title="Dashboard" />}
 *   bottomNavItems={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/', active: true },
 *     { id: 'resourceRequests', label: 'ResourceRequests', icon: <BookIcon />, href: '/resourceRequests' },
 *   ]}
 * />
 * ```
 *
 * @example With ErrorBoundary
 * ```tsx
 * <AppLayout
 *   sidebar={<MySidebar />}
 *   header={<MyHeader title="Dashboard" />}
 *   enableErrorBoundary={true}
 *   onError={(error, errorInfo, context) => {
 *     // Error tracking integration (Sentry, etc.)
 *     errorTracker.captureException(error, { errorInfo, context });
 *   }}
 *   errorBoundaryLabels={{
 *     title: t('errors.somethingWentWrong'),
 *     defaultDescription: t('errors.unexpectedError'),
 *     retryButton: t('common.retry'),
 *   }}
 * />
 * ```
 */
export function AppLayout({
  sidebar,
  header,
  maxContentWidth = 'var(--ds-sizing-1400)',
  contentPadding = 'var(--ds-spacing-8)',
  className,
  style,
  topContent,
  mobileBreakpoint = MOBILE_BREAKPOINT,
  bottomNavItems,
  showSidebarOnMobile = false,
  enableErrorBoundary = false,
  onError,
  errorContext,
  errorBoundaryLabels,
  errorTitle,
  errorDescription,
  showErrorRetryButton,
  errorRetryButtonText,
  onErrorRetry,
}: AppLayoutProps) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < mobileBreakpoint : false
  );

  // Track viewport size for mobile/desktop detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint]);

  const shouldShowSidebar = !isMobile || showSidebarOnMobile;
  const hasBottomNav = isMobile && bottomNavItems && bottomNavItems.length > 0;

  // Wrap Outlet with ErrorBoundary if enabled
  const outletContent = <Outlet />;
  const mainContent = enableErrorBoundary ? (
    <ErrorBoundary
      onError={onError}
      errorContext={errorContext}
      labels={errorBoundaryLabels}
      errorTitle={errorTitle}
      errorDescription={errorDescription}
      showRetryButton={showErrorRetryButton}
      retryButtonText={errorRetryButtonText}
      onRetry={onErrorRetry}
    >
      {outletContent}
    </ErrorBoundary>
  ) : (
    outletContent
  );

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        ...style,
      }}
    >
      {/* Header - full width at top */}
      {header}

      {/* Sidebar + content row below header */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
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
          {/* Top content (alerts, banners, etc.) */}
          {topContent}

          {/* Main content area */}
          <main
            style={{
              flex: 1,
              overflow: 'auto',
              minWidth: 0,
              padding: contentPadding,
              ...(hasBottomNav
                ? {
                    paddingBottom:
                      'calc(64px + var(--ds-spacing-4) + env(safe-area-inset-bottom))',
                  }
                : {}),
            }}
          >
            <div style={{ maxWidth: maxContentWidth, margin: '0 auto', width: '100%' }}>
              {mainContent}
            </div>
          </main>
        </div>
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
