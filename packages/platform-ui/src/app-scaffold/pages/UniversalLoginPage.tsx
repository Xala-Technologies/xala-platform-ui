/**
 * UniversalLoginPage
 *
 * Centralized login page that supports different app roles.
 * Pure presentational - auth logic is handled via callbacks.
 *
 * DESIGN SYSTEM COMPLIANT: Uses only Designsystemet components.
 */

import React, { useState } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Textfield,
  Button,
  Fieldset,
} from '@digdir/designsystemet-react';
import { Stack } from '../../primitives';
import type { AppRole, AppFeatures } from '../types';

export interface UniversalLoginPageProps {
  appName: string;
  role: AppRole;
  features: AppFeatures;
  /** Optional: Callback when demo login is submitted */
  onDemoLogin?: (data: { name: string; email: string; role: string }) => void;
  /** Optional: Callback for standard login */
  onLogin?: (data: { email: string; password: string }) => void;
}

/**
 * UniversalLoginPage provides a consistent login experience
 */
export function UniversalLoginPage({
  appName,
  role,
  features,
  onDemoLogin,
}: UniversalLoginPageProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onDemoLogin) return;

    setIsLoading(true);
    try {
      await onDemoLogin({ name, email, role });
    } finally {
      setIsLoading(false);
    }
  };

  const isDemoEnabled = features.demoLogin !== false;

  return (
    <Stack
      data-testid="login-page"
      direction="vertical"
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        padding: 'var(--ds-spacing-6)',
      }}
    >
      <Card data-size="md" style={{ maxWidth: '400px', width: '100%' }}>
        <Stack direction="vertical" spacing={24}>
          {/* Header */}
          <Stack direction="vertical" spacing={8} align="center">
            <Heading level={1} data-size="lg">
              {appName}
            </Heading>
            <Paragraph data-size="sm">Sign in to your account</Paragraph>
          </Stack>

          {/* Demo login form */}
          {isDemoEnabled && (
            <form onSubmit={handleDemoSubmit}>
              <Fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <Stack direction="vertical" spacing={16}>
                  <Textfield
                    data-testid="demo-name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={isLoading}
                    style={{ width: '100%' }}
                  />

                  <Textfield
                    data-testid="demo-email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled={isLoading}
                    style={{ width: '100%' }}
                  />

                  <Button
                    data-testid="demo-submit"
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    style={{ width: '100%' }}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in (Demo)'}
                  </Button>
                </Stack>
              </Fieldset>
            </form>
          )}

          {/* Role indicator */}
          <Paragraph
            data-size="xs"
            style={{
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            Mode: {role}
          </Paragraph>
        </Stack>
      </Card>
    </Stack>
  );
}
