/**
 * WebLayout Wrapper
 *
 * Layout wrapper for public-facing web applications.
 * Simple header-only layout without sidebar.
 *
 * DESIGN SYSTEM COMPLIANT: Uses only Designsystemet components.
 */

import React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { Stack } from '../../primitives';
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
    <Stack
      data-testid="web-layout"
      direction="vertical"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Header */}
      <Stack
        as="header"
        direction="horizontal"
        align="center"
        justify="space-between"
        style={{
          padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        {/* Brand */}
        {brand?.name && (
          <Heading level={1} data-size="sm">
            {brand.name}
          </Heading>
        )}

        {/* Navigation placeholder */}
        <Stack as="nav" direction="horizontal" spacing={16}>
          {/* Navigation items would go here */}
        </Stack>
      </Stack>

      {/* Main content */}
      <Stack
        as="main"
        id="main-content"
        direction="vertical"
        style={{
          flex: 1,
          padding: 'var(--ds-spacing-6)',
        }}
      >
        {children}
      </Stack>

      {/* Footer */}
      <Stack
        as="footer"
        direction="horizontal"
        justify="center"
        style={{
          padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
          borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          color: 'var(--ds-color-neutral-text-subtle)',
          fontSize: 'var(--ds-font-size-sm)',
        }}
      >
        {brand?.name && (
          <Paragraph data-size="sm">© {new Date().getFullYear()} {brand.name}</Paragraph>
        )}
      </Stack>
    </Stack>
  );
}
