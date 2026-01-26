/**
 * DocsSidebar Component
 *
 * Navigation sidebar with feature-flag controlled sections.
 * Pure presentational component - receives data via props and emits events via callbacks.
 */

import { useMemo } from 'react';
import {
  Paragraph,
  HomeIcon,
  SearchIcon,
  CalendarIcon,
  ShieldIcon,
  ChartIcon,
  SettingsIcon,
  MapIcon,
  ExternalLinkIcon,
  InfoIcon,
  BookOpenIcon,
  ArrowRightIcon,
  UsersIcon,
} from '../../../../primitives';
import type { DocsNavItem, DocsNavSection } from '../../types';

export interface DocsSidebarLabels {
  brandName: string;
  brandTagline: string;
}

export interface DocsSidebarProps {
  /** Navigation sections to display */
  sections: DocsNavSection[];
  /** Labels for branding */
  labels: DocsSidebarLabels;
  /** Current pathname for active state */
  currentPath: string;
  /** Optional logo URL */
  logoUrl?: string;
  /** Callback when a nav item is clicked */
  onNavItemClick?: (item: DocsNavItem) => void;
}

// NavItem component with proper active state handling
function SidebarNavItem({
  item,
  isActive,
  onClick,
}: {
  item: DocsNavItem;
  isActive: boolean;
  onClick?: (item: DocsNavItem) => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick(item);
    }
  };

  return (
    <a
      href={item.href}
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-3)',
        padding: 'var(--ds-spacing-3)',
        borderRadius: 'var(--ds-border-radius-md)',
        textDecoration: 'none',
        color: isActive
          ? 'var(--ds-color-accent-text-default)'
          : 'var(--ds-color-neutral-text-default)',
        backgroundColor: isActive
          ? 'var(--ds-color-accent-background-subtle)'
          : 'transparent',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-background-subtle)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          flexShrink: 0,
        }}
      >
        {getIcon(item.icon)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <Paragraph
          data-size="sm"
          style={{
            fontWeight: isActive ? 600 : 400,
            margin: 0,
          }}
        >
          {item.label}
        </Paragraph>
        {item.description && (
          <Paragraph
            data-size="xs"
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
            }}
          >
            {item.description}
          </Paragraph>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <ArrowRightIcon />
      </div>
    </a>
  );
}

function getIcon(iconName?: string): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    home: <HomeIcon />,
    search: <SearchIcon />,
    calendar: <CalendarIcon />,
    shield: <ShieldIcon />,
    'credit-card': <ChartIcon />,
    settings: <SettingsIcon />,
    api: <MapIcon />,
    link: <ExternalLinkIcon />,
    help: <InfoIcon />,
    book: <BookOpenIcon />,
    users: <UsersIcon />,
  };
  return icons[iconName || 'book'] || <BookOpenIcon />;
}

export function DocsSidebar({
  sections,
  labels,
  currentPath,
  logoUrl = '/logo.svg',
  onNavItemClick,
}: DocsSidebarProps) {
  // Memoize active state calculation
  const activeStates = useMemo(() => {
    const states: Record<string, boolean> = {};
    sections.forEach((section) => {
      section.items.forEach((item) => {
        states[item.href] =
          item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
      });
    });
    return states;
  }, [sections, currentPath]);

  return (
    <aside
      style={{
        width: '280px',
        height: '100vh',
        borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        position: 'sticky',
        top: 0,
        left: 0,
        overflowY: 'auto',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: 'var(--ds-spacing-6) var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
          }}
        >
          <img
            src={logoUrl}
            alt={labels.brandName}
            style={{
              width: '40px',
              height: '40px',
            }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 'var(--ds-font-size-md)',
                color: 'var(--ds-color-neutral-text-default)',
              }}
            >
              {labels.brandName}
            </div>
            <div
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.brandTagline}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: 'var(--ds-spacing-4)',
          overflowY: 'auto',
        }}
      >
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            style={{
              marginBottom: 'var(--ds-spacing-6)',
            }}
          >
            {section.title && (
              <Paragraph
                data-size="xs"
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--ds-color-neutral-text-subtle)',
                  marginBottom: 'var(--ds-spacing-2)',
                  letterSpacing: '0.05em',
                }}
              >
                {section.title}
              </Paragraph>
            )}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-spacing-1)',
              }}
            >
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem
                    item={item}
                    isActive={activeStates[item.href] || false}
                    onClick={onNavItemClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default DocsSidebar;
