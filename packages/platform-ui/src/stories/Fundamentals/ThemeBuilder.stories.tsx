import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Button, Card, Heading, Paragraph } from '../../index';
import { Palette, Settings, Download, Check } from 'lucide-react';

const meta: Meta = {
  title: 'Fundamentals/Theme Builder',
  parameters: {
    docs: {
      description: {
        component: `
# Theme Builder

Create custom themes with your own colors and visual identity using the Designsystemet Theme Builder.

## Features
- Custom color palettes
- Automatic color scales
- Dark mode support
- Accessibility validation
- Export to CSS/JSON

## Reference
[Theme Builder Tool](https://theme.designsystemet.no/)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Example 1: Color Contexts
 *
 * Different color contexts for different purposes
 */
export const ColorContexts: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.theme.colorContexts')}
        </Heading>

        {/* Accent */}
        <div
          data-color="accent"
          style={{
            padding: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            border: '1px solid var(--ds-color-accent-border-default)',
          }}
        >
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-accent-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.theme.accentContext')}
          </Heading>
          <Paragraph
            style={{
              color: 'var(--ds-color-accent-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.theme.accentDescription')}
          </Paragraph>
          <Button data-variant="primary">{t('storybook.examples.primaryAction')}</Button>
        </div>

        {/* Success */}
        <div
          data-color="success"
          style={{
            padding: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            border: '1px solid var(--ds-color-success-border-default)',
          }}
        >
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.theme.successContext')}
          </Heading>
          <Paragraph
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.theme.successDescription')}
          </Paragraph>
          <Button data-variant="primary">{t('storybook.theme.confirm')}</Button>
        </div>

        {/* Danger */}
        <div
          data-color="danger"
          style={{
            padding: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-danger-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            border: '1px solid var(--ds-color-danger-border-default)',
          }}
        >
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.theme.dangerContext')}
          </Heading>
          <Paragraph
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.theme.dangerDescription')}
          </Paragraph>
          <Button data-variant="primary">{t('platform.common.delete')}</Button>
        </div>
      </div>
    );
  },
};

/**
 * Example 2: Size Modes
 *
 * Three size scales for different use cases
 */
export const SizeModes: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.theme.sizeModes')}
        </Heading>

        {/* Small */}
        <div data-size="sm">
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.sizes.small')} (sm) - {t('storybook.theme.compact')}
          </Heading>
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {t('storybook.theme.compactUIDescription')}
            </Paragraph>
            <Button data-variant="primary" data-size="sm">
              {t('storybook.theme.smallButton')}
            </Button>
          </Card>
        </div>

        {/* Medium */}
        <div data-size="md">
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.sizes.medium')} (md) - {t('storybook.sizes.default')}
          </Heading>
          <Card style={{ padding: 'var(--ds-spacing-6)' }}>
            <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              {t('storybook.theme.defaultSizeDescription')}
            </Paragraph>
            <Button data-variant="primary" data-size="md">
              {t('storybook.theme.mediumButton')}
            </Button>
          </Card>
        </div>

        {/* Large */}
        <div data-size="lg">
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.sizes.large')} (lg) - {t('storybook.theme.accessible')}
          </Heading>
          <Card style={{ padding: 'var(--ds-spacing-8)' }}>
            <Paragraph style={{ marginBottom: 'var(--ds-spacing-6)' }}>
              {t('storybook.theme.largeSizeDescription')}
            </Paragraph>
            <Button data-variant="primary" data-size="lg">
              {t('storybook.theme.largeButton')}
            </Button>
          </Card>
        </div>
      </div>
    );
  },
};

/**
 * Example 3: Theme Tokens in Use
 *
 * How theme tokens work together
 */
export const ThemeTokensInUse: Story = {
  render: () => {
    const t = useT();
    return (
      <Card
        style={{
          padding: 'var(--ds-spacing-8)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          boxShadow: 'var(--ds-shadow-md)',
        }}
      >
        <Heading
          level={3}
          data-size="lg"
          style={{
            color: 'var(--ds-color-neutral-text-default)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          {t('storybook.theme.cardUsingTokens')}
        </Heading>

        <Paragraph
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          {t('storybook.theme.tokensDemonstration')}
        </Paragraph>

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          <ul
            style={{
              margin: 0,
              paddingLeft: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            <li>
              {t('storybook.theme.background')}: <code>--ds-color-neutral-surface-default</code>
            </li>
            <li>
              {t('storybook.theme.border')}: <code>--ds-color-neutral-border-default</code>
            </li>
            <li>
              {t('storybook.theme.borderRadius')}: <code>--ds-border-radius-lg</code>
            </li>
            <li>
              {t('storybook.theme.shadow')}: <code>--ds-shadow-md</code>
            </li>
            <li>
              {t('storybook.theme.spacing')}: <code>--ds-spacing-*</code>
            </li>
            <li>
              {t('storybook.theme.textColor')}: <code>--ds-color-neutral-text-default</code>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
          <Button data-variant="primary">{t('storybook.theme.primary')}</Button>
          <Button data-variant="secondary">{t('storybook.theme.secondary')}</Button>
        </div>
      </Card>
    );
  },
};

/**
 * Example 4: Creating Custom Themes
 *
 * Step-by-step guide
 */
export const CreatingCustomThemes: Story = {
  render: () => {
    const t = useT();
    const steps = [
      {
        step: 1,
        titleKey: 'storybook.theme.visitBuilder',
        descriptionKey: 'storybook.theme.visitBuilderDesc',
        Icon: Palette,
      },
      {
        step: 2,
        titleKey: 'storybook.theme.configureColors',
        descriptionKey: 'storybook.theme.configureColorsDesc',
        Icon: Palette,
      },
      {
        step: 3,
        titleKey: 'storybook.theme.setPreferences',
        descriptionKey: 'storybook.theme.setPreferencesDesc',
        Icon: Settings,
      },
      {
        step: 4,
        titleKey: 'storybook.theme.exportTheme',
        descriptionKey: 'storybook.theme.exportThemeDesc',
        Icon: Download,
      },
      {
        step: 5,
        titleKey: 'storybook.theme.importInApp',
        descriptionKey: 'storybook.theme.importInAppDesc',
        Icon: Check,
      },
    ];

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.theme.creatingCustomThemes')}
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
          {steps.map(({ step, titleKey, descriptionKey, Icon }) => (
            <Card
              key={step}
              style={{
                padding: 'var(--ds-spacing-6)',
                display: 'flex',
                gap: 'var(--ds-spacing-4)',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--ds-color-accent-surface-default)',
                  borderRadius: 'var(--ds-border-radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={24} style={{ color: 'var(--ds-color-accent-base-default)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                  {t('storybook.theme.step')} {step}: {t(titleKey)}
                </Heading>
                <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t(descriptionKey)}
                </Paragraph>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Example 5: Theme Best Practices
 *
 * Guidelines for theme customization
 */
export const ThemeBestPractices: Story = {
  render: () => {
    const t = useT();
    const doItems = [
      'storybook.theme.doSemanticTokens',
      'storybook.theme.doTestModes',
      'storybook.theme.doVerifyContrast',
      'storybook.theme.doRespectPreferences',
      'storybook.theme.doUseBuilder',
      'storybook.theme.doDocumentChoices',
    ];

    const dontItems = [
      'storybook.theme.dontHardcode',
      'storybook.theme.dontIgnoreA11y',
      'storybook.theme.dontTooManyColors',
      'storybook.theme.dontOverrideCore',
      'storybook.theme.dontForgetDarkMode',
      'storybook.theme.dontSkipContrast',
    ];

    return (
      <Card style={{ padding: 'var(--ds-spacing-8)' }}>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.theme.bestPractices')}
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
          {/* Do's */}
          <div>
            <Heading
              level={3}
              data-size="sm"
              style={{
                color: 'var(--ds-color-success-text-default)',
                marginBottom: 'var(--ds-spacing-3)',
              }}
            >
              {t('storybook.bestPractices.do')}
            </Heading>
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-success-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              {doItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 'var(--ds-spacing-2)',
                    marginBottom: i < doItems.length - 1 ? 'var(--ds-spacing-2)' : 0,
                  }}
                >
                  <span>•</span>
                  <Paragraph
                    data-size="sm"
                    style={{ color: 'var(--ds-color-success-text-default)' }}
                  >
                    {t(item)}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div>
            <Heading
              level={3}
              data-size="sm"
              style={{
                color: 'var(--ds-color-danger-text-default)',
                marginBottom: 'var(--ds-spacing-3)',
              }}
            >
              {t('storybook.bestPractices.dont')}
            </Heading>
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-danger-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              {dontItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 'var(--ds-spacing-2)',
                    marginBottom: i < dontItems.length - 1 ? 'var(--ds-spacing-2)' : 0,
                  }}
                >
                  <span>•</span>
                  <Paragraph
                    data-size="sm"
                    style={{ color: 'var(--ds-color-danger-text-default)' }}
                  >
                    {t(item)}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  },
};
