import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT, useLocale } from '@xala-technologies/i18n';
import { Button, Card, Heading, Paragraph, Tag, Alert, Stack } from '../../primitives';

/**
 * Translations Demo - Using @xala-technologies/i18n
 *
 * This story demonstrates how translations work in Storybook using the
 * StoryProvider which integrates I18nProvider + DesignsystemetProvider.
 *
 * Switch between locales using the toolbar to see translations update.
 *
 * @see https://github.com/Xala-Technologies/xala-platform/tree/main/packages/i18n
 */
const meta: Meta = {
  title: 'Fundamentals/Translations',
  parameters: {
    docs: {
      description: {
        component: `
## Translation Support in Storybook

The StoryProvider integrates translations via \`@xala-technologies/i18n\` and \`@xala-technologies/i18n-platform\`.

### How It Works

1. **StoryProvider** wraps all stories and provides both I18nProvider and DesignsystemetProvider
2. Use the **locale toolbar** (globe icon) to switch between languages
3. Components can use \`useT()\` hook to access translations
4. RTL layout is automatically applied for Arabic locale

### Available Locales

- **nb** - Norwegian Bokmal (default)
- **en** - English
- **ar** - Arabic (RTL) - falls back to English translations

### Translation Patterns

**Pattern 1: Props-Based (Recommended)**
\`\`\`tsx
// Container translates, passes string to UI component
function MyContainer() {
  const t = useT();
  return <MyButton label={t('platform.common.save')} />;
}
\`\`\`

**Pattern 2: Hook-Based**
\`\`\`tsx
// Component translates internally
function StatusBadge({ status }: { status: string }) {
  const t = useT();
  return <Badge>{t(\`platform.status.\${status}\`)}</Badge>;
}
\`\`\`

### Available Translation Keys

From \`@xala-technologies/i18n-platform\`:

- \`platform.common.*\` - save, cancel, delete, edit, search, loading...
- \`platform.auth.*\` - login, logout, password...
- \`platform.validation.*\` - required, minLength, email...
- \`platform.errors.*\` - notFound, forbidden, serverError...
- \`platform.status.*\` - active, pending, completed...
- \`platform.nav.*\` - home, dashboard, settings...
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Shows the current locale and demonstrates basic translation usage.
 * Switch the locale in the toolbar to see the translations change.
 */
export const LocaleDisplay: Story = {
  render: function Render() {
    const { locale } = useLocale();
    const t = useT();

    // Test translations
    const saveTranslation = t('platform.common.save');
    const dashboardTranslation = t('platform.nav.dashboard');
    const activeTranslation = t('platform.status.active');

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Current Locale Information
        </Heading>
        <Stack gap="4">
          <div>
            <Paragraph data-size="sm">
              <strong>Active Locale:</strong> {locale}
            </Paragraph>
            <Paragraph data-size="sm">
              <strong>Direction:</strong> {locale === 'ar' ? 'RTL' : 'LTR'}
            </Paragraph>
          </div>

          <div
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Heading level={3} data-size="xs">
              Translation Test
            </Heading>
            <Paragraph data-size="sm">
              <code>platform.common.save</code> → <strong>{saveTranslation}</strong>
              {locale === 'nb' && saveTranslation === 'Lagre' && ' ✓'}
              {locale === 'en' && saveTranslation === 'Save' && ' ✓'}
            </Paragraph>
            <Paragraph data-size="sm">
              <code>platform.nav.dashboard</code> → <strong>{dashboardTranslation}</strong>
              {locale === 'nb' && dashboardTranslation === 'Dashbord' && ' ✓'}
              {locale === 'en' && dashboardTranslation === 'Dashboard' && ' ✓'}
            </Paragraph>
            <Paragraph data-size="sm">
              <code>platform.status.active</code> → <strong>{activeTranslation}</strong>
              {locale === 'nb' && activeTranslation === 'Aktiv' && ' ✓'}
              {locale === 'en' && activeTranslation === 'Active' && ' ✓'}
            </Paragraph>
          </div>

          <Alert data-color="info">
            <Paragraph data-size="sm">
              Use the locale toolbar (globe icon) to switch between nb, en, and ar.
            </Paragraph>
          </Alert>
        </Stack>
      </Card>
    );
  },
};

/**
 * Demonstrates common action buttons with translated labels.
 */
export const TranslatedButtons: Story = {
  render: function Render() {
    const t = useT();

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Common Actions
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button data-color="accent">{t('platform.common.save')}</Button>
          <Button data-color="neutral" variant="secondary">
            {t('platform.common.cancel')}
          </Button>
          <Button data-color="danger" variant="secondary">
            {t('platform.common.delete')}
          </Button>
          <Button data-color="neutral" variant="secondary">
            {t('platform.common.edit')}
          </Button>
          <Button data-color="neutral" variant="secondary">
            {t('platform.common.search')}
          </Button>
        </div>
      </Card>
    );
  },
};

/**
 * Shows status badges with translated status labels.
 */
export const StatusTranslations: Story = {
  render: function Render() {
    const t = useT();

    const statuses = ['active', 'pending', 'completed', 'cancelled'] as const;

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Status Labels
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          {statuses.map((status) => (
            <Tag
              key={status}
              data-color={
                status === 'active'
                  ? 'success'
                  : status === 'pending'
                    ? 'warning'
                    : status === 'completed'
                      ? 'info'
                      : 'danger'
              }
            >
              {t(`platform.status.${status}`)}
            </Tag>
          ))}
        </div>
      </Card>
    );
  },
};

/**
 * Shows navigation items with translated labels.
 */
export const NavigationLabels: Story = {
  render: function Render() {
    const t = useT();

    const navItems = ['home', 'dashboard', 'settings', 'profile'] as const;

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Navigation Items
        </Heading>
        <Stack gap="2">
          {navItems.map((item) => (
            <div
              key={item}
              style={{
                padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <Paragraph data-size="sm">{t(`platform.nav.${item}`)}</Paragraph>
            </div>
          ))}
        </Stack>
      </Card>
    );
  },
};

/**
 * Shows validation messages with translated text.
 */
export const ValidationMessages: Story = {
  render: function Render() {
    const t = useT();

    const validations = ['required', 'email', 'minLength', 'maxLength'] as const;

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Validation Messages
        </Heading>
        <Stack gap="2">
          {validations.map((validation) => (
            <Alert key={validation} data-color="danger" data-size="sm">
              <Paragraph data-size="sm">{t(`platform.validation.${validation}`)}</Paragraph>
            </Alert>
          ))}
        </Stack>
      </Card>
    );
  },
};

/**
 * Demonstrates the props-based translation pattern where
 * a container component translates and passes strings to children.
 */
export const PropsBasedPattern: Story = {
  render: function Render() {
    const t = useT();

    // This simulates a "container" that translates
    // In real apps, this would be a parent component or page
    const translatedProps = {
      saveLabel: t('platform.common.save'),
      cancelLabel: t('platform.common.cancel'),
      title: t('platform.common.edit'),
    };

    // UI Component receives pre-translated strings
    const FormActions = ({
      saveLabel,
      cancelLabel,
    }: {
      saveLabel: string;
      cancelLabel: string;
    }) => (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Button data-color="accent">{saveLabel}</Button>
        <Button data-color="neutral" variant="secondary">
          {cancelLabel}
        </Button>
      </div>
    );

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Props-Based Pattern
        </Heading>
        <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          The container translates, child components receive strings as props.
        </Paragraph>

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {translatedProps.title}
          </Heading>
          <FormActions
            saveLabel={translatedProps.saveLabel}
            cancelLabel={translatedProps.cancelLabel}
          />
        </div>

        <Alert data-color="info" style={{ marginTop: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">
            This pattern keeps UI components pure - they just render what they receive.
          </Paragraph>
        </Alert>
      </Card>
    );
  },
};

/**
 * Shows error messages with translated text.
 */
export const ErrorMessages: Story = {
  render: function Render() {
    const t = useT();

    const errors = ['notFound', 'forbidden', 'serverError', 'networkError'] as const;

    return (
      <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Error Messages
        </Heading>
        <Stack gap="3">
          {errors.map((error) => (
            <Alert key={error} data-color="danger">
              <Heading level={3} data-size="xs">
                {error}
              </Heading>
              <Paragraph data-size="sm">{t(`platform.errors.${error}`)}</Paragraph>
            </Alert>
          ))}
        </Stack>
      </Card>
    );
  },
};

/**
 * Complete example showing multiple translation types together.
 */
export const CompleteExample: Story = {
  render: function Render() {
    const { locale } = useLocale();
    const t = useT();

    return (
      <Stack gap="4">
        <Card data-color="accent">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Heading level={2} data-size="sm">
              {t('platform.nav.dashboard')}
            </Heading>
            <Tag data-color="success">{t('platform.status.active')}</Tag>
          </div>
          <Paragraph data-size="sm">
            Locale: <strong>{locale}</strong> | Direction:{' '}
            <strong>{locale === 'ar' ? 'RTL' : 'LTR'}</strong>
          </Paragraph>
        </Card>

        <Card data-color="neutral">
          <Heading level={3} data-size="xs">
            {t('platform.common.actions')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            <Button data-color="accent">{t('platform.common.save')}</Button>
            <Button data-color="neutral" variant="secondary">
              {t('platform.common.cancel')}
            </Button>
            <Button data-color="danger" variant="secondary">
              {t('platform.common.delete')}
            </Button>
          </div>
        </Card>

        <Alert data-color="success">
          <Paragraph data-size="sm">
            {t('platform.common.loading')} - {t('platform.status.completed')}
          </Paragraph>
        </Alert>
      </Stack>
    );
  },
};
