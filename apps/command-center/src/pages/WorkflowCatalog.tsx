/**
 * Workflow Catalog Page
 *
 * AI-guided Design OS wizard with step-by-step flow.
 * Single Vision input generates all artifacts, then wizard shows pre-filled content for review.
 */

import { useState } from 'react';
import {
  PageContainer,
  DashboardPageHeader,
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  SectionCardFooter,
  Alert,
  Field,
  Label,
  Textarea,
  Paragraph,
  WizardNavigation,
  Button,
  WizardStepper,
  CodeBlock,
  CopyButton,
} from '@xala-technologies/platform-ui';
import { useDesignWorkflow } from '../hooks';
import { providerRegistry } from '../lib/ai';
import { ClarificationPanel } from '../components/workflow/ClarificationPanel';

// ============================================
// Wizard Steps Configuration
// ============================================

const WIZARD_STEPS = [
  { id: 'vision', label: 'Product Vision' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'data-model', label: 'Data Model' },
  { id: 'sections', label: 'UI Sections', optional: true },
  { id: 'export', label: 'Export' },
];

const GENERATION_STEPS = [
  { id: 'vision', label: 'Generating Product Vision...' },
  { id: 'roadmap', label: 'Creating Roadmap...' },
  { id: 'data-model', label: 'Designing Data Model...' },
  { id: 'complete', label: 'Complete!' },
];

// ============================================
// Component
// ============================================

export function WorkflowCatalog() {
  const [state, actions] = useDesignWorkflow();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visionInput, setVisionInput] = useState('');
  const [generationStatus, setGenerationStatus] = useState<string>('');

  const isProviderReady = providerRegistry.isInitialized();
  const currentStep = WIZARD_STEPS[currentStepIndex];
  const showClarifications = state.clarificationMode === 'asking' && state.clarificationQuestions.length > 0;
  const isGenerating = state.isLoading && state.generationProgress !== undefined;

  // Generate all artifacts from vision
  const handleGenerateAll = async () => {
    if (!visionInput.trim()) return;

    try {
      await actions.generateAllFromVision(visionInput, (status) => {
        setGenerationStatus(status);
      });
      setCurrentStepIndex(0); // Start at vision to review
    } catch (err) {
      // Error handled by hook
    }
  };

  // Handle clarification flow (for refinement)
  const handleAskClarifications = async () => {
    if (!currentStep) return;
    const input = getStepInput();
    await actions.askClarifications(currentStep.id, input);
  };

  const handleClarificationSubmit = () => {
    actions.submitClarifications();
    // Could trigger refinement here
  };

  // Get current step's generated content
  const getStepContent = () => {
    switch (currentStep?.id) {
      case 'vision':
        return state.vision ? JSON.stringify(state.vision, null, 2) : null;
      case 'roadmap':
        return state.roadmap ? JSON.stringify(state.roadmap, null, 2) : null;
      case 'data-model':
        return state.dataModel ? JSON.stringify(state.dataModel, null, 2) : null;
      case 'sections':
        return state.sections.length > 0 ? JSON.stringify(state.sections, null, 2) : null;
      default:
        return null;
    }
  };

  const getStepInput = () => {
    switch (currentStep?.id) {
      case 'vision':
        return visionInput;
      default:
        return '';
    }
  };

  // Navigation
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      actions.skipClarifications();
    }
  };

  const handleNext = () => {
    if (currentStepIndex < WIZARD_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      actions.skipClarifications();
    }
  };

  const handleStepClick = (index: number) => {
    // Allow clicking any step for free navigation
    setCurrentStepIndex(index);
    actions.skipClarifications();
  };

  const handleReset = () => {
    actions.reset();
    setCurrentStepIndex(0);
    setVisionInput('');
    setGenerationStatus('');
  };

  const handleExport = async () => {
    try {
      await actions.exportProduct({ mode: 'oneshot' });
    } catch (err) {
      // Error handled by hook
    }
  };

  // Check if step has content
  const stepHasContent = (stepId: string) => {
    switch (stepId) {
      case 'vision': return !!state.vision;
      case 'roadmap': return !!state.roadmap;
      case 'data-model': return !!state.dataModel;
      case 'sections': return state.sections.length > 0;
      default: return false;
    }
  };

  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;
  const stepContent = getStepContent();

  return (
    <PageContainer>
      <DashboardPageHeader
        title="Design OS Workflow"
        subtitle="Describe your product vision and AI will generate a complete specification"
      />

      {!isProviderReady && (
        <Alert data-color="warning">
          <Paragraph data-size="sm">
            Configure your AI provider API key in Settings to enable generation.
          </Paragraph>
        </Alert>
      )}

      {/* Show Generation Progress */}
      {isGenerating && (
        <SectionCard>
          <SectionCardHeader
            title="Generating Your Specification"
            description="Please wait while AI creates your product artifacts..."
          />
          <SectionCardContent>
            {GENERATION_STEPS.map((step) => {
              const isComplete = state.generationProgress?.completed.includes(step.id);
              const isCurrent = state.generationProgress?.current === step.id;
              return (
                <Paragraph key={step.id} data-size="sm">
                  {isComplete ? '✓ ' : isCurrent ? '⏳ ' : '○ '}
                  {step.label}
                </Paragraph>
              );
            })}
            {generationStatus && (
              <Paragraph data-size="sm" data-color="subtle">
                {generationStatus}
              </Paragraph>
            )}
          </SectionCardContent>
        </SectionCard>
      )}

      {/* Wizard Stepper - always visible for navigation */}
      {!isGenerating && (
        <WizardStepper
          steps={WIZARD_STEPS.map((s) => ({
            ...s,
            completed: stepHasContent(s.id),
          }))}
          currentStep={currentStepIndex}
          onStepClick={handleStepClick}
          title="Design OS Workflow"
          showProgress
        />
      )}

      {/* Vision Step - show input form */}
      {!isGenerating && currentStep?.id === 'vision' && !stepContent && (
        <SectionCard>
          <SectionCardHeader
            title="Describe Your Product"
            description="Provide a comprehensive description of your product idea. Include the problem it solves, target users, key features, and any technical constraints. The more detail you provide, the better the generated specification."
          />
          <SectionCardContent>
            {showClarifications ? (
              <ClarificationPanel
                intro={state.clarificationIntro}
                questions={state.clarificationQuestions}
                answers={state.clarificationAnswers}
                onAnswerChange={actions.setClarificationAnswer}
                onSubmit={handleClarificationSubmit}
                isSubmitting={state.isLoading}
                submitLabel="Generate Specification"
              />
            ) : (
              <Field>
                <Label htmlFor="vision-input">Product Vision</Label>
                <Textarea
                  id="vision-input"
                  value={visionInput}
                  onChange={(e) => setVisionInput(e.target.value)}
                  placeholder={`Example:
I want to build a SaaS platform for managing rental properties. 

Problem: Property managers struggle to track bookings, maintenance, and tenant communications across multiple properties.

Target Users: 
- Property managers with 5-50 rental units
- Small landlords who self-manage

Key Features:
- Property listing management
- Booking calendar with availability
- Tenant portal for payments and maintenance requests
- Automated reminders and notifications
- Financial reporting

Technical: 
- Web-based with mobile-responsive design
- Integration with popular payment processors
- Multi-tenant architecture`}
                  rows={16}
                  disabled={state.isLoading}
                />
              </Field>
            )}
          </SectionCardContent>
          <SectionCardFooter>
            <Button
              data-color="accent"
              onClick={handleAskClarifications}
              disabled={!visionInput.trim() || state.isLoading || !isProviderReady}
            >
              Refine with Questions
            </Button>
            <Button
              data-color="accent"
              onClick={handleGenerateAll}
              disabled={!visionInput.trim() || state.isLoading || !isProviderReady}
            >
              {state.isLoading ? 'Generating...' : 'Generate Full Specification'}
            </Button>
          </SectionCardFooter>
        </SectionCard>
      )}

      {/* Step Content - show generated content for review */}
      {!isGenerating && currentStep?.id !== 'export' && stepContent && (
        <SectionCard>
          <SectionCardHeader
            title={`${currentStep?.label}`}
            description="Review the AI-generated content. You can refine it with additional input."
            actions={<CopyButton text={stepContent} />}
          />
          <SectionCardContent>
            <CodeBlock code={stepContent} language="json" maxHeight="500px" />
          </SectionCardContent>
          <SectionCardFooter>
            <Button
              variant="secondary"
              onClick={handleAskClarifications}
              disabled={state.isLoading}
            >
              Refine This Step
            </Button>
          </SectionCardFooter>
        </SectionCard>
      )}

      {/* Export Step */}
      {!isGenerating && currentStep?.id === 'export' && (
        <SectionCard>
          <SectionCardHeader
            title="Export for Implementation"
            description="Generate implementation prompts for your coding agent."
          />
          <SectionCardContent>
            {!state.vision ? (
              <Alert data-color="info">
                <Paragraph data-size="sm">Complete the Vision step first.</Paragraph>
              </Alert>
            ) : (
              <Paragraph>
                Your specification is ready for export. Choose an export format:
              </Paragraph>
            )}
          </SectionCardContent>
          <SectionCardFooter>
            <Button
              data-color="accent"
              onClick={handleExport}
              disabled={!state.vision || state.isLoading}
            >
              Generate One-Shot Export
            </Button>
            <Button
              variant="secondary"
              onClick={() => actions.exportProduct({ mode: 'incremental' })}
              disabled={!state.vision || state.isLoading}
            >
              Generate Incremental Export
            </Button>
          </SectionCardFooter>
        </SectionCard>
      )}

      {/* Error Display */}
      {state.error && (
        <Alert data-color="danger">
          <Paragraph data-size="sm">{state.error}</Paragraph>
        </Alert>
      )}

      {/* Wizard Navigation - always show for back/forth */}
      {!isGenerating && (
        <WizardNavigation
          canGoPrev={currentStepIndex > 0}
          canGoNext={!isLastStep}
          isLastStep={isLastStep}
          onPrev={handlePrev}
          onNext={handleNext}
          onCancel={handleReset}
          onComplete={handleExport}
          prevLabel="Back"
          nextLabel="Next"
          cancelLabel="Start Over"
          completeLabel="Export"
          disabled={state.isLoading}
        />
      )}
    </PageContainer>
  );
}
