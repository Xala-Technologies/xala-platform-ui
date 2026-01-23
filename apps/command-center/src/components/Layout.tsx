import { Outlet, NavLink } from 'react-router-dom';
import {
  Box,
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
    <Box data-color="neutral">
      {/* Header */}
      <Box
        data-color="brand1"
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-border-default)',
        }}
      >
        <Heading level={1} data-size="medium">
          Xala Command Center
        </Heading>
        <Paragraph data-size="small">
          Design Governance Workflow Management
        </Paragraph>
      </Box>

      <Box style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        {/* Sidebar Navigation */}
        <Box
          as="nav"
          style={{
            width: '240px',
            borderRight: '1px solid var(--ds-color-border-default)',
            padding: 'var(--ds-spacing-4)',
          }}
        >
          <Box as="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item) => (
              <Box as="li" key={item.to} style={{ marginBottom: 'var(--ds-spacing-2)' }}>
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
                  <Box as="span">{item.icon}</Box>
                  <Box as="span">{item.label}</Box>
                </NavLink>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          as="main"
          style={{
            flex: 1,
            padding: 'var(--ds-spacing-6)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
