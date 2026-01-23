/**
 * Workflow Catalog Page
 *
 * AI-guided Design OS wizard with step-by-step flow.
 * Uses Wizard pattern from @xala-technologies/platform-ui.
 */

import { useState } from 'react';
import {
  PageContainer,
  DashboardPageHeader,
  Stack,
  Card,
  Alert,
  Field,
  Label,
  Textarea,
  Tag,
  Paragraph,
  Heading,
  WizardNavigation,
} from '@xala-technologies/platform-ui';
import { WizardStepper } from '@xala-technologies/platform-ui';
import { useDesignWorkflow } from '../hooks';
import { providerRegistry } from '../lib/ai';

// ============================================
// Wizard Steps Configuration
// ============================================

const WIZARD_STEPS = [
  { id: 'vision', label: 'Product Vision' },
  { id: 'roadmap', label: 'Product Roadmap' },
  { id: 'data-model', label: 'Data Model' },
  { id: 'section', label: 'Section Design', optional: true },
  { id: 'export', label: 'Export' },
];

// ============================================
// Step Prompts
// ============================================

const STEP_PROMPTS: Record<string, { title: string; prompt: string }> = {
  vision: {
    title: 'Define Your Product Vision',
    prompt: 'Describe your product. What problem does it solve? Who are your target users? What makes it unique?',
  },
  roadmap: {
    title: 'Plan Your Roadmap',
    prompt: 'What are the main features/sections of your product? List them in priority order with brief descriptions.',
  },
  'data-model': {
    title: 'Design Your Data Model',
    prompt: 'What are the core data entities? (e.g., User, Product, Order) Describe their key fields and relationships.',
  },
  section: {
    title: 'Design a Section',
    prompt: 'Describe a section to design: What user actions does it support? What data does it display?',
  },
  export: {
    title: 'Export for Implementation',
    prompt: 'Generate implementation prompts for your coding agent. Choose one-shot for full brief, or incremental for section-by-section.',
  },
};

// ============================================
// Component
// ============================================

export function WorkflowCatalog() {
  const [state, actions] = useDesignWorkflow();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [lastOutput, setLastOutput] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const isProviderReady = providerRegistry.isInitialized();
  const currentStep = WIZARD_STEPS[currentStepIndex];
  const stepInfo = STEP_PROMPTS[currentStep?.id] || { title: '', prompt: '' };

  // Handle generate action
  const handleGenerate = async () => {
    if (!currentStep) return;

    try {
      let result: unknown;

      switch (currentStep.id) {
        case 'vision':
          result = await actions.generateVision(userInput);
          break;
        case 'roadmap':
          result = await actions.generateRoadmap(userInput);
          break;
        case 'data-model':
          result = await actions.generateDataModel(userInput);
          break;
        case 'section':
          result = await actions.generateSection('Section', userInput);
          break;
        case 'export':
          result = await actions.exportProduct({ mode: 'oneshot' });
          break;
      }

      const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      setLastOutput(output);
      setCompletedSteps([...completedSteps, currentStep.id]);
      setUserInput('');
    } catch (err) {
      // Error handled by hook
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setLastOutput(null);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setLastOutput(null);
    }
  };

  const handleStepClick = (index: number) => {
    if (index < currentStepIndex) {
      setCurrentStepIndex(index);
      setLastOutput(null);
    }
  };

  const handleCancel = () => {
    actions.reset();
    setCurrentStepIndex(0);
    setUserInput('');
    setLastOutput(null);
    setCompletedSteps([]);
  };

  const handleComplete = async () => {
    try {
      const output = await actions.exportProduct({ mode: 'oneshot' });
      setLastOutput(output);
      setCompletedSteps([...completedSteps, 'export']);
    } catch (err) {
      // Error handled by hook
    }
  };

  // Check if current step can proceed
  const canProceedToNext = completedSteps.includes(currentStep?.id || '');
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;

  return (
    <PageContainer>
      <DashboardPageHeader
        title="Design OS Workflow"
        subtitle="AI-guided product design following the Design OS methodology"
      />

      {/* Provider Warning */}
      {!isProviderReady && (
        <Alert data-color="warning" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">
            Configure your AI provider API key in Settings to enable generation.
          </Paragraph>
        </Alert>
      )}

      {/* Wizard Stepper */}
      <WizardStepper
        steps={WIZARD_STEPS}
        currentStep={currentStepIndex}
        onStepClick={handleStepClick}
        title="Design OS"
        showProgress
        style={{ marginBottom: 'var(--ds-spacing-4)' }}
      />

      {/* Step Content */}
      <Card style={{ padding: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-4)' }}>
        <Stack spacing="var(--ds-spacing-4)">
          {/* Step Header */}
          <Stack spacing="var(--ds-spacing-2)">
            <Heading level={3} data-size="md">{stepInfo.title}</Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {stepInfo.prompt}
            </Paragraph>
          </Stack>

          {/* Progress Tags */}
          {(state.vision || state.roadmap || state.dataModel || state.sections.length > 0) && (
            <Stack direction="horizontal" spacing="var(--ds-spacing-2)" style={{ flexWrap: 'wrap' }}>
              {state.vision && (
                <Tag data-color="success" data-size="sm">✓ Vision: {state.vision.name}</Tag>
              )}
              {state.roadmap && (
                <Tag data-color="success" data-size="sm">✓ {state.roadmap.phases.length} phases</Tag>
              )}
              {state.dataModel && (
                <Tag data-color="success" data-size="sm">✓ {state.dataModel.entities.length} entities</Tag>
              )}
              {state.sections.length > 0 && (
                <Tag data-color="success" data-size="sm">✓ {state.sections.length} sections</Tag>
              )}
            </Stack>
          )}

          {/* Input Area */}
          {currentStep?.id !== 'export' ? (
            <Stack spacing="var(--ds-spacing-3)">
              <Field>
                <Label htmlFor="wizard-input">Your Input</Label>
                <Textarea
                  id="wizard-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your requirements..."
                  rows={6}
                  disabled={state.isLoading}
                />
              </Field>

              <Stack direction="horizontal" spacing="var(--ds-spacing-2)">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!userInput.trim() || state.isLoading || !isProviderReady}
                  className="ds-button"
                  data-color="accent"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    backgroundColor: 'var(--ds-color-accent-base-default)',
                    color: 'white',
                    border: 'none',
                    cursor: state.isLoading ? 'wait' : 'pointer',
                    opacity: (!userInput.trim() || state.isLoading || !isProviderReady) ? 0.5 : 1,
                  }}
                >
                  {state.isLoading ? (
                    'Generating...'
                  ) : (
                    `Generate ${currentStep?.label}`
                  )}
                </button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing="var(--ds-spacing-3)">
              {!state.vision ? (
                <Alert data-color="info">
                  <Paragraph data-size="sm">Complete at least Product Vision to enable export.</Paragraph>
                </Alert>
              ) : (
                <Stack direction="horizontal" spacing="var(--ds-spacing-3)">
                  <button
                    type="button"
                    onClick={handleComplete}
                    disabled={state.isLoading}
                    style={{
                      padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
                      borderRadius: 'var(--ds-border-radius-md)',
                      backgroundColor: 'var(--ds-color-accent-base-default)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {state.isLoading ? 'Generating...' : 'Generate One-Shot Export'}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const output = await actions.exportProduct({ mode: 'incremental' });
                      setLastOutput(output);
                      setCompletedSteps([...completedSteps, 'export']);
                    }}
                    disabled={state.isLoading}
                    style={{
                      padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
                      borderRadius: 'var(--ds-border-radius-md)',
                      backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                      color: 'var(--ds-color-neutral-text-default)',
                      border: '1px solid var(--ds-color-neutral-border-default)',
                      cursor: 'pointer',
                    }}
                  >
                    Generate Incremental Export
                  </button>
                </Stack>
              )}
            </Stack>
          )}

          {/* Error Display */}
          {state.error && (
            <Alert data-color="danger">
              <Paragraph data-size="sm">{state.error}</Paragraph>
            </Alert>
          )}

          {/* Output Display */}
          {lastOutput && (
            <Card style={{ padding: 'var(--ds-spacing-4)', backgroundColor: 'var(--ds-color-neutral-surface-subtle)' }}>
              <Stack spacing="var(--ds-spacing-3)">
                <Stack direction="horizontal" justify="between" align="center">
                  <Heading level={4} data-size="sm">Generated Output</Heading>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(lastOutput)}
                    style={{
                      padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                      borderRadius: 'var(--ds-border-radius-sm)',
                      backgroundColor: 'var(--ds-color-neutral-surface-default)',
                      border: '1px solid var(--ds-color-neutral-border-default)',
                      cursor: 'pointer',
                      fontSize: 'var(--ds-font-size-sm)',
                    }}
                  >
                    Copy
                  </button>
                </Stack>
                <pre
                  style={{
                    padding: 'var(--ds-spacing-3)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    overflow: 'auto',
                    maxHeight: '400px',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'var(--ds-font-family-monospace)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                >
                  {lastOutput}
                </pre>
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>

      {/* Wizard Navigation */}
      <WizardNavigation
        canGoPrev={currentStepIndex > 0}
        canGoNext={canProceedToNext}
        isLastStep={isLastStep}
        onPrev={handlePrev}
        onNext={handleNext}
        onCancel={handleCancel}
        onComplete={handleComplete}
        prevLabel="Back"
        nextLabel="Next Step"
        cancelLabel="Start Over"
        completeLabel="Complete"
        disabled={state.isLoading}
      />
    </PageContainer>
  );
}
