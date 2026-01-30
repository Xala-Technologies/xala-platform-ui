/**
 * ConsentPreferences
 *
 * Component for managing granular consent preferences.
 * Domain-agnostic - receives all data and callbacks via props.
 *
 * @example
 * ```tsx
 * // In app with SDK hooks
 * function ConsentPreferencesModal() {
 *   const { data: consentsData } = useConsents();
 *   const updateConsents = useUpdateConsents();
 *
 *   const [consents, setConsents] = useState({
 *     marketing: false,
 *     analytics: false,
 *     thirdPartySharing: false,
 *   });
 *
 *   return (
 *     <ConsentPreferences
 *       consents={consents}
 *       onConsentChange={(key, value) => setConsents({ ...consents, [key]: value })}
 *       onSave={async () => {
 *         await updateConsents.mutateAsync(consents);
 *       }}
 *       isSaving={updateConsents.isPending}
 *       isError={updateConsents.isError}
 *       isSuccess={updateConsents.isSuccess}
 *       consentOptions={consentOptions}
 *       labels={labels}
 *     />
 *   );
 * }
 * ```
 */

import React, { useState, useEffect } from 'react';
import { Card, Heading, Paragraph, Button, Switch, Alert } from '@digdir/designsystemet-react';
import { Stack } from '../../primitives/stack';

// =============================================================================
// Types
// =============================================================================

export interface ConsentOption {
  key: string;
  label: string;
  description: string;
  required?: boolean;
}

export interface ConsentPreferencesLabels {
  title: string;
  description: string;
  saveButton: string;
  savingButton: string;
  cancelButton: string;
  successMessage: string;
  errorMessage: string;
  requiredLabel: string;
  optionalLabel: string;
}

export interface ConsentPreferencesProps {
  /** Current consent values */
  consents: Record<string, boolean>;
  /** Callback when a consent value changes */
  onConsentChange: (key: string, value: boolean) => void;
  /** Callback to save consents */
  onSave: () => void | Promise<void>;
  /** Optional callback to cancel/close */
  onCancel?: () => void;
  /** Whether consents are being saved */
  isSaving?: boolean;
  /** Whether there was an error saving */
  isError?: boolean;
  /** Whether save was successful */
  isSuccess?: boolean;
  /** Consent options to display */
  consentOptions: ConsentOption[];
  /** Labels for i18n */
  labels?: ConsentPreferencesLabels;
  /** Whether to show the success message */
  showSuccess?: boolean;
  /** Whether to show the error message */
  showError?: boolean;
}

// =============================================================================
// Default Labels
// =============================================================================

export const DEFAULT_CONSENT_PREFERENCES_LABELS: ConsentPreferencesLabels = {
  title: 'Samtykkepreferanser',
  description: 'Velg hvilke samtykker du ønsker å gi. Du kan når som helst endre disse.',
  saveButton: 'Lagre preferanser',
  savingButton: 'Lagrer...',
  cancelButton: 'Avbryt',
  successMessage: 'Samtykkepreferanser lagret',
  errorMessage: 'Det oppstod en feil. Vennligst prøv igjen.',
  requiredLabel: 'Påkrevd',
  optionalLabel: 'Valgfritt',
};

// =============================================================================
// Default Consent Options
// =============================================================================

export const DEFAULT_CONSENT_OPTIONS: ConsentOption[] = [
  {
    key: 'necessary',
    label: 'Nødvendige cookies',
    description: 'Nødvendig for at tjenesten skal fungere. Kan ikke deaktiveres.',
    required: true,
  },
  {
    key: 'analytics',
    label: 'Analyse og statistikk',
    description: 'Tillat anonymisert analyse av bruksmønstre for å forbedre tjenesten.',
    required: false,
  },
  {
    key: 'marketing',
    label: 'Markedsføring',
    description: 'Motta nyheter, tilbud og oppdateringer fra oss.',
    required: false,
  },
  {
    key: 'thirdPartySharing',
    label: 'Deling med tredjeparter',
    description: 'Tillat at dine data deles med partnere for utvidet funksjonalitet.',
    required: false,
  },
];

// =============================================================================
// Component
// =============================================================================

const MOBILE_BREAKPOINT = 768;

export function ConsentPreferences({
  consents,
  onConsentChange,
  onSave,
  onCancel,
  isSaving = false,
  isError = false,
  isSuccess = false,
  consentOptions = DEFAULT_CONSENT_OPTIONS,
  labels = DEFAULT_CONSENT_PREFERENCES_LABELS,
  showSuccess = true,
  showError = true,
}: ConsentPreferencesProps): React.ReactElement {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = (key: string, checked: boolean) => {
    onConsentChange(key, checked);
  };

  const handleSave = async () => {
    await onSave();
  };

  return (
    <Card style={{ padding: 'var(--ds-spacing-5)' }}>
      <Stack direction="vertical" spacing="var(--ds-spacing-4)">
        {/* Header */}
        <Stack direction="vertical">
          <Heading
            level={2}
            data-size="sm"
            style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)' }}
          >
            {labels.title}
          </Heading>
          <Paragraph
            data-size="sm"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {labels.description}
          </Paragraph>
        </Stack>

        {/* Success/Error Messages */}
        {showSuccess && isSuccess && (
          <Alert data-color="success" data-size="sm">
            {labels.successMessage}
          </Alert>
        )}

        {showError && isError && (
          <Alert data-color="danger" data-size="sm">
            {labels.errorMessage}
          </Alert>
        )}

        {/* Consent Options */}
        <Stack direction="vertical" spacing="var(--ds-spacing-3)">
          {consentOptions.map((option) => {
            const isChecked = option.required ? true : (consents[option.key] ?? false);
            const isDisabled = option.required || isSaving;

            return (
              <Card
                key={option.key}
                data-color="neutral"
                style={{
                  padding: 'var(--ds-spacing-4)',
                  opacity: isDisabled && !option.required ? 0.6 : 1,
                }}
              >
                <Stack
                  direction={isMobile ? 'vertical' : 'horizontal'}
                  spacing="var(--ds-spacing-3)"
                  justify="space-between"
                  align={isMobile ? 'flex-start' : 'center'}
                >
                  <Stack direction="vertical" style={{ flex: 1 }}>
                    <Stack
                      direction="horizontal"
                      spacing="var(--ds-spacing-2)"
                      align="center"
                      style={{
                        marginBottom: 'var(--ds-spacing-1)',
                      }}
                    >
                      <Heading level={3} data-size="xs" style={{ margin: 0 }}>
                        {option.label}
                      </Heading>
                      {option.required && (
                        <Paragraph
                          data-size="xs"
                          style={{
                            margin: 0,
                            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                            backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                            borderRadius: 'var(--ds-border-radius-sm)',
                            color: 'var(--ds-color-neutral-text-subtle)',
                          }}
                        >
                          {labels.requiredLabel}
                        </Paragraph>
                      )}
                    </Stack>
                    <Paragraph
                      data-size="sm"
                      style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                    >
                      {option.description}
                    </Paragraph>
                  </Stack>

                  <Switch
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => handleToggle(option.key, e.target.checked)}
                    aria-label={option.label}
                  />
                </Stack>
              </Card>
            );
          })}
        </Stack>

        {/* Actions */}
        <Stack
          direction={isMobile ? 'vertical' : 'horizontal'}
          spacing="var(--ds-spacing-3)"
          justify="flex-end"
          style={{
            paddingTop: 'var(--ds-spacing-2)',
          }}
        >
          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isSaving}
              style={{ width: isMobile ? '100%' : 'auto' }}
            >
              {labels.cancelButton}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            {isSaving ? labels.savingButton : labels.saveButton}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

// Backward compatibility export
export { ConsentPreferences as ConsentSettings };
