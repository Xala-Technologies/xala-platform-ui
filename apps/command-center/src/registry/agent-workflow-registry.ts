/**
 * Agent Workflow Registry
 * 
 * Defines workflow steps for AI agent-guided workflows.
 * These workflows use the Anthropic agent to guide users through Q&A.
 */

import type { WorkflowStepDefinition } from '../lib/anthropic/types';

// =============================================================================
// Workflow Definitions
// =============================================================================

export const AGENT_WORKFLOWS: Record<string, WorkflowStepDefinition[]> = {
    'component-design': [
        {
            id: 'vision',
            title: 'Product Vision',
            description: 'Define the high-level vision and goals for the component',
            promptTemplate: `Ask the user about:
- What problem does this component solve?
- Who is the target user?
- What are the key use cases?
- What are the success criteria?`,
            outputArtifacts: ['SECTION_vision.md'],
        },
        {
            id: 'data-model',
            title: 'Data Model',
            description: 'Define the data structure and props',
            promptTemplate: `Based on the vision, ask about:
- What props does the component need?
- What data types are required?
- What are the required vs optional props?
- Are there any constraints or validations?`,
            outputArtifacts: ['SECTION_data-model.md'],
        },
        {
            id: 'ui-composition',
            title: 'UI Composition',
            description: 'Define the UI structure using platform-ui components',
            promptTemplate: `Ask about the UI structure:
- Which platform-ui components should be used?
- What is the layout structure?
- What are the visual variants?
- What are the interactive states?`,
            outputArtifacts: ['COMPOSE_component.json'],
        },
        {
            id: 'testids',
            title: 'Test IDs',
            description: 'Define test IDs for all interactive elements',
            promptTemplate: `Generate test IDs following the pattern: cc-{page}-{component}-{action}
- List all interactive elements
- Assign test IDs following the naming convention
- Ensure all elements are covered`,
            outputArtifacts: ['TESTIDS_component.json'],
        },
        {
            id: 'e2e-tests',
            title: 'E2E Tests',
            description: 'Define end-to-end test scenarios',
            promptTemplate: `Create E2E test scenarios:
- User flows through the component
- Edge cases and error states
- Accessibility checks
- Cross-browser considerations`,
            outputArtifacts: ['E2E_component.md'],
        },
    ],
    'ui-component': [
        {
            id: 'basics',
            title: 'Component Basics',
            description: 'Define the core identity of the component',
            promptTemplate: `Ask about:
- Component name
- Category (primitives/composed/blocks/patterns/shells)
- Primary purpose
- Key features`,
            outputArtifacts: ['SECTION_basics.md'],
        },
        {
            id: 'composition',
            title: 'Composition',
            description: 'Define what this component is built from',
            promptTemplate: `Ask about:
- Which platform-ui components will be used?
- What is the component hierarchy?
- Are there any custom elements needed?`,
            outputArtifacts: ['COMPOSE_component.json'],
        },
        {
            id: 'states',
            title: 'States & Variants',
            description: 'Define the interactive states',
            promptTemplate: `Ask about:
- Loading states
- Error states
- Success states
- Disabled states
- Visual variants`,
            outputArtifacts: ['SECTION_states.md'],
        },
        {
            id: 'testids',
            title: 'Test IDs',
            description: 'Define test IDs',
            promptTemplate: `Generate test IDs for all interactive elements`,
            outputArtifacts: ['TESTIDS_component.json'],
        },
    ],
};

/**
 * Get workflow steps for a workflow ID
 */
export function getAgentWorkflowSteps(workflowId: string): WorkflowStepDefinition[] {
    return AGENT_WORKFLOWS[workflowId] || [];
}

/**
 * Check if a workflow uses the agent
 */
export function isAgentWorkflow(workflowId: string): boolean {
    return workflowId in AGENT_WORKFLOWS;
}
