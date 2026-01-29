/**
 * StateWrapper Component
 *
 * Higher-order component for handling the standard state matrix:
 * idle, loading, empty, error, success, permissionDenied.
 *
 * Provides a consistent pattern for rendering different UI states
 * based on the current component state.
 *
 * @example
 * ```tsx
 * import { StateWrapper } from '@xala-technologies/platform-ui/composed';
 * import { LoadingFallback } from '@xala-technologies/platform-ui/composed';
 * import { EmptyState } from '@xala-technologies/platform-ui/composed';
 * import { AccessGate } from '@xala-technologies/platform-ui/blocks';
 *
 * function UserList({ users, isLoading, error, hasPermission }) {
 *   return (
 *     <StateWrapper
 *       state={
 *         !hasPermission ? 'permissionDenied' :
 *         isLoading ? 'loading' :
 *         error ? 'error' :
 *         users.length === 0 ? 'empty' : 'idle'
 *       }
 *       loadingComponent={<LoadingFallback />}
 *       emptyComponent={
 *         <EmptyState
 *           title="No users found"
 *           description="Get started by adding your first user."
 *           action={{ label: 'Add User', onClick: handleAdd }}
 *         />
 *       }
 *       errorComponent={
 *         <Alert data-color="danger">
 *           {error.message}
 *         </Alert>
 *       }
 *       permissionDeniedComponent={
 *         <AccessGate denied title="No Access" description="Admin required." />
 *       }
 *     >
 *       <UserTable users={users} />
 *     </StateWrapper>
 *   );
 * }
 * ```
 */
import * as React from 'react';
import { cn } from '../utils';

/**
 * Standard component state types following the state matrix.
 *
 * | State | Description |
 * |-------|-------------|
 * | idle | Normal interactive state |
 * | loading | Data is being fetched |
 * | empty | No data available |
 * | error | An error occurred |
 * | success | Operation completed successfully |
 * | permissionDenied | User lacks required permissions |
 */
export type ComponentState =
  | 'idle'
  | 'loading'
  | 'empty'
  | 'error'
  | 'success'
  | 'permissionDenied';

/**
 * Props for the StateWrapper component
 */
export interface StateWrapperProps {
  /** Current state of the component */
  state: ComponentState;
  /** Content to render in idle state */
  children: React.ReactNode;
  /** Component to render in loading state */
  loadingComponent?: React.ReactNode;
  /** Component to render in empty state */
  emptyComponent?: React.ReactNode;
  /** Component to render in error state */
  errorComponent?: React.ReactNode;
  /** Component to render in success state */
  successComponent?: React.ReactNode;
  /** Component to render when permission is denied */
  permissionDeniedComponent?: React.ReactNode;
  /** Additional content to render alongside children in idle state */
  idleAddon?: React.ReactNode;
  /** Callback when state changes */
  onStateChange?: (state: ComponentState) => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Render function for custom state handling */
  renderState?: (state: ComponentState) => React.ReactNode | null;
}

/**
 * Configuration for each state including defaults
 */
export interface StateConfig {
  /** Whether this state renders children */
  rendersChildren: boolean;
  /** Default ARIA role for the state container */
  defaultRole?: string;
  /** Default ARIA live value */
  ariaLive?: 'polite' | 'assertive' | 'off';
}

const stateConfigs: Record<ComponentState, StateConfig> = {
  idle: {
    rendersChildren: true,
  },
  loading: {
    rendersChildren: false,
    defaultRole: 'status',
    ariaLive: 'polite',
  },
  empty: {
    rendersChildren: false,
    defaultRole: 'status',
    ariaLive: 'polite',
  },
  error: {
    rendersChildren: false,
    defaultRole: 'alert',
    ariaLive: 'assertive',
  },
  success: {
    rendersChildren: false,
    defaultRole: 'status',
    ariaLive: 'polite',
  },
  permissionDenied: {
    rendersChildren: false,
    defaultRole: 'alert',
    ariaLive: 'polite',
  },
};

/**
 * StateWrapper handles rendering different UI states based on component state.
 *
 * Features:
 * - Follows the standard state matrix (idle/loading/empty/error/success/permissionDenied)
 * - Provides default containers with proper ARIA attributes
 * - Supports custom rendering via renderState prop
 * - Tracks state changes via onStateChange callback
 */
export function StateWrapper({
  state,
  children,
  loadingComponent,
  emptyComponent,
  errorComponent,
  successComponent,
  permissionDeniedComponent,
  idleAddon,
  onStateChange,
  className,
  style,
  renderState,
}: StateWrapperProps): React.ReactElement {
  // Track state changes
  const prevStateRef = React.useRef<ComponentState>(state);

  React.useEffect(() => {
    if (prevStateRef.current !== state && onStateChange) {
      onStateChange(state);
    }
    prevStateRef.current = state;
  }, [state, onStateChange]);

  // Custom render function takes precedence
  if (renderState) {
    const customContent = renderState(state);
    if (customContent !== null) {
      return <>{customContent}</>;
    }
    // If renderState returns null, fall through to default handling
  }

  const config = stateConfigs[state];

  // Handle each state
  switch (state) {
    case 'loading':
      if (loadingComponent) {
        return (
          <div
            role={config.defaultRole}
            aria-live={config.ariaLive}
            aria-busy="true"
            className={cn('state-wrapper-loading', className)}
            style={style}
          >
            {loadingComponent}
          </div>
        );
      }
      // Default loading - just return children with loading state
      return (
        <div
          role={config.defaultRole}
          aria-live={config.ariaLive}
          aria-busy="true"
          className={cn('state-wrapper-loading', className)}
          style={style}
        >
          {children}
        </div>
      );

    case 'empty':
      if (emptyComponent) {
        return (
          <div
            role={config.defaultRole}
            aria-live={config.ariaLive}
            className={cn('state-wrapper-empty', className)}
            style={style}
          >
            {emptyComponent}
          </div>
        );
      }
      // Default empty - render children (component should handle empty state)
      return <>{children}</>;

    case 'error':
      if (errorComponent) {
        return (
          <div
            role={config.defaultRole}
            aria-live={config.ariaLive}
            className={cn('state-wrapper-error', className)}
            style={style}
          >
            {errorComponent}
          </div>
        );
      }
      // Default error - render children (component should handle error state)
      return <>{children}</>;

    case 'success':
      if (successComponent) {
        return (
          <div
            role={config.defaultRole}
            aria-live={config.ariaLive}
            className={cn('state-wrapper-success', className)}
            style={style}
          >
            {successComponent}
          </div>
        );
      }
      // Success state often shows children along with success message
      return <>{children}</>;

    case 'permissionDenied':
      if (permissionDeniedComponent) {
        return (
          <div
            role={config.defaultRole}
            aria-live={config.ariaLive}
            className={cn('state-wrapper-permission-denied', className)}
            style={style}
          >
            {permissionDeniedComponent}
          </div>
        );
      }
      // Default permission denied - show nothing
      return (
        <div
          role={config.defaultRole}
          aria-live={config.ariaLive}
          className={cn('state-wrapper-permission-denied', className)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--ds-spacing-8)',
            color: 'var(--ds-color-neutral-text-subtle)',
            ...style,
          }}
        >
          Access denied
        </div>
      );

    case 'idle':
    default:
      // Idle state - render children with optional addon
      return (
        <>
          {children}
          {idleAddon}
        </>
      );
  }
}

/**
 * Helper hook to compute state from common data fetching patterns
 *
 * @example
 * ```tsx
 * const state = useComputedState({
 *   isLoading,
 *   error,
 *   isEmpty: data.length === 0,
 *   isSuccess: submitSuccess,
 *   hasPermission: user.canView,
 * });
 *
 * return <StateWrapper state={state}>...</StateWrapper>;
 * ```
 */
export interface ComputedStateOptions {
  /** Whether data is loading */
  isLoading?: boolean;
  /** Error object or message */
  error?: Error | string | null;
  /** Whether data is empty */
  isEmpty?: boolean;
  /** Whether operation was successful */
  isSuccess?: boolean;
  /** Whether user has required permission */
  hasPermission?: boolean;
}

/**
 * Computes the component state from common data patterns.
 * Priority: permissionDenied > loading > error > success > empty > idle
 */
export function computeState(options: ComputedStateOptions): ComponentState {
  const {
    isLoading = false,
    error = null,
    isEmpty = false,
    isSuccess = false,
    hasPermission = true,
  } = options;

  // Permission check has highest priority
  if (!hasPermission) {
    return 'permissionDenied';
  }

  // Loading state
  if (isLoading) {
    return 'loading';
  }

  // Error state
  if (error) {
    return 'error';
  }

  // Success state (temporary, usually from form submission)
  if (isSuccess) {
    return 'success';
  }

  // Empty state (no data)
  if (isEmpty) {
    return 'empty';
  }

  // Default: idle
  return 'idle';
}

/**
 * Hook version of computeState for use in components
 */
export function useComputedState(options: ComputedStateOptions): ComponentState {
  return React.useMemo(() => computeState(options), [
    options.isLoading,
    options.error,
    options.isEmpty,
    options.isSuccess,
    options.hasPermission,
  ]);
}
