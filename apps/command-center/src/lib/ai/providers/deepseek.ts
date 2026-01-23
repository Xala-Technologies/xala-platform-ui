/**
 * Deep Seek Provider Implementation
 * 
 * Browser-based Deep Seek client with streaming support.
 * Uses OpenAI-compatible API.
 */

import OpenAI from 'openai';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class DeepSeekProvider implements AIProviderClient {
    readonly provider = 'deepseek' as const;
    private client: OpenAI | null = null;
    private apiKey: string | null = null;
    private defaultModel: string = 'deepseek-chat';
    private defaultMaxTokens: number = 4096;
    private baseURL: string = 'https://api.deepseek.com';

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'deepseek') {
            throw new Error('Provider mismatch');
        }

        this.apiKey = config.apiKey;
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: this.baseURL,
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
            throw new Error('Deep Seek client not initialized. Call initialize() first.');
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
            throw new Error('Deep Seek client not initialized. Call initialize() first.');
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
                id: 'deepseek-chat',
                name: 'DeepSeek Chat',
                provider: 'deepseek',
                description: 'Main chat model, optimized for dialogue',
                maxTokens: 16384,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'deepseek-coder',
                name: 'DeepSeek Coder',
                provider: 'deepseek',
                description: 'Specialized for code generation',
                maxTokens: 16384,
                supportsStreaming: true,
                supportsTools: true,
            },
        ];
    }

    getDefaultModel(): string {
        return this.defaultModel;
    }
}
