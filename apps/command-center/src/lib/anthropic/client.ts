/**
 * Anthropic Browser Client
 * 
 * Browser-based Anthropic SDK client with streaming support.
 * Uses dangerouslyAllowBrowser flag for browser usage.
 * 
 * Security: API key stored in memory only, never persisted.
 * Supports both API key and OAuth token authentication.
 */

import Anthropic from '@anthropic-ai/sdk';

// =============================================================================
// Types
// =============================================================================

export type AuthMethod = 'apiKey' | 'oauth';

export interface AnthropicConfig {
    authMethod: 'apiKey';
    apiKey: string;
    model?: string;
    maxTokens?: number;
    systemPrompt?: string;
}

export interface AnthropicOAuthConfig {
    authMethod: 'oauth';
    accessToken: string;
    refreshToken?: string;
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
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    private authMethod: AuthMethod | null = null;
    private defaultModel: string = 'claude-3-5-sonnet-20240620';
    private defaultMaxTokens: number = 4096;

    /**
     * Initialize client with API key
     * Key is stored in memory only, never persisted
     */
    initialize(config: AnthropicConfig | AnthropicOAuthConfig): void {
        if (config.authMethod === 'apiKey') {
            this.authMethod = 'apiKey';
            this.apiKey = config.apiKey;
            this.accessToken = null;
            this.refreshToken = null;
            this.client = new Anthropic({
                apiKey: config.apiKey,
                dangerouslyAllowBrowser: true, // Required for browser usage
            });
        } else if (config.authMethod === 'oauth') {
            this.authMethod = 'oauth';
            this.accessToken = config.accessToken;
            this.refreshToken = config.refreshToken || null;
            this.apiKey = null;
            // For OAuth, we use the access token as the API key in the SDK
            // Note: Anthropic SDK may need custom headers for OAuth tokens
            this.client = new Anthropic({
                apiKey: config.accessToken, // OAuth access token used as API key
                dangerouslyAllowBrowser: true,
            });
        }

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
        return this.client !== null && (this.apiKey !== null || this.accessToken !== null);
    }

    /**
     * Get current authentication method
     */
    getAuthMethod(): AuthMethod | null {
        return this.authMethod;
    }

    /**
     * Get current API key or token preview (for display purposes only)
     */
    getApiKeyPreview(): string | null {
        if (this.apiKey) {
            // Show first 8 and last 4 characters
            return `${this.apiKey.substring(0, 8)}...${this.apiKey.substring(this.apiKey.length - 4)}`;
        }
        if (this.accessToken) {
            // Show first 8 and last 4 characters
            return `oauth:${this.accessToken.substring(0, 8)}...${this.accessToken.substring(this.accessToken.length - 4)}`;
        }
        return null;
    }

    /**
     * Check if using OAuth
     */
    isOAuth(): boolean {
        return this.authMethod === 'oauth';
    }

    /**
     * Refresh OAuth token (requires backend endpoint)
     */
    async refreshOAuthToken(backendUrl: string): Promise<void> {
        if (!this.refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch(`${backendUrl}/api/auth/anthropic/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: this.refreshToken,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            this.accessToken = data.accessToken;
            this.refreshToken = data.refreshToken || this.refreshToken;

            // Reinitialize client with new token
            this.client = new Anthropic({
                apiKey: this.accessToken,
                dangerouslyAllowBrowser: true,
            });
        } catch (error) {
            throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Clear authentication from memory
     */
    clear(): void {
        this.apiKey = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.authMethod = null;
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
     * List available models (for debugging)
     * Note: This requires a valid API key
     */
    async listModels(): Promise<string[]> {
        if (!this.client) {
            throw new Error('Anthropic client not initialized. Call initialize() first.');
        }

        try {
            // Note: Anthropic API doesn't have a models endpoint like OpenAI
            // Return common model names instead
            return [
                'claude-3-5-sonnet-20240620',
                'claude-3-opus-20240229',
                'claude-3-sonnet-20240229',
                'claude-3-haiku-20240307',
                'claude-3-5-haiku-20241022',
            ];
        } catch (error) {
            console.error('Failed to list models:', error);
            return [];
        }
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
