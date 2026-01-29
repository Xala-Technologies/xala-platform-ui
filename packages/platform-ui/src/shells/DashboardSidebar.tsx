/**
 * DashboardSidebar
 *
 * Exact copy of MinSide sidebar styling, made reusable.
 * Preserves all visual characteristics using design tokens.
 *
 * Note: Uses semantic <aside>, <nav> elements for accessibility - this is intentional.
 */

import * as React from 'react';
import { forwardRef, useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { List } from '@digdir/designsystemet-react';
import { Drawer } from '../composed/Drawer';
import { ChevronRightIcon } from '../primitives/icons';
import { Stack } from '../primitives/stack';
import { Text } from '../primitives/text';
import { MOBILE_BREAKPOINT } from '../tokens';

// =============================================================================
// Types
// =============================================================================

export interface SidebarNavItem {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  contexts?: ('personal' | 'organization')[];
  requiredPermissions?: string[];
  badge?: number;
  badgeColor?: 'accent' | 'success' | 'warning' | 'danger' | 'info';
}

export interface SidebarSection {
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarUser {
  name: string;
  email: string;
}

export interface DashboardSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Logo image element */
  logo?: React.ReactNode;
  /** App title */
  title?: string;
  /** App subtitle */
  subtitle?: string;
  /** Navigation sections */
  sections: SidebarSection[];
  /** User info for footer */
  user?: SidebarUser | null;
  /** Width in pixels (default: 400) */
  width?: number;
  /** Mobile menu open state */
  isMobileOpen?: boolean;
  /** Mobile close callback */
  onMobileClose?: () => void;
  /** Filter function for items */
  filterItem?: (item: SidebarNavItem) => boolean;
  /** Translation function */
  t?: (key: string) => string;
  /** Test ID */
  'data-testid'?: string;
}

// =============================================================================
// SidebarNavItem - Exact copy from MinSide
// =============================================================================

interface NavItemProps {
  item: SidebarNavItem;
  onClick?: () => void;
}

function SidebarNavItemComponent({ item, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive =
    item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href);

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      onClick={onClick}
      className="ds-sidebar-nav-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
        minHeight: 'var(--ds-spacing-11)',
        borderRadius: 'var(--ds-border-radius-lg)',
        textDecoration: 'none',
        position: 'relative',
        backgroundColor: isActive ? 'var(--ds-color-neutral-surface-hover)' : 'transparent',
        borderInlineStart: isActive
          ? '3px solid var(--ds-color-accent-base-default)'
          : '3px solid transparent',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Icon with background - var(--ds-spacing-12) */}
      <Stack
        className="ds-sidebar-nav-icon"
        style={{
          width: 'var(--ds-spacing-12)',
          height: 'var(--ds-spacing-12)',
          borderRadius: 'var(--ds-border-radius-md)',
          backgroundColor: isActive
            ? 'var(--ds-color-accent-surface-default)'
            : 'var(--ds-color-neutral-surface-hover)',
          color: isActive
            ? 'var(--ds-color-accent-text-default)'
            : 'var(--ds-color-neutral-text-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}
      >
        {item.icon}
      </Stack>

      {/* Text content */}
      <Stack direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
        <Text
          size="sm"
          weight={isActive ? 'semibold' : 'medium'}
          style={{
            color: isActive
              ? 'var(--ds-color-accent-text-default)'
              : 'var(--ds-color-neutral-text-default)',
          }}
        >
          {item.name}
        </Text>
        <Text
          variant="caption"
          size="xs"
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {item.description}
        </Text>
      </Stack>

      {/* Badge or Arrow */}
      <Stack
        direction="horizontal"
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}
      >
        {item.badge && item.badge > 0 && (
          <Stack
            style={{
              minWidth: 'var(--ds-spacing-8)',
              height: 'var(--ds-spacing-8)',
              borderRadius: 'var(--ds-border-radius-full)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              color: 'var(--ds-color-neutral-text-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 'var(--ds-font-weight-medium)',
              padding: '0 var(--ds-spacing-3)',
            }}
          >
            {item.badge}
          </Stack>
        )}
        <Text
          style={{
            color: isActive
              ? 'var(--ds-color-accent-text-default)'
              : 'var(--ds-color-neutral-text-subtle)',
            opacity: isActive ? 1 : 0.5,
          }}
        >
          <ChevronRightIcon size={20} />
        </Text>
      </Stack>
    </NavLink>
  );
}

// =============================================================================
// SidebarContent - Exact copy from MinSide
// =============================================================================

interface SidebarContentProps {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  sections: SidebarSection[];
  user?: SidebarUser | null;
  onItemClick?: () => void;
}

function SidebarContent({
  logo,
  title,
  subtitle,
  sections,
  user,
  onItemClick,
}: SidebarContentProps) {
  // Only show logo section if logo, title, or subtitle is provided
  const showLogoSection = logo || title || subtitle;

  return (
    <>
      {/* Logo Section - only shown if logo/title/subtitle provided */}
      {showLogoSection && (
        <Stack
          direction="horizontal"
          style={{
            height: '80px',
            padding: '0 var(--ds-spacing-6)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="horizontal"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}
          >
            {logo && <Stack style={{ height: '40px', width: 'auto', flexShrink: 0 }}>{logo}</Stack>}
            {title && (
              <Stack direction="vertical" gap="xs">
                <Text
                  size="md"
                  weight="bold"
                  style={{
                    color: 'var(--ds-color-accent-text-default)',
                    lineHeight: 'var(--ds-font-line-height-heading)',
                    letterSpacing: 'var(--ds-font-letter-spacing-wide)',
                  }}
                >
                  {title}
                </Text>
                {subtitle && (
                  <Text
                    variant="overline"
                    size="xs"
                    style={{
                      color: 'var(--ds-color-neutral-text-subtle)',
                      letterSpacing: 'var(--ds-font-letter-spacing-wide)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {subtitle}
                  </Text>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      )}

      {/* Navigation */}
      <nav
        style={{ flex: 1, padding: 'var(--ds-spacing-4) var(--ds-spacing-3)', overflowY: 'auto' }}
      >
        {sections.map((section, sectionIndex) => (
          <Stack key={sectionIndex} style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            {section.title && (
              <Text
                variant="overline"
                size="xs"
                weight="semibold"
                style={{
                  color: 'var(--ds-color-neutral-text-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--ds-font-letter-spacing-wide)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-5)',
                  marginBottom: 'var(--ds-spacing-2)',
                }}
              >
                {section.title}
              </Text>
            )}
            <List.Unordered
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-spacing-2)',
              }}
            >
              {section.items.map((item) => (
                <List.Item key={item.href}>
                  <SidebarNavItemComponent item={item} onClick={onItemClick} />
                </List.Item>
              ))}
            </List.Unordered>
          </Stack>
        ))}
      </nav>

      {/* User Info Section - exact match */}
      {user && (
        <Stack
          style={{
            padding: 'var(--ds-spacing-5) var(--ds-spacing-6)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          }}
        >
          <Stack
            direction="horizontal"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-4)' }}
          >
            <Stack
              style={{
                width: 'var(--ds-spacing-11)',
                height: 'var(--ds-spacing-11)',
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                color: 'var(--ds-color-accent-text-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--ds-font-size-md)',
                fontWeight: 'var(--ds-font-weight-semibold)',
                flexShrink: 0,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Stack>
            <Stack direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
              <Text
                size="sm"
                weight="semibold"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name}
              </Text>
              <Text
                variant="caption"
                size="xs"
                style={{
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {user.email}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      )}

      {/* CSS for hover states - exact match */}
      <style>{`
        .ds-sidebar-nav-item:hover {
          background-color: var(--ds-color-neutral-surface-hover) !important;
        }
        .ds-sidebar-nav-item:hover .ds-sidebar-nav-icon {
          background-color: var(--ds-color-accent-surface-default) !important;
          color: var(--ds-color-accent-text-default) !important;
        }
      `}</style>
    </>
  );
}

// =============================================================================
// DashboardSidebar Component
// =============================================================================

export const DashboardSidebar = forwardRef<HTMLElement, DashboardSidebarProps>(
  (
    {
      logo,
      title,
      subtitle,
      sections,
      user,
      width = 400,
      isMobileOpen = false,
      onMobileClose,
      filterItem,
      className,
      'data-testid': testId = 'dashboard-sidebar',
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(
      typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
    );

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter sections
    const filteredSections = sections
      .map((section) => ({
        ...section,
        items: filterItem ? section.items.filter(filterItem) : section.items,
      }))
      .filter((section) => section.items.length > 0);

    const handleItemClick = useCallback(() => {
      if (isMobile && onMobileClose) {
        onMobileClose();
      }
    }, [isMobile, onMobileClose]);

    return (
      <>
        {/* Desktop sidebar */}
        {!isMobile && (
          <aside
            ref={ref as React.RefObject<HTMLElement>}
            className={className}
            data-testid={testId}
            style={{
              width: `${width}px`,
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderInlineEnd: '1px solid var(--ds-color-neutral-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            {...props}
          >
            <SidebarContent
              logo={logo}
              title={title}
              subtitle={subtitle}
              sections={filteredSections}
              user={user}
              onItemClick={handleItemClick}
            />
          </aside>
        )}

        {/* Mobile drawer */}
        {isMobile && (
          <Drawer
            isOpen={isMobileOpen}
            onClose={onMobileClose || (() => { })}
            position="left"
            size="lg"
            overlay={true}
            closeOnOverlayClick={true}
            closeOnEscape={true}
          >
            <Stack
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
              }}
            >
              <SidebarContent
                logo={logo}
                title={title}
                subtitle={subtitle}
                sections={filteredSections}
                user={user}
                onItemClick={handleItemClick}
              />
            </Stack>
          </Drawer>
        )}
      </>
    );
  }
);

DashboardSidebar.displayName = 'DashboardSidebar';

export default DashboardSidebar;
