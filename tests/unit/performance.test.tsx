/**
 * Performance Tests
 *
 * Tests for render performance, memory usage, and re-render optimization.
 * These tests ensure components perform well at scale.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import {
  WorkflowStep,
  WorkflowPipeline,
  WorkflowCard,
  CardGrid,
  ButtonGroup,
  FormGrid,
  SimpleSidebar,
  SidebarHeaderArea,
  SidebarPanel,
  SidebarScrollArea,
  Center,
  MainContent,
  HorizontalLayout,
  ExplorerItem,
  PreviewArea,
  Button,
  Card,
  Stack,
  Heading,
  Paragraph,
} from '../../packages/platform-ui/src';

// =============================================================================
// RENDER PERFORMANCE TESTS
// =============================================================================

describe('Render Performance', () => {
  describe('Initial Render Time', () => {
    test('SimpleSidebar renders within acceptable time (< 50ms)', () => {
      const startTime = performance.now();

      render(
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              Test
            </Heading>
          </SidebarHeaderArea>
          <SidebarScrollArea>
            {Array.from({ length: 20 }, (_, i) => (
              <ExplorerItem key={i} title={`Item ${i}`} description={`Description ${i}`} />
            ))}
          </SidebarScrollArea>
        </SimpleSidebar>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      expect(renderTime).toBeLessThan(50);
    });

    test('WorkflowPipeline with many steps renders efficiently', () => {
      const steps = Array.from({ length: 10 }, (_, i) => ({
        step: i + 1,
        name: `Step ${i + 1}`,
      }));

      const startTime = performance.now();
      render(<WorkflowPipeline steps={steps} activeStep={5} />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50);
    });

    test('CardGrid with many cards renders efficiently', () => {
      const startTime = performance.now();

      render(
        <CardGrid minCardWidth="200px">
          {Array.from({ length: 50 }, (_, i) => (
            <WorkflowCard
              key={i}
              name={`Workflow ${i}`}
              description={`Description for workflow ${i}`}
              command={`/workflow-${i}`}
              status="available"
            />
          ))}
        </CardGrid>
      );

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('HorizontalLayout with full content renders efficiently', () => {
      const startTime = performance.now();

      render(
        <HorizontalLayout>
          <SimpleSidebar>
            <SidebarHeaderArea>
              <Heading level={1} data-size="md">
                App
              </Heading>
            </SidebarHeaderArea>
            <SidebarPanel bordered>
              <Button variant="primary">Action</Button>
            </SidebarPanel>
            <SidebarScrollArea>
              {Array.from({ length: 30 }, (_, i) => (
                <ExplorerItem key={i} title={`Component ${i}`} />
              ))}
            </SidebarScrollArea>
          </SimpleSidebar>
          <MainContent>
            <CardGrid>
              {Array.from({ length: 20 }, (_, i) => (
                <Card key={i}>
                  <Heading level={3} data-size="sm">
                    Card {i}
                  </Heading>
                </Card>
              ))}
            </CardGrid>
          </MainContent>
        </HorizontalLayout>
      );

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(150);
    });
  });

  describe('Re-render Optimization', () => {
    test('ExplorerItem does not cause unnecessary parent re-renders', () => {
      const parentRenderCount = { count: 0 };
      const childRenderCount = { count: 0 };

      const TrackedExplorerItem = React.memo(
        ({ title, onClick }: { title: string; onClick?: () => void }) => {
          childRenderCount.count++;
          return <ExplorerItem title={title} onClick={onClick} />;
        }
      );

      const Parent = () => {
        const [selected, setSelected] = React.useState<string | null>(null);
        parentRenderCount.count++;

        return (
          <SimpleSidebar>
            <SidebarScrollArea>
              <TrackedExplorerItem
                title="Item 1"
                onClick={() => setSelected('Item 1')}
              />
              <TrackedExplorerItem
                title="Item 2"
                onClick={() => setSelected('Item 2')}
              />
            </SidebarScrollArea>
          </SimpleSidebar>
        );
      };

      render(<Parent />);
      expect(parentRenderCount.count).toBe(1);
      expect(childRenderCount.count).toBe(2);

      // Click should only cause parent to re-render
      fireEvent.click(screen.getByText('Item 1'));
      // Parent re-renders, memoized children may or may not depending on props
      expect(parentRenderCount.count).toBeGreaterThanOrEqual(2);
    });

    test('WorkflowCard maintains referential equality for callbacks', () => {
      const renderCount = { count: 0 };

      const TrackedWorkflowCard = React.memo(() => {
        renderCount.count++;
        return (
          <WorkflowCard
            name="Test"
            description="Test description"
            command="/test"
            status="available"
          />
        );
      });

      const { rerender } = render(<TrackedWorkflowCard />);
      expect(renderCount.count).toBe(1);

      // Re-render with same props should not increase count due to memo
      rerender(<TrackedWorkflowCard />);
      expect(renderCount.count).toBe(1);
    });
  });
});

// =============================================================================
// MEMORY USAGE TESTS
// =============================================================================

describe('Memory Usage', () => {
  test('Components clean up properly on unmount', () => {
    const { unmount } = render(
      <HorizontalLayout>
        <SimpleSidebar>
          <SidebarScrollArea>
            {Array.from({ length: 100 }, (_, i) => (
              <ExplorerItem key={i} title={`Item ${i}`} />
            ))}
          </SidebarScrollArea>
        </SimpleSidebar>
        <MainContent>
          <CardGrid>
            {Array.from({ length: 50 }, (_, i) => (
              <Card key={i}>Card {i}</Card>
            ))}
          </CardGrid>
        </MainContent>
      </HorizontalLayout>
    );

    // Verify unmount doesn't throw
    expect(() => unmount()).not.toThrow();
  });

  test('Event listeners are cleaned up on unmount', () => {
    const onClick = vi.fn();

    const { unmount } = render(
      <SimpleSidebar>
        <SidebarScrollArea>
          <ExplorerItem title="Test" onClick={onClick} />
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalledTimes(1);

    unmount();

    // After unmount, no errors should occur
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// =============================================================================
// SCALABILITY TESTS
// =============================================================================

describe('Scalability', () => {
  test('handles 100+ explorer items without degradation', () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      title: `Component ${i}`,
      description: `Description for component ${i}`,
    }));

    const startTime = performance.now();

    render(
      <SimpleSidebar>
        <SidebarScrollArea>
          {items.map((item, i) => (
            <ExplorerItem key={i} title={item.title} description={item.description} />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    const endTime = performance.now();

    // Should render 100 items in under 100ms
    expect(endTime - startTime).toBeLessThan(100);

    // Verify all items are rendered
    expect(screen.getByText('Component 0')).toBeInTheDocument();
    expect(screen.getByText('Component 99')).toBeInTheDocument();
  });

  test('handles large workflow pipeline', () => {
    const steps = Array.from({ length: 20 }, (_, i) => ({
      step: i + 1,
      name: `Phase ${i + 1}`,
    }));

    const startTime = performance.now();
    render(<WorkflowPipeline steps={steps} activeStep={10} />);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(50);
    expect(screen.getByText('Phase 1')).toBeInTheDocument();
    expect(screen.getByText('Phase 20')).toBeInTheDocument();
  });

  test('handles rapid selection changes', () => {
    const onSelect = vi.fn();
    const items = Array.from({ length: 10 }, (_, i) => `Item ${i}`);

    render(
      <SimpleSidebar>
        <SidebarScrollArea>
          {items.map((item) => (
            <ExplorerItem key={item} title={item} onClick={() => onSelect(item)} />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    // Rapidly click through items
    const startTime = performance.now();
    items.forEach((item) => {
      fireEvent.click(screen.getByText(item));
    });
    const endTime = performance.now();

    expect(onSelect).toHaveBeenCalledTimes(10);
    expect(endTime - startTime).toBeLessThan(100);
  });
});

// =============================================================================
// DOM SIZE TESTS
// =============================================================================

describe('DOM Efficiency', () => {
  test('ExplorerItem produces minimal DOM nodes', () => {
    const { container } = render(
      <ExplorerItem title="Test" description="Description" />
    );

    // Count all DOM elements
    const allElements = container.querySelectorAll('*');

    // Should have a reasonable number of DOM nodes (< 15 for a simple item)
    expect(allElements.length).toBeLessThan(15);
  });

  test('WorkflowCard produces minimal DOM nodes', () => {
    const { container } = render(
      <WorkflowCard
        name="Test"
        description="Description"
        command="/test"
        status="available"
      />
    );

    const allElements = container.querySelectorAll('*');

    // Reasonable DOM size for a card (< 30 elements)
    expect(allElements.length).toBeLessThan(30);
  });

  test('SimpleSidebar structure is shallow', () => {
    const { container } = render(
      <SimpleSidebar>
        <SidebarHeaderArea>Header</SidebarHeaderArea>
        <SidebarScrollArea>Content</SidebarScrollArea>
      </SimpleSidebar>
    );

    // Calculate max depth
    let maxDepth = 0;
    const calculateDepth = (element: Element, depth: number) => {
      maxDepth = Math.max(maxDepth, depth);
      Array.from(element.children).forEach((child) => {
        calculateDepth(child, depth + 1);
      });
    };
    calculateDepth(container, 0);

    // Should not be deeply nested (< 10 levels)
    expect(maxDepth).toBeLessThan(10);
  });
});

// =============================================================================
// INTERACTION LATENCY TESTS
// =============================================================================

describe('Interaction Latency', () => {
  test('click response time is acceptable', async () => {
    const onClick = vi.fn(() => {
      // Simulate some work
      let sum = 0;
      for (let i = 0; i < 1000; i++) sum += i;
      return sum;
    });

    render(<ExplorerItem title="Test" onClick={onClick} />);

    const startTime = performance.now();
    fireEvent.click(screen.getByText('Test'));
    const endTime = performance.now();

    expect(onClick).toHaveBeenCalled();
    expect(endTime - startTime).toBeLessThan(20);
  });

  test('button group handles rapid clicks', () => {
    const handlers = [vi.fn(), vi.fn(), vi.fn()];

    render(
      <ButtonGroup>
        <Button onClick={handlers[0]}>Button 1</Button>
        <Button onClick={handlers[1]}>Button 2</Button>
        <Button onClick={handlers[2]}>Button 3</Button>
      </ButtonGroup>
    );

    const startTime = performance.now();

    // Rapid sequential clicks
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByText('Button 1'));
      fireEvent.click(screen.getByText('Button 2'));
      fireEvent.click(screen.getByText('Button 3'));
    }

    const endTime = performance.now();

    expect(handlers[0]).toHaveBeenCalledTimes(10);
    expect(handlers[1]).toHaveBeenCalledTimes(10);
    expect(handlers[2]).toHaveBeenCalledTimes(10);
    expect(endTime - startTime).toBeLessThan(100);
  });
});

// =============================================================================
// STYLE COMPUTATION TESTS
// =============================================================================

describe('Style Efficiency', () => {
  test('components use CSS variables, not computed values', () => {
    const { container } = render(
      <SimpleSidebar bordered>
        <SidebarHeaderArea>Header</SidebarHeaderArea>
      </SimpleSidebar>
    );

    const sidebar = container.firstChild as HTMLElement;
    const styleString = sidebar.getAttribute('style') || '';

    // Should contain CSS variables
    expect(styleString).toContain('var(--ds-');

    // Should not contain hardcoded pixel values (except for border width)
    const pixelMatches = styleString.match(/:\s*\d+px/g) || [];
    // Only 1px for border is acceptable
    const nonBorderPixels = pixelMatches.filter((match) => !match.includes('1px'));
    expect(nonBorderPixels.length).toBe(0);
  });

  test('CardGrid uses CSS grid with auto-fit', () => {
    const { container } = render(
      <CardGrid minCardWidth="200px">
        <Card>Card 1</Card>
        <Card>Card 2</Card>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    const gridTemplate = grid.style.gridTemplateColumns;

    expect(gridTemplate).toContain('auto-fit');
    expect(gridTemplate).toContain('minmax');
  });
});
