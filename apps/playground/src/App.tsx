/**
 * Xala UI Playground
 *
 * Visual QA Sandbox using platform-ui shell components.
 * Apps should never define their own components - only wrap from platform-ui.
 */

import { useState } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Select,
  Tabs,
  Field,
  Label,
} from '@xala-technologies/platform-ui';

const componentCatalog = {
  primitives: [
    { name: 'Button', description: 'Interactive button component' },
    { name: 'Card', description: 'Content container with borders' },
    { name: 'TextField', description: 'Text input field' },
    { name: 'Select', description: 'Dropdown selection' },
    { name: 'Checkbox', description: 'Boolean input' },
  ],
  composed: [
    { name: 'DataTable', description: 'Sortable, filterable table' },
    { name: 'Modal', description: 'Dialog overlay' },
    { name: 'Drawer', description: 'Side panel overlay' },
    { name: 'Tabs', description: 'Tabbed content navigation' },
  ],
  blocks: [
    { name: 'NotificationBell', description: 'Notification indicator' },
    { name: 'UserMenu', description: 'User account menu' },
    { name: 'SearchBar', description: 'Search input with suggestions' },
  ],
  patterns: [
    { name: 'ResourceCard', description: 'Display resource information' },
    { name: 'SlotCalendar', description: 'Time slot selection' },
  ],
  shells: [
    { name: 'AppLayout', description: 'Main application layout' },
    { name: 'DashboardLayout', description: 'Dashboard with sidebar' },
  ],
};

const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('primitives');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [size, setSize] = useState('md');

  const components = componentCatalog[selectedCategory as keyof typeof componentCatalog] || [];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--ds-color-neutral-background-default)' }}>
      {/* Sidebar */}
      <div style={{
        width: 'var(--ds-sizing-80)',
        borderRight: '1px solid var(--ds-color-neutral-border-default)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
      }}>
        {/* Header in sidebar */}
        <div style={{
          padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}>
          <Heading level={1} data-size="md">Xala UI Playground</Heading>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            Visual QA Sandbox
          </Paragraph>
        </div>

        {/* Size selector */}
        <div style={{ padding: 'var(--ds-spacing-4)', borderBottom: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <Field data-size="sm">
            <Label>Component Size</Label>
            <Select value={size} onChange={(e) => setSize(e.target.value)}>
              {sizes.map((s) => (
                <Select.Option key={s.value} value={s.value}>{s.label}</Select.Option>
              ))}
            </Select>
          </Field>
        </div>

        {/* Category tabs */}
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <Tabs defaultValue="primitives" onChange={(value: string) => { setSelectedCategory(value); setSelectedComponent(null); }}>
            <Tabs.List>
              {Object.keys(componentCatalog).map((category) => (
                <Tabs.Tab key={category} value={category} data-size="sm">
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </div>

        {/* Component list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0 var(--ds-spacing-4) var(--ds-spacing-4)' }}>
          {components.map((comp) => (
            <div
              key={comp.name}
              onClick={() => setSelectedComponent(comp.name)}
              style={{
                padding: 'var(--ds-spacing-3)',
                marginBottom: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-md)',
                cursor: 'pointer',
                backgroundColor: selectedComponent === comp.name ? 'var(--ds-color-accent-surface-default)' : 'transparent',
                border: selectedComponent === comp.name ? '1px solid var(--ds-color-accent-border-default)' : '1px solid transparent',
              }}
            >
              <Paragraph data-size="sm" style={{ fontWeight: '500', margin: 0 }}>{comp.name}</Paragraph>
              <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)', margin: 0 }}>{comp.description}</Paragraph>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 'var(--ds-spacing-6)', overflow: 'auto' }}>
        {selectedComponent ? (
          <div>
            <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-4)' }}>{selectedComponent}</Heading>
            <Card style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <div style={{
                padding: 'var(--ds-spacing-8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                backgroundColor: 'var(--ds-color-neutral-background-subtle)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Paragraph data-size="md" style={{ marginBottom: 'var(--ds-spacing-2)' }}>{selectedComponent} Preview</Paragraph>
                  <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)', marginBottom: 'var(--ds-spacing-4)' }}>
                    Component would render here with current props
                  </Paragraph>
                  <Button variant="primary" data-size={size as 'sm' | 'md' | 'lg'}>Example Button</Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
            <div>
              <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-2)' }}>Select a Component</Heading>
              <Paragraph data-size="md" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                Choose a component from the sidebar to preview it
              </Paragraph>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
