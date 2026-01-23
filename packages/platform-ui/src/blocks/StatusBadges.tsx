/**
 * StatusBadges
 *
 * Reusable status badge components for various entity types.
 * Norwegian labels with consistent color coding.
 *
 * Uses custom styled tags instead of Digdir Badge (which is designed for numeric counts).
 */
import * as React from 'react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type BadgeColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface StatusBadgeConfig {
  color: BadgeColor;
  label: string;
}

// =============================================================================
// Base StatusTag Component
// =============================================================================

const colorStyles: Record<BadgeColor, { bg: string; text: string }> = {
  success: {
    bg: 'var(--ds-color-success-surface-default)',
    text: 'var(--ds-color-success-text-default)',
  },
  warning: {
    bg: 'var(--ds-color-warning-surface-default)',
    text: 'var(--ds-color-warning-text-default)',
  },
  danger: {
    bg: 'var(--ds-color-danger-surface-default)',
    text: 'var(--ds-color-danger-text-default)',
  },
  info: {
    bg: 'var(--ds-color-info-surface-default)',
    text: 'var(--ds-color-info-text-default)',
  },
  neutral: {
    bg: 'var(--ds-color-neutral-surface-hover)',
    text: 'var(--ds-color-neutral-text-subtle)',
  },
};

const sizeStyles: Record<'sm' | 'md' | 'lg', { padding: string; fontSize: string }> = {
  sm: {
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    fontSize: 'var(--ds-font-size-xs)',
  },
  md: {
    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
    fontSize: 'var(--ds-font-size-sm)',
  },
  lg: {
    padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
    fontSize: 'var(--ds-font-size-md)',
  },
};

export interface StatusTagProps {
  /** The label text to display */
  children: React.ReactNode;
  /** Color scheme */
  color: BadgeColor;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
}

/**
 * Base StatusTag component for displaying status labels.
 * Use this for custom status displays or when you need more control.
 */
export function StatusTag({
  children,
  color,
  size = 'sm',
  className,
}: StatusTagProps): React.ReactElement {
  const colorStyle = colorStyles[color];
  const sizeStyle = sizeStyles[size];

  return (
    <span
      className={cn('status-tag', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 'var(--ds-border-radius-full)',
        backgroundColor: colorStyle.bg,
        color: colorStyle.text,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        fontWeight: 'var(--ds-font-weight-medium)',
        lineHeight: 'var(--ds-line-height-sm)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

// =============================================================================
// Payment Status Badge
// =============================================================================

export type PaymentStatusType = 'paid' | 'unpaid' | 'partial' | 'refunded';

const paymentStatusConfig: Record<PaymentStatusType, StatusBadgeConfig> = {
  paid: { color: 'success', label: 'Betalt' },
  unpaid: { color: 'warning', label: 'Ikke betalt' },
  partial: { color: 'warning', label: 'Delvis betalt' },
  refunded: { color: 'neutral', label: 'Refundert' },
};

export interface PaymentStatusBadgeProps {
  status: PaymentStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function PaymentStatusBadge({
  status,
  size = 'sm',
}: PaymentStatusBadgeProps): React.ReactElement {
  const config = paymentStatusConfig[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Resource Status Badge
// =============================================================================

export type ResourceStatusType = 'published' | 'draft' | 'archived' | 'maintenance';

const resourceStatusConfig: Record<ResourceStatusType, StatusBadgeConfig> = {
  published: { color: 'success', label: 'Publisert' },
  draft: { color: 'warning', label: 'Utkast' },
  archived: { color: 'neutral', label: 'Arkivert' },
  maintenance: { color: 'info', label: 'Vedlikehold' },
};

export interface ResourceStatusBadgeProps {
  status: ResourceStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function ResourceStatusBadge({
  status,
  size = 'sm',
}: ResourceStatusBadgeProps): React.ReactElement {
  const config = resourceStatusConfig[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Request Status Badge
// =============================================================================

export type RequestStatusType = 'pending' | 'needs_info' | 'approved' | 'rejected';

const requestStatusConfig: Record<RequestStatusType, StatusBadgeConfig> = {
  pending: { color: 'warning', label: 'Venter' },
  needs_info: { color: 'info', label: 'Trenger info' },
  approved: { color: 'success', label: 'Godkjent' },
  rejected: { color: 'danger', label: 'Avslått' },
};

export interface RequestStatusBadgeProps {
  status: RequestStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function RequestStatusBadge({
  status,
  size = 'sm',
}: RequestStatusBadgeProps): React.ReactElement {
  const config = requestStatusConfig[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Organization Status Badge
// =============================================================================

export type OrganizationStatusType = 'active' | 'inactive' | 'suspended';

const organizationStatusConfig: Record<OrganizationStatusType, StatusBadgeConfig> = {
  active: { color: 'success', label: 'Aktiv' },
  inactive: { color: 'neutral', label: 'Inaktiv' },
  suspended: { color: 'danger', label: 'Suspendert' },
};

export interface OrganizationStatusBadgeProps {
  status: OrganizationStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function OrganizationStatusBadge({
  status,
  size = 'sm',
}: OrganizationStatusBadgeProps): React.ReactElement {
  const config = organizationStatusConfig[status] || {
    color: 'neutral' as BadgeColor,
    label: status,
  };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// User Status Badge
// =============================================================================

export type UserStatusType = 'active' | 'inactive' | 'suspended';

const userStatusConfig: Record<UserStatusType, StatusBadgeConfig> = {
  active: { color: 'success', label: 'Aktiv' },
  inactive: { color: 'neutral', label: 'Inaktiv' },
  suspended: { color: 'danger', label: 'Suspendert' },
};

export interface UserStatusBadgeProps {
  status: UserStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function UserStatusBadge({ status, size = 'sm' }: UserStatusBadgeProps): React.ReactElement {
  const config = userStatusConfig[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Generic Status Badge (for custom statuses)
// =============================================================================

export interface GenericStatusBadgeProps {
  status: string;
  config?: Record<string, StatusBadgeConfig>;
  size?: 'sm' | 'md' | 'lg';
}

export function GenericStatusBadge({
  status,
  config,
  size = 'sm',
}: GenericStatusBadgeProps): React.ReactElement {
  const statusConfig = config?.[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={statusConfig.color} size={size}>
      {statusConfig.label}
    </StatusTag>
  );
}

// =============================================================================
// Export config for customization
// =============================================================================

export const statusConfigs = {
  payment: paymentStatusConfig,
  resource: resourceStatusConfig,
  request: requestStatusConfig,
  organization: organizationStatusConfig,
  user: userStatusConfig,
};

// =============================================================================
// PLATFORM-NEUTRAL UTILITY BADGES
// =============================================================================

// Inventory Badge - Shows remaining inventory (x igjen)
export interface InventoryBadgeProps {
  total: number;
  available: number;
  size?: 'sm' | 'md' | 'lg';
}

export function InventoryBadge({
  total,
  available,
  size = 'sm',
}: InventoryBadgeProps): React.ReactElement {
  const color: BadgeColor = available === 0 ? 'danger' : available <= 2 ? 'warning' : 'success';
  const label = available === 0 ? 'Utsolgt' : `${available} igjen`;

  return (
    <StatusTag color={color} size={size}>
      📦 {label}
    </StatusTag>
  );
}

// Capacity Badge - Shows remaining capacity (plasser igjen)
export interface CapacityBadgeProps {
  total: number;
  used: number;
  size?: 'sm' | 'md' | 'lg';
}

export function CapacityBadge({
  total,
  used,
  size = 'sm',
}: CapacityBadgeProps): React.ReactElement {
  const available = total - used;
  const color: BadgeColor = available === 0 ? 'danger' : available <= 5 ? 'warning' : 'success';
  const label = available === 0 ? 'Fullt' : `${available} plasser igjen`;

  return (
    <StatusTag color={color} size={size}>
      👥 {label}
    </StatusTag>
  );
}

// Blackout Indicator
export interface BlackoutIndicatorProps {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BlackoutIndicator({
  title = 'Utilgjengelig',
  size = 'sm',
}: BlackoutIndicatorProps): React.ReactElement {
  return (
    <StatusTag color="neutral" size={size}>
      🚫 {title}
    </StatusTag>
  );
}

// Requires Approval Badge
export interface RequiresApprovalBadgeProps {
  size?: 'sm' | 'md' | 'lg';
}

export function RequiresApprovalBadge({
  size = 'sm',
}: RequiresApprovalBadgeProps): React.ReactElement {
  return (
    <StatusTag color="warning" size={size}>
      ⏳ Krever godkjenning
    </StatusTag>
  );
}

// =============================================================================
// GDPR Request Status Badge
// =============================================================================

export type GdprRequestStatusType = 'pending' | 'processing' | 'completed' | 'rejected';

const gdprRequestStatusConfig: Record<GdprRequestStatusType, StatusBadgeConfig> = {
  pending: { color: 'warning', label: 'Venter' },
  processing: { color: 'info', label: 'Behandles' },
  completed: { color: 'success', label: 'Fullført' },
  rejected: { color: 'danger', label: 'Avslått' },
};

export interface GdprRequestStatusBadgeProps {
  status: GdprRequestStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function GdprRequestStatusBadge({
  status,
  size = 'sm',
}: GdprRequestStatusBadgeProps): React.ReactElement {
  const config = gdprRequestStatusConfig[status] || {
    color: 'neutral' as BadgeColor,
    label: status,
  };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Block Status Badge
// =============================================================================

export type BlockStatusType = 'active' | 'cancelled' | 'completed' | 'scheduled';

const blockStatusConfig: Record<BlockStatusType, StatusBadgeConfig> = {
  active: { color: 'success', label: 'Aktiv' },
  scheduled: { color: 'info', label: 'Planlagt' },
  completed: { color: 'neutral', label: 'Fullført' },
  cancelled: { color: 'danger', label: 'Kansellert' },
};

export interface BlockStatusBadgeProps {
  status: BlockStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function BlockStatusBadge({
  status,
  size = 'sm',
}: BlockStatusBadgeProps): React.ReactElement {
  const config = blockStatusConfig[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Invoice Status Badge
// =============================================================================

export type InvoiceStatusType = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';

const invoiceStatusConfig: Record<InvoiceStatusType, StatusBadgeConfig> = {
  draft: { color: 'neutral', label: 'Utkast' },
  sent: { color: 'info', label: 'Sendt' },
  paid: { color: 'success', label: 'Betalt' },
  overdue: { color: 'danger', label: 'Forfalt' },
  cancelled: { color: 'neutral', label: 'Kansellert' },
  refunded: { color: 'warning', label: 'Refundert' },
};

export interface InvoiceStatusBadgeProps {
  status: InvoiceStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function InvoiceStatusBadge({
  status,
  size = 'sm',
}: InvoiceStatusBadgeProps): React.ReactElement {
  const config = invoiceStatusConfig[status] || { color: 'neutral' as BadgeColor, label: status };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}

// =============================================================================
// Integration Status Badge
// =============================================================================

export type IntegrationStatusType = 'connected' | 'disconnected' | 'error' | 'pending';

const integrationStatusConfig: Record<IntegrationStatusType, StatusBadgeConfig> = {
  connected: { color: 'success', label: 'Tilkoblet' },
  disconnected: { color: 'neutral', label: 'Frakoblet' },
  error: { color: 'danger', label: 'Feil' },
  pending: { color: 'warning', label: 'Venter' },
};

export interface IntegrationStatusBadgeProps {
  status: IntegrationStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export function IntegrationStatusBadge({
  status,
  size = 'sm',
}: IntegrationStatusBadgeProps): React.ReactElement {
  const config = integrationStatusConfig[status] || {
    color: 'neutral' as BadgeColor,
    label: status,
  };
  return (
    <StatusTag color={config.color} size={size}>
      {config.label}
    </StatusTag>
  );
}
