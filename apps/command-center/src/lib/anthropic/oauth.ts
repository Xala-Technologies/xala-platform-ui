/**
 * OAuth Service for Anthropic Authentication
 * 
 * Handles OAuth flow for Anthropic API authentication.
 * Requires backend proxy server for token exchange.
 */

// =============================================================================
// Types
// =============================================================================

export interface OAuthConfig {
    /** Backend API URL for OAuth proxy */
    backendUrl: string;
    /** OAuth client ID */
    clientId: string;
    /** Redirect URI after OAuth callback */
    redirectUri: string;
    /** OAuth scopes */
    scopes?: string[];
}

export interface OAuthTokenResponse {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    tokenType?: string;
}

// =============================================================================
// OAuth Service
// =============================================================================

export class AnthropicOAuthService {
    private config: OAuthConfig | null = null;

    /**
     * Initialize OAuth configuration
     */
    initialize(config: OAuthConfig): void {
        this.config = config;
    }

    /**
     * Get OAuth authorization URL
     * Redirects user to Anthropic OAuth consent screen
     */
    getAuthorizationUrl(state?: string): string {
        if (!this.config) {
            throw new Error('OAuth not initialized. Call initialize() first.');
        }

        const params = new URLSearchParams({
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            response_type: 'code',
            scope: (this.config.scopes || ['read', 'write']).join(' '),
            ...(state && { state }),
        });

        // Note: Replace with actual Anthropic OAuth endpoint when available
        // For now, this is a placeholder that would redirect to backend proxy
        return `${this.config.backendUrl}/api/auth/anthropic/authorize?${params.toString()}`;
    }

    /**
     * Start OAuth flow by redirecting to authorization URL
     */
    startAuthorization(state?: string): void {
        const authUrl = this.getAuthorizationUrl(state);
        window.location.href = authUrl;
    }

    /**
     * Exchange authorization code for access token
     * Called by callback handler after user authorizes
     */
    async exchangeCodeForToken(code: string, state?: string): Promise<OAuthTokenResponse> {
        if (!this.config) {
            throw new Error('OAuth not initialized. Call initialize() first.');
        }

        try {
            const response = await fetch(`${this.config.backendUrl}/api/auth/anthropic/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                    redirect_uri: this.config.redirectUri,
                    state,
                }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Token exchange failed' }));
                throw new Error(error.message || 'Token exchange failed');
            }

            const data = await response.json();
            return {
                accessToken: data.access_token || data.accessToken,
                refreshToken: data.refresh_token || data.refreshToken,
                expiresIn: data.expires_in || data.expiresIn,
                tokenType: data.token_type || data.tokenType || 'Bearer',
            };
        } catch (error) {
            throw new Error(`Token exchange failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshToken(refreshToken: string): Promise<OAuthTokenResponse> {
        if (!this.config) {
            throw new Error('OAuth not initialized. Call initialize() first.');
        }

        try {
            const response = await fetch(`${this.config.backendUrl}/api/auth/anthropic/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh_token: refreshToken,
                }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Token refresh failed' }));
                throw new Error(error.message || 'Token refresh failed');
            }

            const data = await response.json();
            return {
                accessToken: data.access_token || data.accessToken,
                refreshToken: data.refresh_token || data.refreshToken || refreshToken,
                expiresIn: data.expires_in || data.expiresIn,
                tokenType: data.token_type || data.tokenType || 'Bearer',
            };
        } catch (error) {
            throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Parse OAuth callback URL parameters
     */
    parseCallbackUrl(url: string): { code: string | null; state: string | null; error: string | null } {
        const urlObj = new URL(url);
        const params = urlObj.searchParams;

        return {
            code: params.get('code'),
            state: params.get('state'),
            error: params.get('error'),
        };
    }
}

// Singleton instance
export const anthropicOAuth = new AnthropicOAuthService();
