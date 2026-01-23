/**
 * Artifact Validation Panel Component
 * 
 * Displays validation results for an artifact with errors, warnings, and suggested fixes.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import {
    Alert,
    Stack,
    Heading,
    Paragraph,
    List,
    Badge,
    Card,
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
                    <Badge color="success" size="sm">
                        Valid
                    </Badge>
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
                <Badge
                    color={valid && errors.length === 0 ? 'success' : 'danger'}
                    size="md"
                >
                    {valid && errors.length === 0 ? 'Valid' : 'Invalid'}
                </Badge>
                <Heading level={4} data-size="sm" style={{ margin: 0 }}>
                    Validation Results
                </Heading>
            </Stack>

            {/* Errors */}
            {errors.length > 0 && (
                <Alert variant="error">
                    <Alert.Title>Validation Errors ({errors.length})</Alert.Title>
                    <Alert.Description>
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
                    </Alert.Description>
                </Alert>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
                <Alert variant="warning">
                    <Alert.Title>Warnings ({warnings.length})</Alert.Title>
                    <Alert.Description>
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
                    </Alert.Description>
                </Alert>
            )}

            {/* Success Message */}
            {valid && errors.length === 0 && warnings.length === 0 && (
                <Alert variant="success">
                    <Alert.Title>Validation Passed</Alert.Title>
                    <Alert.Description>
                        All validation checks passed successfully.
                    </Alert.Description>
                </Alert>
            )}
        </Stack>
    );
}
