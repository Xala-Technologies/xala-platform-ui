/**
 * Composition Preview Component
 * 
 * Renders a preview of a UI composition from COMPOSE_*.json.
 * If component doesn't exist, shows a placeholder with required contract.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import {
    Card,
    Stack,
    Heading,
    Paragraph,
    Tag,
    Button,
    Alert,
    CodeBlock,
    PreviewArea,
} from '@xala-technologies/platform-ui';
import { TESTIDS } from '../../constants/testids';

export interface CompositionPreviewProps {
    componentName: string;
    composeData?: Record<string, any>;
    'data-testid'?: string;
}

export function CompositionPreview({
    componentName,
    composeData,
    'data-testid': testId,
}: CompositionPreviewProps) {
    // Check if component exists (mock check - in real implementation, would check platform-ui exports)
    const componentExists = false; // Would check: import { componentName } from '@xala-technologies/platform-ui'

    if (componentExists) {
        // In real implementation, would dynamically import and render the component
        return (
            <Card
                style={{
                    padding: 'var(--ds-spacing-4)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                }}
                data-testid={testId || TESTIDS.preview.root}
            >
                <PreviewArea>
                    {/* Component would be rendered here */}
                    <Stack align="center" justify="center" style={{ minHeight: '200px' }}>
                        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                            Component preview would render here
                        </Paragraph>
                    </Stack>
                </PreviewArea>
            </Card>
        );
    }

    // Show placeholder with component contract
    return (
        <Card
            style={{
                padding: 'var(--ds-spacing-4)',
                border: '1px solid var(--ds-color-neutral-border-default)',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
            }}
            data-testid={testId || TESTIDS.preview.root}
        >
            <Stack spacing="var(--ds-spacing-4)">
                <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                    <Tag data-color="warning" data-size="sm">
                        Component Not Found
                    </Tag>
                    <Heading level={3} data-size="md" style={{ margin: 0 }}>
                        {componentName}
                    </Heading>
                </Stack>

                <Alert data-color="info">
                    <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                        Component Placeholder
                    </Heading>
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                        This component doesn't exist yet. Once promoted, it will be available for preview.
                    </Paragraph>
                </Alert>

                {composeData && (
                    <Stack spacing="var(--ds-spacing-3)">
                        <Heading level={4} data-size="sm">Required Component Contract</Heading>

                        {/* Props */}
                        {composeData.props && (
                            <div>
                                <Paragraph
                                    data-size="sm"
                                    style={{
                                        fontWeight: 'var(--ds-font-weight-medium)',
                                        marginBottom: 'var(--ds-spacing-2)',
                                    }}
                                >
                                    Props:
                                </Paragraph>
                                <CodeBlock
                                    code={JSON.stringify(composeData.props, null, 2)}
                                    language="json"
                                    maxHeight="200px"
                                />
                            </div>
                        )}

                        {/* Description */}
                        {composeData.description && (
                            <div>
                                <Paragraph
                                    data-size="sm"
                                    style={{
                                        fontWeight: 'var(--ds-font-weight-medium)',
                                        marginBottom: 'var(--ds-spacing-2)',
                                    }}
                                >
                                    Description:
                                </Paragraph>
                                <Paragraph data-size="sm" style={{ margin: 0 }}>
                                    {composeData.description}
                                </Paragraph>
                            </div>
                        )}

                        {/* Layer */}
                        {composeData.layer && (
                            <div>
                                <Paragraph
                                    data-size="sm"
                                    style={{
                                        fontWeight: 'var(--ds-font-weight-medium)',
                                        marginBottom: 'var(--ds-spacing-2)',
                                    }}
                                >
                                    Layer:
                                </Paragraph>
                                <Tag data-color="neutral" data-size="sm">
                                    {composeData.layer}
                                </Tag>
                            </div>
                        )}
                    </Stack>
                )}

                <Button
                    data-color="neutral"
                    data-size="sm"
                    onClick={() => {
                        // In real implementation, would navigate to promotion flow
                        alert('Navigate to promotion flow to create this component');
                    }}
                    data-testid={TESTIDS.preview.renderBtn}
                >
                    Promote to Create Component
                </Button>
            </Stack>
        </Card>
    );
}
