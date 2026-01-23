/**
 * Integration Tests for MultiStepFormModal
 *
 * Tests the complete flow of a multi-step form modal
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { MultiStepFormModal } from '../../../packages/platform-ui/src/patterns/MultiStepFormModal';
import { ReviewStep } from '../../../packages/platform-ui/src/patterns/ReviewStep';
import type { MultiStepFormModalProps, FormStep } from '../../../packages/platform-ui/src/patterns/MultiStepFormModal';

describe('MultiStepFormModal Integration', () => {
  let currentStep: number;
  let handleStepChange: ReturnType<typeof vi.fn>;
  let handleSubmit: ReturnType<typeof vi.fn>;
  let handleClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    currentStep = 0;
    handleStepChange = vi.fn((step: number) => {
      currentStep = step;
    });
    handleSubmit = vi.fn();
    handleClose = vi.fn();
  });

  const createSteps = (): FormStep[] => [
    {
      id: 'selection',
      title: 'Select Items',
      content: (
        <div>
          <input data-testid="item-input" placeholder="Enter item" />
        </div>
      ),
    },
    {
      id: 'details',
      title: 'Enter Details',
      content: (
        <div>
          <input data-testid="name-input" placeholder="Enter name" />
        </div>
      ),
    },
    {
      id: 'review',
      title: 'Review',
      content: (
        <ReviewStep
          sections={[
            {
              id: 'summary',
              title: 'Summary',
              items: [
                { label: 'Item', value: 'Test Item' },
                { label: 'Name', value: 'Test Name' },
              ],
            },
          ]}
        />
      ),
    },
  ];

  const getProps = (): MultiStepFormModalProps => ({
    open: true,
    title: 'Complete Booking',
    steps: createSteps(),
    currentStep,
    labels: {
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      cancel: 'Cancel',
      stepIndicator: 'Step {current} of {total}',
    },
    onStepChange: handleStepChange,
    onSubmit: handleSubmit,
    onClose: handleClose,
  });

  it('completes full multi-step flow', async () => {
    const { rerender } = render(<MultiStepFormModal {...getProps()} />);

    // Step 1: Select Items
    expect(screen.getByText('Select Items')).toBeInTheDocument();
    expect(screen.getByTestId('item-input')).toBeInTheDocument();

    // Navigate to step 2
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(handleStepChange).toHaveBeenCalledWith(1);
    });

    // Step 2: Enter Details
    currentStep = 1;
    rerender(<MultiStepFormModal {...getProps()} />);
    expect(screen.getByText('Enter Details')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();

    // Navigate to step 3
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(handleStepChange).toHaveBeenCalledWith(2);
    });

    // Step 3: Review
    currentStep = 2;
    rerender(<MultiStepFormModal {...getProps()} />);
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();

    // Submit
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it('allows navigation back through steps', async () => {
    currentStep = 2;
    const { rerender } = render(<MultiStepFormModal {...getProps()} />);

    // Go back to step 2
    fireEvent.click(screen.getByText('Back'));
    await waitFor(() => {
      expect(handleStepChange).toHaveBeenCalledWith(1);
    });

    currentStep = 1;
    rerender(<MultiStepFormModal {...getProps()} />);
    expect(screen.getByText('Enter Details')).toBeInTheDocument();

    // Go back to step 1
    fireEvent.click(screen.getByText('Back'));
    await waitFor(() => {
      expect(handleStepChange).toHaveBeenCalledWith(0);
    });
  });

  it('validates steps before proceeding', async () => {
    const validateStep = vi.fn().mockResolvedValue(true);
    const steps: FormStep[] = [
      {
        id: 'step1',
        title: 'Step 1',
        content: <div>Step 1</div>,
        validate: validateStep,
      },
      {
        id: 'step2',
        title: 'Step 2',
        content: <div>Step 2</div>,
      },
    ];

    const props: MultiStepFormModalProps = {
      ...getProps(),
      steps,
    };

    render(<MultiStepFormModal {...props} />);
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(validateStep).toHaveBeenCalled();
    });
  });

  it('prevents navigation when validation fails', async () => {
    const validateStep = vi.fn().mockResolvedValue(false);
    const steps: FormStep[] = [
      {
        id: 'step1',
        title: 'Step 1',
        content: <div>Step 1</div>,
        validate: validateStep,
      },
      {
        id: 'step2',
        title: 'Step 2',
        content: <div>Step 2</div>,
      },
    ];

    const props: MultiStepFormModalProps = {
      ...getProps(),
      steps,
    };

    render(<MultiStepFormModal {...props} />);
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(validateStep).toHaveBeenCalled();
    });

    // Should still be on step 1
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
  });
});
