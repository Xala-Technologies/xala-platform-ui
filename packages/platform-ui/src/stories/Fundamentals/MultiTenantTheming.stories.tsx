import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Card, Heading, Paragraph } from '../../index';
import { Building2, Palette, Check, AlertCircle } from 'lucide-react';
import {
  registerCustomTheme,
  getCustomTheme,
  hasCustomTheme,
  generateThemeCSS,
  type TenantThemeConfig,
} from '../../themes';

const meta: Meta = {
  title: 'Fundamentals/Multi-Tenant Theming',
  parameters: {
    docs: {
      description: {
        component: `
# Multi-Tenant Theming

Enable per-tenant theme customization with brand colors, typography, and component variants.

## Features
- Runtime theme registration and switching
- Brand color overrides (light/dark modes)
- Typography customization
- Component variant overrides
- Schema validation
- Accessibility validation

## Key Functions
- \`registerCustomTheme(config)\` - Register a custom tenant theme
- \`getCustomTheme(tenantId)\` - Retrieve a registered theme
- \`generateThemeCSS(config)\` - Generate CSS for a theme
- \`hasCustomTheme(tenantId)\` - Check if a theme is registered

## Reference
[Designsystemet Theme Builder](https://theme.designsystemet.no/)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Example 1: Basic Tenant Theme Configuration
 *
 * Configure a custom theme for a tenant with brand colors
 */
export const BasicConfiguration: Story = {
  render: function Render() {
    const [themeRegistered, setThemeRegistered] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const acmeTheme: TenantThemeConfig = {
      tenantId: 'acme-corp',
      name: 'Acme Corporation',
      baseTheme: 'platform',
      colors: {
        light: {
          accent: {
            base: '#FF6B35',
            hover: '#E55A2B',
            contrast: '#FFFFFF',
          },
          neutral: {
            background: '#F5F5F0',
            surface: '#FFFFFF',
            surfaceHover: '#E8E8E3',
            text: '#1A1A1A',
            textSubtle: '#5A5A5A',
            border: '#D0D0CA',
          },
        },
      },
      typography: {
        fontFamily: {
          base: 'Inter, system-ui, sans-serif',
          heading: 'Inter, system-ui, sans-serif',
        },
      },
      metadata: {
        version: '1.0.0',
        author: 'Acme Design Team',
        description: 'Custom theme for Acme Corporation',
      },
    };

    const handleRegister = () => {
      try {
        registerCustomTheme(acmeTheme, { validate: true, override: true });
        setThemeRegistered(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Registration failed');
        setThemeRegistered(false);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md">
          Tenant Theme Configuration
        </Heading>

        {/* Configuration Display */}
        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Acme Corporation Theme
          </Heading>

          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-md)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            <pre
              style={{
                margin: 0,
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-default)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {JSON.stringify(acmeTheme, null, 2)}
            </pre>
          </div>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', alignItems: 'center' }}>
            <Button data-variant="primary" onClick={handleRegister}>
              Register Theme
            </Button>
            {themeRegistered && (
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
                <Check size={20} style={{ color: 'var(--ds-color-success-base-default)' }} />
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
                  Theme registered successfully
                </Paragraph>
              </div>
            )}
            {error && (
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
                <AlertCircle size={20} style={{ color: 'var(--ds-color-danger-base-default)' }} />
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
                  {error}
                </Paragraph>
              </div>
            )}
          </div>
        </Card>

        {/* Color Preview */}
        {themeRegistered && (
          <Card style={{ padding: 'var(--ds-spacing-6)' }}>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              Color Preview
            </Heading>

            <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
              {/* Accent Color */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    height: '80px',
                    backgroundColor: acmeTheme.colors?.light?.accent?.base,
                    borderRadius: 'var(--ds-border-radius-md)',
                    marginBottom: 'var(--ds-spacing-2)',
                  }}
                />
                <Paragraph data-size="sm">Accent: {acmeTheme.colors?.light?.accent?.base}</Paragraph>
              </div>

              {/* Surface Color */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    height: '80px',
                    backgroundColor: acmeTheme.colors?.light?.neutral?.surface,
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    marginBottom: 'var(--ds-spacing-2)',
                  }}
                />
                <Paragraph data-size="sm">
                  Surface: {acmeTheme.colors?.light?.neutral?.surface}
                </Paragraph>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  },
};

/**
 * Example 2: Multiple Tenant Themes
 *
 * Switch between different tenant themes at runtime
 */
export const MultipleTenants: Story = {
  render: function Render() {
    const [activeTheme, setActiveTheme] = useState<string>('techstart');

    const tenantThemes: TenantThemeConfig[] = [
      {
        tenantId: 'techstart',
        name: 'TechStart Inc.',
        baseTheme: 'platform',
        colors: {
          light: {
            accent: {
              base: '#0066CC',
              hover: '#0052A3',
              contrast: '#FFFFFF',
            },
          },
        },
      },
      {
        tenantId: 'greenleaf',
        name: 'Greenleaf Solutions',
        baseTheme: 'platform',
        colors: {
          light: {
            accent: {
              base: '#2E8B57',
              hover: '#257A4A',
              contrast: '#FFFFFF',
            },
          },
        },
      },
      {
        tenantId: 'sunburst',
        name: 'Sunburst Energy',
        baseTheme: 'platform',
        colors: {
          light: {
            accent: {
              base: '#FFA500',
              hover: '#E69400',
              contrast: '#1A1A1A',
            },
          },
        },
      },
    ];

    // Register all themes
    useState(() => {
      tenantThemes.forEach((theme) => {
        try {
          registerCustomTheme(theme, { validate: true, override: true });
        } catch (error) {
          // Ignore registration errors in this demo
        }
      });
    });

    const currentTheme = tenantThemes.find((t) => t.tenantId === activeTheme);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md">
          Multiple Tenant Themes
        </Heading>

        {/* Theme Switcher */}
        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Select Tenant
          </Heading>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
            {tenantThemes.map((theme) => (
              <Button
                key={theme.tenantId}
                data-variant={activeTheme === theme.tenantId ? 'primary' : 'secondary'}
                onClick={() => setActiveTheme(theme.tenantId)}
              >
                <Building2 size={16} style={{ marginRight: 'var(--ds-spacing-2)' }} />
                {theme.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* Current Theme Display */}
        {currentTheme && (
          <Card
            style={{
              padding: 'var(--ds-spacing-6)',
              backgroundColor: currentTheme.colors?.light?.neutral?.surface || 'var(--ds-color-neutral-surface-default)',
              border: `2px solid ${currentTheme.colors?.light?.accent?.base || 'var(--ds-color-accent-base-default)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: currentTheme.colors?.light?.accent?.base,
                  borderRadius: 'var(--ds-border-radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Palette size={24} style={{ color: currentTheme.colors?.light?.accent?.contrast }} />
              </div>
              <div>
                <Heading level={4} data-size="sm">
                  {currentTheme.name}
                </Heading>
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  Tenant ID: {currentTheme.tenantId}
                </Paragraph>
              </div>
            </div>

            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-md)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                <strong>Accent Color:</strong> {currentTheme.colors?.light?.accent?.base}
              </Paragraph>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                <strong>Hover Color:</strong> {currentTheme.colors?.light?.accent?.hover}
              </Paragraph>
              <Paragraph data-size="sm">
                <strong>Contrast Color:</strong> {currentTheme.colors?.light?.accent?.contrast}
              </Paragraph>
            </div>

            <Button
              data-variant="primary"
              style={{
                backgroundColor: currentTheme.colors?.light?.accent?.base,
                color: currentTheme.colors?.light?.accent?.contrast,
              }}
            >
              Themed Button
            </Button>
          </Card>
        )}
      </div>
    );
  },
};

/**
 * Example 3: Theme Validation
 *
 * Demonstrate theme validation with valid and invalid configurations
 */
export const ThemeValidation: Story = {
  render: function Render() {
    const [validationResults, setValidationResults] = useState<
      Array<{ theme: string; isValid: boolean; message: string }>
    >([]);

    const testThemes = [
      {
        name: 'Valid Theme',
        config: {
          tenantId: 'valid-tenant',
          name: 'Valid Corporation',
          baseTheme: 'platform' as const,
          colors: {
            light: {
              accent: {
                base: '#0066CC',
                hover: '#0052A3',
                contrast: '#FFFFFF',
              },
            },
          },
        },
      },
      {
        name: 'Invalid Hex Color',
        config: {
          tenantId: 'invalid-color',
          name: 'Invalid Color Corp',
          baseTheme: 'platform' as const,
          colors: {
            light: {
              accent: {
                base: 'not-a-color',
                hover: '#0052A3',
                contrast: '#FFFFFF',
              },
            },
          },
        },
      },
      {
        name: 'Missing Required Fields',
        config: {
          tenantId: 'missing-fields',
          // @ts-expect-error - Intentionally missing name for validation test
          baseTheme: 'platform' as const,
        },
      },
    ];

    const validateThemes = () => {
      const results = testThemes.map((test) => {
        try {
          registerCustomTheme(test.config as TenantThemeConfig, { validate: true, override: true });
          return {
            theme: test.name,
            isValid: true,
            message: 'Theme validated successfully',
          };
        } catch (error) {
          return {
            theme: test.name,
            isValid: false,
            message: error instanceof Error ? error.message : 'Validation failed',
          };
        }
      });
      setValidationResults(results);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md">
          Theme Validation
        </Heading>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Validation Examples
          </Heading>

          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Click the button below to validate example theme configurations. The validation checks for:
          </Paragraph>

          <ul
            style={{
              marginBottom: 'var(--ds-spacing-4)',
              paddingLeft: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            <li>Required fields (tenantId, name, baseTheme)</li>
            <li>Valid color formats (hex, rgb, rgba, hsl)</li>
            <li>Valid CSS length values (rem, em, px)</li>
            <li>Schema compliance</li>
          </ul>

          <Button data-variant="primary" onClick={validateThemes}>
            Run Validation Tests
          </Button>
        </Card>

        {/* Validation Results */}
        {validationResults.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            {validationResults.map((result, index) => (
              <Card
                key={index}
                style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: result.isValid
                    ? 'var(--ds-color-success-surface-tinted)'
                    : 'var(--ds-color-danger-surface-tinted)',
                  border: `1px solid ${
                    result.isValid
                      ? 'var(--ds-color-success-border-default)'
                      : 'var(--ds-color-danger-border-default)'
                  }`,
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', alignItems: 'flex-start' }}>
                  {result.isValid ? (
                    <Check size={20} style={{ color: 'var(--ds-color-success-base-default)' }} />
                  ) : (
                    <AlertCircle size={20} style={{ color: 'var(--ds-color-danger-base-default)' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <Heading
                      level={5}
                      data-size="xs"
                      style={{
                        color: result.isValid
                          ? 'var(--ds-color-success-text-default)'
                          : 'var(--ds-color-danger-text-default)',
                        marginBottom: 'var(--ds-spacing-2)',
                      }}
                    >
                      {result.theme}
                    </Heading>
                    <Paragraph
                      data-size="sm"
                      style={{
                        color: result.isValid
                          ? 'var(--ds-color-success-text-default)'
                          : 'var(--ds-color-danger-text-default)',
                      }}
                    >
                      {result.message}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Example 4: CSS Generation
 *
 * Generate and preview custom theme CSS
 */
export const CSSGeneration: Story = {
  render: function Render() {
    const [generatedCSS, setGeneratedCSS] = useState<string>('');

    const sampleTheme: TenantThemeConfig = {
      tenantId: 'css-demo',
      name: 'CSS Demo Theme',
      baseTheme: 'platform',
      colors: {
        light: {
          accent: {
            base: '#9333EA',
            hover: '#7C3AED',
            contrast: '#FFFFFF',
          },
        },
        dark: {
          accent: {
            base: '#C084FC',
            hover: '#D8B4FE',
            contrast: '#1A1A1A',
          },
        },
      },
      typography: {
        fontFamily: {
          base: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        },
      },
    };

    const generateCSS = () => {
      try {
        const css = generateThemeCSS(sampleTheme);
        setGeneratedCSS(css);
      } catch (error) {
        setGeneratedCSS(`Error: ${error instanceof Error ? error.message : 'CSS generation failed'}`);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md">
          CSS Generation
        </Heading>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Generate Custom CSS
          </Heading>

          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            The theme system automatically generates CSS custom properties from your configuration.
            This CSS can be injected at runtime to apply the theme.
          </Paragraph>

          <Button data-variant="primary" onClick={generateCSS}>
            Generate CSS for Sample Theme
          </Button>
        </Card>

        {generatedCSS && (
          <Card style={{ padding: 'var(--ds-spacing-6)' }}>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              Generated CSS
            </Heading>

            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-md)',
                maxHeight: '400px',
                overflow: 'auto',
              }}
            >
              <pre
                style={{
                  margin: 0,
                  fontSize: 'var(--ds-font-size-xs)',
                  color: 'var(--ds-color-neutral-text-default)',
                  fontFamily: 'var(--ds-font-family-mono)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {generatedCSS}
              </pre>
            </div>
          </Card>
        )}
      </div>
    );
  },
};

/**
 * Example 5: Implementation Guide
 *
 * Step-by-step guide for implementing multi-tenant theming
 */
export const ImplementationGuide: Story = {
  render: function Render() {
    const steps = [
      {
        step: 1,
        title: 'Define Theme Configuration',
        description:
          'Create a TenantThemeConfig object with your brand colors, typography, and component overrides.',
        code: `const tenantTheme: TenantThemeConfig = {
  tenantId: 'acme-corp',
  name: 'Acme Corporation',
  baseTheme: 'platform',
  colors: {
    light: {
      accent: {
        base: '#FF6B35',
        hover: '#E55A2B',
        contrast: '#FFFFFF'
      }
    }
  }
};`,
      },
      {
        step: 2,
        title: 'Register Theme',
        description:
          'Register the theme with validation to ensure it meets accessibility and schema requirements.',
        code: `import { registerCustomTheme } from '@xala-technologies/platform-ui/themes';

registerCustomTheme(tenantTheme, {
  validate: true,
  skipAccessibilityChecks: false,
  override: false
});`,
      },
      {
        step: 3,
        title: 'Apply Theme in Application',
        description:
          'Use the DesignsystemetProvider to apply the theme. The provider will inject the CSS automatically.',
        code: `import { DesignsystemetProvider } from '@xala-technologies/platform-ui';

function App() {
  return (
    <DesignsystemetProvider
      theme="acme-corp"
      colorMode="light"
    >
      <YourApp />
    </DesignsystemetProvider>
  );
}`,
      },
      {
        step: 4,
        title: 'Runtime Theme Switching',
        description: 'Switch themes dynamically by changing the theme prop on the provider.',
        code: `const [currentTenant, setCurrentTenant] = useState('acme-corp');

<DesignsystemetProvider theme={currentTenant}>
  <TenantSelector onChange={setCurrentTenant} />
  <YourApp />
</DesignsystemetProvider>`,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md">
          Implementation Guide
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
          {steps.map(({ step, title, description, code }) => (
            <Card key={step} style={{ padding: 'var(--ds-spacing-6)' }}>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--ds-color-accent-base-default)',
                    borderRadius: 'var(--ds-border-radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--ds-color-accent-base-contrast-default)',
                    fontWeight: 600,
                  }}
                >
                  {step}
                </div>
                <div style={{ flex: 1 }}>
                  <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                    {title}
                  </Heading>
                  <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)' }}>{description}</Paragraph>
                  <div
                    style={{
                      padding: 'var(--ds-spacing-4)',
                      backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                      borderRadius: 'var(--ds-border-radius-md)',
                    }}
                  >
                    <pre
                      style={{
                        margin: 0,
                        fontSize: 'var(--ds-font-size-sm)',
                        color: 'var(--ds-color-neutral-text-default)',
                        fontFamily: 'var(--ds-font-family-mono)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {code}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};
