import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { ErrorBoundary } from '../../blocks/ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Blocks/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ErrorBoundary

Catches JavaScript errors anywhere in the child component tree and displays a user-friendly error screen with recovery options.

### Features
- Catches React errors
- Custom error messages
- Retry functionality
- Error callback for logging
- Custom fallback UI

### Usage
\`\`\`tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Log to error tracking service
  }}
  labels={{
    title: 'Something went wrong',
    defaultDescription: 'An unexpected error occurred',
    retryButton: 'Retry',
  }}
>
  <App />
</ErrorBoundary>
\`\`\`
        `,
      },
    },
  },
  args: {
    onError: fn(),
    onRetry: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error for ErrorBoundary');
  }
  return <div>No error</div>;
};

// Basic error boundary
export const Default: Story = {
  args: {
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Custom error title
export const CustomTitle: Story = {
  args: {
    errorTitle: 'Oops! Something broke',
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Custom error description
export const CustomDescription: Story = {
  args: {
    errorDescription: 'A specific error occurred. Please try again or contact support.',
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Without retry button
export const WithoutRetryButton: Story = {
  args: {
    showRetryButton: false,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Custom retry button text
export const CustomRetryText: Story = {
  args: {
    retryButtonText: 'Try Again',
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    labels: {
      title: 'Error Occurred',
      defaultDescription: 'Something went wrong. Please try again.',
      retryButton: 'Reload Page',
    },
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Custom fallback
export const CustomFallback: Story = {
  args: {
    fallback: (
      <div
        style={{
          padding: 'var(--ds-spacing-8)',
          textAlign: 'center',
          border: '2px dashed var(--ds-color-danger-border-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <h2>Custom Error UI</h2>
        <p>This is a custom fallback component.</p>
      </div>
    ),
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    </div>
  ),
};

// Working component (no error)
export const NoError: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ErrorBoundary {...args}>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <h3>No Error</h3>
          <p>This component renders normally when there's no error.</p>
        </div>
      </ErrorBoundary>
    </div>
  ),
};
