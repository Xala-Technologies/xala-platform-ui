/**
 * LM Studio Provider Implementation
 * 
 * Browser-based LM Studio client with streaming support.
 * LM Studio runs models locally on your machine with a GUI.
 */

import OpenAI from 'openai';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class LMStudioProvider implements AIProviderClient {
    readonly provider = 'lmstudio' as const;
    private client: OpenAI | null = null;
    private apiKey: string | null = null; // Not used, but kept for interface compliance
    private defaultModel: string = ''; // Model name is dynamic based on what's loaded in LM Studio
    private defaultMaxTokens: number = 4096;
    private baseURL: string = 'http://localhost:1234/v1'; // Default LM Studio URL

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'lmstudio') {
            throw new Error('Provider mismatch');
        }

        // For LM Studio, API key is optional (can be empty)
        // Base URL can be configured via environment or defaults to localhost:1234
        const baseURL = (import.meta as any).env?.VITE_LMSTUDIO_BASE_URL || this.baseURL;
        
        this.apiKey = config.apiKey || 'lmstudio'; // Placeholder for interface compliance
        this.client = new OpenAI({
            apiKey: this.apiKey,
            baseURL: baseURL,
            dangerouslyAllowBrowser: true,
        });

        if (config.model) {
            this.defaultModel = config.model;
        }
        if (config.maxTokens) {
            this.defaultMaxTokens = config.maxTokens;
        }
    }

    isInitialized(): boolean {
        return this.client !== null;
    }

    getApiKeyPreview(): string | null {
        // LM Studio doesn't require API key, show server URL instead
        const baseURL = (import.meta as any).env?.VITE_LMSTUDIO_BASE_URL || this.baseURL;
        return `Local (${baseURL})`;
    }

    clear(): void {
        this.apiKey = null;
        this.client = null;
    }

    async *createStreamedMessage(options: StreamMessageOptions): AsyncGenerator<StreamEvent, void, unknown> {
        if (!this.client) {
            throw new Error('LM Studio client not initialized. Call initialize() first.');
        }

        if (!this.defaultModel) {
            throw new Error('Model not set. Please select a model that is loaded in LM Studio.');
        }

        const messages = options.messages.map(m => ({
            role: m.role === 'system' ? 'system' as const : m.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: m.content,
        }));

        if (options.system && !messages.some(m => m.role === 'system')) {
            messages.unshift({
                role: 'system',
                content: options.system,
            });
        }

        try {
            const stream = await this.client.chat.completions.create({
                model: this.defaultModel,
                messages: messages as any,
                max_tokens: options.maxTokens || this.defaultMaxTokens,
                temperature: options.temperature,
                stream: true,
            });

            for await (const chunk of stream) {
                const delta = chunk.choices[0]?.delta;
                if (delta?.content) {
                    yield {
                        type: 'content_block_delta',
                        data: { delta: { text: delta.content } },
                    };
                }
                if (chunk.choices[0]?.finish_reason) {
                    yield {
                        type: 'message_stop',
                        data: { finish_reason: chunk.choices[0].finish_reason },
                    };
                }
            }
        } catch (error) {
            yield {
                type: 'error',
                data: { error },
            };
        }
    }

    async createMessage(options: StreamMessageOptions): Promise<string> {
        if (!this.client) {
            throw new Error('LM Studio client not initialized. Call initialize() first.');
        }

        if (!this.defaultModel) {
            throw new Error('Model not set. Please select a model that is loaded in LM Studio.');
        }

        const messages = options.messages.map(m => ({
            role: m.role === 'system' ? 'system' as const : m.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: m.content,
        }));

        if (options.system && !messages.some(m => m.role === 'system')) {
            messages.unshift({
                role: 'system',
                content: options.system,
            });
        }

        const response = await this.client.chat.completions.create({
            model: this.defaultModel,
            messages: messages as any,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            temperature: options.temperature,
        });

        return response.choices[0]?.message?.content || '';
    }

    async listModels(): Promise<ProviderModel[]> {
        // LM Studio models are dynamic - users load them in the GUI
        // Try to fetch available models from the server
        const baseURL = (import.meta as any).env?.VITE_LMSTUDIO_BASE_URL || this.baseURL;

        try {
            // Try to fetch models from LM Studio server
            const response = await fetch(`${baseURL}/models`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                    return data.data.map((model: any) => ({
                        id: model.id || model.name || 'unknown',
                        name: model.name || model.id || 'Unknown Model',
                        provider: 'lmstudio',
                        description: `Model loaded in LM Studio`,
                        maxTokens: 8192,
                        supportsStreaming: true,
                        supportsTools: false,
                    }));
                }
            }
        } catch (error) {
            // If fetching fails (server not running or CORS), return helpful message
            console.warn('Could not fetch models from LM Studio:', error);
        }

        // Fallback: return common model names that users might have loaded
        // Users can also manually enter the exact model name
        return [
            {
                id: '',
                name: 'Enter model name from LM Studio',
                provider: 'lmstudio',
                description: 'Enter the exact model name as shown in LM Studio (e.g., "llama-3.1-8b-instruct-q4_K_M")',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
        ];
    }

    getDefaultModel(): string {
        return this.defaultModel || 'local-model';
    }
}
