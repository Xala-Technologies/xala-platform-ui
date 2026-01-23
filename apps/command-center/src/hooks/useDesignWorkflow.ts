/**
 * useDesignWorkflow Hook
 * 
 * Connects the Command Center workflows to the @xala-technologies/design-workflow SDK.
 * Provides AI-guided design workflow automation using Design OS patterns.
 */

import { useState, useCallback } from 'react';
import {
    type ProductVision,
    type ProductRoadmap,
    type DataModel,
    type SectionSpec,
    type ExportConfig,
    productVisionSchema,
    productRoadmapSchema,
    dataModelSchema,
    sectionSpecSchema,
    exportConfigSchema,
    generateOneShotPrompt,
    generateIncrementalPrompts,
} from '@xala-technologies/design-workflow';
import { getCurrentProvider } from '../lib/ai';
import type { ClarificationQuestion, ClarificationAnswer, ClarificationAIResponse } from '../types/clarification';

// ============================================
// Types
// ============================================

export type DesignPhase = 'product-planning' | 'section-design' | 'export';
export type ProductPlanningStep = 'vision' | 'roadmap' | 'data-model' | 'design-tokens' | 'shell';
export type SectionDesignStep = 'shape' | 'sample-data' | 'design-screen' | 'screenshot';
export type ExportStep = 'export';
export type ClarificationMode = 'none' | 'asking' | 'answered';

export interface DesignWorkflowState {
    phase: DesignPhase;
    currentStep: ProductPlanningStep | SectionDesignStep | ExportStep;
    vision?: ProductVision;
    roadmap?: ProductRoadmap;
    dataModel?: DataModel;
    sections: SectionSpec[];
    exportConfig?: ExportConfig;
    isLoading: boolean;
    error: string | null;
    // Clarification state
    clarificationMode: ClarificationMode;
    clarificationQuestions: ClarificationQuestion[];
    clarificationAnswers: ClarificationAnswer[];
    clarificationIntro?: string;
}

export interface DesignWorkflowActions {
    // Phase 1: Product Planning
    generateVision: (input: string) => Promise<ProductVision>;
    generateRoadmap: (input: string) => Promise<ProductRoadmap>;
    generateDataModel: (input: string) => Promise<DataModel>;

    // Phase 2: Section Design
    generateSection: (sectionName: string, input: string) => Promise<SectionSpec>;

    // Phase 3: Export
    exportProduct: (config: { mode: 'oneshot' | 'incremental' }) => Promise<string>;

    // Clarification Flow
    askClarifications: (step: string, input: string) => Promise<ClarificationAIResponse>;
    setClarificationAnswer: (questionId: string, value: string | string[] | number) => void;
    submitClarifications: () => Promise<void>;
    skipClarifications: () => void;

    // Navigation
    setPhase: (phase: DesignPhase) => void;
    reset: () => void;
}

// ============================================
// Initial State
// ============================================

const initialState: DesignWorkflowState = {
    phase: 'product-planning',
    currentStep: 'vision',
    sections: [],
    isLoading: false,
    error: null,
    // Clarification state
    clarificationMode: 'none',
    clarificationQuestions: [],
    clarificationAnswers: [],
};

// ============================================
// Hook
// ============================================

export function useDesignWorkflow(): [DesignWorkflowState, DesignWorkflowActions] {
    const [state, setState] = useState<DesignWorkflowState>(initialState);

    // Helper: Call AI with structured output
    const callAI = useCallback(async <T>(
        systemPrompt: string,
        userPrompt: string,
        schema: { parse: (data: unknown) => T }
    ): Promise<T> => {
        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const provider = getCurrentProvider();
            if (!provider) {
                throw new Error('No AI provider configured. Please set up an API key.');
            }

            const response = await provider.createMessage({
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }],
                maxTokens: 4096,
            });

            // Parse JSON from response (handle markdown code blocks)
            const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, response];
            const jsonStr = jsonMatch[1]?.trim() || response;
            const parsed = JSON.parse(jsonStr);

            // Validate against schema
            const validated = schema.parse(parsed);
            setState(s => ({ ...s, isLoading: false }));
            return validated;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setState(s => ({ ...s, isLoading: false, error: message }));
            throw err;
        }
    }, []);

    // Phase 1: Generate Product Vision
    const generateVision = useCallback(async (input: string): Promise<ProductVision> => {
        const systemPrompt = `You are a product strategist. Generate a product vision document in JSON format.
The output MUST be valid JSON matching this structure:
{
  "name": "string",
  "tagline": "string", 
  "description": "string",
  "problemStatement": "string",
  "targetUsers": [{ "name": "string", "description": "string", "needs": ["string"] }],
  "keyFeatures": [{ "name": "string", "description": "string" }],
  "successMetrics": ["string"]
}`;

        const vision = await callAI(systemPrompt, input, productVisionSchema);
        setState(s => ({ ...s, vision, currentStep: 'roadmap' }));
        return vision;
    }, [callAI]);

    // Phase 1: Generate Product Roadmap
    const generateRoadmap = useCallback(async (input: string): Promise<ProductRoadmap> => {
        const context = state.vision
            ? `Product: ${state.vision.name}\nDescription: ${state.vision.description}\n\n`
            : '';

        const systemPrompt = `You are a product manager. Generate a product roadmap in JSON format.
${context}
The output MUST be valid JSON matching this structure:
{
  "phases": [{
    "name": "string",
    "description": "string",
    "sections": [{
      "name": "string",
      "description": "string", 
      "priority": "critical" | "high" | "medium" | "low",
      "status": "planned",
      "dependencies": ["string"]
    }]
  }]
}`;

        const roadmap = await callAI(systemPrompt, input, productRoadmapSchema);
        setState(s => ({ ...s, roadmap, currentStep: 'data-model' }));
        return roadmap;
    }, [callAI, state.vision]);

    // Phase 1: Generate Data Model
    const generateDataModel = useCallback(async (input: string): Promise<DataModel> => {
        const context = state.vision
            ? `Product: ${state.vision.name}\nFeatures: ${state.vision.keyFeatures.map((f: { name: string }) => f.name).join(', ')}\n\n`
            : '';

        const systemPrompt = `You are a data architect. Generate a data model in JSON format.
${context}
The output MUST be valid JSON matching this structure:
{
  "entities": [{
    "name": "string",
    "description": "string",
    "fields": [{
      "name": "string",
      "type": "string",
      "required": true|false,
      "description": "string"
    }],
    "relationships": [{
      "entity": "string",
      "type": "one-to-one" | "one-to-many" | "many-to-many",
      "field": "string"
    }]
  }]
}`;

        const dataModel = await callAI(systemPrompt, input, dataModelSchema);
        setState(s => ({ ...s, dataModel, currentStep: 'design-tokens', phase: 'section-design' }));
        return dataModel;
    }, [callAI, state.vision]);

    // Phase 2: Generate Section Spec
    const generateSection = useCallback(async (sectionName: string, input: string): Promise<SectionSpec> => {
        const context = [
            state.vision && `Product: ${state.vision.name}`,
            state.dataModel && `Entities: ${state.dataModel.entities.map((e: { name: string }) => e.name).join(', ')}`,
        ].filter(Boolean).join('\n');

        const systemPrompt = `You are a UI/UX designer creating section specifications for @xala-technologies/platform-ui.
${context}

Generate a section specification for "${sectionName}" in JSON format.
Use ONLY components from @xala-technologies/platform-ui (Button, Card, Heading, Paragraph, Stack, etc.).

The output MUST be valid JSON matching this structure:
{
  "name": "string",
  "description": "string",
  "userStories": [{ "as": "string", "want": "string", "so": "string" }],
  "components": [{
    "type": "string",
    "category": "primitives" | "composed" | "blocks" | "shells" | "patterns",
    "name": "string",
    "purpose": "string",
    "props": {},
    "children": []
  }],
  "dataRequirements": [{ "entity": "string", "fields": ["string"], "operations": ["read"] }],
  "states": ["loading", "empty", "populated", "error"],
  "routes": [{ "path": "string", "name": "string", "description": "string" }]
}`;

        const section = await callAI(systemPrompt, input, sectionSpecSchema);
        setState(s => ({ ...s, sections: [...s.sections, section] }));
        return section;
    }, [callAI, state.vision, state.dataModel]);

    // Phase 3: Export
    const exportProduct = useCallback(async (config: { mode: 'oneshot' | 'incremental' }): Promise<string> => {
        // Build full config with defaults
        const fullConfig = {
            mode: config.mode,
            includeStorybook: true,
            includeTests: true,
            outputDir: './export',
        };
        const validatedConfig = exportConfigSchema.parse(fullConfig);
        setState(s => ({ ...s, exportConfig: validatedConfig, phase: 'export' }));

        // Build ProductPlan from current state
        if (!state.vision || !state.roadmap || !state.dataModel) {
            return 'Error: Missing required data. Complete Product Planning phase first.';
        }

        const plan = {
            vision: state.vision,
            roadmap: state.roadmap,
            dataModel: state.dataModel,
            techStack: {
                frontend: {
                    framework: 'React',
                    ui: '@xala-technologies/platform-ui',
                    styling: 'Designsystemet CSS',
                },
            },
            sections: state.sections,
        };

        // Generate prompt based on mode
        if (validatedConfig.mode === 'oneshot') {
            return generateOneShotPrompt(plan);
        } else {
            const promptsMap = generateIncrementalPrompts(plan);
            return Array.from(promptsMap.values()).join('\n\n---\n\n');
        }
    }, [state.vision, state.roadmap, state.dataModel, state.sections]);

    // Navigation
    const setPhase = useCallback((phase: DesignPhase) => {
        const stepMap: Record<DesignPhase, ProductPlanningStep | SectionDesignStep | ExportStep> = {
            'product-planning': 'vision',
            'section-design': 'shape',
            'export': 'export',
        };
        setState(s => ({ ...s, phase, currentStep: stepMap[phase] }));
    }, []);

    const reset = useCallback(() => setState(initialState), []);

    // Clarification Flow Actions
    const askClarifications = useCallback(async (step: string, input: string): Promise<ClarificationAIResponse> => {
        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const provider = getCurrentProvider();
            if (!provider) throw new Error('AI provider not initialized');

            const systemPrompt = `You are a product specification assistant. Generate clarification questions to refine the user's input.
Return a JSON object with this structure:
{
  "intro": "Brief acknowledgment of user's input",
  "questions": [
    { "id": "q1", "type": "radio", "question": "Question text?", "options": [{"id": "opt1", "label": "Option 1"}, ...] },
    { "id": "q2", "type": "checkbox", "question": "Select all that apply:", "options": [...] },
    { "id": "q3", "type": "text", "question": "Please describe..." },
    { "id": "q4", "type": "scale", "question": "Rate 1-10..." }
  ]
}
Question types: radio (single choice), checkbox (multi-select), select (dropdown), text (free text), scale (1-10).
Generate 3-5 focused questions that help clarify scope, target users, priorities, and constraints.`;

            const userPrompt = `Step: ${step}
User input: ${input}

Generate clarification questions to refine this into a proper specification.`;

            const response = await provider.createMessage({
                messages: [{ role: 'user', content: userPrompt }],
                system: systemPrompt,
            });

            // Parse JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('Invalid AI response format');

            const parsed: ClarificationAIResponse = JSON.parse(jsonMatch[0]);

            setState(s => ({
                ...s,
                isLoading: false,
                clarificationMode: 'asking',
                clarificationQuestions: parsed.questions || [],
                clarificationAnswers: [],
                clarificationIntro: parsed.intro,
            }));

            return parsed;
        } catch (err) {
            const error = err instanceof Error ? err.message : 'Failed to generate questions';
            setState(s => ({ ...s, isLoading: false, error }));
            throw err;
        }
    }, []);

    const setClarificationAnswer = useCallback((questionId: string, value: string | string[] | number) => {
        setState(s => {
            const existing = s.clarificationAnswers.findIndex(a => a.questionId === questionId);
            const newAnswers = [...s.clarificationAnswers];

            if (existing >= 0) {
                newAnswers[existing] = { questionId, value };
            } else {
                newAnswers.push({ questionId, value });
            }

            return { ...s, clarificationAnswers: newAnswers };
        });
    }, []);

    const submitClarifications = useCallback(async () => {
        setState(s => ({ ...s, clarificationMode: 'answered' }));
    }, []);

    const skipClarifications = useCallback(() => {
        setState(s => ({
            ...s,
            clarificationMode: 'none',
            clarificationQuestions: [],
            clarificationAnswers: [],
            clarificationIntro: undefined,
        }));
    }, []);

    return [state, {
        generateVision,
        generateRoadmap,
        generateDataModel,
        generateSection,
        exportProduct,
        askClarifications,
        setClarificationAnswer,
        submitClarifications,
        skipClarifications,
        setPhase,
        reset,
    }];
}
