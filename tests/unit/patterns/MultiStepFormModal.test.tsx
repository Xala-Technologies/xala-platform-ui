/**
 * Unit Tests for MultiStepFormModal
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { MultiStepFormModal } from '../../../packages/platform-ui/src/patterns/MultiStepFormModal';
import type { MultiStepFormModalProps, FormStep } from '../../../packages/platform-ui/src/patterns/MultiStepFormModal';

const createSteps = (): FormStep[] => [
  {
    id: 'step1',
    title: 'Step 1',
    description: 'First step description',
    content: <div>Step 1 Content</div>,
  },
  {
    id: 'step2',
    title: 'Step 2',
    content: <div>Step 2 Content</div>,
  },
  {
    id: 'step3',
    title: 'Step 3',
    content: <div>Step 3 Content</div>,
    isOptional: true,
  },
];

const defaultProps: MultiStepFormModalProps = {
  open: true,
  title: 'Test Modal',
  steps: createSteps(),
  currentStep: 0,
  labels: {
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    cancel: 'Cancel',
    stepIndicator: 'Step {current} of {total}',
    optional: '(optional)',
  },
  onStepChange: vi.fn(),
  onSubmit: vi.fn(),
  onClose: vi.fn(),
};

describe('MultiStepFormModal', () => {
  it('renders modal when open is true', () => {
    render(<MultiStepFormModal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('does not render modal when open is false', () => {
    render(<MultiStepFormModal {...defaultProps} open={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders current step content', () => {
    render(<MultiStepFormModal {...defaultProps} />);
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();
  });

  it('renders step indicator', () => {
    render(<MultiStepFormModal {...defaultProps} />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('renders step titles in indicator', () => {
    render(<MultiStepFormModal {...defaultProps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('shows optional label for optional steps', () => {
    render(<MultiStepFormModal {...defaultProps} />);
    expect(screen.getByText('(optional)')).toBeInTheDocument();
  });

  it('calls onStepChange when next button is clicked', () => {
    const handleStepChange = vi.fn();
    render(
      <MultiStepFormModal {...defaultProps} onStepChange={handleStepChange} />
    );
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(handleStepChange).toHaveBeenCalledWith(1);
  });

  it('calls onStepChange when back button is clicked', () => {
    const handleStepChange = vi.fn();
    render(
      <MultiStepFormModal
        {...defaultProps}
        currentStep={1}
        onStepChange={handleStepChange}
      />
    );
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    expect(handleStepChange).toHaveBeenCalledWith(0);
  });

  it('calls onSubmit when submit button is clicked on last step', async () => {
    const handleSubmit = vi.fn();
    render(
      <MultiStepFormModal
        {...defaultProps}
        currentStep={2}
        onSubmit={handleSubmit}
      />
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it('calls onClose when cancel button is clicked', () => {
    const handleClose = vi.fn();
    render(<MultiStepFormModal {...defaultProps} onClose={handleClose} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<MultiStepFormModal {...defaultProps} onClose={handleClose} />);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('disables next button when canProceed is false', () => {
    render(<MultiStepFormModal {...defaultProps} canProceed={false} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('shows loading state when isSubmitting is true', () => {
    render(<MultiStepFormModal {...defaultProps} currentStep={2} isSubmitting={true} />);
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
  });

  it('renders sidebar when showSidebar is true', () => {
    const sidebarContent = <div>Sidebar Content</div>;
    render(
      <MultiStepFormModal
        {...defaultProps}
        sidebar={sidebarContent}
        showSidebar={true}
      />
    );
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
  });

  it('does not render sidebar when showSidebar is false', () => {
    const sidebarContent = <div>Sidebar Content</div>;
    render(
      <MultiStepFormModal
        {...defaultProps}
        sidebar={sidebarContent}
        showSidebar={false}
      />
    );
    expect(screen.queryByText('Sidebar Content')).not.toBeInTheDocument();
  });

  it('runs validation before proceeding to next step', async () => {
    const validateStep = vi.fn().mockResolvedValue(true);
    const steps: FormStep[] = [
      {
        id: 'step1',
        title: 'Step 1',
        content: <div>Step 1 Content</div>,
        validate: validateStep,
      },
    ];
    const handleStepChange = vi.fn();
    render(
      <MultiStepFormModal
        {...defaultProps}
        steps={steps}
        onStepChange={handleStepChange}
      />
    );
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(validateStep).toHaveBeenCalled();
      expect(handleStepChange).toHaveBeenCalled();
    });
  });

  it('does not proceed when validation fails', async () => {
    const validateStep = vi.fn().mockResolvedValue(false);
    const steps: FormStep[] = [
      {
        id: 'step1',
        title: 'Step 1',
        content: <div>Step 1 Content</div>,
        validate: validateStep,
      },
    ];
    const handleStepChange = vi.fn();
    render(
      <MultiStepFormModal
        {...defaultProps}
        steps={steps}
        onStepChange={handleStepChange}
      />
    );
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(validateStep).toHaveBeenCalled();
    });
    expect(handleStepChange).not.toHaveBeenCalled();
  });
});
