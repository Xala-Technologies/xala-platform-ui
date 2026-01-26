/**
 * BrandingStep Component
 *
 * Pure presentational component for organization branding configuration.
 * Includes drag-and-drop file upload for logo and favicon.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

/* eslint-disable digdir/prefer-ds-components -- File upload requires native input */

import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  Paragraph,
  Heading,
  Card,
  Button,
  Alert,
} from '@digdir/designsystemet-react';
import { Stack, FormField } from '@xala-technologies/platform-ui';
import type { BrandingData } from '../types';

// =============================================================================
// Icons
// =============================================================================

function ImageIcon({ size = 24 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function PaletteIcon({ size = 24 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20" />
    </svg>
  );
}

function DeviceIcon({ size = 24 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function InfoIcon({ size = 20 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// =============================================================================
// Labels Interface
// =============================================================================

export interface BrandingStepLabels {
  // Section headers
  title: string;
  description: string;

  // Logo section
  logoHeader: string;
  logoDescription: string;
  logoDropHere: string;
  logoHint: string;
  logoPreview: string;
  removeLogo: string;

  // Colors section
  colorsHeader: string;
  colorsDescription: string;
  primaryColorLabel: string;
  primaryColorDescription: string;
  secondaryColorLabel: string;
  secondaryColorDescription: string;

  // Favicon section
  faviconHeader: string;
  faviconDescription: string;
  faviconDropHere: string;
  faviconHint: string;
  faviconPreview: string;
  removeFavicon: string;

  // Tips section
  tipsTitle: string;
  tipLogo: string;
  tipColors: string;
  tipFavicon: string;
}

// =============================================================================
// Types
// =============================================================================

export interface BrandingStepProps {
  /** Current branding data */
  data: BrandingData;
  /** Callback when data changes */
  onChange: (data: BrandingData) => void;
  /** UI labels for all text content */
  labels: BrandingStepLabels;
  /** Validation errors to display */
  errors?: string[];
}

// =============================================================================
// Component
// =============================================================================

/**
 * Branding configuration step for organization wizard.
 *
 * @example
 * ```tsx
 * import { BrandingStep } from '@xala-technologies/platform-ui/features/organizations';
 *
 * function WizardBrandingStep({ data, onChange, errors }) {
 *   const labels = {
 *     title: 'Branding',
 *     description: 'Configure your organization visual identity',
 *     // ... all other labels
 *   };
 *
 *   return (
 *     <BrandingStep
 *       data={data}
 *       onChange={onChange}
 *       labels={labels}
 *       errors={errors}
 *     />
 *   );
 * }
 * ```
 */
export function BrandingStep({
  data,
  onChange,
  labels,
  errors = [],
}: BrandingStepProps): React.ReactElement {
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingFavicon, setIsDraggingFavicon] = useState(false);

  // Logo upload handlers
  const handleLogoDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(true);
  }, []);

  const handleLogoDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(false);
  }, []);

  const handleLogoDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingLogo(false);

      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
      if (files.length === 0) return;

      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    },
    [data, onChange]
  );

  const handleLogoSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
      if (files.length === 0) return;

      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    [data, onChange]
  );

  const handleRemoveLogo = useCallback(() => {
    onChange({ ...data, logo: undefined });
  }, [data, onChange]);

  // Favicon upload handlers
  const handleFaviconDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFavicon(true);
  }, []);

  const handleFaviconDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFavicon(false);
  }, []);

  const handleFaviconDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingFavicon(false);

      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
      if (files.length === 0) return;

      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, favicon: reader.result as string });
      };
      reader.readAsDataURL(file);
    },
    [data, onChange]
  );

  const handleFaviconSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
      if (files.length === 0) return;

      const file = files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, favicon: reader.result as string });
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    [data, onChange]
  );

  const handleRemoveFavicon = useCallback(() => {
    onChange({ ...data, favicon: undefined });
  }, [data, onChange]);

  // Color handlers
  const handlePrimaryColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, primaryColor: e.target.value });
    },
    [data, onChange]
  );

  const handleSecondaryColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, secondaryColor: e.target.value });
    },
    [data, onChange]
  );

  return (
    <Stack spacing="6">
      {/* Header */}
      <Stack spacing="2">
        <Heading level={2} data-size="sm">
          {labels.title}
        </Heading>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {labels.description}
        </Paragraph>
      </Stack>

      {errors.length > 0 && (
        <Alert data-color="danger">
          {errors.map((error, idx) => (
            <Paragraph key={idx} data-size="sm">
              {error}
            </Paragraph>
          ))}
        </Alert>
      )}

      {/* LOGO SECTION */}
      <Card
        style={{
          padding: 'var(--ds-spacing-5)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <Stack direction="horizontal" spacing="2" style={{ marginBottom: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <span style={{ color: 'var(--ds-color-accent-base-default)' }}>
            <ImageIcon data-size={24} />
          </span>
          <Stack spacing="1">
            <Heading level={3} data-size="xs">
              {labels.logoHeader}
            </Heading>
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.logoDescription}
            </Paragraph>
          </Stack>
        </Stack>

        {/* Logo drop zone */}
        {!data.logo ? (
          <div
            onDragOver={handleLogoDragOver}
            onDragLeave={handleLogoDragLeave}
            onDrop={handleLogoDrop}
            onClick={() => document.getElementById('logo-input')?.click()}
            style={{
              border: `2px dashed ${isDraggingLogo ? 'var(--ds-color-accent-border-default)' : 'var(--ds-color-neutral-border-default)'}`,
              borderRadius: 'var(--ds-border-radius-lg)',
              padding: 'var(--ds-spacing-6)',
              textAlign: 'center',
              backgroundColor: isDraggingLogo
                ? 'var(--ds-color-accent-surface-default)'
                : 'var(--ds-color-neutral-surface-default)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <Stack
              direction="vertical"
              spacing="2"
              style={{ alignItems: 'center' }}
            >
              <div style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                <ImageIcon data-size={40} />
              </div>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {labels.logoDropHere}
              </Paragraph>
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.logoHint}
              </Paragraph>
            </Stack>
            <input
              id="logo-input"
              type="file"
              accept="image/*"
              onChange={handleLogoSelect}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <Stack direction="vertical" spacing="3">
            <Card
              style={{
                padding: 'var(--ds-spacing-4)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={data.logo}
                alt={labels.logoPreview}
                style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'contain' }}
              />
            </Card>
            <Button
              type="button"
              variant="secondary"
              data-size="sm"
              onClick={handleRemoveLogo}
              style={{ alignSelf: 'flex-start' }}
            >
              {labels.removeLogo}
            </Button>
          </Stack>
        )}
      </Card>

      {/* COLORS SECTION */}
      <Card
        style={{
          padding: 'var(--ds-spacing-5)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <Stack direction="horizontal" spacing="2" style={{ marginBottom: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <span style={{ color: 'var(--ds-color-accent-base-default)' }}>
            <PaletteIcon data-size={24} />
          </span>
          <Stack spacing="1">
            <Heading level={3} data-size="xs">
              {labels.colorsHeader}
            </Heading>
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.colorsDescription}
            </Paragraph>
          </Stack>
        </Stack>

        <Stack spacing="4">
          <Stack spacing="1">
            <FormField label={labels.primaryColorLabel}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <input
                  type="color"
                  value={data.primaryColor || '#0062BA'}
                  onChange={handlePrimaryColorChange}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="text"
                  value={data.primaryColor || '#0062BA'}
                  onChange={handlePrimaryColorChange}
                  placeholder="#0062BA"
                  style={{
                    flex: 1,
                    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'var(--ds-font-family-mono)',
                  }}
                />
              </div>
            </FormField>
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.primaryColorDescription}
            </Paragraph>
          </Stack>

          <Stack spacing="1">
            <FormField label={labels.secondaryColorLabel}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <input
                  type="color"
                  value={data.secondaryColor || '#004C93'}
                  onChange={handleSecondaryColorChange}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="text"
                  value={data.secondaryColor || '#004C93'}
                  onChange={handleSecondaryColorChange}
                  placeholder="#004C93"
                  style={{
                    flex: 1,
                    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'var(--ds-font-family-mono)',
                  }}
                />
              </div>
            </FormField>
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.secondaryColorDescription}
            </Paragraph>
          </Stack>
        </Stack>
      </Card>

      {/* FAVICON SECTION */}
      <Card
        style={{
          padding: 'var(--ds-spacing-5)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <Stack direction="horizontal" spacing="2" style={{ marginBottom: 'var(--ds-spacing-4)', alignItems: 'center' }}>
          <span style={{ color: 'var(--ds-color-accent-base-default)' }}>
            <DeviceIcon data-size={24} />
          </span>
          <Stack spacing="1">
            <Heading level={3} data-size="xs">
              {labels.faviconHeader}
            </Heading>
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.faviconDescription}
            </Paragraph>
          </Stack>
        </Stack>

        {/* Favicon drop zone */}
        {!data.favicon ? (
          <div
            onDragOver={handleFaviconDragOver}
            onDragLeave={handleFaviconDragLeave}
            onDrop={handleFaviconDrop}
            onClick={() => document.getElementById('favicon-input')?.click()}
            style={{
              border: `2px dashed ${isDraggingFavicon ? 'var(--ds-color-accent-border-default)' : 'var(--ds-color-neutral-border-default)'}`,
              borderRadius: 'var(--ds-border-radius-lg)',
              padding: 'var(--ds-spacing-6)',
              textAlign: 'center',
              backgroundColor: isDraggingFavicon
                ? 'var(--ds-color-accent-surface-default)'
                : 'var(--ds-color-neutral-surface-default)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <Stack
              direction="vertical"
              spacing="2"
              style={{ alignItems: 'center' }}
            >
              <div style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                <DeviceIcon data-size={40} />
              </div>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {labels.faviconDropHere}
              </Paragraph>
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.faviconHint}
              </Paragraph>
            </Stack>
            <input
              id="favicon-input"
              type="file"
              accept="image/*"
              onChange={handleFaviconSelect}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <Stack direction="vertical" spacing="3">
            <Card
              style={{
                padding: 'var(--ds-spacing-4)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={data.favicon}
                alt={labels.faviconPreview}
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
            </Card>
            <Button
              type="button"
              variant="secondary"
              data-size="sm"
              onClick={handleRemoveFavicon}
              style={{ alignSelf: 'flex-start' }}
            >
              {labels.removeFavicon}
            </Button>
          </Stack>
        )}
      </Card>

      {/* Tips */}
      <Alert data-color="info">
        <Stack direction="horizontal" spacing="3">
          <span style={{ flexShrink: 0, marginTop: '2px' }}>
            <InfoIcon data-size={20} />
          </span>
          <Stack spacing="2">
            <Heading level={4} data-size="2xs">
              {labels.tipsTitle}
            </Heading>
            <ul style={{ margin: 0, paddingLeft: 'var(--ds-spacing-4)' }}>
              <li>
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {labels.tipLogo}
                </Paragraph>
              </li>
              <li>
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {labels.tipColors}
                </Paragraph>
              </li>
              <li>
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {labels.tipFavicon}
                </Paragraph>
              </li>
            </ul>
          </Stack>
        </Stack>
      </Alert>
    </Stack>
  );
}

export type { BrandingData };
