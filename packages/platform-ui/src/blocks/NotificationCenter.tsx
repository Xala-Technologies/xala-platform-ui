/**
 * NotificationCenter Component
 *
 * Modal/drawer component for displaying notification history and managing notifications.
 * Shows a list of notifications with filtering, mark-as-read, and delete actions.
 */

import * as React from 'react';
import { Dialog, Heading, Paragraph, Button, Spinner } from '@digdir/designsystemet-react';
import { NotificationItem, type NotificationItemData } from './NotificationItem';

// =============================================================================
// Types
// =============================================================================

export type NotificationFilter = 'all' | 'unread' | 'read';

export interface NotificationCenterLabels {
  /** Main title */
  title: string;
  /** Mark all as read button text */
  markAllAsRead: string;
  /** Close button aria-label */
  closeAriaLabel: string;
  /** Filter tab labels */
  filterAll: string;
  filterUnread: string;
  filterRead: string;
  /** Empty state messages */
  emptyAllTitle: string;
  emptyAllDescription: string;
  emptyUnreadTitle: string;
  emptyUnreadDescription: string;
  emptyReadTitle: string;
  emptyReadDescription: string;
  /** Loading aria-label */
  loadingAriaLabel: string;
}

export interface NotificationCenterProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** List of notifications to display */
  notifications: NotificationItemData[];
  /** Whether notifications are loading */
  loading?: boolean;
  /** Current filter */
  filter?: NotificationFilter;
  /** Callback when filter changes */
  onFilterChange?: (filter: NotificationFilter) => void;
  /** Callback when a notification is clicked */
  onNotificationClick?: (id: string) => void;
  /** Callback when mark as read is clicked */
  onMarkAsRead?: (id: string) => void;
  /** Callback when delete is clicked */
  onDelete?: (id: string) => void;
  /** Callback when mark all as read is clicked */
  onMarkAllAsRead?: () => void;
  /** Custom time formatting function */
  formatTimeAgo?: (date: string) => string;
  /** UI labels */
  labels?: Partial<NotificationCenterLabels>;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Icons (inline SVG)
// =============================================================================

function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckAllIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function InboxIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

// =============================================================================
// Default Labels
// =============================================================================

const defaultLabels: NotificationCenterLabels = {
  title: 'Varsler',
  markAllAsRead: 'Merk alle som lest',
  closeAriaLabel: 'Lukk varselssenter',
  filterAll: 'Alle',
  filterUnread: 'Uleste',
  filterRead: 'Leste',
  emptyAllTitle: 'Ingen varsler',
  emptyAllDescription: 'Du har ingen varsler ennå. Når du får nye varsler, vil de vises her.',
  emptyUnreadTitle: 'Ingen uleste varsler',
  emptyUnreadDescription: 'Du har lest alle varslene dine. Godt jobbet!',
  emptyReadTitle: 'Ingen leste varsler',
  emptyReadDescription: 'Du har ingen leste varsler ennå.',
  loadingAriaLabel: 'Laster varsler...',
};

// =============================================================================
// Filter Tabs Component
// =============================================================================

interface FilterTabsProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  counts: {
    all: number;
    unread: number;
    read: number;
  };
  labels: NotificationCenterLabels;
}

function FilterTabs({ activeFilter, onFilterChange, counts, labels }: FilterTabsProps) {
  const filters: Array<{ value: NotificationFilter; label: string; count: number }> = [
    { value: 'all', label: labels.filterAll, count: counts.all },
    { value: 'unread', label: labels.filterUnread, count: counts.unread },
    { value: 'read', label: labels.filterRead, count: counts.read },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        padding: '0 var(--ds-spacing-4)',
      }}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <Button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            data-color={isActive ? 'accent' : 'neutral'}
            style={{
              padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 'var(--ds-font-size-4)',
              fontWeight: isActive ? 600 : 500,
              color: isActive
                ? 'var(--ds-color-accent-text-default)'
                : 'var(--ds-color-neutral-text-subtle)',
              borderBottom: isActive
                ? '2px solid var(--ds-color-accent-base-default)'
                : '2px solid transparent',
              marginBottom: '-1px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {filter.label}
            {filter.count > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '20px',
                  height: '20px',
                  padding: '0 6px',
                  borderRadius: 'var(--ds-border-radius-full)',
                  backgroundColor: isActive
                    ? 'var(--ds-color-accent-base-default)'
                    : 'var(--ds-color-neutral-surface-default)',
                  color: isActive ? 'white' : 'var(--ds-color-neutral-text-subtle)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {filter.count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

// =============================================================================
// Empty State Component
// =============================================================================

interface EmptyStateProps {
  filter: NotificationFilter;
  labels: NotificationCenterLabels;
}

function EmptyState({ filter, labels }: EmptyStateProps) {
  const messages = {
    all: {
      title: labels.emptyAllTitle,
      description: labels.emptyAllDescription,
    },
    unread: {
      title: labels.emptyUnreadTitle,
      description: labels.emptyUnreadDescription,
    },
    read: {
      title: labels.emptyReadTitle,
      description: labels.emptyReadDescription,
    },
  };

  const message = messages[filter];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--ds-spacing-12) var(--ds-spacing-8)',
        textAlign: 'center',
        color: 'var(--ds-color-neutral-text-subtle)',
      }}
    >
      <div
        style={{
          marginBottom: 'var(--ds-spacing-4)',
          opacity: 0.5,
        }}
      >
        <InboxIcon size={64} />
      </div>
      <Heading data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        {message.title}
      </Heading>
      <Paragraph data-size="sm" style={{ maxWidth: '320px', margin: 0 }}>
        {message.description}
      </Paragraph>
    </div>
  );
}

// =============================================================================
// NotificationCenter Component
// =============================================================================

/**
 * NotificationCenter - A modal/drawer for displaying and managing notifications
 *
 * @example
 * ```tsx
 * <NotificationCenter
 *   open={showNotifications}
 *   onClose={() => setShowNotifications(false)}
 *   notifications={notifications}
 *   onNotificationClick={(id) => handleNotificationClick(id)}
 *   onMarkAsRead={(id) => handleMarkAsRead(id)}
 *   onMarkAllAsRead={() => handleMarkAllAsRead()}
 * />
 * ```
 */
export function NotificationCenter({
  open,
  onClose,
  notifications,
  loading = false,
  filter = 'all',
  onFilterChange,
  onNotificationClick,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
  formatTimeAgo,
  labels: customLabels,
  className = '',
}: NotificationCenterProps): React.ReactElement {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const labels = { ...defaultLabels, ...customLabels };

  // Control dialog visibility
  React.useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [open]);

  // Handle dialog close event
  const handleDialogClose = () => {
    onClose();
  };

  // Filter notifications based on active filter
  const filteredNotifications = React.useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((n) => !n.readAt);
    }
    if (filter === 'read') {
      return notifications.filter((n) => n.readAt);
    }
    return notifications;
  }, [notifications, filter]);

  // Calculate counts for filter tabs
  const counts = React.useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter((n) => !n.readAt).length,
      read: notifications.filter((n) => n.readAt).length,
    };
  }, [notifications]);

  const hasUnreadNotifications = counts.unread > 0;

  return (
    <Dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      className={className}
      style={{
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        padding: 0,
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        borderRadius: 'var(--ds-border-radius-lg)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          zIndex: 10,
        }}
      >
        <Heading data-size="xs" style={{ margin: 0 }}>
          {labels.title}
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
          {hasUnreadNotifications && onMarkAllAsRead && (
            <Button
              data-size="sm"
              variant="tertiary"
              onClick={onMarkAllAsRead}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
              }}
            >
              <CheckAllIcon size={16} />
              {labels.markAllAsRead}
            </Button>
          )}
          <Button
            type="button"
            onClick={onClose}
            aria-label={labels.closeAriaLabel}
            data-color="neutral"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--ds-spacing-9)',
              height: 'var(--ds-spacing-9)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--ds-color-neutral-text-subtle)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <CloseIcon size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      {onFilterChange && (
        <FilterTabs
          activeFilter={filter}
          onFilterChange={onFilterChange}
          counts={counts}
          labels={labels}
        />
      )}

      {/* Content */}
      <div
        style={{
          maxHeight: 'calc(90vh - 140px)',
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--ds-spacing-12)',
            }}
          >
            <Spinner aria-label={labels.loadingAriaLabel} />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <EmptyState filter={filter} labels={labels} />
        ) : (
          <Stack direction="vertical">
            {filteredNotifications.map((notification) => {
              // Build props object to avoid exactOptionalPropertyTypes issues
              const itemProps: {
                notification: NotificationItemData;
                showActions: boolean;
                onClick?: (id: string) => void;
                onMarkAsRead?: (id: string) => void;
                onDelete?: (id: string) => void;
                formatTimeAgo?: (date: string) => string;
              } = {
                notification,
                showActions: true,
              };

              if (onNotificationClick) itemProps.onClick = onNotificationClick;
              if (onMarkAsRead) itemProps.onMarkAsRead = onMarkAsRead;
              if (onDelete) itemProps.onDelete = onDelete;
              if (formatTimeAgo) itemProps.formatTimeAgo = formatTimeAgo;

              return <NotificationItem key={notification.id} {...itemProps} />;
            })}
          </div>
        )}
      </div>
    </Dialog>
  );
}
