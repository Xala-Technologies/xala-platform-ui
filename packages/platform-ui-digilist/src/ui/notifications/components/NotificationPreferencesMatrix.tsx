/**
 * NotificationPreferencesMatrix
 *
 * A matrix component for managing notification preferences across different
 * notification types and channels (in-app, email, SMS).
 *
 * Based on Skien demo specification:
 * - In-app: always on by default
 * - E-post: on for decisions and changes
 * - SMS: off by default, but recommended for reminders and cancellations
 */

import React, { useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Switch,
  Badge,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import type {
  NotificationPreferencesMatrix as NotificationPreferencesMatrixType,
  NotificationChannel,
  NotificationType,
} from '@digilist/client-sdk/types';
import {
  NOTIFICATION_TYPES_REGISTRY,
  updateChannelSetting,
} from '@digilist/client-sdk';

// =============================================================================
// Types
// =============================================================================

export interface NotificationPreferencesMatrixProps {
  /** Current notification preferences */
  preferences: NotificationPreferencesMatrixType;
  /** Callback when preferences change */
  onPreferencesChange: (preferences: NotificationPreferencesMatrixType) => void;
  /** Master toggle states for each channel */
  masterToggles?: {
    inAppEnabled: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
  };
  /** Callback when a master toggle changes */
  onMasterToggleChange?: (channel: NotificationChannel, enabled: boolean) => void;
  /** Whether to show the master toggles row */
  showMasterToggles?: boolean;
  /** Whether to show SMS recommended badges */
  showSmsRecommended?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

// Re-export types for convenience
export type { NotificationPreferencesMatrixType, NotificationChannel };

// =============================================================================
// Constants
// =============================================================================

const CHANNELS: NotificationChannel[] = ['in_app', 'email', 'sms'];

// Notification types where SMS is recommended
const SMS_RECOMMENDED_TYPES: NotificationType[] = [
  'reminder_24h',
  'reminder_2h',
  'cancelled',
];

// Group notification types for better organization
const NOTIFICATION_GROUPS = {
  decisions: ['request_received', 'approved', 'rejected', 'request_more_info'] as NotificationType[],
  changes: ['booking_changed', 'cancelled'] as NotificationType[],
  reminders: ['reminder_24h', 'reminder_2h'] as NotificationType[],
  billing: ['invoice_available', 'payment_status'] as NotificationType[],
  system: ['system_alert', 'custom'] as NotificationType[],
};

// =============================================================================
// Component
// =============================================================================

export function NotificationPreferencesMatrix({
  preferences,
  onPreferencesChange,
  masterToggles,
  onMasterToggleChange,
  showMasterToggles = true,
  showSmsRecommended = true,
  disabled = false,
}: NotificationPreferencesMatrixProps): React.ReactElement {
  const t = useT();

  // Handle individual cell toggle
  const handleToggle = useCallback(
    (type: NotificationType, channel: NotificationChannel, enabled: boolean) => {
      const updatedPreferences = updateChannelSetting(preferences, type, channel, enabled);
      onPreferencesChange(updatedPreferences);
    },
    [preferences, onPreferencesChange]
  );

  // Check if a channel is disabled by master toggle
  const isChannelDisabled = useCallback(
    (channel: NotificationChannel): boolean => {
      if (!masterToggles) return false;
      switch (channel) {
        case 'in_app':
          return !masterToggles.inAppEnabled;
        case 'email':
          return !masterToggles.emailEnabled;
        case 'sms':
          return !masterToggles.smsEnabled;
        default:
          return false;
      }
    },
    [masterToggles]
  );

  // Get translation key for notification type
  const getTypeLabel = (type: NotificationType): string => {
    return t(`notifications.types.${type}`, { defaultValue: type });
  };

  // Get translation key for channel
  const getChannelLabel = (channel: NotificationChannel): string => {
    return t(`notifications.channels.${channel}`, { defaultValue: channel });
  };

  // Get group label
  const getGroupLabel = (group: string): string => {
    return t(`notifications.groups.${group}`, { defaultValue: group });
  };

  // Render a notification type row
  const renderTypeRow = (type: NotificationType) => {
    const settings = preferences[type];
    const isSmsRecommended = SMS_RECOMMENDED_TYPES.includes(type);

    return (
      <div
        key={type}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(3, 80px)',
          alignItems: 'center',
          padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {getTypeLabel(type)}
          </Paragraph>
          {showSmsRecommended && isSmsRecommended && (
            <Badge
              data-size="sm"
              data-color="info"
              style={{ fontSize: '10px' }}
            >
              SMS {t('notifications.recommended')}
            </Badge>
          )}
        </div>

        {CHANNELS.map((channel) => (
          <div
            key={channel}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Switch
              aria-label={`${getTypeLabel(type)} - ${getChannelLabel(channel)}`}
              checked={settings?.[channel] ?? false}
              onChange={(e) => handleToggle(type, channel, e.target.checked)}
              disabled={disabled || isChannelDisabled(channel)}
              data-size="sm"
            />
          </div>
        ))}
      </div>
    );
  };

  // Render group header
  const renderGroupHeader = (group: string) => (
    <div
      key={`group-${group}`}
      style={{
        padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <Paragraph
        data-size="xs"
        style={{
          margin: 0,
          fontWeight: 'var(--ds-font-weight-medium)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        {getGroupLabel(group)}
      </Paragraph>
    </div>
  );

  return (
    <Card style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: 'var(--ds-spacing-5)', borderBottom: '1px solid var(--ds-color-neutral-border-subtle)' }}>
        <Heading level={2} data-size="sm" style={{ margin: 0 }}>
          {t('notifications.preferencesMatrix.title')}
        </Heading>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-1)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {t('notifications.preferencesMatrix.description')}
        </Paragraph>
      </div>

      {/* Column Headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(3, 80px)',
          alignItems: 'center',
          padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
          borderBottom: '2px solid var(--ds-color-neutral-border-default)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        }}
      >
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            fontWeight: 'var(--ds-font-weight-medium)',
          }}
        >
          {t('notifications.preferencesMatrix.notificationType')}
        </Paragraph>

        {CHANNELS.map((channel) => (
          <div
            key={channel}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--ds-spacing-1)',
            }}
          >
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                fontWeight: 'var(--ds-font-weight-medium)',
                textAlign: 'center',
              }}
            >
              {getChannelLabel(channel)}
            </Paragraph>
            {isChannelDisabled(channel) && (
              <Badge data-size="sm" data-color="neutral">
                {t('notifications.disabled')}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Master Toggles */}
      {showMasterToggles && masterToggles && onMasterToggleChange && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(3, 80px)',
            alignItems: 'center',
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderBottom: '2px solid var(--ds-color-neutral-border-default)',
            backgroundColor: 'var(--ds-color-brand-1-surface-default)',
          }}
        >
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              fontWeight: 'var(--ds-font-weight-medium)',
              color: 'var(--ds-color-brand-1-text-default)',
            }}
          >
            {t('notifications.preferencesMatrix.masterToggle')}
          </Paragraph>

          {CHANNELS.map((channel) => (
            <div
              key={channel}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Switch
                aria-label={`${t('notifications.preferencesMatrix.masterToggle')} - ${getChannelLabel(channel)}`}
                checked={
                  channel === 'in_app'
                    ? masterToggles.inAppEnabled
                    : channel === 'email'
                    ? masterToggles.emailEnabled
                    : masterToggles.smsEnabled
                }
                onChange={(e) => onMasterToggleChange(channel, e.target.checked)}
                disabled={disabled}
                data-size="sm"
              />
            </div>
          ))}
        </div>
      )}

      {/* Notification Types by Group */}
      {Object.entries(NOTIFICATION_GROUPS).map(([group, types]) => (
        <React.Fragment key={group}>
          {renderGroupHeader(group)}
          {types.map((type) => renderTypeRow(type))}
        </React.Fragment>
      ))}
    </Card>
  );
}

export default NotificationPreferencesMatrix;
