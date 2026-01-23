/**
 * Anthropic Provider - Simple Implementation
 * Fetches models from API, uses what's available. No hardcoding.
 */

import Anthropic from '@anthropic-ai/sdk';
import type { AIProviderClient, ProviderConfig, StreamMessageOptions, StreamEvent, ProviderModel } from '../../types';

export class AnthropicProvider implements AIProviderClient {
    readonly provider = 'anthropic' as const;
    private client: Anthropic | null = null;
    private apiKey: string | null = null;
    private model: string | null = null;
    private defaultMaxTokens: number = 4096;

    async initialize(config: ProviderConfig): Promise<void> {
        if (config.provider !== 'anthropic') throw new Error('Provider mismatch');

        this.apiKey = config.apiKey;
        this.client = new Anthropic({
            apiKey: config.apiKey,
            dangerouslyAllowBrowser: true,
        });

        if (config.maxTokens) this.defaultMaxTokens = config.maxTokens;

        // Use specified model OR fetch first available
        if (config.model) {
            this.model = config.model;
        } else {
            const models = await this.listModels();
            if (models.length === 0) throw new Error('No models available');
            this.model = models[0].id; // Use first available
            console.log(`[Anthropic] Auto-selected: ${this.model}`);
        }
    }

    isInitialized(): boolean {
        // Only require client and apiKey - model can be fetched lazily
        return !!(this.client && this.apiKey);
    }

    getApiKeyPreview(): string | null {
        return this.apiKey ? `${this.apiKey.slice(0, 8)}...${this.apiKey.slice(-4)}` : null;
    }

    clear(): void {
        this.apiKey = null;
        this.client = null;
        this.model = null;
    }

    /**
     * Ensure model is set - fetch from API if needed
     */
    private async ensureModel(): Promise<void> {
        if (this.model) return;
        const models = await this.listModels();
        if (models.length === 0) {
            // Fallback to default model if API call fails
            this.model = 'claude-sonnet-4-20250514';
        } else {
            this.model = models[0].id;
        }
        console.log(`[Anthropic] Using model: ${this.model}`);
    }

    async *createStreamedMessage(options: StreamMessageOptions): AsyncGenerator<StreamEvent, void, unknown> {
        if (!this.client) throw new Error('Not initialized');
        await this.ensureModel();

        const messages = options.messages
            .filter((m: any) => m.role !== 'system')
            .map((m: any) => ({ role: m.role, content: m.content }));

        const stream = await this.client.messages.stream({
            model: this.model as any,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            system: options.system || '',
            messages,
        });

        try {
            for await (const event of stream) {
                yield { type: event.type as any, data: event };
            }
        } finally {
            stream.abort();
        }
    }

    async createMessage(options: StreamMessageOptions): Promise<string> {
        if (!this.client) throw new Error('Not initialized');
        await this.ensureModel();

        const messages = options.messages
            .filter((m: any) => m.role !== 'system')
            .map((m: any) => ({ role: m.role, content: m.content }));

        const res = await this.client.messages.create({
            model: this.model as any,
            max_tokens: options.maxTokens || this.defaultMaxTokens,
            system: options.system || '',
            messages,
        });

        return res.content.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n');
    }

    async listModels(): Promise<ProviderModel[]> {
        if (!this.apiKey) return [];

        try {
            const res = await fetch('https://api.anthropic.com/v1/models', {
                headers: {
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01',
                },
            });

            if (!res.ok) throw new Error(`API error: ${res.status}`);

            const data = await res.json();
            return (data.data || []).map((m: any) => ({
                id: m.id,
                name: m.display_name || m.id,
                provider: 'anthropic',
                maxTokens: 8192,
                supportsStreaming: true,
                supportsTools: true,
            }));
        } catch (err) {
            console.error('[Anthropic] listModels failed:', err);
            return [];
        }
    }

    getDefaultModel(): string {
        return this.model || '';
    }
}
