/**
 * API Key Management Modal
 * 
 * Secure API key input modal. Key stored in memory only, never persisted.
 */

import { useState, useEffect } from 'react';
import {
    Heading,
    Paragraph,
    Button,
    Stack,
    Textfield,
    Field,
    Label,
    Alert,
    Tag,
    Select,
} from '@xala-technologies/platform-ui';
import { Dialog } from '@digdir/designsystemet-react';
import { useRef } from 'react';
import { anthropicClient } from '../../lib/anthropic/client';
import { TESTIDS } from '../../constants/testids';

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
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('claude-3-5-sonnet-20241022');
    const [maxTokens, setMaxTokens] = useState(4096);
    const [error, setError] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);

    // Handle dialog open/close
    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    // Check if key is already set
    useEffect(() => {
        if (isOpen && anthropicClient.isInitialized()) {
            const preview = anthropicClient.getApiKeyPreview();
            if (preview) {
                setApiKey(preview);
            }
        }
    }, [isOpen]);

    /**
     * Handle save
     */
    const handleSave = async () => {
        if (!apiKey.trim()) {
            setError('API key is required');
            return;
        }

        setIsValidating(true);
        setError(null);

        try {
            // Initialize client
            anthropicClient.initialize({
                apiKey: apiKey.trim(),
                model,
                maxTokens,
            });

            // Test connection with a simple request
            await anthropicClient.createMessage({
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
        anthropicClient.clear();
        setApiKey('');
        setError(null);
        onClose();
    };

    return (
        <Dialog ref={dialogRef}>
            <Stack spacing="var(--ds-spacing-4)">
                <Heading level={2} data-size="sm">
                    Anthropic API Configuration
                </Heading>

                <Paragraph data-size="sm">
                    Enter your Anthropic API key. The key will be stored in memory only and never persisted to disk or localStorage.
                </Paragraph>

                {anthropicClient.isInitialized() && (
                    <Alert data-color="info">
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                            API key is currently set: {anthropicClient.getApiKeyPreview()}
                        </Paragraph>
                    </Alert>
                )}

                <Field>
                    <Label htmlFor="api-key">
                        API Key
                        {!anthropicClient.isInitialized() && (
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
                        placeholder="sk-ant-..."
                        disabled={isValidating}
                        data-testid={TESTIDS.common.apiKeyInput}
                        style={{ fontFamily: 'monospace' }}
                    />
                </Field>

                <Field>
                    <Label htmlFor="model">Model</Label>
                    <Select
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        disabled={isValidating}
                    >
                        <Select.Option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</Select.Option>
                        <Select.Option value="claude-3-opus-20240229">Claude 3 Opus</Select.Option>
                        <Select.Option value="claude-3-sonnet-20240229">Claude 3 Sonnet</Select.Option>
                        <Select.Option value="claude-3-haiku-20240307">Claude 3 Haiku</Select.Option>
                    </Select>
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

                {error && (
                    <Alert data-color="danger">
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                            {error}
                        </Paragraph>
                    </Alert>
                )}

                <Stack direction="horizontal" spacing="var(--ds-spacing-2)" justify="end">
                    <Button
                        data-color="neutral"
                        onClick={onClose}
                        disabled={isValidating}
                    >
                        Cancel
                    </Button>
                    {anthropicClient.isInitialized() && (
                        <Button
                            data-color="warning"
                            onClick={handleClear}
                            disabled={isValidating}
                        >
                            Clear Key
                        </Button>
                    )}
                    <Button
                        data-color="accent"
                        onClick={handleSave}
                        disabled={isValidating || !apiKey.trim()}
                        data-testid={TESTIDS.common.apiKeySave}
                    >
                        {isValidating ? 'Validating...' : 'Save'}
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}
