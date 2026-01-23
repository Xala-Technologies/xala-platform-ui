/**
 * Workflow Registry
 * 
 * Central registry for all available workflows in the Command Center.
 * In a real application, this might load from a database or JSON files.
 */

import { Workflow } from './types';

// Initial seed data based on the requirements
const INITIAL_WORKFLOWS: Workflow[] = [
    {
        id: 'component-design',
        name: 'New Component Design',
        description: 'End-to-end flow for designing a new UI component from scratch.',
        category: 'Design',
        duration: 15, // minutes
        status: 'available',
        prerequisites: [],
        outputs: [
            { type: 'file', namePattern: 'specs/${name}.spec.ts', description: 'Component Specification' },
            { type: 'file', namePattern: 'docs/${name}.md', description: 'Documentation Draft' }
        ],
        steps: [
            {
                id: 'basics',
                title: 'Component Basics',
                description: 'Define the core identity of the component',
                questions: [
                    {
                        id: 'name',
                        text: 'What is the name of the component?',
                        type: 'text',
                        required: true
                    },
                    {
                        id: 'category',
                        text: 'Which category does this belong to?',
                        type: 'select',
                        options: [
                            { label: 'Primitive (Atom)', value: 'primitive' },
                            { label: 'Block (Molecule)', value: 'block' },
                            { label: 'Pattern (Organism)', value: 'pattern' },
                            { label: 'Template (Page)', value: 'template' }
                        ],
                        required: true
                    },
                    {
                        id: 'purpose',
                        text: 'What is the primary purpose of this component?',
                        type: 'text',
                        required: true
                    }
                ]
            },
            {
                id: 'composition',
                title: 'Composition',
                description: 'Define what this component is built from',
                questions: [
                    {
                        id: 'base_components',
                        text: 'Which detailed existing components will be used?',
                        type: 'multiselect',
                        options: [
                            { label: 'Button', value: 'Button' },
                            { label: 'Card', value: 'Card' },
                            { label: 'Heading', value: 'Heading' },
                            { label: 'Paragraph', value: 'Paragraph' },
                            { label: 'Icon', value: 'Icon' }
                        ]
                    }
                ]
            },
            {
                id: 'states',
                title: 'States & Variants',
                description: 'Define the interactive states',
                questions: [
                    {
                        id: 'has_loading',
                        text: 'Does it have a loading state?',
                        type: 'boolean',
                        defaultValue: false
                    },
                    {
                        id: 'has_error',
                        text: 'Does it have an error state?',
                        type: 'boolean',
                        defaultValue: false
                    },
                    {
                        id: 'variants',
                        text: 'List the visual variants (comma separated)',
                        type: 'text',
                        defaultValue: 'default'
                    }
                ]
            }
        ]
    },
    {
        id: 'product-vision',
        name: 'Product Vision',
        description: 'Define the product vision, goals, and target users',
        category: 'Design',
        duration: 10,
        command: '/product-vision',
        status: 'available',
        prerequisites: [],
        outputs: [
            { type: 'file', namePattern: 'docs/vision.md', description: 'Vision Document' }
        ],
        steps: [
            {
                id: 'vision-goals',
                title: 'Vision & Goals',
                description: 'Articulate the high-level purpose',
                questions: [
                    { id: 'vision_stmou', text: 'Vision Statement', type: 'text', required: true },
                    { id: 'target_audience', text: 'Target Audience', type: 'text', required: true }
                ]
            }
        ]
    },
    {
        id: 'cloud-provision',
        name: 'Cloud Provisioning',
        description: 'Provision infrastructure resources via Pulumi/Terraform',
        category: 'Infra',
        duration: 20,
        status: 'coming_soon',
        prerequisites: ['AWS Credentials'],
        outputs: [],
        steps: []
    }
];

export class WorkflowRegistry {
    private workflows: Map<string, Workflow>;

    constructor() {
        this.workflows = new Map();
        this.loadInitialWorkflows();
    }

    private loadInitialWorkflows() {
        INITIAL_WORKFLOWS.forEach(workflow => {
            this.workflows.set(workflow.id, workflow);
        });
    }

    public getAllWorkflows(): Workflow[] {
        return Array.from(this.workflows.values());
    }

    public getWorkflow(id: string): Workflow | undefined {
        return this.workflows.get(id);
    }

    public getWorkflowsByCategory(category: string): Workflow[] {
        return this.getAllWorkflows().filter(w => w.category === category);
    }
}

// Singleton instance
export const workflowRegistry = new WorkflowRegistry();
