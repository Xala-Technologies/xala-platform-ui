/**
 * WebLayout Wrapper
 *
 * Layout wrapper for public-facing web applications.
 * Simple header-only layout without sidebar.
 */

import React from 'react';
import type { BrandConfig } from '../types';

export interface WebLayoutWrapperProps {
  children: React.ReactNode;
  brand?: BrandConfig;
  sidebar?: unknown; // Accepted but not used in web layout
  isProtected?: boolean;
  loginPath?: string;
}

/**
 * WebLayoutWrapper provides a simple header + content layout
 */
export function WebLayoutWrapper({
  children,
  brand,
}: WebLayoutWrapperProps): React.ReactElement {
  return (
    <div
      data-testid="web-layout"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        {/* Brand */}
        {brand?.logo ? (
          <img
            src={brand.logo}
            alt={brand.name || 'Logo'}
            style={{ height: '32px', width: 'auto' }}
          />
        ) : brand?.name ? (
          <span
            style={{
              fontSize: 'var(--ds-font-size-lg)',
              fontWeight: 'var(--ds-font-weight-semibold)',
            }}
          >
            {brand.name}
          </span>
        ) : null}

        {/* Navigation placeholder */}
        <nav>
          {/* Navigation items would go here */}
        </nav>
      </header>

      {/* Main content */}
      <main
        id="main-content"
        style={{
          padding: 'var(--ds-spacing-6)',
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
          borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          textAlign: 'center',
          color: 'var(--ds-color-neutral-text-subtle)',
          fontSize: 'var(--ds-font-size-sm)',
        }}
      >
        {brand?.name && <span>© {new Date().getFullYear()} {brand.name}</span>}
      </footer>
    </div>
  );
}
