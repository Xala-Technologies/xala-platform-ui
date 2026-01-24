import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Card, Heading, Paragraph, Checkbox } from '../index';
import {
  CheckCircle,
  XCircle,
  Code,
  FileCode,
  TestTube,
  Layers,
  Shield,
  Zap,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { useT } from '@xala-technologies/i18n';

const meta: Meta = {
  title: 'Overview/Contributing',
  parameters: {
    docs: {
      description: {
        component: `
# Contributing to Xala Platform

Learn how to contribute components, follow best practices, and maintain quality standards.

## Key Principles
- Domain agnostic components
- Token-driven styling
- Accessibility first
- Comprehensive testing
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Design Principles Overview
 */
export const DesignPrinciples: Story = {
  render: function Render() {
    const t = useT();

    const principles = [
      {
        Icon: Shield,
        titleKey: 'storybook.contributing.domainAgnostic',
        descriptionKey: 'storybook.contributing.domainAgnosticDesc',
        bad: '<BookingCard listing={listing} />',
        good: '<ResourceCard resource={resource} />',
        color: 'var(--ds-color-accent-base-default)',
      },
      {
        Icon: Zap,
        titleKey: 'storybook.contributing.tokenDriven',
        descriptionKey: 'storybook.contributing.tokenDrivenDesc',
        bad: "padding: '16px', color: '#1E40AF'",
        good: "padding: 'var(--ds-spacing-4)', color: 'var(--ds-color-accent-base-default)'",
        color: 'var(--ds-color-warning-base-default)',
      },
      {
        Icon: CheckCircle,
        titleKey: 'storybook.contributing.accessibilityFirst',
        descriptionKey: 'storybook.contributing.accessibilityFirstDesc',
        requirements: [
          'storybook.contributing.keyboardNavigation',
          'storybook.contributing.screenReaderSupport',
          'storybook.contributing.focusManagement',
          'storybook.contributing.ariaAttributes',
          'storybook.contributing.colorContrast',
        ],
        color: 'var(--ds-color-success-base-default)',
      },
    ];

    return (
      <div>
        <Heading level={1} data-size="2xl" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.contributing.designPrinciples')}
        </Heading>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
          {principles.map(({ Icon, titleKey, descriptionKey, bad, good, requirements, color }) => (
            <Card
              key={titleKey}
              style={{
                padding: 'var(--ds-spacing-6)',
                borderLeft: `4px solid ${color}`,
                flex: '1 1 300px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-3)',
                  marginBottom: 'var(--ds-spacing-4)',
                }}
              >
                <Icon size={32} style={{ color }} />
                <Heading level={3} data-size="md">
                  {t(titleKey)}
                </Heading>
              </div>

              <Paragraph
                style={{
                  marginBottom: 'var(--ds-spacing-4)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {t(descriptionKey)}
              </Paragraph>

              {bad && good && (
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}
                >
                  <div
                    style={{
                      padding: 'var(--ds-spacing-3)',
                      backgroundColor: 'var(--ds-color-danger-surface-default)',
                      borderRadius: 'var(--ds-border-radius-sm)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ds-spacing-2)',
                        marginBottom: 'var(--ds-spacing-2)',
                      }}
                    >
                      <XCircle size={16} style={{ color: 'var(--ds-color-danger-base-default)' }} />
                      <strong
                        style={{
                          fontSize: 'var(--ds-font-size-sm)',
                          color: 'var(--ds-color-danger-text-default)',
                        }}
                      >
                        {t('storybook.contributing.bad')}
                      </strong>
                    </div>
                    <code
                      style={{
                        fontSize: 'var(--ds-font-size-xs)',
                        color: 'var(--ds-color-danger-text-default)',
                      }}
                    >
                      {bad}
                    </code>
                  </div>

                  <div
                    style={{
                      padding: 'var(--ds-spacing-3)',
                      backgroundColor: 'var(--ds-color-success-surface-default)',
                      borderRadius: 'var(--ds-border-radius-sm)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ds-spacing-2)',
                        marginBottom: 'var(--ds-spacing-2)',
                      }}
                    >
                      <CheckCircle
                        size={16}
                        style={{ color: 'var(--ds-color-success-base-default)' }}
                      />
                      <strong
                        style={{
                          fontSize: 'var(--ds-font-size-sm)',
                          color: 'var(--ds-color-success-text-default)',
                        }}
                      >
                        {t('storybook.contributing.good')}
                      </strong>
                    </div>
                    <code
                      style={{
                        fontSize: 'var(--ds-font-size-xs)',
                        color: 'var(--ds-color-success-text-default)',
                      }}
                    >
                      {good}
                    </code>
                  </div>
                </div>
              )}

              {requirements && (
                <div style={{ marginTop: 'var(--ds-spacing-3)' }}>
                  {requirements.map((reqKey, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ds-spacing-2)',
                        marginBottom: 'var(--ds-spacing-1)',
                      }}
                    >
                      <CheckCircle size={14} style={{ color }} />
                      <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>{t(reqKey)}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Component Layer Architecture
 */
export const ComponentArchitecture: Story = {
  render: function Render() {
    const t = useT();

    const layers = [
      {
        layer: 'Primitives',
        level: 1,
        canImportKey: 'storybook.contributing.designsystemetOnly',
        examples: ['Button', 'Input', 'Checkbox', 'Radio'],
        descriptionKey: 'storybook.contributing.primitivesDesc',
      },
      {
        layer: 'Blocks',
        level: 2,
        canImportKey: 'storybook.contributing.primitives',
        examples: ['Card', 'Alert', 'Badge', 'Avatar'],
        descriptionKey: 'storybook.contributing.blocksDesc',
      },
      {
        layer: 'Composed',
        level: 3,
        canImportKey: 'storybook.contributing.blocksPrimitives',
        examples: ['DataTable', 'Form', 'Modal', 'Drawer'],
        descriptionKey: 'storybook.contributing.composedDesc',
      },
      {
        layer: 'Patterns',
        level: 4,
        canImportKey: 'storybook.contributing.composedBlocksPrimitives',
        examples: ['Wizard', 'EmptyState', 'ErrorBoundary'],
        descriptionKey: 'storybook.contributing.patternsDesc',
      },
      {
        layer: 'Shells',
        level: 5,
        canImportKey: 'storybook.contributing.allLowerLayers',
        examples: ['DashboardShell', 'SidebarLayout'],
        descriptionKey: 'storybook.contributing.shellsDesc',
      },
      {
        layer: 'Pages',
        level: 6,
        canImportKey: 'storybook.contributing.allLayers',
        examples: ['LoginPage', 'DashboardPage'],
        descriptionKey: 'storybook.contributing.pagesDesc',
      },
    ];

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.contributing.componentArchitecture')}
        </Heading>

        <Card style={{ padding: 'var(--ds-spacing-8)' }}>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.contributing.architectureDesc')}
          </Paragraph>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            {layers.map(({ layer, level, canImportKey, examples, descriptionKey }) => (
              <div
                key={layer}
                style={{
                  padding: 'var(--ds-spacing-5)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  borderLeft: `4px solid var(--ds-color-accent-base-default)`,
                  opacity: 1 - (level - 1) * 0.1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-3)',
                    marginBottom: 'var(--ds-spacing-3)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: 'var(--ds-color-accent-base-default)',
                      color: 'var(--ds-color-accent-contrast-default)',
                      borderRadius: 'var(--ds-border-radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--ds-font-size-sm)',
                      fontWeight: 600,
                    }}
                  >
                    {level}
                  </div>
                  <Heading level={3} data-size="sm">
                    {layer}
                  </Heading>
                </div>

                <Paragraph
                  data-size="sm"
                  style={{
                    marginBottom: 'var(--ds-spacing-3)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {t(descriptionKey)}
                </Paragraph>

                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--ds-spacing-4)',
                    flexWrap: 'wrap',
                    marginBottom: 'var(--ds-spacing-3)',
                  }}
                >
                  <div>
                    <strong
                      style={{
                        fontSize: 'var(--ds-font-size-xs)',
                        color: 'var(--ds-color-accent-text-default)',
                      }}
                    >
                      {t('storybook.contributing.canImport')}:
                    </strong>
                    <span
                      style={{
                        fontSize: 'var(--ds-font-size-xs)',
                        marginLeft: 'var(--ds-spacing-2)',
                      }}
                    >
                      {t(canImportKey)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
                  {examples.map((example) => (
                    <span
                      key={example}
                      style={{
                        padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                        fontSize: 'var(--ds-font-size-xs)',
                        fontFamily: 'monospace',
                      }}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 'var(--ds-spacing-6)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-warning-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-warning-text-default)' }}>
              <strong>{t('storybook.contributing.criticalRule')}:</strong>{' '}
              {t('storybook.contributing.criticalRuleDesc')}
            </Paragraph>
          </div>
        </Card>
      </div>
    );
  },
};

/**
 * Interactive Component Creation Wizard
 */
export const ComponentCreationWizard: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const steps = [
      {
        titleKey: 'storybook.contributing.createComponentFile',
        icon: FileCode,
        code: `// src/ui/primitives/MyComponent.tsx
import React from 'react';

export interface MyComponentProps {
  /** Component description */
  label: string;
  /** Optional variant */
  variant?: 'primary' | 'secondary';
}

/**
 * MyComponent - Brief description
 *
 * @example
 * \`\`\`tsx
 * <MyComponent label="Hello" variant="primary" />
 * \`\`\`
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  label,
  variant = 'primary'
}) => {
  return (
    <div
      data-variant={variant}
      style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}
    >
      {label}
    </div>
  );
};`,
      },
      {
        titleKey: 'storybook.contributing.exportFromIndex',
        icon: Code,
        code: `// src/ui/primitives/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';`,
      },
      {
        titleKey: 'storybook.contributing.createStorybookStory',
        icon: BookOpen,
        code: `// src/ui/stories/Primitives/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../../primitives/MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Primitives/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    label: 'Hello World',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Hello World',
    variant: 'secondary',
  },
};`,
      },
      {
        titleKey: 'storybook.contributing.addUnitTests',
        icon: TestTube,
        code: `// src/ui/primitives/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders label', () => {
    render(<MyComponent label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant', () => {
    const { container } = render(
      <MyComponent label="Test" variant="secondary" />
    );
    expect(container.firstChild).toHaveAttribute(
      'data-variant',
      'secondary'
    );
  });

  it('uses default variant', () => {
    const { container } = render(<MyComponent label="Test" />);
    expect(container.firstChild).toHaveAttribute(
      'data-variant',
      'primary'
    );
  });
});`,
      },
    ];

    const toggleStep = (index: number) => {
      if (completedSteps.includes(index)) {
        setCompletedSteps(completedSteps.filter((i) => i !== index));
      } else {
        setCompletedSteps([...completedSteps, index]);
      }
    };

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.contributing.componentCreationGuide')}
        </Heading>

        <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
          {/* Steps sidebar */}
          <div>
            <Card style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                {t('storybook.contributing.steps')}
              </Heading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = completedSteps.includes(index);

                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      style={{
                        padding: 'var(--ds-spacing-3)',
                        backgroundColor: isActive
                          ? 'var(--ds-color-accent-surface-default)'
                          : 'transparent',
                        borderRadius: 'var(--ds-border-radius-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ds-spacing-2)',
                        border: isActive
                          ? '1px solid var(--ds-color-accent-border-default)'
                          : '1px solid transparent',
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle
                          size={20}
                          style={{ color: 'var(--ds-color-success-base-default)' }}
                        />
                      ) : (
                        <Icon
                          size={20}
                          style={{
                            color: isActive
                              ? 'var(--ds-color-accent-base-default)'
                              : 'var(--ds-color-neutral-text-subtle)',
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: 'var(--ds-font-size-sm)',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--ds-color-accent-text-default)' : 'inherit',
                        }}
                      >
                        {index + 1}. {t(step.titleKey)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: 'var(--ds-spacing-4)',
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-success-surface-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                }}
              >
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
                  <strong>
                    {completedSteps.length} {t('storybook.contributing.of')} {steps.length}
                  </strong>{' '}
                  {t('storybook.contributing.stepsCompleted')}
                </Paragraph>
              </div>
            </Card>
          </div>

          {/* Content area */}
          <Card style={{ padding: 'var(--ds-spacing-6)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-3)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              {React.createElement(steps[currentStep].icon, {
                size: 32,
                style: { color: 'var(--ds-color-accent-base-default)' },
              })}
              <Heading level={3} data-size="md">
                {t('storybook.contributing.step')} {currentStep + 1}:{' '}
                {t(steps[currentStep].titleKey)}
              </Heading>
            </div>

            <pre
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-md)',
                overflow: 'auto',
                fontSize: 'var(--ds-font-size-xs)',
                lineHeight: '1.6',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              {steps[currentStep].code}
            </pre>

            <div
              style={{
                display: 'flex',
                gap: 'var(--ds-spacing-3)',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Checkbox
                  checked={completedSteps.includes(currentStep)}
                  onChange={() => toggleStep(currentStep)}
                  aria-label={t('storybook.contributing.markCompleted')}
                >
                  {t('storybook.contributing.markCompleted')}
                </Checkbox>
              </div>

              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button
                  data-variant="tertiary"
                  data-size="sm"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  ← {t('storybook.contributing.previous')}
                </Button>
                <Button
                  data-variant="primary"
                  data-size="sm"
                  disabled={currentStep === steps.length - 1}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  {t('storybook.contributing.next')} →
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

/**
 * Quality Checklist
 */
export const QualityChecklist: Story = {
  render: function Render() {
    const t = useT();
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const checklistItems = [
      {
        categoryKey: 'storybook.contributing.codeQuality',
        items: [
          { id: 'typescript', labelKey: 'storybook.contributing.typescriptDefs' },
          { id: 'tokens', labelKey: 'storybook.contributing.usesDesignTokens' },
          { id: 'domain', labelKey: 'storybook.contributing.domainAgnosticCheck' },
          { id: 'layers', labelKey: 'storybook.contributing.followsLayerHierarchy' },
        ],
      },
      {
        categoryKey: 'storybook.contributing.accessibility',
        items: [
          { id: 'wcag', labelKey: 'storybook.contributing.wcagCompliant' },
          { id: 'keyboard', labelKey: 'storybook.contributing.keyboardNav' },
          { id: 'screen-reader', labelKey: 'storybook.contributing.screenReaderCompatible' },
          { id: 'aria', labelKey: 'storybook.contributing.properAria' },
          { id: 'contrast', labelKey: 'storybook.contributing.colorContrastMet' },
        ],
      },
      {
        categoryKey: 'storybook.contributing.documentation',
        items: [
          { id: 'jsdoc', labelKey: 'storybook.contributing.jsdocExamples' },
          { id: 'stories', labelKey: 'storybook.contributing.storyVariants' },
          { id: 'props', labelKey: 'storybook.contributing.propsDocumented' },
        ],
      },
      {
        categoryKey: 'storybook.contributing.testing',
        items: [
          { id: 'unit', labelKey: 'storybook.contributing.unitTests' },
          { id: 'interaction', labelKey: 'storybook.contributing.interactionTests' },
          { id: 'a11y-test', labelKey: 'storybook.contributing.a11yTests' },
        ],
      },
    ];

    const toggleItem = (id: string) => {
      if (checkedItems.includes(id)) {
        setCheckedItems(checkedItems.filter((i) => i !== id));
      } else {
        setCheckedItems([...checkedItems, id]);
      }
    };

    const totalItems = checklistItems.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = checkedItems.length;
    const progress = Math.round((completedItems / totalItems) * 100);

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.contributing.qualityChecklist')}
        </Heading>

        <Card style={{ padding: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-6)' }}>
          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 'var(--ds-spacing-2)',
              }}
            >
              <Paragraph data-size="sm" style={{ fontWeight: 600 }}>
                {t('storybook.contributing.overallProgress')}
              </Paragraph>
              <Paragraph
                data-size="sm"
                style={{ color: 'var(--ds-color-accent-text-default)', fontWeight: 600 }}
              >
                {completedItems} / {totalItems} ({progress}%)
              </Paragraph>
            </div>
            <div
              style={{
                height: '8px',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-full)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor:
                    progress === 100
                      ? 'var(--ds-color-success-base-default)'
                      : 'var(--ds-color-accent-base-default)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          {progress === 100 && (
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-success-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
              }}
            >
              <CheckCircle size={24} style={{ color: 'var(--ds-color-success-base-default)' }} />
              <Paragraph style={{ color: 'var(--ds-color-success-text-default)' }}>
                <strong>{t('storybook.contributing.readyToSubmit')}</strong>{' '}
                {t('storybook.contributing.meetsQualityStandards')}
              </Paragraph>
            </div>
          )}
        </Card>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
          {checklistItems.map(({ categoryKey, items }) => {
            const categoryCompleted = items.filter((item) => checkedItems.includes(item.id)).length;

            return (
              <Card key={categoryKey} style={{ padding: 'var(--ds-spacing-5)', flex: '1 1 300px' }}>
                <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                  <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                    {t(categoryKey)}
                  </Heading>
                  <Paragraph
                    data-size="xs"
                    style={{ color: 'var(--ds-color-accent-text-default)' }}
                  >
                    {categoryCompleted} / {items.length} {t('storybook.contributing.completed')}
                  </Paragraph>
                </div>

                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}
                >
                  {items.map((item) => (
                    <Checkbox
                      key={item.id}
                      checked={checkedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      aria-label={t(item.labelKey)}
                    >
                      {t(item.labelKey)}
                    </Checkbox>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  },
};

/**
 * Testing Best Practices
 */
export const TestingBestPractices: Story = {
  render: function Render() {
    const t = useT();

    const testingTypes = [
      {
        titleKey: 'storybook.contributing.unitTests',
        icon: TestTube,
        descriptionKey: 'storybook.contributing.unitTestsDesc',
        commands: [
          { cmd: 'pnpm test', descKey: 'storybook.contributing.runAllTests' },
          { cmd: 'pnpm test:watch', descKey: 'storybook.contributing.watchMode' },
          { cmd: 'pnpm test:coverage', descKey: 'storybook.contributing.generateCoverage' },
        ],
        example: `describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <Button data-variant="primary">Button</Button>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', 'primary');
  });
});`,
      },
      {
        titleKey: 'storybook.contributing.storybookTests',
        icon: BookOpen,
        descriptionKey: 'storybook.contributing.storybookTestsDesc',
        commands: [
          { cmd: 'pnpm test:storybook', descKey: 'storybook.contributing.runStorybookTests' },
          { cmd: 'pnpm storybook', descKey: 'storybook.contributing.startStorybookDev' },
        ],
        example: `export const WithInteraction: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};`,
      },
      {
        titleKey: 'storybook.contributing.accessibilityTests',
        icon: Shield,
        descriptionKey: 'storybook.contributing.accessibilityTestsDesc',
        commands: [{ cmd: 'pnpm test:a11y', descKey: 'storybook.contributing.runA11yTests' }],
        example: `it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('is keyboard accessible', async () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button');

  button.focus();
  expect(button).toHaveFocus();

  await userEvent.keyboard('{Enter}');
  // Verify action occurred
});`,
      },
    ];

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.contributing.testingBestPractices')}
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
          {testingTypes.map(({ titleKey, icon: Icon, descriptionKey, commands, example }) => (
            <Card key={titleKey} style={{ padding: 'var(--ds-spacing-6)', flex: '1 1 350px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-3)',
                  marginBottom: 'var(--ds-spacing-4)',
                }}
              >
                <Icon size={28} style={{ color: 'var(--ds-color-accent-base-default)' }} />
                <div>
                  <Heading level={3} data-size="md">
                    {t(titleKey)}
                  </Heading>
                  <Paragraph
                    data-size="sm"
                    style={{ color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {t(descriptionKey)}
                  </Paragraph>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                  {t('storybook.contributing.commands')}
                </Heading>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}
                >
                  {commands.map(({ cmd, descKey }) => (
                    <div
                      key={cmd}
                      style={{
                        padding: 'var(--ds-spacing-3)',
                        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                      }}
                    >
                      <code style={{ fontSize: 'var(--ds-font-size-sm)', fontWeight: 600 }}>
                        {cmd}
                      </code>
                      <Paragraph
                        data-size="xs"
                        style={{
                          marginTop: 'var(--ds-spacing-1)',
                          color: 'var(--ds-color-neutral-text-subtle)',
                        }}
                      >
                        {t(descKey)}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                  {t('storybook.contributing.example')}
                </Heading>
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
                  {example}
                </pre>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Common Pitfalls
 */
export const CommonPitfalls: Story = {
  render: function Render() {
    const t = useT();

    const pitfalls = [
      {
        titleKey: 'storybook.contributing.hardcodingValues',
        bad: "style={{ padding: '16px', color: '#1E40AF' }}",
        good: "style={{ padding: 'var(--ds-spacing-4)', color: 'var(--ds-color-accent-base-default)' }}",
        whyKey: 'storybook.contributing.hardcodingValuesWhy',
      },
      {
        titleKey: 'storybook.contributing.domainSpecificLogic',
        bad: '<BookingCard booking={booking} onBook={handleBook} />',
        good: '<ResourceCard resource={resource} onAction={handleAction} />',
        whyKey: 'storybook.contributing.domainSpecificLogicWhy',
      },
      {
        titleKey: 'storybook.contributing.missingAccessibility',
        bad: '<div onClick={handleClick}>Click me</div>',
        good: '<button onClick={handleClick} aria-label="Submit form">Click me</button>',
        whyKey: 'storybook.contributing.missingAccessibilityWhy',
      },
      {
        titleKey: 'storybook.contributing.circularDependencies',
        bad: 'primitives/Button imports from blocks/Card',
        good: 'blocks/Card imports from primitives/Button',
        whyKey: 'storybook.contributing.circularDependenciesWhy',
      },
      {
        titleKey: 'storybook.contributing.inlineStylesNoTokens',
        bad: '<div style={{ marginTop: 20, fontSize: 14 }}>',
        good: "<div style={{ marginTop: 'var(--ds-spacing-5)', fontSize: 'var(--ds-font-size-sm)' }}>",
        whyKey: 'storybook.contributing.inlineStylesNoTokensWhy',
      },
      {
        titleKey: 'storybook.contributing.missingTypescript',
        bad: 'export const MyComponent = ({ data }) => { ... }',
        good: 'export const MyComponent: React.FC<MyComponentProps> = ({ data }) => { ... }',
        whyKey: 'storybook.contributing.missingTypescriptWhy',
      },
    ];

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.contributing.commonPitfalls')}
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          {pitfalls.map(({ titleKey, bad, good, whyKey }) => (
            <Card
              key={titleKey}
              style={{
                padding: 'var(--ds-spacing-5)',
                borderLeft: '4px solid var(--ds-color-warning-base-default)',
                flex: '1 1 350px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  marginBottom: 'var(--ds-spacing-3)',
                }}
              >
                <AlertTriangle
                  size={20}
                  style={{ color: 'var(--ds-color-warning-base-default)' }}
                />
                <Heading level={3} data-size="sm">
                  {t(titleKey)}
                </Heading>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ds-spacing-3)',
                  marginBottom: 'var(--ds-spacing-3)',
                }}
              >
                <div
                  style={{
                    padding: 'var(--ds-spacing-3)',
                    backgroundColor: 'var(--ds-color-danger-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--ds-spacing-2)',
                      marginBottom: 'var(--ds-spacing-2)',
                    }}
                  >
                    <XCircle size={16} style={{ color: 'var(--ds-color-danger-base-default)' }} />
                    <strong
                      style={{
                        fontSize: 'var(--ds-font-size-sm)',
                        color: 'var(--ds-color-danger-text-default)',
                      }}
                    >
                      {t('storybook.contributing.bad')}
                    </strong>
                  </div>
                  <code
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-danger-text-default)',
                    }}
                  >
                    {bad}
                  </code>
                </div>

                <div
                  style={{
                    padding: 'var(--ds-spacing-3)',
                    backgroundColor: 'var(--ds-color-success-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--ds-spacing-2)',
                      marginBottom: 'var(--ds-spacing-2)',
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{ color: 'var(--ds-color-success-base-default)' }}
                    />
                    <strong
                      style={{
                        fontSize: 'var(--ds-font-size-sm)',
                        color: 'var(--ds-color-success-text-default)',
                      }}
                    >
                      {t('storybook.contributing.good')}
                    </strong>
                  </div>
                  <code
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-success-text-default)',
                    }}
                  >
                    {good}
                  </code>
                </div>
              </div>

              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                <strong>{t('storybook.contributing.why')}:</strong> {t(whyKey)}
              </Paragraph>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};
