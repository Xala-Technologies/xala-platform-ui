/**
 * DashboardHeader
 *
 * Reusable sticky header for dashboard applications.
 * Features: search, notifications, theme toggle, user menu.
 *
 * Note: Uses semantic <header>, <img> elements for accessibility - this is intentional.
 *
 * @example
 * ```tsx
 * <DashboardHeader
 *   logo={<img src="/logo.svg" alt="App" />}
 *   user={{ name: 'John Doe', email: 'john@example.com' }}
 *   onSearch={(query) => handleSearch(query)}
 *   onLogout={() => logout()}
 *   showThemeToggle
 *   showNotifications
 *   notificationCount={3}
 * />
 * ```
 */

import * as React from 'react';
import { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@digdir/designsystemet-react';
import {
  HeaderSearch,
  type SearchResultItem,
  type SearchResultGroup,
} from '../composed/header-parts';
import { HeaderThemeToggle } from '../composed/header-parts';
import { NotificationBell } from '../blocks/NotificationBell';
import { UserIcon, SettingsIcon, LogOutIcon } from '../primitives/icons';
import { Stack } from '../primitives/stack';
import { Text } from '../primitives/text';
import { cn } from '../utils';
import { MOBILE_BREAKPOINT } from '../tokens';

// =============================================================================
// Types
// =============================================================================

export interface DashboardHeaderUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo element (shown on mobile) */
  logo?: React.ReactNode;

  /** Left slot content (e.g., AccountSwitcher on desktop) */
  leftSlot?: React.ReactNode;

  /** Current user info */
  user?: DashboardHeaderUser | null;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Search results */
  searchResults?: SearchResultGroup[];

  /** Search query value (controlled) */
  searchValue?: string;

  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;

  /** Callback when search result is selected */
  onSearchResultSelect?: (result: SearchResultItem) => void;

  /** No search results text */
  noSearchResultsText?: string;

  /** Whether to show search on mobile */
  showMobileSearch?: boolean;

  /** Whether to show theme toggle */
  showThemeToggle?: boolean;

  /** Current theme (for theme toggle) */
  isDark?: boolean;

  /** Theme toggle callback */
  onThemeToggle?: () => void;

  /** Whether to show notifications */
  showNotifications?: boolean;

  /** Unread notification count */
  notificationCount?: number;

  /** Notification click callback */
  onNotificationClick?: () => void;

  /** Logout callback */
  onLogout?: () => void;

  /** Settings click callback */
  onSettingsClick?: () => void;

  /** Profile click callback */
  onProfileClick?: () => void;

  /** Custom action buttons */
  actions?: React.ReactNode;

  /** Height in pixels */
  height?: number;

  /** Test ID */
  'data-testid'?: string;
}

// =============================================================================
// UserAvatar Component
// =============================================================================

interface UserAvatarProps {
  user: DashboardHeaderUser;
  size?: number;
}

function UserAvatar({ user, size = 32 }: UserAvatarProps) {
  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        style={{
          width: size,
          maxWidth: '100%',
          height: size,
          borderRadius: 'var(--ds-border-radius-full)',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <Stack
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--ds-border-radius-full)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        color: 'var(--ds-color-accent-text-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size > 30 ? 'var(--ds-font-size-sm)' : 'var(--ds-font-size-xs)',
        fontWeight: 'var(--ds-font-weight-semibold)',
      }}
    >
      {user.name?.charAt(0).toUpperCase() || <UserIcon size={size * 0.5} />}
    </Stack>
  );
}

// =============================================================================
// UserMenuDropdown Component
// =============================================================================

interface UserMenuDropdownProps {
  user: DashboardHeaderUser;
  onLogout?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onClose: () => void;
}

function UserMenuDropdown({
  user,
  onLogout,
  onSettingsClick,
  onProfileClick,
  onClose,
}: UserMenuDropdownProps) {
  const menuItems = [
    onProfileClick && { label: 'Profil', icon: <UserIcon size={18} />, onClick: onProfileClick },
    onSettingsClick && {
      label: 'Innstillinger',
      icon: <SettingsIcon size={18} />,
      onClick: onSettingsClick,
    },
    onLogout && { label: 'Logg ut', icon: <LogOutIcon size={18} />, onClick: onLogout },
  ].filter(Boolean) as Array<{ label: string; icon: React.ReactNode; onClick: () => void }>;

  return (
    <Stack
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: 'var(--ds-spacing-2)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        boxShadow: 'var(--ds-shadow-md)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        minWidth: '220px',
        overflow: 'hidden',
        zIndex: 1000,
      }}
    >
      {/* User info */}
      <Stack
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <Text
          style={{
            fontWeight: 'var(--ds-font-weight-semibold)',
            marginBottom: 'var(--ds-spacing-1)',
          }}
        >
          {user.name}
        </Text>
        <Text
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {user.email}
        </Text>
      </Stack>

      {/* Menu items */}
      <Stack style={{ padding: 'var(--ds-spacing-2)' }}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            type="button"
            onClick={() => {
              item.onClick();
              onClose();
            }}
            data-color="neutral"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-3)',
              width: '100%',
              padding: 'var(--ds-spacing-3)',
              minHeight: 'var(--ds-spacing-11)',
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: 'var(--ds-border-radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-default)',
              textAlign: 'left',
            }}
            className="ds-user-menu-item"
          >
            <Text style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{item.icon}</Text>
            {item.label}
          </Button>
        ))}
      </Stack>

      {/* Hover styles */}
      <style>{`
        .ds-user-menu-item:hover {
          background-color: var(--ds-color-neutral-surface-hover) !important;
        }
      `}</style>
    </Stack>
  );
}

// =============================================================================
// DashboardHeader Component
// =============================================================================

export const DashboardHeader = forwardRef<HTMLElement, DashboardHeaderProps>(
  (
    {
      logo,
      leftSlot,
      user,
      searchPlaceholder = 'Søk...',
      searchResults = [],
      searchValue,
      onSearchChange,
      onSearchResultSelect,
      noSearchResultsText = 'Ingen resultater funnet',
      showMobileSearch: _showMobileSearch = false,
      showThemeToggle = true,
      isDark = false,
      onThemeToggle,
      showNotifications = true,
      notificationCount = 0,
      onNotificationClick,
      onLogout,
      onSettingsClick,
      onProfileClick,
      actions,
      height = 80,
      className,
      'data-testid': testId = 'app-layout-header',
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(
      typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
    );
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [internalSearchValue, setInternalSearchValue] = useState('');
    const userMenuRef = useRef<HTMLDivElement>(null);

    const searchQuery = searchValue ?? internalSearchValue;

    // Track viewport size
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
          setIsUserMenuOpen(false);
        }
      };

      if (isUserMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isUserMenuOpen]);

    const handleSearchChange = useCallback(
      (value: string) => {
        if (searchValue === undefined) {
          setInternalSearchValue(value);
        }
        onSearchChange?.(value);
      },
      [searchValue, onSearchChange]
    );

    return (
      <>
        <header
          ref={ref as React.RefObject<HTMLElement>}
          className={cn('ds-dashboard-header', className)}
          data-testid={testId}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
          }}
          {...props}
        >
          <Stack
            direction="horizontal"
            px="xl"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: `${height}px`,
              gap: 'var(--ds-spacing-4)',
            }}
          >
            {/* Left zone - Logo (same on mobile and desktop) + optional leftSlot on desktop */}
            <Stack
              direction="horizontal"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-3)',
                flexShrink: 0,
              }}
            >
              {logo && (
                <Stack
                  direction="horizontal"
                  style={{ display: 'flex', alignItems: 'center' }}
                  data-testid={testId ? `${testId}-logo` : undefined}
                >
                  {logo}
                </Stack>
              )}
              {!isMobile && leftSlot}
            </Stack>

            {/* Center zone - Search (takes remaining space, centered, with padding so it doesn't touch left/right) */}
            {!isMobile && onSearchChange ? (
              <Stack
                direction="horizontal"
                style={{
                  flex: 1,
                  minWidth: 0,
                  maxWidth: '500px',
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <HeaderSearch
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onSearchChange={handleSearchChange}
                  onResultSelect={onSearchResultSelect}
                  results={searchResults}
                  showShortcut
                  enableGlobalShortcut
                  noResultsText={noSearchResultsText}
                />
              </Stack>
            ) : (
              /* Spacer when no search so right zone stays right */
              !isMobile && <Stack style={{ flex: 1, minWidth: 0 }} />
            )}

            {/* Right zone - Actions, Icons & User Profile */}
            <Stack
              direction="horizontal"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
                flexShrink: 0,
              }}
            >
              {/* Custom actions */}
              {actions}

              {/* Theme toggle */}
              {showThemeToggle && onThemeToggle && (
                <HeaderThemeToggle isDark={isDark} onToggle={onThemeToggle} />
              )}

              {/* Notifications */}
              {showNotifications && onNotificationClick && (
                <NotificationBell count={notificationCount} onClick={onNotificationClick} />
              )}

              {/* User profile dropdown - rightmost */}
              {user && (
                <Stack ref={userMenuRef} style={{ position: 'relative' }}>
                  <Button
                    type="button"
                    variant="tertiary"
                    data-size="md"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label={`${user.name} menu`}
                    aria-expanded={isUserMenuOpen}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--ds-spacing-2)',
                      padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                    }}
                  >
                    <UserAvatar user={user} />
                    <Text
                      style={{
                        fontWeight: 'var(--ds-font-weight-medium)',
                        fontSize: 'var(--ds-font-size-sm)',
                        display: isMobile ? 'none' : 'inline',
                      }}
                    >
                      {user.name}
                    </Text>
                  </Button>

                  {isUserMenuOpen && (
                    <UserMenuDropdown
                      user={user}
                      onLogout={onLogout}
                      onSettingsClick={onSettingsClick}
                      onProfileClick={onProfileClick}
                      onClose={() => setIsUserMenuOpen(false)}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          </Stack>
        </header>
      </>
    );
  }
);

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;
