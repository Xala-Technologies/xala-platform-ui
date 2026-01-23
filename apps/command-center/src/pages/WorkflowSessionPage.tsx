/**
 * Workflow Session Page
 * 
 * Interactive runner for active workflow sessions.
 * Renders dynamic forms based on step schema.
 */

import { useState } from 'react';
import {
    PageContainer,
    DashboardPageHeader,
    SectionCard,
    SectionCardContent,
    WizardStepper,
    Textfield,
    Select,
    Field,
    Label,
    Stack,
    Button,
    Heading,
    Paragraph,
    Container
} from '@xala-technologies/platform-ui';
import { useWorkflowSession } from '../context/WorkflowSessionContext';
import { CommandTerminal } from '../components/commands/CommandTerminal';
import { ArtifactPreview } from '../components/artifacts/ArtifactPreview';

export function WorkflowSessionPage() {
    const {
        session,
        activeWorkflow,
        activeStepIndex,
        nextStep,
        prevStep,
        submitStep,
        addArtifacts,
        cancelSession
    } = useWorkflowSession();

    // Local state for current step form
    const [formData, setFormData] = useState<Record<string, any>>({});

    // Command execution state
    const [commandLogs, setCommandLogs] = useState<string[]>([]);
    const [commandStatus, setCommandStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');

    if (!session || !activeWorkflow) {
        return (
            <PageContainer>
                <DashboardPageHeader title="No Active Session" />
                <SectionCard>
                    <SectionCardContent>
                        <Stack spacing="var(--ds-spacing-4)">
                            <Paragraph>Please select a workflow from the catalog.</Paragraph>
                            <Button onClick={cancelSession}>Go to Catalog</Button>
                        </Stack>
                    </SectionCardContent>
                </SectionCard>
            </PageContainer>
        );
    }

    const currentStep = activeWorkflow.steps[activeStepIndex];
    const isCommandStep = !!currentStep.commandId;

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleRunCommand = async () => {
        if (!currentStep.commandId) return;

        // Reset logs
        setCommandLogs([]);
        setCommandStatus('running');

        // Lazy load registry and executor
        const { commandRegistry } = await import('../registry/command-registry');
        const { commandExecutor } = await import('../services/command-executor');

        const command = commandRegistry.getCommand(currentStep.commandId);
        if (!command) {
            setCommandLogs(prev => [...prev, `Error: Command ${currentStep.commandId} not found`]);
            setCommandStatus('failed');
            return;
        }

        try {
            const result = await commandExecutor.execute(
                command,
                formData,
                (log) => setCommandLogs(prev => [...prev, log])
            );
            setCommandStatus('completed');

            if (result.artifacts && result.artifacts.length > 0) {
                addArtifacts(result.artifacts);
            }
        } catch (err) {
            setCommandLogs(prev => [...prev, `Error: ${err}`]);
            setCommandStatus('failed');
        }
    };

    const handleNext = () => {
        // If it's a command step, ensure it ran successfully
        if (isCommandStep && commandStatus !== 'completed') {
            return;
        }

        // Save current step data
        submitStep(currentStep.id, { ...formData, commandLogs, commandStatus });
        // Move to next
        nextStep();
        // Reset form for next step (or load if existing)
        setFormData({});
        setCommandLogs([]);
        setCommandStatus('idle');
    };

    return (
        <PageContainer>
            <DashboardPageHeader
                title={activeWorkflow.name}
                subtitle={activeWorkflow.description}
                primaryAction={
                    <Button variant="secondary" onClick={cancelSession}>Exit Session</Button>
                }
            />

            <WizardStepper
                steps={activeWorkflow.steps.map(s => ({ id: s.id, label: s.title, optional: s.isOptional }))}
                currentStep={activeStepIndex}
            />

            <Container style={{ marginTop: 'var(--ds-spacing-6)' }} fluid maxWidth="100%" padding={0}>
                <SectionCard>
                    <SectionCardContent>
                        <Stack spacing="var(--ds-spacing-6)">
                            <Stack spacing="var(--ds-spacing-1)">
                                <Heading level={3} data-size="md">{currentStep.title}</Heading>
                                {currentStep.description && (
                                    <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                                        {currentStep.description}
                                    </Paragraph>
                                )}
                            </Stack>

                            {/* Dynamic Form Generation */}
                            <Stack spacing="var(--ds-spacing-4)">
                                {currentStep.questions?.map(question => (
                                    <Stack key={question.id}>
                                        {question.type === 'text' && (
                                            <Textfield
                                                label={question.text}
                                                value={formData[question.id] || ''}
                                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                required={question.required}
                                            />
                                        )}

                                        {question.type === 'select' && (
                                            <Field>
                                                <Label>
                                                    {question.text}
                                                    {question.required && ' *'}
                                                </Label>
                                                <Select
                                                    value={formData[question.id] || ''}
                                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                >
                                                    <Select.Option value="">Select...</Select.Option>
                                                    {question.options?.map(opt => (
                                                        <Select.Option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Field>
                                        )}
                                    </Stack>
                                ))}
                            </Stack>

                            {/* Command Execution Area */}
                            {isCommandStep && (
                                <Stack spacing="var(--ds-spacing-4)">
                                    <Stack direction="horizontal" align="center" justify="between">
                                        <Label>Command Execution</Label>
                                        <Button
                                            variant="primary"
                                            data-size="sm"
                                            onClick={handleRunCommand}
                                            disabled={commandStatus === 'running' || commandStatus === 'completed'}
                                        >
                                            {commandStatus === 'completed' ? 'Re-run Command' : 'Run Command'}
                                        </Button>
                                    </Stack>
                                    <CommandTerminal
                                        logs={commandLogs}
                                        status={commandStatus}
                                    />
                                </Stack>
                            )}

                            {/* Artifact Preview Area (Post-Command) */}
                            {commandStatus === 'completed' && session.artifacts?.length > 0 && (
                                <Stack spacing="var(--ds-spacing-4)">
                                    <ArtifactPreview artifacts={session.artifacts} />
                                </Stack>
                            )}

                            <Stack direction="horizontal" justify="between" style={{ marginTop: 'var(--ds-spacing-4)' }}>
                                <Button
                                    variant="secondary"
                                    onClick={prevStep}
                                    disabled={activeStepIndex === 0}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleNext}
                                    disabled={isCommandStep && commandStatus !== 'completed'}
                                >
                                    {activeStepIndex === activeWorkflow.steps.length - 1 ? 'Finish' : 'Next Step'}
                                </Button>
                            </Stack>

                        </Stack>
                    </SectionCardContent>
                </SectionCard>
            </Container>
        </PageContainer>
    );
}
