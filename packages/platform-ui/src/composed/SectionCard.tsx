/**
 * SectionCard Component
 *
 * Enhanced section containers for page content with smooth animations.
 * Uses design token-based CSS classes for consistent styling.
 *
 * @module @xala-technologies/platform/ui/composed/SectionCard
 */

import React, { type ReactNode } from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export interface SectionCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SectionCardHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export interface SectionCardContentProps {
  children: ReactNode;
  noPadding?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface SectionCardFooterProps {
  children: ReactNode;
  alignment?: 'left' | 'center' | 'right' | 'between';
  size?: 'sm' | 'md' | 'lg';
}

// =============================================================================
// Icons
// =============================================================================

function ChevronDownIcon({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition:
          'transform var(--ds-animation-duration-fast) var(--ds-animation-easing-default)',
        transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// =============================================================================
// Size Styles
// =============================================================================

/**
 * Size style configurations for SectionCard.
 *
 * Note: All sizes use a minimum of 16px (--ds-spacing-4) padding
 * to ensure consistent spacing standards across the UI.
 */
const sizeStyles = {
  sm: {
    padding: 'var(--ds-spacing-4)', // 16px - enforced minimum
    headerPadding: 'var(--ds-spacing-4)', // 16px - enforced minimum
    footerPadding: 'var(--ds-spacing-4)', // 16px - enforced minimum
    titleSize: 'var(--ds-font-size-sm)',
    descSize: 'var(--ds-font-size-xs)',
    gap: 'var(--ds-spacing-2)',
  },
  md: {
    padding: 'var(--ds-spacing-5)', // 20px
    headerPadding: 'var(--ds-spacing-5)', // 20px
    footerPadding: 'var(--ds-spacing-5)', // 20px
    titleSize: 'var(--ds-font-size-md)',
    descSize: 'var(--ds-font-size-sm)',
    gap: 'var(--ds-spacing-3)',
  },
  lg: {
    padding: 'var(--ds-spacing-6)', // 24px
    headerPadding: 'var(--ds-spacing-6)', // 24px
    footerPadding: 'var(--ds-spacing-6)', // 24px
    titleSize: 'var(--ds-font-size-lg)',
    descSize: 'var(--ds-font-size-md)',
    gap: 'var(--ds-spacing-4)',
  },
};

// =============================================================================
// Skeleton Loader
// =============================================================================

function SectionSkeleton({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeStyle = sizeStyles[size];

  return (
    <div style={{ padding: sizeStyle.padding }}>
      <div
        className="ds-stat-skeleton"
        style={{
          height: 'var(--ds-sizing-5)',
          width: '40%',
          marginBottom: sizeStyle.gap,
        }}
      />
      <div
        className="ds-stat-skeleton"
        style={{
          height: 'var(--ds-sizing-25)',
          width: '100%',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      />
    </div>
  );
}

// =============================================================================
// SectionCardHeader Component
// =============================================================================

export function SectionCardHeader({
  title,
  description,
  icon,
  actions,
  size = 'md',
}: SectionCardHeaderProps): React.ReactElement {
  const sizeStyle = sizeStyles[size];

  return (
    <div className="ds-section-header" style={{ padding: sizeStyle.headerPadding }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ds-spacing-3)' }}>
        {icon && <div className="ds-section-icon">{icon}</div>}
        <div>
          <Heading
            level={3}
            data-size="md"
            style={{
              margin: 0,
              fontSize: sizeStyle.titleSize,
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-default)',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Heading>
          {description && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-1)',
                fontSize: sizeStyle.descSize,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {description}
            </Paragraph>
          )}
        </div>
      </div>
      {actions && <div style={{ flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

// =============================================================================
// SectionCardContent Component
// =============================================================================

export function SectionCardContent({
  children,
  noPadding = false,
  size = 'md',
}: SectionCardContentProps): React.ReactElement {
  const sizeStyle = sizeStyles[size];

  return (
    <div className="ds-section-content" style={{ padding: noPadding ? 0 : sizeStyle.padding }}>
      {children}
    </div>
  );
}

// =============================================================================
// SectionCardFooter Component
// =============================================================================

export function SectionCardFooter({
  children,
  alignment = 'right',
  size = 'md',
}: SectionCardFooterProps): React.ReactElement {
  const sizeStyle = sizeStyles[size];

  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    between: 'space-between',
  }[alignment];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent,
        gap: 'var(--ds-spacing-3)',
        padding: sizeStyle.footerPadding,
        borderTop: 'var(--ds-border-width-default) solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      {children}
    </div>
  );
}

// =============================================================================
// SectionCard Component
// =============================================================================

export function SectionCard({
  title,
  description,
  icon,
  actions,
  children,
  footer,
  variant = 'default',
  size = 'md',
  collapsible = false,
  defaultCollapsed = false,
  loading = false,
  className,
  style,
}: SectionCardProps): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const sizeStyle = sizeStyles[size];

  const hasHeader = title || description || icon || actions;

  // Build class names using design token-based CSS classes
  const cardClasses = cn(
    'ds-section-card',
    variant === 'elevated' && 'ds-section-card--elevated',
    variant === 'outlined' && 'ds-section-card--outlined',
    className
  );

  const headerClasses = cn('ds-section-header', collapsible && 'ds-section-header--clickable');

  return (
    <div className={cardClasses} style={style}>
      {loading ? (
        <SectionSkeleton size={size} />
      ) : (
        <>
          {hasHeader && (
            <div
              className={headerClasses}
              style={{
                padding: sizeStyle.headerPadding,
                borderBottom: isCollapsed ? 'none' : undefined,
              }}
              onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
              role={collapsible ? 'button' : undefined}
              tabIndex={collapsible ? 0 : undefined}
              onKeyDown={
                collapsible ? (e) => e.key === 'Enter' && setIsCollapsed(!isCollapsed) : undefined
              }
              aria-expanded={collapsible ? !isCollapsed : undefined}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--ds-spacing-3)',
                  flex: 1,
                }}
              >
                {collapsible && (
                  <div
                    style={{
                      color: 'var(--ds-color-neutral-text-subtle)',
                      flexShrink: 0,
                      marginTop: 'var(--ds-border-width-medium)',
                    }}
                  >
                    <ChevronDownIcon isCollapsed={isCollapsed} />
                  </div>
                )}
                {icon && !collapsible && <div className="ds-section-icon">{icon}</div>}
                <div style={{ flex: 1 }}>
                  {title && (
                    <Heading
                      level={3}
                      data-size="md"
                      style={{
                        margin: 0,
                        fontSize: sizeStyle.titleSize,
                        fontWeight: 'var(--ds-font-weight-semibold)',
                        color: 'var(--ds-color-neutral-text-default)',
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </Heading>
                  )}
                  {description && (
                    <Paragraph
                      data-size="sm"
                      style={{
                        margin: 0,
                        marginTop: 'var(--ds-spacing-1)',
                        fontSize: sizeStyle.descSize,
                        color: 'var(--ds-color-neutral-text-subtle)',
                      }}
                    >
                      {description}
                    </Paragraph>
                  )}
                </div>
              </div>
              {actions && (
                <div style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                  {actions}
                </div>
              )}
            </div>
          )}

          {!isCollapsed && (
            <>
              <div
                className="ds-section-content"
                style={{ padding: hasHeader ? sizeStyle.padding : sizeStyle.padding }}
              >
                {children}
              </div>
              {footer && (
                <div
                  style={{
                    padding: sizeStyle.footerPadding,
                    borderTop:
                      'var(--ds-border-width-default) solid var(--ds-color-neutral-border-subtle)',
                  }}
                >
                  {footer}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SectionCard;
