import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Card, Heading, Paragraph, Textfield, Checkbox } from '@digdir/designsystemet-react';
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
  render: () => (
    <div>
      <Heading level={1} data-size="2xl" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Welcome to Xala Platform
      </Heading>
      <Paragraph
        data-size="lg"
        style={{
          marginBottom: 'var(--ds-spacing-8)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        A comprehensive design system for building accessible, consistent applications
      </Paragraph>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-6)',
          marginBottom: 'var(--ds-spacing-8)',
        }}
      >
        {[
          {
            Icon: WheelchairIcon,
            title: 'Accessibility First',
            description:
              'WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and proper ARIA attributes.',
          },
          {
            Icon: PaletteIcon,
            title: 'Design Tokens',
            description:
              'Consistent styling with design tokens for colors, spacing, typography, and more. Never hardcode values again.',
          },
          {
            Icon: InboxIcon,
            title: '50+ Components',
            description:
              'Production-ready components from buttons to data tables, all built with best practices and accessibility in mind.',
          },
          {
            Icon: GlobeIcon,
            title: 'Internationalization',
            description:
              'Full i18n support with translations for Norwegian, English, French, and Arabic. RTL support included.',
          },
          {
            Icon: Buildings2Icon,
            title: 'Multi-tenancy',
            description:
              'Built for SaaS platforms with tenant isolation, RBAC, and feature flags out of the box.',
          },
          {
            Icon: PencilIcon,
            title: 'Theme Support',
            description:
              'Customizable themes with light/dark mode support. Create your own visual identity while maintaining consistency.',
          },
        ].map(({ Icon, title, description }) => (
          <Card key={title} style={{ padding: 'var(--ds-spacing-6)' }}>
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
              {title}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {description}
            </Paragraph>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/**
 * Architecture Principles
 */
export const ArchitecturePrinciples: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-8)' }}>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Architecture Principles
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            title: 'Design Tokens First',
            description:
              'All styling uses design tokens. No hardcoded colors, spacing, or typography values.',
            example: "var(--ds-spacing-4) instead of '16px'",
          },
          {
            title: 'Component Composition',
            description:
              'Build complex UIs by composing simple, reusable components from the platform.',
            example: 'Use <Button> instead of custom button implementations',
          },
          {
            title: 'SDK-First',
            description: 'All API calls go through the SDK. Never use fetch() or axios directly.',
            example: 'sdk.users.list() instead of fetch("/api/users")',
          },
          {
            title: 'Pure i18n',
            description: 'All user-facing text must be translatable. No hardcoded strings.',
            example: 't("common.save") instead of "Save"',
          },
          {
            title: 'Accessibility Required',
            description: 'Every component must be keyboard accessible with proper ARIA attributes.',
            example: 'aria-label for icon-only buttons',
          },
        ].map(({ title, description, example }) => (
          <div key={title}>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {title}
            </Heading>
            <Paragraph
              style={{
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {description}
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
  ),
};

/**
 * Component Categories
 */
export const ComponentCategories: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Component Categories
      </Heading>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
        {[
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
        ].map(({ category, count, examples }) => (
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
              {count} components
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
  ),
};

/**
 * Interactive Live Demo
 */
export const InteractiveLiveDemo: Story = {
  render: () => {
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
              Try It Live
            </Heading>
          </div>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            Interact with real platform components. All styling uses design tokens, all components
            are accessible.
          </Paragraph>

          <Card
            style={{
              padding: 'var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
            }}
          >
            <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              Welcome Form
            </Heading>

            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <Textfield
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-size="md"
              />
            </div>

            <div style={{ marginBottom: 'var(--ds-spacing-5)' }}>
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                aria-label="Agree to terms"
              >
                I agree to use design tokens
              </Checkbox>
            </div>

            <Button
              data-variant="primary"
              data-size="md"
              disabled={!name || !agreed}
              onClick={() => setSubmitted(true)}
              style={{ width: '100%' }}
            >
              Get Started
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
                  Welcome, {name}! You're ready to build with Xala Platform.
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
              The Code
            </Heading>
          </div>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            This is what you just interacted with. Notice the design tokens and platform components.
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
              <strong>Key Features:</strong>
              <br />• Design tokens for all spacing
              <br />• Accessible form controls
              <br />• Proper state management
              <br />• Responsive layout
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
    const [activeTab, setActiveTab] = useState(0);

    const showcases = [
      {
        title: 'Buttons',
        description: 'Multiple variants and sizes',
        demo: (
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
            <Button data-variant="primary" data-size="sm">
              Primary
            </Button>
            <Button data-variant="secondary" data-size="sm">
              Secondary
            </Button>
            <Button data-variant="tertiary" data-size="sm">
              Tertiary
            </Button>
            <Button data-variant="danger" data-size="sm">
              Danger
            </Button>
          </div>
        ),
      },
      {
        title: 'Cards',
        description: 'Flexible container component',
        demo: (
          <Card style={{ padding: 'var(--ds-spacing-5)' }}>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Card Title
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              Cards are versatile containers for grouping related content.
            </Paragraph>
          </Card>
        ),
      },
      {
        title: 'Typography',
        description: 'Semantic heading levels',
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
            <Paragraph data-size="md">Body text with proper line height and spacing.</Paragraph>
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
            Component Showcase
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
              key={showcase.title}
              data-variant={activeTab === index ? 'primary' : 'tertiary'}
              data-size="sm"
              onClick={() => setActiveTab(index)}
            >
              {showcase.title}
            </Button>
          ))}
        </div>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {showcases[activeTab].title}
          </Heading>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-5)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {showcases[activeTab].description}
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
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Resources & Documentation
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        {[
          {
            title: 'Getting Started',
            description: 'Installation, setup, and your first component',
            link: '?path=/docs/overview-getting-started--docs',
          },
          {
            title: 'Fundamentals',
            description: 'Design tokens, accessibility, best practices, and patterns',
            link: '?path=/docs/fundamentals-tokens--docs',
          },
          {
            title: 'Components',
            description: 'Browse all 50+ components with live examples',
            link: '?path=/docs/components-button--docs',
          },
          {
            title: 'Examples',
            description: '1000+ code examples and training materials',
            link: '?path=/docs/examples-component-examples--docs',
          },
          {
            title: 'Designsystemet',
            description: 'Official Norwegian Design System documentation',
            link: 'https://designsystemet.no/',
            external: true,
          },
        ].map(({ title, description, link, external }) => (
          <Card
            key={title}
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
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {description}
              </Paragraph>
            </div>
            <Button
              data-variant="tertiary"
              data-size="sm"
              onClick={() => (window.location.href = link)}
            >
              {external ? 'Visit →' : 'View →'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  ),
};
