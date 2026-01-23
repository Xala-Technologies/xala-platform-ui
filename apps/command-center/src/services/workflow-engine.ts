/**
 * Workflow Engine
 * 
 * Manages workflow session state, AI interactions, and artifact generation.
 */

import type {
    WorkflowSession,
    WorkflowStepDefinition,
    GeneratedArtifact,
    ValidationResult,
} from '../lib/anthropic/types';
import { providerRegistry, getCurrentProvider } from '../lib/ai';
import { getPlatformUIInventory, formatInventoryForAgent } from '../lib/anthropic/inventory';
import { artifactValidator } from './artifact-validator';

// =============================================================================
// Workflow Engine Class
// =============================================================================

export class WorkflowEngine {
    private sessions: Map<string, WorkflowSession> = new Map();

    /**
     * Create a new workflow session
     */
    createSession(workflowId: string, _workflowSteps: WorkflowStepDefinition[]): WorkflowSession {
        const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const session: WorkflowSession = {
            sessionId,
            workflowId,
            currentStep: 0,
            messages: [],
            answers: {},
            artifacts: [],
            validationResults: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Initialize with system message containing inventory
        const inventory = getPlatformUIInventory();
        session.messages.push({
            role: 'system',
            content: formatInventoryForAgent(inventory),
            timestamp: new Date().toISOString(),
        });

        this.sessions.set(sessionId, session);
        return session;
    }

    /**
     * Get session by ID
     */
    getSession(sessionId: string): WorkflowSession | undefined {
        return this.sessions.get(sessionId);
    }

    /**
     * Get all sessions
     */
    getAllSessions(): WorkflowSession[] {
        return Array.from(this.sessions.values());
    }

    /**
     * Update session
     */
    updateSession(sessionId: string, updates: Partial<WorkflowSession>): void {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        Object.assign(session, updates, {
            updatedAt: new Date().toISOString(),
        });
    }

    /**
     * Add user answer to session
     */
    addAnswer(sessionId: string, stepId: string, answer: any): void {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        session.answers[stepId] = answer;
        session.messages.push({
            role: 'user',
            content: JSON.stringify({ stepId, answer }),
            timestamp: new Date().toISOString(),
            stepId,
        });
    }

    /**
     * Ask AI agent a question for the current step
     */
    async askAgent(
        sessionId: string,
        step: WorkflowStepDefinition,
        accumulatedAnswers: Record<string, any>
    ): Promise<string> {
        const provider = getCurrentProvider();
        if (!provider || !providerRegistry.isInitialized()) {
            throw new Error('AI provider not initialized. Please configure your API key in settings.');
        }

        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        // Build prompt from step template and accumulated answers
        const prompt = this.buildStepPrompt(step, accumulatedAnswers);

        // Get conversation history
        const messages = session.messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role as 'user' | 'assistant' | 'system',
                content: m.content,
            }));

        // Add current question
        messages.push({
            role: 'user',
            content: prompt,
        });

        // Stream response
        let fullResponse = '';
        for await (const event of provider.createStreamedMessage({
            messages,
            system: this.getSystemPrompt(step),
        })) {
            if (event.type === 'content_block_delta' && event.data.delta?.text) {
                fullResponse += event.data.delta.text;
            }
            if (event.type === 'error') {
                throw new Error(`AI provider error: ${event.data.error?.message || 'Unknown error'}`);
            }
        }

        // Save assistant response
        session.messages.push({
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date().toISOString(),
            stepId: step.id,
        });

        return fullResponse;
    }

    /**
     * Generate artifacts for current step
     */
    async generateArtifacts(
        sessionId: string,
        step: WorkflowStepDefinition,
        aiResponse: string
    ): Promise<GeneratedArtifact[]> {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        const artifacts: GeneratedArtifact[] = [];

        if (!step.outputArtifacts || step.outputArtifacts.length === 0) {
            return artifacts;
        }

        // Parse AI response to extract artifacts
        // In a real implementation, the AI would return structured JSON
        // For now, we'll parse markdown code blocks
        
        for (const artifactPattern of step.outputArtifacts) {
            const artifact = this.parseArtifactFromResponse(aiResponse, artifactPattern, step.id);
            if (artifact) {
                artifacts.push(artifact);
            }
        }

        // Validate artifacts
        for (const artifact of artifacts) {
            const validation = await this.validateArtifact(artifact);
            artifact.validated = validation.valid;
            // Convert ValidationError[] from registry format to agent format
            artifact.validationErrors = validation.errors.map(err => ({
                path: err.path,
                message: err.message,
                code: err.code || '',
                suggestedFix: err.suggestedFix,
            }));
            
            session.validationResults[artifact.id] = validation;
        }

        // Add to session
        session.artifacts.push(...artifacts);

        return artifacts;
    }

    /**
     * Validate an artifact
     */
    private async validateArtifact(artifact: GeneratedArtifact): Promise<ValidationResult> {
        // Convert to registry format for validation
        const registryArtifact = {
            id: artifact.id,
            type: artifact.type as any,
            name: artifact.name,
            path: artifact.path,
            content: artifact.content,
            schema: artifact.schema,
        };
        const result = await artifactValidator.validateArtifact(registryArtifact);
        // Convert back to agent format
        return {
            valid: result.valid,
            errors: result.errors.map(err => ({
                path: err.path,
                message: err.message,
                code: err.code || '',
                suggestedFix: err.suggestedFix,
            })),
            warnings: result.warnings.map(warn => ({
                path: warn.path,
                message: warn.message,
                code: warn.code || '',
            })),
        };
    }

    /**
     * Build prompt for a step
     */
    private buildStepPrompt(step: WorkflowStepDefinition, answers: Record<string, any>): string {
        let prompt = `Step: ${step.title}\n`;
        if (step.description) {
            prompt += `Description: ${step.description}\n`;
        }

        if (Object.keys(answers).length > 0) {
            prompt += `\nPrevious answers:\n${JSON.stringify(answers, null, 2)}\n`;
        }

        if (step.promptTemplate) {
            prompt += `\n${step.promptTemplate}`;
        } else {
            prompt += `\nPlease generate the required artifacts for this step.`;
        }

        if (step.outputArtifacts) {
            prompt += `\n\nRequired artifacts:\n${step.outputArtifacts.map(a => `- ${a}`).join('\n')}`;
        }

        return prompt;
    }

    /**
     * Get system prompt for a step
     */
    private getSystemPrompt(step: WorkflowStepDefinition): string {
        return `You are an AI assistant helping users create UI component specifications for the Xala Platform UI library.

CRITICAL RULES:
1. You MUST ONLY output Xala spec artifacts (SECTION_*.md, COMPOSE_*.json, TESTIDS_*.json, E2E_*.md)
2. You MUST use ONLY components from @xala-technologies/platform-ui (no external UI kits)
3. You MUST follow Designsystemet design tokens (var(--ds-*))
4. You MUST ask questions ONE STEP AT A TIME
5. You MUST NOT invent components - use the inventory provided
6. You MUST validate all outputs against schemas

Current step: ${step.title}
${step.description ? `Step description: ${step.description}` : ''}

Generate artifacts in markdown code blocks with language tags (e.g., \`\`\`json, \`\`\`markdown).`;
    }

    /**
     * Parse artifact from AI response
     */
    private parseArtifactFromResponse(
        response: string,
        pattern: string,
        stepId: string
    ): GeneratedArtifact | null {
        // Extract artifact name from pattern
        // e.g., "SECTION_*.md" -> extract name from context
        const artifactName = pattern.replace('*', stepId).replace('_', '-').toLowerCase();
        
        // Try to find code blocks in response
        const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
        const markdownMatch = response.match(/```markdown\n([\s\S]*?)\n```/);
        
        let content = '';
        let type: GeneratedArtifact['type'] = 'section';
        
        if (pattern.includes('COMPOSE')) {
            type = 'compose';
            if (jsonMatch) {
                content = jsonMatch[1];
            }
        } else if (pattern.includes('TESTIDS')) {
            type = 'testids';
            if (jsonMatch) {
                content = jsonMatch[1];
            }
        } else if (pattern.includes('E2E')) {
            type = 'e2e';
            if (markdownMatch) {
                content = markdownMatch[1];
            }
        } else if (pattern.includes('SECTION')) {
            type = 'section';
            if (markdownMatch) {
                content = markdownMatch[1];
            }
        }

        if (!content) {
            return null;
        }

        return {
            id: `artifact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            name: artifactName,
            path: `specs/${pattern.replace('*', stepId)}`,
            content,
            schema: type,
        };
    }

    /**
     * Move to next step
     */
    nextStep(sessionId: string): void {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        session.currentStep += 1;
        session.updatedAt = new Date().toISOString();
    }

    /**
     * Move to previous step
     */
    previousStep(sessionId: string): void {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        if (session.currentStep > 0) {
            session.currentStep -= 1;
            session.updatedAt = new Date().toISOString();
        }
    }

    /**
     * Complete session
     */
    completeSession(sessionId: string): void {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        // In a real implementation, would generate export.manifest.json
        // For now, just mark as completed
        session.updatedAt = new Date().toISOString();
    }
}

// Singleton instance
export const workflowEngine = new WorkflowEngine();
