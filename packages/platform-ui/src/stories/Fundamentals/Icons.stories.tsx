import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Card, Heading, Paragraph } from '../../index';
import { 
  EnvelopeClosedIcon, 
  CalendarIcon, 
  PersonIcon,
  PhoneIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  CogIcon,
  CheckmarkIcon,
  XMarkIcon,
  ExclamationmarkTriangleIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ArrowRightIcon,
} from '@navikt/aksel-icons';
import { 
  Mail, 
  Calendar, 
  User, 
  Code, 
  Terminal,
  Github,
  Zap,
  Layers,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Search,
  Settings,
} from 'lucide-react';

const meta: Meta = {
  title: 'Fundamentals/Icons',
  parameters: {
    docs: {
      description: {
        component: `
# Icon Usage Guide

Learn how to use icons effectively in the Xala Platform. We use a dual-library approach:
- **Primary:** NAV Aksel Icons (900+ Norwegian public sector icons)
- **Secondary:** Lucide React (general purpose fallback)

## Quick Rules
- Always check Aksel first
- Use Lucide when Aksel doesn't have it
- Provide accessibility labels
- Use design tokens for colors
- Never use emojis
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Icon Library Priority
 * 
 * This story demonstrates our dual-library strategy and when to use each.
 */
export const IconLibraryPriority: Story = {
  render: () => (
    <div>
      <Heading level={1} data-size="2xl" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Icon Library Strategy
      </Heading>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-8)' }}>
        <Card style={{ padding: 'var(--ds-spacing-6)', borderLeft: '4px solid var(--ds-color-accent-base-default)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <CheckCircle size={32} style={{ color: 'var(--ds-color-success-base-default)' }} />
            <Heading level={2} data-size="lg">
              1. NAV Aksel Icons (Primary)
            </Heading>
          </div>

          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            900+ icons designed for Norwegian public services. Use these first!
          </Paragraph>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
            <EnvelopeClosedIcon fontSize="2rem" title="Email" />
            <CalendarIcon fontSize="2rem" title="Calendar" />
            <PersonIcon fontSize="2rem" title="Person" />
            <PhoneIcon fontSize="2rem" title="Phone" />
            <FileTextIcon fontSize="2rem" title="Document" />
            <MagnifyingGlassIcon fontSize="2rem" title="Search" />
            <CogIcon fontSize="2rem" title="Settings" />
            <CheckmarkIcon fontSize="2rem" title="Check" />
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`import { EnvelopeClosedIcon } from '@navikt/aksel-icons';

<EnvelopeClosedIcon 
  fontSize="1.5rem" 
  title="Email" 
/>`}
          </pre>

          <div style={{ 
            marginTop: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
          }}>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
              <strong>When to use:</strong>
              <br />• Norwegian public sector apps
              <br />• Common UI patterns
              <br />• Forms and documents
              <br />• User/organization icons
            </Paragraph>
          </div>
        </Card>

        <Card style={{ padding: 'var(--ds-spacing-6)', borderLeft: '4px solid var(--ds-color-warning-base-default)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <Info size={32} style={{ color: 'var(--ds-color-warning-base-default)' }} />
            <Heading level={2} data-size="lg">
              2. Lucide React (Fallback)
            </Heading>
          </div>

          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            1000+ general purpose icons. Use when Aksel doesn't have what you need.
          </Paragraph>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
            <Code size={32} />
            <Terminal size={32} />
            <Github size={32} />
            <Zap size={32} />
            <Layers size={32} />
            <AlertCircle size={32} />
            <CheckCircle size={32} />
            <Settings size={32} />
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`import { Code } from 'lucide-react';

<Code 
  size={24} 
  color="var(--ds-color-accent-base-default)" 
/>`}
          </pre>

          <div style={{ 
            marginTop: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-warning-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
          }}>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-warning-text-default)' }}>
              <strong>When to use:</strong>
              <br />• Developer/technical icons
              <br />• Social media icons
              <br />• When Aksel doesn't have it
              <br />• International applications
            </Paragraph>
          </div>
        </Card>
      </div>
    </div>
  ),
};

/**
 * Icon Sizing Guide
 * 
 * Demonstrates proper icon sizing using design tokens and rem units.
 */
export const IconSizingGuide: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-8)' }}>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Icon Sizing
      </Heading>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
        <div style={{ textAlign: 'center', flexBasis: '200px' }}>
          <EnvelopeClosedIcon fontSize="1rem" title="Small icon" />
          <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)' }}>
            <strong>Small (1rem)</strong>
            <br />
            <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>fontSize="1rem"</code>
          </Paragraph>
        </div>

        <div style={{ textAlign: 'center', flexBasis: '200px' }}>
          <EnvelopeClosedIcon fontSize="1.5rem" title="Medium icon" />
          <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)' }}>
            <strong>Medium (1.5rem)</strong>
            <br />
            <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>fontSize="1.5rem"</code>
          </Paragraph>
        </div>

        <div style={{ textAlign: 'center', flexBasis: '200px' }}>
          <EnvelopeClosedIcon fontSize="2rem" title="Large icon" />
          <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)' }}>
            <strong>Large (2rem)</strong>
            <br />
            <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>fontSize="2rem"</code>
          </Paragraph>
        </div>

        <div style={{ textAlign: 'center', flexBasis: '200px' }}>
          <EnvelopeClosedIcon fontSize="3rem" title="Extra large icon" />
          <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)' }}>
            <strong>XL (3rem)</strong>
            <br />
            <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>fontSize="3rem"</code>
          </Paragraph>
        </div>
      </div>

      <div style={{ 
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-accent-text-default)' }}>
          <strong>Best Practice:</strong> Use rem units for consistent sizing across themes and zoom levels.
          Lucide uses <code>size</code> prop in pixels, Aksel uses <code>fontSize</code> in rem.
        </Paragraph>
      </div>
    </Card>
  ),
};

/**
 * Accessibility Guidelines
 * 
 * Shows proper accessibility implementation for icons.
 */
export const AccessibilityGuidelines: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Icon Accessibility
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Card style={{ padding: 'var(--ds-spacing-6)', borderLeft: '4px solid var(--ds-color-success-base-default)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <CheckCircle size={24} style={{ color: 'var(--ds-color-success-base-default)' }} />
            <Heading level={3} data-size="md">
              Decorative Icons (with text)
            </Heading>
          </div>

          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            When icon is next to text that explains it, mark as decorative with <code>aria-hidden</code>
          </Paragraph>

          <div style={{ 
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginBottom: 'var(--ds-spacing-4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <EnvelopeClosedIcon fontSize="1.25rem" aria-hidden="true" />
              <span>Send Email</span>
            </div>
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
  <EnvelopeClosedIcon fontSize="1.25rem" aria-hidden="true" />
  <span>Send Email</span>
</div>`}
          </pre>
        </Card>

        <Card style={{ padding: 'var(--ds-spacing-6)', borderLeft: '4px solid var(--ds-color-success-base-default)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <CheckCircle size={24} style={{ color: 'var(--ds-color-success-base-default)' }} />
            <Heading level={3} data-size="md">
              Meaningful Icons (standalone)
            </Heading>
          </div>

          <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            When icon conveys meaning without text, provide <code>title</code> or <code>aria-label</code>
          </Paragraph>

          <div style={{ 
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginBottom: 'var(--ds-spacing-4)',
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
          }}>
            <Button data-variant="tertiary" data-size="sm" aria-label="Delete item">
              <TrashIcon fontSize="1.25rem" />
            </Button>
            <Button data-variant="tertiary" data-size="sm" aria-label="Edit item">
              <PencilIcon fontSize="1.25rem" />
            </Button>
            <Button data-variant="tertiary" data-size="sm" aria-label="Settings">
              <CogIcon fontSize="1.25rem" />
            </Button>
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`<Button data-variant="tertiary" aria-label="Delete item">
  <TrashIcon fontSize="1.25rem" />
</Button>

// Or with title attribute
<TrashIcon fontSize="1.25rem" title="Delete item" />`}
          </pre>
        </Card>

        <Card style={{ padding: 'var(--ds-spacing-6)', borderLeft: '4px solid var(--ds-color-danger-base-default)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <X size={24} style={{ color: 'var(--ds-color-danger-base-default)' }} />
            <Heading level={3} data-size="md">
              Common Mistakes
            </Heading>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <div style={{ 
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-danger-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
            }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
                Icon-only button without label
                <br />
                <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>{`<Button><TrashIcon /></Button>`}</code>
              </Paragraph>
            </div>

            <div style={{ 
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-danger-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
            }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
                Using emojis instead of icons
                <br />
                <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>{`<span>📧 Email</span>`}</code>
              </Paragraph>
            </div>

            <div style={{ 
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-danger-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
            }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
                Hardcoded icon colors
                <br />
                <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>{`<Mail color="#0066CC" />`}</code>
              </Paragraph>
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),
};

/**
 * Interactive Icon Browser
 * 
 * Browse and search available icons from both libraries.
 */
export const InteractiveIconBrowser: Story = {
  render: () => {
    const [selectedLibrary, setSelectedLibrary] = useState<'aksel' | 'lucide'>('aksel');
    const [searchTerm, setSearchTerm] = useState('');

    const akselIcons = [
      { Icon: EnvelopeClosedIcon, name: 'EnvelopeClosedIcon', category: 'Communication' },
      { Icon: CalendarIcon, name: 'CalendarIcon', category: 'Time' },
      { Icon: PersonIcon, name: 'PersonIcon', category: 'User' },
      { Icon: PhoneIcon, name: 'PhoneIcon', category: 'Communication' },
      { Icon: FileTextIcon, name: 'FileTextIcon', category: 'Document' },
      { Icon: MagnifyingGlassIcon, name: 'MagnifyingGlassIcon', category: 'Action' },
      { Icon: CogIcon, name: 'CogIcon', category: 'Settings' },
      { Icon: CheckmarkIcon, name: 'CheckmarkIcon', category: 'Status' },
      { Icon: XMarkIcon, name: 'XMarkIcon', category: 'Action' },
      { Icon: ExclamationmarkTriangleIcon, name: 'ExclamationmarkTriangleIcon', category: 'Status' },
      { Icon: PlusIcon, name: 'PlusIcon', category: 'Action' },
      { Icon: TrashIcon, name: 'TrashIcon', category: 'Action' },
      { Icon: PencilIcon, name: 'PencilIcon', category: 'Action' },
      { Icon: ArrowRightIcon, name: 'ArrowRightIcon', category: 'Navigation' },
    ];

    const lucideIcons = [
      { Icon: Mail, name: 'Mail', category: 'Communication' },
      { Icon: Calendar, name: 'Calendar', category: 'Time' },
      { Icon: User, name: 'User', category: 'User' },
      { Icon: Code, name: 'Code', category: 'Developer' },
      { Icon: Terminal, name: 'Terminal', category: 'Developer' },
      { Icon: Github, name: 'Github', category: 'Brand' },
      { Icon: Zap, name: 'Zap', category: 'Action' },
      { Icon: Layers, name: 'Layers', category: 'UI' },
      { Icon: AlertCircle, name: 'AlertCircle', category: 'Status' },
      { Icon: CheckCircle, name: 'CheckCircle', category: 'Status' },
      { Icon: Info, name: 'Info', category: 'Status' },
      { Icon: X, name: 'X', category: 'Action' },
      { Icon: Search, name: 'Search', category: 'Action' },
      { Icon: Settings, name: 'Settings', category: 'Settings' },
    ];

    const currentIcons = selectedLibrary === 'aksel' ? akselIcons : lucideIcons;
    const filteredIcons = currentIcons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          Icon Browser
        </Heading>

        <Card style={{ padding: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
            <Button
              data-variant={selectedLibrary === 'aksel' ? 'primary' : 'tertiary'}
              data-size="sm"
              onClick={() => setSelectedLibrary('aksel')}
            >
              NAV Aksel Icons ({akselIcons.length})
            </Button>
            <Button
              data-variant={selectedLibrary === 'lucide' ? 'primary' : 'tertiary'}
              data-size="sm"
              onClick={() => setSelectedLibrary('lucide')}
            >
              Lucide React ({lucideIcons.length})
            </Button>
          </div>

          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <div style={{ position: 'relative' }}>
              <MagnifyingGlassIcon 
                fontSize="1.25rem" 
                style={{ 
                  position: 'absolute', 
                  left: 'var(--ds-spacing-3)', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }} 
              />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--ds-spacing-3) var(--ds-spacing-3) var(--ds-spacing-3) var(--ds-spacing-10)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontSize: 'var(--ds-font-size-md)',
                }}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-3)',
          }}>
            {filteredIcons.map(({ Icon, name, category }) => (
              <div
                key={name}
                style={{
                  padding: 'var(--ds-spacing-4)',
                  border: '1px solid var(--ds-color-neutral-border-subtle)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  flexBasis: '120px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-color-accent-border-default)';
                  e.currentTarget.style.backgroundColor = 'var(--ds-color-accent-surface-default)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-color-neutral-border-subtle)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {selectedLibrary === 'aksel' ? (
                  <Icon fontSize="2rem" title={name} style={{ marginBottom: 'var(--ds-spacing-2)' }} />
                ) : (
                  <Icon size={32} style={{ marginBottom: 'var(--ds-spacing-2)' }} />
                )}
                <div style={{ fontSize: 'var(--ds-font-size-xs)', fontWeight: 500 }}>
                  {name}
                </div>
                <div style={{ fontSize: 'var(--ds-font-size-xs)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {category}
                </div>
              </div>
            ))}
          </div>

          {filteredIcons.length === 0 && (
            <div style={{ 
              padding: 'var(--ds-spacing-8)', 
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}>
              <Paragraph>No icons found matching "{searchTerm}"</Paragraph>
            </div>
          )}
        </Card>

        <div style={{ 
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-accent-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-accent-text-default)' }}>
            <strong>Full Icon Libraries:</strong>
            <br />• Aksel: <a href="https://aksel.nav.no/ikoner" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>aksel.nav.no/ikoner</a> (900+ icons)
            <br />• Lucide: <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>lucide.dev</a> (1000+ icons)
          </Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Usage Patterns
 * 
 * Common icon usage patterns with real examples.
 */
export const UsagePatterns: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Common Usage Patterns
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            1. Icons in Buttons
          </Heading>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap', marginBottom: 'var(--ds-spacing-4)' }}>
            <Button data-variant="primary" data-size="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <PlusIcon fontSize="1.25rem" aria-hidden="true" />
                <span>Add Item</span>
              </div>
            </Button>

            <Button data-variant="secondary" data-size="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <MagnifyingGlassIcon fontSize="1.25rem" aria-hidden="true" />
                <span>Search</span>
              </div>
            </Button>

            <Button data-variant="danger" data-size="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <TrashIcon fontSize="1.25rem" aria-hidden="true" />
                <span>Delete</span>
              </div>
            </Button>
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`<Button data-variant="primary">
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
    <PlusIcon fontSize="1.25rem" aria-hidden="true" />
    <span>Add Item</span>
  </div>
</Button>`}
          </pre>
        </Card>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            2. Status Indicators
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <CheckmarkIcon fontSize="1.25rem" style={{ color: 'var(--ds-color-success-base-default)' }} />
              <span>Task completed successfully</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <ExclamationmarkTriangleIcon fontSize="1.25rem" style={{ color: 'var(--ds-color-warning-base-default)' }} />
              <span>Warning: Review required</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <XMarkIcon fontSize="1.25rem" style={{ color: 'var(--ds-color-danger-base-default)' }} />
              <span>Error: Action failed</span>
            </div>
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
  <CheckmarkIcon 
    fontSize="1.25rem" 
    style={{ color: 'var(--ds-color-success-base-default)' }} 
  />
  <span>Task completed successfully</span>
</div>`}
          </pre>
        </Card>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            3. Navigation Links
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-4)' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--ds-spacing-3)', textDecoration: 'none', color: 'inherit', borderRadius: 'var(--ds-border-radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <PersonIcon fontSize="1.25rem" aria-hidden="true" />
                <span>Profile Settings</span>
              </div>
              <ArrowRightIcon fontSize="1rem" aria-hidden="true" />
            </a>

            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--ds-spacing-3)', textDecoration: 'none', color: 'inherit', borderRadius: 'var(--ds-border-radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <CogIcon fontSize="1.25rem" aria-hidden="true" />
                <span>System Settings</span>
              </div>
              <ArrowRightIcon fontSize="1rem" aria-hidden="true" />
            </a>
          </div>

          <pre style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}>
{`<a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
    <PersonIcon fontSize="1.25rem" aria-hidden="true" />
    <span>Profile Settings</span>
  </div>
  <ArrowRightIcon fontSize="1rem" aria-hidden="true" />
</a>`}
          </pre>
        </Card>
      </div>
    </div>
  ),
};

/**
 * Do's and Don'ts
 * 
 * Visual guide showing correct and incorrect icon usage.
 */
export const DosAndDonts: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Do's and Don'ts
      </Heading>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-success-base-default)' }}>
            Do
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Card style={{ padding: 'var(--ds-spacing-4)', borderLeft: '4px solid var(--ds-color-success-base-default)' }}>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 600 }}>
                Use design tokens for colors
              </Paragraph>
              <div style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                <EnvelopeClosedIcon fontSize="1.5rem" style={{ color: 'var(--ds-color-accent-base-default)' }} />
              </div>
              <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>
                color: 'var(--ds-color-accent-base-default)'
              </code>
            </Card>

            <Card style={{ padding: 'var(--ds-spacing-4)', borderLeft: '4px solid var(--ds-color-success-base-default)' }}>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 600 }}>
                Provide accessibility labels
              </Paragraph>
              <Button data-variant="tertiary" aria-label="Delete item">
                <TrashIcon fontSize="1.25rem" />
              </Button>
              <br />
              <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>
                aria-label="Delete item"
              </code>
            </Card>

            <Card style={{ padding: 'var(--ds-spacing-4)', borderLeft: '4px solid var(--ds-color-success-base-default)' }}>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 600 }}>
                Use Aksel icons first
              </Paragraph>
              <EnvelopeClosedIcon fontSize="1.5rem" title="Email" />
              <br />
              <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>
                import from '@navikt/aksel-icons'
              </code>
            </Card>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-danger-base-default)' }}>
            Don't
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Card style={{ padding: 'var(--ds-spacing-4)', borderLeft: '4px solid var(--ds-color-danger-base-default)', opacity: 0.7 }}>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 600 }}>
                Hardcode colors
              </Paragraph>
              <div style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                <Mail size={24} color="#0066CC" />
              </div>
              <code style={{ fontSize: 'var(--ds-font-size-xs)', color: 'var(--ds-color-danger-text-default)' }}>
                color="#0066CC"
              </code>
            </Card>

            <Card style={{ padding: 'var(--ds-spacing-4)', borderLeft: '4px solid var(--ds-color-danger-base-default)', opacity: 0.7 }}>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 600 }}>
                Icon-only buttons without labels
              </Paragraph>
              <Button data-variant="tertiary">
                <TrashIcon fontSize="1.25rem" />
              </Button>
              <br />
              <code style={{ fontSize: 'var(--ds-font-size-xs)', color: 'var(--ds-color-danger-text-default)' }}>
                No aria-label
              </code>
            </Card>

            <Card style={{ padding: 'var(--ds-spacing-4)', borderLeft: '4px solid var(--ds-color-danger-base-default)', opacity: 0.7 }}>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 600 }}>
                Use emojis instead of icons
              </Paragraph>
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <br />
              <code style={{ fontSize: 'var(--ds-font-size-xs)', color: 'var(--ds-color-danger-text-default)' }}>
                Emojis are forbidden
              </code>
            </Card>
          </div>
        </div>
      </div>
    </div>
  ),
};
