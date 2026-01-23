/**
 * Agent Workflow Session Component
 * 
 * Interactive AI-powered workflow session with Q&A stepper.
 * Uses MultiStepFormModal pattern from platform-ui.
 */

import { useState, useEffect } from 'react';
import {
    MultiStepFormModal,
    Stack,
    Heading,
    Paragraph,
    Card,
    Alert,
    Tag,
    Field,
    Label,
    Textarea,
} from '@xala-technologies/platform-ui';
import type { FormStep } from '@xala-technologies/platform-ui/patterns';
import { workflowEngine } from '../../services/workflow-engine';
import { providerRegistry } from '../../lib/ai';
import type {
    WorkflowSession,
    WorkflowStepDefinition,
    GeneratedArtifact,
} from '../../lib/anthropic/types';
import { ArtifactValidationPanel } from '../artifacts/ArtifactValidationPanel';
import { TESTIDS } from '../../constants/testids';

// =============================================================================
// Types
// =============================================================================

export interface AgentWorkflowSessionProps {
    workflowId: string;
    workflowSteps: WorkflowStepDefinition[];
    isOpen: boolean;
    onClose: () => void;
    onComplete?: (session: WorkflowSession) => void;
}

// =============================================================================
// Component
// =============================================================================

export function AgentWorkflowSession({
    workflowId,
    workflowSteps,
    isOpen,
    onClose,
    onComplete,
}: AgentWorkflowSessionProps) {
    const [session, setSession] = useState<WorkflowSession | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [aiResponse, setAiResponse] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [artifacts, setArtifacts] = useState<GeneratedArtifact[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Initialize session when modal opens
    useEffect(() => {
        if (isOpen && !session) {
            const newSession = workflowEngine.createSession(workflowId, workflowSteps);
            setSession(newSession);
            setCurrentStepIndex(0);
            setAiResponse('');
            setUserAnswer('');
            setArtifacts([]);
            setError(null);
        }
    }, [isOpen, workflowId, workflowSteps, session]);

    // Ask AI when step changes
    useEffect(() => {
        if (session && isOpen && currentStepIndex < workflowSteps.length) {
            askAgentForStep();
        }
    }, [session, currentStepIndex, isOpen]);

    /**
     * Ask AI agent for current step
     */
    const askAgentForStep = async () => {
        if (!session) return;

        const step = workflowSteps[currentStepIndex];
        if (!step) return;

        setIsStreaming(true);
        setError(null);
        setAiResponse('');

        try {
            const currentProvider = providerRegistry.getCurrentProvider();
            if (!currentProvider) {
                throw new Error('AI provider not initialized. Please configure your API key in settings.');
            }

            // Stream AI response
            let fullResponse = '';
            for await (const event of currentProvider.createStreamedMessage({
                messages: session.messages
                    .filter(m => m.role !== 'system')
                    .map(m => ({
                        role: m.role as 'user' | 'assistant' | 'system',
                        content: m.content,
                    })),
                system: buildSystemPrompt(step),
            })) {
                if (event.type === 'content_block_delta' && event.data.delta?.text) {
                    fullResponse += event.data.delta.text;
                    setAiResponse(fullResponse);
                }
                if (event.type === 'error') {
                    throw new Error(`AI provider error: ${event.data.error?.message || 'Unknown error'}`);
                }
            }

            // Generate artifacts if this step produces them
            if (step.outputArtifacts && step.outputArtifacts.length > 0) {
                const generatedArtifacts = await workflowEngine.generateArtifacts(
                    session.sessionId,
                    step,
                    fullResponse
                );
                setArtifacts(generatedArtifacts);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to communicate with AI agent');
        } finally {
            setIsStreaming(false);
        }
    };

    /**
     * Submit user answer
     */
    const handleSubmitAnswer = async () => {
        if (!session || !userAnswer.trim()) return;

        const step = workflowSteps[currentStepIndex];
        if (!step) return;

        // Add answer to session
        workflowEngine.addAnswer(session.sessionId, step.id, userAnswer);

        // Update local session
        const updatedSession = workflowEngine.getSession(session.sessionId);
        if (updatedSession) {
            setSession(updatedSession);
        }

        // Clear answer input
        setUserAnswer('');

        // Move to next step or complete
        if (currentStepIndex < workflowSteps.length - 1) {
            workflowEngine.nextStep(session.sessionId);
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            // Complete workflow
            workflowEngine.completeSession(session.sessionId);
            if (onComplete && updatedSession) {
                onComplete(updatedSession);
            }
            onClose();
        }
    };

    /**
     * Build system prompt for step
     */
    const buildSystemPrompt = (step: WorkflowStepDefinition): string => {
        return `You are an AI assistant helping users create UI component specifications for the Xala Platform UI library.

CRITICAL RULES:
1. You MUST ONLY output Xala spec artifacts (SECTION_*.md, COMPOSE_*.json, TESTIDS_*.json, E2E_*.md)
2. You MUST use ONLY components from @xala-technologies/platform-ui (no external UI kits)
3. You MUST follow Designsystemet design tokens (var(--ds-*))
4. You MUST ask questions ONE STEP AT A TIME
5. You MUST NOT invent components - use the inventory provided
6. You MUST validate all outputs against schemas

Current step: ${step.title}
${step.description ? `Step description: ${step.description}` : ''}

Ask a clear, focused question to gather the information needed for this step.`;
    };

    /**
     * Build form steps for MultiStepFormModal
     */
    const buildFormSteps = (): FormStep[] => {
        return workflowSteps.map((step) => ({
            id: step.id,
            title: step.title,
            description: step.description,
            isOptional: false,
            content: (
                <Stack spacing="var(--ds-spacing-4)">
                    {/* AI Question/Response */}
                    {aiResponse && (
                        <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
                            <Stack spacing="var(--ds-spacing-3)">
                                <Heading level={4} data-size="sm">
                                    AI Assistant
                                </Heading>
                                {isStreaming ? (
                                    <Paragraph data-size="sm" style={{ fontStyle: 'italic' }}>
                                        {aiResponse}...
                                    </Paragraph>
                                ) : (
                                    <Paragraph data-size="sm">{aiResponse}</Paragraph>
                                )}
                            </Stack>
                        </Card>
                    )}

                    {/* User Answer Input */}
                    {!isStreaming && aiResponse && (
                        <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
                            <Stack spacing="var(--ds-spacing-3)">
                                <Heading level={4} data-size="sm">
                                    Your Answer
                                </Heading>
                                <Field>
                                    <Label htmlFor={`answer-${step.id}`}>Answer</Label>
                                    <Textarea
                                        id={`answer-${step.id}`}
                                        value={userAnswer}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserAnswer(e.target.value)}
                                        placeholder="Enter your answer..."
                                        rows={4}
                                        data-testid={`${TESTIDS.session.formField}-${step.id}`}
                                    />
                                </Field>
                            </Stack>
                        </Card>
                    )}

                    {/* Generated Artifacts */}
                    {artifacts.length > 0 && (
                        <Stack spacing="var(--ds-spacing-3)">
                            <Heading level={4} data-size="sm">
                                Generated Artifacts
                            </Heading>
                            {artifacts.map((artifact) => (
                                <Card
                                    key={artifact.id}
                                    data-color="neutral"
                                    style={{ padding: 'var(--ds-spacing-3)' }}
                                >
                                    <Stack spacing="var(--ds-spacing-2)">
                                        <Stack direction="horizontal" spacing="var(--ds-spacing-2)" align="center">
                                            <Heading level={5} data-size="xs">
                                                {artifact.name}
                                            </Heading>
                                            <Tag
                                                data-color={artifact.validated ? 'success' : 'warning'}
                                                data-size="sm"
                                            >
                                                {artifact.validated ? 'Valid' : 'Needs Review'}
                                            </Tag>
                                        </Stack>
                                        <pre
                                            style={{
                                                padding: 'var(--ds-spacing-3)',
                                                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                                                borderRadius: 'var(--ds-border-radius-sm)',
                                                overflow: 'auto',
                                                fontSize: 'var(--ds-font-size-sm)',
                                                fontFamily: 'var(--ds-font-family-monospace)',
                                            }}
                                        >
                                            {artifact.content}
                                        </pre>
                                        {artifact.validationErrors && artifact.validationErrors.length > 0 && (
                                            <ArtifactValidationPanel
                                                validationResult={{
                                                    valid: false,
                                                    errors: artifact.validationErrors.map(err => ({
                                                        path: err.path,
                                                        message: err.message,
                                                        code: err.code || '',
                                                        suggestedFix: err.suggestedFix,
                                                    })),
                                                    warnings: [],
                                                    artifactId: artifact.id,
                                                    artifactPath: artifact.path,
                                                    schema: artifact.schema || 'unknown',
                                                }}
                                            />
                                        )}
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    )}

                    {/* Error Display */}
                    {error && (
                        <Alert data-color="danger">
                            <Heading level={4} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                                Error
                            </Heading>
                            <Paragraph data-size="sm">{error}</Paragraph>
                        </Alert>
                    )}
                </Stack>
            ),
        }));
    };

    if (!session) {
        return null;
    }

    const steps = buildFormSteps();

    return (
        <MultiStepFormModal
            open={isOpen}
            title={`Workflow: ${workflowId}`}
            steps={steps}
            currentStep={currentStepIndex}
            labels={{
                back: 'Previous',
                next: 'Continue',
                submit: 'Complete',
                cancel: 'Cancel',
            }}
            isSubmitting={isStreaming}
            canProceed={!isStreaming && !!userAnswer.trim() && currentStepIndex === steps.length - 1}
            onStepChange={setCurrentStepIndex}
            onSubmit={handleSubmitAnswer}
            onClose={onClose}
            size="xl"
        />
    );
}
