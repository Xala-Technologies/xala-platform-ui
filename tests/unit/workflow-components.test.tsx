/**
 * WorkflowComponents Unit Tests
 *
 * Tests for WorkflowStep, WorkflowPipeline, WorkflowCard, CardGrid, ButtonGroup, FormGrid
 */

import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  WorkflowStep,
  WorkflowPipeline,
  WorkflowCard,
  CardGrid,
  ButtonGroup,
  FormGrid,
  Button,
} from '../../packages/platform-ui/src';

describe('WorkflowStep', () => {
  test('renders step number and name', () => {
    render(<WorkflowStep step={1} name="Vision" />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Vision')).toBeInTheDocument();
  });

  test('renders with active state', () => {
    const { container } = render(<WorkflowStep step={2} name="Roadmap" active />);

    // Active step should have different background
    const stepElement = container.firstChild as HTMLElement;
    expect(stepElement).toHaveStyle({
      backgroundColor: 'var(--ds-color-accent-surface-hover)',
    });
  });

  test('renders with inactive state', () => {
    const { container } = render(<WorkflowStep step={1} name="Vision" active={false} />);

    const stepElement = container.firstChild as HTMLElement;
    expect(stepElement).toHaveStyle({
      backgroundColor: 'var(--ds-color-accent-surface-default)',
    });
  });
});

describe('WorkflowPipeline', () => {
  const mockSteps = [
    { step: 1, name: 'Vision' },
    { step: 2, name: 'Roadmap' },
    { step: 3, name: 'Data Model' },
  ];

  test('renders all steps', () => {
    render(<WorkflowPipeline steps={mockSteps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Data Model')).toBeInTheDocument();
  });

  test('highlights active step', () => {
    render(<WorkflowPipeline steps={mockSteps} activeStep={2} />);

    // Step 2 should be active
    const step2 = screen.getByText('2').closest('div');
    expect(step2).toBeTruthy();
  });

  test('renders arrow separators between steps', () => {
    const { container } = render(<WorkflowPipeline steps={mockSteps} />);

    // Should have arrows between steps (steps - 1 arrows)
    const arrows = container.querySelectorAll('svg');
    expect(arrows.length).toBe(mockSteps.length - 1);
  });
});

describe('WorkflowCard', () => {
  const defaultProps = {
    name: 'Product Vision',
    description: 'Define the product vision',
    command: '/product-vision',
    status: 'available' as const,
  };

  test('renders card with all props', () => {
    render(<WorkflowCard {...defaultProps} />);

    expect(screen.getByText('Product Vision')).toBeInTheDocument();
    expect(screen.getByText('Define the product vision')).toBeInTheDocument();
    expect(screen.getByText('/product-vision')).toBeInTheDocument();
    expect(screen.getByText('available')).toBeInTheDocument();
  });

  test('renders prerequisites when provided', () => {
    render(
      <WorkflowCard
        {...defaultProps}
        prerequisites={['product-vision', 'data-model']}
      />
    );

    expect(screen.getByText(/Prerequisites:/)).toBeInTheDocument();
    expect(screen.getByText(/product-vision, data-model/)).toBeInTheDocument();
  });

  test('calls onCopyCommand when copy button clicked', () => {
    const onCopyCommand = vi.fn();
    render(<WorkflowCard {...defaultProps} onCopyCommand={onCopyCommand} />);

    fireEvent.click(screen.getByText('Copy Command'));
    expect(onCopyCommand).toHaveBeenCalledTimes(1);
  });

  test('calls onViewDocs when view docs button clicked', () => {
    const onViewDocs = vi.fn();
    render(<WorkflowCard {...defaultProps} onViewDocs={onViewDocs} />);

    fireEvent.click(screen.getByText('View Docs'));
    expect(onViewDocs).toHaveBeenCalledTimes(1);
  });

  test('renders correct status badge for coming_soon', () => {
    render(<WorkflowCard {...defaultProps} status="coming_soon" />);

    expect(screen.getByText('coming soon')).toBeInTheDocument();
  });

  test('renders correct status badge for deprecated', () => {
    render(<WorkflowCard {...defaultProps} status="deprecated" />);

    expect(screen.getByText('deprecated')).toBeInTheDocument();
  });
});

describe('CardGrid', () => {
  test('renders children in grid layout', () => {
    const { container } = render(
      <CardGrid>
        <div data-testid="card-1">Card 1</div>
        <div data-testid="card-2">Card 2</div>
        <div data-testid="card-3">Card 3</div>
      </CardGrid>
    );

    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.getByTestId('card-3')).toBeInTheDocument();

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ display: 'grid' });
  });

  test('applies custom minCardWidth', () => {
    const { container } = render(
      <CardGrid minCardWidth="300px">
        <div>Card</div>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain('300px');
  });

  test('applies custom gap', () => {
    const { container } = render(
      <CardGrid gap="var(--ds-spacing-6)">
        <div>Card</div>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ gap: 'var(--ds-spacing-6)' });
  });
});

describe('ButtonGroup', () => {
  test('renders children horizontally', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );

    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveStyle({ display: 'flex' });
  });

  test('applies start alignment by default', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Button</Button>
      </ButtonGroup>
    );

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveStyle({ justifyContent: 'flex-start' });
  });

  test('applies center alignment', () => {
    const { container } = render(
      <ButtonGroup align="center">
        <Button>Button</Button>
      </ButtonGroup>
    );

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveStyle({ justifyContent: 'center' });
  });

  test('applies end alignment', () => {
    const { container } = render(
      <ButtonGroup align="end">
        <Button>Button</Button>
      </ButtonGroup>
    );

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveStyle({ justifyContent: 'flex-end' });
  });
});

describe('FormGrid', () => {
  test('renders with 2 columns by default', () => {
    const { container } = render(
      <FormGrid>
        <div>Field 1</div>
        <div>Field 2</div>
      </FormGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(2, 1fr)' });
  });

  test('renders with custom column count', () => {
    const { container } = render(
      <FormGrid columns={3}>
        <div>Field 1</div>
        <div>Field 2</div>
        <div>Field 3</div>
      </FormGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(3, 1fr)' });
  });

  test('applies custom gap', () => {
    const { container } = render(
      <FormGrid gap="var(--ds-spacing-6)">
        <div>Field</div>
      </FormGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ gap: 'var(--ds-spacing-6)' });
  });
});
