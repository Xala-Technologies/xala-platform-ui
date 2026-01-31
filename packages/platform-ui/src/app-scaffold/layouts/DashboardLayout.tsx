/**
 * DashboardLayout Wrapper
 *
 * Layout wrapper for dashboard and backoffice applications.
 * Pure presentational - auth state comes from optional hooks provided by consumer.
 */

import React from 'react';
import type { SidebarConfig, BrandConfig } from '../types';

export interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  sidebar?: SidebarConfig;
  brand?: BrandConfig;
  isProtected?: boolean;
  loginPath?: string;
  /** Optional: Component to wrap protected content */
  ProtectedRoute?: React.ComponentType<{ children: React.ReactNode; redirectTo: string }>;
}

/**
 * Default protected route - just renders children (for non-authenticated usage)
 */
function DefaultProtectedRoute({ children }: { children: React.ReactNode }): React.ReactElement {
  return <>{children}</>;
}

/**
 * DashboardLayoutWrapper provides sidebar + header layout
 */
export function DashboardLayoutWrapper({
  children,
  sidebar,
  brand,
  isProtected = true,
  loginPath = '/login',
  ProtectedRoute = DefaultProtectedRoute,
}: DashboardLayoutWrapperProps): React.ReactElement {
  const content = (
    <div
      data-testid="dashboard-layout"
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Sidebar */}
      {sidebar && (
        <aside
          data-testid="dashboard-sidebar"
          style={{
            width: '240px',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
            padding: 'var(--ds-spacing-4)',
            flexShrink: 0,
          }}
        >
          {/* Brand */}
          {brand?.logo && (
            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <img
                src={brand.logo}
                alt={brand.name || 'Logo'}
                style={{ height: '32px', width: 'auto' }}
              />
            </div>
          )}

          {/* Navigation sections */}
          <nav>
            {sidebar.sections?.map((section, sectionIndex) => (
              <div key={sectionIndex} style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                {section.title && (
                  <div
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      fontWeight: 'var(--ds-font-weight-semibold)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--ds-spacing-2)',
                    }}
                  >
                    {section.title}
                  </div>
                )}
                {section.items?.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.href || '#'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--ds-spacing-2)',
                      padding: 'var(--ds-spacing-2)',
                      borderRadius: 'var(--ds-border-radius-md)',
                      textDecoration: 'none',
                      color: 'var(--ds-color-neutral-text-default)',
                      marginBottom: 'var(--ds-spacing-1)',
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* Main content */}
      <main
        id="main-content"
        style={{
          flex: 1,
          padding: 'var(--ds-spacing-6)',
          overflow: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );

  // Wrap with protection if needed
  if (isProtected && ProtectedRoute) {
    return <ProtectedRoute redirectTo={loginPath}>{content}</ProtectedRoute>;
  }

  return content;
}
