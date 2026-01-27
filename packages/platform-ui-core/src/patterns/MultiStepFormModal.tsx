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
import { Dialog, Heading, Paragraph, Button } from '../primitives';
import { cn } from './utils';
import {
  shadows,
  animation,
  spacing as spacingTokens,
  transitions,
  typography,
  opacity as opacityTokens,
  borders,
  components,
} from '../tokens/extended';

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
        gap: 'var(--ds-spacing-2)',
        position: 'relative',
      }}
    >
      {/* Dot/Circle - Premium Enhanced */}
      <div
        style={{
          width: 'var(--ds-spacing-10)',
          height: 'var(--ds-spacing-10)',
          borderRadius: 'var(--ds-border-radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--ds-font-size-base)',
          fontWeight: 'var(--ds-font-weight-bold)',
          transition: transitions.card,
          backgroundColor: isCompleted
            ? 'var(--ds-color-success-base-default)'
            : isActive
              ? 'var(--ds-color-accent-base-default)'
              : 'var(--ds-color-neutral-surface-default)',
          color:
            isCompleted || isActive
              ? 'var(--ds-color-neutral-background-default)'
              : 'var(--ds-color-neutral-text-subtle)',
          border: isActive
            ? '3px solid var(--ds-color-accent-base-default)'
            : isCompleted
              ? '2px solid var(--ds-color-success-base-default)'
              : '2px solid var(--ds-color-neutral-border-subtle)',
          boxShadow: isActive ? shadows.elevation3 : isCompleted ? shadows.elevation1 : 'none',
          position: 'relative',
          zIndex: 2,
        }}
        aria-current={isActive ? 'step' : undefined}
        onMouseEnter={(e) => {
          if (!isActive && !isCompleted) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = shadows.elevation2;
            e.currentTarget.style.borderColor = 'var(--ds-color-neutral-border-default)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !isCompleted) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--ds-color-neutral-border-subtle)';
          }
        }}
      >
        {isCompleted ? <CheckIcon /> : index + 1}
        {/* Active step pulse animation */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: 'var(--ds-border-radius-full)',
              border: `${borders.width.medium} solid var(--ds-color-accent-base-default)`,
              opacity: opacityTokens.light,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {/* Label - Premium Enhanced */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--ds-spacing-1)',
          marginTop: 'var(--ds-spacing-1)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: isActive ? 'var(--ds-font-weight-bold)' : 'var(--ds-font-weight-medium)',
            color: isActive
              ? 'var(--ds-color-neutral-text-default)'
              : isCompleted
                ? 'var(--ds-color-neutral-text-default)'
                : 'var(--ds-color-neutral-text-subtle)',
            whiteSpace: 'nowrap',
            maxWidth: 'var(--ds-sizing-30)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            transition: transitions.colors,
            letterSpacing: isActive
              ? typography.letterSpacing.wide
              : typography.letterSpacing.normal,
          }}
        >
          {step.title}
        </span>
        {step.isOptional && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)',
              fontStyle: 'italic',
            }}
          >
            {optionalLabel}
          </span>
        )}
      </div>
    </div>
  );
}

/** Step connector line - Premium Enhanced */
function StepConnector({ isCompleted }: { isCompleted: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        height: borders.width.thick,
        marginTop: 'calc(var(--ds-spacing-5) - 2px)',
        marginLeft: 'var(--ds-spacing-2)',
        marginRight: 'var(--ds-spacing-2)',
        backgroundColor: isCompleted
          ? 'var(--ds-color-success-base-default)'
          : 'var(--ds-color-neutral-border-subtle)',
        borderRadius: 'var(--ds-border-radius-full)',
        transition: transitions.colors,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated progress line for completed steps */}
      {isCompleted && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to right, var(--ds-color-success-base-default), var(--ds-color-success-base-hover))',
            borderRadius: 'var(--ds-border-radius-full)',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
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
        gap: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-5) var(--ds-spacing-7)',
        background:
          'linear-gradient(to bottom, var(--ds-color-neutral-surface-subtle) 0%, var(--ds-color-neutral-surface-default) 100%)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
        position: 'relative',
      }}
    >
      {/* Subtle top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: borders.width.thin,
          background:
            'linear-gradient(to right, transparent, var(--ds-color-accent-base-default), transparent)',
          opacity: opacityTokens.subtle,
        }}
      />
      {/* Step text indicator - Enhanced */}
      <Paragraph
        data-size="sm"
        style={{
          margin: 0,
          color: 'var(--ds-color-neutral-text-default)',
          textAlign: 'center',
          fontWeight: 'var(--ds-font-weight-semibold)',
          fontSize: 'var(--ds-font-size-sm)',
          letterSpacing: typography.letterSpacing.wide,
          textTransform: 'uppercase',
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
        height: '100vh',
        maxHeight: '100vh',
        borderRadius: 'var(--ds-border-radius-2xl)',
        padding: 0,
        margin: 0,
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        boxShadow: shadows.modalPremium,
        overflow: 'hidden',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        transition: transitions.modal,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Modal Header - Compact & Enriched */}
      <div
        style={{
          padding: spacingTokens.modal.header.compact.padding,
          borderBottom: 'var(--ds-border-width-medium) solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          gap: spacingTokens.modal.header.compact.gap,
          position: 'relative',
          flexShrink: 0,
          width: '100%',
        }}
      >
        {/* Subtle accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 'var(--ds-border-width-medium)',
            background: `linear-gradient(to right, transparent, var(--ds-color-accent-base-default), transparent)`,
            opacity: opacityTokens.subtle,
          }}
        />
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: 'relative',
            zIndex: 1,
            paddingRight: 'var(--ds-spacing-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-1)',
          }}
        >
          <Heading
            level={2}
            data-size="md"
            style={{
              margin: 0,
              fontSize: 'var(--ds-font-size-lg)',
              fontWeight: typography.fontWeight.semibold,
              lineHeight: typography.lineHeight.tight,
              color: 'var(--ds-color-neutral-text-default)',
              letterSpacing: typography.letterSpacing.tight,
            }}
          >
            {title}
          </Heading>
          {subtitle && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                lineHeight: typography.lineHeight.normal,
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              {subtitle}
            </Paragraph>
          )}
        </div>
        <Button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          data-color="neutral"
          variant="tertiary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'var(--ds-spacing-9)',
            height: 'var(--ds-spacing-9)',
            minWidth: 'var(--ds-spacing-9)',
            maxWidth: 'var(--ds-spacing-9)',
            padding: 0,
            borderRadius: 'var(--ds-border-radius-md)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            color: 'var(--ds-color-neutral-text-subtle)',
            cursor: 'pointer',
            transition: transitions.button,
            flexShrink: 0,
            border: 'var(--ds-border-width-default) solid var(--ds-color-neutral-border-subtle)',
            boxShadow: shadows.elevation1,
            position: 'relative',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-surface-hover)';
            e.currentTarget.style.color = 'var(--ds-color-neutral-text-default)';
            e.currentTarget.style.boxShadow = shadows.elevation2;
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'var(--ds-color-neutral-border-default)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-surface-default)';
            e.currentTarget.style.color = 'var(--ds-color-neutral-text-subtle)';
            e.currentTarget.style.boxShadow = shadows.elevation1;
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--ds-color-neutral-border-subtle)';
          }}
        >
          <CloseIcon size={18} />
        </Button>
      </div>

      {/* Step Indicator - Premium Enhanced */}
      {steps.length > 1 && (
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <StepIndicatorBar
            steps={steps}
            currentStep={currentStep}
            stepIndicatorLabel={mergedLabels.stepIndicator}
            optionalLabel={mergedLabels.optional}
          />
        </div>
      )}

      {/* Main Content Area - Scrollable */}
      <div
        style={{
          display: 'flex',
          minHeight: 0,
          flex: 1,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {/* Step Content - Compact & Scrollable */}
        <div
          style={{
            flex: 1,
            padding: spacingTokens.modal.content.compact.padding,
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            position: 'relative',
            minHeight: 0,
          }}
        >
          {/* Step title and description - Compact */}
          {(currentStepData?.title || currentStepData?.description) && (
            <div
              style={{
                marginBottom: spacingTokens.modal.section.compact.gap,
                paddingBottom: 'var(--ds-spacing-4)',
                borderBottom:
                  'var(--ds-border-width-medium) solid var(--ds-color-neutral-border-subtle)',
                position: 'relative',
              }}
            >
              {/* Accent line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: `calc(-1 * var(--ds-border-width-medium))`,
                  left: 0,
                  width: 'var(--ds-spacing-12)',
                  height: 'var(--ds-border-width-medium)',
                  backgroundColor: 'var(--ds-color-accent-base-default)',
                  borderRadius: 'var(--ds-border-radius-full)',
                }}
              />
              {currentStepData.title && steps.length === 1 && (
                <Heading
                  level={3}
                  data-size="sm"
                  style={{
                    margin: 0,
                    fontSize: 'var(--ds-font-size-lg)',
                    fontWeight: typography.fontWeight.semibold,
                    color: 'var(--ds-color-neutral-text-default)',
                    letterSpacing: typography.letterSpacing.tight,
                    lineHeight: typography.lineHeight.tight,
                  }}
                >
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
                    lineHeight: typography.lineHeight.normal,
                    fontSize: 'var(--ds-font-size-sm)',
                  }}
                >
                  {currentStepData.description}
                </Paragraph>
              )}
            </div>
          )}

          {/* Step content with enhanced spacing */}
          <div
            style={{
              minHeight: components.card.minHeight.md,
              paddingTop:
                currentStepData?.title || currentStepData?.description ? 0 : 'var(--ds-spacing-2)',
            }}
          >
            {currentStepData?.content}
          </div>
        </div>

        {/* Sidebar - Compact & Scrollable */}
        {displaySidebar && (
          <div
            style={{
              width: '320px',
              flexShrink: 0,
              padding: spacingTokens.modal.content.compact.padding,
              backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
              borderLeft:
                'var(--ds-border-width-medium) solid var(--ds-color-neutral-border-subtle)',
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '100%',
              position: 'relative',
              minHeight: 0,
            }}
          >
            {/* Subtle left border accent */}
            <div
              style={{
                position: 'absolute',
                left: `calc(-1 * var(--ds-border-width-medium))`,
                top: 0,
                bottom: 0,
                width: 'var(--ds-border-width-medium)',
                background: `linear-gradient(to bottom, transparent, var(--ds-color-accent-base-default), transparent)`,
                opacity: opacityTokens.light,
              }}
            />
            {sidebar}
          </div>
        )}
      </div>

      {/* Modal Footer - Compact & Enriched */}
      <div
        style={{
          padding: spacingTokens.modal.footer.compact.padding,
          borderTop: 'var(--ds-border-width-medium) solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
          gap: spacingTokens.modal.footer.compact.gap,
          flexWrap: 'wrap',
          position: 'relative',
          flexShrink: 0,
          width: '100%',
        }}
      >
        {/* Subtle top border accent */}
        <div
          style={{
            position: 'absolute',
            top: `calc(-1 * var(--ds-border-width-medium))`,
            left: 0,
            right: 0,
            height: 'var(--ds-border-width-medium)',
            background: `linear-gradient(to right, transparent, var(--ds-color-accent-base-default), transparent)`,
            opacity: opacityTokens.light,
          }}
        />
        {/* Left side: Cancel and Back - Enhanced */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Button
            type="button"
            variant="tertiary"
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              minWidth: 'auto',
              transition: transitions.button,
              padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = shadows.elevation1;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
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
                gap: 'var(--ds-spacing-2)',
                minWidth: 'auto',
                transition: transitions.button,
                padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = shadows.elevation2;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ChevronLeftIcon size={16} />
              {mergedLabels.back}
            </Button>
          )}
        </div>

        {/* Right side: Next or Submit - Compact & Enriched */}
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
            minWidth: '120px',
            justifyContent: 'center',
            padding: 'var(--ds-spacing-3) var(--ds-spacing-5)',
            fontWeight: typography.fontWeight.semibold,
            transition: transitions.button,
            boxShadow: shadows.elevation2,
            position: 'relative',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting && canProceed) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = shadows.elevation3;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = shadows.elevation2;
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
                  flexShrink: 0,
                }}
              />
              <span>{isLastStep ? mergedLabels.submit : mergedLabels.next}</span>
            </>
          ) : (
            <>
              <span>{isLastStep ? mergedLabels.submit : mergedLabels.next}</span>
              {!isLastStep && <ChevronRightIcon size={16} />}
            </>
          )}
        </Button>
      </div>

      {/* Modal Styles - Premium Enhanced */}
      <style>{`
        .multi-step-form-modal::backdrop {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          backdrop-filter: blur(8px) saturate(180%);
          animation: backdrop-fade-in ${animation.duration.normal} ${animation.easing.smoothOut};
        }
        
        .multi-step-form-modal button:focus-visible {
          outline: 3px solid var(--ds-color-accent-base-default);
          outline-offset: 3px;
          border-radius: var(--ds-border-radius-md);
        }

        .multi-step-form-modal[open] {
          animation: modal-enter-premium ${animation.duration.slow} ${animation.easing.smooth};
        }

        @keyframes modal-enter-premium {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.96);
            filter: blur(4px);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes backdrop-fade-in {
          from {
            opacity: 0;
            backdrop-filter: blur(0) saturate(100%);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px) saturate(180%);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
        
        /* Smooth scrollbar styling */
        .multi-step-form-modal div[style*="overflow-y: auto"]::-webkit-scrollbar {
          width: 0.5rem; /* 8px */
        }
        
        .multi-step-form-modal div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
          background: var(--ds-color-neutral-surface-subtle);
          border-radius: var(--ds-border-radius-full);
        }
        
        .multi-step-form-modal div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
          background: var(--ds-color-neutral-border-default);
          border-radius: var(--ds-border-radius-full);
          transition: background ${animation.duration.fast} ${animation.easing.default};
        }
        
        .multi-step-form-modal div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb:hover {
          background: var(--ds-color-neutral-text-subtle);
        }

        /* Enhanced focus states */
        .multi-step-form-modal *:focus-visible {
          outline: 2px solid var(--ds-color-accent-base-default);
          outline-offset: 2px;
          border-radius: var(--ds-border-radius-sm);
        }
        
        /* Smooth transitions for all interactive elements */
        .multi-step-form-modal button,
        .multi-step-form-modal [role="button"] {
          transition: ${transitions.button};
        }
        
        /* Enhanced hover effects */
        .multi-step-form-modal button:not(:disabled):hover {
          cursor: pointer;
        }
        
        /* Ensure modal fills viewport properly */
        .multi-step-form-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .multi-step-form-modal[open] {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        @media (max-width: 768px) {
          .multi-step-form-modal {
            max-width: 100vw !important;
            width: 100vw !important;
            max-height: 100vh !important;
            height: 100vh !important;
            border-radius: 0 !important;
            border: none !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
          }
          
          .multi-step-form-modal[open] {
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
          }
          
          .multi-step-form-modal > div:first-child {
            padding: var(--ds-spacing-5) var(--ds-spacing-5) var(--ds-spacing-4) !important;
          }
          
          .multi-step-form-modal > div:last-child {
            padding: var(--ds-spacing-5) !important;
            flex-wrap: wrap;
          }
          
          .multi-step-form-modal > div:last-child > div:first-child,
          .multi-step-form-modal > div:last-child > button {
            width: 100%;
            justify-content: center;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .multi-step-form-modal,
          .multi-step-form-modal *,
          .multi-step-form-modal::backdrop {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </Dialog>
  );
}

export default MultiStepFormModal;
