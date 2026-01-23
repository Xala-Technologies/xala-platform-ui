/**
 * Anthropic Provider Implementation
 * 
 * Browser-based Anthropic SDK client with streaming support.
 */

import Anthropic from '@anthropic-ai/sdk';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class AnthropicProvider implements AIProviderClient {
    readonly provider = 'anthropic' as const;
    private client: Anthropic | null = null;
    private apiKey: string | null = null;
    private defaultModel: string = 'claude-3-5-sonnet-20240620';
    private defaultMaxTokens: number = 4096;

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'anthropic') {
            throw new Error('Provider mismatch');
        }

        this.apiKey = config.apiKey;
        this.client = new Anthropic({
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
            throw new Error('Anthropic client not initialized. Call initialize() first.');
        }

        // Convert messages format (Anthropic doesn't use 'system' role in messages array)
        const messages = options.messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            }));

        const stream = await this.client.messages.stream({
            model: this.defaultModel,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            system: options.system || options.messages.find(m => m.role === 'system')?.content || '',
            messages,
            ...(options.tools && options.tools.length > 0
                ? { 
                    tools: options.tools.map(tool => ({
                        name: tool.name,
                        description: tool.description,
                        input_schema: tool.inputSchema,
                    })) as any
                }
                : {}),
        });

        try {
            for await (const event of stream) {
                yield {
                    type: event.type as StreamEvent['type'],
                    data: event,
                };
            }
        } finally {
            stream.abort();
        }
    }

    async createMessage(options: StreamMessageOptions): Promise<string> {
        if (!this.client) {
            throw new Error('Anthropic client not initialized. Call initialize() first.');
        }

        const messages = options.messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            }));

        const response = await this.client.messages.create({
            model: this.defaultModel,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            system: options.system || options.messages.find(m => m.role === 'system')?.content || '',
            messages,
            ...(options.tools && options.tools.length > 0
                ? { 
                    tools: options.tools.map(tool => ({
                        name: tool.name,
                        description: tool.description,
                        input_schema: tool.inputSchema,
                    })) as any
                }
                : {}),
        });

        const textBlocks = response.content.filter(
            (block: any): block is { type: 'text'; text: string } => block.type === 'text'
        ) as Array<{ type: 'text'; text: string }>;
        return textBlocks.map((block) => block.text).join('\n');
    }

    async listModels(): Promise<ProviderModel[]> {
        return [
            {
                id: 'claude-3-5-sonnet-20240620',
                name: 'Claude 3.5 Sonnet',
                provider: 'anthropic',
                description: 'Most capable model, best for complex tasks',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'claude-3-5-haiku-20241022',
                name: 'Claude 3.5 Haiku',
                provider: 'anthropic',
                description: 'Fast and cost-effective',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'claude-3-opus-20240229',
                name: 'Claude 3 Opus',
                provider: 'anthropic',
                description: 'Most capable Claude 3 model',
                maxTokens: 4096,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'claude-3-sonnet-20240229',
                name: 'Claude 3 Sonnet',
                provider: 'anthropic',
                description: 'Balanced performance',
                maxTokens: 4096,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'claude-3-haiku-20240307',
                name: 'Claude 3 Haiku',
                provider: 'anthropic',
                description: 'Fastest and most cost-effective',
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
