/**
 * Ollama Provider Implementation
 * 
 * Browser-based Ollama client with streaming support.
 * Ollama runs models locally on your machine.
 */

import OpenAI from 'openai';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class OllamaProvider implements AIProviderClient {
    readonly provider = 'ollama' as const;
    private client: OpenAI | null = null;
    private apiKey: string | null = null; // Not used, but kept for interface compliance
    private defaultModel: string = 'llama3.1';
    private defaultMaxTokens: number = 4096;
    private baseURL: string = 'http://localhost:11434/v1'; // Default Ollama URL

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'ollama') {
            throw new Error('Provider mismatch');
        }

        // For Ollama, API key is optional (can be empty)
        // Base URL can be configured via environment or defaults to localhost
        const baseURL = (import.meta as any).env?.VITE_OLLAMA_BASE_URL || this.baseURL;
        
        this.apiKey = config.apiKey || 'ollama'; // Placeholder for interface compliance
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
        // Ollama doesn't require API key, show server URL instead
        const baseURL = (import.meta as any).env?.VITE_OLLAMA_BASE_URL || this.baseURL;
        return `Local (${baseURL})`;
    }

    clear(): void {
        this.apiKey = null;
        this.client = null;
    }

    async *createStreamedMessage(options: StreamMessageOptions): AsyncGenerator<StreamEvent, void, unknown> {
        if (!this.client) {
            throw new Error('Ollama client not initialized. Call initialize() first.');
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
            throw new Error('Ollama client not initialized. Call initialize() first.');
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
        // Common Ollama models - users need to pull them locally first
        return [
            {
                id: 'llama3.1',
                name: 'Llama 3.1',
                provider: 'ollama',
                description: 'Latest Llama 3.1 model',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'llama3.1:70b',
                name: 'Llama 3.1 70B',
                provider: 'ollama',
                description: 'Llama 3.1 70B (larger, more capable)',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'llama3',
                name: 'Llama 3',
                provider: 'ollama',
                description: 'Llama 3 base model',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'mistral',
                name: 'Mistral',
                provider: 'ollama',
                description: 'Mistral 7B model',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'mixtral',
                name: 'Mixtral',
                provider: 'ollama',
                description: 'Mixtral 8x7B model',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'codellama',
                name: 'CodeLlama',
                provider: 'ollama',
                description: 'CodeLlama for code generation',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'phi3',
                name: 'Phi-3',
                provider: 'ollama',
                description: 'Microsoft Phi-3 small model',
                maxTokens: 4096,
                supportsStreaming: true,
                supportsTools: false,
            },
        ];
    }

    getDefaultModel(): string {
        return this.defaultModel;
    }
}
