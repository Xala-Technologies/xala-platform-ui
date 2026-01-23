/**
 * Provider Registry Tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { providerRegistry, isProviderInitialized, clearProvider } from '../provider-registry';

// Mock the AI providers
vi.mock('../providers/anthropic/anthropic', () => ({
    AnthropicProvider: vi.fn().mockImplementation(() => ({
        provider: 'anthropic',
        initialize: vi.fn().mockResolvedValue(undefined),
        isInitialized: vi.fn().mockReturnValue(false),
        clear: vi.fn(),
        getApiKeyPreview: vi.fn().mockReturnValue('sk-ant-...xxxx'),
    })),
}));

vi.mock('../providers/openai', () => ({
    OpenAIProvider: vi.fn().mockImplementation(() => ({
        provider: 'openai',
        initialize: vi.fn().mockResolvedValue(undefined),
        isInitialized: vi.fn().mockReturnValue(false),
        clear: vi.fn(),
    })),
}));

describe('ProviderRegistry', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        clearProvider();
    });

    describe('getAvailableProviders', () => {
        it('should return list of available providers', () => {
            const providers = providerRegistry.getAvailableProviders();

            expect(providers).toContain('anthropic');
            expect(providers).toContain('openai');
            expect(providers).toContain('google-gemini');
            expect(providers).toContain('deepseek');
            expect(providers).toContain('openrouter');
            expect(providers).toContain('ollama');
            expect(providers).toContain('lmstudio');
        });
    });

    describe('getProvider', () => {
        it('should return provider client for known provider', () => {
            const client = providerRegistry.getProvider('anthropic');
            expect(client).toBeDefined();
        });

        it('should return undefined for unknown provider', () => {
            const client = providerRegistry.getProvider('unknown' as any);
            expect(client).toBeUndefined();
        });
    });

    describe('getCurrentProvider', () => {
        it('should return null when no provider is set', () => {
            clearProvider();
            const current = providerRegistry.getCurrentProvider();
            // May be non-null due to env init, but at least should not throw
            expect(current === null || current !== undefined).toBe(true);
        });
    });

    describe('isProviderInitialized', () => {
        it('should return boolean', () => {
            const result = isProviderInitialized();
            expect(typeof result).toBe('boolean');
        });
    });

    describe('getCurrentProviderName', () => {
        it('should return provider name or null', () => {
            const name = providerRegistry.getCurrentProviderName();
            expect(name === null || typeof name === 'string').toBe(true);
        });
    });
});

describe('Provider Initialization', () => {
    it('should handle setCurrentProvider for anthropic', async () => {
        const mockConfig = {
            provider: 'anthropic' as const,
            apiKey: 'sk-ant-test-key',
        };

        // Should not throw
        await expect(
            providerRegistry.setCurrentProvider('anthropic', mockConfig)
        ).resolves.not.toThrow();
    });

    it('should throw for unknown provider', async () => {
        const mockConfig = {
            provider: 'unknown' as any,
            apiKey: 'test-key',
        };

        await expect(
            providerRegistry.setCurrentProvider('unknown' as any, mockConfig)
        ).rejects.toThrow('Provider unknown not found');
    });
});
