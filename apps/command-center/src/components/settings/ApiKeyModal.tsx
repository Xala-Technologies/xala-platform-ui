/**
 * API Key Management Modal
 * 
 * Secure authentication modal supporting multiple AI providers (Anthropic, OpenAI, Google Gemini)
 * and both API key and OAuth authentication methods.
 * API key stored in memory only, never persisted.
 */

import { useState, useEffect } from 'react';
import {
    Paragraph,
    Button,
    Stack,
    Textfield,
    Field,
    Label,
    Alert,
    Tag,
    Select,
    Modal,
    Tabs,
    Radio,
    Fieldset,
} from '@xala-technologies/platform-ui';
import { providerRegistry, type AIProvider, type ProviderConfig } from '../../lib/ai';
import { anthropicOAuth } from '../../lib/anthropic/oauth';
import { TESTIDS } from '../../constants/testids';
import type { AuthMethod } from '../../lib/ai/types';

// =============================================================================
// Types
// =============================================================================

export interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onKeySet: () => void;
}

// =============================================================================
// Component
// =============================================================================

export function ApiKeyModal({ isOpen, onClose, onKeySet }: ApiKeyModalProps) {
    const [provider, setProvider] = useState<AIProvider>('anthropic');
    const [authMethod, setAuthMethod] = useState<AuthMethod>('apiKey');
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('');
    const [maxTokens, setMaxTokens] = useState(4096);
    const [availableModels, setAvailableModels] = useState<Array<{ id: string; name: string }>>([]);
    const [error, setError] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const [oauthConfig] = useState({
        backendUrl: (import.meta as any).env?.VITE_ANTHROPIC_OAUTH_BACKEND_URL || '',
        clientId: (import.meta as any).env?.VITE_ANTHROPIC_OAUTH_CLIENT_ID || '',
        redirectUri: `${window.location.origin}/oauth/callback`,
    });

    // Load models when provider changes
    useEffect(() => {
        const loadModels = async () => {
            const providerClient = providerRegistry.getProvider(provider);
            if (providerClient) {
                try {
                    const models = await providerClient.listModels();
                    setAvailableModels(models.map(m => ({ id: m.id, name: m.name })));
                    
                    // For Anthropic, prefer sonnet models (supports both old and new naming)
                    // Old: claude-3-5-sonnet-*, claude-3-sonnet-*
                    // New: claude-sonnet-4-5-*
                    if (models.length > 0 && !model) {
                        const sonnetModel = models.find(m => {
                            const id = m.id.toLowerCase();
                            return id.includes('sonnet');
                        });
                        setModel(sonnetModel?.id || models[0].id);
                    }
                } catch (err) {
                    console.error('Failed to load models:', err);
                    // Set error but don't block UI
                    if (provider === 'anthropic') {
                        setError('Could not fetch available models. Using default model.');
                    }
                }
            }
        };
        loadModels();
    }, [provider]);

    // Check if key is already set
    useEffect(() => {
        if (isOpen && providerRegistry.isInitialized()) {
            const currentProvider = providerRegistry.getCurrentProviderName();
            if (currentProvider) {
                setProvider(currentProvider);
            }
            const preview = providerRegistry.getApiKeyPreview();
            if (preview) {
                setApiKey(preview);
            }
        }
    }, [isOpen]);

    // Initialize OAuth service when config is available
    useEffect(() => {
        if (oauthConfig.backendUrl && oauthConfig.clientId) {
            anthropicOAuth.initialize({
                backendUrl: oauthConfig.backendUrl,
                clientId: oauthConfig.clientId,
                redirectUri: oauthConfig.redirectUri,
            });
        }
    }, [oauthConfig]);

    /**
     * Handle OAuth authorization
     */
    const handleOAuthLogin = () => {
        if (!oauthConfig.backendUrl || !oauthConfig.clientId) {
            setError('OAuth configuration is missing. Please set VITE_ANTHROPIC_OAUTH_BACKEND_URL and VITE_ANTHROPIC_OAUTH_CLIENT_ID environment variables.');
            return;
        }

        try {
            anthropicOAuth.startAuthorization();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to start OAuth flow');
        }
    };

    /**
     * Handle save (API key method)
     */
    const handleSave = async () => {
        // Ollama doesn't require API key
        if (provider !== 'ollama' && !apiKey.trim()) {
            setError('API key is required');
            return;
        }

        if (!model) {
            setError('Please select a model');
            return;
        }

        setIsValidating(true);
        setError(null);

        try {
            // Initialize provider with API key
            const config: ProviderConfig = {
                provider,
                apiKey: apiKey.trim() || (provider === 'ollama' ? 'ollama' : provider === 'lmstudio' ? 'lmstudio' : ''), // Local providers can use empty key
                model,
                maxTokens,
            };

            await providerRegistry.setCurrentProvider(provider, config);

            // Test connection with a simple request
            const currentProvider = providerRegistry.getCurrentProvider();
            if (!currentProvider) {
                throw new Error('Provider not initialized');
            }

            await currentProvider.createMessage({
                messages: [
                    {
                        role: 'user',
                        content: 'Hello',
                    },
                ],
                maxTokens: 10,
            });

            // Success
            onKeySet();
            onClose();
            setApiKey('');
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to validate API key');
        } finally {
            setIsValidating(false);
        }
    };

    /**
     * Handle clear
     */
    const handleClear = () => {
        providerRegistry.clear();
        setApiKey('');
        setError(null);
        onClose();
    };

    const getProviderPlaceholder = (): string => {
        switch (provider) {
            case 'anthropic':
                return 'sk-ant-...';
            case 'openai':
                return 'sk-...';
            case 'google-gemini':
                return 'AIza...';
            case 'deepseek':
                return 'sk-...';
            case 'openrouter':
                return 'sk-or-...';
            case 'ollama':
                return 'Optional (leave empty for local)';
            case 'lmstudio':
                return 'Optional (leave empty for local)';
            default:
                return 'Enter API key...';
        }
    };

    const getProviderName = (): string => {
        switch (provider) {
            case 'anthropic':
                return 'Anthropic';
            case 'openai':
                return 'OpenAI';
            case 'google-gemini':
                return 'Google Gemini';
            case 'deepseek':
                return 'Deep Seek';
            case 'openrouter':
                return 'OpenRouter';
            case 'ollama':
                return 'Ollama (Local)';
            case 'lmstudio':
                return 'LM Studio (Local)';
            default:
                return 'AI Provider';
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="AI Provider Configuration"
            size="md"
            footer={
                <Stack direction="horizontal" spacing="var(--ds-spacing-2)" justify="end">
                    <Button
                        data-color="neutral"
                        onClick={onClose}
                        disabled={isValidating}
                    >
                        Cancel
                    </Button>
                    {providerRegistry.isInitialized() && (
                        <Button
                            data-color="warning"
                            onClick={handleClear}
                            disabled={isValidating}
                        >
                            Clear
                        </Button>
                    )}
                    {authMethod === 'apiKey' && (
                        <Button
                            data-color="accent"
                            onClick={handleSave}
                            disabled={isValidating || !apiKey.trim() || !model}
                            data-testid={TESTIDS.common.apiKeySave}
                        >
                            {isValidating ? 'Validating...' : 'Save'}
                        </Button>
                    )}
                    {authMethod === 'oauth' && provider === 'anthropic' && (
                        <Button
                            data-color="accent"
                            onClick={handleOAuthLogin}
                            disabled={isValidating || !oauthConfig.backendUrl || !oauthConfig.clientId}
                        >
                            Sign in with OAuth
                        </Button>
                    )}
                </Stack>
            }
        >
            <Stack spacing="var(--ds-spacing-4)">
                <Tabs
                    value={authMethod}
                    onChange={(value) => setAuthMethod(value as AuthMethod)}
                >
                    <Tabs.List>
                        <Tabs.Tab value="apiKey">API Key</Tabs.Tab>
                        {provider === 'anthropic' && <Tabs.Tab value="oauth">OAuth</Tabs.Tab>}
                    </Tabs.List>

                    <Tabs.Panel value="apiKey">
                        <Stack spacing="var(--ds-spacing-4)">
                            <Paragraph data-size="sm">
                                Configure your AI provider. API keys are stored in memory only and never persisted to disk or localStorage.
                            </Paragraph>

                            {providerRegistry.isInitialized() && (
                                <Alert data-color="info">
                                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                                        {getProviderName()} API key is currently set: {providerRegistry.getApiKeyPreview()}
                                    </Paragraph>
                                </Alert>
                            )}

                            <Field>
                                <Label htmlFor="provider">
                                    AI Provider
                                    {!providerRegistry.isInitialized() && (
                                        <Tag data-color="warning" data-size="sm" style={{ marginLeft: 'var(--ds-spacing-2)' }}>
                                            Required
                                        </Tag>
                                    )}
                                </Label>
                                <Select
                                    id="provider"
                                    value={provider}
                                    onChange={(e) => {
                                        setProvider(e.target.value as AIProvider);
                                        setModel(''); // Reset model when provider changes
                                    }}
                                    disabled={isValidating}
                                >
                                    <Select.Option value="anthropic">Anthropic (Claude)</Select.Option>
                                    <Select.Option value="openai">OpenAI (GPT)</Select.Option>
                                    <Select.Option value="google-gemini">Google (Gemini)</Select.Option>
                                    <Select.Option value="deepseek">Deep Seek</Select.Option>
                                    <Select.Option value="openrouter">OpenRouter (Unified)</Select.Option>
                                    <Select.Option value="ollama">Ollama (Local)</Select.Option>
                                    <Select.Option value="lmstudio">LM Studio (Local)</Select.Option>
                                </Select>
                            </Field>

                            <Field>
                                <Label htmlFor="api-key">
                                    {provider === 'ollama' || provider === 'lmstudio' ? 'API Key (Optional)' : 'API Key'}
                                    {!providerRegistry.isInitialized() && provider !== 'ollama' && provider !== 'lmstudio' && (
                                        <Tag data-color="warning" data-size="sm" style={{ marginLeft: 'var(--ds-spacing-2)' }}>
                                            Required
                                        </Tag>
                                    )}
                                </Label>
                                <Textfield
                                    id="api-key"
                                    label=""
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder={getProviderPlaceholder()}
                                    disabled={isValidating}
                                    data-testid={TESTIDS.common.apiKeyInput}
                                    style={{ fontFamily: 'monospace' }}
                                />
                                {provider === 'ollama' && (
                                    <Paragraph data-size="xs" style={{ marginTop: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                                        Ollama runs locally. Set VITE_OLLAMA_BASE_URL to customize server URL (default: http://localhost:11434/v1)
                                    </Paragraph>
                                )}
                                {provider === 'lmstudio' && (
                                    <Paragraph data-size="xs" style={{ marginTop: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                                        LM Studio runs locally with a GUI. Ensure LM Studio server is running and a model is loaded. Set VITE_LMSTUDIO_BASE_URL to customize server URL (default: http://localhost:1234/v1)
                                    </Paragraph>
                                )}
                                {provider === 'openrouter' && (
                                    <Paragraph data-size="xs" style={{ marginTop: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                                        OpenRouter provides unified access to multiple AI models. Get your API key at openrouter.ai
                                    </Paragraph>
                                )}
                            </Field>

                            <Field>
                                {provider === 'lmstudio' ? (
                                    <>
                                        <Label htmlFor="model">Model</Label>
                                        <Textfield
                                            id="model"
                                            label=""
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            placeholder="Enter exact model name from LM Studio (e.g., llama-3.1-8b-instruct-q4_K_M)"
                                            disabled={isValidating}
                                            style={{ fontFamily: 'monospace' }}
                                        />
                                        <Paragraph data-size="xs" style={{ marginTop: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                                            Enter the exact model name as shown in LM Studio's model selector. Check the "Chat" tab to find it.
                                        </Paragraph>
                                    </>
                                ) : availableModels.length > 0 && availableModels.length <= 7 ? (
                                    // Use Radio buttons for small lists (2-7 models) - better UX
                                    <Fieldset>
                                        <Fieldset.Legend>Select Model</Fieldset.Legend>
                                        {availableModels.map((m) => (
                                            <Radio
                                                key={m.id}
                                                label={m.name}
                                                value={m.id}
                                                name="model-selection"
                                                checked={model === m.id}
                                                onChange={(e) => setModel(e.target.value)}
                                                disabled={isValidating}
                                                data-testid={`model-radio-${m.id}`}
                                            />
                                        ))}
                                    </Fieldset>
                                ) : (
                                    // Use Select dropdown for large lists or when models haven't loaded
                                    <>
                                        <Label htmlFor="model">Model</Label>
                                        <Select
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            disabled={isValidating || availableModels.length === 0}
                                        >
                                            {availableModels.length === 0 ? (
                                                <Select.Option value="">Loading models...</Select.Option>
                                            ) : (
                                                availableModels.map((m) => (
                                                    <Select.Option key={m.id} value={m.id}>
                                                        {m.name}
                                                    </Select.Option>
                                                ))
                                            )}
                                        </Select>
                                    </>
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="max-tokens">Max Tokens</Label>
                                <Textfield
                                    id="max-tokens"
                                    label=""
                                    value={maxTokens.toString()}
                                    onChange={(e) => setMaxTokens(parseInt(e.target.value) || 4096)}
                                    disabled={isValidating}
                                    placeholder="4096"
                                />
                            </Field>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="oauth">
                        <Stack spacing="var(--ds-spacing-4)">
                            <Paragraph data-size="sm">
                                Authenticate using OAuth for enhanced security. You'll be redirected to Anthropic to authorize access.
                            </Paragraph>

                            {providerRegistry.isInitialized() && providerRegistry.getCurrentProviderName() === 'anthropic' && (
                                <Alert data-color="success">
                                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                                        Authenticated via OAuth: {providerRegistry.getApiKeyPreview()}
                                    </Paragraph>
                                </Alert>
                            )}

                            {!oauthConfig.backendUrl || !oauthConfig.clientId ? (
                                <Alert data-color="warning">
                                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                                        OAuth is not configured. Please set the following environment variables:
                                        <br />
                                        <code style={{ fontFamily: 'monospace', fontSize: 'var(--ds-font-size-xs)' }}>
                                            VITE_ANTHROPIC_OAUTH_BACKEND_URL
                                            <br />
                                            VITE_ANTHROPIC_OAUTH_CLIENT_ID
                                        </code>
                                    </Paragraph>
                                </Alert>
                            ) : (
                                <Alert data-color="info">
                                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                                        OAuth backend: {oauthConfig.backendUrl}
                                        <br />
                                        Redirect URI: {oauthConfig.redirectUri}
                                    </Paragraph>
                                </Alert>
                            )}

                            <Field>
                                <Label htmlFor="model-oauth">Model</Label>
                                <Select
                                    id="model-oauth"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    disabled={isValidating}
                                >
                                    <Select.Option value="claude-3-5-sonnet-20240620">Claude 3.5 Sonnet (20240620)</Select.Option>
                                    <Select.Option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (20241022)</Select.Option>
                                    <Select.Option value="claude-3-opus-20240229">Claude 3 Opus</Select.Option>
                                    <Select.Option value="claude-3-sonnet-20240229">Claude 3 Sonnet</Select.Option>
                                    <Select.Option value="claude-3-haiku-20240307">Claude 3 Haiku</Select.Option>
                                    <Select.Option value="claude-3-5-haiku-20241022">Claude 3.5 Haiku</Select.Option>
                                </Select>
                            </Field>

                            <Field>
                                <Label htmlFor="max-tokens-oauth">Max Tokens</Label>
                                <Textfield
                                    id="max-tokens-oauth"
                                    label=""
                                    value={maxTokens.toString()}
                                    onChange={(e) => setMaxTokens(parseInt(e.target.value) || 4096)}
                                    disabled={isValidating}
                                    placeholder="4096"
                                />
                            </Field>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>

                {error && (
                    <Alert data-color="danger">
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                            {error}
                        </Paragraph>
                    </Alert>
                )}
            </Stack>
        </Modal>
    );
}
