/**
 * Unit Tests for PeriodCard
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import { PeriodCard } from '../../../packages/platform-ui/src/blocks/PeriodCard';
import type { PeriodCardProps } from '../../../packages/platform-ui/src/blocks/PeriodCard';

const defaultProps: PeriodCardProps = {
  id: 'test-period-1',
  title: 'Spring Season 2026',
  subtitle: 'Basketball League',
  description: 'Join our spring basketball league',
  period: {
    startDate: 'March 1, 2026',
    endDate: 'June 30, 2026',
    label: '4 months',
  },
  status: {
    type: 'upcoming',
    label: 'Registration Open',
  },
};

describe('PeriodCard', () => {
  it('renders with required props', () => {
    render(<PeriodCard {...defaultProps} />);
    expect(screen.getByText('Spring Season 2026')).toBeInTheDocument();
    expect(screen.getByText('Basketball League')).toBeInTheDocument();
    expect(screen.getByText('March 1, 2026')).toBeInTheDocument();
    expect(screen.getByText('June 30, 2026')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<PeriodCard {...defaultProps} />);
    expect(screen.getByText('Join our spring basketball league')).toBeInTheDocument();
  });

  it('renders status badge', () => {
    render(<PeriodCard {...defaultProps} />);
    expect(screen.getByText('Registration Open')).toBeInTheDocument();
  });

  it('renders period label when provided', () => {
    render(<PeriodCard {...defaultProps} />);
    expect(screen.getByText(/4 months/)).toBeInTheDocument();
  });

  it('renders deadline when provided', () => {
    const props: PeriodCardProps = {
      ...defaultProps,
      deadline: {
        date: 'February 28, 2026',
        label: 'Registration deadline',
      },
    };
    render(<PeriodCard {...props} />);
    expect(screen.getByText('Registration deadline')).toBeInTheDocument();
    expect(screen.getByText('February 28, 2026')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const props: PeriodCardProps = {
      ...defaultProps,
      image: {
        src: 'https://example.com/image.jpg',
        alt: 'Test image',
      },
    };
    render(<PeriodCard {...props} />);
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    const props: PeriodCardProps = {
      ...defaultProps,
      onClick: handleClick,
    };
    render(<PeriodCard {...props} />);
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith('test-period-1');
  });

  it('calls onAction when action button is clicked', () => {
    const handleAction = vi.fn();
    const props: PeriodCardProps = {
      ...defaultProps,
      onAction: handleAction,
      actionLabel: 'Register Now',
    };
    render(<PeriodCard {...props} />);
    const actionButton = screen.getByText('Register Now');
    fireEvent.click(actionButton);
    expect(handleAction).toHaveBeenCalledWith('test-period-1');
  });

  it('disables action button when actionDisabled is true', () => {
    const props: PeriodCardProps = {
      ...defaultProps,
      onAction: vi.fn(),
      actionLabel: 'Register Now',
      actionDisabled: true,
    };
    render(<PeriodCard {...props} />);
    const actionButton = screen.getByText('Register Now');
    expect(actionButton).toBeDisabled();
  });

  it('renders compact variant when specified', () => {
    const props: PeriodCardProps = {
      ...defaultProps,
      variant: 'compact',
    };
    const { container } = render(<PeriodCard {...props} />);
    expect(container.querySelector('.period-card--compact')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    const props: PeriodCardProps = {
      ...defaultProps,
      onClick: handleClick,
    };
    render(<PeriodCard {...props} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledWith('test-period-1');
  });

  it('renders different status types correctly', () => {
    const statuses: Array<PeriodCardProps['status']> = [
      { type: 'upcoming', label: 'Upcoming' },
      { type: 'active', label: 'Active' },
      { type: 'ending_soon', label: 'Ending Soon' },
      { type: 'ended', label: 'Ended' },
      { type: 'draft', label: 'Draft' },
      { type: 'cancelled', label: 'Cancelled' },
    ];

    statuses.forEach((status) => {
      const { unmount } = render(
        <PeriodCard {...defaultProps} status={status} />
      );
      expect(screen.getByText(status.label)).toBeInTheDocument();
      unmount();
    });
  });
});
