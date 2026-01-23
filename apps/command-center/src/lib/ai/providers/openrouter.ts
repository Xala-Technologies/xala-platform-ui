/**
 * OpenRouter Provider Implementation
 * 
 * Browser-based OpenRouter client with streaming support.
 * OpenRouter provides unified access to multiple AI models.
 */

import OpenAI from 'openai';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class OpenRouterProvider implements AIProviderClient {
    readonly provider = 'openrouter' as const;
    private client: OpenAI | null = null;
    private apiKey: string | null = null;
    private defaultModel: string = 'anthropic/claude-3.5-sonnet';
    private defaultMaxTokens: number = 4096;
    private baseURL: string = 'https://openrouter.ai/api/v1';

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'openrouter') {
            throw new Error('Provider mismatch');
        }

        this.apiKey = config.apiKey;
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: this.baseURL,
            defaultHeaders: {
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Xala Command Center',
            },
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
            throw new Error('OpenRouter client not initialized. Call initialize() first.');
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
            throw new Error('OpenRouter client not initialized. Call initialize() first.');
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
        // OpenRouter supports many models - return popular ones
        // Users can also enter custom model IDs
        return [
            {
                id: 'anthropic/claude-3.5-sonnet',
                name: 'Claude 3.5 Sonnet (via OpenRouter)',
                provider: 'openrouter',
                description: 'Anthropic Claude 3.5 Sonnet',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'openai/gpt-4o',
                name: 'GPT-4o (via OpenRouter)',
                provider: 'openrouter',
                description: 'OpenAI GPT-4o',
                maxTokens: 16384,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'google/gemini-pro-1.5',
                name: 'Gemini Pro 1.5 (via OpenRouter)',
                provider: 'openrouter',
                description: 'Google Gemini Pro 1.5',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'deepseek/deepseek-chat',
                name: 'DeepSeek Chat (via OpenRouter)',
                provider: 'openrouter',
                description: 'DeepSeek Chat model',
                maxTokens: 16384,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'meta-llama/llama-3.1-70b-instruct',
                name: 'Llama 3.1 70B (via OpenRouter)',
                provider: 'openrouter',
                description: 'Meta Llama 3.1 70B Instruct',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
            {
                id: 'mistralai/mixtral-8x7b-instruct',
                name: 'Mixtral 8x7B (via OpenRouter)',
                provider: 'openrouter',
                description: 'Mistral Mixtral 8x7B Instruct',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: false,
            },
        ];
    }

    getDefaultModel(): string {
        return this.defaultModel;
    }
}
