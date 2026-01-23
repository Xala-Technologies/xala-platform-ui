/**
 * Layout Components Unit Tests
 *
 * Tests for SimpleSidebar, Center, MainContent, HorizontalLayout, ExplorerItem, PreviewArea
 */

import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  SimpleSidebar,
  SidebarHeaderArea,
  SidebarPanel,
  SidebarScrollArea,
  Center,
  MainContent,
  HorizontalLayout,
  ExplorerItem,
  PreviewArea,
  Heading,
  Paragraph,
} from '../../packages/platform-ui/src';

describe('SimpleSidebar', () => {
  test('renders children', () => {
    render(
      <SimpleSidebar>
        <div data-testid="sidebar-content">Content</div>
      </SimpleSidebar>
    );

    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
  });

  test('applies default width', () => {
    const { container } = render(
      <SimpleSidebar>
        <div>Content</div>
      </SimpleSidebar>
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveStyle({ width: 'var(--ds-sizing-80)' });
  });

  test('applies custom width', () => {
    const { container } = render(
      <SimpleSidebar width="400px">
        <div>Content</div>
      </SimpleSidebar>
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveStyle({ width: '400px' });
  });

  test('renders with border by default', () => {
    const { container } = render(
      <SimpleSidebar>
        <div>Content</div>
      </SimpleSidebar>
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveStyle({
      borderRight: '1px solid var(--ds-color-neutral-border-default)',
    });
  });

  test('renders without border when bordered is false', () => {
    const { container } = render(
      <SimpleSidebar bordered={false}>
        <div>Content</div>
      </SimpleSidebar>
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar.style.borderRight).toBeFalsy();
  });
});

describe('SidebarHeaderArea', () => {
  test('renders children with proper padding', () => {
    const { container } = render(
      <SidebarHeaderArea>
        <Heading level={1}>Title</Heading>
      </SidebarHeaderArea>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveStyle({
      padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
      borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
    });
  });
});

describe('SidebarPanel', () => {
  test('renders with padding', () => {
    const { container } = render(
      <SidebarPanel>
        <div>Panel Content</div>
      </SidebarPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle({ padding: 'var(--ds-spacing-4)' });
  });

  test('renders with border when bordered is true', () => {
    const { container } = render(
      <SidebarPanel bordered>
        <div>Panel Content</div>
      </SidebarPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle({
      borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
    });
  });
});

describe('SidebarScrollArea', () => {
  test('renders with flex: 1 and overflow: auto', () => {
    const { container } = render(
      <SidebarScrollArea>
        <div>Scrollable Content</div>
      </SidebarScrollArea>
    );

    const scrollArea = container.firstChild as HTMLElement;
    expect(scrollArea).toHaveStyle({
      flex: '1',
      overflow: 'auto',
    });
  });
});

describe('Center', () => {
  test('centers content both horizontally and vertically by default', () => {
    const { container } = render(
      <Center>
        <div>Centered</div>
      </Center>
    );

    const center = container.firstChild as HTMLElement;
    expect(center).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  test('centers only horizontally when axis is horizontal', () => {
    const { container } = render(
      <Center axis="horizontal">
        <div>Centered</div>
      </Center>
    );

    const center = container.firstChild as HTMLElement;
    expect(center).toHaveStyle({
      justifyContent: 'center',
      alignItems: 'flex-start',
    });
  });

  test('centers only vertically when axis is vertical', () => {
    const { container } = render(
      <Center axis="vertical">
        <div>Centered</div>
      </Center>
    );

    const center = container.firstChild as HTMLElement;
    expect(center).toHaveStyle({
      justifyContent: 'flex-start',
      alignItems: 'center',
    });
  });

  test('fills parent by default', () => {
    const { container } = render(
      <Center>
        <div>Centered</div>
      </Center>
    );

    const center = container.firstChild as HTMLElement;
    expect(center).toHaveStyle({
      height: '100%',
      width: '100%',
    });
  });
});

describe('MainContent', () => {
  test('renders with default padding', () => {
    const { container } = render(
      <MainContent>
        <div>Content</div>
      </MainContent>
    );

    const main = container.firstChild as HTMLElement;
    expect(main).toHaveStyle({
      padding: 'var(--ds-spacing-6)',
      flex: '1',
    });
  });

  test('renders with small padding', () => {
    const { container } = render(
      <MainContent padding="sm">
        <div>Content</div>
      </MainContent>
    );

    const main = container.firstChild as HTMLElement;
    expect(main).toHaveStyle({ padding: 'var(--ds-spacing-4)' });
  });

  test('renders with large padding', () => {
    const { container } = render(
      <MainContent padding="lg">
        <div>Content</div>
      </MainContent>
    );

    const main = container.firstChild as HTMLElement;
    expect(main).toHaveStyle({ padding: 'var(--ds-spacing-8)' });
  });

  test('renders with overflow auto by default', () => {
    const { container } = render(
      <MainContent>
        <div>Content</div>
      </MainContent>
    );

    const main = container.firstChild as HTMLElement;
    expect(main).toHaveStyle({ overflow: 'auto' });
  });
});

describe('HorizontalLayout', () => {
  test('renders with flex display and full height', () => {
    const { container } = render(
      <HorizontalLayout>
        <div>Content</div>
      </HorizontalLayout>
    );

    const layout = container.firstChild as HTMLElement;
    expect(layout).toHaveStyle({
      display: 'flex',
      height: '100vh',
    });
  });

  test('renders with default background', () => {
    const { container } = render(
      <HorizontalLayout>
        <div>Content</div>
      </HorizontalLayout>
    );

    const layout = container.firstChild as HTMLElement;
    expect(layout).toHaveStyle({
      backgroundColor: 'var(--ds-color-neutral-background-default)',
    });
  });

  test('renders without full height when disabled', () => {
    const { container } = render(
      <HorizontalLayout fullHeight={false}>
        <div>Content</div>
      </HorizontalLayout>
    );

    const layout = container.firstChild as HTMLElement;
    expect(layout.style.height).toBeFalsy();
  });
});

describe('ExplorerItem', () => {
  test('renders title and description', () => {
    render(<ExplorerItem title="Button" description="Interactive element" />);

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Interactive element')).toBeInTheDocument();
  });

  test('renders without description', () => {
    render(<ExplorerItem title="Button" />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const onClick = vi.fn();
    render(<ExplorerItem title="Button" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders with selected state', () => {
    render(<ExplorerItem title="Button" selected />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: 'var(--ds-color-accent-surface-default)',
    });
  });

  test('renders with unselected state', () => {
    render(<ExplorerItem title="Button" selected={false} />);

    const button = screen.getByRole('button');
    // When not selected, should NOT have accent surface background
    const styles = button.getAttribute('style') || '';
    expect(styles).not.toContain('var(--ds-color-accent-surface-default)');
  });

  test('renders with icon', () => {
    render(
      <ExplorerItem
        title="Button"
        icon={<span data-testid="icon">Icon</span>}
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

describe('PreviewArea', () => {
  test('renders children', () => {
    render(
      <PreviewArea>
        <div data-testid="preview-content">Preview Content</div>
      </PreviewArea>
    );

    expect(screen.getByTestId('preview-content')).toBeInTheDocument();
  });

  test('centers content by default', () => {
    const { container } = render(
      <PreviewArea>
        <div>Content</div>
      </PreviewArea>
    );

    // The inner div should have centering styles
    const innerDiv = container.querySelector('.ds-preview-area > div');
    expect(innerDiv).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  test('applies subtle background by default', () => {
    const { container } = render(
      <PreviewArea>
        <div>Content</div>
      </PreviewArea>
    );

    const innerDiv = container.querySelector('.ds-preview-area > div');
    expect(innerDiv).toHaveStyle({
      background: 'var(--ds-color-neutral-background-subtle)',
    });
  });

  test('applies custom min height', () => {
    const { container } = render(
      <PreviewArea minHeight="500px">
        <div>Content</div>
      </PreviewArea>
    );

    const innerDiv = container.querySelector('.ds-preview-area > div');
    expect(innerDiv).toHaveStyle({ minHeight: '500px' });
  });
});
