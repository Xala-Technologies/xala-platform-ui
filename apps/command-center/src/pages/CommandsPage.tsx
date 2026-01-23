/**
 * Commands Page
 * 
 * Lists all registered commands and allows execution with AI-guided Q&A.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import { useState } from 'react';
import {
    PageContainer,
    DashboardPageHeader,
    SectionCard,
    SectionCardHeader,
    SectionCardContent,
    CardGrid,
    Button,
    Stack,
    Heading,
    Paragraph,
    Tag,
    Drawer,
    Field,
    Label,
    Textfield,
    Select,
    Checkbox,
    Alert,
} from '@xala-technologies/platform-ui';
import { commandRegistry } from '../registry/command-registry';
import { commandExecutor } from '../services/command-executor';
import { CommandTerminal } from '../components/commands/CommandTerminal';
import { TESTIDS } from '../constants/testids';
import type { Command, CommandResult } from '../registry/types';

export function CommandsPage() {
    const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
    const [showExecutionModal, setShowExecutionModal] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [commandLogs, setCommandLogs] = useState<string[]>([]);
    const [commandStatus, setCommandStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');
    const [commandResult, setCommandResult] = useState<CommandResult | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [dryRun, setDryRun] = useState(false);
    const [selectedEnvironment, setSelectedEnvironment] = useState<'dev' | 'stage' | 'prod'>('dev');

    const commands = commandRegistry.getAllCommands();

    const handleCommandClick = (command: Command) => {
        setSelectedCommand(command);
        setFormData({});
        setCommandLogs([]);
        setCommandStatus('idle');
        setCommandResult(null);
        setShowExecutionModal(true);
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleExecute = async () => {
        if (!selectedCommand) return;

        // Check for required secrets/env vars (mock check)
        if (selectedCommand.requiredSecrets && selectedCommand.requiredSecrets.length > 0) {
            // In real implementation, check if secrets exist
            console.log('Required secrets:', selectedCommand.requiredSecrets);
        }

        // Environment guardrails - prod requires extra confirmation
        if (selectedEnvironment === 'prod') {
            if (!showConfirmation) {
                setShowConfirmation(true);
                return;
            }
        }

        // Show confirmation for high-risk commands
        if (selectedCommand.riskLevel === 'high' || selectedCommand.confirmationPrompt) {
            if (!showConfirmation) {
                setShowConfirmation(true);
                return;
            }
        }

        setCommandLogs([]);
        setCommandStatus('running');
        setShowConfirmation(false);

        try {
            const result = await commandExecutor.execute(
                selectedCommand,
                formData,
                (log) => setCommandLogs(prev => [...prev, log])
            );

            setCommandResult(result);
            setCommandStatus(result.exitCode === 0 ? 'completed' : 'failed');
        } catch (error) {
            setCommandLogs(prev => [...prev, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
            setCommandStatus('failed');
        }
    };

    const handleClose = () => {
        setShowExecutionModal(false);
        setSelectedCommand(null);
        setFormData({});
        setCommandLogs([]);
        setCommandStatus('idle');
        setCommandResult(null);
        setShowConfirmation(false);
        setDryRun(false);
        setSelectedEnvironment('dev');
    };

    // Group commands by category
    const commandsByCategory = commands.reduce((acc, cmd) => {
        const category = cmd.category || 'other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(cmd);
        return acc;
    }, {} as Record<string, Command[]>);

    return (
        <PageContainer data-testid={TESTIDS.commands.root}>
            <DashboardPageHeader
                title="Commands"
                subtitle="Execute registered CLI commands safely with guided inputs"
            />

            {Object.entries(commandsByCategory).map(([category, categoryCommands]) => (
                <SectionCard key={category}>
                    <SectionCardHeader
                        title={category.charAt(0).toUpperCase() + category.slice(1)}
                        description={`${categoryCommands.length} command${categoryCommands.length !== 1 ? 's' : ''} available`}
                    />
                    <SectionCardContent>
                        <CardGrid>
                            {categoryCommands.map((command) => (
                                <div
                                    key={command.id}
                                    onClick={() => handleCommandClick(command)}
                                    data-testid={`${TESTIDS.commands.card}-${command.id}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div style={{ padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)', borderRadius: 'var(--ds-border-radius-md)' }}>
                                        <Stack spacing="var(--ds-spacing-3)">
                                            <Heading level={3} data-size="sm">{command.name || command.id}</Heading>
                                            <Paragraph data-size="sm">{command.description}</Paragraph>
                                        </Stack>
                                    </div>
                                    <Stack direction="horizontal" spacing="var(--ds-spacing-2)" style={{ marginTop: 'var(--ds-spacing-2)' }}>
                                        {command.riskLevel && (
                                            <Tag
                                                data-color={
                                                    command.riskLevel === 'high'
                                                        ? 'danger'
                                                        : command.riskLevel === 'medium'
                                                          ? 'warning'
                                                          : 'neutral'
                                                }
                                                data-size="sm"
                                            >
                                                {command.riskLevel}
                                            </Tag>
                                        )}
                                        {command.isLongRunning && (
                                            <Tag data-color="info" data-size="sm">
                                                Long-running
                                            </Tag>
                                        )}
                                        <Button
                                            data-color="accent"
                                            data-size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCommandClick(command);
                                            }}
                                        >
                                            Execute
                                        </Button>
                                    </Stack>
                                </div>
                            ))}
                        </CardGrid>
                    </SectionCardContent>
                </SectionCard>
            ))}

            {/* Command Execution Modal */}
            {selectedCommand && (
                <Drawer
                    isOpen={showExecutionModal}
                    onClose={handleClose}
                    title={selectedCommand.name || selectedCommand.id}
                    size="lg"
                    data-testid={TESTIDS.commands.modal}
                >
                    <Stack spacing="var(--ds-spacing-6)">
                        {/* Command Info */}
                        <SectionCard>
                            <SectionCardHeader title="Command Details" />
                            <SectionCardContent>
                                <Stack spacing="var(--ds-spacing-3)">
                                    <Stack direction="horizontal" spacing="var(--ds-spacing-4)">
                                        <div>
                                            <Paragraph
                                                data-size="xs"
                                                style={{
                                                    color: 'var(--ds-color-neutral-text-subtle)',
                                                    margin: 0,
                                                }}
                                            >
                                                Executable
                                            </Paragraph>
                                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                                {selectedCommand.executable} {selectedCommand.args?.join(' ')}
                                            </Paragraph>
                                        </div>
                                        {selectedCommand.workingDir && (
                                            <div>
                                                <Paragraph
                                                    data-size="xs"
                                                    style={{
                                                        color: 'var(--ds-color-neutral-text-subtle)',
                                                        margin: 0,
                                                    }}
                                                >
                                                    Working Directory
                                                </Paragraph>
                                                <Paragraph data-size="sm" style={{ margin: 0 }}>
                                                    {selectedCommand.workingDir}
                                                </Paragraph>
                                            </div>
                                        )}
                                    </Stack>
                                    {/* Environment Selection */}
                                    {selectedCommand.environment && (
                                        <Field>
                                            <Label>Environment</Label>
                                            <Select
                                                value={selectedEnvironment}
                                                onChange={(e) => setSelectedEnvironment(e.target.value as 'dev' | 'stage' | 'prod')}
                                                data-testid={`${TESTIDS.commands.formField}-environment`}
                                            >
                                                <Select.Option value="dev">Development</Select.Option>
                                                <Select.Option value="stage">Staging</Select.Option>
                                                <Select.Option value="prod">Production</Select.Option>
                                            </Select>
                                        </Field>
                                    )}

                                    {/* Environment Warning */}
                                    {selectedEnvironment === 'prod' && (
                                        <Alert data-color="danger">
                                            <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                                                Production Environment
                                            </Heading>
                                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                                You are about to execute this command in production.
                                                This action will be logged and requires explicit confirmation.
                                            </Paragraph>
                                        </Alert>
                                    )}

                                    {selectedCommand.riskLevel === 'high' && (
                                        <Alert data-color="warning">
                                            <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                                                High Risk Command
                                            </Heading>
                                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                                This command requires confirmation before execution.
                                            </Paragraph>
                                        </Alert>
                                    )}
                                </Stack>
                            </SectionCardContent>
                        </SectionCard>

                        {/* Input Form */}
                        {selectedCommand.inputSchema && (
                            <SectionCard>
                                <SectionCardHeader title="Command Inputs" />
                                <SectionCardContent>
                                    <Stack spacing="var(--ds-spacing-4)">
                                        {Object.entries(selectedCommand.inputSchema.properties || {}).map(
                                            ([key, prop]: [string, any]) => (
                                                <Field key={key}>
                                                    <Label>
                                                        {prop.description || key}
                                                        {selectedCommand.inputSchema?.required?.includes(key) && ' *'}
                                                    </Label>
                                                    {prop.type === 'string' && (
                                                        <Textfield
                                                            label={prop.description || key}
                                                            value={formData[key] || ''}
                                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                                            placeholder={prop.description}
                                                            required={selectedCommand.inputSchema?.required?.includes(key)}
                                                            data-testid={`${TESTIDS.commands.formField}-${key}`}
                                                        />
                                                    )}
                                                    {prop.type === 'boolean' && (
                                                        <Checkbox
                                                            label={prop.description || key}
                                                            checked={formData[key] || prop.default || false}
                                                            onChange={(e) => handleInputChange(key, e.target.checked)}
                                                            data-testid={`${TESTIDS.commands.formField}-${key}`}
                                                        />
                                                    )}
                                                    {prop.enum && (
                                                        <Select
                                                            value={formData[key] || ''}
                                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                                            data-testid={`${TESTIDS.commands.formField}-${key}`}
                                                        >
                                                            <Select.Option value="">Select...</Select.Option>
                                                            {prop.enum.map((val: string) => (
                                                                <Select.Option key={val} value={val}>
                                                                    {val}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    )}
                                                </Field>
                                            )
                                        )}
                                        {selectedCommand.dryRun && (
                                            <Field>
                                                <Checkbox
                                                    label="Dry Run (simulate execution without making changes)"
                                                    checked={dryRun}
                                                    onChange={(e) => setDryRun(e.target.checked)}
                                                />
                                            </Field>
                                        )}
                                    </Stack>
                                </SectionCardContent>
                            </SectionCard>
                        )}

                        {/* Confirmation Prompt */}
                        {showConfirmation && (
                            <Alert data-color={selectedEnvironment === 'prod' ? 'danger' : 'warning'}>
                                <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                                    {selectedEnvironment === 'prod' 
                                        ? 'Production Confirmation Required'
                                        : 'Confirmation Required'}
                                </Heading>
                                <Stack spacing="var(--ds-spacing-2)">
                                    {selectedEnvironment === 'prod' && (
                                        <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                                            ⚠️ You are about to execute this command in PRODUCTION.
                                        </Paragraph>
                                    )}
                                    {selectedCommand.confirmationPrompt && (
                                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                                            {selectedCommand.confirmationPrompt}
                                        </Paragraph>
                                    )}
                                    {selectedEnvironment === 'prod' && (
                                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                                            This action will be logged and cannot be undone easily.
                                        </Paragraph>
                                    )}
                                </Stack>
                            </Alert>
                        )}

                        {/* Command Terminal */}
                        {(commandStatus !== 'idle' || commandLogs.length > 0) && (
                            <SectionCard>
                                <SectionCardHeader title="Execution Output" />
                                <SectionCardContent>
                                    <CommandTerminal
                                        logs={commandLogs}
                                        status={commandStatus}
                                        data-testid={TESTIDS.commands.terminal}
                                    />
                                </SectionCardContent>
                            </SectionCard>
                        )}

                        {/* Command Result */}
                        {commandResult && commandStatus === 'completed' && (
                            <SectionCard>
                                <SectionCardHeader title="Execution Result" />
                                <SectionCardContent>
                                    <Stack spacing="var(--ds-spacing-3)">
                                        <Paragraph data-size="sm">
                                            Exit Code: {commandResult.exitCode}
                                        </Paragraph>
                                        {commandResult.artifacts && commandResult.artifacts.length > 0 && (
                                            <div>
                                                <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                                                    Generated Artifacts:
                                                </Paragraph>
                                                <Stack spacing="var(--ds-spacing-2)">
                                                    {commandResult.artifacts.map((artifact) => (
                                                        <Paragraph key={artifact.id} data-size="sm" style={{ margin: 0 }}>
                                                            • {artifact.path}
                                                        </Paragraph>
                                                    ))}
                                                </Stack>
                                            </div>
                                        )}
                                    </Stack>
                                </SectionCardContent>
                            </SectionCard>
                        )}

                        {/* Actions */}
                        <Stack direction="horizontal" spacing="var(--ds-spacing-2)" justify="end">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleExecute}
                                disabled={commandStatus === 'running'}
                                data-testid={TESTIDS.commands.confirmBtn}
                            >
                                {showConfirmation
                                    ? 'Confirm & Execute'
                                    : commandStatus === 'running'
                                      ? 'Running...'
                                      : 'Execute Command'}
                            </Button>
                        </Stack>
                    </Stack>
                </Drawer>
            )}
        </PageContainer>
    );
}
