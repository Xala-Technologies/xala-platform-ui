/**
 * PushNotificationPrompt
 *
 * Modal dialog displayed to request browser push notification permission
 * from the user for receiving resourceRequest updates and reminders.
 */
import * as React from 'react';
import { Dialog, Button, Heading, Paragraph } from '../primitives';
import { cn } from '../utils';
import { BellIcon, CloseIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export interface PushNotificationPromptLabels {
  /** Close button aria-label */
  closeAriaLabel: string;
  /** Enable button text */
  enableButton: string;
  /** Dismiss button text */
  dismissButton: string;
  /** Booking context title */
  bookingTitle: string;
  /** Booking context description */
  bookingDescription: string;
  /** Reminder context title */
  reminderTitle: string;
  /** Reminder context description */
  reminderDescription: string;
  /** General context title */
  generalTitle: string;
  /** General context description */
  generalDescription: string;
}

export interface PushNotificationPromptProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Enable notifications handler */
  onEnable?: () => void;
  /** Dismiss handler (optional, defaults to onClose) */
  onDismiss?: () => void;
  /** Override title text (overrides context-based title) */
  title?: string;
  /** Override description text (overrides context-based description) */
  description?: string;
  /** Context for the prompt (affects messaging) */
  context?: 'booking' | 'reminder' | 'general';
  /** UI labels */
  labels?: Partial<PushNotificationPromptLabels>;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Default Labels
// =============================================================================

const defaultLabels: PushNotificationPromptLabels = {
  closeAriaLabel: 'Lukk',
  enableButton: 'Aktiver varsler',
  dismissButton: 'Kanskje senere',
  bookingTitle: 'Få varsler om dine bookinger',
  bookingDescription:
    'Hold deg oppdatert om bookingbekreftelser, endringer og kanselleringer direkte i nettleseren din.',
  reminderTitle: 'Ikke gå glipp av dine bookinger',
  reminderDescription:
    'Vi kan sende deg påminnelser før dine bookinger så du aldri glemmer en avtale.',
  generalTitle: 'Aktiver varsler',
  generalDescription: 'Få viktige oppdateringer om dine bookinger direkte i nettleseren din.',
};

// =============================================================================
// Component
// =============================================================================

export function PushNotificationPrompt({
  isOpen,
  onClose,
  onEnable,
  onDismiss,
  title,
  description,
  context = 'general',
  labels: customLabels,
  className,
}: PushNotificationPromptProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  // Get contextual messages
  const getContextualContent = () => {
    switch (context) {
      case 'booking':
        return {
          title: title || labels.bookingTitle,
          description: description || labels.bookingDescription,
        };
      case 'reminder':
        return {
          title: title || labels.reminderTitle,
          description: description || labels.reminderDescription,
        };
      default:
        return {
          title: title || labels.generalTitle,
          description: description || labels.generalDescription,
        };
    }
  };

  const content = getContextualContent();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={cn('push-notification-prompt', className)}
      style={{ maxWidth: '400px' }}
    >
      <Dialog.Block>
        {/* Close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          <Button
            type="button"
            onClick={onClose}
            aria-label={labels.closeAriaLabel}
            data-color="neutral"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--ds-spacing-8)',
              height: 'var(--ds-spacing-8)',
              border: 'none',
              borderRadius: 'var(--ds-border-radius-full)',
              backgroundColor: 'transparent',
              color: 'var(--ds-color-neutral-text-subtle)',
              cursor: 'pointer',
            }}
          >
            <CloseIcon size={20} />
          </Button>
        </div>

        {/* Icon */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--ds-spacing-16)',
              height: 'var(--ds-spacing-16)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-full)',
              color: 'var(--ds-color-accent-base-default)',
            }}
          >
            <BellIcon size={32} />
          </div>
        </div>

        {/* Title */}
        <Heading
          level={2}
          data-size="sm"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-2)',
            textAlign: 'center',
          }}
        >
          {content.title}
        </Heading>

        {/* Description */}
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-6)',
            textAlign: 'center',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {content.description}
        </Paragraph>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          {onEnable && (
            <Button type="button" onClick={onEnable} data-size="md" style={{ width: '100%' }}>
              {labels.enableButton}
            </Button>
          )}
          <Button
            type="button"
            onClick={onDismiss || onClose}
            variant="secondary"
            data-size="md"
            style={{ width: '100%' }}
          >
            {labels.dismissButton}
          </Button>
        </div>
      </Dialog.Block>
    </Dialog>
  );
}
