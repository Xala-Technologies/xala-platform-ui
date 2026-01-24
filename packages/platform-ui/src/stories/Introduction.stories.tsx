import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Button,
  Card,
  Heading,
  Paragraph,
  Textfield,
  Checkbox,
} from '@digdir/designsystemet-react';
import {
  WheelchairIcon,
  PaletteIcon,
  InboxIcon,
  GlobeIcon,
  Buildings2Icon,
  PencilIcon,
  BookIcon,
  LightningIcon,
  PersonGroupIcon,
  ShieldLockIcon,
  CodeIcon,
  SparklesIcon,
  CheckmarkCircleIcon,
  ArrowRightIcon,
  PlayIcon,
} from '@navikt/aksel-icons';
import { useT } from '@xala-technologies/i18n';

const meta: Meta = {
  title: 'Overview/Introduction',
  parameters: {
    docs: {
      description: {
        component: `
# Xala Platform Design System

A comprehensive, accessible design system built on Designsystemet for Norwegian public services.

## What is This?

The Xala Platform provides a complete set of UI components, design tokens, and patterns for building consistent, accessible applications.

## Key Features

- **Accessibility First**: WCAG 2.1 AA compliant
- **Design Tokens**: Consistent styling across all apps
- **Component Library**: 50+ production-ready components
- **Multi-tenancy**: Built for SaaS platforms
- **Internationalization**: Full i18n support
- **Theme Support**: Customizable visual identity

## Built With

- [Designsystemet](https://designsystemet.no/) - Norwegian Design System
- React + TypeScript
- Vite for blazing fast builds
- Storybook for documentation
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Platform Overview
 */
export const PlatformOverview: Story = {
  render: () => {
    const t = useT();

    const features = [
      {
        Icon: WheelchairIcon,
        titleKey: 'storybook.overview.accessibilityFirst',
        descriptionKey: 'storybook.overview.accessibilityFirstDesc',
      },
      {
        Icon: PaletteIcon,
        titleKey: 'storybook.overview.designTokens',
        descriptionKey: 'storybook.overview.designTokensDesc',
      },
      {
        Icon: InboxIcon,
        titleKey: 'storybook.overview.components',
        descriptionKey: 'storybook.overview.componentsDesc',
      },
      {
        Icon: GlobeIcon,
        titleKey: 'storybook.overview.internationalization',
        descriptionKey: 'storybook.overview.internationalizationDesc',
      },
      {
        Icon: Buildings2Icon,
        titleKey: 'storybook.overview.multiTenancy',
        descriptionKey: 'storybook.overview.multiTenancyDesc',
      },
      {
        Icon: PencilIcon,
        titleKey: 'storybook.overview.themeSupport',
        descriptionKey: 'storybook.overview.themeSupportDesc',
      },
    ];

    return (
      <div>
        <Heading level={1} data-size="2xl" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.overview.welcome')}
        </Heading>
        <Paragraph
          data-size="lg"
          style={{
            marginBottom: 'var(--ds-spacing-8)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {t('storybook.overview.subtitle')}
        </Paragraph>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-6)',
            marginBottom: 'var(--ds-spacing-8)',
          }}
        >
          {features.map(({ Icon, titleKey, descriptionKey }) => (
            <Card key={titleKey} style={{ padding: 'var(--ds-spacing-6)' }}>
              <Heading
                level={3}
                data-size="sm"
                style={{
                  marginBottom: 'var(--ds-spacing-2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                }}
              >
                <Icon
                  fontSize="2rem"
                  style={{ color: 'var(--ds-color-accent-base-default)' }}
                  aria-hidden
                />
                {t(titleKey)}
              </Heading>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {t(descriptionKey)}
              </Paragraph>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Architecture Principles
 */
export const ArchitecturePrinciples: Story = {
  render: () => {
    const t = useT();

    const principles = [
      {
        titleKey: 'storybook.architecture.designTokensFirst',
        descriptionKey: 'storybook.architecture.designTokensFirstDesc',
        example: "var(--ds-spacing-4) instead of '16px'",
      },
      {
        titleKey: 'storybook.architecture.componentComposition',
        descriptionKey: 'storybook.architecture.componentCompositionDesc',
        example: 'Use <Button> instead of custom button implementations',
      },
      {
        titleKey: 'storybook.architecture.sdkFirst',
        descriptionKey: 'storybook.architecture.sdkFirstDesc',
        example: 'sdk.users.list() instead of fetch("/api/users")',
      },
      {
        titleKey: 'storybook.architecture.pureI18n',
        descriptionKey: 'storybook.architecture.pureI18nDesc',
        example: 't("common.save") instead of "Save"',
      },
      {
        titleKey: 'storybook.architecture.accessibilityRequired',
        descriptionKey: 'storybook.architecture.accessibilityRequiredDesc',
        example: 'aria-label for icon-only buttons',
      },
    ];

    return (
      <Card style={{ padding: 'var(--ds-spacing-8)' }}>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.architecture.title')}
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
          {principles.map(({ titleKey, descriptionKey, example }) => (
            <div key={titleKey}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                {t(titleKey)}
              </Heading>
              <Paragraph
                style={{
                  marginBottom: 'var(--ds-spacing-2)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {t(descriptionKey)}
              </Paragraph>
              <div
                style={{
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: 'var(--ds-font-size-xs)',
                }}
              >
                {example}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

/**
 * Component Categories
 */
export const ComponentCategories: Story = {
  render: () => {
    const t = useT();

    const categories = [
      {
        category: 'Primitives',
        count: 15,
        examples: ['Button', 'Input', 'Checkbox', 'Radio', 'Select'],
      },
      {
        category: 'Blocks',
        count: 12,
        examples: ['Card', 'Alert', 'Badge', 'Chip', 'Avatar'],
      },
      {
        category: 'Composed',
        count: 18,
        examples: ['DataTable', 'Form', 'Modal', 'Drawer', 'Tabs'],
      },
      {
        category: 'Patterns',
        count: 10,
        examples: ['Wizard', 'EmptyState', 'ErrorBoundary', 'LoadingState'],
      },
    ];

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.resources.components')}
        </Heading>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
          {categories.map(({ category, count, examples }) => (
            <Card key={category} style={{ padding: 'var(--ds-spacing-5)' }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                {category}
              </Heading>
              <Paragraph
                data-size="sm"
                style={{
                  color: 'var(--ds-color-accent-text-default)',
                  marginBottom: 'var(--ds-spacing-3)',
                }}
              >
                {count} {t('storybook.resources.components').toLowerCase()}
              </Paragraph>
              <div
                style={{
                  fontSize: 'var(--ds-font-size-xs)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {examples.map((example, i) => (
                  <div
                    key={example}
                    style={{ marginBottom: i < examples.length - 1 ? 'var(--ds-spacing-1)' : 0 }}
                  >
                    • {example}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Interactive Live Demo
 */
export const InteractiveLiveDemo: Story = {
  render: () => {
    const t = useT();
    const [name, setName] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-3)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            <PlayIcon
              fontSize="1.5rem"
              style={{ color: 'var(--ds-color-accent-base-default)' }}
              aria-hidden
            />
            <Heading level={2} data-size="lg">
              {t('storybook.demo.tryItLive')}
            </Heading>
          </div>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.demo.tryItLiveDesc')}
          </Paragraph>

          <Card
            style={{
              padding: 'var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
            }}
          >
            <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              {t('storybook.form.welcomeForm')}
            </Heading>

            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <Textfield
                label={t('storybook.form.yourName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('storybook.form.enterName')}
                data-size="md"
              />
            </div>

            <div style={{ marginBottom: 'var(--ds-spacing-5)' }}>
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                aria-label={t('storybook.form.agreeTerms')}
              >
                {t('storybook.form.agreeTerms')}
              </Checkbox>
            </div>

            <Button
              data-variant="primary"
              data-size="md"
              disabled={!name || !agreed}
              onClick={() => setSubmitted(true)}
              style={{ width: '100%' }}
            >
              {t('storybook.form.getStarted')}
            </Button>

            {submitted && name && (
              <div
                style={{
                  marginTop: 'var(--ds-spacing-4)',
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: 'var(--ds-color-success-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                }}
              >
                <CheckmarkCircleIcon
                  fontSize="1.25rem"
                  style={{ color: 'var(--ds-color-success-base-default)' }}
                  aria-hidden
                />
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
                  {t('storybook.form.welcomeMessage', { name })}
                </Paragraph>
              </div>
            )}
          </Card>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-3)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            <CodeIcon
              fontSize="1.5rem"
              style={{ color: 'var(--ds-color-accent-base-default)' }}
              aria-hidden
            />
            <Heading level={2} data-size="lg">
              {t('storybook.demo.theCode')}
            </Heading>
          </div>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.demo.theCodeDesc')}
          </Paragraph>

          <pre
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-md)',
              overflow: 'auto',
              fontSize: 'var(--ds-font-size-xs)',
              lineHeight: '1.6',
            }}
          >
            {`import { Button, Card, Textfield, Checkbox } from '../index';
import { useState } from 'react';

export function WelcomeForm() {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <Card style={{ padding: 'var(--ds-spacing-6)' }}>
      <Textfield
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Checkbox
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      >
        I agree to use design tokens
      </Checkbox>

      <Button
        data-variant="primary"
        disabled={!name || !agreed}
      >
        Get Started
      </Button>
    </Card>
  );
}`}
          </pre>

          <div
            style={{
              marginTop: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-accent-text-default)' }}>
              <strong>{t('storybook.demo.keyFeatures')}:</strong>
              <br />• {t('storybook.demo.designTokensSpacing')}
              <br />• {t('storybook.demo.accessibleFormControls')}
              <br />• {t('storybook.demo.properStateManagement')}
              <br />• {t('storybook.demo.responsiveLayout')}
            </Paragraph>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Component Showcase
 */
export const ComponentShowcase: Story = {
  render: () => {
    const t = useT();
    const [activeTab, setActiveTab] = useState(0);

    const showcases = [
      {
        titleKey: 'storybook.demo.buttons',
        descriptionKey: 'storybook.demo.buttonsDesc',
        demo: (
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
            <Button data-variant="primary" data-size="sm">
              {t('storybook.demo.primary')}
            </Button>
            <Button data-variant="secondary" data-size="sm">
              {t('storybook.demo.secondary')}
            </Button>
            <Button data-variant="tertiary" data-size="sm">
              {t('storybook.demo.tertiary')}
            </Button>
            <Button data-variant="danger" data-size="sm">
              {t('storybook.demo.danger')}
            </Button>
          </div>
        ),
      },
      {
        titleKey: 'storybook.demo.cards',
        descriptionKey: 'storybook.demo.cardsDesc',
        demo: (
          <Card style={{ padding: 'var(--ds-spacing-5)' }}>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {t('storybook.demo.cardTitle')}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('storybook.demo.cardDescription')}
            </Paragraph>
          </Card>
        ),
      },
      {
        titleKey: 'storybook.demo.typography',
        descriptionKey: 'storybook.demo.typographyDesc',
        demo: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            <Heading level={1} data-size="xl">
              Heading XL
            </Heading>
            <Heading level={2} data-size="lg">
              Heading LG
            </Heading>
            <Heading level={3} data-size="md">
              Heading MD
            </Heading>
            <Paragraph data-size="md">{t('storybook.demo.bodyText')}</Paragraph>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          <SparklesIcon
            fontSize="1.75rem"
            style={{ color: 'var(--ds-color-accent-base-default)' }}
            aria-hidden
          />
          <Heading level={2} data-size="lg">
            {t('storybook.demo.componentShowcase')}
          </Heading>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          {showcases.map((showcase, index) => (
            <Button
              key={showcase.titleKey}
              data-variant={activeTab === index ? 'primary' : 'tertiary'}
              data-size="sm"
              onClick={() => setActiveTab(index)}
            >
              {t(showcase.titleKey)}
            </Button>
          ))}
        </div>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t(showcases[activeTab].titleKey)}
          </Heading>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-5)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t(showcases[activeTab].descriptionKey)}
          </Paragraph>
          {showcases[activeTab].demo}
        </Card>
      </div>
    );
  },
};

/**
 * Resources and Links
 */
export const ResourcesAndLinks: Story = {
  render: () => {
    const t = useT();

    const resources = [
      {
        titleKey: 'storybook.resources.gettingStarted',
        descriptionKey: 'storybook.resources.gettingStartedDesc',
        link: '?path=/docs/overview-getting-started--docs',
      },
      {
        titleKey: 'storybook.resources.fundamentals',
        descriptionKey: 'storybook.resources.fundamentalsDesc',
        link: '?path=/docs/fundamentals-tokens--docs',
      },
      {
        titleKey: 'storybook.resources.components',
        descriptionKey: 'storybook.resources.componentsDesc',
        link: '?path=/docs/components-button--docs',
      },
      {
        titleKey: 'storybook.resources.examples',
        descriptionKey: 'storybook.resources.examplesDesc',
        link: '?path=/docs/examples-component-examples--docs',
      },
      {
        title: 'Designsystemet',
        description: 'Official Norwegian Design System documentation',
        link: 'https://designsystemet.no/',
        external: true,
      },
    ];

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.resources.title')}
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          {resources.map((resource) => {
            const title = 'titleKey' in resource ? t(resource.titleKey) : resource.title;
            const description =
              'descriptionKey' in resource ? t(resource.descriptionKey) : resource.description;
            const external = 'external' in resource && resource.external;

            return (
              <Card
                key={resource.link}
                style={{
                  padding: 'var(--ds-spacing-5)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-4)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                    {title}
                  </Heading>
                  <Paragraph
                    data-size="sm"
                    style={{ color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {description}
                  </Paragraph>
                </div>
                <Button
                  data-variant="tertiary"
                  data-size="sm"
                  onClick={() => (window.location.href = resource.link)}
                >
                  {external ? t('platform.common.visit') : t('platform.common.view')} →
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  },
};
