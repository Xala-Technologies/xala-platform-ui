/**
 * Workflow Mock Data
 *
 * Extracted from WorkflowCatalog.tsx for separation of concerns.
 * In production, these would come from API calls or configuration files.
 */

export interface Workflow {
  id: string;
  name: string;
  description: string;
  command: string;
  status: 'available' | 'coming_soon' | 'deprecated';
  prerequisites: string[];
}

export interface WorkflowStep {
  step: number;
  name: string;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: 'product-vision',
    name: 'Product Vision',
    description: 'Define the product vision, goals, and target users',
    command: '/product-vision',
    status: 'available',
    prerequisites: [],
  },
  {
    id: 'product-roadmap',
    name: 'Product Roadmap',
    description: 'Break the product into phases and sections',
    command: '/product-roadmap',
    status: 'available',
    prerequisites: ['product-vision'],
  },
  {
    id: 'data-model',
    name: 'Data Model',
    description: 'Define entities, fields, and relationships',
    command: '/data-model',
    status: 'available',
    prerequisites: ['product-vision', 'product-roadmap'],
  },
  {
    id: 'section-spec',
    name: 'Section Spec',
    description: 'Specify individual sections with components and states',
    command: '/section-spec [name]',
    status: 'available',
    prerequisites: ['data-model'],
  },
  {
    id: 'export',
    name: 'Export',
    description: 'Generate implementation prompts (oneshot or incremental)',
    command: '/export --mode [oneshot|incremental]',
    status: 'available',
    prerequisites: ['section-spec'],
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { step: 1, name: 'Vision' },
  { step: 2, name: 'Roadmap' },
  { step: 3, name: 'Data Model' },
  { step: 4, name: 'Section Specs' },
  { step: 5, name: 'Export' },
];
