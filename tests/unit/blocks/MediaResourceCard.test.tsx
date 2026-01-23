/**
 * Unit Tests for MediaResourceCard
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import { MediaResourceCard } from '../../../packages/platform-ui/src/blocks/MediaResourceCard';
import type { MediaResourceCardProps } from '../../../packages/platform-ui/src/blocks/MediaResourceCard';

const defaultProps: MediaResourceCardProps = {
  id: 'test-card-1',
  title: 'Test Venue',
  subtitle: 'Test Category',
  description: 'Test description',
  image: {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
  },
};

describe('MediaResourceCard', () => {
  it('renders with required props', () => {
    render(<MediaResourceCard {...defaultProps} />);
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<MediaResourceCard {...defaultProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { description, ...propsWithoutDescription } = defaultProps;
    render(<MediaResourceCard {...propsWithoutDescription} />);
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('renders badges when provided', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      badges: [
        { id: '1', text: 'Badge 1', variant: 'neutral' },
        { id: '2', text: 'Badge 2', variant: 'accent' },
      ],
    };
    render(<MediaResourceCard {...props} />);
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
  });

  it('renders capacity when provided', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      capacity: { value: 5000, label: 'capacity' },
    };
    render(<MediaResourceCard {...props} />);
    expect(screen.getByText(/5000/)).toBeInTheDocument();
    expect(screen.getByText(/capacity/)).toBeInTheDocument();
  });

  it('renders location when provided', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      location: 'Downtown District',
    };
    render(<MediaResourceCard {...props} />);
    expect(screen.getByText('Downtown District')).toBeInTheDocument();
  });

  it('renders price when provided', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      price: { amount: '$150', unit: '/hour' },
    };
    render(<MediaResourceCard {...props} />);
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText('/hour')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    const props: MediaResourceCardProps = {
      ...defaultProps,
      onClick: handleClick,
    };
    render(<MediaResourceCard {...props} />);
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith('test-card-1');
  });

  it('calls onFavorite when favorite button is clicked', () => {
    const handleFavorite = vi.fn();
    const props: MediaResourceCardProps = {
      ...defaultProps,
      onFavorite: handleFavorite,
    };
    render(<MediaResourceCard {...props} />);
    const favoriteButton = screen.getByLabelText(/favorite/i);
    fireEvent.click(favoriteButton);
    expect(handleFavorite).toHaveBeenCalledWith('test-card-1');
  });

  it('shows favorited state when isFavorited is true', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      onFavorite: vi.fn(),
      isFavorited: true,
    };
    render(<MediaResourceCard {...props} />);
    const favoriteButton = screen.getByLabelText(/favorite/i);
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders grid variant by default', () => {
    const { container } = render(<MediaResourceCard {...defaultProps} />);
    expect(container.querySelector('.media-resource-card--grid')).toBeInTheDocument();
  });

  it('renders list variant when specified', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      variant: 'list',
    };
    const { container } = render(<MediaResourceCard {...props} />);
    expect(container.querySelector('.media-resource-card--list')).toBeInTheDocument();
  });

  it('renders featured variant when specified', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      variant: 'featured',
    };
    const { container } = render(<MediaResourceCard {...props} />);
    expect(container.querySelector('.media-resource-card--featured')).toBeInTheDocument();
  });

  it('renders status indicator when provided', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      status: { type: 'available', label: 'Available' },
    };
    render(<MediaResourceCard {...props} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('limits badges display based on maxBadges', () => {
    const props: MediaResourceCardProps = {
      ...defaultProps,
      badges: [
        { id: '1', text: 'Badge 1', variant: 'neutral' },
        { id: '2', text: 'Badge 2', variant: 'neutral' },
        { id: '3', text: 'Badge 3', variant: 'neutral' },
        { id: '4', text: 'Badge 4', variant: 'neutral' },
      ],
      maxBadges: 2,
      moreBadgesLabel: '+2 more',
    };
    render(<MediaResourceCard {...props} />);
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
    expect(screen.queryByText('Badge 3')).not.toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    const props: MediaResourceCardProps = {
      ...defaultProps,
      onClick: handleClick,
    };
    render(<MediaResourceCard {...props} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledWith('test-card-1');
  });
});
