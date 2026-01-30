# Error Tracking Integration Guide

This guide explains how to integrate error tracking services (Sentry, LogRocket, or custom solutions) with the Xala Platform UI components.

## Overview

The `@xala-technologies/platform-ui` package provides domain-agnostic error handling components that can be integrated with any error tracking service. Error tracking integration is done via callbacks and configuration props - the UI components remain completely agnostic to your chosen error tracking provider.

**Key Components:**
- `ErrorBoundary` - React error boundary with error tracking callbacks
- `ErrorUserContext` - User context interface for error tracking
- `ErrorBreadcrumb` - Breadcrumb trail interface for debugging

## Architecture Principles

The platform-ui package follows strict separation of concerns:

1. **UI-only components** - No direct dependencies on error tracking services
2. **Callback-based integration** - Error tracking logic is injected via props
3. **Type-safe interfaces** - Compatible with Sentry, LogRocket, and custom services
4. **Framework-agnostic** - Works with any error tracking provider

## Supported Error Tracking Services

### 1. Sentry Integration

[Sentry](https://sentry.io) provides real-time error tracking, performance monitoring, and release tracking.

#### Installation

```bash
pnpm add @sentry/react @sentry/browser
```

#### Basic Setup

```tsx
// app/main.tsx
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';

// Initialize Sentry
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE, // 'development' | 'production'
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});

// Wrap your app with ErrorBoundary
function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo, context) => {
        // Send error to Sentry
        Sentry.captureException(error, {
          contexts: {
            react: {
              componentStack: errorInfo.componentStack,
            },
          },
          user: context?.user,
          tags: context?.tags,
          extra: {
            ...context?.extra,
            errorBoundary: true,
          },
        });
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

#### Advanced Sentry Integration

```tsx
import * as Sentry from '@sentry/react';
import { ErrorBoundary, type EnhancedErrorContext } from '@xala-technologies/platform-ui/blocks';

// Set user context globally (e.g., after login)
function setUserContext(user: { id: string; email: string; username: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

// Add breadcrumbs for navigation
function trackNavigation(to: string, from: string) {
  Sentry.addBreadcrumb({
    category: 'navigation',
    message: `Navigated from ${from} to ${to}`,
    level: 'info',
    timestamp: Date.now() / 1000,
  });
}

// Add breadcrumbs for user actions
function trackUserAction(action: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({
    category: 'user',
    message: action,
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  });
}

// ErrorBoundary with enhanced context
<ErrorBoundary
  onError={(error, errorInfo, context) => {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
      user: context?.user,
      tags: {
        ...context?.tags,
        errorBoundary: 'true',
      },
      extra: context?.extra,
    });
  }}
  errorContext={{
    tags: {
      feature: 'dashboard',
      environment: import.meta.env.MODE,
    },
    extra: {
      buildVersion: import.meta.env.VITE_BUILD_VERSION,
    },
  }}
>
  <Dashboard />
</ErrorBoundary>
```

#### Sentry Performance Monitoring

```tsx
import * as Sentry from '@sentry/react';

// Wrap your router for automatic performance tracking
const SentryRoutes = Sentry.withSentryRouting(Routes);

function App() {
  return (
    <BrowserRouter>
      <SentryRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </SentryRoutes>
    </BrowserRouter>
  );
}

// Manual performance tracking
function MyComponent() {
  const transaction = Sentry.startTransaction({ name: 'MyComponent.render' });

  useEffect(() => {
    return () => transaction.finish();
  }, [transaction]);

  return <div>...</div>;
}
```

### 2. LogRocket Integration

[LogRocket](https://logrocket.com) provides session replay, error tracking, and performance monitoring with video playback of user sessions.

#### Installation

```bash
pnpm add logrocket logrocket-react
```

#### Basic Setup

```tsx
// app/main.tsx
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';

// Initialize LogRocket
LogRocket.init('YOUR_LOGROCKET_APP_ID', {
  release: import.meta.env.VITE_BUILD_VERSION,
  console: {
    shouldAggregateConsoleErrors: true,
  },
  network: {
    requestSanitizer: (request) => {
      // Sanitize sensitive data from requests
      if (request.headers['Authorization']) {
        request.headers['Authorization'] = 'REDACTED';
      }
      return request;
    },
  },
});

// Setup React plugin
setupLogRocketReact(LogRocket);

// Wrap your app with ErrorBoundary
function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo, context) => {
        // Log error to LogRocket
        LogRocket.captureException(error, {
          tags: context?.tags,
          extra: {
            ...context?.extra,
            componentStack: errorInfo.componentStack,
          },
        });
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

#### LogRocket User Identification

```tsx
import LogRocket from 'logrocket';

// Identify user after login
function identifyUser(user: { id: string; email: string; name: string }) {
  LogRocket.identify(user.id, {
    name: user.name,
    email: user.email,
    // Add custom user properties
    subscriptionType: 'premium',
    accountCreated: new Date(user.createdAt).toISOString(),
  });
}

// Track custom events
function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  LogRocket.track(eventName, properties);
}

// Example: Track feature usage
function MyFeature() {
  const handleAction = () => {
    trackEvent('feature_used', {
      featureName: 'export_report',
      format: 'pdf',
    });
  };

  return <button onClick={handleAction}>Export Report</button>;
}
```

#### LogRocket + Sentry Integration

Combine LogRocket session replay with Sentry error tracking:

```tsx
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';

// Initialize both services
LogRocket.init('YOUR_LOGROCKET_APP_ID');
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [
    new Sentry.BrowserTracing(),
  ],
});

// Link LogRocket sessions to Sentry events
LogRocket.getSessionURL((sessionURL) => {
  Sentry.setContext('LogRocket', {
    sessionURL,
  });
});

// ErrorBoundary with both services
<ErrorBoundary
  onError={(error, errorInfo, context) => {
    // Get LogRocket session URL
    LogRocket.getSessionURL((sessionURL) => {
      // Send to Sentry with LogRocket session link
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
          LogRocket: {
            sessionURL,
          },
        },
        user: context?.user,
        tags: context?.tags,
        extra: context?.extra,
      });
    });

    // Also send to LogRocket
    LogRocket.captureException(error, {
      tags: context?.tags,
      extra: {
        ...context?.extra,
        componentStack: errorInfo.componentStack,
      },
    });
  }}
>
  <YourApp />
</ErrorBoundary>
```

### 3. Custom Error Tracking Service

You can integrate any custom error tracking service by implementing the callback interface.

#### Example: Custom API Error Logger

```tsx
import { ErrorBoundary, type EnhancedErrorContext } from '@xala-technologies/platform-ui/blocks';

// Custom error logging service
class CustomErrorTracker {
  private endpoint = '/api/errors';

  async logError(
    error: Error,
    componentStack: string,
    context?: EnhancedErrorContext
  ): Promise<void> {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack,
          timestamp: new Date().toISOString(),
          user: context?.user,
          breadcrumbs: context?.breadcrumbs,
          tags: context?.tags,
          extra: context?.extra,
        }),
      });
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }

  setUser(user: { id: string; email: string }): void {
    // Store user context in memory or localStorage
    sessionStorage.setItem('error_tracker_user', JSON.stringify(user));
  }

  addBreadcrumb(breadcrumb: {
    message: string;
    category?: string;
    level?: string;
    data?: Record<string, unknown>;
  }): void {
    // Store breadcrumbs in memory or sessionStorage
    const breadcrumbs = this.getBreadcrumbs();
    breadcrumbs.push({
      ...breadcrumb,
      timestamp: Date.now(),
    });
    // Keep only last 50 breadcrumbs
    sessionStorage.setItem(
      'error_tracker_breadcrumbs',
      JSON.stringify(breadcrumbs.slice(-50))
    );
  }

  private getBreadcrumbs(): Array<unknown> {
    try {
      return JSON.parse(sessionStorage.getItem('error_tracker_breadcrumbs') || '[]');
    } catch {
      return [];
    }
  }

  private getUser(): { id: string; email: string } | undefined {
    try {
      const user = sessionStorage.getItem('error_tracker_user');
      return user ? JSON.parse(user) : undefined;
    } catch {
      return undefined;
    }
  }

  getContext(): EnhancedErrorContext {
    return {
      user: this.getUser(),
      breadcrumbs: this.getBreadcrumbs() as any[],
      tags: {
        environment: import.meta.env.MODE,
      },
    };
  }
}

// Create singleton instance
const errorTracker = new CustomErrorTracker();

// Usage in app
function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo, context) => {
        errorTracker.logError(error, errorInfo.componentStack, context);
      }}
      errorContext={errorTracker.getContext()}
    >
      <YourApp />
    </ErrorBoundary>
  );
}

// Set user context after login
function handleLogin(user: { id: string; email: string }) {
  errorTracker.setUser(user);
}

// Add breadcrumbs for important actions
function handleImportantAction() {
  errorTracker.addBreadcrumb({
    message: 'User clicked important button',
    category: 'user',
    level: 'info',
    data: { buttonId: 'important-action' },
  });
}
```

#### Example: Integration with Xala Platform SDK

```tsx
import { ErrorBoundary, type EnhancedErrorContext } from '@xala-technologies/platform-ui/blocks';
import { auditService } from '@xala-technologies/platform/sdk';

// Integration with platform audit service
<ErrorBoundary
  onError={(error, errorInfo, context) => {
    // Log to platform audit service
    auditService.logError('react_error_boundary', 'application', error, {
      componentStack: errorInfo.componentStack,
      user: context?.user,
      breadcrumbs: context?.breadcrumbs,
      tags: context?.tags,
      extra: context?.extra,
    });
  }}
  errorContext={{
    user: {
      id: currentUser.id,
      email: currentUser.email,
      username: currentUser.username,
    },
    tags: {
      feature: 'dashboard',
    },
  }}
>
  <Dashboard />
</ErrorBoundary>
```

## User Context Setup

User context helps identify who experienced the error and provides debugging information.

### User Context Interface

```typescript
interface ErrorUserContext {
  /** User ID */
  id?: string;
  /** Username */
  username?: string;
  /** Email address */
  email?: string;
  /** IP address */
  ipAddress?: string;
  /** Additional custom user attributes */
  [key: string]: string | number | boolean | undefined;
}
```

### Setting User Context

#### Option 1: Via ErrorBoundary Props

```tsx
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';

function App() {
  const currentUser = useCurrentUser(); // Your auth hook

  return (
    <ErrorBoundary
      errorContext={{
        user: {
          id: currentUser.id,
          email: currentUser.email,
          username: currentUser.username,
          // Custom attributes
          role: currentUser.role,
          tenantId: currentUser.tenantId,
        },
      }}
      onError={(error, errorInfo, context) => {
        // context.user will be automatically included
        yourErrorTracker.captureException(error, {
          user: context?.user,
        });
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

#### Option 2: Via Error Tracking Service API

```tsx
import * as Sentry from '@sentry/react';
import LogRocket from 'logrocket';

// After user login
function handleLoginSuccess(user: User) {
  // Set user in Sentry
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  });

  // Identify user in LogRocket
  LogRocket.identify(user.id, {
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

// Clear user context on logout
function handleLogout() {
  Sentry.setUser(null);
  // LogRocket session continues but new session starts on next page load
}
```

#### Option 3: Dynamic User Context

```tsx
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';

function App() {
  const currentUser = useCurrentUser();
  const [errorContext, setErrorContext] = useState<EnhancedErrorContext>({});

  // Update error context when user changes
  useEffect(() => {
    if (currentUser) {
      setErrorContext({
        user: {
          id: currentUser.id,
          email: currentUser.email,
          username: currentUser.username,
        },
        tags: {
          userRole: currentUser.role,
          tenantId: currentUser.tenantId,
        },
      });
    }
  }, [currentUser]);

  return (
    <ErrorBoundary
      errorContext={errorContext}
      onError={(error, errorInfo, context) => {
        yourErrorTracker.captureException(error, context);
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

## Breadcrumb Tracking

Breadcrumbs provide a trail of events leading up to an error, making debugging much easier.

### Breadcrumb Interface

```typescript
type BreadcrumbLevel = 'debug' | 'info' | 'warning' | 'error' | 'fatal';

interface ErrorBreadcrumb {
  /** Timestamp when the breadcrumb was created (ISO 8601 string or Unix timestamp) */
  timestamp?: string | number;
  /** Breadcrumb message */
  message: string;
  /** Category (e.g., "navigation", "console", "xhr", "ui.click", "user") */
  category?: string;
  /** Severity level */
  level?: BreadcrumbLevel;
  /** Additional custom data */
  data?: Record<string, unknown>;
}
```

### Adding Breadcrumbs

#### Navigation Breadcrumbs

```tsx
import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useBreadcrumbTracking() {
  const location = useLocation();

  useEffect(() => {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Navigated to ${location.pathname}`,
      level: 'info',
      data: {
        pathname: location.pathname,
        search: location.search,
      },
    });
  }, [location]);
}

function App() {
  useBreadcrumbTracking();
  return <Routes>...</Routes>;
}
```

#### User Action Breadcrumbs

```tsx
import * as Sentry from '@sentry/react';

function MyComponent() {
  const handleButtonClick = () => {
    Sentry.addBreadcrumb({
      category: 'ui.click',
      message: 'User clicked submit button',
      level: 'info',
      data: {
        buttonId: 'submit-form',
        formValid: true,
      },
    });

    submitForm();
  };

  return <button onClick={handleButtonClick}>Submit</button>;
}
```

#### API Request Breadcrumbs

```tsx
import * as Sentry from '@sentry/react';

async function fetchData(url: string) {
  Sentry.addBreadcrumb({
    category: 'xhr',
    message: `Fetching data from ${url}`,
    level: 'info',
    data: {
      url,
      method: 'GET',
    },
  });

  try {
    const response = await fetch(url);

    Sentry.addBreadcrumb({
      category: 'xhr',
      message: `Received response from ${url}`,
      level: 'info',
      data: {
        url,
        status: response.status,
      },
    });

    return response.json();
  } catch (error) {
    Sentry.addBreadcrumb({
      category: 'xhr',
      message: `Request failed: ${url}`,
      level: 'error',
      data: {
        url,
        error: error.message,
      },
    });
    throw error;
  }
}
```

#### Form Input Breadcrumbs

```tsx
import * as Sentry from '@sentry/react';

function MyForm() {
  const handleFieldChange = (fieldName: string, value: unknown) => {
    Sentry.addBreadcrumb({
      category: 'user',
      message: `User updated ${fieldName}`,
      level: 'info',
      data: {
        fieldName,
        // Don't log sensitive values!
        hasValue: Boolean(value),
      },
    });
  };

  return (
    <form>
      <input
        onChange={(e) => handleFieldChange('email', e.target.value)}
      />
    </form>
  );
}
```

### Automatic Breadcrumbs

Sentry and LogRocket automatically capture certain breadcrumbs:

**Sentry automatic breadcrumbs:**
- Console messages (`console.log`, `console.error`, etc.)
- Navigation events (browser history changes)
- XHR/Fetch requests
- DOM events (clicks on specific elements)
- Browser events (online/offline, visibility changes)

**LogRocket automatic breadcrumbs:**
- All console messages
- Network requests and responses
- DOM mutations
- User interactions (clicks, inputs, etc.)
- Redux actions (with Redux integration)

To disable automatic breadcrumbs:

```tsx
// Sentry
Sentry.init({
  dsn: 'YOUR_DSN',
  integrations: [
    new Sentry.BrowserTracing({
      // Disable automatic breadcrumbs
      tracingOrigins: [],
    }),
  ],
  beforeBreadcrumb(breadcrumb) {
    // Filter out specific breadcrumbs
    if (breadcrumb.category === 'console') {
      return null; // Drop this breadcrumb
    }
    return breadcrumb;
  },
});

// LogRocket
LogRocket.init('YOUR_APP_ID', {
  console: {
    // Disable console breadcrumbs
    shouldAggregateConsoleErrors: false,
  },
  network: {
    // Disable network breadcrumbs
    isEnabled: false,
  },
});
```

## Error Boundary Configuration

### Custom Error Screen

```tsx
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';
import { Card, Heading, Paragraph, Button } from '@digdir/designsystemet-react';

function CustomErrorScreen() {
  return (
    <Card data-color="danger" data-size="large">
      <Heading level={1} data-size="large">
        Application Error
      </Heading>
      <Paragraph data-size="medium">
        We're sorry, but something went wrong. Our team has been notified.
      </Paragraph>
      <Button onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    </Card>
  );
}

<ErrorBoundary fallback={<CustomErrorScreen />}>
  <YourApp />
</ErrorBoundary>
```

### Custom Labels (i18n)

```tsx
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary
      labels={{
        title: t('errors.somethingWentWrong'),
        defaultDescription: t('errors.unexpectedError'),
        retryButton: t('common.retry'),
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Custom Retry Logic

```tsx
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      onRetry={() => {
        // Navigate to home instead of reloading
        navigate('/');
      }}
      retryButtonText="Go to Home"
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Multiple Error Boundaries

Use multiple error boundaries to isolate errors to specific sections:

```tsx
import { ErrorBoundary } from '@xala-technologies/platform-ui/blocks';
import * as Sentry from '@sentry/react';

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo, context) => {
        Sentry.captureException(error, {
          tags: { boundary: 'root' },
          contexts: { react: { componentStack: errorInfo.componentStack } },
        });
      }}
    >
      <Header />

      <ErrorBoundary
        onError={(error, errorInfo, context) => {
          Sentry.captureException(error, {
            tags: { boundary: 'sidebar', feature: 'navigation' },
            contexts: { react: { componentStack: errorInfo.componentStack } },
          });
        }}
        errorTitle="Navigation Error"
        errorDescription="The navigation sidebar encountered an error."
      >
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary
        onError={(error, errorInfo, context) => {
          Sentry.captureException(error, {
            tags: { boundary: 'main-content', feature: 'dashboard' },
            contexts: { react: { componentStack: errorInfo.componentStack } },
          });
        }}
        errorTitle="Content Error"
        errorDescription="The main content area encountered an error."
      >
        <MainContent />
      </ErrorBoundary>

      <Footer />
    </ErrorBoundary>
  );
}
```

## Best Practices

### 1. Don't Log Sensitive Data

Never include passwords, tokens, or PII in error reports:

```tsx
// ❌ Bad - Logs sensitive data
Sentry.addBreadcrumb({
  message: 'User login',
  data: {
    password: userPassword, // Never do this!
    token: authToken, // Never do this!
  },
});

// ✅ Good - Sanitizes sensitive data
Sentry.addBreadcrumb({
  message: 'User login',
  data: {
    username: user.username,
    passwordLength: userPassword.length, // OK to log metadata
  },
});
```

Configure sanitization in your error tracking service:

```tsx
// Sentry
Sentry.init({
  dsn: 'YOUR_DSN',
  beforeSend(event) {
    // Remove sensitive data
    if (event.request?.headers) {
      delete event.request.headers['Authorization'];
      delete event.request.headers['Cookie'];
    }
    return event;
  },
});

// LogRocket
LogRocket.init('YOUR_APP_ID', {
  network: {
    requestSanitizer: (request) => {
      // Remove sensitive headers
      delete request.headers['Authorization'];
      delete request.headers['Cookie'];
      return request;
    },
    responseSanitizer: (response) => {
      // Remove sensitive response data
      if (response.body?.token) {
        response.body.token = 'REDACTED';
      }
      return response;
    },
  },
});
```

### 2. Use Environment-Based Configuration

Different error tracking configuration for development vs. production:

```tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  // Only enable in production
  enabled: import.meta.env.MODE === 'production',
  // Sample rate based on environment
  tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
  // Debug mode in development
  debug: import.meta.env.MODE === 'development',
});
```

### 3. Set Release Versions

Always tag errors with release versions for better tracking:

```tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN',
  release: `my-app@${import.meta.env.VITE_APP_VERSION}`,
  environment: import.meta.env.MODE,
});

// LogRocket
LogRocket.init('YOUR_APP_ID', {
  release: import.meta.env.VITE_APP_VERSION,
});
```

### 4. Use Tags for Categorization

Tags help filter and group errors:

```tsx
<ErrorBoundary
  errorContext={{
    tags: {
      feature: 'checkout',
      page: 'payment',
      userRole: currentUser.role,
      tenantId: currentUser.tenantId,
    },
  }}
  onError={(error, errorInfo, context) => {
    Sentry.captureException(error, {
      tags: context?.tags,
    });
  }}
>
  <CheckoutPage />
</ErrorBoundary>
```

### 5. Handle Async Errors

Error boundaries only catch errors in React lifecycle methods. For async errors, use try-catch:

```tsx
import * as Sentry from '@sentry/react';

function MyComponent() {
  const handleAsync = async () => {
    try {
      await fetchData();
    } catch (error) {
      // Manually report async errors
      Sentry.captureException(error, {
        tags: { type: 'async-error' },
        extra: { component: 'MyComponent' },
      });

      // Show user-friendly error message
      showErrorToast('Failed to load data');
    }
  };

  return <button onClick={handleAsync}>Load Data</button>;
}
```

### 6. Rate Limiting and Sampling

Prevent overwhelming error tracking services:

```tsx
// Sentry - Sample errors in high-traffic applications
Sentry.init({
  dsn: 'YOUR_DSN',
  // Only send 10% of errors
  sampleRate: 0.1,
  // Only send 10% of performance traces
  tracesSampleRate: 0.1,
});

// Custom rate limiting
let errorCount = 0;
const ERROR_LIMIT = 10;
const ERROR_WINDOW = 60000; // 1 minute

setInterval(() => {
  errorCount = 0;
}, ERROR_WINDOW);

<ErrorBoundary
  onError={(error, errorInfo, context) => {
    if (errorCount < ERROR_LIMIT) {
      Sentry.captureException(error, context);
      errorCount++;
    } else {
      console.warn('Error rate limit exceeded, not sending to Sentry');
    }
  }}
>
  <YourApp />
</ErrorBoundary>
```

### 7. Test Error Tracking

Add a test error button in development:

```tsx
import * as Sentry from '@sentry/react';

function DevErrorTester() {
  if (import.meta.env.MODE !== 'development') return null;

  return (
    <button
      onClick={() => {
        throw new Error('Test error from dev error tester');
      }}
    >
      Trigger Test Error
    </button>
  );
}

// Add to your app in development
function App() {
  return (
    <>
      <DevErrorTester />
      <YourApp />
    </>
  );
}
```

### 8. Clear User Context on Logout

Always clear user context when user logs out:

```tsx
import * as Sentry from '@sentry/react';
import LogRocket from 'logrocket';

function handleLogout() {
  // Clear Sentry user
  Sentry.setUser(null);

  // Clear LogRocket session (starts new session on next page)
  LogRocket.startNewSession();

  // Clear custom error tracker
  sessionStorage.removeItem('error_tracker_user');
  sessionStorage.removeItem('error_tracker_breadcrumbs');

  // Perform logout
  authService.logout();
}
```

## Troubleshooting

### Error Tracking Not Working

1. **Check initialization**: Ensure error tracking service is initialized before React renders
2. **Verify DSN/API key**: Check that credentials are correct
3. **Check environment**: Verify service is enabled in current environment
4. **Test manually**: Trigger a test error to verify setup

```tsx
// Add console logs to debug
<ErrorBoundary
  onError={(error, errorInfo, context) => {
    console.log('ErrorBoundary caught error:', error);
    console.log('Error context:', context);
    yourErrorTracker.captureException(error, context);
  }}
>
  <YourApp />
</ErrorBoundary>
```

### Errors Not Showing User Context

1. **Check user context prop**: Verify `errorContext.user` is set
2. **Check timing**: Ensure user context is set before error occurs
3. **Check service configuration**: Some services require explicit user identification

```tsx
// Debug user context
useEffect(() => {
  console.log('Current error context:', errorContext);
}, [errorContext]);
```

### Too Many Error Reports

1. **Implement rate limiting**: Limit errors sent per time window
2. **Use sampling**: Only send a percentage of errors
3. **Filter duplicate errors**: Group similar errors together
4. **Increase error thresholds**: Only send critical errors

```tsx
// Filter duplicate errors in Sentry
Sentry.init({
  dsn: 'YOUR_DSN',
  beforeSend(event, hint) {
    const error = hint.originalException;
    // Filter out specific errors
    if (error?.message?.includes('Network error')) {
      return null; // Don't send this error
    }
    return event;
  },
  // Group similar errors together
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
});
```

## Additional Resources

- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [LogRocket React Documentation](https://docs.logrocket.com/docs/react)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [ErrorBoundary Component Source](../../packages/platform-ui-core/src/blocks/ErrorBoundary.tsx)
- [Error Tracking Best Practices](https://blog.sentry.io/error-monitoring-best-practices/)

## Examples Repository

Complete integration examples are available in the `examples/` directory:

- `examples/error-tracking-sentry/` - Full Sentry integration
- `examples/error-tracking-logrocket/` - Full LogRocket integration
- `examples/error-tracking-custom/` - Custom error tracking service
- `examples/error-tracking-combined/` - Sentry + LogRocket + Audit logging

## Support

For questions or issues with error tracking integration:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review the [ErrorBoundary source code](../../packages/platform-ui-core/src/blocks/ErrorBoundary.tsx)
3. Create an issue in the repository with details about your setup
