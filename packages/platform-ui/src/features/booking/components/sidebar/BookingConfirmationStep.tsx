/**
 * BookingConfirmationStep Component
 *
 * Step 2 of the booking flow: Login prompt and booking confirmation.
 * Handles authentication flow with Vipps/BankID and account type selection.
 * Supports session-safe return-to-flow authentication by capturing booking state before auth redirect.
 *
 * @module @xala-technologies/platform-ui/features/booking/components/sidebar
 */

import * as React from 'react';
import { NativeSelect } from '../../../../primitives/NativeSelect';
import { Heading, Paragraph, Button, Card, Alert, Divider } from '@digdir/designsystemet-react';
import { Stack } from '../../../../primitives/stack';
import { BookingVisibilitySelector, type BookingVisibility } from './BookingVisibilitySelector';

// =============================================================================
// Icons
// =============================================================================

function UserIcon({ size = 18 }: { size?: number }): React.ReactElement {
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
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BuildingIcon({ size = 18 }: { size?: number }): React.ReactElement {
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
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CheckCircleIcon({ size = 18 }: { size?: number }): React.ReactElement {
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
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ShieldIcon({ size = 24 }: { size?: number }): React.ReactElement {
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
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function UserCheckIcon({ size = 24 }: { size?: number }): React.ReactElement {
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
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  );
}

// =============================================================================
// Types
// =============================================================================

/** Selected time slot with date and time information */
export interface FlowSelectedSlot {
  date: string;
  startTime: string;
  endTime: string;
}

/** Booking state to be captured before authentication redirect */
export interface BookingFlowState {
  /** Selected time slots with date and time information */
  selectedSlots: FlowSelectedSlot[];
  /** Details for each slot (duration, purpose, attendees, etc.) */
  slotDetails: Record<
    string,
    {
      duration: number;
      purpose?: string;
      attendees?: string;
      activityType?: string;
    }
  >;
  /** Start of the week being viewed */
  weekStart: string;
  /** Selected booking account type */
  bookingAccountType?: 'private' | 'organization';
  /** Selected organization ID if booking as organization */
  selectedOrganizationId?: string;
  /** Calendar visibility preference (GDPR compliance) */
  visibility?: BookingVisibility;
}

/** Options for login with flow context */
export interface LoginWithFlowContextOptions {
  /** OAuth provider to use */
  provider: 'vipps' | 'idporten';
  /** Booking state to preserve */
  bookingState: BookingFlowState;
  /** Rental object ID for flow context */
  rentalObjectId?: string;
  /** Tenant ID for flow context */
  tenantId?: string;
  /** Current booking mode for flow context */
  bookingMode?: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface BookingConfirmationStepProps {
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Whether login is in progress */
  isLoggingIn: boolean;
  /** Whether booking submission is in progress */
  isSubmitting: boolean;
  /** Error message from booking attempt */
  bookingError: string | null;
  /** Mobile layout mode */
  isMobile?: boolean;
  /** Selected slot keys */
  selectedSlots: Set<string>;
  /** Details for each slot */
  slotDetails: Record<
    string,
    {
      duration: number;
      purpose?: string;
      attendees?: string;
      activityType?: string;
    }
  >;
  /** Start of the week being viewed */
  weekStart: Date;
  /** @deprecated Use onLoginWithFlowContext instead */
  onLoginWithVipps?: () => void;
  /** @deprecated Use onLoginWithFlowContext instead */
  onLoginAsEmployee?: () => void;
  /** Handler for login with flow context preservation */
  onLoginWithFlowContext?: (options: LoginWithFlowContextOptions) => void;
  /** Handler for booking confirmation */
  onConfirmBooking?: () => void;
  /** Handler to clear error */
  onClearError?: () => void;
  /** Selected booking account type */
  bookingAccountType?: 'private' | 'organization';
  /** Selected organization ID */
  selectedOrganizationId?: string;
  /** Handler for account type selection */
  onAccountTypeSelect?: (
    type: 'private' | 'organization' | undefined,
    organizationId?: string
  ) => void;
  /** Handler to confirm account type selection */
  onConfirmAccountType?: () => void;
  /** User's organizations */
  organizations?: Organization[];
  /** Whether account type selection is confirmed */
  isAccountTypeConfirmed?: boolean;
  /** Rental object ID for flow context */
  rentalObjectId?: string;
  /** Tenant ID for flow context */
  tenantId?: string;
  /** Current booking mode */
  bookingMode?: string;
  /** Selected calendar visibility (GDPR compliance) */
  visibility?: BookingVisibility;
  /** Handler for visibility change */
  onVisibilityChange?: (visibility: BookingVisibility) => void;
  /** Handler for demo login */
  onDemoLogin?: () => void;
  /** Handler for logout */
  onLogout?: () => void;
  /** Display mode */
  displayMode?: 'auto' | 'login-and-selection' | 'confirmation-only';
  /** Custom className */
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export function BookingConfirmationStep({
  isAuthenticated,
  isLoggingIn,
  isSubmitting: _isSubmitting,
  bookingError,
  isMobile: _isMobile = false,
  selectedSlots,
  slotDetails,
  weekStart,
  onLoginWithVipps,
  onLoginAsEmployee,
  onLoginWithFlowContext,
  onConfirmBooking: _onConfirmBooking,
  onClearError: _onClearError,
  bookingAccountType,
  selectedOrganizationId,
  onAccountTypeSelect,
  onConfirmAccountType: _onConfirmAccountType,
  organizations = [],
  isAccountTypeConfirmed: _isAccountTypeConfirmed = false,
  displayMode = 'auto',
  rentalObjectId,
  tenantId,
  bookingMode,
  visibility,
  onVisibilityChange,
  onDemoLogin,
  onLogout: _onLogout,
  className,
}: BookingConfirmationStepProps): React.ReactElement {
  // TODO: Inject t() via runtime/props instead of placeholder
  const t = (key: string, params?: any): string => key;

  /**
   * Convert internal slot format to FlowSelectedSlot[]
   */
  const convertSlotsToFlowFormat = React.useCallback((): FlowSelectedSlot[] => {
    const flowSlots: FlowSelectedSlot[] = [];

    selectedSlots.forEach((slotKey) => {
      const parts = slotKey.split('-');
      const dayIdx = parseInt(parts[0] ?? '0', 10);
      const timeStr = parts[1] ?? '00:00';
      const details = slotDetails[slotKey] ?? { duration: 60 };

      // Calculate the actual date from weekStart + dayIdx
      const slotDate = new Date(weekStart);
      slotDate.setDate(weekStart.getDate() + dayIdx);

      // Calculate end time from start time + duration
      const [startH, startM] = timeStr.split(':').map(Number);
      const endMins = (startH ?? 0) * 60 + (startM ?? 0) + details.duration;
      const endH = Math.floor(endMins / 60);
      const endM = endMins % 60;
      const endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

      flowSlots.push({
        date: slotDate.toISOString().split('T')[0] ?? '',
        startTime: timeStr,
        endTime,
      });
    });

    return flowSlots;
  }, [selectedSlots, slotDetails, weekStart]);

  /**
   * Capture current booking state for flow context preservation
   */
  const captureBookingState = React.useCallback((): BookingFlowState => {
    return {
      selectedSlots: convertSlotsToFlowFormat(),
      slotDetails: { ...slotDetails },
      weekStart: weekStart.toISOString(),
      bookingAccountType,
      selectedOrganizationId,
      visibility,
    };
  }, [
    convertSlotsToFlowFormat,
    slotDetails,
    weekStart,
    bookingAccountType,
    selectedOrganizationId,
    visibility,
  ]);

  /**
   * Handle Vipps login with flow context preservation
   */
  const handleLoginWithVipps = React.useCallback(() => {
    if (onLoginWithFlowContext) {
      const bookingState = captureBookingState();
      onLoginWithFlowContext({
        provider: 'vipps',
        bookingState,
        rentalObjectId,
        tenantId,
        bookingMode,
      });
    } else {
      onLoginWithVipps?.();
    }
  }, [
    onLoginWithFlowContext,
    captureBookingState,
    onLoginWithVipps,
    rentalObjectId,
    tenantId,
    bookingMode,
  ]);

  /**
   * Handle BankID/Employee login with flow context preservation
   */
  const handleLoginAsEmployee = React.useCallback(() => {
    if (onLoginWithFlowContext) {
      const bookingState = captureBookingState();
      onLoginWithFlowContext({
        provider: 'idporten',
        bookingState,
        rentalObjectId,
        tenantId,
        bookingMode,
      });
    } else {
      onLoginAsEmployee?.();
    }
  }, [
    onLoginWithFlowContext,
    captureBookingState,
    onLoginAsEmployee,
    rentalObjectId,
    tenantId,
    bookingMode,
  ]);

  // Determine what to show based on displayMode
  const showAccountSelection =
    displayMode === 'login-and-selection'
      ? false
      : displayMode === 'confirmation-only'
        ? false
        : isAuthenticated && !bookingAccountType;

  const showBookingConfirmation =
    displayMode === 'confirmation-only'
      ? true
      : displayMode === 'login-and-selection'
        ? false
        : isAuthenticated &&
          bookingAccountType &&
          (bookingAccountType === 'private' || selectedOrganizationId);

  // If not authenticated, always show login
  if (!isAuthenticated) {
    return (
      <Card className={className} data-color="neutral">
        {/* Visual header with icon */}
        <Stack gap="var(--ds-spacing-6)" style={{ alignItems: 'center', textAlign: 'center' }}>
          <Stack gap="var(--ds-spacing-4)" style={{ alignItems: 'center' }}>
            <div
              className="ds-login-icon"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--ds-border-radius-full)',
                background:
                  'linear-gradient(135deg, var(--ds-color-accent-surface-default) 0%, var(--ds-color-accent-surface-hover) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ds-color-accent-base-default)',
              }}
            >
              <UserCheckIcon size={28} />
            </div>
            <Heading level={3} data-size="md">
              {t('booking.loginToComplete')}
            </Heading>
            <Paragraph data-size="sm" data-color="subtle">
              {t('booking.loginToSendRequest')}
            </Paragraph>
          </Stack>

          {/* Login Buttons */}
          <Stack
            gap="var(--ds-spacing-3)"
            style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}
          >
            {/* Vipps Button */}
            <Button
              type="button"
              variant="primary"
              data-size="lg"
              data-color="accent"
              onClick={handleLoginWithVipps}
              disabled={isLoggingIn}
              style={{
                width: '100%',
                backgroundColor: '#ff5b24',
                color: 'white',
                fontWeight: 'var(--ds-font-weight-semibold)',
                boxShadow: '0 2px 8px rgba(255, 91, 36, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              {isLoggingIn ? t('auth.loggingIn') : t('auth.loginWithVipps')}
            </Button>

            {/* Divider */}
            <Divider>{t('common.or')}</Divider>

            {/* BankID Button */}
            <Button
              type="button"
              variant="secondary"
              data-size="lg"
              onClick={handleLoginAsEmployee}
              disabled={isLoggingIn}
              style={{ width: '100%' }}
            >
              {isLoggingIn ? t('auth.loggingIn') : t('auth.loginWithBankID')}
            </Button>

            {/* Demo Login */}
            {onDemoLogin && (
              <>
                <Divider>{t('auth.demoMode')}</Divider>

                <Button
                  type="button"
                  variant="tertiary"
                  data-size="md"
                  onClick={onDemoLogin}
                  disabled={isLoggingIn}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--ds-color-warning-surface-default)',
                    color: 'var(--ds-color-warning-text-default)',
                    border: '1px dashed var(--ds-color-warning-border-default)',
                  }}
                >
                  [TEST] {t('auth.demoLoginButton')}
                </Button>
              </>
            )}
          </Stack>

          {/* Security badges */}
          <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-6)' }}>
            <Stack
              direction="horizontal"
              gap="var(--ds-spacing-3)"
              style={{ alignItems: 'flex-start' }}
            >
              <div
                className="ds-icon-container"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--ds-border-radius-md)',
                  backgroundColor: 'var(--ds-color-success-surface-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--ds-color-success-base-default)',
                }}
              >
                <ShieldIcon size={18} />
              </div>
              <Stack gap="var(--ds-spacing-1)">
                <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                  {t('booking.security.title')}
                </Paragraph>
                <Paragraph data-size="xs" data-color="subtle">
                  {t('booking.security.description')}
                </Paragraph>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Card>
    );
  }

  // If authenticated, show account selection or confirmation
  return (
    <div className={className} style={{ padding: 'var(--ds-spacing-6)' }}>
      {showAccountSelection ? (
        /* Account Selection - Choose Private or Organization */
        <>
          <Heading
            level={3}
            data-size="md"
            style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)' }}
          >
            {t('booking.howWouldYouLikeToBook')}
          </Heading>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('booking.choosePrivateOrOrganization')}
          </Paragraph>

          {/* Account Type Selection */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-3)',
              marginBottom: 'var(--ds-spacing-6)',
            }}
          >
            {/* Private Booking Option */}
            <button
              type="button"
              onClick={() => onAccountTypeSelect?.('private')}
              style={{
                padding: 'var(--ds-spacing-4)',
                borderRadius: 'var(--ds-border-radius-lg)',
                border: '2px solid var(--ds-color-accent-border-default)',
                backgroundColor: 'var(--ds-color-accent-surface-tinted)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--ds-border-radius-md)',
                    backgroundColor: 'var(--ds-color-accent-base-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ds-color-accent-base-contrast-default)',
                    flexShrink: 0,
                  }}
                >
                  <UserIcon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <Paragraph
                    data-size="md"
                    style={{
                      margin: 0,
                      fontWeight: 'var(--ds-font-weight-semibold)',
                      color: 'var(--ds-color-neutral-text-default)',
                    }}
                  >
                    {t('booking.asPrivatePerson')}
                  </Paragraph>
                  <Paragraph
                    data-size="sm"
                    style={{
                      margin: 0,
                      marginTop: 'var(--ds-spacing-1)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {t('booking.bookForYourself')}
                  </Paragraph>
                </div>
              </div>
            </button>

            {/* Organization Booking Option */}
            <button
              type="button"
              onClick={() => onAccountTypeSelect?.('organization')}
              style={{
                padding: 'var(--ds-spacing-4)',
                borderRadius: 'var(--ds-border-radius-lg)',
                border: '2px solid var(--ds-color-neutral-border-default)',
                backgroundColor: 'var(--ds-color-neutral-background-default)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--ds-border-radius-md)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ds-color-neutral-text-default)',
                    flexShrink: 0,
                  }}
                >
                  <BuildingIcon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <Paragraph
                    data-size="md"
                    style={{
                      margin: 0,
                      fontWeight: 'var(--ds-font-weight-semibold)',
                      color: 'var(--ds-color-neutral-text-default)',
                    }}
                  >
                    {t('booking.onBehalfOfOrganization')}
                  </Paragraph>
                  <Paragraph
                    data-size="sm"
                    style={{
                      margin: 0,
                      marginTop: 'var(--ds-spacing-1)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {t('booking.bookForOrganization')}
                  </Paragraph>
                </div>
              </div>
            </button>
          </div>

          {/* Organization Selection (shown when organization is selected) */}
          {bookingAccountType === 'organization' && (
            <div style={{ marginTop: 'var(--ds-spacing-6)' }}>
              <Heading
                level={4}
                data-size="sm"
                style={{ margin: 0, marginBottom: 'var(--ds-spacing-3)' }}
              >
                {t('booking.selectOrganization')}
              </Heading>
              {organizations.length === 0 ? (
                <div
                  style={{
                    padding: 'var(--ds-spacing-4)',
                    backgroundColor: 'var(--ds-color-info-surface-subtle)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    border: '1px solid var(--ds-color-info-border-subtle)',
                  }}
                >
                  <Paragraph
                    data-size="sm"
                    style={{ margin: 0, color: 'var(--ds-color-info-text-default)' }}
                  >
                    {t('booking.notAssociatedWithOrganizations')}
                  </Paragraph>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--ds-spacing-2)',
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  {organizations.map((org) => (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => onAccountTypeSelect?.('organization', org.id)}
                      style={{
                        padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
                        borderRadius: 'var(--ds-border-radius-md)',
                        border:
                          selectedOrganizationId === org.id
                            ? '2px solid var(--ds-color-accent-base-default)'
                            : '1px solid var(--ds-color-neutral-border-default)',
                        backgroundColor:
                          selectedOrganizationId === org.id
                            ? 'var(--ds-color-accent-surface-tinted)'
                            : 'var(--ds-color-neutral-background-default)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 150ms ease',
                      }}
                    >
                      <Paragraph
                        data-size="sm"
                        style={{
                          margin: 0,
                          fontWeight: 'var(--ds-font-weight-medium)',
                          color: 'var(--ds-color-neutral-text-default)',
                        }}
                      >
                        {org.name}
                      </Paragraph>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : showBookingConfirmation ? (
        /* Confirmation Step - Account Type + Visibility */
        <>
          {/* Account Type Toggle */}
          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginBottom: 'var(--ds-spacing-2)',
                fontWeight: 'var(--ds-font-weight-medium)',
              }}
            >
              {t('booking.howWouldYouLikeToBook')}
            </Paragraph>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
              <button
                type="button"
                onClick={() => onAccountTypeSelect?.('private')}
                style={{
                  flex: 1,
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: `2px solid ${bookingAccountType === 'private' ? 'var(--ds-color-accent-border-default)' : 'var(--ds-color-neutral-border-default)'}`,
                  backgroundColor:
                    bookingAccountType === 'private'
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'var(--ds-color-neutral-background-default)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--ds-spacing-2)',
                  transition: 'all 150ms ease',
                }}
              >
                <UserIcon size={16} />
                <span
                  style={{
                    fontSize: 'var(--ds-font-size-sm)',
                    fontWeight:
                      bookingAccountType === 'private'
                        ? 'var(--ds-font-weight-semibold)'
                        : 'normal',
                  }}
                >
                  {t('booking.asPrivatePerson')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onAccountTypeSelect?.('organization')}
                style={{
                  flex: 1,
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: `2px solid ${bookingAccountType === 'organization' ? 'var(--ds-color-accent-border-default)' : 'var(--ds-color-neutral-border-default)'}`,
                  backgroundColor:
                    bookingAccountType === 'organization'
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'var(--ds-color-neutral-background-default)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--ds-spacing-2)',
                  transition: 'all 150ms ease',
                }}
              >
                <BuildingIcon size={16} />
                <span
                  style={{
                    fontSize: 'var(--ds-font-size-sm)',
                    fontWeight:
                      bookingAccountType === 'organization'
                        ? 'var(--ds-font-weight-semibold)'
                        : 'normal',
                  }}
                >
                  {t('booking.onBehalfOfOrganization')}
                </span>
              </button>
            </div>
            {/* Organization selector if organization is selected */}
            {bookingAccountType === 'organization' && organizations.length > 0 && (
              <div style={{ marginTop: 'var(--ds-spacing-3)' }}>
                <NativeSelect
                  value={selectedOrganizationId || ''}
                  onChange={(e) =>
                    onAccountTypeSelect?.('organization', e.target.value || undefined)
                  }
                  style={{
                    width: '100%',
                    padding: 'var(--ds-spacing-3)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    backgroundColor: 'var(--ds-color-neutral-background-default)',
                    fontSize: 'var(--ds-font-size-sm)',
                  }}
                >
                  <option value="">{t('booking.selectOrganization')}</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            )}
          </div>

          {/* Calendar Visibility Selection (GDPR Compliance) */}
          <BookingVisibilitySelector
            value={visibility ?? 'PUBLIC_TITLE'}
            onChange={onVisibilityChange ?? (() => {})}
          />

          {/* Error Display */}
          {bookingError && (
            <div
              style={{
                padding: 'var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-danger-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                marginTop: 'var(--ds-spacing-4)',
              }}
            >
              <Paragraph
                data-size="sm"
                style={{ margin: 0, color: 'var(--ds-color-danger-text-default)' }}
              >
                {bookingError}
              </Paragraph>
            </div>
          )}
        </>
      ) : isAuthenticated ? (
        /* Fallback: Show account selection */
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={3}
            data-size="md"
            style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)' }}
          >
            {t('booking.howWouldYouLikeToBook')}
          </Heading>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('booking.choosePrivateOrOrganization')}
          </Paragraph>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <button
              type="button"
              onClick={() => onAccountTypeSelect?.('private')}
              style={{
                padding: 'var(--ds-spacing-4)',
                borderRadius: 'var(--ds-border-radius-lg)',
                border: '2px solid var(--ds-color-accent-border-default)',
                backgroundColor: 'var(--ds-color-accent-surface-tinted)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Paragraph
                data-size="md"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
              >
                {t('booking.asPrivatePerson')}
              </Paragraph>
            </button>
            <button
              type="button"
              onClick={() => onAccountTypeSelect?.('organization')}
              style={{
                padding: 'var(--ds-spacing-4)',
                borderRadius: 'var(--ds-border-radius-lg)',
                border: '2px solid var(--ds-color-neutral-border-default)',
                backgroundColor: 'var(--ds-color-neutral-background-default)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Paragraph
                data-size="md"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
              >
                {t('booking.onBehalfOfOrganization')}
              </Paragraph>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
