/**
 * Unit Tests for ReviewStep
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import { ReviewStep } from '../../../packages/platform-ui/src/patterns/ReviewStep';
import type { ReviewStepProps } from '../../../packages/platform-ui/src/patterns/ReviewStep';

const defaultSections = [
  {
    id: 'section1',
    title: 'Section 1',
    items: [
      { label: 'Label 1', value: 'Value 1' },
      { label: 'Label 2', value: 'Value 2' },
    ],
  },
  {
    id: 'section2',
    title: 'Section 2',
    items: [
      { label: 'Label 3', value: 'Value 3' },
    ],
  },
];

const defaultProps: ReviewStepProps = {
  title: 'Review Your Booking',
  message: 'Please verify all details',
  sections: defaultSections,
};

describe('ReviewStep', () => {
  it('renders title when provided', () => {
    render(<ReviewStep {...defaultProps} />);
    expect(screen.getByText('Review Your Booking')).toBeInTheDocument();
  });

  it('renders message when provided', () => {
    render(<ReviewStep {...defaultProps} />);
    expect(screen.getByText('Please verify all details')).toBeInTheDocument();
  });

  it('renders all sections', () => {
    render(<ReviewStep {...defaultProps} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('renders all items in sections', () => {
    render(<ReviewStep {...defaultProps} />);
    expect(screen.getByText('Label 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Label 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
    expect(screen.getByText('Label 3')).toBeInTheDocument();
    expect(screen.getByText('Value 3')).toBeInTheDocument();
  });

  it('renders edit button when onEdit is provided', () => {
    const sectionsWithEdit = [
      {
        ...defaultSections[0],
        onEdit: vi.fn(),
        editLabel: 'Edit',
      },
    ];
    render(<ReviewStep {...defaultProps} sections={sectionsWithEdit} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const handleEdit = vi.fn();
    const sectionsWithEdit = [
      {
        ...defaultSections[0],
        onEdit: handleEdit,
        editLabel: 'Edit',
      },
    ];
    render(<ReviewStep {...defaultProps} sections={sectionsWithEdit} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalled();
  });

  it('renders terms checkbox when provided', () => {
    const props: ReviewStepProps = {
      ...defaultProps,
      terms: {
        label: 'I agree to the terms',
        checked: false,
        onChange: vi.fn(),
      },
    };
    render(<ReviewStep {...props} />);
    expect(screen.getByLabelText('I agree to the terms')).toBeInTheDocument();
  });

  it('calls onChange when terms checkbox is changed', () => {
    const handleChange = vi.fn();
    const props: ReviewStepProps = {
      ...defaultProps,
      terms: {
        label: 'I agree to the terms',
        checked: false,
        onChange: handleChange,
      },
    };
    render(<ReviewStep {...props} />);
    const checkbox = screen.getByLabelText('I agree to the terms');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('shows error message when terms error is provided', () => {
    const props: ReviewStepProps = {
      ...defaultProps,
      terms: {
        label: 'I agree to the terms',
        checked: false,
        onChange: vi.fn(),
        error: 'You must agree to the terms',
      },
    };
    render(<ReviewStep {...props} />);
    expect(screen.getByText('You must agree to the terms')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
    render(<ReviewStep {...defaultProps} icon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders default icon when icon is not provided', () => {
    const { container } = render(<ReviewStep {...defaultProps} />);
    // Check for SVG element (default CheckCircleIcon)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <ReviewStep {...defaultProps}>
        <div data-testid="custom-content">Custom Content</div>
      </ReviewStep>
    );
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('renders items with icons when provided', () => {
    const sectionsWithIcons = [
      {
        id: 'section1',
        title: 'Section 1',
        items: [
          {
            label: 'Label 1',
            value: 'Value 1',
            icon: <span data-testid="item-icon">Icon</span>,
          },
        ],
      },
    ];
    render(<ReviewStep {...defaultProps} sections={sectionsWithIcons} />);
    expect(screen.getByTestId('item-icon')).toBeInTheDocument();
  });

  it('renders section icons when provided', () => {
    const sectionsWithIcons = [
      {
        id: 'section1',
        title: 'Section 1',
        icon: <span data-testid="section-icon">Icon</span>,
        items: [{ label: 'Label 1', value: 'Value 1' }],
      },
    ];
    render(<ReviewStep {...defaultProps} sections={sectionsWithIcons} />);
    expect(screen.getByTestId('section-icon')).toBeInTheDocument();
  });
});
