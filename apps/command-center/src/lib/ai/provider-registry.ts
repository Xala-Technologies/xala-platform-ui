/**
 * AI Provider Registry
 * 
 * Central registry for managing multiple AI providers.
 */

import type { AIProvider, AIProviderClient, ProviderConfig } from './types';
import { AnthropicProvider } from './providers/anthropic/anthropic';
import { OpenAIProvider } from './providers/openai';
import { GoogleGeminiProvider } from './providers/google-gemini';
import { DeepSeekProvider } from './providers/deepseek';
import { OpenRouterProvider } from './providers/openrouter';
import { OllamaProvider } from './providers/ollama';
import { LMStudioProvider } from './providers/lmstudio';

// =============================================================================
// Provider Registry
// =============================================================================

class ProviderRegistry {
    private providers: Map<AIProvider, AIProviderClient> = new Map();
    private currentProvider: AIProvider | null = null;

    constructor() {
        // Register available providers
        this.register('anthropic', new AnthropicProvider());
        this.register('openai', new OpenAIProvider());
        this.register('google-gemini', new GoogleGeminiProvider());
        this.register('deepseek', new DeepSeekProvider());
        this.register('openrouter', new OpenRouterProvider());
        this.register('ollama', new OllamaProvider());
        this.register('lmstudio', new LMStudioProvider());

        // Auto-initialize from environment variables
        this.initFromEnv();
    }

    /**
     * Auto-initialize provider from VITE_* environment variables
     * Uses synchronous initialization to ensure provider is ready before modal check
     */
    private initFromEnv(): void {
        // Check for Anthropic key first (preferred)
        const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
        if (anthropicKey) {
            this.initProviderSync('anthropic', anthropicKey);
            return;
        }

        // Check for OpenAI key
        const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (openaiKey) {
            this.initProviderSync('openai', openaiKey);
            return;
        }

        // Check for Google Gemini key
        const geminiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        if (geminiKey) {
            this.initProviderSync('google-gemini', geminiKey);
            return;
        }

        // Check for DeepSeek key
        const deepseekKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
        if (deepseekKey) {
            this.initProviderSync('deepseek', deepseekKey);
            return;
        }

        // Check for OpenRouter key
        const openrouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (openrouterKey) {
            this.initProviderSync('openrouter', openrouterKey);
            return;
        }
    }

    /**
     * Synchronously initialize a provider (for env-based config)
     */
    private initProviderSync(provider: AIProvider, apiKey: string): void {
        const client = this.providers.get(provider);
        if (!client) return;

        const config: ProviderConfig = { provider, apiKey };

        // Initialize synchronously (ignore any async promise)
        if ('initialize' in client && typeof (client as any).initialize === 'function') {
            (client as any).initialize(config);
        }
        this.currentProvider = provider;
    }

    /**
     * Register a provider
     */
    register(provider: AIProvider, client: AIProviderClient): void {
        this.providers.set(provider, client);
    }

    /**
     * Get a provider client
     */
    getProvider(provider: AIProvider): AIProviderClient | undefined {
        return this.providers.get(provider);
    }

    /**
     * Get current active provider
     */
    getCurrentProvider(): AIProviderClient | null {
        if (!this.currentProvider) {
            return null;
        }
        return this.providers.get(this.currentProvider) || null;
    }

    /**
     * Set current provider and initialize it
     */
    async setCurrentProvider(provider: AIProvider, config: ProviderConfig): Promise<void> {
        const client = this.providers.get(provider);
        if (!client) {
            throw new Error(`Provider ${provider} not found`);
        }

        // Clear previous provider
        if (this.currentProvider && this.currentProvider !== provider) {
            const previousClient = this.providers.get(this.currentProvider);
            previousClient?.clear();
        }

        // Initialize new provider (may be async for Anthropic)
        if ('initialize' in client && typeof (client as any).initialize === 'function') {
            const initResult = (client as any).initialize(config);
            if (initResult instanceof Promise) {
                await initResult;
            }
        } else {
            (client as any).initialize(config);
        }
        this.currentProvider = provider;
    }

    /**
     * Check if any provider is initialized
     */
    isInitialized(): boolean {
        if (!this.currentProvider) {
            return false;
        }
        const client = this.providers.get(this.currentProvider);
        return client?.isInitialized() || false;
    }

    /**
     * Clear current provider
     */
    clear(): void {
        if (this.currentProvider) {
            const client = this.providers.get(this.currentProvider);
            client?.clear();
        }
        this.currentProvider = null;
    }

    /**
     * Get list of available providers
     */
    getAvailableProviders(): AIProvider[] {
        return Array.from(this.providers.keys());
    }

    /**
     * Get API key preview from current provider
     */
    getApiKeyPreview(): string | null {
        if (!this.currentProvider) {
            return null;
        }
        const client = this.providers.get(this.currentProvider);
        return client?.getApiKeyPreview() || null;
    }

    /**
     * Get current provider name
     */
    getCurrentProviderName(): AIProvider | null {
        return this.currentProvider;
    }
}

// Singleton instance
export const providerRegistry = new ProviderRegistry();

// Convenience exports
export function getCurrentProvider(): AIProviderClient | null {
    return providerRegistry.getCurrentProvider();
}

export async function setProvider(provider: AIProvider, config: ProviderConfig): Promise<void> {
    await providerRegistry.setCurrentProvider(provider, config);
}

export function isProviderInitialized(): boolean {
    return providerRegistry.isInitialized();
}

export function clearProvider(): void {
    providerRegistry.clear();
}
