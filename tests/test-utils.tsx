/**
 * Test Utilities
 *
 * Shared utilities for testing React components
 */

import * as React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../packages/platform-ui/src/ThemeProvider';

/**
 * Custom render function that includes providers
 */
interface AllTheProvidersProps {
  children: React.ReactNode;
}

function AllTheProviders({ children }: AllTheProvidersProps) {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

/**
 * Create a mock function that can be used as event handlers
 */
export function createMockHandler() {
  return vi.fn();
}

/**
 * Wait for async updates
 */
export async function waitForAsync() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Mock component props factory
 */
export function createMockProps<T extends Record<string, unknown>>(
  defaults: Partial<T> = {}
): T {
  return defaults as T;
}
