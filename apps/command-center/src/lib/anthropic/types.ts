/**
 * Anthropic Agent Types
 * 
 * Type definitions for workflow agent interactions
 */

// =============================================================================
// Workflow Agent Types
// =============================================================================

export interface WorkflowDefinition {
    id: string;
    name: string;
    category: string;
    steps: WorkflowStepDefinition[];
}

export interface WorkflowStepDefinition {
    id: string;
    title: string;
    description?: string;
    inputSchema?: Record<string, any>; // Zod schema or JSON Schema
    promptTemplate?: string;
    outputArtifacts?: string[]; // e.g., ['SECTION_*.md', 'COMPOSE_*.json']
    validateFn?: (artifacts: GeneratedArtifact[]) => ValidationResult;
}

export interface WorkflowSession {
    sessionId: string;
    workflowId: string;
    currentStep: number;
    messages: AgentMessage[];
    answers: Record<string, any>;
    artifacts: GeneratedArtifact[];
    validationResults: Record<string, ValidationResult>;
    createdAt: string;
    updatedAt: string;
}

export interface AgentMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    stepId?: string;
    artifacts?: GeneratedArtifact[];
}

export interface GeneratedArtifact {
    id: string;
    type: 'section' | 'compose' | 'testids' | 'e2e' | 'manifest';
    name: string;
    path: string;
    content: string;
    schema?: string; // Schema type for validation
    validated?: boolean;
    validationErrors?: ValidationError[];
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}

export interface ValidationError {
    path: string;
    message: string;
    code?: string;
    suggestedFix?: string;
}

export interface ValidationWarning {
    path: string;
    message: string;
    code?: string;
}

// =============================================================================
// Platform UI Inventory Types
// =============================================================================

export interface PlatformUIComponent {
    name: string;
    category: 'primitives' | 'composed' | 'blocks' | 'patterns' | 'shells';
    description?: string;
    props?: Record<string, ComponentProp>;
    examples?: string[];
}

export interface ComponentProp {
    name: string;
    type: string;
    required?: boolean;
    description?: string;
    defaultValue?: any;
}

export interface PlatformUIInventory {
    components: PlatformUIComponent[];
    patterns: string[];
    designTokens: string[];
}
