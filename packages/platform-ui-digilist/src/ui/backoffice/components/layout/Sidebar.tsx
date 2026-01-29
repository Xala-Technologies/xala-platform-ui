/**
 * Backoffice Sidebar
 *
 * Navigation sidebar that renders menu items from Platform API.
 * All menu filtering is done server-side - no client-side filtering.
 *
 * The menu is pre-filtered by Platform API based on:
 * - User's permissions
 * - User's roles
 * - Tenant's enabled features
 */
import { NavLink, useLocation } from 'react-router-dom';
import {
  Paragraph,
  HomeIcon,
  BuildingIcon,
  CalendarIcon,
  BookOpenIcon,
  RepeatIcon,
  MessageIcon,
  UsersIcon,
  OrganizationIcon,
  ChartIcon,
  SettingsIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ShieldIcon,
} from '@xala-technologies/platform-ui';
import { useAuth } from '@xala-technologies/platform/auth';
import { useBackofficeRole } from '../../hooks';
import { usePendingGdprRequests } from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/runtime';
import { useMenu } from '@digilist/platform-bridge/hooks';

interface NavItem {
  id: string;
  label: string;
  labelKey?: string;
  href?: string;
  icon?: string;
  order?: number;
  children?: NavItem[];
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

// Icon name to React component mapping
const iconMap: Record<string, React.ReactNode> = {
  Home: <HomeIcon />,
  Dashboard: <HomeIcon />,
  BookOpen: <BookOpenIcon />,
  Calendar: <CalendarIcon />,
  Message: <MessageIcon />,
  Chart: <ChartIcon />,
  BarChart: <ChartIcon />,
  Help: <BookOpenIcon />,
  Shield: <ShieldIcon />,
  Building: <BuildingIcon />,
  Repeat: <RepeatIcon />,
  Organization: <OrganizationIcon />,
  People: <UsersIcon />,
  Clock: <ClockIcon />,
  CheckCircle: <CheckCircleIcon />,
  Settings: <SettingsIcon />,
  Work: <BookOpenIcon />,
};

function getIcon(iconName?: string): React.ReactNode {
  if (!iconName) return <HomeIcon />;
  return iconMap[iconName] || <HomeIcon />;
}

// NavItem component with proper active state handling
function SidebarNavItem({ item, t }: { item: NavItem; t: (key: string) => string }) {
  const location = useLocation();
  const href = item.href || '/';
  const isActive = href === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(href);

  // Use labelKey for i18n if available, otherwise fall back to label
  const displayLabel = item.labelKey ? t(item.labelKey) : item.label;
  const displayDescription = item.labelKey ? t(`${item.labelKey}Desc`) : item.label;

  return (
    <NavLink
      to={href}
      end={href === '/'}
      className="sidebar-nav-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
        borderRadius: 'var(--ds-border-radius-lg)',
        textDecoration: 'none',
        position: 'relative',
        backgroundColor: isActive
          ? 'var(--ds-color-neutral-surface-hover)'
          : 'transparent',
        borderLeft: isActive
          ? '3px solid var(--ds-color-accent-base-default)'
          : '3px solid transparent',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Icon with background */}
      <div
        className="sidebar-nav-icon"
        style={{
          width: '48px',
          height: '48px',
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
        {getIcon(item.icon)}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            fontWeight: isActive ? 'var(--ds-font-weight-semibold)' : 'var(--ds-font-weight-medium)',
            color: isActive
              ? 'var(--ds-color-accent-text-default)'
              : 'var(--ds-color-neutral-text-default)',
          }}
        >
          {displayLabel}
        </Paragraph>
        <Paragraph
          data-size="xs"
          style={{
            margin: 0,
            marginTop: '2px',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {displayDescription}
        </Paragraph>
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
        <div
          style={{
            color: isActive
              ? 'var(--ds-color-accent-text-default)'
              : 'var(--ds-color-neutral-text-subtle)',
            opacity: isActive ? 1 : 0.5,
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </NavLink>
  );
}

/**
 * Transform flat menu items into sections based on parent-child relationships
 */
function buildMenuSections(items: NavItem[], t: (key: string) => string): NavSection[] {
  const sections: NavSection[] = [];

  // Group items by their parent or treat top-level items as section headers
  const topLevelItems = items.filter(item => !item.children?.length && item.href);
  const sectionItems = items.filter(item => item.children?.length);

  // Add items without children as standalone section
  if (topLevelItems.length > 0) {
    // Group by section - items with href go first
    const standaloneItems = topLevelItems.filter(item => item.href === '/');
    if (standaloneItems.length > 0) {
      sections.push({ items: standaloneItems });
    }
  }

  // Add each parent item with children as a section
  for (const sectionItem of sectionItems) {
    if (sectionItem.children && sectionItem.children.length > 0) {
      sections.push({
        title: sectionItem.labelKey ? t(sectionItem.labelKey) : sectionItem.label,
        items: sectionItem.children,
      });
    }
  }

  // Add remaining top-level items without children (that aren't dashboard)
  const remainingItems = topLevelItems.filter(item => item.href !== '/');
  if (remainingItems.length > 0) {
    // Group these by their apparent section based on order
    sections.push({ items: remainingItems });
  }

  return sections;
}

export function Sidebar() {
  const t = useT();
  const { user } = useAuth();
  const { effectiveRole } = useBackofficeRole();

  // Get pending GDPR requests count for badge (if needed)
  const { data: pendingGdprData } = usePendingGdprRequests({ limit: 1 });
  const _pendingGdprCount = pendingGdprData?.meta?.total ?? pendingGdprData?.data?.length ?? 0;

  // Fetch pre-filtered menu from Platform API
  // The menu is already filtered server-side by permissions, roles, and features
  const { items: menuItems, isLoading, error } = useMenu();

  // Build sections from the flat menu structure
  const navSections = buildMenuSections(menuItems, t);

  // Show loading state
  if (isLoading && menuItems.length === 0) {
    return (
      <aside
        style={{
          width: '320px',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {t('common.loading')}
        </Paragraph>
      </aside>
    );
  }

  // Show error state with fallback
  if (error && menuItems.length === 0) {
    console.error('[Sidebar] Failed to load menu:', error);
  }

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Logo Section - Clickable to navigate to Dashboard */}
      <NavLink
        to="/"
        style={{
          height: '72px',
          padding: '0 var(--ds-spacing-6)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
          <img
            src="/logo.svg"
            alt={t('app.name')}
            style={{
              height: '40px',
              width: 'auto',
            }}
          />
          <div>
            <div
              style={{
                fontSize: 'var(--ds-font-size-md)',
                fontWeight: 'var(--ds-font-weight-bold)',
                color: 'var(--ds-color-accent-text-default)',
                lineHeight: 'var(--ds-font-line-height-sm)',
                letterSpacing: 'var(--ds-font-letter-spacing-sm)',
              }}
            >
              {t('app.name').toUpperCase()}
            </div>
            <div
              style={{
                fontSize: 'var(--ds-font-size-2xs)',
                color: 'var(--ds-color-neutral-text-subtle)',
                letterSpacing: 'var(--ds-font-letter-spacing-md)',
                marginTop: '2px',
                textTransform: 'uppercase',
              }}
            >
              {t('app.section.backoffice')}
            </div>
          </div>
        </div>
      </NavLink>

      {/* Navigation */}
      <nav data-testid="sidebar-nav" style={{ flex: 1, padding: 'var(--ds-spacing-4) var(--ds-spacing-3)', overflowY: 'auto' }}>
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            {section.title && (
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--ds-font-letter-spacing-md)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-5)',
                  marginBottom: 'var(--ds-spacing-2)',
                }}
              >
                {section.title}
              </Paragraph>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
              {section.items.map((item) => (
                <li key={item.id || item.href}>
                  <SidebarNavItem item={item} t={t} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Info Section */}
      {user && (
        <div
          style={{
            padding: 'var(--ds-spacing-5) var(--ds-spacing-6)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-4)' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
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
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name}
              </Paragraph>
              <Paragraph
                data-size="xs"
                style={{
                  color: 'var(--ds-color-neutral-text-subtle)',
                  margin: 0,
                  marginTop: '2px',
                }}
              >
                {effectiveRole === 'admin' || effectiveRole === 'super_admin' ? t('role.admin') : t('role.caseHandler')}
              </Paragraph>
            </div>
          </div>
        </div>
      )}

      {/* CSS for hover states */}
      <style>{`
        .sidebar-nav-item:hover {
          background-color: var(--ds-color-neutral-surface-hover) !important;
        }
        .sidebar-nav-item:hover .sidebar-nav-icon {
          background-color: var(--ds-color-accent-surface-default) !important;
          color: var(--ds-color-accent-text-default) !important;
        }
      `}</style>
    </aside>
  );
}
