import { Outlet, NavLink } from 'react-router-dom';
import {
  Heading,
  Paragraph,
} from '@digdir/designsystemet-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/workflows', label: 'Workflows', icon: '🔄' },
  { to: '/specs', label: 'Spec Editor', icon: '📝' },
  { to: '/approvals', label: 'Approvals', icon: '✅' },
];

export function Layout() {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-border-default)',
        }}
      >
        <Heading level={1} data-size="md">
          Xala Command Center
        </Heading>
        <Paragraph data-size="sm">
          Design Governance Workflow Management
        </Paragraph>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        {/* Sidebar Navigation */}
        <nav
          style={{
            width: '240px',
            borderRight: '1px solid var(--ds-color-border-default)',
            padding: 'var(--ds-spacing-4)',
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item) => (
              <li key={item.to} style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    padding: 'var(--ds-spacing-3)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    textDecoration: 'none',
                    color: isActive
                      ? 'var(--ds-color-accent-text-default)'
                      : 'var(--ds-color-neutral-text-default)',
                    backgroundColor: isActive
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'transparent',
                    fontWeight: isActive ? '600' : '400',
                  })}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: 'var(--ds-spacing-6)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
