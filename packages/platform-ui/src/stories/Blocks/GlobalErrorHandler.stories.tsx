import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { GlobalErrorHandler } from '../../blocks/GlobalErrorHandler';

const meta: Meta<typeof GlobalErrorHandler> = {
  title: 'Blocks/GlobalErrorHandler',
  component: GlobalErrorHandler,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## GlobalErrorHandler

Catches unhandled JavaScript errors and promise rejections at the window level. Provides a user-friendly error screen for global errors that aren't caught by React's ErrorBoundary.

### Features
- Catches window errors
- Handles unhandled promise rejections
- Detects chunk load failures
- Custom error messages
- Retry functionality

### Usage
\`\`\`tsx
<GlobalErrorHandler
  onError={(error) => {
    // Log to error tracking service
  }}
  errorTitle="Something went wrong"
>
  <App />
</GlobalErrorHandler>
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

// Working app (no error)
export const NoError: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: '500px' }}>
      <GlobalErrorHandler {...args}>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <h3>App Running Normally</h3>
          <p>No errors detected. The app is running smoothly.</p>
        </div>
      </GlobalErrorHandler>
    </div>
  ),
};

// Custom error title
export const CustomTitle: Story = {
  args: {
    errorTitle: 'Application Error',
    showRetryButton: true,
  },
  render: (args) => {
    // Simulate error by throwing
    React.useEffect(() => {
      // This would normally be caught by GlobalErrorHandler
      // For demo purposes, we'll show the error screen directly
    }, []);
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>
              Note: GlobalErrorHandler catches window-level errors. To see it in action, trigger a
              window error.
            </p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Custom error description
export const CustomDescription: Story = {
  args: {
    errorDescription: 'A critical error occurred. Please refresh the page or contact support.',
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <GlobalErrorHandler {...args}>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>Note: GlobalErrorHandler catches window-level errors.</p>
        </div>
      </GlobalErrorHandler>
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
      <GlobalErrorHandler {...args}>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>Note: GlobalErrorHandler catches window-level errors.</p>
        </div>
      </GlobalErrorHandler>
    </div>
  ),
};

// Custom retry button text
export const CustomRetryText: Story = {
  args: {
    retryButtonText: 'Reload Page',
    showRetryButton: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <GlobalErrorHandler {...args}>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>Note: GlobalErrorHandler catches window-level errors.</p>
        </div>
      </GlobalErrorHandler>
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
        <p>This is a custom fallback component for global errors.</p>
      </div>
    ),
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <GlobalErrorHandler {...args}>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>Note: GlobalErrorHandler catches window-level errors.</p>
        </div>
      </GlobalErrorHandler>
    </div>
  ),
};
