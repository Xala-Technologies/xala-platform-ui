/**
 * AI Provider Exports
 * 
 * Central export point for AI provider functionality.
 */

export * from './types';
export * from './provider-registry';
export * from './providers/anthropic';
export * from './providers/openai';
export * from './providers/google-gemini';
export * from './providers/deepseek';
export * from './providers/openrouter';
export * from './providers/ollama';
export * from './providers/lmstudio';

// Re-export for backward compatibility
export { AnthropicProvider } from './providers/anthropic';
export { OpenAIProvider } from './providers/openai';
export { GoogleGeminiProvider } from './providers/google-gemini';
export { DeepSeekProvider } from './providers/deepseek';
export { OpenRouterProvider } from './providers/openrouter';
export { OllamaProvider } from './providers/ollama';
export { LMStudioProvider } from './providers/lmstudio';
export { providerRegistry, getCurrentProvider, setProvider, isProviderInitialized, clearProvider } from './provider-registry';
