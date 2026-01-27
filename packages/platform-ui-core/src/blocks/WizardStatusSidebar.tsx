/**
 * WizardStatusSidebar Component
 *
 * Persistent sidebar showing wizard completion status, validation errors,
 * and summary of entered data. Used in multi-step admin wizards.
 *
 * @example
 * ```tsx
 * import { WizardStatusSidebar } from '@xala-technologies/platform/ui';
 *
 * const sections = [
 *   { key: 'name', label: 'Navn', status: 'ok', value: 'Kultursalen' },
 *   { key: 'category', label: 'Kategori', status: 'ok', value: 'Lokaler og baner' },
 *   { key: 'price', label: 'Pris', status: 'missing' },
 *   { key: 'payment', label: 'Betalingsmåte', status: 'missing' },
 * ];
 *
 * <WizardStatusSidebar
 *   title="Status"
 *   status="incomplete"
 *   sections={sections}
 * />
 * ```
 */

import * as React from 'react';
import { Heading, Paragraph, Button } from '../primitives';
import { Stack } from '../primitives';
import { cn } from '../utils';
import { StatusTag, type BadgeColor } from './StatusBadges';
import { CheckIcon } from '../primitives/icons';

// =============================================================================
// Local status indicator icons
// =============================================================================

const CircleIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const AlertCircleIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 4V6M6 8H6.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// =============================================================================
// Types
// =============================================================================

export type WizardStatus = 'draft' | 'incomplete' | 'ready';
export type SectionStatus = 'ok' | 'missing' | 'error';

export interface StatusSection {
  /** Unique key for the section */
  key: string;
  /** Display label */
  label: string;
  /** Validation status */
  status: SectionStatus;
  /** Current value (if set) */
  value?: string;
  /** Error message (if error) */
  errorMessage?: string;
  /** Link to wizard step */
  stepIndex?: number;
}

export interface WizardStatusLabels {
  /** Status header labels */
  draft?: string;
  incomplete?: string;
  ready?: string;
  /** Section header */
  requiredTitle?: string;
  summaryTitle?: string;
  /** Value placeholders */
  notSet?: string;
  /** Status indicators */
  ok?: string;
  missing?: string;
  error?: string;
}

export interface WizardStatusSidebarProps {
  /** Sidebar title */
  title: string;
  /** Overall wizard status */
  status: WizardStatus;
  /** Status sections to display */
  sections: StatusSection[];
  /** Localization labels */
  labels?: WizardStatusLabels;
  /** Click handler for sections */
  onSectionClick?: (section: StatusSection) => void;
  /** Additional className */
  className?: string;
  /** Whether to show the summary section */
  showSummary?: boolean;
}

// =============================================================================
// Default labels
// =============================================================================

const defaultLabels: Required<WizardStatusLabels> = {
  draft: 'Utkast',
  incomplete: 'Ufullstendig',
  ready: 'Klar for publisering',
  requiredTitle: 'Mangler for publisering',
  summaryTitle: 'Kort oppsummering',
  notSet: 'Ikke satt',
  ok: 'OK',
  missing: 'Mangler',
  error: 'Feil',
};

// =============================================================================
// Status configuration
// =============================================================================

const wizardStatusConfig: Record<
  WizardStatus,
  { color: BadgeColor; label: keyof WizardStatusLabels }
> = {
  draft: { color: 'neutral', label: 'draft' },
  incomplete: { color: 'warning', label: 'incomplete' },
  ready: { color: 'success', label: 'ready' },
};

const sectionStatusConfig: Record<
  SectionStatus,
  { color: string; Icon: React.ComponentType<{ size?: number }> }
> = {
  ok: { color: 'var(--ds-color-success-base-default)', Icon: CheckIcon },
  missing: { color: 'var(--ds-color-danger-base-default)', Icon: CircleIcon },
  error: { color: 'var(--ds-color-danger-base-default)', Icon: AlertCircleIcon },
};

// =============================================================================
// Component
// =============================================================================

/**
 * WizardStatusSidebar displays wizard completion status and validation summary.
 *
 * Accessibility:
 * - aria-live for status changes
 * - Semantic list structure
 * - Color + icon for status (not color-only)
 * - Keyboard accessible sections
 */
export function WizardStatusSidebar({
  title,
  status,
  sections,
  labels: customLabels,
  onSectionClick,
  className,
  showSummary = true,
}: WizardStatusSidebarProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };
  const config = wizardStatusConfig[status];
  const isInteractive = Boolean(onSectionClick);

  // Separate sections by status
  const missingSections = sections.filter((s) => s.status === 'missing' || s.status === 'error');
  const completedSections = sections.filter((s) => s.status === 'ok');

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)',
    padding: 'var(--ds-spacing-4)',
    backgroundColor: 'var(--ds-color-neutral-background-default)',
    border: '1px solid var(--ds-color-neutral-border-default)',
    borderRadius: 'var(--ds-border-radius-lg)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)',
  };

  const sectionContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)',
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const itemBaseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--ds-spacing-2)',
    padding: 'var(--ds-spacing-1)',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
  };

  const itemInteractiveStyle: React.CSSProperties = {
    ...itemBaseStyle,
    cursor: 'pointer',
    borderRadius: 'var(--ds-border-radius-md)',
    marginLeft: 'calc(var(--ds-spacing-2) * -1)',
    marginRight: 'calc(var(--ds-spacing-2) * -1)',
    paddingLeft: 'var(--ds-spacing-2)',
    paddingRight: 'var(--ds-spacing-2)',
  };

  const dividerStyle: React.CSSProperties = {
    borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
    margin: 0,
  };

  const renderSectionItem = (section: StatusSection) => {
    const sectionConfig = sectionStatusConfig[section.status];
    const { Icon } = sectionConfig;

    const content = (
      <>
        <span style={{ flexShrink: 0, marginTop: 2, color: sectionConfig.color }}>
          <Icon size={12} />
        </span>
        <Stack direction="vertical" style={{ flex: 1, minWidth: 0 }}>
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {section.label}
          </Paragraph>
          {section.status === 'ok' && section.value && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {section.value}
            </Paragraph>
          )}
          {section.status !== 'ok' && (
            <Paragraph
              data-size="xs"
              style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
            >
              {section.errorMessage || labels.notSet}
            </Paragraph>
          )}
        </Stack>
      </>
    );

    if (isInteractive) {
      return (
        <Stack key={section.key} direction="vertical">
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={() => onSectionClick?.(section)}
            style={itemInteractiveStyle}
          >
            {content}
          </Button>
        </Stack>
      );
    }

    return (
      <Stack key={section.key} direction="vertical">
        <Stack direction="horizontal" align="flex-start" style={itemBaseStyle}>{content}</Stack>
      </Stack>
    );
  };

  return (
    <aside
      className={cn('wizard-status-sidebar', className)}
      style={containerStyle}
      aria-label={title}
      aria-live="polite"
    >
      {/* Header */}
      <Stack direction="vertical" style={headerStyle}>
        <Heading level={2} data-size="xs" style={{ margin: 0 }}>
          {title}
        </Heading>
        <StatusTag color={config.color} size="sm">
          {labels[config.label]}
        </StatusTag>
      </Stack>

      {/* Missing sections */}
      {missingSections.length > 0 && (
        <>
          <hr style={dividerStyle} />
          <Stack direction="vertical" style={sectionContainerStyle}>
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                fontWeight: 'var(--ds-font-weight-medium)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.requiredTitle}
            </Paragraph>
            <Stack direction="vertical" spacing="var(--ds-spacing-1)" role="list">
              {missingSections.map(renderSectionItem)}
            </Stack>
          </Stack>
        </>
      )}

      {/* Completed sections (summary) */}
      {showSummary && completedSections.length > 0 && (
        <>
          <hr style={dividerStyle} />
          <Stack direction="vertical" style={sectionContainerStyle}>
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                fontWeight: 'var(--ds-font-weight-medium)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.summaryTitle}
            </Paragraph>
            <Stack direction="vertical" spacing="var(--ds-spacing-1)" role="list">
              {completedSections.map(renderSectionItem)}
            </Stack>
          </Stack>
        </>
      )}
    </aside>
  );
}

WizardStatusSidebar.displayName = 'WizardStatusSidebar';
