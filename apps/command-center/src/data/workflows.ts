/**
 * Workflow Mock Data
 *
 * Design OS workflow structure based on buildermethods.com/design-os.
 * 3-phase workflow: Product Planning → Section Design → Export
 */

export interface Workflow {
  id: string;
  name: string;
  description: string;
  command: string;
  phase: 'product-planning' | 'section-design' | 'export';
  status: 'available' | 'coming_soon' | 'deprecated';
  prerequisites: string[];
}

export interface WorkflowStep {
  step: number;
  name: string;
  phase: 'product-planning' | 'section-design' | 'export';
}

// ============================================
// DESIGN OS WORKFLOWS
// ============================================

export const WORKFLOWS: Workflow[] = [
  // Phase 1: Product Planning
  {
    id: 'product-vision',
    name: 'Product Vision',
    description: 'Define what you\'re building and why',
    command: '/product-vision',
    phase: 'product-planning',
    status: 'available',
    prerequisites: [],
  },
  {
    id: 'product-roadmap',
    name: 'Product Roadmap',
    description: 'Break your product into phases and sections',
    command: '/product-roadmap',
    phase: 'product-planning',
    status: 'available',
    prerequisites: ['product-vision'],
  },
  {
    id: 'data-model',
    name: 'Data Model',
    description: 'Define the core entities in your system',
    command: '/data-model',
    phase: 'product-planning',
    status: 'available',
    prerequisites: ['product-vision', 'product-roadmap'],
  },
  {
    id: 'design-tokens',
    name: 'Design Tokens',
    description: 'Choose colors and typography',
    command: '/design-tokens',
    phase: 'product-planning',
    status: 'available',
    prerequisites: ['product-vision'],
  },
  {
    id: 'design-shell',
    name: 'Application Shell',
    description: 'Design navigation and layout',
    command: '/design-shell',
    phase: 'product-planning',
    status: 'available',
    prerequisites: ['design-tokens'],
  },

  // Phase 2: Section Design
  {
    id: 'shape-section',
    name: 'Shape Section',
    description: 'Define scope and requirements for a section',
    command: '/shape-section',
    phase: 'section-design',
    status: 'available',
    prerequisites: ['data-model', 'design-shell'],
  },
  {
    id: 'sample-data',
    name: 'Sample Data',
    description: 'Generate realistic data and types',
    command: '/sample-data',
    phase: 'section-design',
    status: 'available',
    prerequisites: ['shape-section'],
  },
  {
    id: 'design-screen',
    name: 'Design Screen',
    description: 'Build the actual React components',
    command: '/design-screen',
    phase: 'section-design',
    status: 'available',
    prerequisites: ['sample-data'],
  },
  {
    id: 'screenshot-design',
    name: 'Screenshot Design',
    description: 'Document the design (optional)',
    command: '/screenshot-design',
    phase: 'section-design',
    status: 'available',
    prerequisites: ['design-screen'],
  },

  // Phase 3: Export
  {
    id: 'export-product',
    name: 'Export Product',
    description: 'Generate complete handoff package',
    command: '/export-product',
    phase: 'export',
    status: 'available',
    prerequisites: ['design-screen'],
  },
];

// ============================================
// DESIGN OS WORKFLOW STEPS (PIPELINE VIEW)
// ============================================

export const WORKFLOW_STEPS: WorkflowStep[] = [
  // Phase 1
  { step: 1, name: 'Vision', phase: 'product-planning' },
  { step: 2, name: 'Roadmap', phase: 'product-planning' },
  { step: 3, name: 'Data Model', phase: 'product-planning' },
  { step: 4, name: 'Tokens', phase: 'product-planning' },
  { step: 5, name: 'Shell', phase: 'product-planning' },
  // Phase 2
  { step: 6, name: 'Shape', phase: 'section-design' },
  { step: 7, name: 'Sample Data', phase: 'section-design' },
  { step: 8, name: 'Design', phase: 'section-design' },
  { step: 9, name: 'Screenshot', phase: 'section-design' },
  // Phase 3
  { step: 10, name: 'Export', phase: 'export' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getWorkflowsByPhase(phase: Workflow['phase']): Workflow[] {
  return WORKFLOWS.filter(w => w.phase === phase);
}

export function getNextWorkflow(currentId: string): Workflow | undefined {
  const currentWorkflow = WORKFLOWS.find(w => w.id === currentId);
  if (!currentWorkflow) return undefined;

  const currentIndex = WORKFLOWS.indexOf(currentWorkflow);
  return WORKFLOWS[currentIndex + 1];
}

export function canStartWorkflow(workflowId: string, completedWorkflows: string[]): boolean {
  const workflow = WORKFLOWS.find(w => w.id === workflowId);
  if (!workflow) return false;
  return workflow.prerequisites.every(prereq => completedWorkflows.includes(prereq));
}
