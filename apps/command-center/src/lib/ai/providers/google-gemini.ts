/**
 * Google Gemini Provider Implementation
 * 
 * Browser-based Google Gemini SDK client with streaming support.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../types';

export class GoogleGeminiProvider implements AIProviderClient {
    readonly provider = 'google-gemini' as const;
    private client: GoogleGenerativeAI | null = null;
    private apiKey: string | null = null;
    private defaultModel: string = 'gemini-1.5-pro';
    private defaultMaxTokens: number = 4096;

    initialize(config: ProviderConfig): void {
        if (config.provider !== 'google-gemini') {
            throw new Error('Provider mismatch');
        }

        this.apiKey = config.apiKey;
        this.client = new GoogleGenerativeAI(config.apiKey);

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
            throw new Error('Google Gemini client not initialized. Call initialize() first.');
        }

        const model = this.client.getGenerativeModel({
            model: this.defaultModel,
            generationConfig: {
                maxOutputTokens: options.maxTokens || this.defaultMaxTokens,
                temperature: options.temperature,
            },
        });

        // Build conversation history
        const history = options.messages
            .filter(m => m.role !== 'system')
            .slice(0, -1) // All except last message
            .map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
            }));

        const lastMessage = options.messages[options.messages.length - 1];
        const prompt = lastMessage?.content || '';

        // Add system instruction if provided
        const systemInstruction = options.system || options.messages.find(m => m.role === 'system')?.content;

        try {
            const chat = model.startChat({
                history: history as any,
                systemInstruction: systemInstruction,
            });

            const result = await chat.sendMessageStream(prompt);

            for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                    yield {
                        type: 'content_block_delta',
                        data: { delta: { text } },
                    };
                }
            }

            yield {
                type: 'message_stop',
                data: {},
            };
        } catch (error) {
            yield {
                type: 'error',
                data: { error },
            };
        }
    }

    async createMessage(options: StreamMessageOptions): Promise<string> {
        if (!this.client) {
            throw new Error('Google Gemini client not initialized. Call initialize() first.');
        }

        const model = this.client.getGenerativeModel({
            model: this.defaultModel,
            generationConfig: {
                maxOutputTokens: options.maxTokens || this.defaultMaxTokens,
                temperature: options.temperature,
            },
        });

        // Build conversation history
        const history = options.messages
            .filter(m => m.role !== 'system')
            .slice(0, -1)
            .map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
            }));

        const lastMessage = options.messages[options.messages.length - 1];
        const prompt = lastMessage?.content || '';

        const systemInstruction = options.system || options.messages.find(m => m.role === 'system')?.content;

        const chat = model.startChat({
            history: history as any,
            systemInstruction: systemInstruction,
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    }

    async listModels(): Promise<ProviderModel[]> {
        return [
            {
                id: 'gemini-1.5-pro',
                name: 'Gemini 1.5 Pro',
                provider: 'google-gemini',
                description: 'Most capable model, best for complex tasks',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'gemini-1.5-flash',
                name: 'Gemini 1.5 Flash',
                provider: 'google-gemini',
                description: 'Faster and more cost-effective',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            },
            {
                id: 'gemini-pro',
                name: 'Gemini Pro',
                provider: 'google-gemini',
                description: 'Balanced performance',
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
