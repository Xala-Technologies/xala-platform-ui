/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a user-friendly error screen with recovery options.
 *
 * This is a class component as required by React's error boundary API.
 *
 * Domain-agnostic - all integrations (Sentry, audit logging) should be
 * injected via callbacks.
 *
 * @example
 * ```tsx
 * // Basic usage with Sentry and audit logging
 * import { auditService } from '@xala-technologies/platform/sdk';
 * import * as Sentry from '@sentry/react';
 *
 * <ErrorBoundary
 *   onError={(error, errorInfo, context) => {
 *     // Sentry integration with enhanced context
 *     Sentry.captureException(error, {
 *       contexts: { react: { componentStack: errorInfo.componentStack } },
 *       user: context?.user,
 *       tags: context?.tags,
 *       extra: context?.extra,
 *     });
 *     // Audit logging
 *     auditService.logError('react_error_boundary', 'application', error, {
 *       componentStack: errorInfo.componentStack,
 *       ...context?.extra,
 *     });
 *   }}
 *   labels={{
 *     title: t('errors.somethingWentWrong'),
 *     defaultDescription: t('errors.unexpectedError'),
 *     retryButton: t('common.retry'),
 *   }}
 * >
 *   <App />
 * </ErrorBoundary>
 * ```
 *
 * @example
 * ```tsx
 * // Advanced usage with enhanced error context
 * import * as Sentry from '@sentry/react';
 * import { useAuth } from './auth';
 *
 * function AppWithErrorBoundary() {
 *   const { user, breadcrumbs } = useAuth();
 *
 *   return (
 *     <ErrorBoundary
 *       errorContext={{
 *         user: {
 *           id: user?.id,
 *           username: user?.username,
 *           email: user?.email,
 *         },
 *         breadcrumbs: breadcrumbs.map(b => ({
 *           timestamp: b.timestamp,
 *           message: b.message,
 *           category: b.category,
 *           level: b.level,
 *           data: b.data,
 *         })),
 *         tags: {
 *           environment: import.meta.env.MODE,
 *           version: import.meta.env.VITE_APP_VERSION,
 *         },
 *         extra: {
 *           userAgent: navigator.userAgent,
 *           viewport: `${window.innerWidth}x${window.innerHeight}`,
 *         },
 *       }}
 *       onError={(error, errorInfo, context) => {
 *         // Sentry will receive all enhanced context
 *         Sentry.captureException(error, {
 *           contexts: { react: { componentStack: errorInfo.componentStack } },
 *           user: context?.user,
 *           tags: context?.tags,
 *           extra: context?.extra,
 *         });
 *
 *         // Add breadcrumbs to Sentry
 *         context?.breadcrumbs?.forEach(breadcrumb => {
 *           Sentry.addBreadcrumb({
 *             message: breadcrumb.message,
 *             category: breadcrumb.category,
 *             level: breadcrumb.level,
 *             data: breadcrumb.data,
 *             timestamp: typeof breadcrumb.timestamp === 'string'
 *               ? new Date(breadcrumb.timestamp).getTime() / 1000
 *               : breadcrumb.timestamp,
 *           });
 *         });
 *       }}
 *     >
 *       <App />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorScreen } from './AuthComponents';

// =============================================================================
// Types
// =============================================================================

/**
 * User context for error tracking services
 * Compatible with Sentry, LogRocket, and other error tracking tools
 */
export interface ErrorUserContext {
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

/**
 * Breadcrumb severity levels
 */
export type BreadcrumbLevel = 'debug' | 'info' | 'warning' | 'error' | 'fatal';

/**
 * Breadcrumb for error tracking
 * Represents a trail of events leading to an error
 */
export interface ErrorBreadcrumb {
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

/**
 * Enhanced error context passed to error tracking services
 */
export interface EnhancedErrorContext {
  /** User information at the time of the error */
  user?: ErrorUserContext;
  /** Breadcrumb trail of events leading to the error */
  breadcrumbs?: ErrorBreadcrumb[];
  /** Additional tags for categorization */
  tags?: Record<string, string>;
  /** Additional context data */
  extra?: Record<string, unknown>;
}

export interface ErrorBoundaryLabels {
  title: string;
  defaultDescription: string;
  retryButton: string;
}

export interface ErrorBoundaryProps {
  /** Child components to wrap and catch errors for */
  children: ReactNode;
  /** Custom fallback UI to render when an error occurs */
  fallback?: ReactNode;
  /** Callback when an error is caught (for error tracking, audit logging, etc.) */
  onError?: (error: Error, errorInfo: ErrorInfo, context?: EnhancedErrorContext) => void;
  /** Enhanced error context (user info, breadcrumbs, tags, etc.) to pass to error tracking services */
  errorContext?: EnhancedErrorContext;
  /** Custom title for the error screen (overrides labels.title) */
  errorTitle?: string;
  /** Custom description for the error screen */
  errorDescription?: string;
  /** Show the retry button (default: true) */
  showRetryButton?: boolean;
  /** Custom retry button text (overrides labels.retryButton) */
  retryButtonText?: string;
  /** Custom retry handler (defaults to page reload) */
  onRetry?: () => void;
  /** Labels for i18n */
  labels?: Partial<ErrorBoundaryLabels>;
}

// =============================================================================
// Default Labels
// =============================================================================

const DEFAULT_LABELS: ErrorBoundaryLabels = {
  title: 'Noe gikk galt',
  defaultDescription: 'En uventet feil har oppstatt. Vennligst prov igjen.',
  retryButton: 'Last siden pa nytt',
};

// =============================================================================
// ErrorBoundary - React Error Boundary Class Component
// =============================================================================

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console for development debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call the onError callback if provided
    // This is the integration point for Sentry, audit logging, etc.
    if (this.props.onError) {
      this.props.onError(error, errorInfo, this.props.errorContext);
    }
  }

  handleRetry = (): void => {
    // Reset error state
    this.setState({ hasError: false, error: null });

    // Use custom retry handler if provided, otherwise reload the page
    if (this.props.onRetry) {
      this.props.onRetry();
    } else {
      window.location.reload();
    }
  };

  render(): ReactNode {
    const {
      children,
      fallback,
      errorTitle,
      errorDescription,
      showRetryButton = true,
      retryButtonText,
      labels: customLabels,
    } = this.props;

    const labels = { ...DEFAULT_LABELS, ...customLabels };

    if (this.state.hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Use ErrorScreen with configured or default text
      return (
        <ErrorScreen
          title={errorTitle || labels.title}
          description={errorDescription || this.state.error?.message || labels.defaultDescription}
          showRetryButton={showRetryButton}
          retryButtonText={retryButtonText || labels.retryButton}
          onRetry={this.handleRetry}
        />
      );
    }

    return children;
  }
}

// =============================================================================
// withErrorBoundary - Higher-Order Component wrapper
// =============================================================================

export interface WithErrorBoundaryOptions {
  /** Custom fallback UI to render when an error occurs */
  fallback?: ReactNode;
  /** Callback when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo, context?: EnhancedErrorContext) => void;
  /** Enhanced error context (user info, breadcrumbs, tags, etc.) to pass to error tracking services */
  errorContext?: EnhancedErrorContext;
  /** Custom title for the error screen */
  errorTitle?: string;
  /** Custom description for the error screen */
  errorDescription?: string;
  /** Labels for i18n */
  labels?: Partial<ErrorBoundaryLabels>;
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 *
 * @example
 * const SafeComponent = withErrorBoundary(UnsafeComponent, {
 *   errorTitle: 'Komponent feil',
 *   onError: (error) => logToService(error),
 * });
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): React.FC<P> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithErrorBoundary: React.FC<P> = (props) => {
    // Build props object only with defined values to satisfy exactOptionalPropertyTypes
    const boundaryProps: Partial<ErrorBoundaryProps> & { children: ReactNode } = {
      children: <WrappedComponent {...props} />,
    };

    if (options.fallback !== undefined) {
      boundaryProps.fallback = options.fallback;
    }
    if (options.onError !== undefined) {
      boundaryProps.onError = options.onError;
    }
    if (options.errorContext !== undefined) {
      boundaryProps.errorContext = options.errorContext;
    }
    if (options.errorTitle !== undefined) {
      boundaryProps.errorTitle = options.errorTitle;
    }
    if (options.errorDescription !== undefined) {
      boundaryProps.errorDescription = options.errorDescription;
    }
    if (options.labels !== undefined) {
      boundaryProps.labels = options.labels;
    }

    return <ErrorBoundary {...(boundaryProps as ErrorBoundaryProps)} />;
  };

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
}
