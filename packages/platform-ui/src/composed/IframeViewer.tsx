/**
 * IframeViewer - Iframe container with loading and error states
 *
 * A reusable component for embedding external content in an iframe
 * with proper loading states, error handling, and accessibility.
 */

import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { Button, Paragraph, Spinner, Alert, Heading } from '@digdir/designsystemet-react';
import { RefreshCwIcon, ExternalLinkIcon, CopyIcon, CheckIcon, AlertTriangleIcon } from 'lucide-react';

/**
 * IframeViewer Props
 */
export interface IframeViewerProps {
  /** URL to load in the iframe */
  src: string;
  /** Title for the iframe (accessibility) */
  title: string;
  /** Key to force iframe reload (change this to reload) */
  reloadKey?: string | number;

  /** Header content (above iframe) */
  header?: ReactNode;
  /** Show built-in header with title and actions */
  showHeader?: boolean;
  /** Header title */
  headerTitle?: string;
  /** Header subtitle */
  headerSubtitle?: string;

  /** Labels for i18n */
  labels?: IframeViewerLabels;

  /** Sandbox attributes for iframe */
  sandbox?: string;

  /** Callback when iframe loads successfully */
  onLoad?: () => void;
  /** Callback when iframe fails to load */
  onError?: (error: Error) => void;

  /** External URL to link to (e.g., full page view) */
  externalUrl?: string;

  /** Additional toolbar actions */
  toolbarActions?: ReactNode;

  /** Height (default: 100%) */
  height?: string | number;

  /** Background color for container */
  backgroundColor?: string;
}

/**
 * Labels for i18n support
 */
export interface IframeViewerLabels {
  /** Loading message */
  loading?: string;
  /** Error message */
  error?: string;
  /** Retry button text */
  retry?: string;
  /** Copy link button text */
  copyLink?: string;
  /** Link copied confirmation */
  linkCopied?: string;
  /** Open in new tab button text */
  openExternal?: string;
}

const defaultLabels: IframeViewerLabels = {
  loading: 'Loading...',
  error: 'Failed to load content',
  retry: 'Retry',
  copyLink: 'Copy link',
  linkCopied: 'Copied!',
  openExternal: 'Open in new tab',
};

/**
 * IframeViewer Component
 *
 * @example
 * ```tsx
 * <IframeViewer
 *   src="https://example.com/embed"
 *   title="Example embed"
 *   showHeader
 *   headerTitle="Preview"
 *   headerSubtitle="Component demo"
 *   externalUrl="https://example.com/full"
 * />
 * ```
 */
export function IframeViewer({
  src,
  title,
  reloadKey,

  header,
  showHeader = false,
  headerTitle,
  headerSubtitle,

  labels: customLabels,
  sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms',

  onLoad,
  onError,

  externalUrl,
  toolbarActions,

  height = '100%',
  backgroundColor = 'var(--ds-color-neutral-background-default)',
}: IframeViewerProps) {
  const labels = { ...defaultLabels, ...customLabels };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Reset state when src or reloadKey changes
  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [src, reloadKey]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
    setError(null);
    onLoad?.();
  }, [onLoad]);

  const handleIframeError = useCallback(() => {
    setLoading(false);
    const err = new Error(labels.error || 'Failed to load');
    setError(err.message);
    onError?.(err);
  }, [labels.error, onError]);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    // Force iframe reload by appending timestamp
    const iframe = document.querySelector(
      `iframe[data-iframe-viewer="${src}"]`
    ) as HTMLIFrameElement;
    if (iframe) {
      const url = new URL(src);
      url.searchParams.set('_t', Date.now().toString());
      iframe.src = url.toString();
    }
  }, [src]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(externalUrl || src);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard API may not be available
    }
  }, [externalUrl, src]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height,
        backgroundColor,
      }}
    >
      {/* Custom header */}
      {header}

      {/* Built-in header */}
      {showHeader && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
          }}
        >
          <div>
            {headerTitle && (
              <Paragraph
                data-size="lg"
                style={{
                  margin: 0,
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  color: 'var(--ds-color-neutral-text-default)',
                }}
              >
                {headerTitle}
              </Paragraph>
            )}
            {headerSubtitle && (
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  marginTop: 'var(--ds-spacing-1)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {headerSubtitle}
              </Paragraph>
            )}
          </div>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
            {toolbarActions}

            <Button
              data-size="sm"
              variant="tertiary"
              onClick={handleCopyLink}
              aria-label={linkCopied ? labels.linkCopied : labels.copyLink}
            >
              {linkCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              {linkCopied ? labels.linkCopied : labels.copyLink}
            </Button>

            {externalUrl && (
              <Button data-size="sm" variant="tertiary" asChild>
                <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon size={16} />
                  {labels.openExternal}
                </a>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Iframe container */}
      <div
        role="main"
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Loading overlay */}
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor,
              zIndex: 10,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Spinner aria-label={labels.loading || 'Loading...'} />
              <Paragraph
                data-size="sm"
                style={{
                  marginTop: 'var(--ds-spacing-4)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.loading}
              </Paragraph>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor,
              zIndex: 10,
              padding: 'var(--ds-spacing-6)',
            }}
          >
            <Alert data-color="danger" style={{ maxWidth: '400px' }}>
              <Heading level={3} data-size="xs" style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <AlertTriangleIcon size={16} />
                {error}
              </Heading>
              <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)' }}>
                {src}
              </Paragraph>
              <Button
                data-size="sm"
                variant="secondary"
                onClick={handleRetry}
                style={{ marginTop: 'var(--ds-spacing-4)' }}
              >
                <RefreshCwIcon size={16} />
                {labels.retry}
              </Button>
            </Alert>
          </div>
        )}

        {/* Iframe */}
        <iframe
          data-iframe-viewer={src}
          src={src}
          title={title}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor,
          }}
          sandbox={sandbox}
        />
      </div>
    </div>
  );
}
