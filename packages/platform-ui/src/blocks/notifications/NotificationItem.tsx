/**
 * NotificationItem & NotificationList Blocks
 *
 * Pure presentational components for displaying individual notifications and lists.
 *
 * @pure - All data via props, all actions via callbacks
 */
import { Card, Paragraph, Badge, Button } from '@digdir/designsystemet-react';
import { Stack } from '../../primitives/stack';

// ============================================================================
// Types
// ============================================================================

export interface NotificationItemData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface NotificationItemProps {
  notification: NotificationItemData;
  onMarkRead?: (id: string) => void;
  onClick?: (id: string) => void;
  markAsReadLabel?: string;
  formatTimestamp?: (timestamp: string) => string;
  'data-testid'?: string;
}

export interface NotificationListProps {
  notifications: NotificationItemData[];
  onMarkRead?: (id: string) => void;
  onClick?: (id: string) => void;
  emptyMessage?: string;
  markAsReadLabel?: string;
  formatTimestamp?: (timestamp: string) => string;
}

// ============================================================================
// Constants
// ============================================================================

const TYPE_COLORS: Record<
  NotificationItemData['type'],
  'info' | 'success' | 'warning' | 'danger'
> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'danger',
};

// ============================================================================
// NotificationItem Component
// ============================================================================

export function NotificationItem({
  notification,
  onMarkRead,
  onClick,
  markAsReadLabel = 'Marker lest',
  formatTimestamp,
  'data-testid': testId = 'notification-item',
}: NotificationItemProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(notification.id);
    }
  };

  const handleMarkRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkRead) {
      onMarkRead(notification.id);
    }
  };

  const formattedTimestamp = formatTimestamp
    ? formatTimestamp(notification.timestamp)
    : new Date(notification.timestamp).toLocaleString('no-NO');

  return (
    <Card
      data-testid={testId}
      onClick={handleClick}
      style={{
        padding: 'var(--ds-spacing-4)',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: notification.isRead
          ? 'var(--ds-color-neutral-background-default)'
          : 'var(--ds-color-neutral-background-subtle)',
        border: '1px solid var(--ds-color-neutral-border-default)',
      }}
    >
      <Stack direction="horizontal" spacing="3" data-align="flex-start">
        <Badge data-color={TYPE_COLORS[notification.type]} data-size="sm" />

        <Stack spacing="2" style={{ flex: 1 }}>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              fontWeight: notification.isRead
                ? 'var(--ds-font-weight-regular)'
                : 'var(--ds-font-weight-semibold)',
            }}
          >
            {notification.title}
          </Paragraph>

          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {notification.message}
          </Paragraph>

          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {formattedTimestamp}
          </Paragraph>
        </Stack>

        {!notification.isRead && onMarkRead && (
          <Button type="button" variant="tertiary" data-size="sm" onClick={handleMarkRead}>
            {markAsReadLabel}
          </Button>
        )}
      </Stack>
    </Card>
  );
}

// ============================================================================
// NotificationList Component
// ============================================================================

export function NotificationList({
  notifications,
  onMarkRead,
  onClick,
  emptyMessage = 'Ingen varsler',
  markAsReadLabel,
  formatTimestamp,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <Paragraph
        data-size="sm"
        style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          textAlign: 'center',
          padding: 'var(--ds-spacing-6)',
        }}
      >
        {emptyMessage}
      </Paragraph>
    );
  }

  return (
    <Stack spacing="2">
      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          onMarkRead={onMarkRead}
          onClick={onClick}
          markAsReadLabel={markAsReadLabel}
          formatTimestamp={formatTimestamp}
        />
      ))}
    </Stack>
  );
}
