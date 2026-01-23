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
    Alert,
    List,
} from '@xala-technologies/platform-ui';
import { ValidationResult } from '../../registry/types';
import { TESTIDS } from '../../constants/testids';

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
                <Alert data-color="danger">
                    <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                        Validation Errors ({errors.length})
                    </Heading>
                    <List>
                        {errors.map((error, index) => (
                            <List.Item key={index}>
                                <Stack spacing="var(--ds-spacing-1)">
                                    <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                                        <strong>{error.path}:</strong> {error.message}
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
                                                marginTop: 'var(--ds-spacing-2)',
                                                backgroundColor: 'var(--ds-color-info-surface-subtle)',
                                                border: '1px solid var(--ds-color-info-border-default)',
                                            }}
                                        >
                                            <Stack direction="horizontal" spacing="var(--ds-spacing-2)">
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
                            </List.Item>
                        ))}
                    </List>
                </Alert>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
                <Alert data-color="warning">
                    <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                        Warnings ({warnings.length})
                    </Heading>
                    <List>
                        {warnings.map((warning, index) => (
                            <List.Item key={index}>
                                <Stack spacing="var(--ds-spacing-1)">
                                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                                        <strong>{warning.path}:</strong> {warning.message}
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
                            </List.Item>
                        ))}
                    </List>
                </Alert>
            )}

            {/* Success Message */}
            {valid && errors.length === 0 && warnings.length === 0 && (
                <Alert data-color="success">
                    <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                        Validation Passed
                    </Heading>
                    <Paragraph>
                        All validation checks passed successfully.
                    </Paragraph>
                </Alert>
            )}
        </Stack>
    );
}
