/**
 * AccessGate Component
 *
 * RBAC-aware access control component with rich UI feedback.
 * Provides a structured way to handle permission-based content gating
 * with customizable denied state UI.
 *
 * Unlike PermissionGate which simply shows/hides content, AccessGate
 * provides a complete access denied experience with icon, title,
 * description, and optional actions.
 *
 * @example
 * ```tsx
 * import { AccessGate } from '@xala-technologies/platform-ui/blocks';
 *
 * // Basic usage
 * <AccessGate
 *   denied={!user.hasPermission('admin')}
 *   title="Admin Access Required"
 *   description="You need admin permissions to view this section."
 * >
 *   <AdminPanel />
 * </AccessGate>
 *
 * // With request access action
 * <AccessGate
 *   denied={!canEdit}
 *   title="Edit Access Required"
 *   requiredPermission="resource:edit"
 *   actions={[
 *     { label: 'Request Access', onClick: handleRequestAccess, variant: 'primary' },
 *     { label: 'Go Back', onClick: handleGoBack, variant: 'secondary' },
 *   ]}
 * >
 *   <EditForm />
 * </AccessGate>
 * ```
 */
import * as React from 'react';
import { Heading, Paragraph, Button } from '../primitives';
import { cn } from '../utils';

/**
 * Action button configuration for AccessGate
 */
export interface AccessGateAction {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Whether the button is loading */
  loading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Labels for AccessGate (for i18n support)
 */
export interface AccessGateLabels {
  /** Default title when not specified */
  defaultTitle?: string;
  /** Default description when not specified */
  defaultDescription?: string;
}

/**
 * Props for the AccessGate component
 */
export interface AccessGateProps {
  /** Whether access is denied */
  denied: boolean;
  /** Content to render when access is granted */
  children: React.ReactNode;
  /** Title displayed when access is denied */
  title?: string;
  /** Description displayed when access is denied */
  description?: string;
  /** Icon to display when access is denied */
  icon?: React.ReactNode;
  /** The permission that is required (for display purposes) */
  requiredPermission?: string;
  /** Action buttons to display when access is denied */
  actions?: AccessGateAction[];
  /** Custom fallback component to render instead of default denied UI */
  fallback?: React.ReactNode;
  /** Size variant for the denied state UI */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show a border around the denied state */
  bordered?: boolean;
  /** Labels for i18n support */
  labels?: AccessGateLabels;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** ARIA role for the denied state container */
  role?: string;
  /** ID for the denied state container */
  id?: string;
}

const defaultLabels: AccessGateLabels = {
  defaultTitle: 'Access Restricted',
  defaultDescription: 'You do not have permission to view this content.',
};

const sizeStyles = {
  sm: {
    padding: 'var(--ds-spacing-6)',
    iconSize: '32px',
    iconContainerSize: 'var(--ds-spacing-12)',
    titleSize: 'var(--ds-font-size-sm)' as const,
    descriptionSize: 'var(--ds-font-size-xs)' as const,
    gap: 'var(--ds-spacing-3)',
  },
  md: {
    padding: 'var(--ds-spacing-8)',
    iconSize: '40px',
    iconContainerSize: 'var(--ds-spacing-16)',
    titleSize: 'var(--ds-font-size-md)' as const,
    descriptionSize: 'var(--ds-font-size-sm)' as const,
    gap: 'var(--ds-spacing-4)',
  },
  lg: {
    padding: 'var(--ds-spacing-12)',
    iconSize: '48px',
    iconContainerSize: 'var(--ds-spacing-20)',
    titleSize: 'var(--ds-font-size-lg)' as const,
    descriptionSize: 'var(--ds-font-size-md)' as const,
    gap: 'var(--ds-spacing-6)',
  },
};

/**
 * Default lock icon for access denied state
 */
function DefaultLockIcon({ size = '32px' }: { size?: string }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/**
 * AccessGate provides RBAC-aware content gating with rich denied state UI.
 *
 * Features:
 * - Customizable denied state with icon, title, description
 * - Action buttons for request access or navigation
 * - Size variants (sm, md, lg)
 * - Proper accessibility with role="alert" and aria-live
 * - i18n support via labels prop
 */
export function AccessGate({
  denied,
  children,
  title,
  description,
  icon,
  requiredPermission,
  actions,
  fallback,
  size = 'md',
  bordered = false,
  labels = defaultLabels,
  className,
  style,
  role = 'alert',
  id,
}: AccessGateProps): React.ReactElement {
  // If access is granted, render children
  if (!denied) {
    return <>{children}</>;
  }

  // If custom fallback provided, render it
  if (fallback) {
    return <>{fallback}</>;
  }

  const sizeStyle = sizeStyles[size];
  const displayTitle = title || labels.defaultTitle || defaultLabels.defaultTitle;
  const displayDescription = description || labels.defaultDescription || defaultLabels.defaultDescription;

  return (
    <div
      id={id}
      role={role}
      aria-live="polite"
      className={cn('access-gate-denied', className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: sizeStyle.padding,
        textAlign: 'center',
        minHeight: '200px',
        border: bordered ? '1px solid var(--ds-color-neutral-border-default)' : 'none',
        borderRadius: bordered ? 'var(--ds-border-radius-md)' : '0',
        backgroundColor: bordered ? 'var(--ds-color-neutral-surface-default)' : 'transparent',
        ...style,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: sizeStyle.iconContainerSize,
          height: sizeStyle.iconContainerSize,
          borderRadius: 'var(--ds-border-radius-full)',
          backgroundColor: 'var(--ds-color-danger-surface-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: sizeStyle.gap,
        }}
      >
        {icon || <DefaultLockIcon size={sizeStyle.iconSize} />}
      </div>

      {/* Title */}
      <Heading
        level={2}
        style={{
          fontSize: sizeStyle.titleSize,
          fontWeight: 'var(--ds-font-weight-semibold)',
          color: 'var(--ds-color-danger-text-default)',
          margin: 0,
          marginBottom: 'var(--ds-spacing-2)',
        }}
      >
        {displayTitle}
      </Heading>

      {/* Description */}
      <Paragraph
        style={{
          fontSize: sizeStyle.descriptionSize,
          color: 'var(--ds-color-neutral-text-subtle)',
          margin: 0,
          maxWidth: '400px',
          marginBottom: requiredPermission || actions ? sizeStyle.gap : 0,
        }}
      >
        {displayDescription}
      </Paragraph>

      {/* Required Permission Badge */}
      {requiredPermission && (
        <code
          style={{
            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)',
            fontFamily: 'var(--ds-font-family-mono)',
            marginBottom: actions ? sizeStyle.gap : 0,
          }}
        >
          {requiredPermission}
        </code>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {actions.map((action, index) => (
            <Button
              key={index}
              type="button"
              variant={action.variant || 'primary'}
              onClick={action.onClick}
              disabled={action.disabled}
              data-size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
            >
              {action.loading ? 'Loading...' : action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
