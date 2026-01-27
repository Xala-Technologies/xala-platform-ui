/**
 * ExplorerShell - Professional shell layout for explorer applications
 *
 * A three-panel layout (header, sidebar, main) designed for documentation
 * explorers, story browsers, and similar navigation-heavy applications.
 */

import { type ReactNode } from 'react';
import { Card, Heading, Paragraph } from '../primitives';
import { Stack } from '../primitives';

/**
 * ExplorerShell Props
 */
export interface ExplorerShellProps {
  /** Application title */
  title: string;
  /** Application subtitle */
  subtitle?: string;
  /** Header icon */
  icon?: ReactNode;
  /** Header actions (right side) */
  headerActions?: ReactNode;
  /** Toolbar content (below header) */
  toolbar?: ReactNode;
  /** Sidebar content */
  sidebar: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Sidebar width */
  sidebarWidth?: string;
  /** Back button content */
  backAction?: ReactNode;
}

/**
 * ExplorerShell Component
 *
 * @example
 * ```tsx
 * <ExplorerShell
 *   title="Story Explorer"
 *   subtitle="Component Catalog"
 *   icon={<BookOpenIcon />}
 *   sidebar={<StoryList />}
 *   toolbar={<ThemeToolbar />}
 * >
 *   <StoryViewer />
 * </ExplorerShell>
 * ```
 */
export function ExplorerShell({
  title,
  subtitle,
  icon,
  headerActions,
  toolbar,
  sidebar,
  children,
  sidebarWidth = '320px',
  backAction,
}: ExplorerShellProps) {
  return (
    <Stack
      direction="vertical"
      gap="0"
      style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Header */}
      <Card
        data-color="neutral"
        style={{
          borderRadius: 0,
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          flexShrink: 0,
        }}
      >
        <Card.Block>
          <Stack
            direction="horizontal"
            gap="var(--ds-spacing-4)"
            align="center"
            justify="space-between"
          >
            <Stack direction="horizontal" gap="var(--ds-spacing-4)" align="center">
              {backAction}
              {icon && (
                <Stack
                  align="center"
                  justify="center"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--ds-border-radius-md)',
                    backgroundColor: 'var(--ds-color-accent-surface-default)',
                    color: 'var(--ds-color-accent-base-default)',
                  }}
                >
                  {icon}
                </Stack>
              )}
              <Stack direction="vertical" gap="0">
                <Heading level={1} data-size="sm" style={{ margin: 0 }}>
                  {title}
                </Heading>
                {subtitle && (
                  <Paragraph
                    data-size="sm"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {subtitle}
                  </Paragraph>
                )}
              </Stack>
            </Stack>
            {headerActions && (
              <Stack direction="horizontal" gap="var(--ds-spacing-2)" align="center">
                {headerActions}
              </Stack>
            )}
          </Stack>
        </Card.Block>
      </Card>

      {/* Toolbar */}
      {toolbar && (
        <Stack
          style={{
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            flexShrink: 0,
          }}
        >
          {toolbar}
        </Stack>
      )}

      {/* Main layout */}
      <Stack
        direction="horizontal"
        gap="0"
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        <Stack
          direction="vertical"
          style={{
            width: sidebarWidth,
            minWidth: sidebarWidth,
            borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            overflow: 'hidden',
          }}
        >
          {sidebar}
        </Stack>

        {/* Main content */}
        <Stack
          direction="vertical"
          style={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}

/**
 * ExplorerPanel - Content panel for explorer main area
 */
export interface ExplorerPanelProps {
  /** Panel header title */
  title?: string;
  /** Panel header subtitle */
  subtitle?: string;
  /** Header actions */
  actions?: ReactNode;
  /** Panel content */
  children: ReactNode;
  /** Empty state content */
  emptyState?: ReactNode;
  /** Whether to show empty state */
  isEmpty?: boolean;
}

export function ExplorerPanel({
  title,
  subtitle,
  actions,
  children,
  emptyState,
  isEmpty,
}: ExplorerPanelProps) {
  return (
    <Stack direction="vertical" style={{ height: '100%', overflow: 'hidden' }}>
      {/* Panel header */}
      {(title || actions) && (
        <Card
          data-color="neutral"
          style={{
            borderRadius: 0,
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            flexShrink: 0,
          }}
        >
          <Card.Block>
            <Stack
              direction="horizontal"
              gap="var(--ds-spacing-4)"
              align="center"
              justify="space-between"
            >
              <Stack direction="vertical" gap="0">
                {title && (
                  <Heading level={2} data-size="xs" style={{ margin: 0 }}>
                    {title}
                  </Heading>
                )}
                {subtitle && (
                  <Paragraph
                    data-size="xs"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {subtitle}
                  </Paragraph>
                )}
              </Stack>
              {actions && (
                <Stack direction="horizontal" gap="var(--ds-spacing-2)" align="center">
                  {actions}
                </Stack>
              )}
            </Stack>
          </Card.Block>
        </Card>
      )}

      {/* Panel content */}
      <Stack direction="vertical" style={{ flex: 1, overflow: 'auto' }}>
        {isEmpty ? emptyState : children}
      </Stack>
    </Stack>
  );
}

/**
 * Stat item for ExplorerEmptyState
 */
export interface ExplorerStatItem {
  /** Stat value */
  value: number | string;
  /** Stat label */
  label: string;
}

/**
 * ExplorerEmptyState - Empty state display for explorer panels
 */
export interface ExplorerEmptyStateProps {
  /** Icon to display */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action button or content */
  action?: ReactNode;
  /** Stats to display */
  stats?: ExplorerStatItem[];
}

export function ExplorerEmptyState({
  icon,
  title,
  description,
  action,
  stats,
}: ExplorerEmptyStateProps) {
  return (
    <Stack
      direction="vertical"
      gap="var(--ds-spacing-4)"
      align="center"
      justify="center"
      style={{
        flex: 1,
        padding: 'var(--ds-spacing-10)',
        textAlign: 'center',
      }}
    >
      {icon && (
        <Stack
          align="center"
          justify="center"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--ds-border-radius-full)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {icon}
        </Stack>
      )}
      <Stack direction="vertical" gap="var(--ds-spacing-2)" align="center">
        <Heading level={2} data-size="sm">
          {title}
        </Heading>
        {description && (
          <Paragraph
            data-size="md"
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              maxWidth: '400px',
            }}
          >
            {description}
          </Paragraph>
        )}
      </Stack>
      {stats && stats.length > 0 && (
        <Stack
          direction="horizontal"
          gap="var(--ds-spacing-8)"
          style={{ marginTop: 'var(--ds-spacing-4)' }}
        >
          {stats.map((stat, index) => (
            <Stack key={index} direction="vertical" align="center" gap="var(--ds-spacing-1)">
              <Heading level={3} data-size="xl">
                {stat.value}
              </Heading>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {stat.label}
              </Paragraph>
            </Stack>
          ))}
        </Stack>
      )}
      {action}
    </Stack>
  );
}
