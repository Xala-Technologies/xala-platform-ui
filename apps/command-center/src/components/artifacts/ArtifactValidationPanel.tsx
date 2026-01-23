/**
 * Artifact Validation Panel Component
 * 
 * Displays validation results for an artifact with errors, warnings, and suggested fixes.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import {
    Stack,
    Heading,
    Paragraph,
    Card,
    Tag,
} from '@xala-technologies/platform-ui';
import { ValidationResult } from '../../registry/types';

export interface ArtifactValidationPanelProps {
    validationResult: ValidationResult;
    'data-testid'?: string;
}

export function ArtifactValidationPanel({
    validationResult,
    'data-testid': testId,
}: ArtifactValidationPanelProps) {
    const { valid, errors, warnings } = validationResult;

    if (valid && errors.length === 0 && warnings.length === 0) {
        return (
            <Card
                style={{
                    padding: 'var(--ds-spacing-4)',
                    backgroundColor: 'var(--ds-color-success-surface-subtle)',
                    border: '1px solid var(--ds-color-success-border-default)',
                }}
                data-testid={testId}
            >
                <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                    <Tag data-color="success" data-size="sm">
                        Valid
                    </Tag>
                    <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                        Artifact validation passed
                    </Paragraph>
                </Stack>
            </Card>
        );
    }

    return (
        <Stack spacing="var(--ds-spacing-4)" data-testid={testId}>
            {/* Validation Status Badge */}
            <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                <Tag
                    data-color={valid && errors.length === 0 ? 'success' : 'danger'}
                    data-size="md"
                >
                    {valid && errors.length === 0 ? 'Valid' : 'Invalid'}
                </Tag>
                <Heading level={4} data-size="sm" style={{ margin: 0 }}>
                    Validation Results
                </Heading>
            </Stack>

            {/* Errors */}
            {errors.length > 0 && (
                <Card
                    style={{
                        padding: 'var(--ds-spacing-4)',
                        backgroundColor: 'var(--ds-color-danger-surface-subtle)',
                        border: '1px solid var(--ds-color-danger-border-default)',
                    }}
                >
                    <Stack spacing="var(--ds-spacing-3)">
                        <Heading level={3} data-size="xs" style={{ margin: 0 }}>
                            Validation Errors ({errors.length})
                        </Heading>
                        <Stack spacing="var(--ds-spacing-2)">
                            {errors.map((error, index) => (
                                <Card
                                    key={index}
                                    style={{
                                        padding: 'var(--ds-spacing-3)',
                                        backgroundColor: 'var(--ds-color-danger-surface-subtle)',
                                        border: '1px solid var(--ds-color-danger-border-default)',
                                    }}
                                >
                                    <Stack spacing="var(--ds-spacing-2)">
                                        <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                                            {error.path}: {error.message}
                                        </Paragraph>
                                        {error.code && (
                                            <Paragraph
                                                data-size="xs"
                                                style={{
                                                    margin: 0,
                                                    color: 'var(--ds-color-neutral-text-subtle)',
                                                    fontFamily: 'var(--ds-font-family-monospace)',
                                                }}
                                            >
                                                Code: {error.code}
                                            </Paragraph>
                                        )}
                                        {error.suggestedFix && (
                                            <Card
                                                style={{
                                                    padding: 'var(--ds-spacing-2)',
                                                    marginTop: 'var(--ds-spacing-1)',
                                                    backgroundColor: 'var(--ds-color-info-surface-subtle)',
                                                    border: '1px solid var(--ds-color-info-border-default)',
                                                }}
                                            >
                                                <Stack spacing="var(--ds-spacing-1)">
                                                    <Paragraph
                                                        data-size="xs"
                                                        style={{
                                                            margin: 0,
                                                            fontWeight: 'var(--ds-font-weight-medium)',
                                                        }}
                                                    >
                                                        💡 Suggested Fix:
                                                    </Paragraph>
                                                    <Paragraph data-size="xs" style={{ margin: 0 }}>
                                                        {error.suggestedFix}
                                                    </Paragraph>
                                                </Stack>
                                            </Card>
                                        )}
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    </Stack>
                </Card>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
                <Card
                    style={{
                        padding: 'var(--ds-spacing-4)',
                        backgroundColor: 'var(--ds-color-warning-surface-subtle)',
                        border: '1px solid var(--ds-color-warning-border-default)',
                    }}
                >
                    <Stack spacing="var(--ds-spacing-3)">
                        <Heading level={3} data-size="xs" style={{ margin: 0 }}>
                            Warnings ({warnings.length})
                        </Heading>
                        <Stack spacing="var(--ds-spacing-2)">
                            {warnings.map((warning, index) => (
                                <Card
                                    key={index}
                                    style={{
                                        padding: 'var(--ds-spacing-3)',
                                        backgroundColor: 'var(--ds-color-warning-surface-subtle)',
                                        border: '1px solid var(--ds-color-warning-border-default)',
                                    }}
                                >
                                    <Stack spacing="var(--ds-spacing-2)">
                                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                                            {warning.path}: {warning.message}
                                        </Paragraph>
                                        {warning.code && (
                                            <Paragraph
                                                data-size="xs"
                                                style={{
                                                    margin: 0,
                                                    color: 'var(--ds-color-neutral-text-subtle)',
                                                    fontFamily: 'var(--ds-font-family-monospace)',
                                                }}
                                            >
                                                Code: {warning.code}
                                            </Paragraph>
                                        )}
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    </Stack>
                </Card>
            )}

            {/* Success Message */}
            {valid && errors.length === 0 && warnings.length === 0 && (
                <Card
                    style={{
                        padding: 'var(--ds-spacing-4)',
                        backgroundColor: 'var(--ds-color-success-surface-subtle)',
                        border: '1px solid var(--ds-color-success-border-default)',
                    }}
                >
                    <Stack spacing="var(--ds-spacing-2)">
                        <Heading level={3} data-size="xs" style={{ margin: 0 }}>
                            Validation Passed
                        </Heading>
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                            All validation checks passed successfully.
                        </Paragraph>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}
