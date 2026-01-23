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
import { ArtifactValidationPanel } from '../components/artifacts/ArtifactValidationPanel';
import { revisionManager } from '../services/revision-manager';
import { artifactValidator } from '../services/artifact-validator';
import { useNavigate } from 'react-router-dom';

import { TESTIDS } from '../constants/testids';

export function WorkflowSessionPage() {
    const navigate = useNavigate();
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

    // Validation state
    const [validationResults, setValidationResults] = useState<Map<string, any>>(new Map());
    const [isValidating, setIsValidating] = useState(false);

    if (!session || !activeWorkflow) {
        return (
            <PageContainer data-testid={TESTIDS.session.root}>
                <DashboardPageHeader title="No Active Session" />
                <SectionCard>
                    <SectionCardContent>
                        <Stack spacing="var(--ds-spacing-4)">
                            <Paragraph>Please select a workflow from the catalog.</Paragraph>
                            <Button onClick={cancelSession} data-testid={TESTIDS.session.exitBtn}>Go to Catalog</Button>
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

        setCommandLogs([]);
        setCommandStatus('running');

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

    const handleNext = async () => {
        if (isCommandStep && commandStatus !== 'completed') {
            return;
        }

        submitStep(currentStep.id, { ...formData, commandLogs, commandStatus });
        
        // If this is the last step, validate artifacts and create revision
        if (activeStepIndex === activeWorkflow.steps.length - 1) {
            await handleComplete();
            return;
        }

        nextStep();
        setFormData({});
        setCommandLogs([]);
        setCommandStatus('idle');
    };

    const handleComplete = async () => {
        if (!session) return;

        setIsValidating(true);

        // Validate all artifacts
        const validationResultsMap = new Map();
        for (const artifact of session.artifacts) {
            const result = await artifactValidator.validateArtifact(artifact);
            validationResultsMap.set(artifact.id, result);
        }
        setValidationResults(validationResultsMap);

        // Create revision
        const revision = revisionManager.createRevision(
            session,
            {
                name: 'Admin User', // In real app, get from auth context
                email: 'admin@xala.no',
            },
            Array.from(validationResultsMap.values())
        );

        setIsValidating(false);

        // Navigate to revisions page
        navigate(`/revisions?highlight=${revision.id}`);
    };

    return (
        <PageContainer data-testid={TESTIDS.session.root}>
            <DashboardPageHeader
                title={activeWorkflow.name}
                subtitle={activeWorkflow.description}
                primaryAction={
                    <Button variant="secondary" onClick={cancelSession} data-testid={TESTIDS.session.exitBtn}>Exit Session</Button>
                }
            />

            <WizardStepper
                steps={activeWorkflow.steps.map(s => ({ id: s.id, label: s.title, optional: s.isOptional }))}
                currentStep={activeStepIndex}
                data-testid={TESTIDS.session.stepper}
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

                            <Stack spacing="var(--ds-spacing-4)">
                                {currentStep.questions?.map(question => (
                                    <Stack key={question.id}>
                                        {question.type === 'text' && (
                                            <Textfield
                                                label={question.text}
                                                value={formData[question.id] || ''}
                                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                required={question.required}
                                                data-testid={`cc-session-input-${question.id}`}
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
                                                    data-testid={`cc-session-select-${question.id}`}
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

                            {isCommandStep && (
                                <Stack spacing="var(--ds-spacing-4)">
                                    <Stack direction="horizontal" align="center" justify="between">
                                        <Label>Command Execution</Label>
                                        <Button
                                            variant="primary"
                                            data-size="sm"
                                            onClick={handleRunCommand}
                                            disabled={commandStatus === 'running' || commandStatus === 'completed'}
                                            data-testid={TESTIDS.session.runBtn}
                                        >
                                            {commandStatus === 'completed' ? 'Re-run Command' : 'Run Command'}
                                        </Button>
                                    </Stack>
                                    <CommandTerminal
                                        logs={commandLogs}
                                        status={commandStatus}
                                        data-testid={TESTIDS.session.terminal}
                                    />
                                </Stack>
                            )}

                            {commandStatus === 'completed' && session.artifacts?.length > 0 && (
                                <Stack spacing="var(--ds-spacing-4)">
                                    <ArtifactPreview
                                        artifacts={session.artifacts}
                                        data-testid={TESTIDS.session.artifactPreview}
                                    />
                                    
                                    {/* Validation Results */}
                                    {validationResults.size > 0 && (
                                        <Stack spacing="var(--ds-spacing-4)">
                                            <Heading level={4} data-size="sm">Validation Results</Heading>
                                            {session.artifacts.map(artifact => {
                                                const result = validationResults.get(artifact.id);
                                                return result ? (
                                                    <ArtifactValidationPanel
                                                        key={artifact.id}
                                                        validationResult={result}
                                                        data-testid={`${TESTIDS.artifacts.validationPanel}-${artifact.id}`}
                                                    />
                                                ) : null;
                                            })}
                                        </Stack>
                                    )}
                                </Stack>
                            )}

                            <Stack direction="horizontal" justify="between" style={{ marginTop: 'var(--ds-spacing-4)' }}>
                                <Button
                                    variant="secondary"
                                    onClick={prevStep}
                                    disabled={activeStepIndex === 0}
                                    data-testid={TESTIDS.session.prevBtn}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleNext}
                                    disabled={(isCommandStep && commandStatus !== 'completed') || isValidating}
                                    data-testid={TESTIDS.session.nextBtn}
                                >
                                    {isValidating
                                        ? 'Validating...'
                                        : activeStepIndex === activeWorkflow.steps.length - 1
                                          ? 'Finish & Create Revision'
                                          : 'Next Step'}
                                </Button>
                            </Stack>

                        </Stack>
                    </SectionCardContent>
                </SectionCard>
            </Container>
        </PageContainer>
    );
}
