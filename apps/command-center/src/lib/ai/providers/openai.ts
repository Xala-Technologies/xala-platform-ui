/**
 * OpenAI Provider Implementation
 * 
 * Browser-based OpenAI SDK client with streaming support.
 */

import OpenAI from 'openai';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class OpenAIProvider implements AIProviderClient {
    readonly provider = 'openai' as const;
    private client: OpenAI | null = null;
    private apiKey: string | null = null;
    private defaultModel: string = 'gpt-4o';
    private defaultMaxTokens: number = 4096;

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'openai') {
            throw new Error('Provider mismatch');
        }

        this.apiKey = config.apiKey;
        this.client = new OpenAI({
            apiKey: config.apiKey,
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
        return this.client !== null && this.apiKey !== null;
    }

    getApiKeyPreview(): string | null {
        if (!this.apiKey) return null;
        return `${this.apiKey.substring(0, 8)}...${this.apiKey.substring(this.apiKey.length - 4)}`;
    }

    clear(): void {
        this.apiKey = null;
        this.client = null;
    }

    async *createStreamedMessage(options: StreamMessageOptions): AsyncGenerator<StreamEvent, void, unknown> {
        if (!this.client) {
            throw new Error('OpenAI client not initialized. Call initialize() first.');
        }

        // Convert messages format for OpenAI
        const messages = options.messages.map(m => ({
            role: m.role === 'system' ? 'system' as const : m.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: m.content,
        }));

        // Add system message if provided separately
        if (options.system && !messages.some(m => m.role === 'system')) {
            messages.unshift({
                role: 'system',
                content: options.system,
            });
        }

        const stream = await this.client.chat.completions.create({
            model: this.defaultModel,
            messages: messages as any,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            temperature: options.temperature,
            stream: true,
            ...(options.tools && options.tools.length > 0
                ? {
                    tools: options.tools.map(tool => ({
                        type: 'function' as const,
                        function: {
                            name: tool.name,
                            description: tool.description,
                            parameters: tool.inputSchema,
                        },
                    })),
                }
                : {}),
        });

        try {
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
            throw new Error('OpenAI client not initialized. Call initialize() first.');
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
            ...(options.tools && options.tools.length > 0
                ? {
                    tools: options.tools.map(tool => ({
                        type: 'function' as const,
                        function: {
                            name: tool.name,
                            description: tool.description,
                            parameters: tool.inputSchema,
                        },
                    })),
                }
                : {}),
        });

        return response.choices[0]?.message?.content || '';
    }

    async listModels(): Promise<ProviderModel[]> {
        return [
            {
                id: 'gpt-4o',
                name: 'GPT-4o',
                provider: 'openai',
                description: 'Most capable model, optimized for speed',
                maxTokens: 16384,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'gpt-4o-mini',
                name: 'GPT-4o Mini',
                provider: 'openai',
                description: 'Faster and more affordable',
                maxTokens: 16384,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'gpt-4-turbo',
                name: 'GPT-4 Turbo',
                provider: 'openai',
                description: 'High intelligence, fast responses',
                maxTokens: 4096,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'gpt-4',
                name: 'GPT-4',
                provider: 'openai',
                description: 'Most capable GPT-4 model',
                maxTokens: 4096,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'gpt-3.5-turbo',
                name: 'GPT-3.5 Turbo',
                provider: 'openai',
                description: 'Fast and cost-effective',
                maxTokens: 4096,
                supportsStreaming: true,
                supportsTools: true,
            },
        ];
    }

    getDefaultModel(): string {
        return this.defaultModel;
    }
}
