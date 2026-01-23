/**
 * Anthropic Browser Client
 * 
 * Browser-based Anthropic SDK client with streaming support.
 * Uses dangerouslyAllowBrowser flag for browser usage.
 * 
 * Security: API key stored in memory only, never persisted.
 */

import Anthropic from '@anthropic-ai/sdk';

// =============================================================================
// Types
// =============================================================================

export interface AnthropicConfig {
    apiKey: string;
    model?: string;
    maxTokens?: number;
    systemPrompt?: string;
}

export interface StreamMessageOptions {
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
    system?: string;
    maxTokens?: number;
    tools?: Array<{
        name: string;
        description: string;
        inputSchema: Record<string, any>;
    }>;
}

export type StreamEventType = 
    | 'message_start'
    | 'content_block_start'
    | 'content_block_delta'
    | 'content_block_stop'
    | 'message_delta'
    | 'message_stop'
    | 'tool_use_start'
    | 'tool_use_delta'
    | 'tool_use_stop';

export interface StreamEvent {
    type: StreamEventType;
    data: any;
}

// =============================================================================
// Client Class
// =============================================================================

export class AnthropicBrowserClient {
    private client: Anthropic | null = null;
    private apiKey: string | null = null;
    private defaultModel: string = 'claude-3-5-sonnet-20241022';
    private defaultMaxTokens: number = 4096;

    /**
     * Initialize client with API key
     * Key is stored in memory only, never persisted
     */
    initialize(config: AnthropicConfig): void {
        this.apiKey = config.apiKey;
        this.client = new Anthropic({
            apiKey: config.apiKey,
            dangerouslyAllowBrowser: true, // Required for browser usage
        });
        if (config.model) {
            this.defaultModel = config.model;
        }
        if (config.maxTokens) {
            this.defaultMaxTokens = config.maxTokens;
        }
    }

    /**
     * Check if client is initialized
     */
    isInitialized(): boolean {
        return this.client !== null && this.apiKey !== null;
    }

    /**
     * Get current API key (for display purposes only)
     */
    getApiKeyPreview(): string | null {
        if (!this.apiKey) return null;
        // Show first 8 and last 4 characters
        return `${this.apiKey.substring(0, 8)}...${this.apiKey.substring(this.apiKey.length - 4)}`;
    }

    /**
     * Clear API key from memory
     */
    clear(): void {
        this.apiKey = null;
        this.client = null;
    }

    /**
     * Create a streamed message
     * Returns an async iterator of stream events
     */
    async *createStreamedMessage(
        options: StreamMessageOptions
    ): AsyncGenerator<StreamEvent, void, unknown> {
        if (!this.client) {
            throw new Error('Anthropic client not initialized. Call initialize() first.');
        }

        const stream = await this.client.messages.stream({
            model: this.defaultModel,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            system: options.system || this.defaultSystemPrompt(),
            messages: options.messages,
            ...(options.tools && options.tools.length > 0
                ? { 
                    tools: options.tools.map(tool => ({
                        name: tool.name,
                        description: tool.description,
                        input_schema: tool.inputSchema, // Convert camelCase to snake_case
                    })) as any // Type assertion for Anthropic SDK compatibility
                }
                : {}),
        });

        try {
            for await (const event of stream) {
                yield {
                    type: event.type as StreamEventType,
                    data: event,
                };
            }
        } finally {
            stream.abort();
        }
    }

    /**
     * Create a non-streaming message (for simple requests)
     */
    async createMessage(options: StreamMessageOptions): Promise<string> {
        if (!this.client) {
            throw new Error('Anthropic client not initialized. Call initialize() first.');
        }

        const response = await this.client.messages.create({
            model: this.defaultModel,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            system: options.system || this.defaultSystemPrompt(),
            messages: options.messages,
            ...(options.tools && options.tools.length > 0
                ? { 
                    tools: options.tools.map(tool => ({
                        name: tool.name,
                        description: tool.description,
                        input_schema: tool.inputSchema, // Convert camelCase to snake_case
                    })) as any // Type assertion for Anthropic SDK compatibility
                }
                : {}),
        });

        // Extract text content from response
        const textBlocks = response.content.filter(
            (block: any): block is { type: 'text'; text: string } => block.type === 'text'
        ) as Array<{ type: 'text'; text: string }>;
        return textBlocks.map((block) => block.text).join('\n');
    }

    /**
     * Default system prompt for Xala Command Center workflows
     */
    private defaultSystemPrompt(): string {
        return `You are an AI assistant helping users create UI component specifications for the Xala Platform UI library.

CRITICAL RULES:
1. You MUST ONLY output Xala spec artifacts (SECTION_*.md, COMPOSE_*.json, TESTIDS_*.json, E2E_*.md)
2. You MUST use ONLY components from @xala-technologies/platform-ui (no external UI kits)
3. You MUST follow Designsystemet design tokens (var(--ds-*))
4. You MUST ask questions ONE STEP AT A TIME
5. You MUST NOT invent components - use the inventory provided
6. You MUST validate all outputs against schemas

Ask clear, focused questions. Generate artifacts step by step.`;
    }
}

// Singleton instance
export const anthropicClient = new AnthropicBrowserClient();
