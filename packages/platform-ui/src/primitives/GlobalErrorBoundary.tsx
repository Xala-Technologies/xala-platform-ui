/**
 * GlobalErrorBoundary
 * 
 * THE TOP-MOST ERROR HANDLER for Xala applications.
 * This MUST be the first provider in the tree to catch ALL errors,
 * including errors from Gazetteer, ThemeProvider, and other infrastructure.
 * 
 * @example
 * ```tsx
 * <GlobalErrorBoundary>
 *   <ThemeProvider>
 *     <GazetteerProvider>
 *       <App />
 *     </GazetteerProvider>
 *   </ThemeProvider>
 * </GlobalErrorBoundary>
 * ```
 */

import React, { Component, type ReactNode, type ErrorInfo } from 'react';

// Error categories and their metadata
const ERROR_CATEGORIES = {
    module: {
        label: 'Module Resolution Error',
        icon: '📦',
        color: '#e53e3e',
    },
    api: {
        label: 'API Error',
        icon: '🌐',
        color: '#dd6b20',
    },
    react: {
        label: 'React Component Error',
        icon: '⚛️',
        color: '#805ad5',
    },
    gazetteer: {
        label: 'Gazetteer Engine Error',
        icon: '📖',
        color: '#3182ce',
    },
    unknown: {
        label: 'Unknown Error',
        icon: '❓',
        color: '#718096',
    },
} as const;

type ErrorCategory = keyof typeof ERROR_CATEGORIES;

interface ErrorResolution {
    title: string;
    steps: string[];
    docsUrl?: string;
}

interface ParsedError {
    category: ErrorCategory;
    title: string;
    message: string;
    resolution: ErrorResolution;
    stack?: string;
}

// Error pattern matchers for categorization
const ERROR_PATTERNS: Array<{
    pattern: RegExp;
    category: ErrorCategory;
    getResolution: (match: RegExpMatchArray, error: Error) => ErrorResolution;
}> = [
        {
            pattern: /Failed to resolve import ["']([^"']+)["'] from ["']([^"']+)["']/,
            category: 'module',
            getResolution: (match) => ({
                title: `Module "${match[1]}" not found`,
                steps: [
                    'Check that the package is installed: pnpm list ' + match[1],
                    'If using workspace package, rebuild it: pnpm build --filter=' + match[1].split('/').pop(),
                    'Verify the import path is correct',
                    'Check package.json exports field matches the import path',
                ],
                docsUrl: '/docs/troubleshooting/module-resolution',
            }),
        },
        {
            pattern: /does not provide an export named ['"]([^'"]+)['"]/,
            category: 'module',
            getResolution: (match) => ({
                title: `Export "${match[1]}" not found`,
                steps: [
                    'Verify the export exists in the package source',
                    'Rebuild the package: pnpm build',
                    'Check if the export name has changed in a newer version',
                    'Make sure you are importing from the correct subpath',
                ],
            }),
        },
        {
            pattern: /Failed to resolve entry for package ["']([^"']+)["']/,
            category: 'module',
            getResolution: (match) => ({
                title: `Invalid package entry for "${match[1]}"`,
                steps: [
                    'Check package.json "exports" field matches dist output',
                    'Verify files in dist/ folder (look for .js vs .mjs)',
                    'Rebuild the package: cd packages/' + match[1].split('/').pop() + ' && pnpm build',
                    'Ensure "require" uses .cjs and "import" uses .js',
                ],
            }),
        },
        {
            pattern: /must be used within ([A-Za-z]+Provider)/,
            category: 'react',
            getResolution: (match) => ({
                title: `Missing ${match[1]}`,
                steps: [
                    `Add <${match[1]}> to your component tree`,
                    'Ensure the provider is ABOVE the component using the hook',
                    'Check provider hierarchy in main.tsx',
                ],
            }),
        },
        {
            pattern: /Cannot read propert(?:y|ies) of (undefined|null)/,
            category: 'react',
            getResolution: () => ({
                title: 'Null/Undefined Access Error',
                steps: [
                    'Add null checks: object?.property',
                    'Provide default values: value ?? defaultValue',
                    'Check if data is loaded before accessing',
                    'Verify API response shape matches expectations',
                ],
            }),
        },
        {
            pattern: /Spec not found: ([^\s]+)/,
            category: 'gazetteer',
            getResolution: (match) => ({
                title: `Gazetteer spec "${match[1]}" not found`,
                steps: [
                    'Check gazetteer/pages/ for the spec file',
                    'Verify spec ID matches in route definition',
                    'Ensure app.spec.json includes the page',
                    'Run: pnpm validate:specs',
                ],
            }),
        },
        {
            pattern: /(401|Unauthorized)/,
            category: 'api',
            getResolution: () => ({
                title: 'Authentication Required',
                steps: [
                    'Your session may have expired - please log in again',
                    'Check that auth tokens are being sent with requests',
                    'Verify the API endpoint requires authentication',
                ],
            }),
        },
        {
            pattern: /(403|Forbidden)/,
            category: 'api',
            getResolution: () => ({
                title: 'Access Denied',
                steps: [
                    'You may not have permission for this action',
                    'Contact your administrator for access',
                    'Verify you are in the correct tenant context',
                ],
            }),
        },
        {
            pattern: /(fetch|network|CORS)/i,
            category: 'api',
            getResolution: () => ({
                title: 'Network/API Error',
                steps: [
                    'Check that the API server is running',
                    'Verify the API endpoint URL is correct',
                    'For CORS errors, configure server to allow this origin',
                    'Check browser Network tab for details',
                ],
            }),
        },
    ];

function parseError(error: Error): ParsedError {
    const message = error.message || String(error);

    // Try to match against known patterns
    for (const { pattern, category, getResolution } of ERROR_PATTERNS) {
        const match = message.match(pattern);
        if (match) {
            return {
                category,
                title: ERROR_CATEGORIES[category].label,
                message,
                resolution: getResolution(match, error),
                stack: error.stack,
            };
        }
    }

    // Default unknown error
    return {
        category: 'unknown',
        title: 'An unexpected error occurred',
        message,
        resolution: {
            title: 'General Troubleshooting',
            steps: [
                'Check the browser console for more details',
                'Refresh the page and try again',
                'If the issue persists, contact support',
            ],
        },
        stack: error.stack,
    };
}

interface GlobalErrorBoundaryProps {
    children: ReactNode;
    /** Custom fallback component */
    fallback?: (error: ParsedError, resetError: () => void) => ReactNode;
    /** Called when an error is caught */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /** Show stack trace in development */
    showStack?: boolean;
}

interface GlobalErrorBoundaryState {
    hasError: boolean;
    error: ParsedError | null;
}

export class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
    constructor(props: GlobalErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
        return { hasError: true, error: parseError(error) };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log to console
        console.error('[GlobalErrorBoundary] Caught error:', error);
        console.error('[GlobalErrorBoundary] Component stack:', errorInfo.componentStack);

        // Call optional error handler
        this.props.onError?.(error, errorInfo);
    }

    resetError = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError && this.state.error) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.resetError);
            }

            // Default error UI
            return (
                <DefaultErrorFallback
                    error={this.state.error}
                    onReset={this.resetError}
                    showStack={this.props.showStack ?? import.meta.env?.DEV}
                />
            );
        }

        return this.props.children;
    }
}

// Default error display component
interface DefaultErrorFallbackProps {
    error: ParsedError;
    onReset: () => void;
    showStack?: boolean;
}

function DefaultErrorFallback({ error, onReset, showStack }: DefaultErrorFallbackProps): React.ReactElement {
    const category = ERROR_CATEGORIES[error.category];

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#f7fafc',
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: category.color,
                    color: 'white',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                                {error.resolution.title}
                            </h1>
                            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>
                                {category.label}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <h2 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#718096', fontWeight: 500 }}>
                        Error Details
                    </h2>
                    <code style={{
                        display: 'block',
                        padding: '1rem',
                        backgroundColor: '#f7fafc',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        color: '#2d3748',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                    }}>
                        {error.message}
                    </code>
                </div>

                {/* Resolution Steps */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <h2 style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#718096', fontWeight: 500 }}>
                        How to Fix
                    </h2>
                    <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#4a5568' }}>
                        {error.resolution.steps.map((step, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Stack Trace (dev only) */}
                {showStack && error.stack && (
                    <details style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                        <summary style={{ cursor: 'pointer', fontSize: '0.875rem', color: '#718096' }}>
                            Stack Trace
                        </summary>
                        <pre style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            backgroundColor: '#2d3748',
                            color: '#e2e8f0',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            overflow: 'auto',
                            maxHeight: '200px',
                        }}>
                            {error.stack}
                        </pre>
                    </details>
                )}

                {/* Actions */}
                <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onReset}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            backgroundColor: category.color,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            backgroundColor: 'transparent',
                            color: '#4a5568',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        </div>
    );
}

// Export types for custom fallback implementations
export type { ParsedError, ErrorCategory, ErrorResolution, GlobalErrorBoundaryProps };
