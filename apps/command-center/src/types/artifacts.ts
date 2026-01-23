/**
 * Design OS Artifact Types
 * 
 * Types for comprehensive project specification artifacts
 * generated from a single Vision input.
 */

// ============================================
// Artifact Type Enum
// ============================================

export type ArtifactType =
    | 'prd'       // Product Requirements Document
    | 'srsd'      // System Requirements Specification Document
    | 'prp'       // Project Readiness Plan
    | 'roadmap'   // Phased Roadmap
    | 'plan'      // Step-by-Step Implementation Plan
    | 'schema'    // Data Model / Schema
    | 'sections'; // UI Sections Definition

export const ARTIFACT_LABELS: Record<ArtifactType, string> = {
    prd: 'Product Requirements',
    srsd: 'System Requirements',
    prp: 'Project Readiness',
    roadmap: 'Roadmap',
    plan: 'Implementation Plan',
    schema: 'Data Model',
    sections: 'UI Sections',
};

export const ARTIFACT_ORDER: ArtifactType[] = [
    'prd',
    'srsd',
    'prp',
    'roadmap',
    'plan',
    'schema',
    'sections',
];

// ============================================
// Individual Artifact Interfaces
// ============================================

export interface PRDArtifact {
    type: 'prd';
    productName: string;
    tagline: string;
    problemStatement: string;
    targetUsers: {
        persona: string;
        description: string;
        needs: string[];
    }[];
    valueProposition: string;
    keyFeatures: {
        name: string;
        description: string;
        priority: 'must-have' | 'should-have' | 'nice-to-have';
    }[];
    successMetrics: {
        metric: string;
        target: string;
    }[];
    constraints: string[];
    assumptions: string[];
}

export interface SRSDArtifact {
    type: 'srsd';
    functionalRequirements: {
        id: string;
        category: string;
        requirement: string;
        priority: 'high' | 'medium' | 'low';
    }[];
    nonFunctionalRequirements: {
        id: string;
        category: string;
        requirement: string;
    }[];
    systemArchitecture: {
        overview: string;
        components: {
            name: string;
            responsibility: string;
        }[];
    };
    integrations: {
        system: string;
        purpose: string;
        protocol: string;
    }[];
    securityRequirements: string[];
    performanceRequirements: string[];
}

export interface PRPArtifact {
    type: 'prp';
    projectOverview: string;
    stakeholders: {
        role: string;
        responsibilities: string[];
    }[];
    riskAssessment: {
        risk: string;
        likelihood: 'high' | 'medium' | 'low';
        impact: 'high' | 'medium' | 'low';
        mitigation: string;
    }[];
    resourceRequirements: {
        category: string;
        items: string[];
    }[];
    dependencies: string[];
    goLiveCriteria: string[];
}

export interface RoadmapArtifact {
    type: 'roadmap';
    phases: {
        name: string;
        duration: string;
        objectives: string[];
        deliverables: string[];
        milestones: {
            name: string;
            date: string;
        }[];
    }[];
    mvpScope: string[];
    futureEnhancements: string[];
}

export interface PlanArtifact {
    type: 'plan';
    steps: {
        stepNumber: number;
        title: string;
        description: string;
        estimatedDuration: string;
        dependencies: number[];
        outputs: string[];
        assignee?: string;
    }[];
    checkpoints: {
        afterStep: number;
        criteria: string[];
    }[];
}

export interface SchemaArtifact {
    type: 'schema';
    entities: {
        name: string;
        description: string;
        fields: {
            name: string;
            type: string;
            required: boolean;
            description: string;
        }[];
        relationships: {
            target: string;
            type: 'one-to-one' | 'one-to-many' | 'many-to-many';
            description: string;
        }[];
    }[];
    enums: {
        name: string;
        values: string[];
    }[];
}

export interface SectionsArtifact {
    type: 'sections';
    pages: {
        name: string;
        route: string;
        description: string;
        components: {
            name: string;
            type: string;
            purpose: string;
        }[];
        dataRequirements: string[];
        userActions: string[];
    }[];
    sharedComponents: {
        name: string;
        purpose: string;
        usedIn: string[];
    }[];
    navigation: {
        primary: { label: string; route: string }[];
        secondary?: { label: string; route: string }[];
    };
}

// ============================================
// Union Type
// ============================================

export type DesignArtifact =
    | PRDArtifact
    | SRSDArtifact
    | PRPArtifact
    | RoadmapArtifact
    | PlanArtifact
    | SchemaArtifact
    | SectionsArtifact;

// ============================================
// Generation State
// ============================================

export interface ArtifactGenerationState {
    type: ArtifactType;
    status: 'pending' | 'generating' | 'complete' | 'error';
    artifact?: DesignArtifact;
    error?: string;
}

export interface DesignOSState {
    phase: 'input' | 'clarifying' | 'generating' | 'review';
    visionInput: string;
    clarificationQuestions: import('./clarification').ClarificationQuestion[];
    clarificationAnswers: import('./clarification').ClarificationAnswer[];
    artifacts: Record<ArtifactType, ArtifactGenerationState>;
    activeArtifact: ArtifactType;
    isLoading: boolean;
    error: string | null;
}

// ============================================
// Initial State Factory
// ============================================

export function createInitialArtifactState(): Record<ArtifactType, ArtifactGenerationState> {
    return {
        prd: { type: 'prd', status: 'pending' },
        srsd: { type: 'srsd', status: 'pending' },
        prp: { type: 'prp', status: 'pending' },
        roadmap: { type: 'roadmap', status: 'pending' },
        plan: { type: 'plan', status: 'pending' },
        schema: { type: 'schema', status: 'pending' },
        sections: { type: 'sections', status: 'pending' },
    };
}
