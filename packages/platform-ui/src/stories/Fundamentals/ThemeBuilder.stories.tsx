import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, Heading, Paragraph } from '../../index';
import { Palette, Settings, Wrench, Download, Check } from 'lucide-react';

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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Color Contexts
      </Heading>

      {/* Accent */}
      <div data-color="accent" style={{ 
        padding: 'var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-accent-border-default)',
      }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-accent-text-default)',
          marginBottom: 'var(--ds-spacing-3)',
        }}>
          Accent Context
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-accent-text-default)', marginBottom: 'var(--ds-spacing-4)' }}>
          Primary brand actions and interactive elements
        </Paragraph>
        <Button data-variant="primary">Primary Action</Button>
      </div>

      {/* Success */}
      <div data-color="success" style={{ 
        padding: 'var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-success-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-success-border-default)',
      }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-3)',
        }}>
          Success Context
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-success-text-default)', marginBottom: 'var(--ds-spacing-4)' }}>
          Positive feedback and successful operations
        </Paragraph>
        <Button data-variant="primary">Confirm</Button>
      </div>

      {/* Danger */}
      <div data-color="danger" style={{ 
        padding: 'var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-danger-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-danger-border-default)',
      }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-3)',
        }}>
          Danger Context
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-danger-text-default)', marginBottom: 'var(--ds-spacing-4)' }}>
          Destructive actions and error states
        </Paragraph>
        <Button data-variant="primary">Delete</Button>
      </div>
    </div>
  ),
};

/**
 * Example 2: Size Modes
 * 
 * Three size scales for different use cases
 */
export const SizeModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Size Modes
      </Heading>

      {/* Small */}
      <div data-size="sm">
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Small (sm) - Compact
        </Heading>
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            Compact UI for dense information display
          </Paragraph>
          <Button data-variant="primary" data-size="sm">
            Small Button
          </Button>
        </Card>
      </div>

      {/* Medium */}
      <div data-size="md">
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Medium (md) - Default
        </Heading>
        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Default size for general purpose use
          </Paragraph>
          <Button data-variant="primary" data-size="md">
            Medium Button
          </Button>
        </Card>
      </div>

      {/* Large */}
      <div data-size="lg">
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Large (lg) - Accessible
        </Heading>
        <Card style={{ padding: 'var(--ds-spacing-8)' }}>
          <Paragraph style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            Large size for accessibility and touch interfaces
          </Paragraph>
          <Button data-variant="primary" data-size="lg">
            Large Button
          </Button>
        </Card>
      </div>
    </div>
  ),
};

/**
 * Example 3: Theme Tokens in Use
 * 
 * How theme tokens work together
 */
export const ThemeTokensInUse: Story = {
  render: () => (
    <Card style={{ 
      padding: 'var(--ds-spacing-8)',
      backgroundColor: 'var(--ds-color-neutral-surface-default)',
      border: '1px solid var(--ds-color-neutral-border-default)',
      borderRadius: 'var(--ds-border-radius-lg)',
      boxShadow: 'var(--ds-shadow-md)',
    }}>
      <Heading level={3} data-size="lg" style={{ 
        color: 'var(--ds-color-neutral-text-default)',
        marginBottom: 'var(--ds-spacing-4)',
      }}>
        Card Using Theme Tokens
      </Heading>
      
      <Paragraph style={{ 
        color: 'var(--ds-color-neutral-text-subtle)',
        marginBottom: 'var(--ds-spacing-6)',
      }}>
        This card demonstrates multiple theme tokens working together:
      </Paragraph>

      <div style={{ 
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        borderRadius: 'var(--ds-border-radius-md)',
        marginBottom: 'var(--ds-spacing-6)',
      }}>
        <ul style={{ 
          margin: 0,
          paddingLeft: 'var(--ds-spacing-6)',
          color: 'var(--ds-color-neutral-text-default)',
        }}>
          <li>Background: <code>--ds-color-neutral-surface-default</code></li>
          <li>Border: <code>--ds-color-neutral-border-default</code></li>
          <li>Border Radius: <code>--ds-border-radius-lg</code></li>
          <li>Shadow: <code>--ds-shadow-md</code></li>
          <li>Spacing: <code>--ds-spacing-*</code></li>
          <li>Text Color: <code>--ds-color-neutral-text-default</code></li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
        <Button data-variant="primary">
          Primary
        </Button>
        <Button data-variant="secondary">
          Secondary
        </Button>
      </div>
    </Card>
  ),
};

/**
 * Example 4: Creating Custom Themes
 * 
 * Step-by-step guide
 */
export const CreatingCustomThemes: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Creating Custom Themes
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            step: 1,
            title: 'Visit Theme Builder',
            description: 'Go to https://theme.designsystemet.no/',
            Icon: Palette,
          },
          {
            step: 2,
            title: 'Configure Colors',
            description: 'Choose your primary, accent, and semantic colors',
            Icon: Palette,
          },
          {
            step: 3,
            title: 'Set Preferences',
            description: 'Configure border radius, spacing, and typography',
            Icon: Settings,
          },
          {
            step: 4,
            title: 'Export Theme',
            description: 'Download CSS or JSON configuration',
            Icon: Download,
          },
          {
            step: 5,
            title: 'Import in App',
            description: 'Add theme CSS to your application',
            Icon: Check,
          },
        ].map(({ step, title, description, Icon }) => (
          <Card key={step} style={{ 
            padding: 'var(--ds-spacing-6)',
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            alignItems: 'flex-start',
          }}>
            <div style={{ 
              width: '48px',
              height: '48px',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={24} style={{ color: 'var(--ds-color-accent-base-default)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                Step {step}: {title}
              </Heading>
              <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {description}
              </Paragraph>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/**
 * Example 5: Theme Best Practices
 * 
 * Guidelines for theme customization
 */
export const ThemeBestPractices: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-8)' }}>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Theme Best Practices
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {/* Do's */}
        <div>
          <Heading level={3} data-size="sm" style={{ 
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}>
            ✅ Do
          </Heading>
          <div style={{ 
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}>
            {[
              'Use semantic color tokens',
              'Test both light and dark modes',
              'Verify color contrast ratios',
              'Respect user preferences (prefers-color-scheme)',
              'Use Theme Builder for consistency',
              'Document custom theme choices',
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: 'var(--ds-spacing-2)',
                marginBottom: i < 5 ? 'var(--ds-spacing-2)' : 0,
              }}>
                <span>•</span>
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
                  {item}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>

        {/* Don'ts */}
        <div>
          <Heading level={3} data-size="sm" style={{ 
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}>
            ❌ Don't
          </Heading>
          <div style={{ 
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-danger-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}>
            {[
              'Hardcode color values',
              'Ignore accessibility guidelines',
              'Use too many brand colors',
              'Override core component structure',
              'Forget to test dark mode',
              'Skip contrast validation',
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: 'var(--ds-spacing-2)',
                marginBottom: i < 5 ? 'var(--ds-spacing-2)' : 0,
              }}>
                <span>•</span>
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
                  {item}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  ),
};
