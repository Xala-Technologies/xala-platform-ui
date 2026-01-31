/**
 * UniversalLoginPage
 *
 * Centralized login page that supports different app roles.
 * Pure presentational - auth logic is handled via callbacks.
 */

import React, { useState } from 'react';
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
  onLogin,
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
    <div
      data-testid="login-page"
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        padding: 'var(--ds-spacing-6)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: 'var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          boxShadow: 'var(--ds-shadow-md)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--ds-spacing-6)' }}>
          <h1
            style={{
              fontSize: 'var(--ds-font-size-2xl)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              marginBottom: 'var(--ds-spacing-2)',
            }}
          >
            {appName}
          </h1>
          <p style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            Sign in to your account
          </p>
        </div>

        {/* Demo login form */}
        {isDemoEnabled && (
          <form onSubmit={handleDemoSubmit}>
            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <label
                htmlFor="demo-name"
                style={{
                  display: 'block',
                  marginBottom: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                Name
              </label>
              <input
                id="demo-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  fontSize: 'var(--ds-font-size-md)',
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <label
                htmlFor="demo-email"
                style={{
                  display: 'block',
                  marginBottom: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                Email
              </label>
              <input
                id="demo-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  fontSize: 'var(--ds-font-size-md)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--ds-spacing-3)',
                borderRadius: 'var(--ds-border-radius-md)',
                border: 'none',
                backgroundColor: 'var(--ds-color-accent-base-default)',
                color: 'var(--ds-color-accent-contrast-default)',
                fontSize: 'var(--ds-font-size-md)',
                fontWeight: 'var(--ds-font-weight-medium)',
                cursor: isLoading ? 'wait' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in (Demo)'}
            </button>
          </form>
        )}

        {/* Role indicator */}
        <div
          style={{
            marginTop: 'var(--ds-spacing-4)',
            textAlign: 'center',
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          Mode: {role}
        </div>
      </div>
    </div>
  );
}
