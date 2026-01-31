/**
 * ConsentBanner Component
 *
 * GDPR consent banner for initial consent collection.
 * Displays at bottom of viewport with Accept, Reject, and Customize options.
 *
 * Domain-agnostic - receives all data and callbacks via props.
 *
 * @example
 * ```tsx
 * // In app with SDK hooks
 * function App() {
 *   const [showBanner, setShowBanner] = useState(true);
 *
 *   return (
 *     <ConsentBanner
 *       isVisible={showBanner}
 *       onAccept={() => {
 *         saveConsents({ marketing: true, analytics: true, thirdPartySharing: true });
 *         setShowBanner(false);
 *       }}
 *       onReject={() => {
 *         saveConsents({ marketing: false, analytics: false, thirdPartySharing: false });
 *         setShowBanner(false);
 *       }}
 *       onCustomize={() => {
 *         navigate('/consent-settings');
 *       }}
 *     />
 *   );
 * }
 * ```
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { Stack } from '../../primitives/stack';

// =============================================================================
// Types
// =============================================================================

export interface ConsentBannerLabels {
  title: string;
  description: string;
  acceptButton: string;
  rejectButton: string;
  customizeButton: string;
}

export interface ConsentBannerProps {
  /** Whether the banner is visible */
  isVisible: boolean;
  /** Callback when user accepts all consents */
  onAccept: () => void;
  /** Callback when user rejects all consents */
  onReject: () => void;
  /** Callback when user wants to customize consents */
  onCustomize: () => void;
  /** Labels for i18n */
  labels?: ConsentBannerLabels;
  /** Optional className for custom styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

// =============================================================================
// Default Labels
// =============================================================================

export const DEFAULT_CONSENT_BANNER_LABELS: ConsentBannerLabels = {
  title: 'Vi respekterer ditt personvern',
  description:
    'Vi bruker informasjonskapsler og lignende teknologier for å forbedre din opplevelse, analysere nettstedstrafikk og tilpasse innhold. Du kan velge å godta alle, avvise alle, eller tilpasse dine preferanser.',
  acceptButton: 'Godta alle',
  rejectButton: 'Avvis alle',
  customizeButton: 'Tilpass',
};

// =============================================================================
// Component
// =============================================================================

const MOBILE_BREAKPOINT = 768;

export function ConsentBanner({
  isVisible,
  onAccept,
  onReject,
  onCustomize,
  labels = DEFAULT_CONSENT_BANNER_LABELS,
  className,
  style,
}: ConsentBannerProps): React.ReactElement | null {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <Stack
      className={className}
      role="dialog"
      aria-live="polite"
      aria-label={labels.title}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: isMobile ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-background-backdrop)',
        backdropFilter: 'blur(4px)',
        ...style,
      }}
    >
      <Card
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? 'var(--ds-spacing-4)' : 'var(--ds-spacing-5)',
        }}
      >
        <Stack
          direction={isMobile ? 'vertical' : 'horizontal'}
          spacing="var(--ds-spacing-4)"
          align={isMobile ? 'stretch' : 'center'}
          justify="space-between"
        >
          {/* Content */}
          <Stack
            direction="vertical"
            spacing="var(--ds-spacing-2)"
            style={{
              flex: 1,
            }}
          >
            <Heading
              level={2}
              data-size="sm"
              style={{
                margin: 0,
                fontSize: isMobile ? 'var(--ds-font-size-md)' : 'var(--ds-font-size-lg)',
                fontWeight: 'var(--ds-font-weight-semibold)',
              }}
            >
              {labels.title}
            </Heading>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                fontSize: isMobile ? 'var(--ds-font-size-sm)' : 'var(--ds-font-size-md)',
              }}
            >
              {labels.description}
            </Paragraph>
          </Stack>

          {/* Actions */}
          <Stack
            direction={isMobile ? 'vertical' : 'horizontal'}
            spacing="var(--ds-spacing-3)"
            align="stretch"
            style={{
              flexShrink: 0,
            }}
          >
            <Button
              type="button"
              onClick={onCustomize}
              data-color="neutral"
              variant="secondary"
              data-size={isMobile ? 'md' : 'md'}
              style={{
                order: isMobile ? 3 : 1,
              }}
            >
              {labels.customizeButton}
            </Button>
            <Button
              type="button"
              onClick={onReject}
              data-color="neutral"
              variant="secondary"
              data-size={isMobile ? 'md' : 'md'}
              style={{
                order: isMobile ? 2 : 2,
              }}
            >
              {labels.rejectButton}
            </Button>
            <Button
              type="button"
              onClick={onAccept}
              data-color="accent"
              variant="primary"
              data-size={isMobile ? 'md' : 'md'}
              style={{
                order: isMobile ? 1 : 3,
              }}
            >
              {labels.acceptButton}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
