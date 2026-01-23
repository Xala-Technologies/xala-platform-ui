/**
 * OAuth Callback Handler Page
 * 
 * Handles OAuth callback from Anthropic authorization server.
 * Exchanges authorization code for access token.
 */

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    PageContainer,
    Stack,
    Heading,
    Paragraph,
    Alert,
    Button,
    Spinner,
} from '@xala-technologies/platform-ui';
import { anthropicOAuth } from '../lib/anthropic/oauth';
import { anthropicClient } from '../lib/anthropic/client';

export function OAuthCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            const errorParam = searchParams.get('error');

            // Check for OAuth error
            if (errorParam) {
                setStatus('error');
                setError(`OAuth error: ${errorParam}`);
                return;
            }

            // Check for authorization code
            if (!code) {
                setStatus('error');
                setError('No authorization code received');
                return;
            }

            try {
                // Exchange code for token
                const tokenResponse = await anthropicOAuth.exchangeCodeForToken(code, state || undefined);

                // Initialize Anthropic client with OAuth token
                anthropicClient.initialize({
                    authMethod: 'oauth',
                    accessToken: tokenResponse.accessToken,
                    refreshToken: tokenResponse.refreshToken,
                });

                setStatus('success');

                // Redirect to workflows page after short delay
                setTimeout(() => {
                    navigate('/workflows');
                }, 2000);
            } catch (err) {
                setStatus('error');
                setError(err instanceof Error ? err.message : 'Failed to exchange authorization code');
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <PageContainer>
            <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--ds-spacing-8)' }}>
                <Heading level={1} data-size="md">
                    Authenticating...
                </Heading>

                {status === 'processing' && (
                    <>
                        <Stack direction="horizontal" spacing="var(--ds-spacing-3)" align="center">
                            <Spinner data-size="md" aria-label="Processing" />
                            <Paragraph data-size="sm">
                                Exchanging authorization code for access token...
                            </Paragraph>
                        </Stack>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <Alert data-color="success">
                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                Authentication successful! Redirecting to workflows...
                            </Paragraph>
                        </Alert>
                        <Button
                            data-color="accent"
                            onClick={() => navigate('/workflows')}
                        >
                            Go to Workflows
                        </Button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <Alert data-color="danger">
                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                {error || 'Authentication failed'}
                            </Paragraph>
                        </Alert>
                        <Stack direction="horizontal" spacing="var(--ds-spacing-2)">
                            <Button
                                data-color="neutral"
                                onClick={() => navigate('/workflows')}
                            >
                                Go to Workflows
                            </Button>
                            <Button
                                data-color="accent"
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </PageContainer>
    );
}
