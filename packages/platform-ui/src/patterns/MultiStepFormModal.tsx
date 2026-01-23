/**
 * MultiStepFormModal
 *
 * A configurable multi-step form wizard in a modal dialog.
 * Enhanced version with sidebar support, flexible step configuration,
 * and validation integration.
 *
 * This component is designed to be used across any domain:
 * - Booking flows with pricing sidebar
 * - Registration wizards
 * - Configuration processes
 * - Checkout flows
 * - Onboarding sequences
 *
 * All text content is pre-localized - pass labels via props for i18n support.
 *
 * @example
 * ```tsx
 * const steps: FormStep[] = [
 *   {
 *     id: 'selection',
 *     title: 'Select Items',
 *     content: <SelectionStep />,
 *   },
 *   {
 *     id: 'details',
 *     title: 'Enter Details',
 *     content: <DetailsStep />,
 *     isOptional: true,
 *   },
 *   {
 *     id: 'review',
 *     title: 'Review',
 *     content: <ReviewStep sections={sections} />,
 *   },
 * ];
 *
 * <MultiStepFormModal
 *   open={showModal}
 *   title="Complete Your Booking"
 *   steps={steps}
 *   currentStep={currentStep}
 *   labels={{
 *     back: 'Back',
 *     next: 'Continue',
 *     submit: 'Confirm Booking',
 *     cancel: 'Cancel',
 *     stepIndicator: 'Step {current} of {total}',
 *   }}
 *   sidebar={<PricingSummary items={priceItems} />}
 *   showSidebar={currentStep > 0}
 *   onStepChange={setCurrentStep}
 *   onSubmit={handleSubmit}
 *   onClose={() => setShowModal(false)}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Dialog, Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { cn } from './utils';

// ============================================================================
// Types
// ============================================================================

/** Form step configuration */
export interface FormStep {
  /** Unique step identifier */
  id: string;
  /** Step title (pre-localized) */
  title: string;
  /** Step description (pre-localized, optional) */
  description?: string;
  /** Step content (ReactNode) */
  content: ReactNode;
  /** Whether this step is optional */
  isOptional?: boolean;
  /** Validation function - return true if valid */
  validate?: () => boolean | Promise<boolean>;
}

/** Labels for localization */
export interface MultiStepFormModalLabels {
  /** Back button label (default: "Back") */
  back?: string;
  /** Next button label (default: "Next") */
  next?: string;
  /** Submit button label (default: "Submit") */
  submit?: string;
  /** Cancel button label (default: "Cancel") */
  cancel?: string;
  /** Step indicator text template (default: "Step {current} of {total}") */
  stepIndicator?: string;
  /** Optional label indicator (default: "(optional)") */
  optional?: string;
}

/** MultiStepFormModal props interface */
export interface MultiStepFormModalProps {
  /** Whether the modal is open */
  open: boolean;

  /** Modal title (pre-localized) */
  title: string;

  /** Modal subtitle (pre-localized, optional) */
  subtitle?: string;

  /** Array of form steps */
  steps: FormStep[];

  /** Current step index (0-based) */
  currentStep: number;

  /** Localized labels for buttons and indicators */
  labels: MultiStepFormModalLabels;

  /** Whether the submission is in progress */
  isSubmitting?: boolean;

  /** Whether the user can proceed to next step */
  canProceed?: boolean;

  // ========== Event Handlers ==========

  /** Handler for step changes */
  onStepChange: (step: number) => void;

  /** Handler for form submission (final step) */
  onSubmit: () => void | Promise<void>;

  /** Handler for closing/canceling the modal */
  onClose: () => void;

  // ========== Sidebar ==========

  /** Optional sidebar content (e.g., pricing summary) */
  sidebar?: ReactNode;

  /** Whether to show the sidebar */
  showSidebar?: boolean;

  // ========== Display Options ==========

  /** Modal size */
  size?: 'md' | 'lg' | 'xl';

  /** Custom class name */
  className?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

/** Get modal width based on size */
function getModalWidth(size: 'md' | 'lg' | 'xl', hasSidebar: boolean): string {
  if (hasSidebar) {
    // Wider when sidebar is shown
    const widths = {
      md: '800px',
      lg: '1000px',
      xl: '1200px',
    };
    return widths[size];
  }
  const widths = {
    md: '560px',
    lg: '720px',
    xl: '900px',
  };
  return widths[size];
}

// ============================================================================
// Sub-components
// ============================================================================

/** Step indicator dot */
interface StepIndicatorDotProps {
  step: FormStep;
  index: number;
  currentStep: number;
  optionalLabel?: string;
}

function StepIndicatorDot({
  step,
  index,
  currentStep,
  optionalLabel = '(optional)',
}: StepIndicatorDotProps) {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--ds-spacing-1)',
      }}
    >
      {/* Dot/Circle */}
      <div
        style={{
          width: 'var(--ds-spacing-8)',
          height: 'var(--ds-spacing-8)',
          borderRadius: 'var(--ds-border-radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--ds-font-size-sm)',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          backgroundColor: isCompleted
            ? 'var(--ds-color-success-base-default)'
            : isActive
              ? 'var(--ds-color-accent-base-default)'
              : 'var(--ds-color-neutral-surface-hover)',
          color:
            isCompleted || isActive
              ? 'var(--ds-color-neutral-background-default)'
              : 'var(--ds-color-neutral-text-subtle)',
        }}
        aria-current={isActive ? 'step' : undefined}
      >
        {isCompleted ? <CheckIcon /> : index + 1}
      </div>

      {/* Label */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 'var(--ds-font-size-xs)',
            fontWeight: isActive ? 600 : 400,
            color: isActive
              ? 'var(--ds-color-neutral-text-default)'
              : 'var(--ds-color-neutral-text-subtle)',
            whiteSpace: 'nowrap',
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
          }}
        >
          {step.title}
        </span>
        {step.isOptional && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {optionalLabel}
          </span>
        )}
      </div>
    </div>
  );
}

/** Step connector line */
function StepConnector({ isCompleted }: { isCompleted: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        height: 'var(--ds-border-width-medium)',
        marginTop: 'calc(var(--ds-spacing-4) - 1px)',
        marginLeft: 'var(--ds-spacing-1)',
        marginRight: 'var(--ds-spacing-1)',
        backgroundColor: isCompleted
          ? 'var(--ds-color-success-base-default)'
          : 'var(--ds-color-neutral-border-subtle)',
        transition: 'background-color 0.2s ease',
      }}
    />
  );
}

/** Step indicator bar */
interface StepIndicatorBarProps {
  steps: FormStep[];
  currentStep: number;
  stepIndicatorLabel: string;
  optionalLabel?: string;
}

function StepIndicatorBar({
  steps,
  currentStep,
  stepIndicatorLabel,
  optionalLabel,
}: StepIndicatorBarProps) {
  // Format step indicator text
  const stepText = stepIndicatorLabel
    .replace('{current}', String(currentStep + 1))
    .replace('{total}', String(steps.length));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)',
        padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      {/* Step text indicator */}
      <Paragraph
        data-size="sm"
        style={{
          margin: 0,
          color: 'var(--ds-color-neutral-text-subtle)',
          textAlign: 'center',
        }}
      >
        {stepText}
      </Paragraph>

      {/* Visual step indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <StepIndicatorDot
              step={step}
              index={index}
              currentStep={currentStep}
              optionalLabel={optionalLabel}
            />
            {index < steps.length - 1 && <StepConnector isCompleted={index < currentStep} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function MultiStepFormModal({
  open,
  title,
  subtitle,
  steps,
  currentStep,
  labels,
  isSubmitting = false,
  canProceed = true,
  onStepChange,
  onSubmit,
  onClose,
  sidebar,
  showSidebar = false,
  size = 'lg',
  className,
}: MultiStepFormModalProps): React.ReactElement {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // Merge with default labels
  const mergedLabels: Required<MultiStepFormModalLabels> = {
    back: labels.back ?? 'Back',
    next: labels.next ?? 'Next',
    submit: labels.submit ?? 'Submit',
    cancel: labels.cancel ?? 'Cancel',
    stepIndicator: labels.stepIndicator ?? 'Step {current} of {total}',
    optional: labels.optional ?? '(optional)',
  };

  // Derived state
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];
  const displaySidebar = showSidebar && sidebar;
  const modalWidth = getModalWidth(size, !!displaySidebar);

  // Control dialog visibility
  React.useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [open]);

  // Handle dialog close event
  const handleDialogClose = () => {
    onClose();
  };

  // Handle back navigation
  const handleBack = () => {
    if (!isFirstStep) {
      onStepChange(currentStep - 1);
    }
  };

  // Handle next/submit
  const handlePrimaryAction = async () => {
    // Run validation if provided
    if (currentStepData?.validate) {
      const isValid = await currentStepData.validate();
      if (!isValid) return;
    }

    if (isLastStep) {
      await onSubmit();
    } else {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <Dialog
      ref={dialogRef}
      className={cn('multi-step-form-modal', className)}
      closedby="closerequest"
      onClose={handleDialogClose}
      style={{
        maxWidth: modalWidth,
        width: '95vw',
        maxHeight: '90vh',
        borderRadius: 'var(--ds-border-radius-xl)',
        padding: 0,
        border: 'none',
        boxShadow: 'var(--ds-shadow-xl)',
        overflow: 'hidden',
      }}
    >
      {/* Modal Header */}
      <div
        style={{
          padding: 'var(--ds-spacing-5) var(--ds-spacing-6)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <div>
          <Heading level={2} data-size="md" style={{ margin: 0 }}>
            {title}
          </Heading>
          {subtitle && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {subtitle}
            </Paragraph>
          )}
        </div>
        <Button
          type="button"
          onClick={onClose}
          aria-label="Close"
          data-color="neutral"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'var(--ds-spacing-9)',
            height: 'var(--ds-spacing-9)',
            border: 'none',
            borderRadius: 'var(--ds-border-radius-full)',
            backgroundColor: 'transparent',
            color: 'var(--ds-color-neutral-text-subtle)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <CloseIcon size={20} />
        </Button>
      </div>

      {/* Step Indicator */}
      {steps.length > 1 && (
        <StepIndicatorBar
          steps={steps}
          currentStep={currentStep}
          stepIndicatorLabel={mergedLabels.stepIndicator}
          optionalLabel={mergedLabels.optional}
        />
      )}

      {/* Main Content Area */}
      <div
        style={{
          display: 'flex',
          minHeight: 0,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Step Content */}
        <div
          style={{
            flex: 1,
            padding: 'var(--ds-spacing-6)',
            overflowY: 'auto',
            maxHeight: displaySidebar ? 'calc(90vh - 280px)' : 'calc(90vh - 220px)',
          }}
        >
          {/* Step title and description */}
          {(currentStepData?.title || currentStepData?.description) && (
            <div style={{ marginBottom: 'var(--ds-spacing-5)' }}>
              {currentStepData.title && steps.length === 1 && (
                <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                  {currentStepData.title}
                </Heading>
              )}
              {currentStepData.description && (
                <Paragraph
                  data-size="sm"
                  style={{
                    margin: 0,
                    marginTop: currentStepData.title ? 'var(--ds-spacing-2)' : 0,
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {currentStepData.description}
                </Paragraph>
              )}
            </div>
          )}

          {/* Step content */}
          {currentStepData?.content}
        </div>

        {/* Sidebar */}
        {displaySidebar && (
          <div
            style={{
              width: '320px',
              flexShrink: 0,
              padding: 'var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderLeft: '1px solid var(--ds-color-neutral-border-subtle)',
              overflowY: 'auto',
              maxHeight: 'calc(90vh - 280px)',
            }}
          >
            {sidebar}
          </div>
        )}
      </div>

      {/* Modal Footer */}
      <div
        style={{
          padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
          borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        {/* Left side: Cancel and Back */}
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
          <Button type="button" variant="tertiary" onClick={onClose} disabled={isSubmitting}>
            {mergedLabels.cancel}
          </Button>
          {!isFirstStep && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-1)',
              }}
            >
              <ChevronLeftIcon size={16} />
              {mergedLabels.back}
            </Button>
          )}
        </div>

        {/* Right side: Next or Submit */}
        <Button
          type="button"
          variant="primary"
          data-color="accent"
          onClick={handlePrimaryAction}
          disabled={!canProceed || isSubmitting}
          aria-busy={isSubmitting}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  width: 'var(--ds-spacing-4)',
                  height: 'var(--ds-spacing-4)',
                  border: '2px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              {isLastStep ? mergedLabels.submit : mergedLabels.next}
            </>
          ) : (
            <>
              {isLastStep ? mergedLabels.submit : mergedLabels.next}
              {!isLastStep && <ChevronRightIcon size={16} />}
            </>
          )}
        </Button>
      </div>

      {/* Modal Styles */}
      <style>{`
        .multi-step-form-modal::backdrop {
          background-color: var(--ds-color-neutral-background-overlay);
          backdrop-filter: blur(4px);
        }

        .multi-step-form-modal button:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .multi-step-form-modal[open] {
          animation: modal-fade-in 0.2s ease-out;
        }

        @keyframes modal-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .multi-step-form-modal {
            max-width: 100vw !important;
            width: 100vw !important;
            max-height: 100vh !important;
            height: 100vh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </Dialog>
  );
}

export default MultiStepFormModal;
