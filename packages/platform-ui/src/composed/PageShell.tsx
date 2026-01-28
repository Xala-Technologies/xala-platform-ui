/**
 * PageShell Components
 *
 * Reusable page layout shells for consistent page structure with responsive support.
 * Includes ListPageShell, DetailPageShell, and FormPageShell.
 *
 * SSR-safe: No browser APIs used at module level.
 * Hydration-safe: All state is passed as props.
 *
 * @example
 * ```tsx
 * // Detail page with responsive maxWidth
 * <DetailPageShell
 *   title="User Details"
 *   backLink={{ label: 'Back', href: '/users' }}
 *   maxWidth={{ base: 'full', md: 'lg', xl: 'max' }}
 *   padding={{ base: 'sm', md: 'md' }}
 * >
 *   <Content />
 * </DetailPageShell>
 *
 * // Form page with responsive padding
 * <FormPageShell
 *   title="Edit User"
 *   maxWidth="md"
 *   padding={{ base: 'sm', md: 'lg' }}
 * >
 *   <Form />
 * </FormPageShell>
 * ```
 *
 * @module @xala-technologies/platform/ui/composed/PageShell
 */

'use client';

import React, { type ReactNode, useMemo } from 'react';
import { Heading } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import {
  type ContainerSize,
  type ResponsiveContainerSize,
  type PaddingSize,
  type ResponsivePadding,
  type Breakpoint,
  isResponsive,
  containerSizeMap,
  spacingTokenMap,
} from '../primitives/responsive-types';

// =============================================================================
// Types
// =============================================================================

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  backLink?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  badges?: ReactNode;
  /**
   * Stack actions vertically on mobile.
   * - 'sm': Stack until 640px, row at 640px+
   * - 'md': Stack until 768px, row at 768px+
   * - 'lg': Stack until 1024px, row at 1024px+
   */
  stackActionsOn?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export interface ListPageShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
  stackActionsOn?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export interface DetailPageShellProps {
  title: string;
  subtitle?: ReactNode;
  backLink: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  actions?: ReactNode;
  badges?: ReactNode;
  statusBanner?: ReactNode;
  tabs?: ReactNode;
  children: ReactNode;
  /**
   * Maximum width of the page. Can be a simple value or responsive object.
   *
   * @example maxWidth="lg"
   * @example maxWidth={{ base: 'full', md: 'lg', xl: 'max' }}
   * @default 'var(--ds-sizing-1400)'
   */
  maxWidth?: ContainerSize | ResponsiveContainerSize | string;
  /**
   * Padding around the content. Can be a token name or responsive object.
   * Uses responsive defaults for sensible spacing at all breakpoints.
   *
   * @example padding="md"
   * @example padding={{ base: 'sm', md: 'md', lg: 'lg' }}
   * @example padding="none" // to disable default padding
   * @default { base: 'md', md: 'lg' } (16px mobile, 20px desktop)
   */
  padding?: PaddingSize | ResponsivePadding;
  stackActionsOn?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export interface FormPageShellProps {
  title: string;
  subtitle?: string;
  backLink?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  children: ReactNode;
  footer?: ReactNode;
  /**
   * Maximum width of the form. Can be a simple value or responsive object.
   *
   * @example maxWidth="md"
   * @example maxWidth={{ base: 'full', md: 'md', lg: 'lg' }}
   * @default '800px'
   */
  maxWidth?: ContainerSize | ResponsiveContainerSize | string;
  /**
   * Padding around the content. Can be a token name or responsive object.
   * Uses responsive defaults for sensible spacing at all breakpoints.
   *
   * @example padding="md"
   * @example padding={{ base: 'sm', md: 'md', lg: 'lg' }}
   * @example padding="none" // to disable default padding
   * @default { base: 'md', md: 'lg' } (16px mobile, 20px desktop)
   */
  padding?: PaddingSize | ResponsivePadding;
  className?: string;
  style?: React.CSSProperties;
}

// =============================================================================
// Icons
// =============================================================================

function ArrowLeftIcon(): React.ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Check if maxWidth is a container size token
 */
function isContainerSize(value: unknown): value is ContainerSize {
  return typeof value === 'string' && value in containerSizeMap;
}

/**
 * Check if padding is a spacing token
 */
function isPaddingToken(value: unknown): value is PaddingSize {
  return typeof value === 'string' && value in spacingTokenMap;
}

/**
 * Resolve maxWidth to CSS value
 */
function resolveMaxWidth(maxWidth: ContainerSize | string | undefined): string | undefined {
  if (maxWidth === undefined) return undefined;
  if (isContainerSize(maxWidth)) return containerSizeMap[maxWidth];
  return maxWidth;
}

/**
 * Get CSS class for container size at breakpoint
 */
function getContainerSizeClass(breakpoint: Breakpoint, size: ContainerSize): string {
  if (breakpoint === 'base') {
    return `ds-container-${size}`;
  }
  return `ds-container-${breakpoint}-${size}`;
}

/**
 * Get CSS class for padding at breakpoint
 */
function getPaddingClass(breakpoint: Breakpoint, size: PaddingSize): string {
  if (breakpoint === 'base') {
    return `ds-p-${size}`;
  }
  return `ds-p-${breakpoint}-${size}`;
}

/** Default responsive padding: 16px mobile, 20px desktop */
const defaultPadding: ResponsivePadding = { base: 'md', md: 'lg' };

// =============================================================================
// PageHeader Component
// =============================================================================

export function PageHeader({
  title,
  subtitle,
  actions,
  backLink,
  badges,
  stackActionsOn,
  className,
  style,
}: PageHeaderProps): React.ReactElement {
  // Build class name with stacking support for actions
  const actionsClassName = cn(
    'ds-page-header-actions',
    stackActionsOn && `ds-horizontal-layout--stack-${stackActionsOn}`
  );

  return (
    <div className={className} style={style}>
      {backLink && (
        <a
          href={backLink.href}
          onClick={(e) => {
            if (backLink.onClick) {
              e.preventDefault();
              backLink.onClick();
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-1)',
            padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-3)',
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-default)',
            textDecoration: 'none',
            borderRadius: 'var(--ds-border-radius-md)',
            backgroundColor: 'transparent',
            transition: 'background-color 0.15s ease',
          }}
        >
          <ArrowLeftIcon />
          {backLink.label}
        </a>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--ds-spacing-4)',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Heading
            level={2}
            data-size="md"
            style={{
              margin: 0,
              fontSize: 'var(--ds-font-size-heading-md)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            {title}
          </Heading>
          {(subtitle || badges) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
                marginTop: 'var(--ds-spacing-2)',
                flexWrap: 'wrap',
              }}
            >
              {badges}
              {subtitle && (
                <span
                  style={{
                    fontSize: 'var(--ds-font-size-sm)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {actions && (
          <div
            className={actionsClassName}
            style={{
              display: 'flex',
              gap: 'var(--ds-spacing-2)',
              flexWrap: 'wrap',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// ListPageShell Component
// =============================================================================

export function ListPageShell({
  title,
  subtitle,
  actions,
  filters,
  children,
  stackActionsOn,
  className,
  style,
}: ListPageShellProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)',
        ...style,
      }}
    >
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={actions}
        stackActionsOn={stackActionsOn}
      />

      {filters && (
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            borderWidth: 'var(--ds-border-width-default)',
            borderStyle: 'solid',
            borderColor: 'var(--ds-color-neutral-border-subtle)',
            borderRadius: 'var(--ds-border-radius-lg)',
          }}
        >
          {filters}
        </div>
      )}

      <div
        style={{
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          borderWidth: 'var(--ds-border-width-default)',
          borderStyle: 'solid',
          borderColor: 'var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-lg)',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// DetailPageShell Component
// =============================================================================

export function DetailPageShell({
  title,
  subtitle,
  backLink,
  actions,
  badges,
  statusBanner,
  tabs,
  children,
  maxWidth = 'var(--ds-sizing-1400)',
  padding = defaultPadding,
  stackActionsOn,
  className,
  style,
}: DetailPageShellProps): React.ReactElement {
  // Build responsive maxWidth classes
  const maxWidthClasses = useMemo(() => {
    if (!maxWidth) return [];

    // Responsive maxWidth object - use CSS classes
    if (typeof maxWidth === 'object' && isResponsive(maxWidth)) {
      const classes: string[] = [];
      const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

      for (const bp of breakpoints) {
        const bpSize = maxWidth[bp];
        if (bpSize) {
          classes.push(getContainerSizeClass(bp, bpSize));
        }
      }

      return classes;
    }

    // Token size - use CSS class
    if (isContainerSize(maxWidth)) {
      return [`ds-container-${maxWidth}`];
    }

    return [];
  }, [maxWidth]);

  // Build responsive padding classes
  const paddingClasses = useMemo(() => {
    if (!padding) return [];

    // Responsive padding object - use CSS classes
    if (isResponsive(padding)) {
      const classes: string[] = [];
      const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

      for (const bp of breakpoints) {
        const bpPadding = padding[bp];
        if (bpPadding) {
          classes.push(getPaddingClass(bp, bpPadding));
        }
      }

      return classes;
    }

    // Token padding - use CSS class
    if (isPaddingToken(padding)) {
      return [`ds-p-${padding}`];
    }

    return [];
  }, [padding]);

  // Determine if we should use inline styles
  const useInlineMaxWidth =
    maxWidth !== undefined &&
    !isResponsive(maxWidth) &&
    !isContainerSize(maxWidth);

  // Build class name
  const shellClassName = cn(
    'ds-detail-page-shell',
    maxWidthClasses.join(' '),
    paddingClasses.join(' '),
    className
  );

  return (
    <div
      className={shellClassName}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)',
        maxWidth: useInlineMaxWidth ? (maxWidth as string) : undefined,
        margin: '0 auto',
        ...style,
      }}
    >
      <PageHeader
        title={title}
        subtitle={subtitle as string | undefined}
        backLink={backLink}
        actions={actions}
        badges={badges}
        stackActionsOn={stackActionsOn}
      />

      {statusBanner}

      {tabs ? tabs : children}
    </div>
  );
}

// =============================================================================
// FormPageShell Component
// =============================================================================

export function FormPageShell({
  title,
  subtitle,
  backLink,
  children,
  footer,
  maxWidth = '800px',
  padding = defaultPadding,
  className,
  style,
}: FormPageShellProps): React.ReactElement {
  // Build responsive maxWidth classes
  const maxWidthClasses = useMemo(() => {
    if (!maxWidth) return [];

    // Responsive maxWidth object - use CSS classes
    if (typeof maxWidth === 'object' && isResponsive(maxWidth)) {
      const classes: string[] = [];
      const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

      for (const bp of breakpoints) {
        const bpSize = maxWidth[bp];
        if (bpSize) {
          classes.push(getContainerSizeClass(bp, bpSize));
        }
      }

      return classes;
    }

    // Token size - use CSS class
    if (isContainerSize(maxWidth)) {
      return [`ds-container-${maxWidth}`];
    }

    return [];
  }, [maxWidth]);

  // Build responsive padding classes
  const paddingClasses = useMemo(() => {
    if (!padding) return [];

    // Responsive padding object - use CSS classes
    if (isResponsive(padding)) {
      const classes: string[] = [];
      const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

      for (const bp of breakpoints) {
        const bpPadding = padding[bp];
        if (bpPadding) {
          classes.push(getPaddingClass(bp, bpPadding));
        }
      }

      return classes;
    }

    // Token padding - use CSS class
    if (isPaddingToken(padding)) {
      return [`ds-p-${padding}`];
    }

    return [];
  }, [padding]);

  // Determine if we should use inline styles
  const useInlineMaxWidth =
    maxWidth !== undefined &&
    !isResponsive(maxWidth) &&
    !isContainerSize(maxWidth);

  // Build class name
  const shellClassName = cn(
    'ds-form-page-shell',
    maxWidthClasses.join(' '),
    paddingClasses.join(' '),
    className
  );

  return (
    <div
      className={shellClassName}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)',
        maxWidth: useInlineMaxWidth ? (maxWidth as string) : undefined,
        margin: '0 auto',
        ...style,
      }}
    >
      <PageHeader title={title} subtitle={subtitle} backLink={backLink} />

      <div
        style={{
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          borderWidth: 'var(--ds-border-width-default)',
          borderStyle: 'solid',
          borderColor: 'var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-lg)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: 'var(--ds-spacing-5)' }}>{children}</div>

        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--ds-spacing-3)',
              padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
              backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
              borderTopWidth: 'var(--ds-border-width-default)',
              borderTopStyle: 'solid',
              borderTopColor: 'var(--ds-color-neutral-border-subtle)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default { PageHeader, ListPageShell, DetailPageShell, FormPageShell };
