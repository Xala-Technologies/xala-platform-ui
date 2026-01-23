/**
 * Application Scenario Integration Tests
 *
 * Tests that simulate complete user workflows across multiple components.
 * These tests verify that components work together correctly.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  Textfield,
  Badge,
} from '../../packages/platform-ui/src';

// =============================================================================
// SCENARIO: Component Playground Application
// Tests the complete flow of the playground app
// =============================================================================

describe('Scenario: Component Playground Application', () => {
  interface Component {
    name: string;
    description: string;
    code: string;
  }

  const mockComponents: Component[] = [
    { name: 'Button', description: 'Interactive element', code: '<Button>Click</Button>' },
    { name: 'Card', description: 'Content container', code: '<Card>Content</Card>' },
    { name: 'Input', description: 'Text input field', code: '<Textfield />' },
  ];

  const PlaygroundApp = () => {
    const [selectedComponent, setSelectedComponent] = React.useState<string | null>(null);
    const selected = mockComponents.find((c) => c.name === selectedComponent);

    return (
      <HorizontalLayout>
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              Playground
            </Heading>
            <Paragraph data-size="sm">Component Explorer</Paragraph>
          </SidebarHeaderArea>

          <SidebarPanel bordered>
            <Button variant="primary" data-size="sm" style={{ width: '100%' }}>
              New Component
            </Button>
          </SidebarPanel>

          <SidebarScrollArea>
            {mockComponents.map((comp) => (
              <ExplorerItem
                key={comp.name}
                title={comp.name}
                description={comp.description}
                selected={comp.name === selectedComponent}
                onClick={() => setSelectedComponent(comp.name)}
              />
            ))}
          </SidebarScrollArea>
        </SimpleSidebar>

        <MainContent>
          {selected ? (
            <Stack spacing="var(--ds-spacing-4)">
              <Heading level={2} data-size="lg">
                {selected.name}
              </Heading>
              <Paragraph data-size="md">{selected.description}</Paragraph>
              <PreviewArea>
                <Button variant="primary">Example {selected.name}</Button>
              </PreviewArea>
            </Stack>
          ) : (
            <Center>
              <Stack spacing="var(--ds-spacing-2)" align="center">
                <Heading level={2} data-size="lg">
                  Welcome
                </Heading>
                <Paragraph data-size="md">Select a component to preview</Paragraph>
              </Stack>
            </Center>
          )}
        </MainContent>
      </HorizontalLayout>
    );
  };

  test('initial state shows welcome message', () => {
    render(<PlaygroundApp />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Select a component to preview')).toBeInTheDocument();
  });

  test('clicking component in sidebar shows preview', async () => {
    render(<PlaygroundApp />);

    // Click on Button component
    fireEvent.click(screen.getByText('Button'));

    // Should show Button details
    expect(screen.getByRole('heading', { level: 2, name: 'Button' })).toBeInTheDocument();
    // "Interactive element" appears in both sidebar and main content
    expect(screen.getAllByText('Interactive element').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Example Button')).toBeInTheDocument();
  });

  test('switching between components updates preview', async () => {
    render(<PlaygroundApp />);

    // Select Button
    fireEvent.click(screen.getByText('Button'));
    expect(screen.getByRole('heading', { level: 2, name: 'Button' })).toBeInTheDocument();

    // Switch to Card
    fireEvent.click(screen.getByText('Content container'));
    expect(screen.getByRole('heading', { level: 2, name: 'Card' })).toBeInTheDocument();

    // Switch to Input
    fireEvent.click(screen.getByText('Text input field'));
    expect(screen.getByRole('heading', { level: 2, name: 'Input' })).toBeInTheDocument();
  });

  test('selected component is highlighted in sidebar', () => {
    render(<PlaygroundApp />);

    // Select Button
    fireEvent.click(screen.getByText('Button'));

    // Find the Button explorer item and check it's selected
    const buttonItem = screen.getByRole('button', { name: /Button.*Interactive element/i });
    expect(buttonItem).toHaveStyle({
      backgroundColor: 'var(--ds-color-accent-surface-default)',
    });
  });
});

// =============================================================================
// SCENARIO: Command Center Workflow Catalog
// Tests the workflow catalog browsing and interaction
// =============================================================================

describe('Scenario: Command Center Workflow Catalog', () => {
  interface Workflow {
    id: string;
    name: string;
    description: string;
    command: string;
    status: 'available' | 'coming_soon' | 'deprecated';
    prerequisites?: string[];
  }

  const mockWorkflows: Workflow[] = [
    {
      id: 'product-vision',
      name: 'Product Vision',
      description: 'Define the product vision and goals',
      command: '/product-vision',
      status: 'available',
    },
    {
      id: 'roadmap',
      name: 'Product Roadmap',
      description: 'Create a detailed implementation roadmap',
      command: '/product-roadmap',
      status: 'available',
      prerequisites: ['product-vision'],
    },
    {
      id: 'data-model',
      name: 'Data Model',
      description: 'Define data structures and relationships',
      command: '/data-model',
      status: 'coming_soon',
      prerequisites: ['product-vision', 'product-roadmap'],
    },
  ];

  const pipelineSteps = [
    { step: 1, name: 'Vision' },
    { step: 2, name: 'Roadmap' },
    { step: 3, name: 'Data Model' },
    { step: 4, name: 'Section Spec' },
    { step: 5, name: 'Implementation' },
  ];

  const WorkflowCatalog = ({
    onCopyCommand,
    onViewDocs,
  }: {
    onCopyCommand?: (command: string) => void;
    onViewDocs?: (id: string) => void;
  }) => {
    const [activeStep, setActiveStep] = React.useState(1);

    return (
      <Stack spacing="var(--ds-spacing-6)">
        <Heading level={1} data-size="xl">
          Workflow Catalog
        </Heading>

        <Card>
          <WorkflowPipeline steps={pipelineSteps} activeStep={activeStep} />
        </Card>

        <CardGrid minCardWidth="300px">
          {mockWorkflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              name={workflow.name}
              description={workflow.description}
              command={workflow.command}
              status={workflow.status}
              prerequisites={workflow.prerequisites}
              onCopyCommand={() => onCopyCommand?.(workflow.command)}
              onViewDocs={() => onViewDocs?.(workflow.id)}
            />
          ))}
        </CardGrid>
      </Stack>
    );
  };

  test('displays pipeline overview with all steps', () => {
    render(<WorkflowCatalog />);

    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    // "Data Model" appears in both pipeline and workflow cards
    expect(screen.getAllByText('Data Model').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Section Spec')).toBeInTheDocument();
    expect(screen.getByText('Implementation')).toBeInTheDocument();
  });

  test('displays all workflow cards with correct information', () => {
    render(<WorkflowCatalog />);

    // Product Vision
    expect(screen.getByText('Product Vision')).toBeInTheDocument();
    expect(screen.getByText('/product-vision')).toBeInTheDocument();

    // Product Roadmap
    expect(screen.getByText('Product Roadmap')).toBeInTheDocument();
    expect(screen.getAllByText(/product-vision/).length).toBeGreaterThanOrEqual(1);

    // Data Model appears in pipeline and cards
    expect(screen.getAllByText('Data Model').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('coming soon')).toBeInTheDocument();
  });

  test('copy command button triggers callback with correct command', () => {
    const onCopyCommand = vi.fn();
    render(<WorkflowCatalog onCopyCommand={onCopyCommand} />);

    // Click the first Copy Command button
    const copyButtons = screen.getAllByText('Copy Command');
    fireEvent.click(copyButtons[0]);

    expect(onCopyCommand).toHaveBeenCalledWith('/product-vision');
  });

  test('view docs button triggers callback with correct workflow id', () => {
    const onViewDocs = vi.fn();
    render(<WorkflowCatalog onViewDocs={onViewDocs} />);

    // Click the first View Docs button
    const docsButtons = screen.getAllByText('View Docs');
    fireEvent.click(docsButtons[0]);

    expect(onViewDocs).toHaveBeenCalledWith('product-vision');
  });

  test('shows prerequisites for workflows that have them', () => {
    render(<WorkflowCatalog />);

    // Multiple workflows have prerequisites
    const prerequisiteElements = screen.getAllByText(/Prerequisites:/);
    expect(prerequisiteElements.length).toBeGreaterThanOrEqual(1);
  });
});

// =============================================================================
// SCENARIO: Approval Status Dashboard
// Tests the approval status viewing flow
// =============================================================================

describe('Scenario: Approval Status Dashboard', () => {
  interface ApprovalItem {
    id: string;
    name: string;
    status: 'pending' | 'approved' | 'rejected';
    reviewer?: string;
    date?: string;
  }

  const mockApprovals: ApprovalItem[] = [
    { id: '1', name: 'Product Vision v1', status: 'approved', reviewer: 'John', date: '2024-01-15' },
    { id: '2', name: 'Data Model v1', status: 'pending' },
    { id: '3', name: 'Section Spec: Dashboard', status: 'rejected', reviewer: 'Jane', date: '2024-01-14' },
  ];

  const ApprovalStatusDashboard = ({ onViewDetails }: { onViewDetails?: (id: string) => void }) => {
    return (
      <Stack spacing="var(--ds-spacing-4)">
        <Heading level={1} data-size="xl">
          Approval Status
        </Heading>

        <CardGrid minCardWidth="280px">
          {mockApprovals.map((item) => (
            <Card key={item.id}>
              <Stack spacing="var(--ds-spacing-3)">
                <Stack direction="horizontal" justify="space-between" align="center">
                  <Heading level={3} data-size="sm">
                    {item.name}
                  </Heading>
                  <Badge
                    data-color={
                      item.status === 'approved'
                        ? 'success'
                        : item.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                    }
                  >
                    {item.status}
                  </Badge>
                </Stack>

                {item.reviewer && (
                  <Paragraph data-size="sm">Reviewed by: {item.reviewer}</Paragraph>
                )}

                {item.date && <Paragraph data-size="xs">Date: {item.date}</Paragraph>}

                <ButtonGroup align="end">
                  <Button
                    variant="secondary"
                    data-size="sm"
                    onClick={() => onViewDetails?.(item.id)}
                  >
                    View Details
                  </Button>
                </ButtonGroup>
              </Stack>
            </Card>
          ))}
        </CardGrid>
      </Stack>
    );
  };

  test('displays all approval items', () => {
    render(<ApprovalStatusDashboard />);

    expect(screen.getByText('Product Vision v1')).toBeInTheDocument();
    expect(screen.getByText('Data Model v1')).toBeInTheDocument();
    expect(screen.getByText('Section Spec: Dashboard')).toBeInTheDocument();
  });

  test('shows correct status badges', () => {
    render(<ApprovalStatusDashboard />);

    expect(screen.getByText('approved')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('rejected')).toBeInTheDocument();
  });

  test('shows reviewer information when available', () => {
    render(<ApprovalStatusDashboard />);

    expect(screen.getByText('Reviewed by: John')).toBeInTheDocument();
    expect(screen.getByText('Reviewed by: Jane')).toBeInTheDocument();
  });

  test('view details button triggers callback', () => {
    const onViewDetails = vi.fn();
    render(<ApprovalStatusDashboard onViewDetails={onViewDetails} />);

    const viewButtons = screen.getAllByText('View Details');
    fireEvent.click(viewButtons[0]);

    expect(onViewDetails).toHaveBeenCalledWith('1');
  });
});

// =============================================================================
// SCENARIO: Spec Editor Form
// Tests the spec editing workflow
// =============================================================================

describe('Scenario: Spec Editor Form', () => {
  const SpecEditorForm = ({
    onSave,
    onCancel,
  }: {
    onSave?: (data: Record<string, string>) => void;
    onCancel?: () => void;
  }) => {
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      category: '',
      version: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
      onSave?.(formData);
    };

    return (
      <Card>
        <Stack spacing="var(--ds-spacing-4)">
          <Heading level={2} data-size="lg">
            Edit Specification
          </Heading>

          <FormGrid columns={2}>
            <Textfield
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              data-testid="name-field"
            />
            <Textfield
              label="Category"
              value={formData.category}
              onChange={handleChange('category')}
              data-testid="category-field"
            />
            <Textfield
              label="Version"
              value={formData.version}
              onChange={handleChange('version')}
              data-testid="version-field"
            />
          </FormGrid>

          <Textfield
            label="Description"
            value={formData.description}
            onChange={handleChange('description')}
            data-testid="description-field"
          />

          <ButtonGroup align="end">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </ButtonGroup>
        </Stack>
      </Card>
    );
  };

  test('renders form with all fields', () => {
    render(<SpecEditorForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Version')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  test('user can fill out form fields', async () => {
    const user = userEvent.setup();
    render(<SpecEditorForm />);

    const nameInput = screen.getByLabelText('Name');
    const categoryInput = screen.getByLabelText('Category');

    await user.type(nameInput, 'Test Spec');
    await user.type(categoryInput, 'Components');

    expect(nameInput).toHaveValue('Test Spec');
    expect(categoryInput).toHaveValue('Components');
  });

  test('save button triggers callback with form data', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<SpecEditorForm onSave={onSave} />);

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'My Spec');

    fireEvent.click(screen.getByText('Save Changes'));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'My Spec',
      })
    );
  });

  test('cancel button triggers callback', () => {
    const onCancel = vi.fn();
    render(<SpecEditorForm onCancel={onCancel} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

// =============================================================================
// SCENARIO: Multi-Panel Dashboard Layout
// Tests complex layout with multiple panels
// =============================================================================

describe('Scenario: Multi-Panel Dashboard Layout', () => {
  const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
      <HorizontalLayout>
        <SimpleSidebar width={sidebarCollapsed ? 'var(--ds-sizing-16)' : 'var(--ds-sizing-80)'}>
          <SidebarHeaderArea>
            <Button
              variant="tertiary"
              data-size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? '→' : '←'}
            </Button>
          </SidebarHeaderArea>
          {!sidebarCollapsed && (
            <SidebarScrollArea>
              <ExplorerItem title="Home" />
              <ExplorerItem title="Projects" />
              <ExplorerItem title="Settings" />
            </SidebarScrollArea>
          )}
        </SimpleSidebar>
        <MainContent>{children}</MainContent>
      </HorizontalLayout>
    );
  };

  test('renders dashboard with sidebar and main content', () => {
    render(
      <DashboardLayout>
        <Heading level={1} data-size="xl">
          Dashboard Content
        </Heading>
      </DashboardLayout>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });

  test('sidebar can be collapsed', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Initially sidebar should show menu items
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Click collapse button
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));

    // Menu items should be hidden when collapsed
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  test('sidebar can be expanded after collapse', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Collapse
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));
    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    // Expand
    fireEvent.click(screen.getByLabelText('Expand sidebar'));
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
