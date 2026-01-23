/**
 * Command Center Registry Types
 * 
 * Core domain definitions for the Command Center's workflow and command engine.
 */

// =============================================================================
// Workflow Definitions
// =============================================================================

export type WorkflowCategory = 'Design' | 'UI' | 'Infra' | 'Cloud' | 'Migration' | 'Docs';

export type WorkflowStatus = 'available' | 'coming_soon' | 'deprecated';

export interface Workflow {
    id: string;
    name: string;
    description: string;
    category: WorkflowCategory;
    /** Estimated duration in minutes */
    duration: number;
    /** CLI command associated with this workflow (if any) */
    command?: string;
    status: WorkflowStatus;
    prerequisites: string[];
    steps: WorkflowStep[];
    outputs: ArtifactDefinition[];
}

export interface WorkflowStep {
    id: string;
    title: string;
    description?: string;
    /** Schema reference for the inputs required at this step */
    inputSchema?: Record<string, any>; // In real impl, use Zod schema or JSON schema
    questions?: WorkflowQuestion[];
    /** ID of the command to execute at this step (from CommandRegistry) */
    commandId?: string;
    validationRules?: ValidationRule[];
    isOptional?: boolean;
}

export interface WorkflowQuestion {
    id: string;
    text: string;
    type: 'text' | 'select' | 'boolean' | 'multiselect';
    options?: { label: string; value: string }[];
    defaultValue?: any;
    required?: boolean;
}

// =============================================================================
// Session State
// =============================================================================

export interface WorkflowSession {
    id: string;
    workflowId: string;
    startedAt: string;
    currentStepIndex: number;
    data: Record<string, any>; // Accumulated answers
    status: 'active' | 'completed' | 'aborted';
    artifacts: GeneratedArtifact[];
}

// =============================================================================
// Command Definitions
// =============================================================================

export interface Command {
    id: string;
    description: string;
    executable: string;
    args?: string[];
    workingDir?: string;
    requiredSecrets?: string[];
    isLongRunning?: boolean;
}

export interface CommandResult {
    commandId: string;
    exitCode: number;
    stdout: string;
    stderr: string;
    artifacts: GeneratedArtifact[];
}

// =============================================================================
// Artifacts
// =============================================================================

export interface ArtifactDefinition {
    type: 'file' | 'code' | 'json' | 'image';
    namePattern: string;
    description: string;
}

export interface GeneratedArtifact {
    id: string;
    type: 'file' | 'code' | 'json' | 'image' | 'markdown';
    path: string;
    name?: string; // Optional, defaults to path basename
    content?: string;
    previewUrl?: string;
    schema?: string; // Schema name for validation
    validationResult?: ValidationResult;
    diff?: {
        previousRevisionId?: string;
        changes: ArtifactChange[];
    };
}

export interface ValidationRule {
    field: string;
    rule: 'required' | 'regex' | 'custom';
    params?: any;
    message: string;
}

// =============================================================================
// Revision Management
// =============================================================================

export interface Revision {
    id: string;
    workflowId: string;
    sessionId: string;
    createdAt: string;
    author: {
        name: string;
        email: string;
    };
    inputs: Record<string, any>;
    outputs: GeneratedArtifact[];
    validationResults: ValidationResult[];
    status: 'draft' | 'pending_approval' | 'approved' | 'rejected';
    approvalId?: string;
    parentRevisionId?: string; // For branching
}

export interface ValidationResult {
    artifactId: string;
    artifactPath: string;
    schema: string; // Schema name/ID
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}

export interface ValidationError {
    path: string; // JSON path
    message: string;
    code: string; // Error code
    suggestedFix?: string;
}

export interface ValidationWarning {
    path: string;
    message: string;
    code: string;
}

export interface ArtifactChange {
    type: 'added' | 'removed' | 'modified';
    path: string;
    oldValue?: any;
    newValue?: any;
    lineNumbers?: { start: number; end: number };
}

// =============================================================================
// Approval Management
// =============================================================================

export interface Approval {
    id: string;
    revisionId: string;
    requestedAt: string;
    requestedBy: {
        name: string;
        email: string;
    };
    status: 'pending' | 'approved' | 'rejected';
    approvedAt?: string;
    approvedBy?: {
        name: string;
        email: string;
    };
    rejectionReason?: string;
    checklist: ApprovalChecklistItem[];
    gates: ApprovalGate[];
}

export interface ApprovalChecklistItem {
    id: string;
    label: string;
    checked: boolean;
    required: boolean;
    checkedBy?: string;
    checkedAt?: string;
}

export interface ApprovalGate {
    id: string;
    name: string;
    description: string;
    status: 'pass' | 'fail' | 'pending';
    required: boolean;
    details?: string;
}

// =============================================================================
// Promotion
// =============================================================================

export interface PromotionResult {
    success: boolean;
    componentPath?: string;
    storybookPath?: string;
    docsPath?: string;
    errors?: string[];
    warnings?: string[];
}
