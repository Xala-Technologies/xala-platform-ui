/**
 * AI Provider Types
 * 
 * Common types and interfaces for multi-provider AI support.
 */

// =============================================================================
// Provider Types
// =============================================================================

export type AIProvider = 'anthropic' | 'openai' | 'google-gemini' | 'deepseek' | 'openrouter' | 'ollama' | 'lmstudio';

export type AuthMethod = 'apiKey' | 'oauth';

export interface StreamMessageOptions {
    messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
    }>;
    system?: string;
    maxTokens?: number;
    temperature?: number;
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
    | 'tool_use_stop'
    | 'error';

export interface StreamEvent {
    type: StreamEventType;
    data: any;
}

export interface ProviderConfig {
    provider: AIProvider;
    apiKey: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
}

export interface ProviderModel {
    id: string;
    name: string;
    provider: AIProvider;
    description?: string;
    maxTokens?: number;
    supportsStreaming?: boolean;
    supportsTools?: boolean;
}

// =============================================================================
// Provider Interface
// =============================================================================

export interface AIProviderClient {
    /**
     * Provider identifier
     */
    readonly provider: AIProvider;

    /**
     * Initialize the provider client
     */
    initialize(config: ProviderConfig): void;

    /**
     * Check if client is initialized
     */
    isInitialized(): boolean;

    /**
     * Get current API key preview (for display)
     */
    getApiKeyPreview(): string | null;

    /**
     * Clear authentication from memory
     */
    clear(): void;

    /**
     * Create a streamed message
     * Returns an async iterator of stream events
     */
    createStreamedMessage(options: StreamMessageOptions): AsyncGenerator<StreamEvent, void, unknown>;

    /**
     * Create a non-streaming message
     */
    createMessage(options: StreamMessageOptions): Promise<string>;

    /**
     * List available models for this provider
     */
    listModels(): Promise<ProviderModel[]>;

    /**
     * Get default model for this provider
     */
    getDefaultModel(): string;
}
