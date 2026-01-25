/**
 * ExternalImportInput Component
 *
 * Input for external booking system URL import.
 * Validates URLs and provides preview of import source.
 *
 * @example
 * ```tsx
 * import { ExternalImportInput } from '@xala-technologies/platform/ui';
 *
 * <ExternalImportInput
 *   value={url}
 *   onChange={setUrl}
 *   onValidate={handleValidate}
 * />
 * ```
 */

import * as React from 'react';
import { Button, Textfield, Fieldset, Paragraph, Alert } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type ImportStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export interface ImportSource {
    /** Source system name */
    name: string;
    /** Source system URL */
    url: string;
    /** Number of events/items to import */
    itemCount?: number;
    /** Description of what will be imported */
    description?: string;
}

export interface ExternalImportInputLabels {
    /** Field label */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Placeholder */
    placeholder?: string;
    /** Button labels */
    validate?: string;
    validating?: string;
    import?: string;
    /** Status messages */
    validUrl?: string;
    invalidUrl?: string;
    /** Preview labels */
    previewTitle?: string;
    itemsToImport?: string;
}

export interface ExternalImportInputProps {
    /** Current URL value */
    value: string;
    /** Change handler */
    onChange: (value: string) => void;
    /** Validation handler - should return import source info or null */
    onValidate?: (url: string) => Promise<ImportSource | null>;
    /** Import handler */
    onImport?: (source: ImportSource) => void;
    /** Current status */
    status?: ImportStatus;
    /** Validation error message */
    error?: string;
    /** Validated import source */
    importSource?: ImportSource | null;
    /** Disabled state */
    disabled?: boolean;
    /** Supported URL patterns (for validation hint) */
    supportedPatterns?: string[];
    /** Localization labels */
    labels?: ExternalImportInputLabels;
    /** Additional className */
    className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<ExternalImportInputLabels> = {
    label: 'Ekstern URL',
    helperText: 'Lim inn URL fra eksternt bookingsystem',
    placeholder: 'https://...',
    validate: 'Valider',
    validating: 'Validerer...',
    import: 'Importer',
    validUrl: 'URL validert',
    invalidUrl: 'Ugyldig URL',
    previewTitle: 'Importforhåndsvisning',
    itemsToImport: 'elementer å importere',
};

// =============================================================================
// Icons
// =============================================================================

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="8" cy="8" r="6" />
        <path d="M5.5 8l1.5 1.5 3-3" />
    </svg>
);

const AlertCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 5v3m0 2v.5" />
    </svg>
);

const LoadingSpinner = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        style={{ animation: 'spin 1s linear infinite' }}
    >
        <circle cx="8" cy="8" r="6" opacity="0.25" />
        <path d="M14 8a6 6 0 0 0-6-6" />
    </svg>
);

// =============================================================================
// Component
// =============================================================================

/**
 * ExternalImportInput provides URL input with validation for external imports.
 *
 * Accessibility:
 * - Labeled input
 * - Status conveyed via icon + text
 * - Error messages linked
 */
export function ExternalImportInput({
    value,
    onChange,
    onValidate,
    onImport,
    status = 'idle',
    error,
    importSource,
    disabled = false,
    supportedPatterns,
    labels: customLabels,
    className,
}: ExternalImportInputProps): React.ReactElement {
    const labels = { ...defaultLabels, ...customLabels };
    const [localStatus, setLocalStatus] = React.useState<ImportStatus>(status);
    const [localSource, setLocalSource] = React.useState<ImportSource | null>(importSource || null);
    const [localError, setLocalError] = React.useState<string | undefined>(error);

    const effectiveStatus = status !== 'idle' ? status : localStatus;
    const effectiveSource = importSource !== undefined ? importSource : localSource;
    const effectiveError = error !== undefined ? error : localError;

    const handleValidate = async () => {
        if (!onValidate || !value.trim()) return;

        setLocalStatus('validating');
        setLocalError(undefined);

        try {
            const source = await onValidate(value);
            if (source) {
                setLocalSource(source);
                setLocalStatus('valid');
            } else {
                setLocalSource(null);
                setLocalStatus('invalid');
                setLocalError(labels.invalidUrl);
            }
        } catch (err) {
            setLocalSource(null);
            setLocalStatus('invalid');
            setLocalError(err instanceof Error ? err.message : labels.invalidUrl);
        }
    };

    const handleImport = () => {
        if (onImport && effectiveSource) {
            onImport(effectiveSource);
        }
    };

    const inputId = React.useId();
    const errorId = effectiveError ? `${inputId}-error` : undefined;

    const getStatusIcon = () => {
        switch (effectiveStatus) {
            case 'validating':
                return <LoadingSpinner />;
            case 'valid':
                return <CheckCircleIcon />;
            case 'invalid':
                return <AlertCircleIcon />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (effectiveStatus) {
            case 'valid':
                return 'var(--ds-color-success-text-default)';
            case 'invalid':
                return 'var(--ds-color-danger-text-default)';
            default:
                return 'var(--ds-color-neutral-text-subtle)';
        }
    };

    return (
        <Fieldset className={cn('external-import-input', className)}>
            <Fieldset.Legend>{labels.label}</Fieldset.Legend>
            <Fieldset.Description>{labels.helperText}</Fieldset.Description>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--ds-spacing-3)',
                    marginTop: 'var(--ds-spacing-2)',
                }}
            >
                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <Textfield
                            id={inputId}
                            aria-label={labels.label}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={labels.placeholder}
                            disabled={disabled || effectiveStatus === 'validating'}
                            aria-describedby={errorId}
                            data-size="sm"
                        />
                    </div>

                    <Button
                        variant="secondary"
                        data-size="sm"
                        onClick={handleValidate}
                        disabled={disabled || !value.trim() || effectiveStatus === 'validating'}
                    >
                        {effectiveStatus === 'validating' ? labels.validating : labels.validate}
                    </Button>
                </div>

                {/* Status indicator */}
                {effectiveStatus !== 'idle' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                        <span style={{ color: getStatusColor(), display: 'flex' }}>{getStatusIcon()}</span>
                        <Paragraph data-size="sm" style={{ margin: 0, color: getStatusColor() }}>
                            {effectiveStatus === 'validating' && labels.validating}
                            {effectiveStatus === 'valid' && labels.validUrl}
                            {effectiveStatus === 'invalid' && (effectiveError || labels.invalidUrl)}
                        </Paragraph>
                    </div>
                )}

                {/* Error message */}
                {effectiveError && effectiveStatus !== 'invalid' && (
                    <Alert data-size="sm" data-color="danger" id={errorId}>
                        {effectiveError}
                    </Alert>
                )}

                {/* Import preview */}
                {effectiveStatus === 'valid' && effectiveSource && (
                    <div
                        style={{
                            padding: 'var(--ds-spacing-3)',
                            backgroundColor: 'var(--ds-color-success-surface-default)',
                            borderRadius: 'var(--ds-border-radius-md)',
                            border: '1px solid var(--ds-color-success-border-subtle)',
                        }}
                    >
                        <Paragraph
                            data-size="xs"
                            style={{
                                margin: '0 0 var(--ds-spacing-2)',
                                fontWeight: 'var(--ds-font-weight-medium)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--ds-color-success-text-default)',
                            }}
                        >
                            {labels.previewTitle}
                        </Paragraph>

                        <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                            {effectiveSource.name}
                        </Paragraph>

                        {effectiveSource.description && (
                            <Paragraph data-size="sm" style={{ margin: 'var(--ds-spacing-1) 0 0', color: 'var(--ds-color-neutral-text-subtle)' }}>
                                {effectiveSource.description}
                            </Paragraph>
                        )}

                        {effectiveSource.itemCount !== undefined && (
                            <Paragraph data-size="sm" style={{ margin: 'var(--ds-spacing-2) 0 0' }}>
                                {effectiveSource.itemCount} {labels.itemsToImport}
                            </Paragraph>
                        )}

                        {onImport && (
                            <Button
                                variant="primary"
                                data-size="sm"
                                data-color="success"
                                onClick={handleImport}
                                disabled={disabled}
                                style={{ marginTop: 'var(--ds-spacing-3)' }}
                            >
                                {labels.import}
                            </Button>
                        )}
                    </div>
                )}

                {/* Supported patterns hint */}
                {supportedPatterns && supportedPatterns.length > 0 && (
                    <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                        Støttede systemer: {supportedPatterns.join(', ')}
                    </Paragraph>
                )}
            </div>
        </Fieldset>
    );
}

ExternalImportInput.displayName = 'ExternalImportInput';
