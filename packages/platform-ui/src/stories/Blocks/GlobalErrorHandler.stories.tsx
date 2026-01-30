import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
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
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <h3>{t('storybook.demo.cardTitle')}</h3>
            <p>{t('storybook.demo.cardDescription')}</p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Custom error title
export const CustomTitle: Story = {
  args: {
    errorTitle: 'Application Error',
    showRetryButton: true,
  },
  render: function Render(args) {
    const t = useT();
    // Simulate error by throwing
    React.useEffect(() => {
      // This would normally be caught by GlobalErrorHandler
      // For demo purposes, we'll show the error screen directly
    }, []);
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.demo.sampleText')}</p>
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
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.demo.sampleText')}</p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Without retry button
export const WithoutRetryButton: Story = {
  args: {
    showRetryButton: false,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.demo.sampleText')}</p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Custom retry button text
export const CustomRetryText: Story = {
  args: {
    retryButtonText: 'Reload Page',
    showRetryButton: true,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.demo.sampleText')}</p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
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
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.demo.sampleText')}</p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Error tracking integration
export const WithErrorTracking: Story = {
  args: {
    onError: (error) => {
      // Example: Send to error tracking service
      console.info('Error sent to tracking service:', {
        error,
        type: error.type,
        message: error.message,
        source: error.source,
        user: {
          id: 'user-123',
          email: 'user@example.com',
        },
        tags: {
          environment: 'storybook',
          feature: 'error-handling-demo',
        },
      });
    },
    showRetryButton: true,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <h3>Error Tracking Demo</h3>
            <p>
              This example shows how to integrate with error tracking services like Sentry. Check
              the console to see error tracking output when an error occurs.
            </p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Error tracking with different error types
export const TrackingErrorTypes: Story = {
  args: {
    onError: (error) => {
      // Track different error types differently
      const errorData = {
        error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      if (error.type === 'chunk-load-failure') {
        console.info('Chunk load failure tracked:', errorData);
        // In production: trigger cache clear and reload
      } else if (error.type === 'unhandled-rejection') {
        console.info('Unhandled rejection tracked:', errorData);
        // In production: send to error service with high priority
      } else {
        console.info('Window error tracked:', errorData);
        // In production: send to error service
      }
    },
    showRetryButton: true,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <h3>Error Type Tracking</h3>
            <p>
              Demonstrates tracking different error types (window-error, unhandled-rejection,
              chunk-load-failure) with appropriate handling.
            </p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};

// Error tracking with enriched data
export const WithEnrichedData: Story = {
  args: {
    onError: (error) => {
      // Enrich error with application context before sending
      const enrichedError = {
        error: {
          message: error.message,
          type: error.type,
          source: error.source,
          lineno: error.lineno,
          colno: error.colno,
          stack: error.error?.stack,
        },
        context: {
          user: {
            id: 'user-456',
            email: 'admin@example.com',
          },
          app: {
            version: '1.2.3',
            environment: 'production',
            buildId: 'abc123',
          },
          session: {
            id: 'session-xyz',
            duration: 1800000,
            pageViews: 5,
          },
          browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            online: navigator.onLine,
          },
        },
        timestamp: new Date().toISOString(),
      };

      console.info('Enriched error data:', enrichedError);
      // In production: send enrichedError to tracking service
    },
    showRetryButton: true,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <GlobalErrorHandler {...args}>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <h3>Enriched Data Demo</h3>
            <p>
              Shows how to enrich error data with application context like user info, session
              details, and browser info before sending to tracking services.
            </p>
          </div>
        </GlobalErrorHandler>
      </div>
    );
  },
};
