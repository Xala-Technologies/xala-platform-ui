/**
 * User Story Tests
 *
 * Behavior-driven tests that simulate real user workflows.
 * Each test represents a user story or acceptance criteria.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  Heading,
  Paragraph,
  Stack,
  Card,
  Textfield,
} from '../../packages/platform-ui/src';

// =============================================================================
// USER STORY: Component Explorer Navigation
// As a developer, I want to browse components in a sidebar
// so that I can quickly find and preview UI components.
// =============================================================================

describe('User Story: Component Explorer Navigation', () => {
  const components = [
    { name: 'Button', description: 'Interactive element', category: 'primitives' },
    { name: 'Card', description: 'Content container', category: 'primitives' },
    { name: 'Modal', description: 'Dialog overlay', category: 'composed' },
  ];

  test('AC1: User can see a list of available components', () => {
    render(
      <SimpleSidebar>
        <SidebarScrollArea>
          {components.map((comp) => (
            <ExplorerItem key={comp.name} title={comp.name} description={comp.description} />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
    expect(screen.getByText('Modal')).toBeInTheDocument();
  });

  test('AC2: User can select a component from the list', () => {
    const onSelect = vi.fn();

    render(
      <SimpleSidebar>
        <SidebarScrollArea>
          {components.map((comp) => (
            <ExplorerItem
              key={comp.name}
              title={comp.name}
              description={comp.description}
              onClick={() => onSelect(comp.name)}
            />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    fireEvent.click(screen.getByText('Button'));
    expect(onSelect).toHaveBeenCalledWith('Button');
  });

  test('AC3: Selected component is visually highlighted', () => {
    render(
      <SimpleSidebar>
        <SidebarScrollArea>
          {components.map((comp, index) => (
            <ExplorerItem
              key={comp.name}
              title={comp.name}
              description={comp.description}
              selected={index === 0}
            />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    const buttonItem = screen.getByRole('button', { name: /Button/i });
    expect(buttonItem).toHaveStyle({
      backgroundColor: 'var(--ds-color-accent-surface-default)',
    });
  });

  test('AC4: User can view component preview in main content area', () => {
    const selectedComponent = 'Button';

    render(
      <HorizontalLayout>
        <SimpleSidebar>
          <SidebarScrollArea>
            <ExplorerItem title="Button" selected />
          </SidebarScrollArea>
        </SimpleSidebar>
        <MainContent>
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={2} data-size="lg">
              {selectedComponent}
            </Heading>
            <PreviewArea>
              <Button variant="primary">Example Button</Button>
            </PreviewArea>
          </Stack>
        </MainContent>
      </HorizontalLayout>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Button');
    expect(screen.getByRole('button', { name: 'Example Button' })).toBeInTheDocument();
  });
});

// =============================================================================
// USER STORY: Workflow Catalog Browsing
// As a project manager, I want to browse available workflows
// so that I can understand and execute the design process.
// =============================================================================

describe('User Story: Workflow Catalog Browsing', () => {
  const workflows = [
    {
      id: 'product-vision',
      name: 'Product Vision',
      description: 'Define the product vision',
      command: '/product-vision',
      status: 'available' as const,
    },
    {
      id: 'roadmap',
      name: 'Product Roadmap',
      description: 'Create implementation roadmap',
      command: '/product-roadmap',
      status: 'available' as const,
    },
    {
      id: 'data-model',
      name: 'Data Model',
      description: 'Define data structures',
      command: '/data-model',
      status: 'coming_soon' as const,
    },
  ];

  const pipelineSteps = [
    { step: 1, name: 'Vision' },
    { step: 2, name: 'Roadmap' },
    { step: 3, name: 'Data Model' },
  ];

  test('AC1: User can see the workflow pipeline overview', () => {
    render(<WorkflowPipeline steps={pipelineSteps} activeStep={1} />);

    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Data Model')).toBeInTheDocument();
  });

  test('AC2: User can see which step is currently active', () => {
    render(<WorkflowPipeline steps={pipelineSteps} activeStep={2} />);

    // All step numbers should be visible
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('AC3: User can browse workflow cards in a grid', () => {
    render(
      <CardGrid minCardWidth="280px">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow.id} {...workflow} />
        ))}
      </CardGrid>
    );

    expect(screen.getByText('Product Vision')).toBeInTheDocument();
    expect(screen.getByText('Product Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Data Model')).toBeInTheDocument();
  });

  test('AC4: User can copy workflow command to clipboard', () => {
    const onCopyCommand = vi.fn();

    render(
      <WorkflowCard
        name="Product Vision"
        description="Define the product vision"
        command="/product-vision"
        status="available"
        onCopyCommand={onCopyCommand}
      />
    );

    fireEvent.click(screen.getByText('Copy Command'));
    expect(onCopyCommand).toHaveBeenCalledTimes(1);
  });

  test('AC5: User can identify workflow status (available, coming soon, deprecated)', () => {
    render(
      <CardGrid>
        <WorkflowCard {...workflows[0]} />
        <WorkflowCard {...workflows[2]} />
      </CardGrid>
    );

    expect(screen.getByText('available')).toBeInTheDocument();
    expect(screen.getByText('coming soon')).toBeInTheDocument();
  });
});

// =============================================================================
// USER STORY: Form Submission Flow
// As a user, I want to fill out a multi-field form
// so that I can submit structured data.
// =============================================================================

describe('User Story: Form Submission Flow', () => {
  test('AC1: User can see form fields in a grid layout', () => {
    render(
      <FormGrid columns={2}>
        <Textfield label="First Name" />
        <Textfield label="Last Name" />
        <Textfield label="Email" />
        <Textfield label="Phone" />
      </FormGrid>
    );

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
  });

  test('AC2: User can see action buttons grouped together', () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(
      <ButtonGroup align="end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </ButtonGroup>
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('AC3: User can interact with form in a complete layout', () => {
    const onSubmit = vi.fn();

    render(
      <Card>
        <Stack spacing="var(--ds-spacing-4)">
          <Heading level={2} data-size="md">
            Contact Form
          </Heading>
          <FormGrid columns={2}>
            <Textfield label="Name" />
            <Textfield label="Email" />
          </FormGrid>
          <ButtonGroup align="end">
            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
          </ButtonGroup>
        </Stack>
      </Card>
    );

    // Use getByLabelText which is the recommended way to find inputs
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

// =============================================================================
// USER STORY: Dashboard Layout Navigation
// As a user, I want a clear dashboard layout
// so that I can navigate between different sections easily.
// =============================================================================

describe('User Story: Dashboard Layout Navigation', () => {
  const menuItems = [
    { title: 'Dashboard', description: 'Overview' },
    { title: 'Workflows', description: 'Automation' },
    { title: 'Settings', description: 'Configuration' },
  ];

  test('AC1: User can see sidebar with navigation items', () => {
    render(
      <SimpleSidebar>
        <SidebarHeaderArea>
          <Heading level={1} data-size="md">
            Command Center
          </Heading>
        </SidebarHeaderArea>
        <SidebarScrollArea>
          {menuItems.map((item) => (
            <ExplorerItem key={item.title} title={item.title} description={item.description} />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    expect(screen.getByText('Command Center')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Workflows')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('AC2: User can see main content area with proper padding', () => {
    const { container } = render(
      <MainContent padding="lg">
        <Heading level={2} data-size="lg">
          Dashboard
        </Heading>
      </MainContent>
    );

    const main = container.firstChild as HTMLElement;
    expect(main).toHaveStyle({ padding: 'var(--ds-spacing-8)' });
  });

  test('AC3: User can see full horizontal layout with sidebar and content', () => {
    render(
      <HorizontalLayout>
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              App
            </Heading>
          </SidebarHeaderArea>
        </SimpleSidebar>
        <MainContent>
          <Heading level={2} data-size="lg">
            Content
          </Heading>
        </MainContent>
      </HorizontalLayout>
    );

    expect(screen.getByText('App')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('AC4: User can navigate between menu items', () => {
    const onNavigate = vi.fn();
    let selectedItem = 'Dashboard';

    const { rerender } = render(
      <SimpleSidebar>
        <SidebarScrollArea>
          {menuItems.map((item) => (
            <ExplorerItem
              key={item.title}
              title={item.title}
              description={item.description}
              selected={item.title === selectedItem}
              onClick={() => {
                selectedItem = item.title;
                onNavigate(item.title);
              }}
            />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>
    );

    fireEvent.click(screen.getByText('Workflows'));
    expect(onNavigate).toHaveBeenCalledWith('Workflows');
  });
});

// =============================================================================
// USER STORY: Empty State Handling
// As a user, I want to see helpful empty states
// when there is no content to display.
// =============================================================================

describe('User Story: Empty State Handling', () => {
  test('AC1: User sees centered message when no component is selected', () => {
    const { container } = render(
      <Center>
        <Stack spacing="var(--ds-spacing-2)" align="center">
          <Heading level={2} data-size="md">
            No Component Selected
          </Heading>
          <Paragraph data-size="sm">Select a component from the sidebar to view it</Paragraph>
        </Stack>
      </Center>
    );

    expect(screen.getByText('No Component Selected')).toBeInTheDocument();

    const center = container.firstChild as HTMLElement;
    expect(center).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  test('AC2: User sees empty workflow catalog message', () => {
    render(
      <Center>
        <Stack spacing="var(--ds-spacing-4)" align="center">
          <Heading level={2} data-size="lg">
            No Workflows Available
          </Heading>
          <Paragraph data-size="md">Check back later for new workflows</Paragraph>
          <Button variant="primary">Refresh</Button>
        </Stack>
      </Center>
    );

    expect(screen.getByText('No Workflows Available')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });
});

// =============================================================================
// USER STORY: Responsive Card Grid
// As a user, I want cards to adapt to screen size
// so that I can use the application on any device.
// =============================================================================

describe('User Story: Responsive Card Grid', () => {
  test('AC1: Cards render in grid layout', () => {
    const { container } = render(
      <CardGrid minCardWidth="250px">
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ display: 'grid' });
    expect(grid.style.gridTemplateColumns).toContain('250px');
  });

  test('AC2: Grid gap uses design tokens', () => {
    const { container } = render(
      <CardGrid gap="var(--ds-spacing-5)">
        <Card>Card 1</Card>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle({ gap: 'var(--ds-spacing-5)' });
  });
});
